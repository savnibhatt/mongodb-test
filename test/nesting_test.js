const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

describe('Nesting Records', () => {

    beforeEach((done) => {
        mongoose.connection.collections.authors.drop(() => {
            done();
        });
    })

    it('Create an author with sub-documents', (done) => {
        let pat = new Author({
            name : 'Patrick John',
            books : [{ title : 'Name of the Wind', pages : 500}]
        });

        pat.save().then(() => {
            Author.findOne({name: 'Patrick John'}).then((result) => {
                assert(result.books.length === 1);
                done();
            })
        })
    })

    it('Add books to an author', (done) => {
        let pat = new Author({
            name : 'Patrick John',
            books : [{ title : 'Name of the Wind', pages : 500}]
        });

        pat.save().then(() => {
            Author.findOne({name: 'Patrick John'}).then((result) => {
                result.books.push({title: "Wise man's Fear", pages : 500});
                result.save().then(() => {
                    console.log("in second");
                    Author.findOne({name: 'Patrick John'}).then((result) => {
                        console.log(result);
                        assert(result.books.length === 2);
                        done();
                    })
                })
            })
        })
    })
})