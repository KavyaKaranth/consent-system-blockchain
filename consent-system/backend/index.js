const express = require("express");
const cors = require("cors");

const consentRoutes = require("./routes/consentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/consents", consentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
