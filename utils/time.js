export function convertTimeToSeconds(time) {
    time = time.replace(/[A-Za-z]/gm, ':');
    if(time.endsWith(':')) time = time.substring(0, time.length - 1);
    return time.split(':').reverse().reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0);
}

export const secondsToTimestamp = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}