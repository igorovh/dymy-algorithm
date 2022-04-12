import { dymy } from '..';

const chunks = await dymy(1299995728);

console.log(chunks);

chunks.sort((a, b) => {
    return b - a;
});

console.info('Top 3 moments:');
console.info(`1. ${chunks[0].startTime}s - ${chunks[0].endTime}s (${chunks[0].messagesAmount})`);
console.info(`2. ${chunks[1].startTime}s - ${chunks[1].endTime}s (${chunks[1].messagesAmount})`);
console.info(`3. ${chunks[2].startTime}s - ${chunks[2].endTime}s (${chunks[2].messagesAmount})`);