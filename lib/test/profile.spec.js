"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var profile_1 = require("../src/profile");
var chai_1 = require("chai");
describe('parse', function () {
    describe('profile with user.display_name scope only', function () {
        var profile;
        before(function (done) {
            fs_1.default.readFile('test/fixtures/meOnlyDisplayNameScope.json', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                var me = JSON.parse(data).data.me;
                profile = profile_1.parse(me);
                done();
            });
        });
        it('should parse profile', function () {
            chai_1.expect(profile.provider).to.equal('snapchat');
            chai_1.expect(profile.id).to.equal('my-external-id');
            chai_1.expect(profile.displayName).to.equal('Ghostface Chillah');
            chai_1.expect(profile.bitmoji.avatarId).to.be.undefined;
            chai_1.expect(profile.bitmoji.avatarUrl).to.be.undefined;
            chai_1.expect(profile.name).to.be.undefined;
            chai_1.expect(profile.username).to.be.undefined;
            chai_1.expect(profile.emails).to.be.undefined;
            chai_1.expect(profile.photos).to.be.undefined;
        });
    });
    describe('profile with user.display_name and user.bitmoji.avatar scope', function () {
        var profile;
        before(function (done) {
            fs_1.default.readFile('test/fixtures/me.json', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                var me = JSON.parse(data).data.me;
                profile = profile_1.parse(me);
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
    });
    describe('profile with no scope', function () {
        var profile;
        before(function (done) {
            fs_1.default.readFile('test/fixtures/meNoScopes.json', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                var me = JSON.parse(data).data.me;
                profile = profile_1.parse(me);
                done();
            });
        });
        it('should parse profile', function () {
            chai_1.expect(profile.provider).to.equal('snapchat');
            chai_1.expect(profile.id).to.be.undefined;
            chai_1.expect(profile.displayName).to.be.undefined;
            chai_1.expect(profile.bitmoji.avatarId).to.be.undefined;
            chai_1.expect(profile.bitmoji.avatarUrl).to.be.undefined;
            chai_1.expect(profile.name).to.be.undefined;
            chai_1.expect(profile.username).to.be.undefined;
            chai_1.expect(profile.emails).to.be.undefined;
            chai_1.expect(profile.photos).to.be.undefined;
        });
    });
});
//# sourceMappingURL=profile.spec.js.map