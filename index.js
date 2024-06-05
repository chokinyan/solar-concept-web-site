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

    app.get('/vehicule/film%20de%20protection',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vehicule/film_de_protection/index.html"));
    });

    app.get('/vehicule/covering',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vehicule/covering/index.html"));
    });

    app.get('/vehicule/teintage%20de%20vitre',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vehicule/teintage_de_vitre/index.html"));
    });

    app.get('/vehicule/ciel%20etoile',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vehicule/ciel_etoile/index.html"));
    });

    app.get('/vehicule/flocage',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vehicule/flocage/index.html"));
    });

    app.get('/vetement/bradage',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vetement/bradage/index.html"));
    });

    app.get('/vetement/flocage%20textile',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/vetement/flocage_textile/index.html"));
    });

    app.get('/batiment/vitrine%20solaire',(req, res) =>{
        res.sendFile(path.join(__dirname,"solar_concept/batiment/vitre_solaire/index.html"));
    });

    /*
    /vehicule/covering
    /vehicule/teintage%20de%20vitre
    /vehicule/ciel%20etoile
    /vehicule/flocage

    /vetement/bradage
    /vetement/flocage%20textile

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