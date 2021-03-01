const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'kafka-nodejs-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'test-topic'; 

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    });
}
 
run().catch(console.error);