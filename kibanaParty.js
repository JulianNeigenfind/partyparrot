javascript:(function () {
    const intervalInMs = 1000;
    const domain = 'http://neigenfind.bplaced.net/';
    const parrotId = "partyParrotTest";
    const bannerId = "banner";
    const extraDivId = "extradiv";
    const muteId = "mute";
    let alarmpause = false;
    let dontRefresh = false;
    let mainSource = "", angrySource, resetSource, muteSource, bubbleSource;
    let defaultwidth = 101, currentWidth = defaultwidth;
    let maxStringLength = 44;
    let lastResponse, lastHighTimestamp;
    getHighsAsObject().then(response => {
        lastResponse = response;
    });
    let timeStampRemove = null;
    let containers = [...document.getElementsByClassName("react-grid-item react-draggable react-resizable")].filter(function (element, index) {
        return index === 2 || index === 3 || index === 4;
    });
    for (let container of containers) {
        container.style.visibility = "hidden";
    }
    /*let legendContainer = document.getElementsByClassName("react-grid-item react-draggable react-resizable")[1];
    legendContainer.style.visibility = "hidden";*/
    let map = {};
    window.onkeydown = window.onkeyup = function (e) {
        e = e || event;
        map[e.keyCode] = e.type === 'keydown';
        keyfunctions();
        map = {};
    };

    removeButton();
    loadEverything()
        .then(fetchcurrent)
        .then(changeValuesIfNecessary)
        .then(fetchcurrentrecursivelywithcheck);
    setInterval(function () {
        parrot();
        cutalarms();
        /*orderLegend();*/
        parrotalarms();
        resetParrotIfNecessary();
    }, 1000);

    function loadEverything() {
        return Promise.all([
            fetchNow("angryparrot").then(object => {
                angrySource = object.base64;
            }),
            fetchNow("mute").then(object => {
                muteSource = object.base64;
            }),
            fetchNow("thomas").then(object => {
                resetSource = object.base64;
            }),
            fetchNow("bubble").then(object => {
                bubbleSource = object.base64;
            }),
        ]);
    }

    function fetchNow(parrot) {
        const url = new URL(domain + '/getParrot.php');

        url.search = new URLSearchParams({"parrot": parrot}).toString();
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                response.text().then(text => {
                    let object = JSON.parse(text);
                    resolve(object);
                }).catch(() => reject("error occured while converting response into text"));
            }).catch(() => reject("error occured while fetching " + parrot));
        });

    }

    function fetchcurrent() {
        return fetchNow("currentparrot").then(object => {
            mainSource = object.base64;
            currentWidth = parseInt(object.width);
            alarmpause = object.alarmpause === "true";
        });

    }

    function changeValuesIfNecessary() {
        setAlarmpause(alarmpause, false);
        if (dontRefresh) return;
        let img = document.getElementById(parrotId);
        if (img && img.src !== mainSource) {
            img.src = mainSource;
        }
        if (img && img.style.width !== currentWidth + "px") {
            img.style.width = currentWidth + "px";
        }
    }

    function fetchcurrentrecursivelywithcheck() {
        fetchNow("changed").then(changed => {
            if (changed === 1) {
                fetchcurrent().then(changeValuesIfNecessary);
            }
            repeat();
        }).catch(reason => {
            console.log(reason);
            repeat();

        });

        function repeat() {
            setTimeout(function () {
                fetchcurrentrecursivelywithcheck();
            }, intervalInMs);
        }
    }


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
                    resizeParrot(313, false);
                    createBanner("Es ist " + i + " Uhr!", "orange", 562);
                    resetAfter(30);
                }
            }
        }
    }

    function createImg() {
        let div = document.createElement("div");
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

    function post(php, name, value) {
        const data = new URLSearchParams();
        data.append(name, value);
        const url = domain + php;

        return fetch(url, {
            method: 'POST',
            body: data,
        });
    }

    function resizeParrot(px, shouldpost) {
        let img = document.getElementById(parrotId);
        img.style.width = px + "px";
        currentWidth = px;

        if (shouldpost)
            post('/changeParrot.php', "width", currentWidth)
    }

    function resetAfter(seconds) {
        timeStampRemove = Date.now() + seconds * 1000;
    }

    function resetParrotIfNecessary() {
        let img = document.getElementById(parrotId);
        let banner = document.getElementById(bannerId);
        if (timeStampRemove != null && timeStampRemove < Date.now()) {
            img.remove();
            if (banner)
                banner.remove();
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
        getHighsAsObject().then(response => {
            if (lastResponse.equals(response))
                return;
            let newHighs = response.getAllHighsAfterTimestamp(lastResponse.lastTimestamp);
            if (newHighs.length) {
                if (!alarmpause) {
                    angryParrot(newHighs.getAlarmnames());
                } else {
                    let mute = document.getElementById(muteId);
                    mute.style.filter = "brightness(0.5) sepia(1) saturate(1000%)";
                    setTimeout(function () {
                        mute.style.filter = "";
                    }, 1000);
                }
                lastHighTimestamp = response.lastTimestamp;
            }
            lastResponse = response;
        });

        function angryParrot(newHighsNames) {
            let img = document.getElementById(parrotId);
            let banner = document.getElementById(bannerId);
            img.src = angrySource;
            dontRefresh = true;
            if (banner)
                banner.remove();
            createBanner("Neuer High Alarm!", "red", 698, newHighsNames);
            resizeParrot(313, false);
            resetAfter(15);
        }
    }

    function createBanner(string, color, bubblewidth, extrastringarray = null) {
        let div = document.createElement("div");
        div.id = bannerId;
        div.style.zIndex = "6001";
        div.style.position = "fixed";
        let bubble = document.createElement("img");
        bubble.src = bubbleSource;
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
        if (extrastringarray !== null) {
            let extradiv = document.createElement("div");
            extradiv.id = extraDivId;
            extradiv.style.backgroundColor = "white";
            extradiv.style.position = "fixed";
            extradiv.style.border = "2px solid red";
            setTimeout(function () {
                extradiv.style.border = "2px solid black";
            }, 1000);
            extradiv.style.borderRadius = "5px";
            extradiv.style.padding = "5px";
            extradiv.style.bottom = "450px";
            extrastringarray.forEach(extrastring => {
                let extratext = document.createElement("p");
                extratext.innerText = extrastring;
                extratext.style.fontSize = "20px";
                extratext.style.color = "black";
                extradiv.appendChild(extratext);
            });
            div.appendChild(extradiv);
        }
        appendToScreen(div);
        if (extrastringarray !== null) {
            let extradiv = document.getElementById("extradiv");
            extradiv.style.left = (186 + bubblewidth / 2 - extradiv.offsetWidth / 2) + "px";
        }
    }

    function createMute() {
        if (!document.getElementById(muteId)) {
            let mute = document.createElement("img");
            mute.id = muteId;
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
        let mute = document.getElementById(muteId);
        if (mute) {
            mute.remove();
        }
    }

    function getHighsAsObject() {
        return fetchAlarms(true).then(response => {
            return response.json();
        }).then(data => {
            return new ElasticSearchResponse(data);
        });
    }

    function fetchAlarms(test) {
        if (!test) {
            let url = new URL("http://kibana:5601/s/black/elasticsearch/_msearch");
            let rawbody = '{"index":"mrs-eventlog-*"}\n{"version":true,"size":500,"sort":[{"@timestamp":{"order":"desc","unmapped_type":"boolean"}}],"_source":["mrs.eventlog.AlarmName"],"query":{"bool":{"must":[{"match_all":{}},{"match_all":{}}],"filter":[{"match_phrase":{"mrs.eventlog.Source":{"query":"iMosWeb"}}},{"match_phrase":{"mrs.eventlog.AlarmLevel":{"query":"High"}}},{"range":{"@timestamp":{"gte":"now-11h","lte":"now+1h"}}}],"should":[],"must_not":[{"bool":{"minimum_should_match":1,"should":[{"match_phrase":{"mrs.eventlog.SystemName":"REF"}},{"match_phrase":{"mrs.eventlog.SystemName":"DEV"}}]}},{"match_phrase":{"mrs.eventlog.AlarmLevel":{"query":"Info"}}},{"match_phrase":{"mrs.eventlog.confirmed":{"query":"1"}}}]}}}\n';
            let headers = {
                "content-type": "application/x-ndjson",
                "kbn-xsrf": "set"
            };
            return fetch(url.toString(), {
                method: 'POST',
                body: rawbody,
                headers: headers
            })
        } else {
            const url = new URL(domain + '/getParrot.php');
            url.search = new URLSearchParams({"parrot": "test"}).toString();
            return fetch(url.toString());
        }
    }

    function ElasticSearchResponse(data) {
        this.array = ResponseArray.from(data.responses[0].hits.hits.map(el => new ELRElement(el)));
        this.isEmpty = this.array.length <= 0;
        this.timestamps = this.array.map(el => el.timestamp);
        this.lastTimestamp = this.isEmpty ? null : this.timestamps[0];

        this.equals = function (response) {
            return JSON.stringify(this.array) === JSON.stringify(response.array);
        };

        this.getAllHighsAfterTimestamp = function (timestamp) {
            let lastHighIndex;
            if (timestamp !== null) {
                lastHighIndex = this.timestamps.indexOf(timestamp);
                if (lastHighIndex === -1)
                    lastHighIndex = this.array.length;
            } else
                lastHighIndex = this.array.length;

            let highs = lastHighIndex > 0 ? this.array.slice(0, lastHighIndex) : [];
            return ResponseArray.from(highs);
        };
    }

    function ELRElement(el) {
        this.timestamp = el.sort[0];
        this.alarmname = el._source["mrs.eventlog.AlarmName"];
    }

    class ResponseArray extends Array {
        getAlarmnames () {
            return this.map(el => el.alarmname);
        }
    }

    function setsource(parrot) {
        post('/changeParrot.php', "parrot", parrot);
    }

    function setAlarmpause(boolean, shouldpost) {
        alarmpause = boolean;
        if (alarmpause) {
            createMute();
            resetAfter(0);
        } else {
            deleteMute();
        }
        if (shouldpost)
            post('/changeParrot.php', "alarmpause", boolean)
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
        let filters = document.getElementsByClassName("react-grid-layout dshLayout--viewing")[0];
        if (filters)
            filters.scrollIntoView();
    }

    function GoInFullscreen() {
        let fullscreenbutton = document.querySelector("[data-test-subj='dashboardFullScreenMode']");
        if (fullscreenbutton) {
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

    /* function orderLegend() {
         if (legend != null) {
             legend.prepend(legend.querySelector('[data-label="Middle"]'));
             legend.prepend(legend.querySelector('[data-label="Low"]'));
         } else {
             setTimeout(orderLegend, 100);
         }
         cloneLegend();
     }

     function cloneLegend() {
         let clone = legendContainer.cloneNode(true);
         clone.style.visibility = "visible";
         legendContainer.parentNode.prepend(clone);
     }*/

})
();