const createNumbers = (minimum = 1, maximum = 75) => (
    Array.from({ length: maximum - minimum + 1 })
        .map((unused, index) => index + minimum))

const generateRandomNum = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

const colMinMax = {
    B: { min: 1, max: 15 },
    I: { min: 16, max: 30 },
    N: { min: 31, max: 45 },
    G: { min: 46, max: 60 },
    O: { min: 61, max: 75 },
}

const generateColumn = (columnName, nums = createNumbers()) => {
    const name = columnName.toUpperCase();
    let column = [];
    while (column.length < 5) {
        if (name === 'N' && column.length === 2) {
            column.push('FREE');
            continue;
        }
        let randomNum = generateRandomNum(colMinMax[name].min, colMinMax[name].max);
        if (!nums[randomNum - 1]) continue;
        column.push(randomNum);
        nums[randomNum - 1] = null;
    }
    return { name, line: column };
}

const generateRows = (bingoCard) => {
    for (let i = 0; i < 5; i++) {
        let tempRow = [];
        tempRow.push(bingoCard[0].line[i]);
        tempRow.push(bingoCard[1].line[i]);
        tempRow.push(bingoCard[2].line[i]);
        tempRow.push(bingoCard[3].line[i]);
        tempRow.push(bingoCard[4].line[i]);
        console.log(tempRow);
        let rowObj = { name: `r${i + 1}`, line: tempRow };
        bingoCard.push(rowObj);
    }
}

const generateDiagonals = (bingoCard) => {
    let firstDiagonal = [];
    for (let i = 0; i < 5; i++) {
        firstDiagonal.push(bingoCard[i].line[i]);
    }
    bingoCard.push({ name: 'd1', line: firstDiagonal });
    let secondDiagonal = [];
    let indexOfNum = 0;
    for (let j = 4; j >= 0; j--) {
        secondDiagonal.push(bingoCard[j].line[indexOfNum]);
        indexOfNum++;
    }
    bingoCard.push({ name: 'd2', line: secondDiagonal });

    return bingoCard;
}

function createBingoCards(qty) {
    let totalCards = [];
    function helper(num) {
        let bingoCard = [];
        bingoCard.push(generateColumn('b'));
        bingoCard.push(generateColumn('i'));
        bingoCard.push(generateColumn('n'));
        bingoCard.push(generateColumn('g'));
        bingoCard.push(generateColumn('o'));
        console.log(bingoCard.length);
        generateRows(bingoCard);
        generateDiagonals(bingoCard);
        totalCards.push(bingoCard);
        if (num > 1) helper(--num);
    }
    helper(qty);
    return totalCards;
}

function createBingoCard() {
    let bingoCard = [];
    bingoCard.push(generateColumn('b'));
    bingoCard.push(generateColumn('i'));
    bingoCard.push(generateColumn('n'));
    bingoCard.push(generateColumn('g'));
    bingoCard.push(generateColumn('o'));
    console.log(bingoCard.length);
    generateRows(bingoCard);
    generateDiagonals(bingoCard);
    return bingoCard;
}

let cards = createBingoCards(1);

let reduced = cards.reduce((lines, card) => lines.concat(card), []);

function isWinningLine(line, calledNumbers) {
    console.log(line, calledNumbers);
    const missingIndex = line.findIndex(
        value => calledNumbers.includes(value)
    );
    console.log(missingIndex);
    return line.length > 0 && missingIndex > -1;
}

function getWinningLines(cardLines, calledNumbers) {
    return cardLines.filter(cardLine => isWinningLine(cardLine.line, calledNumbers));
}

const winningLines = getWinningLines(reduced, [1, 56, 43, 23, 10, 41]);
console.log(cards);
console.log("REDUCED", reduced);

console.log(isWinningLine(reduced[0].line, [1]));
console.log(winningLines);








