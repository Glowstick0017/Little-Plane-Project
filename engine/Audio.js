let audio=new Audio('background-sound.mp3');
$start.addEventListener('click', ()=>{
    
    UiController.setDisplay("none", $welcome, $ui);
        
    constantFlight = true;
    

   
    
    audio.play();



})