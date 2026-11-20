(() => {
  'use strict';

  const S = window.SITE;
  if (!S) return;

  document.documentElement.classList.add('js');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /** Create an element safely (content is set as text, never as HTML). */
  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [key, val] of Object.entries(props)) {
      if (val == null || val === false || val === '') continue;
      if (key === 'class') node.className = val;
      else if (key === 'text') node.textContent = val;
      else node.setAttribute(key, val === true ? '' : val);
    }
    node.append(...[].concat(children).filter(Boolean));
    return node;
  };

  const external = (href) => /^https?:\/\//i.test(href);
  const link = (label, href, cls = '') =>
    el('a', {
      class: cls,
      href,
      ...(external(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
      text: label
    });

  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  /* ---------- Simple text bindings ---------- */
  $$('[data-bind]').forEach((node) => {
    const value = get(S, node.dataset.bind);
    if (typeof value === 'string') node.textContent = value;
  });
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Hero ---------- */
  const actions = $('#hero-actions');
  actions.append(
    link(S.hero.primaryCta.label, S.hero.primaryCta.href, 'btn btn--primary'),
    link(S.hero.secondaryCta.label, S.hero.secondaryCta.href, 'btn btn--ghost')
  );

  const renderSocial = (target) =>
    S.social.forEach((s) => target.append(el('li', {}, link(s.label, s.url))));
  renderSocial($('#hero-social'));
  renderSocial($('#contact-social'));

  /* ---------- About ---------- */
  const photo = $('#about-photo');
  photo.src = S.about.photo.src;
  photo.alt = S.about.photo.alt;
  S.about.paragraphs.forEach((p) => $('#about-text').append(el('p', { text: p })));
  S.about.facts.forEach((f) =>
    $('#about-facts').append(
      el('div', {}, [el('dt', { text: f.label }), el('dd', { text: f.value })])
    )
  );

  /* ---------- Projects ---------- */
  const projectList = $('#project-list');
  S.projects.forEach((p) => {
    const links = el('div', { class: 'card__links' });
    if (p.demo) links.append(link('Live demo', p.demo, 'btn btn--small btn--primary'));
    if (p.source) links.append(link('Source code', p.source, 'btn btn--small btn--ghost'));

    const card = el('li', { class: 'card reveal' }, [
      p.image
        ? el('img', {
            class: 'card__img',
            src: p.image.src,
            alt: p.image.alt || '',
            width: '800',
            height: '450',
            loading: 'lazy',
            decoding: 'async'
          })
        : null,
      el('div', { class: 'card__body' }, [
        el('h3', { class: 'card__title', text: p.title }),
        el('p', { class: 'card__desc', text: p.description }),
        el('ul', { class: 'tags', 'aria-label': 'Technologies used' },
          p.tech.map((t) => el('li', { text: t }))),
        links
      ])
    ]);
    projectList.append(card);
  });

  /* ---------- Skills ---------- */
  S.skills.forEach((g) => {
    $('#skill-groups').append(
      el('div', { class: 'skill-group reveal' }, [
        el('h3', { text: g.group }),
        el('ul', { class: 'tags' }, g.items.map((i) => el('li', { text: i })))
      ])
    );
  });

  /* ---------- Contact ---------- */
  $('#contact-intro').textContent = S.contact.intro;
  const mailto = $('#contact-mailto');
  mailto.href = `mailto:${S.contact.email}`;
  mailto.textContent = S.contact.email;

  const form = $('#contact-form');
  const status = $('#form-status');
  const fields = ['name', 'email', 'message'];

  const setError = (field, msg) => {
    const input = $(`#cf-${field}`);
    const out = $(`#cf-${field}-error`);
    out.textContent = msg || '';
    out.hidden = !msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) input.setAttribute('aria-describedby', out.id);
    else input.removeAttribute('aria-describedby');
  };

  const validate = () => {
    let firstInvalid = null;
    fields.forEach((f) => {
      const input = $(`#cf-${f}`);
      let msg = '';
      if (!input.value.trim()) msg = 'This field is required.';
      else if (f === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()))
        msg = 'Please enter a valid email address.';
      setError(f, msg);
      if (msg && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    if (!validate()) return;

    const data = new FormData(form);
    if (data.get('_gotcha')) return; // bot

    const endpoint = S.contact.formEndpoint;
    if (!endpoint) {
      // Fallback: open the visitor's email client
      const subject = encodeURIComponent(`${S.contact.subject} from ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:${S.contact.email}?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email app…';
      return;
    }

    const button = $('button[type="submit"]', form);
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.textContent = 'Thanks! Your message has been sent.';
    } catch {
      status.textContent = `Something went wrong. Please email me directly at ${S.contact.email}.`;
    } finally {
      button.disabled = false;
    }
  });

  /* ---------- Mobile navigation ---------- */
  const toggle = $('.nav-toggle');
  const menu = $('#primary-nav');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Active nav link + reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    const navLinks = $$('#primary-nav a');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          const active = a.getAttribute('href') === `#${entry.target.id}`;
          a.classList.toggle('is-active', active);
          if (active) a.setAttribute('aria-current', 'page');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => sectionObserver.observe(s));

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    $$('.reveal').forEach((n) => revealObserver.observe(n));
  } else {
    $$('.reveal').forEach((n) => n.classList.add('is-visible'));
  }
})();