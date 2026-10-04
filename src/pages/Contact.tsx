import { Particles } from "@/components/ui/hexToRgb";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { twMerge } from "tailwind-merge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import Aleart from "../components/Aleart";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [formDate, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formDate,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      
      await emailjs.send(
        "service_z23eu44",
        "template_33gug1x",
        {
          from_name: formDate.name,
          to_name: "Hussein",
          from_email: formDate.email,
          to_email: "hussainelsid990@gmail.com",
          message: formDate.message,
        },
        "dYyzaMorA16DlJJNV"
      );
      showAlertMessage("success", t("contact.successMessage"));
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      showAlertMessage("danger", t("contact.errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" className="relative flex items-center c-space  section-spacing">
      {showAlert && <Aleart type={alertType} text={alertMessage} />}
      <Particles
        className="absolute inset-0 z-0 "
        quantity={500}
        ease={20}
        color={"#fff"}
        refresh
      />
      <section className="container mx-auto max-w-7xl">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none border-3 border-neutral-300 dark:border-neutral-800 mt-10 bg-white dark:bg-neutral-900 p-4 md:rounded-2xl md:p-8 md:pb-0">
          <h2 className="md:text-2xl text-xl font-bold capitalize text-neutral-800 dark:text-neutral-200">
            {t("contact.title")}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            {t("contact.subTitle")}
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="firstname">{t("contact.fullName")}</Label>
              <Input
                autoComplete="name"
                required
                name="name"
                id="firstname"
                placeholder={t("contact.fullName")}
                type="text"
                value={formDate.name}
                onChange={handelChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">{t("contact.emailAddress")}</Label>
              <Input
                required
                autoComplete="email"
                name="email"
                id="email"
                placeholder="email@fc.com"
                type="email"
                value={formDate.email}
                onChange={handelChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <TextArea
                id="message"
                name="message"
                autoComplete="message"
                onChange={handelChange}
                required
                value={formDate.message}
                placeholder={t("contact.messagePlaceholder")}
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium cursor-pointer text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              {!isLoading ? t("contact.send") : t("contact.sending")}{" "}
              <span className="inline-block transition-transform duration-300 rtl:rotate-180">
                &rarr;
              </span>
              <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          </form>
        </div>
      </section>
    </section>
  );
}

export default Contact;

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
