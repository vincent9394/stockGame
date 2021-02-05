import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("trade").del();
    await knex("portfolio").del();
    await knex("transaction_type").del();
    await knex("transaction_status").del();
    await knex("trade_cart").del();

    // Inserts seed entries
    await knex("users").insert([
        { name: "alex", password: "alex", email: "alex@email.com", cash_in_hand: 100000 },
        { name: "gordon", password: "gordon", email: "gordon@email.com", cash_in_hand: 100000 },
        { name: "jason", password: "jason", email: "jason@email.com", cash_in_hand: 100000 },
        { name: "vincent", password: "vincent", email: "vincent@email.com", cash_in_hand: 100000 },
        { name: "bruce", password: "bruce", email: "bruce@email.com", cash_in_hand: 100000 },
        { name: "ricky", password: "ricky", email: "ricky@email.com", cash_in_hand: 100000 },
    ]);

    // Inserts seed entries
    await knex("portfolio").insert([
        {  user_id: 1, stock_symbol: "AAPL", shares: 100 },
        {user_id: 2, stock_symbol: "GOOGL", shares: 200 },
        { user_id: 3, stock_symbol: "TSLA", shares: 200 },
    ]);


    // Inserts seed entries
    await knex("trade").insert([
        { user_id: 1, stock_symbol: "AAPL", isBuy: "t", price: 10.4, shares: 50, portfolio_id: 1, datetime: "2001-01-02 10:20" },
        { user_id: 1, stock_symbol: "AAPL", isBuy: "t", price: 20.4, shares: 50, portfolio_id: 1, datetime: "2010-01-02 10:20" },
    ]);

    await knex("transation_type").insert([
        { type: "buy" },
        { type: "sell" },
    ])

    await knex("transation_status").insert([
        { type: "failed" },
        { type: "pending" },
        { type: "success" },
    ])

    await knex("trade_cart").insert([
        { user_id: 1, stock_symbol: "AAPL", transaction_type_id: 1, transaction_status_id: 1, price: 100, share: 20, exp_datetime: "2021-01-31", created_at: "2021-01-30 0:00", updated_at: "2021-01-30 0:00" },
        { user_id: 1, stock_symbol: "AAPL", transaction_type_id: 2, transaction_status_id: 2, price: 120, share: 30, exp_datetime: "2021-01-31", created_at: "2021-01-30 0:00", updated_at: "2021-01-30 0:00" },
        { user_id: 2, stock_symbol: "GOOGL", transaction_type_id: 1, transaction_status_id: 1, price: 100, share: 20, exp_datetime: "2021-01-31", created_at: "2021-01-30 0:00", updated_at: "2021-01-30 0:00" },
        { user_id: 2, stock_symbol: "GOOGL", transaction_type_id: 2, transaction_status_id: 2, price: 120, share: 30, exp_datetime: "2021-01-31", created_at: "2021-01-30 0:00", updated_at: "2021-01-30 0:00" },
    ])

    await knex("watch_list").insert([
        { user_id: 1, stock_symbol: "AAPL" },
        { user_id: 1, stock_symbol: "GOOGL" },
        { user_id: 1, stock_symbol: "TSLA" },
        { user_id: 2, stock_symbol: "GOOGL" },
    ])

    await knex("portfolio").insert([
        { user_id: 1, stock_symbol: "AAPL", shares: 200 },
        { user_id: 1, stock_symbol: "GOOGL", shares: 300 },
        { user_id: 1, stock_symbol: "TSLA", shares: 400 },
        { user_id: 2, stock_symbol: "GOOGL", shares: 800 },
    ])

    await knex("stock_info").insert([
        { stock_symbol: "AAPL", name: "Apple Inc", background: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories. It also provides AppleCare support services; cloud services store services; and operates various platforms, including the App Store, that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It sells and delivers third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1977 and is headquartered in Cupertino, California.", created_at: "2020-08-31 0:00", updated_at: "2020-08-31 0:00" },
        { stock_symbol: "GOOGL", name: "Alphabet Inc", background: "Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America. It offers performance and brand advertising services. The company operates through Google and Other Bets segments. The Google segment offers products, such as Ads, Android, Chrome, Google Cloud, Google Maps, Google Play, Hardware, Search, and YouTube, as well as technical infrastructure. It also offers digital content, cloud services, hardware devices, and other miscellaneous products and services. The Other Bets segment includes businesses, including Access, Calico, CapitalG, GV, Verily, Waymo, and X, as well as Internet and television services. The company has an agreement with Sabre Corporation to develop an artificial intelligence-driven technology platform for travel. Alphabet Inc. was founded in 1998 and is headquartered in Mountain View, California.", created_at: "2020-08-31 0:00", updated_at: "2020-08-31 0:00" },
        { stock_symbol: "TSLA", name: "Tesla, Inc", background: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, Netherlands, Norway, and internationally. The company operates in two segments, Automotive; and Energy Generation and Storage. The Automotive segment offers sedans and sport utility vehicles. It also provides electric powertrain components and systems; and services for electric vehicles through its company-owned service locations, and Tesla mobile service technicians, as well as sells used vehicles. This segment markets and sells its products through a network of company-owned stores and galleries, as well as through its own Website. The Energy Generation and Storage segment offers energy storage products, such as rechargeable lithium-ion battery systems for use in homes, industrial, commercial facilities, and utility grids; and designs, manufactures, installs, maintains, leases, and sells solar energy generation and energy storage products to residential and commercial customers. It also provides vehicle insurance services, as well as renewable energy. The company was formerly known as Tesla Motors, Inc. and changed its name to Tesla, Inc. in February 2017. Tesla, Inc. was founded in 2003 and is headquartered in Palo Alto, California.", created_at: "2020-08-31 0:00", updated_at: "2020-08-31 0:00" },
    ])

    await knex("stock_history").insert([
        { date: "2021-02-03 19:56:00", stock_symbol: "AAPL", open: 136.6000, high: 136.6500, low: 136.5500, close: 136.6500, volume: 12786 },
        { date: "2021-02-03 19:57:00", stock_symbol: "AAPL", open: 136.5800, high: 136.6500, low: 136.5600, close: 136.6000, volume: 7184 },
        { date: "2021-02-03 19:58:00", stock_symbol: "AAPL", open: 136.6500, high: 136.7000, low: 136.6500, close: 136.6900, volume: 9191 },
        { date: "2021-02-03 19:59:00", stock_symbol: "AAPL", open: 136.6899, high: 136.7000, low: 136.6000, close: 136.6500, volume: 32716 },
        { date: "2021-02-03 20:00:00", stock_symbol: "AAPL", open: 136.6500, high: 136.6500, low: 136.5500, close: 136.5600, volume: 26611 },
    ])

    await knex("stock_history").insert([
        { date: "2021-02-03 20:00:00", stock_symbol: "AAPL", open: 136.6500, high: 136.6500, low: 136.5500, close: 136.5600, volume: 26611 },
    ])
};
