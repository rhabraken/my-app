import React from "react";
import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";


const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;


function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState(null);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  React.useEffect(() => {
    fetch("/my-app/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PokemonContext.Provider
    value={{
      filter, 
      pokemon, 
      selectedPokemon, 
      filterSet, 
      pokemonSet, 
      selectedPokemonSet,
    }}
    
    >
      <PageContainer>
        <CssBaseline />
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter/>
            <PokemonTable />
          </div>
          {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>

  );
}

export default App;