// Copyright (C) 2018, Zpalmtree
// Copyright (C) 2019, WrkzCoin
// Copyright (C) 2020, Deeterd
//
// Please see the included LICENSE file for more information.

import { MixinLimit, MixinLimits, Daemon } from 'turtlecoin-wallet-backend';
import { name, version } from '../package.json';

const Config = new function() {
  /**
   * If you can't figure this one out, I don't have high hopes
   */
  this.coinName = 'Cirquity';

  /**
   * Prefix for URI encoded addresses
   */
  this.uriPrefix = 'cirquity://';

  /**
   * How often to save the wallet, in milliseconds
   */
  this.walletSaveFrequency = 60 * 1000;

  /**
   * The amount of decimal places your coin has, e.g. TurtleCoin has two
   * decimals
   */
  this.decimalPlaces = 2;

  /**
   * The address prefix your coin uses - you can find this in CryptoNoteConfig.h.
   * In TurtleCoin, this converts to CIRQ
   */
  this.addressPrefix = 3934293;

  /**
   * Request timeout for daemon operations in milliseconds
   */
  this.requestTimeout = 10 * 1000;

  /**
   * The block time of your coin, in seconds
   */
  this.blockTargetTime = 30;

  /**
   * How often to process blocks, in millisecond's
   */
  this.syncThreadInterval = 4;

  /**
   * How often to update the daemon info, in milliseconds
   */
  this.daemonUpdateInterval = 10 * 1000;

  /**
   * How often to check on locked transactions
   */
  this.lockedTransactionsCheckInterval = 10 * 3000;

  /**
   * The amount of blocks to process per 'tick' of the main loop. Note: too
   * high a value will cause the event loop to be blocked, and your interaction
   * to be laggy.
   */
  this.blocksPerTick = 30;

  /**
   * Your coins 'ticker', generally used to refer to the coin, i.e. 123 TRTL
   */
  this.ticker = 'CIRQ';

  /**
   * Most people haven't mined any blocks, so lets not waste time scanning
   * them
   */
  this.scanCoinbaseTransactions = false;

  /**
   * Disable AutoOptimization by default
   */
  this.enableAutoOptimization = false;

  /**
   * The minimum fee allowed for transactions, in ATOMIC units
   */
  this.minimumFee = 10;

  /**
   * Fee per byte height
   */
  this.feePerByteHeight = 500000;

  /**
   * Mapping of height to mixin maximum and mixin minimum
   */
  this.mixinLimits = new MixinLimits([
    /* Height: 1,000, minMixin: 0, maxMixin: 100, defaultMixin: 3 */
    new MixinLimit(1000, 0, 100, 3),

    /* At height of 300,000 */
    new MixinLimit(300000, 0, 3, 2),

    /* At height of 1,000,000 */
    new MixinLimit(1000000, 0, 3, 2),
  ], 3 /* Default mixin of 3 before block 440,000 */);

  /**
   * The length of a standard address for your coin
   */
  this.standardAddressLength = 99;

  /**
   * The length of an integrated address for your coin - It's the same as
   * a normal address, but there is a paymentID included in there - since
   * payment ID's are 64 chars, and base58 encoding is done by encoding
   * chunks of 8 chars at once into blocks of 11 chars, we can calculate
   * this automatically
   */
  this.integratedAddressLength = 99 + ((64 * 11) / 8);

  /**
   * Memory to use for storing downloaded blocks - 3MB
   */
  this.blockStoreMemoryLimit = 1024 * 1024 * 3;

  /**
   * Amount of blocks to request from the daemon at once
   */
  this.blocksPerDaemonRequest = 30;

  /**
   * Unix timestamp of the time your chain was launched.
   *
   * Note - you may want to manually adjust this. Take the current timestamp,
   * take away the launch timestamp, divide by block time, and that value
   * should be equal to your current block count. If it's significantly different,
   * you can offset your timestamp to fix the discrepancy
   */
  // this.chainLaunchTimestamp = new Date(1000 * 1579553288);

  /**
   * Fee to take on all transactions, in percentage
   */
  this.devFeePercentage = 0.0;

  /**
   * Address to send dev fee to
   */
  this.devFeeAddress = 'cirqgEvJZj3bkP7Pwu8hrvhxPojoeVpJSg5sV9CU58oNLJWqJ3usg3kNNxb9ucX8Y5Spjwm1PBLRZ4QGEcn93LAdaWcTU9mQZaG';

  /**
   * Base url for price API
   *
   * The program *should* fail gracefully if your coin is not supported, or
   * you just set this to an empty string. If you have another API you want
   * it to support, you're going to have to modify the code in Currency.js.
   */
  this.priceApiLink = 'https://api.coingecko.com/api/v3/simple/price';

  /**
   * Default daemon to use. Can either be a BlockchainCacheApi(baseURL, SSL),
   * or a ConventionalDaemon(url, port).
   */
  this.defaultDaemon = new Daemon('api-block.cirquity.com', 443, false, true);

  this.defaultDaemonPort = '18128';
  /**
   * A link to where a bug can be reported for your wallet. Please update
   * this if you are forking, so we don't get reported bugs for your wallet...
   *
   */
  this.repoLink = 'https://github.com/cirquity/cirquity-wallet';

  /**
   * Allows setting a customer user agent string
   */
  this.customUserAgentString = `${name}-v${version}`;

  /**
   * Base URL for us to chuck a hash on the end, and find a transaction
   */
  this.explorerBaseURL = 'https://explorer.cirquity.com/transaction.html?hash=';

  this.nodeListURL = 'https://raw.githubusercontent.com/cirquity/cirquity-node-list/master/cirquity-nodes.json';
};

export default Config;
