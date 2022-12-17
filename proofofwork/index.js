const { assert } = require('chai');
const { mine, blocks, mempool, addTransaction, TARGET_DIFFICULTY } = require('./mining');
const SHA256 = require('crypto-js/sha256');

