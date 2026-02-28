import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import fiteatsImage from "@/assets/fiteats.png";
import transithubImage from "@/assets/transithub.png";
import khetSeGharTakImage from "@/assets/khet-se-ghar-tak.png";
import optimalwayImage from "@/assets/optimalway.png";
import examprepImage from "@/assets/examprep.png";

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  github?: string;
  live: string;
  category: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "FitEats",
    description: "Food Ordering & Recommendation Platform",
    fullDescription:
      "Developed a comprehensive food ordering website with personalized health-based recommendations. Features include user authentication, real-time order tracking, and AI-powered meal suggestions based on dietary preferences.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    live: "https://nutriorder.vercel.app/",
    category: "Web Development",
    image: fiteatsImage,
  },
  {
    title: "TransitHub",
    description: "Last-Mile Transit Solution",
    fullDescription:
      "TransitHub is a modern, sleek, and responsive web application designed to simplify last-mile transit. It features a dark, elegant UI with bold yellow accents, intuitive navigation, and smooth animations that reflect the fast-paced energy of urban mobility. The site delivers a premium, user-focused experience — combining clean typography, powerful CTAs, and seamless usability to help users plan their journeys from metro to doorstep effortlessly.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://transit-hub.vercel.app/",
    category: "Web Development",
    image: transithubImage,
  },
  {
    title: "OptimalWay",
    description: "Travelling Salesman Problem Solver",
    fullDescription:
      "Interactive visualization of multiple metaheuristic TSP algorithms. Compare different approaches including Genetic Algorithm, Simulated Annealing, and Ant Colony Optimization with real-time performance metrics.",
    technologies: ["React", "JavaScript", "Algorithm Visualization"],
    live: "https://optimal-way.vercel.app/",
    category: "AI/ML",
    image: optimalwayImage,
  },
  {
    title: "Khet-Se-Ghar-Tak",
    description: "Farm-to-Table E-commerce Platform",
    fullDescription:
      "Khet-Se-Ghar-Tak is a full-stack e-commerce platform designed to eliminate middlemen and directly connect farmers with customers. Built with Lovable, it enables users to buy fresh, organic, and locally sourced farm products straight from trusted farmers. The platform offers seamless product browsing, secure authentication, and a user-friendly interface—making farm-to-table shopping simple, transparent, and sustainable.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lovable Cloud"],
    live: "https://khet-se-ghar-tak.lovable.app",
    category: "E-commerce",
    image: khetSeGharTakImage,
  },
  {
    title: "ExamPrep",
    description: "Competitive Exam Preparation Platform",
    fullDescription:
      "ExamPrep is a modern frontend web platform built to help students prepare for competitive exams efficiently. It features an elegant and responsive UI that offers access to study materials, mock tests, live classes, and AI-driven learning tools. Designed with a focus on usability and aesthetics, the platform provides an engaging experience for learners. It showcases sections like leaderboards, daily practice modules, and community features—making it an ideal space for collaborative learning and progress tracking.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://examprep.lovable.app",
    category: "Education",
    image: examprepImage,
  },
];

const Projects = () => {
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my technical skills and creative problem-solving
          </p>
        </div>

        <div className="relative px-4">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flip-card min-w-[320px] h-[420px] cursor-pointer snap-start flex-shrink-0"
                onClick={() => toggleFlip(index)}
              >
                <div className={`flip-card-inner ${flipped[index] ? "flipped" : ""}`}>
                  {/* Front */}
                  <div className="flip-card-front glass rounded-xl overflow-hidden flex flex-col">
                    {project.image && (
                      <div className="h-40 overflow-hidden flex-shrink-0">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1 min-h-0">
                      <div className="flex-1 overflow-auto">
                        <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mb-3">
                          {project.category}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gradient font-heading">{project.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-center text-xs text-muted-foreground mt-3 pt-3 border-t border-border flex-shrink-0">
                        Click to flip →
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back glass rounded-xl p-5 flex flex-col">
                    <div className="flex-1 overflow-auto min-h-0">
                      <h3 className="text-lg font-bold mb-3 text-gradient font-heading">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.fullDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 space-y-3">
                      <div className="flex gap-2">
                        {project.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-primary hover:bg-primary hover:text-primary-foreground text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.github, "_blank");
                            }}
                          >
                            <Github className="mr-1 h-3 w-3" />
                            GitHub
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90 glow text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.live, "_blank");
                          }}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Live Demo
                        </Button>
                      </div>
                      <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
                        ← Click to flip back
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
