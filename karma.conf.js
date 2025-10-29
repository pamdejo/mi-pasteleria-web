module.exports = function (config) {
    config.set({
    frameworks: ['jasmine'],
    files: [
    'src/utils/**/*.js', 
    'src/**/*.spec.js' 
    ],
    reporters: ['spec'], 
    browsers: ['ChromeHeadless'], 
    singleRun: true,
    concurrency: Infinity
    });
};