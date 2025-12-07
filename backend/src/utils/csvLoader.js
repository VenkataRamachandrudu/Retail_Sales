const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const SaleRecord = require("../models/saleRecord");

function loadSalesData(csvPath) {
  return new Promise((resolve, reject) => {
    const results = [];
    const fullPath = path.resolve(csvPath);

    if (!fs.existsSync(fullPath)) {
      console.warn("[csvLoader] CSV file not found at", fullPath);
      return resolve(results);
    }

    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (row) => {
        results.push(new SaleRecord(row));
      })
      .on("end", () => {
        console.log(`[csvLoader] Loaded ${results.length} records from CSV`);
        resolve(results);
      })
      .on("error", (err) => {
        console.error("[csvLoader] Error while reading CSV", err);
        reject(err);
      });
  });
}

module.exports = { loadSalesData };
