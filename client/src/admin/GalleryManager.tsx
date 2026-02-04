import { useState } from "react";
import { Plus, Trash2, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Memory } from "./types";

const defaultMemories: Memory[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    title: "College Fest 2024",
    description: "An unforgettable cultural event with friends and amazing performances.",
    date: "March 2024",
    location: "University Campus",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    title: "Hackathon Victory",
    description: "24 hours of coding, teamwork, and innovation that led to our first win!",
    date: "January 2024",
    location: "Tech Hub",
  },
];

const GalleryManager = () => {
  const [memories, setMemories] = useLocalStorage<Memory[]>("portfolio_gallery", defaultMemories);
  const [isAdding, setIsAdding] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const resetForm = () => {
    setFormData({ image: "", title: "", description: "", date: "", location: "" });
    setIsAdding(false);
  };

  const handleSave = () => {
    const memoryData: Memory = {
      id: Date.now().toString(),
      image: formData.image,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location || undefined,
    };

    setMemories([...memories, memoryData]);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading">Gallery Management</h2>
          <p className="text-muted-foreground">Manage your memories and photos</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary/90 glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Memory
        </Button>
      </div>

      {/* Form Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-heading">Add New Memory</h3>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="mt-1 bg-muted"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Memory title"
                  className="mt-1 bg-muted"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description"
                  className="mt-1 w-full h-20 px-3 py-2 bg-muted rounded-md border border-input text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., March 2024"
                    className="mt-1 bg-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location (optional)</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., University"
                    className="mt-1 bg-muted"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                  Add Memory
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-muted hover:bg-muted/80"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage} alt="Preview" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memories.map((memory) => (
          <div key={memory.id} className="glass rounded-xl overflow-hidden group relative">
            <img src={memory.image} alt={memory.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h4 className="font-medium text-sm truncate">{memory.title}</h4>
              <p className="text-xs text-muted-foreground">{memory.date}</p>
            </div>
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => setPreviewImage(memory.image)}
                className="p-2 bg-primary rounded-lg hover:bg-primary/90"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(memory.id)}
                className="p-2 bg-destructive rounded-lg hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {memories.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No memories yet. Click "Add Memory" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
