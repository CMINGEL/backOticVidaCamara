import express from "express";
import productsRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/products", productsRoutes);
app.use("/category", categoryRoutes);

export default app;