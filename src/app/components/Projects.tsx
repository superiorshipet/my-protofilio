import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: "ATS Job Portal",
    description: "A comprehensive job platform connecting talented developers with opportunities. Built with modern tech stack and real-time features.",
    tech: ["React", "PHP", "PostgreSQL", "WebSocket"],
    gradient: "from-cyan-500 to-blue-600",
    githubUrl: "https://github.com/superiorshipet/ATS-website",
  },
  {
    title: "SUPVEND",
    description: "Premium e-commerce solution with advanced inventory management and seamless checkout experience and wallet system designing .",
    tech: ["node.js", "postgreSQL", "React", "Stripe", "redis"],
    gradient: "from-indigo-500 to-purple-600",
    githubUrl: "https://github.com/superiorshipet/SUPVEND",
  },
  {
    title: " discover-madina ",
    description: "A tourism website for elmadina which had a chatbot and alot of other features which makes him more like google maps but whith my style .",
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    gradient: "from-purple-500 to-pink-600",
    githubUrl: "https://github.com/superiorshipet/discover-madina",
    demoUrl: "https://discover-madina.vercel.app/"
  },
  {
    title:"pharmacy management system",
    description:"A comprehensive pharmacy management system built with C# and ASP.NET Core, featuring inventory management, sales tracking, and customer management.",
    tech:["C#", "ASP.NET Core", "SQL Server", "Entity Framework"],
    gradient:"from-pink-500 to-cyan-500",
    githubUrl:"https://github.com/superiorshipet/pharmacy",
  },
  {title:"Discover",
    description:"A tourism website for saudi arabia all which had a integration with tickets website atrraction commiting and plans for your vacation.",
    tech:["React", "asp.net", "PostgreSQL", "WebSocket","redis"],
    gradient:"from-pink-500 to-cyan-500",
    githubUrl:"https://github.com/superiorshipet/----------------------",
    demoUrl:"https://discover-saudi.vercel.app/"
  },
  {title:"Nour-dental",
    description:"A comprehensive dental clinic ecommerce for selling dental equipments .",
    tech:["C#", "ASP.NET Core", "postgreSQL", "Entity Framework","redis","hostinger"],
    gradient:"from-pink-500 to-cyan-500",
    demoUrl:"www.elnordental.shop"
  },
  {title:"podcasty",
    description:"A podcast website with a lot of features like creating your own podcast and sharing it with your friends and also you can listen to other podcasts.",
    tech:["React", "asp.net", "sqlsever", "WebSocket"],
    gradient:"from-pink-500 to-cyan-500",
    githubUrl:"https://github.com/superiorshipet/podcasty"
  },
  {title:"E-commerce for e-products",
    description:"A comprehensive e-commerce platform for digital products, featuring secure payment processing, user-friendly interface, and robust inventory management.",
    tech:["React", "asp.net", "PostgreSQL"],
    gradient:"from-pink-500 to-cyan-500",
    githubUrl:"https://github.com/superiorshipet/E-commerce-for-E-products"
  },
  {title:"Study-mate",
    description:"A comprehensive study platform for students, featuring interactive lessons, quizzes, and progress tracking to enhance learning outcomes.",
    tech:["React", "asp.net", "PostgreSQL", "WebSocket"],
    gradient:"from-pink-500 to-cyan-500",
    githubUrl:"github.com/superiorshipet/study-mate"
  }
];

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Building solutions that make a difference
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -12,
                rotateX: hoveredIndex === index ? 5 : 0,
                rotateY: hoveredIndex === index ? 5 : 0,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group relative"
            >
              <div className="h-full bg-gradient-to-br from-[#1E293B] to-[#312E81] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    {project.demoUrl && (
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white"
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
