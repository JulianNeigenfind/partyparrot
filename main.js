$(document).ready( function () {
    var input = $("#parrot");
    var len = input.val().length;
    input[0].focus();
    input[0].setSelectionRange(0, len);
    $('form').submit( function () {
        var formdata = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "main.php",
            data: formdata,
        }).done(function () {
            location.reload();
        });
        return false;
    });
});