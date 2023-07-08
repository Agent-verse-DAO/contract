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


const factoryAddress = '0xEefC49E338857E02517d7dbff937b5A5d5F8F204';
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

    const priceYearly = ethers.utils.parseEther('0.05');

    const yearlyTx = await subscription.purchaseSubscription(2, { value: priceYearly });
    await yearlyTx.wait();

    const isActive = await subscription.checkSubscription(wallet.address);
    console.log('is subscription active?', isActive);

    if (isActive) {
        const tier = await subscription.getSubscriptionTier(wallet.address);
        const expiryTimestamp = await subscription.getSubscriptionExpiry(wallet.address);
        const expiry = expiryTimestamp.toNumber() * 1000;
        
        // Check if expiry is a valid date
        if (!isNaN(expiry)) {
            const expiryDate = new Date(expiry);
            console.log(`subscription tier: ${tier.toString()}, expiry date: ${expiryDate.toISOString()}`);
        } else {
            console.error('Error: Invalid expiry date');
        }
    } else {
        console.log('no active subscription');
    }
}

main().catch(console.error);
