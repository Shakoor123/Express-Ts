"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../controllers/Auth"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("home right now");
});
router.post("/login", Auth_1.default.loginFunction);
router.post("/register", Auth_1.default.registerFunction);
exports.default = router;
