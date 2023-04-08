/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Langchain GPT",
  titleTemplate: "%s | Langchain GPT - v0.0.134",
  defaultTitle: "langchain-gpt",
  description: "Next.js + chakra-ui + TypeScript template",
  canonical: "https://langchain.promptengineers.ai",
  openGraph: {
    url: "https://langchain.promptengineers.ai",
    title: "langchain-gpt",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextarter-chakra.sznm.dev og-image",
      },
    ],
    site_name: "nextarter-chakra",
  },
  twitter: {
    handle: "@JohnEggz",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
