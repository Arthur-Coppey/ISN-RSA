this.document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    var copyButtons,
        j,
        k;
    copyButtons = this.getElementsByClassName('copy');
    for (j = 0; j < copyButtons.length; j += 1) {
        copyButtons[j].addEventListener('click', function () {
            if (this.id === 'publique') {
                k = 0;
            } else {
                k = 1;
            }
            document.getElementsByClassName('key')[k].select();
            document.execCommand('copy');
            document.getElementsByTagName('em')[k].innerHTML = 'Clé ' + this.id + ' copiée';
        });
    }
    this.getElementById('keyGen').addEventListener('click', function () {
        var i,
            tab = [],
            p,
            q,
            key;
        for (i = 1; i < 1000; i += 1) {
            if (premier(i) === 1) {
                tab.push(i);
            }
        }
        p = tab[Math.floor(Math.random() * tab.length)];
        q = tab[Math.floor(Math.random() * tab.length)];
        key = rsaNumsGen(p, q);
        document.getElementById('publicKey').value = key.n.toString() + "," + key.e.toString();
        document.getElementById('privateKey').value = key.n.toString() + "," + key.d.toString();
    });
    this.getElementById('keyCrack').addEventListener('click', function () {
        var publicKey,
            privateKey;
        publicKey = {
            "n": Number(document.getElementById('publicKeyCrack').value.toString().trim().split(',')[0]),
            "e": Number(document.getElementById('publicKeyCrack').value.toString().trim().split(',')[1])
        };
        privateKey = rsaNumsCrack(publicKey.n, publicKey.e);
        document.getElementById('privateKeyCrack').value = privateKey.n + ',' + privateKey.d;
    });
    this.getElementById('privateKeyCrackCopy').addEventListener('click', function () {
        document.getElementById('privateKeyCrack').select();
        document.execCommand('copy');
        document.getElementsByTagName('em')[2].innerHTML = 'Clé copiée';
    });
});
