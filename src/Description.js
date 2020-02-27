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
        <p>{this.props.nom}</p>
        <img src={this.props.img1}/>
        <img src={this.props.img2}/>
        <img src={this.props.img3}/>
        <img src={this.props.img4}/>

        <p>{this.props.text}</p>

        <p>{this.props.adresse}</p>
      </div>
    )
  }
}

export default Description;
