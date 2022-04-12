export function convertTimeToSeconds(time) {
    time = time.replace(/[A-Za-z]/gm, ':');
    if(time.endsWith(':')) time = time.substring(0, time.length - 1);
    return time.split(':').reverse().reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0);
}