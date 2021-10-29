import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Global from '../../Global';


export default class Header extends Component {

    state = {
        series: []
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


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid container">
                
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="" width="80" height="70"/>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/nuevopersonaje">Nuevo Personaje</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/modificarpersonaje">Modificar Personajes</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Series
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {
                                this.state.series.map((serie,index)=>{
                                    return(<li key={index}><NavLink className="dropdown-item" to={"/serie/" + serie.idSerie}>{serie.nombre}</NavLink></li>);
                                })
                            }
                        </ul>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
