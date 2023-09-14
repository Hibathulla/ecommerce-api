"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorDev = void 0;
const sendErrorDev = (err, res) => {
    console.log(err.message, "err");
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
exports.sendErrorDev = sendErrorDev;
//# sourceMappingURL=SendErrorDev.js.map