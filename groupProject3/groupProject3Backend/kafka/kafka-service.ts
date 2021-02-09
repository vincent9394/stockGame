import { Producer } from 'kafkajs';

export class KafkaService {
    // producer: any;
    constructor(private producer: Producer) {
    }
    async sendMessage(x:number, y:number, timeInterval:number){
        return await this.producer.send({
            topic: 'Heatmap',
            messages: [
                {value:` {"x": ${x}, "y": ${y}, "time_interval": ${timeInterval}}`}
            ]
        })
    }
}

//{ "x" : 300, "y" : 300,"timeInterval" : 30 }\
// compile group: 'org.apache.spark', name: 'spark-sql_2.12', version: '3.1.0'