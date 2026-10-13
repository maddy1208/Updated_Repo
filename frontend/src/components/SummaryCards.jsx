// src/components/SummaryCards.jsx
import { useFetch } from "../hooks/useFetch";

export default function SummaryCards() {
  const { data, loading, error } = useFetch("/summary");

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="error">Failed to load summary</div>;

  // Added optional chaining (?.) and fallback values (|| 0) to prevent the crash
  const cards = [
    { label: "Total Sites", value: data?.total_sites || 0 },
    { label: "Active Sites", value: data?.active_sites || 0 },
    { label: "Installations", value: data?.total_installations || 0 },
    { label: "Completed Units", value: data?.completed_units || 0 },
  ];

  return (
    <div className="summary-grid">
      {cards?.map((c) => (
        <div key={c.label} className="card">
          <h3>{c.label}</h3>
          <p>{c.value}</p>
        </div>
      ))}
    </div>
  );
}
