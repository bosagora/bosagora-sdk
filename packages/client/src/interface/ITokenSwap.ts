import { IClientCore } from "../client-common";
import { TokenSwapTransaction } from "../interfaces";
import { BigNumberish } from "ethers";

export interface ITokenSwap {
    tokenSwap: ITokenSwapMethods;
}

/** Defines the shape of the general purpose Client class */
export interface ITokenSwapMethods extends IClientCore {
    approve: (amount: BigNumberish) => AsyncGenerator<TokenSwapTransaction>;
    swap: (amount: BigNumberish) => AsyncGenerator<TokenSwapTransaction>;
}
