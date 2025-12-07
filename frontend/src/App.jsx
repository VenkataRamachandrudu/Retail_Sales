import { useEffect, useState } from "react";
import { fetchSales, fetchMeta } from "./services/api";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import SortDropdown from "./components/SortDropdown";
import TransactionsTable from "./components/TransactionsTable";
import PaginationControls from "./components/PaginationControls";

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    ageMin: "",
    ageMax: "",
    categories: [],
    tags: [],
    paymentMethods: [],
    startDate: "",
    endDate: ""
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [result, setResult] = useState({
    data: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1
  });
  const [meta, setMeta] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load meta once
  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Load sales when query changes
  useEffect(() => {
    const params = { search, sortBy, sortOrder, page, pageSize };

    if (filters.regions.length) params.region = filters.regions.join(",");
    if (filters.genders.length) params.gender = filters.genders.join(",");
    if (filters.ageMin) params.ageMin = filters.ageMin;
    if (filters.ageMax) params.ageMax = filters.ageMax;
    if (filters.categories.length) params.category = filters.categories.join(",");
    if (filters.tags.length) params.tag = filters.tags.join(",");
    if (filters.paymentMethods.length)
      params.paymentMethod = filters.paymentMethods.join(",");
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    setLoading(true);
    setError("");
    fetchSales(params)
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, filters, sortBy, sortOrder, page, pageSize]);

  const handleSearchChange = (value) => {
    setPage(1);
    setSearch(value);
  };

  const handleFilterChange = (nextFilters) => {
    setPage(1);
    setFilters(nextFilters);
  };

  const handleSortChange = (nextSortBy) => {
    setPage(1);
    setSortBy(nextSortBy);
  };

  const handleSortOrderToggle = () => {
    setPage(1);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Retail Sales Dashboard</h1>
      </header>
      <main className="app-main">
        <aside className="sidebar">
          <SearchBar value={search} onChange={handleSearchChange} />
          <FilterPanel
            value={filters}
            onChange={handleFilterChange}
            meta={meta}
          />
        </aside>
        <section className="content">
          <div className="content-top">
            <SortDropdown
              value={sortBy}
              order={sortOrder}
              onChange={handleSortChange}
              onToggleOrder={handleSortOrderToggle}
            />
          </div>
          <div className="content-body">
            {loading && <div className="status">Loading...</div>}
            {error && <div className="status error">{error}</div>}
            {!loading && !error && result.data.length === 0 && (
              <div className="status">No transactions found</div>
            )}
            {!loading && !error && result.data.length > 0 && (
              <>
                <TransactionsTable items={result.data} />
                <PaginationControls
                  page={result.page}
                  totalPages={result.totalPages}
                  onPageChange={setPage}
                  total={result.total}
                />
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
