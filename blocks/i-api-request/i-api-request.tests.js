describe('i-api-request', function () {
    it('get with full path', function (done) {
        env(function () {
            return BEM.blocks['i-api-request']
                .get('http://nodejs.org/api/index.json')
        })
            .then(function (r) {
                expect('source' in r).equal(true);
                done();
            })
            .done();

    });
});

describe('test', function () {
    it('ok', function () {
        expect(1).equal(1);
    })
})
