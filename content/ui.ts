import type { Locale } from "./types"

const fr = {
  meta: {
    description:
      "Je conçois des plateformes de données et des systèmes d'IA fiables, de l'ingestion au serving LLM : Python, FastAPI, pipelines ETL/ELT, architecture de données, RAG et bases vectorielles.",
    ogDescription:
      "Plateformes de données et systèmes d'IA fiables — Python, Data Architecture, Data Engineering, ETL/ELT, RAG, FastAPI.",
  },
  a11y: {
    skipToContent: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNav: "Navigation principale",
    language: "Langue",
    switchTo: "Switch to English",
    metrics: "Chiffres clés",
    social: "Réseaux",
  },
  nav: {
    home: "Accueil",
    architecture: "Architecture",
    projects: "Projets",
    skills: "Compétences",
    experience: "Expérience",
    about: "À propos",
    contact: "Contact",
    notes: "Notes",
  },
  cta: {
    contact: "Me contacter",
    featured: "Voir le projet phare",
    downloadCv: "Télécharger le CV",
  },
  status: {
    "in-progress": "En cours",
    completed: "Terminé",
    prototype: "Prototype",
  },
  hero: {
    caption: "workstation 3D · Python on screen",
  },
  focus: {
    eyebrow: "Positionnement",
    title: "Domaines d'expertise",
    description:
      "Un profil Python, data et IA, centré sur la conception de plateformes fiables plutôt que sur des démonstrations isolées.",
  },
  featured: {
    eyebrow: "Projet phare",
    problem: "Problème",
    solution: "Solution",
    highlights: "Points clés",
    role: "Rôle",
    status: "Statut",
    year: "Année",
    stack: "Stack",
  },
  projects: {
    eyebrow: "Projets",
    title: "Projets sélectionnés",
    description:
      "Ce que chaque projet accomplit — problème, solution et rôle — plutôt qu'une simple liste de technologies.",
    featuredBadge: "Phare",
    problem: "Problème",
    solution: "Solution",
    role: "Rôle",
    demo: "Démo",
  },
  skills: {
    eyebrow: "Compétences",
    title: "Compétences techniques",
    description:
      "Organisation par domaines d'ingénierie — uniquement les technologies réellement utilisées dans mon parcours.",
  },
  experience: {
    eyebrow: "Expérience",
    title: "Parcours professionnel",
    description:
      "Rôles, responsabilités et technologies — un fil chronologique centré sur Python, la data et l'ingénierie IA.",
    current: "En cours",
    present: "Aujourd'hui",
    responsibilities: "Responsabilités",
  },
  engineering: {
    eyebrow: "Méthode",
    title: "De l'idée à la production",
    description: "Une approche système complète : du cadrage métier jusqu'au monitoring, pas seulement un prototype.",
  },
  about: {
    eyebrow: "À propos",
    title: "Ingénieur Python, data & IA, orienté production",
    education: "Formation",
    languages: "Langues",
  },
  contact: {
    eyebrow: "Contact",
    title: "Discutons de votre prochaine plateforme data ou IA",
    description: "Une question technique, une mission, ou un besoin d'architecture — écrivez-moi.",
    email: "Email",
    phone: "Téléphone",
    location: "Localisation",
    name: "Nom",
    subject: "Sujet",
    message: "Message",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "votre@email.com",
    subjectPlaceholder: "Sujet de votre message",
    messagePlaceholder: "Contexte, objectif, contraintes techniques...",
    required: "obligatoire",
    send: "Envoyer",
    sending: "Envoi en cours…",
    sentTitle: "Message envoyé",
    sentBody: "Merci. Je vous répondrai dès que possible.",
    sendAnother: "Envoyer un autre message",
    errorGeneric: "Erreur lors de l'envoi du message. Réessayez ou écrivez-moi directement par email.",
    errorNetwork: "Erreur de connexion. Veuillez réessayer.",
  },
  footer: {
    tagline: "Plateformes de données, systèmes IA souverains et architectures prêtes pour la production.",
    rights: "Tous droits réservés.",
  },
  music: {
    play: "Lire coding focus",
    pause: "Pause coding focus",
    preparing: "Préparation…",
    on: "Coding focus · ON",
    off: "▶ Lire coding focus",
    blocked: "Audio bloqué",
  },
  notFound: {
    title: "Page introuvable",
    body: "Cette page n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
}

export type Dictionary = typeof fr

const en: Dictionary = {
  meta: {
    description:
      "I design reliable data platforms and AI systems, from ingestion to LLM serving: Python, FastAPI, ETL/ELT pipelines, data architecture, RAG and vector databases.",
    ogDescription:
      "Reliable data platforms and AI systems — Python, Data Architecture, Data Engineering, ETL/ELT, RAG, FastAPI.",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    language: "Language",
    switchTo: "Passer en français",
    metrics: "Key figures",
    social: "Social",
  },
  nav: {
    home: "Home",
    architecture: "Architecture",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    about: "About",
    contact: "Contact",
    notes: "Notes",
  },
  cta: {
    contact: "Get in touch",
    featured: "See the flagship project",
    downloadCv: "Download resume",
  },
  status: {
    "in-progress": "In progress",
    completed: "Completed",
    prototype: "Prototype",
  },
  hero: {
    caption: "3D workstation · Python on screen",
  },
  focus: {
    eyebrow: "Positioning",
    title: "Areas of expertise",
    description:
      "A Python, data and AI profile, focused on designing reliable platforms rather than isolated demos.",
  },
  featured: {
    eyebrow: "Flagship project",
    problem: "Problem",
    solution: "Solution",
    highlights: "Key points",
    role: "Role",
    status: "Status",
    year: "Year",
    stack: "Stack",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected projects",
    description: "What each project achieves — problem, solution and role — rather than a plain list of technologies.",
    featuredBadge: "Flagship",
    problem: "Problem",
    solution: "Solution",
    role: "Role",
    demo: "Demo",
  },
  skills: {
    eyebrow: "Skills",
    title: "Technical skills",
    description: "Organised by engineering domain — only technologies I have actually used in my career.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Professional background",
    description: "Roles, responsibilities and technologies — a timeline focused on Python, data and AI engineering.",
    current: "Current",
    present: "Present",
    responsibilities: "Responsibilities",
  },
  engineering: {
    eyebrow: "Method",
    title: "From idea to production",
    description: "An end-to-end system approach: from business framing to monitoring, not just a prototype.",
  },
  about: {
    eyebrow: "About",
    title: "Python, data & AI engineer, production-minded",
    education: "Education",
    languages: "Languages",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your next data or AI platform",
    description: "A technical question, a project, or an architecture need — write to me.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    name: "Name",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@email.com",
    subjectPlaceholder: "Subject of your message",
    messagePlaceholder: "Context, goal, technical constraints...",
    required: "required",
    send: "Send",
    sending: "Sending…",
    sentTitle: "Message sent",
    sentBody: "Thank you. I will get back to you as soon as possible.",
    sendAnother: "Send another message",
    errorGeneric: "The message could not be sent. Please try again or email me directly.",
    errorNetwork: "Connection error. Please try again.",
  },
  footer: {
    tagline: "Data platforms, sovereign AI systems and production-ready architectures.",
    rights: "All rights reserved.",
  },
  music: {
    play: "Play coding focus music",
    pause: "Pause coding focus music",
    preparing: "Preparing…",
    on: "Coding focus · ON",
    off: "▶ Play coding focus",
    blocked: "Audio blocked",
  },
  notFound: {
    title: "Page not found",
    body: "This page does not exist or has been moved.",
    back: "Back to home",
  },
}

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
