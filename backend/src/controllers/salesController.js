const { listSales, getFilterMeta } = require("../services/salesService");

function parseMulti(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

const getSales = (req, res) => {
  const q = req.query;

  const ageMin = q.ageMin ? Number(q.ageMin) : null;
  const ageMax = q.ageMax ? Number(q.ageMax) : null;

  if (ageMin != null && ageMax != null && ageMin > ageMax) {
    return res.status(400).json({ error: "Invalid age range" });
  }

  const options = {
    search: q.search || "",
    regions: parseMulti(q.region),
    genders: parseMulti(q.gender),
    ageMin,
    ageMax,
    categories: parseMulti(q.category),
    tags: parseMulti(q.tag),
    paymentMethods: parseMulti(q.paymentMethod),
    startDate: q.startDate || null,
    endDate: q.endDate || null,
    sortBy: q.sortBy || "date",
    sortOrder: q.sortOrder || "desc",
    page: q.page ? Number(q.page) : 1,
    pageSize: q.pageSize ? Number(q.pageSize) : 10
  };

  const result = listSales(options);
  res.json(result);
};

const getMeta = (req, res) => {
  const meta = getFilterMeta();
  res.json(meta);
};

module.exports = { getSales, getMeta };
