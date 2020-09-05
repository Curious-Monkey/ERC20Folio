import React, { Component, Button } from 'react'
import Web3 from 'web3'

//Provide ERC20 contract address here
const Address = ' '
//Provide ABI here
const Abi = [ ]

class someERC20 extends Component {
  //"clickHandler()" handle button click
  clickHandler(e){
    //reload this component
    e.preventDefault()
    window.location.reload(false);
  }
  //Reacts componentDidMount()
  componentWillMount() {
    this.loadBlockchainData()
  }

  //Make calls to contract and load data
  async loadBlockchainData() {
    //Connect to Infure API here
    var web3 = new Web3(new Web3.providers.HttpProvider(' '));
    //Provide your Ethereum address here
    const myEthAddress = ' '
    //Combine ABI/Address into a single const "contract"
    const contract = new web3.eth.Contract(Abi, Address)
    
    //Ready to make calls now
    //1) Get contract name
    const name = await contract.methods.name().call()
    this.setState({ name })

    //2) Get contract's current eth balance
    var getBalance = await web3.eth.getBalance(Address)
    getBalance = web3.utils.fromWei(getBalance, 'ether')
    this.setState({ getBalance })

    //3) Get your Balance with "BalanceOf" function
    var balanceOf = await contract.methods.balanceOf(myEthAddress).call()
    balanceOf = web3.utils.fromWei(balanceOf, 'ether')
    this.setState({ balanceOf })
  }
  //React's Constructor
  constructor(props){
    super(props)
    this.state = {
      name: '',
      getBalance: '',
      balanceOf: ''
    }
  }
  //React's Render
  render() {
    return (
      <div className="container">
      <p>1) Contract name: {this.state.name}</p>
      <p>2) Current Balance: {this.state.getBalance} eth</p>
      <p>3) My Balance: {this.state.balanceOf} </p>
      <button onClick={this.clickHandler}>Refresh</button>
      </div>
    );
  }
};
export default someERC20;
