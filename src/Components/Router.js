import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import ModificarPersonaje from './ModificarPersonaje/ModificarPersonaje';
import NuevoPersonaje from './NuevoPersonaje/NuevoPersonaje';
import Personajes from './Personajes/Personajes';
import Serie from './Serie/Serie';

export default class Router extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header /> 
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route exact path="/serie/:idserie" render={props=>{
                            var idserie = props.match.params.idserie;
                            return(<Serie idserie={idserie} />);
                        }} />

                        <Route exact path="/personajes/:idserie" render={props=>{
                            var idserie = props.match.params.idserie;
                            return(<Personajes idserie={idserie} />);
                        }} />

                        <Route exact path="/nuevopersonaje" component={NuevoPersonaje} />

                        <Route exact path="/modificarpersonaje" component={ModificarPersonaje} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
