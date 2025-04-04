import { NetworkDeployment, SupportedNetwork } from "./interfaces/common";
import { activeContractsList } from "boa-contracts-lib";
import { Network } from "@ethersproject/networks";

export const LIVE_CONTRACTS: { [K in SupportedNetwork]: NetworkDeployment } = {
    [SupportedNetwork.ETHEREUM_MAINNET]: {
        OldBOAToken: activeContractsList.mainnet.OldBOAToken,
        NewBOAToken: activeContractsList.mainnet.NewBOAToken,
        TokenSwap: activeContractsList.mainnet.TokenSwap
    },
    [SupportedNetwork.ETHEREUM_SEPOLIA]: {
        OldBOAToken: activeContractsList.testnet.OldBOAToken,
        NewBOAToken: activeContractsList.testnet.NewBOAToken,
        TokenSwap: activeContractsList.testnet.TokenSwap
    },
    [SupportedNetwork.DEVELOPMENT_NET]: {
        OldBOAToken: activeContractsList.devnet.OldBOAToken,
        NewBOAToken: activeContractsList.devnet.NewBOAToken,
        TokenSwap: activeContractsList.devnet.TokenSwap
    }
};

export const ADDITIONAL_NETWORKS: Network[] = [
    {
        name: SupportedNetwork.DEVELOPMENT_NET,
        chainId: 24680
    }
];
