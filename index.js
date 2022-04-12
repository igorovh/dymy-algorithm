import fetch from 'node-fetch';
import { convertTimeToSeconds } from './utils/time'

export async function dymy(videoId) {
    const videoInfo = await downloadInfo(videoId);
    videoInfo.durationInSeconds = convertTimeToSeconds(videoInfo.duration);
    const dymyChunks = generateChunks(videoInfo);

    return dymyChunks;
}

async function downloadInfo(videoId) {
    const data = await fetch(`https://wcapi.vopp.top/video/${videoId}`);
    const json = await data.json();

    return json.data[0];
}

async function generateChunks(videoInfo, time = 300) {
    return await downloadMessages(videoInfo, time);
}

async function downloadMessages(videoInfo, time, messagesAmount = 0, iteration = 1, chunks = [], startTime = 0, _page) {
    let data = await fetch(`https://api.twitch.tv/v5/videos/${videoInfo.id}/comments` + (_page ? `?cursor=${_page}` : ''), {
        headers: {
            'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko'
        }
    });
    
    data = await data.json();
    messagesAmount += data.comments.length;
    
    if(data.comments.length > 0) {
        const lastMessageTime = data.comments.at(-1).content_offset_seconds;
        if(iteration * time > lastMessageTime) {
            iteration++;
            chunks.push({
                id: iteration - 1,
                messagesAmount: messagesAmount,
                startTime: startTime,
                endTime: lastMessageTime 
            });
            messagesAmount = 0;
            startTime = lastMessageTime;
        }
    }
    
    if(data._next) {
        return await downloadMessages(videoInfo, time, messagesAmount, iteration, chunks, startTime, data._next);
    } else {
        //TODO SAVE LAST CHUNK
        return chunks;
    }
}
