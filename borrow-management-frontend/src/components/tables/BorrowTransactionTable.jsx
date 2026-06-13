// src/components/tables/BorrowTransactionTable.jsx
export default function BorrowTransactionTable({ data }) {
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <th className="p-4">Borrower</th>
            <th className="p-4">Asset / Serial</th>
            <th className="p-4 text-center">Qty</th>
            <th className="p-4">Borrow Date</th>
            <th className="p-4">Expected Return</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {data.map((tx) => (
            <tr key={tx._id} className="hover:bg-slate-50/70 transition">
              <td className="p-4">
                <div className="font-medium text-slate-900">{tx.borrower?.name || "Unknown"}</div>
                <div className="text-xs text-slate-400 font-mono">{tx.borrower?.email}</div>
              </td>
              <td className="p-4">
                <div className="font-medium text-slate-800">{tx.equipment?.equipmentName || "Deleted Asset"}</div>
                <div className="text-xs text-slate-400 font-mono">{tx.equipment?.serialNumber || "N/A"}</div>
              </td>
              <td className="p-4 text-center font-semibold text-slate-600">{tx.quantity}</td>
              <td className="p-4 text-slate-500">{formatDate(tx.borrowDate)}</td>
              <td className="p-4 text-slate-500">{formatDate(tx.expectedReturnDate)}</td>
              <td className="p-4">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  tx.status === "Active" 
                    ? "bg-amber-50 text-amber-700 border border-amber-100" 
                    : "bg-green-50 text-green-700 border border-green-100"
                }`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}