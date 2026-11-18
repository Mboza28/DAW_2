const { sequelize, Usuario, Categoria, Producto, PuntoEncuentro, Transaccion } = require('./src/models/asociaciones');

async function insertarDatos() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    await sequelize.sync({ force: true });
    console.log('Tablas sincronizadas.');


    const usuarios = await Usuario.bulkCreate([
      {
        email: 'laura.gomez@example.com',
        hash: '$2b$10$hashfalso1234567890abcdef',
        nombre_usuario: 'laura_tech',
        latitud: 40.30825040,
        longitud: -3.73239340,
        reputacion: 4.85,
        estado: 'activo',
        rol: 'premium',
        biografia: 'Vendo electrónica y componentes PC en buen estado.',
        verificado: true
      },
      {
        email: 'carlos.ruiz@example.com',
        hash: '$2b$10$hashfalso0987654321fedcba',
        nombre_usuario: 'carlos_retro',
        latitud: 40.41677540,
        longitud: -3.70379020,
        reputacion: 4.20,
        estado: 'activo',
        rol: 'usuario',
        biografia: 'Coleccionista de consolas y juegos clásicos.',
        verificado: true
      },
      {
        email: 'ana.martin@example.com',
        hash: '$2b$10$hashfalso1122334455667788',
        nombre_usuario: 'ana_sport',
        latitud: 40.32718000,
        longitud: -3.76350000,
        reputacion: 3.50,
        estado: 'activo',
        rol: 'usuario',
        biografia: 'Material de montaña y ciclismo.',
        verificado: false
      },
      {
        email: 'david.lopez@example.com',
        hash: '$2b$10$hashfalso9988776655443322',
        nombre_usuario: 'david_admin',
        latitud: 40.40000000,
        longitud: -3.68333300,
        reputacion: 5.00,
        estado: 'activo',
        rol: 'administrador',
        biografia: 'Moderación y soporte de la plataforma.',
        verificado: true
      },
      {
        email: 'sofia.perez@example.com',
        hash: '$2b$10$hashfalso5544332211009988',
        nombre_usuario: 'sofia_susp',
        latitud: 40.34500000,
        longitud: -3.82400000,
        reputacion: 1.80,
        estado: 'suspendido',
        rol: 'usuario',
        biografia: null,
        verificado: false
      }
    ]);

    const [laura, carlos, ana, david, sofia] = usuarios;

   
    const catElectronica = await Categoria.create({
      nombre: 'Electrónica',
      imagen_url: 'https://ejemplo.com/img/electronica.png',
      categoria_padre_id: null
    });

    const catDeportes = await Categoria.create({
      nombre: 'Deportes y Ocio',
      imagen_url: 'https://ejemplo.com/img/deportes.png',
      categoria_padre_id: null
    });

    const subcatInformatica = await Categoria.create({
      nombre: 'Informática y PC',
      imagen_url: 'https://ejemplo.com/img/informatica.png',
      categoria_padre_id: catElectronica.categoria_id
    });

    const subcatConsolas = await Categoria.create({
      nombre: 'Consolas y Videojuegos',
      imagen_url: 'https://ejemplo.com/img/consolas.png',
      categoria_padre_id: catElectronica.categoria_id
    });

    const subcatCiclismo = await Categoria.create({
      nombre: 'Ciclismo',
      imagen_url: 'https://ejemplo.com/img/ciclismo.png',
      categoria_padre_id: catDeportes.categoria_id
    });

    
    const puntos = await PuntoEncuentro.bulkCreate([
      {
        nombre: 'Estación Getafe Central',
        direccion: 'Plaza de la Estación s/n, Getafe',
        latitud: 40.30950000,
        longitud: -3.73320000
      },
      {
        nombre: 'Intercambiador Moncloa',
        direccion: 'Plaza de la Moncloa, Madrid',
        latitud: 40.43540000,
        longitud: -3.71920000
      },
      {
        nombre: 'Puerta del Sol - Reloj',
        direccion: 'Puerta del Sol, Madrid',
        latitud: 40.41690000,
        longitud: -3.70350000
      }
    ]);

    const [puntoGetafe, puntoMoncloa, puntoSol] = puntos;

   
    const productos = await Producto.bulkCreate([
      {
        titulo: 'Tarjeta Gráfica RTX 3060 12GB',
        descripcion: 'En perfecto estado, usada solo para gaming ocasional, con caja original.',
        precio: 220.00,
        estado_publi: 'activo',
        acepta_trueque: true,
        vendedor_id: laura.usuario_id,
        categoria_id: subcatInformatica.categoria_id,
        latitud: 40.30825040,
        longitud: -3.73239340
      },
      {
        titulo: 'Monitor Gaming 27 pulgadas 144Hz',
        descripcion: 'Panel IPS 1ms, sin píxeles muertos, incluye cable DisplayPort.',
        precio: 145.50,
        estado_publi: 'activo',
        acepta_trueque: false,
        vendedor_id: laura.usuario_id,
        categoria_id: subcatInformatica.categoria_id,
        latitud: 40.30825040,
        longitud: -3.73239340
      },
      {
        titulo: 'Nintendo Switch OLED Blanca',
        descripcion: 'Como nueva, protector de pantalla puesto desde el primer día.',
        precio: 240.00,
        estado_publi: 'reservado',
        acepta_trueque: true,
        vendedor_id: carlos.usuario_id,
        categoria_id: subcatConsolas.categoria_id,
        latitud: 40.41677540,
        longitud: -3.70379020
      },
      {
        titulo: 'Juego Zelda Tears of the Kingdom',
        descripcion: 'Edición física PAL España en perfecto estado.',
        precio: 42.00,
        estado_publi: 'vendido',
        acepta_trueque: false,
        vendedor_id: carlos.usuario_id,
        categoria_id: subcatConsolas.categoria_id,
        latitud: 40.41677540,
        longitud: -3.70379020
      },
      {
        titulo: 'Bicicleta de Montaña Rockrider 29"',
        descripcion: 'Frenos de disco hidráulicos, talla L, recién revisada.',
        precio: 310.00,
        estado_publi: 'activo',
        acepta_trueque: true,
        vendedor_id: ana.usuario_id,
        categoria_id: subcatCiclismo.categoria_id,
        latitud: 40.32718000,
        longitud: -3.76350000
      },
      {
        titulo: 'Casco Ciclismo Giro Aero',
        descripcion: 'Talla M, apenas dos salidas, muy ligero y ventilado.',
        precio: 35.00,
        estado_publi: 'activo',
        acepta_trueque: false,
        vendedor_id: ana.usuario_id,
        categoria_id: subcatCiclismo.categoria_id,
        latitud: 40.32718000,
        longitud: -3.76350000
      },
      {
        titulo: 'Teclado Mecánico Custom 65%',
        descripcion: 'Switches lineales lubricados, keycaps PBT doble inyección.',
        precio: 85.00,
        estado_publi: 'activo',
        acepta_trueque: true,
        vendedor_id: david.usuario_id,
        categoria_id: subcatInformatica.categoria_id,
        latitud: 40.40000000,
        longitud: -3.68333300
      }
    ]);

    const [rtx, monitor, switchOled, zelda, bici, casco, teclado] = productos;

    
    await Transaccion.bulkCreate([
      {
        comprador_id: laura.usuario_id,
        vendedor_id: carlos.usuario_id,
        producto_id: zelda.producto_id,
        producto_trueque_id: null,
        punto_encuentro_id: puntoSol.punto_encuentro_id,
        tipo: 'compra',
        precio_final: 40.00,
        estado: 'completada',
        tracking_code: null
      },
      {
        comprador_id: david.usuario_id,
        vendedor_id: carlos.usuario_id,
        producto_id: switchOled.producto_id,
        producto_trueque_id: rtx.producto_id,
        punto_encuentro_id: puntoMoncloa.punto_encuentro_id,
        tipo: 'trueque',
        precio_final: 20.00,
        estado: 'aceptada',
        tracking_code: null
      },
      {
        comprador_id: carlos.usuario_id,
        vendedor_id: ana.usuario_id,
        producto_id: bici.producto_id,
        producto_trueque_id: null,
        punto_encuentro_id: puntoGetafe.punto_encuentro_id,
        tipo: 'compra',
        precio_final: 295.00,
        estado: 'pendiente',
        tracking_code: null
      },
      {
        comprador_id: ana.usuario_id,
        vendedor_id: laura.usuario_id,
        producto_id: monitor.producto_id,
        producto_trueque_id: null,
        punto_encuentro_id: null,
        tipo: 'compra',
        precio_final: 145.50,
        estado: 'en_curso',
        tracking_code: 'ES20269988776655443322'
      }
    ]);

    console.log('Datos de prueba insertados con exito en la base de datos de prueba_bd');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    await sequelize.close();
    console.log('Conexion cerrada');
  }
}

insertarDatos();