(async ()=>{
    const path = require('path');
    const fs = require('fs');
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



    /*
    /vehicule/covering
    /vehicule/teintage%20de%20vitre
    /vehicule/ciel%20etoile
    /vehicule/flocage

    /batiment/vitrine%20solaire
    */
//--------------------------------------------------------------------------------------------------------------

    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

})();

// web astro
// gatsby
// Boostrap
// tailwindcss