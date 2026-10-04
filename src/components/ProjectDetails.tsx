import { motion } from "motion/react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useTranslation } from "react-i18next";

interface TagItem {
  id: number;
  name: string;
}

interface ProjectDetailsProps {
  title: string;
  description: string;
  image: string;
  tags?: TagItem[];
  href?: string;
  closeModal: () => void;
}

const ProjectDetails = ({
  title,
  description,
  image,
  tags,
  href,
  closeModal,
}: ProjectDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="  "
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute z-30 p-2 rounded-sm md:top-5 top-10 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" width={24} height={24} className="w-6 h-6" alt="close" />
        </button>
        <CardContainer className="inter-var mx-2 md:mx-0 ">
          <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-white"
            >
              {title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className=" text-sm max-w-sm mt-2 text-neutral-300"
            >
              {description}
            </CardItem>
            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="w-full mt-4"
            >
              <img
                src={image}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-10">
              <CardItem translateZ={20} translateX={-40}>
                <div className="flex flex-wrap gap-2 max-w-[180px]">
                  {tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </CardItem>
              <CardItem
                translateZ={20}
                translateX={40}
                as="a"
                className="px-4 py-2 rounded-xl text-xs font-normal text-white flex items-center gap-1"
                href={href}
                target="_blank"
              >
                {t("projects.tryNow")} <span className="inline-block transition-transform duration-300 rtl:rotate-180">&rarr;</span>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
