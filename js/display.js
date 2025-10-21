/**
 * TallyUp Calculator - Display Management Module
 * Handles all display updates and visual feedback
 */

'use strict';

/**
 * Display management class for calculator interface
 */
class Display {
  constructor() {
    this.displayInput = document.getElementById('calculator-display');
    this.expressionDiv = document.querySelector('.expression');
    this.displayContainer = document.querySelector('.display');
    
    if (!this.displayInput || !this.expressionDiv) {
      throw new Error('Required display elements not found');
    }
    
    this.currentValue = '0';
    this.expression = '';
    this.isError = false;
    
    this.init();
  }
  
  /**
   * Initialize display settings
   */
  init() {
    this.updateDisplay('0');
    this.updateExpression('');
    Utils.log('info', 'Display initialized');
  }
  
  /**
   * Update the main display value
   * @param {string} value - Value to display
   */
  updateDisplay(value) {
    if (!value && value !== '0') {
      value = '0';
    }
    
    this.currentValue = value.toString();
    
    // Handle error states
    if (this.currentValue === 'Error' || this.currentValue === 'Infinity' || this.currentValue === '-Infinity') {
      this.setErrorState(true);
    } else {
      this.setErrorState(false);
    }
    
    // Format for display
    let displayValue = this.currentValue;
    
    // Limit display length to prevent overflow
    if (displayValue.length > 15 && !displayValue.includes('e')) {
      displayValue = parseFloat(displayValue).toExponential(6);
    }
    
    this.displayInput.value = displayValue;
    
    // Update ARIA label for accessibility
    this.displayInput.setAttribute('aria-label', `Calculator result: ${displayValue}`);
    
    Utils.log('info', `Display updated: ${displayValue}`);
  }
  
  /**
   * Update the expression display
   * @param {string} expr - Expression to display
   */
  updateExpression(expr) {
    this.expression = expr || '';
    this.expressionDiv.textContent = this.expression;
    
    // Update ARIA label
    this.expressionDiv.setAttribute('aria-label', 
      this.expression ? `Current expression: ${this.expression}` : 'No current expression'
    );
  }
  
  /**
   * Append to current display value
   * @param {string} digit - Digit to append
   */
  appendDigit(digit) {
    if (this.isError) {
      this.clearError();
      this.currentValue = '0';
    }
    
    // Handle initial zero or replace if current value is zero
    if (this.currentValue === '0' && digit !== '.') {
      this.currentValue = digit;
    } else {
      // Prevent multiple decimal points
      if (digit === '.' && this.currentValue.includes('.')) {
        return;
      }
      
      // Limit input length
      if (this.currentValue.length >= 15) {
        this.showFeedback('flash');
        return;
      }
      
      this.currentValue += digit;
    }
    
    this.updateDisplay(this.currentValue);
  }
  
  /**
   * Get current display value as number
   * @returns {number} Current display value
   */
  getCurrentValue() {
    if (this.isError) {
      return 0;
    }
    return Utils.toNumber(this.currentValue);
  }
  
  /**
   * Set error state
   * @param {boolean} isError - Whether display is in error state
   */
  setErrorState(isError) {
    this.isError = isError;
    
    if (isError) {
      Utils.addClass(this.displayContainer, 'error');
    } else {
      Utils.removeClass(this.displayContainer, 'error');
    }
  }
  
  /**
   * Clear error state
   */
  clearError() {
    this.setErrorState(false);
  }
  
  /**
   * Clear display completely
   */
  clear() {
    this.currentValue = '0';
    this.expression = '';
    this.setErrorState(false);
    this.updateDisplay('0');
    this.updateExpression('');
    Utils.log('info', 'Display cleared');
  }
  
  /**
   * Delete last digit from display
   */
  deleteLast() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
    } else {
      this.currentValue = '0';
    }
    
    this.updateDisplay(this.currentValue);
  }
  
  /**
   * Show visual feedback
   * @param {string} type - Type of feedback (flash, shake)
   * @param {HTMLElement} element - Element to apply feedback to (optional)
   */
  showFeedback(type, element = null) {
    const target = element || this.displayContainer;
    
    switch (type) {
      case 'flash':
        Utils.addClass(target, 'flash', 300);
        break;
      case 'shake':
        Utils.addClass(target, 'shake', 300);
        break;
    }
  }
  
  /**
   * Set display to show result
   * @param {any} result - Calculation result
   * @param {string} operation - Operation that produced the result
   */
  showResult(result, operation = '') {
    if (Operations.isValidResult(result)) {
      if (typeof result === 'number') {
        this.updateDisplay(Utils.formatNumber(result));
      } else {
        this.updateDisplay(result);
      }
    } else {
      this.updateDisplay('Error');
      this.showFeedback('shake');
    }
    
    if (operation) {
      this.updateExpression(operation + ' =');
    }
  }
  
  /**
   * Check if display is showing zero
   * @returns {boolean} True if showing zero
   */
  isShowingZero() {
    return this.currentValue === '0';
  }
  
  /**
   * Check if display has decimal point
   * @returns {boolean} True if has decimal
   */
  hasDecimal() {
    return this.currentValue.includes('.');
  }
  
  /**
   * Format display for percentage
   */
  showAsPercentage() {
    const value = this.getCurrentValue();
    const percentage = Operations.percentage(value);
    this.updateDisplay(Utils.formatNumber(percentage));
    this.updateExpression(`${Utils.formatNumber(value)}%`);
  }
}

// Export for module systems or attach to window for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Display;
} else if (typeof window !== 'undefined') {
  window.Display = Display;
}