import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    // Prevent scrolling during loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  const renderActiveSection = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    switch (activeTab) {
      case "home":
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Hero />
          </motion.div>
        );
      case "skills":
        return (
          <motion.div
            key="skills"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Skills />
          </motion.div>
        );
      case "projects":
        return (
          <motion.div
            key="projects"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Projects />
          </motion.div>
        );
      case "gallery":
        return (
          <motion.div
            key="gallery"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Gallery />
          </motion.div>
        );
      case "education":
        return (
          <motion.div
            key="education"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Education />
          </motion.div>
        );
      case "contact":
        return (
          <motion.div
            key="contact"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Contact />
          </motion.div>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative">
          <ParticleBackground />
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="relative z-10 pt-20 min-h-screen">
            <AnimatePresence mode="wait">
              {renderActiveSection()}
            </AnimatePresence>
          </main>
          <ScrollToTop />
          
          {/* Footer */}
          <footer className="relative z-10 py-8 border-t border-primary/20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">
                © 2025 Abhijit Das. Built with ❤️ and React
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Index;
