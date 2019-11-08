"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = __importStar(require("../src/index"));
describe('passport-snapchat', function () {
    it('should export Strategy constructor', function () {
        chai_1.expect(index_1.default.Strategy).to.be.a('function');
    });
    it('should export Strategy constructor as module', function () {
        chai_1.expect(index_1.default).to.be.a('function');
        chai_1.expect(index_1.default).to.equal(index_1.Strategy);
    });
});
//# sourceMappingURL=package.spec.js.map