function isCellAliveInNextGeneration(isCellAlive, numberOfNeighbours) {
    return isCellAlive && numberOfNeighbours ===2 || numberOfNeighbours === 3;
}

//function isCellAliveInNextGeneration(isCellAlive, numberOfNeighbours) {
//    if(isCellAlive){
//        if(numberOfNeighbours < 2){
//            return false;
//        }
//        else if(numberOfNeighbours >= 2 && numberOfNeighbours < 4){
//            return true;
//        }
//        else if(numberOfNeighbours > 3){
//            return false;
//        }
//    }else{
//        if(numberOfNeighbours === 3){
//            return true;
//        }else{
//            return false;
//        }
//    }
//}
