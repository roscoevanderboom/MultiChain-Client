//
//
module.exports = {
  // Params to replace
  params: [
      /anyone-can-connect = false/g,
      /anyone-can-send = false/g,
      /anyone-can-receive = false/g,
      /anyone-can-receive-empty = true/g,
      /anyone-can-create = false/g,
      /anyone-can-issue = false/g,
      /anyone-can-mine = false/g,
      /anyone-can-activate = false/g,
      /anyone-can-admin = false/g
  ],
  consensus: [
      /mining-diversity = 0.3/g,
      /admin-consensus-upgrade = 0.5/g,
      /admin-consensus-txfilter = 0.5/g,
      /admin-consensus-activate = 0.5/g,
      /admin-consensus-mine = 0.5/g,
      /admin-consensus-create = 0.5e/g,
      /admin-consensus-issue = 0.5/g
  ]
}
