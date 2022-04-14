"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSessionExpiryHandler = void 0;
// Initialize caccl
var client_1 = require("caccl/client");
// Import custom error
var ErrorWithCode_1 = __importDefault(require("../errors/ErrorWithCode"));
var ReactKitErrorCode_1 = __importDefault(require("../types/ReactKitErrorCode"));
/*------------------------------------------------------------------------*/
/*                                Listener                                */
/*------------------------------------------------------------------------*/
// Handler for session expiry
var sessionExpiryHandler;
// Keep track of whether or not session expiry has already been handled
var sessionAlreadyExpired = false;
/**
 * Set the session expiry handler
 * @author Gabe Abrams
 * @param handler new handler to use when session expires
 */
var setSessionExpiryHandler = function (handler) {
    sessionExpiryHandler = handler;
};
exports.setSessionExpiryHandler = setSessionExpiryHandler;
/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/
/**
 * Visit an endpoint on the server [for client only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path - the path of the server endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @returns response from server
 */
var visitServerEndpoint = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, client_1.sendRequest)({
                    path: opts.path,
                    method: opts.method,
                    params: opts.params,
                })];
            case 1:
                response = _a.sent();
                // Check for failure
                if (!response || !response.body) {
                    throw new ErrorWithCode_1.default('We didn\'t get a response from the server. Please check your internet connection.', ReactKitErrorCode_1.default.NoResponse);
                }
                if (!!response.body.success) return [3 /*break*/, 6];
                if (!(response.body.code === ReactKitErrorCode_1.default.SessionExpired)) return [3 /*break*/, 5];
                if (!sessionAlreadyExpired) return [3 /*break*/, 3];
                // Never return (browser is already reloading)
                return [4 /*yield*/, new Promise(function () {
                        // Promise that never returns
                    })];
            case 2:
                // Never return (browser is already reloading)
                _a.sent();
                _a.label = 3;
            case 3:
                sessionAlreadyExpired = true;
                // Show session expiration message
                if (sessionExpiryHandler) {
                    // Use handler
                    sessionExpiryHandler();
                }
                else {
                    // Fallback to alert
                    // eslint-disable-next-line no-alert
                    alert('Your session has expired. Please start over.');
                }
                // Never return (don't continue execution)
                return [4 /*yield*/, new Promise(function () {
                        // Promise that never returns
                    })];
            case 4:
                // Never return (don't continue execution)
                _a.sent();
                _a.label = 5;
            case 5: 
            // Other errors
            throw new ErrorWithCode_1.default((response.body.message
                || 'An unknown error occurred. Please contact an admin.'), (response.body.code
                || ReactKitErrorCode_1.default.NoCode));
            case 6:
                body = response.body.body;
                // Return
                return [2 /*return*/, body];
        }
    });
}); };
exports.default = visitServerEndpoint;
//# sourceMappingURL=visitServerEndpoint.js.map