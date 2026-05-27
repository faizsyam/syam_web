export interface PortfolioItem {
  id: string;
  title: string;
  category: 'illustration' | 'motion' | 'logo' | 'typography' | 'character' | 'ai-art' | 'social';
  categoryLabel: string;
  image: string;
  description: string;
  year: string;
  featured?: boolean;
  link?: string;
  color: string; // Dynamic coloring for background/accents
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  socials: {
    instagram?: string;
    behance?: string;
    dribbble?: string;
    email?: string;
    website?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
