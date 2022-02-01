let que_arr = [];
let score = 0;
let second = 90;
let count = second;
let interval;
let que_index = 0;
let question_update; // question update fn variable
let option_box = document.querySelector(".option_box");
let que_parent_box = document.querySelector(".que_parent_box");
const circle_loader = document.querySelector(".circle_loader");
let language = location.search.slice(location.search.indexOf("=") + 1); // language name from URL

let timer_audio = new Audio("../assets/timer_sound/timer.m4a");

// render page and import questions according to the selected language
renderPage(import(`../assets/api/${language}_questions.js`));

function renderPage(que) {
  que.then(({ default: que_arr }) => {
    renderQue(que_arr, que_index, score);
    // this is for the timer
    interval = setInterval(function () {
      timer.innerHTML = "Time : " + count + " sec";
      count--;
      timer_audio.play();
      if (count < 0) {
        timeup();
        timer_audio.pause();
        alert("Time up!!, Game Over!!");
        que_parent_box.innerHTML = que_arr[10].resultPageBtn;
        logoImg();
        clearInterval(interval);
      }
    }, 1000);
  });
  lang_name.innerHTML = language;
}

// render the question
function renderQue(que_arr, que_index, score) {
  option_box.innerHTML = "";
  options.classList.remove("disable");

  let current_que = que_arr[que_index];
  que.innerHTML = current_que.que;

  que_no.textContent = "Q." + parseInt(que_index + 1); // update question number
  updateOption(current_que, que_arr, que_index, score); // option update
  updateImg(current_que.img);
}

// option updation
function updateOption(current_que, que_arr, que_index, score) {
  opt_loader.style.display = "block";
  let allOptions = current_que.options;

  allOptions.map((option) => {
    let li = document.createElement("li");
    const params = { li, current_que, que_arr, que_index, score };

    li.innerHTML = option;
    option_box.appendChild(li);
    opt_loader.style.display = "none";

    li.addEventListener("click", () => {
      validateAns(params);
    });
  });
}

// check the correct ans
function validateAns(params) {
  let { li, current_que, que_arr, que_index } = params;
  if (li.innerHTML === current_que.right_ans) {
    score++;
    li.style.background = "green";
    options.classList.add("disable");
    que_score.innerHTML = "Score : " + score;
    localStorage.setItem("score", score);
  } else {
    li.style.background = "red";
    options.classList.add("disable");
  }
  question_update(que_arr, que_index);
}

// after select the option update the question to the next question
question_update = function (que_arr, que_index) {
  setTimeout(() => {
    if (que_index < que_arr.length - 1) {
      que_index++;
      if (que_index === 10) {
        que_parent_box.innerHTML = que_arr[10].resultPageBtn;
        logoImg();
        clearInterval(interval);
        timer.innerHTML = "Time : 0 sec";
        timer_audio.pause();
        speak(count);
      }
      renderQue(que_arr, que_index, score);
    }
  }, 1000);
};

// img updation
function updateImg(img) {
  circle_loader.style.display = "block";
  if (img) {
    codeImg(img);
  } else {
    logoImg();
  }
  circle_loader.style.display = "none";
}

function codeImg(img) {
  que_img.src = img;
  que_img.classList.add("queImg");
  que_img.classList.remove("img");
}

function logoImg() {
  que_img.src = "../assets/logos/logo.png";
  que_img.classList.add("img");
  que_img.classList.remove("queImg");
}

// speak function
function speak(count) {
  let msg = `You completed this quiz in ${second - count} second`;
  var speakMsg = new SpeechSynthesisUtterance();
  speakMsg.text = msg;
  speakMsg.lang = "en";
  window.speechSynthesis.speak(speakMsg);
}

function timeup() {
  let msg = `Time up!!, Game Over!!`;
  var speakMsg = new SpeechSynthesisUtterance();
  speakMsg.text = msg;
  speakMsg.lang = "en";
  window.speechSynthesis.speak(speakMsg);
}
