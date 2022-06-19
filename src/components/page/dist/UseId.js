"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.UseId = void 0;
var react_1 = require("react");
var react_2 = require("react");
var Layout_1 = require("../Layout/Layout");
var TextBox = function (_a) {
    var title = _a.title, placeholder = _a.placeholder, inputProps = _a.inputProps, errorMessage = _a.errorMessage;
    var errorMessageId = react_2.useId(); // todo: これ！！
    var _b = react_1.useState(true), inputCondition = _b[0], setInputCondition = _b[1];
    // okを押したときに、inputに何も入ってなかったら、エラーを出す
    var onClickOk = function () {
        if (inputCondition) {
            setInputCondition(false);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("label", null,
            React.createElement("p", null, title),
            React.createElement("input", __assign({}, inputProps, { type: "text", "aria-aria-invalid": !!errorMessage, "aria-errorMessage": errorMessageId, className: "mb-5 rounded border border-gray-500 px-3 py-1 text-sm", placeholder: placeholder, title: title, onChange: function () { return setInputCondition(true); } })),
            inputCondition || (React.createElement("p", { id: errorMessageId, className: "my-3 text-xl font-bold text-pink-300" }, errorMessage))),
        React.createElement("button", { onClick: onClickOk, className: "my-5 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500" }, "OK"),
        React.createElement("p", null, inputCondition)));
};
exports.UseId = function () {
    return (React.createElement(Layout_1.Layout, null,
        React.createElement("p", { className: "my-3 text-xl font-bold text-blue-500" }, "userid"),
        React.createElement(TextBox, { title: "\u304A\u540D\u524D", placeholder: "\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" })));
};
