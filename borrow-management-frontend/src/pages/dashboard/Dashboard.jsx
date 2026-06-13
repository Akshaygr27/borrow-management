import { useState, useEffect } from "react";
import { dashboardApi } from "../../api/dashboardApi";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getDashboardStats()
      .then((res)=>{
        if(res && res.success && res.data){
            setStats(res.data)
        } else {
            setStats(res?.data || res || {})
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const metricCards = [
    { 
      title: "Total Equipment Items", 
      value: stats?.totalEquipment ?? 0, 
      color: "text-blue-600" 
    },
    { 
      title: "Active Borrowers", 
      value: stats?.totalBorrowers ?? 0, 
      color: "text-purple-600" 
    },
    { 
      title: "Active Borrowings", 
      value: stats?.activeBorrowings ?? 0, 
      color: "text-amber-500" 
    },
    { 
      title: "Currently Available", 
      value: stats?.equipmentCurrentlyAvailable ?? 0, 
      color: "text-green-600" 
    },
  ];

  return (
    <div>
      <PageHeader title="System Dashboard Dashboard" description="Overview of metrics & operational analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{card.title}</span>
            <span className={`text-4xl font-extrabold mt-4 ${card.color}`}>{card.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}