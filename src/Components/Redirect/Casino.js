import { CasinoCard, CasinoSection } from "./CasinoStyles";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Casino({ link }) {
    const [count, setCount] = useState(5);

    useEffect(() => {
        // Таймер обратного отсчёта
        const countdownTimer = setTimeout(() => {
            if (count > 0) {
                setCount((prevCount) => prevCount - 1);
            }
        }, 1000);

        // Перенаправление по ссылке, если обратный отсчёт завершён
        if (count === 0) {
            const redirectTimer = setTimeout(() => {
                window.location.replace(link)
            }, 3000);

            return () => clearTimeout(redirectTimer); // Очистка таймера перенаправления
        }

        return () => clearTimeout(countdownTimer); // Очистка таймера обратного отсчёта
    }, [count, link]);

    return (
        <CasinoSection>
            <CasinoCard>
                <h2>Search Casino - {count} sec.</h2>
                {count === 0 && <p>Зеркало найдено! Перенаправление...</p>}
            </CasinoCard>
            <CasinoCard>
                <Loader />
            </CasinoCard>
        </CasinoSection>
    );
}

export default Casino;

