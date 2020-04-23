import React, { Component } from 'react';
import './SearchBar.css';
import axios from 'axios';

const STATUS = {
  STANDBY: 'STANDBY',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR'
}

class SearchBar extends Component {
  state = {
    value: '',
    data: [], 
    status: STATUS.STANDBY,
  }

  handleInput = (e) => {
    this.setState({
      value: e.currentTarget.value
    })
  }

  searchGitHub = () => {
    const { value } = this.state; 
    if(value === '') {
      alert('You have to write a value');
    } else {
        this.setState({
          status: STATUS.LOADING,
        })
        axios.get(`https://api.github.com/search/users?q=${value}`)
          .then((response) => {
            console.log(response.data)
            this.setState({
              data: response.data.items, 
              status: STATUS.LOADED,
            })
          })
          .catch((error)=> {
            this.setState({
              status: STATUS.ERROR,
            })
          })

    }
  }

  listUSers = () => {
    const { data } = this.state;
    return data.map((user, index) => {
      return <li key={index}><a href={user.html_url}>{user.login}</a></li>
    })
  }

  render(){
    const {value, status} = this.state; 
    switch(status){
      case  STATUS.STANDBY:
        console.log(status)
        return(
          <div className='Container'>
            <input className='SearchInput' type='text' value={value} onChange={this.handleInput} />
            <button className='SearchButton' onClick={this.searchGitHub}>SEARCH</button>
                  <div>
                    <ul>
                      {this.listUSers()}
                    </ul>
                  </div>
    
          </div>
        )
      case STATUS.LOADING:
        return (
        <div className='Container'>
          <input className='SearchInput' type='text' value={value} onChange={this.handleInput} />
          <button className='SearchButton' onClick={this.searchGitHub}>SEARCH</button>
          <div>
              LOADING
            <div class="loader"></div>
          </div>

        </div>
        )
      case STATUS.LOADED:
        return (
        <div className='Container'>
          <input className='SearchInput' type='text' value={value} onChange={this.handleInput} />
          <button className='SearchButton' onClick={this.searchGitHub}>SEARCH</button>
          <div>
            <ul>
              {this.listUSers()}
            </ul>
          </div>

        </div>
        )
    }
  }
}


export default SearchBar;