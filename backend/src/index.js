require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { loadSalesData } = require("./utils/csvLoader");
const { initSalesData } = require("./services/salesService");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Retail backend running" });
});

app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 4000;
const CSV_PATH = process.env.CSV_PATH || path.join(__dirname, "..", "data", "sales.csv");

loadSalesData(CSV_PATH)
  .then((records) => {
    initSalesData(records);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV, starting server with empty dataset.", err);
    initSalesData([]);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  });
