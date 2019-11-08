import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (event) => {
    this.setState({
      filters: { ...this.state.filters, type: event.target.value }
    })
  }

  fetchPets = () => {
    let petsURL;
    if (this.state.filters.type === 'all'){
      petsURL = '/api/pets';
    } else {
      petsURL = `/api/pets?type=${this.state.filters.type}`
    }

    fetch(petsURL)
      .then(response => response.json())
      .then(pets => this.setState({ pets }))
  }

  onAdoptPet = (petID) => {
    const pets = this.state.pets.map (p => {
      return p.id === petID ? {...p, isAdopted: true } : p; 
    })
    this.setState({ pets });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={event => this.handleChangeType(event)} 
              onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={ this.state.pets } onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
