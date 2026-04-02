const resultEl = document.getElementById('password-result');
const lengthEl = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const randomFunc = {
    lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
    upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
    number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
    symbol: () => "!@#$%^&*()_+".charAt(Math.floor(Math.random() * 12))
};

lengthEl.addEventListener('input', () => lengthVal.innerText = lengthEl.value);

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    if(typesCount === 0) return '';

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    return generatedPassword.slice(0, length);
}

copyBtn.addEventListener('click', () => {
    resultEl.select();
    document.execCommand('copy');
    alert('Пароль скопійовано!');
});