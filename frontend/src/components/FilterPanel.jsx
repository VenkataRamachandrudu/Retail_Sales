function MultiSelect({ label, options, value, onChange }) {
  const toggle = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="filter-group">
      <div className="label">{label}</div>
      <div className="chips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={
              value.includes(opt) ? "chip chip-selected" : "chip"
            }
            onClick={() => toggle(opt)}
          >
            {opt}
          </button>
        ))}
        {options.length === 0 && <div className="hint">No options</div>}
      </div>
    </div>
  );
}

export default function FilterPanel({ value, onChange, meta }) {
  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="card filter-card">
      <h2 className="panel-title">Filters</h2>

      <MultiSelect
        label="Customer Region"
        options={meta.regions || []}
        value={value.regions}
        onChange={(v) => update({ regions: v })}
      />

      <MultiSelect
        label="Gender"
        options={meta.genders || []}
        value={value.genders}
        onChange={(v) => update({ genders: v })}
      />

      <div className="filter-group">
        <div className="label">Age</div>
        <div className="age-range">
          <input
            className="input"
            type="number"
            placeholder="Min"
            value={value.ageMin}
            onChange={(e) => update({ ageMin: e.target.value })}
          />
          <span>–</span>
          <input
            className="input"
            type="number"
            placeholder="Max"
            value={value.ageMax}
            onChange={(e) => update({ ageMax: e.target.value })}
          />
        </div>
      </div>

      <MultiSelect
        label="Product Category"
        options={meta.categories || []}
        value={value.categories}
        onChange={(v) => update({ categories: v })}
      />

      <MultiSelect
        label="Tags"
        options={meta.tags || []}
        value={value.tags}
        onChange={(v) => update({ tags: v })}
      />

      <MultiSelect
        label="Payment Method"
        options={meta.paymentMethods || []}
        value={value.paymentMethods}
        onChange={(v) => update({ paymentMethods: v })}
      />

      <div className="filter-group">
        <div className="label">Date Range</div>
        <div className="age-range">
          <input
            className="input"
            type="date"
            value={value.startDate}
            onChange={(e) => update({ startDate: e.target.value })}
          />
          <span>–</span>
          <input
            className="input"
            type="date"
            value={value.endDate}
            onChange={(e) => update({ endDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
