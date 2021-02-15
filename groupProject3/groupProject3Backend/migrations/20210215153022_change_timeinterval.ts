import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("mouse_move", table => {
        table.float('time_interval').alter()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("mouse_move", table => {
        table.integer('time_interval').alter()
    })
}


