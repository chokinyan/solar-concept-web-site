(async ()=>{
    const path = require('path');
    const fs = require('fs');
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    app.use('/',express.static(path.join(__dirname,'solar_concept/index.html')));


    app.get("/", (req, res) =>{
        console.log(req);
        res.sendFile(path.join(__dirname,'solar_concept/index.html'));
        //res.send('./solar concept');
    });


    app.listen(()=>{
        console.log(`Server is running on port ${port}`);
    });

})();