import PropTypes from "prop-types";
import React, { Component } from "react";
import { Searchbar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    inputValue: '',
  }
  onChange = e => { 
    this.setState({ inputValue: e.target.value });
  }
  
  onSubmit = e => {
    const { inputValue } = this.state;
    e.preventDefault();
    if (inputValue.trim() === '') {
      alert('Please, enter a value.');
      return;
    }
    this.props.onSubmit(inputValue);
    this.setState({ inputValue: '' });
  }

  render() {
    const { inputValue } = this.state;
    const { onSubmit, onChange } = this;
    
    return (
      <Searchbar>
        <SearchForm
          onSubmit={onSubmit}
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
}

SearchBar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
}