import { useState, useEffect } from "react";

export default function BorrowerForm({ initialData = {}, onSubmit, submitLabel = "Save Borrower" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        department: initialData.department || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-slate-700">Full Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          value={formData.name} 
          onChange={handleChange} 
          className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Email Address</label>
        <input 
          type="email" 
          name="email" 
          required 
          value={formData.email} 
          onChange={handleChange} 
          className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone Number</label>
          <input 
            type="text" 
            name="phoneNumber" 
            required 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Department</label>
          <input 
            type="text" 
            name="department" 
            required 
            placeholder="e.g. Dev, QA, DS"
            value={formData.department} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm" 
          />
        </div>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer">
        {submitLabel}
      </button>
    </form>
  );
}