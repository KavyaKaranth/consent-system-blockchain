let consents = [];
let idCounter = 1;

// CREATE CONSENT
exports.createConsent = (req, res) => {
  const consent = {
    id: idCounter++,
    user_id: req.body.user_id,
    purpose: req.body.purpose,
    data_category: req.body.data_category,
    retention: req.body.retention,
    status: "ACTIVE",
    created_at: new Date()
  };

  consents.push(consent);
  res.status(201).json(consent);
};

// GET CONSENT BY ID
exports.getConsent = (req, res) => {
  const consent = consents.find(c => c.id == req.params.id);
  if (!consent) {
    return res.status(404).json({ message: "Consent not found" });
  }
  res.json(consent);
};

// REVOKE CONSENT
exports.revokeConsent = (req, res) => {
  const consent = consents.find(c => c.id == req.params.id);
  if (!consent) {
    return res.status(404).json({ message: "Consent not found" });
  }
  consent.status = "REVOKED";
  res.json(consent);
};

// LIST ALL CONSENTS (for demo)
exports.getAllConsents = (req, res) => {
  res.json(consents);
};
