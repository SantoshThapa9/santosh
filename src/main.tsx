import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Santosh Thapa | Software Engineer - React, UI/UX</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="google-site-verification"
          content="uFwgXeEWgbDk0K6XTWti6Ke4WJYQeKe86lbinlidq70"
        />
        <meta
          name="description"
          content="Welcome to The personal portfolio of Santosh Thapa, a skilled Software Engineer specializing in React, Next.js, and UI/UX development. Check out my latest projects, blogs, and coding expertise."
        />
        <meta
          name="keywords"
          content="Santosh Thapa, Software Engineer, React, Frontend Developer, Next.js, UI/UX, Web Developer"
        />
        <meta name="author" content="Santosh Thapa" />
        <meta
          property="og:title"
          content="Santosh Thapa | Software Engineer Portfolio"
        />
        <meta
          property="og:image:alt"
          content="Santosh Thapa - Software Engineer Portfolio"
        />

        <meta
          property="og:description"
          content="Discover the work of Santosh Thapa, a passionate Frontend Software Engineer specializing in React, JavaScript, and modern web development."
        />
        <meta
          property="og:image"
          content="https://santosh-gamma.vercel.app/st.webp"
        />
        <meta property="og:url" content="https://santosh-gamma.vercel.app/" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Santosh Thapa | Software Engineer Portfolio"
        />
        <meta
          name="twitter:description"
          content="Discover the work of Santosh Thapa, a passionate Frontend Software Engineer specializing in React, JavaScript, and modern web development."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://santosh-gamma.vercel.app/" />
        <meta property="og:site_name" content="Santosh Thapa Portfolio" />
        <meta property="og:locale" content="en_US" />

        <meta
          name="twitter:image"
          content="https://santosh-gamma.vercel.app/st.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Santosh Thapa - Software Engineer Portfolio"
        />
        <meta name="twitter:creator" content="@SantoshThapa689" />

        <meta name="twitter:site" content="@SantoshThapa689" />
      </Helmet>
      <App />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Santosh Thapa",
      "jobTitle": "Frontend Software Engineer",
      "url": "https://santosh-gamma.vercel.app/",
      "sameAs": [
        "https://github.com/SantoshThapa9/",
        "https://www.linkedin.com/in/santosh986/"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Netaji Subhas University"
      },
      "knowsAbout": [
        "React", "Next.js", "JavaScript", "UI/UX",
        "Frontend Development", "Web Performance", "Web Development"
      ],
      "description": "Santosh Thapa is a skilled Frontend Software Engineer specializing in React, JavaScript, and modern web development."
    }`,
        }}
      />
    </HelmetProvider>
  </StrictMode>
);
