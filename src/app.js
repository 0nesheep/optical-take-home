"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = require("./routes/users");
const upload_1 = require("./routes/upload");
const app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/users', users_1.usersRouter);
app.use('/upload', upload_1.uploadRouter);
