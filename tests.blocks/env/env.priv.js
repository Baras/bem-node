global.env = function (fn) {
    var d = require('domain').create(),
        promise = Vow.promise();

    d.run(function () {
        d.on('error', promise.reject.bind(promise));

        var result = fn();
        if (Vow.isPromise(result)) {
            result.then(
                promise.fulfill.bind(promise),
                promise.reject.bind(promise)
            ).done();
        } else {
            promise.fulfill(result);    
        }
    });

    return promise;
}
