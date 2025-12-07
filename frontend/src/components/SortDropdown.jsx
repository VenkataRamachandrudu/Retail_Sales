const OPTIONS = [
  { value: "date", label: "Date" },
  { value: "quantity", label: "Quantity" },
  { value: "customerName", label: "Customer Name" }
];

export default function SortDropdown({ value, order, onChange, onToggleOrder }) {
  return (
    <div className="card sort-card">
      <span className="label">Sort by</span>
      <select
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button type="button" className="btn" onClick={onToggleOrder}>
        {order === "asc" ? "Asc ↑" : "Desc ↓"}
      </button>
    </div>
  );
}
