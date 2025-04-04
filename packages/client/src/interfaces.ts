import { BytesLike } from "@ethersproject/bytes";

export enum NormalSteps {
    SENT = "sent",
    SUCCESS = "success"
}

export type TokenSwapTransaction =
    | {
          key: NormalSteps.SENT;
          txHash: BytesLike;
      }
    | {
          key: NormalSteps.SUCCESS;
      };
