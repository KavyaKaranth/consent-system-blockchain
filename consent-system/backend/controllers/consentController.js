const getContract = require("../fabric");
//CREATE CONSENT
exports.createConsent = async (req, res) => {

  try {
    const contract = await getContract();
    const id = Date.now().toString();

    await contract.submitTransaction(
      "CreateConsent",
      id,
      JSON.stringify(req.body)
    );

    res.json({ id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get consent by id
exports.getConsent = async (req, res) => {

  try {
    const contract = await getContract();

    const result = await contract.evaluateTransaction(
      "ReadConsent",
      req.params.id
    );

    res.json(JSON.parse(result.toString()));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//revoke consent 
exports.revokeConsent = async (req, res) => {

  try {
    const contract = await getContract();

    await contract.submitTransaction(
      "RevokeConsent",
      req.params.id
    );

    res.json({ message: "Consent revoked" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// NOTE: Blockchain cannot easily list all data
exports.getAllConsents = async (req, res) => {
  res.json({
    message: "Listing all consents requires blockchain query iteration. Skipping for now."
  });
};