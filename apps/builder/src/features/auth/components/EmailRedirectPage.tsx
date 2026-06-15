import { createEmailMagicLink } from "@typebot.io/auth/helpers/createEmailMagicLink";
import { Badge } from "@typebot.io/ui/components/Badge";
import { Button } from "@typebot.io/ui/components/Button";
import { useQueryState } from "nuqs";
import { Seo } from "@/components/Seo";
import { toast } from "@/lib/toast";

export const EmailRedirectPage = () => {
  const [redirectPath] = useQueryState("redirectPath");
  const [email] = useQueryState("email");
  const [token] = useQueryState("token");

  const redirectToMagicLink = () => {
    if (!token || !email) {
      toast({ description: "Parametri token o email mancanti" });
      return;
    }
    window.location.assign(
      createEmailMagicLink(token, email, redirectPath ?? undefined),
    );
  };

  if (!email || !token) return null;

  return (
    <div className="flex flex-col items-center gap-2 h-screen justify-center">
      <Seo title={"Conferma autenticazione email"} />
      <div className="flex flex-col p-10 rounded-8 border gap-6 bg-gray-1">
        <div className="flex flex-col gap-4">
          <h2>Autenticazione via email</h2>
          <p>
            Stai per accedere con <Badge>{email}</Badge>
          </p>
        </div>
        <Button onClick={redirectToMagicLink}>Continua</Button>
      </div>
    </div>
  );
};
