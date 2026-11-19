import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#681622",
};

export const metadata: Metadata = {
  title: "Abhishek & Simran - Wedding Invitation | 11.02.2027",
  description: "Wedding invitation of Abhishek Kumar & Simran Choudhary - 11 February 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical opening envelope poster and video */}
        <link
          rel="preload"
          as="image"
          href="/card-assets/envelope-poster-mobile.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="video"
          href="/card-assets/card-opening.mp4"
          type="video/mp4"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allura&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Pinyon+Script&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#ECE7E0] text-[#3D3536] selection:bg-[#681622] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
