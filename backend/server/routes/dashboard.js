const express = require("express");
const router = express.Router();
const path = require("path");

// Patient dashboard route
router.get("/patient-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/patient-dashboard.html"));
});

// Doctor dashboard route
router.get("/doctor-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/doctor-dashboard.html"));
});

module.exports = router;
