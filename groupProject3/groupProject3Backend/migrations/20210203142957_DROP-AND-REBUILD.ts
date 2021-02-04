import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    // drop foreign, drop tables
    // await knex.schema.alterTable('portfolio', (table) => {
    //     table.dropForeign(['user_id']);
    // })
    // await knex.schema.alterTable('trade_cart', (table) => {
    //     table.dropForeign(['user_id']);
    // })
    // await knex.schema.alterTable('trade', (table) => {
    //     table.dropForeign(['portfolio_id']);
    // })
    let hasTable = await knex.schema.hasTable('portfolio');
    if (hasTable) {
        await knex.schema.dropTable('portfolio');
    }
    hasTable = await knex.schema.hasTable('trade_cart');
    if (hasTable) {
        await knex.schema.dropTable('trade_cart');
    }
    hasTable = await knex.schema.hasTable('users');
    if (hasTable) {
        await knex.schema.dropTable('users');
    }
    hasTable = await knex.schema.hasTable('trade');
    if (hasTable) {
        await knex.schema.dropTable('trade')
    }
    hasTable = await knex.schema.hasTable('stock');
    if (hasTable) {
        await knex.schema.dropTable('stock')
    }

    // create tables
    await knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('name');
        table.string('password');
        table.string('email');
        table.decimal('cash_in_hand', 10, 4);
    })
    await knex.schema.createTable('transaction_type', (table) => {
        table.integer('id').primary();
        table.string('type');
    })
    await knex.schema.createTable('transaction_status', (table) => {
        table.integer('id').primary();
        table.string('type');
    })
    await knex.schema.createTable('trade_cart', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.integer('transaction_type_id');
        table.integer('transaction_status_id');
        table.decimal('price', 6, 4);
        table.decimal('shares', 10, 4);
        table.dateTime('exp_datetime');
        table.timestamps(true, true);
        table.foreign('user_id').references('users.id');
    })
    await knex.schema.createTable('trade', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.integer('transaction_type_id');
        table.decimal('price', 6, 4);
        table.decimal('shares', 10, 4);
        table.timestamps(true, true);
        table.foreign('user_id').references('users.id');
    })
    await knex.schema.createTable('watch_list', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.foreign('user_id').references('users.id');
    })
    await knex.schema.createTable('portfolio', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('stock_symbol');
        table.decimal('shares', 10, 4);
        table.foreign('user_id').references('users.id');
    })

    await knex.schema.createTable('stock_info', (table) => {
        table.string('stock_symbol').primary();
        table.string('name');
        table.text('background');
        table.timestamps(true, true);
    })
    await knex.schema.createTable('stock_history', (table) => {
        table.increments();
        table.dateTime('date');
        table.string('stock_symbol');
        table.decimal('open', 6, 4);
        table.decimal('high', 6, 4);
        table.decimal('low', 6, 4);
        table.decimal('close', 6, 4);
        table.decimal('volume_ltc', 10, 4);
        table.decimal('volume_usd', 10, 4);
        table.foreign('stock_symbol').references('stock_info.stock_symbol');
    })
    await knex.schema.createTable('stock_current', (table) => {
        table.increments();
        table.dateTime('date');
        table.string('stock_symbol');
        table.decimal('open', 6, 4);
        table.decimal('high', 6, 4);
        table.decimal('low', 6, 4);
        table.decimal('close', 6, 4);
        table.decimal('volume_ltc', 10, 4);
        table.decimal('volume_usd', 10, 4);
        table.foreign('stock_symbol').references('stock_info.stock_symbol');
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('stock_current', (table) => {
        table.dropForeign(['stock_symbol'])
    })
    await knex.schema.alterTable('stock_history', (table) => {
        table.dropForeign(['stock_symbol'])
    })
    await knex.schema.dropTable('stock_current');
    await knex.schema.dropTable('stock_history');
    await knex.schema.dropTable('stock_info');


    await knex.schema.alterTable('portfolio', (table) => {
        table.dropForeign(['user_id'])
    })
    await knex.schema.alterTable('trade', (table) => {
        table.dropForeign(['user_id'])
    })
    await knex.schema.alterTable('trade_cart', (table) => {
        table.dropForeign(['user_id'])
    })
    await knex.schema.alterTable('watch_list', (table) => {
        table.dropForeign(['user_id'])
    })
    await knex.schema.dropTable('transaction_type');
    await knex.schema.dropTable('transaction_status');
    await knex.schema.dropTable('portfolio');
    await knex.schema.dropTable('trade');
    await knex.schema.dropTable('trade_cart');
    await knex.schema.dropTable('watch_list');
    await knex.schema.dropTable('users');
}

