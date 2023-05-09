import React, { useState } from 'react'

interface Props {
    startingTimeInSeconds: number;
    timesUpHandler: () => void;
    sendTimeLeft: (timeLeft: number) => void;
}

export default function Timer({ startingTimeInSeconds, timesUpHandler, sendTimeLeft }: Props) {
    const [timeLeft, setTimeLeft] = useState(startingTimeInSeconds);

    // Each second, the timer will decrease by 1
    setTimeout(() => {
        if (timeLeft <= 0) return;
        setTimeLeft(timeLeft - 1);
        sendTimeLeft(timeLeft);
    }, 1000);


    if (timeLeft <= 0) {
        timesUpHandler();
    }

    return (
        <div>
            <p>{timeLeft}</p>
        </div>
    )
}
