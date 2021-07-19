function premier(n) { //vérifie si un nombre est premier
    "use strict";
    if (n !== null && n !== 0) {
        var rn = Math.sqrt(n),
            cn = Math.pow(n, 2),
            num = cn.toString(),
            etat = 1,
            i;
        //0 = pasPremier
        //1 = premier
        if (n === 1) {
            etat = 0;
        } else if (n === 2) {
            etat = 1;
        } else if (n % 2 === 0) {
            etat = 0;
        } else if (num.match(",")) {
            etat = 0;
        } else {
            for (i = 3; i < rn; i += 2) {
                if (n % i === 0) {
                    etat = 0;
                }
            }
        }
        //console.log(etat);
        return etat;
    }
}

function pgcd(a, b) { // Algorithme d'Euclide
    "use strict";
    if (a !== null && b !== null) {
        while (b > 0) {
            var r = a % b;
            a = b;
            b = r;
        }
        return a;
    }
}

function rsaNumsGen(p, q) { //calcule n, m, e, et d
    "use strict";
    var n,
        m,
        e,
        d,
        i,
        resultat;
    if (premier(p) === 1 && premier(q) === 1) {
        n = p * q;
        m = (p - 1) * (q - 1);
        e = 2;
        while (pgcd(m, e) !== 1) {
            e += 1;
        }
        for (i = 1; i < m; i += 1) {
            if (((e * i - 1) / m) % 1 === 0) {
                d = i;
                break;
            }
        }
        resultat = {
            "p": p,
            "q": q,
            "n": n,
            "m": m,
            "e": e,
            "d": d
        }; //crée un objet en JSON
        console.log(resultat);
        return resultat; //retourne l'objet resultat
    } else {
        console.error('nombre non premier', p, q);
    }
}

function rsaNumsCrack(n, e) {
    "use strict";
    var tab = [],
        i,
        j,
        k,
        l,
        p,
        q,
        m,
        d,
        nums;
    console.warn('beware, this task needs much ressources, your browser may look frozen');
    console.log('starting to crack the key...');
    for (i = 1; i < n; i += 1) {
        if (premier(i) === 1) {
            tab.push(i);
        }
    }
    for (j = 0; j < tab.length; j += 1) {
        for (k = 0; k < tab.length; k += 1) {
            if (k * j === n) {
                p = j;
                q = k;
                console.log('factorization finished !');
                console.log('resuming cracking...');
                break;
            }
        }
        if (p !== null && q !== null && p !== 0 && q !== 0 && p !== undefined && q !== undefined) {
            break;
        }
    }
    m = (p - 1) * (q - 1);
    for (l = 1; l < m; l += 1) {
        if (((e * l - 1) / m) % 1 === 0) {
            d = l;
            break;
        }
    }
    nums = {
        "p": p,
        "q": q,
        "n": n,
        "m": m,
        "e": e,
        "d": d
    };
    console.log('cracking finished !');
    return nums;
}

function enAscii(text) {
    "use strict";
    var tabAsc = [],
        i,
        j;
    for (i = 0; i < text.length; i += 1) {
        tabAsc[i] = text.charCodeAt(i);
    }
    for (j = 0; j < tabAsc.length; j += 1) {
        while (tabAsc[j].toString().length < 3) {
            tabAsc[j] = "0" + tabAsc[j];
        }
        tabAsc[j] = tabAsc[j].toString();
    }
    //console.log(tabAsc);
    return tabAsc;
}

function enDeux(tabAsc) {
    "use strict";
    var asc = tabAsc.join(""),
        tabGroupe = [],
        i;
    while (asc.length % 2 !== 0) {
        asc += "0";
    }
    for (i = 0; i < asc.length; i += 2) {
        tabGroupe.push(asc.substr(i, 2));
    }
    return tabGroupe;
}

function mod(base, pow, module) {
    "use strict";
    var res = base,
        i;
    for (i = pow; i > 1; i -= 1) {
        res = (res * base) % module;
    }
    return res;
}

function chiffrer(message, n, e) {
    "use strict";
    message = enDeux(enAscii(message));
    //    console.log(message);
    var resultat = [],
        i;
    for (i = 0; i < message.length; i += 1) {
        resultat[i] = mod(Number(message[i]), e, n);
    }
    //    console.log(resultat);
    return resultat;
}

function dechiffrer(message, n, d) {
    "use strict";
    var res = [],
        tabRes = [],
        i,
        j,
        k;
    for (i = 0; i < message.length; i += 1) {
        res[i] = mod(Number(message[i]), d, n);
        while (res[i].toString().length < 2) {
            res[i] = "0" + res[i].toString();
        }
        res[i] = res[i].toString();
    }
    res = res.join('');
    for (j = 0; j < res.length; j += 3) {
        tabRes.push(res.substr(j, 3));
    }
    if (tabRes[tabRes.length - 1].length < tabRes[0].length) {
        tabRes.pop();
    }
    for (k = 0; k < tabRes.length; k += 1) {
        tabRes[k] = String.fromCharCode(Number(tabRes[k]));
    }
    res = tabRes.join('');
    return res;
}

function decrypter(message, n, e) {
    "use strict";
    var nums = rsaNumsCrack(n, e),
        msg = dechiffrer(message, nums.n, nums.d);
    return msg;
}
