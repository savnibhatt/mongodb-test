const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe our tests
describe('Finding records', function(){
    let char;
    beforeEach((done) => {
        char = new MarioChar({
            name: 'Mario',
          });
          char.save().then(function(){
            done();
          });
    })
  // Create tests
  it('Finds one record from the database', function(done){
        MarioChar.findOne({
            name : 'Mario'
        }).then((record) => {
            assert(record.name === 'Mario');
            done();
        })

  });
  it('Finds one record by ID the database', function(done){
    MarioChar.findOne({
        _id : char._id
    }).then((record) => {
        assert(record._id.toString() === char._id.toString());
        done();
    })

});
});
