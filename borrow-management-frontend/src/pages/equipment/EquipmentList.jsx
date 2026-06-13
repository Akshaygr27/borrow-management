import { useState, useEffect } from "react";
import { equipmentApi } from "../../api/equipmentApi";
import PageHeader from "../../components/common/PageHeader";
import EquipmentTable from "../../components/tables/EquipmentTable";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function EquipmentList() {
  const [equipments, setEquipments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchEquipment = () => {
    setLoading(true);
    equipmentApi.getEquipments()
      .then((res)=>{
        if (res && res.success && Array.isArray(res.data)) {
          setEquipments(res.data);
        } else if (Array.isArray(res)) {
          setEquipments(res);
        } else {
          setEquipments([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEquipment(); }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await equipmentApi.deleteEquipment(deleteId);
      setDeleteId(null);
      fetchEquipment();
    } catch (err) {
      console.error(err);
    }
  };

  

  const filteredData = equipments.filter(item =>
    item.equipmentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Equipment Inventory" 
        description="Manage organization assets and runtime status configurations" 
        actionLabel="+ Add New Equipment" 
        actionLink="/equipment/new" 
      />
      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search equipment..." />
      </div>
      {loading ? <Loader /> : filteredData.length === 0 ? <EmptyState /> : (
        <EquipmentTable data={filteredData} onDelete={(id) => setDeleteId(id)} />
      )}
      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDeleteConfirm} 
        title="Delete Equipment" 
        message="Are you certain you want to clear out this specific asset row?" 
      />
    </div>
  );
}