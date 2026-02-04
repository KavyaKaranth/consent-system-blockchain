const express = require("express");
const cors = require("cors");
require("dotenv").config();

const consentRoutes = require("./routes/consentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/consents", consentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
