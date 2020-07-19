const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

let number = 0;
let scores = 0;

$(document).ready(init);

function init() {
  $(".game-field").addClass("d-none");
  $("#button-reload").addClass("d-none");
}

$("#button-start").click(function() {
  $(".game-field").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
  $("#button-start").addClass("d-none");
  number = 1;
  round();
  })

$("#button-reload").click(function() {
  location.reload();
});

function round() {
  let blockTarget = document.querySelector(".target");
  if (blockTarget != null) {
    blockTarget.classList.remove("target");
    blockTarget.innerText = "";
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector)[0].innerText = number;

  if (hits === 1) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

$(".game-field").click(handleClick);

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    let blocksMiss = document.querySelectorAll(".miss");
    if (blocksMiss.length > 0) {
      for (var i = 0; i < blocksMiss.length; i++) {
        blocksMiss[i].classList.remove("miss");
        blocksMiss[i].innerText = "";
      }
    };
    hits += 1;
    number += 1;
    scores += 1;
    $(event.target).innerText = number;
    round();
  } else {
    $(event.target).addClass("miss");
    $(event.target)[0].innerText = "-1";
    scores -= 1;
  }
}

function endGame() {
  $(".game-field").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-scores").text(scores);

  $("#win-message").removeClass("d-none");
}
