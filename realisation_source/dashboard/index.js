var imageList = [];
var frontImage = undefined;

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
    reader.onerror = reject;
});

function Verification(album){
    var isComplete = true;
    Object.values(album).forEach((value,_index,_array)=>{
        if(value === undefined || value == []){
            isComplete = false;
        }
    });
    return isComplete;
    
}

async function ImageAdd(){
    const containerImageUpload = document.getElementById('image-upload');
    const images = document.getElementById('FileUploader').files;
    for(let img of images){
        imageList.push({
            data : await toBase64(img),
            name : img.name
        });
        containerImageUpload.innerHTML += 
        `<div class="card mb-5"><img src="${URL.createObjectURL(img)}" class="img-fluid card-img-top" id="${img.name}"></div>`
    }

}

async function ImageFrontAdd(){
    const containerImageUpload = document.getElementById('image-front-upload');
    const images = document.getElementById('FileFrontUploader').files;
    containerImageUpload.innerHTML =
    `<div class="card mb-5"><img src="${URL.createObjectURL(images[0])}" class="img-fluid card-img-top" id="${images[0].name}"></div>`
    frontImage = {
        data : await toBase64(images[0]),
        name : images[0].name
    };
}

async function submitAlbum(){
    const description = document.getElementById('description');
    const title = document.getElementById('title');

    const album = {
        title : title.value || undefined,
        description : description.value || undefined,
        images : imageList || undefined,
        frontImage : frontImage,
    };

    if(Verification(album)){  
        await fetch("/albumAdd",{
            method : 'POST',
            body : JSON.stringify(album),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    }
    else{
        alert("Veuillez remplir les champs manquant");
    }
}

function expendAreaText(){
    this.style.overflow = 'hidden';
    this.style.height = 0;
    this.style.height = this.scrollHeight + 'px';
}


/*
<div class="card mb-5">
    <img src="" class="card-img-top">
</div>
*/