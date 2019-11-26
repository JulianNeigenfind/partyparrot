(function ready() {
    if (document.readyState !== 'loading') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})();

function main() {
    function E(id) {
        return document.getElementById(id);
    }

    const intervalInMs = 1000, domain = 'http://neigenfind.bplaced.net/';
    let mainSource, currentWidth, alarmpause, mutesource, alarmsource, timestart = Date.now();
    /** @namespace object.base64     **/
    /** @namespace object.alarmpause **/

    loadEverything() /*caching*/
        .then(startMainLoop)/*maintask*/
        .then(removeLoadingScreen);
    displayTextAfterTenSeconds();

    /*functions*/

    function loadEverything() {
        return Promise.all([
            fetchalarmsource().then(fetchcurrent).then(changeValuesIfNecessary).then(createImg),
            loadAllParrots(),
        ]);
    }

    function fetchalarmsource() {
        return Promise.all([
            fetchNow("mute").then(object => {
                mutesource = object.base64
            }),
            fetchNow("alarm").then(object => {
                alarmsource = object.base64
            }),
        ]);
    }

    function fetchcurrent() {
        return fetchNow("currentparrot").then(object => {
            mainSource = object.base64;
            currentWidth = parseInt(object.width);
            alarmpause = object.alarmpause === "true";
        });
    }

    function createImg() {
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.id = "partyParrot";
            img.onload = resolve;
            img.onerror = reject;
            img.src = mainSource;
            E("content").prepend(img);
        });
    }

    function displayTextAfterTenSeconds() {
        setTimeout(function () {
            let longcachingtext = E("longcachingtext");
            if (longcachingtext) longcachingtext.style.display = "";
        }, 10000);
    }


    function fetchNow(parrot) {
        const url = new URL(domain + '/getParrot.php');
        url.search = new URLSearchParams({"parrot": parrot}).toString();

        return new Promise((resolve, reject) => {
            fetch(url.toString()).then(response => {
                response.text().then(text => {
                    let object = JSON.parse(text);
                    resolve(object);
                }).catch(() => reject("error occured while converting response int text"));
            }).catch(() => reject("error occured while fetching " + parrot));
        });
    }

    function startMainLoop() {
        fetchNow("changed").then(changed => {
            if (changed === 1) {
                fetchcurrent()
                    .then(changeValuesIfNecessary);
            }
            repeat();
        }).catch(reason => {
            console.log(reason);
            repeat();
        });

        function repeat() {
            setTimeout(function () {
                startMainLoop();
            }, intervalInMs);
        }
    }

    function changeValuesIfNecessary() {
        let img = E("partyParrot");
        if (img && img.src !== mainSource) {
            img.src = mainSource;
        }
        let size = E("size");
        if (size !== document.activeElement)
            size.value = currentWidth;
        setAlarmpause(alarmpause, false);
    }

    function post(php, name, value) {
        const data = new URLSearchParams();
        data.append(name, value);
        const url = domain + php;

        return fetch(url, {method: 'POST', body: data,});
    }

    function setsource(parrot) {
        post('/changeParrot.php', "parrot", parrot).then();
    }

    function resizeParrot(px, shouldpost) {
        currentWidth = px;
        if (shouldpost)
            post('/changeParrot.php', "width", currentWidth).then();
    }

    function setAlarmpause(boolean, shouldpost) {
        setMute(boolean);
        if (shouldpost)
            post('/changeParrot.php', "alarmpause", boolean).then();
    }

    function setMute(boolean) {
        alarmpause = boolean;
        E("mutebuttonimg").src = alarmpause ? mutesource : alarmsource;
    }

    function removeLoadingScreen() {
        remove(E("cachingoverlay"));
        E("pagewrapper").style.overflow = "";
        E("pagewrapper").style.position = "";
    }

    function loadAllParrots() {
        return new Promise(resolve => {
            fetchNow("all").then(all => {
                let promises = [];
                for (let path of all) {
                    const filename = path.substring(path.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "");
                    promises.push(
                        new Promise((resolve, reject) => {
                            let img = new Image();
                            img.onload = resolve;
                            img.onerror = reject;
                            img.classList.add("thumbnail");
                            img.title = filename;
                            img.onclick = () => setsource(filename);
                            E("thumbnails").appendChild(img);
                            img.src = path;
                        })
                    );
                }
                onlyShowMatchingThumbnails(E("parrot").value);
                progressPromise(promises, update).then(() => {
                    console.log("Time to load: " + (Date.now() - timestart));
                    resolve();
                });
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
        let children = E("thumbnails").children;
        for (let child of children) {
            child.style.display = "";
        }
    }

    E("form").addEventListener("submit", event => {
        event.preventDefault();
        let string;
        let input = E("parrot");
        let shownElements = E("thumbnails").querySelectorAll('img:not([style*="display:none"]):not([style*="display: none"])');
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

    E("size").addEventListener("keydown", event => {
        if (event.keyCode === 13) {
            let int = parseInt(event.target.value);
            if (isNaN(int) || int < 0 || int > 999)
                int = 100;
            resizeParrot(int, true);
            event.target.blur();
        }
    });

    function onlyShowMatchingThumbnails(searchstring) {
        let children = E("thumbnails").children;
        for (let child of children) {
            if (child.title.toLowerCase().trim().indexOf(searchstring) > -1) {
                child.style.display = "";
            } else {
                child.style.display = "none";
            }
        }
    }

    E("parrot").oninput = event => onlyShowMatchingThumbnails(event.target.value.toLowerCase().trim());
    E("randombutton").onclick = event => {
        event.preventDefault();
        setsource("random");
    };
    E("mutebutton").onclick = () => setAlarmpause(!alarmpause, true);
    E("plusbutton").onclick = () => resizeParrot(currentWidth + 20, true);
    E("minusbutton").onclick = () => resizeParrot(currentWidth - 20, true);

    function remove(element) {
        if (element != null)
            element.parentNode.removeChild(element);
    }
}