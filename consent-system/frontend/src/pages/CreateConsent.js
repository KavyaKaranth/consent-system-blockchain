import { useState } from "react";

export default function CreateConsent() {
  const [form, setForm] = useState({
    user_id: "",
    purpose: "",
    data_category: "",
    retention: ""
  });

  const submit = async () => {
    await fetch("http://localhost:5000/api/consents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Consent Created");
  };

  return (
    <div>
      <h3>Create Consent</h3>
      <input placeholder="User ID" onChange={e => setForm({...form, user_id:e.target.value})} />
      <input placeholder="Purpose" onChange={e => setForm({...form, purpose:e.target.value})} />
      <input placeholder="Data Category" onChange={e => setForm({...form, data_category:e.target.value})} />
      <input placeholder="Retention" onChange={e => setForm({...form, retention:e.target.value})} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
