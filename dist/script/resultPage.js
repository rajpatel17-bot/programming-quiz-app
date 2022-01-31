let language = location.search.slice(location.search.indexOf("=") + 1);
let total_no_que = 10;
lang_name.innerHTML = language;

let score = localStorage.getItem("score");

que_score.innerHTML = "Score : " + `${score ? score : "0"}`;

// que_result.innerHTML = `You correct ${score ? score : "0"} questions and ${10 - score} incorrect questions out of ${total_no_que} questions`;

correct.innerHTML = `${score ? score : "0"}`;
incorrect.innerHTML = `${10 - score}` ;

// change greeting message dynamacally
if (score <= 10 && score >= 7) {
    greeting_msg.innerHTML = "Congratulation!! 🌻 ";
} else if (score <= 6 && score >= 4) {
    greeting_msg.innerHTML = "Good try!! 🙂 ";
} else if (score <= 3) {
    greeting_msg.innerHTML = "Bad Performance!! 👎 ";
}