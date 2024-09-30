import React, { useEffect, useState } from 'react'

export const Timer = () => {

    var intervalId;
    const [seconds, setSeconds] = useState(33);
    useEffect(() => {
        // const id = setInterval(() => setSeconds(seconds - 1), 1000)
        // return () => clearInterval(id);
    }, [])

    function handleStart() {
        const id = setInterval(() => { setSeconds(pre => pre - 1) }, 1000)
    }
    const startTimer = () => {
        if (intervalId) return; // If the timer is already running, do nothing

        intervalId = setInterval(() => {
            setSeconds(prev => seconds + 1)
        }, 1000);
    };

    return (<>
        <div className='text-center fs-2'>Timer</div>
        <div className='text-center fs-4'>
            <span style={{ width: '45px' }}>{seconds}</span>
        </div>

        <button onClick={handleStart}>
            Start
        </button>
    </>
    )
}
