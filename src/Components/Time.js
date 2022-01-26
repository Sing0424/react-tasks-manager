import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Time() {
    const [date, setDate] = useState(new Date());
    const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]
	const nowDay = date.getFullYear('en-US') + "-" + months[date.getMonth()] + "-" + date.getDate('en-US')
    const nowTime = date.toLocaleTimeString('en-US', { hour12: false })

    const componentDidMount = () => {
        const oneSecond = 1000;
        setInterval(() => {
            setDate(new Date());
        }, oneSecond);
    };

    return (
        <div className="topBarDateTime" onChange={componentDidMount()}>
            <span>
                <p>
                    {nowDay}
                </p>
            </span>
            <span>
                <p>
                    {nowTime}
                </p>
            </span>
        </div>
    );
};