import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('portfolio', (table) => {
        table.dropForeign(['user_id']);
        table.foreign('user_id').references('users.id');
    })
    await knex.schema.alterTable('trade_cart', (table) => {
        table.dropForeign(['user_id']);
        table.foreign('user_id').references('users.id');
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trade_cart', (table) => {
        table.dropForeign(['user_id']);
        table.foreign('user_id').references('user.id');
    })
    await knex.schema.alterTable('portfolio', (table) => {
        table.dropForeign(['user_id']);
        table.foreign('user_id').references('user.id');
    })

}

