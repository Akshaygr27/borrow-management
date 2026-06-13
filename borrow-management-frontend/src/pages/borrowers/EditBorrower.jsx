import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { borrowerApi } from "../../api/borrowerApi";
import PageHeader from "../../components/common/PageHeader";
import BorrowerForm from "../../components/forms/BorrowerForm";
import Loader from "../../components/common/Loader";

export default function EditBorrower() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [borrower, setBorrower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    borrowerApi.getBorrower(id)
      .then(res => setBorrower(res?.data || res))
      .catch(() => setError("Failed to fetch borrower profile metrics."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFormSubmit = async (formData) => {
    try {
      await borrowerApi.updateBorrower(id, formData);
      navigate("/borrowers");
    } catch (err) {
      setError(err.response?.data?.message || "Failed saving adjustments.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Edit Borrower Profile" description="Modify properties of a registered borrower account" />
      {error && <div className="mb-4 max-w-xl p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      <BorrowerForm initialData={borrower} onSubmit={handleFormSubmit} submitLabel="Commit Changes" />
    </div>
  );
}