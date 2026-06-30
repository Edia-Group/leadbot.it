export const breakpoints = {
  md: 768,
};

export const currentBaseUrl = "https://nucleoai.it";
export const signinUrl = "https://app.nucleoai.it/signin";
export const registerUrl = `https://app.nucleoai.it/register`;
export const dashboardUrl = `https://app.nucleoai.it/leadbots`;
/** Viewer API host for embeds (Bubble, Standard) on the marketing site */
export const viewerUrl = "https://viewer.nucleoai.it";
/**
 * Public ID of the demo bot shown in the header bubble on the homepage.
 * Create & publish in the builder (Share → custom link) with this exact ID.
 */
export const landingDemoBotPublicId = "faq-ehpj0mm";
// TODO(nucleo): puntare a repo/pagina LinkedIn NUCLEO quando esistono (ora link legacy leadbot)
export const githubRepoUrl = "https://github.com/filipporomani/leadbot";
export const linkedInUrl = "https://www.linkedin.com/company/leadbot";
export const discordUrl = "https://discord.gg/typebot";
export const docsUrl = "https://docs.nucleoai.it";
export const howToGetHelpUrl = `${docsUrl}/guides/how-to-get-help`;
export const enterpriseLeadFormUrl = "https://nucleoai.it/enterprise-lead-form";

export const legacyRedirects = {
  "/leadbot-lib": "https://unpkg.com/leadbot-js@2.0.21/dist/index.umd.min.js",
  "/leadbot-lib/v2": "https://unpkg.com/leadbot-js@2.1.3/dist/index.umd.min.js",
} as const;
