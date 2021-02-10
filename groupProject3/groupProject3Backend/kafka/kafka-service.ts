import { Producer } from 'kafkajs';

export class KafkaService {
    // producer: any;
    constructor(private producer: Producer) {
    }
    async sendMessage(x: number, y: number, timeInterval: number) {
        return await this.producer.send({
            topic: 'Heatmap',
            messages: [
                { value: ` {"x": ${x}, "y": ${y}, "time_interval": ${timeInterval}}` }
            ]
        })
    }
    async sendSearch(SearchStockID: string | null , SearchName: string | null) {
        return await this.producer.send({
            topic: 'StockSearch',
            messages: [
                { value: ` {"SearchStockID": ${SearchStockID}, "SearchName": ${SearchName}`}
            ]
        })
    }
}

//{ "x" : 300, "y" : 300,"timeInterval" : 30 }\
// compile group: 'org.apache.spark', name: 'spark-sql_2.12', version: '3.1.0'