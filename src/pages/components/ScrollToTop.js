import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as ArrowUp } from '../../img/arrowUp.svg';

export default function ScrollToTop() {

    const [showButton, setShowButton] = useState(false);
    
    // Setting of Buttom for Back to top
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 400) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const handleBackToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            {showButton &&
                <Button className="ArrowUp rounded-circle btn-sm btn-dark" onClick={handleBackToTop}><ArrowUp /></Button>
            }
        </div>
    )
}