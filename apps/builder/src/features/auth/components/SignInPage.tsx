import { useTranslate } from "@tolgee/react";
import { useRouter } from "next/router";
import { Seo } from "@/components/Seo";
import { TextLink } from "@/components/TextLink";
import { SignInForm } from "./SignInForm";

type Props = {
  type: "signin" | "signup";
  defaultEmail?: string;
};

export const SignInPage = ({ type }: Props) => {
  const { t } = useTranslate();
  const { query } = useRouter();

  return (
    <div
      className="flex flex-col gap-4 h-dvh justify-center items-center"
      style={{
        backgroundColor: "#0b0b0d",
        backgroundImage: [
          "radial-gradient(60% 50% at 18% 12%, rgba(193,62,170,0.14), transparent 70%)",
          "radial-gradient(55% 50% at 85% 88%, rgba(255,73,31,0.14), transparent 70%)",
          "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "auto, auto, 22px 22px",
      }}
    >
      <Seo
        title={
          type === "signin"
            ? t("auth.signin.heading")
            : t("auth.register.heading")
        }
      />
      <div className="flex flex-col p-8 rounded-lg gap-6 bg-gray-1">
        <div className="flex flex-col gap-4">
          <h2>
            {type === "signin"
              ? t("auth.signin.heading")
              : t("auth.register.heading")}
          </h2>
          {type === "signin" ? (
            <p>
              {t("auth.signin.noAccountLabel.preLink")}{" "}
              <TextLink href="/register">
                {t("auth.signin.noAccountLabel.link")}
              </TextLink>
            </p>
          ) : (
            <p>
              {t("auth.register.alreadyHaveAccountLabel.preLink")}{" "}
              <TextLink href="/signin">
                {t("auth.register.alreadyHaveAccountLabel.link")}
              </TextLink>
            </p>
          )}
        </div>

        <SignInForm defaultEmail={query.g?.toString()} />
      </div>
    </div>
  );
};
