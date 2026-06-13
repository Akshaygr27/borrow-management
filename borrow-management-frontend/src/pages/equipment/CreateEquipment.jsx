import { useNavigate } from "react-router-dom";
import { equipmentApi } from "../../api/equipmentApi";
import PageHeader from "../../components/common/PageHeader";
import EquipmentForm from "../../components/forms/EquipmentForm";
import { useState } from "react";

export default function CreateEquipment() {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const handleFormSubmit = async (formData) => {
    try {
      setError("");
      const response = await equipmentApi.createEquipment(formData);

      if (response && (response.success || response._id)) {
        navigate("/equipment");
      } else {
        setError("Server received submission but did not return a success flag.");
      }
    } catch (err) {
      console.error("Failed to add new equipment item:", err);
      setError(err.response?.data?.message || "Internal server validation failure while saving asset.");
    }
  };

  return (
    <div>
      <PageHeader title="Add New Equipment" description="Insert a fresh deployable asset into tracking data layers" />

      {error && (
        <div className="mb-4 max-w-xl p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <EquipmentForm onSubmit={handleFormSubmit} submitLabel="Register Equipment Inventory" />
    </div>
  );
}