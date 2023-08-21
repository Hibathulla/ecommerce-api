"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./../.env" });
const mongoose_1 = __importDefault(require("mongoose"));
// const mongoose: Mongoose = require("mongoose");
// import app from "./app";
const app = require("./app.ts");
console.log(app, "app");
//mongoose connect
const DB = process.env.DATABASE?.replace("<PASSWORD>", process.env.MONGO_PASSWORD);
console.log(DB, "DB");
mongoose_1.default
    .connect("mongodb+srv://hibathullacm:lyH9YwE6E7jq624T@cluster0.9kt9qrz.mongodb.net/e-commerce?retryWrites=true&w=majority")
    .then(() => {
    console.log("DB connection is successfull");
})
    .catch((err) => console.log("Error connecting to database...💥"));
// 4) start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=server.js.map