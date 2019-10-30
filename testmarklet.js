javascript:(function () {
    const domain = 'https://changepartyparrot.000webhostapp.com';
    const url = new URL(domain + '/getParrot.php');
    url.search = new URLSearchParams({"parrot": "all"}).toString();

    fetch(url);
})();
