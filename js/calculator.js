/**
 * TallyUp Calculator - Main Calculator Class
 * Implements the MVC pattern for calculator functionality
 */

'use strict';

/**
 * Main Calculator class - handles all calculator logic and user interactions
 */
class Calculator {
  constructor() {
    // Initialize components
    this.display = new Display();
    this.memory = new MemoryOperations();
    
    // Calculator state
    this.state = {
      previousValue: null,
      currentOperator: null,
      waitingForOperand: false,
      lastOperation: null,
      justCalculated: false
    };
    
    // Get DOM elements
    this.calculatorElement = document.querySelector('.calculator');
    this.keypadElement = document.querySelector('.keypad');
    
    if (!this.calculatorElement || !this.keypadElement) {
      throw new Error('Required calculator elements not found');
    }
    
    this.init();
  }
  
  /**
   * Initialize calculator
   */
  init() {
    this.setupEventListeners();
    this.setupKeyboardSupport();
    Utils.log('info', 'TallyUp Calculator initialized');
  }
  
  /**
   * Setup event listeners for buttons
   */
  setupEventListeners() {
    // Use event delegation for better performance
    this.keypadElement.addEventListener('click', (event) => {
      if (!event.target.matches('button')) return;
      
      event.preventDefault();
      this.handleButtonClick(event.target);
    });
    
    // Add visual feedback for button presses
    this.keypadElement.addEventListener('mousedown', (event) => {
      if (event.target.matches('button')) {
        Utils.addClass(event.target, 'active');
      }
    });
    
    this.keypadElement.addEventListener('mouseup', (event) => {
      if (event.target.matches('button')) {
        Utils.removeClass(event.target, 'active');
      }
    });
    
    // Handle mouse leave to clean up active states
    this.keypadElement.addEventListener('mouseleave', () => {
      document.querySelectorAll('.btn.active').forEach(btn => {
        Utils.removeClass(btn, 'active');
      });
    });
  }
  
  /**
   * Setup keyboard support
   */
  setupKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
      this.handleKeyPress(event);
    });
  }
  
  /**
   * Handle button click events
   * @param {HTMLElement} button - Clicked button element
   */
  handleButtonClick(button) {
    const number = button.dataset.number;
    const operator = button.dataset.operator;
    const action = button.dataset.action;
    
    // Provide audio/haptic feedback
    this.provideFeedback(button);
    
    if (number !== undefined) {
      this.inputNumber(number);
    } else if (operator) {
      this.inputOperator(operator);
    } else if (action) {
      this.performAction(action);
    }
  }
  
  /**
   * Handle keyboard input
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyPress(event) {
    const key = event.key;
    
    // Prevent default browser behavior for calculator keys
    if (/[0-9+\-*/.=]|Enter|Escape|Backspace/.test(key)) {
      event.preventDefault();
    }
    
    // Map keyboard input to calculator functions
    if (/[0-9]/.test(key)) {
      this.inputNumber(key);
    } else if (key === '.') {
      this.performAction('decimal');
    } else if (['+', '-'].includes(key)) {
      this.inputOperator(key);
    } else if (key === '*') {
      this.inputOperator('×');
    } else if (key === '/') {
      this.inputOperator('÷');
    } else if (key === '=' || key === 'Enter') {
      this.performAction('calculate');
    } else if (key === 'Escape') {
      this.performAction('clear');
    } else if (key === 'Backspace') {
      this.performAction('delete');
    } else if (key === '%') {
      this.performAction('percentage');
    }
    
    // Visual feedback for keyboard input
    this.highlightKey(key);
  }
  
  /**
   * Input a number digit
   * @param {string} digit - Number digit to input
   */
  inputNumber(digit) {
    if (this.state.waitingForOperand) {
      this.display.updateDisplay(digit);
      this.state.waitingForOperand = false;
      this.state.justCalculated = false;
    } else {
      if (this.state.justCalculated) {
        this.display.clear();
        this.state.justCalculated = false;
      }
      this.display.appendDigit(digit);
    }
  }
  
  /**
   * Input an operator
   * @param {string} operator - Mathematical operator
   */
  inputOperator(operator) {
    const currentValue = this.display.getCurrentValue();
    
    if (this.state.previousValue === null) {
      this.state.previousValue = currentValue;
    } else if (this.state.currentOperator && !this.state.waitingForOperand) {
      // Perform calculation with previous operator
      const result = this.calculate();
      if (result !== null) {
        this.display.updateDisplay(Utils.formatNumber(result));
        this.state.previousValue = result;
      }
    } else {
      this.state.previousValue = currentValue;
    }
    
    this.state.currentOperator = operator;
    this.state.waitingForOperand = true;
    this.state.justCalculated = false;
    
    // Update expression display
    const expression = `${Utils.formatNumber(this.state.previousValue)} ${operator}`;
    this.display.updateExpression(expression);
    
    // Visual feedback for operator selection
    this.highlightOperator(operator);
  }
  
  /**
   * Perform various calculator actions
   * @param {string} action - Action to perform
   */
  performAction(action) {
    switch (action) {
      case 'clear':
        this.clear();
        break;
      case 'delete':
        this.delete();
        break;
      case 'decimal':
        this.inputDecimal();
        break;
      case 'calculate':
        this.equals();
        break;
      case 'percentage':
        this.percentage();
        break;
    }
  }
  
  /**
   * Perform calculation
   * @returns {number|null} Calculation result or null if error
   */
  calculate() {
    const previousValue = this.state.previousValue;
    const currentValue = this.display.getCurrentValue();
    const operator = this.state.currentOperator;
    
    if (previousValue === null || operator === null) {
      return currentValue;
    }
    
    const result = Operations.calculate(previousValue, currentValue, operator);
    
    // Add to history
    const operation = Operations.formatOperation(previousValue, operator, currentValue);
    this.memory.addToHistory(operation, result);
    
    return typeof result === 'number' ? result : null;
  }
  
  /**
   * Handle equals button press
   */
  equals() {
    if (this.state.currentOperator && this.state.previousValue !== null) {
      const result = this.calculate();
      
      if (result !== null) {
        const operation = Operations.formatOperation(
          this.state.previousValue,
          this.state.currentOperator,
          this.display.getCurrentValue()
        );
        
        this.display.showResult(result, operation);
        
        // Store for potential repeated operations
        this.state.lastOperation = {
          operator: this.state.currentOperator,
          operand: this.display.getCurrentValue()
        };
        
        this.resetState();
        this.state.justCalculated = true;
      } else {
        this.display.showResult('Error');
        this.resetState();
      }
    }
  }
  
  /**
   * Clear calculator completely
   */
  clear() {
    this.display.clear();
    this.resetState();
    this.clearOperatorHighlight();
    Utils.log('info', 'Calculator cleared');
  }
  
  /**
   * Delete last input
   */
  delete() {
    if (!this.state.waitingForOperand) {
      this.display.deleteLast();
    }
  }
  
  /**
   * Input decimal point
   */
  inputDecimal() {
    if (this.state.waitingForOperand) {
      this.display.updateDisplay('0.');
      this.state.waitingForOperand = false;
    } else if (!this.display.hasDecimal()) {
      this.display.appendDigit('.');
    }
  }
  
  /**
   * Handle percentage calculation
   */
  percentage() {
    this.display.showAsPercentage();
    this.state.justCalculated = true;
  }
  
  /**
   * Reset calculator state
   */
  resetState() {
    this.state.previousValue = null;
    this.state.currentOperator = null;
    this.state.waitingForOperand = false;
    this.state.lastOperation = null;
  }
  
  /**
   * Provide feedback for button press
   * @param {HTMLElement} button - Button element
   */
  provideFeedback(button) {
    // Visual feedback
    this.display.showFeedback('flash', button);
    
    // Haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }
  
  /**
   * Highlight key press visually
   * @param {string} key - Key that was pressed
   */
  highlightKey(key) {
    const keyMap = {
      '0': '[data-number="0"]',
      '1': '[data-number="1"]',
      '2': '[data-number="2"]',
      '3': '[data-number="3"]',
      '4': '[data-number="4"]',
      '5': '[data-number="5"]',
      '6': '[data-number="6"]',
      '7': '[data-number="7"]',
      '8': '[data-number="8"]',
      '9': '[data-number="9"]',
      '+': '[data-operator="+"]',
      '-': '[data-operator="-"]',
      '*': '[data-operator="×"]',
      '/': '[data-operator="÷"]',
      '=': '[data-action="calculate"]',
      'Enter': '[data-action="calculate"]',
      '.': '[data-action="decimal"]',
      '%': '[data-action="percentage"]'
    };
    
    const selector = keyMap[key];
    if (selector) {
      const button = this.keypadElement.querySelector(selector);
      if (button) {
        Utils.addClass(button, 'active', 150);
      }
    }
  }
  
  /**
   * Highlight selected operator
   * @param {string} operator - Operator to highlight
   */
  highlightOperator(operator) {
    this.clearOperatorHighlight();
    
    const button = this.keypadElement.querySelector(`[data-operator="${operator}"]`);
    if (button) {
      Utils.addClass(button, 'active');
    }
  }
  
  /**
   * Clear operator highlighting
   */
  clearOperatorHighlight() {
    this.keypadElement.querySelectorAll('.btn-operator.active').forEach(btn => {
      Utils.removeClass(btn, 'active');
    });
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.calculator = new Calculator();
    Utils.log('info', 'TallyUp Calculator loaded successfully');
  } catch (error) {
    Utils.log('error', 'Failed to initialize calculator:', error);
  }
});

// Export for module systems or attach to window for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
} else if (typeof window !== 'undefined') {
  window.Calculator = Calculator;
}