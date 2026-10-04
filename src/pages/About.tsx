import React from "react";
import { useTranslation } from "react-i18next";
import { AboutBioCard } from "@/components/about/AboutBioCard";
import { CodeCraftCard } from "@/components/about/CodeCraftCard";
import { TimeZoneCard } from "@/components/about/TimeZoneCard";
import { ContactCalloutCard } from "@/components/about/ContactCalloutCard";
import { TechStackCard } from "@/components/about/TechStackCard";

function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="c-space section-spacing">
      <h2 className="text-heading">{t("about.title")}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        <AboutBioCard />
        <CodeCraftCard />
        <TimeZoneCard />
        <ContactCalloutCard />
        <TechStackCard />
      </div>
    </section>
  );
}

export default About;
