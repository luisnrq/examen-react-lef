import  axios  from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Global from '../../Global';

export default class Serie extends Component {

    state = {
        serie: {}
    }

    cargarSerie = () => {
        var idserie = this.props.idserie;
        var request = "api/Series/" + idserie;
        var url = Global.urlapi;

        axios.get(url + request).then(res=>{
            this.setState({
                serie: res.data
            });
        });
    }

    componentDidMount = () => {
        this.cargarSerie();
    }

    componentDidUpdate = (oldProps) => {
        if(this.props.idserie != oldProps.idserie){
            this.cargarSerie();
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center mb-4">Serie</h1>
                <div className="card mx-auto text-center" style={{width:"18rem"}}>
                <img src={this.state.serie.imagen} className="card-img-top" alt="imagenserie"/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.serie.nombre}</h5>
                    <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                    <NavLink to={"/personajes/" + this.state.serie.idSerie} className="btn btn-success">Personajes</NavLink>
                </div>
                </div>
            </div>
        )
    }
}
