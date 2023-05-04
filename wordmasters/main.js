let wordOfTheDay;
(async function () {
  try {
    toggleSpinner(true); // Show the spinner
    const response = await fetch('https://words.dev-apis.com/word-of-the-day');
    const data = await response.json();
    wordOfTheDay = data.word.toLowerCase();
    toggleSpinner(false); // Show the spinner
  } catch (error) {
    console.error('Error fetching word of the day:', error);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input');
  inputs[0].focus();
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
      moveFocus(input);
    });
    input.addEventListener('keydown', (event) => {
      handleBackspace(event, input);
      handleEnter(event, input);
    });
  });
});

function moveFocus(currentInput) {
  if (currentInput.value.length === currentInput.maxLength) {
    const allInputs = Array.from(document.querySelectorAll('input'));
    const currentIndex = allInputs.indexOf(currentInput);

  // Calculate the index of the next input element within the same row
    const nextIndex = currentIndex + 1;
    const isLastInRow = (nextIndex % 5) === 0;

    // Set focus to the next input element within the same row if it exists
    if (!isLastInRow) {
      allInputs[nextIndex].focus();
    }
  }
}

//handle the keystroke
function validateInput(input) {
  // Allow only letters (case-insensitive) using a regular expression
  const allowedCharacters = /^[a-zA-Z]+$/;
  if (!allowedCharacters.test(input.value)) {
    // Remove any non-letter characters
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  }
}

function handleBackspace(event, currentInput) {
  if (event.key === 'Backspace') {
    const allInputs = Array.from(document.querySelectorAll('input'));
    const currentIndex = allInputs.indexOf(currentInput);

    // Clear the current input
    currentInput.value = '';

    // If not the first input in the row, clear the previous input and set focus to it
    if ((currentIndex % 5) !== 0) {
      const prevIndex = currentIndex - 1;
      allInputs[prevIndex].value = '';
      allInputs[prevIndex].focus();
    }
  }
}

async function handleEnter(event, currentInput) {
  if (event.key === 'Enter') {
    const allInputs = Array.from(document.querySelectorAll('input'));
    const currentIndex = allInputs.indexOf(currentInput);
    const isLastInRow = ((currentIndex + 1) % 5) === 0;

    if (isLastInRow) {
      toggleSpinner(true); // Show the spinner
      const startIndex = currentIndex - 4;
      const word = allInputs.slice(startIndex, startIndex + 5).map(input => input.value).join('');

      const isWordOfTheDay = await isMatchingWordOfTheDay(word);
      console.log(`The word "${word}" is ${isWordOfTheDay ? 'the word of the day' : 'not the word of the day'}`);

      const isValidWord = await validateWord(word);
      console.log(`The word "${word}" is ${isValidWord ? 'valid' : 'invalid'}`);
      
      if (isWordOfTheDay) {
        updateCellColors(allInputs.slice(startIndex, startIndex + 5), wordOfTheDay);
        showWinMessage();
      } else 
      // If the word is valid, move focus to the first input of the next row
      if (isValidWord) {

        updateCellColors(allInputs.slice(startIndex, startIndex + 5), wordOfTheDay);
        
        const nextRowIndex = startIndex + 5;
        if (nextRowIndex < allInputs.length) {
          allInputs[nextRowIndex].focus();
        }
      } else {
        // If the word is invalid, make the border of the input elements blink red once
        const inputsInRow = allInputs.slice(startIndex, startIndex + 5);
        blinkRedBorder(inputsInRow);
      }

      // Show the lose message when the user has reached the last row and the entered word is not the word of the day
      if (startIndex === allInputs.length - 5 && !isWordOfTheDay) {
        showLoseMessage();
      }
      toggleSpinner(false); // Hide the spinner
    }
  }
}

async function isMatchingWordOfTheDay(word) {
  // try {
  //   const response = await fetch(`https://words.dev-apis.com/word-of-the-day`);
  //   const data = await response.json();
  //   return data.word.toLowerCase() === word.toLowerCase();
  // } catch (error) {
  //   console.error('Error fetching word of the day:', error);
  //   return false;
  // }

  //use the stored variable to fetch the API
  return wordOfTheDay === word.toLowerCase();
}

async function validateWord(word) {
  try {
    const lowerCaseWord = word.toLowerCase();
    const response = await fetch('https://words.dev-apis.com/validate-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: lowerCaseWord }),
    });
    const data = await response.json();

    // Check if the returned word is the same as the input word and if validWord is true
    return data.word === lowerCaseWord && data.validWord;
  } catch (error) {
    console.error('Error validating the word:', error);
    return false;
  }
}

function updateCellColors(inputCells, wordOfTheDay) {
  inputCells.forEach((input, index) => {
    const inputLetter = input.value.toLowerCase();
    const correctLetter = wordOfTheDay[index];

    if (inputLetter === correctLetter) {
      input.style.backgroundColor = 'green';
    } else if (wordOfTheDay.includes(inputLetter)) {
      input.style.backgroundColor = 'yellow';
    } else {
      input.style.backgroundColor = 'gray';
    }
  });
}

function showWinMessage() {
  const title = document.querySelector('.title');
  const winMessage = document.querySelector('.win-message');

  // Make the title blink
  title.classList.add('rainbow');

  // Show the win message
  winMessage.textContent = 'You win!';
  winMessage.style.display = 'block';
  const tryAgainButton = document.querySelector('.try-again');
  tryAgainButton.style.display = 'inline-block'; // Show the "Try Again" button
}

function showLoseMessage() {
  const title = document.querySelector('.title');
  const winMessage = document.querySelector('.win-message');

  // Show the lose message
  winMessage.textContent = `You lose! The word was ${wordOfTheDay}.`;
  winMessage.style.display = 'block';
  const tryAgainButton = document.querySelector('.try-again');
  tryAgainButton.style.display = 'inline-block'; // Show the "Try Again" button
}


function blinkRedBorder(inputs) {
  inputs.forEach((input) => {
    input.classList.add('blinkRed');
    setTimeout(() => {
      input.classList.remove('blinkRed');
    }, 500);
  });
}

function toggleSpinner(visible) {
  const spinner = document.querySelector('.spinner');
  spinner.style.display = visible ? 'block' : 'none';
}