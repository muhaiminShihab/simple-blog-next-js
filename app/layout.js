import "./globals.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Host_Grotesk } from "next/font/google";
import { fetchSiteData } from "./utils/wpApis";

// Configure Host Grotesk font
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
      <body className={hostGrotesk.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
