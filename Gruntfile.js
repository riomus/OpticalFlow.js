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
        separator: '\n\n'
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
      gitCommit: false,
      gitPush: false,
      gitTag: true,
      gitPushTag: false,
      npm: false
    },
    default: {
      files: {
        './package.json': ['./package.json'],
        './bower.json': ['./bower.json'],
        './README.md': ['./README.md'],
        './src/main.js': ['./src/main.js']
      }
    }
  }
  });
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-serve');
grunt.loadNpmTasks('grunt-versioner');
grunt.registerTask('test', ['jshint', 'qunit']);
grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);

};
