import { useState, useEffect } from "react";
import { Code2, Palette, Database, Wrench } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "JavaScript", level: 82, category: "Languages" },
  { name: "Java", level: 80, category: "Languages" },
  { name: "C", level: 70, category: "Languages" },
  { name: "C++", level: 75, category: "Languages" },
  { name: "HTML", level: 90, category: "Frontend" },
  { name: "CSS", level: 85, category: "Frontend" },
  { name: "React", level: 80, category: "Frontend" },
  { name: "Tailwind", level: 85, category: "Frontend" },
  { name: "Bootstrap", level: 80, category: "Frontend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Express", level: 70, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "Git", level: 80, category: "Tools" },
  { name: "GitHub", level: 85, category: "Tools" },
];

const categories = [
  { name: "Languages", icon: Code2 },
  { name: "Frontend", icon: Palette },
  { name: "Backend", icon: Database },
  { name: "Database", icon: Database },
  { name: "Tools", icon: Wrench },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Languages");
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: boolean }>({});

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  // Trigger animation when category changes or component mounts
  useEffect(() => {
    setAnimatedSkills({});
    const timer = setTimeout(() => {
      const newAnimated: { [key: string]: boolean } = {};
      filteredSkills.forEach((skill) => {
        newAnimated[skill.name] = true;
      });
      setAnimatedSkills(newAnimated);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground glow"
                    : "glass hover:border-primary"
                }`}
              >
                <Icon className="inline-block mr-2 h-5 w-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass p-6 rounded-xl hover:border-emerald-400 hover:shadow-[0_0_20px_hsl(160_84%_39%/0.4)] transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold font-heading">{skill.name}</h3>
                <span className="text-sm font-bold text-primary">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="skill-progress-track">
                <div
                  className="skill-progress-bar"
                  style={{
                    width: animatedSkills[skill.name] ? `${skill.level}%` : "0%",
                    transitionDelay: `${index * 50}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
