// Завдання 2 - таймер зворотного відліку

// Імпорт бібліотеки flatpickr
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт бібліотеки notiflix
import Notiflix from 'notiflix';

// Отримання посилань на елементи дому
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

// Встановлюємо початковий стан кнопки неактивним
refs.startBtn.disabled = true;

// Налаштування об'єкту параметрів бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Метод викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr
  onClose(selectedDates) {
    // Порівнюємо перший елемент з масиву обраних дат. Якщо користувач вибрав дату в минулому,
    // показуємо повідомлення "Please choose a date in the future"
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

// Виклик функції для вибору дати та часу в елементі input
flatpickr(refs.input, options);

// Функція, що повертає об'єкт з розрахованим часом, що залишився до кінцевої дати.
const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// Функцію, яка використовує метод padStart() для форматування результату ф-ції convertMs().
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

// Функція, що запускає відлік часу
const onHandleClick = () => {
  // Запуск зворотнього відліку з інтервалом 1000 (1 секунда)
  let countdown = setInterval(() => {
    // Визначення часу, скільки залишилось до вказаної дати
    let differenceOfDates = new Date(refs.input.value) - new Date();

    // старт зворотнього відліку за умови, що різниця часу до кінцевої дати більше ніж нуль
    if (differenceOfDates >= 0) {
      // деструктурізація об'єкту з розрахованим часом по дням, годинам, мінутам та секундам (функція конвертації мілісекунд в об'єкт значень)
      let { days, hours, minutes, seconds } = convertMs(differenceOfDates);

      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);
      // деактивація кнопки "Старт"
      refs.startBtn.disabled = true;
      //зміна коліру тексту, коли почався зворотній виклик
      refs.timer.style.color = 'red';
    } else {
      Notiflix.Notify.success('Time is up!');
      //зупинка зворотнього відліку, коли до кінцевої дати, тобто 00:00:00:00
      clearInterval(countdown);
      //повернення коліру тексту до початкового
      refs.timer.style.color = 'black';
    }
  }, 1000);
};

// Додаємо слухача на натискання кнопки Start
refs.startBtn.addEventListener('click', onHandleClick);
