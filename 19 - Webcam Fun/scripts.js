const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  // 유저 비디오 가져오기
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      // video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

// canvas에 사진 표시하기
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    // canvas에 화면표시
    ctx.drawImage(video, 0, 0, width, height);

    // 필터효과
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = greenScreen(pixels);
    // ctx.globalAlpha = 0.1; // alpha값 변경
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // 사진 찍는 소리 들리도록
  snap.currentTime = 0;
  snap.play();

  // 캔버스에서 찍은 사진 데이터 가져와 다운받을 수 있는 링크 생성
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement(`a`);
  link.href = data;
  link.setAttribute("download", "image");
  link.innerHTML = `<img src="${data}" alt="" />`;
  strip.insertBefore(link, strip.firstChild); // 나중에 찍힌 것부터 앞에 표시
}

// red filter
function redEffect(pixels) {
  // pixels.data는 r, g, b, a 반복되므로 픽셀 배열을 순회할 때 4씩 증가시켜줘야 함
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

// rgb filter
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

// greenscreen filter
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

// 비디오 실행가능할 때 캔버스 표시
video.addEventListener("canplay", paintToCanvas);
