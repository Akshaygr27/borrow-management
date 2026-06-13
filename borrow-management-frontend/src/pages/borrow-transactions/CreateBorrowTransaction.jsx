// src/pages/borrow-transactions/CreateBorrowTransaction.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { borrowTransactionApi } from "../../api/borrowTransactionApi";
import { equipmentApi } from "../../api/equipmentApi";
import { borrowerApi } from "../../api/borrowerApi";
import PageHeader from "../../components/common/PageHeader";

export default function CreateBorrowTransaction() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const [equipments, setEquipments] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  
  const [formData, setFormData] = useState({
    borrower: "",
    equipment: "",
    quantity: 1,
    expectedReturnDate: "",
  });

  useEffect(() => {
    equipmentApi.getEquipments().then(res => setEquipments(res?.data || res || []));
    borrowerApi.getBorrowers().then(res => setBorrowers(res?.data || res || []));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      
      const response = await borrowTransactionApi.createTransaction({
        ...formData,
        borrowDate: new Date().toISOString(), // Generate assignment timestamp automatically
      });
      
      if (response && (response.success || response._id)) {
        navigate("/borrow-transactions");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Internal network failure when deploying asset mapping.");
    }
  };

  return (
    <div className="max-w-xl">
      <PageHeader title="New Equipment Assignment" description="Deploy operational inventory resources to active profiles" />

      {error && <div className="mb-4 mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Assign To (Borrower)</label>
          <select 
            name="borrower" 
            required 
            value={formData.borrower} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-slate-300 bg-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Select a member account...</option>
            {borrowers.map(b => (
              <option key={b._id} value={b._id}>{b.name} ({b.department})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Equipment Item</label>
          <select 
            name="equipment" 
            required 
            value={formData.equipment} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-slate-300 bg-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Select a deployable asset...</option>
            {equipments.map(e => (
              <option key={e._id} value={e._id}>{e.equipmentName} - S/N: {e.serialNumber} (Qty: {e.availableQuantity})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Deployment Quantity</label>
            <input 
              type="number" 
              name="quantity" 
              min="1" 
              required 
              value={formData.quantity} 
              onChange={handleChange} 
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Expected Return Date</label>
            <input 
              type="date" 
              name="expectedReturnDate" 
              required 
              value={formData.expectedReturnDate} 
              onChange={handleChange} 
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20" 
            />
          </div>
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
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm cursor-pointer"
          >
            Execute Assignment
          </button>
        </div>
      </form>
    </div>
  );
}