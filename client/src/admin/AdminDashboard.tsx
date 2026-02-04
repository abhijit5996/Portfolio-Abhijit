import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Sparkles, Image, Trophy } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import ProjectManager from "./ProjectManager";
import SkillManager from "./SkillManager";
import GalleryManager from "./GalleryManager";
import AchievementManager from "./AchievementManager";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth || !JSON.parse(auth).isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const stats = [
    {
      label: "Projects",
      value: JSON.parse(localStorage.getItem("portfolio_projects") || "[]").length || 2,
      icon: FolderKanban,
      color: "text-primary",
    },
    {
      label: "Skills",
      value: JSON.parse(localStorage.getItem("portfolio_skills") || "[]").length || 7,
      icon: Sparkles,
      color: "text-secondary",
    },
    {
      label: "Gallery Items",
      value: JSON.parse(localStorage.getItem("portfolio_gallery") || "[]").length || 2,
      icon: Image,
      color: "text-emerald-400",
    },
    {
      label: "Achievements",
      value: JSON.parse(localStorage.getItem("portfolio_achievements") || "[]").length || 3,
      icon: Trophy,
      color: "text-yellow-400",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return <ProjectManager />;
      case "skills":
        return <SkillManager />;
      case "gallery":
        return <GalleryManager />;
      case "achievements":
        return <AchievementManager />;
      default:
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-heading">Welcome Back!</h1>
              <p className="text-muted-foreground mt-1">Manage your portfolio content from here</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold font-heading mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold font-heading mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Manage Projects", section: "projects", icon: FolderKanban },
                  { label: "Manage Skills", section: "skills", icon: Sparkles },
                  { label: "Manage Gallery", section: "gallery", icon: Image },
                  { label: "Manage Achievements", section: "achievements", icon: Trophy },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.section}
                      onClick={() => setActiveSection(action.section)}
                      className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <p className="font-medium text-sm">{action.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold font-heading mb-2">How It Works</h2>
              <p className="text-muted-foreground text-sm">
                All changes you make here are saved to your browser's local storage and will automatically
                reflect on your portfolio. No backend required!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
