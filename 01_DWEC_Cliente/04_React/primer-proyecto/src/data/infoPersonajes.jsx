import imagenMario from '../images/mario.png'
import imagenBowser from '../images/bowser.png'
import imagenDaisy from '../images/daisy.png'
import imagenToad from '../images/toad.png'
import imagenYoshi from '../images/yoshi.png'
import imagenLuigi from '../images/luigi.png'

const infoPersonajes = [
    {   
        nombre : 'Mario',
        descripcion : 'El héroe del reino champiñon',
        texto : <>Texto descriptivo de <strong>mario</strong> que iria aqui ya tu sabes</>,
        imagen: imagenMario
    },{
        nombre : 'Bowser',
        descripcion : 'El villano del reino champiñon',
        texto : <>Texto descriptivo de bowser que iria aqui <strong>ya tu sabes</strong></>,
        imagen: imagenBowser
    },{
        nombre : 'Daisy',
        descripcion : 'La heroina del reino champiñon',
        texto : <>Texto descriptivo de Daisy que <strong>iria aqui</strong> ya tu sabes</>,
        imagen: imagenDaisy
    },{
        nombre : 'Toad',
        descripcion : 'El champiñon del reino champiñon',
        texto : <>Texto descriptivo de <strong>Toad</strong> que iria aqui ya tu sabes</>,
        imagen: imagenToad 
    },{
        nombre : 'Yoshi',
        descripcion : 'El dinosaurio del reino champiñon',
        texto : <><strong>Texto descriptivo</strong> de Yoshi que iria aqui ya tu sabes</>,
        imagen: imagenYoshi
    },
    {
        nombre : 'Luigi',
        descripcion : 'El maquinote de Luigi',
        texto : <>Texto descriptivo de <strong>Luigi que iria aqui ya tu sabes</strong></>,
        imagen: imagenLuigi
    }
]

export default infoPersonajes