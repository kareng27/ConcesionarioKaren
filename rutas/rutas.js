const express=require('express')
const rutas=express.Router();
const controller=require('../controlador/controller')

rutas.get('/',controller.index);

rutas.post('/login',controller.login);

rutas.get('/cerrar',controller.cerrar)



/*CONCESIONARIO RUTAS */
/*rutas.get('/usuario',controller.cliente)*/
rutas.post('/frminsertarusuario',controller.insertarusuario)
rutas.get('/usuario',controller.consultageneralusu);
rutas.get('/datospersonales',controller.consultageneraldatospersonales);
rutas.post('/frminsertardatos',controller.insertardatospersonales);
rutas.get('/vehiculos',controller.consultageneralvehiculo);
rutas.get('/categorias',controller.consultageneralvehiculocate);
rutas.post('/frminsertarvehiculo',controller.insertarvehiculo);
rutas.get('/datospevendedor',controller.consultadatospevendedor);
rutas.post('/actualizardatven',controller.actualizardatospevendedor);
rutas.get('/vistacomprador',controller.vistacomprador)
rutas.get('/categoriascompra',controller.categoriascompra)
rutas.get('/catecamioneta',controller.catecamioneta);
rutas.get('/cateurbano',controller.cateurbano);
rutas.get('/catedeportivo',controller.catedeportivo);
rutas.get('/catefurgoneta',controller.catefurgoneta);
rutas.get('/rangoprecio',controller.rangoprecio);
rutas.post('/frmrangoprecio',controller.rangoprecio)
rutas.get('/vistausuario',controller.vistausuario);
rutas.get('/vehiculosusu',controller.consultageneralvehiculousu);
rutas.post('/frminsertarvehiculousu',controller.insertarvehiculousu);
rutas.get('/categoriasusu',controller.consultageneralvehiculocateusu);
rutas.get('/datosvendedorusu',controller.consultadatospevendedorusu);
rutas.get('/vistacompradorusu',controller.vistacompradorusu)
rutas.get('/rangopreciousu',controller.rangopreciousu);
rutas.post('/frmrangopreciousu',controller.rangopreciousu)
rutas.get('/categoriascomprausu',controller.categoriascomprausu)
rutas.get('/catecamionetausu',controller.catecamionetausu);
rutas.get('/cateurbanousu',controller.cateurbanousu);
rutas.get('/catedeportivousu',controller.catedeportivousu);
rutas.get('/catefurgonetausu',controller.catefurgonetausu);

module.exports=rutas