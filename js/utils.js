/**
 * TallyUp Calculator - Utility Functions
 * Provides helper functions for number formatting, validation, and common operations
 */

'use strict';

/**
 * Utility functions for the TallyUp calculator
 */
const Utils = {
  /**
   * Format a number for display with proper decimal places
   * @param {number} num - The number to format
   * @param {number} maxDecimals - Maximum decimal places (default: 10)
   * @returns {string} Formatted number string
   */
  formatNumber(num, maxDecimals = 10) {
    if (typeof num !== 'number' || isNaN(num)) {
      return 'Error';
    }
    
    if (!isFinite(num)) {
      return num > 0 ? 'Infinity' : '-Infinity';
    }
    
    // Handle very large numbers with scientific notation
    if (Math.abs(num) >= 1e15) {
      return num.toExponential(6);
    }
    
    // Handle very small numbers
    if (Math.abs(num) < 1e-10 && num !== 0) {
      return num.toExponential(6);
    }
    
    // Format with appropriate decimal places
    const formatted = parseFloat(num.toFixed(maxDecimals)).toString();
    
    // Add thousands separators for large numbers
    if (Math.abs(num) >= 1000) {
      return this.addThousandsSeparator(formatted);
    }
    
    return formatted;
  },
  
  /**
   * Add thousands separators to a number string
   * @param {string} numStr - Number as string
   * @returns {string} Number with thousands separators
   */
  addThousandsSeparator(numStr) {
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  },
  
  /**
   * Remove thousands separators from a number string
   * @param {string} numStr - Number string with separators
   * @returns {string} Clean number string
   */
  removeThousandsSeparator(numStr) {
    return numStr.replace(/,/g, '');
  },
  
  /**
   * Validate if a string represents a valid number
   * @param {string} str - String to validate
   * @returns {boolean} True if valid number
   */
  isValidNumber(str) {
    if (typeof str !== 'string') return false;
    const cleaned = this.removeThousandsSeparator(str);
    return !isNaN(cleaned) && !isNaN(parseFloat(cleaned));
  },
  
  /**
   * Convert string to number safely
   * @param {string} str - String to convert
   * @returns {number} Parsed number or NaN
   */
  toNumber(str) {
    const cleaned = this.removeThousandsSeparator(str);
    return parseFloat(cleaned);
  },
  
  /**
   * Check if number has decimal places
   * @param {number} num - Number to check
   * @returns {boolean} True if has decimals
   */
  hasDecimals(num) {
    return num % 1 !== 0;
  },
  
  /**
   * Limit decimal places to prevent floating point precision issues
   * @param {number} num - Number to limit
   * @param {number} places - Maximum decimal places
   * @returns {number} Limited number
   */
  limitDecimals(num, places = 10) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
  },
  
  /**
   * Check if a value is a valid operator
   * @param {string} op - Operator to check
   * @returns {boolean} True if valid operator
   */
  isOperator(op) {
    return ['+', '-', '×', '÷', '*', '/'].includes(op);
  },
  
  /**
   * Normalize operator symbols
   * @param {string} op - Operator to normalize
   * @returns {string} Normalized operator
   */
  normalizeOperator(op) {
    const operatorMap = {
      '*': '×',
      '/': '÷',
      '×': '×',
      '÷': '÷',
      '+': '+',
      '-': '-'
    };
    return operatorMap[op] || op;
  },
  
  /**
   * Debounce function to limit rapid function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  /**
   * Throttle function to limit function execution rate
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  /**
   * Add CSS class with optional duration
   * @param {HTMLElement} element - Element to add class to
   * @param {string} className - Class name to add
   * @param {number} duration - Duration in ms (removes class after)
   */
  addClass(element, className, duration = null) {
    if (!element) return;
    
    element.classList.add(className);
    
    if (duration) {
      setTimeout(() => {
        element.classList.remove(className);
      }, duration);
    }
  },
  
  /**
   * Remove CSS class from element
   * @param {HTMLElement} element - Element to remove class from
   * @param {string} className - Class name to remove
   */
  removeClass(element, className) {
    if (!element) return;
    element.classList.remove(className);
  },
  
  /**
   * Toggle CSS class on element
   * @param {HTMLElement} element - Element to toggle class on
   * @param {string} className - Class name to toggle
   * @returns {boolean} True if class was added
   */
  toggleClass(element, className) {
    if (!element) return false;
    return element.classList.toggle(className);
  },
  
  /**
   * Generate unique ID for elements
   * @param {string} prefix - Prefix for the ID
   * @returns {string} Unique ID
   */
  generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },
  
  /**
   * Log messages with timestamp (development helper)
   * @param {string} level - Log level (info, warn, error)
   * @param {string} message - Message to log
   * @param {any} data - Optional data to log
   */
  log(level, message, data = null) {
    if (typeof console === 'undefined') return;
    
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    switch (level.toLowerCase()) {
      case 'error':
        console.error(logMessage, data);
        break;
      case 'warn':
        console.warn(logMessage, data);
        break;
      case 'info':
      default:
        console.log(logMessage, data);
        break;
    }
  }
};

// Export for module systems or attach to window for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
} else if (typeof window !== 'undefined') {
  window.Utils = Utils;
}