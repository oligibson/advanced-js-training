var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};
SAMURAIPRINCIPLE.GameOfLife = function(){

        this.isAlive = {};
    };
SAMURAIPRINCIPLE.GameOfLife.prototype.getKey = function (row, column) {
    return row + '_' + column;
};
SAMURAIPRINCIPLE.GameOfLife.prototype.isCellAlive = function(x,y){
    return this.isAlive[this.getKey(x,y)] || false;
};

SAMURAIPRINCIPLE.GameOfLife.prototype.toggleCellState = function(x, y){
    var key = this.getKey(x,y);
    if (this.isAlive[key]) {
        delete this.isAlive[key];
    } else {
        this.isAlive[key] = true;
    }
    return this;
};

SAMURAIPRINCIPLE.GameOfLife.prototype.tick = function(){
    var key, parts, row, column, numberOfNeighbours = {}, neighbourKey, self = this;
    for (key in this.isAlive) {
        parts = key.split('_');
        row = parseInt(parts[0], 10);
        column = parseInt(parts[1], 10);
        numberOfNeighbours[key] = numberOfNeighbours[key] || 0;
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(function (offset) {
            console.log(this);
            debugger;
            neighbourKey = self.getKey(row + offset[0], column + offset[1]);
            numberOfNeighbours[neighbourKey] = (numberOfNeighbours[neighbourKey] || 0) + 1;
        });
    }
    for (key in numberOfNeighbours) {
        if (this.isAlive[key] && (numberOfNeighbours[key] < 2 || numberOfNeighbours[key] > 3) || !this.isAlive[key] && numberOfNeighbours[key] === 3) {
            parts = key.split('_');
            row = parseInt(parts[0], 10);
            column = parseInt(parts[1], 10);
            this.toggleCellState(row, column);
        }
    }
};

