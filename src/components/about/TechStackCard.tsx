import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Frameworks } from "../Frameworks";
import { useTranslation } from "react-i18next";

export function TechStackCard() {
  const { t } = useTranslation();

  return (
    <div className="p-6 grid-5 border rounded-2xl border-gray-800">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
      <div className="absolute inset-y-3 md:inset-y-9 w-[50%]">
        <p className="headText">{t("about.techStackTitle")}</p>
        <p className="subtext">{t("about.techStackSub")}</p>
      </div>

      <div className="z-10 absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
        <Frameworks />
      </div>
    </div>
  );
}