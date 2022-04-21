import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};


const style = {
  padding: "1rem",
  margin: "1rem",
  border: "0.25rem solid #9fa8da",
  textAlign: "center",
  color: "#000",
};

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, height, weight, types, sprites, abilities } = pokemon;
    const fullImageUrl = `https://static.pokemonpets.com/images/monsters-images-300-300/${id}-${name}.webp`;
    const { front_default } = sprites;
    return (
      <div  style={style}>
      <>
        <Typography variant="h3" style= {{fontSize: "7vh"}}>
          {toFirstCharUppercase(name)}
        </Typography>
        <img style={{ width: "auto", height: "30vh" }} src={fullImageUrl} />
        <Typography variant="h5" style={{color: "#000"}}>Pokemon Info</Typography>
        <Typography>Id: {id}</Typography>
        <Typography>Height: {height/10} m</Typography>
        <Typography>Weight: {weight/10} kg</Typography>
        <Typography>Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name} style={{backgroundColor: `#${TYPE_COLORS[name]}`, color: 'white', maxWidth: '30vw', margin: 'auto', textAlign: 'center'}}> {`${name}`}</Typography>;
        })}
        <Typography>Abilities:</Typography>
        {abilities.map((abilityInfo) => {
          const { ability } = abilityInfo;
          const { name } = ability;
          return <Typography key={name} style= {{display: 'inline', border: '2px solid #ffa000', marginRight: "4px", padding: "2px"}}> {`${name}`}</Typography>;
        })}
      </>
      </div>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")} style={{ display: "block", margin: "auto", backgroundColor: "#9fa8da"}}>
          back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;