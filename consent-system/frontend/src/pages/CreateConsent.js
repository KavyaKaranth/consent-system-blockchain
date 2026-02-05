import { useState } from "react";

const API = process.env.REACT_APP_API || "";

export default function CreateConsent() {
  const [form, setForm] = useState({
    user_id: "",
    purpose: "",
    data_category: "",
    retention: ""
  });

  const submit = async () => {
    try {
      console.log("Submitting form to:", `${API}/api/consents`);
      const res = await fetch(`${API}/api/consents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("Response:", data, "Status:", res.status);

      if (!res.ok) {
        alert("Error: " + (data.error || res.statusText));
        return;
      }

      if (data.id) {
        alert("Consent created with ID: " + data.id);
      } else {
        alert("Response received but ID is missing. Check console for details.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to create consent: " + error.message);
    }
  };

  return (
    <div>
      <h3>Create Consent</h3>

      <input placeholder="User ID"
        onChange={e => setForm({...form, user_id: e.target.value})} />
      <br />

      <input placeholder="Purpose"
        onChange={e => setForm({...form, purpose: e.target.value})} />
      <br />

      <input placeholder="Data Category"
        onChange={e => setForm({...form, data_category: e.target.value})} />
      <br />

      <input placeholder="Retention"
        onChange={e => setForm({...form, retention: e.target.value})} />
      <br />

      <button onClick={submit}>Create</button>
    </div>
  );
}
