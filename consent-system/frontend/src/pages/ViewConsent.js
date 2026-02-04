import { useState } from "react";

export default function ViewConsent() {
  const [id, setId] = useState("");
  const [consent, setConsent] = useState(null);

  const fetchConsent = async () => {
    const res = await fetch(`http://localhost:5000/api/consents/${id}`);
    const data = await res.json();
    setConsent(data);
  };

  return (
    <div>
      <h3>View Consent</h3>
      <input placeholder="Consent ID" onChange={e => setId(e.target.value)} />
      <button onClick={fetchConsent}>Fetch</button>

      {consent && <pre>{JSON.stringify(consent, null, 2)}</pre>}
    </div>
  );
}
