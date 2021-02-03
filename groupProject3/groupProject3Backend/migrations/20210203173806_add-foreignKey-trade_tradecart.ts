import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trade_cart', (table) => {
        table.foreign('transaction_type_id').references('transaction_type.id')
        table.foreign('transaction_status_id').references('transaction_status.id')
    })
    await knex.schema.alterTable('trade', (table) => {
        table.foreign('transaction_type_id').references('transaction_type.id')
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trade', (table) => {
        table.dropForeign(['transaction_type_id'])
    })
    await knex.schema.alterTable('trade', (table) => {
        table.dropForeign(['transaction_type_id'])
        table.dropForeign(['transaction_status_id'])
    })
}

