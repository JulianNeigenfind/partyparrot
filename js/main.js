$(document).ready(function () {
    const parrotId = "partyParrot";
    db.collection("users")
        .doc('gptzR0X8Df2tflNJVjq1')
        .onSnapshot(function(doc) {
            setsource(document.getElementById(parrotId), doc.data().src);
        });

    let defaultparrot = "60fpsparrot";
    let currentParrot = defaultparrot;
    let defaultwidth = 101;
    let currentWidth = defaultwidth;
    const allParrots = [
        {
            "gif": "parrot.gif",
            "hd": "hd/parrot.gif",
            "name": "Parrot"
        },
        {
            "gif": "opensourceparrot.gif",
            "hd": "hd/opensourceparrot.gif",
            "name": "Open-source Parrot"
        },
        {
            "gif": "middleparrot.gif",
            "hd": "hd/middleparrot.gif",
            "name": "Middle Parrot"
        },
        {
            "gif": "reverseparrot.gif",
            "hd": "hd/reverseparrot.gif",
            "name": "Reverse Parrot"
        },
        {
            "gif": "aussieparrot.gif",
            "hd": "hd/aussieparrot.gif",
            "name": "Aussie Parrot"
        },
        {
            "gif": "gothparrot.gif",
            "hd": "hd/gothparrot.gif",
            "name": "Goth Parrot"
        },
        {
            "gif": "oldtimeyparrot.gif",
            "name": "Old Timey Parrot"
        },
        {
            "gif": "boredparrot.gif",
            "hd": "hd/boredparrot.gif",
            "name": "Bored Parrot"
        },
        {
            "gif": "shuffleparrot.gif",
            "hd": "hd/shuffleparrot.gif",
            "name": "Shuffle Parrot"
        },
        {
            "gif": "shufflefurtherparrot.gif",
            "name": "Shuffle Further Parrot",
            "tip": "Combine with Shuffle Parrot for a conga line!"
        },
        {
            "gif": "congaparrot.gif",
            "hd": "hd/congaparrot.gif",
            "name": "Conga Line Parrot",
            "tip": "A self sufficient conga line parrot!"
        },
        {
            "gif": "reversecongaparrot.gif",
            "hd": "hd/reversecongaparrot.gif",
            "name": "Reverse Conga Line Parrot"
        },
        {
            "gif": "partyparrot.gif",
            "hd": "hd/partyparrot.gif",
            "name": "Party Parrot"
        },
        {
            "gif": "sadparrot.gif",
            "hd": "hd/sadparrot.gif",
            "name": "Sad Parrot",
            "tip": "Parrots are entitled to their full range of emotions."
        },
        {
            "gif": "copparrot.gif",
            "hd": "hd/copparrot.gif",
            "name": "Cop Parrot",
            "tip": "Not to be confused with Stripper Parrot!"
        },
        {
            "gif": "fastparrot.gif",
            "hd": "hd/fastparrot.gif",
            "name": "Fast Parrot",
            "tip": "Now with 50% more party!"
        },
        {
            "gif": "ultrafastparrot.gif",
            "hd": "hd/ultrafastparrot.gif",
            "name": "Ultra Fast Parrot",
            "tip": "Now with 150% more party!"
        },
        {
            "gif": "slowparrot.gif",
            "hd": "hd/slowparrot.gif",
            "name": "Slow Parrot",
            "tip": "Web 1.0 all over again!"
        },
        {
            "gif": "slomoparrot.gif",
            "name": "Slo-mo Parrot",
            "tip": "Party in slow motion."
        },
        {
            "hd": "hd/dadparrot.gif",
            "name": "Dad Parrot",
            "tip": "Is totally freaking out."
        },
        {
            "gif": "dealwithitparrot.gif",
            "hd": "hd/dealwithitparrot.gif",
            "name": "Deal With It Parrot"
        },
        {
            "gif": "dealwithitnowparrot.gif",
            "hd": "hd/dealwithitnowparrot.gif",
            "name": "Deal With It Now Parrot"
        },
        {
            "gif": "fiestaparrot.gif",
            "name": "Fiesta Parrot"
        },
        {
            "gif": "pizzaparrot.gif",
            "name": "🍕 Parrot"
        },
        {
            "gif": "hamburgerparrot.gif",
            "name": "🍔 Parrot"
        },
        {
            "gif": "bananaparrot.gif",
            "name": "🍌 Parrot"
        },
        {
            "gif": "chillparrot.gif",
            "name": "Chill Parrot"
        },
        {
            "gif": "explodyparrot.gif",
            "name": "Explody Parrot"
        },
        {
            "gif": "shufflepartyparrot.gif",
            "name": "Shuffle Party Parrot"
        },
        {
            "gif": "icecreamparrot.gif",
            "name": "Ice-Cream Parrot"
        },
        {
            "gif": "sassyparrot.gif",
            "hd": "hd/sassyparrot.gif",
            "name": "Sassy Parrot"
        },
        {
            "gif": "confusedparrot.gif",
            "hd": "hd/confusedparrot.gif",
            "name": "Confused Parrot"
        },
        {
            "gif": "aussiecongaparrot.gif",
            "hd": "hd/aussiecongaparrot.gif",
            "name": "Aussie Conga Line Parrot"
        },
        {
            "gif": "aussiereversecongaparrot.gif",
            "hd": "hd/aussiereversecongaparrot.gif",
            "name": "Aussie Reverse Conga Line Parrot"
        },
        {
            "gif": "wave1parrot.gif",
            "name": "Parrot Wave (1)"
        },
        {
            "gif": "wave2parrot.gif",
            "name": "Parrot Wave (2)"
        },
        {
            "gif": "wave3parrot.gif",
            "name": "Parrot Wave (3)"
        },
        {
            "gif": "wave4parrot.gif",
            "name": "Parrot Wave (4)"
        },
        {
            "gif": "wave5parrot.gif",
            "name": "Parrot Wave (5)"
        },
        {
            "gif": "wave6parrot.gif",
            "name": "Parrot Wave (6)"
        },
        {
            "gif": "wave7parrot.gif",
            "name": "Parrot Wave (7)"
        },
        {
            "gif": "wave8parrot.gif",
            "name": "Parrot Wave (8)"
        },
        {
            "gif": "wave9parrot.gif",
            "name": "Parrot Wave (9)"
        },
        {
            "gif": "congapartyparrot.gif",
            "hd": "hd/congapartyparrot.gif",
            "name": "Conga Party Parrot"
        },
        {
            "gif": "moonwalkingparrot.gif",
            "hd": "hd/moonwalkingparrot.gif",
            "name": "Moonwalking Parrot"
        },
        {
            "gif": "thumbsupparrot.gif",
            "hd": "hd/thumbsupparrot.gif",
            "name": "Thumbs Up Parrot"
        },
        {
            "gif": "coffeeparrot.gif",
            "name": "Coffee Parrot"
        },
        {
            "gif": "mustacheparrot.gif",
            "hd": "hd/mustacheparrot.gif",
            "name": "Parrot with mustache"
        },
        {
            "gif": "christmasparrot.gif",
            "hd": "hd/christmasparrot.gif",
            "name": "Christmas Parrot"
        },
        {
            "gif": "sleepingparrot.gif",
            "hd": "hd/sleepingparrot.gif",
            "name": "Sleepy Parrot"
        },
        {
            "gif": "beerparrot.gif",
            "hd": "hd/beerparrot.gif",
            "name": "Happy Hour Parrot"
        },
        {
            "gif": "darkbeerparrot.gif",
            "name": "Dark Beer Parrot"
        },
        {
            "gif": "blondesassyparrot.gif",
            "name": "Blonde Sassy Parrot"
        },
        {
            "gif": "bluescluesparrot.gif",
            "name": "Blues Clues Parrot"
        },
        {
            "gif": "gentlemanparrot.gif",
            "hd": "hd/gentlemanparrot.gif",
            "name": "Gentleman Parrot",
            "tip": "A true gentleman parrot"
        },
        {
            "gif": "margaritaparrot.gif",
            "name": "Margarita Parrot",
            "tip": "Fiesta Parrot is getting his drink on, margarita style!"
        },
        {
            "gif": "dreidelparrot.gif",
            "name": "Dreidel Parrot",
            "tip": "Happy Hanukkah!"
        },
        {
            "gif": "harrypotterparrot.gif",
            "name": "Harry Potter Parrot",
            "tip": "You're a parrot-wizard Harry!"
        },
        {
            "gif": "upvoteparrot.gif",
            "name": "Upvote Parrot"
        },
        {
            "gif": "twinsparrot.gif",
            "hd": "hd/twinsparrot.gif",
            "name": "Twins Parrot",
            "tip": "parrot + parrot = great party!"
        },
        {
            "gif": "tripletsparrot.gif",
            "name": "Triplets Parrot",
            "tip": "parrot + parrot + parrot = magnificent party!!!!"
        },
        {
            "gif": "stableparrot.gif",
            "hd": "hd/stableparrot.gif",
            "name": "Stable Parrot",
            "tip": "Gyrostablization Mode Initiated"
        },
        {
            "gif": "shipitparrot.gif",
            "name": "Ship It Parrot"
        },
        {
            "gif": "skiparrot.gif",
            "name": "Ski Parrot"
        },
        {
            "gif": "loveparrot.gif",
            "name": "Love Parrot"
        },
        {
            "gif": "halalparrot.gif",
            "name": "Halal Parrot"
        },
        {
            "hd": "hd/wendyparrot.gif",
            "name": "Wendy's Parrot",
            "tip": "BACONATOR OR DIE!"
        },
        {
            "hd": "hd/popcornparrot.gif",
            "name": "Popcorn Parrot"
        },
        {
            "hd": "hd/donutparrot.gif",
            "name": "Donut Parrot"
        },
        {
            "hd": "hd/evilparrot.gif",
            "name": "Evil Parrot"
        },
        {
            "hd": "hd/discoparrot.gif",
            "name": "Disco Parrot",
            "tip": "1970s Party Parrot"
        },
        {
            "gif": "matrixparrot.gif",
            "name": "Matrix Parrot",
            "tip": "This Parrot took the Red Pill"
        },
        {
            "gif": "papalparrot.gif",
            "name": "Papal Parrot"
        },
        {
            "gif": "stalkerparrot.gif",
            "name": "Stalker Parrot"
        },
        {
            "gif": "scienceparrot.gif",
            "hd": "hd/scienceparrot.gif",
            "name": "Science Parrot"
        },
        {
            "hd": "hd/revolutionparrot.gif",
            "name": "Revolution Parrot"
        },
        {
            "gif": "fidgetparrot.gif",
            "name": "Fidget Spinner Parrot"
        },
        {
            "gif": "beretparrot.gif",
            "hd": "hd/beretparrot.gif",
            "name": "Beret Parrot"
        },
        {
            "gif": "tacoparrot.gif",
            "name": "Taco Parrot"
        },
        {
            "gif": "ryangoslingparrot.gif",
            "name": "Ryan Gosling Parrot"
        },
        {
            "gif": "luckyparrot.gif",
            "name": "Lucky Parrot"
        },
        {
            "gif": "birthdaypartyparrot.gif",
            "hd": "hd/birthdaypartyparrot.gif",
            "name": "Birthday Party Parrot"
        },
        {
            "gif": "jediparrot.gif",
            "hd": "hd/jediparrot.gif",
            "name": "Jedi Parrot"
        },
        {
            "hd": "hd/sithparrot.gif",
            "name": "Sith Parrot",
            "tip": "Feel the power of the darkside"
        },
        {
            "gif": "angryparrot.gif",
            "hd": "hd/angryparrot.gif",
            "name": "Angry Parrot"
        },
        {
            "hd": "hd/invisibleparrot.gif",
            "name": "Invisible Parrot"
        },
        {
            "gif": "fadingparrot.gif",
            "name": "Fading Parrot"
        },
        {
            "gif": "rotatingparrot.gif",
            "name": "Rotating Parrot"
        },
        {
            "gif": "cryptoparrot.gif",
            "name": "Crypto Parrot"
        },
        {
            "hd": "hd/sushiparrot.gif",
            "name": "Sushi Parrot"
        },
        {
            "hd": "hd/pumpkinparrot.gif",
            "name": "Pumpkin Parrot"
        },
        {
            "gif": "angelparrot.gif",
            "hd": "hd/angelparrot.gif",
            "name": "Angel Parrot"
        },
        {
            "gif": "bluntparrot.gif",
            "hd": "hd/bluntparrot.gif",
            "name": "Blunt Parrot"
        },
        {
            "hd": "hd/sintparrot.gif",
            "name": "Sinterklaas Parrot"
        },
        {
            "hd": "hd/pirateparrot.gif",
            "name": "Pirate Parrot"
        },
        {
            "hd": "hd/ceilingparrot.gif",
            "gif": "ceilingparrot.gif",
            "name": "Ceiling Parrot"
        },
        {
            "hd": "hd/mardigrasparrot.gif",
            "name": "Mardi Gras Parrot",
            "tip": "Laissez les bons temps rouler!"
        },
        {
            "gif": "sovjetparrot.gif",
            "name": "Soviet Parrot",
            "tip": "даваи даваи!"
        },
        {
            "gif": "portalparrot.gif",
            "name": "Portal Parrot",
            "tip": "The cake is a lie."
        },
        {
            "hd": "hd/hardhatparrot.gif",
            "name": "Hard Hat Parrot",
            "tip": "[Under Construction]"
        },
        {
            "hd": "hd/flyingmoneyparrot.gif",
            "name": "Flying Money Parrot",
            "tip": "The money is flying away!"
        },
        {
            "hd": "hd/portalorangeparrot.gif",
            "name": "Portal Parrot (Orange Portal)"
        },
        {
            "hd": "hd/portalblueparrot.gif",
            "name": "Portal Parrot (Blue Portal)"
        },
        {
            "hd": "hd/reverseportalorangeparrot.gif",
            "name": "Reverse Portal Parrot (Orange Portal)"
        },
        {
            "hd": "hd/reverseportalblueparrot.gif",
            "name": "Reverse Portal Parrot (Blue Portal)"
        },
        {
            "hd": "hd/bunnyparrot.gif",
            "name": "Bunny Parrot",
            "tip": "Real men love bunnies"
        },
        {
            "hd": "hd/norwegianblueparrot.gif",
            "name": "Norwegian Blue Parrot",
            "tip": "Remarkable bird, the Norwegian Blue, idn'it, ay?"
        },
        {
            "hd": "hd/transparront.gif",
            "name": "Transparront"
        },
        {
            "gif": "fixparrot.gif",
            "name": "Fix Parrot"
        },
        {
            "hd": "hd/brazilianplayerparrot.gif",
            "name": "Brazilian Player Parrot"
        },
        {
            "hd": "hd/brazilianfanparrot.gif",
            "name": "Brazilian Fan Parrot"
        },
        {
            "hd": "hd/spyparrot.gif",
            "name": "Spy Parrot"
        },
        {
            "hd": "hd/marshmallowparrot.gif",
            "name": "Marshmallow Parrot"
        },
        {
            "hd": "hd/whitewalkerparrot.gif",
            "name": "White Walker Parrot"
        },
        {
            "hd": "hd/calvinist_parrot.gif",
            "name": "Calvinist Parrot"
        },
        {
            "gif": "frenchparrot.gif",
            "hd": "hd/frenchparrot.gif",
            "name": "French Parrot",
            "tip": "Oulala"
        },
        {
            "hd": "hd/githubparrot.gif",
            "name": "Github Party Parrot",
            "tip": "Github PR Party"
        },
        {
            "gif": "bootlegparrot.gif",
            "hd": "hd/bootlegparrot.gif",
            "name": "Bootleg Parrot"
        },
        {
            "gif": "bikerparrot.gif",
            "hd": "hd/bikerparrot.gif",
            "name": "Biker Parrot"
        },
        {
            "gif": "inverseparrot.gif",
            "hd": "hd/inverseparrot.gif",
            "name": "Inverse Parrot"
        },
        {
            "hd": "hd/pingpongparrot.gif",
            "name": "Ping Pong Parrot"
        },
        {
            "hd": "hd/laptop_parrot.gif",
            "name": "Laptop Parrot"
        },
        {
            "hd": "hd/60fpsparrot.gif",
            "name": "60fps Parrot"
        },
        {
            "hd": "hd/redhatparrot.gif",
            "name": "Red Hat Parrot",
            "tip": "Soon to be IBM parrot..."
        },
        {
            "hd": "hd/footballparrot.gif",
            "name": "Football Parrot"
        },
        {
            "hd": "hd/flowerparrot.gif",
            "name": "Flower Parrot"
        },
        {
            "hd": "hd/parrotnotfound.gif",
            "name": "Parrot Not Found"
        },
        {
            "hd": "hd/spinningparrot.gif",
            "name": "Spinning Parrot"
        },
        {
            "hd": "hd/redenvelopeparrot.gif",
            "name": "Red Envelope Parrot",
            "tip": "Happy Lunar New Year!"
        },
        {
            "hd": "hd/grouchoparrot.gif",
            "name": "Groucho Parrot"
        },
        {
            "hd": "hd/chicoparrot.gif",
            "name": "Chico Parrot"
        },
        {
            "hd": "hd/harpoparrot.gif",
            "name": "Harpo Parrot"
        },
        {
            "gif": "schnitzelparrot.gif",
            "name": "Schnitzel Parrot"
        },
        {
            "hd": "hd/vikingparrot.gif",
            "name": "Viking Parrot"
        },
        {
            "hd": "hd/darkmodeparrot.gif",
            "name": "Dark Mode Parrot"
        },
        {
            "hd": "hd/tiedyeparrot.gif",
            "name": "Tie Dye Parrot"
        },
        {
            "hd": "hd/horizontalparrot.gif",
            "name": "Horizontal Parrot"
        },
        {
            "hd": "hd/sherlockholmesparrot.gif",
            "name": "Sherlock Parrot"
        },
        {
            "hd": "hd/tennisparrot.gif",
            "name": "Tennis Parrot"
        },
        {
            "hd": "hd/originalparrot.gif",
            "gif": "originalparrot.gif",
            "name": "Original Parrot",
            "tip": "The one and only."
        },
        {
            "hd": "hd/bobaparrot.gif",
            "name": "Boba Parrot"
        },
        {
            "hd": "hd/backwardsparrot.gif",
            "name": "Backwards Parrot"
        },
        {
            "gif": "ripparrot.gif",
            "name": "RIP Parrot"
        },
        {
            "hd": "hd/shortparrot.gif",
            "name": "Short Parrot",
            "tip": "Someone get a ladder"
        },
        {
            "hd": "hd/headsetparrot.gif",
            "name": "Headset Parrot",
            "tip": "Hear no evil"
        },
        {
            "hd": "hd/bouncingparrot.gif",
            "name": "Bouncing Parrot"
        },
        {
            "hd": "hd/levitationparrot.gif",
            "name": "Levitation Parrot"
        },
        {
            "hd": "hd/verticalparrot.gif",
            "name": "Vertical Parrot"
        },
        {
            "gif": "databaseparrot.gif",
            "name": "Database Parrot",
            "tip": "To sql or not to sql"
        },
        {
            "hd": "hd/phparrot.gif",
            "name": "PHParrot",
            "tip": "if (!$party) { die(); }"
        },
        {
            "gif": "mergedparrot.gif",
            "name": "Merged Parrot",
            "tip": "Celebrating the merge!"
        },
        {
            "gif": "braveheartparrot.gif",
            "name": "Braveheart Parrot"
        },
        {
            "hd": "hd/maracasparrot.gif",
            "name": "Maracas Parrot"
        }
    ];
    let map = {};

    window.onkeydown = window.onkeyup = function (e) {
        e = e || event;
        map[e.keyCode] = e.type === 'keydown';
        keyfunctions();
        map = {};
    };

    function getTitle(currentParrotString) {
        return "Current parrot: " + currentParrotString + "\n" +
            "-----------------------------------------------\n" +
            "Try the following functions:\n" +
            "-*f* for fullscreen\n" +
            "-*r* for random parrot\n" +
            "-*+* for bigger parrot\n" +
            "-*-* for smaller parrot\n" +
            "-*Alt* to enter a parrot\n" +
            "-*Ctrl* to reset parrot\n" +
            "-*m* to enter max stringlength for alarms\n";
    }

    function setsource(img, string, overwritestandard = true) {
        string = string.toString().toLowerCase();
        let image = new Image();
        image.onload = function () {
            img.src = image.src;
            img.title = getTitle(string);
            if (overwritestandard) {
                setDbSource(string);
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

    function setDbSource(string) {
        db.collection('users').doc('gptzR0X8Df2tflNJVjq1').update({
            src: string
        });
    }

    function resizeParrot(img, px) {
        img.style.width = px + "px";
    }

    function keyfunctions() {
        let img = document.getElementById(parrotId);
        if (!img) {
            return;
        } else if (map[171]) { /*+: bigger parrot*/
            currentWidth = img.width + 20;
            img.style.width = currentWidth + "px";
        } else if (map[173]) { /*-: smaller parrot*/
            currentWidth = img.width - 20;
            img.style.width = currentWidth + "px";
        } else if (map[17]) { /*ctrl: reset*/
            currentParrot = defaultparrot;
            currentWidth = defaultwidth;
            setsource(img, defaultparrot);
        } else if (map[18]) { /*alt: enter parrot*/
            let string = prompt("Please enter a parrot", "Dadparrot");
            if (string != null) {
                setsource(img, string);
            }
            return false;
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
});