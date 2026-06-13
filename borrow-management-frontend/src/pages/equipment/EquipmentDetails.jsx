import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { equipmentApi } from "../../api/equipmentApi";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";

export default function EquipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    equipmentApi.getEquipment(id)
      .then((res) => {
        const item = res?.data || res;
        if (item) {
          setEquipment(item);
        } else {
          setError("Equipment records could not be found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch equipment details from backend.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (error || !equipment) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm max-w-xl">
        {error || "Asset not found."}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <PageHeader 
        title={equipment.equipmentName} 
        description={`Asset Profile for Serial Number: ${equipment.serialNumber}`} 
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 mt-6 space-y-6">
        <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Category</span>
            <span className="text-base font-medium text-slate-800 mt-1 block">{equipment.category || "Unassigned"}</span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Available Quantity</span>
            <span className="text-base font-medium text-slate-800 mt-1 block">{equipment.availableQuantity ?? 0} Units</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Operational Status</span>
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold mt-2 ${
              equipment.status === "Available" || equipment.status === "AVAILABLE" 
                ? "bg-green-50 text-green-700 border border-green-100" 
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}>
              {equipment.status}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">System ID</span>
            <span className="text-xs font-mono text-slate-500 mt-1 block">{equipment._id}</span>
          </div>
        </div>

        {/* Action Buttons footer */}
        <div className="flex items-center justify-between pt-2">
          <button 
            onClick={() => navigate("/equipment")} 
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            ← Back to Inventory
          </button>
          
          <Link 
            to={`/equipment/edit/${equipment._id}`} 
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition shadow-sm"
          >
            Edit Asset Properties
          </Link>
        </div>
      </div>
    </div>
  );
}