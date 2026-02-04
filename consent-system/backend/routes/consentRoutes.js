const express = require("express");
const router = express.Router();

const {
  createConsent,
  getConsent,
  revokeConsent,
  getAllConsents
} = require("../controllers/consentController");

router.post("/", createConsent);
router.get("/", getAllConsents);
router.get("/:id", getConsent);
router.put("/:id/revoke", revokeConsent);

module.exports = router;
