# Text Diff Engine

A lightweight, high-performance text diffing tool built entirely with vanilla JavaScript, HTML, and CSS. This application compares two blocks of text and computes the exact line-by-line differences, highlighting insertions and deletions in a unified view.

## 🚀 Overview

This project implements a classic **Longest Common Subsequence (LCS)** dynamic programming algorithm to determine the shortest edit path between an original text and a modified text. By calculating the mathematical difference matrix, the engine efficiently processes text changes without relying on external libraries like `diff-match-patch` or framework-specific diffing tools.

**[View Live Demo](https://samueladegnan.github.io/DiffTool/) **

## ✨ Features

* **Algorithmic Accuracy:** Utilizes an LCS matrix to accurately calculate insertions (`+`), deletions (`-`), and unchanged lines.
* **Zero Dependencies:** 100% vanilla JavaScript, making the project lightweight, secure, and easily auditable.
* **Modern UI/UX:** Clean, accessible interface using CSS variables for a consistent design system and easy dark-mode implementation in the future.
* **State Management:** Clean separation of concerns between the mathematical engine (`computeLineDiff`) and the DOM manipulation (`renderDiff`).

## 🛠️ Technical Implementation

The core of this application is the difference calculation engine. The process follows these steps:
1. **Tokenization:** Both strings are split into arrays of lines.
2. **Matrix Generation:** A 2D grid is generated based on the lengths of both arrays.
3. **Dynamic Programming:** The grid is populated by comparing lines. If lines match, the algorithm moves diagonally; if they differ, it calculates the maximum of adjacent cells to find the optimal path.
4. **Backtracking:** The algorithm traces back through the populated matrix from the bottom-right to the top-left to generate a sequential array of operations (`added`, `removed`, or `unchanged`).

## 💻 Getting Started

Because this project has zero build steps or external dependencies, running it locally is instantaneous.

### Prerequisites
* A modern web browser.

### Installation & Usage

1. Clone the repository:
   ```bash
   git clone [https://github.com/samueladegnan/DiffTool.git](https://github.com/samueladegnan/DiffTool.git)
   ```

2. Navigate to the project directory:
   ```bash
   cd DiffTool
   ```

3. Open index.html directly in your browser, or serve it using a local development server (e.g., VS Code Live Server or Python's http.server):
   ```bash
   python3 -m http.server 8000
   ```
   ```text
   Then open your web browser, go to the local address: http://localhost:8000
   ```


4. Paste your original text into the left panel, modified text into the right panel, and click Compute Diff.

## 📂 Project Structure
```text
DiffTool/
├── index.html       # The semantic HTML structure and layout
├── styles.css       # Modern dark-mode styling and syntax highlights
└── diff-engine.js   # The LCS core algorithm and rendering logic
```

## 📄 License
This project is licensed under the MIT License.