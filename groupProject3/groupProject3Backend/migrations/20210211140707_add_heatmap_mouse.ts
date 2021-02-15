import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('mouse_move', (table) => {
        table.increments();
        table.integer('x');
        table.integer('y');
        table.integer('time_interval');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('mouse_move');
}

