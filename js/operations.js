/**
 * TallyUp Calculator - Mathematical Operations Module
 * Handles all mathematical calculations with proper error handling
 */

'use strict';

/**
 * Mathematical operations class with error handling and precision management
 */
class Operations {
  /**
   * Perform basic arithmetic operations
   * @param {number} a - First operand
   * @param {string} operator - Mathematical operator
   * @param {number} b - Second operand
   * @returns {number|string} Result or error message
   */
  static calculate(a, b, operator) {
    // Input validation
    if (typeof a !== 'number' || typeof b !== 'number') {
      return 'Error';
    }
    
    if (isNaN(a) || isNaN(b)) {
      return 'Error';
    }
    
    try {
      let result;
      
      switch (operator) {
        case '+':
          result = this.add(a, b);
          break;
        case '-':
          result = this.subtract(a, b);
          break;
        case '×':
        case '*':
          result = this.multiply(a, b);
          break;
        case '÷':
        case '/':
          result = this.divide(a, b);
          break;
        default:
          return 'Error';
      }
      
      // Handle special cases
      if (isNaN(result)) {
        return 'Error';
      }
      
      if (!isFinite(result)) {
        return result > 0 ? 'Infinity' : '-Infinity';
      }
      
      // Fix floating point precision issues
      return this.fixPrecision(result);
      
    } catch (error) {
      Utils.log('error', 'Calculation error:', error);
      return 'Error';
    }
  }
  
  /**
   * Addition operation
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum
   */
  static add(a, b) {
    return a + b;
  }
  
  /**
   * Subtraction operation
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Difference
   */
  static subtract(a, b) {
    return a - b;
  }
  
  /**
   * Multiplication operation
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product
   */
  static multiply(a, b) {
    return a * b;
  }
  
  /**
   * Division operation with zero-division handling
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number|string} Quotient or error
   */
  static divide(a, b) {
    if (b === 0) {
      if (a === 0) {
        return 'Error'; // 0/0 is undefined
      }
      return a > 0 ? Infinity : -Infinity;
    }
    return a / b;
  }
  
  /**
   * Percentage calculation
   * @param {number} value - Value to convert to percentage
   * @returns {number} Percentage value
   */
  static percentage(value) {
    return value / 100;
  }
  
  /**
   * Square root operation
   * @param {number} value - Value to find square root of
   * @returns {number|string} Square root or error
   */
  static sqrt(value) {
    if (value < 0) {
      return 'Error'; // Complex numbers not supported
    }
    return Math.sqrt(value);
  }
  
  /**
   * Power operation
   * @param {number} base - Base number
   * @param {number} exponent - Exponent
   * @returns {number|string} Result or error
   */
  static power(base, exponent) {
    try {
      const result = Math.pow(base, exponent);
      if (isNaN(result) || !isFinite(result)) {
        return 'Error';
      }
      return result;
    } catch (error) {
      return 'Error';
    }
  }
  
  /**
   * Reciprocal operation (1/x)
   * @param {number} value - Value to find reciprocal of
   * @returns {number|string} Reciprocal or error
   */
  static reciprocal(value) {
    if (value === 0) {
      return 'Error';
    }
    return 1 / value;
  }
  
  /**
   * Absolute value operation
   * @param {number} value - Value to find absolute value of
   * @returns {number} Absolute value
   */
  static abs(value) {
    return Math.abs(value);
  }
  
  /**
   * Sign change operation (negate)
   * @param {number} value - Value to negate
   * @returns {number} Negated value
   */
  static negate(value) {
    return -value;
  }
  
  /**
   * Fix floating point precision issues
   * @param {number} value - Value to fix
   * @param {number} precision - Decimal places to maintain
   * @returns {number} Fixed value
   */
  static fixPrecision(value, precision = 15) {
    // Handle very small numbers that should be zero
    if (Math.abs(value) < Number.EPSILON) {
      return 0;
    }
    
    // Round to specified precision to avoid floating point errors
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
  
  /**
   * Check if result is valid for display
   * @param {any} result - Result to validate
   * @returns {boolean} True if valid
   */
  static isValidResult(result) {
    if (typeof result === 'string') {
      return ['Error', 'Infinity', '-Infinity'].includes(result);
    }
    return typeof result === 'number' && !isNaN(result);
  }
  
  /**
   * Format operation for display
   * @param {number} a - First operand
   * @param {string} operator - Operator
   * @param {number} b - Second operand (optional)
   * @returns {string} Formatted operation string
   */
  static formatOperation(a, operator, b = null) {
    const formattedA = Utils.formatNumber(a);
    
    if (b === null) {
      // Unary operations
      switch (operator) {
        case 'sqrt':
          return `√${formattedA}`;
        case 'reciprocal':
          return `1/${formattedA}`;
        case 'negate':
          return `-${formattedA}`;
        case 'percentage':
          return `${formattedA}%`;
        default:
          return formattedA;
      }
    } else {
      // Binary operations
      const formattedB = Utils.formatNumber(b);
      return `${formattedA} ${operator} ${formattedB}`;
    }
  }
}

/**
 * Memory operations for calculator
 */
class MemoryOperations {
  constructor() {
    this.memory = 0;
    this.history = [];
  }
  
  /**
   * Store value in memory
   * @param {number} value - Value to store
   */
  store(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.memory = value;
      Utils.log('info', `Memory stored: ${value}`);
    }
  }
  
  /**
   * Recall value from memory
   * @returns {number} Memory value
   */
  recall() {
    return this.memory;
  }
  
  /**
   * Clear memory
   */
  clear() {
    this.memory = 0;
    Utils.log('info', 'Memory cleared');
  }
  
  /**
   * Add to memory
   * @param {number} value - Value to add
   */
  add(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.memory += value;
      Utils.log('info', `Memory added: ${value}, new total: ${this.memory}`);
    }
  }
  
  /**
   * Subtract from memory
   * @param {number} value - Value to subtract
   */
  subtract(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.memory -= value;
      Utils.log('info', `Memory subtracted: ${value}, new total: ${this.memory}`);
    }
  }
  
  /**
   * Check if memory has a value
   * @returns {boolean} True if memory is not zero
   */
  hasValue() {
    return this.memory !== 0;
  }
  
  /**
   * Add calculation to history
   * @param {string} operation - Operation performed
   * @param {any} result - Result of operation
   */
  addToHistory(operation, result) {
    const entry = {
      timestamp: new Date().toISOString(),
      operation: operation,
      result: result
    };
    
    this.history.unshift(entry);
    
    // Keep only last 100 entries
    if (this.history.length > 100) {
      this.history = this.history.slice(0, 100);
    }
  }
  
  /**
   * Get calculation history
   * @param {number} limit - Maximum entries to return
   * @returns {Array} History entries
   */
  getHistory(limit = 10) {
    return this.history.slice(0, limit);
  }
  
  /**
   * Clear calculation history
   */
  clearHistory() {
    this.history = [];
    Utils.log('info', 'History cleared');
  }
}

// Export for module systems or attach to window for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Operations, MemoryOperations };
} else if (typeof window !== 'undefined') {
  window.Operations = Operations;
  window.MemoryOperations = MemoryOperations;
}