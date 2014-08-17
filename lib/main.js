'use strict';

//noinspection JSUnresolvedFunction
var buttons = require('sdk/ui/button/action'); //noinspection JSUnresolvedFunction

//noinspection JSUnresolvedFunction
var tabs = require("sdk/tabs");

//noinspection JSUnresolvedFunction
var timers = require("sdk/timers");

//noinspection JSUnresolvedFunction
var net = require("sdk/net/xhr");

var pixelMaps = {
    icons: {
        'unread':
        [
            ['#b9d8f7', '#b9d8f6', '#bedcfa', '#c0defc', '#c2dffe', '#b7d5f5', '#b0d0ef', '#c2dffe', '#c3e0fe', '#b9d8f7', '#aeceee', '#c0defd', '#bcdbf9', '#b9d8f7', '#b9d8f7', '#bad8f6'],
            ['#b9d8f6', '#c3e0fe', '#84a7cb', '#769bc1', '#799ec3', '#406a96', '#3d6792', '#638ab1', '#81a5c9', '#456e99', '#3c6692', '#5179a2', '#aacaea', '#bfddfb', '#b9d7f6', '#bad8f6'],
            ['#c0defb', '#8cb0d2', '#204d7b', '#25527f', '#25517f', '#214e7c', '#1f4c7a', '#24517e', '#25517f', '#214e7c', '#1e4c7a', '#1e4b7a', '#39638f', '#b0cfef', '#bedcfa', '#b9d8f7'],
            ['#bedbfa', '#a1c1e2', '#35608c', '#2a5683', '#295582', '#48729c', '#5f86ad', '#285482', '#295583', '#416b95', '#6389b0', '#2b5784', '#1d4a78', '#86a9cd', '#c3e1fe', '#b8d7f6'],
            ['#bad8f6', '#c7e4ff', '#9bbdde', '#295583', '#1b4877', '#96b8da', '#b7d6f5', '#36618d', '#1b4977', '#84a8cc', '#c0defb', '#3f6994', '#1b4978', '#7095bb', '#c1dffd', '#b8d7f6'],
            ['#bad8f7', '#c1defc', '#a1c2e2', '#2f5b87', '#1a4876', '#94b7d9', '#b3d2f0', '#37628d', '#1b4877', '#84a7cb', '#bbd9f8', '#406a95', '#1c4a78', '#7095bb', '#c1dffd', '#b8d7f6'],
            ['#bad9f7', '#c1dffd', '#a1c1e3', '#2e5a86', '#1a4877', '#95b7d9', '#b4d2f1', '#37628d', '#1b4877', '#84a7cb', '#bbd9f8', '#406a95', '#1c4978', '#7095bb', '#c2e0fd', '#b8d7f6'],
            ['#bbdaf7', '#c1dffc', '#a0c1e3', '#2e5a86', '#1a4877', '#95b7d8', '#b3d2f2', '#37628e', '#1b4877', '#84a7cb', '#bbd9f7', '#406a95', '#1c4978', '#7096bc', '#c3e0fd', '#b8d7f6'],
            ['#bbd9f7', '#c2dffc', '#a1c1e2', '#2e5a87', '#1a4876', '#95b8d9', '#b3d2f2', '#37628e', '#1b4877', '#84a7cb', '#bcd9f9', '#406a95', '#1c4978', '#7095bc', '#c2dffd', '#b8d7f6'],
            ['#bcd9f7', '#c2dffc', '#a1c2e2', '#2e5a87', '#1a4877', '#95b7d9', '#b4d3f1', '#37628e', '#1b4877', '#84a7cb', '#bcd9f8', '#406a95', '#1c4a78', '#7095bb', '#c2e0fd', '#b8d7f6'],
            ['#bcd9f8', '#c2dffc', '#a1c2e2', '#2e5a87', '#1a4877', '#95b7d9', '#b4d2f1', '#37628e', '#1b4977', '#85a7cb', '#bcdaf7', '#406a95', '#1c4978', '#7195bc', '#c2dffd', '#b8d7f6'],
            ['#bbdaf7', '#c3e0fc', '#a1c2e2', '#2e5a87', '#1a4877', '#95b7d9', '#b4d2f1', '#37628e', '#1b4977', '#85a7cb', '#bddaf7', '#406a95', '#1c4978', '#7096bc', '#c2e0fd', '#b8d7f6'],
            ['#bcd9f7', '#c3e0fd', '#a1c2e2', '#2e5a87', '#1a4877', '#96b7d9', '#b5d3f1', '#37628d', '#1b4877', '#85a8cc', '#bddaf8', '#406a95', '#1c4978', '#7195bb', '#c3e0fd', '#b8d7f6'],
            ['#bcdaf7', '#c4e0fd', '#a1c1e2', '#295683', '#144372', '#95b6d8', '#b4d3f1', '#335e8a', '#154473', '#83a6ca', '#bddbf8', '#3c6692', '#164574', '#6e93b9', '#c3e0fe', '#b8d7f6'],
            ['#bcdaf7', '#c3dffc', '#a5c4e5', '#3c6792', '#2a5683', '#9abbdb', '#b6d4f1', '#446e98', '#2b5784', '#8badd0', '#bddaf8', '#4c759f', '#2b5884', '#799dc1', '#c2e0fc', '#b8d7f6'],
            ['#bcd9f7', '#bddbf8', '#bad8f5', '#aecdeb', '#accbea', '#b9d6f4', '#bbd9f7', '#afcded', '#acccea', '#b7d5f2', '#bddaf7', '#b0cfed', '#acccea', '#b5d3f1', '#bcd9f8', '#b8d7f6']
        ],

        'red':
        [
            ['#f7d8b9', '#f6d8b9', '#fadcbe', '#fcdec0', '#fedfc2', '#f5d5b7', '#efd0b0', '#fedfc2', '#fee0c3', '#f7d8b9', '#eeceae', '#fddec0', '#f9dbbc', '#f7d8b9', '#f7d8b9', '#f6d8ba'],
            ['#f6d8b9', '#fee0c3', '#cba784', '#c19b76', '#c39e79', '#966a40', '#92673d', '#b18a63', '#c9a581', '#996e45', '#92663c', '#a27951', '#eacaaa', '#fbddbf', '#f6d7b9', '#f6d8ba'],
            ['#fbdec0', '#d2b08c', '#7b4d20', '#7f5225', '#7f5125', '#7c4e21', '#7a4c1f', '#7e5124', '#7f5125', '#7c4e21', '#7a4c1e', '#7a4b1e', '#8f6339', '#efcfb0', '#fadcbe', '#f7d8b9'],
            ['#fadbbe', '#e2c1a1', '#8c6035', '#83562a', '#825529', '#9c7248', '#ad865f', '#825428', '#835529', '#956b41', '#b08963', '#84572b', '#784a1d', '#cda986', '#fee1c3', '#f6d7b8'],
            ['#f6d8ba', '#ffe4c7', '#debd9b', '#835529', '#77481b', '#dab896', '#f5d6b7', '#8d6136', '#77491b', '#cca884', '#fbdec0', '#94693f', '#78491b', '#bb9570', '#fddfc1', '#f6d7b8'],
            ['#f7d8ba', '#fcdec1', '#e2c2a1', '#875b2f', '#76481a', '#d9b794', '#f0d2b3', '#8d6237', '#77481b', '#cba784', '#f8d9bb', '#956a40', '#784a1c', '#bb9570', '#fddfc1', '#f6d7b8'],
            ['#f7d9ba', '#fddfc1', '#e3c1a1', '#865a2e', '#77481a', '#d9b795', '#f1d2b4', '#8d6237', '#77481b', '#cba784', '#f8d9bb', '#956a40', '#78491c', '#bb9570', '#fde0c2', '#f6d7b8'],
            ['#f7dabb', '#fcdfc1', '#e3c1a0', '#865a2e', '#77481a', '#d8b795', '#f2d2b3', '#8e6237', '#77481b', '#cba784', '#f7d9bb', '#956a40', '#78491c', '#bc9670', '#fde0c3', '#f6d7b8'],
            ['#f7d9bb', '#fcdfc2', '#e2c1a1', '#875a2e', '#76481a', '#d9b895', '#f2d2b3', '#8e6237', '#77481b', '#cba784', '#f9d9bc', '#956a40', '#78491c', '#bc9570', '#fddfc2', '#f6d7b8'],
            ['#f7d9bc', '#fcdfc2', '#e2c2a1', '#875a2e', '#77481a', '#d9b795', '#f1d3b4', '#8e6237', '#77481b', '#cba784', '#f8d9bc', '#956a40', '#784a1c', '#bb9570', '#fde0c2', '#f6d7b8'],
            ['#f8d9bc', '#fcdfc2', '#e2c2a1', '#875a2e', '#77481a', '#d9b795', '#f1d2b4', '#8e6237', '#77491b', '#cba785', '#f7dabc', '#956a40', '#78491c', '#bc9571', '#fddfc2', '#f6d7b8'],
            ['#f7dabb', '#fce0c3', '#e2c2a1', '#875a2e', '#77481a', '#d9b795', '#f1d2b4', '#8e6237', '#77491b', '#cba785', '#f7dabd', '#956a40', '#78491c', '#bc9670', '#fde0c2', '#f6d7b8'],
            ['#f7d9bc', '#fde0c3', '#e2c2a1', '#875a2e', '#77481a', '#d9b796', '#f1d3b5', '#8d6237', '#77481b', '#cca885', '#f8dabd', '#956a40', '#78491c', '#bb9571', '#fde0c3', '#f6d7b8'],
            ['#f7dabc', '#fde0c4', '#e2c1a1', '#835629', '#724314', '#d8b695', '#f1d3b4', '#8a5e33', '#734415', '#caa683', '#f8dbbd', '#92663c', '#744516', '#b9936e', '#fee0c3', '#f6d7b8'],
            ['#f7dabc', '#fcdfc3', '#e5c4a5', '#92673c', '#83562a', '#dbbb9a', '#f1d4b6', '#986e44', '#84572b', '#d0ad8b', '#f8dabd', '#9f754c', '#84582b', '#c19d79', '#fce0c2', '#f6d7b8'],
            ['#f7d9bc', '#f8dbbd', '#f5d8ba', '#ebcdae', '#eacbac', '#f4d6b9', '#f7d9bb', '#edcdaf', '#eaccac', '#f2d5b7', '#f7dabd', '#edcfb0', '#eaccac', '#f1d3b5', '#f8d9bc', '#f6d7b8']
        ],

        'green':
        [
            ['#00d800', '#00d800', '#00dc00', '#00de00', '#00df00', '#00d500', '#00d000', '#00df00', '#00e000', '#00d800', '#00ce00', '#00de00', '#00db00', '#00d800', '#00d800', '#00d800'],
            ['#00d800', '#00e000', '#00a700', '#009b00', '#009e00', '#006a00', '#006700', '#008a00', '#00a500', '#006e00', '#006600', '#007900', '#00ca00', '#00dd00', '#00d700', '#00d800'],
            ['#00de00', '#00b000', '#004d00', '#005200', '#005100', '#004e00', '#004c00', '#005100', '#005100', '#004e00', '#004c00', '#004b00', '#006300', '#00cf00', '#00dc00', '#00d800'],
            ['#00db00', '#00c100', '#006000', '#005600', '#005500', '#007200', '#008600', '#005400', '#005500', '#006b00', '#008900', '#005700', '#004a00', '#00a900', '#00e100', '#00d700'],
            ['#00d800', '#00e400', '#00bd00', '#005500', '#004800', '#00b800', '#00d600', '#006100', '#004900', '#00a800', '#00de00', '#006900', '#004900', '#009500', '#00df00', '#00d700'],
            ['#00d800', '#00de00', '#00c200', '#005b00', '#004800', '#00b700', '#00d200', '#006200', '#004800', '#00a700', '#00d900', '#006a00', '#004a00', '#009500', '#00df00', '#00d700'],
            ['#00d900', '#00df00', '#00c100', '#005a00', '#004800', '#00b700', '#00d200', '#006200', '#004800', '#00a700', '#00d900', '#006a00', '#004900', '#009500', '#00e000', '#00d700'],
            ['#00da00', '#00df00', '#00c100', '#005a00', '#004800', '#00b700', '#00d200', '#006200', '#004800', '#00a700', '#00d900', '#006a00', '#004900', '#009600', '#00e000', '#00d700'],
            ['#00d900', '#00df00', '#00c100', '#005a00', '#004800', '#00b800', '#00d200', '#006200', '#004800', '#00a700', '#00d900', '#006a00', '#004900', '#009500', '#00df00', '#00d700'],
            ['#00d900', '#00df00', '#00c200', '#005a00', '#004800', '#00b700', '#00d300', '#006200', '#004800', '#00a700', '#00d900', '#006a00', '#004a00', '#009500', '#00e000', '#00d700'],
            ['#00d900', '#00df00', '#00c200', '#005a00', '#004800', '#00b700', '#00d200', '#006200', '#004900', '#00a700', '#00da00', '#006a00', '#004900', '#009500', '#00df00', '#00d700'],
            ['#00da00', '#00e000', '#00c200', '#005a00', '#004800', '#00b700', '#00d200', '#006200', '#004900', '#00a700', '#00da00', '#006a00', '#004900', '#009600', '#00e000', '#00d700'],
            ['#00d900', '#00e000', '#00c200', '#005a00', '#004800', '#00b700', '#00d300', '#006200', '#004800', '#00a800', '#00da00', '#006a00', '#004900', '#009500', '#00e000', '#00d700'],
            ['#00da00', '#00e000', '#00c100', '#005600', '#004300', '#00b600', '#00d300', '#005e00', '#004400', '#00a600', '#00db00', '#006600', '#004500', '#009300', '#00e000', '#00d700'],
            ['#00da00', '#00df00', '#00c400', '#006700', '#005600', '#00bb00', '#00d400', '#006e00', '#005700', '#00ad00', '#00da00', '#007500', '#005800', '#009d00', '#00e000', '#00d700'],
            ['#00d900', '#00db00', '#00d800', '#00cd00', '#00cb00', '#00d600', '#00d900', '#00cd00', '#00cc00', '#00d500', '#00da00', '#00cf00', '#00cc00', '#00d300', '#00d900', '#00d700']
        ]
    },
    numbers: {
        0: [
            [1,1,1],
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [1,1,1]
        ],
            1: [
            [0,1,0],
            [1,1,0],
            [0,1,0],
            [0,1,0],
            [1,1,1]
        ],
            2: [
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [1,0,0],
            [1,1,1]
        ],
            3: [
            [1,1,1],
            [0,0,1],
            [0,1,1],
            [0,0,1],
            [1,1,1]
        ],
            4: [
            [0,0,1],
            [0,1,1],
            [1,0,1],
            [1,1,1],
            [0,0,1]
        ],
            5: [
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
            6: [
            [0,1,1],
            [1,0,0],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
            7: [
            [1,1,1],
            [0,0,1],
            [0,0,1],
            [0,1,0],
            [0,1,0]
        ],
            8: [
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
            9: [
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,0]
        ],
            '+': [
            [0,0,0],
            [0,1,0],
            [1,1,1],
            [0,1,0],
            [0,0,0]
        ],
            'k': [
            [1,0,1],
            [1,1,0],
            [1,1,0],
            [1,0,1],
            [1,0,1]
        ]
    }
};
var itemTypes = {
    "Advertisement":        "Ajánló",
    "AuthorReview":         "Alkotóértékelés",
    "BadgeOwnership":       "Kitüntetés",
    "Book":                 "Könyv",
    "Campaign":             "Kihívás",
    "Citation":             "Idézet",
    "Comment":              "Molyos blogbejegyzéshez hozzászólás",
    "Copy":                 "Könyvpéldány",
    "Cover":                "Borító",
    "Description":          "Fülszöveg",
    "Edition":              "Kiadás",
    "Entry":                "Blog",
    "Event":                "Esemény",
    "Follow":               "Figyelés",
    "Lend":                 "Kölcsönkérés",
    "Link":                 "Link",
    "List":                 "Lista",
    "LoveLetter":           "Szerelmeslevél",
    "Node":                 "Enciklopédia",
    "Poll":                 "Szavazás",
    "Post":                 "Molyos blogbejegyzés",
    "Recommendation":       "Ajánlás",
    "Reading":              "Olvasás",
    "Report":               "Hír",
    "Review":               "Értékelés",
    "Share":                "Megosztás",
    "Sight":                "Észlelés",
    "Statement":            "Karc",
    "SuggestionVote":       "Csoportos ajánlás",
    "Tale":                 "Polc",
    "Traveler":             "Utazókönyv",
    "Topic":                "Téma",
    "User":                 "Tag",
    "ZoneVote":             "Zóna"
};
var fresh_url = "http://moly.hu/api/fresh_counter_by_type_for_current_user";
var messages_url = "http://moly.hu/api/wave_notes_counter_for_current_user";

var hasMessage = false;
var freshItems = {};
var xhrFresh, xhrMessages;

var canvas = require("sdk/window/utils")
    .getMostRecentBrowserWindow()
    .document
    .createElementNS("http://www.w3.org/1999/xhtml", "canvas");
canvas.width = 16;
canvas.height = 16;

var button = buttons.ActionButton({
    id: "molwatcher-button",
    label: "Moly-figyelő",
    icon: "./moly-inactive.png",
    onClick: handleButtonClick
});

function handleButtonClick() {
    tabs.open("http://moly.hu/friss");
}

function maxker(items) {
    var maxkey = null;
    for (var key in items) {
        if ((!maxkey && items[key] != -1) ||
            (maxkey && items[maxkey] < items[key])) {

            maxkey = key;
        }
    }
    return maxkey;
}

function getIcon(which) {
    var ctx = canvas.getContext("2d");
    if (which == null) which = "unread";

    for (var y = 0; y < canvas.width; y++) {
        for (var x = 0; x < canvas.height; x++) {
            if (pixelMaps.icons[which][y][x]) {
                ctx.fillStyle = pixelMaps.icons[which][y][x];
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    return canvas;
}

function drawUnreadCount(unread, which) {
    if (which == null) which = "unread";

    var canvas = getIcon(which);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fef4ac";
    ctx.strokeStyle = "#dabc5c";
    ctx.strokeWidth = 1;

    var count = unread.length;
    if (count > 4) { unread = "1k+"; count = unread.length; }

    var bgHeight = pixelMaps.numbers[0].length;
    var bgWidth = 0;
    var padding = count < 4 ? 1 : 0;
    var topMargin = 2;

    for(var index = 0; index < count; index++) {
        bgWidth += pixelMaps.numbers[unread[index]][0].length;
        if(index < count-1) {
            bgWidth += padding;
        }
    }
    bgWidth = bgWidth > canvas.width-4 ? canvas.width-4 : bgWidth;

    ctx.fillRect(canvas.width-bgWidth-4,topMargin,bgWidth+4,bgHeight+4);

    var digit;
    var digitsWidth = bgWidth;
    for(var index = 0; index < count; index++) {
        digit = unread[index];

        if (pixelMaps.numbers[digit]) {
            var map = pixelMaps.numbers[digit];
            var height = map.length;
            var width = map[0].length;

            ctx.fillStyle = "#2c3323";

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    if(map[y][x]) {
                        ctx.fillRect(14- digitsWidth + x, y+topMargin+2, 1, 1);
                    }
                }
            }

            digitsWidth -= width + padding;
        }
    }

    ctx.strokeRect(canvas.width-bgWidth-3.5,topMargin+.5,bgWidth+3,bgHeight+3);

    return canvas;
}

function refreshIcon() {
    var items = freshItems;
    var sum = 0, key, label = "";

    while (key = maxker(items)) {
        if (label.length) label += "\n";
        label += "" + items[key] + "\t" + itemTypes[key];

        sum += items[key];
        items[key] = -1;
    }

    if (sum == 0) {
        button.icon = getIcon(hasMessage ? "green" : "unread").toDataURL("image/png");
        button.label = "Moly-figyelő";
        return;
    }

    button.icon = drawUnreadCount(String(sum), hasMessage ? "green" : "unread").toDataURL("image/png");
    button.label = label;
}

function doFreshTimer() {
    button.icon = "./loader.gif";

    xhrFresh = new net.XMLHttpRequest();
    xhrFresh.onload = function () {
        var responseText = this.responseText;

        if (responseText == "null") {
            button.icon = "./moly-inactive.png";
            return;
        }

        freshItems = JSON.parse(responseText);
        refreshIcon();

    };
    xhrFresh.onerror = function () {
        button.icon = getIcon("red");
        button.label = "Hiba a frissítéskor.";
    };
    xhrFresh.open("GET", fresh_url, true);
    xhrFresh.send();
}

function doMessageTimer() {
    button.icon = "./loader.gif";

    xhrMessages = new net.XMLHttpRequest();
    xhrMessages.onload = function () {
        hasMessage = parseInt(this.responseText) > 0;
        console.log("has message? " + (hasMessage ? "yay" : "nay"));
    };
    xhrMessages.onerror = function () {
        button.icon = getIcon("red");
        button.label = "Hiba a frissítéskor.";
    };
    xhrMessages.open("GET", messages_url, true);
    xhrMessages.send();
}

timers.setInterval(doFreshTimer, 60000);
timers.setInterval(doMessageTimer, 300000);

timers.setTimeout(doMessageTimer, 1000);
timers.setTimeout(doFreshTimer, 2000);
