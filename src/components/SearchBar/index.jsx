import { useSelector, useDispatch } from "react-redux";
import { fetchCitySuggestions } from "../../store/asyncThunk/weatherApi";
import { useEffect, useState } from "react";
import "./index.css";

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const { data:citySuggestions } = useSelector((state) => state.weather.citySuggestions);
  const cities = citySuggestions.map((data) => data.name);

  useEffect(() => {
    if (term.length > 0) {
      dispatch(fetchCitySuggestions(term));
    }
  }, [showSuggestions, dispatch, term]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (city) => {
    setTerm(city);
    onFormSubmit(city);
    setShowSuggestions(false);
    setTerm("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onFormSubmit(term);
    setShowSuggestions(false);
    setTerm("");
  };

  return (
    <form className="search-container" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Search for location"
        className="search-input"
        value={term}
        onChange={handleOnChange}
        onFocus={() => setShowSuggestions(term.length > 0)}
      />
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
    </form>
  );
};

export default SearchBar;
