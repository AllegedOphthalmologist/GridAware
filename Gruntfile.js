module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      production: {
        src: './build/production.js',
        dest: './build/production.js'
      }
    },

    webpack: {
      app: {
        entry: "./app/js/app.jsx",
        output: {
          path: __dirname + '/build',
          filename: 'production.js'
        },
        module: {
          loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader', include: './app/js/', exclude: './node_modules/'}
          ]
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './build/main.min.css': ['./app/styles/main.css', './app/styles/full.css']
        }
      }
    },

    copy: {
      index: {
        files: [
          {expand: true, flatten: true, src: './app/index.html', dest: './build/'}
        ]
      },
      images: {
        files: [
          {expand: true, flatten: true, src: './app/assets/*.jpg', dest: './build/images'}, 
          {expand: true, flatten: true, src: './app/assets/*.png', dest: './build/images'}
        ]
      }
    },

    clean: {
      js: ['./build/*.js'],
      css: ['./build/*.css'],
      index: ['./build/*.html'],
      images: ['./build/images/']
    },

    jshint: {
      files: [
        'app/**/*.js',
        'app/**/*.jsx',
        'server/**/.*.js'
      ],
      options: {
        force: 'true',
      }
    },


    jasmine_node: {
      options: {
        forceExit: true,
        extentions: 'js',
        includeStackTrace: true,
      },
      all: ['server/tests/']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
    },

    watch: {
      server: {
        files: ['server/**/*.js'],
        tasks: ['test'],
      },
      client: {
        files: ['app/**/*.js', 'app/**/*.jsx'],
        tasks: ['test', 'webpack:app'],
      },
      css: {

        files: ['app/styles/main.css','app/styles/full.css'],
        tasks: ['cssmin']
      },
      index: {
        files: ['app/index.html'],
        tasks: ['copy'],
      },
      options: {
        debounceDelay: 1000,
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          ignore: ['node_modules'],
          watch: ['server'],
          delay: 1000
        },
      }
    },

    concurrent: {
      target: {
        tasks: ['nodemon', 'jasmine_node'],
        options: {
          logConcurrentOutput: true,
        }
      }
    }

  });

  // Load in Grunt dependencies
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-services');
  grunt.loadNpmTasks('grunt-jasmine-node-new');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('server-dev', function(target) {
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon',
      opts: {maxBuffer: 500*1024},
    });

    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run(['startMongo']);
    grunt.task.run(['watch']);
  });

  // Helper Tasks ////////////////////////////////////////

  grunt.registerTask('build', function(n) {

    grunt.task.run(['webpack']);
    grunt.task.run(['cssmin']);
    grunt.task.run(['copy']);
    if (grunt.option('prod')) {
      grunt.task.run(['uglify']);
    }
  });

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('jasmineTests', ['concurrent']);

  grunt.registerTask('karmaTests', ['karma']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // Do production upload/deployment tasks
    }
    else {
      grunt.task.run(['build']);
      grunt.task.run(['server-dev']);
    }
  });

  // Grunt Tasks ////////////////////////////////////////
  grunt.registerTask('deploy', [
    'test',
    'clean',
    'upload'
  ]);

};