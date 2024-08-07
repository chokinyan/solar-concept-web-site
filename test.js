const key = require('./config/config.json');
const puppeteer = require('puppeteer');
const fs = require('fs');

class Review{
    constructor(text,author,authorPhoto,rating){
        this.text = text;
        this.author = author;
        this.authorPhoto = authorPhoto;
        this.rating = rating;
        return {
            text : this.text,
            author : this.author,
            authorPhoto : this.authorPhoto,
            rating : this.rating,
        }
    }
}

const FacebookFollower = async()=>{

    const browser = await puppeteer.launch({
        headless: "new",
        timeout : 0,
    }); //initalise le navigateur et enleve la tete

    const page = await browser.newPage(); //crée une page sur le navigateur
    await page.goto("https://www.facebook.com/solarconcept68"); //page va a l'url
    
    const followerSelector = "#scrollview > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div:nth-child(1) > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.xl56j7k.x1qjc9v5.xozqiw3.x1q0g3np.x1l90r2v.x1ve1bff > div > div > div > div.x78zum5.x15sbx0n.x5oxk1f.x1jxijyj.xym1h4x.xuy2c7u.x1ltux0g.xc9uqle > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.x6s0dn4.xyamay9 > span > a:nth-child(2)";
    //selctor de la il y a le nombre de followers
    await page.waitForSelector(followerSelector); // attends que le selcteur s'affiches
    const followers = await page.$eval(followerSelector,node=>node.innerText); //recupere le text du selecteur
    
    console.log(followers); // pas dur a comprendre
    
    await browser.close(); // ferme le navigateur
};

const tiktokFollower = async ()=>{

    const browser = await puppeteer.launch({
        headless: "new",
        timeout : 0,
    }); //initalise le navigateur et enleve la tete

    const page = await browser.newPage(); //crée une page sur le navigateur
    await page.goto("https://www.tiktok.com/@solarconcept68"); //page va a l'url

    const tiktokFollowerSelector = "#main-content-others_homepage > div > div.css-1g04lal-DivShareLayoutHeader-StyledDivShareLayoutHeaderV2.enm41492 > h3 > div:nth-child(2) > strong";

    await page.waitForSelector(tiktokFollowerSelector);
    const tiktokFollowerEncounter = await page.$eval(tiktokFollowerSelector,node => node.textContent);

    console.log(tiktokFollowerEncounter);

    await browser.close();
}

const googleReview = async ()=>{

    const avis = {
        review : [],
        rating : 0,
        userRatingCount : 0
    };

    await fetch(`https://places.googleapis.com/v1/places/ChIJcZ3gT2mbkUcRSAwiCUyhjhk`,
        {
            method : 'GET',
            headers : {
                "Accept-Language" : "fr",
                "Content-Type": "application/json",
                "X-Goog-FieldMask": "reviews,rating,userRatingCount",
                "X-Goog-Api-Key" : key.keyMap
            }
        }
    ).then(async (response)=>{
        const data = await response.json();
        for(let review of data.reviews){
            avis.review.push(new Review(review.originalText.text,review.authorAttribution.displayName,review.authorAttribution.photoUri,review.rating));
        }
        avis.rating = data.rating;
        avis.userRatingCount = data.userRatingCount;
        const avisStr = JSON.stringify(avis);

        fs.writeFile('./solar_concept/avis.json', avisStr, (err)=>{
            console.error(err);
        });
    })
}


(async ()=>{
    //tiktokFollower();
    //FacebookFollower();
    await googleReview();
})();