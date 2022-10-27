import PropTypes from "prop-types";
import { useState } from "react";
import { Searchbar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  
  const onChange = e => {
    setInputValue(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      alert('Please, enter a value.');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  }
  return (
    <Searchbar>
        <SearchForm
          onSubmit={handleSubmit}
        >
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={onChange}
          />
        </SearchForm>
      </Searchbar>
  )
}

SearchBar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
}