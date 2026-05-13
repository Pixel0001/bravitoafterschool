import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers/AuthProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Bravito After School - Cursuri pentru copii în Chișinău",
    template: "%s | Bravito After School"
  },
  description: "Bravito After School oferă cursuri de calitate pentru copii în Chișinău: programare, IT, matematică și multe altele. Profesori calificați, grupe mici, primul curs gratuit.",
  keywords: [
    // Ce caută părinții — termeni generali cu volum mare
    "cursuri calculator copii Chișinău",
    "cursuri IT copii",
    "cursuri informatică copii",
    "cursuri calculator copii",
    "after school IT Chișinău",
    "cursuri programare copii Chișinău",
    "cursuri inteligenta artificiala copii",
    "cursuri AI copii",
    "scoala IT copii Moldova",
    "after school calculator Moldova",
    "cursuri tehnice copii",
    "activitati extracurriculare IT copii",
    "cursuri digitale copii",
    "educatie digitala copii",
    "PyWeb Academy",
    "cursuri dupa scoala Chisinau"
  ],
  authors: [{ name: "Bravito After School" }],
  creator: "Bravito After School",
  publisher: "Bravito After School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pyweb.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bravito After School - Cursuri pentru copii în Chișinău",
    description: "Cursuri de calitate pentru copii: programare, IT, matematică. Profesori calificați, grupe mici, primul curs gratuit.",
    url: "https://pyweb.online",
    siteName: "Bravito After School",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/bravito.png",
        width: 512,
        height: 512,
        alt: "Bravito After School Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bravito After School - Cursuri pentru copii în Chișinău",
    description: "Cursuri de calitate pentru copii în Chișinău. Programare, IT, matematică. Primul curs gratuit!",
    images: ["/bravito.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    // google: "your-google-verification-code",
  },
  category: "education",
};

// Viewport — disable user-zoom (stops iOS input auto-zoom on answer fields)
// and enable viewport-fit:cover so env(safe-area-inset-*) returns real values
// inside the iPhone PWA (notch / status bar / home indicator).
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#136976',
  interactiveWidget: 'resizes-content',
};

// Script to apply theme before page renders to prevent flash
const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
          <Toaster
            position="top-right"
            containerStyle={{
              top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
              right: 'calc(env(safe-area-inset-right, 0px) + 12px)',
            }}
            toastOptions={{
              style: {
                fontSize: '14px',
                maxWidth: '92vw',
                background: '#15292e',
                color: '#ffffff',
                border: '1px solid #1e3d44',
                borderRadius: '14px',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#30919f', secondary: '#0c1a1d' } },
              error: { iconTheme: { primary: '#f8b316', secondary: '#0c1a1d' } },
            }}
          />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
