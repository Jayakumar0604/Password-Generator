# 🔐 Secure Password Generator

A modern, responsive password generator built with React and Vite. Create strong, secure passwords instantly with customizable options for your security needs.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.12-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- **Customizable Length**: Set your desired password length
- **Character Options**: Choose which character types to include:
  - ✅ Uppercase letters (A-Z)
  - ✅ Lowercase letters (a-z)
  - ✅ Numbers (0-9)
  - ✅ Special symbols (!@#$%^&*()_+)
- **One-Click Copy**: Instantly copy generated passwords to your clipboard
- **Modern UI**: Beautiful gradient design with responsive layout
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Fast & Lightweight**: Built with Vite for optimal performance

## 🚀 Technologies Used

- **React** ^19.1.1 - UI library
- **Vite** ^7.1.12 - Build tool and dev server
- **TailwindCSS** ^4.1.13 - Utility-first CSS framework
- **React Icons** ^5.5.0 - Icon library
- **ESLint** - Code linting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd Password-gen
```

2. Install dependencies:
```bash
npm install
```

## 💻 Usage

### Development Mode

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

Create an optimized production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📖 How to Use

1. **Set Password Length**: Enter your desired password length in the input field
2. **Select Character Types**: Toggle checkboxes to include/exclude:
   - Uppercase letters
   - Lowercase letters
   - Numbers
   - Symbols
3. **Generate Password**: Click the "Generate Password" button
4. **Copy Password**: Click the "Copy" button to copy the generated password to your clipboard

> **Note**: At least one character type must be selected to generate a password.

## 🏗️ Project Structure

```
Password-gen/
├── public/
│   └── Password-gen.png      # Favicon
├── src/
│   ├── Components/
│   │   └── Pass.jsx          # Main password generator component
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx               # Root component
│   ├── App.css
│   ├── index.css
│   └── main.jsx              # Entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🎨 Features in Detail

### Password Generation Algorithm
The password generator uses a cryptographically secure random selection from the chosen character set to create passwords. Each character is randomly selected from the available character pool based on your preferences.

### Security Considerations
- Passwords are generated client-side (never sent to any server)
- Uses browser's built-in random number generation
- All password generation happens locally in your browser

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using React and Vite

## 🔮 Future Enhancements

Potential features for future releases:
- Password strength indicator
- Save password history (localStorage)
- Export passwords as CSV
- Multiple password generation at once
- Dark mode toggle
- Additional character sets
- Password validation rules

---

**Made with React + Vite ⚡**
