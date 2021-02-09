import { Producer } from 'kafkajs';

export class KafkaService {
    // producer: any;
    constructor(private producer: Producer) {
    }
    async sendMessage(x:number, y:number, timeInterval:number){
        return await this.producer.send({
            topic: 'Heatmap',
            messages: [
                {value: `${x},${y},${timeInterval}`}
            ]
        })
    }
}