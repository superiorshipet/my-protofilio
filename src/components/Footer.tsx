import { Github, Linkedin, Facebook, Phone } from "lucide-react";
import { Particles } from "./ui/hexToRgb";
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <div className="relative c-space">
      <div className="container mx-auto max-w-7xl ">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={20}
          color={"#fff"}
          refresh
        />
        <div className="text-center mb-4 bottom-0 ">
          <div className="flex items-center justify-center gap-8 text-[#7C7C7C]">
            <a href="https://github.com/hussain521" target="_blank" aria-label="GitHub Profile">
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hussein-alsayed12"
              target="_blank"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/ana.hussain.3591?locale=ar_AR"
              target="_blank"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a href="tel:+201017285081" aria-label="Phone Number">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 py-4 flex flex-col md:flex-row md:justify-between items-center gap-4 text-center text-sm text-gray-600 dark:text-gray-500">
          <div>
            &copy; {currentYear} Hussein AL-Sayed. All rights ® reserved.
          </div>

          <ul className="flex items-center justify-between gap-3 md:gap-6 text-[10px] md:text-[12px] ">
            <li>
              <a href="#" className="hover:underline">
                Terms of Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Connect with me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
