import React, {Component} from 'react';
import './bootstrap.min.css'
import Header from './components/Header'
import NuevaCita from './components/NuevaCita'
import ListaCitas from './components/ListaCitas'


class App extends Component {
  
  state = { 
    citas : []
   }

   /* Metodos del ciclo de vida 
    * Cuando la aplicacion carga extrae todo
    * lo que este en el storage en caso de que haya y se coloca en el state
    */
   componentDidMount() {
     const citasLS = localStorage.getItem('citas');

     if(citasLS){
       this.setState ({
         citas : JSON.parse(citasLS)
       })
     }
     
   }

   //Cuando eliminamos o agregamos una nueva cita se ejecuta
   componentDidUpdate() {
     //storage solo soporta string asique convierto el arreglo en un string compatible con localStorage
     localStorage.setItem('citas', JSON.stringify(this.state.citas));
   }

  
   crearNuevaCita = datos => {
    // copiar el state actual
    const citas = [...this.state.citas, datos];

    // agregar el nuevo state
    this.setState({ 
      citas
    })
  }
  //Eliminar las citas del state
  eliminarCita = id => {    
    // tomar una copia del state
    const citasActuales = [...this.state.citas];

   /* Utilizar filter para sacar el elemnto @id del arreglo
    * El filter retorna las citas con diferente id al seleccionado
    * y de esa forma se elimina la cita
    */
    const citas = citasActuales.filter(cita => cita.id !== id )

    // actualizar el state
    this.setState({
      citas
    })
}

  render() { 
    return ( 
      <div className="container">
        <Header titulo = "Administrador Pacientes de Veterinaria"/>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita = { this.crearNuevaCita }/>
            <div className="mt-5 col-md-10 mx-auto">
              <ListaCitas 
                citas={this.state.citas}
                eliminarCita={this.eliminarCita}
              />
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default App;