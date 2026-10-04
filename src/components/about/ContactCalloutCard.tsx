import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border";
import { motion } from "motion/react";
import CopyEmailButton from "../CopyEmailButton";
import { useTranslation } from "react-i18next";

export function ContactCalloutCard() {
  const { t } = useTranslation();

  return (
    <HoverBorderGradient
      as={motion.div}
      duration={1.2}
      className="grid-4"
    >
      <div className="flex flex-col items-center justify-center gap-4 w-full size-full">
        <p className="text-center headtext">{t("about.startProject")}</p>
        <CopyEmailButton />
      </div>
    </HoverBorderGradient>
  );
}