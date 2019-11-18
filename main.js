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
    let alarmpause;
    let mutesource;
    let alarmsource;

    createImg();
    markText();
    fetchNow("mute", false, function (object){
        mutesource = object.base64;
    });
    fetchNow("alarm", false, function (object){
        alarmsource = object.base64;
    });
    fetchcurrent(true);
    let banner = document.querySelector("a[title*='000webhost']");
    if(banner != null) banner.parentNode.removeChild(banner);
    setInterval(function () {
        let img = document.getElementById("partyParrot");
        if (img && img.src !== mainSource) {
            img.src = mainSource;
            markText();
        }
        let size = document.getElementById("size");
        if(size !== document.activeElement)
            size.value = currentWidth;
    }, 1000);
    loadAllParrots();


    function createImg() {
        let img = document.createElement("img");
        img.id = "partyParrot";
        img.onload = function () {
            let imgloader = document.getElementById("imgloader");
            if (imgloader != null) imgloader.parentNode.removeChild(imgloader);
            img.onload = function () {
            };
        };
        document.getElementById("content").prepend(img);
    }

    function fetchNow (parrot, recursive, processResponse) {
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
        }).catch(function (ignored) {
            if (recursive)
                setTimeout(function () {
                    fetchNow(parrot, true, processResponse);
                }, intervalInMs);
        });
    }

    function fetchcurrent(recursive) {
        fetchNow("currentParrot", recursive, function (object) {
            mainSource = object.base64;
            currentWidth = parseInt(object.width);
            setAlarmpause(object.alarmpause === "true", false);
        });
    }

    function setsource(parrot) {
        const data = new URLSearchParams();
        data.append("parrot", parrot);
        const url = domain + '/changeParrot.php';

        fetch(url, {
            method: 'POST',
            body: data,
        }).then(function (response) {
            fetchcurrent(false);
        });
    }

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

    function setAlarmpause(boolean, post) {
        setMute(boolean);
        if (post) {
            const url = domain + '/changeParrot.php';
            const data = new URLSearchParams();
            data.append("alarmpause", boolean);

            fetch(url, {
                method: 'POST',
                body: data,
            });
        }
    }

    function setMute(boolean){
        alarmpause = boolean;
        document.getElementById("mutebuttonimg").src = alarmpause ? mutesource : alarmsource;
    }

    function loadAllParrots(){
        fetchNow("all", false, object => {
            for(let parrot of object){
                let img = document.createElement("img");
                img.classList.add("thumbnail");
                img.src = parrot.base64;
                img.title = parrot.parrot;
                img.addEventListener("click", event =>{
                    setsource(parrot.parrot);
                });
                document.getElementById("thumbnails").prepend(img);
            }
            let loader = document.getElementById("thumbnailloader");
            if(loader != null) loader.parentNode.removeChild(loader);
        });
    }

    document.getElementById("form").addEventListener("submit", event => {
        event.preventDefault();
        let input = document.getElementById("parrot");
        setsource(input.value);
        return false;
    });

    document.getElementById("size").addEventListener("keydown", event => {
        if(event.keyCode === 13){
            let int = parseInt(event.target.value);
            if(isNaN(int) || int < 0 || int > 999)
                int = 100;
            resizeParrot(int, true);
            event.target.blur();
        }
    });

    document.getElementById("randombutton").addEventListener("click", event => {
        event.preventDefault();
        setsource("random");
    });

    document.getElementById("mutebutton").addEventListener("click", event => {
       setAlarmpause(!alarmpause, true);
    });

    document.getElementById("plusbutton").addEventListener("click", function increaseSize() {
        resizeParrot(currentWidth + 20, true);
    });
    document.getElementById("minusbutton").addEventListener("click", function decreaseSize() {
        resizeParrot(currentWidth - 20, true);
    });
}