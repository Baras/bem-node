function script(url, content) {
    var tag = {
        tag: 'script',
    }
    if (url) {
        tag.attrs = {src: url};
    } else if (content) {
        tag.content = '(' + content.toString() + '());';
    }
    return tag;
}
BN.addDecl('i-page').staticProp({
    getPageJson: function (json) {
        return {
            tag: 'html',
            content: [
                {
                    tag: 'head',
                    content: [
                        {
                            tag: 'link',
                            attrs: {
                                rel: 'stylesheet',
                                href: '/tests/simple/simple.css'
                            }
                        }
                    ]
                },
                {
                    tag: 'body',
                    content: [
                        {
                            block: 'b-content',
                            content: json
                        },
                        {
                            attrs: {
                                id: 'mocha'
                            }
                        },
                        script('/tests/simple/simple.js'),
                        script(null, function () {
                            mocha.ui('bdd');
                            mocha.reporter('html');
                            expect = chai.expect;
                        }),
                        script('/tests/simple/simple.tests.js'),
                        script(null, function () {
                            if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
                            else { mocha.run(); }
                        })
                    ]
                }
            ]
        }
    } 
});
