const express = require("express");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const { scrapeData } = require("./scrapers/scrape");

const app = express();
app.use(cors());
app.use(express.json()); // Ensure the server can parse JSON bodies

// Serve static files from the scraped_site directory
app.use(
  "/scraped_site",
  express.static(path.join(__dirname, "scrapers", "scraped_site"))
);

// Serve the scraped HTML
app.get("/api/scraped-html", (req, res) => {
  const htmlPath = path.join(
    __dirname,
    "scrapers",
    "scraped_site",
    "index.html"
  );
  res.sendFile(htmlPath);
});

// Handle POST request to receive the URL
app.post("/api/send-url", async (req, res) => {
  try {
    const { flightUrl } = req.body;
    if (!flightUrl) {
      return res.status(400).json({ error: "URL không hợp lệ." });
    }

    console.log(`Received URL: ${flightUrl}`);

    // Call the scraper function with the provided URL
    await scrapeData(flightUrl);

    res.status(200).json({ message: "Scraping thành công!" });
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Đã có lỗi xảy ra khi scraping." });
  }
});

// // Schedule scraping job to run every 24 hours
// cron.schedule("0 0 * * *", () => {
//   console.log("Running data scraping task every 24 hours");
//   scrapeData();
// });

// // Run initial scrape on startup
// scrapeData();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
