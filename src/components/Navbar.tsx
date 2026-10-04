import { useState, useEffect } from "react";
import { FloatingDock } from "./ui/floating-dock";
import { useTranslation } from "react-i18next";
import {
  IconBrandGithub,
  IconHome,
  IconTerminal2,
  IconUser,
  IconBriefcase,
  IconMail,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconDownload,
  IconLanguage,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return document.documentElement.classList.contains("dark") || true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇪🇬" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setShowLangMenu(false);
  };

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const links = [
    {
      title: t("nav.home"),
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },
    {
      title: t("nav.about"),
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: t("nav.projects"),
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: t("nav.experiences"),
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#experiences",
    },
    {
      title: t("nav.contact"),
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/hussein-alsayed12",
    },
    {
      title: "WhatsApp",
      icon: (
        <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://wa.me/201017285081",
    },
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com/ana.hussain.3591?locale=ar_AR",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/hussain521",
    },
    {
      title: t("nav.downloadCv"),
      icon: (
        <IconDownload className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Hussein Al-Sayed.pdf",
    },
    {
      title: t("nav.language"),
      icon: (
        <IconLanguage className="h-full w-full text-cyan-400" />
      ),
      href: "#",
      onClick: () => setShowLangMenu((prev) => !prev),
    },
    {
      title: t("nav.theme"),
      icon: isDark ? (
        <IconSun className="h-full w-full text-amber-400" />
      ) : (
        <IconMoon className="h-full w-full text-indigo-500" />
      ),
      href: "#",
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="fixed inset-x-0 z-30 w-full flex flex-col items-center">
      <FloatingDock mobileClassName="translate-y-5 " items={links} />
      {showLangMenu && (
        <div className="mt-2 flex gap-2 p-2 bg-neutral-900/90 border border-neutral-700 rounded-xl shadow-xl backdrop-blur-md z-40">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                i18n.language === lang.code
                  ? "bg-cyan-600 text-white"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
