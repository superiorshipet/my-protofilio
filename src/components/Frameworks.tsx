import React from "react";
import { OrbitingCircles } from "./ui/OrbitingCircles";
import { Icons } from "./icons/FrameworkIcons";

export function Frameworks() {
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles
        className=""
        iconSize={25}
        radius={120}
        reverse
        speed={5}
      >
        <Icons.git />
        <Icons.gitHub />
        <Icons.notion />
        <Icons.postman />
      </OrbitingCircles>

      <OrbitingCircles
        className=""
        iconSize={25}
        radius={160}
        reverse={false}
        speed={2}
      >
        <Icons.react />
        <Icons.nextjs />
        <Icons.typescript />
        <Icons.javascript />
        <Icons.html5 />
        <Icons.css3 />
        <Icons.bootstrap />
        <Icons.redux />
        <Icons.reactbootstrap />
        <Icons.tailwind />
        <Icons.sass />
      </OrbitingCircles>

      <OrbitingCircles
        className=""
        iconSize={25}
        radius={80}
        reverse={false}
        speed={1}
      >
        <Icons.anaconda />
        <Icons.vscode />
        <Icons.figma />
        <Icons.jQuery />
      </OrbitingCircles>
    </div>
  );
}
