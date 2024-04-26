import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
// pages & layout imports
import SiteHeader from './components/SiteHeader';
import Category from './pages/Category';
import Homepage from './pages/Homepage';
import ReviewDetails from './pages/ReviewDetails';

// apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <>
          <SiteHeader />
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route path="/details/:id" element={<ReviewDetails />}></Route>
            <Route path="/category/:id" element={<Category />}></Route>
          </Routes>
        </>
      </ApolloProvider>
    </Router>
  );
}

export default App;
