"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Intro;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("motion/react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Intro({
  onComplete
}) {
  const [stage, setStage] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    // Sequence timing
    const timers = [setTimeout(() => setStage(1), 500),
    // Show "GURNOOR PROJECTS"
    setTimeout(() => setStage(2), 2000),
    // Show "presents"
    setTimeout(() => setStage(3), 3500),
    // Fade all out
    setTimeout(() => {
      onComplete();
    }, 4500) // Unmount Intro and show App
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.AnimatePresence, {
    children: stage < 3 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden",
      initial: {
        opacity: 1
      },
      exit: {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)"
      },
      transition: {
        duration: 1,
        ease: 'easeInOut'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
        animate: {
          opacity: [0.1, 0.3, 0.1]
        },
        transition: {
          duration: 4,
          repeat: Infinity
        },
        className: "absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/40 blur-[120px] pointer-events-none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
        animate: {
          opacity: [0.1, 0.2, 0.1]
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          delay: 1
        },
        className: "absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/40 blur-[120px] pointer-events-none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "relative z-10 flex flex-col items-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.AnimatePresence, {
          children: stage >= 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.h1, {
            initial: {
              opacity: 0,
              y: 20,
              letterSpacing: "0.1em"
            },
            animate: {
              opacity: 1,
              y: 0,
              letterSpacing: "0.2em"
            },
            exit: {
              opacity: 0,
              y: -20
            },
            transition: {
              duration: 1,
              ease: 'easeOut'
            },
            className: "text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase text-center drop-shadow-2xl mb-6",
            children: "Gurnoor Projects"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.AnimatePresence, {
          children: stage >= 2 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.p, {
            initial: {
              opacity: 0,
              y: 10
            },
            animate: {
              opacity: 1,
              y: 0
            },
            exit: {
              opacity: 0,
              y: -10
            },
            transition: {
              duration: 0.8,
              ease: 'easeOut'
            },
            className: "text-xl md:text-2xl font-sans font-light tracking-[0.3em] text-cyan-400 italic",
            children: "presents"
          })
        })]
      })]
    })
  });
}