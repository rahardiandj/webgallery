import React from 'react';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      height:100
    }
  }

    render(){
        var {name, age, pict} = this.props;
        var {height} = this.state;
        return (
          <div>
          <h1>{name}</h1>
          <h3>{age}</h3>
          <img src={pict} height={height}  />
          <br />
          <button onClick={this.zoomPicIn.bind(this)}>+</button>
          <button onClick={this.zoomPicOut.bind(this)}>-</button>
          </div>
        )
    }
    zoomPicIn(){
      this.setState({height:this.state.height + 30});
    }
    zoomPicOut(){
      this.setState({height:this.state.height - 30});
    }
}

export default App;
