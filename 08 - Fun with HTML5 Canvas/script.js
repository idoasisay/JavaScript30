const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

// canvas 기본 세팅
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 50;
// ctx.globalCompositeOperation = "multiply";  => 참고!

let isDrawing = false; // mousedown 이벤트 있을때만 그려지게 하는 flag 변수
let lastX = 0; // 그리고 있는 위치의 X좌표
let lastY = 0; // 그리고 있는 위치의 Y좌표
let hue = 0; // 컨텍스트 색상 변경 위한 변수
let direction = true; // 컨텍스트 크기 조절 위한 변수

function draw(e) {
  if (!isDrawing) {
    // mousedown 이벤트 일어나고 있지 않을 때에 function 실행 멈춤
    return;
  }
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // 색상 스펙트럼 변경
  ctx.beginPath(); // 컨텍스트 시작
  ctx.moveTo(lastX, lastY); // 이벤트 일어나는 곳의 좌표로 컨텍스트 움직임
  ctx.lineTo(e.offsetX, e.offsetY); // 컨텍스트들을 이어줌
  ctx.stroke(); // stroke 불러줌으로써 화면에 컨텍스트 나타내줌
  [lastX, lastY] = [e.offsetX, e.offsetY]; // 그려지는 위치의 좌표 업데이트
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  // 컨텍스트 크기에 따라 direction 변수 반전
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  }
  if (!direction) {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // mousedown 하고 있을 동안만 좌표 업데이트해 컨텍스트끼리 서로 끊어져 표시되도록
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
