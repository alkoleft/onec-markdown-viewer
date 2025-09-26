// Полифиллы для совместимости с 1С:Предприятие
// Этот модуль содержит полифиллы для методов, которые могут отсутствовать в старых браузерах

// Полифилл для trimEnd (совместимость с 1С)
if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function() {
        return this.replace(/\s+$/, '');
    };
}

// Полифилл для trimStart (если понадобится)
if (!String.prototype.trimStart) {
    String.prototype.trimStart = function() {
        return this.replace(/^\s+/, '');
    };
}

// Полифилл для trimLeft (алиас для trimStart)
if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = String.prototype.trimStart;
}

// Полифилл для trimRight (алиас для trimEnd)
if (!String.prototype.trimRight) {
    String.prototype.trimRight = String.prototype.trimEnd;
}

// Полифилл для Array.flat (если понадобится)
if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
        depth = depth || 1;
        var result = [];
        for (var i = 0; i < this.length; i++) {
            if (Array.isArray(this[i]) && depth > 0) {
                result = result.concat(this[i].flat(depth - 1));
            } else {
                result.push(this[i]);
            }
        }
        return result;
    };
}

// Полифилл для Array.includes (если понадобится)
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
        fromIndex = fromIndex || 0;
        for (var i = fromIndex; i < this.length; i++) {
            if (this[i] === searchElement) {
                return true;
            }
        }
        return false;
    };
}

// Полифилл для Object.assign (если понадобится)
if (!Object.assign) {
    Object.assign = function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
}

// Полифилл для Array.isArray (если понадобится)
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

// Полифилл для Object.keys (если понадобится)
if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
}

// Полифилл для Object.hasOwnProperty (если понадобится)
if (!Object.prototype.hasOwnProperty) {
    Object.prototype.hasOwnProperty = function(prop) {
        return this[prop] !== undefined;
    };
}

// Полифилл для Promise (базовая реализация)
if (!window.Promise) {
    window.Promise = function(executor) {
        var self = this;
        self.state = 'pending';
        self.value = undefined;
        self.handlers = [];

        function resolve(result) {
            if (self.state === 'pending') {
                self.state = 'fulfilled';
                self.value = result;
                self.handlers.forEach(handle);
                self.handlers = null;
            }
        }

        function reject(error) {
            if (self.state === 'pending') {
                self.state = 'rejected';
                self.value = error;
                self.handlers.forEach(handle);
                self.handlers = null;
            }
        }

        function handle(handler) {
            if (self.state === 'pending') {
                self.handlers.push(handler);
            } else {
                if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
                    handler.onFulfilled(self.value);
                }
                if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
                    handler.onRejected(self.value);
                }
            }
        }

        this.then = function(onFulfilled, onRejected) {
            return new Promise(function(resolve, reject) {
                handle({
                    onFulfilled: function(result) {
                        try {
                            resolve(onFulfilled ? onFulfilled(result) : result);
                        } catch (ex) {
                            reject(ex);
                        }
                    },
                    onRejected: function(error) {
                        try {
                            resolve(onRejected ? onRejected(error) : error);
                        } catch (ex) {
                            reject(ex);
                        }
                    }
                });
            });
        };

        this.catch = function(onRejected) {
            return this.then(null, onRejected);
        };

        try {
            executor(resolve, reject);
        } catch (ex) {
            reject(ex);
        }
    };
}
