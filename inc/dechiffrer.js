this.document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    this.getElementById('trigger').addEventListener('click', function () {
        var message = document.getElementById('input').value.split(','),
            key = {
                "n": Number(document.getElementById('key').value.toString().trim().split(',')[0]),
                "d": Number(document.getElementById('key').value.toString().trim().split(',')[1])
            },
            output;
        console.log(message, key);
        output = dechiffrer(message, key.n, key.d);
        //        console.log(output);
        document.getElementById('output').value = output.toString();
    });
    this.getElementById('copy').addEventListener('click', function () {
        var txt = document.getElementById('output');
        txt.select();
        document.execCommand('copy');
        document.getElementsByTagName('em')[0].innerHTML = 'Texte copié!';
    });
});
