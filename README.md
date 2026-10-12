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
dev`; Vite proxies `/api` requests to the local Express server.

Deploy the Express app as a Node.js service and set the following environment
variables in that service's environment (never in frontend `VITE_` variables):

| Variable | Purpose |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint URL (`https://...`) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `CONTACT_IP_HASH_SECRET` | Unique random secret (at least 32 characters) used to HMAC-hash client IPs before storing rate-limit keys |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | Optional EmailJS private key; set only if private-key authorization is enabled for the account |
| `FRONTEND_ORIGIN` | Exact allowed frontend origin, such as `https://your-site.example` |
| `PORT` | Optional server port (defaults to `4000`) |
| `TRUST_PROXY` | Set to `1` only when the service is behind exactly one trusted reverse proxy |

For a separately deployed frontend, set the public build-time variable
`VITE_API_URL` to the Express service origin (for example,
`https://api.your-site.example`). The API allows at most two contact attempts
per client IP per UTC calendar day. It trusts forwarded client IP headers only
when `TRUST_PROXY=1`, and stores only HMAC digests in Redis. Redis errors fail
closed. EmailJS requests are paced to at most one per second per server
process, as required by the EmailJS REST API. Configure `EMAILJS_PRIVATE_KEY`
only if private-key authorization is enabled in the EmailJS account; keep it
server-side and never use a `VITE_` prefix. Rotate any EmailJS private keys
previously configured as `VITE_` variables, since those may already have been
exposed in a deployed browser bundle.

**Designed & Developed by [Santosh Thapa](https://santosh-gamma.vercel.app/)**  
