"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Receiver;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("motion/react");
var _lucideReact = require("lucide-react");
var _utils = require("../lib/utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Receiver({
  onBack,
  transferManager,
  initialCode
}) {
  const [code, setCode] = (0, _react.useState)(initialCode || '');
  (0, _react.useEffect)(() => {
    if (initialCode) {
      transferManager.connectToRoot(initialCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);
  const handleSubmit = e => {
    e.preventDefault();
    if (code.trim().length === 6) {
      transferManager.connectToRoot(code.toUpperCase());
    }
  };
  const renderStatus = () => {
    const {
      status,
      progress,
      metadata,
      errorMsg
    } = transferManager;
    if (status === 'error') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "text-center p-8 bg-red-500/10 border border-red-500/50 rounded-2xl w-full max-w-md mx-auto",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.AlertCircle, {
          className: "w-10 h-10 text-red-500 mx-auto mb-4"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-red-400 font-medium mb-6",
          children: errorMsg || "Connection failed or interrupted."
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex justify-center gap-4",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => transferManager.cleanup(),
            className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm",
            children: "Try Again"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: onBack,
            className: "text-slate-400 hover:text-white underline text-sm py-2",
            children: "Return Home"
          })]
        })]
      });
    }
    if (status === 'connecting') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
        initial: {
          opacity: 0,
          scale: 0.95
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        className: "flex flex-col items-center justify-center p-12 text-slate-400 max-w-md mx-auto",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Loader2, {
          className: "w-8 h-8 animate-spin mb-4 text-red-500"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: "Locating peer and establishing secure connection..."
        })]
      });
    }
    if (status === 'waiting_for_approval') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
        initial: {
          opacity: 0,
          scale: 0.95
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        className: "w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto shadow-2xl backdrop-blur-md relative overflow-hidden",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-col items-center justify-center text-center",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
            className: "w-12 h-12 text-red-400 mb-4"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "text-xl font-display text-white mb-2",
            children: "Incoming Transfer"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            className: "text-sm text-slate-400 mb-6 font-mono",
            children: ["Sender wants to share ", /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
              className: "text-white",
              children: transferManager.totalFiles
            }), " file(s) with you."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: transferManager.acceptTransfer,
            className: "w-full flex items-center justify-center gap-2 py-4 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-all shadow-[0_0_24px_-6px_rgba(239,68,68,0.4)]",
            children: "Accept & Download"
          })]
        })]
      });
    }
    if (status === 'reconnecting') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
        initial: {
          opacity: 0,
          scale: 0.95
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        className: "flex flex-col items-center justify-center p-12 text-orange-400 max-w-md mx-auto bg-orange-950/20 border border-orange-900/50 rounded-2xl",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Loader2, {
          className: "w-8 h-8 animate-spin mb-4 text-orange-500"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-center mb-4",
          children: "Connection interrupted. Waiting to reconnect..."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => transferManager.resumeDownload(),
          className: "px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors",
          children: "Force Reconnect"
        })]
      });
    }
    if (status === 'negotiating' || status === 'transferring') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
        initial: {
          opacity: 0,
          scale: 0.95
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        className: "w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto shadow-2xl backdrop-blur-md relative overflow-hidden",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex justify-between items-center mb-6",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "text-xl font-display text-white",
            children: "Downloading"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            className: "text-red-400 font-mono text-lg",
            children: [progress.toFixed(0), "%"]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex flex-col gap-1",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex justify-between w-full mb-1",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              className: "text-xs text-red-500 font-bold tracking-wider uppercase",
              children: ["File ", transferManager.currentIndex + 1, " of ", transferManager.totalFiles || 1]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-sm font-medium text-slate-300 truncate",
            title: metadata?.name,
            children: metadata?.name || 'File...'
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-xs text-slate-500 font-mono",
            children: (0, _utils.formatBytes)(metadata?.size || 0)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "w-full h-2 bg-slate-950 rounded-full overflow-hidden",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
            className: "h-full bg-red-500 shadow-[0_0_24px_-6px_rgba(239,68,68,0.5)]",
            initial: {
              width: 0
            },
            animate: {
              width: `${progress}%`
            },
            transition: {
              ease: "linear",
              duration: 0.2
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-center text-xs text-slate-400 mt-4",
          children: status === 'negotiating' ? 'Initializing secure channel...' : 'Receiving encrypted chunks...'
        }), !('showSaveFilePicker' in window) && status === 'transferring' && transferManager.totalFiles === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-[10px] text-orange-400/80 mt-4 text-center",
          children: "* Running in fallback mode. The file will download once fully received into memory."
        })]
      });
    }
    if (status === 'completed') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
        initial: {
          opacity: 0,
          scale: 0.95
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        className: "w-full flex-col flex items-center bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-8 max-w-md mx-auto shadow-2xl backdrop-blur-md text-center cursor-default",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Check, {
            className: "w-8 h-8 text-emerald-400"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: "text-xl font-display text-white mb-2",
          children: "Download Complete"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          className: "text-sm text-slate-400 mb-8 font-mono",
          children: [transferManager.totalFiles || 1, " file(s) securely received."]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => {
            transferManager.cleanup();
            setCode('');
          },
          className: "px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium",
          children: "Receive More Files"
        })]
      });
    }

    // Default: Form to enter code
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      className: "w-full max-w-md mx-auto",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px]"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-8 mx-auto shadow-xl shadow-black/40",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
            className: "w-8 h-8 text-red-400"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: "text-2xl font-display font-bold text-center text-white mb-2",
          children: "Connect to Root"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-slate-400 text-center text-sm mb-8",
          children: "Enter the 6-character secure code provided by the sender."
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "relative mb-6",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
              type: "text",
              value: code,
              onChange: e => setCode(e.target.value.toUpperCase().slice(0, 6)),
              placeholder: "XXXXXX",
              className: "w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-6 py-4 text-center text-3xl font-mono tracking-[0.5em] text-white placeholder-slate-700 focus:outline-none focus:border-red-500/50 transition-colors uppercase",
              maxLength: 6
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            type: "submit",
            disabled: code.length !== 6,
            className: "w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all hover:shadow-[0_0_24px_-6px_rgba(239,68,68,0.4)]",
            children: ["Connect & Receive ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ArrowRight, {
              className: "w-5 h-5"
            })]
          })]
        })]
      })
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "flex flex-col items-center justify-center min-h-[80vh] px-4 w-full",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "w-full max-w-4xl flex items-center justify-start mb-8",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
        onClick: () => {
          transferManager.cleanup();
          onBack();
        },
        className: "flex items-center text-slate-400 hover:text-white transition-colors gap-2 text-sm uppercase tracking-wider font-semibold",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ArrowLeft, {
          className: "w-4 h-4"
        }), " Exit"]
      })
    }), renderStatus()]
  });
}