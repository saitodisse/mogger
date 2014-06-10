var config = module.exports;

config['Mogger Tests'] = {
    environment: 'node',  // or 'browser'
    rootPath: '../',
    sources: [
        'src/mogger.js'
    ],
    tests: [
        'test/*.test.js'
    ]
};