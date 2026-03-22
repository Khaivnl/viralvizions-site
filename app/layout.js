import Script from "next/script";
import "./globals.css";

// === TRACKING IDS — Replace with your actual IDs ===
const META_PIXEL_ID = "953608194288167";
const GA_MEASUREMENT_ID = "YOUR_GA4_ID";

export const metadata = {
  metadataBase: new URL("https://viralvizions.com"),
  title: "ViralVizions — Content Systems That Bring Customers",
  description:
    "Singapore's #1 content agency for Malay/Muslim businesses. Done-for-you content systems that drive real revenue. 80+ businesses served. $2M+ revenue generated.",
  keywords:
    "content agency Singapore, TikTok marketing, social media agency, Malay business marketing, Muslim business growth, content creation Singapore, viral content agency",
  openGraph: {
    title: "ViralVizions — Content Systems That Bring Customers",
    description:
      "Your competitor is getting the customers that should be yours. We fix that.",
    url: "https://viralvizions.com",
    siteName: "ViralVizions",
    type: "website",
    locale: "en_SG",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralVizions — Content That Brings Customers",
    description: "Done-for-you content systems for Malay/Muslim businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
        </noscript>

        {/* GA4 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
        </Script>
      </head>
      <body className="antialiased grain">{children}</body>
    </html>
  );
            }
