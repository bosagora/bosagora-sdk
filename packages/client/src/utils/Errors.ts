export class NoOldBOATokenContractAddress extends Error {
    constructor() {
        super("A old BOA token contract address is needed");
    }
}

export class NoNewBOATokenContractAddress extends Error {
    constructor() {
        super("A new BOA token contract address is needed");
    }
}

export class NoTokenSwapContractAddress extends Error {
    constructor() {
        super("A token swap contract address is needed");
    }
}

export class FailedApproveToken extends Error {
    constructor() {
        super("Failed to approve tokens");
    }
}

export class FailedSwapToken extends Error {
    constructor() {
        super("Failed to swap tokens");
    }
}
