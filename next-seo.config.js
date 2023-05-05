import { APP_TITLE, APP_VERSION, CONTEXT_LINK } from './src/lib/config/index';

const version = APP_VERSION ? `- ${APP_VERSION}` : null

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: APP_TITLE,
  titleTemplate: `%s | ${APP_TITLE} ${version}`,
  defaultTitle: APP_TITLE.toLowerCase().replace(/ /g, '-'),
  description: "Next.js + chakra-ui + TypeScript template",
  canonical: "https://formio.promptengineers.ai",
  openGraph: {
    url: "https://langchain.promptengineers.ai",
    title: APP_TITLE.toLowerCase().replace(/ /g, '-'),
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://studio.youtube.com/channel/UCpGq31VRTZ9JzosUFA_HWzw/editing/images",
        alt: "Prompt Engineers Chat Assist Starter",
      },
    ],
    site_name: "prompt-engineers-ai",
  },
  twitter: {
    handle: "@JohnEggz",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
