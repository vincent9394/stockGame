import  Knex from 'knex'
const knexConfig=require('../knexfile')
const knex=Knex(knexConfig['test'])
describe('database',()=>{
    beforeEach(async ()=>{
        await knex.migrate.rollback();
    })
    it('migrate from base version',async()=>{
        await knex.migrate.latest();
    })
    it('migrate back and forth',async ()=>{
        await knex.migrate.latest();
        await knex.migrate.rollback();
        await knex.migrate.latest();
    })
    it('can seed',async()=>{
        await knex.migrate.latest();
        await knex.seed.run();
    })
    it('can seed more than one time',async()=>{
        await knex.migrate.latest();
        await knex.seed.run();
        await knex.seed.run();
    })
    afterAll(async()=>{
        await knex.destroy();
    })
})
