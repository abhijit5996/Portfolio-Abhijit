export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  github?: string;
  live: string;
  category: string;
  image?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Memory {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  location?: string;
}

export interface Achievement {
  id: string;
  text: string;
}

export interface AdminUser {
  isLoggedIn: boolean;
}
