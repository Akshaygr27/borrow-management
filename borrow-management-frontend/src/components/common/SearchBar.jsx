export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative max-w-xs w-full">
      <input
        type="text"
        className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}