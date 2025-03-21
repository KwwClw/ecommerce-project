import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({ subsets: ["thai", "latin"], weight: "300", style: "normal" });

export const metadata = {
  title: "MyShop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
