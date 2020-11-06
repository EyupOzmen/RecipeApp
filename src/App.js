import React, { useState, useEffect } from "react";

import Recipe from "./Recipe";
import './App.css'

const App = () => {
  const APP_ID = "c0611533";
  const APP_KEY = "5b39faeb5c1dba90183acee5470b9e79";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearch(value);
    console.log(value);
  };

  const getSearch = (e) => {
    e.preventDefault();

    setQuery(search);
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          onChange={handleSearch}
          className="search-bar"
          type="text"
          value={search}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes" >
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories.toFixed(2)}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
