import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'


import rect_loader from '../pokemon/rect_loader.gif';

import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;

`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0, 0.22);
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-user-select: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,StyledLink
    &:link,
    &:active {
        text-decoration: none;
    }
`;


export default class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonID: '',
        imageLoading: true,
        toManyRequests: false
    };
 
    async componentDidMount(){
        const url = this.props.url;  //égal à : const name = this.props.name;
        const pokemonID = url.split("/")[url.split("/").length - 2];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;

        this.setState({imageUrl, pokemonID});

        const name = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`).then(res => {
            let name = '';
            res.data.names.some(language_name => {
                if(language_name.language.name === 'fr') {
                    name = language_name.name;
                    return;
                }
            });
            this.setState({name});
        });
    }

    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5"> 
                <StyledLink to={`pokemon/${this.state.pokemonID}`}>
                    <Card className="card">
                        <div className="card-header">{this.state.pokemonID}.</div>
                            {this.state.imageLoading ?
                            (<img src={rect_loader} style={{width: "5em", height: "5em"}} className="card-img-top rounded mx-auto d-block mt-2"></img>)
                            :    null                     
                            }
                            <Sprite className="card-img-top rounded mt-2 mx-auto" 
                            src={this.state.imageUrl}
                            onLoad={() => this.setState({imageLoading: false})}
                            onError={() => this.setState({toManyRequests: true})}
                            style={
                                this.state.toManyRequests ? {display: "none"} :
                                this.state.imageLoading ? null : {display: "block"}
                            }
                            />

                            {this.state.toManyRequests ?
                            (<h6 className="mx-auto"><span className="badge badge-danger mt-2">Erreur de loading</span></h6>)
                            : null}
                        
                        <div className="card-body mx-auto my-auto">
                            <h5 className="text-capitalize">{this.state.name}</h5>   
                        </div>
                    </ Card>
                </StyledLink>
            </div>
        )
    }
}
