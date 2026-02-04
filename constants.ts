import { Project, UserProfile } from './types';

export const USER_PROFILE: UserProfile = {
  name: 'Elyazid Azri',
  title: 'Senior Unity Game Developer',
  experienceYears: 7,
  about: 'Passionate game developer with over 7 years of experience specializing in Unity 3D/2D, C#, and gameplay mechanics. I build immersive worlds and smooth gameplay experiences.',
  skills: ['Unity 3D', 'C#', 'HLSL Shaders', 'Multiplayer (Photon/Mirror)', 'AI Programming', 'VR/AR', 'Performance Optimization']
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Cyber Racer',
    description: 'A high-speed infinite racer set in a procedural cyberpunk city. Features custom shaders and reactive audio systems.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    technologies: ['Unity', 'C#', 'Shader Graph'],
    category: 'PC'
  },
  {
    id: '2',
    title: 'Mystic Quest RPG',
    description: 'An open-world RPG with a complex inventory system and dynamic quest generation using scriptable objects.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    technologies: ['Unity', 'C#', 'Dialogue System'],
    category: 'Mobile'
  },
  {
    id: '3',
    title: 'Space Frontier VR',
    description: 'Immersive VR space exploration simulator designed for Oculus Quest 2. Optimized for mobile VR performance.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    technologies: ['Unity', 'XR Interaction Toolkit', 'Oculus SDK'],
    category: 'VR'
  }
];
