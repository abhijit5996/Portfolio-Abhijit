import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  details: string;
}

const education: EducationItem[] = [
  {
    degree: "BTech in CSE",
    institution: "Adamas University, Hooghly",
    duration: "2023 - 2027",
    details: "CGPA: 7.98/10",
  },
  {
    degree: "Higher Secondary",
    institution: "Saharda Kalipada Vidyapith H.S. School, Purulia",
    duration: "2020 - 2022",
    details: "Percentage: 79.4%",
  },
  {
    degree: "Secondary",
    institution: "Saharda Kalipada Vidyapith H.S. School, Joyrambati",
    duration: "2014 - 2020",
    details: "Percentage: 89%",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic journey and achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-emerald-400 to-secondary hidden md:block shadow-[0_0_10px_hsl(160_84%_39%/0.5)]" />

          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    className={`glass p-6 rounded-xl hover:border-emerald-400 hover:shadow-[0_0_15px_hsl(160_84%_39%/0.3)] transition-all duration-300 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-2xl font-bold text-gradient mb-2">{item.degree}</h3>
                    <p className="text-lg font-medium text-foreground mb-2">{item.institution}</p>
                    <p className="text-sm text-muted-foreground mb-3">{item.duration}</p>
                    <p className="text-primary font-semibold">{item.details}</p>
                  </motion.div>
                </div>

                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-emerald-400 to-secondary flex items-center justify-center glow-intense">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
