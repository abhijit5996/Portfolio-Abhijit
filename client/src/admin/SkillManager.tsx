import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Skill } from "./types";

const defaultSkills: Skill[] = [
  { id: "1", name: "JavaScript", level: 82, category: "Languages" },
  { id: "2", name: "Java", level: 80, category: "Languages" },
  { id: "3", name: "React", level: 80, category: "Frontend" },
  { id: "4", name: "Tailwind", level: 85, category: "Frontend" },
  { id: "5", name: "Node.js", level: 75, category: "Backend" },
  { id: "6", name: "MongoDB", level: 75, category: "Database" },
  { id: "7", name: "Git", level: 80, category: "Tools" },
];

const categories = ["Languages", "Frontend", "Backend", "Database", "Tools"];

const SkillManager = () => {
  const [skills, setSkills] = useLocalStorage<Skill[]>("portfolio_skills", defaultSkills);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    category: "Languages",
  });

  const resetForm = () => {
    setFormData({ name: "", level: 50, category: "Languages" });
    setEditingSkill(null);
    setIsEditing(false);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const skillData: Skill = {
      id: editingSkill?.id || Date.now().toString(),
      name: formData.name,
      level: formData.level,
      category: formData.category,
    };

    if (editingSkill) {
      setSkills(skills.map((s) => (s.id === editingSkill.id ? skillData : s)));
    } else {
      setSkills([...skills, skillData]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const groupedSkills = categories.map((cat) => ({
    category: cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading">Skill Management</h2>
          <p className="text-muted-foreground">Manage your skills and proficiency levels</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90 glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-heading">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Skill Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., React"
                  className="mt-1 bg-muted"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 w-full h-10 px-3 bg-muted rounded-md border border-input text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Proficiency Level: {formData.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="mt-2 w-full accent-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills by Category */}
      <div className="space-y-6">
        {groupedSkills.map(
          ({ category, skills: categorySkills }) =>
            categorySkills.length > 0 && (
              <div key={category} className="glass rounded-xl p-5">
                <h3 className="font-bold font-heading text-lg mb-4 text-primary">{category}</h3>
                <div className="grid gap-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-primary font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(skill)} className="p-2 hover:bg-muted rounded-lg text-primary">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-2 hover:bg-muted rounded-lg text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}

        {skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No skills yet. Click "Add Skill" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillManager;
