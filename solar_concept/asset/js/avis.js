import avis from '/avis.json' with {type:"json"};


const slick = document.getElementsByClassName("slicker")[0];

for(let review of avis){
    let star = ""
    for(let i = 0;i < review?.rating;i++){
        star += '<i class="bi bi-star-fill rating-star"></i>';
    };
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

console.log(slick);

//.slicker

/*
<div class="card">
    <div class="card-body">
        <h4 class="card-title"><img src="https://lh3.googleusercontent.com/a/ACg8ocLtobv2LpfKliYVB-sihNIu3L10OpGuXRiqMeJ5_uje6hclRQ=s128-c0x00000000-cc-rp-mo" class="rating-profile-photo">Sebastien DI VINCENZO</h4>
        <div class="d-flex">
            <i class="bi bi-star-fill rating-star"></i>
            <i class="bi bi-star-fill rating-star"></i>
            <i class="bi bi-star-fill rating-star"></i>
            <i class="bi bi-star-fill rating-star"></i>
            <i class="bi bi-star-fill rating-star"></i>
        </div>
        <p class="card-text tw-text-lg">Un professionnel qui connaît parfaitement son métier et qui est digne de confiance, au TOP.<br>Très compétent dans son domaine, je ne peux que le recommander.<br>Au plaisir</p>
    </div>
</div>
*/