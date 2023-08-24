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
import couponRouter from "./routes/couponRoutes";
import { sharpImage, uploadImage } from "./controllers/imageController";
import { upload } from "./utils/multer";
dotenv.config();
export const app = express();

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
    message: "hello",
  });
});

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again later",
});

//security
app.use("/api", helmet());
app.use("/api", limiter);

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/size", sizeRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/image", imageRouter);

app.use(GlobalError);
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     "hello"
//   });
// });
