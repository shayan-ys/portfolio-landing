const fs = require("fs");
const Beasties = require("beasties");
const { join } = require("path");
const { parse } = require("node-html-parser");

// Recursive function to get HTML files
function getHTMLFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  
  for (const file of fileList) {
    const fullPath = `${dir}/${file}`;
    
    if (fs.statSync(fullPath).isDirectory()) {
      getHTMLFiles(fullPath, files);
    } else if (file.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function optimizeCriticalCSS() {
  console.log("🎨 Starting Critical CSS optimization...");
  
  const buildFolder = join(process.cwd(), ".next");
  const serverAppFolder = join(buildFolder, "server", "app");
  
  if (!fs.existsSync(serverAppFolder)) {
    console.log("❌ No server app folder found. Make sure you've run 'pnpm run build' first.");
    return;
  }

  const htmlFiles = getHTMLFiles(serverAppFolder);
  
  if (htmlFiles.length === 0) {
    console.log("❌ No HTML files found to optimize.");
    return;
  }

  console.log(`📄 Found ${htmlFiles.length} HTML files to optimize:`);
  htmlFiles.forEach(file => console.log(`   - ${file.replace(process.cwd(), '')}`));

  for (const file of htmlFiles) {
    try {
      console.log(`\n🔄 Processing: ${file.replace(process.cwd(), '')}`);
      
      const beasties = new Beasties({
        path: buildFolder,
        publicPath: '/_next/',
        external: false,
        inlineFonts: true,
        preloadFonts: true,
        fonts: true,
        fontDisplay: 'swap',
        compress: true,
        pruneSource: false,
        mergeStylesheets: true,
        additionalStylesheets: [],
        logLevel: 'info'
      });

      const originalHtml = fs.readFileSync(file, "utf-8");
      const optimizedHtml = await beasties.process(originalHtml);
      
      // Parse the optimized HTML to clean up any remaining stylesheet links in head
      const dom = parse(optimizedHtml);
      const head = dom.querySelector("head");
      const body = dom.querySelector("body");

      if (head) {
        // Remove any remaining stylesheet links from head that should be lazy-loaded
        for (const link of head.querySelectorAll("link[rel='stylesheet']")) {
          if (link.getAttribute("href")?.includes("/_next/static/css/")) {
            link.remove();
          }
        }
      }

      // Save the optimized HTML
      fs.writeFileSync(file, dom.toString());
      console.log(`✅ Optimized: ${file.replace(process.cwd(), '')}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log("\n🎉 Critical CSS optimization completed!");
  console.log("📈 Your pages now have inlined critical CSS for faster FCP and LCP!");
}

// Run the optimization
optimizeCriticalCSS().catch(console.error); 