const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let users = [];

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  const token = jwt.sign({ email: newUser.email }, "23456", {
    expiresIn: "1h",
  });

  res.status(201).json({
    token,
    email: user.email,
    message: "Signup successful"
  });
  console.log("Users after signup:", users);

});

app.post("/api/signin", async (req, res) => {    
  console.log(req.body); 
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ email: user.email }, "23456", {
    expiresIn: "1h",
  });

  res.json({
    token,
    email: user.email,
    message: "Login successful"
  });
});

app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "23456", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({ email: decoded.email });
  });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
