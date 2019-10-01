import React from 'react';

//Apollo Imports
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import starwars from './assets/img/star-wars.png'

//Components
import PeopleList from './components/PeopleList';
import './App.css';

//Se ejecuta un servidor local con express
const client = new ApolloClient({
  uri: 'http://localhost:59379',
});

function App() {
  return (
    <ApolloProvider client={client}> 
      <div className="App">
      <img className="starwars" src={starwars}/>
        <PeopleList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
