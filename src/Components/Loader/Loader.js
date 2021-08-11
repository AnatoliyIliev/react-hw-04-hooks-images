import { Component } from 'react';
import Loader from 'react-loader-spinner';
export default class Loading extends Component {
  //other logic
  render() {
    return (
      <>
        <div>Loading...</div>
        <Loader
          Loader
          type="Rings"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000} //3 secs
        />
      </>
    );
  }
}
