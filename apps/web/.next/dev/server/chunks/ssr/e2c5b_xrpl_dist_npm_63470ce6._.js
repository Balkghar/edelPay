module.exports = [
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XRPLFaucetError = exports.NotFoundError = exports.ValidationError = exports.ResponseFormatError = exports.TimeoutError = exports.RippledNotInitializedError = exports.DisconnectedError = exports.NotConnectedError = exports.RippledError = exports.ConnectionError = exports.UnexpectedError = exports.XrplError = void 0;
class XrplError extends Error {
    constructor(message = '', data){
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.data = data;
        if (Error.captureStackTrace != null) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toString() {
        let result = `[${this.name}(${this.message}`;
        if (this.data) {
            result += `, ${JSON.stringify(this.data)}`;
        }
        result += ')]';
        return result;
    }
    inspect() {
        return this.toString();
    }
}
exports.XrplError = XrplError;
class RippledError extends XrplError {
}
exports.RippledError = RippledError;
class UnexpectedError extends XrplError {
}
exports.UnexpectedError = UnexpectedError;
class ConnectionError extends XrplError {
}
exports.ConnectionError = ConnectionError;
class NotConnectedError extends ConnectionError {
}
exports.NotConnectedError = NotConnectedError;
class DisconnectedError extends ConnectionError {
}
exports.DisconnectedError = DisconnectedError;
class RippledNotInitializedError extends ConnectionError {
}
exports.RippledNotInitializedError = RippledNotInitializedError;
class TimeoutError extends ConnectionError {
}
exports.TimeoutError = TimeoutError;
class ResponseFormatError extends ConnectionError {
}
exports.ResponseFormatError = ResponseFormatError;
class ValidationError extends XrplError {
}
exports.ValidationError = ValidationError;
class XRPLFaucetError extends XrplError {
}
exports.XRPLFaucetError = XRPLFaucetError;
class NotFoundError extends XrplError {
    constructor(message = 'Not found'){
        super(message);
    }
}
exports.NotFoundError = NotFoundError; //# sourceMappingURL=errors.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/AccountRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccountRootFlags = void 0;
var AccountRootFlags;
(function(AccountRootFlags) {
    AccountRootFlags[AccountRootFlags["lsfPasswordSpent"] = 65536] = "lsfPasswordSpent";
    AccountRootFlags[AccountRootFlags["lsfRequireDestTag"] = 131072] = "lsfRequireDestTag";
    AccountRootFlags[AccountRootFlags["lsfRequireAuth"] = 262144] = "lsfRequireAuth";
    AccountRootFlags[AccountRootFlags["lsfDisallowXRP"] = 524288] = "lsfDisallowXRP";
    AccountRootFlags[AccountRootFlags["lsfDisableMaster"] = 1048576] = "lsfDisableMaster";
    AccountRootFlags[AccountRootFlags["lsfNoFreeze"] = 2097152] = "lsfNoFreeze";
    AccountRootFlags[AccountRootFlags["lsfGlobalFreeze"] = 4194304] = "lsfGlobalFreeze";
    AccountRootFlags[AccountRootFlags["lsfDefaultRipple"] = 8388608] = "lsfDefaultRipple";
    AccountRootFlags[AccountRootFlags["lsfDepositAuth"] = 16777216] = "lsfDepositAuth";
    AccountRootFlags[AccountRootFlags["lsfAMM"] = 33554432] = "lsfAMM";
    AccountRootFlags[AccountRootFlags["lsfDisallowIncomingNFTokenOffer"] = 67108864] = "lsfDisallowIncomingNFTokenOffer";
    AccountRootFlags[AccountRootFlags["lsfDisallowIncomingCheck"] = 134217728] = "lsfDisallowIncomingCheck";
    AccountRootFlags[AccountRootFlags["lsfDisallowIncomingPayChan"] = 268435456] = "lsfDisallowIncomingPayChan";
    AccountRootFlags[AccountRootFlags["lsfDisallowIncomingTrustline"] = 536870912] = "lsfDisallowIncomingTrustline";
    AccountRootFlags[AccountRootFlags["lsfAllowTrustLineClawback"] = 2147483648] = "lsfAllowTrustLineClawback";
})(AccountRootFlags || (exports.AccountRootFlags = AccountRootFlags = {})); //# sourceMappingURL=AccountRoot.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isHex = exports.isFlagEnabled = exports.onlyHasFields = void 0;
const HEX_REGEX = /^[0-9A-Fa-f]+$/u;
function onlyHasFields(obj, fields) {
    return Object.keys(obj).every((key)=>fields.includes(key));
}
exports.onlyHasFields = onlyHasFields;
function isFlagEnabled(Flags, checkFlag) {
    return (BigInt(checkFlag) & BigInt(Flags)) === BigInt(checkFlag);
}
exports.isFlagEnabled = isFlagEnabled;
function isHex(str) {
    return HEX_REGEX.test(str);
}
exports.isHex = isHex; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseAmountValue = exports.validateBaseTransaction = exports.validateOptionalField = exports.validateRequiredField = exports.isXChainBridge = exports.isAmount = exports.isAccount = exports.isIssuedCurrency = exports.isCurrency = exports.isNumber = exports.isString = void 0;
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
const MEMO_SIZE = 3;
function isMemo(obj) {
    if (obj.Memo == null) {
        return false;
    }
    const memo = obj.Memo;
    const size = Object.keys(memo).length;
    const validData = memo.MemoData == null || typeof memo.MemoData === 'string';
    const validFormat = memo.MemoFormat == null || typeof memo.MemoFormat === 'string';
    const validType = memo.MemoType == null || typeof memo.MemoType === 'string';
    return size >= 1 && size <= MEMO_SIZE && validData && validFormat && validType && (0, utils_1.onlyHasFields)(memo, [
        'MemoFormat',
        'MemoData',
        'MemoType'
    ]);
}
const SIGNER_SIZE = 3;
function isSigner(obj) {
    const signerWrapper = obj;
    if (signerWrapper.Signer == null) {
        return false;
    }
    const signer = signerWrapper.Signer;
    return Object.keys(signer).length === SIGNER_SIZE && typeof signer.Account === 'string' && typeof signer.TxnSignature === 'string' && typeof signer.SigningPubKey === 'string';
}
const XRP_CURRENCY_SIZE = 1;
const ISSUE_SIZE = 2;
const ISSUED_CURRENCY_SIZE = 3;
const XCHAIN_BRIDGE_SIZE = 4;
function isRecord(value) {
    return value !== null && typeof value === 'object';
}
function isString(str) {
    return typeof str === 'string';
}
exports.isString = isString;
function isNumber(num) {
    return typeof num === 'number';
}
exports.isNumber = isNumber;
function isCurrency(input) {
    return isRecord(input) && (Object.keys(input).length === ISSUE_SIZE && typeof input.issuer === 'string' && typeof input.currency === 'string' || Object.keys(input).length === XRP_CURRENCY_SIZE && input.currency === 'XRP');
}
exports.isCurrency = isCurrency;
function isIssuedCurrency(input) {
    return isRecord(input) && Object.keys(input).length === ISSUED_CURRENCY_SIZE && typeof input.value === 'string' && typeof input.issuer === 'string' && typeof input.currency === 'string';
}
exports.isIssuedCurrency = isIssuedCurrency;
function isAccount(account) {
    return typeof account === 'string' && ((0, ripple_address_codec_1.isValidClassicAddress)(account) || (0, ripple_address_codec_1.isValidXAddress)(account));
}
exports.isAccount = isAccount;
function isAmount(amount) {
    return typeof amount === 'string' || isIssuedCurrency(amount);
}
exports.isAmount = isAmount;
function isXChainBridge(input) {
    return isRecord(input) && Object.keys(input).length === XCHAIN_BRIDGE_SIZE && typeof input.LockingChainDoor === 'string' && isCurrency(input.LockingChainIssue) && typeof input.IssuingChainDoor === 'string' && isCurrency(input.IssuingChainIssue);
}
exports.isXChainBridge = isXChainBridge;
function validateRequiredField(tx, paramName, checkValidity) {
    if (tx[paramName] == null) {
        throw new errors_1.ValidationError(`${tx.TransactionType}: missing field ${paramName}`);
    }
    if (!checkValidity(tx[paramName])) {
        throw new errors_1.ValidationError(`${tx.TransactionType}: invalid field ${paramName}`);
    }
}
exports.validateRequiredField = validateRequiredField;
function validateOptionalField(tx, paramName, checkValidity) {
    if (tx[paramName] !== undefined && !checkValidity(tx[paramName])) {
        throw new errors_1.ValidationError(`${tx.TransactionType}: invalid field ${paramName}`);
    }
}
exports.validateOptionalField = validateOptionalField;
function validateBaseTransaction(common) {
    if (common.TransactionType === undefined) {
        throw new errors_1.ValidationError('BaseTransaction: missing field TransactionType');
    }
    if (typeof common.TransactionType !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: TransactionType not string');
    }
    if (!ripple_binary_codec_1.TRANSACTION_TYPES.includes(common.TransactionType)) {
        throw new errors_1.ValidationError('BaseTransaction: Unknown TransactionType');
    }
    validateRequiredField(common, 'Account', isString);
    validateOptionalField(common, 'Fee', isString);
    validateOptionalField(common, 'Sequence', isNumber);
    validateOptionalField(common, 'AccountTxnID', isString);
    validateOptionalField(common, 'LastLedgerSequence', isNumber);
    const memos = common.Memos;
    if (memos !== undefined && !memos.every(isMemo)) {
        throw new errors_1.ValidationError('BaseTransaction: invalid Memos');
    }
    const signers = common.Signers;
    if (signers !== undefined && (signers.length === 0 || !signers.every(isSigner))) {
        throw new errors_1.ValidationError('BaseTransaction: invalid Signers');
    }
    validateOptionalField(common, 'SourceTag', isNumber);
    validateOptionalField(common, 'SigningPubKey', isString);
    validateOptionalField(common, 'TicketSequence', isNumber);
    validateOptionalField(common, 'TxnSignature', isString);
    validateOptionalField(common, 'NetworkID', isNumber);
}
exports.validateBaseTransaction = validateBaseTransaction;
function parseAmountValue(amount) {
    if (!isAmount(amount)) {
        return NaN;
    }
    if (typeof amount === 'string') {
        return parseFloat(amount);
    }
    return parseFloat(amount.value);
}
exports.parseAmountValue = parseAmountValue; //# sourceMappingURL=common.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/accountSet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAccountSet = exports.AccountSetTfFlags = exports.AccountSetAsfFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var AccountSetAsfFlags;
(function(AccountSetAsfFlags) {
    AccountSetAsfFlags[AccountSetAsfFlags["asfRequireDest"] = 1] = "asfRequireDest";
    AccountSetAsfFlags[AccountSetAsfFlags["asfRequireAuth"] = 2] = "asfRequireAuth";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDisallowXRP"] = 3] = "asfDisallowXRP";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDisableMaster"] = 4] = "asfDisableMaster";
    AccountSetAsfFlags[AccountSetAsfFlags["asfAccountTxnID"] = 5] = "asfAccountTxnID";
    AccountSetAsfFlags[AccountSetAsfFlags["asfNoFreeze"] = 6] = "asfNoFreeze";
    AccountSetAsfFlags[AccountSetAsfFlags["asfGlobalFreeze"] = 7] = "asfGlobalFreeze";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDefaultRipple"] = 8] = "asfDefaultRipple";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDepositAuth"] = 9] = "asfDepositAuth";
    AccountSetAsfFlags[AccountSetAsfFlags["asfAuthorizedNFTokenMinter"] = 10] = "asfAuthorizedNFTokenMinter";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDisallowIncomingNFTokenOffer"] = 12] = "asfDisallowIncomingNFTokenOffer";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDisallowIncomingCheck"] = 13] = "asfDisallowIncomingCheck";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDisallowIncomingPayChan"] = 14] = "asfDisallowIncomingPayChan";
    AccountSetAsfFlags[AccountSetAsfFlags["asfDisallowIncomingTrustline"] = 15] = "asfDisallowIncomingTrustline";
    AccountSetAsfFlags[AccountSetAsfFlags["asfAllowTrustLineClawback"] = 16] = "asfAllowTrustLineClawback";
})(AccountSetAsfFlags || (exports.AccountSetAsfFlags = AccountSetAsfFlags = {}));
var AccountSetTfFlags;
(function(AccountSetTfFlags) {
    AccountSetTfFlags[AccountSetTfFlags["tfRequireDestTag"] = 65536] = "tfRequireDestTag";
    AccountSetTfFlags[AccountSetTfFlags["tfOptionalDestTag"] = 131072] = "tfOptionalDestTag";
    AccountSetTfFlags[AccountSetTfFlags["tfRequireAuth"] = 262144] = "tfRequireAuth";
    AccountSetTfFlags[AccountSetTfFlags["tfOptionalAuth"] = 524288] = "tfOptionalAuth";
    AccountSetTfFlags[AccountSetTfFlags["tfDisallowXRP"] = 1048576] = "tfDisallowXRP";
    AccountSetTfFlags[AccountSetTfFlags["tfAllowXRP"] = 2097152] = "tfAllowXRP";
})(AccountSetTfFlags || (exports.AccountSetTfFlags = AccountSetTfFlags = {}));
const MIN_TICK_SIZE = 3;
const MAX_TICK_SIZE = 15;
function validateAccountSet(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateOptionalField)(tx, 'NFTokenMinter', common_1.isAccount);
    if (tx.ClearFlag !== undefined) {
        if (typeof tx.ClearFlag !== 'number') {
            throw new errors_1.ValidationError('AccountSet: invalid ClearFlag');
        }
        if (!Object.values(AccountSetAsfFlags).includes(tx.ClearFlag)) {
            throw new errors_1.ValidationError('AccountSet: invalid ClearFlag');
        }
    }
    if (tx.Domain !== undefined && typeof tx.Domain !== 'string') {
        throw new errors_1.ValidationError('AccountSet: invalid Domain');
    }
    if (tx.EmailHash !== undefined && typeof tx.EmailHash !== 'string') {
        throw new errors_1.ValidationError('AccountSet: invalid EmailHash');
    }
    if (tx.MessageKey !== undefined && typeof tx.MessageKey !== 'string') {
        throw new errors_1.ValidationError('AccountSet: invalid MessageKey');
    }
    if (tx.SetFlag !== undefined) {
        if (typeof tx.SetFlag !== 'number') {
            throw new errors_1.ValidationError('AccountSet: invalid SetFlag');
        }
        if (!Object.values(AccountSetAsfFlags).includes(tx.SetFlag)) {
            throw new errors_1.ValidationError('AccountSet: invalid SetFlag');
        }
    }
    if (tx.TransferRate !== undefined && typeof tx.TransferRate !== 'number') {
        throw new errors_1.ValidationError('AccountSet: invalid TransferRate');
    }
    if (tx.TickSize !== undefined) {
        if (typeof tx.TickSize !== 'number') {
            throw new errors_1.ValidationError('AccountSet: invalid TickSize');
        }
        if (tx.TickSize !== 0 && (tx.TickSize < MIN_TICK_SIZE || tx.TickSize > MAX_TICK_SIZE)) {
            throw new errors_1.ValidationError('AccountSet: invalid TickSize');
        }
    }
}
exports.validateAccountSet = validateAccountSet; //# sourceMappingURL=accountSet.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMDeposit.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAMMDeposit = exports.AMMDepositFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var AMMDepositFlags;
(function(AMMDepositFlags) {
    AMMDepositFlags[AMMDepositFlags["tfLPToken"] = 65536] = "tfLPToken";
    AMMDepositFlags[AMMDepositFlags["tfSingleAsset"] = 524288] = "tfSingleAsset";
    AMMDepositFlags[AMMDepositFlags["tfTwoAsset"] = 1048576] = "tfTwoAsset";
    AMMDepositFlags[AMMDepositFlags["tfOneAssetLPToken"] = 2097152] = "tfOneAssetLPToken";
    AMMDepositFlags[AMMDepositFlags["tfLimitLPToken"] = 4194304] = "tfLimitLPToken";
    AMMDepositFlags[AMMDepositFlags["tfTwoAssetIfEmpty"] = 8388608] = "tfTwoAssetIfEmpty";
})(AMMDepositFlags || (exports.AMMDepositFlags = AMMDepositFlags = {}));
function validateAMMDeposit(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Asset == null) {
        throw new errors_1.ValidationError('AMMDeposit: missing field Asset');
    }
    if (!(0, common_1.isCurrency)(tx.Asset)) {
        throw new errors_1.ValidationError('AMMDeposit: Asset must be a Currency');
    }
    if (tx.Asset2 == null) {
        throw new errors_1.ValidationError('AMMDeposit: missing field Asset2');
    }
    if (!(0, common_1.isCurrency)(tx.Asset2)) {
        throw new errors_1.ValidationError('AMMDeposit: Asset2 must be a Currency');
    }
    if (tx.Amount2 != null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMDeposit: must set Amount with Amount2');
    } else if (tx.EPrice != null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMDeposit: must set Amount with EPrice');
    } else if (tx.LPTokenOut == null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMDeposit: must set at least LPTokenOut or Amount');
    }
    if (tx.LPTokenOut != null && !(0, common_1.isIssuedCurrency)(tx.LPTokenOut)) {
        throw new errors_1.ValidationError('AMMDeposit: LPTokenOut must be an IssuedCurrencyAmount');
    }
    if (tx.Amount != null && !(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('AMMDeposit: Amount must be an Amount');
    }
    if (tx.Amount2 != null && !(0, common_1.isAmount)(tx.Amount2)) {
        throw new errors_1.ValidationError('AMMDeposit: Amount2 must be an Amount');
    }
    if (tx.EPrice != null && !(0, common_1.isAmount)(tx.EPrice)) {
        throw new errors_1.ValidationError('AMMDeposit: EPrice must be an Amount');
    }
}
exports.validateAMMDeposit = validateAMMDeposit; //# sourceMappingURL=AMMDeposit.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMWithdraw.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAMMWithdraw = exports.AMMWithdrawFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var AMMWithdrawFlags;
(function(AMMWithdrawFlags) {
    AMMWithdrawFlags[AMMWithdrawFlags["tfLPToken"] = 65536] = "tfLPToken";
    AMMWithdrawFlags[AMMWithdrawFlags["tfWithdrawAll"] = 131072] = "tfWithdrawAll";
    AMMWithdrawFlags[AMMWithdrawFlags["tfOneAssetWithdrawAll"] = 262144] = "tfOneAssetWithdrawAll";
    AMMWithdrawFlags[AMMWithdrawFlags["tfSingleAsset"] = 524288] = "tfSingleAsset";
    AMMWithdrawFlags[AMMWithdrawFlags["tfTwoAsset"] = 1048576] = "tfTwoAsset";
    AMMWithdrawFlags[AMMWithdrawFlags["tfOneAssetLPToken"] = 2097152] = "tfOneAssetLPToken";
    AMMWithdrawFlags[AMMWithdrawFlags["tfLimitLPToken"] = 4194304] = "tfLimitLPToken";
})(AMMWithdrawFlags || (exports.AMMWithdrawFlags = AMMWithdrawFlags = {}));
function validateAMMWithdraw(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Asset == null) {
        throw new errors_1.ValidationError('AMMWithdraw: missing field Asset');
    }
    if (!(0, common_1.isCurrency)(tx.Asset)) {
        throw new errors_1.ValidationError('AMMWithdraw: Asset must be a Currency');
    }
    if (tx.Asset2 == null) {
        throw new errors_1.ValidationError('AMMWithdraw: missing field Asset2');
    }
    if (!(0, common_1.isCurrency)(tx.Asset2)) {
        throw new errors_1.ValidationError('AMMWithdraw: Asset2 must be a Currency');
    }
    if (tx.Amount2 != null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMWithdraw: must set Amount with Amount2');
    } else if (tx.EPrice != null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMWithdraw: must set Amount with EPrice');
    }
    if (tx.LPTokenIn != null && !(0, common_1.isIssuedCurrency)(tx.LPTokenIn)) {
        throw new errors_1.ValidationError('AMMWithdraw: LPTokenIn must be an IssuedCurrencyAmount');
    }
    if (tx.Amount != null && !(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('AMMWithdraw: Amount must be an Amount');
    }
    if (tx.Amount2 != null && !(0, common_1.isAmount)(tx.Amount2)) {
        throw new errors_1.ValidationError('AMMWithdraw: Amount2 must be an Amount');
    }
    if (tx.EPrice != null && !(0, common_1.isAmount)(tx.EPrice)) {
        throw new errors_1.ValidationError('AMMWithdraw: EPrice must be an Amount');
    }
}
exports.validateAMMWithdraw = validateAMMWithdraw; //# sourceMappingURL=AMMWithdraw.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenCreateOffer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateNFTokenCreateOffer = exports.NFTokenCreateOfferFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var NFTokenCreateOfferFlags;
(function(NFTokenCreateOfferFlags) {
    NFTokenCreateOfferFlags[NFTokenCreateOfferFlags["tfSellNFToken"] = 1] = "tfSellNFToken";
})(NFTokenCreateOfferFlags || (exports.NFTokenCreateOfferFlags = NFTokenCreateOfferFlags = {}));
function validateNFTokenSellOfferCases(tx) {
    if (tx.Owner != null) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Owner must not be present for sell offers');
    }
}
function validateNFTokenBuyOfferCases(tx) {
    if (tx.Owner == null) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Owner must be present for buy offers');
    }
    if ((0, common_1.parseAmountValue)(tx.Amount) <= 0) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Amount must be greater than 0 for buy offers');
    }
}
function validateNFTokenCreateOffer(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Account === tx.Owner) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Owner and Account must not be equal');
    }
    if (tx.Account === tx.Destination) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Destination and Account must not be equal');
    }
    (0, common_1.validateOptionalField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'Owner', common_1.isAccount);
    if (tx.NFTokenID == null) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: missing field NFTokenID');
    }
    if (!(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: invalid Amount');
    }
    if (typeof tx.Flags === 'number' && (0, utils_1.isFlagEnabled)(tx.Flags, NFTokenCreateOfferFlags.tfSellNFToken)) {
        validateNFTokenSellOfferCases(tx);
    } else {
        validateNFTokenBuyOfferCases(tx);
    }
}
exports.validateNFTokenCreateOffer = validateNFTokenCreateOffer; //# sourceMappingURL=NFTokenCreateOffer.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenMint.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateNFTokenMint = exports.NFTokenMintFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var NFTokenMintFlags;
(function(NFTokenMintFlags) {
    NFTokenMintFlags[NFTokenMintFlags["tfBurnable"] = 1] = "tfBurnable";
    NFTokenMintFlags[NFTokenMintFlags["tfOnlyXRP"] = 2] = "tfOnlyXRP";
    NFTokenMintFlags[NFTokenMintFlags["tfTrustLine"] = 4] = "tfTrustLine";
    NFTokenMintFlags[NFTokenMintFlags["tfTransferable"] = 8] = "tfTransferable";
})(NFTokenMintFlags || (exports.NFTokenMintFlags = NFTokenMintFlags = {}));
function validateNFTokenMint(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Account === tx.Issuer) {
        throw new errors_1.ValidationError('NFTokenMint: Issuer must not be equal to Account');
    }
    (0, common_1.validateOptionalField)(tx, 'Issuer', common_1.isAccount);
    if (typeof tx.URI === 'string' && tx.URI === '') {
        throw new errors_1.ValidationError('NFTokenMint: URI must not be empty string');
    }
    if (typeof tx.URI === 'string' && !(0, utils_1.isHex)(tx.URI)) {
        throw new errors_1.ValidationError('NFTokenMint: URI must be in hex format');
    }
    if (tx.NFTokenTaxon == null) {
        throw new errors_1.ValidationError('NFTokenMint: missing field NFTokenTaxon');
    }
}
exports.validateNFTokenMint = validateNFTokenMint; //# sourceMappingURL=NFTokenMint.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/offerCreate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateOfferCreate = exports.OfferCreateFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var OfferCreateFlags;
(function(OfferCreateFlags) {
    OfferCreateFlags[OfferCreateFlags["tfPassive"] = 65536] = "tfPassive";
    OfferCreateFlags[OfferCreateFlags["tfImmediateOrCancel"] = 131072] = "tfImmediateOrCancel";
    OfferCreateFlags[OfferCreateFlags["tfFillOrKill"] = 262144] = "tfFillOrKill";
    OfferCreateFlags[OfferCreateFlags["tfSell"] = 524288] = "tfSell";
})(OfferCreateFlags || (exports.OfferCreateFlags = OfferCreateFlags = {}));
function validateOfferCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.TakerGets === undefined) {
        throw new errors_1.ValidationError('OfferCreate: missing field TakerGets');
    }
    if (tx.TakerPays === undefined) {
        throw new errors_1.ValidationError('OfferCreate: missing field TakerPays');
    }
    if (typeof tx.TakerGets !== 'string' && !(0, common_1.isAmount)(tx.TakerGets)) {
        throw new errors_1.ValidationError('OfferCreate: invalid TakerGets');
    }
    if (typeof tx.TakerPays !== 'string' && !(0, common_1.isAmount)(tx.TakerPays)) {
        throw new errors_1.ValidationError('OfferCreate: invalid TakerPays');
    }
    if (tx.Expiration !== undefined && typeof tx.Expiration !== 'number') {
        throw new errors_1.ValidationError('OfferCreate: invalid Expiration');
    }
    if (tx.OfferSequence !== undefined && typeof tx.OfferSequence !== 'number') {
        throw new errors_1.ValidationError('OfferCreate: invalid OfferSequence');
    }
}
exports.validateOfferCreate = validateOfferCreate; //# sourceMappingURL=offerCreate.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/payment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validatePayment = exports.PaymentFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var PaymentFlags;
(function(PaymentFlags) {
    PaymentFlags[PaymentFlags["tfNoRippleDirect"] = 65536] = "tfNoRippleDirect";
    PaymentFlags[PaymentFlags["tfPartialPayment"] = 131072] = "tfPartialPayment";
    PaymentFlags[PaymentFlags["tfLimitQuality"] = 262144] = "tfLimitQuality";
})(PaymentFlags || (exports.PaymentFlags = PaymentFlags = {}));
function validatePayment(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount === undefined) {
        throw new errors_1.ValidationError('PaymentTransaction: missing field Amount');
    }
    if (!(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('PaymentTransaction: invalid Amount');
    }
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'DestinationTag', common_1.isNumber);
    if (tx.InvoiceID !== undefined && typeof tx.InvoiceID !== 'string') {
        throw new errors_1.ValidationError('PaymentTransaction: InvoiceID must be a string');
    }
    if (tx.Paths !== undefined && !isPaths(tx.Paths)) {
        throw new errors_1.ValidationError('PaymentTransaction: invalid Paths');
    }
    if (tx.SendMax !== undefined && !(0, common_1.isAmount)(tx.SendMax)) {
        throw new errors_1.ValidationError('PaymentTransaction: invalid SendMax');
    }
    checkPartialPayment(tx);
}
exports.validatePayment = validatePayment;
function checkPartialPayment(tx) {
    var _a;
    if (tx.DeliverMin != null) {
        if (tx.Flags == null) {
            throw new errors_1.ValidationError('PaymentTransaction: tfPartialPayment flag required with DeliverMin');
        }
        const flags = tx.Flags;
        const isTfPartialPayment = typeof flags === 'number' ? (0, utils_1.isFlagEnabled)(flags, PaymentFlags.tfPartialPayment) : (_a = flags.tfPartialPayment) !== null && _a !== void 0 ? _a : false;
        if (!isTfPartialPayment) {
            throw new errors_1.ValidationError('PaymentTransaction: tfPartialPayment flag required with DeliverMin');
        }
        if (!(0, common_1.isAmount)(tx.DeliverMin)) {
            throw new errors_1.ValidationError('PaymentTransaction: invalid DeliverMin');
        }
    }
}
function isPathStep(pathStep) {
    if (pathStep.account !== undefined && typeof pathStep.account !== 'string') {
        return false;
    }
    if (pathStep.currency !== undefined && typeof pathStep.currency !== 'string') {
        return false;
    }
    if (pathStep.issuer !== undefined && typeof pathStep.issuer !== 'string') {
        return false;
    }
    if (pathStep.account !== undefined && pathStep.currency === undefined && pathStep.issuer === undefined) {
        return true;
    }
    if (pathStep.currency !== undefined || pathStep.issuer !== undefined) {
        return true;
    }
    return false;
}
function isPath(path) {
    for (const pathStep of path){
        if (!isPathStep(pathStep)) {
            return false;
        }
    }
    return true;
}
function isPaths(paths) {
    if (!Array.isArray(paths) || paths.length === 0) {
        return false;
    }
    for (const path of paths){
        if (!Array.isArray(path) || path.length === 0) {
            return false;
        }
        if (!isPath(path)) {
            return false;
        }
    }
    return true;
} //# sourceMappingURL=payment.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelClaim.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validatePaymentChannelClaim = exports.PaymentChannelClaimFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var PaymentChannelClaimFlags;
(function(PaymentChannelClaimFlags) {
    PaymentChannelClaimFlags[PaymentChannelClaimFlags["tfRenew"] = 65536] = "tfRenew";
    PaymentChannelClaimFlags[PaymentChannelClaimFlags["tfClose"] = 131072] = "tfClose";
})(PaymentChannelClaimFlags || (exports.PaymentChannelClaimFlags = PaymentChannelClaimFlags = {}));
function validatePaymentChannelClaim(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Channel === undefined) {
        throw new errors_1.ValidationError('PaymentChannelClaim: missing Channel');
    }
    if (typeof tx.Channel !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelClaim: Channel must be a string');
    }
    if (tx.Balance !== undefined && typeof tx.Balance !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelClaim: Balance must be a string');
    }
    if (tx.Amount !== undefined && typeof tx.Amount !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelClaim: Amount must be a string');
    }
    if (tx.Signature !== undefined && typeof tx.Signature !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelClaim: Signature must be a string');
    }
    if (tx.PublicKey !== undefined && typeof tx.PublicKey !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelClaim: PublicKey must be a string');
    }
}
exports.validatePaymentChannelClaim = validatePaymentChannelClaim; //# sourceMappingURL=paymentChannelClaim.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/trustSet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTrustSet = exports.TrustSetFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var TrustSetFlags;
(function(TrustSetFlags) {
    TrustSetFlags[TrustSetFlags["tfSetfAuth"] = 65536] = "tfSetfAuth";
    TrustSetFlags[TrustSetFlags["tfSetNoRipple"] = 131072] = "tfSetNoRipple";
    TrustSetFlags[TrustSetFlags["tfClearNoRipple"] = 262144] = "tfClearNoRipple";
    TrustSetFlags[TrustSetFlags["tfSetFreeze"] = 1048576] = "tfSetFreeze";
    TrustSetFlags[TrustSetFlags["tfClearFreeze"] = 2097152] = "tfClearFreeze";
})(TrustSetFlags || (exports.TrustSetFlags = TrustSetFlags = {}));
function validateTrustSet(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    const { LimitAmount, QualityIn, QualityOut } = tx;
    if (LimitAmount === undefined) {
        throw new errors_1.ValidationError('TrustSet: missing field LimitAmount');
    }
    if (!(0, common_1.isAmount)(LimitAmount)) {
        throw new errors_1.ValidationError('TrustSet: invalid LimitAmount');
    }
    if (QualityIn !== undefined && typeof QualityIn !== 'number') {
        throw new errors_1.ValidationError('TrustSet: QualityIn must be a number');
    }
    if (QualityOut !== undefined && typeof QualityOut !== 'number') {
        throw new errors_1.ValidationError('TrustSet: QualityOut must be a number');
    }
}
exports.validateTrustSet = validateTrustSet; //# sourceMappingURL=trustSet.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainModifyBridge.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainModifyBridge = exports.XChainModifyBridgeFlags = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
var XChainModifyBridgeFlags;
(function(XChainModifyBridgeFlags) {
    XChainModifyBridgeFlags[XChainModifyBridgeFlags["tfClearAccountCreateAmount"] = 65536] = "tfClearAccountCreateAmount";
})(XChainModifyBridgeFlags || (exports.XChainModifyBridgeFlags = XChainModifyBridgeFlags = {}));
function validateXChainModifyBridge(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateOptionalField)(tx, 'SignatureReward', common_1.isAmount);
    (0, common_1.validateOptionalField)(tx, 'MinAccountCreateAmount', common_1.isAmount);
}
exports.validateXChainModifyBridge = validateXChainModifyBridge; //# sourceMappingURL=XChainModifyBridge.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/flags.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTransactionFlagsToNumber = exports.parseAccountRootFlags = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const AccountRoot_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/AccountRoot.js [app-ssr] (ecmascript)");
const accountSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/accountSet.js [app-ssr] (ecmascript)");
const AMMDeposit_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMDeposit.js [app-ssr] (ecmascript)");
const AMMWithdraw_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMWithdraw.js [app-ssr] (ecmascript)");
const NFTokenCreateOffer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenCreateOffer.js [app-ssr] (ecmascript)");
const NFTokenMint_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenMint.js [app-ssr] (ecmascript)");
const offerCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/offerCreate.js [app-ssr] (ecmascript)");
const payment_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/payment.js [app-ssr] (ecmascript)");
const paymentChannelClaim_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelClaim.js [app-ssr] (ecmascript)");
const trustSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/trustSet.js [app-ssr] (ecmascript)");
const XChainModifyBridge_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainModifyBridge.js [app-ssr] (ecmascript)");
const _1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
function parseAccountRootFlags(flags) {
    const flagsInterface = {};
    Object.values(AccountRoot_1.AccountRootFlags).forEach((flag)=>{
        if (typeof flag === 'string' && (0, _1.isFlagEnabled)(flags, AccountRoot_1.AccountRootFlags[flag])) {
            flagsInterface[flag] = true;
        }
    });
    return flagsInterface;
}
exports.parseAccountRootFlags = parseAccountRootFlags;
const txToFlag = {
    AccountSet: accountSet_1.AccountSetTfFlags,
    AMMDeposit: AMMDeposit_1.AMMDepositFlags,
    AMMWithdraw: AMMWithdraw_1.AMMWithdrawFlags,
    NFTokenCreateOffer: NFTokenCreateOffer_1.NFTokenCreateOfferFlags,
    NFTokenMint: NFTokenMint_1.NFTokenMintFlags,
    OfferCreate: offerCreate_1.OfferCreateFlags,
    PaymentChannelClaim: paymentChannelClaim_1.PaymentChannelClaimFlags,
    Payment: payment_1.PaymentFlags,
    TrustSet: trustSet_1.TrustSetFlags,
    XChainModifyBridge: XChainModifyBridge_1.XChainModifyBridgeFlags
};
function setTransactionFlagsToNumber(tx) {
    if (tx.Flags == null) {
        tx.Flags = 0;
        return;
    }
    if (typeof tx.Flags === 'number') {
        return;
    }
    tx.Flags = txToFlag[tx.TransactionType] ? convertFlagsToNumber(tx.Flags, txToFlag[tx.TransactionType]) : 0;
}
exports.setTransactionFlagsToNumber = setTransactionFlagsToNumber;
function convertFlagsToNumber(flags, flagEnum) {
    return Object.keys(flags).reduce((resultFlags, flag)=>{
        if (flagEnum[flag] == null) {
            throw new errors_1.ValidationError(`flag ${flag} doesn't exist in flagEnum: ${JSON.stringify(flagEnum)}`);
        }
        return flags[flag] ? resultFlags | flagEnum[flag] : resultFlags;
    }, 0);
} //# sourceMappingURL=flags.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/submit.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLastLedgerSequence = exports.getSignedTx = exports.waitForFinalTransactionOutcome = exports.submitRequest = void 0;
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const LEDGER_CLOSE_TIME = 1000;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve)=>{
            setTimeout(resolve, ms);
        });
    });
}
function submitRequest(client, signedTransaction, failHard = false) {
    return __awaiter(this, void 0, void 0, function*() {
        if (!isSigned(signedTransaction)) {
            throw new errors_1.ValidationError('Transaction must be signed');
        }
        const signedTxEncoded = typeof signedTransaction === 'string' ? signedTransaction : (0, ripple_binary_codec_1.encode)(signedTransaction);
        const request = {
            command: 'submit',
            tx_blob: signedTxEncoded,
            fail_hard: isAccountDelete(signedTransaction) || failHard
        };
        return client.request(request);
    });
}
exports.submitRequest = submitRequest;
function waitForFinalTransactionOutcome(client, txHash, lastLedger, submissionResult) {
    return __awaiter(this, void 0, void 0, function*() {
        yield sleep(LEDGER_CLOSE_TIME);
        const latestLedger = yield client.getLedgerIndex();
        if (lastLedger < latestLedger) {
            throw new errors_1.XrplError(`The latest ledger sequence ${latestLedger} is greater than the transaction's LastLedgerSequence (${lastLedger}).\n` + `Preliminary result: ${submissionResult}`);
        }
        const txResponse = yield client.request({
            command: 'tx',
            transaction: txHash
        }).catch((error)=>__awaiter(this, void 0, void 0, function*() {
                var _a;
                const message = (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.error;
                if (message === 'txnNotFound') {
                    return waitForFinalTransactionOutcome(client, txHash, lastLedger, submissionResult);
                }
                throw new Error(`${message} \n Preliminary result: ${submissionResult}.\nFull error details: ${String(error)}`);
            }));
        if (txResponse.result.validated) {
            return txResponse;
        }
        return waitForFinalTransactionOutcome(client, txHash, lastLedger, submissionResult);
    });
}
exports.waitForFinalTransactionOutcome = waitForFinalTransactionOutcome;
function isSigned(transaction) {
    const tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
    if (typeof tx === 'string') {
        return false;
    }
    if (tx.Signers != null) {
        const signers = tx.Signers;
        for (const signer of signers){
            if (signer.Signer.SigningPubKey == null || signer.Signer.TxnSignature == null) {
                return false;
            }
        }
        return true;
    }
    return tx.SigningPubKey != null && tx.TxnSignature != null;
}
function getSignedTx(client, transaction, { autofill = true, wallet } = {}) {
    return __awaiter(this, void 0, void 0, function*() {
        if (isSigned(transaction)) {
            return transaction;
        }
        if (!wallet) {
            throw new errors_1.ValidationError('Wallet must be provided when submitting an unsigned transaction');
        }
        let tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
        if (autofill) {
            tx = yield client.autofill(tx);
        }
        return wallet.sign(tx).tx_blob;
    });
}
exports.getSignedTx = getSignedTx;
function getLastLedgerSequence(transaction) {
    const tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
    return tx.LastLedgerSequence;
}
exports.getLastLedgerSequence = getLastLedgerSequence;
function isAccountDelete(transaction) {
    const tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
    return tx.TransactionType === 'AccountDelete';
} //# sourceMappingURL=submit.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureClassicAddress = void 0;
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
function ensureClassicAddress(account) {
    if ((0, ripple_address_codec_1.isValidXAddress)(account)) {
        const { classicAddress, tag } = (0, ripple_address_codec_1.xAddressToClassicAddress)(account);
        if (tag !== false) {
            throw new Error('This command does not support the use of a tag. Use an address without a tag.');
        }
        return classicAddress;
    }
    return account;
}
exports.ensureClassicAddress = ensureClassicAddress; //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/submit.js [app-ssr] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/utils.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/derive.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deriveXAddress = exports.deriveAddress = exports.deriveKeypair = void 0;
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_keypairs_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-keypairs@2.0.0/node_modules/ripple-keypairs/dist/index.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "deriveKeypair", {
    enumerable: true,
    get: function() {
        return ripple_keypairs_1.deriveKeypair;
    }
});
Object.defineProperty(exports, "deriveAddress", {
    enumerable: true,
    get: function() {
        return ripple_keypairs_1.deriveAddress;
    }
});
function deriveXAddress(options) {
    const classicAddress = (0, ripple_keypairs_1.deriveAddress)(options.publicKey);
    return (0, ripple_address_codec_1.classicAddressToXAddress)(classicAddress, options.tag, options.test);
}
exports.deriveXAddress = deriveXAddress; //# sourceMappingURL=derive.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/collections.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.omitBy = exports.groupBy = void 0;
function groupBy(array, iteratee) {
    function predicate(acc, value, index, arrayReference) {
        const key = iteratee(value, index, arrayReference) || 0;
        const group = acc[key] || [];
        group.push(value);
        acc[key] = group;
        return acc;
    }
    return array.reduce(predicate, {});
}
exports.groupBy = groupBy;
function omitBy(obj, predicate) {
    const keys = Object.keys(obj);
    const keysToKeep = keys.filter((kb)=>!predicate(obj[kb], kb));
    return keysToKeep.reduce((acc, key)=>{
        acc[key] = obj[key];
        return acc;
    }, {});
}
exports.omitBy = omitBy; //# sourceMappingURL=collections.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/xrpConversion.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.xrpToDrops = exports.dropsToXrp = void 0;
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const DROPS_PER_XRP = 1000000.0;
const MAX_FRACTION_LENGTH = 6;
const BASE_TEN = 10;
const SANITY_CHECK = /^-?[0-9.]+$/u;
function dropsToXrp(dropsToConvert) {
    const drops = new bignumber_js_1.default(dropsToConvert).toString(BASE_TEN);
    if (typeof dropsToConvert === 'string' && drops === 'NaN') {
        throw new errors_1.ValidationError(`dropsToXrp: invalid value '${dropsToConvert}', should be a BigNumber or string-encoded number.`);
    }
    if (drops.includes('.')) {
        throw new errors_1.ValidationError(`dropsToXrp: value '${drops}' has too many decimal places.`);
    }
    if (!SANITY_CHECK.exec(drops)) {
        throw new errors_1.ValidationError(`dropsToXrp: failed sanity check -` + ` value '${drops}',` + ` does not match (^-?[0-9]+$).`);
    }
    return new bignumber_js_1.default(drops).dividedBy(DROPS_PER_XRP).toNumber();
}
exports.dropsToXrp = dropsToXrp;
function xrpToDrops(xrpToConvert) {
    const xrp = new bignumber_js_1.default(xrpToConvert).toString(BASE_TEN);
    if (typeof xrpToConvert === 'string' && xrp === 'NaN') {
        throw new errors_1.ValidationError(`xrpToDrops: invalid value '${xrpToConvert}', should be a BigNumber or string-encoded number.`);
    }
    if (!SANITY_CHECK.exec(xrp)) {
        throw new errors_1.ValidationError(`xrpToDrops: failed sanity check - value '${xrp}', does not match (^-?[0-9.]+$).`);
    }
    const components = xrp.split('.');
    if (components.length > 2) {
        throw new errors_1.ValidationError(`xrpToDrops: failed sanity check - value '${xrp}' has too many decimal points.`);
    }
    const fraction = components[1] || '0';
    if (fraction.length > MAX_FRACTION_LENGTH) {
        throw new errors_1.ValidationError(`xrpToDrops: value '${xrp}' has too many decimal places.`);
    }
    return new bignumber_js_1.default(xrp).times(DROPS_PER_XRP).integerValue(bignumber_js_1.default.ROUND_FLOOR).toString(BASE_TEN);
}
exports.xrpToDrops = xrpToDrops; //# sourceMappingURL=xrpConversion.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/getBalanceChanges.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const collections_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/collections.js [app-ssr] (ecmascript)");
const xrpConversion_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/xrpConversion.js [app-ssr] (ecmascript)");
function normalizeNode(affectedNode) {
    const diffType = Object.keys(affectedNode)[0];
    const node = affectedNode[diffType];
    return Object.assign(Object.assign({}, node), {
        NodeType: diffType,
        LedgerEntryType: node.LedgerEntryType,
        LedgerIndex: node.LedgerIndex,
        NewFields: node.NewFields,
        FinalFields: node.FinalFields,
        PreviousFields: node.PreviousFields
    });
}
function normalizeNodes(metadata) {
    if (metadata.AffectedNodes.length === 0) {
        return [];
    }
    return metadata.AffectedNodes.map(normalizeNode);
}
function groupByAccount(balanceChanges) {
    const grouped = (0, collections_1.groupBy)(balanceChanges, (node)=>node.account);
    return Object.entries(grouped).map(([account, items])=>{
        return {
            account,
            balances: items.map((item)=>item.balance)
        };
    });
}
function getValue(balance) {
    if (typeof balance === 'string') {
        return new bignumber_js_1.default(balance);
    }
    return new bignumber_js_1.default(balance.value);
}
function computeBalanceChange(node) {
    var _a, _b, _c;
    let value = null;
    if ((_a = node.NewFields) === null || _a === void 0 ? void 0 : _a.Balance) {
        value = getValue(node.NewFields.Balance);
    } else if (((_b = node.PreviousFields) === null || _b === void 0 ? void 0 : _b.Balance) && ((_c = node.FinalFields) === null || _c === void 0 ? void 0 : _c.Balance)) {
        value = getValue(node.FinalFields.Balance).minus(getValue(node.PreviousFields.Balance));
    }
    if (value === null || value.isZero()) {
        return null;
    }
    return value;
}
function getXRPQuantity(node) {
    var _a, _b, _c;
    const value = computeBalanceChange(node);
    if (value === null) {
        return null;
    }
    return {
        account: (_b = (_a = node.FinalFields) === null || _a === void 0 ? void 0 : _a.Account) !== null && _b !== void 0 ? _b : (_c = node.NewFields) === null || _c === void 0 ? void 0 : _c.Account,
        balance: {
            currency: 'XRP',
            value: (0, xrpConversion_1.dropsToXrp)(value).toString()
        }
    };
}
function flipTrustlinePerspective(balanceChange) {
    const negatedBalance = new bignumber_js_1.default(balanceChange.balance.value).negated();
    return {
        account: balanceChange.balance.issuer,
        balance: {
            issuer: balanceChange.account,
            currency: balanceChange.balance.currency,
            value: negatedBalance.toString()
        }
    };
}
function getTrustlineQuantity(node) {
    var _a, _b;
    const value = computeBalanceChange(node);
    if (value === null) {
        return null;
    }
    const fields = node.NewFields == null ? node.FinalFields : node.NewFields;
    const result = {
        account: (_a = fields === null || fields === void 0 ? void 0 : fields.LowLimit) === null || _a === void 0 ? void 0 : _a.issuer,
        balance: {
            issuer: (_b = fields === null || fields === void 0 ? void 0 : fields.HighLimit) === null || _b === void 0 ? void 0 : _b.issuer,
            currency: (fields === null || fields === void 0 ? void 0 : fields.Balance).currency,
            value: value.toString()
        }
    };
    return [
        result,
        flipTrustlinePerspective(result)
    ];
}
function getBalanceChanges(metadata) {
    const quantities = normalizeNodes(metadata).map((node)=>{
        if (node.LedgerEntryType === 'AccountRoot') {
            const xrpQuantity = getXRPQuantity(node);
            if (xrpQuantity == null) {
                return [];
            }
            return [
                xrpQuantity
            ];
        }
        if (node.LedgerEntryType === 'RippleState') {
            const trustlineQuantity = getTrustlineQuantity(node);
            if (trustlineQuantity == null) {
                return [];
            }
            return trustlineQuantity;
        }
        return [];
    });
    return groupByAccount(quantities.flat());
}
exports.default = getBalanceChanges; //# sourceMappingURL=getBalanceChanges.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/metadata.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDeletedNode = exports.isModifiedNode = exports.isCreatedNode = void 0;
function isCreatedNode(node) {
    return Object.prototype.hasOwnProperty.call(node, `CreatedNode`);
}
exports.isCreatedNode = isCreatedNode;
function isModifiedNode(node) {
    return Object.prototype.hasOwnProperty.call(node, `ModifiedNode`);
}
exports.isModifiedNode = isModifiedNode;
function isDeletedNode(node) {
    return Object.prototype.hasOwnProperty.call(node, `DeletedNode`);
}
exports.isDeletedNode = isDeletedNode; //# sourceMappingURL=metadata.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/getNFTokenID.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const metadata_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/metadata.js [app-ssr] (ecmascript)");
function ensureDecodedMeta(meta) {
    if (typeof meta === 'string') {
        return (0, ripple_binary_codec_1.decode)(meta);
    }
    return meta;
}
function getNFTokenID(meta) {
    if (typeof meta !== 'string' && (meta === null || meta === void 0 ? void 0 : meta.AffectedNodes) === undefined) {
        throw new TypeError(`Unable to parse the parameter given to getNFTokenID.
      'meta' must be the metadata from an NFTokenMint transaction. Received ${JSON.stringify(meta)} instead.`);
    }
    const decodedMeta = ensureDecodedMeta(meta);
    const affectedNodes = decodedMeta.AffectedNodes.filter((node)=>{
        var _a;
        if ((0, metadata_1.isCreatedNode)(node)) {
            return node.CreatedNode.LedgerEntryType === 'NFTokenPage';
        }
        if ((0, metadata_1.isModifiedNode)(node)) {
            return node.ModifiedNode.LedgerEntryType === 'NFTokenPage' && Boolean((_a = node.ModifiedNode.PreviousFields) === null || _a === void 0 ? void 0 : _a.NFTokens);
        }
        return false;
    });
    const previousTokenIDSet = new Set(affectedNodes.flatMap((node)=>{
        var _a;
        const nftokens = (0, metadata_1.isModifiedNode)(node) ? (_a = node.ModifiedNode.PreviousFields) === null || _a === void 0 ? void 0 : _a.NFTokens : [];
        return nftokens.map((token)=>token.NFToken.NFTokenID);
    }).filter((id)=>Boolean(id)));
    const finalTokenIDs = affectedNodes.flatMap((node)=>{
        var _a, _b, _c, _d, _e, _f;
        return ((_f = (_c = (_b = (_a = node.ModifiedNode) === null || _a === void 0 ? void 0 : _a.FinalFields) === null || _b === void 0 ? void 0 : _b.NFTokens) !== null && _c !== void 0 ? _c : (_e = (_d = node.CreatedNode) === null || _d === void 0 ? void 0 : _d.NewFields) === null || _e === void 0 ? void 0 : _e.NFTokens) !== null && _f !== void 0 ? _f : []).map((token)=>token.NFToken.NFTokenID);
    }).filter((nftokenID)=>Boolean(nftokenID));
    const nftokenID = finalTokenIDs.find((id)=>!previousTokenIDSet.has(id));
    return nftokenID;
}
exports.default = getNFTokenID; //# sourceMappingURL=getNFTokenID.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/getXChainClaimID.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const metadata_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/metadata.js [app-ssr] (ecmascript)");
function ensureDecodedMeta(meta) {
    if (typeof meta === 'string') {
        return (0, ripple_binary_codec_1.decode)(meta);
    }
    return meta;
}
function getXChainClaimID(meta) {
    if (typeof meta !== 'string' && (meta === null || meta === void 0 ? void 0 : meta.AffectedNodes) === undefined) {
        throw new TypeError(`Unable to parse the parameter given to getXChainClaimID.
      'meta' must be the metadata from an XChainCreateClaimID transaction. Received ${JSON.stringify(meta)} instead.`);
    }
    const decodedMeta = ensureDecodedMeta(meta);
    if (!decodedMeta.TransactionResult) {
        throw new TypeError('Cannot get XChainClaimID from un-validated transaction');
    }
    if (decodedMeta.TransactionResult !== 'tesSUCCESS') {
        return undefined;
    }
    const createdNode = decodedMeta.AffectedNodes.find((node)=>(0, metadata_1.isCreatedNode)(node) && node.CreatedNode.LedgerEntryType === 'XChainOwnedClaimID');
    return createdNode.CreatedNode.NewFields.XChainClaimID;
}
exports.default = getXChainClaimID; //# sourceMappingURL=getXChainClaimID.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/HashPrefix.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var HashPrefix;
(function(HashPrefix) {
    HashPrefix[HashPrefix["TRANSACTION_ID"] = 1415073280] = "TRANSACTION_ID";
    HashPrefix[HashPrefix["TRANSACTION_NODE"] = 1397638144] = "TRANSACTION_NODE";
    HashPrefix[HashPrefix["INNER_NODE"] = 1296649728] = "INNER_NODE";
    HashPrefix[HashPrefix["LEAF_NODE"] = 1296846336] = "LEAF_NODE";
    HashPrefix[HashPrefix["TRANSACTION_SIGN"] = 1398036480] = "TRANSACTION_SIGN";
    HashPrefix[HashPrefix["TRANSACTION_SIGN_TESTNET"] = 1937012736] = "TRANSACTION_SIGN_TESTNET";
    HashPrefix[HashPrefix["TRANSACTION_MULTISIGN"] = 1397576704] = "TRANSACTION_MULTISIGN";
    HashPrefix[HashPrefix["LEDGER"] = 1280791040] = "LEDGER";
})(HashPrefix || (HashPrefix = {}));
exports.default = HashPrefix; //# sourceMappingURL=HashPrefix.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/sha512Half.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const sha512_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/sha512/index.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const HASH_BYTES = 32;
function sha512Half(hex) {
    return (0, utils_1.bytesToHex)((0, sha512_1.sha512)((0, utils_1.hexToBytes)(hex)).slice(0, HASH_BYTES));
}
exports.default = sha512Half; //# sourceMappingURL=sha512Half.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/node.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Node = exports.NodeType = void 0;
var NodeType;
(function(NodeType) {
    NodeType[NodeType["INNER"] = 1] = "INNER";
    NodeType[NodeType["TRANSACTION_NO_METADATA"] = 2] = "TRANSACTION_NO_METADATA";
    NodeType[NodeType["TRANSACTION_METADATA"] = 3] = "TRANSACTION_METADATA";
    NodeType[NodeType["ACCOUNT_STATE"] = 4] = "ACCOUNT_STATE";
})(NodeType || (exports.NodeType = NodeType = {}));
class Node {
}
exports.Node = Node; //# sourceMappingURL=node.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/LeafNode.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const HashPrefix_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/HashPrefix.js [app-ssr] (ecmascript)"));
const sha512Half_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/sha512Half.js [app-ssr] (ecmascript)"));
const node_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/node.js [app-ssr] (ecmascript)");
const HEX = 16;
class LeafNode extends node_1.Node {
    constructor(tag, data, type){
        super();
        this.tag = tag;
        this.type = type;
        this.data = data;
    }
    get hash() {
        switch(this.type){
            case node_1.NodeType.ACCOUNT_STATE:
                {
                    const leafPrefix = HashPrefix_1.default.LEAF_NODE.toString(HEX);
                    return (0, sha512Half_1.default)(leafPrefix + this.data + this.tag);
                }
            case node_1.NodeType.TRANSACTION_NO_METADATA:
                {
                    const txIDPrefix = HashPrefix_1.default.TRANSACTION_ID.toString(HEX);
                    return (0, sha512Half_1.default)(txIDPrefix + this.data);
                }
            case node_1.NodeType.TRANSACTION_METADATA:
                {
                    const txNodePrefix = HashPrefix_1.default.TRANSACTION_NODE.toString(HEX);
                    return (0, sha512Half_1.default)(txNodePrefix + this.data + this.tag);
                }
            default:
                throw new errors_1.XrplError('Tried to hash a SHAMap node of unknown type.');
        }
    }
    addItem(tag, node) {
        throw new errors_1.XrplError('Cannot call addItem on a LeafNode');
        this.addItem(tag, node);
    }
}
exports.default = LeafNode; //# sourceMappingURL=LeafNode.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/InnerNode.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const HashPrefix_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/HashPrefix.js [app-ssr] (ecmascript)"));
const sha512Half_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/sha512Half.js [app-ssr] (ecmascript)"));
const LeafNode_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/LeafNode.js [app-ssr] (ecmascript)"));
const node_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/node.js [app-ssr] (ecmascript)");
const HEX_ZERO = '0000000000000000000000000000000000000000000000000000000000000000';
const SLOT_MAX = 15;
const HEX = 16;
class InnerNode extends node_1.Node {
    constructor(depth = 0){
        super();
        this.leaves = {};
        this.type = node_1.NodeType.INNER;
        this.depth = depth;
        this.empty = true;
    }
    get hash() {
        if (this.empty) {
            return HEX_ZERO;
        }
        let hex = '';
        for(let iter = 0; iter <= SLOT_MAX; iter++){
            const child = this.leaves[iter];
            const hash = child == null ? HEX_ZERO : child.hash;
            hex += hash;
        }
        const prefix = HashPrefix_1.default.INNER_NODE.toString(HEX);
        return (0, sha512Half_1.default)(prefix + hex);
    }
    addItem(tag, node) {
        const existingNode = this.getNode(parseInt(tag[this.depth], HEX));
        if (existingNode === undefined) {
            this.setNode(parseInt(tag[this.depth], HEX), node);
            return;
        }
        if (existingNode instanceof InnerNode) {
            existingNode.addItem(tag, node);
        } else if (existingNode instanceof LeafNode_1.default) {
            if (existingNode.tag === tag) {
                throw new errors_1.XrplError('Tried to add a node to a SHAMap that was already in there.');
            } else {
                const newInnerNode = new InnerNode(this.depth + 1);
                newInnerNode.addItem(existingNode.tag, existingNode);
                newInnerNode.addItem(tag, node);
                this.setNode(parseInt(tag[this.depth], HEX), newInnerNode);
            }
        }
    }
    setNode(slot, node) {
        if (slot < 0 || slot > SLOT_MAX) {
            throw new errors_1.XrplError('Invalid slot: slot must be between 0-15.');
        }
        this.leaves[slot] = node;
        this.empty = false;
    }
    getNode(slot) {
        if (slot < 0 || slot > SLOT_MAX) {
            throw new errors_1.XrplError('Invalid slot: slot must be between 0-15.');
        }
        return this.leaves[slot];
    }
}
exports.default = InnerNode; //# sourceMappingURL=InnerNode.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const InnerNode_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/InnerNode.js [app-ssr] (ecmascript)"));
const LeafNode_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/LeafNode.js [app-ssr] (ecmascript)"));
class SHAMap {
    constructor(){
        this.root = new InnerNode_1.default(0);
    }
    get hash() {
        return this.root.hash;
    }
    addItem(tag, data, type) {
        this.root.addItem(tag, new LeafNode_1.default(tag, data, type));
    }
}
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/node.js [app-ssr] (ecmascript)"), exports);
exports.default = SHAMap; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/hashLedger.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hashStateTree = exports.hashTxTree = exports.hashLedgerHeader = exports.hashSignedTx = void 0;
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const HashPrefix_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/HashPrefix.js [app-ssr] (ecmascript)"));
const sha512Half_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/sha512Half.js [app-ssr] (ecmascript)"));
const SHAMap_1 = __importStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/SHAMap/index.js [app-ssr] (ecmascript)"));
const HEX = 16;
function intToHex(integer, byteLength) {
    const foo = Number(integer).toString(HEX).padStart(byteLength * 2, '0');
    return foo;
}
function bigintToHex(integerString, byteLength) {
    const hex = new bignumber_js_1.default(integerString).toString(HEX);
    return hex.padStart(byteLength * 2, '0');
}
function addLengthPrefix(hex) {
    const length = hex.length / 2;
    if (length <= 192) {
        return (0, utils_1.bytesToHex)([
            length
        ]) + hex;
    }
    if (length <= 12480) {
        const prefix = length - 193;
        return (0, utils_1.bytesToHex)([
            193 + (prefix >>> 8),
            prefix & 0xff
        ]) + hex;
    }
    if (length <= 918744) {
        const prefix = length - 12481;
        return (0, utils_1.bytesToHex)([
            241 + (prefix >>> 16),
            prefix >>> 8 & 0xff,
            prefix & 0xff
        ]) + hex;
    }
    throw new errors_1.XrplError('Variable integer overflow.');
}
function hashSignedTx(tx) {
    let txBlob;
    let txObject;
    if (typeof tx === 'string') {
        txBlob = tx;
        txObject = (0, ripple_binary_codec_1.decode)(tx);
    } else {
        txBlob = (0, ripple_binary_codec_1.encode)(tx);
        txObject = tx;
    }
    if (txObject.TxnSignature === undefined && txObject.Signers === undefined && txObject.SigningPubKey === undefined) {
        throw new errors_1.ValidationError('The transaction must be signed to hash it.');
    }
    const prefix = HashPrefix_1.default.TRANSACTION_ID.toString(16).toUpperCase();
    return (0, sha512Half_1.default)(prefix.concat(txBlob));
}
exports.hashSignedTx = hashSignedTx;
function hashLedgerHeader(ledgerHeader) {
    const prefix = HashPrefix_1.default.LEDGER.toString(HEX).toUpperCase();
    const ledger = prefix + intToHex(Number(ledgerHeader.ledger_index), 4) + bigintToHex(ledgerHeader.total_coins, 8) + ledgerHeader.parent_hash + ledgerHeader.transaction_hash + ledgerHeader.account_hash + intToHex(ledgerHeader.parent_close_time, 4) + intToHex(ledgerHeader.close_time, 4) + intToHex(ledgerHeader.close_time_resolution, 1) + intToHex(ledgerHeader.close_flags, 1);
    return (0, sha512Half_1.default)(ledger);
}
exports.hashLedgerHeader = hashLedgerHeader;
function hashTxTree(transactions) {
    var _a;
    const shamap = new SHAMap_1.default();
    for (const txJSON of transactions){
        const txBlobHex = (0, ripple_binary_codec_1.encode)(txJSON);
        const metaHex = (0, ripple_binary_codec_1.encode)((_a = txJSON.metaData) !== null && _a !== void 0 ? _a : {});
        const txHash = hashSignedTx(txBlobHex);
        const data = addLengthPrefix(txBlobHex) + addLengthPrefix(metaHex);
        shamap.addItem(txHash, data, SHAMap_1.NodeType.TRANSACTION_METADATA);
    }
    return shamap.hash;
}
exports.hashTxTree = hashTxTree;
function hashStateTree(entries) {
    const shamap = new SHAMap_1.default();
    entries.forEach((ledgerEntry)=>{
        const data = (0, ripple_binary_codec_1.encode)(ledgerEntry);
        shamap.addItem(ledgerEntry.index, data, SHAMap_1.NodeType.ACCOUNT_STATE);
    });
    return shamap.hash;
}
exports.hashStateTree = hashStateTree;
function computeTransactionHash(ledger, options) {
    const { transaction_hash } = ledger;
    if (!options.computeTreeHashes) {
        return transaction_hash;
    }
    if (ledger.transactions == null) {
        throw new errors_1.ValidationError('transactions is missing from the ledger');
    }
    const transactionHash = hashTxTree(ledger.transactions);
    if (transaction_hash !== transactionHash) {
        throw new errors_1.ValidationError('transactionHash in header' + ' does not match computed hash of transactions', {
            transactionHashInHeader: transaction_hash,
            computedHashOfTransactions: transactionHash
        });
    }
    return transactionHash;
}
function computeStateHash(ledger, options) {
    const { account_hash } = ledger;
    if (!options.computeTreeHashes) {
        return account_hash;
    }
    if (ledger.accountState == null) {
        throw new errors_1.ValidationError('accountState is missing from the ledger');
    }
    const stateHash = hashStateTree(ledger.accountState);
    if (account_hash !== stateHash) {
        throw new errors_1.ValidationError('stateHash in header does not match computed hash of state');
    }
    return stateHash;
}
function hashLedger(ledger, options = {}) {
    const subhashes = {
        transaction_hash: computeTransactionHash(ledger, options),
        account_hash: computeStateHash(ledger, options)
    };
    return hashLedgerHeader(Object.assign(Object.assign({}, ledger), subhashes));
}
exports.default = hashLedger; //# sourceMappingURL=hashLedger.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/ledgerSpaces.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const ledgerSpaces = {
    account: 'a',
    dirNode: 'd',
    generatorMap: 'g',
    rippleState: 'r',
    offer: 'o',
    ownerDir: 'O',
    bookDir: 'B',
    contract: 'c',
    skipList: 's',
    escrow: 'u',
    amendment: 'f',
    feeSettings: 'e',
    ticket: 'T',
    signerList: 'S',
    paychan: 'x',
    check: 'C',
    depositPreauth: 'p'
};
exports.default = ledgerSpaces; //# sourceMappingURL=ledgerSpaces.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hashTxTree = exports.hashStateTree = exports.hashLedger = exports.hashSignedTx = exports.hashLedgerHeader = exports.hashPaymentChannel = exports.hashEscrow = exports.hashTrustline = exports.hashOfferId = exports.hashSignerListId = exports.hashAccountRoot = exports.hashTx = void 0;
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const hashLedger_1 = __importStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/hashLedger.js [app-ssr] (ecmascript)"));
exports.hashLedger = hashLedger_1.default;
Object.defineProperty(exports, "hashLedgerHeader", {
    enumerable: true,
    get: function() {
        return hashLedger_1.hashLedgerHeader;
    }
});
Object.defineProperty(exports, "hashSignedTx", {
    enumerable: true,
    get: function() {
        return hashLedger_1.hashSignedTx;
    }
});
Object.defineProperty(exports, "hashTxTree", {
    enumerable: true,
    get: function() {
        return hashLedger_1.hashTxTree;
    }
});
Object.defineProperty(exports, "hashStateTree", {
    enumerable: true,
    get: function() {
        return hashLedger_1.hashStateTree;
    }
});
const HashPrefix_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/HashPrefix.js [app-ssr] (ecmascript)"));
const ledgerSpaces_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/ledgerSpaces.js [app-ssr] (ecmascript)"));
const sha512Half_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/sha512Half.js [app-ssr] (ecmascript)"));
const HEX = 16;
const BYTE_LENGTH = 4;
function addressToHex(address) {
    return (0, utils_1.bytesToHex)((0, ripple_address_codec_1.decodeAccountID)(address));
}
function ledgerSpaceHex(name) {
    return ledgerSpaces_1.default[name].charCodeAt(0).toString(HEX).padStart(4, '0');
}
const MASK = 0xff;
function currencyToHex(currency) {
    if (currency.length !== 3) {
        return currency;
    }
    const bytes = Array(20).fill(0);
    bytes[12] = currency.charCodeAt(0) & MASK;
    bytes[13] = currency.charCodeAt(1) & MASK;
    bytes[14] = currency.charCodeAt(2) & MASK;
    return (0, utils_1.bytesToHex)(Uint8Array.from(bytes));
}
function hashTx(txBlobHex) {
    const prefix = HashPrefix_1.default.TRANSACTION_SIGN.toString(HEX).toUpperCase();
    return (0, sha512Half_1.default)(prefix + txBlobHex);
}
exports.hashTx = hashTx;
function hashAccountRoot(address) {
    return (0, sha512Half_1.default)(ledgerSpaceHex('account') + addressToHex(address));
}
exports.hashAccountRoot = hashAccountRoot;
function hashSignerListId(address) {
    return (0, sha512Half_1.default)(`${ledgerSpaceHex('signerList') + addressToHex(address)}00000000`);
}
exports.hashSignerListId = hashSignerListId;
function hashOfferId(address, sequence) {
    const hexPrefix = ledgerSpaces_1.default.offer.charCodeAt(0).toString(HEX).padStart(2, '0');
    const hexSequence = sequence.toString(HEX).padStart(8, '0');
    const prefix = `00${hexPrefix}`;
    return (0, sha512Half_1.default)(prefix + addressToHex(address) + hexSequence);
}
exports.hashOfferId = hashOfferId;
function hashTrustline(address1, address2, currency) {
    const address1Hex = addressToHex(address1);
    const address2Hex = addressToHex(address2);
    const swap = new bignumber_js_1.default(address1Hex, 16).isGreaterThan(new bignumber_js_1.default(address2Hex, 16));
    const lowAddressHex = swap ? address2Hex : address1Hex;
    const highAddressHex = swap ? address1Hex : address2Hex;
    const prefix = ledgerSpaceHex('rippleState');
    return (0, sha512Half_1.default)(prefix + lowAddressHex + highAddressHex + currencyToHex(currency));
}
exports.hashTrustline = hashTrustline;
function hashEscrow(address, sequence) {
    return (0, sha512Half_1.default)(ledgerSpaceHex('escrow') + addressToHex(address) + sequence.toString(HEX).padStart(BYTE_LENGTH * 2, '0'));
}
exports.hashEscrow = hashEscrow;
function hashPaymentChannel(address, dstAddress, sequence) {
    return (0, sha512Half_1.default)(ledgerSpaceHex('paychan') + addressToHex(address) + addressToHex(dstAddress) + sequence.toString(HEX).padStart(BYTE_LENGTH * 2, '0'));
}
exports.hashPaymentChannel = hashPaymentChannel; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/parseNFTokenID.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
function unscrambleTaxon(taxon, tokenSeq) {
    const seed = 384160001;
    const increment = 2459;
    const max = 4294967296;
    const scramble = new bignumber_js_1.default(seed).multipliedBy(tokenSeq).modulo(max).plus(increment).modulo(max).toNumber();
    return (taxon ^ scramble) >>> 0;
}
function parseNFTokenID(nftokenID) {
    const expectedLength = 64;
    if (nftokenID.length !== expectedLength) {
        throw new errors_1.XrplError(`Attempting to parse a nftokenID with length ${nftokenID.length}
    , but expected a token with length ${expectedLength}`);
    }
    const scrambledTaxon = new bignumber_js_1.default(nftokenID.substring(48, 56), 16).toNumber();
    const sequence = new bignumber_js_1.default(nftokenID.substring(56, 64), 16).toNumber();
    const NFTokenIDData = {
        NFTokenID: nftokenID,
        Flags: new bignumber_js_1.default(nftokenID.substring(0, 4), 16).toNumber(),
        TransferFee: new bignumber_js_1.default(nftokenID.substring(4, 8), 16).toNumber(),
        Issuer: (0, ripple_address_codec_1.encodeAccountID)((0, utils_1.hexToBytes)(nftokenID.substring(8, 48))),
        Taxon: unscrambleTaxon(scrambledTaxon, sequence),
        Sequence: sequence
    };
    return NFTokenIDData;
}
exports.default = parseNFTokenID; //# sourceMappingURL=parseNFTokenID.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/quality.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.percentToQuality = exports.transferRateToDecimal = exports.qualityToDecimal = exports.decimalToQuality = exports.percentToTransferRate = exports.decimalToTransferRate = void 0;
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const BASE_TEN = 10;
const ONE_BILLION = '1000000000';
const TWO_BILLION = '2000000000';
function percentToDecimal(percent) {
    if (!percent.endsWith('%')) {
        throw new errors_1.ValidationError(`Value ${percent} must end with %`);
    }
    const split = percent.split('%').filter((str)=>str !== '');
    if (split.length !== 1) {
        throw new errors_1.ValidationError(`Value ${percent} contains too many % signs`);
    }
    return new bignumber_js_1.default(split[0]).dividedBy('100').toString(BASE_TEN);
}
function decimalToTransferRate(decimal) {
    const rate = new bignumber_js_1.default(decimal).times(ONE_BILLION).plus(ONE_BILLION);
    if (rate.isLessThan(ONE_BILLION) || rate.isGreaterThan(TWO_BILLION)) {
        throw new errors_1.ValidationError(`Decimal value must be between 0 and 1.00.`);
    }
    const billionths = rate.toString(BASE_TEN);
    if (billionths === ONE_BILLION) {
        return 0;
    }
    if (billionths === 'NaN') {
        throw new errors_1.ValidationError(`Value is not a number`);
    }
    if (billionths.includes('.')) {
        throw new errors_1.ValidationError(`Decimal exceeds maximum precision.`);
    }
    return Number(billionths);
}
exports.decimalToTransferRate = decimalToTransferRate;
function percentToTransferRate(percent) {
    return decimalToTransferRate(percentToDecimal(percent));
}
exports.percentToTransferRate = percentToTransferRate;
function decimalToQuality(decimal) {
    const rate = new bignumber_js_1.default(decimal).times(ONE_BILLION);
    const billionths = rate.toString(BASE_TEN);
    if (billionths === 'NaN') {
        throw new errors_1.ValidationError(`Value is not a number`);
    }
    if (billionths.includes('-')) {
        throw new errors_1.ValidationError('Cannot have negative Quality');
    }
    if (billionths === ONE_BILLION) {
        return 0;
    }
    if (billionths.includes('.')) {
        throw new errors_1.ValidationError(`Decimal exceeds maximum precision.`);
    }
    return Number(billionths);
}
exports.decimalToQuality = decimalToQuality;
function qualityToDecimal(quality) {
    if (!Number.isInteger(quality)) {
        throw new errors_1.ValidationError('Quality must be an integer');
    }
    if (quality < 0) {
        throw new errors_1.ValidationError('Negative quality not allowed');
    }
    if (quality === 0) {
        return '1';
    }
    const decimal = new bignumber_js_1.default(quality).dividedBy(ONE_BILLION);
    return decimal.toString(BASE_TEN);
}
exports.qualityToDecimal = qualityToDecimal;
function transferRateToDecimal(rate) {
    if (!Number.isInteger(rate)) {
        throw new errors_1.ValidationError('Error decoding, transfer Rate must be an integer');
    }
    if (rate === 0) {
        return '0';
    }
    const decimal = new bignumber_js_1.default(rate).minus(ONE_BILLION).dividedBy(ONE_BILLION);
    if (decimal.isLessThan(0)) {
        throw new errors_1.ValidationError('Error decoding, negative transfer rate');
    }
    return decimal.toString(BASE_TEN);
}
exports.transferRateToDecimal = transferRateToDecimal;
function percentToQuality(percent) {
    return decimalToQuality(percentToDecimal(percent));
}
exports.percentToQuality = percentToQuality; //# sourceMappingURL=quality.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/signPaymentChannelClaim.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_keypairs_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-keypairs@2.0.0/node_modules/ripple-keypairs/dist/index.js [app-ssr] (ecmascript)");
const xrpConversion_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/xrpConversion.js [app-ssr] (ecmascript)");
function signPaymentChannelClaim(channel, xrpAmount, privateKey) {
    const signingData = (0, ripple_binary_codec_1.encodeForSigningClaim)({
        channel,
        amount: (0, xrpConversion_1.xrpToDrops)(xrpAmount)
    });
    return (0, ripple_keypairs_1.sign)(signingData, privateKey);
}
exports.default = signPaymentChannelClaim; //# sourceMappingURL=signPaymentChannelClaim.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/stringConversion.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertStringToHex = exports.convertHexToString = void 0;
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
function convertStringToHex(string) {
    return (0, utils_1.stringToHex)(string);
}
exports.convertStringToHex = convertStringToHex;
function convertHexToString(hex, encoding = 'utf8') {
    return (0, utils_1.hexToString)(hex, encoding);
}
exports.convertHexToString = convertHexToString; //# sourceMappingURL=stringConversion.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/timeConversion.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isoTimeToRippleTime = exports.rippleTimeToISOTime = exports.unixTimeToRippleTime = exports.rippleTimeToUnixTime = void 0;
const RIPPLE_EPOCH_DIFF = 0x386d4380;
function rippleTimeToUnixTime(rpepoch) {
    return (rpepoch + RIPPLE_EPOCH_DIFF) * 1000;
}
exports.rippleTimeToUnixTime = rippleTimeToUnixTime;
function unixTimeToRippleTime(timestamp) {
    return Math.round(timestamp / 1000) - RIPPLE_EPOCH_DIFF;
}
exports.unixTimeToRippleTime = unixTimeToRippleTime;
function rippleTimeToISOTime(rippleTime) {
    return new Date(rippleTimeToUnixTime(rippleTime)).toISOString();
}
exports.rippleTimeToISOTime = rippleTimeToISOTime;
function isoTimeToRippleTime(iso8601) {
    const isoDate = typeof iso8601 === 'string' ? new Date(iso8601) : iso8601;
    return unixTimeToRippleTime(isoDate.getTime());
}
exports.isoTimeToRippleTime = isoTimeToRippleTime; //# sourceMappingURL=timeConversion.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/verifyPaymentChannelClaim.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_keypairs_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-keypairs@2.0.0/node_modules/ripple-keypairs/dist/index.js [app-ssr] (ecmascript)");
const xrpConversion_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/xrpConversion.js [app-ssr] (ecmascript)");
function verifyPaymentChannelClaim(channel, xrpAmount, signature, publicKey) {
    const signingData = (0, ripple_binary_codec_1.encodeForSigningClaim)({
        channel,
        amount: (0, xrpConversion_1.xrpToDrops)(xrpAmount)
    });
    return (0, ripple_keypairs_1.verify)(signingData, signature, publicKey);
}
exports.default = verifyPaymentChannelClaim; //# sourceMappingURL=verifyPaymentChannelClaim.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getXChainClaimID = exports.parseNFTokenID = exports.getNFTokenID = exports.encodeForSigningClaim = exports.encodeForSigning = exports.encodeForMultiSigning = exports.decode = exports.encode = exports.decodeXAddress = exports.encodeXAddress = exports.decodeAccountPublic = exports.encodeAccountPublic = exports.decodeNodePublic = exports.encodeNodePublic = exports.decodeAccountID = exports.encodeAccountID = exports.decodeSeed = exports.encodeSeed = exports.isValidClassicAddress = exports.isValidXAddress = exports.xAddressToClassicAddress = exports.classicAddressToXAddress = exports.convertHexToString = exports.convertStringToHex = exports.verifyPaymentChannelClaim = exports.verifyKeypairSignature = exports.signPaymentChannelClaim = exports.deriveXAddress = exports.deriveAddress = exports.deriveKeypair = exports.hashes = exports.isValidAddress = exports.isValidSecret = exports.qualityToDecimal = exports.transferRateToDecimal = exports.decimalToTransferRate = exports.percentToTransferRate = exports.decimalToQuality = exports.percentToQuality = exports.unixTimeToRippleTime = exports.rippleTimeToUnixTime = exports.isoTimeToRippleTime = exports.rippleTimeToISOTime = exports.hasNextPage = exports.xrpToDrops = exports.dropsToXrp = exports.getBalanceChanges = void 0;
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "classicAddressToXAddress", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.classicAddressToXAddress;
    }
});
Object.defineProperty(exports, "decodeAccountID", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.decodeAccountID;
    }
});
Object.defineProperty(exports, "decodeAccountPublic", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.decodeAccountPublic;
    }
});
Object.defineProperty(exports, "decodeNodePublic", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.decodeNodePublic;
    }
});
Object.defineProperty(exports, "decodeSeed", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.decodeSeed;
    }
});
Object.defineProperty(exports, "decodeXAddress", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.decodeXAddress;
    }
});
Object.defineProperty(exports, "encodeAccountID", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.encodeAccountID;
    }
});
Object.defineProperty(exports, "encodeAccountPublic", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.encodeAccountPublic;
    }
});
Object.defineProperty(exports, "encodeNodePublic", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.encodeNodePublic;
    }
});
Object.defineProperty(exports, "encodeSeed", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.encodeSeed;
    }
});
Object.defineProperty(exports, "encodeXAddress", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.encodeXAddress;
    }
});
Object.defineProperty(exports, "isValidClassicAddress", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.isValidClassicAddress;
    }
});
Object.defineProperty(exports, "isValidXAddress", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.isValidXAddress;
    }
});
Object.defineProperty(exports, "xAddressToClassicAddress", {
    enumerable: true,
    get: function() {
        return ripple_address_codec_1.xAddressToClassicAddress;
    }
});
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_keypairs_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-keypairs@2.0.0/node_modules/ripple-keypairs/dist/index.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "verifyKeypairSignature", {
    enumerable: true,
    get: function() {
        return ripple_keypairs_1.verify;
    }
});
const derive_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/derive.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "deriveKeypair", {
    enumerable: true,
    get: function() {
        return derive_1.deriveKeypair;
    }
});
Object.defineProperty(exports, "deriveAddress", {
    enumerable: true,
    get: function() {
        return derive_1.deriveAddress;
    }
});
Object.defineProperty(exports, "deriveXAddress", {
    enumerable: true,
    get: function() {
        return derive_1.deriveXAddress;
    }
});
const getBalanceChanges_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/getBalanceChanges.js [app-ssr] (ecmascript)"));
exports.getBalanceChanges = getBalanceChanges_1.default;
const getNFTokenID_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/getNFTokenID.js [app-ssr] (ecmascript)"));
exports.getNFTokenID = getNFTokenID_1.default;
const getXChainClaimID_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/getXChainClaimID.js [app-ssr] (ecmascript)"));
exports.getXChainClaimID = getXChainClaimID_1.default;
const hashes_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/index.js [app-ssr] (ecmascript)");
const parseNFTokenID_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/parseNFTokenID.js [app-ssr] (ecmascript)"));
exports.parseNFTokenID = parseNFTokenID_1.default;
const quality_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/quality.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "percentToTransferRate", {
    enumerable: true,
    get: function() {
        return quality_1.percentToTransferRate;
    }
});
Object.defineProperty(exports, "decimalToTransferRate", {
    enumerable: true,
    get: function() {
        return quality_1.decimalToTransferRate;
    }
});
Object.defineProperty(exports, "transferRateToDecimal", {
    enumerable: true,
    get: function() {
        return quality_1.transferRateToDecimal;
    }
});
Object.defineProperty(exports, "percentToQuality", {
    enumerable: true,
    get: function() {
        return quality_1.percentToQuality;
    }
});
Object.defineProperty(exports, "decimalToQuality", {
    enumerable: true,
    get: function() {
        return quality_1.decimalToQuality;
    }
});
Object.defineProperty(exports, "qualityToDecimal", {
    enumerable: true,
    get: function() {
        return quality_1.qualityToDecimal;
    }
});
const signPaymentChannelClaim_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/signPaymentChannelClaim.js [app-ssr] (ecmascript)"));
exports.signPaymentChannelClaim = signPaymentChannelClaim_1.default;
const stringConversion_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/stringConversion.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "convertHexToString", {
    enumerable: true,
    get: function() {
        return stringConversion_1.convertHexToString;
    }
});
Object.defineProperty(exports, "convertStringToHex", {
    enumerable: true,
    get: function() {
        return stringConversion_1.convertStringToHex;
    }
});
const timeConversion_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/timeConversion.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "rippleTimeToISOTime", {
    enumerable: true,
    get: function() {
        return timeConversion_1.rippleTimeToISOTime;
    }
});
Object.defineProperty(exports, "isoTimeToRippleTime", {
    enumerable: true,
    get: function() {
        return timeConversion_1.isoTimeToRippleTime;
    }
});
Object.defineProperty(exports, "rippleTimeToUnixTime", {
    enumerable: true,
    get: function() {
        return timeConversion_1.rippleTimeToUnixTime;
    }
});
Object.defineProperty(exports, "unixTimeToRippleTime", {
    enumerable: true,
    get: function() {
        return timeConversion_1.unixTimeToRippleTime;
    }
});
const verifyPaymentChannelClaim_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/verifyPaymentChannelClaim.js [app-ssr] (ecmascript)"));
exports.verifyPaymentChannelClaim = verifyPaymentChannelClaim_1.default;
const xrpConversion_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/xrpConversion.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "xrpToDrops", {
    enumerable: true,
    get: function() {
        return xrpConversion_1.xrpToDrops;
    }
});
Object.defineProperty(exports, "dropsToXrp", {
    enumerable: true,
    get: function() {
        return xrpConversion_1.dropsToXrp;
    }
});
function isValidSecret(secret) {
    try {
        (0, derive_1.deriveKeypair)(secret);
        return true;
    } catch (_err) {
        return false;
    }
}
exports.isValidSecret = isValidSecret;
function encode(object) {
    return (0, ripple_binary_codec_1.encode)(object);
}
exports.encode = encode;
function encodeForSigning(object) {
    return (0, ripple_binary_codec_1.encodeForSigning)(object);
}
exports.encodeForSigning = encodeForSigning;
function encodeForSigningClaim(object) {
    return (0, ripple_binary_codec_1.encodeForSigningClaim)(object);
}
exports.encodeForSigningClaim = encodeForSigningClaim;
function encodeForMultiSigning(object, signer) {
    return (0, ripple_binary_codec_1.encodeForMultisigning)(object, signer);
}
exports.encodeForMultiSigning = encodeForMultiSigning;
function decode(hex) {
    return (0, ripple_binary_codec_1.decode)(hex);
}
exports.decode = decode;
function isValidAddress(address) {
    return (0, ripple_address_codec_1.isValidXAddress)(address) || (0, ripple_address_codec_1.isValidClassicAddress)(address);
}
exports.isValidAddress = isValidAddress;
function hasNextPage(response) {
    return Boolean(response.result['marker']);
}
exports.hasNextPage = hasNextPage;
const hashes = {
    hashSignedTx: hashes_1.hashSignedTx,
    hashTx: hashes_1.hashTx,
    hashAccountRoot: hashes_1.hashAccountRoot,
    hashSignerListId: hashes_1.hashSignerListId,
    hashOfferId: hashes_1.hashOfferId,
    hashTrustline: hashes_1.hashTrustline,
    hashTxTree: hashes_1.hashTxTree,
    hashStateTree: hashes_1.hashStateTree,
    hashLedger: hashes_1.hashLedger,
    hashLedgerHeader: hashes_1.hashLedgerHeader,
    hashEscrow: hashes_1.hashEscrow,
    hashPaymentChannel: hashes_1.hashPaymentChannel
};
exports.hashes = hashes; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/getFeeXrp.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const NUM_DECIMAL_PLACES = 6;
const BASE_10 = 10;
function getFeeXrp(client, cushion) {
    var _a;
    return __awaiter(this, void 0, void 0, function*() {
        const feeCushion = cushion !== null && cushion !== void 0 ? cushion : client.feeCushion;
        const serverInfo = (yield client.request({
            command: 'server_info'
        })).result.info;
        const baseFee = (_a = serverInfo.validated_ledger) === null || _a === void 0 ? void 0 : _a.base_fee_xrp;
        if (baseFee == null) {
            throw new errors_1.XrplError('getFeeXrp: Could not get base_fee_xrp from server_info');
        }
        const baseFeeXrp = new bignumber_js_1.default(baseFee);
        if (serverInfo.load_factor == null) {
            serverInfo.load_factor = 1;
        }
        let fee = baseFeeXrp.times(serverInfo.load_factor).times(feeCushion);
        fee = bignumber_js_1.default.min(fee, client.maxFeeXRP);
        return new bignumber_js_1.default(fee.toFixed(NUM_DECIMAL_PLACES)).toString(BASE_10);
    });
}
exports.default = getFeeXrp; //# sourceMappingURL=getFeeXrp.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/autofill.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAccountDeleteBlockers = exports.setLatestValidatedLedgerSequence = exports.calculateFeePerTransactionType = exports.setNextValidSequenceNumber = exports.setValidAddresses = exports.txNeedsNetworkID = void 0;
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/index.js [app-ssr] (ecmascript)");
const getFeeXrp_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/getFeeXrp.js [app-ssr] (ecmascript)"));
const LEDGER_OFFSET = 20;
const RESTRICTED_NETWORKS = 1024;
const REQUIRED_NETWORKID_VERSION = '1.11.0';
const HOOKS_TESTNET_ID = 21338;
function isNotLaterRippledVersion(source, target) {
    if (source === target) {
        return true;
    }
    const sourceDecomp = source.split('.');
    const targetDecomp = target.split('.');
    const sourceMajor = parseInt(sourceDecomp[0], 10);
    const sourceMinor = parseInt(sourceDecomp[1], 10);
    const targetMajor = parseInt(targetDecomp[0], 10);
    const targetMinor = parseInt(targetDecomp[1], 10);
    if (sourceMajor !== targetMajor) {
        return sourceMajor < targetMajor;
    }
    if (sourceMinor !== targetMinor) {
        return sourceMinor < targetMinor;
    }
    const sourcePatch = sourceDecomp[2].split('-');
    const targetPatch = targetDecomp[2].split('-');
    const sourcePatchVersion = parseInt(sourcePatch[0], 10);
    const targetPatchVersion = parseInt(targetPatch[0], 10);
    if (sourcePatchVersion !== targetPatchVersion) {
        return sourcePatchVersion < targetPatchVersion;
    }
    if (sourcePatch.length !== targetPatch.length) {
        return sourcePatch.length > targetPatch.length;
    }
    if (sourcePatch.length === 2) {
        if (!sourcePatch[1][0].startsWith(targetPatch[1][0])) {
            return sourcePatch[1] < targetPatch[1];
        }
        if (sourcePatch[1].startsWith('b')) {
            return parseInt(sourcePatch[1].slice(1), 10) < parseInt(targetPatch[1].slice(1), 10);
        }
        return parseInt(sourcePatch[1].slice(2), 10) < parseInt(targetPatch[1].slice(2), 10);
    }
    return false;
}
function txNeedsNetworkID(client) {
    if (client.networkID !== undefined && client.networkID > RESTRICTED_NETWORKS) {
        if (client.buildVersion && isNotLaterRippledVersion(REQUIRED_NETWORKID_VERSION, client.buildVersion) || client.networkID === HOOKS_TESTNET_ID) {
            return true;
        }
    }
    return false;
}
exports.txNeedsNetworkID = txNeedsNetworkID;
function setValidAddresses(tx) {
    validateAccountAddress(tx, 'Account', 'SourceTag');
    if (tx['Destination'] != null) {
        validateAccountAddress(tx, 'Destination', 'DestinationTag');
    }
    convertToClassicAddress(tx, 'Authorize');
    convertToClassicAddress(tx, 'Unauthorize');
    convertToClassicAddress(tx, 'Owner');
    convertToClassicAddress(tx, 'RegularKey');
}
exports.setValidAddresses = setValidAddresses;
function validateAccountAddress(tx, accountField, tagField) {
    const { classicAccount, tag } = getClassicAccountAndTag(tx[accountField]);
    tx[accountField] = classicAccount;
    if (tag != null && tag !== false) {
        if (tx[tagField] && tx[tagField] !== tag) {
            throw new errors_1.ValidationError(`The ${tagField}, if present, must match the tag of the ${accountField} X-address`);
        }
        tx[tagField] = tag;
    }
}
function getClassicAccountAndTag(Account, expectedTag) {
    if ((0, ripple_address_codec_1.isValidXAddress)(Account)) {
        const classic = (0, ripple_address_codec_1.xAddressToClassicAddress)(Account);
        if (expectedTag != null && classic.tag !== expectedTag) {
            throw new errors_1.ValidationError('address includes a tag that does not match the tag specified in the transaction');
        }
        return {
            classicAccount: classic.classicAddress,
            tag: classic.tag
        };
    }
    return {
        classicAccount: Account,
        tag: expectedTag
    };
}
function convertToClassicAddress(tx, fieldName) {
    const account = tx[fieldName];
    if (typeof account === 'string') {
        const { classicAccount } = getClassicAccountAndTag(account);
        tx[fieldName] = classicAccount;
    }
}
function setNextValidSequenceNumber(client, tx) {
    return __awaiter(this, void 0, void 0, function*() {
        const request = {
            command: 'account_info',
            account: tx.Account,
            ledger_index: 'current'
        };
        const data = yield client.request(request);
        tx.Sequence = data.result.account_data.Sequence;
    });
}
exports.setNextValidSequenceNumber = setNextValidSequenceNumber;
function fetchAccountDeleteFee(client) {
    var _a;
    return __awaiter(this, void 0, void 0, function*() {
        const response = yield client.request({
            command: 'server_state'
        });
        const fee = (_a = response.result.state.validated_ledger) === null || _a === void 0 ? void 0 : _a.reserve_inc;
        if (fee == null) {
            return Promise.reject(new Error('Could not fetch Owner Reserve.'));
        }
        return new bignumber_js_1.default(fee);
    });
}
function calculateFeePerTransactionType(client, tx, signersCount = 0) {
    return __awaiter(this, void 0, void 0, function*() {
        const netFeeXRP = yield (0, getFeeXrp_1.default)(client);
        const netFeeDrops = (0, utils_1.xrpToDrops)(netFeeXRP);
        let baseFee = new bignumber_js_1.default(netFeeDrops);
        if (tx.TransactionType === 'EscrowFinish' && tx.Fulfillment != null) {
            const fulfillmentBytesSize = Math.ceil(tx.Fulfillment.length / 2);
            const product = new bignumber_js_1.default(scaleValue(netFeeDrops, 33 + fulfillmentBytesSize / 16));
            baseFee = product.dp(0, bignumber_js_1.default.ROUND_CEIL);
        }
        if (tx.TransactionType === 'AccountDelete' || tx.TransactionType === 'AMMCreate') {
            baseFee = yield fetchAccountDeleteFee(client);
        }
        if (signersCount > 0) {
            baseFee = bignumber_js_1.default.sum(baseFee, scaleValue(netFeeDrops, 1 + signersCount));
        }
        const maxFeeDrops = (0, utils_1.xrpToDrops)(client.maxFeeXRP);
        const totalFee = tx.TransactionType === 'AccountDelete' ? baseFee : bignumber_js_1.default.min(baseFee, maxFeeDrops);
        tx.Fee = totalFee.dp(0, bignumber_js_1.default.ROUND_CEIL).toString(10);
    });
}
exports.calculateFeePerTransactionType = calculateFeePerTransactionType;
function scaleValue(value, multiplier) {
    return new bignumber_js_1.default(value).times(multiplier).toString();
}
function setLatestValidatedLedgerSequence(client, tx) {
    return __awaiter(this, void 0, void 0, function*() {
        const ledgerSequence = yield client.getLedgerIndex();
        tx.LastLedgerSequence = ledgerSequence + LEDGER_OFFSET;
    });
}
exports.setLatestValidatedLedgerSequence = setLatestValidatedLedgerSequence;
function checkAccountDeleteBlockers(client, tx) {
    return __awaiter(this, void 0, void 0, function*() {
        const request = {
            command: 'account_objects',
            account: tx.Account,
            ledger_index: 'validated',
            deletion_blockers_only: true
        };
        const response = yield client.request(request);
        return new Promise((resolve, reject)=>{
            if (response.result.account_objects.length > 0) {
                reject(new errors_1.XrplError(`Account ${tx.Account} cannot be deleted; there are Escrows, PayChannels, RippleStates, or Checks associated with the account.`, response.result.account_objects));
            }
            resolve();
        });
    });
}
exports.checkAccountDeleteBlockers = checkAccountDeleteBlockers; //# sourceMappingURL=autofill.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/balances.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatBalances = void 0;
function formatBalances(trustlines) {
    return trustlines.map((trustline)=>({
            value: trustline.balance,
            currency: trustline.currency,
            issuer: trustline.account
        }));
}
exports.formatBalances = formatBalances; //# sourceMappingURL=balances.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/Offer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OfferFlags = void 0;
var OfferFlags;
(function(OfferFlags) {
    OfferFlags[OfferFlags["lsfPassive"] = 65536] = "lsfPassive";
    OfferFlags[OfferFlags["lsfSell"] = 131072] = "lsfSell";
})(OfferFlags || (exports.OfferFlags = OfferFlags = {})); //# sourceMappingURL=Offer.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/getOrderbook.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortAndLimitOffers = exports.separateBuySellOrders = exports.combineOrders = exports.extractOffers = exports.reverseRequest = exports.requestAllOffers = exports.createBookOffersRequest = exports.validateOrderbookOptions = void 0;
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const Offer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/Offer.js [app-ssr] (ecmascript)");
const DEFAULT_LIMIT = 20;
function sortOffers(offers) {
    return offers.sort((offerA, offerB)=>{
        var _a, _b;
        const qualityA = (_a = offerA.quality) !== null && _a !== void 0 ? _a : 0;
        const qualityB = (_b = offerB.quality) !== null && _b !== void 0 ? _b : 0;
        return new bignumber_js_1.default(qualityA).comparedTo(qualityB);
    });
}
const getOrderbookOptionsSet = new Set([
    'limit',
    'ledger_index',
    'ledger_hash',
    'taker'
]);
function validateOrderbookOptions(options) {
    for (const key of Object.keys(options)){
        if (!getOrderbookOptionsSet.has(key)) {
            throw new errors_1.ValidationError(`Unexpected option: ${key}`, options);
        }
    }
    if (options.limit && typeof options.limit !== 'number') {
        throw new errors_1.ValidationError('limit must be a number', options.limit);
    }
    if (options.ledger_index && !(typeof options.ledger_index === 'number' || typeof options.ledger_index === 'string' && [
        'validated',
        'closed',
        'current'
    ].includes(options.ledger_index))) {
        throw new errors_1.ValidationError('ledger_index must be a number or a string of "validated", "closed", or "current"', options.ledger_index);
    }
    if (options.ledger_hash !== undefined && options.ledger_hash !== null && typeof options.ledger_hash !== 'string') {
        throw new errors_1.ValidationError('ledger_hash must be a string', options.ledger_hash);
    }
    if (options.taker !== undefined && typeof options.taker !== 'string') {
        throw new errors_1.ValidationError('taker must be a string', options.taker);
    }
}
exports.validateOrderbookOptions = validateOrderbookOptions;
function createBookOffersRequest(currency1, currency2, options) {
    var _a, _b;
    const request = {
        command: 'book_offers',
        taker_pays: currency1,
        taker_gets: currency2,
        ledger_index: (_a = options.ledger_index) !== null && _a !== void 0 ? _a : 'validated',
        ledger_hash: options.ledger_hash === null ? undefined : options.ledger_hash,
        limit: (_b = options.limit) !== null && _b !== void 0 ? _b : DEFAULT_LIMIT,
        taker: options.taker ? options.taker : undefined
    };
    return request;
}
exports.createBookOffersRequest = createBookOffersRequest;
function requestAllOffers(client, request) {
    return __awaiter(this, void 0, void 0, function*() {
        const results = yield client.requestAll(request);
        return results.map((result)=>result.result.offers);
    });
}
exports.requestAllOffers = requestAllOffers;
function reverseRequest(request) {
    return Object.assign(Object.assign({}, request), {
        taker_pays: request.taker_gets,
        taker_gets: request.taker_pays
    });
}
exports.reverseRequest = reverseRequest;
function extractOffers(offerResults) {
    return offerResults.flatMap((offerResult)=>offerResult);
}
exports.extractOffers = extractOffers;
function combineOrders(directOffers, reverseOffers) {
    return [
        ...directOffers,
        ...reverseOffers
    ];
}
exports.combineOrders = combineOrders;
function separateBuySellOrders(orders) {
    const buy = [];
    const sell = [];
    orders.forEach((order)=>{
        if ((order.Flags & Offer_1.OfferFlags.lsfSell) === 0) {
            buy.push(order);
        } else {
            sell.push(order);
        }
    });
    return {
        buy,
        sell
    };
}
exports.separateBuySellOrders = separateBuySellOrders;
function sortAndLimitOffers(offers, limit) {
    const sortedOffers = sortOffers(offers);
    return sortedOffers.slice(0, limit);
}
exports.sortAndLimitOffers = sortAndLimitOffers; //# sourceMappingURL=getOrderbook.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/ECDSA.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ECDSA;
(function(ECDSA) {
    ECDSA["ed25519"] = "ed25519";
    ECDSA["secp256k1"] = "ecdsa-secp256k1";
})(ECDSA || (ECDSA = {}));
exports.default = ECDSA; //# sourceMappingURL=ECDSA.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/accountDelete.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAccountDelete = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateAccountDelete(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'DestinationTag', common_1.isNumber);
}
exports.validateAccountDelete = validateAccountDelete; //# sourceMappingURL=accountDelete.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMBid.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAMMBid = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
const MAX_AUTH_ACCOUNTS = 4;
function validateAMMBid(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Asset == null) {
        throw new errors_1.ValidationError('AMMBid: missing field Asset');
    }
    if (!(0, common_1.isCurrency)(tx.Asset)) {
        throw new errors_1.ValidationError('AMMBid: Asset must be a Currency');
    }
    if (tx.Asset2 == null) {
        throw new errors_1.ValidationError('AMMBid: missing field Asset2');
    }
    if (!(0, common_1.isCurrency)(tx.Asset2)) {
        throw new errors_1.ValidationError('AMMBid: Asset2 must be a Currency');
    }
    if (tx.BidMin != null && !(0, common_1.isAmount)(tx.BidMin)) {
        throw new errors_1.ValidationError('AMMBid: BidMin must be an Amount');
    }
    if (tx.BidMax != null && !(0, common_1.isAmount)(tx.BidMax)) {
        throw new errors_1.ValidationError('AMMBid: BidMax must be an Amount');
    }
    if (tx.AuthAccounts != null) {
        if (!Array.isArray(tx.AuthAccounts)) {
            throw new errors_1.ValidationError(`AMMBid: AuthAccounts must be an AuthAccount array`);
        }
        if (tx.AuthAccounts.length > MAX_AUTH_ACCOUNTS) {
            throw new errors_1.ValidationError(`AMMBid: AuthAccounts length must not be greater than ${MAX_AUTH_ACCOUNTS}`);
        }
        validateAuthAccounts(tx.Account, tx.AuthAccounts);
    }
}
exports.validateAMMBid = validateAMMBid;
function validateAuthAccounts(senderAddress, authAccounts) {
    for (const authAccount of authAccounts){
        if (authAccount.AuthAccount == null || typeof authAccount.AuthAccount !== 'object') {
            throw new errors_1.ValidationError(`AMMBid: invalid AuthAccounts`);
        }
        if (authAccount.AuthAccount.Account == null) {
            throw new errors_1.ValidationError(`AMMBid: invalid AuthAccounts`);
        }
        if (typeof authAccount.AuthAccount.Account !== 'string') {
            throw new errors_1.ValidationError(`AMMBid: invalid AuthAccounts`);
        }
        if (authAccount.AuthAccount.Account === senderAddress) {
            throw new errors_1.ValidationError(`AMMBid: AuthAccounts must not include sender's address`);
        }
    }
    return true;
} //# sourceMappingURL=AMMBid.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMCreate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAMMCreate = exports.AMM_MAX_TRADING_FEE = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
exports.AMM_MAX_TRADING_FEE = 1000;
function validateAMMCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount == null) {
        throw new errors_1.ValidationError('AMMCreate: missing field Amount');
    }
    if (!(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('AMMCreate: Amount must be an Amount');
    }
    if (tx.Amount2 == null) {
        throw new errors_1.ValidationError('AMMCreate: missing field Amount2');
    }
    if (!(0, common_1.isAmount)(tx.Amount2)) {
        throw new errors_1.ValidationError('AMMCreate: Amount2 must be an Amount');
    }
    if (tx.TradingFee == null) {
        throw new errors_1.ValidationError('AMMCreate: missing field TradingFee');
    }
    if (typeof tx.TradingFee !== 'number') {
        throw new errors_1.ValidationError('AMMCreate: TradingFee must be a number');
    }
    if (tx.TradingFee < 0 || tx.TradingFee > exports.AMM_MAX_TRADING_FEE) {
        throw new errors_1.ValidationError(`AMMCreate: TradingFee must be between 0 and ${exports.AMM_MAX_TRADING_FEE}`);
    }
}
exports.validateAMMCreate = validateAMMCreate; //# sourceMappingURL=AMMCreate.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMDelete.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAMMDelete = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateAMMDelete(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Asset == null) {
        throw new errors_1.ValidationError('AMMDelete: missing field Asset');
    }
    if (!(0, common_1.isCurrency)(tx.Asset)) {
        throw new errors_1.ValidationError('AMMDelete: Asset must be a Currency');
    }
    if (tx.Asset2 == null) {
        throw new errors_1.ValidationError('AMMDelete: missing field Asset2');
    }
    if (!(0, common_1.isCurrency)(tx.Asset2)) {
        throw new errors_1.ValidationError('AMMDelete: Asset2 must be a Currency');
    }
}
exports.validateAMMDelete = validateAMMDelete; //# sourceMappingURL=AMMDelete.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMVote.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAMMVote = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const AMMCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMCreate.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateAMMVote(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Asset == null) {
        throw new errors_1.ValidationError('AMMVote: missing field Asset');
    }
    if (!(0, common_1.isCurrency)(tx.Asset)) {
        throw new errors_1.ValidationError('AMMVote: Asset must be a Currency');
    }
    if (tx.Asset2 == null) {
        throw new errors_1.ValidationError('AMMVote: missing field Asset2');
    }
    if (!(0, common_1.isCurrency)(tx.Asset2)) {
        throw new errors_1.ValidationError('AMMVote: Asset2 must be a Currency');
    }
    if (tx.TradingFee == null) {
        throw new errors_1.ValidationError('AMMVote: missing field TradingFee');
    }
    if (typeof tx.TradingFee !== 'number') {
        throw new errors_1.ValidationError('AMMVote: TradingFee must be a number');
    }
    if (tx.TradingFee < 0 || tx.TradingFee > AMMCreate_1.AMM_MAX_TRADING_FEE) {
        throw new errors_1.ValidationError(`AMMVote: TradingFee must be between 0 and ${AMMCreate_1.AMM_MAX_TRADING_FEE}`);
    }
}
exports.validateAMMVote = validateAMMVote; //# sourceMappingURL=AMMVote.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/checkCancel.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateCheckCancel = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateCheckCancel(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.CheckID !== undefined && typeof tx.CheckID !== 'string') {
        throw new errors_1.ValidationError('CheckCancel: invalid CheckID');
    }
}
exports.validateCheckCancel = validateCheckCancel; //# sourceMappingURL=checkCancel.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/checkCash.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateCheckCash = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateCheckCash(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount == null && tx.DeliverMin == null) {
        throw new errors_1.ValidationError('CheckCash: must have either Amount or DeliverMin');
    }
    if (tx.Amount != null && tx.DeliverMin != null) {
        throw new errors_1.ValidationError('CheckCash: cannot have both Amount and DeliverMin');
    }
    if (tx.Amount != null && tx.Amount !== undefined && !(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('CheckCash: invalid Amount');
    }
    if (tx.DeliverMin != null && tx.DeliverMin !== undefined && !(0, common_1.isAmount)(tx.DeliverMin)) {
        throw new errors_1.ValidationError('CheckCash: invalid DeliverMin');
    }
    if (tx.CheckID !== undefined && typeof tx.CheckID !== 'string') {
        throw new errors_1.ValidationError('CheckCash: invalid CheckID');
    }
}
exports.validateCheckCash = validateCheckCash; //# sourceMappingURL=checkCash.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/checkCreate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateCheckCreate = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateCheckCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.SendMax === undefined) {
        throw new errors_1.ValidationError('CheckCreate: missing field SendMax');
    }
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'DestinationTag', common_1.isNumber);
    if (typeof tx.SendMax !== 'string' && !(0, common_1.isIssuedCurrency)(tx.SendMax)) {
        throw new errors_1.ValidationError('CheckCreate: invalid SendMax');
    }
    if (tx.Expiration !== undefined && typeof tx.Expiration !== 'number') {
        throw new errors_1.ValidationError('CheckCreate: invalid Expiration');
    }
    if (tx.InvoiceID !== undefined && typeof tx.InvoiceID !== 'string') {
        throw new errors_1.ValidationError('CheckCreate: invalid InvoiceID');
    }
}
exports.validateCheckCreate = validateCheckCreate; //# sourceMappingURL=checkCreate.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/clawback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateClawback = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateClawback(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount == null) {
        throw new errors_1.ValidationError('Clawback: missing field Amount');
    }
    if (!(0, common_1.isIssuedCurrency)(tx.Amount)) {
        throw new errors_1.ValidationError('Clawback: invalid Amount');
    }
    if ((0, common_1.isIssuedCurrency)(tx.Amount) && tx.Account === tx.Amount.issuer) {
        throw new errors_1.ValidationError('Clawback: invalid holder Account');
    }
}
exports.validateClawback = validateClawback; //# sourceMappingURL=clawback.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/depositPreauth.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateDepositPreauth = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateDepositPreauth(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Authorize !== undefined && tx.Unauthorize !== undefined) {
        throw new errors_1.ValidationError("DepositPreauth: can't provide both Authorize and Unauthorize fields");
    }
    if (tx.Authorize === undefined && tx.Unauthorize === undefined) {
        throw new errors_1.ValidationError('DepositPreauth: must provide either Authorize or Unauthorize field');
    }
    if (tx.Authorize !== undefined) {
        if (typeof tx.Authorize !== 'string') {
            throw new errors_1.ValidationError('DepositPreauth: Authorize must be a string');
        }
        if (tx.Account === tx.Authorize) {
            throw new errors_1.ValidationError("DepositPreauth: Account can't preauthorize its own address");
        }
    }
    if (tx.Unauthorize !== undefined) {
        if (typeof tx.Unauthorize !== 'string') {
            throw new errors_1.ValidationError('DepositPreauth: Unauthorize must be a string');
        }
        if (tx.Account === tx.Unauthorize) {
            throw new errors_1.ValidationError("DepositPreauth: Account can't unauthorize its own address");
        }
    }
}
exports.validateDepositPreauth = validateDepositPreauth; //# sourceMappingURL=depositPreauth.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/DIDDelete.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateDIDDelete = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateDIDDelete(tx) {
    (0, common_1.validateBaseTransaction)(tx);
}
exports.validateDIDDelete = validateDIDDelete; //# sourceMappingURL=DIDDelete.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/DIDSet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateDIDSet = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateDIDSet(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateOptionalField)(tx, 'Data', common_1.isString);
    (0, common_1.validateOptionalField)(tx, 'DIDDocument', common_1.isString);
    (0, common_1.validateOptionalField)(tx, 'URI', common_1.isString);
    if (tx.Data === undefined && tx.DIDDocument === undefined && tx.URI === undefined) {
        throw new errors_1.ValidationError('DIDSet: Must have at least one of `Data`, `DIDDocument`, and `URI`');
    }
}
exports.validateDIDSet = validateDIDSet; //# sourceMappingURL=DIDSet.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/escrowCancel.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateEscrowCancel = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateEscrowCancel(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'Owner', common_1.isAccount);
    if (tx.OfferSequence == null) {
        throw new errors_1.ValidationError('EscrowCancel: missing OfferSequence');
    }
    if (typeof tx.OfferSequence !== 'number' && typeof tx.OfferSequence !== 'string' || Number.isNaN(Number(tx.OfferSequence))) {
        throw new errors_1.ValidationError('EscrowCancel: OfferSequence must be a number');
    }
}
exports.validateEscrowCancel = validateEscrowCancel; //# sourceMappingURL=escrowCancel.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/escrowCreate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateEscrowCreate = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateEscrowCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount === undefined) {
        throw new errors_1.ValidationError('EscrowCreate: missing field Amount');
    }
    if (typeof tx.Amount !== 'string') {
        throw new errors_1.ValidationError('EscrowCreate: Amount must be a string');
    }
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'DestinationTag', common_1.isNumber);
    if (tx.CancelAfter === undefined && tx.FinishAfter === undefined) {
        throw new errors_1.ValidationError('EscrowCreate: Either CancelAfter or FinishAfter must be specified');
    }
    if (tx.FinishAfter === undefined && tx.Condition === undefined) {
        throw new errors_1.ValidationError('EscrowCreate: Either Condition or FinishAfter must be specified');
    }
    if (tx.CancelAfter !== undefined && typeof tx.CancelAfter !== 'number') {
        throw new errors_1.ValidationError('EscrowCreate: CancelAfter must be a number');
    }
    if (tx.FinishAfter !== undefined && typeof tx.FinishAfter !== 'number') {
        throw new errors_1.ValidationError('EscrowCreate: FinishAfter must be a number');
    }
    if (tx.Condition !== undefined && typeof tx.Condition !== 'string') {
        throw new errors_1.ValidationError('EscrowCreate: Condition must be a string');
    }
}
exports.validateEscrowCreate = validateEscrowCreate; //# sourceMappingURL=escrowCreate.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/escrowFinish.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateEscrowFinish = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateEscrowFinish(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'Owner', common_1.isAccount);
    if (tx.OfferSequence == null) {
        throw new errors_1.ValidationError('EscrowFinish: missing field OfferSequence');
    }
    if (typeof tx.OfferSequence !== 'number' && typeof tx.OfferSequence !== 'string' || Number.isNaN(Number(tx.OfferSequence))) {
        throw new errors_1.ValidationError('EscrowFinish: OfferSequence must be a number');
    }
    if (tx.Condition !== undefined && typeof tx.Condition !== 'string') {
        throw new errors_1.ValidationError('EscrowFinish: Condition must be a string');
    }
    if (tx.Fulfillment !== undefined && typeof tx.Fulfillment !== 'string') {
        throw new errors_1.ValidationError('EscrowFinish: Fulfillment must be a string');
    }
}
exports.validateEscrowFinish = validateEscrowFinish; //# sourceMappingURL=escrowFinish.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenAcceptOffer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateNFTokenAcceptOffer = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateNFTokenBrokerFee(tx) {
    const value = (0, common_1.parseAmountValue)(tx.NFTokenBrokerFee);
    if (Number.isNaN(value)) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: invalid NFTokenBrokerFee');
    }
    if (value <= 0) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: NFTokenBrokerFee must be greater than 0; omit if there is no fee');
    }
    if (tx.NFTokenSellOffer == null || tx.NFTokenBuyOffer == null) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: both NFTokenSellOffer and NFTokenBuyOffer must be set if using brokered mode');
    }
}
function validateNFTokenAcceptOffer(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.NFTokenBrokerFee != null) {
        validateNFTokenBrokerFee(tx);
    }
    if (tx.NFTokenSellOffer == null && tx.NFTokenBuyOffer == null) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: must set either NFTokenSellOffer or NFTokenBuyOffer');
    }
}
exports.validateNFTokenAcceptOffer = validateNFTokenAcceptOffer; //# sourceMappingURL=NFTokenAcceptOffer.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenBurn.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateNFTokenBurn = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateNFTokenBurn(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'NFTokenID', common_1.isString);
    (0, common_1.validateOptionalField)(tx, 'Owner', common_1.isAccount);
}
exports.validateNFTokenBurn = validateNFTokenBurn; //# sourceMappingURL=NFTokenBurn.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenCancelOffer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateNFTokenCancelOffer = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateNFTokenCancelOffer(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (!Array.isArray(tx.NFTokenOffers)) {
        throw new errors_1.ValidationError('NFTokenCancelOffer: missing field NFTokenOffers');
    }
    if (tx.NFTokenOffers.length < 1) {
        throw new errors_1.ValidationError('NFTokenCancelOffer: empty field NFTokenOffers');
    }
}
exports.validateNFTokenCancelOffer = validateNFTokenCancelOffer; //# sourceMappingURL=NFTokenCancelOffer.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/offerCancel.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateOfferCancel = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateOfferCancel(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.OfferSequence === undefined) {
        throw new errors_1.ValidationError('OfferCancel: missing field OfferSequence');
    }
    if (typeof tx.OfferSequence !== 'number') {
        throw new errors_1.ValidationError('OfferCancel: OfferSequence must be a number');
    }
}
exports.validateOfferCancel = validateOfferCancel; //# sourceMappingURL=offerCancel.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/oracleDelete.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateOracleDelete = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateOracleDelete(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'OracleDocumentID', common_1.isNumber);
}
exports.validateOracleDelete = validateOracleDelete; //# sourceMappingURL=oracleDelete.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/oracleSet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateOracleSet = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
const PRICE_DATA_SERIES_MAX_LENGTH = 10;
const SCALE_MAX = 10;
function validateOracleSet(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'OracleDocumentID', common_1.isNumber);
    (0, common_1.validateRequiredField)(tx, 'LastUpdateTime', common_1.isNumber);
    (0, common_1.validateOptionalField)(tx, 'Provider', common_1.isString);
    (0, common_1.validateOptionalField)(tx, 'URI', common_1.isString);
    (0, common_1.validateOptionalField)(tx, 'AssetClass', common_1.isString);
    (0, common_1.validateRequiredField)(tx, 'PriceDataSeries', (value)=>{
        if (!Array.isArray(value)) {
            throw new errors_1.ValidationError('OracleSet: PriceDataSeries must be an array');
        }
        if (value.length > PRICE_DATA_SERIES_MAX_LENGTH) {
            throw new errors_1.ValidationError(`OracleSet: PriceDataSeries must have at most ${PRICE_DATA_SERIES_MAX_LENGTH} PriceData objects`);
        }
        for (const priceData of value){
            if (typeof priceData !== 'object') {
                throw new errors_1.ValidationError('OracleSet: PriceDataSeries must be an array of objects');
            }
            if (priceData.PriceData == null) {
                throw new errors_1.ValidationError('OracleSet: PriceDataSeries must have a `PriceData` object');
            }
            if (Object.keys(priceData).length !== 1) {
                throw new errors_1.ValidationError('OracleSet: PriceDataSeries must only have a single PriceData object');
            }
            if (typeof priceData.PriceData.BaseAsset !== 'string') {
                throw new errors_1.ValidationError('OracleSet: PriceDataSeries must have a `BaseAsset` string');
            }
            if (typeof priceData.PriceData.QuoteAsset !== 'string') {
                throw new errors_1.ValidationError('OracleSet: PriceDataSeries must have a `QuoteAsset` string');
            }
            if (priceData.PriceData.AssetPrice == null !== (priceData.PriceData.Scale == null)) {
                throw new errors_1.ValidationError('OracleSet: PriceDataSeries must have both `AssetPrice` and `Scale` if any are present');
            }
            if ('AssetPrice' in priceData.PriceData && !(0, common_1.isNumber)(priceData.PriceData.AssetPrice)) {
                throw new errors_1.ValidationError('OracleSet: invalid field AssetPrice');
            }
            if ('Scale' in priceData.PriceData && !(0, common_1.isNumber)(priceData.PriceData.Scale)) {
                throw new errors_1.ValidationError('OracleSet: invalid field Scale');
            }
            if (priceData.PriceData.Scale < 0 || priceData.PriceData.Scale > SCALE_MAX) {
                throw new errors_1.ValidationError(`OracleSet: Scale must be in range 0-${SCALE_MAX}`);
            }
        }
        return true;
    });
}
exports.validateOracleSet = validateOracleSet; //# sourceMappingURL=oracleSet.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelCreate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validatePaymentChannelCreate = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validatePaymentChannelCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing Amount');
    }
    if (typeof tx.Amount !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelCreate: Amount must be a string');
    }
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'DestinationTag', common_1.isNumber);
    if (tx.SettleDelay === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing SettleDelay');
    }
    if (typeof tx.SettleDelay !== 'number') {
        throw new errors_1.ValidationError('PaymentChannelCreate: SettleDelay must be a number');
    }
    if (tx.PublicKey === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing PublicKey');
    }
    if (typeof tx.PublicKey !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelCreate: PublicKey must be a string');
    }
    if (tx.CancelAfter !== undefined && typeof tx.CancelAfter !== 'number') {
        throw new errors_1.ValidationError('PaymentChannelCreate: CancelAfter must be a number');
    }
}
exports.validatePaymentChannelCreate = validatePaymentChannelCreate; //# sourceMappingURL=paymentChannelCreate.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelFund.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validatePaymentChannelFund = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validatePaymentChannelFund(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Channel === undefined) {
        throw new errors_1.ValidationError('PaymentChannelFund: missing Channel');
    }
    if (typeof tx.Channel !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelFund: Channel must be a string');
    }
    if (tx.Amount === undefined) {
        throw new errors_1.ValidationError('PaymentChannelFund: missing Amount');
    }
    if (typeof tx.Amount !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelFund: Amount must be a string');
    }
    if (tx.Expiration !== undefined && typeof tx.Expiration !== 'number') {
        throw new errors_1.ValidationError('PaymentChannelFund: Expiration must be a number');
    }
}
exports.validatePaymentChannelFund = validatePaymentChannelFund; //# sourceMappingURL=paymentChannelFund.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/setRegularKey.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateSetRegularKey = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateSetRegularKey(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.RegularKey !== undefined && typeof tx.RegularKey !== 'string') {
        throw new errors_1.ValidationError('SetRegularKey: RegularKey must be a string');
    }
}
exports.validateSetRegularKey = validateSetRegularKey; //# sourceMappingURL=setRegularKey.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/signerListSet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateSignerListSet = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
const MAX_SIGNERS = 32;
const HEX_WALLET_LOCATOR_REGEX = /^[0-9A-Fa-f]{64}$/u;
function validateSignerListSet(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.SignerQuorum === undefined) {
        throw new errors_1.ValidationError('SignerListSet: missing field SignerQuorum');
    }
    if (typeof tx.SignerQuorum !== 'number') {
        throw new errors_1.ValidationError('SignerListSet: invalid SignerQuorum');
    }
    if (tx.SignerQuorum === 0) {
        return;
    }
    if (tx.SignerEntries === undefined) {
        throw new errors_1.ValidationError('SignerListSet: missing field SignerEntries');
    }
    if (!Array.isArray(tx.SignerEntries)) {
        throw new errors_1.ValidationError('SignerListSet: invalid SignerEntries');
    }
    if (tx.SignerEntries.length === 0) {
        throw new errors_1.ValidationError('SignerListSet: need at least 1 member in SignerEntries');
    }
    if (tx.SignerEntries.length > MAX_SIGNERS) {
        throw new errors_1.ValidationError(`SignerListSet: maximum of ${MAX_SIGNERS} members allowed in SignerEntries`);
    }
    for (const entry of tx.SignerEntries){
        const signerEntry = entry;
        const { WalletLocator } = signerEntry.SignerEntry;
        if (WalletLocator !== undefined && !HEX_WALLET_LOCATOR_REGEX.test(WalletLocator)) {
            throw new errors_1.ValidationError(`SignerListSet: WalletLocator in SignerEntry must be a 256-bit (32-byte) hexadecimal value`);
        }
    }
}
exports.validateSignerListSet = validateSignerListSet; //# sourceMappingURL=signerListSet.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/ticketCreate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTicketCreate = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
const MAX_TICKETS = 250;
function validateTicketCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    const { TicketCount } = tx;
    if (TicketCount === undefined) {
        throw new errors_1.ValidationError('TicketCreate: missing field TicketCount');
    }
    if (typeof TicketCount !== 'number') {
        throw new errors_1.ValidationError('TicketCreate: TicketCount must be a number');
    }
    if (!Number.isInteger(TicketCount) || TicketCount < 1 || TicketCount > MAX_TICKETS) {
        throw new errors_1.ValidationError('TicketCreate: TicketCount must be an integer from 1 to 250');
    }
}
exports.validateTicketCreate = validateTicketCreate; //# sourceMappingURL=ticketCreate.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainAccountCreateCommit.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainAccountCreateCommit = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainAccountCreateCommit(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateRequiredField)(tx, 'SignatureReward', common_1.isAmount);
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'Amount', common_1.isAmount);
}
exports.validateXChainAccountCreateCommit = validateXChainAccountCreateCommit; //# sourceMappingURL=XChainAccountCreateCommit.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainAddAccountCreateAttestation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainAddAccountCreateAttestation = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainAddAccountCreateAttestation(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'Amount', common_1.isAmount);
    (0, common_1.validateRequiredField)(tx, 'AttestationRewardAccount', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'AttestationSignerAccount', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'OtherChainSource', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'PublicKey', common_1.isString);
    (0, common_1.validateRequiredField)(tx, 'Signature', common_1.isString);
    (0, common_1.validateRequiredField)(tx, 'SignatureReward', common_1.isAmount);
    (0, common_1.validateRequiredField)(tx, 'WasLockingChainSend', (inp)=>inp === 0 || inp === 1);
    (0, common_1.validateRequiredField)(tx, 'XChainAccountCreateCount', (inp)=>(0, common_1.isNumber)(inp) || (0, common_1.isString)(inp));
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
}
exports.validateXChainAddAccountCreateAttestation = validateXChainAddAccountCreateAttestation; //# sourceMappingURL=XChainAddAccountCreateAttestation.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainAddClaimAttestation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainAddClaimAttestation = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainAddClaimAttestation(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'Amount', common_1.isAmount);
    (0, common_1.validateRequiredField)(tx, 'AttestationRewardAccount', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'AttestationSignerAccount', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'OtherChainSource', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'PublicKey', common_1.isString);
    (0, common_1.validateRequiredField)(tx, 'Signature', common_1.isString);
    (0, common_1.validateRequiredField)(tx, 'WasLockingChainSend', (inp)=>inp === 0 || inp === 1);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateRequiredField)(tx, 'XChainClaimID', (inp)=>(0, common_1.isNumber)(inp) || (0, common_1.isString)(inp));
}
exports.validateXChainAddClaimAttestation = validateXChainAddClaimAttestation; //# sourceMappingURL=XChainAddClaimAttestation.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainClaim.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainClaim = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainClaim(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateRequiredField)(tx, 'XChainClaimID', (inp)=>(0, common_1.isNumber)(inp) || (0, common_1.isString)(inp));
    (0, common_1.validateRequiredField)(tx, 'Destination', common_1.isAccount);
    (0, common_1.validateOptionalField)(tx, 'DestinationTag', common_1.isNumber);
    (0, common_1.validateRequiredField)(tx, 'Amount', common_1.isAmount);
}
exports.validateXChainClaim = validateXChainClaim; //# sourceMappingURL=XChainClaim.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainCommit.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainCommit = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainCommit(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateRequiredField)(tx, 'XChainClaimID', (inp)=>(0, common_1.isNumber)(inp) || (0, common_1.isString)(inp));
    (0, common_1.validateOptionalField)(tx, 'OtherChainDestination', common_1.isAccount);
    (0, common_1.validateRequiredField)(tx, 'Amount', common_1.isAmount);
}
exports.validateXChainCommit = validateXChainCommit; //# sourceMappingURL=XChainCommit.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainCreateBridge.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainCreateBridge = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainCreateBridge(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateRequiredField)(tx, 'SignatureReward', common_1.isAmount);
    (0, common_1.validateOptionalField)(tx, 'MinAccountCreateAmount', common_1.isAmount);
}
exports.validateXChainCreateBridge = validateXChainCreateBridge; //# sourceMappingURL=XChainCreateBridge.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainCreateClaimID.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateXChainCreateClaimID = void 0;
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
function validateXChainCreateClaimID(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    (0, common_1.validateRequiredField)(tx, 'XChainBridge', common_1.isXChainBridge);
    (0, common_1.validateRequiredField)(tx, 'SignatureReward', common_1.isAmount);
    (0, common_1.validateRequiredField)(tx, 'OtherChainSource', common_1.isAccount);
}
exports.validateXChainCreateClaimID = validateXChainCreateClaimID; //# sourceMappingURL=XChainCreateClaimID.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
const flags_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/flags.js [app-ssr] (ecmascript)");
const accountDelete_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/accountDelete.js [app-ssr] (ecmascript)");
const accountSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/accountSet.js [app-ssr] (ecmascript)");
const AMMBid_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMBid.js [app-ssr] (ecmascript)");
const AMMCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMCreate.js [app-ssr] (ecmascript)");
const AMMDelete_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMDelete.js [app-ssr] (ecmascript)");
const AMMDeposit_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMDeposit.js [app-ssr] (ecmascript)");
const AMMVote_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMVote.js [app-ssr] (ecmascript)");
const AMMWithdraw_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMWithdraw.js [app-ssr] (ecmascript)");
const checkCancel_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/checkCancel.js [app-ssr] (ecmascript)");
const checkCash_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/checkCash.js [app-ssr] (ecmascript)");
const checkCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/checkCreate.js [app-ssr] (ecmascript)");
const clawback_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/clawback.js [app-ssr] (ecmascript)");
const common_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/common.js [app-ssr] (ecmascript)");
const depositPreauth_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/depositPreauth.js [app-ssr] (ecmascript)");
const DIDDelete_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/DIDDelete.js [app-ssr] (ecmascript)");
const DIDSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/DIDSet.js [app-ssr] (ecmascript)");
const escrowCancel_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/escrowCancel.js [app-ssr] (ecmascript)");
const escrowCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/escrowCreate.js [app-ssr] (ecmascript)");
const escrowFinish_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/escrowFinish.js [app-ssr] (ecmascript)");
const NFTokenAcceptOffer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenAcceptOffer.js [app-ssr] (ecmascript)");
const NFTokenBurn_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenBurn.js [app-ssr] (ecmascript)");
const NFTokenCancelOffer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenCancelOffer.js [app-ssr] (ecmascript)");
const NFTokenCreateOffer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenCreateOffer.js [app-ssr] (ecmascript)");
const NFTokenMint_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenMint.js [app-ssr] (ecmascript)");
const offerCancel_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/offerCancel.js [app-ssr] (ecmascript)");
const offerCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/offerCreate.js [app-ssr] (ecmascript)");
const oracleDelete_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/oracleDelete.js [app-ssr] (ecmascript)");
const oracleSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/oracleSet.js [app-ssr] (ecmascript)");
const payment_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/payment.js [app-ssr] (ecmascript)");
const paymentChannelClaim_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelClaim.js [app-ssr] (ecmascript)");
const paymentChannelCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelCreate.js [app-ssr] (ecmascript)");
const paymentChannelFund_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelFund.js [app-ssr] (ecmascript)");
const setRegularKey_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/setRegularKey.js [app-ssr] (ecmascript)");
const signerListSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/signerListSet.js [app-ssr] (ecmascript)");
const ticketCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/ticketCreate.js [app-ssr] (ecmascript)");
const trustSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/trustSet.js [app-ssr] (ecmascript)");
const XChainAccountCreateCommit_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainAccountCreateCommit.js [app-ssr] (ecmascript)");
const XChainAddAccountCreateAttestation_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainAddAccountCreateAttestation.js [app-ssr] (ecmascript)");
const XChainAddClaimAttestation_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainAddClaimAttestation.js [app-ssr] (ecmascript)");
const XChainClaim_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainClaim.js [app-ssr] (ecmascript)");
const XChainCommit_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainCommit.js [app-ssr] (ecmascript)");
const XChainCreateBridge_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainCreateBridge.js [app-ssr] (ecmascript)");
const XChainCreateClaimID_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainCreateClaimID.js [app-ssr] (ecmascript)");
const XChainModifyBridge_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainModifyBridge.js [app-ssr] (ecmascript)");
function validate(transaction) {
    const tx = Object.assign({}, transaction);
    if (tx.TransactionType == null) {
        throw new errors_1.ValidationError('Object does not have a `TransactionType`');
    }
    if (typeof tx.TransactionType !== 'string') {
        throw new errors_1.ValidationError("Object's `TransactionType` is not a string");
    }
    if (tx.Memos != null && typeof tx.Memos !== 'object') {
        throw new errors_1.ValidationError('Memo must be array');
    }
    if (tx.Memos != null) {
        ;
        tx.Memos.forEach((memo)=>{
            if ((memo === null || memo === void 0 ? void 0 : memo.Memo) == null) {
                throw new errors_1.ValidationError('Memo data must be in a `Memo` field');
            }
            if (memo.Memo.MemoData) {
                if (!(0, utils_1.isHex)(memo.Memo.MemoData)) {
                    throw new errors_1.ValidationError('MemoData field must be a hex value');
                }
            }
            if (memo.Memo.MemoType) {
                if (!(0, utils_1.isHex)(memo.Memo.MemoType)) {
                    throw new errors_1.ValidationError('MemoType field must be a hex value');
                }
            }
            if (memo.Memo.MemoFormat) {
                if (!(0, utils_1.isHex)(memo.Memo.MemoFormat)) {
                    throw new errors_1.ValidationError('MemoFormat field must be a hex value');
                }
            }
        });
    }
    Object.keys(tx).forEach((key)=>{
        const standard_currency_code_len = 3;
        if (tx[key] && (0, common_1.isIssuedCurrency)(tx[key])) {
            const txCurrency = tx[key].currency;
            if (txCurrency.length === standard_currency_code_len && txCurrency.toUpperCase() === 'XRP') {
                throw new errors_1.ValidationError(`Cannot have an issued currency with a similar standard code to XRP (received '${txCurrency}'). XRP is not an issued currency.`);
            }
        }
    });
    (0, flags_1.setTransactionFlagsToNumber)(tx);
    switch(tx.TransactionType){
        case 'AMMBid':
            (0, AMMBid_1.validateAMMBid)(tx);
            break;
        case 'AMMCreate':
            (0, AMMCreate_1.validateAMMCreate)(tx);
            break;
        case 'AMMDelete':
            (0, AMMDelete_1.validateAMMDelete)(tx);
            break;
        case 'AMMDeposit':
            (0, AMMDeposit_1.validateAMMDeposit)(tx);
            break;
        case 'AMMVote':
            (0, AMMVote_1.validateAMMVote)(tx);
            break;
        case 'AMMWithdraw':
            (0, AMMWithdraw_1.validateAMMWithdraw)(tx);
            break;
        case 'AccountDelete':
            (0, accountDelete_1.validateAccountDelete)(tx);
            break;
        case 'AccountSet':
            (0, accountSet_1.validateAccountSet)(tx);
            break;
        case 'CheckCancel':
            (0, checkCancel_1.validateCheckCancel)(tx);
            break;
        case 'CheckCash':
            (0, checkCash_1.validateCheckCash)(tx);
            break;
        case 'CheckCreate':
            (0, checkCreate_1.validateCheckCreate)(tx);
            break;
        case 'Clawback':
            (0, clawback_1.validateClawback)(tx);
            break;
        case 'DIDDelete':
            (0, DIDDelete_1.validateDIDDelete)(tx);
            break;
        case 'DIDSet':
            (0, DIDSet_1.validateDIDSet)(tx);
            break;
        case 'DepositPreauth':
            (0, depositPreauth_1.validateDepositPreauth)(tx);
            break;
        case 'EscrowCancel':
            (0, escrowCancel_1.validateEscrowCancel)(tx);
            break;
        case 'EscrowCreate':
            (0, escrowCreate_1.validateEscrowCreate)(tx);
            break;
        case 'EscrowFinish':
            (0, escrowFinish_1.validateEscrowFinish)(tx);
            break;
        case 'NFTokenAcceptOffer':
            (0, NFTokenAcceptOffer_1.validateNFTokenAcceptOffer)(tx);
            break;
        case 'NFTokenBurn':
            (0, NFTokenBurn_1.validateNFTokenBurn)(tx);
            break;
        case 'NFTokenCancelOffer':
            (0, NFTokenCancelOffer_1.validateNFTokenCancelOffer)(tx);
            break;
        case 'NFTokenCreateOffer':
            (0, NFTokenCreateOffer_1.validateNFTokenCreateOffer)(tx);
            break;
        case 'NFTokenMint':
            (0, NFTokenMint_1.validateNFTokenMint)(tx);
            break;
        case 'OfferCancel':
            (0, offerCancel_1.validateOfferCancel)(tx);
            break;
        case 'OfferCreate':
            (0, offerCreate_1.validateOfferCreate)(tx);
            break;
        case 'OracleDelete':
            (0, oracleDelete_1.validateOracleDelete)(tx);
            break;
        case 'OracleSet':
            (0, oracleSet_1.validateOracleSet)(tx);
            break;
        case 'Payment':
            (0, payment_1.validatePayment)(tx);
            break;
        case 'PaymentChannelClaim':
            (0, paymentChannelClaim_1.validatePaymentChannelClaim)(tx);
            break;
        case 'PaymentChannelCreate':
            (0, paymentChannelCreate_1.validatePaymentChannelCreate)(tx);
            break;
        case 'PaymentChannelFund':
            (0, paymentChannelFund_1.validatePaymentChannelFund)(tx);
            break;
        case 'SetRegularKey':
            (0, setRegularKey_1.validateSetRegularKey)(tx);
            break;
        case 'SignerListSet':
            (0, signerListSet_1.validateSignerListSet)(tx);
            break;
        case 'TicketCreate':
            (0, ticketCreate_1.validateTicketCreate)(tx);
            break;
        case 'TrustSet':
            (0, trustSet_1.validateTrustSet)(tx);
            break;
        case 'XChainAccountCreateCommit':
            (0, XChainAccountCreateCommit_1.validateXChainAccountCreateCommit)(tx);
            break;
        case 'XChainAddAccountCreateAttestation':
            (0, XChainAddAccountCreateAttestation_1.validateXChainAddAccountCreateAttestation)(tx);
            break;
        case 'XChainAddClaimAttestation':
            (0, XChainAddClaimAttestation_1.validateXChainAddClaimAttestation)(tx);
            break;
        case 'XChainClaim':
            (0, XChainClaim_1.validateXChainClaim)(tx);
            break;
        case 'XChainCommit':
            (0, XChainCommit_1.validateXChainCommit)(tx);
            break;
        case 'XChainCreateBridge':
            (0, XChainCreateBridge_1.validateXChainCreateBridge)(tx);
            break;
        case 'XChainCreateClaimID':
            (0, XChainCreateClaimID_1.validateXChainCreateClaimID)(tx);
            break;
        case 'XChainModifyBridge':
            (0, XChainModifyBridge_1.validateXChainModifyBridge)(tx);
            break;
        default:
            throw new errors_1.ValidationError(`Invalid field TransactionType: ${tx.TransactionType}`);
    }
}
exports.validate = validate; //# sourceMappingURL=transaction.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/enableAmendment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EnableAmendmentFlags = void 0;
var EnableAmendmentFlags;
(function(EnableAmendmentFlags) {
    EnableAmendmentFlags[EnableAmendmentFlags["tfGotMajority"] = 65536] = "tfGotMajority";
    EnableAmendmentFlags[EnableAmendmentFlags["tfLostMajority"] = 131072] = "tfLostMajority";
})(EnableAmendmentFlags || (exports.EnableAmendmentFlags = EnableAmendmentFlags = {})); //# sourceMappingURL=enableAmendment.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XChainModifyBridgeFlags = exports.TrustSetFlags = exports.PaymentChannelClaimFlags = exports.PaymentFlags = exports.OfferCreateFlags = exports.NFTokenMintFlags = exports.NFTokenCreateOfferFlags = exports.EnableAmendmentFlags = exports.AMMWithdrawFlags = exports.AMMDepositFlags = exports.AccountSetTfFlags = exports.AccountSetAsfFlags = exports.validate = void 0;
var transaction_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/transaction.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
        return transaction_1.validate;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/metadata.js [app-ssr] (ecmascript)"), exports);
var accountSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/accountSet.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "AccountSetAsfFlags", {
    enumerable: true,
    get: function() {
        return accountSet_1.AccountSetAsfFlags;
    }
});
Object.defineProperty(exports, "AccountSetTfFlags", {
    enumerable: true,
    get: function() {
        return accountSet_1.AccountSetTfFlags;
    }
});
var AMMDeposit_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMDeposit.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "AMMDepositFlags", {
    enumerable: true,
    get: function() {
        return AMMDeposit_1.AMMDepositFlags;
    }
});
var AMMWithdraw_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/AMMWithdraw.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "AMMWithdrawFlags", {
    enumerable: true,
    get: function() {
        return AMMWithdraw_1.AMMWithdrawFlags;
    }
});
var enableAmendment_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/enableAmendment.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "EnableAmendmentFlags", {
    enumerable: true,
    get: function() {
        return enableAmendment_1.EnableAmendmentFlags;
    }
});
var NFTokenCreateOffer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenCreateOffer.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "NFTokenCreateOfferFlags", {
    enumerable: true,
    get: function() {
        return NFTokenCreateOffer_1.NFTokenCreateOfferFlags;
    }
});
var NFTokenMint_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/NFTokenMint.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "NFTokenMintFlags", {
    enumerable: true,
    get: function() {
        return NFTokenMint_1.NFTokenMintFlags;
    }
});
var offerCreate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/offerCreate.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "OfferCreateFlags", {
    enumerable: true,
    get: function() {
        return offerCreate_1.OfferCreateFlags;
    }
});
var payment_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/payment.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "PaymentFlags", {
    enumerable: true,
    get: function() {
        return payment_1.PaymentFlags;
    }
});
var paymentChannelClaim_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/paymentChannelClaim.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "PaymentChannelClaimFlags", {
    enumerable: true,
    get: function() {
        return paymentChannelClaim_1.PaymentChannelClaimFlags;
    }
});
var trustSet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/trustSet.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "TrustSetFlags", {
    enumerable: true,
    get: function() {
        return trustSet_1.TrustSetFlags;
    }
});
var XChainModifyBridge_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/XChainModifyBridge.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "XChainModifyBridgeFlags", {
    enumerable: true,
    get: function() {
        return XChainModifyBridge_1.XChainModifyBridgeFlags;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/rfc1751Words.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[\"A\",\"ABE\",\"ACE\",\"ACT\",\"AD\",\"ADA\",\"ADD\",\"AGO\",\"AID\",\"AIM\",\"AIR\",\"ALL\",\"ALP\",\"AM\",\"AMY\",\"AN\",\"ANA\",\"AND\",\"ANN\",\"ANT\",\"ANY\",\"APE\",\"APS\",\"APT\",\"ARC\",\"ARE\",\"ARK\",\"ARM\",\"ART\",\"AS\",\"ASH\",\"ASK\",\"AT\",\"ATE\",\"AUG\",\"AUK\",\"AVE\",\"AWE\",\"AWK\",\"AWL\",\"AWN\",\"AX\",\"AYE\",\"BAD\",\"BAG\",\"BAH\",\"BAM\",\"BAN\",\"BAR\",\"BAT\",\"BAY\",\"BE\",\"BED\",\"BEE\",\"BEG\",\"BEN\",\"BET\",\"BEY\",\"BIB\",\"BID\",\"BIG\",\"BIN\",\"BIT\",\"BOB\",\"BOG\",\"BON\",\"BOO\",\"BOP\",\"BOW\",\"BOY\",\"BUB\",\"BUD\",\"BUG\",\"BUM\",\"BUN\",\"BUS\",\"BUT\",\"BUY\",\"BY\",\"BYE\",\"CAB\",\"CAL\",\"CAM\",\"CAN\",\"CAP\",\"CAR\",\"CAT\",\"CAW\",\"COD\",\"COG\",\"COL\",\"CON\",\"COO\",\"COP\",\"COT\",\"COW\",\"COY\",\"CRY\",\"CUB\",\"CUE\",\"CUP\",\"CUR\",\"CUT\",\"DAB\",\"DAD\",\"DAM\",\"DAN\",\"DAR\",\"DAY\",\"DEE\",\"DEL\",\"DEN\",\"DES\",\"DEW\",\"DID\",\"DIE\",\"DIG\",\"DIN\",\"DIP\",\"DO\",\"DOE\",\"DOG\",\"DON\",\"DOT\",\"DOW\",\"DRY\",\"DUB\",\"DUD\",\"DUE\",\"DUG\",\"DUN\",\"EAR\",\"EAT\",\"ED\",\"EEL\",\"EGG\",\"EGO\",\"ELI\",\"ELK\",\"ELM\",\"ELY\",\"EM\",\"END\",\"EST\",\"ETC\",\"EVA\",\"EVE\",\"EWE\",\"EYE\",\"FAD\",\"FAN\",\"FAR\",\"FAT\",\"FAY\",\"FED\",\"FEE\",\"FEW\",\"FIB\",\"FIG\",\"FIN\",\"FIR\",\"FIT\",\"FLO\",\"FLY\",\"FOE\",\"FOG\",\"FOR\",\"FRY\",\"FUM\",\"FUN\",\"FUR\",\"GAB\",\"GAD\",\"GAG\",\"GAL\",\"GAM\",\"GAP\",\"GAS\",\"GAY\",\"GEE\",\"GEL\",\"GEM\",\"GET\",\"GIG\",\"GIL\",\"GIN\",\"GO\",\"GOT\",\"GUM\",\"GUN\",\"GUS\",\"GUT\",\"GUY\",\"GYM\",\"GYP\",\"HA\",\"HAD\",\"HAL\",\"HAM\",\"HAN\",\"HAP\",\"HAS\",\"HAT\",\"HAW\",\"HAY\",\"HE\",\"HEM\",\"HEN\",\"HER\",\"HEW\",\"HEY\",\"HI\",\"HID\",\"HIM\",\"HIP\",\"HIS\",\"HIT\",\"HO\",\"HOB\",\"HOC\",\"HOE\",\"HOG\",\"HOP\",\"HOT\",\"HOW\",\"HUB\",\"HUE\",\"HUG\",\"HUH\",\"HUM\",\"HUT\",\"I\",\"ICY\",\"IDA\",\"IF\",\"IKE\",\"ILL\",\"INK\",\"INN\",\"IO\",\"ION\",\"IQ\",\"IRA\",\"IRE\",\"IRK\",\"IS\",\"IT\",\"ITS\",\"IVY\",\"JAB\",\"JAG\",\"JAM\",\"JAN\",\"JAR\",\"JAW\",\"JAY\",\"JET\",\"JIG\",\"JIM\",\"JO\",\"JOB\",\"JOE\",\"JOG\",\"JOT\",\"JOY\",\"JUG\",\"JUT\",\"KAY\",\"KEG\",\"KEN\",\"KEY\",\"KID\",\"KIM\",\"KIN\",\"KIT\",\"LA\",\"LAB\",\"LAC\",\"LAD\",\"LAG\",\"LAM\",\"LAP\",\"LAW\",\"LAY\",\"LEA\",\"LED\",\"LEE\",\"LEG\",\"LEN\",\"LEO\",\"LET\",\"LEW\",\"LID\",\"LIE\",\"LIN\",\"LIP\",\"LIT\",\"LO\",\"LOB\",\"LOG\",\"LOP\",\"LOS\",\"LOT\",\"LOU\",\"LOW\",\"LOY\",\"LUG\",\"LYE\",\"MA\",\"MAC\",\"MAD\",\"MAE\",\"MAN\",\"MAO\",\"MAP\",\"MAT\",\"MAW\",\"MAY\",\"ME\",\"MEG\",\"MEL\",\"MEN\",\"MET\",\"MEW\",\"MID\",\"MIN\",\"MIT\",\"MOB\",\"MOD\",\"MOE\",\"MOO\",\"MOP\",\"MOS\",\"MOT\",\"MOW\",\"MUD\",\"MUG\",\"MUM\",\"MY\",\"NAB\",\"NAG\",\"NAN\",\"NAP\",\"NAT\",\"NAY\",\"NE\",\"NED\",\"NEE\",\"NET\",\"NEW\",\"NIB\",\"NIL\",\"NIP\",\"NIT\",\"NO\",\"NOB\",\"NOD\",\"NON\",\"NOR\",\"NOT\",\"NOV\",\"NOW\",\"NU\",\"NUN\",\"NUT\",\"O\",\"OAF\",\"OAK\",\"OAR\",\"OAT\",\"ODD\",\"ODE\",\"OF\",\"OFF\",\"OFT\",\"OH\",\"OIL\",\"OK\",\"OLD\",\"ON\",\"ONE\",\"OR\",\"ORB\",\"ORE\",\"ORR\",\"OS\",\"OTT\",\"OUR\",\"OUT\",\"OVA\",\"OW\",\"OWE\",\"OWL\",\"OWN\",\"OX\",\"PA\",\"PAD\",\"PAL\",\"PAM\",\"PAN\",\"PAP\",\"PAR\",\"PAT\",\"PAW\",\"PAY\",\"PEA\",\"PEG\",\"PEN\",\"PEP\",\"PER\",\"PET\",\"PEW\",\"PHI\",\"PI\",\"PIE\",\"PIN\",\"PIT\",\"PLY\",\"PO\",\"POD\",\"POE\",\"POP\",\"POT\",\"POW\",\"PRO\",\"PRY\",\"PUB\",\"PUG\",\"PUN\",\"PUP\",\"PUT\",\"QUO\",\"RAG\",\"RAM\",\"RAN\",\"RAP\",\"RAT\",\"RAW\",\"RAY\",\"REB\",\"RED\",\"REP\",\"RET\",\"RIB\",\"RID\",\"RIG\",\"RIM\",\"RIO\",\"RIP\",\"ROB\",\"ROD\",\"ROE\",\"RON\",\"ROT\",\"ROW\",\"ROY\",\"RUB\",\"RUE\",\"RUG\",\"RUM\",\"RUN\",\"RYE\",\"SAC\",\"SAD\",\"SAG\",\"SAL\",\"SAM\",\"SAN\",\"SAP\",\"SAT\",\"SAW\",\"SAY\",\"SEA\",\"SEC\",\"SEE\",\"SEN\",\"SET\",\"SEW\",\"SHE\",\"SHY\",\"SIN\",\"SIP\",\"SIR\",\"SIS\",\"SIT\",\"SKI\",\"SKY\",\"SLY\",\"SO\",\"SOB\",\"SOD\",\"SON\",\"SOP\",\"SOW\",\"SOY\",\"SPA\",\"SPY\",\"SUB\",\"SUD\",\"SUE\",\"SUM\",\"SUN\",\"SUP\",\"TAB\",\"TAD\",\"TAG\",\"TAN\",\"TAP\",\"TAR\",\"TEA\",\"TED\",\"TEE\",\"TEN\",\"THE\",\"THY\",\"TIC\",\"TIE\",\"TIM\",\"TIN\",\"TIP\",\"TO\",\"TOE\",\"TOG\",\"TOM\",\"TON\",\"TOO\",\"TOP\",\"TOW\",\"TOY\",\"TRY\",\"TUB\",\"TUG\",\"TUM\",\"TUN\",\"TWO\",\"UN\",\"UP\",\"US\",\"USE\",\"VAN\",\"VAT\",\"VET\",\"VIE\",\"WAD\",\"WAG\",\"WAR\",\"WAS\",\"WAY\",\"WE\",\"WEB\",\"WED\",\"WEE\",\"WET\",\"WHO\",\"WHY\",\"WIN\",\"WIT\",\"WOK\",\"WON\",\"WOO\",\"WOW\",\"WRY\",\"WU\",\"YAM\",\"YAP\",\"YAW\",\"YE\",\"YEA\",\"YES\",\"YET\",\"YOU\",\"ABED\",\"ABEL\",\"ABET\",\"ABLE\",\"ABUT\",\"ACHE\",\"ACID\",\"ACME\",\"ACRE\",\"ACTA\",\"ACTS\",\"ADAM\",\"ADDS\",\"ADEN\",\"AFAR\",\"AFRO\",\"AGEE\",\"AHEM\",\"AHOY\",\"AIDA\",\"AIDE\",\"AIDS\",\"AIRY\",\"AJAR\",\"AKIN\",\"ALAN\",\"ALEC\",\"ALGA\",\"ALIA\",\"ALLY\",\"ALMA\",\"ALOE\",\"ALSO\",\"ALTO\",\"ALUM\",\"ALVA\",\"AMEN\",\"AMES\",\"AMID\",\"AMMO\",\"AMOK\",\"AMOS\",\"AMRA\",\"ANDY\",\"ANEW\",\"ANNA\",\"ANNE\",\"ANTE\",\"ANTI\",\"AQUA\",\"ARAB\",\"ARCH\",\"AREA\",\"ARGO\",\"ARID\",\"ARMY\",\"ARTS\",\"ARTY\",\"ASIA\",\"ASKS\",\"ATOM\",\"AUNT\",\"AURA\",\"AUTO\",\"AVER\",\"AVID\",\"AVIS\",\"AVON\",\"AVOW\",\"AWAY\",\"AWRY\",\"BABE\",\"BABY\",\"BACH\",\"BACK\",\"BADE\",\"BAIL\",\"BAIT\",\"BAKE\",\"BALD\",\"BALE\",\"BALI\",\"BALK\",\"BALL\",\"BALM\",\"BAND\",\"BANE\",\"BANG\",\"BANK\",\"BARB\",\"BARD\",\"BARE\",\"BARK\",\"BARN\",\"BARR\",\"BASE\",\"BASH\",\"BASK\",\"BASS\",\"BATE\",\"BATH\",\"BAWD\",\"BAWL\",\"BEAD\",\"BEAK\",\"BEAM\",\"BEAN\",\"BEAR\",\"BEAT\",\"BEAU\",\"BECK\",\"BEEF\",\"BEEN\",\"BEER\",\"BEET\",\"BELA\",\"BELL\",\"BELT\",\"BEND\",\"BENT\",\"BERG\",\"BERN\",\"BERT\",\"BESS\",\"BEST\",\"BETA\",\"BETH\",\"BHOY\",\"BIAS\",\"BIDE\",\"BIEN\",\"BILE\",\"BILK\",\"BILL\",\"BIND\",\"BING\",\"BIRD\",\"BITE\",\"BITS\",\"BLAB\",\"BLAT\",\"BLED\",\"BLEW\",\"BLOB\",\"BLOC\",\"BLOT\",\"BLOW\",\"BLUE\",\"BLUM\",\"BLUR\",\"BOAR\",\"BOAT\",\"BOCA\",\"BOCK\",\"BODE\",\"BODY\",\"BOGY\",\"BOHR\",\"BOIL\",\"BOLD\",\"BOLO\",\"BOLT\",\"BOMB\",\"BONA\",\"BOND\",\"BONE\",\"BONG\",\"BONN\",\"BONY\",\"BOOK\",\"BOOM\",\"BOON\",\"BOOT\",\"BORE\",\"BORG\",\"BORN\",\"BOSE\",\"BOSS\",\"BOTH\",\"BOUT\",\"BOWL\",\"BOYD\",\"BRAD\",\"BRAE\",\"BRAG\",\"BRAN\",\"BRAY\",\"BRED\",\"BREW\",\"BRIG\",\"BRIM\",\"BROW\",\"BUCK\",\"BUDD\",\"BUFF\",\"BULB\",\"BULK\",\"BULL\",\"BUNK\",\"BUNT\",\"BUOY\",\"BURG\",\"BURL\",\"BURN\",\"BURR\",\"BURT\",\"BURY\",\"BUSH\",\"BUSS\",\"BUST\",\"BUSY\",\"BYTE\",\"CADY\",\"CAFE\",\"CAGE\",\"CAIN\",\"CAKE\",\"CALF\",\"CALL\",\"CALM\",\"CAME\",\"CANE\",\"CANT\",\"CARD\",\"CARE\",\"CARL\",\"CARR\",\"CART\",\"CASE\",\"CASH\",\"CASK\",\"CAST\",\"CAVE\",\"CEIL\",\"CELL\",\"CENT\",\"CERN\",\"CHAD\",\"CHAR\",\"CHAT\",\"CHAW\",\"CHEF\",\"CHEN\",\"CHEW\",\"CHIC\",\"CHIN\",\"CHOU\",\"CHOW\",\"CHUB\",\"CHUG\",\"CHUM\",\"CITE\",\"CITY\",\"CLAD\",\"CLAM\",\"CLAN\",\"CLAW\",\"CLAY\",\"CLOD\",\"CLOG\",\"CLOT\",\"CLUB\",\"CLUE\",\"COAL\",\"COAT\",\"COCA\",\"COCK\",\"COCO\",\"CODA\",\"CODE\",\"CODY\",\"COED\",\"COIL\",\"COIN\",\"COKE\",\"COLA\",\"COLD\",\"COLT\",\"COMA\",\"COMB\",\"COME\",\"COOK\",\"COOL\",\"COON\",\"COOT\",\"CORD\",\"CORE\",\"CORK\",\"CORN\",\"COST\",\"COVE\",\"COWL\",\"CRAB\",\"CRAG\",\"CRAM\",\"CRAY\",\"CREW\",\"CRIB\",\"CROW\",\"CRUD\",\"CUBA\",\"CUBE\",\"CUFF\",\"CULL\",\"CULT\",\"CUNY\",\"CURB\",\"CURD\",\"CURE\",\"CURL\",\"CURT\",\"CUTS\",\"DADE\",\"DALE\",\"DAME\",\"DANA\",\"DANE\",\"DANG\",\"DANK\",\"DARE\",\"DARK\",\"DARN\",\"DART\",\"DASH\",\"DATA\",\"DATE\",\"DAVE\",\"DAVY\",\"DAWN\",\"DAYS\",\"DEAD\",\"DEAF\",\"DEAL\",\"DEAN\",\"DEAR\",\"DEBT\",\"DECK\",\"DEED\",\"DEEM\",\"DEER\",\"DEFT\",\"DEFY\",\"DELL\",\"DENT\",\"DENY\",\"DESK\",\"DIAL\",\"DICE\",\"DIED\",\"DIET\",\"DIME\",\"DINE\",\"DING\",\"DINT\",\"DIRE\",\"DIRT\",\"DISC\",\"DISH\",\"DISK\",\"DIVE\",\"DOCK\",\"DOES\",\"DOLE\",\"DOLL\",\"DOLT\",\"DOME\",\"DONE\",\"DOOM\",\"DOOR\",\"DORA\",\"DOSE\",\"DOTE\",\"DOUG\",\"DOUR\",\"DOVE\",\"DOWN\",\"DRAB\",\"DRAG\",\"DRAM\",\"DRAW\",\"DREW\",\"DRUB\",\"DRUG\",\"DRUM\",\"DUAL\",\"DUCK\",\"DUCT\",\"DUEL\",\"DUET\",\"DUKE\",\"DULL\",\"DUMB\",\"DUNE\",\"DUNK\",\"DUSK\",\"DUST\",\"DUTY\",\"EACH\",\"EARL\",\"EARN\",\"EASE\",\"EAST\",\"EASY\",\"EBEN\",\"ECHO\",\"EDDY\",\"EDEN\",\"EDGE\",\"EDGY\",\"EDIT\",\"EDNA\",\"EGAN\",\"ELAN\",\"ELBA\",\"ELLA\",\"ELSE\",\"EMIL\",\"EMIT\",\"EMMA\",\"ENDS\",\"ERIC\",\"EROS\",\"EVEN\",\"EVER\",\"EVIL\",\"EYED\",\"FACE\",\"FACT\",\"FADE\",\"FAIL\",\"FAIN\",\"FAIR\",\"FAKE\",\"FALL\",\"FAME\",\"FANG\",\"FARM\",\"FAST\",\"FATE\",\"FAWN\",\"FEAR\",\"FEAT\",\"FEED\",\"FEEL\",\"FEET\",\"FELL\",\"FELT\",\"FEND\",\"FERN\",\"FEST\",\"FEUD\",\"FIEF\",\"FIGS\",\"FILE\",\"FILL\",\"FILM\",\"FIND\",\"FINE\",\"FINK\",\"FIRE\",\"FIRM\",\"FISH\",\"FISK\",\"FIST\",\"FITS\",\"FIVE\",\"FLAG\",\"FLAK\",\"FLAM\",\"FLAT\",\"FLAW\",\"FLEA\",\"FLED\",\"FLEW\",\"FLIT\",\"FLOC\",\"FLOG\",\"FLOW\",\"FLUB\",\"FLUE\",\"FOAL\",\"FOAM\",\"FOGY\",\"FOIL\",\"FOLD\",\"FOLK\",\"FOND\",\"FONT\",\"FOOD\",\"FOOL\",\"FOOT\",\"FORD\",\"FORE\",\"FORK\",\"FORM\",\"FORT\",\"FOSS\",\"FOUL\",\"FOUR\",\"FOWL\",\"FRAU\",\"FRAY\",\"FRED\",\"FREE\",\"FRET\",\"FREY\",\"FROG\",\"FROM\",\"FUEL\",\"FULL\",\"FUME\",\"FUND\",\"FUNK\",\"FURY\",\"FUSE\",\"FUSS\",\"GAFF\",\"GAGE\",\"GAIL\",\"GAIN\",\"GAIT\",\"GALA\",\"GALE\",\"GALL\",\"GALT\",\"GAME\",\"GANG\",\"GARB\",\"GARY\",\"GASH\",\"GATE\",\"GAUL\",\"GAUR\",\"GAVE\",\"GAWK\",\"GEAR\",\"GELD\",\"GENE\",\"GENT\",\"GERM\",\"GETS\",\"GIBE\",\"GIFT\",\"GILD\",\"GILL\",\"GILT\",\"GINA\",\"GIRD\",\"GIRL\",\"GIST\",\"GIVE\",\"GLAD\",\"GLEE\",\"GLEN\",\"GLIB\",\"GLOB\",\"GLOM\",\"GLOW\",\"GLUE\",\"GLUM\",\"GLUT\",\"GOAD\",\"GOAL\",\"GOAT\",\"GOER\",\"GOES\",\"GOLD\",\"GOLF\",\"GONE\",\"GONG\",\"GOOD\",\"GOOF\",\"GORE\",\"GORY\",\"GOSH\",\"GOUT\",\"GOWN\",\"GRAB\",\"GRAD\",\"GRAY\",\"GREG\",\"GREW\",\"GREY\",\"GRID\",\"GRIM\",\"GRIN\",\"GRIT\",\"GROW\",\"GRUB\",\"GULF\",\"GULL\",\"GUNK\",\"GURU\",\"GUSH\",\"GUST\",\"GWEN\",\"GWYN\",\"HAAG\",\"HAAS\",\"HACK\",\"HAIL\",\"HAIR\",\"HALE\",\"HALF\",\"HALL\",\"HALO\",\"HALT\",\"HAND\",\"HANG\",\"HANK\",\"HANS\",\"HARD\",\"HARK\",\"HARM\",\"HART\",\"HASH\",\"HAST\",\"HATE\",\"HATH\",\"HAUL\",\"HAVE\",\"HAWK\",\"HAYS\",\"HEAD\",\"HEAL\",\"HEAR\",\"HEAT\",\"HEBE\",\"HECK\",\"HEED\",\"HEEL\",\"HEFT\",\"HELD\",\"HELL\",\"HELM\",\"HERB\",\"HERD\",\"HERE\",\"HERO\",\"HERS\",\"HESS\",\"HEWN\",\"HICK\",\"HIDE\",\"HIGH\",\"HIKE\",\"HILL\",\"HILT\",\"HIND\",\"HINT\",\"HIRE\",\"HISS\",\"HIVE\",\"HOBO\",\"HOCK\",\"HOFF\",\"HOLD\",\"HOLE\",\"HOLM\",\"HOLT\",\"HOME\",\"HONE\",\"HONK\",\"HOOD\",\"HOOF\",\"HOOK\",\"HOOT\",\"HORN\",\"HOSE\",\"HOST\",\"HOUR\",\"HOVE\",\"HOWE\",\"HOWL\",\"HOYT\",\"HUCK\",\"HUED\",\"HUFF\",\"HUGE\",\"HUGH\",\"HUGO\",\"HULK\",\"HULL\",\"HUNK\",\"HUNT\",\"HURD\",\"HURL\",\"HURT\",\"HUSH\",\"HYDE\",\"HYMN\",\"IBIS\",\"ICON\",\"IDEA\",\"IDLE\",\"IFFY\",\"INCA\",\"INCH\",\"INTO\",\"IONS\",\"IOTA\",\"IOWA\",\"IRIS\",\"IRMA\",\"IRON\",\"ISLE\",\"ITCH\",\"ITEM\",\"IVAN\",\"JACK\",\"JADE\",\"JAIL\",\"JAKE\",\"JANE\",\"JAVA\",\"JEAN\",\"JEFF\",\"JERK\",\"JESS\",\"JEST\",\"JIBE\",\"JILL\",\"JILT\",\"JIVE\",\"JOAN\",\"JOBS\",\"JOCK\",\"JOEL\",\"JOEY\",\"JOHN\",\"JOIN\",\"JOKE\",\"JOLT\",\"JOVE\",\"JUDD\",\"JUDE\",\"JUDO\",\"JUDY\",\"JUJU\",\"JUKE\",\"JULY\",\"JUNE\",\"JUNK\",\"JUNO\",\"JURY\",\"JUST\",\"JUTE\",\"KAHN\",\"KALE\",\"KANE\",\"KANT\",\"KARL\",\"KATE\",\"KEEL\",\"KEEN\",\"KENO\",\"KENT\",\"KERN\",\"KERR\",\"KEYS\",\"KICK\",\"KILL\",\"KIND\",\"KING\",\"KIRK\",\"KISS\",\"KITE\",\"KLAN\",\"KNEE\",\"KNEW\",\"KNIT\",\"KNOB\",\"KNOT\",\"KNOW\",\"KOCH\",\"KONG\",\"KUDO\",\"KURD\",\"KURT\",\"KYLE\",\"LACE\",\"LACK\",\"LACY\",\"LADY\",\"LAID\",\"LAIN\",\"LAIR\",\"LAKE\",\"LAMB\",\"LAME\",\"LAND\",\"LANE\",\"LANG\",\"LARD\",\"LARK\",\"LASS\",\"LAST\",\"LATE\",\"LAUD\",\"LAVA\",\"LAWN\",\"LAWS\",\"LAYS\",\"LEAD\",\"LEAF\",\"LEAK\",\"LEAN\",\"LEAR\",\"LEEK\",\"LEER\",\"LEFT\",\"LEND\",\"LENS\",\"LENT\",\"LEON\",\"LESK\",\"LESS\",\"LEST\",\"LETS\",\"LIAR\",\"LICE\",\"LICK\",\"LIED\",\"LIEN\",\"LIES\",\"LIEU\",\"LIFE\",\"LIFT\",\"LIKE\",\"LILA\",\"LILT\",\"LILY\",\"LIMA\",\"LIMB\",\"LIME\",\"LIND\",\"LINE\",\"LINK\",\"LINT\",\"LION\",\"LISA\",\"LIST\",\"LIVE\",\"LOAD\",\"LOAF\",\"LOAM\",\"LOAN\",\"LOCK\",\"LOFT\",\"LOGE\",\"LOIS\",\"LOLA\",\"LONE\",\"LONG\",\"LOOK\",\"LOON\",\"LOOT\",\"LORD\",\"LORE\",\"LOSE\",\"LOSS\",\"LOST\",\"LOUD\",\"LOVE\",\"LOWE\",\"LUCK\",\"LUCY\",\"LUGE\",\"LUKE\",\"LULU\",\"LUND\",\"LUNG\",\"LURA\",\"LURE\",\"LURK\",\"LUSH\",\"LUST\",\"LYLE\",\"LYNN\",\"LYON\",\"LYRA\",\"MACE\",\"MADE\",\"MAGI\",\"MAID\",\"MAIL\",\"MAIN\",\"MAKE\",\"MALE\",\"MALI\",\"MALL\",\"MALT\",\"MANA\",\"MANN\",\"MANY\",\"MARC\",\"MARE\",\"MARK\",\"MARS\",\"MART\",\"MARY\",\"MASH\",\"MASK\",\"MASS\",\"MAST\",\"MATE\",\"MATH\",\"MAUL\",\"MAYO\",\"MEAD\",\"MEAL\",\"MEAN\",\"MEAT\",\"MEEK\",\"MEET\",\"MELD\",\"MELT\",\"MEMO\",\"MEND\",\"MENU\",\"MERT\",\"MESH\",\"MESS\",\"MICE\",\"MIKE\",\"MILD\",\"MILE\",\"MILK\",\"MILL\",\"MILT\",\"MIMI\",\"MIND\",\"MINE\",\"MINI\",\"MINK\",\"MINT\",\"MIRE\",\"MISS\",\"MIST\",\"MITE\",\"MITT\",\"MOAN\",\"MOAT\",\"MOCK\",\"MODE\",\"MOLD\",\"MOLE\",\"MOLL\",\"MOLT\",\"MONA\",\"MONK\",\"MONT\",\"MOOD\",\"MOON\",\"MOOR\",\"MOOT\",\"MORE\",\"MORN\",\"MORT\",\"MOSS\",\"MOST\",\"MOTH\",\"MOVE\",\"MUCH\",\"MUCK\",\"MUDD\",\"MUFF\",\"MULE\",\"MULL\",\"MURK\",\"MUSH\",\"MUST\",\"MUTE\",\"MUTT\",\"MYRA\",\"MYTH\",\"NAGY\",\"NAIL\",\"NAIR\",\"NAME\",\"NARY\",\"NASH\",\"NAVE\",\"NAVY\",\"NEAL\",\"NEAR\",\"NEAT\",\"NECK\",\"NEED\",\"NEIL\",\"NELL\",\"NEON\",\"NERO\",\"NESS\",\"NEST\",\"NEWS\",\"NEWT\",\"NIBS\",\"NICE\",\"NICK\",\"NILE\",\"NINA\",\"NINE\",\"NOAH\",\"NODE\",\"NOEL\",\"NOLL\",\"NONE\",\"NOOK\",\"NOON\",\"NORM\",\"NOSE\",\"NOTE\",\"NOUN\",\"NOVA\",\"NUDE\",\"NULL\",\"NUMB\",\"OATH\",\"OBEY\",\"OBOE\",\"ODIN\",\"OHIO\",\"OILY\",\"OINT\",\"OKAY\",\"OLAF\",\"OLDY\",\"OLGA\",\"OLIN\",\"OMAN\",\"OMEN\",\"OMIT\",\"ONCE\",\"ONES\",\"ONLY\",\"ONTO\",\"ONUS\",\"ORAL\",\"ORGY\",\"OSLO\",\"OTIS\",\"OTTO\",\"OUCH\",\"OUST\",\"OUTS\",\"OVAL\",\"OVEN\",\"OVER\",\"OWLY\",\"OWNS\",\"QUAD\",\"QUIT\",\"QUOD\",\"RACE\",\"RACK\",\"RACY\",\"RAFT\",\"RAGE\",\"RAID\",\"RAIL\",\"RAIN\",\"RAKE\",\"RANK\",\"RANT\",\"RARE\",\"RASH\",\"RATE\",\"RAVE\",\"RAYS\",\"READ\",\"REAL\",\"REAM\",\"REAR\",\"RECK\",\"REED\",\"REEF\",\"REEK\",\"REEL\",\"REID\",\"REIN\",\"RENA\",\"REND\",\"RENT\",\"REST\",\"RICE\",\"RICH\",\"RICK\",\"RIDE\",\"RIFT\",\"RILL\",\"RIME\",\"RING\",\"RINK\",\"RISE\",\"RISK\",\"RITE\",\"ROAD\",\"ROAM\",\"ROAR\",\"ROBE\",\"ROCK\",\"RODE\",\"ROIL\",\"ROLL\",\"ROME\",\"ROOD\",\"ROOF\",\"ROOK\",\"ROOM\",\"ROOT\",\"ROSA\",\"ROSE\",\"ROSS\",\"ROSY\",\"ROTH\",\"ROUT\",\"ROVE\",\"ROWE\",\"ROWS\",\"RUBE\",\"RUBY\",\"RUDE\",\"RUDY\",\"RUIN\",\"RULE\",\"RUNG\",\"RUNS\",\"RUNT\",\"RUSE\",\"RUSH\",\"RUSK\",\"RUSS\",\"RUST\",\"RUTH\",\"SACK\",\"SAFE\",\"SAGE\",\"SAID\",\"SAIL\",\"SALE\",\"SALK\",\"SALT\",\"SAME\",\"SAND\",\"SANE\",\"SANG\",\"SANK\",\"SARA\",\"SAUL\",\"SAVE\",\"SAYS\",\"SCAN\",\"SCAR\",\"SCAT\",\"SCOT\",\"SEAL\",\"SEAM\",\"SEAR\",\"SEAT\",\"SEED\",\"SEEK\",\"SEEM\",\"SEEN\",\"SEES\",\"SELF\",\"SELL\",\"SEND\",\"SENT\",\"SETS\",\"SEWN\",\"SHAG\",\"SHAM\",\"SHAW\",\"SHAY\",\"SHED\",\"SHIM\",\"SHIN\",\"SHOD\",\"SHOE\",\"SHOT\",\"SHOW\",\"SHUN\",\"SHUT\",\"SICK\",\"SIDE\",\"SIFT\",\"SIGH\",\"SIGN\",\"SILK\",\"SILL\",\"SILO\",\"SILT\",\"SINE\",\"SING\",\"SINK\",\"SIRE\",\"SITE\",\"SITS\",\"SITU\",\"SKAT\",\"SKEW\",\"SKID\",\"SKIM\",\"SKIN\",\"SKIT\",\"SLAB\",\"SLAM\",\"SLAT\",\"SLAY\",\"SLED\",\"SLEW\",\"SLID\",\"SLIM\",\"SLIT\",\"SLOB\",\"SLOG\",\"SLOT\",\"SLOW\",\"SLUG\",\"SLUM\",\"SLUR\",\"SMOG\",\"SMUG\",\"SNAG\",\"SNOB\",\"SNOW\",\"SNUB\",\"SNUG\",\"SOAK\",\"SOAR\",\"SOCK\",\"SODA\",\"SOFA\",\"SOFT\",\"SOIL\",\"SOLD\",\"SOME\",\"SONG\",\"SOON\",\"SOOT\",\"SORE\",\"SORT\",\"SOUL\",\"SOUR\",\"SOWN\",\"STAB\",\"STAG\",\"STAN\",\"STAR\",\"STAY\",\"STEM\",\"STEW\",\"STIR\",\"STOW\",\"STUB\",\"STUN\",\"SUCH\",\"SUDS\",\"SUIT\",\"SULK\",\"SUMS\",\"SUNG\",\"SUNK\",\"SURE\",\"SURF\",\"SWAB\",\"SWAG\",\"SWAM\",\"SWAN\",\"SWAT\",\"SWAY\",\"SWIM\",\"SWUM\",\"TACK\",\"TACT\",\"TAIL\",\"TAKE\",\"TALE\",\"TALK\",\"TALL\",\"TANK\",\"TASK\",\"TATE\",\"TAUT\",\"TEAL\",\"TEAM\",\"TEAR\",\"TECH\",\"TEEM\",\"TEEN\",\"TEET\",\"TELL\",\"TEND\",\"TENT\",\"TERM\",\"TERN\",\"TESS\",\"TEST\",\"THAN\",\"THAT\",\"THEE\",\"THEM\",\"THEN\",\"THEY\",\"THIN\",\"THIS\",\"THUD\",\"THUG\",\"TICK\",\"TIDE\",\"TIDY\",\"TIED\",\"TIER\",\"TILE\",\"TILL\",\"TILT\",\"TIME\",\"TINA\",\"TINE\",\"TINT\",\"TINY\",\"TIRE\",\"TOAD\",\"TOGO\",\"TOIL\",\"TOLD\",\"TOLL\",\"TONE\",\"TONG\",\"TONY\",\"TOOK\",\"TOOL\",\"TOOT\",\"TORE\",\"TORN\",\"TOTE\",\"TOUR\",\"TOUT\",\"TOWN\",\"TRAG\",\"TRAM\",\"TRAY\",\"TREE\",\"TREK\",\"TRIG\",\"TRIM\",\"TRIO\",\"TROD\",\"TROT\",\"TROY\",\"TRUE\",\"TUBA\",\"TUBE\",\"TUCK\",\"TUFT\",\"TUNA\",\"TUNE\",\"TUNG\",\"TURF\",\"TURN\",\"TUSK\",\"TWIG\",\"TWIN\",\"TWIT\",\"ULAN\",\"UNIT\",\"URGE\",\"USED\",\"USER\",\"USES\",\"UTAH\",\"VAIL\",\"VAIN\",\"VALE\",\"VARY\",\"VASE\",\"VAST\",\"VEAL\",\"VEDA\",\"VEIL\",\"VEIN\",\"VEND\",\"VENT\",\"VERB\",\"VERY\",\"VETO\",\"VICE\",\"VIEW\",\"VINE\",\"VISE\",\"VOID\",\"VOLT\",\"VOTE\",\"WACK\",\"WADE\",\"WAGE\",\"WAIL\",\"WAIT\",\"WAKE\",\"WALE\",\"WALK\",\"WALL\",\"WALT\",\"WAND\",\"WANE\",\"WANG\",\"WANT\",\"WARD\",\"WARM\",\"WARN\",\"WART\",\"WASH\",\"WAST\",\"WATS\",\"WATT\",\"WAVE\",\"WAVY\",\"WAYS\",\"WEAK\",\"WEAL\",\"WEAN\",\"WEAR\",\"WEED\",\"WEEK\",\"WEIR\",\"WELD\",\"WELL\",\"WELT\",\"WENT\",\"WERE\",\"WERT\",\"WEST\",\"WHAM\",\"WHAT\",\"WHEE\",\"WHEN\",\"WHET\",\"WHOA\",\"WHOM\",\"WICK\",\"WIFE\",\"WILD\",\"WILL\",\"WIND\",\"WINE\",\"WING\",\"WINK\",\"WINO\",\"WIRE\",\"WISE\",\"WISH\",\"WITH\",\"WOLF\",\"WONT\",\"WOOD\",\"WOOL\",\"WORD\",\"WORE\",\"WORK\",\"WORM\",\"WORN\",\"WOVE\",\"WRIT\",\"WYNN\",\"YALE\",\"YANG\",\"YANK\",\"YARD\",\"YARN\",\"YAWL\",\"YAWN\",\"YEAH\",\"YEAR\",\"YELL\",\"YOGA\",\"YOKE\"]"));}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/rfc1751.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keyToRFC1751Mnemonic = exports.rfc1751MnemonicToKey = void 0;
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const rfc1751Words_json_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/rfc1751Words.json (json)"));
const rfc1751WordList = rfc1751Words_json_1.default;
const BINARY = [
    '0000',
    '0001',
    '0010',
    '0011',
    '0100',
    '0101',
    '0110',
    '0111',
    '1000',
    '1001',
    '1010',
    '1011',
    '1100',
    '1101',
    '1110',
    '1111'
];
function keyToBinary(key) {
    let res = '';
    for (const num of key){
        res += BINARY[num >> 4] + BINARY[num & 0x0f];
    }
    return res;
}
function extract(key, start, length) {
    const subKey = key.substring(start, start + length);
    let acc = 0;
    for(let index = 0; index < subKey.length; index++){
        acc = acc * 2 + subKey.charCodeAt(index) - 48;
    }
    return acc;
}
function keyToRFC1751Mnemonic(hex_key) {
    const buf = (0, utils_1.hexToBytes)(hex_key.replace(/\s+/gu, ''));
    let key = bufferToArray(swap128(buf));
    const padding = [];
    for(let index = 0; index < (8 - key.length % 8) % 8; index++){
        padding.push(0);
    }
    key = padding.concat(key);
    const english = [];
    for(let index = 0; index < key.length; index += 8){
        const subKey = key.slice(index, index + 8);
        let skbin = keyToBinary(subKey);
        let parity = 0;
        for(let j = 0; j < 64; j += 2){
            parity += extract(skbin, j, 2);
        }
        subKey.push(parity << 6 & 0xff);
        skbin = keyToBinary(subKey);
        for(let j = 0; j < 64; j += 11){
            english.push(rfc1751WordList[extract(skbin, j, 11)]);
        }
    }
    return english.join(' ');
}
exports.keyToRFC1751Mnemonic = keyToRFC1751Mnemonic;
function rfc1751MnemonicToKey(english) {
    const words = english.split(' ');
    let key = [];
    for(let index = 0; index < words.length; index += 6){
        const { subKey, word } = getSubKey(words, index);
        const skbin = keyToBinary(subKey);
        let parity = 0;
        for(let j = 0; j < 64; j += 2){
            parity += extract(skbin, j, 2);
        }
        const cs0 = extract(skbin, 64, 2);
        const cs1 = parity & 3;
        if (cs0 !== cs1) {
            throw new Error(`Parity error at ${word}`);
        }
        key = key.concat(subKey.slice(0, 8));
    }
    const bufferKey = swap128(Uint8Array.from(key));
    return bufferKey;
}
exports.rfc1751MnemonicToKey = rfc1751MnemonicToKey;
function getSubKey(words, index) {
    const sublist = words.slice(index, index + 6);
    let bits = 0;
    const ch = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    let word = '';
    for (word of sublist){
        const idx = rfc1751WordList.indexOf(word.toUpperCase());
        if (idx === -1) {
            throw new TypeError(`Expected an RFC1751 word, but received '${word}'. ` + `For the full list of words in the RFC1751 encoding see https://datatracker.ietf.org/doc/html/rfc1751`);
        }
        const shift = (8 - (bits + 11) % 8) % 8;
        const y = idx << shift;
        const cl = y >> 16;
        const cc = y >> 8 & 0xff;
        const cr = y & 0xff;
        const t = Math.floor(bits / 8);
        if (shift > 5) {
            ch[t] |= cl;
            ch[t + 1] |= cc;
            ch[t + 2] |= cr;
        } else if (shift > -3) {
            ch[t] |= cc;
            ch[t + 1] |= cr;
        } else {
            ch[t] |= cr;
        }
        bits += 11;
    }
    const subKey = ch.slice();
    return {
        subKey,
        word
    };
}
function bufferToArray(buf) {
    return Array.prototype.slice.call(buf);
}
function swap(arr, n, m) {
    const i = arr[n];
    arr[n] = arr[m];
    arr[m] = i;
}
function swap64(arr) {
    const len = arr.length;
    for(let i = 0; i < len; i += 8){
        swap(arr, i, i + 7);
        swap(arr, i + 1, i + 6);
        swap(arr, i + 2, i + 5);
        swap(arr, i + 3, i + 4);
    }
    return arr;
}
function swap128(arr) {
    const reversedBytes = swap64(arr);
    return (0, utils_1.concat)([
        reversedBytes.slice(8, 16),
        reversedBytes.slice(0, 8)
    ]);
} //# sourceMappingURL=rfc1751.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/signer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.multisign = exports.verifySignature = void 0;
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const bignumber_js_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)");
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_keypairs_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-keypairs@2.0.0/node_modules/ripple-keypairs/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const transactions_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/index.js [app-ssr] (ecmascript)");
function multisign(transactions) {
    if (transactions.length === 0) {
        throw new errors_1.ValidationError('There were 0 transactions to multisign');
    }
    const decodedTransactions = transactions.map((txOrBlob)=>{
        return getDecodedTransaction(txOrBlob);
    });
    decodedTransactions.forEach((tx)=>{
        (0, transactions_1.validate)(tx);
        if (tx.Signers == null || tx.Signers.length === 0) {
            throw new errors_1.ValidationError("For multisigning all transactions must include a Signers field containing an array of signatures. You may have forgotten to pass the 'forMultisign' parameter when signing.");
        }
        if (tx.SigningPubKey !== '') {
            throw new errors_1.ValidationError('SigningPubKey must be an empty string for all transactions when multisigning.');
        }
    });
    validateTransactionEquivalence(decodedTransactions);
    return (0, ripple_binary_codec_1.encode)(getTransactionWithAllSigners(decodedTransactions));
}
exports.multisign = multisign;
function verifySignature(tx, publicKey) {
    const decodedTx = getDecodedTransaction(tx);
    let key = publicKey;
    if (typeof decodedTx.TxnSignature !== 'string' || !decodedTx.TxnSignature) {
        throw new Error('Transaction is missing a signature, TxnSignature');
    }
    if (!key) {
        if (typeof decodedTx.SigningPubKey !== 'string' || !decodedTx.SigningPubKey) {
            throw new Error('Transaction is missing a public key, SigningPubKey');
        }
        key = decodedTx.SigningPubKey;
    }
    return (0, ripple_keypairs_1.verify)((0, ripple_binary_codec_1.encodeForSigning)(decodedTx), decodedTx.TxnSignature, key);
}
exports.verifySignature = verifySignature;
function validateTransactionEquivalence(transactions) {
    const exampleTransaction = JSON.stringify(Object.assign(Object.assign({}, transactions[0]), {
        Signers: null
    }));
    if (transactions.slice(1).some((tx)=>JSON.stringify(Object.assign(Object.assign({}, tx), {
            Signers: null
        })) !== exampleTransaction)) {
        throw new errors_1.ValidationError('txJSON is not the same for all signedTransactions');
    }
}
function getTransactionWithAllSigners(transactions) {
    const sortedSigners = transactions.flatMap((tx)=>{
        var _a;
        return (_a = tx.Signers) !== null && _a !== void 0 ? _a : [];
    }).sort(compareSigners);
    return Object.assign(Object.assign({}, transactions[0]), {
        Signers: sortedSigners
    });
}
function compareSigners(left, right) {
    return addressToBigNumber(left.Signer.Account).comparedTo(addressToBigNumber(right.Signer.Account));
}
const NUM_BITS_IN_HEX = 16;
function addressToBigNumber(address) {
    const hex = (0, utils_1.bytesToHex)((0, ripple_address_codec_1.decodeAccountID)(address));
    return new bignumber_js_1.BigNumber(hex, NUM_BITS_IN_HEX);
}
function getDecodedTransaction(txOrBlob) {
    if (typeof txOrBlob === 'object') {
        return (0, ripple_binary_codec_1.decode)((0, ripple_binary_codec_1.encode)(txOrBlob));
    }
    return (0, ripple_binary_codec_1.decode)(txOrBlob);
} //# sourceMappingURL=signer.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Wallet = void 0;
const bip32_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@scure+bip32@1.7.0/node_modules/@scure/bip32/lib/index.js [app-ssr] (ecmascript)");
const bip39_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@scure+bip39@1.6.0/node_modules/@scure/bip39/index.js [app-ssr] (ecmascript)");
const english_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@scure+bip39@1.6.0/node_modules/@scure/bip39/wordlists/english.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const ripple_keypairs_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-keypairs@2.0.0/node_modules/ripple-keypairs/dist/index.js [app-ssr] (ecmascript)");
const ECDSA_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/ECDSA.js [app-ssr] (ecmascript)"));
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const transactions_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/index.js [app-ssr] (ecmascript)");
const utils_2 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/utils.js [app-ssr] (ecmascript)");
const collections_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/collections.js [app-ssr] (ecmascript)");
const hashLedger_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/hashes/hashLedger.js [app-ssr] (ecmascript)");
const rfc1751_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/rfc1751.js [app-ssr] (ecmascript)");
const signer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/signer.js [app-ssr] (ecmascript)");
const DEFAULT_ALGORITHM = ECDSA_1.default.ed25519;
const DEFAULT_DERIVATION_PATH = "m/44'/144'/0'/0/0";
function validateKey(node) {
    if (!(node.privateKey instanceof Uint8Array)) {
        throw new errors_1.ValidationError('Unable to derive privateKey from mnemonic input');
    }
    if (!(node.publicKey instanceof Uint8Array)) {
        throw new errors_1.ValidationError('Unable to derive publicKey from mnemonic input');
    }
}
class Wallet {
    constructor(publicKey, privateKey, opts = {}){
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.classicAddress = opts.masterAddress ? (0, utils_2.ensureClassicAddress)(opts.masterAddress) : (0, ripple_keypairs_1.deriveAddress)(publicKey);
        this.seed = opts.seed;
    }
    get address() {
        return this.classicAddress;
    }
    static generate(algorithm = DEFAULT_ALGORITHM) {
        if (!Object.values(ECDSA_1.default).includes(algorithm)) {
            throw new errors_1.ValidationError('Invalid cryptographic signing algorithm');
        }
        const seed = (0, ripple_keypairs_1.generateSeed)({
            algorithm
        });
        return Wallet.fromSeed(seed, {
            algorithm
        });
    }
    static fromSeed(seed, opts = {}) {
        return Wallet.deriveWallet(seed, {
            algorithm: opts.algorithm,
            masterAddress: opts.masterAddress
        });
    }
    static fromEntropy(entropy, opts = {}) {
        var _a;
        const algorithm = (_a = opts.algorithm) !== null && _a !== void 0 ? _a : DEFAULT_ALGORITHM;
        const options = {
            entropy: Uint8Array.from(entropy),
            algorithm
        };
        const seed = (0, ripple_keypairs_1.generateSeed)(options);
        return Wallet.deriveWallet(seed, {
            algorithm,
            masterAddress: opts.masterAddress
        });
    }
    static fromMnemonic(mnemonic, opts = {}) {
        var _a;
        if (opts.mnemonicEncoding === 'rfc1751') {
            return Wallet.fromRFC1751Mnemonic(mnemonic, {
                masterAddress: opts.masterAddress,
                algorithm: opts.algorithm
            });
        }
        if (!(0, bip39_1.validateMnemonic)(mnemonic, english_1.wordlist)) {
            throw new errors_1.ValidationError('Unable to parse the given mnemonic using bip39 encoding');
        }
        const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
        const masterNode = bip32_1.HDKey.fromMasterSeed(seed);
        const node = masterNode.derive((_a = opts.derivationPath) !== null && _a !== void 0 ? _a : DEFAULT_DERIVATION_PATH);
        validateKey(node);
        const publicKey = (0, utils_1.bytesToHex)(node.publicKey);
        const privateKey = (0, utils_1.bytesToHex)(node.privateKey);
        return new Wallet(publicKey, `00${privateKey}`, {
            masterAddress: opts.masterAddress
        });
    }
    static fromRFC1751Mnemonic(mnemonic, opts) {
        const seed = (0, rfc1751_1.rfc1751MnemonicToKey)(mnemonic);
        let encodeAlgorithm;
        if (opts.algorithm === ECDSA_1.default.ed25519) {
            encodeAlgorithm = 'ed25519';
        } else {
            encodeAlgorithm = 'secp256k1';
        }
        const encodedSeed = (0, ripple_address_codec_1.encodeSeed)(seed, encodeAlgorithm);
        return Wallet.fromSeed(encodedSeed, {
            masterAddress: opts.masterAddress,
            algorithm: opts.algorithm
        });
    }
    static deriveWallet(seed, opts = {}) {
        var _a;
        const { publicKey, privateKey } = (0, ripple_keypairs_1.deriveKeypair)(seed, {
            algorithm: (_a = opts.algorithm) !== null && _a !== void 0 ? _a : DEFAULT_ALGORITHM
        });
        return new Wallet(publicKey, privateKey, {
            seed,
            masterAddress: opts.masterAddress
        });
    }
    sign(transaction, multisign) {
        let multisignAddress = false;
        if (typeof multisign === 'string' && multisign.startsWith('X')) {
            multisignAddress = multisign;
        } else if (multisign) {
            multisignAddress = this.classicAddress;
        }
        const tx = (0, collections_1.omitBy)(Object.assign({}, transaction), (value)=>value == null);
        if (tx.TxnSignature || tx.Signers) {
            throw new errors_1.ValidationError('txJSON must not contain "TxnSignature" or "Signers" properties');
        }
        removeTrailingZeros(tx);
        (0, transactions_1.validate)(tx);
        const txToSignAndEncode = Object.assign({}, tx);
        txToSignAndEncode.SigningPubKey = multisignAddress ? '' : this.publicKey;
        if (multisignAddress) {
            const signer = {
                Account: multisignAddress,
                SigningPubKey: this.publicKey,
                TxnSignature: computeSignature(txToSignAndEncode, this.privateKey, multisignAddress)
            };
            txToSignAndEncode.Signers = [
                {
                    Signer: signer
                }
            ];
        } else {
            txToSignAndEncode.TxnSignature = computeSignature(txToSignAndEncode, this.privateKey);
        }
        const serialized = (0, ripple_binary_codec_1.encode)(txToSignAndEncode);
        return {
            tx_blob: serialized,
            hash: (0, hashLedger_1.hashSignedTx)(serialized)
        };
    }
    verifyTransaction(signedTransaction) {
        return (0, signer_1.verifySignature)(signedTransaction, this.publicKey);
    }
    getXAddress(tag = false, isTestnet = false) {
        return (0, ripple_address_codec_1.classicAddressToXAddress)(this.classicAddress, tag, isTestnet);
    }
}
exports.Wallet = Wallet;
Wallet.fromSecret = Wallet.fromSeed;
function computeSignature(tx, privateKey, signAs) {
    if (signAs) {
        const classicAddress = (0, ripple_address_codec_1.isValidXAddress)(signAs) ? (0, ripple_address_codec_1.xAddressToClassicAddress)(signAs).classicAddress : signAs;
        return (0, ripple_keypairs_1.sign)((0, ripple_binary_codec_1.encodeForMultisigning)(tx, classicAddress), privateKey);
    }
    return (0, ripple_keypairs_1.sign)((0, ripple_binary_codec_1.encodeForSigning)(tx), privateKey);
}
function removeTrailingZeros(tx) {
    if (tx.TransactionType === 'Payment' && typeof tx.Amount !== 'string' && tx.Amount.value.includes('.') && tx.Amount.value.endsWith('0')) {
        tx.Amount = Object.assign({}, tx.Amount);
        tx.Amount.value = new bignumber_js_1.default(tx.Amount.value).toString();
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/defaultFaucets.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultFaucetPath = exports.getFaucetHost = exports.FaucetNetworkPaths = exports.FaucetNetwork = void 0;
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
var FaucetNetwork;
(function(FaucetNetwork) {
    FaucetNetwork["Testnet"] = "faucet.altnet.rippletest.net";
    FaucetNetwork["Devnet"] = "faucet.devnet.rippletest.net";
    FaucetNetwork["HooksV3Testnet"] = "hooks-testnet-v3.xrpl-labs.com";
})(FaucetNetwork || (exports.FaucetNetwork = FaucetNetwork = {}));
exports.FaucetNetworkPaths = {
    [FaucetNetwork.Testnet]: '/accounts',
    [FaucetNetwork.Devnet]: '/accounts',
    [FaucetNetwork.HooksV3Testnet]: '/accounts'
};
function getFaucetHost(client) {
    const connectionUrl = client.url;
    if (connectionUrl.includes('hooks-testnet-v3')) {
        return FaucetNetwork.HooksV3Testnet;
    }
    if (connectionUrl.includes('altnet') || connectionUrl.includes('testnet')) {
        return FaucetNetwork.Testnet;
    }
    if (connectionUrl.includes('sidechain-net2')) {
        throw new errors_1.XRPLFaucetError('Cannot fund an account on an issuing chain. Accounts must be created via the bridge.');
    }
    if (connectionUrl.includes('devnet')) {
        return FaucetNetwork.Devnet;
    }
    throw new errors_1.XRPLFaucetError('Faucet URL is not defined or inferrable.');
}
exports.getFaucetHost = getFaucetHost;
function getDefaultFaucetPath(hostname) {
    if (hostname === undefined) {
        return '/accounts';
    }
    return exports.FaucetNetworkPaths[hostname] || '/accounts';
}
exports.getDefaultFaucetPath = getDefaultFaucetPath; //# sourceMappingURL=defaultFaucets.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/fundWallet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestFunding = exports.getStartingBalance = exports.generateWalletToFund = void 0;
const cross_fetch_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/cross-fetch@4.1.0/node_modules/cross-fetch/dist/node-ponyfill.js [app-ssr] (ecmascript)"));
const ripple_address_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-address-codec@5.0.0/node_modules/ripple-address-codec/dist/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const defaultFaucets_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/defaultFaucets.js [app-ssr] (ecmascript)");
const _1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/index.js [app-ssr] (ecmascript)");
const INTERVAL_SECONDS = 1;
const MAX_ATTEMPTS = 20;
function generateWalletToFund(wallet) {
    if (wallet && (0, ripple_address_codec_1.isValidClassicAddress)(wallet.classicAddress)) {
        return wallet;
    }
    return _1.Wallet.generate();
}
exports.generateWalletToFund = generateWalletToFund;
function getStartingBalance(client, classicAddress) {
    return __awaiter(this, void 0, void 0, function*() {
        let startingBalance = 0;
        try {
            startingBalance = Number((yield client.getXrpBalance(classicAddress)));
        } catch (_a) {}
        return startingBalance;
    });
}
exports.getStartingBalance = getStartingBalance;
function requestFunding(options, client, startingBalance, walletToFund, postBody) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function*() {
        const hostname = (_a = options.faucetHost) !== null && _a !== void 0 ? _a : (0, defaultFaucets_1.getFaucetHost)(client);
        if (!hostname) {
            throw new errors_1.XRPLFaucetError('No faucet hostname could be derived');
        }
        const pathname = (_b = options.faucetPath) !== null && _b !== void 0 ? _b : (0, defaultFaucets_1.getDefaultFaucetPath)(hostname);
        const response = yield (0, cross_fetch_1.default)(`https://${hostname}${pathname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        });
        const body = yield response.json();
        if (response.ok && ((_c = response.headers.get('Content-Type')) === null || _c === void 0 ? void 0 : _c.startsWith('application/json'))) {
            const classicAddress = body.account.classicAddress;
            return processSuccessfulResponse(client, classicAddress, walletToFund, startingBalance);
        }
        return processError(response, body);
    });
}
exports.requestFunding = requestFunding;
function processSuccessfulResponse(client, classicAddress, walletToFund, startingBalance) {
    return __awaiter(this, void 0, void 0, function*() {
        if (!classicAddress) {
            return Promise.reject(new errors_1.XRPLFaucetError(`The faucet account is undefined`));
        }
        try {
            const updatedBalance = yield getUpdatedBalance(client, classicAddress, startingBalance);
            if (updatedBalance > startingBalance) {
                return {
                    wallet: walletToFund,
                    balance: updatedBalance
                };
            }
            throw new errors_1.XRPLFaucetError(`Unable to fund address with faucet after waiting ${INTERVAL_SECONDS * MAX_ATTEMPTS} seconds`);
        } catch (err) {
            if (err instanceof Error) {
                throw new errors_1.XRPLFaucetError(err.message);
            }
            throw err;
        }
    });
}
function processError(response, body) {
    return __awaiter(this, void 0, void 0, function*() {
        return Promise.reject(new errors_1.XRPLFaucetError(`Request failed: ${JSON.stringify({
            body: body || {},
            contentType: response.headers.get('Content-Type'),
            statusCode: response.status
        })}`));
    });
}
function getUpdatedBalance(client, address, originalBalance) {
    return __awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            let attempts = MAX_ATTEMPTS;
            const interval = setInterval(()=>__awaiter(this, void 0, void 0, function*() {
                    if (attempts < 0) {
                        clearInterval(interval);
                        resolve(originalBalance);
                    } else {
                        attempts -= 1;
                    }
                    try {
                        let newBalance;
                        try {
                            newBalance = Number((yield client.getXrpBalance(address)));
                        } catch (_a) {}
                        if (newBalance > originalBalance) {
                            clearInterval(interval);
                            resolve(newBalance);
                        }
                    } catch (err) {
                        clearInterval(interval);
                        if (err instanceof Error) {
                            reject(new errors_1.XRPLFaucetError(`Unable to check if the address ${address} balance has increased. Error: ${err.message}`));
                        }
                        reject(err);
                    }
                }), INTERVAL_SECONDS * 1000);
        });
    });
} //# sourceMappingURL=fundWallet.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/ConnectionManager.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
class ConnectionManager {
    constructor(){
        this.promisesAwaitingConnection = [];
    }
    resolveAllAwaiting() {
        this.promisesAwaitingConnection.map(({ resolve })=>resolve());
        this.promisesAwaitingConnection = [];
    }
    rejectAllAwaiting(error) {
        this.promisesAwaitingConnection.map(({ reject })=>reject(error));
        this.promisesAwaitingConnection = [];
    }
    awaitConnection() {
        return __awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve, reject)=>{
                this.promisesAwaitingConnection.push({
                    resolve,
                    reject
                });
            });
        });
    }
}
exports.default = ConnectionManager; //# sourceMappingURL=ConnectionManager.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/ExponentialBackoff.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const DEFAULT_MIN = 100;
const DEFAULT_MAX = 1000;
class ExponentialBackoff {
    constructor(opts = {}){
        var _a, _b;
        this.factor = 2;
        this.numAttempts = 0;
        this.ms = (_a = opts.min) !== null && _a !== void 0 ? _a : DEFAULT_MIN;
        this.max = (_b = opts.max) !== null && _b !== void 0 ? _b : DEFAULT_MAX;
    }
    get attempts() {
        return this.numAttempts;
    }
    duration() {
        const ms = this.ms * Math.pow(this.factor, this.numAttempts);
        this.numAttempts += 1;
        return Math.floor(Math.min(ms, this.max));
    }
    reset() {
        this.numAttempts = 0;
    }
}
exports.default = ExponentialBackoff; //# sourceMappingURL=ExponentialBackoff.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/RequestManager.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
class RequestManager {
    constructor(){
        this.nextId = 0;
        this.promisesAwaitingResponse = new Map();
    }
    addPromise(newId, timer) {
        return __awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve, reject)=>{
                this.promisesAwaitingResponse.set(newId, {
                    resolve,
                    reject,
                    timer
                });
            });
        });
    }
    resolve(id, response) {
        const promise = this.promisesAwaitingResponse.get(id);
        if (promise == null) {
            throw new errors_1.XrplError(`No existing promise with id ${id}`, {
                type: 'resolve',
                response
            });
        }
        clearTimeout(promise.timer);
        promise.resolve(response);
        this.deletePromise(id);
    }
    reject(id, error) {
        const promise = this.promisesAwaitingResponse.get(id);
        if (promise == null) {
            throw new errors_1.XrplError(`No existing promise with id ${id}`, {
                type: 'reject',
                error
            });
        }
        clearTimeout(promise.timer);
        promise.reject(error);
        this.deletePromise(id);
    }
    rejectAll(error) {
        this.promisesAwaitingResponse.forEach((_promise, id, _map)=>{
            this.reject(id, error);
            this.deletePromise(id);
        });
    }
    createRequest(request, timeout) {
        let newId;
        if (request.id == null) {
            newId = this.nextId;
            this.nextId += 1;
        } else {
            newId = request.id;
        }
        const newRequest = JSON.stringify(Object.assign(Object.assign({}, request), {
            id: newId
        }));
        const timer = setTimeout(()=>{
            this.reject(newId, new errors_1.TimeoutError(`Timeout for request: ${JSON.stringify(request)} with id ${newId}`, request));
        }, timeout);
        if (timer.unref) {
            ;
            timer.unref();
        }
        if (this.promisesAwaitingResponse.has(newId)) {
            clearTimeout(timer);
            throw new errors_1.XrplError(`Response with id '${newId}' is already pending`, request);
        }
        const newPromise = new Promise((resolve, reject)=>{
            this.promisesAwaitingResponse.set(newId, {
                resolve,
                reject,
                timer
            });
        });
        return [
            newId,
            newRequest,
            newPromise
        ];
    }
    handleResponse(response) {
        var _a, _b;
        if (response.id == null || !(typeof response.id === 'string' || typeof response.id === 'number')) {
            throw new errors_1.ResponseFormatError('valid id not found in response', response);
        }
        if (!this.promisesAwaitingResponse.has(response.id)) {
            return;
        }
        if (response.status == null) {
            const error = new errors_1.ResponseFormatError('Response has no status');
            this.reject(response.id, error);
        }
        if (response.status === 'error') {
            const errorResponse = response;
            const error = new errors_1.RippledError((_a = errorResponse.error_message) !== null && _a !== void 0 ? _a : errorResponse.error, errorResponse);
            this.reject(response.id, error);
            return;
        }
        if (response.status !== 'success') {
            const error = new errors_1.ResponseFormatError(`unrecognized response.status: ${(_b = response.status) !== null && _b !== void 0 ? _b : ''}`, response);
            this.reject(response.id, error);
            return;
        }
        delete response.status;
        this.resolve(response.id, response);
    }
    deletePromise(id) {
        this.promisesAwaitingResponse.delete(id);
    }
}
exports.default = RequestManager; //# sourceMappingURL=RequestManager.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/connection.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Connection = exports.INTENTIONAL_DISCONNECT_CODE = void 0;
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/utils/index.js [app-ssr] (ecmascript)");
const ws_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+isomorphic@1.0.1/node_modules/@xrplf/isomorphic/dist/ws/index.js [app-ssr] (ecmascript)"));
const eventemitter3_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const ConnectionManager_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/ConnectionManager.js [app-ssr] (ecmascript)"));
const ExponentialBackoff_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/ExponentialBackoff.js [app-ssr] (ecmascript)"));
const RequestManager_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/RequestManager.js [app-ssr] (ecmascript)"));
const SECONDS_PER_MINUTE = 60;
const TIMEOUT = 20;
const CONNECTION_TIMEOUT = 5;
exports.INTENTIONAL_DISCONNECT_CODE = 4000;
function createWebSocket(url, config) {
    const options = {
        agent: config.agent
    };
    if (config.headers) {
        options.headers = config.headers;
    }
    if (config.authorization != null) {
        options.headers = Object.assign(Object.assign({}, options.headers), {
            Authorization: `Basic ${btoa(config.authorization)}`
        });
    }
    const websocketOptions = Object.assign({}, options);
    return new ws_1.default(url, websocketOptions);
}
function websocketSendAsync(ws, message) {
    return __awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            ws.send(message, (error)=>{
                if (error) {
                    reject(new errors_1.DisconnectedError(error.message, error));
                } else {
                    resolve();
                }
            });
        });
    });
}
class Connection extends eventemitter3_1.EventEmitter {
    constructor(url, options = {}){
        super();
        this.ws = null;
        this.reconnectTimeoutID = null;
        this.heartbeatIntervalID = null;
        this.retryConnectionBackoff = new ExponentialBackoff_1.default({
            min: 100,
            max: SECONDS_PER_MINUTE * 1000
        });
        this.requestManager = new RequestManager_1.default();
        this.connectionManager = new ConnectionManager_1.default();
        this.trace = ()=>{};
        this.url = url;
        this.config = Object.assign({
            timeout: TIMEOUT * 1000,
            connectionTimeout: CONNECTION_TIMEOUT * 1000
        }, options);
        if (typeof options.trace === 'function') {
            this.trace = options.trace;
        } else if (options.trace) {
            this.trace = console.log;
        }
    }
    get state() {
        return this.ws ? this.ws.readyState : ws_1.default.CLOSED;
    }
    get shouldBeConnected() {
        return this.ws !== null;
    }
    isConnected() {
        return this.state === ws_1.default.OPEN;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.isConnected()) {
                return Promise.resolve();
            }
            if (this.state === ws_1.default.CONNECTING) {
                return this.connectionManager.awaitConnection();
            }
            if (!this.url) {
                return Promise.reject(new errors_1.ConnectionError('Cannot connect because no server was specified'));
            }
            if (this.ws != null) {
                return Promise.reject(new errors_1.XrplError('Websocket connection never cleaned up.', {
                    state: this.state
                }));
            }
            const connectionTimeoutID = setTimeout(()=>{
                this.onConnectionFailed(new errors_1.ConnectionError(`Error: connect() timed out after ${this.config.connectionTimeout} ms. If your internet connection is working, the ` + `rippled server may be blocked or inaccessible. You can also try setting the 'connectionTimeout' option in the Client constructor.`));
            }, this.config.connectionTimeout);
            this.ws = createWebSocket(this.url, this.config);
            if (this.ws == null) {
                throw new errors_1.XrplError('Connect: created null websocket');
            }
            this.ws.on('error', (error)=>this.onConnectionFailed(error));
            this.ws.on('error', ()=>clearTimeout(connectionTimeoutID));
            this.ws.on('close', (reason)=>this.onConnectionFailed(reason));
            this.ws.on('close', ()=>clearTimeout(connectionTimeoutID));
            this.ws.once('open', ()=>{
                void this.onceOpen(connectionTimeoutID);
            });
            return this.connectionManager.awaitConnection();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function*() {
            this.clearHeartbeatInterval();
            if (this.reconnectTimeoutID !== null) {
                clearTimeout(this.reconnectTimeoutID);
                this.reconnectTimeoutID = null;
            }
            if (this.state === ws_1.default.CLOSED) {
                return Promise.resolve(undefined);
            }
            if (this.ws == null) {
                return Promise.resolve(undefined);
            }
            return new Promise((resolve)=>{
                if (this.ws == null) {
                    resolve(undefined);
                }
                if (this.ws != null) {
                    this.ws.once('close', (code)=>resolve(code));
                }
                if (this.ws != null && this.state !== ws_1.default.CLOSING) {
                    this.ws.close(exports.INTENTIONAL_DISCONNECT_CODE);
                }
            });
        });
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function*() {
            this.emit('reconnect');
            yield this.disconnect();
            yield this.connect();
        });
    }
    request(request, timeout) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!this.shouldBeConnected || this.ws == null) {
                throw new errors_1.NotConnectedError(JSON.stringify(request), request);
            }
            const [id, message, responsePromise] = this.requestManager.createRequest(request, timeout !== null && timeout !== void 0 ? timeout : this.config.timeout);
            this.trace('send', message);
            websocketSendAsync(this.ws, message).catch((error)=>{
                this.requestManager.reject(id, error);
            });
            return responsePromise;
        });
    }
    getUrl() {
        var _a;
        return (_a = this.url) !== null && _a !== void 0 ? _a : '';
    }
    onMessage(message) {
        this.trace('receive', message);
        let data;
        try {
            data = JSON.parse(message);
        } catch (error) {
            if (error instanceof Error) {
                this.emit('error', 'badMessage', error.message, message);
            }
            return;
        }
        if (data.type == null && data.error) {
            this.emit('error', data.error, data.error_message, data);
            return;
        }
        if (data.type) {
            this.emit(data.type, data);
        }
        if (data.type === 'response') {
            try {
                this.requestManager.handleResponse(data);
            } catch (error) {
                if (error instanceof Error) {
                    this.emit('error', 'badMessage', error.message, message);
                } else {
                    this.emit('error', 'badMessage', error, error);
                }
            }
        }
    }
    onceOpen(connectionTimeoutID) {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.ws == null) {
                throw new errors_1.XrplError('onceOpen: ws is null');
            }
            this.ws.removeAllListeners();
            clearTimeout(connectionTimeoutID);
            this.ws.on('message', (message)=>this.onMessage(message));
            this.ws.on('error', (error)=>this.emit('error', 'websocket', error.message, error));
            this.ws.once('close', (code, reason)=>{
                if (this.ws == null) {
                    throw new errors_1.XrplError('onceClose: ws is null');
                }
                this.clearHeartbeatInterval();
                this.requestManager.rejectAll(new errors_1.DisconnectedError(`websocket was closed, ${reason ? (0, utils_1.hexToString)((0, utils_1.bytesToHex)(reason)) : ''}`));
                this.ws.removeAllListeners();
                this.ws = null;
                if (code === undefined) {
                    const internalErrorCode = 1011;
                    this.emit('disconnected', internalErrorCode);
                } else {
                    this.emit('disconnected', code);
                }
                if (code !== exports.INTENTIONAL_DISCONNECT_CODE && code !== undefined) {
                    this.intentionalDisconnect();
                }
            });
            try {
                this.retryConnectionBackoff.reset();
                this.startHeartbeatInterval();
                this.connectionManager.resolveAllAwaiting();
                this.emit('connected');
            } catch (error) {
                if (error instanceof Error) {
                    this.connectionManager.rejectAllAwaiting(error);
                    yield this.disconnect().catch(()=>{});
                }
            }
        });
    }
    intentionalDisconnect() {
        const retryTimeout = this.retryConnectionBackoff.duration();
        this.trace('reconnect', `Retrying connection in ${retryTimeout}ms.`);
        this.emit('reconnecting', this.retryConnectionBackoff.attempts);
        this.reconnectTimeoutID = setTimeout(()=>{
            this.reconnect().catch((error)=>{
                this.emit('error', 'reconnect', error.message, error);
            });
        }, retryTimeout);
    }
    clearHeartbeatInterval() {
        if (this.heartbeatIntervalID) {
            clearInterval(this.heartbeatIntervalID);
        }
    }
    startHeartbeatInterval() {
        this.clearHeartbeatInterval();
        this.heartbeatIntervalID = setInterval(()=>{
            void this.heartbeat();
        }, this.config.timeout);
    }
    heartbeat() {
        return __awaiter(this, void 0, void 0, function*() {
            this.request({
                command: 'ping'
            }).catch(()=>__awaiter(this, void 0, void 0, function*() {
                    return this.reconnect().catch((error)=>{
                        this.emit('error', 'reconnect', error.message, error);
                    });
                }));
        });
    }
    onConnectionFailed(errorOrCode) {
        if (this.ws) {
            this.ws.removeAllListeners();
            this.ws.on('error', ()=>{});
            this.ws.close();
            this.ws = null;
        }
        if (typeof errorOrCode === 'number') {
            this.connectionManager.rejectAllAwaiting(new errors_1.NotConnectedError(`Connection failed with code ${errorOrCode}.`, {
                code: errorOrCode
            }));
        } else if (errorOrCode === null || errorOrCode === void 0 ? void 0 : errorOrCode.message) {
            this.connectionManager.rejectAllAwaiting(new errors_1.NotConnectedError(errorOrCode.message, errorOrCode));
        } else {
            this.connectionManager.rejectAllAwaiting(new errors_1.NotConnectedError('Connection failed.'));
        }
    }
}
exports.Connection = Connection; //# sourceMappingURL=connection.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/partialPayment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleStreamPartialPayment = exports.handlePartialPayment = void 0;
const bignumber_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/bignumber.js@9.3.1/node_modules/bignumber.js/bignumber.js [app-ssr] (ecmascript)"));
const ripple_binary_codec_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/ripple-binary-codec@2.5.1/node_modules/ripple-binary-codec/dist/index.js [app-ssr] (ecmascript)");
const transactions_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/index.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/index.js [app-ssr] (ecmascript)");
const WARN_PARTIAL_PAYMENT_CODE = 2001;
function amountsEqual(amt1, amt2) {
    if (typeof amt1 === 'string' && typeof amt2 === 'string') {
        return amt1 === amt2;
    }
    if (typeof amt1 === 'string' || typeof amt2 === 'string') {
        return false;
    }
    const aValue = new bignumber_js_1.default(amt1.value);
    const bValue = new bignumber_js_1.default(amt2.value);
    return amt1.currency === amt2.currency && amt1.issuer === amt2.issuer && aValue.isEqualTo(bValue);
}
function isPartialPayment(tx, metadata) {
    var _a;
    if (tx == null || metadata == null || tx.TransactionType !== 'Payment') {
        return false;
    }
    let meta = metadata;
    if (typeof meta === 'string') {
        if (meta === 'unavailable') {
            return false;
        }
        meta = (0, ripple_binary_codec_1.decode)(meta);
    }
    const tfPartial = typeof tx.Flags === 'number' ? (0, utils_1.isFlagEnabled)(tx.Flags, transactions_1.PaymentFlags.tfPartialPayment) : (_a = tx.Flags) === null || _a === void 0 ? void 0 : _a.tfPartialPayment;
    if (!tfPartial) {
        return false;
    }
    const delivered = meta.delivered_amount;
    const amount = tx.Amount;
    if (delivered === undefined) {
        return false;
    }
    return !amountsEqual(delivered, amount);
}
function txHasPartialPayment(response) {
    return isPartialPayment(response.result, response.result.meta);
}
function txEntryHasPartialPayment(response) {
    return isPartialPayment(response.result.tx_json, response.result.metadata);
}
function accountTxHasPartialPayment(response) {
    const { transactions } = response.result;
    const foo = transactions.some((tx)=>isPartialPayment(tx.tx, tx.meta));
    return foo;
}
function hasPartialPayment(command, response) {
    switch(command){
        case 'tx':
            return txHasPartialPayment(response);
        case 'transaction_entry':
            return txEntryHasPartialPayment(response);
        case 'account_tx':
            return accountTxHasPartialPayment(response);
        default:
            return false;
    }
}
function handlePartialPayment(command, response) {
    var _a;
    if (hasPartialPayment(command, response)) {
        const warnings = (_a = response.warnings) !== null && _a !== void 0 ? _a : [];
        const warning = {
            id: WARN_PARTIAL_PAYMENT_CODE,
            message: 'This response contains a Partial Payment'
        };
        warnings.push(warning);
        response.warnings = warnings;
    }
}
exports.handlePartialPayment = handlePartialPayment;
function handleStreamPartialPayment(stream, log) {
    var _a;
    if (isPartialPayment(stream.transaction, stream.meta)) {
        const warnings = (_a = stream.warnings) !== null && _a !== void 0 ? _a : [];
        const warning = {
            id: WARN_PARTIAL_PAYMENT_CODE,
            message: 'This response contains a Partial Payment'
        };
        warnings.push(warning);
        stream.warnings = warnings;
        log('Partial payment received', JSON.stringify(stream));
    }
}
exports.handleStreamPartialPayment = handleStreamPartialPayment; //# sourceMappingURL=partialPayment.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = void 0;
const eventemitter3_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js [app-ssr] (ecmascript)");
const errors_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)");
const flags_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/flags.js [app-ssr] (ecmascript)");
const sugar_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/index.js [app-ssr] (ecmascript)");
const autofill_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/autofill.js [app-ssr] (ecmascript)");
const balances_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/balances.js [app-ssr] (ecmascript)");
const getOrderbook_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/sugar/getOrderbook.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/index.js [app-ssr] (ecmascript)");
const Wallet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/index.js [app-ssr] (ecmascript)");
const fundWallet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/fundWallet.js [app-ssr] (ecmascript)");
const connection_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/connection.js [app-ssr] (ecmascript)");
const partialPayment_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/partialPayment.js [app-ssr] (ecmascript)");
function getCollectKeyFromCommand(command) {
    switch(command){
        case 'account_channels':
            return 'channels';
        case 'account_lines':
            return 'lines';
        case 'account_objects':
            return 'account_objects';
        case 'account_tx':
            return 'transactions';
        case 'account_offers':
        case 'book_offers':
            return 'offers';
        case 'ledger_data':
            return 'state';
        default:
            return null;
    }
}
function clamp(value, min, max) {
    if (min > max) {
        throw new Error('Illegal clamp bounds');
    }
    return Math.min(Math.max(value, min), max);
}
const DEFAULT_FEE_CUSHION = 1.2;
const DEFAULT_MAX_FEE_XRP = '2';
const MIN_LIMIT = 10;
const MAX_LIMIT = 400;
const NORMAL_DISCONNECT_CODE = 1000;
class Client extends eventemitter3_1.EventEmitter {
    constructor(server, options = {}){
        var _a, _b;
        super();
        if (typeof server !== 'string' || !/wss?(?:\+unix)?:\/\//u.exec(server)) {
            throw new errors_1.ValidationError('server URI must start with `wss://`, `ws://`, `wss+unix://`, or `ws+unix://`.');
        }
        this.feeCushion = (_a = options.feeCushion) !== null && _a !== void 0 ? _a : DEFAULT_FEE_CUSHION;
        this.maxFeeXRP = (_b = options.maxFeeXRP) !== null && _b !== void 0 ? _b : DEFAULT_MAX_FEE_XRP;
        this.connection = new connection_1.Connection(server, options);
        this.connection.on('error', (errorCode, errorMessage, data)=>{
            this.emit('error', errorCode, errorMessage, data);
        });
        this.connection.on('reconnect', ()=>{
            this.connection.on('connected', ()=>this.emit('connected'));
        });
        this.connection.on('disconnected', (code)=>{
            let finalCode = code;
            if (finalCode === connection_1.INTENTIONAL_DISCONNECT_CODE) {
                finalCode = NORMAL_DISCONNECT_CODE;
            }
            this.emit('disconnected', finalCode);
        });
        this.connection.on('ledgerClosed', (ledger)=>{
            this.emit('ledgerClosed', ledger);
        });
        this.connection.on('transaction', (tx)=>{
            (0, partialPayment_1.handleStreamPartialPayment)(tx, this.connection.trace);
            this.emit('transaction', tx);
        });
        this.connection.on('validationReceived', (validation)=>{
            this.emit('validationReceived', validation);
        });
        this.connection.on('manifestReceived', (manifest)=>{
            this.emit('manifestReceived', manifest);
        });
        this.connection.on('peerStatusChange', (status)=>{
            this.emit('peerStatusChange', status);
        });
        this.connection.on('consensusPhase', (consensus)=>{
            this.emit('consensusPhase', consensus);
        });
        this.connection.on('path_find', (path)=>{
            this.emit('path_find', path);
        });
    }
    get url() {
        return this.connection.getUrl();
    }
    request(req) {
        return __awaiter(this, void 0, void 0, function*() {
            const response = yield this.connection.request(Object.assign(Object.assign({}, req), {
                account: req.account ? (0, sugar_1.ensureClassicAddress)(req.account) : undefined
            }));
            (0, partialPayment_1.handlePartialPayment)(req.command, response);
            return response;
        });
    }
    requestNextPage(req, resp) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!resp.result.marker) {
                return Promise.reject(new errors_1.NotFoundError('response does not have a next page'));
            }
            const nextPageRequest = Object.assign(Object.assign({}, req), {
                marker: resp.result.marker
            });
            return this.request(nextPageRequest);
        });
    }
    on(eventName, listener) {
        return super.on(eventName, listener);
    }
    requestAll(request, collect) {
        return __awaiter(this, void 0, void 0, function*() {
            const collectKey = collect !== null && collect !== void 0 ? collect : getCollectKeyFromCommand(request.command);
            if (!collectKey) {
                throw new errors_1.ValidationError(`no collect key for command ${request.command}`);
            }
            const countTo = request.limit == null ? Infinity : request.limit;
            let count = 0;
            let marker = request.marker;
            const results = [];
            do {
                const countRemaining = clamp(countTo - count, MIN_LIMIT, MAX_LIMIT);
                const repeatProps = Object.assign(Object.assign({}, request), {
                    limit: countRemaining,
                    marker
                });
                const singleResponse = yield this.connection.request(repeatProps);
                const singleResult = singleResponse.result;
                if (!(collectKey in singleResult)) {
                    throw new errors_1.XrplError(`${collectKey} not in result`);
                }
                const collectedData = singleResult[collectKey];
                marker = singleResult.marker;
                results.push(singleResponse);
                if (Array.isArray(collectedData)) {
                    count += collectedData.length;
                }
            }while (Boolean(marker) && count < countTo)
            return results;
        });
    }
    getServerInfo() {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const response = yield this.request({
                    command: 'server_info'
                });
                this.networkID = (_a = response.result.info.network_id) !== null && _a !== void 0 ? _a : undefined;
                this.buildVersion = response.result.info.build_version;
            } catch (error) {
                console.error(error);
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function*() {
            return this.connection.connect().then(()=>__awaiter(this, void 0, void 0, function*() {
                    yield this.getServerInfo();
                    this.emit('connected');
                }));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.connection.disconnect();
        });
    }
    isConnected() {
        return this.connection.isConnected();
    }
    autofill(transaction, signersCount) {
        return __awaiter(this, void 0, void 0, function*() {
            const tx = Object.assign({}, transaction);
            (0, autofill_1.setValidAddresses)(tx);
            (0, flags_1.setTransactionFlagsToNumber)(tx);
            const promises = [];
            if (tx.NetworkID == null) {
                tx.NetworkID = (0, autofill_1.txNeedsNetworkID)(this) ? this.networkID : undefined;
            }
            if (tx.Sequence == null) {
                promises.push((0, autofill_1.setNextValidSequenceNumber)(this, tx));
            }
            if (tx.Fee == null) {
                promises.push((0, autofill_1.calculateFeePerTransactionType)(this, tx, signersCount));
            }
            if (tx.LastLedgerSequence == null) {
                promises.push((0, autofill_1.setLatestValidatedLedgerSequence)(this, tx));
            }
            if (tx.TransactionType === 'AccountDelete') {
                promises.push((0, autofill_1.checkAccountDeleteBlockers)(this, tx));
            }
            return Promise.all(promises).then(()=>tx);
        });
    }
    submit(transaction, opts) {
        return __awaiter(this, void 0, void 0, function*() {
            const signedTx = yield (0, sugar_1.getSignedTx)(this, transaction, opts);
            return (0, sugar_1.submitRequest)(this, signedTx, opts === null || opts === void 0 ? void 0 : opts.failHard);
        });
    }
    submitAndWait(transaction, opts) {
        return __awaiter(this, void 0, void 0, function*() {
            const signedTx = yield (0, sugar_1.getSignedTx)(this, transaction, opts);
            const lastLedger = (0, sugar_1.getLastLedgerSequence)(signedTx);
            if (lastLedger == null) {
                throw new errors_1.ValidationError('Transaction must contain a LastLedgerSequence value for reliable submission.');
            }
            const response = yield (0, sugar_1.submitRequest)(this, signedTx, opts === null || opts === void 0 ? void 0 : opts.failHard);
            const txHash = utils_1.hashes.hashSignedTx(signedTx);
            return (0, sugar_1.waitForFinalTransactionOutcome)(this, txHash, lastLedger, response.result.engine_result);
        });
    }
    prepareTransaction(transaction, signersCount) {
        return __awaiter(this, void 0, void 0, function*() {
            return this.autofill(transaction, signersCount);
        });
    }
    getXrpBalance(address, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            const xrpRequest = {
                command: 'account_info',
                account: address,
                ledger_index: (_a = options.ledger_index) !== null && _a !== void 0 ? _a : 'validated',
                ledger_hash: options.ledger_hash
            };
            const response = yield this.request(xrpRequest);
            return (0, utils_1.dropsToXrp)(response.result.account_data.Balance);
        });
    }
    getBalances(address, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            const balances = [];
            let xrpPromise = Promise.resolve(0);
            if (!options.peer) {
                xrpPromise = this.getXrpBalance(address, {
                    ledger_hash: options.ledger_hash,
                    ledger_index: options.ledger_index
                });
            }
            const linesRequest = {
                command: 'account_lines',
                account: address,
                ledger_index: (_a = options.ledger_index) !== null && _a !== void 0 ? _a : 'validated',
                ledger_hash: options.ledger_hash,
                peer: options.peer,
                limit: options.limit
            };
            const linesPromise = this.requestAll(linesRequest);
            yield Promise.all([
                xrpPromise,
                linesPromise
            ]).then(([xrpBalance, linesResponses])=>{
                const accountLinesBalance = linesResponses.flatMap((response)=>(0, balances_1.formatBalances)(response.result.lines));
                if (xrpBalance !== 0) {
                    balances.push({
                        currency: 'XRP',
                        value: xrpBalance.toString()
                    });
                }
                balances.push(...accountLinesBalance);
            });
            return balances.slice(0, options.limit);
        });
    }
    getOrderbook(currency1, currency2, options = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            (0, getOrderbook_1.validateOrderbookOptions)(options);
            const request = (0, getOrderbook_1.createBookOffersRequest)(currency1, currency2, options);
            const directOfferResults = yield (0, getOrderbook_1.requestAllOffers)(this, request);
            const reverseOfferResults = yield (0, getOrderbook_1.requestAllOffers)(this, (0, getOrderbook_1.reverseRequest)(request));
            const directOffers = (0, getOrderbook_1.extractOffers)(directOfferResults);
            const reverseOffers = (0, getOrderbook_1.extractOffers)(reverseOfferResults);
            const orders = (0, getOrderbook_1.combineOrders)(directOffers, reverseOffers);
            const { buy, sell } = (0, getOrderbook_1.separateBuySellOrders)(orders);
            return {
                buy: (0, getOrderbook_1.sortAndLimitOffers)(buy, options.limit),
                sell: (0, getOrderbook_1.sortAndLimitOffers)(sell, options.limit)
            };
        });
    }
    getLedgerIndex() {
        return __awaiter(this, void 0, void 0, function*() {
            const ledgerResponse = yield this.request({
                command: 'ledger',
                ledger_index: 'validated'
            });
            return ledgerResponse.result.ledger_index;
        });
    }
    fundWallet(wallet, options = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!this.isConnected()) {
                throw new errors_1.RippledError('Client not connected, cannot call faucet');
            }
            const existingWallet = Boolean(wallet);
            const walletToFund = wallet && (0, utils_1.isValidClassicAddress)(wallet.classicAddress) ? wallet : Wallet_1.Wallet.generate();
            const postBody = {
                destination: walletToFund.classicAddress,
                xrpAmount: options.amount,
                usageContext: options.usageContext,
                userAgent: 'xrpl.js'
            };
            let startingBalance = 0;
            if (existingWallet) {
                try {
                    startingBalance = Number((yield this.getXrpBalance(walletToFund.classicAddress)));
                } catch (_a) {}
            }
            return (0, fundWallet_1.requestFunding)(options, this, startingBalance, walletToFund, postBody);
        });
    }
}
exports.Client = Client; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/Amendments.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AMENDMENTS_ID = void 0;
exports.AMENDMENTS_ID = '7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4'; //# sourceMappingURL=Amendments.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/FeeSettings.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FEE_SETTINGS_ID = void 0;
exports.FEE_SETTINGS_ID = '4BC50C9B0D8515D3EAAE1E74B29A95804346C491EE1A95BF25E4AAB854A6A651'; //# sourceMappingURL=FeeSettings.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/NegativeUNL.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NEGATIVE_UNL_ID = void 0;
exports.NEGATIVE_UNL_ID = '2E8A59AA9D3B5B186B0B9E0F62E6C02587CA74A4D778938E957B6357D364B244'; //# sourceMappingURL=NegativeUNL.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/RippleState.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RippleStateFlags = void 0;
var RippleStateFlags;
(function(RippleStateFlags) {
    RippleStateFlags[RippleStateFlags["lsfLowReserve"] = 65536] = "lsfLowReserve";
    RippleStateFlags[RippleStateFlags["lsfHighReserve"] = 131072] = "lsfHighReserve";
    RippleStateFlags[RippleStateFlags["lsfLowAuth"] = 262144] = "lsfLowAuth";
    RippleStateFlags[RippleStateFlags["lsfHighAuth"] = 524288] = "lsfHighAuth";
    RippleStateFlags[RippleStateFlags["lsfLowNoRipple"] = 1048576] = "lsfLowNoRipple";
    RippleStateFlags[RippleStateFlags["lsfHighNoRipple"] = 2097152] = "lsfHighNoRipple";
    RippleStateFlags[RippleStateFlags["lsfLowFreeze"] = 4194304] = "lsfLowFreeze";
    RippleStateFlags[RippleStateFlags["lsfHighFreeze"] = 8388608] = "lsfHighFreeze";
    RippleStateFlags[RippleStateFlags["lsfAMMNode"] = 16777216] = "lsfAMMNode";
})(RippleStateFlags || (exports.RippleStateFlags = RippleStateFlags = {})); //# sourceMappingURL=RippleState.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/SignerList.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignerListFlags = void 0;
var SignerListFlags;
(function(SignerListFlags) {
    SignerListFlags[SignerListFlags["lsfOneOwnerCount"] = 65536] = "lsfOneOwnerCount";
})(SignerListFlags || (exports.SignerListFlags = SignerListFlags = {})); //# sourceMappingURL=SignerList.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignerListFlags = exports.RippleStateFlags = exports.OfferFlags = exports.NEGATIVE_UNL_ID = exports.FEE_SETTINGS_ID = exports.AMENDMENTS_ID = exports.AccountRootFlags = void 0;
const AccountRoot_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/AccountRoot.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "AccountRootFlags", {
    enumerable: true,
    get: function() {
        return AccountRoot_1.AccountRootFlags;
    }
});
const Amendments_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/Amendments.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "AMENDMENTS_ID", {
    enumerable: true,
    get: function() {
        return Amendments_1.AMENDMENTS_ID;
    }
});
const FeeSettings_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/FeeSettings.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "FEE_SETTINGS_ID", {
    enumerable: true,
    get: function() {
        return FeeSettings_1.FEE_SETTINGS_ID;
    }
});
const NegativeUNL_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/NegativeUNL.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "NEGATIVE_UNL_ID", {
    enumerable: true,
    get: function() {
        return NegativeUNL_1.NEGATIVE_UNL_ID;
    }
});
const Offer_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/Offer.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "OfferFlags", {
    enumerable: true,
    get: function() {
        return Offer_1.OfferFlags;
    }
});
const RippleState_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/RippleState.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "RippleStateFlags", {
    enumerable: true,
    get: function() {
        return RippleState_1.RippleStateFlags;
    }
});
const SignerList_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/SignerList.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "SignerListFlags", {
    enumerable: true,
    get: function() {
        return SignerList_1.SignerListFlags;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/methods/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/common/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseAccountRootFlags = exports.setTransactionFlagsToNumber = exports.LedgerEntry = void 0;
exports.LedgerEntry = __importStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/ledger/index.js [app-ssr] (ecmascript)"));
var flags_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/utils/flags.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "setTransactionFlagsToNumber", {
    enumerable: true,
    get: function() {
        return flags_1.setTransactionFlagsToNumber;
    }
});
Object.defineProperty(exports, "parseAccountRootFlags", {
    enumerable: true,
    get: function() {
        return flags_1.parseAccountRootFlags;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/methods/index.js [app-ssr] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/transactions/index.js [app-ssr] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/common/index.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/walletFromSecretNumbers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.walletFromSecretNumbers = void 0;
const secret_numbers_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@xrplf+secret-numbers@1.0.0/node_modules/@xrplf/secret-numbers/dist/index.js [app-ssr] (ecmascript)");
const ECDSA_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/ECDSA.js [app-ssr] (ecmascript)"));
const _1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/index.js [app-ssr] (ecmascript)");
function walletFromSecretNumbers(secretNumbers, opts) {
    var _a;
    const secret = new secret_numbers_1.Account(secretNumbers).getFamilySeed();
    const updatedOpts = {
        masterAddress: undefined,
        algorithm: undefined
    };
    if (opts === undefined) {
        updatedOpts.algorithm = ECDSA_1.default.secp256k1;
    } else {
        updatedOpts.masterAddress = opts.masterAddress;
        updatedOpts.algorithm = (_a = opts.algorithm) !== null && _a !== void 0 ? _a : ECDSA_1.default.secp256k1;
    }
    return _1.Wallet.fromSecret(secret, updatedOpts);
}
exports.walletFromSecretNumbers = walletFromSecretNumbers; //# sourceMappingURL=walletFromSecretNumbers.js.map
}),
"[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rfc1751MnemonicToKey = exports.keyToRFC1751Mnemonic = exports.walletFromSecretNumbers = exports.Wallet = exports.ECDSA = exports.Client = void 0;
var client_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/client/index.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "Client", {
    enumerable: true,
    get: function() {
        return client_1.Client;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/models/index.js [app-ssr] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/utils/index.js [app-ssr] (ecmascript)"), exports);
var ECDSA_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/ECDSA.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "ECDSA", {
    enumerable: true,
    get: function() {
        return __importDefault(ECDSA_1).default;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/errors.js [app-ssr] (ecmascript)"), exports);
var Wallet_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/index.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "Wallet", {
    enumerable: true,
    get: function() {
        return Wallet_1.Wallet;
    }
});
var walletFromSecretNumbers_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/walletFromSecretNumbers.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "walletFromSecretNumbers", {
    enumerable: true,
    get: function() {
        return walletFromSecretNumbers_1.walletFromSecretNumbers;
    }
});
var rfc1751_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/rfc1751.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "keyToRFC1751Mnemonic", {
    enumerable: true,
    get: function() {
        return rfc1751_1.keyToRFC1751Mnemonic;
    }
});
Object.defineProperty(exports, "rfc1751MnemonicToKey", {
    enumerable: true,
    get: function() {
        return rfc1751_1.rfc1751MnemonicToKey;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/.pnpm/xrpl@3.1.0/node_modules/xrpl/dist/npm/Wallet/signer.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=e2c5b_xrpl_dist_npm_63470ce6._.js.map