import "./globals.css";
import "./wp-block.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { fetchSiteData } from "./utils/wpApis";

export const generateMetadata = async (props = {}, parent) => {
  const siteData = await fetchSiteData();

  return {
    title: siteData.title,
    description: siteData.description,
    openGraph: {
      title: siteData.title,
      description: siteData.description,
      images: [
        {
          url: siteData.site_logo,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteData.title,
      description: siteData.description,
      images: [
        {
          url: siteData.site_logo,
          width: 800,
          height: 600,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: siteData.site_icon,
      shortcut: siteData.site_icon,
      apple: siteData.site_icon,
    },
  };
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
