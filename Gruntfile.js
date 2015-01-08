module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    serve: {
      options: {
        port: 9000
      }
    },
    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: [
        'src/_intro.js',
        'src/main.js',
        'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    qunit: {
      files: ['test/*.html']
    },

    jshint: {
      files: ['dist/OpticalFlow.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'jshint', 'qunit']
    },
    versioner: {
      options: {
        bump: true,
        file: 'package.json',
        gitAdd: true,
        gitCommit: true,
        gitPush: true,
        gitTag: true,
        gitPushTag: true,
        gitDescribeOptions: '--tags --always --dirty=-d',
        tagPrefix: 'v',
        commitMessagePrefix: 'Release: ',
        tagMessagePrefix: 'Version: ',
        readmeText: 'Current Version:',
        pushTo: 'origin',
        branch: 'master',
        npm: true,
        mode: 'production',
        configs: []
      },
      default:{
        files: {
          './package.json': ['./package.json'],
          './bower.json': ['./bower.json'],
          './README.md': ['./README.md'],
          './src/main.js': ['./src/main.js']
        }
      },
      patch: {
        options: {
          file: './VERSION'
        },
        src: ['./package.json', './bower.json', './README.md']
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-versioner');
grunt.loadNpmTasks('grunt-serve');
grunt.registerTask('test', ['jshint', 'qunit']);
grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);

};
