"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flanker_controller_1 = require("../controllers/flanker.controller");
const readingRouter = express_1.default.Router();
readingRouter.route('/sendData').post((req, res) => new flanker_controller_1.FlankerController().submit(req, res));
exports.default = readingRouter;
