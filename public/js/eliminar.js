//funcion propia de jquery
$(document).ready(function(){

    $('.btneli').on('click',function(){
    
     let btn= $('.btneli').index(this);
     let doc=$('.doc').eq(btn);
    
     let d=doc.val();   

    alert(d);
    
$.ajax({
type:"POST",
url:'/eliminar',
data:{
    dd:d
}
    
});
        
});
    
});