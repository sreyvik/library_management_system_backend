"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role || "user";
    }
}
exports.UserModel = UserModel;
