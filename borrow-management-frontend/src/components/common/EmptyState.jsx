export default function EmptyState({ message = "No data available matches your parameters." }) {
  return (
    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 p-8">
      <p className="text-slate-500 font-medium">{message}</p>
    </div>
  );
}