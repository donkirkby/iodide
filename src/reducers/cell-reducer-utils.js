function moveCell(cells, cellId, dir) {
  const cellsSlice = cells.slice()
  const index = cellsSlice.findIndex(c => c.id === cellId)

  let moveIndex
  let moveCondition
  if (dir === 'up') {
    moveIndex = -1
    moveCondition = index > 0
  } else {
    moveIndex = 1
    moveCondition = index < cellsSlice.length - 1
  }
  if (moveCondition) {
    const elem = cellsSlice[index + moveIndex]
    cellsSlice[index + moveIndex] = cellsSlice[index]
    cellsSlice[index] = elem
  }
  return cellsSlice
}


function getSelectedCellId(state) {
  const { cells } = state
  const index = cells.findIndex(c => c.selected)
  if (index > -1) {
    return cells[index].id
  }
  return undefined // for now
}

function getCellBelowSelectedId(state) {
  const { cells } = state
  const index = cells.findIndex(c => c.selected)
  if (index === cells.length - 1) {
    // if there is no cell below, return this cell's id
    return cells[index].id
  } else if (index >= 0 && index < (cells.length - 1)) {
    return cells[index + 1].id
  }
  throw new Error('no cell currently selected')
}

function getSelectedCell(state) {
  const { cells } = state
  const index = cells.findIndex(c => c.selected)
  if (index > -1) {
    return cells[index]
  }
  return undefined // for now
}

function newStateWithSelectedCellPropertySet(state, cellPropToSet, newValue) {
  const cells = state.cells.slice()
  const thisCell = getSelectedCell(state)
  thisCell[cellPropToSet] = newValue
  return Object.assign({}, state, { cells })
}

function newStateWithPropsAssignedForCell(state, cellId, cellPropsToSet) {
  const cells = state.cells.slice()
  const index = cells.findIndex(c => c.id === cellId)
  cells[index] = Object.assign({}, cells[index], cellPropsToSet)
  return Object.assign({}, state, { cells })
}

function newStateWithSelectedCellPropsAssigned(state, cellPropsToSet) {
  return newStateWithPropsAssignedForCell(state, getSelectedCellId(state), cellPropsToSet)
}

export {
  moveCell,
  getSelectedCell,
  getSelectedCellId,
  getCellBelowSelectedId,
  newStateWithSelectedCellPropertySet,
  newStateWithSelectedCellPropsAssigned,
  newStateWithPropsAssignedForCell,
}
