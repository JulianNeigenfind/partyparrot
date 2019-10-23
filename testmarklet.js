javascript:(function () {
    let string = prompt("Please enter a parrot", "Dadparrot");
    if (string != null) {
        $.post('https://cors-anywhere.herokuapp.com/https://partyparrot.000webhostapp.com/main.php', {parrot: string.toLowerCase()}, function (result) {});
    }
})();