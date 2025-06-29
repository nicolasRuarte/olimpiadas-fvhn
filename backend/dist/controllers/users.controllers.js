"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
function createUser(req, res) {
    res.send("Usuario creado");
}
function getUser(req, res) {
    res.send("Usuario devuelto");
}
function updateUser(req, res) {
    res.send("Usuario actualizado");
}
function deleteUser(req, res) {
    res.send("Usuario borrado");
}
