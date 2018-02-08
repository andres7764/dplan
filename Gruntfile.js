module.exports = function(grunt) 
{
  // Project configuration.
  grunt.initConfig
  ({
    imagemin: 
    {
      dynamic: 
      {
        files: 
        [
          {
            expand: true,
            cwd: './dist/', //Va a buscar dentro de la carpeta src
            src: ['**/*.{png,jpg,gif}'], //Se buscarán todos los archivos que terminen con esa extensión
            dest: 'compress/' //Va a guardar las nuevas imágenes dentro de la carpeta "dest"
          }
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task.
  grunt.registerTask('optimizeimage', ['imagemin']);
};