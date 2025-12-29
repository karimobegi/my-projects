# Mini Games Website

A browser-based mini-games website built with **vanilla HTML, CSS, and JavaScript**.  
The project groups multiple classic games into a single interface and focuses on DOM manipulation, event-driven programming, and basic game state management.

This project was originally built locally and later refactored to follow cleaner project structure and separation of concerns.

---

## 🎮 Games Included

### Single Player
- **Guess My Number** – number guessing game with feedback
- **Memory Card Game** – match pairs with limited attempts
- **Word Guessing Game** – guess a hidden word letter by letter

### Multiplayer
- **Tic Tac Toe (XO)** – two-player grid-based game
- **Pig Dice Game** – turn-based dice game with risk management
- **Connect Four** – classic 7×6 grid strategy game

### Royal Rumble mode
- **This mode allows two players to play all the games consecutively and counts the points of all the games played)**

## 🧠 Key Concepts Practiced

- DOM manipulation
- Event handling
- Game state management
- Conditional logic
- Local storage usage
- Multi-page navigation
- UI layout with CSS
- Code organization and refactoring

---

## 📁 Project Structure
Each HTML file has a corresponding CSS and JavaScript file with the same name to keep responsibilities clear and maintainable.
Minigame website/
├── css/
│   └── all CSS files (one per page / game)
├── js/
│   └── all JavaScript files (one per page / game)
├── pages/
│   ├── index.html
│   ├── single.html
│   ├── multi.html
│   ├── royal.html
│   └── end.html
├── games/
│   ├── tic-tac-toe.html
│   ├── pig-game.html
│   ├── connect-four.html
│   └── other game HTML files
├── images/
│   └── all image assets (PNG, JPG, etc.)
└── README.md
---

## ▶️ How to Run

This is a **static project** — no installation required.

1. Clone the repository
2. Open `index.html` in a browser
3. Navigate through the site and play the games

---

## 🚀 Possible Improvements

- Publish using GitHub Pages
- Add animations and sound effects
- Improve win-condition logic in Connect Four
- Add a score/history system
- Refactor shared UI components into common files

---

## 👤 Author

**Karim Obegi**  
🔗 LinkedIn: https://www.linkedin.com/in/karim-obegi

---

## 📌 Notes

This project is part of a larger personal portfolio repository and represents early front-end development work, later cleaned and structured to reflect best practices.
