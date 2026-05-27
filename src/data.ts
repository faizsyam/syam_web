import { PortfolioItem, TeamMember } from './types';

// Let's use the actual generated images for portfolios
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'art-01',
    title: 'Cosmic Workspace',
    category: 'ai-art',
    categoryLabel: 'AI Art Direction',
    image: '/images/syam_illustration_1779856834169.png',
    description: 'A surreal explore sequence blending architectural precision with organic plant environments. High-concept creative direction exploring workspace serenity.',
    year: '2026',
    featured: true,
    color: '#F31365'
  },
  {
    id: 'char-01',
    title: 'Neon Nomad',
    category: 'character',
    categoryLabel: 'Character Design',
    image: '/images/syam_character_1779856812200.png',
    description: 'A stylized, design-forward professional avatar interacting with a hovering interface system. Pure, sleek vectors meets smooth gradient textures.',
    year: '2026',
    featured: true,
    color: '#FF5A5F' // coral
  },
  {
    id: 'kine-01',
    title: 'Typographic Kinetic Trails',
    category: 'typography',
    categoryLabel: 'Kinematic Typography',
    image: '/images/syam_kinetic_1779856854167.png',
    description: 'Dynamic typographic motion layout. Seamless overlapping ribbon-like lines and structural lettering exploring the rhythm of letterforms.',
    year: '2025',
    featured: true,
    color: '#1E0F16' // plum
  },
  {
    id: 'moti-01',
    title: 'Synergistic Logo Reveal',
    category: 'logo',
    categoryLabel: 'Logo Animation',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'A complex, fluid logo animation for a technology brand demonstrating keyframe-perfect speed curves and sleek vector morphing.',
    year: '2026',
    featured: true,
    color: '#F31365'
  },
  {
    id: 'moti-02',
    title: 'Fluidity Kinetic Loop',
    category: 'motion',
    categoryLabel: 'Motion Design',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    description: 'An abstract rhythmic screen installation looping forever. Built around custom easing curves, simulating elastic physical forces in a flat vector arena.',
    year: '2025',
    featured: false,
    color: '#FF5A5F'
  },
  {
    id: 'illu-01',
    title: 'Urban Oasis Vignettes',
    category: 'illustration',
    categoryLabel: 'Digital Illustration',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
    description: 'A series of high-contrast, flat illustrations detailing metropolitan spaces transformed by lush, overgrown jungle foliage.',
    year: '2025',
    featured: false,
    color: '#1E0F16'
  },
  {
    id: 'soc-01',
    title: 'Saturate Social Engine',
    category: 'social',
    categoryLabel: 'Social Media Design',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
    description: 'Custom micro-animations and swipeable visual carousels created for an independent creative agency, driving high engagement rates.',
    year: '2026',
    featured: false,
    color: '#FF5A5F'
  },
  {
    id: 'char-02',
    title: 'The Synthwave Squad',
    category: 'character',
    categoryLabel: 'Character Design',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'A set of four distinct mascot characters created for an electronic music collective, full of rich retro-inspired vector personality.',
    year: '2025',
    featured: false,
    color: '#F31365'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'faiz',
    name: 'Faiz',
    role: 'Creative Director',
    bio: 'I coordinate our creative chaos into structured experiences. Backed by a lifetime of art direction, I bridge illustration and motion design to ensure every project hits a pristine, cohesive visual mark.',
    image: '/images/faiz1.jpg', // Styled portrait reference
    specialties: ['Art Direction', 'Visual Strategy', 'Concept Art', 'AI Direction'],
    socials: {
      instagram: 'https://instagram.com/syamlab',
      behance: 'https://behance.net/syamlab',
      email: 'faizsyam06@gmail.com',
      website: 'https://github.com'
    }
  },
  {
    id: 'mudhhir',
    name: 'Mudhhir',
    role: 'Digital Illustrator',
    bio: 'Characters, scenes, and textured stories are my playground. I spend my days sketching line-perfect characters and building vibrant palettes that pull audiences directly into our custom visual worlds.',
    image: '/images/muzhir1.jpg',
    specialties: ['Character Design', 'Sleek Vector Art', 'Scene Painting', 'Texture Work'],
    socials: {
      instagram: 'https://instagram.com/syamlab',
      behance: 'https://behance.net/syamlab',
      dribbble: 'https://dribbble.com',
      email: 'mudhhir@syamlab.com'
    }
  },
  {
    id: 'irsyad',
    name: 'Irsyad',
    role: 'Motion Designer',
    bio: 'If it doesn’t move, I make it. From buttery-smooth micro-interactions to complex cinematic keyframes and rhythmic typography, I bring ideas to life across time and user actions.',
    image: '/images/irsyad1.jpg',
    specialties: ['Kinematic Typography', 'Logo Animation', 'SVG Motion', 'Interactive Layouts'],
    socials: {
      instagram: 'https://instagram.com/syamlab',
      behance: 'https://behance.net/syamlab',
      website: 'https://github.com',
      email: 'irsyad@syamlab.com'
    }
  }
];

export const STUDIO_ABOUT = {
  headline: "Vibrant visual craft engineered with precise digital motion.",
  introduction: "Formed by brothers Faiz, Mudhhir, and Irsyad, SYAM Creative Lab is a compact, highly responsive digital practices studio. We work across illustration, motion, character design, and the spaces between them. Clean when it needs to be. Expressive when it should be. Always deliberate.",
  foundingStory: "We grew up sharing sketchbooks, design tools, and frame-rate debates. Today, SYAM is the distillation of those conversations — combining Faiz's directorial eye, Mudhhir's vector craftsmanship, and Irsyad's motion mechanics. We operate with a collective brain and a shared obsession with perfect curves, satisfying easing, and deep cerise."
};
