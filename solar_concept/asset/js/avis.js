import avis from '/avis.json' with {type:"json"};


const slick = document.getElementsByClassName("slicker")[0];
const nbAvis = document.getElementsByClassName("nb-avis")[0];
const ratingAgence = document.getElementsByClassName("rating-agence")[0];
let starAgence = ""

for(let review of avis.review){
    let star = "";
    for(let i = 0;i < review?.rating;i++){
        star += '<i class="bi bi-star-fill rating-star"></i>';
    };
    if(!Number.isInteger(review?.rating) && review?.rating !== undefined){
        star += '<i class="bi bi-star-half rating-star"></i>';
    }


    let element = 
    `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"><img src="${review?.authorPhoto}" class="rating-profile-photo">${review?.author}</h4>
                <div class="d-flex">
                    ${star}
                </div>
                <p class="card-text tw-text-lg">${review?.text?.replace('/\n/g','<br>')}</p>
            </div>
        </div>
    `
    slick.innerHTML += element;
}

nbAvis.textContent = `${avis?.userRatingCount}`;


for(let i = 0; i < avis?.rating;i++){
    starAgence += '<i class="bi bi-star-fill rating-star-agence"></i>';
};

if(!Number.isInteger(avis?.rating) && avis?.rating !== undefined){
    starAgence += '<i class="bi bi-star-half rating-star-agence"></i>';
}

ratingAgence.innerHTML += starAgence;