import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { borrowerApi } from "../../api/borrowerApi";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";

export default function BorrowerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [borrower, setBorrower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    borrowerApi.getBorrower(id)
      .then(res => setBorrower(res?.data || res))
      .catch(() => setError("Profile records could not be traced."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error || !borrower) return <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm max-w-xl">{error}</div>;

  return (
    <div className="max-w-2xl">
      <PageHeader title={borrower.name} description={`Department Assignment: ${borrower.department}`} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6 space-y-6">
        <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Email Address</span>
            <span className="text-sm font-mono text-slate-800 mt-1 block">{borrower.email}</span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Phone Line</span>
            <span className="text-base font-medium text-slate-800 mt-1 block">{borrower.phoneNumber || "N/A"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Department Unit</span>
            <span className="text-sm text-slate-800 font-medium mt-1 block">{borrower.department || "General"}</span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Database Tracker ID</span>
            <span className="text-xs font-mono text-slate-500 mt-1 block">{borrower._id}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button onClick={() => navigate("/borrowers")} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer">
            ← Back to Directory
          </button>
          <Link to={`/borrowers/edit/${borrower._id}`} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition shadow-sm">
            Edit Profile Properties
          </Link>
        </div>
      </div>
    </div>
  );
}