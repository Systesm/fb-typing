'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typing = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectToParams = function ObjectToParams(data) {
    return Object.keys(data).map(function (k) {
        return k + '=' + encodeURIComponent(data[k]);
    }).join('&');
};

var typing = async function typing(receiver, fb_dtsg, cookies) {

    var request = await (0, _axios2.default)({
        url: 'https://www.facebook.com/ajax/messaging/typ.php?dpr=1',
        method: 'POST',
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, sdch',
            'accept-language': 'en-US,en;q=0.8,en-AU;q=0.6',
            'cookie': cookies,
            'dnt': '1',
            'origin': 'https://www.facebook.com',
            'referer': 'https://www.facebook.com/',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: ObjectToParams({
            "typ": "1",
            "to": receiver,
            "fb_dtsg": fb_dtsg
        }),
        withCredentials: true,
        maxRedirects: 5
    });
};

exports.typing = typing;