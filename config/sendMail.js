var code = require('../helpers/qrcode');
var sg = require('@sendgrid/mail');
    sg.setApiKey('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');
module.exports = {
    send: function(object) {
        var images = {dp:'https://s3-eu-west-1.amazonaws.com/dplan/dplan.png',fb:'https://image.freepik.com/iconos-gratis/facebook_318-136394.jpg',tw:'https://icon-icons.com/icons2/836/PNG/128/Twitter_icon-icons.com_66803.png'};
        var codeQr = code.update_qrcode(object.reserv.codes);
        var request = {
            to: object.reserv.mail,
            from: 'contacto@dplan.co',
            subject: 'Tu código de compra en www.dplan.co',
            html: '<div style="width:500px;margin:0 auto;"><div style="margin:0 auto;width: 328px;height: 328px;">'+codeQr+'</div><h2>Detalles del código - '+object.plan.name+'</h2><h3>Estado: <span style="color:green">Activo</span></h3><h3>Fecha de compra: today</h3><h3>Cupón redimible en: '+object.reserv.dateReserv+'</h3><h3>Precio: $'+ object.reserv.mount+'</h3><h3>Cantidad: '+ object.reserv.qtyBuyed+'</h3><h3>Ubicación: '+object.plan.location.name+'</h3><div style="float:left;width:50%;text-align:center;"><a href="https://dplan.co/#!/ver-mapa/'+object.plan.location.lat+'/'+object.plan.location.lng+'" target="_blank">Ver en mapa</a></div><div style="float:left;width:50%;text-align:center;">Ver detalles</div><br><p><b>¡Que disfrutes al máximo tu plan!</b></p><div style="width:100%;height:110px"><div style="float:left;width:35%;height:80px;background-image:url('+images.dp+');background-repeat:no-repeat;padding-left:120px;padding-top: 40px;font-size:19px;color:#64dd17;">Siguenos en: </div><div style="margin-top:40px;float:left;width:20%;height:30px;background-repeat:no-repeat;background-size:contain;background-image:url('+images.fb+')"><a style="padding-left:40px" href="https://facebook.com/dpl4n" target="_blank">/dpl4n</a></div><div style="margin-top:40px;float:left;width:20%;height:30px;background-repeat:no-repeat;background-size:contain;background-image:url('+images.tw+')"><a style="padding-left:40px" href="https://twitter.com/dplan_" target="_blank">@dplan_</a></div></div><p style="font-size:10px;text-align:justify;">Recuerde imprimir o llevar este código al momento de realizar la actividad, de lo contrario no podremos verificar que usted ha comprado la entrada a la actividad. Para aplazar la actividad debe informar al correo contacto@dplan.co con mínimo dos días antes de la fecha seleccionada para realizar la actividad. No se responde por ningún reembolso una vez comprada la actividad. Para mayor información sobre planes y nuevos destinos ingresa a www.dplan.co. Dplan s.a.s es una empresa con sello colombiano, apoyado por el ministerio de las tics, Cloudbased y apps.co.</p></div>'
        };
        sg.send(request);
    }
};