Parse.initialize("T9hGnG75SFw2m0VrnkAgNB4GZ3vffWuGuoaBdBwM", "BcVniJdGLrbbbXz7KAJR4S5PY37KrE3RrSwKR1eX");
    
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        $(".success").show();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });