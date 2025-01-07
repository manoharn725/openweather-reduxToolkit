import { useGetCitySuggestionsQuery } from "../../store/api/currentWeatherApi";
import { useState } from "react";
import "./index.css";

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data = [] } = useGetCitySuggestionsQuery(term);
  const cities = data.map((data) => data.name);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (city) => {
    setTerm(city);
    onFormSubmit(term);
    setShowSuggestions(false);
    setTerm('')
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(term);
    setShowSuggestions(false); 
    setTerm('')
  };

  return (
    <div className="search-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for location"
          className="search-input"
          value={term}
          onChange={handleOnChange}
          onFocus={() => setShowSuggestions(term.length > 0)}
        />
        <button className="search-button" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      {showSuggestions && cities.length > 0 && (
        <ul className="suggestions-dropdown">
          {cities.map((city, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
