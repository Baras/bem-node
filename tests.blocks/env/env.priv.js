var domain = require('domain'),
    http = require('http');

global.env = function (path, fn) {
    var pathPromise = Vow.promise();

    if (arguments.length === 1) {
        fn = path;
        path = null;
    }

    if (path) {
        http
            .get('http://127.0.0.1:3000' + path, function (res) {
                var state = res.headers['c-node-state'];

                if (state) {
                    state = JSON.parse(state);
                }

                res.on('data', function (e) {
                    /*console.log('data', e);*/
                });
                res.on('end', function (e) {
                    pathPromise.fulfill({
                        res: res,
                        state: state
                    });
                })
            })
            .on('error', pathPromise.reject.bind(pathPromise));
    } else {
        pathPromise.fulfill();
    }

    return pathPromise.then(function (meta) {
        var d = domain.create(),
            promise = Vow.promise();

        d.run(function () {
            meta = meta || {};
            if (meta.state) {
                console.log(meta.state);
                process.domain.state = meta.state;
            }
            d.on('error', promise.reject.bind(promise));

            var result = fn(meta);
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
    });

}
