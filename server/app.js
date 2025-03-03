console.log("app.js: Application starting...");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

console.log(process.env.PORT)

const app = express();

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const contract = require("/Users/dilayecemaral/Desktop/spring25/milan2/artecommerce/server/routes/contractRoute.js");

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/payment", payment);

console.log("contract route about to be loaded");
app.use("/api/contract", contract);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

// error middleware
// app.use(errorMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("process.env.PORT:", process.env.PORT);
  console.log("Port being used:", port);
});

app.use((err, req, res, next) => {
  console.error("Express Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;