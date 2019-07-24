const app = document.getElementById("app");

let activePlayer = "O";

function changePlayer() {
  activePlayer = activePlayer === "O" ? "X" : "O";
}

const grid = [...app.querySelectorAll("td")].map((element, index) => ({
  element,
  index,
  value: ""
}));

function hasPlayerWon(grid, player) {
  const rows = [0, 1, 2];
  const columns = [0, 1, 2];
  for (row of rows) {
    const playerOwnsRow = columns.every(
      cellId => grid[row * 3 + cellId].value === player
    );
    if (playerOwnsRow) return true;
  }
  for (const cellId of columns) {
    const playerOwnsColumns = rows.every(
      row => grid[row * 3 + cellId].value === player
    );
    if (playerOwnsColumns) return true;
  }
  const playerOwnsDiagonal = rows.every(
    id => grid[id * 3 + id].value === player
  );
  if (playerOwnsDiagonal) {
    return true;
  }
  const playerOwnsOtherDiagonal = rows.every(
    id => grid[id * 3 + 2 - id].value === player);
  if (playerOwnsOtherDiagonal) {
    return true;
  }
  return false;
}

for (const cell of grid) {
  cell.element.addEventListener("click", e => {
    e.preventDefault();
    if (cell.value) return;
    cell.element.innerText = activePlayer;
    cell.value = activePlayer;
    if (hasPlayerWon(grid, activePlayer)) {
      alert(`Player ${activePlayer} wins!`);
    }
    changePlayer();
  });
}
