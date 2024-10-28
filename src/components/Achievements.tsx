import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star } from 'lucide-react';

const achievements = [
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Hackathon Champion",
    description: "Won first place in the National Level Hackathon for developing an innovative AI-powered healthcare solution"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Research Publication",
    description: "Published a research paper on 'Efficient Deep Learning Models for Edge Devices' in IEEE conference"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Academic Excellence",
    description: "Maintained a consistent CGPA of 8.0 throughout the academic years, ranking in the top 5% of the class"
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Coding Competition",
    description: "Secured first place in the state-level competitive programming contest with over 500 participants"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Project Excellence",
    description: "Best Project Award for developing an AI-powered sign language translator that helps differently-abled people"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Leadership Recognition",
    description: "Led the college technical club and organized successful tech events with 1000+ participants"
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-black/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 text-gradient text-center">Achievements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{achievement.title}</h3>
              <p className="text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;