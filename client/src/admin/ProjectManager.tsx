import { useState } from "react";
import { Plus, Pencil, Trash2, X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Project } from "./types";

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "FitEats",
    description: "Food Ordering & Recommendation Platform",
    fullDescription: "Developed a comprehensive food ordering website with personalized health-based recommendations.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    live: "https://nutriorder.vercel.app/",
    category: "Web Development",
  },
  {
    id: "2",
    title: "TransitHub",
    description: "Last-Mile Transit Solution",
    fullDescription: "A modern web application designed to simplify last-mile transit.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://transit-hub.vercel.app/",
    category: "Web Development",
  },
];

const ProjectManager = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>("portfolio_projects", defaultProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    technologies: "",
    github: "",
    live: "",
    category: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      technologies: "",
      github: "",
      live: "",
      category: "",
      image: "",
    });
    setEditingProject(null);
    setIsEditing(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      technologies: project.technologies.join(", "),
      github: project.github || "",
      live: project.live,
      category: project.category,
      image: project.image || "",
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      github: formData.github || undefined,
      live: formData.live,
      category: formData.category,
      image: formData.image || undefined,
    };

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? projectData : p)));
    } else {
      setProjects([...projects, projectData]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading">Project Management</h2>
          <p className="text-muted-foreground">Add, edit, or remove projects from your portfolio</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90 glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-heading">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project title"
                    className="mt-1 bg-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Web Development"
                    className="mt-1 bg-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Short Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description"
                  className="mt-1 bg-muted"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Full Description</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed project description"
                  className="mt-1 w-full h-24 px-3 py-2 bg-muted rounded-md border border-input text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Technologies (comma-separated)</label>
                <Input
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  className="mt-1 bg-muted"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Live Demo URL</label>
                  <Input
                    value={formData.live}
                    onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                    placeholder="https://..."
                    className="mt-1 bg-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub URL (optional)</label>
                  <Input
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="mt-1 bg-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Image URL (optional)</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="mt-1 bg-muted"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                  {editingProject ? "Update Project" : "Add Project"}
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-xl p-5 flex items-start gap-4">
            {project.image && (
              <img src={project.image} alt={project.title} className="w-24 h-16 object-cover rounded-lg" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-heading text-lg">{project.title}</h3>
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{project.description}</p>
              <div className="flex gap-2 mt-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-muted text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-lg">
                  <Github className="w-4 h-4" />
                </a>
              )}
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-lg">
                <ExternalLink className="w-4 h-4" />
              </a>
              <button onClick={() => handleEdit(project)} className="p-2 hover:bg-muted rounded-lg text-primary">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-muted rounded-lg text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects yet. Click "Add Project" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
