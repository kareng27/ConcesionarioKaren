//funcion propia de jquery
$(document).ready(function(){
    //alert("estos funciona?")

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let did=$('.daid').eq(btn);
       let nom=$('.nom').eq(btn);
       let ape=$('.ape').eq(btn);
       let tel=$('.tel').eq(btn);
       let cor=$('.cor').eq(btn);
    
       let d=did.val();
       let n=nom.val();
       let a=ape.val();
       let t=tel.val();
       let c=cor.val();
    
       alert(d+n+a+t+c);
    
    $.ajax({
    type:"POST",
    url:'/actualizardatven',
    data:{
        dd:d,nn:n,aa:a,tt:t,cc:c
    }
    
});
        
});
    
});