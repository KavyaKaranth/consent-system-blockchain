const pool = require("../db");

// CREATE CONSENT
exports.createConsent = async (req, res) => {
  try {
    const { user_id, purpose, data_category, retention } = req.body;

    const result = await pool.query(
      `INSERT INTO consents (user_id, purpose, data_category, retention, status)
       VALUES ($1,$2,$3,$4,'ACTIVE') RETURNING *`,
      [user_id, purpose, data_category, retention]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ CONSENT
exports.getConsent = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM consents WHERE id=$1",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REVOKE CONSENT
exports.revokeConsent = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE consents SET status='REVOKED' WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
