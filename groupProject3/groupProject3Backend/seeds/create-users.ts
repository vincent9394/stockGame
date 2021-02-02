import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("trade").del();
    await knex("portfolio").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, name: "alex", password: "alex", email: "alex@email.com", cash_in_hand: 100000 },
        { id: 2, name: "gordon", password: "gordon", email: "gordon@email.com", cash_in_hand: 100000 },
        { id: 3, name: "jason", password: "jason", email: "jason@email.com", cash_in_hand: 100000 },
    ]);

    // Inserts seed entries
    await knex("portfolio").insert([
        { id: 1, user_id: 1, stock_symbol: "AAPL", shares: 100},
        { id: 2, user_id: 2, stock_symbol: "GOOGL", shares: 200},
        { id: 3, user_id: 3, stock_symbol: "TSLA", shares: 200},
    ]);


    // Inserts seed entries
    await knex("trade").insert([
        { id: 1, user_id: 1, stock_symbol: "AAPL", isBuy: "t", price: 10.4, shares: 50, portfolio_id: 1, datetime: "2001-01-02 10:20"},
        { id: 2, user_id: 1, stock_symbol: "AAPL", isBuy: "t", price: 20.4, shares: 50, portfolio_id: 1, datetime: "2010-01-02 10:20"},
    ]);

};
