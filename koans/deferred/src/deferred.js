var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.Deferred = function(){

    var promise = {
            resolved: false,
            rejected: false,
            args: [],
            callbacks: [],
            failCallbacks: []
        };

    var executeCB = function(type){
        promise[type].forEach(function(func){
            func.apply(SAMURAIPRINCIPLE.Deferred, promise.args);
        });
    };

    this.done = function(fn){
        promise.callbacks.push(fn);
        if(promise.resolved){
            executeCB('callbacks');
        }
        return this;
    };

    this.resolve = function () {
        promise.resolved = true;
        promise.args = arguments;
        if(promise.callbacks.length > 0 && promise.resolved){
            executeCB('callbacks');
        }
        return this;
    };

    this.failed = function(fn){
        promise.failCallbacks.push(fn);
        if(promise.rejected){
            executeCB('failCallbacks');
        }
        return this;
    };

    this.reject = function(){
        promise.rejected = true;
        promise.args = arguments;
        if(promise.failCallbacks.length > 0 && promise.rejected){
            executeCB('failCallbacks');
        }
        return this;
    };

    this.then = function(doneFn, failFn){
        if(promise.resolved){
            doneFn.apply(SAMURAIPRINCIPLE.Deferred, promise.args);
        }else{
            failFn.apply(SAMURAIPRINCIPLE.Deferred, promise.args);
        }
        return this;
    };

};

SAMURAIPRINCIPLE.Deferred.when = function () {
    console.log(arguments)
    return this;
};

SAMURAIPRINCIPLE.Deferred.then = function () {
    console.log(arguments)
    return this;
};