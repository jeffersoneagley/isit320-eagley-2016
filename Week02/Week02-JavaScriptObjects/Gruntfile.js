module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: '<json:package.json>',

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/node_modules/**'
                ],
                reporter: 'checkstyle',
                reporterOutput: 'result.xml',
                strict: true,
                globals: {
                    describe: true,
                    afterEach: true,
                    beforeEach: true,
                    inject: true,
                    it: true,
                    jasmine: true,
                    expect: true,
                    module: true,
                }
            }
        },

        clean: {
            work: {
                src: ['**/node_modules/**']
            },

            zip: {
                src: ['<%= zipFile %>']
            }
        },

        jscs: {
            src: '**/*.js',
            options: {
                config: '.jscsrc'
            }
        },

        'jsbeautifier': {
            files: ['**/*.js', '!**/node_modules/**', '!**/components/**'],
            options: {
                'indentSize': 4
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.registerTask('beautify', ['jsbeautifier']);
    grunt.registerTask('check', ['beautify', 'jscs', 'jshint']);
};
