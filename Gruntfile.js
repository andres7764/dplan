module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    compress: {
      options: {
        mode: 'gzip'
      },
      css: {
        files: [
          {
            expand: true,
            cwd: "./public/css/",
            src: ["**/*.css"],
            dest: "./public/cssmin/"
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: "./public/templates/",
            src: ["**/*.html"],
            dest: "./public/templatesmin/"
          },
          {
            expand: true,
            cwd: "./views/",
            src: ["**/*.ejs"],
            dest: "./viewsmin/"
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: "./public/js/",
            src: ["**/*.js"],
            dest: "./public/jsmin/"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compress");

  grunt.registerTask("default", ["compress"]);
};