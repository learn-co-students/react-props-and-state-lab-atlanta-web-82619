import React, {Component} from 'react'
import Pet from './Pet'

export default class PetBrowser extends Component {
  render() {
    const petscards = this.props.pets.map(pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet}/>
    ))

    return <div className="ui cards">{petscards}</div>
  }
}
