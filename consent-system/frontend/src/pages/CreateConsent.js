import { useState } from "react";

export default function CreateConsent() {
  const [form, setForm] = useState({
    user_id: "",
    purpose: "",
    data_category: "",
    retention: ""
  });

  const submit = async () => {
    const res = await fetch("http://localhost:5000/api/consents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert("Consent created with ID: " + data.id);
  };

  return (
    <div>
      <h3>Create Consent</h3>
      <input placeholder="User ID" onChange={e => setForm({...form, user_id: e.target.value})} />
      <br />
      <input placeholder="Purpose" onChange={e => setForm({...form, purpose: e.target.value})} />
      <br />
      <input placeholder="Data Category" onChange={e => setForm({...form, data_category: e.target.value})} />
      <br />
      <input placeholder="Retention" onChange={e => setForm({...form, retention: e.target.value})} />
      <br />
      <button onClick={submit}>Create</button>
    </div>
  );
}
