import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../../Global';

export default class NuevoPersonaje extends Component {

    cajanombre = React.createRef();
    cajaimagen = React.createRef();
    select = React.createRef();

    state = {
        series: [],
        idserie: null,
        status:false
    }

    cargarSeries = () => {
        var request = "api/Series";
        var url = Global.urlapi;

        axios.get(url + request).then(res=>{
            this.setState({
                series: res.data
            });
        });
    }

    componentDidMount = () => {
        this.cargarSeries();
    }

    insertarPersonaje = (e) => {
        e.preventDefault();
        var nombre = this.cajanombre.current.value;
        var imagen = this.cajaimagen.current.value;
        var select = parseInt(this.select.current.value);

        var request = "api/Personajes";
        var url = Global.urlapi;
        
        var nuevoPersonaje = {
            idPersonaje: 1,
            nombre: nombre,
            imagen: imagen,
            idSerie: select
        }

        console.log(nuevoPersonaje);

        axios.put(url + request,nuevoPersonaje).then(res=>{
            this.setState({
                idserie: select,
                status:true
            });
        });


    } 

    render() {
        return (
            <div className="container">
                <h1 className="text-center mb-4">Nuevo Personaje</h1>

                {
                    this.state.status == true && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>¡Añadido!</strong> Personaje insertado con exito! <NavLink to={"/personajes/" + this.state.idserie} className="alert-link">Ver personajes</NavLink>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )
                }

                <div className="card mx-auto shadow " style={{maxWidth:"550px"}}>
                    <div className="card-body">
                        <form onSubmit={this.insertarPersonaje}>
                        <div className="row">
                            <div className="col">
                                <label>Nombre:</label>
                                <input type="text" ref={this.cajanombre} className="form-control mb-3" placeholder="Introduce el nombre del personaje" required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Imagen:</label>
                                <input type="text" ref={this.cajaimagen} className="form-control mb-3" placeholder="Introduce la url de la imagen"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Serie:</label>
                                <select ref={this.select} className="form-select" aria-label="Default select example">
                                    {
                                        this.state.series.map((serie,index)=>{
                                            return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success mt-4">Insertar Personaje</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
