import fetch from 'node-fetch';

export async function dymy(videoId) {
    const videoInfo = await downloadInfo(videoId);
    console.log(videoInfo);
}

async function downloadInfo(videoId) {
    const data = await fetch(`https://wcapi.vopp.top/video/${videoId}`);
    const json = await data.json();
    return json;
}

