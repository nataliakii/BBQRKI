import "@/styles/main.scss";
import "./globals.css";
import "@styles/animations.css";
import "@styles/slider.css";
import "@/styles/mobile-app-dark.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import generateStylesheetObject from "@common/generateStylesheetsObject";

export const metadata = {
  title: {
    default: "BB QR => KI homepage",
    template: "%s | BB QR Code ",
  },
  description: "BB QR Code for everything you need!",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    other: generateStylesheetObject([
      ,
      "https://fonts.googleapis.com/css2?family=Arima:wght@600&family=Caudex&family=Fira+Code&family=Fira+Mono&family=Gruppo&family=Inter:wght@200;400;700&family=Josefin+Sans:wght@300;400;500;600&family=Literata:opsz,wght@7..72,400;7..72,600&family=Major+Mono+Display&family=Mrs+Saint+Delafield&family=Noto+Sans+Display:wght@300;400;500&family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&family=Odibee+Sans&display=swap&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap&family=Petit+Formal+Script&family=Roboto+Slab:wght@100..900&display=swap",
      "https://fonts.googleapis.com/css2?family=Belleza&family=Kufam:ital,wght@0,400..900;1,400..900&family=Syncopate:wght@400;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&display=swap",
    ]),
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="hmG4CgYtKAr6PmkiwR4-FEvnscd81EMt-CBuV0GfACY"
        />
      </Head>
      <html lang="en">
        <body style={{ position: "relative", minHeight: "100vh" }}>
          {" "}
          {children}{" "}
          <footer
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              bottom: 0,
              left: "50%",

              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 100,
            }}
          >
            <Link className="link-hover-effect" href="/">
              <Image width={40} height={40} src="/logo.gif" alt="logo-gif" />
              <div>Powered by Nataliaki</div>
            </Link>
          </footer>
        </body>
      </html>
    </>
  );
}
