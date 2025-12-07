export default function TransactionsTable({ items }) {
  return (
    <div className="card table-card">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Product</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={`${row.customerId}-${row.productId}-${idx}`}>
              <td>
                {row.date
                  ? new Date(row.date).toISOString().slice(0, 10)
                  : "-"}
              </td>
              <td>{row.customerName}</td>
              <td>{row.phoneNumber}</td>
              <td>{row.customerRegion}</td>
              <td>{row.productName}</td>
              <td>{row.productCategory}</td>
              <td>{row.quantity}</td>
              <td>{row.finalAmount}</td>
              <td>{row.paymentMethod}</td>
              <td>{row.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
