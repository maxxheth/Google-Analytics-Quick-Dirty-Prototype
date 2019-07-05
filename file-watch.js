const gaze = require('gaze');

const exec = require('child_process').exec;

gaze('./assets/js/src/*.js', (err, watcher) => {

    if (err) console.log(err);

    watcher.on('changed', async filename => { 
        
        await exec('npm run bundleJS'); 
    
        console.log(`${filename} was changed`);

    });

});

gaze('./assets/js/src/**/*.js', (err, watcher) => {

    if (err) console.log(err);

    watcher.on('changed', async filename => { 
        
        await exec('npm run bundleJS'); 
    
        console.log(`${filename} was changed`);

    });

});

gaze('./assets/js/dist/*.js', (err, watcher) => {

    if (err) console.log(err);

    watcher.on('changed', filename => { 
        
        console.log(`${filename} was updated!`);
    
    });

});

gaze('./assets/css/src/*.scss', (err, watcher) => {

    if (err) console.log(err);

    watcher.on('changed', filename => {

        exec('npm run bundleCSS');

        console.log(`${filename} was updated!`);

    });

});

gaze('./assets/css/src/**/*.scss', (err, watcher) => {

    if (err) console.log(err);

    watcher.on('changed', filename => {

        exec('npm run bundleCSS');

        console.log(`${filename} was updated!`);

    });

});

gaze('./assets/css/dist/style.css', (err, watcher) => {

    if (err) console.log(err);

    watcher.on('changed', filename => {

        console.log(`${filename} was updated!`);

    });

    // setTimeout(() => {

    //     console.clear();
    
    // }, 1000);


});