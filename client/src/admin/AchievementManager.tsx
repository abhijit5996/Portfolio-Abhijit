import { useState } from "react";
import { Plus, Pencil, Trash2, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Achievement } from "./types";

const defaultAchievements: Achievement[] = [
  { id: "1", text: "Won 1st place in University Hackathon 2024" },
  { id: "2", text: "Completed 50+ projects on various platforms" },
  { id: "3", text: "Contributed to 10+ open-source projects" },
];

const AchievementManager = () => {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>("portfolio_achievements", defaultAchievements);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [text, setText] = useState("");

  const resetForm = () => {
    setText("");
    setEditingAchievement(null);
    setIsEditing(false);
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setText(achievement.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    const achievementData: Achievement = {
      id: editingAchievement?.id || Date.now().toString(),
      text: text.trim(),
    };

    if (editingAchievement) {
      setAchievements(achievements.map((a) => (a.id === editingAchievement.id ? achievementData : a)));
    } else {
      setAchievements([...achievements, achievementData]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading">Achievement Management</h2>
          <p className="text-muted-foreground">Manage your achievements and milestones</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90 glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {/* Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-heading">
                {editingAchievement ? "Edit Achievement" : "Add New Achievement"}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Achievement</label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe your achievement..."
                  className="mt-1 bg-muted"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                  {editingAchievement ? "Update" : "Add Achievement"}
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements List */}
      <div className="glass rounded-xl p-5">
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-foreground">{achievement.text}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="p-2 hover:bg-muted rounded-lg text-primary"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(achievement.id)}
                  className="p-2 hover:bg-muted rounded-lg text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {achievements.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No achievements yet. Click "Add Achievement" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementManager;
