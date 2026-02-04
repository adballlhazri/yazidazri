export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: 'Mobile' | 'PC' | 'VR' | 'Console';
  link: string;
  status: 'available' | 'coming-soon';
}

export interface UserProfile {
  name: string;
  title: string;
  experienceYears: number;
  about: string;
  skills: string[];
}

export type ViewState = 'home' | 'portfolio' | 'admin';

export interface AdminContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
