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
exports.__esModule = true;
exports.Concurrent = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
var NavBar_1 = require("../Layout/NavBar");
var Spinner_1 = require("../Spinner");
exports.Concurrent = function () {
    var _a = react_1.useState(false), isApply = _a[0], setIsApply = _a[1];
    var _b = react_1.useState([]), photos = _b[0], setPhotos = _b[1];
    var _c = react_1.useState(''), input = _c[0], setInput = _c[1]; //urgent state update
    var _d = react_1.useState(''), searchKey = _d[0], setSearchKey = _d[1]; // not urgent state update
    var _e = react_1.useTransition(), isPending = _e[0], startTransition = _e[1]; // todo: これ！！
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]('https://jsonplaceholder.typicode.com/photos')];
                    case 1:
                        res = _a.sent();
                        setPhotos(res.data);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var filteredPhoto = photos.filter(function (photo) {
        return photo.title.includes(searchKey);
    });
    var updateHandler = function (e) {
        setInput(e.target.value);
        startTransition(function () { return setSearchKey(e.target.value); });
    };
    return (React.createElement("div", { className: "flex flex-col items-center font-mono text-gray-600" },
        React.createElement(NavBar_1.NavBar, null),
        React.createElement("button", { onClick: function () { return setIsApply(!isApply); }, className: "my-5 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500" }, "\u5207\u308A\u66FF\u3048"),
        React.createElement("p", { className: "text-sm  text-blue-500" }, isApply ? '優先づけ適用' : 'なし'),
        React.createElement("p", { className: "my-3 text-xl font-bold " + (isPending ? "text-pink-500" : "text-blue-500") }, "StartTransition"),
        React.createElement("input", { type: "text", className: "mb-5 rounded border border-gray-300 px-3 py-1 text-sm", value: input, onChange: updateHandler }),
        React.createElement(react_1.Suspense, { fallback: React.createElement(Spinner_1.Spinner, null) }, filteredPhoto.map(function (photo) {
            return (React.createElement("div", { className: "center mb-5 flex items-center text-center" },
                React.createElement("p", { className: "text-sm  text-blue-500" }, photo === null || photo === void 0 ? void 0 : photo.title),
                React.createElement("img", { className: "w-10m-4 h-10", src: photo === null || photo === void 0 ? void 0 : photo.url, alt: photo === null || photo === void 0 ? void 0 : photo.titile })));
        }))));
};
