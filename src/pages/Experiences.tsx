import { Timeline } from "@/components/ui/timeline";
import { getTranslatedExperiences } from "../constants";
import { useTranslation } from "react-i18next";

function Experiences() {
  const { t } = useTranslation();
  const experiences = getTranslatedExperiences(t);

  return (
    <section id="experiences" className="w-full h-full">
      <Timeline data={experiences} />
    </section>
  );
}

export default Experiences;
