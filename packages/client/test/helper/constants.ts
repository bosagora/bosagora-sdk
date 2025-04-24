import { ContextParams } from "../../src";

import { Wallet } from "@ethersproject/wallet";

// 0x9630fF452211Cc95BBFa32c0C4cF68eB498b8549
export const TEST_WALLET = "c48891d685be9c531b592f66da2988dc2f1e1eb83f0e6de8d9a483be221d8376";

export const contextParamsMainnet: ContextParams = {
    network: 1,
    signer: new Wallet(TEST_WALLET),
    web3Providers: ["https://eth.llamarpc.com"]
};

export const contextParamsTestnet: ContextParams = {
    network: 11155111,
    signer: new Wallet(TEST_WALLET),
    web3Providers: ["https://eth-sepolia.public.blastapi.io"]
};

export const contextParamsLocalChain: ContextParams = {
    network: 24680,
    signer: new Wallet(TEST_WALLET),
    web3Providers: ["http://localhost:8545"]
};
