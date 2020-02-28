//---------------- IMPORTATIONS
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//---------------- DEBUT CLASSE DESCRIPTION

class Description extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
          nom: "",
          img1: "",
          img2: "",
          img3: "",
          img4: "",
          text: "",
          adresse: ""
      }
  }

  //---------------- AFFICHAGE DU COMPOSANT DE DESCRIPTION

  render() {
    return(
      <div class="App-description">
      <div className="row col-md-12">
      <div className="text-center">
        <p class="mark">{this.props.nom}</p>

        <img src={this.props.img1} class="img"/>

        <img src={this.props.img2} class="img"/>
        <img src={this.props.img3} class="img"/>
        <img src={this.props.img4} class="img"/>

        <p>{this.props.text}</p>

        <p>{this.props.adresse}</p>
        </div>
      </div>
      </div>
    )
  }
}

//---------------- EXPORATION

export default Description;
