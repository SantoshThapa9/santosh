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

## Contact form backend

The contact form and portfolio assistant API are a separate Express application in `server/`. Install
its dependencies with `npm --prefix server ci`, copy
`server/.env.example` to `server/.env`, and set the server-only Redis and
EmailJS values. Start it with `npm run dev:server`. The server listens on
`http://localhost:4000` by default and allows the local frontend origins on
port 3000. In a second terminal, copy `.env.example` to the project root as
`.env` and start the frontend with `npm run dev`; `VITE_API_URL` is already
set to `http://localhost:4000` in the example. The health endpoint works
without provider credentials; sending a contact message requires valid Redis
and EmailJS settings in `server/.env`. Chat also requires `OPENAI_API_KEY` in
`server/.env`; it defaults to the cost-friendly `gpt-4o-mini` model and can be
changed with the optional `OPENAI_MODEL` setting. Never expose the OpenAI key
through a frontend `VITE_` variable.
Run the backend's HTTP and contact-flow tests with `npm --prefix server test`.

The repository includes a Render Blueprint in `render.yaml`. Apply it from
Render to create/update the API service. Its root directory is `server`, its
build command is `npm ci`, its start command is `npm start`, and its health
check is `/health`. Keep the build command limited to installation; do not run
`npm start` or `node index.js` as part of the build command. Render supplies
`PORT` automatically, and the server binds to `0.0.0.0`.

Set the Blueprint's unsynchronized secret variables in Render (never in
frontend `VITE_` variables):

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
| `FRONTEND_ORIGIN` | Comma-separated exact allowed frontend origins; for this site use `https://santosh-gamma.vercel.app` |
| `PORT` | Supplied by Render; local default is `4000` |

The frontend uses `VITE_API_URL` for API and health requests in both
development and production. Copy `.env.example` to `.env` for local
development, and set its value to the API server URL you want to use. To use a
different URL for production builds, create `.env.production` from
`.env.production.example` and set the production API URL there; Vite loads the
mode-specific file for production builds. In Vercel, set `VITE_API_URL`
separately for Preview and Production if they use different API servers.
Restart the dev server or rebuild after changing an environment value. These
URLs are public frontend configuration, not secrets. The API server must allow
each frontend origin through its `FRONTEND_ORIGIN` setting. The Vercel project
should use the repository root, `npm run build` as its build command, and
`dist` as its output directory.

The API allows at most two contact attempts per client IP per UTC calendar
day. It stores only HMAC digests in Redis. Redis errors fail closed. Redis
calls time out after 10 seconds and EmailJS calls after 15 seconds, so
upstream delays are bounded without the previous five-second Redis cutoff.
EmailJS requests are paced to at most one per second per server process, as
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
assistant is grounded in the portfolio details in `server/chat.js`; verify
those details there when portfolio content changes.

The contact form checks `/health` and retries only that safe GET for up to 90
seconds before submitting the message once. Health retries use backoff, with
each request capped at 10 seconds so a sleeping Render instance can be checked
again as it wakes. The contact POST is capped at 35 seconds; a POST timeout is
reported as ambiguous and is never automatically retried, avoiding duplicate
messages.
This makes cold starts recoverable but cannot eliminate the sleep delay on
Render's free plan; use an always-on instance to avoid sleeping. The Blueprint
sets `FRONTEND_ORIGIN=https://santosh-gamma.vercel.app`. If you deploy from the
Render dashboard rather than applying the Blueprint, use the same values and
settings above.

**Designed & Developed by [Santosh Thapa](https://santosh-gamma.vercel.app/)**  
