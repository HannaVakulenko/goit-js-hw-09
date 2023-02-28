// Імпорт бібліотеки flatpickr
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт бібліотеки notiflix
import Notiflix from 'notiflix';

//Бібліотека очікує, що її ініціалізують на елементі input[type="text"],
// тому ми додали до HTML документу поле input#datetime - picker
//Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const refs = {
  input: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minuts: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
// Встановлюємо початковий стан кнопки неактивним
refs.startBtn.disabled = true;

flatpickr('#datetime-picker', options);

// input.onClose(selectedDates) {
//     window.alert("Please choose a date in the future");
// };
