"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SnapchatProfileParseError = (function (_super) {
    __extends(SnapchatProfileParseError, _super);
    function SnapchatProfileParseError(message, parseError) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.parseError = parseError;
        SnapchatProfileParseError.captureStackTrace(_this);
        _this.name = 'SnapchatProfileParseError';
        return _this;
    }
    return SnapchatProfileParseError;
}(Error));
exports.default = SnapchatProfileParseError;
//# sourceMappingURL=SnapchatProfileParseError.js.map