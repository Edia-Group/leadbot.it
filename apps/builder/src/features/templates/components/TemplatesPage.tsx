import { useTranslate } from "@tolgee/react";
import { Seo } from "@/components/Seo";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { CreateNewTypebotButtons } from "./CreateNewTypebotButtons";

export const TemplatesPage = () => {
  const { t } = useTranslate();

  return (
    <div className="flex flex-col items-center gap-2 h-screen">
      <Seo title={t("templates.page.title")} />
      <DashboardHeader />
      <CreateNewTypebotButtons />
    </div>
  );
};
