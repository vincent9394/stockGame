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


/*
# Kafka command
## For linux
``` powershell
// Run kafka
cd to kafka file

// Run zookeeper
./bin/zookeeper-server-start.sh config/zookeeper.properties

// Run server brokers
./bin/kafka-server-start.sh config/server.properties

// Establish User interface
java --add-opens=java.base/sun.nio.ch=ALL-UNNAMED -jar kafdrop-3.27.0.jar --kafka.brokerConnect=localhost:9092

// Create Topic
 ./bin/kafka-topics.sh --create --topic Heatmap --bootstrap-server localhost:9092

// Edit Topic
./bin/kafka-console-producer.sh --topic Heatmap --bootstrap-server localhost:9092

// List all topics
./bin/kafka-topics.sh --list --zookeeper localhost:2181

// Specify Topic key
./bin/kafka-console-producer.sh --topic Heatmap --bootstrap-server localhost:9092 --property "parse.key=true" --property "key.separator=:"

// Read topic
./bin/kafka-console-consumer.sh --topic Heatmap --from-beginning --bootstrap-server localhost:9092



## For windows
``` powershell
// Run kafka
cd to kafka file

// Run zookeeper
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties

// Run server brokers
.\bin\windows\kafka-server-start.bat .\config\server.properties

// Establish User interface
java --add-opens=java.base/sun.nio.ch=ALL-UNNAMED -jar kafdrop-3.27.0.jar --kafka.brokerConnect=localhost:9092

// Create Topic
.\bin\windows\kafka-topics.bat --create --topic Heatmap --bootstrap-server localhost:9092

// Edit Topic
.\bin\windows\kafka-console-producer.bat --topic Heatmap --bootstrap-server localhost:9092

// Specify Topic key
.\bin\windows\kafka-console-producer.bat --topic Heatmap --bootstrap-server localhost:9092 --property "parse.key=true" --property "key.separator=:"

// Read topic
.\bin\windows\kafka-console-consumer.bat --topic Heatmap --from-beginning --bootstrap-server localhost:9092
```

*/