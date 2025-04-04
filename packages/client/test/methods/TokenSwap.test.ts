import { contextParamsTestnet } from "../helper/constants";
import { BOAToken, Client, Context, NormalSteps } from "../../src";

describe("SDK Client", () => {
    let client: Client;
    beforeAll(async () => {
        const ctx = new Context(contextParamsTestnet);
        client = new Client(ctx);
    });

    it("Web3 Health Checking", async () => {
        const isUp = await client.tokenSwap.web3.isUp();
        expect(isUp).toEqual(true);
    });

    it("approve", async () => {
        const amount = BOAToken.make(10000).value;
        for await (const step of client.tokenSwap.approve(amount)) {
            switch (step.key) {
                case NormalSteps.SENT:
                    console.log(`approve: NormalSteps.SENT`);
                    expect(step.txHash).toMatch(/^0x[A-Fa-f0-9]{64}$/i);
                    break;
                case NormalSteps.SUCCESS:
                    console.log(`approve: NormalSteps.SUCCESS`);
                    break;
                default:
                    throw new Error("Unexpected step: " + JSON.stringify(step, null, 2));
            }
        }
    });

    it("swap", async () => {
        const amount = BOAToken.make(10000).value;
        for await (const step of client.tokenSwap.swap(amount)) {
            switch (step.key) {
                case NormalSteps.SENT:
                    console.log(`swap: NormalSteps.SENT`);
                    expect(step.txHash).toMatch(/^0x[A-Fa-f0-9]{64}$/i);
                    break;
                case NormalSteps.SUCCESS:
                    console.log(`swap: NormalSteps.SUCCESS`);
                    break;
                default:
                    throw new Error("Unexpected step: " + JSON.stringify(step, null, 2));
            }
        }
    });
});
