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
var SnapchatAPIError = (function (_super) {
    __extends(SnapchatAPIError, _super);
    function SnapchatAPIError(message, code) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.code = code;
        SnapchatAPIError.captureStackTrace(_this);
        _this.name = 'SnapchatAPIError';
        return _this;
    }
    return SnapchatAPIError;
}(Error));
exports.default = SnapchatAPIError;
//# sourceMappingURL=SnapchatAPIError.js.map