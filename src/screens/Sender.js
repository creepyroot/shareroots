"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Sender;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("motion/react");
var _lucideReact = require("lucide-react");
var _utils = require("../lib/utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Sender({
  onBack,
  transferManager
}) {
  const [files, setFiles] = (0, _react.useState)([]);
  const [copied, setCopied] = (0, _react.useState)(false);
  const fileInputRef = (0, _react.useRef)(null);
  const handleCopyLink = () => {
    const url = window.location.origin + '?recv=' + transferManager.rootId;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(transferManager.rootId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const onFileChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      transferManager.startHosting(selectedFiles);
    }
  };

  // Prevent drag default behavior
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFiles = Array.from(e.dataTransfer.files);
      setFiles(selectedFiles);
      transferManager.startHosting(selectedFiles);
    }
  };
  const renderStatus = () => {
    const {
      status,
      progress,
      rootId,
      metadata,
      errorMsg,
      currentIndex,
      totalFiles
    } = transferManager;
    if (status === 'error') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "text-center p-8 bg-red-500/10 border border-red-500/50 rounded-2xl w-full",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "text-red-400 font-medium mb-4",
          children: errorMsg || "An unexpected error occurred."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => {
            transferManager.cleanup();
            setFiles([]);
          },
          className: "text-slate-300 hover:text-white underline",
          children: "Start Over"
        })]
      });
    }
    if (status === 'generating_id') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-col items-center justify-center p-12 text-slate-400",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Loader2, {
          className: "w-8 h-8 animate-spin mb-4 text-red-500"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: "Generating security credentials..."
        })]
      });
    }
    if (status === 'waiting_for_peer') {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.motion.div, {
        initial: {
          opacity: 0,
          scale: 0.95
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        className: "w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md relative overflow-hidden",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-red-500 to-red-500 opacity-50"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: "text-lg font-medium text-slate-200 mb-6 text-center",
          children: "Share this code with the receiver"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "font-mono text-3xl font-bold tracking-[0.2em] text-red-400 select-all",
            children: rootId
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: handleCopyCode,
            className: "p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors",
            title: "Copy Code",
            children: copied ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Check, {
              className: "w-5 h-5 text-emerald-400"
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Copy, {
              className: "w-5 h-5 text-slate-400"
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "flex flex-col gap-3",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            onClick: handleCopyLink,
            className: "w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-colors red-glow",
            children: [copied ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Check, {
              className: "w-5 h-5"
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Copy, {
              className: "w-5 h-5"
            }), "Copy Direct Link"]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "mt-8 flex flex-col items-center gap-3",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "relative flex items-center justify-center w-12 h-12",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "absolute inset-0 rounded-full border-2 border-red-500/30 border-t-red-400 animate-spin"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-sm text-slate-400",
            children: "Waiting for receiver to connect..."
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            className: "text-xs text-slate-500 mt-2 font-mono",
            children: [totalFiles, " file(s) queued for transfer"]
          })]
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
        className: "w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex justify-between items-center mb-6",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "text-xl font-display text-white",
            children: "Transferring"
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
              children: ["File ", currentIndex + 1, " of ", totalFiles]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-sm font-medium text-slate-300 truncate",
            title: metadata?.name,
            children: metadata?.name
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-xs text-slate-500 font-mono",
            children: (0, _utils.formatBytes)(metadata?.size || 0)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "w-full h-2 bg-slate-950 rounded-full overflow-hidden",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
            className: "h-full bg-red-500 red-glow",
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
          className: "text-center text-xs text-slate-400 mt-4 animate-pulse",
          children: status === 'negotiating' ? 'Establishing secure channel...' : 'Sending encrypted chunks...'
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
        className: "w-full flex-col flex items-center bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md text-center cursor-default",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Check, {
            className: "w-8 h-8 text-emerald-400"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: "text-xl font-display text-white mb-2",
          children: "Transfer Complete"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          className: "text-sm text-slate-400 mb-8 font-mono",
          children: [totalFiles, " file(s) securely delivered."]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => {
            transferManager.cleanup();
            setFiles([]);
          },
          className: "px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium",
          children: "Send More Files"
        })]
      });
    }
    return null;
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
        className: "flex items-center text-slate-400 hover:text-white transition-colors gap-2 text-sm uppercase tracking-wider font-semibold group py-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ArrowLeft, {
          className: "w-4 h-4 group-hover:-translate-x-1 transition-transform"
        }), " Exit"]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.AnimatePresence, {
      mode: "wait",
      children: files.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        exit: {
          opacity: 0,
          scale: 0.95
        },
        className: "w-full max-w-xl",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          onDragOver: handleDrag,
          onDragEnter: handleDrag,
          onDragLeave: handleDrag,
          onDrop: handleDrop,
          onClick: () => fileInputRef.current?.click(),
          className: "border-2 border-dashed border-slate-700 hover:border-red-500/50 rounded-3xl p-16 text-center cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "file",
            multiple: true,
            ref: fileInputRef,
            onChange: onFileChange,
            className: "hidden"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "w-20 h-20 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-black/40",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.FileUp, {
              className: "w-10 h-10 text-red-400"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "text-2xl font-display font-bold text-white mb-3",
            children: "Select Files to Send"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed",
            children: "Drag and drop files here, or click to browse. Share multiple files of any size."
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300 font-mono",
            children: ["Initiate Secure Channel ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ArrowRight, {
              className: "w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform"
            })]
          })]
        })
      }, "upload") : /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        className: "w-full flex justify-center",
        children: renderStatus()
      }, "status")
    })]
  });
}