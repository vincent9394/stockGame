import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const producer = kafka.producer();

async function connectKafka() {
    await producer.connect();
}
async function main() {
    // await producer.connect()
    await producer.send({
        topic: 'Heatmap',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })

    await producer.disconnect()
}

connectKafka();
main();