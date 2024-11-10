import "./globals.css";
import Header from "./components/layouts/Header";
import { Kanit } from 'next/font/google'
import Footer from "./components/layouts/Footer";

export const metadata = {
  title: "Simple Blog by Muhaimin Shihab",
  description: "Simple Blog by Muhaimin Shihab",
};

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
