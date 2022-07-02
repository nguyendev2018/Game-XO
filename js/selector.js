export function getStatus() {
    return document.getElementById("gameStatus")
}
export function getCurrentTurn() {
    return document.getElementById("currentTurn")
}
export function getElementTable() {
    return document.querySelectorAll('#cellList >li');
}
export function getElementIndexTable(index) {
    return document.querySelector(`#cellList > li:nth-child(${index + 1})`)
}
export function getRelayButtonElement() {
    return document.getElementById("replayGame")
}
