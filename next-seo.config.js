import { APP_TITLE, APP_VERSION, LOGO_LINK } from './src/lib/config/index';

const version = APP_VERSION ? `- ${APP_VERSION}` : null

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: APP_TITLE,
  titleTemplate: `%s | ${APP_TITLE}`,
  defaultTitle: APP_TITLE.toLowerCase().replace(/ /g, '-'),
  description: "Miele Chat Assistant",
  canonical: "https://miele.promptengineers.ai",
  openGraph: {
    url: "https://miele.promptengineers.ai",
    title: APP_TITLE.toLowerCase().replace(/ /g, '-'),
    description: "Miele Chat Assistant",
    images: [
      {
        url: LOGO_LINK,
        alt: "Miele GPT",
      },
    ],
    site_name: "miele-gpt",
  },
  twitter: {
    handle: "@JohnEggz",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
