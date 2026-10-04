import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Globe } from "../globe";
import { useTranslation } from "react-i18next";

export function TimeZoneCard() {
  const { t } = useTranslation();

  return (
    <div className="grid-black-color grid-3">
      <SparklesCore
        id="tsparticlesfullpageded"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
      <div className="z-10 absolute inset-y-3 md:inset-y-9 w-[50%]">
        <p className="headtext">{t("about.timeZoneTitle")}</p>
        <p className="subtext">{t("about.timeZoneSub")}</p>
      </div>
      <figure className="absolute left-[30%] top-[10%]">
        <Globe />
      </figure>
    </div>
  );
}