/* Задание 5.
 Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

 Заголовок первого input — «номер страницы».
 Заголовок второго input — «лимит».
 Заголовок кнопки — «запрос».
 При клике на кнопку происходит следующее:

 Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
 Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
 Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
 Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
 Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
 После получения данных вывести список картинок на экран.

 Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

const btn = document.querySelector('.btn');
const result = document.querySelector('.output');
const inputNumber = document.querySelector('.input-number');
const inputLimit = document.querySelector('.input-limit');

let data = localStorage.getItem('savedInfo');
// inputNumber.value = localStorage.getItem('prevNumber');
// inputLimit.value = localStorage.getItem('prevLimit');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    result.textContent = "";
    let number = inputNumber.value;
    let limit = inputLimit.value;
    if((number < 1 || number > 10) && (limit < 1 || limit > 10)) {
        result.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
    } else if (number < 1 || number > 10) {
        result.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
    } else if (limit < 1 || limit > 10) {
        result.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>'
    } else {
        fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('savedInfo', JSON.stringify(data));
            // localStorage.setItem('prevNumber', number);
            // localStorage.setItem('prevLimit', limit);
            displayResult(data);
        })
        .catch(() => {
            console.log('error')
        });
    }
});

function displayResult(data) {
    let cards = "";
    if (data) {
        data.forEach((item) => {
            const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-image">
            </div>`;
            cards += cardBlock; 
        });
        result.innerHTML = cards;
    }
}

displayResult(JSON.parse(data));