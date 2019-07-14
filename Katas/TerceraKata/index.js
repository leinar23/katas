'use strict';

let message;

function poker(jugador1, jugador2) {
    if (rules(jugador1) && rules(jugador2)) {
        message = stairwayToHeaven(jugador1, jugador2);
    } else {
        message = 'No se cumplen las normas'
    }
    
    return message;
}

// Rules
function stairwayToHeaven (hand1, hand2) {
    if (isOver(hand1) && isOver(hand2)) {
        return message = highCard(hand1, hand2);
    } else if (isOver(hand1)) {
        return message = 'Jugador 1 gana, escalera de color';
    } else if (isOver(hand2)) {
        return message = 'Jugador 2 gana, escalera de color';
    } else {
        return message = fOAK(hand1, hand2);
    }
}

function fOAK (hand1, hand2) {
    let equalsP1 = lookForEquals(hand1);
    let equalsP2 = lookForEquals(hand2);
    
    if (equalsP1.length > 0 && equalsP2.length > 0) {
        if (equalsP1[0][1] > 3 && equalsP2[0][1] > 3) {
            return message = highCard(hand1, hand2);
        } else if (equalsP1[0][1] > 3) {
            return message = 'Jugador 1 gana, poker';
        } else if (equalsP2[0][1] > 3) {
            return message = 'Jugador 2 gana, poker'
        } else {
            return message = full(hand1, hand2);
        }
    } else if (equalsP1.length > 0) {
        return message = equalsP1[0][1] > 3 ? 'Jugador 1 gana, poker' : full(hand1, hand2);
    } else if (equalsP2.length > 0) {
        return message = equalsP2[0][1] > 3 ? 'Jugador 2 gana, poker' : full(hand1, hand2);
    } else {
        return message = full(hand1, hand2);
    }
}

function full (hand1, hand2) {
    if (isFull(hand1) && isFull(hand2)) {
        return message = tOAK(hand1, hand2);
    } else if (isFull(hand1)) {
        return message = 'Jugador 1 gana, full house';
    } else if (isFull(hand2)) {
        return message = 'Jugador 2 gana, full house';
    } else {
        return message = flush(hand1, hand2);
    }
}

function flush (hand1, hand2) {
    if (isFlush(hand1) && isFlush(hand2)) {
        return message = highCard(hand1, hand2);
    } else if (isFlush(hand1)) {
        return message = 'Jugador 1 gana, color'
    } else if (isFlush(hand2)) {
        return message = 'Jugador 2 gana, color'
    } else {
        return message = straight(hand1, hand2);
    }
}

function straight (hand1, hand2) {
    if (isConsecutive(hand1) && isConsecutive(hand2)) {
        return message = highCard(hand1, hand2);
    } else if (isConsecutive(hand1)) {
        return message = 'Jugador 1 gana, escalera';
    } else if (isConsecutive(hand2)) {
        return message = 'Jugador 2 gana, escalera';
    } else {
        return message = tOAK(hand1, hand2);
    }
}

function tOAK (hand1, hand2) {
    let equalsP1 = lookForEquals(hand1);
    let equalsP2 = lookForEquals(hand2);
    
    if (equalsP1.length > 0 && equalsP2.length > 0) {
        if (equalsP1[0][1] > 2 && equalsP2[0][1] > 2) {
            let flatEqP1 = flatEquals(equalsP1);
            let flatEqP2 = flatEquals(equalsP2);
            if (Math.max(...flatEqP1) != Math.max(...flatEqP2)) {
                return message = Math.max(...flatEqP1) > Math.max(...flatEqP2) ?
                'Jugador 1 gana, trio más alto' :
                'Jugador 2 gana, trio más alto';
            } else {
                return message = highCard(hand1, hand2);
            }
        } else if (equalsP1[0][1] > 2) {
            return message = 'Jugador 1 gana, trio';
        } else if (equalsP2[0][1] > 2) {
            return message = 'Jugador 2 gana, trio';
        } else {
            return message = twoPairs(hand1, hand2);
        }
    } else if (equalsP1.length > 0) {
        if (equalsP1[0][1] > 2) {
            return message = 'Jugador 1 gana, trio';
        } else {
            return message = pair(hand1, hand2);
        }
    } else if (equalsP2.length > 0) {
        if (equalsP2[0][1] > 2) {
            return message = 'Jugador 2 gana, trio';
        } else {
            return message = pair(hand1, hand2);
        }
    } else {
        return message = highCard(hand1, hand2);
    }
}

function twoPairs (hand1, hand2) {
    let equalsP1 = flatEquals(lookForEquals(hand1));
    let equalsP2 = flatEquals(lookForEquals(hand2));
    
    if (equalsP1.length > 1 && equalsP2.length > 1) {
        let maxEqP1 = Math.max(...equalsP1);
        let maxEqP2 = Math.max(...equalsP2);
        if (maxEqP1 != maxEqP2) {
            return message = maxEqP1 > maxEqP2 ? 
            'Jugador 1 gana, doble pareja, pareja más alta' : 
            'Jugador 2 gana, doble pareja, pareja más alta';
        } else {
            let minEqP1 = Math.min(...equalsP1);
            let minEqP2 = Math.min(...equalsP2);
            if (minEqP1 != minEqP2) {
                return message = minEqP1 > minEqP2 ? 
                'Jugador 1 gana, doble pareja, pareja más alta' : 
                'Jugador 2 gana, doble pareja, pareja más alta';
            } else {
                return message = highCard(hand1, hand2);
            }
        }
    } else if (equalsP1.length > 1) {
        return message = 'Jugador 1 gana, doble pareja';
    } else if (equalsP2.length > 1) {
        return message = 'Jugador 2 gana, doble pareja';
    } else {
        return message = pair(hand1, hand2);
    }
}

function pair (hand1, hand2) {
    let equalsP1 = flatEquals(lookForEquals(hand1));
    let equalsP2 = flatEquals(lookForEquals(hand2));
    
    if (equalsP1.length > 0 && equalsP2.length > 0) {
        if (equalsP1[0] != equalsP2[0]) {
            return message = equalsP1[0] > equalsP2[0] ? 
            'Jugador 1 gana, pareja más alta' : 
            'Jugador 2 gana, pareja más alta';
        } else {
            return message = highCard(hand1, hand2);
        }
    } else return message = equalsP1.length > 0 ? 
    'Jugador 1 gana, pareja' : 
    'Jugador 2 gana, pareja';
}

function highCard (hand1, hand2) {
    let isEqual = true;
    let index = hand1.length - 1;
    
    do {
        if (cardValue(hand1[index]) != cardValue(hand2[index])) {
            isEqual = false;
            return message = cardValue(hand1[index]) > cardValue(hand2[index]) ?
            'Jugador 1 gana, carta más alta' : 
            'Jugador 2 gana, carta más alta';
        }
        index--;
    } while (isEqual && index >= 0);
    
    return message = 'Empate';
}

// Tools
function isOver (hand) {
    return isFlush(hand) && isConsecutive(hand);
}

function isFull (hand) {
    let equals = lookForEquals(hand);
    
    if(equals.length > 1) {
        let quant = [];
        
        equals.forEach(element => {
            quant.push(element[1]);
        });
        
        return quant.includes(3) && quant.includes(2) ? true : false;
    }
    
    return false;
}

function isConsecutive(hand) {
    let ordHand = cardOrderer(hand);
    let toBe = true;
    let index = 1;
    
    do {
        toBe = ordHand[0] + index == ordHand[index] ? true : false;
        index++;
    } while (toBe && index < ordHand.length);
    
    return toBe;
}

function flatEquals (equals) {
    let res = [];
    
    for (let arrayEq of equals) {
        res.push(arrayEq[0]);
    }
    
    return res;
}

function isFlush (hand) {
    let isFlush = true;
    let suitedHand = arraySuit(hand);
    let index = 1;
    
    do {
        isFlush = suitedHand[0] == suitedHand[index] ? true : false;
        index++;
    } while (isFlush && index < hand.length);
    
    return isFlush;
}

function lookForEquals (hand) {
    let equals = [];
    let handValues = arrayValues(hand);
    let index = 0;
    
    do {
        let repeat = 0;
        if (handValues.includes(handValues[index], index + 1)) {
            for (let value of handValues) {
                if (value == handValues[index]) {
                    repeat++;
                }
            }
            
            equals.push([handValues[index], repeat]);
            index += repeat;
            repeat = 0;
        } else index++;
    } while(index < hand.length);
    
    return equals;
}

function cardOrderer (hand) {
    let aValues = arrayValues(hand);
    
    return aValues.sort((a, b) => a - b);
}

function arraySuit (hand) {
    let aSuits = [];
    
    hand.forEach (element => {
        aSuits.push(cardSuit(element));
    });
    
    return aSuits;
}

function arrayValues (hand) {
    let aValues = [];
    
    hand.forEach (element => {
        aValues.push(cardValue(element));
    });
    
    return aValues;
}

function cardSuit (card) {
    let vp = card.split('');
    return vp[1];
}

function cardValue (card) {
    const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let vp = card.split('');
    let res;
    VALUES.forEach((element, index) => {
        vp[0] == element ? res = index + VALUES[0] : null;
    });
    return res;
}

function rules (hand) {
    let valid;
    
    hand.length > 5 ? valid = false : valid = true;
    hand.forEach((element, index) => {
        hand.includes(element, index + 1) ? valid = false : null;
    });
    
    return valid;
}

/*
*/
console.log('#1' + '\n' + poker(['4H', '4D', '5S', '5C', 'AH'], ['4C', '4H', '4S', '3C', 'KD']));
console.log('#2' + '\n' + poker(['2C', '2S', '2H', '3C', '3H'], ['2S', '4S', '4C', 'QS', 'AS']));
console.log('#3' + '\n' + poker(['2H', '3D', '5S', '8C', 'KD'], ['2C', '3H', '5C', '9S', 'KH']));
console.log('#4' + '\n' + poker(['2H', '4S', '4C', '2D', '4H'], ['2S', '8S', 'AS', 'QS', '3S']));
console.log('#5' + '\n' + poker(['2H', '2D', '2S', '2C', 'KD'], ['2D', '3H', '5C', '9S', 'KH']));
console.log('#6' + '\n' + poker(['2H', '5H', '4H', '3H', '6H'], ['2D', '3H', '5C', '9S', 'KH']));