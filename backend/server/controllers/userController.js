const database = require("../config/database");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUsers] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await database.execute(
      "INSERT INTO users (first_name, last_name, email, hashedPassword) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      userType: user.user_type,
      redirectUrl:
        user.user_type === "doctor"
          ? "/views/doctor-dashboard"
          : "/views/patient-dashboard.html",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
