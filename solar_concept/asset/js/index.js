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
        const menuList = {
            "Menu_bar_vehicule" : ".Menu_bar_vehicule_div",
            "Menu_bar_vetement" : ".Menu_bar_vetement_div",
            "Menu_bar_batiment" : ".Menu_bar_batiment_div"
        };
        var retract = "";
        $("body").on("click",function(item){
            let target = item.target.id;
            if(retract != "" && target != retract){
                $(`${menuList[retract]}`).css("display", "none");
                retract = "";
            }
            if($(menuList[target]) !=undefined ){
                if($(`${menuList[target]}`).css("display") == "none"){
                    $(`${menuList[target]}`).css("display","inline-block");
                    retract = `${target}`;
                }
                else{
                    $(`${menuList[target]}`).css("display","none");
                    retract = "";
                }
            }
        });
    });
};
