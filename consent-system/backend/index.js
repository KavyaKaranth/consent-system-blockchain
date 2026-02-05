const express = require("express");
const cors = require("cors");

const consentRoutes = require("./routes/consentRoutes");

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

app.use("/api/consents", consentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

//chaincode
/*
'use strict';

//const { Contract } = require('fabric-contract-api');

class ConsentContract extends Contract {

  async CreateConsent(ctx, id, consentJson) {
    await ctx.stub.putState(id, Buffer.from(consentJson));
    return "Consent created";
  }

  async ReadConsent(ctx, id) {
    const data = await ctx.stub.getState(id);
    if (!data || data.length === 0) {
      throw new Error("Consent not found");
    }
    return data.toString();
  }

  async RevokeConsent(ctx, id) {
    const consent = JSON.parse((await ctx.stub.getState(id)).toString());
    consent.status = "REVOKED";
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(consent)));
    return "Consent revoked";
  }
}

module.exports = ConsentContract;
*/