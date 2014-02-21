describe('i-api-request', function () {
    return;
    try {
        BEM.blocks['i-ajax-proxy'].allowBlock('i-test-api');
    } catch(e) {};
    BEM.decl({block: 'i-test-api', baseBlock: 'i-api-request'}, null, {
        _apiHost: 'http://nodejs.org/api/'
    });

    var api = BEM.blocks['i-test-api'];

    it('get with full path', function (done) {
        env(function () {
            return api.get('index.json')
        })
            .then(function (r) {
                expect('source' in r).equal(true);
                done();
            })
            .done();

    });
});
