 
import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const targetProgress = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateTargetProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0
          ? Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100)
          : 0;

      targetProgress.current = progress;

      setShowScrollTop(scrollTop > 350);
    };

    const animate = () => {
      setScrollProgress((current) => {
        const target = targetProgress.current;

        // Smooth interpolation
        const next = current + (target - current) * 0.12;

        if (Math.abs(target - next) < 0.05) {
          return target;
        }

        return next;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    updateTargetProgress();

    window.addEventListener("scroll", updateTargetProgress, {
      passive: true,
    });

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateTargetProgress);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  const displayedPercentage = Math.round(scrollProgress);

  return (
    <>
      {/* Scroll To Top */}
      <div
        className={`
          fixed right-5 bottom-24 z-50
          group
          transition-all duration-500 ease-out
          ${
            showScrollTop
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-5 scale-90 opacity-0"
          }
        `}
      >
        {/* Professional Tooltip */}
        <div
          className="
            absolute
            bottom-[calc(100%+12px)]
            left-1/2
            -translate-x-1/2
            whitespace-nowrap

            rounded-xl
            border border-black/10
            bg-black
            px-4 py-2.5

            text-center
            text-white

            shadow-xl
            opacity-0
            translate-y-2
            pointer-events-none

            transition-all
            duration-300
            ease-out

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <div className="text-sm font-semibold">العودة للأعلى</div>

          <div className="mt-0.5 text-[10px] font-medium tracking-wider text-white/60">
            BACK TO TOP
          </div>

          {/* Tooltip Arrow */}
          <span
            className="
              absolute
              -bottom-1
              left-1/2
              h-2 w-2
              -translate-x-1/2
              rotate-45
              bg-black
            "
          />
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full

            bg-white

            shadow-[0_8px_30px_rgba(0,0,0,0.12)]

            transition-all
            duration-300
            ease-out

            hover:scale-110
            hover:shadow-[0_12px_35px_rgba(0,0,0,0.18)]

            active:scale-95
          "
        >
          {/* Progress SVG */}
          <svg
            className="
              absolute
              inset-0
              h-full
              w-full
              -rotate-90
            "
            viewBox="0 0 56 56"
          >
            {/* Background Border */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-black/10"
            />

            {/* Progress */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="
                text-black
                transition-[stroke-dashoffset]
                duration-100
                ease-linear
              "
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Percentage */}
          <span
            className="
              relative
              z-10
              text-[11px]
              font-bold
              tabular-nums
              text-black
            "
          >
            {displayedPercentage}%
          </span>

          {/* Arrow appears on hover */}
          <span
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              rounded-full
              bg-white

              opacity-0
              scale-75

              transition-all
              duration-300

              group-hover:scale-100
              group-hover:opacity-100
            "
          >
            <ArrowUp size={22} strokeWidth={2.5} className="text-black" />
          </span>
        </button>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/201017285081"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact me on WhatsApp"
        className="
    fixed
    right-5
    bottom-5
    z-50

    flex
    h-14
    w-14
    items-center
    justify-center

    rounded-full
    bg-[#25D366]
    text-white

    shadow-[0_8px_25px_rgba(37,211,102,0.3)]

    transition-transform
    duration-300

    hover:scale-110

    animate-[whatsappPulse_2s_ease-in-out_infinite]
  "
      >
        <MessageCircle size={30} strokeWidth={2.3} />

        {/* Online Status */}
        <span
          className="
      absolute
      right-0
      top-0

      h-3.5
      w-3.5

      rounded-full
      border-2
      border-white
      bg-green-400

      shadow-[0_0_0_2px_rgba(74,222,128,0.25)]

      animate-[onlinePulse_1.8s_ease-in-out_infinite]
    "
          aria-label="Online"
        />
      </a>

      <style>{`
 
           @keyframes whatsappPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45);
    }

    50% {
      transform: scale(1.07);
      box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
    }
  }

  @keyframes onlinePulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.18);
      opacity: 0.7;
    }
  }
      `}</style>
    </>
  );
}
 
