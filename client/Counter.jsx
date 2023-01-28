import React from "react"
import { useState } from "react"

export default Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => setCount(prevCount => prevCount + 1)
    const decrement = () => setCount(prevCount => prevCount - 1)

    return (
        <div className="counter">
            <span className="counter__label">{count}</span>

            <div className="counter__toolbar">
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div>
        </div>
    )
}
