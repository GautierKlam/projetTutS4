import React from 'react';

class Description extends React.Component{

  constructor(props) {
      super(props);

      this.state = {
          id: "",
          nom: "",
          img1: "",
          img2: "",
          img3: "",
          img4: "",
          text: "",
          adresse: ""
      }
  }

  render() {
    return(
      <div class="App-description">
        <p>{this.state.nom}</p>
        <img src={this.state.img1}/>
        <img src={this.state.img2}/>
        <img src={this.state.img3}/>
        <img src={this.state.img4}/>

        <p>{this.state.text}</p>

        <p>{this.state.adresse}</p>
      </div>
    )
  }
}

export default Description;
