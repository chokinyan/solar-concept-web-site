function CheckDevice (){
    $(function (){
        if(navigator.userAgent.toLowerCase().includes("mobile")){
            $('p:first').text("Mobile");
        }
        else{
            $('p:first').text("Desktop");
        }
    });
};

function Carousel(){
    const CarouselAutoElement = document.getElementsByClassName("Carousel-auto");
    const observer = new MutationObserver(function(mutations){
        if(mutations.at(0).target?.classList.contains("active")){
            mutations.at(0).target.childNodes.forEach((child,_key,_parent)=>{
                if(child.nodeName === "VIDEO"){
                    child.play();
                };
            });
        }
        else if(!mutations.at(0).target?.classList.contains("active")){
            mutations.at(0).target.childNodes.forEach((child,_key,_parent)=>{
                if(child.nodeName === "VIDEO"){
                    child.pause();
                    child.currentTime = 0;
                };
            });
        };
    });
    for(let element of CarouselAutoElement){
        observer.observe(element, {
            attributes: true,
        }); 
    }
}