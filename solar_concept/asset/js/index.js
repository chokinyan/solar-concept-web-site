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
    var deployer = {
        target : "",
        is : false
    };
    $(function (){
        $("body").on("click",function(item){
            let target = item.target.id;
            switch (target) {
                case "Menu_bar_vehicule":
                    break;
                
                case "Menu_bar_vetement":
                    break;
                
                case "Menu_bar_batiment":
                    break;
                
                case _:
                    break
            }
        })
        //vehicule Menu
        $("#Menu_bar_vehicule").on("click",function(item){
            if($(".Menu_bar_vehicule_div").css("display") == "none"){
                $(".Menu_bar_vehicule_div").css("display","inline-block");
            }
            else{
                $(".Menu_bar_vehicule_div").css("display","none");
            }
        });
        //vetement Menu
        $("#Menu_bar_vetement").on("click",function(){
                if($(".Menu_bar_vetement_div").css("display") == "none"){
                    $(".Menu_bar_vetement_div").css("display","inline-block");
                }
                else{
                    $(".Menu_bar_vetement_div").css("display","none");
                }
        });
        //batiment Menu
        $("#Menu_bar_batiment").on("click",function(){
                if($(".Menu_bar_batiment_div").css("display") == "none"){
                    $(".Menu_bar_batiment_div").css("display","inline-block");
                }
                else{
                    $(".Menu_bar_batiment_div").css("display","none");
                }
        });
    })
}
