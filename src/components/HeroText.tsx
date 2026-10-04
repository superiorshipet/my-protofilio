import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const HeroText = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const words = [t("hero.secure"), t("hero.modern"), t("hero.scalable")];

  const variants = {
    hidden: { opacity: 0, x: isArabic ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`z-10 mt-20 text-center md:mt-40 rounded-3xl bg-clip-text ${
        isArabic ? "md:text-right" : "md:text-left"
      }`}
    >
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium text-white drop-shadow-md"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t("hero.greeting")}
        </motion.h1>
        <div className={`flex flex-col ${isArabic ? "items-start" : "items-start"}`}>
          <motion.p
            className="text-5xl font-medium text-white drop-shadow-md max-w-2xl py-3"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {t("hero.role")}
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white drop-shadow-lg text-7xl md:text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium pt-3 text-white drop-shadow-md"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {t("hero.webSolutions")}
          </motion.p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium text-white drop-shadow-md"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t("hero.greeting")}
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-white drop-shadow-md"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {t("hero.building")}
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white drop-shadow-lg text-5xl"
            />
          </motion.div>
          <motion.p
            className="text-2xl font-black text-white drop-shadow-md pt-3"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {t("hero.webApplications")}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
