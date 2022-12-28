//DOM elements.
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbols,
        length  
    );
    });

// Copy password to clipboard.
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;

    document.body.appendChild(textarea);
    textarea.select();
   // document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!')
})

//Generate password function.
function generatePassword(lower, upper, number, symbol, length ) {
    // 1. Init password variable.
    // 2. Filter out unchecked typed.
    // 3. Loop over length and call generator function for each type.
    // 4. Add final password to the password variable and return.

    let generatedPassword = '';
    
    const typesCount = lower + upper + number + symbol;

    //console.log('typesCount: ', typesCount);

    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter
    (
      item => Object.values(item)[0]
    );

    //console.log('typesArray:', typesArray);

    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];

           // console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = (generatedPassword.slice(0, length));
    return finalPassword
}

//Generator function.

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}


function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}


function getRandomSymbol() {
    const symbols = '?!@#$%^&*()_ \|-{}[]<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]
}
