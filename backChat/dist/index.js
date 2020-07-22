'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

var port = 3000;

server.listen(port, function () {
    console.log('Porta rodadndo ' + port);
});

exports.default = server;
//# sourceMappingURL=index.js.map