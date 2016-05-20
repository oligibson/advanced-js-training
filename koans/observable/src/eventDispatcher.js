var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.eventDispatcher = function (base) {
    'use strict';
    var listeners = [];
    base.addEventListener = function (type, listener, priority) {
        if (!listener) {
            listener = type;
            type = 'default';
        }
        listeners.push({
            type: type,
            listener: listener,
            priority: priority
        });
    };
    base.listener = function () {
        return listeners[0].listener;
    };
    base.dispatchEvent = function (type) {
        var args = Array.prototype.slice.call(arguments);
        if (args.length === 1) {
            type = 'default';
        } else {
            args.shift();
        }
        listeners
            .filter(function (listenerDetails) {
                return listenerDetails.type === type;
            })
            .sort(function (firstListenerDetails, secondListenerDetails) {
                return secondListenerDetails.priority - firstListenerDetails.priority;
            })
            .some(function (listenerDetails) {
                try {
                    return listenerDetails.listener.apply(undefined, args) === false;
                } catch (error) {
                }
            });
    };
    base.createObservableProperty = function (propertyName) {
        var propertyValue;
        base['on' + propertyName + 'Changed'] = base.addEventListener.bind(base, propertyName + 'Changed');
        base['set' + propertyName] = function (value) {
            propertyValue = value;
            base.dispatchEvent(propertyName + 'Changed', value);
        };
        base['get' + propertyName] = function () {
            return propertyValue;
        };
    };
    return base;
};

/*
SAMURAIPRINCIPLE.eventDispatcher = function(base){
    var l = {},  observers = {};

    base.addEventListener = function(type, listener, priority){
        if (!listener) {
            listener = type;
            type = 'default';
        }
        if(!l[type]){
            l[type] = [];
        }
        l[type].push({
            func: listener,
            pri: priority ? priority : 0
        });
        l[type].sort(function(a,b){
            if (a.pri < b.pri) {
                return 1;
            }
            if (a.pri > b.pri) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    };

    base.listener = function (){
        return l.default[0].func;
    };

    base.dispatchEvent = function(type, argument){

        var arrayLoop = function(type, argument){
            for(var i=0; i < l[type].length; i++){
                var fn = l[type][i].func;
                try{
                    var r = fn.call({}, argument);
                    if (r === false) { break; }
                }catch(e){
                    console.log('error', e);
                }
            }
        };

        if(!argument){
            argument = type;
            for(var obj in l){
                arrayLoop(obj, argument);
            }
        }else{
            arrayLoop(type, argument);
        }
    };

    base.createObservableProperty = function(property){

        observers[property] = {};

        base['on' + property + 'Changed'] = function(listener){
            observers[property].func = function(){
                listener.call({}, this.value);
            }
        };

        base['set' + property] = function(value){
            observers[property].value = value;
            observers[property].func();

        };

        base['get' + property] = function(){
            return observers[property].value;
        };


    };

    return base;
};
*/