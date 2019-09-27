#
# MultiChain 2.0.2 Community Edition
#
# Copyright (c) Coin Sciences Ltd - www.multichain.com
#
# Distributed under the GPLv3 software license,
# See: http://www.gnu.org/licenses/gpl-3.0.txt
#

Download and install:
http://www.multichain.com/download-install/

Getting started:
http://www.multichain.com/getting-started/

Developer guide and tutorials:
http://www.multichain.com/developers/

API commands:
http://www.multichain.com/developers/json-rpc-api/

Q&A forum:
http://www.multichain.com/qa/

Source code:
https://github.com/MultiChain/multichain


WINDOWS NOTES
-------------

* For multichaind anti-virus software and/or firewall may need to be disabled.
* The multichaind -daemon flag does not work, so open another cmd prompt.
* The multichain-cli command line tool does not yet support interactive mode.
* The online documentation uses Linux quoting on the command line which will
  not work on DOS. Substitute (e.g.) "{\"asset1\":100}" for '{"asset1":100}'
* The default data directory is %APPDATA%\MultiChain instead of ~/.multichain


CHANGELOG
---------

Version 2.0.2 - 21 May 2019
* Added storeruntimeparams runtime parameter to store setruntimeparam changes
* Added new protocol version 20010 with support for:
- Random salt in offchain data to prevent dictionary attacks on chunk hashes
- Creating and managing permissions for read-permissioned streams
* Expanded liststreams output for compatibility with Enterprise Edition
* Added help for APIs that are available in Enterprise Edition
* Fixed crash when using backupwallet API
* Improved error message for non-canonical signatures from external libraries

Version 2.0.1 - 8 April 2019
* Fixed "items" and "confirmed" fields in output of liststreams command

Version 2.0 release - 25 March 2019
* Added new protocol version 20009 with these changes:
- More JavaScript Date object tweaks
- Fixed behavior of parameter root-stream-open=false
* Fixed allowing empty parameter for setruntimeparam autosubscribe command

Version 2.0 beta 3 - 4 March 2019
* Added txouttobinarycache API command to extract data to binary cache
* Added logdir runtime parameter to set separate directory for log files
* Added new protocol version 20008 with JavaScript Date object tweaks
* Added fully tested documentation for compiling on Mac OS X
* Added multichaind.pid file on Windows (already available on Linux)
* Improved output of listtxfilters for filters restricted by asset
* Improved multichain-cli error message when chain name parameter missed
* Fixed crash when publishing zero length offchain data

Version 2.0 beta 2 - 11 February 2019
* Added new default (non-Berkeley DB) wallet format (walletdbversion=3)
* Added new protocol version 20007 with these changes:
- Upgrading of anyone-can-* blockchain parameters (except mine and admin)
- Protocol level support for enterprise license transactions
* Added maxoutconnections runtime parameter for outbound p2p connections
* Added raw transaction support for creating and approving smart filters
* Finalized error codes for all MultiChain 2.0 API enhancements
* Reduced LevelDB compaction time on startup by not logging read operations
* Fixed publishmulti bug when wallet contains watch-only addresses
* Fixed CPU usage when attempting to reconnect after all peers are lost
* Dropped support for legacy Bitcoin Core wallet format (walletdbversion=1)

Version 2.0 beta 1 - 19 December 2018 (changes from 2.0 alpha 7)
* First Windows version with support for Smart Filters
* Added new protocol version 20006 with these changes:
- Included nonce in miner signatures for low difficulty block hashes
- Fixed getfilterassetbalances callback when spending issuance outputs
* Fixed repeated node connections to itself in some network configurations
* Fixed potential wallet corruption bug when unsubscribing from stream
* Fixed storing invalid or oversized blocks on disk

The changes below were merged from MultiChain 1.0.7:
* Added implicit connect permissions for addresses with admin/activate/mine
* Fixed incorrect block invalidations due to invalid coinbase or wallet error

Version 2.0 alpha 7 - 26 November 2018 (changes from 2.0 alpha 6)
* Added new API commands to easily publish multiple stream items in one tx:
  publishmulti, publishmultifrom
* Optimized converting addresses to base58 (a filter callback bottleneck)
* Fixed general performance slowdown due to compiler settings
* Fixed node functionality problems if there was an internal wallet error
* Fixed lockinlinemetadata runtime parameter default value
* Fixed bug in preparelockunspent output if filters are installed
* Removed unnecessary stream filter verification checks

Version 2.0 alpha 6 - 5 November 2018 (changes from 2.0 alpha 5)
* Added stream filters for custom JavaScript stream item validation
* Added new API commands for managing stream filters:
  teststreamfilter, create streamfilter, liststreamfilters, runstreamfilter
* Added new filter callsbacks: getfilterstreamitem, getfilterassetbalances
* Added filter timeouts (acceptfiltertimeout/sendfiltertimeout runtime params)
* Allowed transaction IDs to be passed to testtxfilter and runtxfilter
* Added lockinlinemetadata runtime param to protect UTXOs with inline metadata
* Other changes to filter logic, only in protocol version 20005:
- Standard coinbase transactions bypass transaction filters
- Disabled complex JavaScript Math functions (for future proofing)
- Applied maxshowndata param to "asm" and "hex" fields in filter callbacks
- Fixed bypassing transaction filters for txfilter disapprove transactions
- Fixed application of asset-restricted txfilter for follow-on issuances
- Fixed incorrect rejection of asset issuance tx by txfilter
* Allowed granting unrestricted permissions for assets at API level
* Added command line error message if SSL certificate (for RPC) is missing
* Improved multichaind-cold error message on params.dat mismatch
* Fixed crash when processing exchange transactions with restricted asset
* Fixed unnecessary inputcache output added to per-entity admin grants
* Fixed liststreamqueryitems output when all items are matched
* Fixed getstreamkey|publishersummary output when no items are matched
* Fixed decoderawtransaction crash for some stream transactions
* Fixed -paytxfee runtime parameter calculation

Version 2.0 alpha 5 - 13 September 2018 (changes from 2.0 alpha 4)
* Added transaction filters for custom JavaScript transaction validation
* Added new API commands for managing transaction filters:
  testtxfilter, create txfilter, listtxfilters, getfiltercode, runtxfilter
* Added new API commands also available as filter callbacks:
  getassetinfo, getstreaminfo, getlastblockinfo, verifypermission
* Added six custom permissions for use with filters: high1-high3, low1-low3
* Added support for approving/disapproving filters to approvefrom command
* Added new blockchain parameter admin-consensus-filter
* Fixed decimal parameter representation in output of getblockchainparams

Version 2.0 alpha 4 - 9 August 2018 (changes from 2.0 alpha 3)
* Added liststreamqueryitems API to retrieve by multiple keys/publishers
* Added maxqueryscanitems parameter to limit liststreamqueryitems time
* Allowed multiple txids to be passed to liststreamtxitems API
* Fixed crash when retrieving off-chain items with autosubscribe=streams
* Fixed purging of pending offchain items when a stream is unsubscribed
* Fixed memory usage when subscribing to a stream with many off-chain items
* Fixed tiny growth in memory used after tx sent through high level APIs
* Fixed several compilation issues on Mac OS X

The changes below were merged from MultiChain 1.0.6:
* Added RPC request IDs to debug.log if -debug=mcapi is active
* Allowed booleans for rescan parameter in importwallet
* Allowed booleans for verbose parameter in getrawtransaction
* Fixed stack smashing bug if compiled from source on Ubuntu 18.04
* Fixed intermittent double counting for txcount field of getwalletinfo
* Fixed outputting \u0000 character in JSON responses (bug in 1.0.5 only)
* Fixed Mac OS X semaphore naming that prevented multiple launches
* Fixed includeWatchOnly parameter in (legacy) getbalance command
* Fixed decoderawtransaction performance for assets with many issuances

Version 2.0 alpha 3 - 13 June 2018 (changes from 2.0 alpha 2)
* Added new protocol 20003 with support for off-chain stream items
* Added peer-to-peer infrastructure for general off-chain messaging
* Added new blockchain and runtime parameters for off-chain items:
- Blockchain: maximum-chunk-size, maximum-chunk-count, minimum-offchain-fee
- Runtime: chunkquerytimeout, chunkrequesttimeout, flushsourcechunks
* Added binary cache to allow huge pieces of data to be built up over
  multiple API calls or uploaded directly via the file system
* Added off-chain monitoring APIs: getchunkqueueinfo, getchunkqueuetotals
* Extended publish and other APIs with options parameter for stream items
* Added purge parameter to unsubscribe API to remove off-chain data
* Added more optional restrictions (onchain, offchain) to create stream API
* Added ignoremissing summarization option (renamed "ignore" to "ignoreother")
* Deprecated multichain protocol versions 10004-10007 (from 1.0 alphas)

The changes below were merged from MultiChain 1.0.4 and 1.0.5:
* Allow partial rescanning for importaddress, importprivkey, importwallet
* Added chainrewards in getblockchaininfo with total native currency so far
* Added immediate flush of wallet.dat file on node startup
* Added new multichain protocol version 10011 with these changes:
- Asset names restricted to 32 bytes at the protocol level
- Maximum signature operations per block now based on block size
- Apply anyone-can-send=true if anyone-can-admin/activate/issue/create=true
* Fixed calculation of fees for new asset issuance transactions
* Fixed accepting transactions to memory pool after invalid asset issuance
* Completed unsubscribe properly if some stream items are unconfirmed
* Stopped creation of keys in keypool on encryptwallet command
* Fixed decoding of non-ASCII Unicode characters (Windows only)
* Fixed compilation issue related to wallet encryption
* Added missing help messages for several API commands
* Improved error messages relating to "insufficient funds"
* Added validation of autosubscribe runtime parameter
* Improved validation of block number parameter for getblock
* Added new multichain protocol 10010 to fix anyone-can-create parameter
* Removed extra text output when running with -shortoutput parameter
* Stopped unnecessary updates to wallet.dat after every block
* Fixed coin selection if permissions and fees come from different addresses
* Improved several error messages and parameter descriptions

Version 2.0 alpha 2 - 29 January 2018 (changes from 2.0 alpha 1)
* Added new protocol version 20002 with support for:
- Per-asset send and receive permissions.
- Inline metadata within regular transaction outputs.
- Seven more upgradable blockchain parameters including target block time,
  maximum block size, maximum transaction size, maximum metadata size.
* Added support via code stubs for blockchain protocol customization.

The changes below were merged from MultiChain 1.0.3:
* Added rpcallowmethod runtime parameter to restrict API calls.
* Added walletnotifynew runtime parameter, only called once per transaction.
* Optimized listunspent and getmultibalances calls if addresses specified.
* Improved startup message to clarify API port and node readiness.
* Fixed slow initial catchup for very long blockchains.
* Fixed starting blockchains with long chain descriptions.
* Fixed allowing reward halving intervals out of range.
* Fixed listwallettransactions showing rolled back coinbases as valid.
* Fixed decoderawexchange bug for transactions with P2SH addresses.
* Fixed create/appendrawtransactions bug when passed empty addresses.
* Fixed loss of asset subscriptions when chain rescanned.
* Fixed creation of blocks with height mismatch in coinbase.
* Fixed setlastblock when hash of the block above chain tip was passed.

Version 2.0 alpha 1 - 9 November 2017 (changes from version 1.0.2)
* Added new protocol version 20001 with support for:
- JSON and text items in raw metadata or streams
- Stream items with multiple keys
* Added indexing of multiple items in same stream in same transaction
* Allowed any JSON structure for asset and stream custom fields
* Added liststreamtxitems API to retrieve multipel items in one transaction
* Added getstreamkeysummary and getstreampublishersummary summarization APIs
* Compatibility-breaking changes to read APIs (can be reversed by running
  MultiChain with runtime parameter -v1apicompatible=1):
- In stream items, "key" is replaced by "keys" showing an array
- In wallet txns, stream item payloads not shown in top-level "data" element
- In raw txns, empty "assets", "permissions" and "items" arrays not shown
- In raw txns, raw or stream metadata not shown in top-level "data" element
* Compatibility-breaking changes to raw transactions APIs:
- For initial asset issuance, "create":"asset" required in data element.
- For follow-on asset issuance, "update":... required in data element.

Version 1.0.2 - 7 November 2017
* Applied shrinkdebuglogsize runtime parameter to all log files
* Allowed initprivkey in case where multichaind creates genesis block
* Allowed private key (or pubkey) to be passed to validateaddress
* Changed default to rpckeepalive=0 to prevent API thread block
* Stopped checking send permissions for signrawtransaction complete field
* When signing with multichaind-cold, wallet private keys used automatically
* Decoding of UBJSON objects in asset/stream details (for 2.0 compatibility)
* Improved error messages for sendrawtransaction API
* Fixed allow-multisig-outputs=false consensus bug in v1.0.1 if protocol<=10008
* Fixed bug that didn't enforce minimum-per-output as "standard" txn rule
* Fixed bug using appendrawdata API for legacy protocols below 10008
* Fixed bug when stopping node if mining-requires-peers=true and no peers

Version 1.0.1 - 13 September 2017
* Added multichaind-cold executable as compile-time cold wallet and node
* Added -offline runtime parameter to run multichaind as a cold node
* Improved and documented blockchain protocol upgrading mechanism and APIs
* Allowed multichain binaries to run even if they are renamed
* Allowed signing of non-standard transactions using signrawtransaction
* Added documented -limitfreerelay parameter with default value of 0
* Fixed compilation errors for Ubuntu 17.04
* Fixed crash caused by certain non-standard transactions in the wallet
* Fixed version checking bug when connecting to the bitcoin network
* Fixed behaviour of mining-requires-peers when using the bitcoin protocol
* Fixed coin selection when publishing to several closed streams in one txn
* Fixed checking of minimum native fee threshold when relaying transactions
* Fixed balance calculations in get*balances APIs if minconf > 1
* Added new multichain protocol version 10009 with these changes:
- New allow-arbitrary-outputs blockchain parameter (default false) to prevent
  malicious bypassing of receive permissions using non-standard outputs
- Stopped applying admin-consensus-* thresholds if anyone-can-admin=true
- Fixed implementation of chains where allow-min-difficulty-blocks=true

Version 1.0 release - 2 August 2017
* Allowed out-of-bounds block ranges in listblocks, liststreamblockitems
* Applied mine-empty-rounds setting even if anyone-can-mine=true
* Stopped autosubscribing to previous assets/streams when importing addresses
* Fixed unspendable state if mine-empty-rounds=0 and setup-first-blocks<2
* Fixed "addresses" field of listassets if multiple unconfirmed issuances
* Fixed delayed synchronization after extended downtime of mining node
* Fixed error messages when connecting via IPv6

Version 1.0 beta 2 - 15 June 2017
* Added support for Mac OS X (requires user compilation for now)
* Added liststreamblockitems API to query stream by block or timestamp
* Added listblocks API to retrieve information about multiple blocks
* Added appendrawtransaction API to add inputs and/or outputs to raw txs
* Added support in signmessage to use an external private key
* Added initprivkey runtime parameter to preload private key for new nodes
* Added verification of block miners on forks if support-miner-precheck=true
* More speed optimizations, now over 1000 tx/sec on mid-range hardware
* Many other improvements and minor bug fixes

Version 1.0 beta 1 - 30 March 2017
* Added support for Unicode entity names and stream keys
* Allowed a port to be specified in the externalip runtime parameter
* Reviewing and cleaned up all help messages
* Fixed crashing bug with long stream item keys (introduced in alpha 29)
* Several other smaller bug fixes

Version 1.0 alpha 29 - 20 March 2017
* Reviewed and reorganized all API error codes
* Optimizations to increase transaction and block processing throughput
* Node recovery after hard kill or server shutdown without reindexing
* Reviewed and selectively merged all upstream Bitcoin Core changes
* Added on-chain protocol upgrade mechanism for future-proofing
* Many other smaller fixes and improvements

Version 1.0 alpha 28 - 14 February 2017
* Added enhanced -walletnotify parameter for transaction notifications
* Added getruntimeparams and setruntimeparam APIs for runtime parameters
* Added completerawexchange API to finalize exchange with optional metadata
* Added mine-empty-rounds parameter to limit mining of empty blocks
* Added lock-admin-mine-rounds parameter to lock down governance changes
* Added mining-turnover parameter to control round robin mining concentration
* Reduced minimum target block time to 2 sec (low mining turnover recommended)
* Added lockblock and bantx parameters for fork control, transaction banning
* Increased max metadata and transaction size to 64 MB, 100 MB respectively
* API request output by multichain-cli on stderr (but see -requestout param)
* Many other smaller fixes and improvements

Version 1.0 alpha 27 - 22 December 2016
* Added new protocol version 10007, used by default, with these changes:
- Assets referenced by short txid rather than block number/byte offset
- New format for metadata of asset (re)issuance and stream creation
- Assets can be created or updated without issuing units in an output
- Added support-miner-precheck and anyone-can-receive-empty parameters
- Tightened up some rules following extensive security review
* Changed appendrawchange API behavior to always add an output, even if empty
* Fixed several bugs and misleading error messages

Version 1.0 alpha 26 - 28 November 2016
* Added ability to subscribe to an asset and query all of its transactions
* Added createrawtransaction parameters for sending complex txs in one step
* Added createrawsendfrom API for complex txs with automatic coin selection
* Added createkeypairs and listaddresses APIs for address management
* Allowed publishing stream items in sendwithdata(from), grantwithdata(from)
* Added getstreamitem API to retrieve individual stream items
* Added more output formats for getblock API including full tx decoding
* Added optional byte range parameters in gettxoutdata API
* Allowed plural parameters for many APIs: importaddress, importprivkey,
  (un)subscribe, liststreamkeys, liststreampublishers, listassets, liststreams
* Added support for stream-related transactions in raw transaction decoding
* Allowed blockchain parameters to be set when running multichain-util
* Prevented passwords being stored in multichain-cli history file
* Dozens of other minor fixes and improvements
* Compatibility-breaking API change: address, asset and stream parameters set
  to "" or [] now mean 'none' instead of 'all'. Only use "*" to request 'all'.
  This affects getmultibalances, listassets, listpermissions, liststreams.

Version 1.0 alpha 25 - 27 October 2016
* Added Windows version (released as alpha 24.1 on October 10)
* Renamed APIs for simplicity (old API names are still supported): send(from),
  sendasset(from), sendwithdata(from), grantwithdata(from), appendrawdata
* Fixed several bugs relating to stream publish and subscribe APIs
* Several other small bug fixes for API parameters, responses and errors

Version 1.0 alpha 24 - 15 September 2016
* Added streams for general purpose data storage and retrieval on a
  blockchain, including new APIs, permissions and parameters
* Added count and start parameters to listassets for partial results
* Allowed multiple OP_RETURNs per transaction (max-std-op-returns-count)
* Added maxshowndata parameter to limit size of data in API responses
* Added gettxoutdata API to retrieve full data from a transaction output
* Increased default size of 'orphan pool' to 50000 transactions
* Added "synchronized" field for wallet addresses to show if up-to-date
* Fixed bug with multiple follow-on issuances in the same block
 
Version 1.0 alpha 23 - 8 August 2016
* Fixed intermittent crash when issuing large numbers of assets rapidly
* Fixed bug reading mining-diversity parameter with value of 0

Version 1.0 alpha 22 - 20 July 2016
* Rewrote the in-node wallet to be fully database-driven (not stored in memory)
  for real scalability and sustained performance with millions of transactions
* Added grantwithmetadata and grantwithmetadatafrom APIs
* Added progress report when running with -rescan option
* Allowed target-adjust-freq=-1 to prevent proof-of-work difficulty changes
* Many other smaller bug fixes and improvements

Version 1.0 alpha 21 - 16 May 2016
* Added pause and resume APIs to suspend mining or incoming P2P data
* Added setlastblock API to rewind the chain or switch to a fork
* Added clearmempool API to clear the memory pool of unconfirmed txs
* Added option of passing block height to getblock API
* Fixed database corruption from reorgs on blocks with follow-on issuance
* Improved recovery of corrupted permissions and assets databases

Version 1.0 alpha 20 - 3 May 2016
* Added getmultibalances API for viewing balances for multiple addresses
* Added more decoderawtransaction fields for asset transfer and issuance
* Improved support for multiple nodes on the same IP address (different ports)
* Always returns change to spent addresses, even for non-"from" APIs
* Included cleanup of permissions and assets database when reindex=1
* Fixed support for multiple addresses in one grant/revoke call
* Always apply mining-requires-peers if protocol=bitcoin or anyone-can-mine
* Many other minor bug fixes and improvements

Version 1.0 alpha 19 - 30 March 2016
* Added createrawtransaction support for issuance and permissions metadata
* Added appendrawmetadata support for issuance metadata
* Added details on new assets to be issued in decoderawtransaction 
* Added display message if handshakelocal address not in wallet
* Improved display of API error messages in multichain-cli
* Ignores mining-requires-peers if only one permitted miner
* Fixed appendrawchange bug when spending output of an asset issuance
* Fixed opening wallet with large native asset quantities
* Fixed asset quantity output in listwallettransactions
* Several other minor bug fixes and improvements

Version 1.0 alpha 18 - 13 March 2016
* Fixed broken admin consensus after issuing assets
* Fixed lower case asset names returned by listassets

Version 1.0 alpha 17 - 3 March 2016
* Added follow-on asset issuance, with issuemore and issuemorefrom APIs
* New protocol where mining permissions must be confirmed before use
* Tightened restriction on receiving and using admin permission in same tx
* Fixed rare clash between unconfirmed asset issuances
* Added -shrinkdebugfilesize multichaind parameter to limit debug.log size
* Added -saveclilog multichain-cli parameter to stop storing command history
* Renamed 'issueqty'/'issueraw' to 'qty'/'raw' in 'issue' response elements
* Several other minor bug fixes and improvements

Version 1.0 alpha 16 - 28 January 2016
* Added interactive mode to multichain-cli client
* Added appendrawchange API to complete raw transactions with change
* Added unspendable 'burnaddress' field in response to getinfo API
* Added -datadir parameter to multichain-util to use a custom directory
* Added -shortoutput runtime parameter to multichaind for easier scripting
* Several other minor bug fixes and improvements

Version 1.0 alpha 15 - 7 January 2016
* Moved to libsec256k1 for faster signature creation and verification
* Fixed bug when starting multichaind with reindex=1
* Several other minor bug fixes and improvements

Version 1.0 alpha 14 - 30 December 2015
* Added activate permission which can set connect/send/receive permissions only
* Added optional protocol version parameter to multichain-util
* Added miningrequirespeers parameter to multichaind
* Fixed mining deadlock where mining permission is assigned to an inactive node
* Several other minor bug fixes and improvements

Version 1.0 alpha 13 - 15 December 2015
* Added new APIs for detailed viewing of wallet transactions:
  listwallettransactions, getwallettransaction, listaddresstransactions
  and getaddresstransaction
* Skipped change outputs in listtransactions and gettransaction
* Fixed bug preventing P2SH multisig transactions with metadata
* Renamed 'genesistxid' to 'issuetxid' for asset issues in API responses
* Several other minor bug fixes and improvements

Version 1.0 alpha 12 - 26 November 2015
* Added new APIs for easy sending of transactions with metadata:
  sendwithmetadata and sendwithmetadatafrom
* Added verbose parameter to getaddresses command to give more information
* Included unconfirmed change in getassetbalances/gettotalbalances
* Fixed other assets moving when creating an asset or assigning permissions
* Fixed RPC server bug in chains where anyone-can-connect=true

Version 1.0 alpha 11 - 19 November 2015
* Added verbose parameter to listpermissions command
* Added includeLocked parameter to getaddressbalances/getassetbalances
* Added disablerawtransaction API to disable an offer of exchange
* Added gettotalbalances API to bypass bitcoin-style accounts
* Added txid and vout fields to verbose decoderawexchange output
* Added support for watch-only addresses in getaddressbalances/getassetbalances
* Improved several error messages for clarity
* Fixed several bugs in new coin selection, including for native currency
* Fixed rare crash in listassets and missed transactions after importaddress

Version 1.0 alpha 10 - 12 November 2015
* Added getaddresses API to list all wallet addresses
* Added support for blockchain reindexing with reindex runtime parameter
* New coin selection procedure to maintain separation between assets
* Fixed wallet state bug when spending output from preparelockunspent
* Several other minor bug fixes and improvements

Version 1.0 alpha 9 - 21 October 2015
* Added support for bitcoin-style handshaking where anyone-can-connect=true
* Fixed problems with blockchains where chain-protocol=bitcoin
* Several other minor bug fixes and improvements

Version 1.0 alpha 8 - 14 October 2015
* Added APIs for sending funds and other operations from specific addresses:
  getaddressbalances, sendassetfrom, sendfromaddress, preparelockunspentfrom,
  grantfrom, issuefrom, revokefrom
* Default proof-of-work difficulty reduced to 16 bits
* Set txindex=1 as default to help blockchain querying

Version 1.0 alpha 7 - 8 September 2015
* Added API for appending extra data to transactions: appendrawmetadata
* preparelockunspent JSON-RPC API accepts native asset value
* Sorting listassets JSON-RPC API results
* Fixed some bugs relating to send permission revocation

Version 1.0 alpha 6 - 23 August 2015
* Added APIs for building atomic exchange transactions: preparelockunspent,
  createrawexchange, appendrawexchange, decoderawexchange 
* Extended sendtoaddress to allow sending of multiple assets
* Fixed some bugs relating to datadir and network names

Version 1.0 alpha 5 - 6 August 2015
* combineunspent JSON-RPC API
* Automatic combine transactions
* Faster peer-to-peer connection
* Concurrency bug fixes
* Increased maximal orphan pool size

Version 1.0 alpha 4 - 22 July 2015
* Ignore zero-value outputs from coinbase transactions
* Support for backwards-compatible protocol upgrades
* Earlier creation of multichain.conf
* Added first-block-reward parameter
* Accept multiple addresses in listpermissions

Version 1.0 alpha 3 - 14 July 2015
* Support for Ubuntu 12.04+, CentOS 6.2+, Debian 7+, Fedora 15+, RHEL 6.2+
* Extended output for listpermissions showing changes pending admin consensus

Version 1.0 alpha 2 - 6 July 2015
* Disconnecting nodes without connect permission
* Disconnecting from seed node after initial blockchain synchronization
* Memory pool exchange after initial blockchain synchronization
* Disconnecting block bug fixes for permissions and assets
* Resolved mining deadlocks in rare edge cases
* Case-insensitive asset names

Version 1.0 alpha 1 - 23 June 2015
* First release


LICENSES OF THIRD-PARTY CODE
----------------------------

Bitcoin Core
------------
The MIT License (MIT)

Copyright (c) 2009-2017 The Bitcoin Core developers
Copyright (c) 2009-2017 Bitcoin Developers
Copyright (c) 2009-2010 Satoshi Nakamoto
Copyright 2014 BitPay Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


JSON Spirit
-----------
The MIT License

Copyright (c) 2007 - 2009 John W. Wilkinson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


LevelDB
-------
Copyright (c) 2011 The LevelDB Authors. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

   * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
   * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


libsecp256k1
------------
Copyright (c) 2013 Pieter Wuille

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


Boost
-----
(Note: Boost is not part of the MultiChain source code distribution, but it
may be statically compiled into some binary distributions of MultiChain.)

Boost Software License - Version 1.0 - August 17th, 2003

Permission is hereby granted, free of charge, to any person or organization
obtaining a copy of the software and accompanying documentation covered by
this license (the "Software") to use, reproduce, display, distribute,
execute, and transmit the Software, and to prepare derivative works of the
Software, and to permit third-parties to whom the Software is furnished to
do so, all subject to the following:

The copyright notices in the Software and this entire statement, including
the above license grant, this restriction and the following disclaimer,
must be included in all copies of the Software, in whole or in part, and
all derivative works of the Software, unless such copies or derivative
works are solely in the form of machine-executable object code generated by
a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.


OpenSSL
-------
(Note: The OpenSSL license is not strictly compatible with GPLv3, because of
its clauses requiring acknowledgement of the OpenSSL Project. While OpenSSL is
not part of the MultiChain source code distribution, it may be statically
compiled into some binary distributions of MultiChain. Therefore, as a special
exception under section 7 of the GPLv3, Coin Sciences Ltd gives permission to
link those local portions of this program which use the OpenSSL library. You
must obey the GPLv3 in all respects for all of the code other than those local
portions of this program which use the OpenSSL library.)


  LICENSE ISSUES
  ==============

  The OpenSSL toolkit stays under a dual license, i.e. both the conditions of
  the OpenSSL License and the original SSLeay license apply to the toolkit.
  See below for the actual license texts. Actually both licenses are BSD-style
  Open Source licenses. In case of any license issues related to OpenSSL
  please contact openssl-core@openssl.org.

  OpenSSL License
  ---------------

/* ====================================================================
 * Copyright (c) 1998-2011 The OpenSSL Project.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer. 
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * 3. All advertising materials mentioning features or use of this
 *    software must display the following acknowledgment:
 *    "This product includes software developed by the OpenSSL Project
 *    for use in the OpenSSL Toolkit. (http://www.openssl.org/)"
 *
 * 4. The names "OpenSSL Toolkit" and "OpenSSL Project" must not be used to
 *    endorse or promote products derived from this software without
 *    prior written permission. For written permission, please contact
 *    openssl-core@openssl.org.
 *
 * 5. Products derived from this software may not be called "OpenSSL"
 *    nor may "OpenSSL" appear in their names without prior written
 *    permission of the OpenSSL Project.
 *
 * 6. Redistributions of any form whatsoever must retain the following
 *    acknowledgment:
 *    "This product includes software developed by the OpenSSL Project
 *    for use in the OpenSSL Toolkit (http://www.openssl.org/)"
 *
 * THIS SOFTWARE IS PROVIDED BY THE OpenSSL PROJECT ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE OpenSSL PROJECT OR
 * ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ====================================================================
 *
 * This product includes cryptographic software written by Eric Young
 * (eay@cryptsoft.com).  This product includes software written by Tim
 * Hudson (tjh@cryptsoft.com).
 *
 */

 Original SSLeay License
 -----------------------

/* Copyright (C) 1995-1998 Eric Young (eay@cryptsoft.com)
 * All rights reserved.
 *
 * This package is an SSL implementation written
 * by Eric Young (eay@cryptsoft.com).
 * The implementation was written so as to conform with Netscapes SSL.
 * 
 * This library is free for commercial and non-commercial use as long as
 * the following conditions are aheared to.  The following conditions
 * apply to all code found in this distribution, be it the RC4, RSA,
 * lhash, DES, etc., code; not just the SSL code.  The SSL documentation
 * included with this distribution is covered by the same copyright terms
 * except that the holder is Tim Hudson (tjh@cryptsoft.com).
 * 
 * Copyright remains Eric Young's, and as such any Copyright notices in
 * the code are not to be removed.
 * If this package is used in a product, Eric Young should be given attribution
 * as the author of the parts of the library used.
 * This can be in the form of a textual message at program startup or
 * in documentation (online or textual) provided with the package.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software
 *    must display the following acknowledgement:
 *    "This product includes cryptographic software written by
 *     Eric Young (eay@cryptsoft.com)"
 *    The word 'cryptographic' can be left out if the rouines from the library
 *    being used are not cryptographic related :-).
 * 4. If you include any Windows specific code (or a derivative thereof) from 
 *    the apps directory (application code) you must include an acknowledgement:
 *    "This product includes software written by Tim Hudson (tjh@cryptsoft.com)"
 * 
 * THIS SOFTWARE IS PROVIDED BY ERIC YOUNG ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 * 
 * The licence and distribution terms for any publically available version or
 * derivative of this code cannot be changed.  i.e. this code cannot simply be
 * copied and put under another distribution licence
 * [including the GNU Public Licence.]
 */


BerkeleyDB
----------
(Note: BerkeleyDB is not part of the MultiChain source code distribution, but
it may be statically compiled into some binary distributions of MultiChain.)

/*
 * Copyright (c) 1990-2009 Oracle.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Redistributions in any form must be accompanied by information on
 *    how to obtain complete source code for the DB software and any
 *    accompanying software that uses the DB software.  The source code
 *    must either be included in the distribution or be available for no
 *    more than the cost of distribution plus a nominal fee, and must be
 *    freely redistributable under reasonable conditions.  For an
 *    executable file, complete source code means the source code for all
 *    modules it contains.  It does not include source code for modules or
 *    files that typically accompany the major components of the operating
 *    system on which the executable file runs.
 *
 * THIS SOFTWARE IS PROVIDED BY ORACLE ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT, ARE DISCLAIMED.  IN NO EVENT SHALL ORACLE BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/*
 * Copyright (c) 1990, 1993, 1994, 1995
 *	The Regents of the University of California.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the University nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
/*
 * Copyright (c) 1995, 1996
 *	The President and Fellows of Harvard University.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the University nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY HARVARD AND ITS CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL HARVARD OR ITS CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/***
 * ASM: a very small and fast Java bytecode manipulation framework
 * Copyright (c) 2000-2005 INRIA, France Telecom
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */


V8 JavaScript Engine
--------------------
This license applies to all parts of V8 that are not externally
maintained libraries.  The externally maintained libraries used by V8
are:

  - PCRE test suite, located in
    test/mjsunit/third_party/regexp-pcre/regexp-pcre.js.  This is based on the
    test suite from PCRE-7.3, which is copyrighted by the University
    of Cambridge and Google, Inc.  The copyright notice and license
    are embedded in regexp-pcre.js.

  - Layout tests, located in test/mjsunit/third_party/object-keys.  These are
    based on layout tests from webkit.org which are copyrighted by
    Apple Computer, Inc. and released under a 3-clause BSD license.

  - Strongtalk assembler, the basis of the files assembler-arm-inl.h,
    assembler-arm.cc, assembler-arm.h, assembler-ia32-inl.h,
    assembler-ia32.cc, assembler-ia32.h, assembler-x64-inl.h,
    assembler-x64.cc, assembler-x64.h, assembler-mips-inl.h,
    assembler-mips.cc, assembler-mips.h, assembler.cc and assembler.h.
    This code is copyrighted by Sun Microsystems Inc. and released
    under a 3-clause BSD license.

  - Valgrind client API header, located at third_party/valgrind/valgrind.h
    This is release under the BSD license.

  - antlr4 parser generator Cpp library located in third_party/antlr4
    This is release under the BSD license.

These libraries have their own licenses; we recommend you read them,
as their terms may differ from the terms below.

Further license information can be found in LICENSE files located in 
sub-directories.

Copyright 2014, the V8 project authors. All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
      copyright notice, this list of conditions and the following
      disclaimer in the documentation and/or other materials provided
      with the distribution.
    * Neither the name of Google Inc. nor the names of its
      contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


-----------------------------------
END OF LICENSES OF THIRD-PARTY CODE
