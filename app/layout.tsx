import type { Metadata, Viewport } from "next";
import { Public_Sans, Onest, PT_Serif, Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Classic Editorial Display Typeface
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Classic Renaissance / Literary Typeface
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Sandeep Chevala — AI / ML Engineer",
  description:
    "AI / ML Engineer building Generative AI, LLMs, Agentic AI, and Production Machine Learning systems.",
  keywords: [
    "Sandeep Chevala",
    "AI Engineer",
    "Machine Learning Engineer",
    "Generative AI",
    "LLM Applications",
    "Agentic AI",
    "RAG",
    "Multi-Agent Systems",
    "PyTorch",
    "LangGraph",
  ],
  authors: [{ name: "Sandeep Chevala" }],
  creator: "Sandeep Chevala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sandeepchevala.dev",
    title: "Sandeep Chevala — AI / ML Engineer",
    description:
      "AI / ML Engineer building Generative AI, LLMs, Agentic AI, and Production Machine Learning systems.",
    siteName: "Sandeep Chevala Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Chevala — AI / ML Engineer",
    description:
      "Building intelligent systems with Generative AI, LLMs, Machine Learning, and Agentic AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CurtainTransitionProvider } from "@/components/transitions/CurtainTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${ptSerif.variable} ${publicSans.variable} ${onest.variable} ${inter.variable} scroll-smooth selection:bg-[#F2572B] selection:text-[#FCF6F5]`}
    >
      <body className="min-h-screen bg-[#ffffff] text-[#111111] font-display antialiased overflow-x-clip">
        <CurtainTransitionProvider>{children}</CurtainTransitionProvider>
      </body>
    </html>
  );
}
