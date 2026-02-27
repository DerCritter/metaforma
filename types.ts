export interface Project {
  id: string;
  title: string;
  category: 'architecture';
  description: string;
  imageUrl: string;
  images?: string[];
  tags: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  location?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppSection {
  HOME = 'home',
  ARCHITECTURE = 'architecture',
  AI_CONSULTANT = 'consultant',
  CONTACT_FORM = 'contact',
  SERVICES = 'services',
  PHILOSOPHY = 'philosophy'
}