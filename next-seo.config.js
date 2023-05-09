import { APP_TITLE, APP_VERSION, LOGO_LINK } from './src/lib/config/index';

const version = APP_VERSION ? `- ${APP_VERSION}` : null

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: APP_TITLE,
  titleTemplate: `%s | ${APP_TITLE} ${version}`,
  defaultTitle: APP_TITLE.toLowerCase().replace(/ /g, '-'),
  description: "Form.io Chat Assistant",
  canonical: "https://formio.promptengineers.ai",
  openGraph: {
    url: "https://formio.promptengineers.ai",
    title: APP_TITLE.toLowerCase().replace(/ /g, '-'),
    description: "Form.io Chat Assistant",
    images: [
      {
        url: LOGO_LINK,
        alt: "Form.io GPT",
      },
    ],
    site_name: "formio-gpt",
  },
  twitter: {
    handle: "@JohnEggz",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
