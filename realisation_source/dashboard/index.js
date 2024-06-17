const imageList = [];

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,\//, ""));
    //.replace(/^data:image\/(png|jpg|jpeg);base64,\//, "")
    reader.onerror = reject;
});

async function ImageAdd(){
    const containerImageUpload = document.getElementById('image-upload');
    const images = document.getElementById('FileUploader').files;
    for(let img of images){
        imageList.push({data:await toBase64(img),name:img.name});
        containerImageUpload.innerHTML += 
        `<div class="card mb-5"><img src="${URL.createObjectURL(img)}" class="img-fluid card-img-top" id="${img.name}"></div>`
    }

}

function ImageFrontAdd(){
    const containerImageUpload = document.getElementById('image-front-upload');
    const images = document.getElementById('FileFrontUploader').files;
    containerImageUpload.innerHTML =
    `<div class="card mb-5"><img src="${URL.createObjectURL(images[0])}" class="img-fluid card-img-top"></div>`
}

async function submitAlbum(){
    const description = document.getElementById('description');
    const title = document.getElementById('title');

    const album = {
        title : title.value,
        description : description.value,
        images : imageList,
        frontImage : document.getElementById('image-front-upload')?.firstChild?.firstChild?.src || undefined,
    };

    await fetch("/albumAdd",{
        method : 'POST',
        body : JSON.stringify(album),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
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