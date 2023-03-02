// Завдання 3 - генератор промісів
// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу(position),
// що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// Імпорт бібліотеки notiflix
import Notiflix from 'notiflix';

// Отримання посилань на елементи дому
const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  createPromiseBtn: document.querySelector('button[type="submit"]'),
};

//Функція створення промісу
const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
};

// Функція обробки події
const handleOnClick = e => {
  e.preventDefault(); // відміна оновлення сторінки за замовчуванням при натисканні кнопки з типом "Submit"

  // Обробка введених даних в інпутах
  // Отримання числових значень першої затримки в мілісекундах та кроку збільшення затримки для кожного промісу
  let firstDelay = Number(refs.inputDelay.value);
  let delayStep = Number(refs.inputStep.value);

  // Створення циклу, який перебирає по введеній користувачем кількості проміси, що створюються
  for (let i = 0; i < refs.amount.value; i++) {
    // Виклик функції створення промісів стільки разів, скільки введено в поле amount.
    // Після першої затримки кожна наступна буде збільшуватися на введений користувачем крок
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  refs.form.reset(); //очищення полів форми
};

// Додавання слухача на клік на кнопку
refs.createPromiseBtn.addEventListener('click', handleOnClick);
