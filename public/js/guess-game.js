const MAX_ATTEMPTS = 5;

const guessInput = document.getElementById("guess-value");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const attemptEl = document.getElementById("attempt");
const resultEl = document.getElementById("result");

let target = 0;
let attempts = 0;

// A value is numeric if it is not empty and can be converted into a finite number
function isNumeric(value) {
  return value.trim() !== "" && !isNaN(value) && isFinite(value);
}

function showAttempts() {
  attemptEl.textContent = attempts;
}

function showResult(text, type) {
  resultEl.textContent = text;
  resultEl.className = type || "";
}

// Initial state: only Restart button, attempt 0/5, no result, empty text field
function initGame() {
  guessInput.value = "";
  guessBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  attempts = 0;
  showAttempts();
  showResult("");
}

// Restart: show Guess button, random a new target, reset attempts
function startGame() {
  restartBtn.style.display = "none";
  guessBtn.style.display = "inline-block";
  target = Math.floor(Math.random() * 20) + 1; // 1 - 20
  attempts = 0;
  showAttempts();
  showResult("");
  guessInput.value = "";
  guessInput.focus();
}

// Game over: change Guess button back to Restart
function endGame() {
  guessBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

function guess() {
  const raw = guessInput.value;

  // Empty or non-number: do nothing
  if (!isNumeric(raw)) {
    return;
  }

  const value = Number(raw);
  attempts++;
  showAttempts();

  if (value === target) {
    showResult("You WIN", "win");
    endGame();
  } else if (attempts >= MAX_ATTEMPTS) {
    showResult("You LOSE", "lose");
    endGame();
  } else if (value > target) {
    showResult(`${value} is too high`);
  } else {
    showResult(`${value} is too low`);
  }

  guessInput.value = "";
  guessInput.focus();
}

guessBtn.addEventListener("click", guess);
restartBtn.addEventListener("click", startGame);

// Pressing Enter in the text field works like clicking Guess
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && guessBtn.style.display !== "none") {
    guess();
  }
});

initGame();
