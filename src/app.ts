import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
import { GlobalError } from "./controllers/errorController";
import categoryRouter from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";
import imageRouter from "./routes/imageRoutes";
import userRouter from "./routes/userRoutes";
import sizeRouter from "./routes/sizeRoutes";
import reviewRouter from "./routes/reviewRoutes";
import couponRouter from "./routes/couponRoutes";
import paymentRouter from "./routes/paymentRoutes";
import locationRouter from "./routes/locationRoutes";
import settingsRouter from "./routes/settingsRoutes";
import orderRouter from "./routes/orderRoutes";
dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));
app.use(ExpressMongoSanitize());
app.use(xss());
// app.use(hpp()); use this when implementing products
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
  })
);

console.log("Hello Node");

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/hi", (req, res) => {
  res.status(200).json({
    message: "hello user",
  });
});

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again later",
});

//security
app.use("/api", helmet());
// app.use("/api", limiter);

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/size", sizeRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/image", imageRouter);
app.use("/api/location", locationRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/order", orderRouter);

app.use(GlobalError);
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     "hello"
//   });
// });
