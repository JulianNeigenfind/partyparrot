(function ready() {
    if (document.readyState !== 'loading') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})();

function main() {
    const intervalInMs = 1000;
    const domain = 'http://neigenfind.bplaced.net/'/*'https://changepartyparrot.000webhostapp.com'*/;
    let mainSource = "";
    let currentWidth;
    let alarmpause;
    let mutesource;
    let alarmsource;
    let timestart = Date.now();

    //caching

    loadEverything();
    displayTextAfterTenSeconds();

    //maintask

    fetchcurrentrecursivelywithcheck();


    //functions

    function loadEverything() {
        Promise.all([
            fetchNow("mute", function (object) {
                mutesource = object.base64;
            }),
            fetchNow("alarm", function (object) {
                alarmsource = object.base64;
            }),
        ]).then(fetchcurrent).then(createImg).then(loadAllParrots);
    }

    function createImg() {
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.id = "partyParrot";
            img.onload = resolve;
            img.onerror = reject;
            img.src = mainSource;
            document.getElementById("content").prepend(img);
        });
    }

    function displayTextAfterTenSeconds() {
        setTimeout(function () {
            let longcachingtext = document.getElementById("longcachingtext");
            if (longcachingtext) longcachingtext.style.display = "";
        }, 10000);
    }

    function fetchNow(parrot, processResponse) {
        const url = new URL(domain + '/getParrot.php');
        url.search = new URLSearchParams({"parrot": parrot}).toString();

        return fetch(url).then(function (response) {
            return response.text().then(function (text) {
                let object = JSON.parse(text);
                processResponse(object);
            });
        });
    }

    function fetchcurrent() {
        return fetchNow("currentParrot", function (object) {
            mainSource = object.base64;
            currentWidth = parseInt(object.width);
            setAlarmpause(object.alarmpause === "true", false);
        });
    }

    function fetchcurrentrecursivelywithcheck() {
        const url = new URL(domain + '/getParrot.php');
        url.search = new URLSearchParams({"parrot": "changed"}).toString();
        fetch(url).then(function (response) {
            response.text().then(function (changed) {
                if (changed === '1') {
                    fetchcurrent().then(changeValuesIfNecessary);
                }
                setTimeout(function () {
                    fetchcurrentrecursivelywithcheck();
                }, intervalInMs);
            })
        });
    }

    function changeValuesIfNecessary() {
        let img = document.getElementById("partyParrot");
        if (img && img.src !== mainSource) {
            img.src = mainSource;
        }
        let size = document.getElementById("size");
        if (size !== document.activeElement)
            size.value = currentWidth;
    }

    function setsource(parrot) {
        const data = new URLSearchParams();
        data.append("parrot", parrot);
        const url = domain + '/changeParrot.php';

        fetch(url, {
            method: 'POST',
            body: data,
        }).then(fetchcurrent).then(changeValuesIfNecessary);
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
            }).then(fetchcurrent).then(changeValuesIfNecessary);
        }
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

    function setMute(boolean) {
        alarmpause = boolean;
        document.getElementById("mutebuttonimg").src = alarmpause ? mutesource : alarmsource;
    }

    function removeOverlay() {
        remove(document.getElementById("cachingoverlay"));
        document.getElementById("pagewrapper").style.overflow = "";
        document.getElementById("pagewrapper").style.position = "";
    }

    function loadAllParrots() {
        fetchNow("all", all => {
            var promises = [];
            for (let path of all) {
                const filename = path.substring(path.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "");
                promises.push(
                    new Promise((resolve, reject) => {
                        let img = new Image();
                        img.onload = resolve;
                        img.onerror = reject;
                        img.classList.add("thumbnail");
                        img.title = filename;
                        img.addEventListener("click", event => {
                            setsource(filename);
                        });
                        document.getElementById("thumbnails").appendChild(img);
                        img.src = path;
                    })
                );
            }
            onlyShowMatchingThumbnails(document.getElementById("parrot").value);
            progressPromise(promises, update).then(() => {
                removeOverlay();
                console.log("Time to load: " + (Date.now() - timestart));
            });
        });
    }

    function progressPromise(promises, tickCallback) {
        let len = promises.length;
        let progress = 0;

        function tick(promise) {
            promise.then(function () {
                progress++;
                tickCallback(progress, len);
            });
            return promise;
        }

        return Promise.all(promises.map(tick));
    }

    function update(completed, total) {
        document.querySelector('progress').value = Math.round(completed / total * 100);
    }

    function resetThumbnails() {
        let children = document.getElementById("thumbnails").children;
        for (let child of children) {
            child.style.display = "";
        }
    }

    document.getElementById("form").addEventListener("submit", event => {
        event.preventDefault();
        let string;
        let input = document.getElementById("parrot");
        let shownElements = document.getElementById("thumbnails").querySelectorAll('img:not([style*="display:none"]):not([style*="display: none"])');
        if (shownElements.length === 1) {
            string = shownElements[0].title;
        } else {
            string = input.value;
        }
        setsource(string);
        input.value = "";
        resetThumbnails();
        return false;
    });

    document.getElementById("size").addEventListener("keydown", event => {
        if (event.keyCode === 13) {
            let int = parseInt(event.target.value);
            if (isNaN(int) || int < 0 || int > 999)
                int = 100;
            resizeParrot(int, true);
            event.target.blur();
        }
    });

    function onlyShowMatchingThumbnails(searchstring) {
        let children = document.getElementById("thumbnails").children;
        for (let child of children) {
            if (child.title.toLowerCase().trim().indexOf(searchstring) > -1) {
                child.style.display = "";
            } else {
                child.style.display = "none";
            }
        }
    }

    document.getElementById("parrot").addEventListener("input", event => {
        onlyShowMatchingThumbnails(event.target.value.toLowerCase().trim());
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

    function remove(element) {
        if (element != null)
            element.parentNode.removeChild(element);
    }
}