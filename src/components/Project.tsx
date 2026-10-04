import React, { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const ProjectDetails = lazy(() => import("./ProjectDetails"));

interface TagItem {
  id: number;
  name: string;
}

interface ProjectProps {
  title: string;
  description: string;
  href?: string;
  image: string;
  tags: TagItem[];
  setPreview: (img: string | null) => void;
}

const Project = ({
  title,
  description,
  href,
  image,
  tags,
  setPreview,
}: ProjectProps) => {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl text-neutral-900 dark:text-white font-semibold">{title}</p>
          <div className="flex text-[12px] md:text-sm gap-5 mt-2 text-amber-700 dark:text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation text-neutral-900 dark:text-white font-medium"
        >
          {t("projects.readMore")}
          <img
            src="assets/arrow-right.svg"
            width={20}
            height={20}
            className="w-5 transition-transform duration-300 rtl:rotate-180 dark:invert-0 invert"
            alt="arrow"
          />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <Suspense fallback={null}>
          <ProjectDetails
            title={title}
            description={description}
            image={image}
            tags={tags}
            href={href}
            closeModal={() => setIsHidden(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default Project;
