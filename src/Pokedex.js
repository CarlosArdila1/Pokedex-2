import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "2em",
    paddingLeft: "2em",
    paddingRight: "2em",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#9fa8da",
  },
  cardMedia: {
    margin: "auto",
    width: "8em",
    height: "8em",
  },
  cardContent: {
    textAlign: "center",
    backgroundColor: "#5c6bc0",
    maxHeight: "1.5em",
  },
  searchContainer: {
    display: "flex",
    paddingLeft: "1em",
    paddingRight: "1em",
    marginTop: "0.3em",
    marginBottom: "0.3em",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "0.25em",
    color: "#e8eaf6",
  },
  searchInput: {
    width: "12em",
    margin: "0.25em",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#3949ab" }}>
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              style={{padding: '2.5px'}}
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Search Pokemon name" 
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer} >
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;