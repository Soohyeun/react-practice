import React, {useState, useEffect} from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;

function Accommodate(props) {
    const [isFull, setIsFull] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(0);

    useEffect(() => {
        setIsFull(count >= MAX_CAPACITY);
        console.log(`Current count value: ${count}`);
    }, [count]);

    return (
        <div style={{padding: 16}}>
            <p>{`Total ${count} people.`}</p>

            <button onClick={increaseCount} disabled={isFull}>
                Enter
            </button>
            <button onClick={decreaseCount}>Exit</button>

            {isFull && <p style={{color: "red"}}>Fully occupied.</p> }
        </div>
    )
}

export default Accommodate;