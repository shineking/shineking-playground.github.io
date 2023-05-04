document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => moveFocus(input));
    });
  });
  
  function moveFocus(currentInput) {
    if (currentInput.value.length === currentInput.maxLength) {
      const allInputs = Array.from(document.querySelectorAll('input'));
      const currentIndex = allInputs.indexOf(currentInput);
  
      // Calculate the index of the next input element
      const nextIndex = (currentIndex + 1) % allInputs.length;
  
      // Set focus to the next input element
      allInputs[nextIndex].focus();
    }
  }
  