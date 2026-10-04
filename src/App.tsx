import React, { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SectionLoader from "./components/SectionLoader";
import FloatingButtons from "./components/FloatingButtons";

const Hero = lazy(() => import("./pages/Hero"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Experiences = lazy(() => import("./pages/Experiences"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        <Suspense fallback={<SectionLoader />}>
          <Hero />
          <About />
          <Projects />
          <Experiences />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  );
}

export default App;
