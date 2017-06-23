//gulp sass - scss -> css
//gulp scripts - js-файлы
//gulp css - мимимификация css
//gulp img - оптимизация img
//gulp build - построение готового сайта

var gulp = require('gulp'), //Подключение gulp
    concat = require('gulp-concat'), //Подключение gulp-concat (для конкатенации файлов)
    sass = require('gulp-sass'), //Подключение Sass-пакета
    autoprefixer = require('gulp-autoprefixer'), //Подключение библиотеки для автоматического добавления префиксов
    browserSync = require('browser-sync'), //Подключение синхронизации браузеров
    uglify = require('gulp-uglifyjs'), //Подключение gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), //Подключение пакета для минификации CSS
    rename = require('gulp-rename'), //Подключение библиотеки для переименования файлов
    del = require('del'), //Подключение библиотеки для удаления файлов и папок
    imagemin = require('gulp-imagemin'), //Подключение библиотеки для работы с изображениями
    pngquant = require('imagemin-pngquant'), //Подключение библиотеки для работы с png
    cache = require('gulp-cache'), //Подключение библиотеки кеширования
    rigger = require('gulp-rigger'); //Подключение плагина, что позволяет импортировать один файл в другой простой конструкцией

var source = 'app/',
    dest = 'dist/',
    bootstrapSass = { in : './app/libs/bootstrap-sass/'
    },
    //Bootstrap fonts
    fonts = { in : [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: source + 'fonts/'
    },
    //Scss-files + bootstrap-scss
    scss = { in : source + 'scss/style.scss',
            out: source + 'css/',
            watch: source + 'scss/**/*',
            sassOpts: {
                outputStyle: 'nested',
                precison: 3,
                errLogToConsole: true,
                includePaths: [bootstrapSass.in + 'assets/stylesheets']
            }
    };

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

//преобразование scss-files into css
gulp.task('sass', ['fonts'], function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest(scss.out))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//обновление браузера при сохранении изменений
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

//подключение и мимификация js-скриптов
gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.js',
        'app/libs/bootstrap-sass/assets/javascripts/bootstrap.js',
        'app/libs/fancybox/dist/jquery.fancybox.js',
        'app/libs/slick-carousel/slick/slick.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

//мимификация css-файлов
gulp.task('css', ['sass'], function () {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/css'));
});

//оптимизация изображений
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

//watch!
gulp.task('watch', ['browser-sync', 'fonts', 'css', 'scripts'], function () {
    gulp.watch('app/scss/*.+(scss|sass)', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

//чистка перед выходом в продакшн
gulp.task('clean', function () {
    return del.sync('dist');
});

//выпуск в продакшн
gulp.task('build', ['clean', 'img', 'css', 'scripts'], function () {

    var buildCss = gulp.src(['app/css/style.min.css'])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist'));

});

//чистка кэша
gulp.task('clear', function () {
    return cache.clearAll();
});

//default task
gulp.task('default', ['watch']);