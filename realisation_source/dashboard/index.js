function fileAdd(){
    const containerImageUpload = document.getElementById('image-upload');
    const images = document.getElementById('FileUploader').files;
    for(let img of images){      
        fetch("/albumAdd",{
            method : 'POST',
            
        })
    }
}

/*
<div class="card mb-5">
    <img src="" class="card-img-top">
</div>
*/