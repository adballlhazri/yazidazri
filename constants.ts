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
    title: 'R-OVER RACE',
    description: 'racing game',
    imageUrl: '/images/rover-race.webp',
    technologies: ['Unity', 'C#', 'Shader Graph'],
    category: 'PC',
    link: 'https://play.google.com/store/apps/details?id=com.fdetak.driftx',
    status: 'available'
  },
  {
    id: '2',
    title: 'UNKNOWN SHOOTER',
    description: 'SHOOTER GAME',
    imageUrl: '/images/Screenshot_20220516-180135.png',
    technologies: ['Unity', 'C#'],
    category: 'PC',
    link: 'https://www.mediafire.com/file/7b224m5hs9so6ct/unknown_shooter_beta.zip/file',
    status: 'available'
  },
  {
    id: '3',
    title: 'FORZ DRIVE',
    description: '',
    imageUrl: '/images/Screenshot_20230513-205132.png',
    technologies: ['Unity', 'C#'],
    category: 'PC',
    link: 'https://www.mediafire.com/file/r2i6ekyjwgby42d/forzspeed.apk/file',
    status: 'available'
  },
    {
    id: '4',
    title: 'BATTEL ROYALE',
    description: '',
    imageUrl: '/images/Screenshot_20220616-221242.png',
    technologies: ['Unity', 'C#'],
    category: 'PC',
    link: 'https://example.com/rov11er-race',
    status: 'coming-soon'
  },
      {
    id: '5',
    title: 'powerfire',
    description: '',
    imageUrl: '/images/Capture.png',
    technologies: ['Unity', 'C#'],
    category: 'PC',
    link: 'https://yazid-azri.itch.io/powerfire',
    status: 'available'
  },
      {
    id: '6',
    title: 'ball',
    description: '',
    imageUrl: '/images/Screenshot_20230506-170741.png',
    technologies: ['Unity', 'C#'],
    category: 'PC',
    link: 'https://www.mediafire.com/file/g02wih2dhgu8kfo/ball.apk/file',
    status: 'available'
  },
       {
    id: '7',
    title: 'forz speed',
    description: '',
    imageUrl: '/images/Screenshot_20230428-184252.png',
    technologies: ['Unity', 'C#'],
    category: 'PC',
    link: '',
    status: 'coming-soon'
  },
];
