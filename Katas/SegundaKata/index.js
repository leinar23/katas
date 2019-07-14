'use strict';
const romarabe = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

function arToRom (arabe) {
    let aa = arabe.toString().split('');
    const chars = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    const values = [1, 5, 10, 50, 100, 500, 1000];
    let res = [];
    let base10 = 1;
    
    for (let element of aa.reverse()) {
        element *= base10;
        let arra = [];
        let i = 0;
        let comprobador = [-1 * base10, 1 * base10, 2 * base10, 3 * base10];
        
        if (element != 0) {     
            for (let a in romarabe) {
                arra.push(element - romarabe[a]);
            }
            
            if (arra.includes(0)) {
                res.unshift(chars[arra.indexOf(0)]);
            } else if (arra.includes(comprobador[0])) {
                i = arra.indexOf(comprobador[0]);
                let roman = chars[i - 1] + chars[i];
                let romanSurprise = chars[i - 2] + chars[i];
                if (validador(roman)) res.unshift(roman);
                else res.unshift(romanSurprise);
            } else if (arra.includes(comprobador[1])) {
                i = arra.indexOf(comprobador[1]);
                let roman = chars[i].repeat(element / base10);
                let romanSurprise =  chars[i] + chars[i - 1];
                if (validador(roman)) res.unshift(roman);
                else res.unshift(romanSurprise);
            } else if (arra.includes(comprobador[2])) {
                i = arra.indexOf(comprobador[2]);
                let roman = chars[i].repeat(element / base10);
                if (validador(roman)) res.unshift(roman);
                else {
                    let romanSurprise =  chars[i] + chars[i - 1].repeat(2);
                    res.unshift(romanSurprise);
                }
            } else if (arra.includes(comprobador[3])) {
                i = arra.indexOf(comprobador[3]);
                let roman = chars[i].repeat(element / base10);
                if (validador(roman)) res.unshift(roman);
                else {
                    let romanSurprise =  chars[i] + chars[i - 1].repeat(3);
                    res.unshift(romanSurprise);
                }
            }
        }
        
        base10 *= 10;
    };
    
    return res.join('');
}

function romToAr (romano) {
    if(validador(romano)) {
        let ra = romano.split('');
        let res = 0;
        let i = 0;
        
        do {
            let multiplier = 1;
            let val = romarabe[ra[i]];
            let valRef = romarabe[ra[i+1]];
            let valAux = romarabe[ra[i+2]];
            valRef == undefined ? valRef = 0 : null;
            valAux == undefined ? valAux = 0 : null;
            
            if (val < valRef) {
                res += valRef - val;
                i+=2;
            } else if (val == valRef) {
                multiplier++;
                val == valAux ? multiplier++ : null;
                res += val * multiplier;
                i += multiplier;
            } else {
                if (valRef == 1 || valRef % 10 == 0) {
                    if (valRef < valAux) {
                        res += val + (valAux - valRef);
                        i += 3;
                    } else {
                        valRef == valAux ? multiplier++ : null;
                        valRef == romarabe[ra[i+3]] ? multiplier++ : null;
                        res += val + (valRef * multiplier);
                        i += multiplier + 1;
                    }
                } else {
                    if (valAux != undefined) {
                        if (valAux == 1 || valAux % 10 == 0) {
                            valAux == romarabe[ra[i+3]] ? multiplier++ : null;
                            valAux == romarabe[ra[i+4]] ? multiplier++ : null;
                            res += val + valRef + (valAux * multiplier);
                            i += multiplier + 2;
                        }
                    } else {
                        res += val + valRef;
                        i+=2;
                    }
                }
            }
        } while (i < ra.length);
        
        return res;
    } else {
        return 'El número no es válido.';
    }
}

function validador(romano) {
    let ra = romano.split('');
    let charRef = '';
    let countThree = 0;
    let countOne = {
        'V': 0,
        'L': 0,
        'D': 0
    };
    
    for (let char of ra) {
        char == charRef ? countThree++ : countThree = 0;
        char == 'V' || char == 'L' || char == 'D' ? countOne[char]++ : null;
        
        switch (charRef) {
            case 'I':
            if (char != 'V' && char != 'X' && char != 'I') return false;
            break;
            case 'V':
            if (romarabe[charRef] < romarabe[char]) return false;
            break;            
            case 'X':
            if (char == 'D' || char == 'M') return false;
            break;            
            case 'L':
            if (romarabe[charRef] < romarabe[char]) return false;
            break;            
            case 'D':
            if (romarabe[charRef] < romarabe[char]) return false;
            break;        
        }
        
        charRef = char;
        for (let index in countOne){
            if (countOne[index] > 1) return false;
        }
        if (countThree > 2) return false;
    }
    
    return true;
}

console.log(validador('MMMCMXC'));
console.log(romToAr('MMMCMXC'));
console.log(arToRom(3990));