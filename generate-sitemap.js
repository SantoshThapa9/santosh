import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { join } from "path";

const links = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/about" },
  { url: "/projects" },
  { url: "/testimonials" },
  { url: "/contact" },
];

const hostname = "https://santosh-gamma.vercel.app";
const stream = new SitemapStream({ hostname });

(async () => {
  try {
    const outputPath = join(process.cwd(), "dist", "sitemap.xml");
    const writeStream = createWriteStream(outputPath);

    stream.pipe(writeStream);

    links.forEach((link) => stream.write(link));
    stream.end();

    await streamToPromise(stream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  } catch {
    process.exit(1);
  }
})();
