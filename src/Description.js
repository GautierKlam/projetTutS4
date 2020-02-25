import React from 'react';

class Description extends React.Component{

  constructor(props) {
      super(props);

      this.state = {
          img1: null,
          img2: null,
          img3: null,
          img4: null,
          text: "",
          adresse: ""
      }
  }

  render() {
    return(
      <div class="App-description">
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
