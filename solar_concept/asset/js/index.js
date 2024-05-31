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
        $("#Menu_bar_vehicule").hover(function(){
            $(".Menu_bar_vehicule_div").slideToggle(500);
        },
        function(){
            $(".Menu_bar_vehicule_div").slideToggle(500);
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
