var dataAjax = new ej.base.Ajax("./src/default/default.html", 'GET', true);
dataAjax.send().then(function (result) {
    document.getElementById('content').innerHTML = result.toString();
    window.default();
});