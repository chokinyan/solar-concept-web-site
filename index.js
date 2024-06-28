(async ()=>{
    const path = require('path');
    const fs = require('fs');
    const chokidar = require('chokidar');
    const express = require('express');
    const bodyParser = require('body-parser');
    const {Buffer} = require('buffer');
    const app = express();
    const albumApp = express();
    const port = process.env.PORT || 3000;
    const AlbumPort = process.env.PORT || 5000;
    const {load} = require('cheerio');

//--------------------------------------------------------------------------------------------------------------

    app.use('/',express.static(path.join(__dirname,'solar_concept')));
    app.use(bodyParser.json({limit : "1000mb"}));
    app.use(bodyParser.urlencoded({ extended: true , limit : "1000mb"}));

    albumApp.use('/', express.static(path.join(__dirname,'/realisation_source/dashboard')));
    albumApp.use(bodyParser.json({limit : "1000mb"}));
    albumApp.use(bodyParser.urlencoded({ extended: true , limit : "1000mb"}));

    app.get('/', (_req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept'));
    });

    app.get('/nosrealisations',(_req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/nos_realisations/index.html'));
    });

    app.get('/contact',(_req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/contact/index.html'));
    });

    app.get('/Automobile/cieletoile',(_req, res) =>{
        res.sendFile(path.join(__dirname,'solar_concept/Automobile/ciel_etoile/index.html'));
    })

    app.get('/Automobile/covering',(_req, res)=>{
        res.sendFile(path.join(__dirname,'solar_concept/Automobile/covering/index.html'));
    })

    app.get('/Automobile/teintagedevitre',(_req, res)=>{
        res.sendFile(path.join(__dirname,'solar_concept/Automobile/vitre_teinte/index.html'));
    })

    app.get('/Automobile/filmdeprotection',(_req, res)=>{
        res.sendFile(path.join(__dirname,'solar_concept/Automobile/ppf/index.html'));
    })

    app.get('/batiment/film-pour-batiment',(_req,res)=>{
        res.sendFile(path.join(__dirname,'solar_concept/batiment/film_decoratif/index.html'));
    })

    app.get('/marquagepublicitaire/flocageAutomobile',(_req,res)=>{
        res.sendFile(path.join(__dirname,'solar_concept/marquage_publicitaire/flocage_Automobile/index.html'));
    })

    app.get('/marquagepublicitaire/flocagetextile',(_req,res)=>{
        res.sendFile(path.join(__dirname,'solar_concept/marquage_publicitaire/flocage_textile/index.html'));
    })

//--------------------------------------------------------------------------------------------------------------------

    albumApp.get('/',(_req,res)=>{
        res.sendFile(path.join(__dirname,'/realisation_source/dashboard/realisation_edit.html'));
    })

    albumApp.post('/albumAdd',(req,res)=>{
        const body = req?.body;
        if(body !== undefined){
            //create a new album
            var imageListOrder = [];
            const description = body.description;
            const title = body.title;
            const images = body.images;
            const frontImage = body.frontImage;
            
            if (!fs.existsSync(path.join(__dirname,`/realisation_source/${title}`))) {
                fs.mkdirSync(path.join(__dirname,`/realisation_source/${title}`));
            }
            
            for(let img of images){ //imported images
                let data = Buffer.from(img.data,'base64');
                fs.writeFileSync(path.join(__dirname,`/realisation_source/${title}/${img.name}`),data);
            }
            
            fs.writeFileSync(path.join(__dirname,`/realisation_source/${title}/description.txt`),description); // description file
            
            if(!fs.readdirSync(`D:/github/solar-concept-web-site/realisation_source/${title}`).includes(`${frontImage.name}`)){ // if front image is already included in the repository do nothing
                let frontData = Buffer.from(frontImage.data,'base64');
                fs.writeFileSync(path.join(__dirname,`/realisation_source/${title}/${frontImage.name}`),frontData);
            }

            images.forEach((value,_index,_array)=>{ // image array
                imageListOrder.push(value.name);
            });

            const albumConfig = {
                description : "description.txt",
                image : imageListOrder,
                albumsImage : frontImage.name,
            };

            fs.writeFileSync(path.join(__dirname,`/realisation_source/${title}/config.json`),JSON.stringify(albumConfig)); //json config file

            //-----------------------------------------------------------------------------------------------------------------------

            //copy file to front end

            if(!fs.existsSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}`))){
                fs.mkdirSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}`));
            };
            
            if(!fs.existsSync(path.join(__dirname,`/solar_concept/nos_realisations/${title.toLocaleUpperCase().replace(/\s/g,"_")}`))){
                fs.mkdirSync(path.join(__dirname,`/solar_concept/nos_realisations/${title.toLocaleUpperCase().replace(/\s/g,"_")}`));
            }

            for(let image of albumConfig.image){
                fs.copyFileSync(path.join(__dirname,`/realisation_source/${title}/${image}`),path.join(__dirname,`/solar_concept/asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}/${image}`));
            }
            
            if(!fs.existsSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}/${albumConfig.albumsImage}`))){
                fs.copyFileSync(path.join(__dirname,`/realisation_source/${title}/${albumConfig.albumsImage}`),path.join(__dirname,`/solar_concept/asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}/${albumConfig.albumsImage}`));
            };

            //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            const $ = load(fs.readFileSync(path.join(__dirname,"/realisation_source/base.html")));
            const $2 = load(fs.readFileSync(path.join(__dirname,"/solar_concept/nos_realisations/index.html")));

            $(`
                <h1>${title.toLocaleUpperCase()}</h1>
                <hr>
            `).appendTo('#description');

            for(let ligne of description.split("\n")){
                $(`<p>${ligne}</p>`).appendTo('#description');
            }

            for(let photo of imageListOrder){
                $(`
                    <div class="card mb-5 hover:tw-shadow-2xl">
                        <img src="../../asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}/${photo}" class="card-img-top" alt="Aventador card">
                    </div>
                    `).appendTo("#image");
            };

            fs.writeFileSync(path.join(__dirname,`/solar_concept/nos_realisations/${title.toLocaleUpperCase().replace(/\s/g,"_")}/index.html`),$.html());

            $2(`
                <div class="col">
                    <div class="card">
                        <a href="/nosrealisations/${title.replace(/\s/g,"_")}">
                            <img src="asset/image/realisation/${title.toLocaleUpperCase().replace(/\s/g,"_")}/${frontImage.name}" class="card-img-top card-img-realisation" alt="${title} card" class="border-3 border-black">
                        </a>
                    </div>
                    <div class="card-body text-center">
                        <a href="/nosrealisations/${title.replace(/\s/g,"_")}" class="tw-text-black tw-no-underline">
                            <h5 class="card-title">${title.toLocaleUpperCase()}</h5>
                        </a>
                    </div>
                </div>
                `).appendTo("#album");
            
            fs.writeFileSync(path.join(__dirname,"solar_concept/nos_realisations/index.html"),$2.html());

            app.get(`/nosrealisations/${title.replace(/\s/g,"_")}`,(_req,res)=>{
                res.sendFile(path.join(__dirname,`/solar_concept/nos_realisations/${title}/index.html`));
            });

            res.send('Uplaod Success !');
        }
    });

//-------------------------------------------------------------------------------------------------------------------------

    const realisationWatch = chokidar.watch(path.join(__dirname,'/realisation_source'),{persistent:true});

    realisationWatch.on("ready",()=>{
        //Reset du dossier realisation
        const realisationFolder = fs.readdirSync(path.join(__dirname,"/solar_concept/nos_realisations"));
        for(let file of realisationFolder){
            if(fs.lstatSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}`)).isDirectory()){
                for(let folderFile of fs.readdirSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}`))){
                    fs.unlinkSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}/${folderFile}`));
                };
                fs.rmdirSync(path.join(__dirname,`/solar_concept/nos_realisations/${file}`));
            };
        };

        //Reset du dossier image des realisation
        const realisationImageFolder = fs.readdirSync(path.join(__dirname,"/solar_concept/asset/image/realisation"));
        for(let file of realisationImageFolder){
            if(fs.lstatSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${file}`)).isDirectory()){
                const underfileImage = fs.readdirSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${file}`));
                for(let underfile of underfileImage){
                    fs.unlinkSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${file}/${underfile}`))
                }
                fs.rmdirSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${file}`));
            }
            else{
                fs.unlinkSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${file}`));
            };
        };

        //-------------------------------------------------------------------------------------------------------------------------

        const realisationSourceFolder = fs.readdirSync(path.join(__dirname,"/realisation_source"));
        const $ = load(fs.readFileSync(path.join(__dirname,"/realisation_source/base.html")));
        const $2 = load(fs.readFileSync(path.join(__dirname,"/solar_concept/nos_realisations/index.html")));
        $2("#album").empty();
        for(let file of realisationSourceFolder){
            if(fs.lstatSync(path.join(__dirname,`/realisation_source/${file}`)).isDirectory()){
                const realisationSourceUnderFolder = fs.readdirSync(path.join(__dirname,`/realisation_source/${file}`));
                if(!realisationSourceUnderFolder.includes("config.json")){
                    continue;
                }
                else{
                    let config = require(`${path.join(__dirname,`/realisation_source/${file}/config.json`)}`);
                    if(config?.albumsImage != undefined){
                        let folderName = file.toLocaleUpperCase().replace(/\s/g,"_");
                        
                        if(!fs.existsSync(path.join(__dirname,`/solar_concept/nos_realisations/${folderName}`))){
                            fs.mkdirSync(path.join(__dirname,`/solar_concept/nos_realisations/${folderName}`));
                            fs.mkdirSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${folderName}`));
                        };

                        for(let image of config.image){
                            fs.copyFileSync(path.join(__dirname,`/realisation_source/${file}/${image}`),path.join(__dirname,`/solar_concept/asset/image/realisation/${folderName}/${image}`));
                        }

                        if(!fs.existsSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${folderName}/${config.albumsImage}`))){
                            fs.copyFileSync(path.join(__dirname,`/solar_concept/asset/image/realisation/${folderName}/${config.albumsImage}`));
                        };

                        $(`
                            <h1>${file.toLocaleUpperCase()}</h1>
                            <hr>
                            `).appendTo('#description');

                        let description = fs.readFileSync(path.join(__dirname,`/realisation_source/${file}/${config.description}`),"utf-8");
                        for(let ligne of description.split("\n")){
                            $(`<p>${ligne}</p>`).appendTo('#description');
                        }

                        for(let photo of config.image){
                            $(`
                                <div class="card mb-5 hover:tw-shadow-2xl">
                                    <img src="../../asset/image/realisation/${folderName}/${photo}" class="card-img-top" alt="Aventador card">
                                </div>
                                `).appendTo("#image");
                        };

                        fs.writeFileSync(path.join(__dirname,`/solar_concept/nos_realisations/${folderName}/index.html`),$.html());

                        app.get(`/nosrealisations/${file.replace(/\s/g,"_")}`,(req,res)=>{
                            res.sendFile(path.join(__dirname,`/solar_concept/nos_realisations/${folderName}/index.html`));
                        });
                        //card-img-realisation
                        $2(`
                            <div class="col">
                                <div class="card">
                                    <a class="card-img-top" href="/nosrealisations/${file.replace(/\s/g,"_")}">
                                        <img src="asset/image/realisation/${folderName}/${config.albumsImage}" alt="${file} card" class="border-3 border-black">
                                    </a>
                                </div>
                                <div class="card-body text-center">
                                    <a href="/nosrealisations/${file.replace(/\s/g,"_")}" class="tw-text-black tw-no-underline">
                                        <h5 class="card-title">${file.toLocaleUpperCase()}</h5>
                                    </a>
                                </div>
                            </div>
                            `).appendTo("#album");
                        
                        fs.writeFileSync(path.join(__dirname,"solar_concept/nos_realisations/index.html"),$2.html());

                        $('#description').empty();
                        $('#image').empty();
                    }
                }
                
            }
        }
    });

    realisationWatch.on("error",(err)=>{
        console.log(err);

    });

    realisationWatch.on("unlinkDir",(path)=>{
        console.log(path);
    })

//--------------------------------------------------------------------------------------------------------------
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

    albumApp.listen(AlbumPort,()=>{
        console.log(`Server 2 is running on port ${AlbumPort}`);
    })

})();


/*
app.get('/nosrealisations/aventador',(req, res) =>{
res.sendFile(path.join(__dirname,'solar_concept/nos_realisations/aventador/index.html'));
});
*/

// astro build
// gatsby
// Boostrap
// tailwindcss