import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Linkedin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Rahul Raavi — Data Engineer (Paris / Europe)",
  description: "AWS-first data engineer shipping reliable, observable data platforms.",
  metadataBase: new URL("https://www.raavirahul.in"),
  openGraph: { title: "Rahul Raavi — Data Engineer", type: "website", url: "/" },
  twitter: { card: "summary_large_image", creator: "@raavirahul" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <Navbar />
        {children}

        <footer className="border-t mt-20" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="container max-w-6xl py-10 text-sm text-slate-600 flex items-center justify-between">
            <p>© {new Date().getFullYear()} Rahul Raavi</p>

            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rahul-raavi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn — open profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: "#0A66C2", color: "white" }}
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/33745304551?text=Hi%20Rahul%2C%20I%27m%20reaching%20out%20from%20your%20portfolio."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp — chat on WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: "#25D366", color: "white" }}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
