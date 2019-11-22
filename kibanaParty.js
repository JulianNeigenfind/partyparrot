javascript:(function () {
    const intervalInMs = 5000;
    const domain = 'http://neigenfind.bplaced.net/'/*'https://changepartyparrot.000webhostapp.com'*/;
    const parrotId = "partyParrotTest";
    const bannerId = "banner";
    const defaultparrot = "60fpsparrot";
    let alarmpause = false;
    let currentParrot = defaultparrot;
    let dontRefresh = false;
    let mainSource = "", angrySource, resetSource, muteSource;
    let defaultwidth = 101, currentWidth = defaultwidth;
    let maxStringLength = 44;
    let highs = gethighs();
    let timeStampRemove = null;
    let containers = [...document.getElementsByClassName("react-grid-item react-draggable react-resizable")].filter(function (element, index) {
        return index === 2 || index === 3 || index === 4;
    });
    for (let container of containers) {
        container.style.visibility = "hidden";
    }
    let map = {};
    window.onkeydown = window.onkeyup = function (e) {
        e = e || event;
        map[e.keyCode] = e.type === 'keydown';
        keyfunctions();
        map = {};
    };

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

    function fetchcurrent() {
        fetchNow("currentParrot", false, function (object) {
            mainSource = object.base64;
            currentWidth = object.width;
            let img = document.getElementById(parrotId);
            if (dontRefresh || !img) {
                return;
            }
            if (img.src !== mainSource)
                img.src = mainSource;
            if (img.style.width !== currentWidth + "px")
                resizeParrot(currentWidth, false);
            setAlarmpause(object.alarmpause === "true", false);
        });
    }

    function fetchcurrentrecursivelywithcheck() {
        const url = new URL(domain + '/getParrot.php');
        url.search = new URLSearchParams({"parrot": "changed"}).toString();
        fetch(url).then(function (response) {
            response.text().then(function (changed) {
                if (changed === '1') {
                    fetchcurrent()
                }
                setTimeout(function () {
                    fetchcurrentrecursivlywithcheck();
                }, intervalInMs);
            })
        });
    }

    removeButton();
    fetchNow("angryparrot", false, function (object) {
        angrySource = object.base64;
    });
    fetchNow("mute", false, function (object) {
        muteSource = object.base64;
    });
    fetchNow("thomas", false, function (object) {
        resetSource = object.base64;
    });
    fetchcurrent();
    fetchcurrentrecursivelywithcheck();
    setInterval(function () {
        parrot();
        cutalarms();
        parrotalarms();
        resetParrotIfNecessary();
    }, 1000);


    function removeButton() {
        let button = document.getElementsByClassName("dshExitFullScreenButton")[0];
        if (button != null) {
            button.parentNode.removeChild(button);
        } else {
            setTimeout(removeButton, 100);
        }
    }

    function parrot() {
        const d = new Date();
        if (!document.getElementById(parrotId)) {
            appendToScreen(createImg(d));
        } else {
            let banner = document.getElementById(bannerId);
            for (let i = 0; i <= 24; i++) {
                if (d.getHours() === i && d.getMinutes() === 0 && d.getSeconds() === 0 && !banner) {
                    dontRefresh = true;
                    resizeParrot(313, false);
                    createBanner("Es ist " + i + " Uhr!", "orange", 562);
                    resetAfter(30);
                }
            }
        }
    }

    function getTitle() {
        return "Try the following functions:\n" +
            "-*f* for fullscreen\n" + "-*r* for random parrot\n" +
            "-*+* for bigger parrot\n" + "-*-* for smaller parrot\n" +
            "-*Alt* to enter a parrot\n" + "-*Ctrl* to reset parrot\n" +
            "-*m* to enter max stringlength for alarms\n";
    }

    function createImg() {
        let div = document.createElement("div");
        div.title = getTitle();
        div.style.position = "fixed";
        div.style.zIndex = "2147483646";
        div.style.left = "0px";
        div.style.bottom = "-5px";
        div.draggable = false;
        div.style.userSelect = "none";

        let img = document.createElement("img");
        img.id = parrotId;
        img.style.width = defaultwidth + "px";
        img.crossOrigin = "";
        img.src = mainSource;

        div.appendChild(img);
        return div;
    }

    function appendToScreen(element) {
        document.body.prepend(element);
    }

    function resizeParrot(px, post) {
        let img = document.getElementById(parrotId);
        img.style.width = px + "px";
        currentWidth = px;

        if (post) {
            const url = domain + '/changeParrot.php';
            const data = new URLSearchParams();
            data.append("width", currentWidth);

            fetch(url, {
                method: 'POST',
                body: data,
            });
        }
    }

    function resetAfter(seconds) {
        timeStampRemove = Date.now() + seconds * 1000;
    }

    function resetParrotIfNecessary() {
        let img = document.getElementById(parrotId);
        let banner = document.getElementById(bannerId);
        if (timeStampRemove != null && timeStampRemove < Date.now()) {
            img.remove();
            if (banner) {
                banner.remove();
            }
            timeStampRemove = null;
            dontRefresh = false;
        }
    }

    function cutalarms() {
        function parentSpans(el) {
            if (el != null)
                return el.parentNode.querySelectorAll('span');
            else
                return [];
        }

        let highalarme = [...parentSpans(document.querySelector("[data-test-subj='embeddablePanelHeading-[MRS]HIGHAlarme']"))];
        let midalarme = [...parentSpans(document.querySelector("[data-test-subj='embeddablePanelHeading-[MRS]MIDAlarme']"))];
        let lowalarme = [...parentSpans(document.querySelector("[data-test-subj='embeddablePanelHeading-[MRS]LOWAlarme']"))];
        let elements = highalarme.concat(midalarme).concat(lowalarme);
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].innerHTML.indexOf("iMosWeb") === -1) {
                elements.splice(i, 1);
                i--;/*go one back because item is removed*/
            }
        }
        if (elements.length) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].innerHTML = elements[i].innerHTML.substring(7);
                if (elements[i].innerHTML.length > maxStringLength) {
                    elements[i].innerHTML = elements[i].innerHTML.substring(0, maxStringLength);
                    elements[i].innerHTML += "...";
                }
            }
            cloneContainers();
        }
    }

    function cloneContainers() {
        let clones = document.getElementsByClassName("clone");
        for (let clone of clones) {
            clone.parentNode.removeChild(clone);
        }
        for (let container of containers) {
            let clone = container.cloneNode(true);
            clone.classList.add("clone");
            clone.style.visibility = "visible";
            document.getElementsByClassName("react-grid-layout dshLayout--viewing")[0].appendChild(clone);
        }
    }

    function parrotalarms() {
        if (highs < gethighs() && !alarmpause) {
            angryParrot();
        }
        highs = gethighs();

        function angryParrot() {
            let img = document.getElementById(parrotId);
            let banner = document.getElementById(bannerId);
            img.src = angrySource;
            dontRefresh = true;
            if (!banner) {
                createBanner("Neuer High Alarm!", "red", 698);
            }
            resizeParrot(313, false);
            resetAfter(15);
        }
    }

    function createBanner(string, color, bubblewidth) {
        let div = document.createElement("div");
        div.id = bannerId;
        div.style.zIndex = "6001";
        div.style.position = "fixed";
        let bubble = document.createElement("img");
        bubble.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/speech-bubble.svg";
        bubble.style.position = "fixed";
        bubble.style.width = bubblewidth + "px";
        bubble.style.height = "246px";
        bubble.style.bottom = "191px";
        bubble.style.left = "186px";
        let text = document.createElement("div");
        text.innerText = string;
        text.style.fontSize = "60px";
        text.style.color = color;
        text.style.textShadow = "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black";
        text.style.position = "fixed";
        text.style.bottom = "330px";
        text.style.left = "289px";
        div.appendChild(bubble);
        div.appendChild(text);
        appendToScreen(div);
    }

    function createMute() {
        if (!document.getElementById("mute")) {
            let mute = document.createElement("img");
            mute.id = "mute";
            mute.src = muteSource;
            mute.style.position = "fixed";
            mute.style.zIndex = "6001";
            mute.style.width = "30px";
            mute.style.bottom = "20px";
            mute.style.right = "20px";
            appendToScreen(mute);
        }
    }

    function deleteMute() {
        if (document.getElementById("mute")) {
            let mute = document.getElementById("mute");
            mute.remove();
        }
    }

    function gethighs() {
        let highs = "";
        let panel = document.querySelector("[data-test-subj='embeddablePanelHeading-[MRS]AlarmejeLeveliMosWeb']");
        if (panel == null) return;
        let divs = panel.parentNode.querySelectorAll("div");
        for (let i = 0; i < divs.length; i++) {
            let elem = divs[i];
            if (elem.innerHTML.indexOf("High - Count") !== -1) {
                let spans = elem.parentNode.querySelectorAll("span");
                highs = spans[spans.length - 1].innerHTML;
            }
        }
        return highs
    }

    function setsource(string) {
        const url = domain + '/changeParrot.php';
        const data = new URLSearchParams();
        data.append("parrot", string);

        fetch(url, {
            method: 'POST',
            body: data,
        }).then(function (response) {
            response.text().then(function (text) {
                currentParrot = text;
            });
            fetchNow("currentParrot", false,
                function (object) {
                    mainSource = object.base64;
                }
            );
        });
    }

    function setAlarmpause(boolean, post) {
        alarmpause = boolean;
        alarmpause ? createMute() : deleteMute();
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

    function keyfunctions() {
        let img = document.getElementById(parrotId);
        if (!img) {
            return;
        }
        if (map[70]) { /*f - fullscreen*/
            GoInFullscreen();
            setTimeout(scrollPastFilters, 500);
        } else if (map[80]) { /*p: pause alarms*/
            setAlarmpause(!alarmpause, true);
        } else if (map[171]) { /*+: bigger parrot*/
            resizeParrot(img.width + 20, true);
        } else if (map[173]) { /*-: smaller parrot*/
            resizeParrot(img.width - 20, true);
        } else if (map[17]) { /*ctrl: reset*/
            img.src = resetSource;
            dontRefresh = true;
            resizeParrot(defaultwidth, true);
            resetAfter(2);
        } else if (map[18]) { /*alt: enter parrot*/
            let string = prompt("Please enter a parrot", "Dadparrot");
            if (string != null) {
                setsource(string);
            }
        } else if (map[77]) { /*m: enter max stringlength*/
            let string = prompt("Enter max. stringlength", maxStringLength);
            if (string != null) {
                maxStringLength = string;
            }
        } else if (map[82]) { /*r: randomparrot*/
            setsource("random");
        }
    }

    function scrollPastFilters() {
        document.getElementsByClassName("react-grid-layout dshLayout--viewing")[0].scrollIntoView();
    }

    function GoInFullscreen() {
        let fullscreenbutton = document.querySelector("[data-test-subj='dashboardFullScreenMode']");
        if (fullscreenbutton != null) {
            fullscreenbutton.click();
            removeButton();
        }
        let i = document.documentElement;
        if (i.requestFullscreen) {
            i.requestFullscreen();
        } else if (i.webkitRequestFullscreen) {
            i.webkitRequestFullscreen();
        } else if (i.mozRequestFullScreen) {
            i.mozRequestFullScreen();
        } else if (i.msRequestFullscreen) {
            i.msRequestFullscreen();
        }
    }

    let mouseTimer = null, cursorVisible = true;
    const overlayId = "overlay";
    document.onmousemove = function () {
        if (mouseTimer) {
            window.clearTimeout(mouseTimer);
        }
        if (!cursorVisible) {
            disableOverlay();
            cursorVisible = true;
        }
        mouseTimer = window.setTimeout(disappearCursor, 5000);
    };

    function disappearCursor() {
        enableOverlay();
        mouseTimer = null;
        cursorVisible = false;
    }

    function enableOverlay() {
        if (!document.getElementById(overlayId)) {
            let overlay = document.createElement("div");
            overlay.id = overlayId;
            overlay.style.position = "fixed";
            overlay.style.display = "block";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.inset = "0px";
            overlay.style.zIndex = "2147483647";
            overlay.style.cursor = "none";
            document.body.prepend(overlay);
        } else {
            let overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.style.display = "block";
            }
        }
    }

    function disableOverlay() {
        let overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.style.display = "none";
        }
    }
})
();