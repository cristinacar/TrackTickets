'use strict';

var args        = require( 'yargs' ).argv,
    concat      = require( 'gulp-concat' ),
    del         = require( 'del' ),
    gulp        = require( 'gulp' ),
    gulpif      = require( 'gulp-if' ),
    linker      = require( 'gulp-linker' ),
    jshint      = require( 'gulp-jshint' ),
    ngAnnotate  = require( 'gulp-ng-annotate' ),
    notify      = require( 'gulp-notify' ),
    rename      = require( 'gulp-rename' ),
    sass        = require( 'gulp-ruby-sass' ),
    cssmin      = require( 'gulp-minify-css' ),
    sourcemaps  = require( 'gulp-sourcemaps' ),
    uglify      = require( 'gulp-uglify' ),

    //destination folder;
    frontend_srcSCSS        = './static/assets',
    frontend_srcJS          = './src/js',
    frontend_srcPNG         = './src/img',
    frontend_exportCSS      = './static/css',
    frontend_exportJS       = './dist',
    frontend_exportPNG      = './dist',
    //files
    frontend_minifileCSS    = 'tt.min.css',
    frontend_minifileJS     = 'tt.min.js',
    frontend_minifileSPRITE = 'tt.png';

function setFrontendMinifileJSWithVersion () {
    frontend_minifileJS = 'tt.' + new Date().getTime() + '.min.js';
}

function setFrontendMinifileCssWithVersion () {
    frontend_minifileCSS = 'tt.' + new Date().getTime() + '.min.css';
}

////////////////////////////////////////////////////////////////////////////////
//runs bower to install all dependencies
////////////////////////////////////////////////////////////////////////////////
gulp.task('bower', function ( ) {
    var install = require('gulp-install');

    return gulp.src(['./bower.json'])
        .pipe( install( ) );
});

////////////////////////////////////////////////////////////////////////////////
//runs bower to install all dependencies
////////////////////////////////////////////////////////////////////////////////
gulp.task('uglifyjs', function ( ) {
    return gulp.src('./vendor/file-saver.js/FileSaver.js')
        .pipe(concat( 'FileSaver.min.js' ) )
        .pipe(uglify())
        .pipe(gulp.dest('./vendor/file-saver.js'));
});

////////////////////////////////////////////////////////////////////////////////
//install dependencies
////////////////////////////////////////////////////////////////////////////////
gulp.task('install', [ 'bower', 'uglifyjs'] );


////////////////////////////////////////////////////////////////////////////////
//run JShint
////////////////////////////////////////////////////////////////////////////////
gulp.task('jshint', function ( ) {
    gulp.src(
            frontend_srcJS + '/**/*.js'
        )
        .pipe( jshint( ) )
        .pipe( jshint.reporter('jshint-stylish') )
        .pipe( jshint.reporter('fail') )
        .pipe( notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }) )
});


////////////////////////////////////////////////////////////////////////////////
//Clean the build output
////////////////////////////////////////////////////////////////////////////////
gulp.task('clean', function ( cb ) {
    del ( [
        frontend_exportCSS
    ], cb );
});


////////////////////////////////////////////////////////////////////////////////
// Build a minified Javascript bundle - the order of the JS files
////////////////////////////////////////////////////////////////////////////////
gulp.task('build-js', function ( ) {
    setFrontendMinifileJSWithVersion();

    return gulp.src( [
                frontend_srcJS + '/common/common.js',
                frontend_srcJS + '/**/module.js',
                frontend_srcJS + '/**/*.js'
            ] )
        .pipe( gulpif(args.devtest, sourcemaps.init( ) ) )
        .pipe( gulpif(args.production || args.devtest, concat( frontend_minifileJS ) ) )
        .pipe( gulpif(args.production, ngAnnotate( ) ) )
        .pipe( gulpif(args.production, uglify ( ) ) )
        .pipe( gulpif(args.devtest, sourcemaps.write( ) ) )
        .pipe( gulpif(args.production || args.devtest, gulp.dest( frontend_exportJS ) ) );
});

////////////////////////////////////////////////////////////////////////////////
// Link JS to index.html
////////////////////////////////////////////////////////////////////////////////
gulp.task('link-js', [ 'build-js' ], function( ) {
    var isProduction = args.production;
    return gulp.src('./static/index.html')
        .pipe(linker({
            scripts: isProduction || args.devtest ?
                [(frontend_exportJS + '/' + frontend_minifileJS)] :
                [
                    // Force the order of files to link
                    (frontend_srcJS + '/lib/*.js'),
                    (frontend_srcJS + '/app.js'),
                    (frontend_srcJS + '/*.js'),
                    (frontend_srcJS + '/models/*.js'),
                    (frontend_srcJS + '/common/*.js'),
                    (frontend_srcJS + '/common/service/*.js'),
                    (frontend_srcJS + '/common/factory/*.js'),
                    (frontend_srcJS + '/common/directive/*.js'),
                    (frontend_srcJS + '/common/filter/*.js'),
                    (frontend_srcJS + '/module/**/module.js'),
                    (frontend_srcJS + '/module/**/route.js'),
                    (frontend_srcJS + '/module/**/*.js')
                ],
            startTag: '<!-- APP -->',
            endTag: '<!-- END APP -->',
            fileTmpl: isProduction || args.devtest ? '<script src="../%s"></script>' : '<script src="../%s"></script>',
            appRoot: 'static/'
        }))
        .pipe(gulp.dest('./static/'));
});

////////////////////////////////////////////////////////////////////////////////
// Build a minified css file from all SCSS files
////////////////////////////////////////////////////////////////////////////////
gulp.task('build-css', [ ], function ( ) {
    var sourceMap = args.production ? false : true;

    if (args.production || args.devtest) {
        setFrontendMinifileCssWithVersion();
    }

    return sass(frontend_srcSCSS + '/style.scss', { sourcemap: sourceMap })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe( gulpif(args.devtest, sourcemaps.init( ) ) )
        .pipe( gulpif(args.production || args.devtest, cssmin( ) ) )
        .pipe( sourcemaps.write( {
            includeContent: false,
            sourceRoot: frontend_srcSCSS
        } ) )
        .pipe( gulpif( args.production || args.devtest, rename( frontend_minifileCSS ) ) )
        .pipe( gulp.dest( frontend_exportCSS ) );
});

////////////////////////////////////////////////////////////////////////////////
// Link JS to index.html
////////////////////////////////////////////////////////////////////////////////
gulp.task('link-css', [ 'build-css' ], function( ) {
    var isProduction = args.production;
    return gulp.src('./static/index.html')
        .pipe(linker({
             scripts: isProduction || args.devtest ?
                [(frontend_exportCSS + '/' + frontend_minifileCSS)] :
                [(frontend_exportCSS + '/style.css')],
            startTag: '<!-- STYLE -->',
            endTag: '<!-- END STYLE -->',
            fileTmpl: isProduction || args.devtest ? '<link href="%s" rel="stylesheet"/>' : '<link href="%s" rel="stylesheet"/>',
            appRoot: './static/'
        }))
        .pipe(gulp.dest('./static/'));
});

////////////////////////////////////////////////////////////////////////////////
// Watch the scss modification and do build css
////////////////////////////////////////////////////////////////////////////////
gulp.task( 'watch',function( ) {
    gulp.watch( frontend_srcSCSS + '/**/*.scss',['build-css'] );
    gulp.watch( [
            frontend_srcJS  + '/*.js',
            frontend_srcJS  + '/**/*.js',
        ],
        ['link-js']
    );
} );
