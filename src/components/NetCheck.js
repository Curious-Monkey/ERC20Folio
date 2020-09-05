import React, { Component, Button } from 'react';
import Web3 from 'web3'

class NetCheck extends Component {

  componentWillMount() {
    this.loadBlockchainData()
  }

  //Make contract calls and load data
  async loadBlockchainData() {
    //Infure.com API key/url goes here
    var web3 = new Web3(new Web3.providers.HttpProvider(' '));
    //This code check which Ethereum network you are connected mainnet vs. testnet
    const netCheck = await web3.eth.net.getNetworkType()
    this.setState({ netCheck })

    //Testing getBlockNumber()
    const getBlockNumber = await web3.eth.getBlockNumber()
    this.setState({ getBlockNumber })
    //Thic call returns currect estimated Gas Price
    var getGasPrice = await web3.eth.getGasPrice()
    getGasPrice = web3.utils.fromWei(getGasPrice, 'Gwei')
    this.setState({ getGasPrice })
  }
  //React's constructor()
  constructor(props){
    super(props)
    this.state = {
      netCheck: '',
      getBlockNumber: '',
      getGasPrice: ''
    }
  }
    //React's render()
    render() {
    return (
      <div className="container">
        <p>-Ethereum Net-Info-</p>
        <p>Connected to: -{this.state.netCheck}- network</p>
        <p>Block #: {this.state.getBlockNumber}</p>
        <p>Gas Price: {this.state.getGasPrice} Gwei</p>
      </div>
    );
  }
};

export default NetCheck;
