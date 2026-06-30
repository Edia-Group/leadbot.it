import { useTranslate } from "@tolgee/react";
import { useRouter } from "next/router";
import { NucleoLogoFull } from "@/components/NucleoLogo";
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
  const isSignIn = type === "signin";

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#0f172a] px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(50% 40% at 15% 10%, rgba(37,99,235,0.18), transparent 70%)",
            "radial-gradient(45% 40% at 85% 90%, rgba(30,64,175,0.14), transparent 70%)",
          ].join(", "),
        }}
      />

      <Seo
        title={
          isSignIn ? t("auth.signin.heading") : t("auth.register.heading")
        }
      />

      <div className="relative z-10 flex w-full max-w-[440px] flex-col items-center gap-8">
        <NucleoLogoFull variant="light" />

        <div className="flex w-full flex-col gap-8 rounded-2xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/30 md:p-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
              {isSignIn
                ? t("auth.signin.heading")
                : t("auth.register.heading")}
            </h1>
            <p className="text-sm leading-relaxed text-slate-500">
              {isSignIn
                ? t("auth.signin.subtitle")
                : t("auth.register.subtitle")}
            </p>
          </div>

          <SignInForm defaultEmail={query.g?.toString()} />

          <p className="text-center text-sm text-slate-500">
            {isSignIn ? (
              <>
                {t("auth.signin.noAccountLabel.preLink")}{" "}
                <TextLink href="/register">
                  {t("auth.signin.noAccountLabel.link")}
                </TextLink>
              </>
            ) : (
              <>
                {t("auth.register.alreadyHaveAccountLabel.preLink")}{" "}
                <TextLink href="/signin">
                  {t("auth.register.alreadyHaveAccountLabel.link")}
                </TextLink>
              </>
            )}
          </p>
        </div>

        <a
          href="https://nucleoai.it"
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← nucleoai.it
        </a>
      </div>
    </div>
  );
};
