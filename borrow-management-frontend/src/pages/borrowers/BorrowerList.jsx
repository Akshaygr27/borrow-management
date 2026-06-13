import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { borrowerApi } from "../../api/borrowerApi";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function BorrowerList() {
  const [borrowers, setBorrowers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchBorrowers = () => {
    setLoading(true);
    borrowerApi.getBorrowers()
      .then((res) => {
        setBorrowers(res?.data || res || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBorrowers(); }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await borrowerApi.deleteBorrower(deleteId);
      setDeleteId(null);
      fetchBorrowers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = borrowers.filter(b =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Registered Borrowers" 
        description="Manage members and tracking parameters details" 
        actionLabel="+ Add New Borrower" 
        actionLink="/borrowers/new" 
      />
      
      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
      </div>

      {loading ? (
        <Loader />
      ) : filteredData.length === 0 ? (
        <EmptyState message="No matching borrowers registered." />
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Department</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredData.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4 font-medium text-slate-900">{b.name}</td>
                  <td className="p-4 font-mono text-xs text-slate-500">{b.email}</td>
                  <td className="p-4 text-slate-600">{b.phoneNumber || "N/A"}</td>
                  <td className="p-4 font-medium text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs">{b.department}</span>
                  </td>
                  <td className="p-4 text-right space-x-3 text-xs font-medium">
                    <Link to={`/borrowers/${b._id}`} className="text-blue-600 hover:underline">View</Link>
                    <Link to={`/borrowers/edit/${b._id}`} className="text-slate-600 hover:underline">Edit</Link>
                    <button onClick={() => setDeleteId(b._id)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDeleteConfirm} 
        title="Remove Borrower" 
        message="Are you certain you want to erase this individual from access tracking lists?" 
      />
    </div>
  );
}