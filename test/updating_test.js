const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe our tests
describe('Updating records', function(){
    let char;
    beforeEach((done) => {
        char = new MarioChar({
            name: 'Mario',
            weight : 50
          });
          char.save().then(function(){
            done();
          });
    })
  // Create tests
  it('update one record in the database', function(done){
        MarioChar.findOneAndUpdate({name: 'Mario'}, {name : 'Luigi'}).then(() => {
            MarioChar.findOne({name: 'Luigi'}).then((result) => {
                assert(result._doc.name === 'Luigi');
                done();
            })
        })
  });

  it('increments the weight by one', (done) => {
        MarioChar.update({}, {$inc : {weight : 1}}).then(() => {
            MarioChar.findOne({name : 'Mario'}).then((result) => {
                assert(result.weight === 51);
                done();
            })
        })
  })
});
