const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const razorpay = new Razorpay({
  key_id: CnmKhvVtuDjLT8DgvocDNF9L,
  key_secret: CnmKhvVtuDjLT8DgvocDNF9L,
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // in paise
      currency: "INR",
      receipt: "receipt_1"
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
