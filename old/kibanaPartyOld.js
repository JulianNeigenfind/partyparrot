javascript:(function () {
    const parrotId = "partyParrot";
    const bannerId = "banner";
    let defaultparrot = "60fpsparrot";
    let currentParrot = defaultparrot;
    let defaultwidth = 101;
    let currentWidth = defaultwidth;
    let maxStringLength = 44;
    const allParrots = [
        {"gif": "parrot.gif", "hd": "hd/parrot.gif", "name": "Parrot"}, {
            "gif": "opensourceparrot.gif",
            "hd": "hd/opensourceparrot.gif",
            "name": "Open-source Parrot"
        }, {"gif": "middleparrot.gif", "hd": "hd/middleparrot.gif", "name": "Middle Parrot"}, {
            "gif": "reverseparrot.gif",
            "hd": "hd/reverseparrot.gif",
            "name": "Reverse Parrot"
        }, {"gif": "aussieparrot.gif", "hd": "hd/aussieparrot.gif", "name": "Aussie Parrot"}, {
            "gif": "gothparrot.gif",
            "hd": "hd/gothparrot.gif",
            "name": "Goth Parrot"
        }, {"gif": "oldtimeyparrot.gif", "name": "Old Timey Parrot"}, {
            "gif": "boredparrot.gif",
            "hd": "hd/boredparrot.gif",
            "name": "Bored Parrot"
        }, {
            "gif": "shuffleparrot.gif",
            "hd": "hd/shuffleparrot.gif",
            "name": "Shuffle Parrot"
        }, {
            "gif": "shufflefurtherparrot.gif",
            "name": "Shuffle Further Parrot",
            "tip": "Combine with Shuffle Parrot for a conga line!"
        }, {
            "gif": "congaparrot.gif",
            "hd": "hd/congaparrot.gif",
            "name": "Conga Line Parrot",
            "tip": "A self sufficient conga line parrot!"
        }, {
            "gif": "reversecongaparrot.gif",
            "hd": "hd/reversecongaparrot.gif",
            "name": "Reverse Conga Line Parrot"
        }, {"gif": "partyparrot.gif", "hd": "hd/partyparrot.gif", "name": "Party Parrot"}, {
            "gif": "sadparrot.gif",
            "hd": "hd/sadparrot.gif",
            "name": "Sad Parrot",
            "tip": "Parrots are entitled to their full range of emotions."
        }, {
            "gif": "copparrot.gif",
            "hd": "hd/copparrot.gif",
            "name": "Cop Parrot",
            "tip": "Not to be confused with Stripper Parrot!"
        }, {
            "gif": "fastparrot.gif",
            "hd": "hd/fastparrot.gif",
            "name": "Fast Parrot",
            "tip": "Now with 50% more party!"
        }, {
            "gif": "ultrafastparrot.gif",
            "hd": "hd/ultrafastparrot.gif",
            "name": "Ultra Fast Parrot",
            "tip": "Now with 150% more party!"
        }, {
            "gif": "slowparrot.gif",
            "hd": "hd/slowparrot.gif",
            "name": "Slow Parrot",
            "tip": "Web 1.0 all over again!"
        }, {"gif": "slomoparrot.gif", "name": "Slo-mo Parrot", "tip": "Party in slow motion."}, {
            "hd": "hd/dadparrot.gif",
            "name": "Dad Parrot",
            "tip": "Is totally freaking out."
        }, {
            "gif": "dealwithitparrot.gif",
            "hd": "hd/dealwithitparrot.gif",
            "name": "Deal With It Parrot"
        }, {
            "gif": "dealwithitnowparrot.gif",
            "hd": "hd/dealwithitnowparrot.gif",
            "name": "Deal With It Now Parrot"
        }, {"gif": "fiestaparrot.gif", "name": "Fiesta Parrot"}, {
            "gif": "pizzaparrot.gif",
            "name": "%F0%9F%8D%95 Parrot"
        }, {"gif": "hamburgerparrot.gif", "name": "%F0%9F%8D%94 Parrot"}, {
            "gif": "bananaparrot.gif",
            "name": "%F0%9F%8D%8C Parrot"
        }, {"gif": "chillparrot.gif", "name": "Chill Parrot"}, {
            "gif": "explodyparrot.gif",
            "name": "Explody Parrot"
        }, {"gif": "shufflepartyparrot.gif", "name": "Shuffle Party Parrot"}, {
            "gif": "icecreamparrot.gif",
            "name": "Ice-Cream Parrot"
        }, {"gif": "sassyparrot.gif", "hd": "hd/sassyparrot.gif", "name": "Sassy Parrot"}, {
            "gif": "confusedparrot.gif",
            "hd": "hd/confusedparrot.gif",
            "name": "Confused Parrot"
        }, {
            "gif": "aussiecongaparrot.gif",
            "hd": "hd/aussiecongaparrot.gif",
            "name": "Aussie Conga Line Parrot"
        }, {
            "gif": "aussiereversecongaparrot.gif",
            "hd": "hd/aussiereversecongaparrot.gif",
            "name": "Aussie Reverse Conga Line Parrot"
        }, {"gif": "wave1parrot.gif", "name": "Parrot Wave (1)"}, {
            "gif": "wave2parrot.gif",
            "name": "Parrot Wave (2)"
        }, {"gif": "wave3parrot.gif", "name": "Parrot Wave (3)"}, {
            "gif": "wave4parrot.gif",
            "name": "Parrot Wave (4)"
        }, {"gif": "wave5parrot.gif", "name": "Parrot Wave (5)"}, {
            "gif": "wave6parrot.gif",
            "name": "Parrot Wave (6)"
        }, {"gif": "wave7parrot.gif", "name": "Parrot Wave (7)"}, {
            "gif": "wave8parrot.gif",
            "name": "Parrot Wave (8)"
        }, {"gif": "wave9parrot.gif", "name": "Parrot Wave (9)"}, {
            "gif": "congapartyparrot.gif",
            "hd": "hd/congapartyparrot.gif",
            "name": "Conga Party Parrot"
        }, {
            "gif": "moonwalkingparrot.gif",
            "hd": "hd/moonwalkingparrot.gif",
            "name": "Moonwalking Parrot"
        }, {
            "gif": "thumbsupparrot.gif",
            "hd": "hd/thumbsupparrot.gif",
            "name": "Thumbs Up Parrot"
        }, {"gif": "coffeeparrot.gif", "name": "Coffee Parrot"}, {
            "gif": "mustacheparrot.gif",
            "hd": "hd/mustacheparrot.gif",
            "name": "Parrot with mustache"
        }, {
            "gif": "christmasparrot.gif",
            "hd": "hd/christmasparrot.gif",
            "name": "Christmas Parrot"
        }, {"gif": "sleepingparrot.gif", "hd": "hd/sleepingparrot.gif", "name": "Sleepy Parrot"}, {
            "gif": "beerparrot.gif",
            "hd": "hd/beerparrot.gif",
            "name": "Happy Hour Parrot"
        }, {"gif": "darkbeerparrot.gif", "name": "Dark Beer Parrot"}, {
            "gif": "blondesassyparrot.gif",
            "name": "Blonde Sassy Parrot"
        }, {"gif": "bluescluesparrot.gif", "name": "Blues Clues Parrot"}, {
            "gif": "gentlemanparrot.gif",
            "hd": "hd/gentlemanparrot.gif",
            "name": "Gentleman Parrot",
            "tip": "A true gentleman parrot"
        }, {
            "gif": "margaritaparrot.gif",
            "name": "Margarita Parrot",
            "tip": "Fiesta Parrot is getting his drink on, margarita style!"
        }, {
            "gif": "dreidelparrot.gif",
            "name": "Dreidel Parrot",
            "tip": "Happy Hanukkah!"
        }, {
            "gif": "harrypotterparrot.gif",
            "name": "Harry Potter Parrot",
            "tip": "You're a parrot-wizard Harry!"
        }, {"gif": "upvoteparrot.gif", "name": "Upvote Parrot"}, {
            "gif": "twinsparrot.gif",
            "hd": "hd/twinsparrot.gif",
            "name": "Twins Parrot",
            "tip": "parrot + parrot = great party!"
        }, {
            "gif": "tripletsparrot.gif",
            "name": "Triplets Parrot",
            "tip": "parrot + parrot + parrot = magnificent party!!!!"
        }, {
            "gif": "stableparrot.gif",
            "hd": "hd/stableparrot.gif",
            "name": "Stable Parrot",
            "tip": "Gyrostablization Mode Initiated"
        }, {"gif": "shipitparrot.gif", "name": "Ship It Parrot"}, {
            "gif": "skiparrot.gif",
            "name": "Ski Parrot"
        }, {"gif": "loveparrot.gif", "name": "Love Parrot"}, {
            "gif": "halalparrot.gif",
            "name": "Halal Parrot"
        }, {
            "hd": "hd/wendyparrot.gif",
            "name": "Wendy's Parrot",
            "tip": "BACONATOR OR DIE!"
        }, {"hd": "hd/popcornparrot.gif", "name": "Popcorn Parrot"}, {
            "hd": "hd/donutparrot.gif",
            "name": "Donut Parrot"
        }, {"hd": "hd/evilparrot.gif", "name": "Evil Parrot"}, {
            "hd": "hd/discoparrot.gif",
            "name": "Disco Parrot",
            "tip": "1970s Party Parrot"
        }, {
            "gif": "matrixparrot.gif",
            "name": "Matrix Parrot",
            "tip": "This Parrot took the Red Pill"
        }, {"gif": "papalparrot.gif", "name": "Papal Parrot"}, {
            "gif": "stalkerparrot.gif",
            "name": "Stalker Parrot"
        }, {
            "gif": "scienceparrot.gif",
            "hd": "hd/scienceparrot.gif",
            "name": "Science Parrot"
        }, {"hd": "hd/revolutionparrot.gif", "name": "Revolution Parrot"}, {
            "gif": "fidgetparrot.gif",
            "name": "Fidget Spinner Parrot"
        }, {"gif": "beretparrot.gif", "hd": "hd/beretparrot.gif", "name": "Beret Parrot"}, {
            "gif": "tacoparrot.gif",
            "name": "Taco Parrot"
        }, {"gif": "ryangoslingparrot.gif", "name": "Ryan Gosling Parrot"}, {
            "gif": "luckyparrot.gif",
            "name": "Lucky Parrot"
        }, {
            "gif": "birthdaypartyparrot.gif",
            "hd": "hd/birthdaypartyparrot.gif",
            "name": "Birthday Party Parrot"
        }, {"gif": "jediparrot.gif", "hd": "hd/jediparrot.gif", "name": "Jedi Parrot"}, {
            "hd": "hd/sithparrot.gif",
            "name": "Sith Parrot",
            "tip": "Feel the power of the darkside"
        }, {"gif": "angryparrot.gif", "hd": "hd/angryparrot.gif", "name": "Angry Parrot"}, {
            "hd": "hd/invisibleparrot.gif",
            "name": "Invisible Parrot"
        }, {"gif": "fadingparrot.gif", "name": "Fading Parrot"}, {
            "gif": "rotatingparrot.gif",
            "name": "Rotating Parrot"
        }, {"gif": "cryptoparrot.gif", "name": "Crypto Parrot"}, {
            "hd": "hd/sushiparrot.gif",
            "name": "Sushi Parrot"
        }, {"hd": "hd/pumpkinparrot.gif", "name": "Pumpkin Parrot"}, {
            "gif": "angelparrot.gif",
            "hd": "hd/angelparrot.gif",
            "name": "Angel Parrot"
        }, {"gif": "bluntparrot.gif", "hd": "hd/bluntparrot.gif", "name": "Blunt Parrot"}, {
            "hd": "hd/sintparrot.gif",
            "name": "Sinterklaas Parrot"
        }, {"hd": "hd/pirateparrot.gif", "name": "Pirate Parrot"}, {
            "hd": "hd/ceilingparrot.gif",
            "gif": "ceilingparrot.gif",
            "name": "Ceiling Parrot"
        }, {
            "hd": "hd/mardigrasparrot.gif",
            "name": "Mardi Gras Parrot",
            "tip": "Laissez les bons temps rouler!"
        }, {
            "gif": "sovjetparrot.gif",
            "name": "Soviet Parrot",
            "tip": "%D0%B4%D0%B0%D0%B2%D0%B0%D0%B8 %D0%B4%D0%B0%D0%B2%D0%B0%D0%B8!"
        }, {"gif": "portalparrot.gif", "name": "Portal Parrot", "tip": "The cake is a lie."}, {
            "hd": "hd/hardhatparrot.gif",
            "name": "Hard Hat Parrot",
            "tip": "[Under Construction]"
        }, {
            "hd": "hd/flyingmoneyparrot.gif",
            "name": "Flying Money Parrot",
            "tip": "The money is flying away!"
        }, {"hd": "hd/portalorangeparrot.gif", "name": "Portal Parrot (Orange Portal)"}, {
            "hd": "hd/portalblueparrot.gif",
            "name": "Portal Parrot (Blue Portal)"
        }, {
            "hd": "hd/reverseportalorangeparrot.gif",
            "name": "Reverse Portal Parrot (Orange Portal)"
        }, {
            "hd": "hd/reverseportalblueparrot.gif",
            "name": "Reverse Portal Parrot (Blue Portal)"
        }, {
            "hd": "hd/bunnyparrot.gif",
            "name": "Bunny Parrot",
            "tip": "Real men love bunnies"
        }, {
            "hd": "hd/norwegianblueparrot.gif",
            "name": "Norwegian Blue Parrot",
            "tip": "Remarkable bird, the Norwegian Blue, idn'it, ay?"
        }, {"hd": "hd/transparront.gif", "name": "Transparront"}, {
            "gif": "fixparrot.gif",
            "name": "Fix Parrot"
        }, {"hd": "hd/brazilianplayerparrot.gif", "name": "Brazilian Player Parrot"}, {
            "hd": "hd/brazilianfanparrot.gif",
            "name": "Brazilian Fan Parrot"
        }, {"hd": "hd/spyparrot.gif", "name": "Spy Parrot"}, {
            "hd": "hd/marshmallowparrot.gif",
            "name": "Marshmallow Parrot"
        }, {"hd": "hd/whitewalkerparrot.gif", "name": "White Walker Parrot"}, {
            "hd": "hd/calvinist_parrot.gif",
            "name": "Calvinist Parrot"
        }, {
            "gif": "frenchparrot.gif",
            "hd": "hd/frenchparrot.gif",
            "name": "French Parrot",
            "tip": "Oulala"
        }, {
            "hd": "hd/githubparrot.gif",
            "name": "Github Party Parrot",
            "tip": "Github PR Party"
        }, {"gif": "bootlegparrot.gif", "hd": "hd/bootlegparrot.gif", "name": "Bootleg Parrot"}, {
            "gif": "bikerparrot.gif",
            "hd": "hd/bikerparrot.gif",
            "name": "Biker Parrot"
        }, {
            "gif": "inverseparrot.gif",
            "hd": "hd/inverseparrot.gif",
            "name": "Inverse Parrot"
        }, {"hd": "hd/pingpongparrot.gif", "name": "Ping Pong Parrot"}, {
            "hd": "hd/laptop_parrot.gif",
            "name": "Laptop Parrot"
        }, {"hd": "hd/60fpsparrot.gif", "name": "60fps Parrot"}, {
            "hd": "hd/redhatparrot.gif",
            "name": "Red Hat Parrot",
            "tip": "Soon to be IBM parrot..."
        }, {"hd": "hd/footballparrot.gif", "name": "Football Parrot"}, {
            "hd": "hd/flowerparrot.gif",
            "name": "Flower Parrot"
        }, {"hd": "hd/parrotnotfound.gif", "name": "Parrot Not Found"}, {
            "hd": "hd/spinningparrot.gif",
            "name": "Spinning Parrot"
        }, {
            "hd": "hd/redenvelopeparrot.gif",
            "name": "Red Envelope Parrot",
            "tip": "Happy Lunar New Year!"
        }, {"hd": "hd/grouchoparrot.gif", "name": "Groucho Parrot"}, {
            "hd": "hd/chicoparrot.gif",
            "name": "Chico Parrot"
        }, {"hd": "hd/harpoparrot.gif", "name": "Harpo Parrot"}, {
            "gif": "schnitzelparrot.gif",
            "name": "Schnitzel Parrot"
        }, {"hd": "hd/vikingparrot.gif", "name": "Viking Parrot"}, {
            "hd": "hd/darkmodeparrot.gif",
            "name": "Dark Mode Parrot"
        }, {"hd": "hd/tiedyeparrot.gif", "name": "Tie Dye Parrot"}, {
            "hd": "hd/horizontalparrot.gif",
            "name": "Horizontal Parrot"
        }, {"hd": "hd/sherlockholmesparrot.gif", "name": "Sherlock Parrot"}, {
            "hd": "hd/tennisparrot.gif",
            "name": "Tennis Parrot"
        }, {
            "hd": "hd/originalparrot.gif",
            "gif": "originalparrot.gif",
            "name": "Original Parrot",
            "tip": "The one and only."
        }, {"hd": "hd/bobaparrot.gif", "name": "Boba Parrot"}, {
            "hd": "hd/backwardsparrot.gif",
            "name": "Backwards Parrot"
        }, {"gif": "ripparrot.gif", "name": "RIP Parrot"}, {
            "hd": "hd/shortparrot.gif",
            "name": "Short Parrot",
            "tip": "Someone get a ladder"
        }, {"hd": "hd/headsetparrot.gif", "name": "Headset Parrot", "tip": "Hear no evil"}, {
            "hd": "hd/bouncingparrot.gif",
            "name": "Bouncing Parrot"
        }, {"hd": "hd/levitationparrot.gif", "name": "Levitation Parrot"}, {
            "hd": "hd/verticalparrot.gif",
            "name": "Vertical Parrot"
        }, {
            "gif": "databaseparrot.gif",
            "name": "Database Parrot",
            "tip": "To sql or not to sql"
        }, {"hd": "hd/phparrot.gif", "name": "PHParrot", "tip": "if (!$party) { die(); }"}, {
            "gif": "mergedparrot.gif",
            "name": "Merged Parrot",
            "tip": "Celebrating the merge!"
        }, {"gif": "braveheartparrot.gif", "name": "Braveheart Parrot"}, {
            "hd": "hd/maracasparrot.gif",
            "name": "Maracas Parrot"
        }];
    let highs = gethighs();
    let timeStampRemove = null;
    let containers = $(".react-grid-item.react-draggable.react-resizable").filter(function (index) {
        return index === 2 || index === 3 || index === 4;
    });
    containers.css("visibility", "hidden");
    let map = {};
    window.onkeydown = window.onkeyup = function (e) {
        e = e || event;
        map[e.keyCode] = e.type === 'keydown';
        keyfunctions();
        map = {};
    };
    setInterval(function () {
        $(".dshExitFullScreenButton").remove();
        parrot();
        cutalarms();
        parrotalarms();
        resetParrotIfNecessary();
    }, 333);

    function parrot() {
        const d = new Date();
        window.onresize = positionParrot;
        if (!document.getElementById(parrotId)) {
            appendToScreen(createImg(d));
            positionParrot();
        } else {
            let img = document.getElementById(parrotId);
            let banner = document.getElementById(bannerId);
            for (let i = 0; i <= 24; i++) {
                if (d.getHours() === i && d.getMinutes() === 0 && d.getSeconds() === 0 && !banner) {
                    resizeParrot(img, 313);
                    appendToScreen(createBanner("Es ist " + i + " Uhr!", "orange", 562));
                    resetAfter(30);
                }
            }
        }
    }

    function getTitle(currentParrotString) {
        return "Current parrot: " + currentParrotString + "\n" +
            "-----------------------------------------------\n" +
            "Try the following functions:\n" +
            "-*f* for fullscreen\n" + "-*r* for random parrot\n" +
            "-*+* for bigger parrot\n" + "-*-* for smaller parrot\n" +
            "-*Alt* to enter a parrot\n" + "-*Ctrl* to reset parrot\n" +
            "-*m* to enter max stringlength for alarms\n";
    }

    function createImg(d) {
        let img = document.createElement("img");
        img.id = parrotId;
        source(img, d);
        img.title = getTitle(currentParrot);
        img.style.position = "fixed";
        img.style.zIndex = "2147483646";
        img.style.width = defaultwidth + "px";
        img.style.left = "0px";
        img.draggable = false;
        img.style.userSelect = "none";
        img.crossOrigin = "anonymous";
        return img;
    }

    function source(img, d) {
        if (d.getDay() === 5) {
            if (d.getHours() < 12) {
                return setsource(img, "greeceparrot");
            }
            return setsource(img, "beerparrot");
        } else {
            return setsource(img, currentParrot);
        }
    }

    function setsource(img, string, overwritestandard = true) {
        string = string.toString().toLowerCase();
        let image = new Image();
        image.onload = function () {
            img.src = image.src;
            img.title = getTitle(string);
            if (overwritestandard) {
                currentParrot = string;
            }
        };
        image.onerror = function () {
            image.onerror = function () {
                image.onerror = function () {
                    image.onerror = function () {
                        image.onerror = function () {
                            image.src = "https://cultofthepartyparrot.com/parrots/hd/parrotnotfound.gif";
                            string = "parrotnotfound";
                            alert("Error 404 - Parrot not found");
                        };
                        image.src = "https://cultofthepartyparrot.com/guests/" + string + ".gif";
                    };
                    image.src = "https://cultofthepartyparrot.com/guests/hd/" + string + ".gif";
                };
                image.src = "https://cultofthepartyparrot.com/flags/hd/" + string + ".gif";
            };
            image.src = "https://cultofthepartyparrot.com/parrots/" + string + ".gif";
        };
        image.src = "https://cultofthepartyparrot.com/parrots/hd/" + string + ".gif";
    }

    function appendToScreen(element) {
        document.body.prepend(element);
    }

    function positionParrot() {
        let img = document.getElementById(parrotId);
        img.style.bottom = "-5px";
    }

    function resizeParrot(img, px) {
        img.style.width = px + "px";
        positionParrot();
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
        }
    }

    function cutalarms() {
        let highalarme = $("[data-test-subj='embeddablePanelHeading-[MRS]HIGHAlarme']").parent();
        let midalarme = $("[data-test-subj='embeddablePanelHeading-[MRS]MIDAlarme']").parent();
        let lowalarme = $("[data-test-subj='embeddablePanelHeading-[MRS]LOWAlarme']").parent();
        let elements = highalarme.add(midalarme).add(lowalarme).find("span:contains('iMosWeb')");
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
        $(".clone").remove();
        $.each(containers, function (index, container) {
            let clone = $(container).clone(true);
            clone.addClass("clone");
            clone.css("visibility", "visible");
            clone.appendTo($(".react-grid-layout.dshLayout--viewing:last"));
        });
    }

    function parrotalarms() {
        if (highs < gethighs()) {
            highs = gethighs();
            angryParrot();
        } else {
            highs = gethighs();
        }

        function angryParrot() {
            let img = document.getElementById(parrotId);
            let banner = document.getElementById(bannerId);
            setsource(img, "angryparrot", false);
            if (!banner) {
                appendToScreen(createBanner("Neuer High Alarm!", "red", 698));
            }
            resizeParrot(img, 313);
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
        return div;
    }

    function gethighs() {
        return $("[data-test-subj='embeddablePanelHeading-[MRS]AlarmejeLeveliMosWeb']").parent().find("div:contains('High - Count'):last").parent().find("span:last").html();
    }

    function keyfunctions() {
        let img = document.getElementById(parrotId);
        if (!img) {
            return;
        }
        if (map[70]) { /*f - fullscreen*/
            GoInFullscreen();
            setTimeout(scrollPastFilters, 500);
        } else if (map[171]) { /*+: bigger parrot*/
            currentWidth = img.width + 20;
            img.style.width = currentWidth + "px";
        } else if (map[173]) { /*-: smaller parrot*/
            currentWidth = img.width - 20;
            img.style.width = currentWidth + "px";
        } else if (map[17]) { /*ctrl: reset*/
            img.src = "http://www.mv-wildenduernbach.at/images/stories/f-thomas.jpg";
            img.style.width = img.width * 1.2 + "px";
            currentParrot = defaultparrot;
            currentWidth = defaultwidth;
            resetAfter(2);
        } else if (map[18]) { /*alt: enter parrot*/
            let string = prompt("Please enter a parrot", "Dadparrot");
            if (string != null) {
                setsource(img, string);
            }
            return false;
        } else if (map[77]) { /*m: enter max stringlength*/
            let string = prompt("Enter max. stringlength", "44");
            if (string != null) {
                maxStringLength = string;
            }
        } else if (map[82]) { /*r: randomparrot*/
            let parrot = allParrots[Math.floor(Math.random() * allParrots.length)];
            if (parrot.hd !== undefined) {
                let string = parrot.hd.substr(3);
                string = string.substr(0, string.length - 4);
                setsource(img, string);
            } else {
                let string = parrot.gif.substr(0, parrot.gif.length - 4);
                setsource(img, string);
            }
        }
    }

    function scrollPastFilters() {
        document.getElementsByClassName("react-grid-layout dshLayout--viewing")[0].scrollIntoView();
    }

    function GoInFullscreen() {
        let fullscreenbutton = $("[data-test-subj='dashboardFullScreenMode']");
        if (fullscreenbutton) {
            fullscreenbutton.click();
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
})();