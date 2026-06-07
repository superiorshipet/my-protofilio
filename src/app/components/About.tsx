import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const journey = [
  { title: "Frontend Development", description: "HTML, CSS, JavaScript fundamentals" },
  { title: "React Development", description: "Component-based architecture & modern UI" },
  { title: "Backend Engineering", description: "Server-side logic & API design" },
  { title: "Databases", description: "SQL, data modeling & optimization" },
  { title: "Cloud Computing", description: "Scalable infrastructure & deployment" },
  { title: "Distributed Systems", description: "Microservices & system design" },
  { title: "AI Applications", description: "Integrating intelligent solutions" },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From frontend to distributed systems, here's how I've grown as an engineer
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-cyan-500" />

          {/* Journey Steps */}
          <div className="space-y-12">
            {journey.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="inline-block bg-gradient-to-br from-[#1E293B] to-[#312E81] border border-cyan-500/20 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </motion.div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    className="bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full p-3 shadow-lg shadow-cyan-500/30"
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Spacing for alternating layout */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
