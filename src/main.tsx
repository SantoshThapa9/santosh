import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Santosh Thapa | Software Engineer | Portfolio</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Santosh Thapa" />
        <meta
          name="apple-mobile-web-app-title"
          content="Santosh Thapa Portfolio"
        />
        <meta />
        <meta name="subject" content="Software Engineering Portfolio" />
        <meta name="application-name" content="Santosh Thapa Portfolio" />
        <meta
          name="keywords"
          content="Santosh Thapa, Software Engineer, MERN Stack developer, Web Developer, Personal Portfolio"
        />
        <meta
          name="description"
          content="Santosh Thapa, Software Engineer & MERN Stack Developer, creates high-performance React and Next.js applications. Expert in UI/UX and modern web development."
        />

        <meta
          property="og:title"
          content="Santosh Thapa | Software Engineer Portfolio"
        />
        <meta
          property="og:description"
          content="Santosh Thapa, Software Engineer & MERN Stack Developer, creates high-performance React and Next.js applications. Expert in UI/UX and modern web development."
        />
        <meta
          property="og:image"
          content="https://santosh-gamma.vercel.app/santosh.png"
        />
        <meta
          property="og:image:alt"
          content="Santosh Thapa | Software Engineer Portfolio"
        />
        <meta property="og:url" content="https://santosh-gamma.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Santosh Thapa Software Engineer Portfolio"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:updated_time" content="2024-03-28T12:00:00+00:00" />
        <meta
          property="og:see_also"
          content="https://www.linkedin.com/in/santosh986/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Santosh Thapa | Software Engineer Portfolio"
        />
        <meta
          name="twitter:description"
          content="Santosh Thapa, Software Engineer & MERN Stack Developer, creates high-performance React and Next.js applications. Expert in UI/UX and modern web development."
        />
        <meta
          name="twitter:image"
          content="https://santosh-gamma.vercel.app/santosh.png"
        />
        <meta
          name="twitter:image:alt"
          content="Santosh Thapa - Software Engineer Portfolio"
        />
        <meta name="twitter:creator" content="@SantoshThapa689" />
        <meta name="twitter:site" content="@SantoshThapa689" />

        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <link rel="canonical" href="https://santosh-gamma.vercel.app/" />

        <link rel="apple-touch-icon" sizes="180x180" href="/src/santosh.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/src/santosh.png"
        />

        <link rel="preload" href="/dist/main.js" as="script" />
        <script src="/dist/main.js" defer></script>
        <link rel="prefetch" href="/dist/App.js" />
        <link rel="prefetch" href="/dist/Home.js" />
        <link
          rel="preload"
          href="/src/assets/fonts/LilitaOne-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
      </Helmet>
      <App />
      <div
        dangerouslySetInnerHTML={{
          __html: `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Santosh Thapa",
        "jobTitle": "Software Engineer",
        "image": "https://santosh-gamma.vercel.app/src/santosh.png",
        "description": "Santosh Thapa, Software Engineer & MERN Stack Developer, creates high-performance React and Next.js applications. Expert in UI/UX and modern web development.",
        "url": "https://santosh-gamma.vercel.app/",
        "sameAs": [
          "https://x.com/SantoshThapa689",
          "https://www.linkedin.com/in/santosh986/",
          "https://github.com/SantoshThapa9"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance / Self-employed"
        },
        "knowsAbout": [
          "React", "Next.js", "JavaScript", "TypeScript", "UI/UX",
          "Frontend Development", "Web Performance", "Web Development",
          "Responsive Design", "API Integration", "State Management"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "st8493510@gmail.com",
          "contactType": "Work Inquiry"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Netaji Subhas University"
        },
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Software Engineer",
          "skills": [
            "React", "Next.js", "JavaScript", "TypeScript",
            "Frontend Architecture", "Performance Optimization", "REST & GraphQL APIs"
          ]
        },
        "potentialAction": {
          "@type": "CommunicateAction",
          "name": "Get in Touch",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://santosh-gamma.vercel.app/"
          }
        }
      }
      </script>
    `,
        }}
      />
    </HelmetProvider>
  </StrictMode>
);
