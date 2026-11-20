/* ==========================================================================
   ✏️  EDIT THIS FILE. Everything on the site comes from here.
   Every value below is PLACEHOLDER content. Replace it with your own.
   ========================================================================== */
window.SITE = {
  // --- Page metadata (also update <title> and <meta> tags in index.html) ---
  brand: "OE",                       // PLACEHOLDER: short logo text (initials)
  name: "Okefu Vincent Enyitobi",                 // PLACEHOLDER
  role: "Software Developer",        // PLACEHOLDER
  tagline: "I build fast, accessible and maintainable software.", // PLACEHOLDER

  hero: {
    greeting: "Hi, I'm",
    primaryCta:   { label: "View my work",  href: "#projects" },
    secondaryCta: { label: "Get in touch",  href: "#contact" }
  },

  about: {
    photo: {
      src: "assets/avatar.jpg",      // PLACEHOLDER: replace with your photo (square, ~640px, WebP/JPG)
      alt: "Portrait of Okefu Enytobi, a young man with short black hair in a black and white patterned top, against a plain light background"   // PLACEHOLDER: describe your photo
    },
    paragraphs: [
      "I'm Okefu Enyitobi (Vin), a developer in training building solid Python foundations through hands-on projects. I'm doing a fellowship, a self-paced, peer-evaluated program, where I started with no Python experience and have since built command-line tools including a contact book, an equipment-lending inventory system, a helpdesk ticket manager and an esports tournament manager.",
      "I learn by building and by having my work reviewed by peers, and I enjoy turning ideas into working software. I'm looking for opportunities to keep growing and to contribute to real projects."
    ],
    facts: [                         // PLACEHOLDER: add, remove or edit
      { label: "Location",  value: "Benue, Nigeria" },
      { label: "Focus",     value: "Backend & toolng" },
      { label: "Available", value: "Open to opportunities" }
    ]
  },

  projects: [                        // PLACEHOLDER: replace these three entries
    {
      title: "Budget Tracker",
      description: "A Python app for recording income and expenses and keeping track of spending against a budget.",
      tech: ["Python"],
      demo: "",                                   // empty hides the button
      source: "https://github.com/vincognito-dev/budget-tracker",
      image: { src: "assets/project-placeholder.svg", alt: "Placeholder image for the Budget Tracker project" }
    },
    {
      title: "Player Tracker",
      description: "A Python app for managing player records and keeping track of their details and stats.",
      tech: ["Python"],
      demo: "",
      source: "https://github.com/vincognito-dev/player-tracker",
      image: { src: "assets/project-placeholder.svg", alt: "Placeholder image for the Player Tracker project" }
    },
  ],

  skills: [
    { group: "Languages", items: ["Python", "JavaScript", "SQL"] },
    { group: "Web",       items: ["HTML", "CSS", "REST APIs"] },
    { group: "Tools",     items: ["Git", "Linux", "Docker"] }
  ],

  contact: {
    email: "vincentetobi48@gmail.com",        // PLACEHOLDER
    intro: "Have a project, a question or an opportunity? I'd love to hear from you. Send me a message and I'll reply as soon as I can.",
    // Optional working form: create a free form at https://formspree.io and paste
    // its endpoint here (looks like "https://formspree.io/f/xxxxxxx").
    // Leave empty to fall back to opening the visitor's email app (mailto).
    formEndpoint: "",
    subject: "Portfolio enquiry"
  },

  social: [
    { label: "GitHub",   url: "https://github.com/vincognito-dev" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/enyitobi-vincent" }
  ],

  footer: "Built with HTML, CSS and JavaScript."
};