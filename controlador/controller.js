const connection=require('../conexion/conexion')
const cnn=connection();
const{render}=require('ejs')
const bcryptjs=require('bcryptjs');
const session = require('express-session');
const controller={};
controller.index=(req,res,next)=>{
    res.render('login')
    res.send("error en controlador")
}


controller.consultageneralusu=(req,res,next)=>{
 /* if(req.session.login){*/

   
    cnn.query('SELECT * FROM tbusuario',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usuario',{datos:resbd});
        }
    }) 
 /*   
}
else{
    res.redirect('/');
}*/
 }



controller.insertarusuario=async(req,res,next)=>{
//console.log(req.body)
const d=req.body.UsuId;
const u=req.body.UsuLogin;
const c=req.body.UsuPassword;
const r=req.body.UsuRolTipo;
const password=await bcryptjs.hash(c,8)

console.log(d,u);
cnn.query('INSERT INTO tbusuario SET?',{UsuId:d,UsuLogin:u,UsuPassword:password,UsuRolTipo:r},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
        //console.log(resbd);
        res.redirect('usuario')
    }
});
}

controller.login=async(req,res,next)=>{
    const usu=await req.body.usuario;
    const cla=await req.body.password;
    cnn.query('SELECT * FROM tbusuario WHERE UsuLogin=?',[usu],async(err,results)=>{
        if(results!=0){
            console.log("aaaaaaaa")
        }
        if(err){
            next(new Error("Error de consulta login",err));
        }
       // else if(results!=0 && await(bcryptjs.compare(cla,results[0].UsuPassword))){
        else if(results!=0 && await(cla,results[0].UsuPassword)){

            console.log("Datos correctos");
                 //res.redirect('usuarios');
                 rol=results[0].UsuRolTipo;
                 uss=results[0].UsuLogin;
                 dcc=results[0].UsuId;
                 req.session.login=true;
                req.session.uss = results[0].UsuLogin
                 req.session.dcc = results[0].UsuId
                 switch(rol){
                     case 'Comprador':
                        // res.redirect('vistacliente');
                         res.redirect('vistacomprador')
                     break;

                     case 'Vendedor':
                       res.redirect('vehiculos')

                     break;

                     case 'Usuario':
                         //res.redirect('creditos')
                         res.redirect('vistausuario')
                     break;

                     case 'Administrador':
                        res.redirect('datospersonales')
                    break;
                 }
        }
        else{
                 console.log("Datos incorrectos");
                 res.redirect('/');

        }
    })
}

controller.consultadatospevendedor=(req,res,next)=>{
   if(req.session.login){
        cnn.query('SELECT * FROM tbdatospersonales WHERE DatId="'+[dcc]+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("En la vista cliente")
             // res.render('vistacli')
            }
            else{
                console.log(resbd)
                res.render('datospevendedor',{datos:resbd});
            }
        }) 
   }
    else{
        res.redirect('/');
    }
}


controller.actualizardatospevendedor=(req,res,next)=>{
    const idx=req.body.dd;
    const nomx=req.body.nn;
    const apex=req.body.aa;
    const telx=req.body.tt;
    const corx=req.body.cc;
      
    cnn.query('UPDATE tbdatospersonales set DatNombre="'+nomx+'",DatApellido="'+apex+'",DatTelefono="'+telx+'",DatCorreo="'+corx+'" WHERE DatId="'+idx+'"', async(err,respbb)=>{
      
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('datospevendedor')
        }
    })
}

/*No lo estoy usando el acutalizar y eliminar pertenecen usuarios de banco*/
controller.actualizar=async(req,res,next)=>{
  const docx=req.body.dd;
  const usux=req.body.uu;
  const clax=req.body.cc;
  const rolx=req.body.rr;
  const estx=req.body.ee;
  const imgx=req.body.ii;
  const password=await bcryptjs.hash(clax,8)

  cnn.query('UPDATE tbusuarios set UsuNom="'+usux+'",UsuClave="'+password+'",UsuRol="'+rolx+'",UsuEstado="'+estx+'",UsuImagen="'+imgx+'" WHERE UsuDoc="'+docx+'"', async(err,respbb)=>{

    if(err){
        next(new Error(err));
    }
    else{
        console.log("Actualizado")
        res.redirect('usuarios')
    }
  })
}

controller.eliminar=(req,res,next)=>{
    const docm=req.body.dd;
  
    cnn.query('DELETE from tbusuarios WHERE UsuDoc="'+docm+'"', async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
      }
      else{
        console.log("Eliminado")
        res.redirect('usuarios')
      }
    })
}/*No lo estoy usando*/

/*controller.consultageneralDatosPersonales*/

controller.consultageneraldatospersonales=(req,res,next)=>{
    /*if(req.session.login){*/

   
    cnn.query('SELECT * FROM tbdatospersonales',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('datospersonales',{datos:resbd});
        }
    }) /*
}
else{
    res.redirect('/');
}*/
 }

 controller.insertardatospersonales=(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.DatId;
    const n=req.body.DatNombre;
    const a=req.body.DatApellido;
    const t=req.body.DatTipoId;
    const u=req.body.DatNumeroId;
    const e=req.body.DatTelefono;
    const c=req.body.DatCorreo;
    
    
    console.log(i,n);
    cnn.query('INSERT INTO tbdatospersonales SET?',{DatId:i,DatNombre:n,DatApellido:a,DatTipoId:t,DatNumeroId:u,DatTelefono:e,DatCorreo:c},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('datospersonales')
        }
    });
    }

/*

/*consultageneralcreditos*/
controller.consultageneralvehiculo=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbvehiculo',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('vehiculos',{datos:resbd});
        }
    }) 
   
}
else{
    res.redirect('/');
}
 }
 controller.consultageneralvehiculocate=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('categorias',{datos:resbd});
        }
    }) 
    
}
else{
    res.redirect('/');
}
 }

controller.insertarvehiculo=(req,res,next)=>{
    //console.log(req.body)
    const p=req.body.VehPlaca;
    const d=req.body.VehDatId;
    const c=req.body.VehCatId;
    const m=req.body.VehModelo;
    const a=req.body.VehMarca;
    const o=req.body.VehColor;  
    const e=req.body.VehEstado;
    const r=req.body.VehPrecio;

    
    console.log(d,c);
    cnn.query('INSERT INTO tbvehiculo SET?',{VehPlaca:p,VehDatId:d,VehCatId:c,VehModelo:m,VehMarca:a,VehColor:o,VehEstado:e,VehPrecio:r},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('vehiculos')
        }
    });
}

controller.vistacomprador=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista del comprador")
    res.render('vistacomprador')
    }
    else{
        res.redirect('/');
    }
}

controller.categoriascompra=(req,res,next)=>{
    if(req.session.login){  
     console.log("En categoriascompra")
     res.render('categoriascompra')
    }
     else{
         res.redirect('/');
     }
 }

 controller.catecamioneta=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"1"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('catecamioneta',{datos:resbd});
            }
        }) 
        
    }
    else{
        res.redirect('/');
    }
 }

 controller.cateurbano=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"2"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('cateurbano',{datos:resbd});
            }
        }) 
     
    }
    else{
        res.redirect('/');
    }
 }

 controller.catedeportivo=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"3"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('catedeportivo',{datos:resbd});
            }
        }) 
        
    }
    else{
        res.redirect('/');
    }
 }

 controller.catefurgoneta=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"4"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('catefurgoneta',{datos:resbd});
            }
        }) 
        
    }
    else{
        res.redirect('/');
    }
 }

 controller.rangoprecio=(req,res,next)=>{
    if(req.session.login){
        const i=req.body.rangomin;
        const a=req.body.rangomax;     
        console.log(i,a);
        cnn.query('SELECT * FROM tbvehiculo INNER JOIN tbdatospersonales on (VehDatId=DatId)  WHERE VehPrecio>=? AND VehPrecio<=?',[i,a],(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('rangoprecio',{datos:resbd});
            }
        }) 
     
    }
    else{
        res.redirect('/');
    }
 }

 controller.vistausuario=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista del comprador")
    res.render('vistausuario')
    }
    else{
        res.redirect('/');
    }
}

controller.consultageneralvehiculousu=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbvehiculo',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('vehiculosusu',{datos:resbd});
        }
    }) 
   
}
else{
    res.redirect('/');
}
 }

controller.insertarvehiculousu=(req,res,next)=>{
    //console.log(req.body)
    const p=req.body.VehPlaca;
    const d=req.body.VehDatId;
    const c=req.body.VehCatId;
    const m=req.body.VehModelo;
    const a=req.body.VehMarca;
    const o=req.body.VehColor;  
    const e=req.body.VehEstado;
    const r=req.body.VehPrecio;

    
    console.log(d,c);
    cnn.query('INSERT INTO tbvehiculo SET?',{VehPlaca:p,VehDatId:d,VehCatId:c,VehModelo:m,VehMarca:a,VehColor:o,VehEstado:e,VehPrecio:r},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('vehiculosusu')
        }
    });
}

controller.consultageneralvehiculocateusu=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('categoriasusu',{datos:resbd});
        }
    }) 
    
}
else{
    res.redirect('/');
}
 }

 controller.consultadatospevendedorusu=(req,res,next)=>{
    if(req.session.login){
         cnn.query('SELECT * FROM tbdatospersonales WHERE DatId="'+[dcc]+'"',(err,resbd)=>{
             if(err){
               next(new Error(err))  
               console.log("En la vista cliente")
              // res.render('vistacli')
             }
             else{
                 console.log(resbd)
                 res.render('datosvendedorusu',{datos:resbd});
             }
         }) 
     }
     else{
         res.redirect('/');
     }
 }
 controller.vistacompradorusu=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista del comprador")
    res.render('vistacompradorusu')
    }
    else{
        res.redirect('/');
    }
}


controller.rangopreciousu=(req,res,next)=>{
    if(req.session.login){
        const i=req.body.rangomin;
        const a=req.body.rangomax;     
        console.log(i,a);
        cnn.query('SELECT * FROM tbvehiculo INNER JOIN tbdatospersonales on (VehDatId=DatId)  WHERE VehPrecio>=? AND VehPrecio<=?',[i,a],(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('rangopreciousu',{datos:resbd});
            }
        }) 
     
    }
    else{
        res.redirect('/');
    }
 }


 controller.categoriascomprausu=(req,res,next)=>{
    if(req.session.login){  
     console.log("En categoriascompra")
     res.render('categoriascomprausu')
    }
     else{
         res.redirect('/');
     }
 }

 controller.catecamionetausu=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"1"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('catecamionetausu',{datos:resbd});
            }
        }) 
        
    }
    else{
        res.redirect('/');
    }
 }

 controller.cateurbanousu=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"2"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('cateurbanousu',{datos:resbd});
            }
        }) 
     
    }
    else{
        res.redirect('/');
    }
 }

 controller.catedeportivousu=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"3"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('catedeportivousu',{datos:resbd});
            }
        }) 
        
    }
    else{
        res.redirect('/');
    }
 }

 controller.catefurgonetausu=(req,res,next)=>{
    if(req.session.login){

        cnn.query('SELECT * FROM tbvehiculo WHERE VehCatId="'+"4"+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('catefurgonetausu',{datos:resbd});
            }
        }) 
        
    }
    else{
        res.redirect('/');
    }
 }


controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}

module.exports=controller;