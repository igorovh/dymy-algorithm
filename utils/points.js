const emotes = [
    'xD', 'xdd', 'xd', 'PogU', 'PogChamp'
]

export function checkPoints(content) {
    for(const emote of emotes) {
        if(content.includes(emote)) return true;
    }
    return false;
}