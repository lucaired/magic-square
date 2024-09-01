/** Magic square problem:
 * Given a 5x5 and numbers from 1 to 25, find a configuration of numbers 
 * such that the sum of each row, column and diagonal is the same.
 * 
 * Datastructures:
 * - 5x5 matrix := where we fill the numbers from 1 to 25
 * - 1D array of 25 numbers := where we take the numbers from
 * 
 * Algorithm:
 * - helper algorithm to check if the sum of the row, column and diagonal is the same in the end
 * - backtracking algorithm to fill the matrix
 */

function isTargetSumIterative(matrix: number[][], targetSum: number): boolean {
    for (let i = 0; i < matrix.length; i++) {
        const rowSum = matrix[i].reduce((acc, curr) => acc + curr, 0);
        if (rowSum !== targetSum) {
            return false;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        let colSum = 0;
        for (let j = 0; j < matrix.length; j++) {
            colSum += matrix[j][i];
        }
        if (colSum !== targetSum) {
            return false;
        }
    }
    let diag1Sum = 0;
    let diag2Sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        diag1Sum += matrix[i][i];
        diag2Sum += matrix[i][matrix.length - 1 - i];
    }
    return diag1Sum === targetSum && diag2Sum === targetSum;
}

function isTargetSumCompact(matrix: number[][], targetSum: number): boolean {
    let diag1Sum = 0;
    let diag2Sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        const rowSum = matrix[i].reduce((acc, curr) => acc + curr, 0);
        if (rowSum !== targetSum) {
            return false;
        }

        let colSum = 0;
        for (let j = 0; j < matrix.length; j++) {
            colSum += matrix[j][i];
        }
        if (colSum !== targetSum) {
            return false;
        }

        diag1Sum += matrix[i][i];
        diag2Sum += matrix[i][matrix.length - 1 - i];
    }

    return diag1Sum === targetSum && diag2Sum === targetSum;
}

function isTargetSumClean(matrix: number[][], targetSum: number): boolean {
    // O(n) time complexity
    const diag1Sum = matrix.reduce((acc, row, i) => acc + row[i], 0);
    const diag2Sum = matrix.reduce((acc, row, i) => acc + row[matrix.length - 1 - i], 0);
    if (!(diag1Sum === targetSum && diag2Sum === targetSum)) {
        return false;
    }

    // O(n^2) time complexity
    const rowSums = matrix.map(row => row.reduce((acc, curr) => acc + curr, 0));
    const colSums = matrix.map((_, i) => matrix.reduce((acc, row) => acc + row[i], 0));
    return rowSums.every(sum => sum === targetSum) && colSums.every(sum => sum === targetSum);
}

function fillMatrix(
    matrix: number[][],
    availableNumbers: number[],
    targetSum: number,
    isTargetSum: (matrix: number[][], targetSum: number) => boolean,
) {
    const matrixCopy = matrix.map(row => row.slice());
    const availableNumbersCopy = availableNumbers.slice();

    for (let i = 0; i < matrixCopy.length; i++) {
        for (let j = 0; j < matrixCopy.length; j++) {
            if (matrixCopy[i][j] === 0) {
                const current = availableNumbersCopy.pop();
                if (current === undefined) {
                    return isTargetSum(matrixCopy, targetSum) ? matrixCopy : undefined;
                }
                matrixCopy[i][j] = current;
            }
        }
    }
    if (isTargetSum(matrixCopy, targetSum)) {
        return matrixCopy;
    }
    return undefined;
}

const largeMatrix = Array.from({ length: 100 }, () => Array(100).fill(0));
const availableNumbers = Array.from({ length: 10000 }, (_, i) => i + 1);
const targetSum = availableNumbers.reduce((acc, curr) => acc + curr, 0); // Sum of numbers from 1 to 10000

console.time('isTargetSumIterative');
const result = fillMatrix(largeMatrix, availableNumbers, targetSum, isTargetSumIterative);
console.timeLog('isTargetSumIterative');

console.time('isTargetSumCompact');
const result1 = fillMatrix(largeMatrix, availableNumbers, targetSum, isTargetSumCompact);
console.timeLog('isTargetSumCompact');

console.time('isTargetSumClean');
const result2 = fillMatrix(largeMatrix, availableNumbers, targetSum, isTargetSumClean);
console.timeLog('isTargetSumClean');