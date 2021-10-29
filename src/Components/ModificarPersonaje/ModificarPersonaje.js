import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import { Redirect } from 'react-router';

export default class ModificarPersonaje extends Component {

    selectserie = React.createRef();
    selectpersonaje = React.createRef();

    state = {
        series: [],
        personajes: [],
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

    cargarPersonajes = () => {
        var idserie = this.props.idserie;
        var request = `/api/Personajes`;
        var url = Global.urlapi;

        axios.get(url + request).then(res=>{
            //console.log(res.data);
            this.setState({
                personajes: res.data
            });
        });
    }

    componentDidMount = () => {
        this.cargarSeries();
        this.cargarPersonajes();
    }

    modificarPersonaje = (e) => {
        e.preventDefault();
        var idserie = this.selectserie.current.value;
        var idpersonaje = this.selectpersonaje.current.value;

        var request = `/api/Personajes/${idpersonaje}/${idserie}`;
        var url = Global.urlapi;

        axios.put(url + request).then(res=>{
            console.log('Cambiado!');
            this.setState({
                idserie: idserie,
                status: true
            });
        });

    }

    render() {
        if (this.state.status == true){
            return(<Redirect to={"/personajes/" + this.state.idserie} />);
        }
        return (
            <div className="container">
                <h1 className="text-center mb-4" style={{color:"blue"}}>Personajes y Series</h1>

                <div className="card mx-auto shadow " style={{maxWidth:"550px"}}>
                    <div className="card-body">
                        <form onSubmit={this.modificarPersonaje}>
                        <div className="row">
                            <div className="col">
                                <label>Seleccione una serie:</label>
                                <select ref={this.selectserie} className="form-select" aria-label="Default select example">
                                    {
                                        this.state.series.map((serie,index)=>{
                                            return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Seleccione un Personaje:</label>
                                <select ref={this.selectpersonaje} className="form-select" aria-label="Default select example">
                                    {
                                        this.state.personajes.map((personaje,index)=>{
                                            return(<option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success mt-4">Guardar Cambios</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
