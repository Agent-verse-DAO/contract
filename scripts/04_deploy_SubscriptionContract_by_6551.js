const hre = require("hardhat");
const { ethers } = require('hardhat');

async function main() {
    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("deployer: ", deployer.address);

    const RegistryAddress = "0x193961D0c89a567ddc2Fa88623397e502e68c1C2";
    const ERC6551AccountAddress = "0x81f80919874Ad90D34E521f76D4F09D7C0Be138A";
    const SubscriptionFactoryAddress = "0x1C71b71FA012176aFe3847E1A2331FEdfF351C04"; 

    const Registry = await hre.ethers.getContractAt("ERC6551Registry", RegistryAddress);
    const ERC6551Account = await hre.ethers.getContractAt("ERC6551Account", ERC6551AccountAddress);
    const SubscriptionFactory = await hre.ethers.getContractAt("SubscriptionFactory", SubscriptionFactoryAddress);

    const NFTAddress = "0x2Fd5B9A60D80616F9Ea850dE5D170C3B92E5630b";
    const tokenId = 1; 

    console.log("create TokenBoundAccount");

    const newAccount = await Registry.callStatic.createAccount(
        ERC6551Account.address, 
        5, // Goerli  
        NFTAddress, 
        tokenId,  
        1, // salt
        "0x"  
    );
    console.log("TokenBoundAccount address:", newAccount);

    const balance = await ethers.provider.getBalance(newAccount);
    console.log("TokenBoundAccount balance:", balance.toString());

    console.log("Use ERC6551Account deploy subscription contract");

    const subscriptionAddress = await SubscriptionFactory.callStatic.deploySubscriptionContract(newAccount);
    console.log("Subscription contract address:", subscriptionAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
