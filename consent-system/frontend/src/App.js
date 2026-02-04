import CreateConsent from "./pages/CreateConsent";
import ViewConsent from "./pages/ViewConsent";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Machine Readable Legal Consent</h2>
      <CreateConsent />
      <hr />
      <ViewConsent />
    </div>
  );
}

export default App;
