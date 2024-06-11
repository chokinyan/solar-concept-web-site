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

function Test(){
    const test = document.getElementById("Test");
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
    observer.observe(test, {
        attributes: true,
    });
}