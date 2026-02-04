import React from 'react';
import { Project } from '../types';
import { ExternalLink, Play } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <section className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
          <div className="w-20 h-1 bg-primary mb-6" />
          <p className="text-gray-400 max-w-2xl text-lg">
            A collection of games, simulations, and interactive experiences developed using Unity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
            >
              {/* Image Container */}
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md rounded border border-white/10 text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">
                      #{tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-lg flex justify-center items-center gap-2 text-sm font-medium transition-colors">
                    <Play className="w-4 h-4 fill-current" />
                    Play Demo
                  </button>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
