// src/pages/return-transactions/ReturnTransactionList.jsx
import { useState, useEffect } from "react";
import { borrowTransactionApi } from "../../api/borrowTransactionApi";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

export default function ReturnTransactionList() {
  const [returnedLogs, setReturnedLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    borrowTransactionApi.getTransactions()
      .then((res) => {
        const records = res?.data || res || [];
        const completed = records.filter(tx => tx.status === "Returned");
        setReturnedLogs(completed);
      })
      .catch(err => console.error("Error reading returned database entries:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const filteredLogs = returnedLogs.filter((tx) =>
    tx.borrower?.name?.toLowerCase().includes(search.toLowerCase()) ||
    tx.equipment?.equipmentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Returned Inventory Logs" 
        description="Historical logs of assets verified and returned to storage layers" 
        actionLabel="Process a Return" 
        actionLink="/return-transactions/new" 
      />

      <div className="mb-4">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search by borrower name or tool description..." 
        />
      </div>

      {loading ? (
        <Loader />
      ) : filteredLogs.length === 0 ? (
        <EmptyState message="No inventory checks or returns matching your criteria." />
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-4">Borrower</th>
                <th className="p-4">Asset Name</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4">Borrowed On</th>
                <th className="p-4">Returned On</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((tx) => (
                <tr key={tx._id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{tx.borrower?.name || "Unknown Member"}</div>
                    <div className="text-xs text-slate-400 font-mono">{tx.borrower?.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{tx.equipment?.equipmentName || "Deleted Item"}</div>
                    <div className="text-xs text-slate-400 font-mono">{tx.equipment?.serialNumber || "N/A"}</div>
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-600">{tx.quantity}</td>
                  <td className="p-4 text-slate-500">{formatDate(tx.borrowDate)}</td>
                  <td className="p-4 text-slate-900 font-medium">{formatDate(tx.returnDate)}</td>
                  <td className="p-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}