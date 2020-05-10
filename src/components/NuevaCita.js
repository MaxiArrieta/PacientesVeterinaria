import React, { Component } from 'react';
import { v1 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const stateInicial = { 
    cita : {
        mascota : '',
        propietario : '',
        fecha : '',
        hora : '',
        sintomas : '',
    },
    error : false
 }
class NuevaCita extends Component {
    state = { ...stateInicial }
     /*En este metodo lleno los campos del state con los datos que ingresa el usuario*/ 
     handleChange = e => {
        /*.taget-name es para es para ver donde esta escribiendo el usuario
         * .target.value es para saber que esta escribiendo el usuario
         */ 
        this.setState({
            cita : {
                //Copio los datos del state para que los valores previos no se borren
                ...this.state.cita,
                [ e.target.name ] : e.target.value
            }
        })
     }
     /*En este metodo guardo los datos ingresados por el usuario*/
     handleSubmit = e => {
        e.preventDefault();

        // extraer los valores del state
        const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

        // validar que todos los campos esten llenos

        if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
           this.setState({
               error: true
           });

           // detener la ejecución
           return;
        }

        // generar objeto con los datos
        const nuevaCita = {...this.state.cita};
        nuevaCita.id = uuid();

        // Agregar la cita al state de App
        this.props.crearNuevaCita(nuevaCita)

        //Colocar en el state el state Inicial
        this.setState({
            ...stateInicial
        })
        
     }


    render() { 
        //Extraer el valor del state
        const { error } =  this.state

        return ( 
            <div className = "card mt-5 py-5">
                <div className = "card-body">
                    <h2 className = "card-title text-center mb-5">
                        Llenar formulario para sacar turno
                    </h2>

                    { error ? <div className="alert alert-danger mt-2 mb-5 text-center"> Todos los
                    campos son obligatorios </div> : null }
                    {/*Evento para enviar los datos del formulario*/}
                    <form onSubmit={this.handleSubmit}>
                        <div className = "form-group row">
                            <label className = "col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                            <div className = "col-sm-8 col-lg-10">
                                <input 
                                    id="mascota"
                                    type = "text"
                                    className = "form-control"
                                    placeholder = "Nombre Mascota"
                                    name="mascota"
                                    onChange = { this.handleChange }
                                    value = { this.state.cita.mascota }
                                />
                            </div>
                        </div> {/* form-group */}

                        <div className = "form-group row">
                            <label className = "col-sm-4 col-lg-2 col-form-label">Nombre Dueño</label>
                            <div className = "col-sm-8 col-lg-10">
                                <input 
                                    type = "text"
                                    className = "form-control"
                                    placeholder = "Nombre Dueño Mascota"
                                    name="propietario"
                                    onChange = { this.handleChange }
                                    value = { this.state.cita.propietario }
                                />
                            </div>
                        </div> {/* form-group */}

                        <div className = "form-group row">
                            <label className = "col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className = "col-sm-8 col-lg-4">
                                <input 
                                    type = "date"
                                    className = "form-control"
                                    name="fecha"
                                    onChange = { this.handleChange }
                                    value = { this.state.cita.fecha }
                                />
                            </div>

                            <label className = "col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className = "col-sm-8 col-lg-4">
                                <input 
                                    type = "time"
                                    className = "form-control"
                                    name="hora"
                                    onChange = { this.handleChange }
                                    value = { this.state.cita.hora }
                                />
                            </div>
                        </div> {/* form-group */}

                        <div className = "form-group row">
                            <label className = "col-sm-4 col-lg-2 col-form-label">Síntomas</label>
                            <div className = "col-sm-8 col-lg-10">
                                <textarea
                                    className = "form-control"
                                    name = "sintomas"
                                    placeholder = "Describe los Síntomas"
                                    onChange = { this.handleChange }
                                    value =  {this.state.cita.sintomas }
                                ></textarea>
                            </div>
                        </div> {/* form-group */}

                        <input type="submit" className="py-3 mt-2 btn btn-success btn-block" value="Agregar Nuevo Turno" />
                    </form>
                </div>
            </div>
         );
    }
}

NuevaCita.propTypes = {
    crearNuevaCita : PropTypes.func.isRequired
    
}
 
export default NuevaCita;