describe('i-router', function () {
    var router = BEM.blocks['i-router'];

    it ('404', function (done) {
        env('/olol', function (meta) {
            expect(meta.res.statusCode).equal(404);
            done();
        }).done();
    });

    describe('define', function () { 
        router.define('GET', /\/(foo)/, 'i-router-page-1');
        BEM.decl('i-router-page-1', null, {
            init: function () {
                console.log('1', arguments.length)
                router.getRes().end();
                return Vow.fulfill();
            }
        });

        it ('status code', function (done) {
            env('/foo', function (meta) {
                expect(meta.res.statusCode).equal(200);
                done();
            }).done();
        });
        it ('params', function (done) {
            env('/foo?qwe=123', function (meta) {
                console.log(router.getParams())
                expect(router.getParams().qwe).equal(123);
                done();
            }).done();
        });
    }); 
});
