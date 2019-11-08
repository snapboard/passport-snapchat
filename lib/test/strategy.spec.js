"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var strategy_1 = __importDefault(require("../src/strategy"));
var config_1 = __importDefault(require("../src/config"));
describe('Strategy', function () {
    describe('constructed', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret',
            scope: ['user.display_name', 'user.bitmoji.avatar'],
        }, function () { });
        it('should be named snapchat', function () {
            chai_1.expect(strategy.name).to.equal('snapchat');
        });
        it('should have fully qualified scopes', function () {
            chai_1.expect(strategy._scope[0]).to.equal(config_1.default.OAUTH_SCOPE_URL_PREFIX + 'user.display_name');
            chai_1.expect(strategy._scope[1]).to.equal(config_1.default.OAUTH_SCOPE_URL_PREFIX + 'user.bitmoji.avatar');
        });
    });
    describe('constructed with undefined options', function () {
        it('should throw', function () {
            chai_1.expect(function () {
                new strategy_1.default(undefined, function () { });
            }).to.throw(Error);
        });
    });
    describe('authorization request with documented parameters', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret',
            scope: ['user.display_name', 'user.bitmoji.avatar'],
        }, function () { });
        var url;
        before(function (done) {
            chai_1.default.passport.use(strategy)
                .redirect(function (u) {
                url = u;
                done();
            })
                .req(function (req) {
                req.session = {};
            })
                .authenticate({});
        });
        it('should be redirected', function () {
            chai_1.expect(url).to.equal(config_1.default.SNAP_ACCOUNTS_AUTH_URL + "?response_type=code" +
                '&scope=' + encodeURIComponent(config_1.default.OAUTH_SCOPE_URL_PREFIX + 'user.display_name ') +
                encodeURIComponent(config_1.default.OAUTH_SCOPE_URL_PREFIX + 'user.bitmoji.avatar') +
                "&client_id=ABC123");
        });
    });
});
//# sourceMappingURL=strategy.spec.js.map