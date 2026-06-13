// src/components/forms/EquipmentForm.jsx
import { useState, useEffect } from "react";

export default function EquipmentForm({ initialData = {}, onSubmit, submitLabel = "Save Equipment" }) {
  const [formData, setFormData] = useState({
    equipmentName: "",
    category: "",
    serialNumber: "",
    availableQuantity: "",
    status: "Available",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        equipmentName: initialData.equipmentName || "",
        category: initialData.category || "",
        serialNumber: initialData.serialNumber || "",
        availableQuantity: initialData.availableQuantity ?? "", 
        status: initialData.status || "Available",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "availableQuantity" ? (value === "" ? "" : parseInt(value, 10) || 0) : value 
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-slate-700">Equipment Name</label>
        <input 
          type="text" 
          name="equipmentName" 
          required 
          value={formData.equipmentName} 
          onChange={handleChange} 
          className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20" 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Quantity</label>
          <input 
            type="number" 
            name="availableQuantity" 
            required
            value={formData.availableQuantity} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Serial Number</label>
          <input 
            type="text" 
            name="serialNumber" 
            required
            value={formData.serialNumber} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Category</label>
        <input 
          type="text" 
          name="category" 
          required
          value={formData.category} 
          onChange={handleChange} 
          className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Operational Status</label>
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange} 
          className="mt-1 block w-full border border-slate-300 bg-white rounded-lg p-2 text-sm"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer">
        {submitLabel}
      </button>
    </form>
  );
}