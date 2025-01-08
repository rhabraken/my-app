import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled"

import './App.css';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  onSelect: PropTypes.func.isRequired
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key) => (
          <tr>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        )
        )
      }
    </table>
  </div>

)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}

const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template=columns: 30% 70%;
  grid-column-gap: 1rem;
`;


function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/my-app/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data))
  }, [])

  return <div
    style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}
  >
    <Title>Pokemon Search</Title>
    <input
      value={filter}
      onChange={(evt) => filterSet(evt.target.value)}
    />
    <div>
      <TwoColumnLayout>
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) => pokemon.name.english.toLocaleLowerCase().includes(filter))
              .slice(0, 20)
              .map((pokemon) => (
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)} />
              ))}
          </tbody>
        </table>
      </TwoColumnLayout>
      {selectedItem && <PokemonInfo {...selectedItem} />}
    </div>
  </div>
}

export default App;
