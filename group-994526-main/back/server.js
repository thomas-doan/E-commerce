const express = require("express");
const cors = require("cors");
const checkTokenMiddleware = require("./jsonwebtoken/check");

let DB = require("./db.config");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user_router = require("./routes/users");

const user_adress_router = require("./routes/adresses");

const auth_router = require("./routes/auth");

const product_router = require("./routes/products");

const category_router = require("./routes/category");

app.get("/", (req, res) => res.send(`Project API Node js Express`));

app.use("/data_user", checkTokenMiddleware, user_router);

app.use("/user_adress", checkTokenMiddleware, user_adress_router);

app.use("/auth", auth_router);

app.use("/product", product_router);

app.use("/category", category_router);

app.use("*", (req, res) =>
  res
    .status(501)
    .send("You are not allowed to be there, you should come back please.")
);

DB.sequelize
  .authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is running on port ${process.env.SERVER_PORT}. Have fun !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));
