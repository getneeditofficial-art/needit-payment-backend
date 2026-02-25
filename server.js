const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Razorpay keys (Dashboard se lo)
const razorpay = new Razorpay({
  key_id: "rzp_test_SKT6icJlDTrjXI",
  key_secret: "CnmKhvVtuDjLT8DgvocDNF9L"
});

// API to create order
app.post("/createOrder", async (req, res) => {
  const amount = req.body.amount;

  const options = {
    amount: amount * 100, // rupees to paise
    currency: "INR",
    receipt: "receipt1"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Order creation failed");
  }
});

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");

});
