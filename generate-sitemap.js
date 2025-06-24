const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { join } = require("path");

const links = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/about" },
  { url: "/projects" },
  { url: "/testimonials" },
  { url: "/contact" },
];

const hostname = "https://sitemap-generator.santosh-gamma.vercel.app";
const stream = new SitemapStream({ hostname });

(async () => {
  const outputPath = join(process.cwd(), "dist", "sitemap.xml");
  const writeStream = createWriteStream(outputPath);

  stream.pipe(writeStream);

  links.forEach((link) => stream.write(link));
  stream.end();

  await streamToPromise(stream);
})();
