# Architecture

## 1. Backend Architecture

- **Tech:** Node.js + Express.
- **Data Source:** CSV file loaded once on startup into in-memory array of `SaleRecord` objects.
- **Layers:**
  - `routes/` – HTTP routes (URL mapping).
  - `controllers/` – Parse query params, validate, and call services.
  - `services/` – Core business logic (search, filters, sorting, pagination).
  - `utils/` – CSV loading and helper utilities.
  - `models/` – `SaleRecord` structure.

### Data Flow

1. On startup, `csvLoader` reads `data/sales.csv` and creates `SaleRecord` instances.
2. `initSalesData` stores them in memory inside `salesService`.
3. `/api/sales` endpoint:
   - Controller parses query params (search, filters, sort, page).
   - Calls `listSales(options)` in service.
   - Service applies search → filters → sort → pagination and returns result.
4. JSON response contains page data + pagination metadata.

## 2. Frontend Architecture

- **Tech:** React + Vite
- **Entry:** `src/main.jsx` → `src/App.jsx`
- **Page:** `Dashboard` inside `App`.
- **Components:**
  - `SearchBar` – global search on customer name / phone.
  - `FilterPanel` – left sidebar with filters.
  - `SortDropdown` – sorting control.
  - `TransactionsTable` – table for paged transactions.
  - `PaginationControls` – page navigation.
- **Services:**
  - `services/api.js` – wraps calls to backend `/api/sales`.

### UI Flow

1. User types in search bar or changes filters / sort / page.
2. `App` composes query params and calls `fetchSales(params)`.
3. Backend returns filtered, sorted, paginated results.
4. React updates the table and pagination view.

## 3. Folder Structure

- `backend/`
  - `src/`
    - `models/`
    - `utils/`
    - `services/`
    - `controllers/`
    - `routes/`
    - `index.js`
  - `data/sales.csv`
- `frontend/`
  - `src/components/`
  - `src/services/`
  - `src/styles/`
  - `src/App.jsx`
  - `src/main.jsx`
