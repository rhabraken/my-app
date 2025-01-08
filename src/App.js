import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import pokemon from './pokemon.json'

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
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
};

function App() {
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState("");
  return <div
    style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}
  >
    <h1 className='title'>Pokemon Search</h1>
    <input
      value={filter}
      onChange={(evt) => filterSet(evt.target.value)}
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridColumnGap: "1rem"
      }}>
      <div>
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
      </div>
      {selectedItem && (
        <div>
          <h1>{selectedItem.name.English}</h1>
        </div>
      )}
    </div>
  </div>
}

export default App;
