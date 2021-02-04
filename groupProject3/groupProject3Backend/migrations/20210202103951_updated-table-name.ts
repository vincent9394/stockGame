import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    // await knex.schema.createTable('users', (table) =>{
    //     table.increments();
    //     table.string('name');
    //     table.string('password');
    //     table.string('email');
    //     table.decimal('cash_in_hand', 10, 4);
    // })
}


export async function down(knex: Knex): Promise<void> {
    // await knex.schema.dropTable('users');
}

