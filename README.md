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

The contact form API is a separate Express application in `server/`. Install
its dependencies with `npm --prefix server install`, copy
`server/.env.example` to `server/.env`, fill in the server-only values, and
start it with `npm run dev:server`. The server also reads an existing project
root `.env` file as a fallback. Start the frontend separately with `npm run
dev`; Vite proxies `/api` and `/health` requests to the local Express server.
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
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | Optional EmailJS private key; set only if private-key authorization is enabled for the account |
| `FRONTEND_ORIGIN` | Comma-separated exact allowed frontend origins; for this site use `https://santosh-gamma.vercel.app` |
| `PORT` | Supplied by Render; local default is `4000` |
| `TRUST_PROXY` | Blueprint sets `1` for Render's trusted proxy; local default is off |

The checked-in `.env.production` configures the public API URL
`https://santosh-portfolio-9dky.onrender.com` for Vercel production builds;
Vite development uses the `/api` and `/health` proxies to
`http://localhost:4000`, so URLs do not need to be edited when switching
environments. If the API domain changes, update `VITE_API_URL` in
`.env.production` and set the same public variable in Vercel. The Vercel
project should use the repository root, `npm run build` as its build command,
and `dist` as its output directory.

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

The contact form checks `/health` and retries only that safe GET for up to 90
seconds before submitting the message once. This makes cold starts
recoverable but cannot eliminate the sleep delay on Render's free plan; use an
always-on instance to avoid sleeping. The Blueprint sets
`FRONTEND_ORIGIN=https://santosh-gamma.vercel.app` and `TRUST_PROXY=1`. If you
deploy from the Render dashboard rather than applying the Blueprint, use the
same values and settings above.

**Designed & Developed by [Santosh Thapa](https://santosh-gamma.vercel.app/)**  
