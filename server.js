"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var mime_types_1 = __importDefault(require("mime-types"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var lookup = mime_types_1.default.lookup;
var server = http_1.default.createServer(function (req, res) {
    var path = req.url;
    if (path === "/" || path === "/home") {
        path = "/index.html";
    }
    var mime_type = lookup(path.substring(1));
    fs_1.default.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end("Error 404 - File Not Found" + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, { "Content-Type": mime_type });
        res.end(data);
    });
});
//# sourceMappingURL=server.js.map