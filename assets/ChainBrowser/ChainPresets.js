// 
//
module.exports = {   
    chainPresets: {
        //  Secure Local Chain ( SLC )
        SLC: [
            'anyone-can-connect = false',
            'anyone-can-send = false',
            'anyone-can-receive = false',
            'anyone-can-receive-empty = true',
            'anyone-can-create = false',
            'anyone-can-issue = false',
            'anyone-can-mine = false',
            'anyone-can-activate = false',
            'anyone-can-admin = false',
        ],
        //  Secure Public Chain ( SLC )
        SPC: [
            'anyone-can-connect = false',
            'anyone-can-send = true',
            'anyone-can-receive = true',
            'anyone-can-receive-empty = true',
            'anyone-can-create = true',
            'anyone-can-issue = true',
            'anyone-can-mine = true',
            'anyone-can-activate = false',
            'anyone-can-admin = false',
        ],
        //  Open Local Chain ( SLC )
        OPC: [
            'anyone-can-connect = true',
            'anyone-can-send = true',
            'anyone-can-receive = true',
            'anyone-can-receive-empty = true',
            'anyone-can-create = true',
            'anyone-can-issue = true',
            'anyone-can-mine = true',
            'anyone-can-activate = true',
            'anyone-can-admin = true',
        ],
        // Params to replace
        replace: [
            /anyone-can-connect = false/g,
            /anyone-can-send = false/g,
            /anyone-can-receive = false/g,
            /anyone-can-receive-empty = true/g,
            /anyone-can-create = false/g,
            /anyone-can-issue = false/g,
            /anyone-can-mine = false/g,
            /anyone-can-activate = false/g,
            /anyone-can-admin = false/g
        ]
    }
};