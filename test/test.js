import dymy from '..';
import { secondsToTimestamp } from '../utils/time';

const { video, chunks } = await dymy(1631596204);


console.info(`${video.user_name} - ${video.title}`);
console.info('Top 10 moments:');
for(let i = 0; i < 10; i++) {
    const chunk = chunks[i];
    if(chunk) {
        console.info(`${i + 1}. ${secondsToTimestamp(chunk.startTime)} - ${secondsToTimestamp(chunk.endTime)} (${chunk.points} points)`);
    }
}