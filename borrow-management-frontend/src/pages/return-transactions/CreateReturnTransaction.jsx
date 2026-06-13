// src/pages/return-transactions/CreateReturnTransaction.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { borrowTransactionApi } from "../../api/borrowTransactionApi";
import { returnTransactionApi } from "../../api/returnTransactionApi";
import PageHeader from "../../components/common/PageHeader";

export default function CreateReturnTransaction() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [activeTransactions, setActiveTransactions] = useState([]);
  
  const [formData, setFormData] = useState({
    transaction: "",
    returnDate: new Date().toISOString().split("T")[0], // Defaults to today's date (YYYY-MM-DD)
  });

  useEffect(() => {
    // Fetch allocations and filter for active ones
    borrowTransactionApi.getTransactions()
      .then((res) => {
        const records = res?.data || res || [];
        // Only display transactions that haven't been returned yet
        const active = records.filter(tx => tx.status === "Active");
        setActiveTransactions(active);
      })
      .catch((err) => console.error("Failed loading transaction lists:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await returnTransactionApi.returnEquipment(formData);

      if (response && response.success) {
        navigate("/borrow-transactions");
      } else {
        setError(response.message || "Failed to process equipment intake transaction.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Internal network error processing asset returns.");
    }
  };

  return (
    <div className="max-w-xl">
      <PageHeader 
        title="Process Asset Intake" 
        description="Log returned equipment items back into deployment inventory data pools" 
      />

      {error && (
        <div className="mb-4 mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Select Active Loan Assignment</label>
          <select
            name="transaction"
            required
            value={formData.transaction}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 bg-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Choose an outstanding record...</option>
            {activeTransactions.map((tx) => (
              <option key={tx._id} value={tx._id}>
                {tx.borrower?.name || "Unknown"} — {tx.equipment?.equipmentName} (Qty: {tx.quantity})
              </option>
            ))}
          </select>
          {activeTransactions.length === 0 && (
            <p className="text-xs text-slate-400 mt-1.5">No outstanding equipment allocations found inside active records.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Check-In Return Date</label>
          <input
            type="date"
            name="returnDate"
            required
            value={formData.returnDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/borrow-transactions")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formData.transaction}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Returns Process
          </button>
        </div>
      </form>
    </div>
  );
}