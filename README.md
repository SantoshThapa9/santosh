# Santosh Thapa — Personal Portfolio

A responsive developer portfolio showcasing my introduction, career journey, education, experience, projects, and contact options.

**Live demo:** [santosh-gamma.vercel.app](https://santosh-gamma.vercel.app/)

## Screenshots

![Portfolio screenshot 1](https://santosh-gamma.vercel.app/1.webp)

![Portfolio screenshot 2](https://santosh-gamma.vercel.app/2.webp)

![Portfolio screenshot 3](https://santosh-gamma.vercel.app/3.webp)

## Tech Stack

- React 19 + Vite
- TypeScript
- Sass / SCSS
- React Router
- Framer Motion
- Vercel serverless API handlers
- EmailJS REST API
- OpenAI API
- Upstash Redis

## Key Features

- Personal introduction and developer journey
- Education, experience, and career history
- Featured projects showcase
- AI assistant for portfolio questions
- Contact form with direct EmailJS delivery
- Responsive, mobile-friendly interface

## Local Setup

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CONTACT_IP_HASH_SECRET=
OPENAI_API_KEY=
OPENAI_MODEL=

EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis authentication token |
| `CONTACT_IP_HASH_SECRET` | Yes | Secret for hashing rate-limit identifiers; use at least 32 characters |
| `OPENAI_API_KEY` | For AI chat | OpenAI API key |
| `OPENAI_MODEL` | Optional | Chat model override |
| `EMAILJS_SERVICE_ID` | For contact form | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | For contact form | EmailJS email template ID |
| `EMAILJS_PUBLIC_KEY` | For contact form | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | Optional | EmailJS private key when account authorization requires it |

Keep all provider credentials server-side and never use a `VITE_` prefix.

### 3. Start the development server

```bash
npm run dev
```

The app is available at `http://localhost:3000`.
