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
var index_1 = __importDefault(require("../index"));
var fs_1 = __importDefault(require("fs"));
var supertest_1 = __importDefault(require("supertest"));
var funtion_1 = __importDefault(require("../funtion"));
var request = (0, supertest_1.default)(index_1.default);
describe('I- A test for my endpoint', function () {
    it('1. tests the api endpoint status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2. tests successful access to the api endpoint ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.status === 400).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("II- Test for my application's functionality", function () {
    it('1. tests the availability of the thumbnail image in the thumb folder', function () {
        expect(index_1.default.get('/process', function (req) {
            return fs_1.default.readdirSync("./thumb/".concat(req.query.filename, "_thumb") +
                '-' +
                req.query.width +
                'x' +
                req.query.height +
                '.jpg');
        })).toBeTruthy();
    });
    it('2. tests the resizing of the thumbnail image', function () {
        index_1.default.get('/process', function testImg(req) {
            var thumbInfo = fs_1.default.statSync("./thumb/".concat(req.query.filename, "_thumb") +
                '-' +
                req.query.width +
                'x' +
                req.query.height +
                '.jpg');
            var thumbSize = thumbInfo.size;
            var imgInfo = fs_1.default.statSync("./images/".concat(req.query.filename, ".jpg"));
            var imgSize = imgInfo.size;
            expect(imgSize).toBeGreaterThan(thumbSize);
        });
    });
    it('3. tests the functionality of the image resizing function.', function () {
        index_1.default.get('/process', function testImg(req) {
            return __awaiter(this, void 0, void 0, function () {
                var width, height, filePath, inputImg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            width = parseInt(req.query.width);
                            height = parseInt(req.query.height);
                            return [4 /*yield*/, ("./thumb/".concat(req.query.filename, "_thumb") +
                                    '-' +
                                    width +
                                    'x' +
                                    height +
                                    '.jpg')];
                        case 1:
                            filePath = _a.sent();
                            return [4 /*yield*/, "./images/".concat(req.query.filename, ".jpg")];
                        case 2:
                            inputImg = _a.sent();
                            if (fs_1.default.statSync(filePath)) {
                                fs_1.default.unlinkSync(filePath);
                            }
                            (0, funtion_1.default)(width, height, inputImg, filePath);
                            expect(fs_1.default.statSync("./thumb/".concat(req.query.filename, "_thumb") +
                                '-' +
                                width +
                                'x' +
                                height +
                                '.jpg')).toBeTruthy();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
