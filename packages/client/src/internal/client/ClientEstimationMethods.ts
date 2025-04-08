import { ClientCore, Context, GasFeeEstimation, SupportedNetwork, SupportedNetworksArray } from "../../client-common";
import { IClientEstimationMethods } from "../../interface/IClientEstimation";
import { getNetwork } from "../../utils";

import { BigNumberish } from "@ethersproject/bignumber";
import { ERC20, ERC20__factory, TokenSwap, TokenSwap__factory } from "boa-contracts-lib";
import { NoProviderError, NoSignerError, UnsupportedNetworkError } from "boa-sdk-common";

export class ClientEstimationMethods extends ClientCore implements IClientEstimationMethods {
    constructor(context: Context) {
        super(context);
        Object.freeze(ClientEstimationMethods.prototype);
        Object.freeze(this);
    }

    public async approve(amount: BigNumberish): Promise<GasFeeEstimation> {
        const signer = this.web3.getConnectedSigner();
        if (!signer) {
            throw new NoSignerError();
        } else if (!signer.provider) {
            throw new NoProviderError();
        }
        const providerNetwork = await signer.provider.getNetwork();
        const network = getNetwork(providerNetwork.chainId);
        const networkName = network.name as SupportedNetwork;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const factoryInstance: ERC20 = ERC20__factory.connect(this.web3.getOldBOATokenContractAddress(), signer);
        const gasEstimation = await factoryInstance.estimateGas.approve(
            this.web3.getTokenSwapContractAddress(),
            amount
        );
        return this.web3.getApproximateGasFee(gasEstimation.toBigInt());
    }

    public async swap(amount: BigNumberish): Promise<GasFeeEstimation> {
        const signer = this.web3.getConnectedSigner();
        if (!signer) {
            throw new NoSignerError();
        } else if (!signer.provider) {
            throw new NoProviderError();
        }
        const providerNetwork = await signer.provider.getNetwork();
        const network = getNetwork(providerNetwork.chainId);
        const networkName = network.name as SupportedNetwork;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const factoryInstance: TokenSwap = TokenSwap__factory.connect(this.web3.getTokenSwapContractAddress(), signer);
        const gasEstimation = await factoryInstance.estimateGas.swap(amount);
        return this.web3.getApproximateGasFee(gasEstimation.toBigInt());
    }
}
