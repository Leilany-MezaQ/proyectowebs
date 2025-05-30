import express from "express";
import morgan from "morgan";
import routes from "./routes/router";
import connectDB from "./config/db"; // Cambiado a import default

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
