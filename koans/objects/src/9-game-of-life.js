var SAMURAIPRINCIPLE = {};
SAMURAIPRINCIPLE.isCellAliveInNextGeneration = function (isCellAlive, numberOfNeighbours) {
	return {
		true: {
			2: true,
			3: true
			},
		false: {
			3: true
		}
	}[isCellAlive].hasOwnProperty(numberOfNeighbours);
};