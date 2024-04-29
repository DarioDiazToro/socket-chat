const { io } = require('../server');
const { Usuarios } = require('../../classes/usuario');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on("entrar-chat", (data, callback) => {

        console.log(data.nombre);
        if (!data.nombre) {
            return callback({
                error: true,
                msg: "El nombre es necesario"
            });
        };

        let personas = usuarios.agregarPersona(client.id, data.nombre);

        console.log(personas);
        callback(personas);

    })
});