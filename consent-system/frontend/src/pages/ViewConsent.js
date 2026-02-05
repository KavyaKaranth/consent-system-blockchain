import { useState } from "react";

const API = process.env.REACT_APP_API || "";

export default function ViewConsent() {
  const [id, setId] = useState("");
  const [consent, setConsent] = useState(null);
  const [error, setError] = useState(null);

  const fetchConsent = async () => {
    try {
      setError(null);
      console.log("Fetching consent from:", `${API}/api/consents/${id}`);
      
      const res = await fetch(`${API}/api/consents/${id}`);
      const data = await res.json();
      
      console.log("Response:", data, "Status:", res.status);
      
      if (!res.ok) {
        setError(data.error || res.statusText);
        return;
      }
      
      setConsent(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>View Consent</h3>
      <input placeholder="Consent ID" onChange={e => setId(e.target.value)} />
      <button onClick={fetchConsent}>Fetch</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {consent && (
        <pre>{JSON.stringify(consent, null, 2)}</pre>
      )}
    </div>
  );
}

