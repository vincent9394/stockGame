import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trade_cart', (table) => {
        table.dateTime('datetime');
        table.foreign('user_id').references('users.id');
    })
    await knex.schema.alterTable('portfolio', (table) => {
        table.foreign('user_id').references('users.id');
    })
    await knex.schema.alterTable('trade', (table) => {
        table.dateTime('datetime');
        table.foreign('portfolio_id').references('portfolio.id');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trade', (table) => {
        table.dropForeign(['portfolio_id']);
        table.dropColumn('datetime');
    })
    await knex.schema.alterTable('portfolio', (table) => {
        table.dropForeign(['user_id']);
    })
    await knex.schema.alterTable('trade_cart', (table) => {
        table.dropForeign(['user_id']);
        table.dropColumn('datetime');
    })
}

