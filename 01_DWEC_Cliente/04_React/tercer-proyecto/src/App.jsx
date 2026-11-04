import './App.css';
import nebrijaLogo from './assets/logo-nebrija.jpeg';
import Boton from './components/Boton/Boton';
import Pantalla from './components/Pantalla/Pantalla';
import BotonClear from './components/BotonClear/BotonClear';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = useState('');
  const [nuevoCalculo, setNuevoCalculo] = useState(false);

  const operadores = ['+', '-', '*', '/'];

  const comprobarOperadores = (valor) => {
    return (operadores.includes(input[input.length-1]) && operadores.includes(valor));
  }

  const comprobarPuntosSeguidos = (valor) => { 
    return input[input.length-1] === '.' && valor === '.';
  }

  const comprobarOperadorPunto = (valor) => {
    return operadores.includes(input[input.length-1]) && valor === '.';
  }

  const comprobarPuntosDobles = (valor) => {
    if(valor !== '.'){
      return false 
    } else {
      let indiceSuma = input.lastIndexOf('+');
      let indiceResta = input.lastIndexOf('-');
      let indiceMulti = input.lastIndexOf('*');
      let indiceDiv = input.lastIndexOf('/');
      let indice = Math.max(indiceSuma,indiceResta,indiceMulti, indiceDiv);
      if(indice != -1){
        return input.slice(indice + 1, input.length).includes('.');
      } else {
        return input.includes('.');
      }
    }
  }

  const actualizarInput = (valor) => {
    if(nuevoCalculo){
      setInput(valor);
      setNuevoCalculo(false);
    }else{
      if(comprobarOperadores(valor)){
        alert('No puedes pulsar dos operadores seguidos');
      }else if (comprobarPuntosSeguidos(valor)){
        alert('No puedes pulsar dos puntos seguidos');
      }else if (comprobarPuntosDobles(valor)){
        alert('El numero ya es decimal');
      } else if (comprobarOperadorPunto(valor)){
        alert('No puedes introducir un punto tras un operador');
      } else {
        setInput(input + valor);
      }
    }
  }

  const calcularResultado = () => {
    if(input){
      setNuevoCalculo(true);
      setInput(evaluate(input));
    } else {
      alert('Por favor ingresa una operación matemática');
    }
  }

  return (
    <div className='App'>
      <div className="nebrija-logo-contenedor">
        <img 
        src={nebrijaLogo}
        alt="Logo de Instituto Nebrija"
        className='nebrija-logo' />
      </div>
      <div className="contenedor-calculadora">
        <Pantalla input = {input}></Pantalla>
        <div className="fila">
          <Boton manejarClick = {actualizarInput}>1</Boton>
          <Boton manejarClick = {actualizarInput}>2</Boton>
          <Boton manejarClick = {actualizarInput}>3</Boton>
          <Boton manejarClick = {actualizarInput}>+</Boton>
        </div>
        <div className="fila">
          <Boton manejarClick = {actualizarInput}>4</Boton>
          <Boton manejarClick = {actualizarInput}>5</Boton>
          <Boton manejarClick = {actualizarInput}>6</Boton>
          <Boton manejarClick = {actualizarInput}>-</Boton>
        </div>
        <div className="fila">
          <Boton manejarClick = {actualizarInput}>7</Boton>
          <Boton manejarClick = {actualizarInput}>8</Boton>
          <Boton manejarClick = {actualizarInput}>9</Boton>
          <Boton manejarClick = {actualizarInput}>*</Boton>
        </div>
        <div className="fila">
          <Boton manejarClick = {calcularResultado}>=</Boton>
          <Boton manejarClick = {actualizarInput}>0</Boton>
          <Boton manejarClick = {actualizarInput}>.</Boton>
          <Boton manejarClick = {actualizarInput}>/</Boton>
          
        </div>
        <div className="fila">
          <BotonClear manejarClear={() => setInput('')}>CLEAR</BotonClear>
        </div>
      </div>
    </div>
  )
}

export default App
