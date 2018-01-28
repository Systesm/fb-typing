"use strict";

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _promptInput = require("prompt-input");

var _promptInput2 = _interopRequireDefault(_promptInput);

var _promptPassword = require("prompt-password");

var _promptPassword2 = _interopRequireDefault(_promptPassword);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _fbLogin = require("./fbLogin");

var _fbLogin2 = _interopRequireDefault(_fbLogin);

var _typing = require("./typing");

var _getFriends = require("./getFriends");

var _timers = require("timers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeout = function timeout(ms) {
    return new Promise(function (res) {
        return setTimeout(res, ms);
    });
};

var TypetoFriends = async function TypetoFriends(friends, fb_dtsg, cookies) {
    for (var i = 0; i < friends.friends.data.length; i++) {
        var receiver = friends.friends.data[i].id;
        console.log(_chalk2.default.yellow.bold('[~] ') + _chalk2.default.greenBright('Typing: ') + _chalk2.default.green.bold(friends.friends.data[i].name));
        (0, _typing.typing)(receiver, fb_dtsg, cookies);
    }
    console.log(_chalk2.default.blue.bold('[...] ') + _chalk2.default.yellow.bold('Chờ đợi là hạnh phúc (20s)'));
    await timeout(20000);
    TypetoFriends(friends, fb_dtsg, cookies);
};

(async function () {
    try {

        console.log(_chalk2.default.blue.bold('Facebook Typing') + _chalk2.default.white(' by ') + _chalk2.default.green.underline.bold('GTFAF (fb.me/GTFAF)'));

        var username = await new _promptInput2.default({
            name: 'first',
            message: 'Nhập tài khoản của bạn'
        }).run();

        var password = await new _promptPassword2.default({
            type: 'password',
            message: 'Nhập mật khẩu của bạn',
            name: 'password'
        }).run();

        if (typeof username == 'undefined' || username.length < 5 || typeof password == 'undefined' || password.length < 5) throw _chalk2.default.bgRed.white.bold('Tài khoản hoặc mật khẩu vui lòng nhập hơn 5 ký tự');

        var login = await (0, _fbLogin2.default)(username, password);
        console.log(_chalk2.default.white.bgGreen.bold('Đăng nhập thành công!'));
        var friends = await (0, _getFriends.getFriends)(login.access_token);
        console.log(_chalk2.default.bgCyan.white.bold('Lấy danh sách bạn bè...'));
        var tokenType = await (0, _getFriends.getFb_dtsg)(login.cookies);
        var $ = _cheerio2.default.load(tokenType);
        var fb_dtsg = $('[name=fb_dtsg]').val();

        console.log(_chalk2.default.bgBlueBright.white('Bắt đầu soạn tin cho bạn bè...'));
        await TypetoFriends(friends, fb_dtsg, login.cookies);
    } catch (error) {
        console.log(error);
    }
})();