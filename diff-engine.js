document.addEventListener('DOMContentLoaded', () => {
    const originalInput = document.getElementById('original-text');
    const modifiedInput = document.getElementById('modified-text');
    const compareBtn = document.getElementById('compare-btn');
    const diffOutput = document.getElementById('diff-output');

    // Primary Execution
    compareBtn.addEventListener('click', () => {
        const oldText = originalInput.value;
        const newText = modifiedInput.value;
        
        if (!oldText && !newText) {
            diffOutput.innerHTML = '<div class="empty-state">Please enter text to compare.</div>';
            return;
        }

        const diffs = computeLineDiff(oldText, newText);
        renderDiff(diffs);
    });

    /**
     * Computes the difference between two strings using a Longest Common Subsequence (LCS) matrix.
     * @param {string} oldStr - The original text
     * @param {string} newStr - The modified text
     * @returns {Array} Array of objects { type: 'added' | 'removed' | 'unchanged', value: string }
     */
    function computeLineDiff(oldStr, newStr) {
        const oldLines = oldStr ? oldStr.split('\n') : [];
        const newLines = newStr ? newStr.split('\n') : [];
        
        // Initialize an empty matrix for dynamic programming
        const matrix = Array(oldLines.length + 1).fill(null).map(() => 
            Array(newLines.length + 1).fill(0)
        );

        // Fill the LCS matrix
        for (let i = 1; i <= oldLines.length; i++) {
            for (let j = 1; j <= newLines.length; j++) {
                if (oldLines[i - 1] === newLines[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1] + 1;
                } else {
                    matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
                }
            }
        }

        // Backtrack through the matrix to find the exact diffs
        let i = oldLines.length;
        let j = newLines.length;
        const result = [];

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
                // Lines are identical
                result.unshift({ type: 'unchanged', value: oldLines[i - 1] });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
                // Line was added
                result.unshift({ type: 'added', value: newLines[j - 1] });
                j--;
            } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
                // Line was removed
                result.unshift({ type: 'removed', value: oldLines[i - 1] });
                i--;
            }
        }

        return result;
    }

    /**
     * Renders the diff array into the DOM
     * @param {Array} diffs - The computed differences
     */
    function renderDiff(diffs) {
        diffOutput.innerHTML = ''; // Clear previous results
        
        diffs.forEach(part => {
            const lineDiv = document.createElement('div');
            lineDiv.className = `diff-line diff-${part.type}`;
            
            // Handle empty lines visually
            lineDiv.textContent = part.value === '' ? '\u00A0' : part.value; 
            
            diffOutput.appendChild(lineDiv);
        });
    }
});