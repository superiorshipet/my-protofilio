import { useState, useRef } from "react";
import Project from "../components/Project";
import { getTranslatedProjects } from "../constants";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import Pagination from "../components/ui/Pagination";

const ITEMS_PER_PAGE = 4;

const Projects = () => {
  const { t } = useTranslation();
  const projects = getTranslatedProjects(t);
  const sectionRef = useRef<HTMLElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [preview, setPreview] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setPreview(null);
    setCurrentPage(page);
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-heading">{t("projects.title")}</h2>
          <p className="subtext mt-2">
            {t("projects.pagination.pageOf", {
              current: currentPage,
              total: totalPages,
            })}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-8 h-[1px] w-full" />

      {/* Animated Projects List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="divide-y-0"
        >
          {currentProjects.map((project) => (
            <Project key={project.id} {...project} setPreview={setPreview} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modern Interactive Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={projects.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      {/* Image hover cursor preview */}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover md:h-56 h-28 rounded-lg shadow-lg pointer-events-none w-40 md:w-80 border border-white/10"
          src={preview}
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </section>
  );
};

export default Projects;
