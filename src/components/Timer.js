import React from 'react';

function formatTime(num) {
    if (num < 10) return "0" + num;
    return num;
}

export default function Timer() {
    const [_, forceUpdate] = React.useReducer(x => x + 1, 0);
    const [time] = React.useState(Date.now());

    React.useEffect(() => {
        setTimeout(() => {
            forceUpdate();
        }, 1000);
    });

    const diff = parseInt((Date.now() - time) / 1000);
    const sec = diff % 60;
    const min = parseInt(diff / 60);
    return `${formatTime(min)}:${formatTime(sec)}`;
}