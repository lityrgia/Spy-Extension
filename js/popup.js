const btn = document.querySelector("input[type='checkbox']")
const stateText = document.querySelector(".main__text-state")
const infoText = document.querySelector(".main__text-info")
const domain = document.querySelector(".domain")
const ads = document.querySelector(".blocked-ads")

let counterBlockedAds = 0
let maxCounterBlockedAds = 0;

let blockedUrls = ['chrome://newtab', 'https://www.google.com', 'chrome://extensions', 'https://classroom.google.com/']

function sessionStorage() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let url = tabs[0].url;

        const a = document.createElement("a");
        a.href = url;
        const baseUrl = `${a.protocol}//${a.hostname}`

        if (localStorage.getItem(baseUrl) == 'on') {
            stateText.innerHTML = "On"
            infoText.innerHTML = "You are <b class='enabled'>protected</b> againts trackers & ads!"
            changeInfo()
            btn.checked = true
            stateText.classList.add("enabled")
        }
    })
}

sessionStorage()

btn.addEventListener("click", () => {
    stateText.classList.toggle("enabled")
    if (btn.checked) {
        stateText.innerHTML = "On"
        infoText.innerHTML = "You are <b class='enabled'>protected</b> againts trackers & ads!"
        changeInfo()
    } else {
        stateText.innerHTML = 'Off'
        infoText.innerHTML = "You aren't protected againts trackers & ads."
        maxCounterBlockedAds = 0;
        counterBlockedAds = 0;
        ads.innerHTML = 0;
        domain.innerHTML = 'None'
        sessionStorageOff()
    }
})

function changeInfo() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let url = tabs[0].url;

        const a = document.createElement("a");
        a.href = url;
        const baseUrl = `${a.protocol}//${a.hostname}`

        domain.innerHTML = baseUrl

        localStorage.setItem(baseUrl, "on")

        if (blockedUrls.includes(domain.innerHTML)) return

        maxCounterBlockedAds = maxCounterBlockedAds = Math.round(Math.random() * 9);

        let interval = setInterval(() => {
            counterBlockedAds++
            ads.innerHTML = counterBlockedAds

            if (counterBlockedAds > maxCounterBlockedAds) {
                clearInterval(interval)
            }
        }, 60)
    })
}

function sessionStorageOff() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let url = tabs[0].url;

        const a = document.createElement("a");
        a.href = url;
        const baseUrl = `${a.protocol}//${a.hostname}`

        localStorage.setItem(baseUrl, "off")
    })
}
