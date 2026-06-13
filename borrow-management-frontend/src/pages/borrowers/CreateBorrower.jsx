import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { borrowerApi } from "../../api/borrowerApi";
import PageHeader from "../../components/common/PageHeader";
import BorrowerForm from "../../components/forms/BorrowerForm";

export default function CreateBorrower() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleFormSubmit = async (formData) => {
    try {
      setError("");
      const res = await borrowerApi.createBorrower(formData);
      if (res && (res.success || res._id)) {
        navigate("/borrowers");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create borrower account registration.");
    }
  };

  return (
    <div>
      <PageHeader title="Add New Borrower" description="Register a member profile within the tracking database" />
      {error && <div className="mb-4 max-w-xl p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      <BorrowerForm onSubmit={handleFormSubmit} submitLabel="Register Borrower Account" />
    </div>
  );
}