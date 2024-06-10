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
    console.log("Testing");
}