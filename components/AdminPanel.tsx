import React, { useState } from 'react';
import { Project } from '../types';
import { Plus, Trash2, Wand2, LogOut, Save, X, Edit2, Image as ImageIcon, Upload } from 'lucide-react';
import { generateProjectDescription, generateProjectImage } from '../services/geminiService';

interface AdminPanelProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ projects, setProjects, onLogout }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'PC',
    technologies: [],
    imageUrl: ''
  });
  const [techInput, setTechInput] = useState('');

  const resetForm = () => {
    setNewProject({
        title: '',
        description: '',
        category: 'PC',
        technologies: [],
        imageUrl: ''
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSaveProject = () => {
    if (!newProject.title || !newProject.description) return;
    
    // Default image if none provided
    const finalImage = newProject.imageUrl || 'https://picsum.photos/800/600';

    if (editingId) {
        // Update existing
        setProjects(prev => prev.map(p => 
            p.id === editingId 
            ? { ...p, ...newProject, imageUrl: finalImage, id: editingId } as Project 
            : p
        ));
    } else {
        // Create new
        const project: Project = {
          id: Date.now().toString(),
          title: newProject.title,
          description: newProject.description,
          imageUrl: finalImage,
          category: newProject.category as any,
          technologies: newProject.technologies || [],
          link: newProject.link
        };
        setProjects(prev => [project, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (project: Project) => {
    setNewProject({
        title: project.title,
        description: project.description,
        category: project.category,
        technologies: project.technologies,
        imageUrl: project.imageUrl,
        link: project.link
    });
    setEditingId(project.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (editingId === id) resetForm();
  };

  const handleGenerateAI = async () => {
    if (!newProject.title) {
        alert("Please enter a title first.");
        return;
    }
    setLoadingAI(true);
    const desc = await generateProjectDescription(newProject.title, newProject.technologies?.join(', ') || techInput);
    setNewProject(prev => ({ ...prev, description: desc }));
    setLoadingAI(false);
  };

  const handleGenerateImage = async () => {
    if (!newProject.title) {
        alert("Please enter a title first.");
        return;
    }
    setLoadingImg(true);
    const prompt = `${newProject.title}. ${newProject.description || 'A video game scene'}`;
    const base64Image = await generateProjectImage(prompt);
    
    if (base64Image) {
        setNewProject(prev => ({ ...prev, imageUrl: base64Image }));
    } else {
        alert("Failed to generate image. Try again.");
    }
    setLoadingImg(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  return (
    <div className="pt-24 min-h-screen container mx-auto px-6 pb-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, Elyazid.</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Add Button */}
      {!isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all bg-white/5 hover:bg-white/10 mb-12"
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">Add New Project</span>
        </button>
      )}

      {/* Form (Add or Edit) */}
      {isAdding && (
        <div className="bg-card border border-white/10 rounded-xl p-8 mb-12 animate-fadeIn">
          <div className="flex justify-between items-start mb-6">
             <h2 className="text-xl font-bold">{editingId ? 'Edit Project' : 'New Project'}</h2>
             <button onClick={resetForm} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="Game Title"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                <select 
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value as any})}
                  className="w-full bg-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
                >
                  <option value="PC">PC</option>
                  <option value="Mobile">Mobile</option>
                  <option value="VR">VR</option>
                  <option value="Console">Console</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Project Image</label>
                
                <div className="space-y-3">
                    {/* Controls */}
                    <div className="flex gap-3">
                        {/* Upload Button */}
                        <label className="flex-1 cursor-pointer bg-dark border border-dashed border-white/20 rounded-lg p-3 text-center hover:border-primary hover:bg-white/5 transition-all group">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <div className="flex items-center justify-center gap-2 text-gray-400 group-hover:text-white">
                                <Upload className="w-4 h-4" />
                                <span className="text-sm">Upload File</span>
                            </div>
                        </label>

                        {/* AI Generate Button */}
                        <button 
                            onClick={handleGenerateImage}
                            disabled={loadingImg}
                            className="flex-1 bg-secondary/10 border border-secondary/20 rounded-lg p-3 hover:bg-secondary/20 transition-all flex items-center justify-center gap-2 text-secondary"
                        >
                             {loadingImg ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                             ) : (
                                <Wand2 className="w-4 h-4" />
                             )}
                            <span className="text-sm font-medium">Generate AI</span>
                        </button>
                    </div>

                    {/* Preview Area */}
                    {newProject.imageUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-white/10 group">
                            <img 
                                src={newProject.imageUrl} 
                                alt="Preview" 
                                className="w-full h-48 object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                    onClick={() => setNewProject({...newProject, imageUrl: ''})}
                                    className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                                    title="Remove Image"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 rounded-lg border border-white/5 bg-black/20 flex items-center justify-center text-gray-600">
                            <ImageIcon className="w-8 h-8 opacity-20" />
                        </div>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Technologies</label>
                <div className="flex gap-2 mb-2">
                   <input 
                    type="text" 
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTech()}
                    className="flex-1 bg-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
                    placeholder="e.g. Unity, C#"
                  />
                  <button onClick={addTech} className="px-4 bg-white/10 rounded hover:bg-white/20"><Plus /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProject.technologies?.map((t, i) => (
                    <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded cursor-pointer hover:bg-red-500/20 hover:text-red-500" onClick={() => setNewProject(prev => ({...prev, technologies: prev.technologies?.filter(tech => tech !== t)}))}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                  Description
                  <button 
                    onClick={handleGenerateAI}
                    disabled={loadingAI}
                    className="flex items-center gap-1 text-secondary text-xs hover:text-white transition-colors disabled:opacity-50"
                  >
                    <Wand2 className="w-3 h-3" />
                    {loadingAI ? 'Generating...' : 'Generate with AI'}
                  </button>
                </label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full h-64 bg-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none resize-none"
                  placeholder="Project details..."
                />
                {loadingAI && (
                    <div className="absolute inset-0 bg-dark/50 flex items-center justify-center rounded backdrop-blur-sm">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleSaveProject}
              className="bg-primary text-black font-bold px-6 py-3 rounded-lg hover:bg-cyan-300 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 bg-card border border-white/5 rounded-lg hover:border-white/20 transition-all">
            <div className="flex items-center gap-4">
              <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded" />
              <div>
                <h4 className="font-bold">{project.title}</h4>
                <p className="text-sm text-gray-500">{project.category} • {project.technologies.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <button 
                onClick={() => handleEdit(project)}
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-all"
                >
                <Edit2 className="w-5 h-5" />
                </button>
                <button 
                onClick={() => handleDelete(project.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                >
                <Trash2 className="w-5 h-5" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;