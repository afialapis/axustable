"use strict";

// Wrapper for dynamic import() of ESM-only packages.
// Only works in later versions of Node.js 12+

let _axustablePkg
const _getAxustablePkg = async () => {
  if (!_axustablePkg) {
    _axustablePkg = await import("../src/index.mjs");
  }

  return _axustablePkg;
};


const _resolve = async () => Promise.all([
  global.axustablePkg = await _getAxustablePkg()
]);

module.exports = {
  _resolve,
};