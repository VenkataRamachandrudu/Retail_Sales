let SALES_DATA = [];

function initSalesData(records) {
  SALES_DATA = Array.isArray(records) ? records : [];
}

function getFilterMeta() {
  const regions = new Set();
  const genders = new Set();
  const categories = new Set();
  const tags = new Set();
  const paymentMethods = new Set();

  for (const r of SALES_DATA) {
    if (r.customerRegion) regions.add(r.customerRegion);
    if (r.gender) genders.add(r.gender);
    if (r.productCategory) categories.add(r.productCategory);
    if (Array.isArray(r.tags)) {
      r.tags.forEach(t => tags.add(t));
    }
    if (r.paymentMethod) paymentMethods.add(r.paymentMethod);
  }

  return {
    regions: Array.from(regions).sort(),
    genders: Array.from(genders).sort(),
    categories: Array.from(categories).sort(),
    tags: Array.from(tags).sort(),
    paymentMethods: Array.from(paymentMethods).sort()
  };
}

function listSales(options) {
  const {
    search,
    regions,
    genders,
    ageMin,
    ageMax,
    categories,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy = "date",
    sortOrder = "desc",
    page = 1,
    pageSize = 10
  } = options;

  let data = [...SALES_DATA];

  // SEARCH (customer name / phone)
  if (search) {
    const s = String(search).toLowerCase();
    data = data.filter(r => {
      const name = (r.customerName || "").toLowerCase();
      const phone = (r.phoneNumber || "").toLowerCase();
      return name.includes(s) || phone.includes(s);
    });
  }

  // FILTERS
  if (Array.isArray(regions) && regions.length > 0) {
    data = data.filter(r => regions.includes(r.customerRegion));
  }

  if (Array.isArray(genders) && genders.length > 0) {
    data = data.filter(r => genders.includes(r.gender));
  }

  if (ageMin != null || ageMax != null) {
    data = data.filter(r => {
      const age = Number(r.age);
      if (Number.isNaN(age)) return false;
      if (ageMin != null && age < ageMin) return false;
      if (ageMax != null && age > ageMax) return false;
      return true;
    });
  }

  if (Array.isArray(categories) && categories.length > 0) {
    data = data.filter(r => categories.includes(r.productCategory));
  }

  if (Array.isArray(tags) && tags.length > 0) {
    data = data.filter(r =>
      Array.isArray(r.tags) && r.tags.some(t => tags.includes(t))
    );
  }

  if (Array.isArray(paymentMethods) && paymentMethods.length > 0) {
    data = data.filter(r => paymentMethods.includes(r.paymentMethod));
  }

  if (startDate || endDate) {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    data = data.filter(r => {
      const d = r.date instanceof Date ? r.date : new Date(r.date);
      if (!(d instanceof Date) || Number.isNaN(d.getTime())) return false;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
  }

  // SORTING
  if (sortBy) {
    data.sort((a, b) => {
      let v1;
      let v2;
      switch (sortBy) {
        case "quantity":
          v1 = Number(a.quantity) || 0;
          v2 = Number(b.quantity) || 0;
          break;
        case "customerName":
          v1 = (a.customerName || "").toLowerCase();
          v2 = (b.customerName || "").toLowerCase();
          break;
        case "date":
        default:
          v1 = a.date ? new Date(a.date).getTime() : 0;
          v2 = b.date ? new Date(b.date).getTime() : 0;
      }
      if (v1 < v2) return sortOrder === "asc" ? -1 : 1;
      if (v1 > v2) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // PAGINATION
  const total = data.length;
  const safePageSize = pageSize && pageSize > 0 ? pageSize : 10;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(page || 1, 1), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;
  const pagedData = data.slice(startIndex, startIndex + safePageSize);

  return {
    data: pagedData,
    page: currentPage,
    pageSize: safePageSize,
    total,
    totalPages
  };
}

module.exports = {
  initSalesData,
  listSales,
  getFilterMeta
};
