import { ClientCore, Context, SupportedNetwork, SupportedNetworksArray } from "../../client-common";
import { ITokenSwapMethods } from "../../interface/ITokenSwap";
import { TokenSwapTransaction, NormalSteps } from "../../interfaces";
import { FailedApproveToken, FailedSwapToken, getNetwork } from "../../utils";
import { findLog } from "../../client-common/utils";

import { NoProviderError, NoSignerError, UnsupportedNetworkError } from "boa-sdk-common";
import { ERC20, ERC20__factory, TokenSwap, TokenSwap__factory } from "boa-contracts-lib";
import { BigNumberish } from "@ethersproject/bignumber";

export class TokenSwapMethods extends ClientCore implements ITokenSwapMethods {
    constructor(context: Context) {
        super(context);
        Object.freeze(TokenSwapMethods.prototype);
        Object.freeze(this);
    }

    public async *approve(amount: BigNumberish): AsyncGenerator<TokenSwapTransaction> {
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

        const signerAddress = await signer.getAddress();
        const swapContractAddress = this.web3.getTokenSwapContractAddress();
        const contract: ERC20 = ERC20__factory.connect(this.web3.getOldBOATokenContractAddress(), signer);
        const allowanceAmount = await contract.allowance(signerAddress, swapContractAddress);
        if (allowanceAmount.lt(amount)) {
            const tx = await contract.approve(swapContractAddress, amount);
            yield {
                key: NormalSteps.SENT,
                txHash: tx.hash
            };

            const cr = await tx.wait();
            const log = findLog(cr, contract.interface, "Approval");
            if (!log) {
                throw new FailedApproveToken();
            }

            yield {
                key: NormalSteps.SUCCESS
            };
        } else {
            yield {
                key: NormalSteps.SUCCESS
            };
        }
    }

    public async *swap(amount: BigNumberish): AsyncGenerator<TokenSwapTransaction> {
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

        const contract: TokenSwap = TokenSwap__factory.connect(this.web3.getTokenSwapContractAddress(), signer);

        const tx = await contract.swap(amount);
        yield {
            key: NormalSteps.SENT,
            txHash: tx.hash
        };

        const cr = await tx.wait();
        const log = findLog(cr, contract.interface, "TokenSwapped");
        if (!log) {
            throw new FailedSwapToken();
        }

        yield {
            key: NormalSteps.SUCCESS
        };
    }
}
