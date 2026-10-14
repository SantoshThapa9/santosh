# 🧑‍💻 Santosh Thapa | Software Engineer Portfolio

Welcome to the private repository for **Santosh Thapa's personal portfolio**, built to showcase technical expertise, modern UI/UX practices, and a strong foundation in full-stack web development. This project highlights a collection of real-world, production-ready web apps built using cutting-edge technologies.

## 🚀 About Me

I’m **Santosh Thapa**, a passionate Software Engineer focused on delivering high-performance, scalable, and user-friendly web applications.

**Core Skills:**
- 🔁 MERN Stack (MongoDB, Express.js, React.js, Node.js)
- ⚛️ Frontend Engineering (React.js, Next.js, TypeScript)
- 💅 Styling with Tailwind CSS, SASS/SCSS
- 🎨 UI/UX Design & Web Performance Optimization
- 📱 Responsive, Mobile-First Development
- 🔍 SEO-Friendly Architecture

📧 Email: [st8493510@gmail.com](mailto:st8493510@gmail.com)  
🌐 Portfolio: [santosh-gamma.vercel.app](https://santosh-gamma.vercel.app)  
🐱 GitHub: [@SantoshThapa9](https://github.com/SantoshThapa9)  
💼 LinkedIn: [@santosh986](https://www.linkedin.com/in/santosh986/)  
🐦 Twitter: [@SantoshThapa689](https://x.com/SantoshThapa689)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS, SCSS
- **Backend**: Node.js, Express.js, Firebase
- **Tools**: GitHub, Vercel, Framer Motion
- **Best Practices**: Clean Code, Accessibility, SEO, Responsive Design

---

## ⚠️ Repository Notice

This is a **private** repository and **not open for public use, cloning, or contribution**. The code and content are proprietary and intended solely for showcasing professional work and skills.

---

## Contact form and assistant APIs

The contact form, portfolio assistant, and health check are Vercel Serverless
Functions in `api/`. The frontend calls `/api/contact`, `/api/chat`, and
`/api/health` on the same origin, so no public API URL or `VITE_API_URL`
setting is needed.

Set these values in the Vercel project's **Settings → Environment Variables**
for every environment that should provide the corresponding feature. Keep them
server-side; never prefix secrets with `VITE_`.

| Variable | Purpose |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint URL (`https://...`) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `CONTACT_IP_HASH_SECRET` | Unique random secret (at least 32 characters) used to HMAC-hash client IPs before storing rate-limit keys |
| `OPENAI_API_KEY` | Server-only OpenAI API key used by the portfolio assistant |
| `OPENAI_MODEL` | Optional chat model override (default: `gpt-4o-mini`) |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | Optional EmailJS private key; set only if private-key authorization is enabled for the account |

For local development, copy `.env.example` to `.env.local` and replace the
placeholders with valid provider credentials. Only Redis and
`CONTACT_IP_HASH_SECRET` are needed for rate limiting; contact delivery also
needs the EmailJS values, and chat also needs `OPENAI_API_KEY`.
`EMAILJS_PRIVATE_KEY` and `OPENAI_MODEL` are optional.

The Vercel config explicitly builds the frontend as static output from `dist`
and each API handler with the Node.js function runtime. Exact API routes are
matched before the static filesystem and SPA fallback. Locally, copy
`.env.example` to `.env.local`, fill in the provider values, and run
`npm run dev`. Vite then executes the same handlers in `api/` through local
middleware and loads server-only values from `.env.local`. The frontend uses
same-origin API paths, so no `VITE_API_URL` is needed.
Never commit `.env.local` or expose provider keys in browser code.

The API allows at most two contact attempts per client IP per UTC calendar
day. It stores only HMAC digests in Redis. Redis errors fail closed. Redis
calls time out after 10 seconds and EmailJS calls after 15 seconds.
EmailJS requests are paced to at most one per second per warm function process, as
required by the EmailJS REST API. Configure `EMAILJS_PRIVATE_KEY` only if
private-key authorization is enabled for the account; keep it server-side and
never use a `VITE_` prefix. Rotate any EmailJS private keys previously
configured as `VITE_` variables, since those may already have been exposed in
a deployed browser bundle.

The portfolio assistant is available at `/assistant`. Its conversation is kept
in browser `sessionStorage` and can be reset with **New chat**. The floating
**Ask me** button only navigates to the assistant. Chat requests use Upstash
Redis to atomically allow five messages per client IP per minute, store only an
HMAC digest, and fail closed if Redis is unavailable. Each completion includes
at most five earlier messages and is capped at 350 generated tokens. The
assistant is grounded in the portfolio details in `api/chat.js`; verify those
details there when portfolio content changes.

The contact form checks `/api/health` before submitting a message once. The
health check retries transient failures with backoff; the contact POST is
capped at 35 seconds and is never automatically retried after a timeout,
avoiding duplicate messages. API requests accept only same-origin browser
requests. Redis errors fail closed. Redis calls time out after 10 seconds and
EmailJS calls after 15 seconds. EmailJS requests are paced to at most one per
second per warm function process. Configure `EMAILJS_PRIVATE_KEY` only if
private-key authorization is enabled for the account, and rotate any private
keys previously exposed in frontend `VITE_` variables.

Run the API handler tests with `npm run test:api`.

**Designed & Developed by [Santosh Thapa](https://santosh-gamma.vercel.app/)**  
