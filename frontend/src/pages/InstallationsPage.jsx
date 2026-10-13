import { useFetch } from "../hooks/useFetch";

export default function InstallationsPage() {
  const { data, loading, error } = useFetch("/installations");

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error">{error}</p>;

  // SAFE GUARD: Agar data array nahi hai ya missing hai toh safe empty array fallback use karein
  const installationsList = Array.isArray(data) ? data : [];

  return (
    <section>
      <h2>Installations</h2>
      <table>
        <thead>
          <tr>
            <th>Site</th>
            <th>Equipment</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Installed At</th>
          </tr>
        </thead>
        <tbody>
          {/* Check length safely using our guarded array */}
          {installationsList.length === 0 && (
            <tr>
              <td colSpan={5}>No installations yet</td>
            </tr>
          )}

          {/* Safe mapping loop */}
          {installationsList.map((i) => (
            <tr key={i.id}>
              <td>{i.site_name || "—"}</td>
              <td>{i.equipment_type || "—"}</td>
              <td>{i.quantity || 0}</td>
              <td>{i.status || "Unknown"}</td>
              <td>
                {i.installed_at
                  ? new Date(i.installed_at).toLocaleString()
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
