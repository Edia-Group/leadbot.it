import { useTranslate } from "@tolgee/react";
import { env } from "@typebot.io/env";
import Head from "next/head";

const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return env.NEXTAUTH_URL;
};

export const Seo = ({
  title,
  description,
  imagePreviewUrl = `${getOrigin()}/images/og.png`,
}: {
  title: string;
  description?: string;
  currentUrl?: string;
  imagePreviewUrl?: string;
}) => {
  const { t } = useTranslate();
  const formattedTitle = `${title} | NUCLEO`;
  const resolvedDescription =
    description ?? t("seo.defaultDescription");

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={resolvedDescription} />
      <meta property="twitter:description" content={resolvedDescription} />
      <meta property="og:description" content={resolvedDescription} />

      <meta property="og:image" content={imagePreviewUrl} />
      <meta property="twitter:image" content={imagePreviewUrl} />

      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  );
};
