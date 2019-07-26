/* global require, setInterval */

const browsersync = require('browser-sync').create();

browsersync.watch('*.php').on('change', browsersync.reload);

browsersync.watch('./helper_funcs/*.php', browsersync.reload);

browsersync.watch('./assets/js/dist/*.js').on('change', browsersync.reload);

browsersync.watch('./assets/css/dist/*.css').on('change', browsersync.reload);

browsersync.init({

    namespace: function (namespace) {

        return 'localhost:3000' + namespace;
    
    }

});

// setInterval(() => {

//     console.clear();

//     browsersync.reload();

// }, 60 * 30000);
