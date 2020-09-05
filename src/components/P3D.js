import React, { Component, Button } from 'react'
import Web3 from 'web3'
import tableStyle from './styles/tableStyle.css'

//To start communicating to an ERC20 contract you need 2 things 1)Contracts address and 2)ABI
//Provide an ERC20 contract Address here
var p3dAddress = '0xB3775fB83F7D12A36E0475aBdD1FCA35c091efBe'

//Provide contract's ABI here
var p3dAbi = [ {"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethereumToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onlyAmbassadors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"administrators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthereumBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"setStakingRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_identifier","type":"bytes32"},{"name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableInitialStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"string"}],"name":"setSymbol","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"incomingEthereum","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":true,"name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokensBurned","type":"uint256"},{"indexed":false,"name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumReinvested","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"}
]

class P3D extends Component {
  //This block reacts to the "Refresh" button and refreshed the whole page
  refreshHandler = e => {
    e.preventDefault()
    window.location.reload(false); //reloads the whole window instead of this component only
  }

  componentWillMount() {
    this.loadBlockchainData()
  }

  //Make contract calls and load data to webpage here
  async loadBlockchainData() {
    //Provide infura.com API URL/token here. You can use test or main net
    const web3 = new Web3(new Web3.providers.HttpProvider(' '));
    //Provide your publick Eth key/address here
    const myEthAddress = ' '

    const contract = new web3.eth.Contract(p3dAbi, p3dAddress)

    //1) Get contract name
    const name = await contract.methods.name().call()
    //Save cont name in "name" const to pass into "state"
    this.setState({ name })

    //2) Get contract's current ETH Balance
     var getBalance = await web3.eth.getBalance(p3dAddress)
     getBalance = web3.utils.fromWei(getBalance, 'ether')
     this.setState({ getBalance })

     //3) Get my (myEthAddress) p3d Balance
     var balanceOf = await contract.methods.balanceOf(myEthAddress).call()
     balanceOf = web3.utils.fromWei(balanceOf, 'ether')
     this.setState({ balanceOf })

     //4) Get contract's Total Supply
     var totalSupply = await contract.methods.totalSupply().call()
     totalSupply = web3.utils.fromWei(totalSupply, 'ether')
     this.setState({ totalSupply })

     //5) Get Sell Price
     var sellPrice = await contract.methods.sellPrice().call()
     sellPrice = web3.utils.fromWei(sellPrice, 'ether')
     this.setState({ sellPrice })

     //6) Get Buy Price
     var buyPrice = await contract.methods.buyPrice().call()
     buyPrice = web3.utils.fromWei(buyPrice, 'ether')
     this.setState({ buyPrice })
    }

    constructor(props){
    super(props)
    this.state = {
      name: '',
      getBalance: '',
      balanceOf: '',
      totalSupply: '',
      sellPrice: '',
      buyPrice: ''
    }
  }
    //React "Renders" here, visual output taken out from "constructor" above
    render() {
    return (
      <div className="container">
        <p>1) Contract name: {this.state.name}</p>
        <p>2) Current Balance: {this.state.getBalance} eth</p>
        <p>3) My P3D Balance: {this.state.balanceOf} p3d</p>
        <p>4) Total Supply: {this.state.totalSupply} p3d</p>
        <p>5) Sell Price: {this.state.sellPrice} eth/p3d</p>
        <p>6) Buy Price: {this.state.buyPrice} eth/p3d</p>
        <p> </p>
        <button onClick={this.refreshHandler}>Refresh</button>
      </div>
    );
  }
};

export default P3D;
