import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 4,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (totalPages <= 1) return null;

  // Generate page numbers with ellipses for a modern look
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-12 select-none">
      {/* Page Info summary badge */}
      {totalItems !== undefined && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-neutral-400">
          <span className="inline-block w-2 h-2 rounded-full bg-sand animate-pulse" />
          <span>
            {t("projects.pagination.showingProjects", {
              start: startItem,
              end: endItem,
              total: totalItems,
            })}
          </span>
        </div>
      )}

      {/* Main modern pagination controls container */}
      <nav
        role="navigation"
        aria-label="Pagination"
        className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40"
      >
        {/* First Page Button */}
        <button
          type="button"
          onClick={handleFirst}
          disabled={currentPage === 1}
          aria-label="First page"
          className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentPage === 1
              ? "opacity-30 cursor-not-allowed text-neutral-600"
              : "text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95"
          }`}
        >
          {isRTL ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>

        {/* Prev Page Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
            currentPage === 1
              ? "opacity-30 cursor-not-allowed text-neutral-600"
              : "text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95"
          }`}
        >
          {isRTL ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          <span className="hidden md:inline">{t("projects.pagination.previous")}</span>
        </button>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-white/10 mx-0.5" />

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-sm text-neutral-500 font-mono tracking-widest"
                >
                  •••
                </span>
              );
            }

            const pageNum = Number(page);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? "page" : undefined}
                className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 active:scale-95"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePaginationIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sand/90 via-sand to-sand/80 shadow-[0_0_20px_rgba(214,153,92,0.45)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive ? "text-primary font-bold" : ""
                  }`}
                >
                  {pageNum}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-white/10 mx-0.5" />

        {/* Next Page Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
            currentPage === totalPages
              ? "opacity-30 cursor-not-allowed text-neutral-600"
              : "text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95"
          }`}
        >
          <span className="hidden md:inline">{t("projects.pagination.next")}</span>
          {isRTL ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Last Page Button */}
        <button
          type="button"
          onClick={handleLast}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentPage === totalPages
              ? "opacity-30 cursor-not-allowed text-neutral-600"
              : "text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95"
          }`}
        >
          {isRTL ? (
            <ChevronsLeft className="w-4 h-4" />
          ) : (
            <ChevronsRight className="w-4 h-4" />
          )}
        </button>
      </nav>
    </div>
  );
};

export default Pagination;