import React from "react";
import { CometCard } from "@/components/ui/comet-card";
import { useTranslation } from "react-i18next";

export function AboutBioCard() {
  const { t } = useTranslation();

  return (
    <div className="flex items-end grid-default-color grid-1">
      <CometCard className="z-10 absolute left-1/2 top-[50%] md:top-[40%] -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          className="my-10 flex w-45 md:w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#e6e6e610] p-2 md:my-10"
          aria-label="View invite F7RA"
          style={{
            transformStyle: "preserve-3d",
            transform: "none",
            opacity: 1,
          }}
        >
          <div className="mx-2 flex-1">
            <div className="relative mt-2 aspect-[3/4] w-full">
              <img
                loading="lazy"
                width={300}
                height={400}
                className="absolute inset-0 h-full w-full rounded-[16px] pb-2 object-cover contrast-75"
                alt="Invite background"
                src="assets/shs.png"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </button>
      </CometCard>
      <img
        src="assets/coding-pov.png"
        alt=""
        width={500}
        height={500}
        className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
      />
      <div className="z-10">
        <p className="headtext">{t("about.greeting")}</p>
        <p className="subtext">{t("about.bio")}</p>
      </div>
      <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
    </div>
  );
}