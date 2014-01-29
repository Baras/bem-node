var assert = require('assert'),
    get = require('http').get,
    server = BEM.blocks['i-www-server'],
    router = BEM.blocks['i-router'];


BEM.decl('i-page-test', null, {
    init: function () {
        router.getRes().end('ok');
    }
});

before(function (done) {
    server.init({
        done: done,
        workers: false,
        socket: 8000
    });
    router.define('/foo', 'i-page-test');
    router.init();
});
after(function () {
    server.close();
});

describe('i-router', function(){

    it('404 page', function (done) {
        get('http://127.0.0.1:8000/404', function (res) {
            assert.equal(404, res.statusCode);
            done();
        });
    });

    it('200 page', function (done) {
        get('http://127.0.0.1:8000/foo', function (res) {
            res.on('data', function () {
                console.log(arguments);
            })
            assert.equal(200, res.statusCode);
            assert.equal('ok', res.text);
            done();
        });
    });

});
