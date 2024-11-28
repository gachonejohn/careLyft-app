const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const database = require("./backend/server/config/database");
const authRoutes = require("./backend/server/routes/auth");

const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use(express.static("./"));

// default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./", "index.html"));
});

// destination after successful registration/login
app.get("/patient-dashboard", (req, res) => {
  res.sendFile(__dirname + "patient.html");
});

app.get("/doctor-dashboard", (req, res) => {
  res.sendFile(__dirname + "./views/doctor-dashboard.html");
});

// User Registration Route
app.post("./pages/register-login/register.html", async (req, res) => {
  const { first_name, last_name, email, hashedPassword } = req.body;

  try {
    // Check if user already exists
    const [existingUsers] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await database.execute(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword]
    );

    res.json({ success: true, userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// User Login Route
app.post("./pages/register-login/login.html", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      userType: user.user_type,
      redirectUrl:
        user.user_type === "doctor"
          ? "/doctor-dashboard"
          : "/patient-dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
