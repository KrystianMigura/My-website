module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify:{
            t1: {
                files: {
                    'dest/all.min.js': ['configuration/global/index.js', 'configuration/global/ser.js']
                }
            },
        }
    });

};
