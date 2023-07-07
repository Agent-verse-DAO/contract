require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/e340f393ee6a46daa7e6aed114634809",
      accounts: [PRIVATE_KEY]
    },
  }};
