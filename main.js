(function ready() {
    if (document.readyState !== 'loading') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})();

function main() {
    const intervalInMs = 5000;
    const domain = 'https://changepartyparrot.000webhostapp.com';
    let mainSource = "";
    let currentWidth;
    markText();
    document.getElementById("form").addEventListener("submit", function (evt) {
        evt.preventDefault();
        const data = new URLSearchParams();
        let input = document.getElementById("parrot");
        data.append(input.name, input.value);
        const url = domain + '/changeParrot.php';

        fetch(url, {
            method: 'POST',
            body: data,
        }).then(function (response) {
            fetchNow("currentParrot", false,
                function (object) {
                    mainSource = object.base64;
                }
            );
        });
        return false;
    });

    const fetchNow = function (parrot, recursive, processResponse) {
        const url = new URL(domain + '/getParrot.php');
        url.search = new URLSearchParams({"parrot": parrot}).toString();

        fetch(url).then(function (response) {
            response.text().then(function (text) {
                let object = JSON.parse(text);
                processResponse(object);
                if (recursive)
                    setTimeout(function () {
                        fetchNow(parrot, true, processResponse);
                    }, intervalInMs);
            })
        }).catch(function (err) {
            if (recursive)
                setTimeout(function () {
                    fetchNow(parrot, true, processResponse);
                }, intervalInMs);
        });
    };

    function fetchcurrent(recursive) {
        fetchNow("currentParrot", recursive, function (object) {
            mainSource = object.base64;
            currentWidth = parseInt(object.width);
            /* setAlarmpause(object.alarmpause === "true", false);*/
        });
    }

    fetchcurrent(true);
    let banner = document.querySelector("a[title*='000webhost']");
    banner.parentNode.removeChild(banner);
    setInterval(function () {
        let img = document.getElementById("partyParrot");
        if (img.src !== mainSource) {
            img.src = mainSource;
            markText();
        }
        document.getElementById("size").innerText = currentWidth;
    }, 1000);

    function resizeParrot(px, post) {
        currentWidth = px;

        if (post) {
            const url = domain + '/changeParrot.php';
            const data = new URLSearchParams();
            data.append("width", currentWidth);

            fetch(url, {
                method: 'POST',
                body: data,
            }).then(function () {
                fetchcurrent(false);
            });
        }
    }

    function markText() {
        let input = document.getElementById("parrot");
        let len = input.value.length;
        input.focus();
        input.setSelectionRange(0, len);
    }

    document.getElementById("plusbutton").addEventListener("click", function increaseSize() {
        resizeParrot(currentWidth + 20, true);
    });
    document.getElementById("minusbutton").addEventListener("click", function decreaseSize() {
        resizeParrot(currentWidth - 20, true);
    });
}