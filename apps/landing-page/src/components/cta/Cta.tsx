import { cn } from "@typebot.io/ui/lib/cn";
import { registerUrl } from "@/constants";
import { CtaButtonLink } from "../link";
import magicWand from "./assets/magic-wand.png";

export type CtaProps = {
  className?: string;
  children?: React.ReactNode;
  buttonLabel?: string;
  isLogoDisplayed?: boolean;
};
export const Cta = ({
  className,
  children = "Pronto a trasformare il tuo modo di acquisire clienti e far crescere il tuo business?",
  buttonLabel = "Inizia gratis",
  isLogoDisplayed = true,
}: CtaProps) => {
  return (
    <div
      className={cn(
        "dark relative overflow-hidden rounded-[28px] flex gap-10 py-16 px-6 items-center max-w-7xl w-full bg-[#0E5F52] text-white",
        className,
        children ? "flex-col" : "justify-center",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 size-60 rounded-full bg-[radial-gradient(circle,rgba(224,162,74,0.35),transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 size-64 rounded-full border-2 border-white/12"
      />
      {isLogoDisplayed && (
        <img
          src={magicWand}
          alt="bacchetta magica"
          className="relative size-24"
        />
      )}
      {children && (
        <h2 className="relative text-center px-5 text-balance max-w-5xl text-white">
          {children}
        </h2>
      )}
      <div
        className={cn(
          "relative flex flex-col gap-2 px-2",
          children ? "items-center w-full" : undefined,
        )}
      >
        <CtaButtonLink size="lg" variant="secondary" href={registerUrl}>
          {buttonLabel}
        </CtaButtonLink>
        <p className="text-center text-[#BFE3D4]">
          Nessuna carta richiesta. 1 bot e 50 chat per provare.
        </p>
      </div>
    </div>
  );
};
