import { itemTable, STATUS, TURN } from "./constants.js";
import { getCurrentTurn, getElementIndexTable, getElementTable, getRelayButtonElement, getStatus } from "./selector.js";
import { check } from "./utils.js";
let currentTurn = TURN.CROSS;
let arrayTable = new Array(9).fill("");
let status = STATUS.PLAY
function highLightItem(winPosition) {
    for (const value of winPosition) {
        const item = getElementIndexTable(value);
        item.classList.add("win")
    }
}
function resetGame() {
    status = STATUS.PLAY;

    arrayTable = arrayTable.map(() => "");
    updateStatus(status)
    const currentTurnElement = getCurrentTurn();
    currentTurnElement.classList.remove(TURN.CIRCLE, TURN.CROSS);
    currentTurnElement.classList.add(TURN.CROSS)
    const cellElementList = getElementTable();
    for (const cellElement of cellElementList) {
        cellElement.className = ""

    }
    hideRelayButton();

}
function showReplayButton() {
    const relayButton = getRelayButtonElement();
    relayButton.classList.add("show")
    relayButton.addEventListener("click", resetGame)

}
function hideRelayButton() {
    const relayButton = getRelayButtonElement();
    relayButton.classList.remove("show")
}
function updateStatus(newStatus) {
    const getElementStatus = getStatus();
    status = newStatus
    getElementStatus.textContent = newStatus
}
function toggleTurn() {
    currentTurn = currentTurn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE
}
function handleClick(item, index) {
    const isClicked = item.classList.contains(TURN.CIRCLE) || item.classList.contains(TURN.CROSS);
    const isGame = status !== STATUS.PLAY
    if (isClicked || isGame) {
        return
    }
    item.classList.add(currentTurn)
    arrayTable[index] = currentTurn === TURN.CROSS ? itemTable.CROSS : itemTable.CIRCLE;
    const game = check(arrayTable);

    switch (game.status) {

        case STATUS.ENDGAME:
            updateStatus(game.status);
            showReplayButton()
            break;
        case STATUS.X_WIN:
        case STATUS.O_WIN:
            updateStatus(game.status);
            highLightItem(game.winPosition)
            showReplayButton()
            break;
        default:
            break;
    }
    toggleTurn()
    //update Turn header
    const currentValueTurn = getCurrentTurn();
    currentValueTurn.classList.remove(TURN.CIRCLE, TURN.CROSS);
    currentValueTurn.classList.add(currentTurn)
}
function renderTable() {
    const elementTable = getElementTable();
    elementTable.forEach((item, index) => {
        item.addEventListener("click", (() => {
            handleClick(item, index)
        }))
    });
}
(() => {
    renderTable()
})()