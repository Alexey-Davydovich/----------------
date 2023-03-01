'use strict'

//форматирование ввода номера

const phoneInput = document.getElementById('tel');

phoneInput.addEventListener('input', onPhoneInput);
phoneInput.addEventListener('keydown', onPhoneKeyDown);


function getInputNumbersValue (input) {
    return input.value.replace(/\D/g, '');
 }


function onPhoneInput (e) {
    let input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let formattedInputValue = "";
    let selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
        return input.value = '';
    }

    if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue;
        }
        return;
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
        let firstSymbol = (inputNumbersValue[0] == '8') ? '+7' : "+7";
        formattedInputValue = firstSymbol + ' ';
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ')-' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;
}

function onPhoneKeyDown(e) {
    if (e.keyCode == 8 && getInputNumbersValue(e.target).length == 1) {
        e.target.value = '';
    }
}

//сохранение в localStorage

const form = document.getElementsByClassName('form__form-box')[0];
form.addEventListener('submit', saveLocalStorage);

const checkboxBtn = document.getElementById('checkbox');
const userName = document.getElementById('name');
const userSurname = document.getElementById('surname');
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('tel');
const userPassword = document.getElementById('password');
const userRepeatPassword = document.getElementById('Repeat-password');

function saveLocalStorage (e) {
    e.preventDefault();

    if (userRepeatPassword.value === userPassword.value) {
        if (checkboxBtn.checked && form.checkValidity()) {
            if (userName.value !== '') localStorage.setItem('name', JSON.stringify(userName.value));
            if (userSurname.value !== '') localStorage.setItem('surname', JSON.stringify(userSurname.value));
            if (userEmail.value !== '') localStorage.setItem('email', JSON.stringify(userEmail.value));
            if (userPhone.value !== '') localStorage.setItem('phone', JSON.stringify(userPhone.value));
            if (userPassword.value !== '') localStorage.setItem('password', JSON.stringify(userPassword.value));
        }
    }
}


//добавляем стили к невалидным input'ам

const formInputs = document.getElementsByTagName('input');

function checkValidity (e) {
    for (var input of formInputs) {
        input = e.target;
        if (!input.checkValidity()) {
            e.target.style.cssText = 'background-color: rgba(209, 50, 50, 0.4)';
        } else {
            e.target.style.cssText = '' ;
        }
    }
}

function checkOnRepeat () {
    if (userRepeatPassword.value === userPassword.value) {
        userRepeatPassword.style.cssText = '' ;
    } else {
        userRepeatPassword.style.cssText = 'background-color: rgba(209, 50, 50, 0.534)';
    }
}

userName.addEventListener('mouseleave', checkValidity);
userEmail.addEventListener('mouseleave', checkValidity);
userPassword.addEventListener('mouseleave', checkValidity);
userRepeatPassword.addEventListener('mouseleave', checkValidity);
userRepeatPassword.addEventListener('mouseleave', checkOnRepeat);