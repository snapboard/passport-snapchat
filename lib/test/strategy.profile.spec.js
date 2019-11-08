"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var config_1 = __importDefault(require("../src/config"));
var fs_1 = __importDefault(require("fs"));
var strategy_1 = __importDefault(require("../src/strategy"));
describe('Strategy#userProfile', function () {
    describe('fetched from Snapchat API with profile fields mapped from Portable Contacts schema and Snapchat properties', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret',
            profileFields: ['id', 'displayName', 'bitmoji'],
        }, function () { });
        strategy._oauth2.get = function (url, accessToken, callback) {
            if (url !== config_1.default.SNAP_KIT_API_URL + "/me?query=" + encodeURIComponent("{me{externalId displayName bitmoji{avatar id}}}")) {
                return callback(new Error('incorrect url argument'));
            }
            if (accessToken !== 'token') {
                return callback(new Error('incorrect token argument'));
            }
            fs_1.default.readFile('test/fixtures/me.json', 'utf8', function (err, data) {
                if (err) {
                    return callback(err);
                }
                callback(null, data, undefined);
            });
        };
        var profile;
        before(function (done) {
            strategy.userProfile('token', function (err, p) {
                if (err) {
                    return done(err);
                }
                profile = p;
                done();
            });
        });
        it('should parse profile', function () {
            chai_1.expect(profile.provider).to.equal('snapchat');
            chai_1.expect(profile.id).to.equal('my-external-id');
            chai_1.expect(profile.displayName).to.equal('Ghostface Chillah');
            chai_1.expect(profile.bitmoji.avatarId).to.equal('my-bitmoji-id');
            chai_1.expect(profile.bitmoji.avatarUrl).to.equal('https://render.bitstrips.com/v2/cpanel/sticker-circle-bitmoji-id.png?transparent=1&palette=1');
            chai_1.expect(profile.name).to.be.undefined;
            chai_1.expect(profile.username).to.be.undefined;
            chai_1.expect(profile.emails).to.be.undefined;
            chai_1.expect(profile.photos).to.be.undefined;
        });
        it('should set raw property', function () {
            chai_1.expect(profile._raw).to.be.a('string');
        });
        it('should set json property', function () {
            chai_1.expect(profile._json).to.be.an('object');
        });
    });
    describe('fetched from Snapchat API with profile fields mapped from Portable Contacts and custom properties', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret',
            profileFields: ['id', 'displayName', 'bitmoji{avatar}'],
        }, function () { });
        strategy._oauth2.get = function (url, accessToken, callback) {
            if (url !== config_1.default.SNAP_KIT_API_URL + "/me?query=" + encodeURIComponent("{me{externalId displayName bitmoji{avatar}}}")) {
                return callback(new Error('incorrect url argument'));
            }
            if (accessToken !== 'token') {
                return callback(new Error('incorrect token argument'));
            }
            fs_1.default.readFile('test/fixtures/meWithOnlyBitmojiAvatarUrl.json', 'utf8', function (err, data) {
                if (err) {
                    return callback(err);
                }
                callback(null, data, undefined);
            });
        };
        var profile;
        before(function (done) {
            strategy.userProfile('token', function (err, p) {
                if (err) {
                    return done(err);
                }
                profile = p;
                done();
            });
        });
        it('should parse profile', function () {
            chai_1.expect(profile.provider).to.equal('snapchat');
            chai_1.expect(profile.id).to.equal('my-external-id');
            chai_1.expect(profile.displayName).to.equal('Ghostface Chillah');
            chai_1.expect(profile.bitmoji.avatarId).to.be.undefined;
            chai_1.expect(profile.bitmoji.avatarUrl).to.equal('https://render.bitstrips.com/v2/cpanel/sticker-circle-bitmoji-id.png?transparent=1&palette=1');
            chai_1.expect(profile.name).to.be.undefined;
            chai_1.expect(profile.username).to.be.undefined;
            chai_1.expect(profile.emails).to.be.undefined;
            chai_1.expect(profile.photos).to.be.undefined;
        });
        it('should set raw property', function () {
            chai_1.expect(profile._raw).to.be.a('string');
        });
        it('should set json property', function () {
            chai_1.expect(profile._json).to.be.an('object');
        });
    });
    describe('error caused by invalid token when using Snapchat API', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret'
        }, function () { });
        strategy._oauth2.get = function (url, _accessToken, callback) {
            if (url !== config_1.default.SNAP_KIT_API_URL + "/me?query=" + encodeURIComponent('{me{}}')) {
                return callback(new Error('incorrect url argument'));
            }
            var body = 'Message';
            callback({ statusCode: 401, data: body });
        };
        var err;
        before(function (done) {
            strategy.userProfile('invalid-token', function (e) {
                err = e;
                done();
            });
        });
        it('should error', function () {
            chai_1.expect(err).to.be.an.instanceOf(Error);
            chai_1.expect(err.name).to.equal('SnapchatAPIError');
            chai_1.expect(err.message).to.equal("Message");
        });
    });
    describe('error caused by malformed response', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret'
        }, function () { });
        strategy._oauth2.get = function (_url, _accessToken, callback) {
            var body = 'Hello, world.';
            callback(null, body, undefined);
        };
        var err;
        before(function (done) {
            strategy.userProfile('token', function (e) {
                err = e;
                done();
            });
        });
        it('should error', function () {
            chai_1.expect(err).to.be.an.instanceOf(Error);
            chai_1.expect(err.message).to.contain('Failed to parse user profile');
        });
    });
    describe('internal error', function () {
        var strategy = new strategy_1.default({
            callbackURL: '',
            clientID: 'ABC123',
            clientSecret: 'secret'
        }, function verify() { });
        strategy._oauth2.get = function (_url, _accessToken, callback) {
            return callback(new Error('something went wrong'));
        };
        var err;
        var profile;
        before(function (done) {
            strategy.userProfile('token', function (e, p) {
                err = e;
                profile = p;
                done();
            });
        });
        it('should error', function () {
            chai_1.expect(err).to.be.an.instanceOf(Error);
            chai_1.expect(err.constructor.name).to.equal('InternalOAuthError');
            chai_1.expect(err.message).to.equal('Failed to fetch user profile');
            chai_1.expect(err.oauthError).to.be.an.instanceOf(Error);
            chai_1.expect(err.oauthError.message).to.equal('something went wrong');
        });
        it('should not load profile', function () {
            chai_1.expect(profile).to.be.undefined;
        });
    });
});
//# sourceMappingURL=strategy.profile.spec.js.map