
var UserDatabase = {
    types: { titanium: "titanium", local: "local", test: "test" }

    ,create: function(type) {
        if (type == UserDatabase.types.titanium) {
            return new UserDatabase_Titanium();
        }

        if (type == UserDatabase.types.local) {
            return new UserDatabase_Local();
        }

        if (type == UserDatabase.types.test) {
            return new UserDatabase_TitaniumTest();
        }
    }

};

function UserDatabase_Titanium() {

    this.open = function() {
        try {
          this.db = Titanium.Database.open('codemashSessionsDB');
        }
        catch(exc) {
            throw(exc);
        }
    }

    ,this.init = function() {
        try {
            this.db.execute("CREATE TABLE IF NOT EXISTS SelectedSessions(startTime TEXT, session TEXT)");
        }
        catch(exc) {
            throw(exc);
        }
    }

    ,this.execute = function(sql) {
        try {
            this.db.execute(sql);
        }
        catch(exc) {
            throw(exc);
        }
    }


    ,this.toString = function() {
        return "UserDatabase_Titanium";
    }
};


function UserDatabase_Local() {
    this.open = function() { ; }
    ,this.init = function() { ; }

    ,this.toString = function() {
        return "UserDatabase_Local";
    }
};
