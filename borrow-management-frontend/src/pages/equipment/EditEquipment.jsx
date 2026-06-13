import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { equipmentApi } from "../../api/equipmentApi";
import PageHeader from "../../components/common/PageHeader";
import EquipmentForm from "../../components/forms/EquipmentForm";
import Loader from "../../components/common/Loader";

export default function EditEquipment() {
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
          setError("Could not trace matching asset records.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch equipment details from backend.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleFormSubmit = async (formData) => {
    try {
      setError("");
      const response = await equipmentApi.updateEquipment(id, formData);
      if (response && (response.success || response._id || response.data)) {
        navigate("/equipment");
      } else {
        setError("Update transaction completed but missing success flag confirmations.");
      }
    } catch (err) {
      console.error("Failed updating asset item:", err);
      setError(err.response?.data?.message || "Internal network error while executing updates.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Modify Equipment Asset" description="Edit current profile metrics inside database schemas" />
      
      {error && (
        <div className="mb-4 max-w-xl p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {equipment && (
        <EquipmentForm 
          initialData={equipment} 
          onSubmit={handleFormSubmit} 
          submitLabel="Commit Changes" 
        />
      )}
    </div>
  );
}