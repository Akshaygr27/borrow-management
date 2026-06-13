import { useState, useEffect } from "react";
import { equipmentApi } from "../../api/equipmentApi";
import { borrowerApi } from "../../api/borrowerApi";

export default function BorrowTransactionForm({ onSubmit }) {
  const [equipments, setEquipments] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [formData, setFormData] = useState({ equipmentId: "", borrowerId: "", dueDate: "" });

  useEffect(() => {
    equipmentApi.getEquipments().then((data) => setEquipments(data.filter((e) => e.status === "AVAILABLE")));
    borrowerApi.getBorrowers().then(setBorrowers);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-slate-700">Select Equipment</label>
        <select required value={formData.equipmentId} onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })} className="mt-1 block w-full border border-slate-300 bg-white rounded-lg p-2 text-sm">
          <option value="">-- Choose Equipment --</option>
          {equipments.map((e) => <option key={e.id} value={e.id}>{e.name} ({e.serialNumber})</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Select Borrower Contact</label>
        <select required value={formData.borrowerId} onChange={(e) => setFormData({ ...formData, borrowerId: e.target.value })} className="mt-1 block w-full border border-slate-300 bg-white rounded-lg p-2 text-sm">
          <option value="">-- Choose Borrower --</option>
          {borrowers.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Return Calendar Due Date</label>
        <input type="date" required value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
        Execute Borrow Transaction
      </button>
    </form>
  );
}