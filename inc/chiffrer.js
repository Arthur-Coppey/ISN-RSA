this.document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    this.getElementById('trigger').addEventListener('click', function () {
        var message = document.getElementById('input').value,
            key = {
                "n": Number(document.getElementById('key').value.toString().trim().split(',')[0]),
                "e": Number(document.getElementById('key').value.toString().trim().split(',')[1])
            },
            output;
        output = chiffrer(message, key.n, key.e);
        document.getElementById('output').value = output.toString();
    });
    this.getElementById('copy').addEventListener('click', function () {
        var txt = document.getElementById('output');
        txt.select();
        document.execCommand('copy');
        document.getElementsByTagName('em')[0].innerHTML = 'Texte copié!';
    });
});
