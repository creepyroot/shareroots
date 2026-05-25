"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Guide;
var _react = require("motion/react");
var _lucideReact = require("lucide-react");
var _jsxRuntime = require("react/jsx-runtime");
function Guide({
  onBack
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    className: "w-full max-w-2xl bg-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      onClick: onBack,
      className: "flex items-center gap-2 text-slate-400 hover:text-white mb-6 font-mono text-sm",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ArrowLeft, {
        className: "w-4 h-4"
      }), " Back to Home"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "text-3xl font-display font-bold text-white mb-6",
      children: "User Guide"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "space-y-6 text-slate-300",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex gap-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Zap, {
          className: "text-red-400 w-6 h-6 flex-shrink-0"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
            className: "font-semibold text-white",
            children: "Sending Files"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-sm",
            children: "Click 'SEND', drop your files, and share the 6-digit code with the receiver. Your files are encrypted instantly."
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex gap-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.BookOpen, {
          className: "text-purple-400 w-6 h-6 flex-shrink-0"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
            className: "font-semibold text-white",
            children: "Receiving"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-sm",
            children: "Enter the code provided by the sender. Once the connection is established, approve the download and your files will start streaming directly to your device."
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex gap-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ShieldCheck, {
          className: "text-emerald-400 w-6 h-6 flex-shrink-0"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
            className: "font-semibold text-white",
            children: "Privacy"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-sm",
            children: "SHARE ROOTS uses high-grade end-to-end encryption. Data moves directly between devices; nothing is stored on our servers."
          })]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mt-8 pt-8 border-t border-slate-800 text-center font-mono text-xs text-slate-500",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Heart, {
        className: "inline w-4 h-4 text-red-500 mr-2"
      }), "Made by GURNOOR WITH LOVE FOR PEOPLE WITH HUGE FILES TO TRANSFER ACROSS LONG LONG DISTANCE."]
    })]
  });
}