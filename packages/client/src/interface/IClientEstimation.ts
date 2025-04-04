import { GasFeeEstimation } from "../client-common/interfaces/common";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

export interface IClientEstimation {
    estimation: IClientEstimationMethods;
}

export interface IClientEstimationMethods {
    approve: (amount: BigNumberish) => Promise<GasFeeEstimation>;
    swap: (amount: BigNumberish) => Promise<GasFeeEstimation>;
}
