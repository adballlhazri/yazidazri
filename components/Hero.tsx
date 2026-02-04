import React from 'react';
import { ArrowRight, Code2, Layers, Cpu, Gamepad2 } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroProps {
  profile: UserProfile;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ profile, onCtaClick }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for Freelance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            CRAFTING <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              DIGITAL REALITIES
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Hi, I'm <span className="text-white font-semibold">{profile.name}</span>. 
            {profile.experienceYears} years of experience in Unity Development. 
            I blend technical architecture with creative gameplay to build unforgettable experiences.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={onCtaClick}
              className="bg-primary text-dark font-bold px-8 py-4 rounded-lg hover:bg-cyan-300 transition-all flex items-center gap-2 group"
            >
              View Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-lg border border-white/20 hover:bg-white/5 transition-all font-medium">
              Contact Me
            </button>
          </div>

          <div className="flex gap-8 pt-8 border-t border-white/10 text-gray-500">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>Clean Code</span>
            </div>
             <div className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              <span>Scalable Arch</span>
            </div>
             <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              <span>Optimization</span>
            </div>
          </div>
        </div>

        {/* Visual Element / "3D" Representation */}
        <div className="relative hidden md:flex justify-center items-center">
            <div className="relative w-96 h-96 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl border border-white/10 flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-700 shadow-2xl glass">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
                <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary/20 rounded-xl mx-auto flex items-center justify-center animate-float">
                        <Gamepad2 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-display">Unity Expert</h3>
                    <p className="text-sm text-gray-400 px-8">Shader Graph • ECS • Netcode</p>
                </div>
            </div>
             <div className="absolute -bottom-10 -left-10 w-64 h-40 bg-dark/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 transform -rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl">
                 <div className="flex justify-between items-center mb-4">
                     <span className="text-xs text-gray-400">Lines of Code</span>
                     <span className="text-green-400 text-xs">+25%</span>
                 </div>
                 <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full w-[70%] bg-secondary" />
                 </div>
                 <div className="mt-4 flex justify-between">
                     <div className="text-2xl font-bold">1.2M+</div>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;