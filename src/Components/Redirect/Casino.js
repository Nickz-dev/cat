import { CasinoCard, CasinoSection } from "./CasinoStyles";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Casino({ link }) {
    const [count, setCount] = useState(5);
    const [visits, setVisits] = useState(null);

    useEffect(() => {
        const API_URL = "https://api.jsonbin.io/v3/b/6754a2d2ad19ca34f8d74471";
        const API_KEY = "$2a$10$PvH8tIjkRk/gfW3h1uziKOVeQJVQiEdENDICCBHbg8nwkuASpqlVG";
        fetch(API_URL, {
            headers: {
                "X-Master-Key": API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const currentVisits = data.record.visits;
                setVisits(currentVisits);

                // Увеличение счётчика
                fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": API_KEY,
                    },
                    body: JSON.stringify({ visits: currentVisits + 1 }),
                });
            })
            .catch((error) => console.error("Ошибка при работе с API:", error));
    }, []);

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
                window.location.href = link;
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
            {visits !== null && (
                <CasinoCard>
                    <p>Всего переходов: {visits}</p>
                </CasinoCard>
            )}
            <CasinoCard>
                <Loader />
            </CasinoCard>
        </CasinoSection>
    );
}

export default Casino;

