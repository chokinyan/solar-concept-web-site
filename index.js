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

    app.get('/test',(req, res) =>{
        console.log(req);
        res.send("test ok");
    });

//--------------------------------------------------------------------------------------------------------------

    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

})();

// web astro
// gatsby
// Boostrap
// tailwindcss