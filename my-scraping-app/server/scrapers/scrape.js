const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Create a directory for the downloaded files
const saveDir = path.join(__dirname, "scraped_site");
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir);
}

// Function to clear the scraped_site folder
function clearScrapedSiteFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Unable to scan directory: " + err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file: " + err);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });
  });
}

// Save the file locally
async function saveFile(fileUrl, resourceType, content) {
  // Check if the URL is a data URI (inline SVG or base64 image)
  if (fileUrl.startsWith("data:")) {
    console.log(`Skipping data URI: ${fileUrl}`);
    return; // Don't attempt to save data URIs
  }

  const parsedUrl = url.parse(fileUrl);
  const filePath = path.join(saveDir, parsedUrl.pathname.replace(/\//g, "_"));

  // Save the resource with an appropriate file extension
  let ext = "";
  if (resourceType === "stylesheet") ext = ".css";
  if (resourceType === "script") ext = ".js";
  if (resourceType === "image") ext = path.extname(parsedUrl.pathname);

  fs.writeFileSync(`${filePath}${ext}`, content);
  return `${filePath}${ext}`;
}

async function scrapeData(targetUrl) {
  try {
    // Clear the scraped_site folder before running the scraping process
    clearScrapedSiteFolder(saveDir);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-extensions"],
    });

    const page = await browser.newPage();

    // Intercept requests and download resources
    page.on("response", async (response) => {
      const request = response.request();
      const resourceType = request.resourceType();

      // Skip processing if the response is a redirect (3xx status codes)
      if (response.status() >= 300 && response.status() < 400) {
        console.log(`Skipping redirect response: ${response.url()}`);
        return;
      }

      if (["stylesheet", "script", "image"].includes(resourceType)) {
        const url = request.url();
        const content = await response.buffer(); // Get resource content
        await saveFile(url, resourceType, content);
      }
    });

    // Use 'networkidle0' to wait until the network is idle
    await page.goto(targetUrl, {
      waitUntil: "networkidle0",
    }); // Replace with the URL from the request

    // // Get the full HTML content
    // const scrapedHtml = await page.content();

    // Get the HTML content of the specific element with ID #tblDepartureFlight
    const scrapedHtml = await page.$eval(
      "#tblDepartureFlight",
      (element) => element.innerHTML
    );

    await browser.close();

    // Save the HTML to a file
    const htmlPath = path.join(saveDir, "index.html");
    fs.writeFileSync(htmlPath, scrapedHtml);

    console.log("Scraping complete, HTML and assets saved.");
  } catch (error) {
    console.error("Error during scraping:", error);
    throw error; // Re-throw error to be caught in server.js
  }
}

module.exports = { scrapeData };
