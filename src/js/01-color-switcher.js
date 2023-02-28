// Завдання 1 - перемикач кольорів
// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення,
// використовуючи інлайн стиль.Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// Дістаємо посилання на елементи в документі
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
// Встановлюємо початковий стан кнопки неактивним
refs.stopBtn.disabled = true;
let intervalId = null;

// Функція для генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Функція, яка запускається при натисканні на кнопку start
const start = () => {
  console.log('start');
  refs.startBtn.disabled = true; // кнопка «Start» стає активною
  refs.stopBtn.disabled = false; // кнопка «Stop» стає неактивною (disabled)
  // Встановлюємо таймер зміни коліру раз на секунду
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

// Функція, яка запускається при натисканні на кнопку stop
const stop = () => {
  // Зупиняємо таймер зміни коліру
  clearInterval(intervalId);
  refs.startBtn.disabled = false; // кнопка «Start» стає неактивною (disabled)
  refs.stopBtn.disabled = true; // кнопка «Stop» стає активною
};

// Додаємо слухачів подій на кнопки start та stop
refs.startBtn.addEventListener('click', start);
refs.stopBtn.addEventListener('click', stop);
