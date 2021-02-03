import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) =>{
        table.increments();
        table.string('name');
        table.string('password');
        table.string('email');
        table.decimal('cash_in_hand', 10, 4);
    })

    await knex.schema.createTable('trade_cart', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.boolean('isBuy');
        table.decimal('price', 6, 2);
        table.decimal('shares', 10, 2);
    })

    await knex.schema.createTable('trade', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.boolean('isBuy');
        table.decimal('price', 6, 2);
        table.decimal('shares', 10, 2);
        table.integer('portfolio_id');
    })

    await knex.schema.createTable('stock', (table) => {
        table.increments();
        table.dateTime('date');
        table.string('stock_symbol');
        table.decimal('open', 6, 2);
        table.decimal('high', 6, 2);
        table.decimal('low', 6, 2);
        table.decimal('close', 6, 2);
        table.decimal('volume_ltc', 10, 2);
        table.decimal('volume_usd', 10, 2);
    })

    await knex.schema.createTable('portfolio', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.decimal('shares', 10, 2);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('portfolio');
    await knex.schema.dropTableIfExists('stock');
    await knex.schema.dropTableIfExists('trade');
    await knex.schema.dropTableIfExists('trade_cart');
    await knex.schema.dropTableIfExists('users');

}

