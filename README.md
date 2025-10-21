# TallyUp Calculator

![TallyUp Logo](https://img.shields.io/badge/TallyUp-Calculator-blue?style=for-the-badge)

A modern, responsive calculator web application built with vanilla HTML, CSS, and JavaScript. TallyUp features a clean design, accessibility support, and comprehensive mathematical operations.

## ✨ Features

### Core Functionality
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Operations**: Percentage calculations, decimal support
- **Memory Functions**: Store, recall, add, subtract (coming in Phase 2)
- **Error Handling**: Robust validation and user-friendly error messages
- **Continuous Calculations**: Chain operations without pressing equals

### User Experience
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Keyboard Support**: Full keyboard navigation and shortcuts
- **Accessibility**: ARIA labels, screen reader support, high contrast mode
- **Visual Feedback**: Button animations, error states, and user feedback
- **Touch Optimized**: Optimized for touch devices with proper touch targets

### Technical Features
- **Modern CSS**: CSS Grid layout, custom properties, and animations
- **Vanilla JavaScript**: No external dependencies, fast and lightweight
- **MVC Architecture**: Clean separation of concerns with modular code
- **Performance Optimized**: Event delegation and efficient DOM manipulation
- **Browser Compatible**: Works across modern browsers

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- No additional dependencies required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sami/tallyup.git
   cd tallyup
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file access
   open index.html
   
   # Option 2: Using a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **For development**
   ```bash
   # Using VS Code with Live Server extension
   code .
   # Right-click index.html -> "Open with Live Server"
   ```

## 🎮 Usage

### Basic Operations
- **Numbers**: Click number buttons or use keyboard (0-9)
- **Operations**: Click operator buttons or use keyboard (+, -, *, /)
- **Equals**: Click = button or press Enter
- **Clear**: Click C button or press Escape
- **Delete**: Click ⌫ button or press Backspace
- **Decimal**: Click . button or press period key

### Keyboard Shortcuts
| Key | Function |
|-----|----------|
| `0-9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `=` or `Enter` | Calculate |
| `Escape` | Clear |
| `Backspace` | Delete |
| `.` | Decimal point |
| `%` | Percentage |

## 🏗️ Project Structure

```
tallyup/
├── index.html              # Main HTML structure
├── css/
│   ├── styles.css          # Core styles and design system
│   └── responsive.css      # Responsive breakpoints and mobile optimizations
├── js/
│   ├── utils.js           # Utility functions and helpers
│   ├── operations.js      # Mathematical operations and memory functions
│   ├── display.js         # Display management and UI updates
│   └── calculator.js      # Main calculator logic and event handling
└── README.md              # Project documentation
```

## 🔧 Technical Architecture

### MVC Pattern
- **Model**: `Operations` and `MemoryOperations` classes handle data and calculations
- **View**: `Display` class manages UI updates and visual feedback
- **Controller**: `Calculator` class handles user input and coordinates between Model and View

### Key Classes
- **`Calculator`**: Main controller class, handles all user interactions
- **`Display`**: Manages display updates, error states, and visual feedback
- **`Operations`**: Static class with mathematical operations and validation
- **`MemoryOperations`**: Handles memory functions and calculation history
- **`Utils`**: Utility functions for formatting, validation, and DOM manipulation

## 🎨 Design System

### Color Scheme
- **Primary**: Blue (#2563eb) for operators and branding
- **Secondary**: Slate gray (#64748b) for function buttons
- **Success**: Green (#059669) for equals button
- **Background**: Clean whites and light grays for modern look
- **Dark Mode**: Automatic support via CSS media queries

### Typography
- **Font**: Inter (with system font fallbacks)
- **Sizes**: Responsive typography using CSS custom properties
- **Weight**: 400 (regular), 500 (medium), 600 (semibold)

### Accessibility
- **WCAG 2.1 AA compliant**
- **Screen reader support** with ARIA labels
- **Keyboard navigation** for all functions
- **High contrast mode** support
- **Reduced motion** respect for user preferences

## 🚧 Development Roadmap

### Phase 1: Basic Calculator ✅
- [x] HTML structure with semantic elements
- [x] CSS Grid layout for responsive design
- [x] Basic arithmetic operations
- [x] Error handling and validation
- [x] Keyboard support

### Phase 2: Enhanced Features (Week 2)
- [ ] Memory functions (MC, MR, M+, M-)
- [ ] Calculation history
- [ ] Copy/paste support
- [ ] Improved animations

### Phase 3: Advanced Features (Week 3)
- [ ] Scientific calculator mode
- [ ] Unit conversions
- [ ] Theme customization
- [ ] PWA features

### Phase 4: Polish & Optimization (Week 4)
- [ ] Performance optimizations
- [ ] Advanced animations
- [ ] Comprehensive testing
- [ ] Documentation improvements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow the existing code style and architecture
2. Add comments for complex functionality
3. Test across different browsers and devices
4. Update documentation for new features

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 88+ | ✅ Fully Supported |
| Firefox | 85+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 88+ | ✅ Fully Supported |
| Mobile Safari | 14+ | ✅ Fully Supported |
| Chrome Mobile | 88+ | ✅ Fully Supported |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sami Bashraheel**
- GitHub: [@sami](https://github.com/sami)
- Twitter: [@SamiBashraheel](https://twitter.com/SamiBashraheel)
- Location: London, UK

## 🙏 Acknowledgments

- Built as part of the CrunchSheet calculator ecosystem
- Inspired by modern calculator applications and web design trends
- Thanks to the web development community for best practices and patterns

---

**TallyUp Calculator** - Making calculations simple and accessible for everyone! 🧮✨