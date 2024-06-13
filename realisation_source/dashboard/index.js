function fileAdd(){
    const containerImageUpload = document.getElementById('image-upload');
    const images = document.getElementById('FileUploader').files;
    for(let img of images){      
        console.log(URL.createObjectURL(img))
        containerImageUpload.innerHTML += 
        `<div class="card mb-5"><img src="${URL.createObjectURL(img)}" class="card-img-top"></div>`
    }
}

function submitAlbum(){
    const images = document.getElementById('image-upload').childNodes;
    const imagesTable = [];
    for(let img of images){
        if(img.firstChild.nodeName == 'IMG'){
            let imageBalise = img.firstChild;
            imagesTable.push(imageBalise.src);
        }
    }
    
    console.log(imagesTable);

    fetch("/albumAdd",{
        method : 'POST',
        body : "ppelin"
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