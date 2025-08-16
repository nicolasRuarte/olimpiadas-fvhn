import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import userRoutes from "@routes/user.routes";
import serviceRoutes from "@routes/service.routes";
import orderRoutes from "@routes/order.routes";
import orderDetailRoutes from "@routes/orderdetail.routes";
import ratingRoutes from "@routes/rating.routes";
import adminRoutes from "@routes/admin.routes";
import paymentRoutes from "@routes/payment.routes";
import authRoutes from "@routes/auth.routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);
app.use(serviceRoutes);
app.use(orderRoutes);
app.use(orderDetailRoutes);
app.use(ratingRoutes);
app.use(adminRoutes);
app.use(paymentRoutes);
app.use(authRoutes);

export default app;
