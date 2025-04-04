import { ClientCore, Context } from "./client-common";
import { ITokenSwap, ITokenSwapMethods } from "./interface/ITokenSwap";
import { TokenSwapMethods } from "./internal/client/TokenSwapMethods";
import { IClientEstimation, IClientEstimationMethods } from "./interface/IClientEstimation";
import { ClientEstimationMethods } from "./internal/client/ClientEstimationMethods";
import { Signer } from "@ethersproject/abstract-signer";

/**
 * Provider a generic client with high level methods to manage and interact
 */
export class Client extends ClientCore implements ITokenSwap, IClientEstimation {
    private readonly privateTokenSwapMethods: ITokenSwapMethods;
    private readonly privateEstimationMethods: IClientEstimationMethods;

    constructor(context: Context) {
        super(context);
        this.privateTokenSwapMethods = new TokenSwapMethods(context);
        this.privateEstimationMethods = new ClientEstimationMethods(context);
        Object.freeze(Client.prototype);
        Object.freeze(this);
    }

    /** Replaces the current signer by the given one */
    public useSigner(signer: Signer): void {
        if (!signer) {
            throw new Error("Empty wallet or signer");
        }
        this.web3.useSigner(signer);
        this.privateTokenSwapMethods.web3.useSigner(signer);
    }

    public get tokenSwap(): ITokenSwapMethods {
        return this.privateTokenSwapMethods;
    }

    public get estimation(): IClientEstimationMethods {
        return this.privateEstimationMethods;
    }
}
