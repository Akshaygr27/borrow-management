import { Link } from "react-router-dom";

export default function EquipmentTable({ data, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <th className="p-4">Name</th>
            <th className="p-4">Serial No / Category</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/70 transition">
              <td className="p-4 font-medium text-slate-900">{item.equipmentName}</td>
              <td className="p-4 text-slate-500">{item.serialNumber || "N/A"} / {item.category || "N/A"}</td>
              <td className="p-4">{item.availableQuantity || "General"}</td>
              <td className="p-4">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                  item.status === "AVAILABLE" ? "bg-green-50 text-green-700" : item.status === "BORROWED" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="p-4 text-right space-x-3">
                <Link to={`/equipment/${item._id}`} className="text-blue-600 hover:underline">View</Link>
                <Link to={`/equipment/edit/${item._id}`} className="text-slate-600 hover:underline">Edit</Link>
                <button onClick={() => onDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}