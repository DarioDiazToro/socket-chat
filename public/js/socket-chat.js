const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has("nombre")) {
    window.location = "index.html";
    throw new Error("El nombre es obligatorio");
}

const usuario = {
    nombre: params.get("nombre"),
}
socket.on('connect', () => {

    console.log("conectado al servidor");

    socket.emit("entrar-chat", usuario, function (resp) {
        console.log("usuarios conectados ", resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function (mensaje) {

    console.log('Servidor:', mensaje);

});