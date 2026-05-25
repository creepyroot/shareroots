"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = _interopRequireWildcard(require("react"));
var _CosmicBackground = require("./components/CosmicBackground");
var _Home = _interopRequireDefault(require("./screens/Home"));
var _Sender = _interopRequireDefault(require("./screens/Sender"));
var _Receiver = _interopRequireDefault(require("./screens/Receiver"));
var _Intro = _interopRequireDefault(require("./components/Intro"));
var _Guide = _interopRequireDefault(require("./screens/Guide"));
var _useTransfer = require("./hooks/useTransfer");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function App() {
  const [view, setView] = (0, _react.useState)('home');
  const [recvCode, setRecvCode] = (0, _react.useState)('');
  const [showIntro, setShowIntro] = (0, _react.useState)(true);
  const transferManager = (0, _useTransfer.useTransfer)();

  // Check for deep link
  (0, _react.useEffect)(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('recv');
    if (code) {
      setRecvCode(code);
      setView('receive');
      setShowIntro(false); // Skip intro if deep linked
      // Clear URL to prevent refresh loops
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [showIntro && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Intro.default, {
      onComplete: () => setShowIntro(false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      className: "relative min-h-screen font-sans selection:bg-red-500/30 selection:text-red-200 text-slate-100 flex flex-col",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CosmicBackground.CosmicBackground, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("nav", {
        className: "w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 hover:cursor-pointer",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "flex items-center gap-2",
          onClick: () => setView('home'),
          role: "button",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            className: "font-display font-bold tracking-widest text-white flex items-center gap-1 text-xl",
            children: ["SHARE", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "text-red-400",
              children: "ROOTS"
            })]
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex-1 flex flex-col justify-center items-center w-full z-10 px-4",
        children: [view === 'home' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {
          onSelect: setView
        }), view === 'send' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sender.default, {
          onBack: () => setView('home'),
          transferManager: transferManager
        }), view === 'receive' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Receiver.default, {
          onBack: () => setView('home'),
          transferManager: transferManager,
          initialCode: recvCode
        }), view === 'guide' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Guide.default, {
          onBack: () => setView('home')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("footer", {
        className: "py-6 flex flex-col items-center gap-1 text-center font-mono z-10 sticky top-[100vh]",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-[10px] text-slate-600 mt-2 italic max-w-sm",
          children: "Made by GURNOOR WITH LOVE FOR PEOPLE WITH HUGE FILES TO TRANSFER ACROSS LONG LONG DISTANCE"
        })
      })]
    })]
  });
}