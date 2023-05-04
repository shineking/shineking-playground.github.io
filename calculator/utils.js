//not used
export function evaluateExpression(expression) {
    const tokens = expression.split(' ');
  
    if (tokens.length !== 5) {
      console.error('Error: Invalid expression format.');
      return;
    }
  
    const x = parseFloat(tokens[0]);
    const operator1 = tokens[1];
    const y = parseFloat(tokens[2]);
    const operator2 = tokens[3];
    const z = parseFloat(tokens[4]);
  
    function applyOperator(a, b, operator) {
      switch (operator) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          if (b === 0) {
            console.error('Error: Division by zero is not allowed.');
            return;
          }
          return a / b;
        default:
          console.error('Error: Invalid operator.');
          return;
      }
    }
  
    let result;
    if (operator1 === '*' || operator1 === '/') {
      const tempResult = applyOperator(x, y, operator1);
      result = applyOperator(tempResult, z, operator2);
    } else if (operator2 === '*' || operator2 === '/') {
      const tempResult = applyOperator(y, z, operator2);
      result = applyOperator(x, tempResult, operator1);
    } else {
      const tempResult1 = applyOperator(x, y, operator1);
      result = applyOperator(tempResult1, z, operator2);
    }
  
    return result;
  }