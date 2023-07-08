const ethers = require('ethers');
const { PRIVATE_KEY } = process.env;
const factoryAbi = [
    {
      "inputs": [
        {
          "internalType": "contract IPublicLockV12",
          "name": "_lockAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "SubscriptionContractDeployed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "contracts",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "deploySubscriptionContract",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lock",
      "outputs": [
        {
          "internalType": "contract IPublicLockV12",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const subscriptionAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "name": "CheckedSubscription",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "name": "GotSubscriptionExpiry",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum SubscriptionContract.SubscriptionTier",
          "name": "tier",
          "type": "uint8"
        }
      ],
      "name": "GotSubscriptionTier",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum SubscriptionContract.SubscriptionTier",
          "name": "tier",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "name": "SubscriptionPurchased",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "checkSubscription",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getSubscriptionExpiry",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getSubscriptionTier",
      "outputs": [
        {
          "internalType": "enum SubscriptionContract.SubscriptionTier",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum SubscriptionContract.SubscriptionTier",
          "name": "tier",
          "type": "uint8"
        }
      ],
      "name": "purchaseSubscription",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum SubscriptionContract.SubscriptionTier",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "subscriptionPrices",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "subscriptions",
      "outputs": [
        {
          "internalType": "enum SubscriptionContract.SubscriptionTier",
          "name": "tier",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];


const factoryAddress = '0xcbfa52c1D7d8A5cD9664130187171d1E918C8765';
const provider = ethers.getDefaultProvider('goerli');
const deployPrivateKey = PRIVATE_KEY; 
const wallet = new ethers.Wallet(deployPrivateKey, provider);

async function main() {
    const factory = new ethers.Contract(factoryAddress, factoryAbi, wallet);

    const deployTx = await factory.deploySubscriptionContract(wallet.address);
    const deployReceipt = await deployTx.wait();

    const deployEvent = deployReceipt.events.find(e => e.event === 'SubscriptionContractDeployed');
    const subscriptionAddress = deployEvent.args.contractAddress;

    const subscription = new ethers.Contract(subscriptionAddress, subscriptionAbi, wallet);

    const priceWeekly = ethers.utils.parseEther('0.01');
    const priceMonthly = ethers.utils.parseEther('0.03');
    const priceYearly = ethers.utils.parseEther('0.05');

    const weeklyTx = await subscription.purchaseSubscription(0, { value: priceWeekly });
    const weeklyReceipt = await weeklyTx.wait();
    const weeklyEvent = weeklyReceipt.events.find(e => e.event === 'SubscriptionPurchased');
    console.log('Weekly subscription purchased with expiry', weeklyEvent.args.expiry.toString());

    const monthlyTx = await subscription.purchaseSubscription(1, { value: priceMonthly });
    await monthlyTx.wait();

    const yearlyTx = await subscription.purchaseSubscription(2, { value: priceYearly });
    await yearlyTx.wait();

    const isActive = await subscription.checkSubscription(wallet.address);
    console.log('Is subscription active?', isActive);

    if (isActive) {
        const tier = await subscription.getSubscriptionTier(wallet.address);
        const expiry = new Date((await subscription.getSubscriptionExpiry(wallet.address)).toString() * 1000);
        console.log(`Subscription tier: ${tier.toString()}, expiry date: ${expiry.toISOString()}`);
    } else {
        console.log('No active subscription for this address.');
    }

}

main().catch(console.error);
