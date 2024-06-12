(async ()=>{
    const path = require('path');
    const fs = require('fs');
    const chokidar = require('chokidar');
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;
    const {Cheerio} = require('cheerio');

//--------------------------------------------------------------------------------------------------------------

    app.use('/',express.static(path.join(__dirname,'solar_concept')));

    app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept'));
    });

    app.get('/nos%20realisations',(req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/nos_realisations/index.html'));
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

    const realisationWatch = chokidar.watch(path.join(__dirname,'/realisation_source'),{persistent:true});

    realisationWatch.on('change',(pathChange)=>{
        
    });
    
    realisationWatch.on("addDir",(pathAddDir)=>{ // ! demarre au lancement

    });
    
    realisationWatch.on("add",(pathAdd)=>{ // ! demarre au lancement
    
    }); 
    
    realisationWatch.on('unlink',(pathUnlink)=>{
    
    });
    
    realisationWatch.on("unlinkDir",(pathUnlinkDir)=>{
    
    });

    realisationWatch.on("ready",()=>{
        //Reset du dossier realisation
        const realisationFolder = fs.readdirSync(path.join(__dirname,"/solar_concept/nos_realisations"));
        for(let file of realisationFolder){
            if(!file.endsWith(".html")){
                for(let folderFile of fs.readdirSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}`))){
                    fs.unlinkSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}/${folderFile}`));
                };
                fs.rmdirSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}`));
            };
        };
        //Reset du dossier image des realisation
        //solar_concept/asset/image/realisation
        const realisationImageFolder = fs.readdirSync(path.join(__dirname,"/solar_concept/asset/image/realisation"));
        for(let file of realisationFolder){
            
        
        };


    });

    realisationWatch.on("error",(err)=>{
        console.log(err);

    //--------------------------------------------------------------------------------------------------------------------------------



    });

//--------------------------------------------------------------------------------------------------------------
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

})();

/*
app.get('/nos%20realisations/aventador',(req, res) =>{
res.sendFile(path.join(__dirname,'solar_concept/nos_realisations/aventador/index.html'));
});
*/

/*
<div class="card mb-5 hover:tw-shadow-2xl">
<img src="../../asset/image/automobile/aventador.jpg" class="card-img-top" alt="Aventador card">
</div>
*/

/*
<div class="col">
<div class="card">
<a href="/nos%20realisations/aventador">
<img src="asset/image/automobile/aventador.jpg" class="card-img-top" alt="Aventador card">
</a>
</div>
*/



// astro build
// gatsby
// Boostrap
// tailwindcss