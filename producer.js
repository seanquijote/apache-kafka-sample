const { Kafka } = require('kafkajs');
const { Chance } = require('chance');
 
const kafka = new Kafka({
  clientId: 'kafka-nodejs-app',
  brokers: ['localhost:9092']
});
const chance = new Chance();
 
const producer = kafka.producer();
const topic = "test-topic";
 
const produceMessage = async () => {
    let value = chance.animal();
    console.log({
        topic: topic,
        value: value,
    });
    await producer.send({
        topic,
        messages: [
            { value },
        ],
    });
}

const run = async () => {
    await producer.connect();
    await produceMessage();
    setInterval(produceMessage, 2000);
    // await producer.disconnect()
}
 
run().catch(console.error);