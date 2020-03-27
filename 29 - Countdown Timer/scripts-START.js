const buttons = document.querySelectorAll("button[data-time]");
const timeInput = document.querySelector("form");
const timerDisplay = document.querySelector(".display__time-left");
const endDisplay = document.querySelector(".display__end-time");
let countdown;

function timer(seconds) {
  clearInterval(countdown); // 타이머 초기화
  const now = Date.now(); // 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 ms를 Number 형으로 반환
  // 타이머를 시작한 시점
  const then = now + seconds * 1000; // 타이머 종료될 시점
  displayTimer(seconds); // setTimeout이 바로 시작되지 않고 1초 지난 뒤 시작되기 때문에 미리 한 번 화면에 표시
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // 타이머 종료될 시점 - 1초씩 흐르고 있는 현재 시점
    // 타이머 0 되면 setInterval 멈춤: 따로 변수에 담아 clearInterval 실행하는 방법
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimer(secondsLeft);
  }, 1000);
}

function displayTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
}

function displayEndTime(then) {
  const endTime = new Date(then);
  const endHour = endTime.getHours() > 12 ? endTime.getHours() - 12 : endTime.getHours();
  const endMin = endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes();
  const isAfterNoon = endTime.getHours() < 12 ? "AM" : "PM";
  endDisplay.textContent = `Be Back At ${endHour}:${endMin} ${isAfterNoon}`;
}

function setTimer() {
  timer(this.dataset.time);
}

function setInputTimer(e) {
  e.preventDefault();
  const seconds = Number(this.querySelector("input").value) * 60;
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", setTimer));
timeInput.addEventListener("submit", setInputTimer);
