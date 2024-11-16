import "./globals.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Host_Grotesk } from "next/font/google"; // Import correctly from next/font/google

export const metadata = {
  title: "Simple Blog by Muhaimin Shihab",
  description: "Simple Blog by Muhaimin Shihab",
};

// Configure Host Grotesk font
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
