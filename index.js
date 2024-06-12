(async ()=>{
    const path = require('path');
    const chokidar = require('chokidar');
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

//--------------------------------------------------------------------------------------------------------------

    app.use('/',express.static(path.join(__dirname,'solar_concept')));

    app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept'));
    });

    app.get('/nos%20realisations',(req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/nos_realisations/index.html'));
    });

    app.get('/nos%20realisations/aventador',(req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/nos_realisations/aventador/index.html'));
    });

    app.get('/contact',(req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/contact/index.html'));
    });


    /*
    /vehicule/covering
    /vehicule/teintage%20de%20vitre
    /vehicule/ciel%20etoile
    /vehicule/flocage

    /batiment/vitrine%20solaire
    */
//--------------------------------------------------------------------------------------------------------------

    const realisationWatch = chokidar.watch(__dirname + '/solar_concept/nos_realisations',{persistent:true});

    realisationWatch.on('change',(path)=>{
        console.log(path);
    });
    realisationWatch.on("addDirectory",(path)=>{
        console.log(path);
    });
    realisationWatch.on("add",(path)=>{
        console.log(path);
    });
    realisationWatch.on('unlink',(path)=>{
        console.log(path);
    });
    realisationWatch.on("unlinkDir",(path)=>{
        console.log(path);
    });



    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

})();

// astro build
// gatsby
// Boostrap
// tailwindcss