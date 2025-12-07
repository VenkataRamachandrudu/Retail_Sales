// ------ DATE PARSER FIX ------- //
function parseDate(value) {
  if (!value) return null;

  // Case 1: Excel serial number (e.g., 44550)
  if (!isNaN(value)) {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + value * 86400000);
  }

  // Case 2: dd-mm-yyyy (e.g., 05-01-2022)
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [d, m, y] = value.split("-");
    return new Date(`${y}-${m}-${d}`);
  }

  // Case 3: mm/dd/yyyy (e.g., 1/5/2022)
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
    return new Date(value);
  }

  // Case 4: already ISO format or valid JS date
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

// ------ SALE RECORD MODEL ------ //
class SaleRecord {
  constructor(row) {
    this.customerId = row["Customer ID"];
    this.customerName = row["Customer Name"];
    this.phoneNumber = row["Phone Number"];
    this.gender = row["Gender"];
    this.age = Number(row["Age"]) || null;

    this.customerRegion = row["Customer Region"];
    this.customerType = row["Customer Type"];

    this.productId = row["Product ID"];
    this.productName = row["Product Name"];
    this.brand = row["Brand"];
    this.productCategory = row["Product Category"];

    this.tags = row["Tags"]
      ? String(row["Tags"]).split(",").map(t => t.trim()).filter(Boolean)
      : [];

    this.quantity = Number(row["Quantity"]) || 0;
    this.pricePerUnit = Number(row["Price per Unit"]) || 0;
    this.discountPercentage = Number(row["Discount Percentage"]) || 0;
    this.totalAmount = Number(row["Total Amount"]) || 0;
    this.finalAmount = Number(row["Final Amount"]) || 0;

    // FIXED DATE PARSING
    this.date = parseDate(row["Date"]);

    this.paymentMethod = row["Payment Method"];
    this.orderStatus = row["Order Status"];
    this.deliveryType = row["Delivery Type"];
    this.storeId = row["Store ID"];
    this.storeLocation = row["Store Location"];
    this.salespersonId = row["Salesperson ID"];
    this.employeeName = row["Employee Name"];
  }
}

module.exports = SaleRecord;
