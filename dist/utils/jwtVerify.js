"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerifyPromisified = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerifyPromisified = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
exports.jwtVerifyPromisified = jwtVerifyPromisified;
//# sourceMappingURL=jwtVerify.js.map