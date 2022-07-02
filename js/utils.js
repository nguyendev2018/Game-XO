import { itemTable, STATUS } from "./constants.js";

export function check(arrayTable) {
    console.log(arrayTable);
    if (!Array.isArray(arrayTable) || arrayTable.length !== 9) {
        throw new Error("Invalid")
    }
    const checkTable = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ]
    const checkWin = checkTable.findIndex((item) => {
        const first = arrayTable[item[0]];
        const second = arrayTable[item[1]];
        const third = arrayTable[item[2]];
        return first !== "" && first === second && second === third;


    })
    if (checkWin !== -1) {
        const firstArray = checkTable[checkWin][0];
        const winIcon = arrayTable[firstArray];

        return {
            status: winIcon === itemTable.CIRCLE ? STATUS.O_WIN : STATUS.X_WIN,
            winPosition: checkTable[checkWin]
        }
    }
    const isEndGame = arrayTable.filter((x) => x === "").length === 0;
    return {
        status: isEndGame ? STATUS.ENDGAME : STATUS.PLAY,
        winPosition: []
    }
}