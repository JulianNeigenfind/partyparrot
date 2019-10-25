$(document).ready(function () {
    const intervalInMs = 5000;
    const domain = 'https://changepartyparrot.000webhostapp.com';
    let mainSource = "";
    var input = $("#parrot");
    var len = input.val().length;
    input[0].focus();
    input[0].setSelectionRange(0, len);
    $('form').submit(function () {
        var formdata = $(this).serializeArray();
        const data = new URLSearchParams();
        data.append(formdata[0].name, formdata[0].value);

        fetch(domain + "/changeParrot.php", {
            method: 'POST',
            body: data,
        });
        return false;
    });


    const fetchNow = function () {
        fetch(domain + '/currentParrot.php')
            .then(function (response) {
                response.text().then(function (text) {
                    mainSource = text;
                    setTimeout(function () {
                        fetchNow();
                    }, intervalInMs);
                })
            })
            .catch(function (err) {
                setTimeout(function () {
                    fetchNow();
                }, intervalInMs);
            });
    };

    $("a[title*='000webhost']").parent().remove();/*remove banner*/
    fetchNow();
    setInterval(function () {
        let img = document.getElementById("partyParrot");
        if (img.src !== mainSource) {
            img.src = mainSource;
            var input = $("#parrot");
            var len = input.val().length;
            input[0].focus();
            input[0].setSelectionRange(0, len);
        }
    }, 1000);
});