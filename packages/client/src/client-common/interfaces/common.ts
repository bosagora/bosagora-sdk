export enum SupportedNetwork {
    ETHEREUM_MAINNET = "homestead",
    ETHEREUM_SEPOLIA = "sepolia",
    DEVELOPMENT_NET = "devnet"
}

export const SupportedNetworksArray = Object.values(SupportedNetwork);

export type NetworkDeployment = {
    OldBOAToken: string;
    NewBOAToken: string;
    TokenSwap: string;
};

export type GasFeeEstimation = {
    average: bigint;
    max: bigint;
};
