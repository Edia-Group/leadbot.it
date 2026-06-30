type Props = {
  onAccept: () => void;
  onDecline: () => void;
};

export const CookieBanner = ({ onAccept, onDecline }: Props) => (
  <div className="fixed bottom-0 inset-x-0 z-50 dark bg-background/95 backdrop-blur-md border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        Utilizziamo cookie tecnici (sempre attivi) e cookie analitici anonimi per
        migliorare il sito.{" "}
        <a
          href="/cookie-policy"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Cookie Policy
        </a>
        {" · "}
        <a
          href="/privacy-policy"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Privacy Policy
        </a>
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onDecline}
          className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition-all whitespace-nowrap cursor-pointer"
        >
          Solo necessari
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
        >
          Accetta tutti
        </button>
      </div>
    </div>
  </div>
);
