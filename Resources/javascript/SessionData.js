
function SessionDataParser() {

    this.parse = function(s) {

        try {
            j = (new Function("return " + s))();
            return j;
        }
        catch(exc) {
            throw "ERROR. SessionDataParser. parse(). " + exc;
        }
    }

    ,this.buildStartTimeHash = function(json) {
        try {
        var returnHash = {};
        $.each(json, function(ndx, sess) {
                key = sess.Start;
                        
                if (returnHash[key] == undefined) {
                    returnHash[key] = [];
                }
                (returnHash[key]).push(sess);
            });

        }
        catch(exc) {
            throw "ERROR. SessionDataParser. buildStartTimeHash(). " + exc;
        }

        return returnHash;
    }

    ,this.toString = function() {
        return "SessionDataParser";
    }
}
