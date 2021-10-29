import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../../Global';

export default class Personajes extends Component {

    state = {
        personajes: []
    }

    cargarPersonajes = () => {
        var idserie = this.props.idserie;
        var request = `api/Series/PersonajesSerie/${idserie}`;
        var url = Global.urlapi;

        axios.get(url + request).then(res=>{
            //console.log(res.data);
            this.setState({
                personajes: res.data
            });
        });
    }

    componentDidMount = () => {
        this.cargarPersonajes();
    }

    render() {
        return (
            <div className="container">
                <div className="text-center mb-3">
                    <NavLink to={"/serie/" + this.props.idserie} className="btn btn-danger">Volver</NavLink>
                </div>

                <table className="table table-success text-center">
                    <thead>
                        <tr>
                        <th scope="col">Personaje</th>
                        <th scope="col">Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.personajes.map((personaje,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{personaje.nombre}</td>
                                    <td><img src={personaje.imagen} style={{width:"150px",height:"150px"}} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
