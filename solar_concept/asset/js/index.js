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

function MenuBar(){
    $(function (){
        //vehicule Menu
        $("#Menu_bar_vehicule").click(function(){
            if($(".Menu_bar_vehicule_div").css("display") == "none"){
                $(".Menu_bar_vehicule_div").css("display","inline-block");
            }
            else{
                $(".Menu_bar_vehicule_div").css("display","none");
            }
        });
        //vetement Menu
        $("#Menu_bar_vetement").hover(function(){

        },
        function(){

        });
        //batiment Menu
        $("#Menu_bar_batiment").hover(function(){

        },
        function(){

        });
    })
}
