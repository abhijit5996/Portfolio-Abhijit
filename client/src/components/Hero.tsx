import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Button } from "./ui/button";
import { Download, Mail } from "lucide-react";
import profileImage from "@/assets/edited-photo.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-primary text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello! 👋
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I'm <span className="text-gradient-hero">Abhijit Das</span>
            </motion.h1>

            <div className="text-2xl md:text-3xl font-light text-muted-foreground">
              <span>I am a </span>
              <span className="text-primary font-medium">
                <Typewriter
                  options={{
                    strings: [
                      "Web Developer",
                      "Frontend Developer",
                      "UI Enthusiast",
                      "Creative Designer",
                      "Problem Solver",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I am a passionate Computer Science student and web developer with a strong foundation in Java, MERN stack, and
              problem-solving. I enjoy creating clean, responsive websites and exploring AI/ML technologies. Dedicated to
              continuous learning, I strive to build impactful digital experiences that blend creativity with functionality.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow group hover:shadow-[0_0_25px_hsl(160_84%_39%/0.6)] transition-all duration-300"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce"/>
                Resume
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_25px_hsl(160_84%_39%/0.6)] transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Hire Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-sm mx-auto">
              <motion.div
                className="aspect-square rounded-full glass border-4 border-primary/30 overflow-hidden animate-float"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(59, 130, 246, 0.3)",
                    "0 0 80px rgba(59, 130, 246, 0.6)",
                    "0 0 40px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img 
                  src={profileImage} 
                  alt="Abhijit Das" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Orbs */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 -right-20 w-40 h-40 rounded-full blur-3xl"
                style={{ background: "hsl(160 84% 39% / 0.15)" }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
