'use strict';

function fooBarQuix(value) {
    let result = '';
    
    if (value % 3 == 0) result += 'Foo';
    
    if (value % 5 == 0) result += 'Bar';
    
    if (value % 7 == 0) result += 'Quix';
    
    let intArray = value.toString().split('');

    for (let char of intArray) {
        if (char == '3') result += 'Foo';
        else if (char == '5') result += 'Bar';
        else if (char == '7') result += 'Quix';
    }

    return result;
}

console.log(fooBarQuix(33));