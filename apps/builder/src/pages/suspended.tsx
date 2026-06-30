import { useTranslate } from "@tolgee/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TextLink } from "@/components/TextLink";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { useWorkspace } from "@/features/workspace/WorkspaceProvider";

export default function Page() {
  const { t } = useTranslate();
  const { replace } = useRouter();
  const { workspace } = useWorkspace();

  useEffect(() => {
    if (!workspace || workspace.isSuspended) return;
    replace("/typebots");
  }, [replace, workspace]);

  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col items-center w-full h-[calc(100vh - 64px)] justify-center gap-4">
        <h2>{t("pages.suspended.heading")}</h2>
        <p>
          {t("pages.suspended.description")}{" "}
          <TextLink
            href="https://typebot.io/terms-of-service#scam-typebots"
            isExternal
          >
            {t("pages.suspended.termsLink")}
          </TextLink>
        </p>
      </div>
    </>
  );
}
