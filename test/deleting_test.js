const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe our tests
describe('Deleting records', function(){
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
  it('Delete one record from the database', function(done){
      MarioChar.findOneAndRemove({
          name: 'Mario'
      }).then(() => {
          MarioChar.findOne({
              name: 'Mario'
          }).then((result) => {
              assert(result === null);
              done();
          })
      })
  });
});
