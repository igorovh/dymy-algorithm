import fetch from 'node-fetch';
import { convertTimeToSeconds } from './utils/time';
import { checkPoints } from './utils/points';

export default async function dymy(videoId) {
    const videoInfo = await downloadInfo(videoId);
    videoInfo.durationInSeconds = convertTimeToSeconds(videoInfo.duration);
    const chunks = await generateChunks(videoInfo);

    chunks.sort((a, b) => {
        return b.points - a.points;
    });

    return {
        video: videoInfo,
        chunks
    };
}

async function downloadInfo(videoId) {
    const data = await fetch(`https://wcapi.vopp.top/video/${videoId}`);
    const json = await data.json();

    return json.data[0];
}

async function generateChunks(videoInfo) {
    return await downloadMessages(videoInfo);
}

async function downloadMessages(videoInfo, chunks = [], iteration = 0, _page) {
    console.info(`Downloading next page (${iteration}) (${_page})`);

    let data = await fetch(`https://api.twitch.tv/v5/videos/${videoInfo.id}/comments` + (_page ? `?cursor=${_page}` : ''), {
        headers: {
            'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko'
        }
    });

    data = await data.json();

    const messagesAmount = data.comments.length;
    if(messagesAmount > 0) {
        const firstMessageTime = data.comments.at(0).content_offset_seconds;
        const lastMessageTime = data.comments.at(-1).content_offset_seconds;
    
        let points = 0;
        for(const message of data.comments) {
            const body = message.message?.body;
            if(checkPoints(body)) points++;
        }

        chunks.push({
            id: iteration++,
            messagesAmount,
            points,
            startTime: firstMessageTime,
            endTime: lastMessageTime,
        });
    }
    
    if(data._next) {
        return await downloadMessages(videoInfo, chunks, iteration, data._next);
    } else {
        return chunks;
    }
}
