"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT || 10;
//CREATE A USER
const registerFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hashSync(req.body.password, saltRounds);
    const user = new user_1.default({
        email: req.body.email,
        username: req.body.username,
        password: hash,
    });
    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((err) => res.status(500).json({ err }));
});
//LOGIN USER
const loginFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            const response = yield bcrypt_1.default.compareSync(req.body.password, user === null || user === void 0 ? void 0 : user.password);
            if (response === true) {
                res.status(201).json({ user });
            }
            else {
                res.status(500).json({ meassage: "password is incorrect" });
            }
        }
        else {
            res.status(500).json({ meassage: "user is not found" });
        }
    }
    catch (err) {
        res.status(500).json({ err });
    }
});
exports.default = { registerFunction, loginFunction };
