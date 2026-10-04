import React, { useRef } from "react";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";

export function CodeCraftCard() {
  const { t } = useTranslation();
  const grid2Container = useRef<HTMLDivElement>(null);

  const cardsData = [
    { key: "card-github-1", style: { rotate: "15deg", top: "12%", left: "35%" }, image: "assets/logos/github.svg" },
    { key: "card-javascript-1", style: { rotate: "-10deg", top: "18%", left: "45%" }, image: "assets/logos/javascript.svg" },
    { key: "card-html5-1", style: { rotate: "25deg", top: "8%", left: "55%" }, image: "assets/logos/html5.svg" },
    { key: "card-css3-1", style: { rotate: "-15deg", top: "22%", left: "65%" }, image: "assets/logos/css3.svg" },
    { key: "card-nextjs-1", style: { rotate: "-25deg", top: "72%", left: "30%" }, image: "assets/logos/Next.js.svg" },
    { key: "card-git-1", style: { rotate: "-35deg", top: "80%", left: "8%" }, image: "assets/logos/git.svg" },
    { key: "card-react-1", style: { rotate: "-50deg", top: "10%", left: "58%" }, image: "assets/logos/react.svg" },
    { key: "card-tailwind-1", style: { rotate: "-5deg", top: "50%", left: "10%" }, image: "assets/logos/tailwindcss.svg" },
    { key: "card-threejs-1", style: { rotate: "45deg", top: "45%", left: "72%" }, image: "assets/logos/threejs.svg" },
    { key: "card-vitejs-1", style: { rotate: "-12deg", top: "15%", left: "5%" }, image: "assets/logos/vitejs.svg" },
    { key: "card-vscode-1", style: { rotate: "20deg", top: "60%", left: "50%" }, image: "assets/logos/visualstudiocode.svg" },
    { key: "card-auth0-1", style: { rotate: "-30deg", top: "35%", left: "20%" }, image: "assets/logos/auth0.svg" },
    { key: "card-stripe-1", style: { rotate: "12deg", top: "78%", left: "65%" }, image: "assets/logos/stripe.svg" },
    { key: "card-wordpress-1", style: { rotate: "-18deg", top: "28%", left: "82%" }, image: "assets/logos/wordpress.svg" },
    { key: "card-github-2", style: { rotate: "35deg", top: "70%", left: "80%" }, image: "assets/logos/github.svg" },
    { key: "card-javascript-2", style: { rotate: "-40deg", top: "10%", left: "78%" }, image: "assets/logos/javascript.svg" },
    { key: "card-react-2", style: { rotate: "10deg", top: "82%", left: "42%" }, image: "assets/logos/react.svg" },
    { key: "card-tailwind-2", style: { rotate: "-22deg", top: "40%", left: "88%" }, image: "assets/logos/tailwindcss.svg" },
  ];

  return (
    <div className="grid-default-color grid-2">
      <div
        ref={grid2Container}
        className="flex items-center justify-center w-full h-full"
      >
        <p className="flex items-end text-5xl text-gray-500">
          {t("about.codeIsCraft")}
        </p>

        {cardsData.map((card) => (
          <Card
            key={card.key}
            style={card.style}
            image={card.image}
            containerRef={grid2Container}
          />
        ))}
      </div>
    </div>
  );
}