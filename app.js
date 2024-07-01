require("dotenv").config();

const express = require("express");
const app = express();
const products_routes = require("./routes/product");

const PORT = process.env.PORT || 5000;

const connectDB = require("./db/connect");

app.get("/", (req, res) => {
  res.send("Hi, I am alive right now");
});

// Middleware or set router
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`${PORT} yes I am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
