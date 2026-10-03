/* =========================================================
   TRAVELSPHERE — SMART TRAVEL PLANNER
   COMMIT 10 — LIVE TRAVEL DATA
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const exploreBtn = document.getElementById("exploreBtn");
const destinationInput = document.getElementById("destinationInput");
const planner = document.getElementById("planner");

const planDestination = document.getElementById("planDestination");
const plannerForm = document.getElementById("plannerForm");
const daysInput = document.getElementById("days");
const budgetInput = document.getElementById("budget");
const travelStyleInput = document.getElementById("travelStyle");

const plannerResult = document.getElementById("plannerResult");
const resetBtn = document.getElementById("resetBtn");


/* =========================================================
   DESTINATION DATABASE
   ========================================================= */

const destinationData = {

    Dubai: {
        country: "United Arab Emirates",
        emoji: "🏙️",
        category: "Luxury • Adventure • Shopping",
        rating: "4.8/5",
        bestTime: "November – March",
        dailyCost: "$120 – $250",

        latitude: 25.2048,
        longitude: 55.2708,

        currency: "AED",

        description:
            "Dubai combines futuristic architecture, luxury shopping, desert adventures and unforgettable city experiences.",

        attractions: [
            "Burj Khalifa",
            "Dubai Mall",
            "Palm Jumeirah",
            "Dubai Marina",
            "Desert Safari",
            "Museum of the Future"
        ],

        tips: [
            "Use the Dubai Metro for affordable city travel.",
            "Book popular attractions in advance.",
            "Carry water during outdoor activities.",
            "Evenings are ideal for desert and city experiences."
        ]
    },


    Paris: {
        country: "France",
        emoji: "🗼",
        category: "Culture • Romance • Art",
        rating: "4.9/5",
        bestTime: "April – June / September – October",
        dailyCost: "$100 – $220",

        latitude: 48.8566,
        longitude: 2.3522,

        currency: "EUR",

        description:
            "Paris is famous for its architecture, museums, cafés, fashion and iconic landmarks.",

        attractions: [
            "Eiffel Tower",
            "Louvre Museum",
            "Arc de Triomphe",
            "Notre-Dame",
            "Montmartre",
            "Seine River"
        ],

        tips: [
            "Use public transportation to explore the city.",
            "Reserve museum tickets online.",
            "Explore neighbourhoods on foot.",
            "Try local cafés away from major tourist areas."
        ]
    },


    Tokyo: {
        country: "Japan",
        emoji: "🌃",
        category: "Technology • Culture • Food",
        rating: "4.9/5",
        bestTime: "March – May / October – November",
        dailyCost: "$90 – $200",

        latitude: 35.6762,
        longitude: 139.6503,

        currency: "JPY",

        description:
            "Tokyo offers a unique combination of advanced technology, traditional Japanese culture, food and entertainment.",

        attractions: [
            "Tokyo Skytree",
            "Shibuya Crossing",
            "Senso-ji Temple",
            "Akihabara",
            "Meiji Shrine",
            "Shinjuku"
        ],

        tips: [
            "Get a rechargeable transport card.",
            "Learn a few basic Japanese phrases.",
            "Keep public spaces clean and quiet.",
            "Try different neighbourhoods rather than staying in one area."
        ]
    },


    Switzerland: {
        country: "Switzerland",
        emoji: "🏔️",
        category: "Nature • Mountains • Adventure",
        rating: "5.0/5",
        bestTime: "June – September / December – February",
        dailyCost: "$150 – $350",

        latitude: 46.9480,
        longitude: 7.4474,

        currency: "CHF",

        description:
            "Switzerland is known for spectacular Alps, crystal-clear lakes, scenic trains and charming mountain villages.",

        attractions: [
            "Swiss Alps",
            "Interlaken",
            "Lucerne",
            "Jungfraujoch",
            "Lake Geneva",
            "Zermatt"
        ],

        tips: [
            "Consider a Swiss Travel Pass.",
            "Check mountain weather before travelling.",
            "Book scenic train routes early.",
            "Carry layers because mountain temperatures change quickly."
        ]
    }

};


/* =========================================================
   CURRENCY DATABASE
   ========================================================= */

const currencyRates = {

    INR: 1,

    USD: 0.0119,

    AED: 0.0437,

    EUR: 0.0102,

    JPY: 1.76,

    CHF: 0.0094

};


/* =========================================================
   DESTINATION SELECTION
   ========================================================= */

function selectDestination(city) {

    if (!destinationInput || !planDestination) {
        return;
    }

    destinationInput.value = city;

    planDestination.value = city;

    if (planner) {

        planner.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
}


/* =========================================================
   DESTINATION DETAILS
   ========================================================= */

function showDestinationDetails(city) {

    const destination =
        destinationData[city];

    if (!destination) {
        return;
    }

    closeDestinationDetails();

    const modal =
        document.createElement("div");

    modal.className =
        "destination-modal-overlay";

    modal.id =
        "destinationDetailsModal";

    modal.innerHTML = `

        <div class="destination-modal-card">

            <button
                class="destination-modal-close"
                onclick="closeDestinationDetails()"
            >
                ×
            </button>


            <div class="destination-modal-header">

                <div class="destination-modal-icon">
                    ${destination.emoji}
                </div>

                <div>

                    <span class="destination-modal-category">
                        ${destination.category}
                    </span>

                    <h2>
                        ${city}
                    </h2>

                    <p>
                        ${destination.country}
                    </p>

                </div>

            </div>


            <div class="destination-modal-description">

                <p>
                    ${destination.description}
                </p>

            </div>


            <div class="destination-details-grid">

                <div class="destination-info-box">
                    <span>⭐</span>
                    <strong>Rating</strong>
                    <p>${destination.rating}</p>
                </div>

                <div class="destination-info-box">
                    <span>🌤️</span>
                    <strong>Best Time</strong>
                    <p>${destination.bestTime}</p>
                </div>

                <div class="destination-info-box">
                    <span>💰</span>
                    <strong>Daily Cost</strong>
                    <p>${destination.dailyCost}</p>
                </div>

                <div class="destination-info-box">
                    <span>🌍</span>
                    <strong>Country</strong>
                    <p>${destination.country}</p>
                </div>

            </div>


            <div class="destination-modal-section">

                <h3>
                    📍 Top Attractions
                </h3>

                <div class="destination-attractions">

                    ${destination.attractions
                        .map(
                            attraction => `
                                <div class="destination-attraction">
                                    <span>✦</span>
                                    ${attraction}
                                </div>
                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="destination-modal-section">

                <h3>
                    💡 Travel Tips
                </h3>

                <div class="destination-tips">

                    ${destination.tips
                        .map(
                            tip => `
                                <div class="destination-tip">
                                    <span>✓</span>
                                    <p>${tip}</p>
                                </div>
                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="destination-modal-footer">

                <button
                    class="destination-plan-btn"
                    onclick="planDestinationFromDetails('${city}')"
                >
                    🧳 Plan This Trip
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);

    document.body.classList.add(
        "modal-open"
    );


    requestAnimationFrame(() => {

        modal.classList.add("active");

    });


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeDestinationDetails();

            }

        }
    );


    document.addEventListener(
        "keydown",
        handleDestinationEscape
    );

}


function closeDestinationDetails() {

    const modal =
        document.getElementById(
            "destinationDetailsModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    setTimeout(() => {

        modal.remove();

        document.body.classList.remove(
            "modal-open"
        );

    }, 250);


    document.removeEventListener(
        "keydown",
        handleDestinationEscape
    );

}


function handleDestinationEscape(event) {

    if (
        event.key === "Escape"
    ) {

        closeDestinationDetails();

    }

}


function planDestinationFromDetails(city) {

    closeDestinationDetails();

    setTimeout(() => {

        selectDestination(city);

    }, 300);

}


/* =========================================================
   DESTINATION CARD BUTTONS
   ========================================================= */

function initializeDestinationDetails() {

    const cards =
        document.querySelectorAll(
            ".destination-card"
        );


    cards.forEach(card => {

        const heading =
            card.querySelector("h3");


        if (!heading) {
            return;
        }


        const city =
            heading.textContent.trim();


        if (
            !destinationData[city]
        ) {
            return;
        }


        if (
            card.querySelector(
                ".destination-details-btn"
            )
        ) {
            return;
        }


        const button =
            document.createElement(
                "button"
            );


        button.className =
            "destination-details-btn";


        button.type =
            "button";


        button.innerHTML =
            "Explore Details →";


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                showDestinationDetails(
                    city
                );

            }
        );


        card.appendChild(button);

    });

}


/* =========================================================
   LIVE WEATHER
   ========================================================= */

async function loadWeather(city) {

    const destination =
        destinationData[city];


    if (!destination) {

        showWeatherError(
            "Weather information is unavailable for this destination."
        );

        return;

    }


    const weatherCard =
        document.getElementById(
            "weatherData"
        );


    if (!weatherCard) {
        return;
    }


    weatherCard.innerHTML = `

        <div class="live-loading">

            <div class="loading-spinner"></div>

            <p>
                Loading live weather...
            </p>

        </div>

    `;


    try {

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${destination.latitude}` +
            `&longitude=${destination.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
            `&timezone=auto`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Weather API request failed"
            );

        }


        const data =
            await response.json();


        const current =
            data.current;


        const weatherText =
            getWeatherDescription(
                current.weather_code
            );


        weatherCard.innerHTML = `

            <div class="weather-main">

                <div class="weather-temperature">

                    ${Math.round(
                        current.temperature_2m
                    )}°C

                </div>

                <div class="weather-condition">

                    ${weatherText}

                </div>

            </div>


            <div class="weather-stats">

                <div>

                    <span>💧</span>

                    <strong>
                        ${current.relative_humidity_2m}%
                    </strong>

                    <small>
                        Humidity
                    </small>

                </div>


                <div>

                    <span>💨</span>

                    <strong>
                        ${current.wind_speed_10m}
                        km/h
                    </strong>

                    <small>
                        Wind
                    </small>

                </div>


                <div>

                    <span>🕐</span>

                    <strong>
                        Live
                    </strong>

                    <small>
                        Current
                    </small>

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(
            "Weather error:",
            error
        );


        showWeatherError(
            "Unable to load live weather. Please try again."
        );

    }

}


/* =========================================================
   WEATHER DESCRIPTION
   ========================================================= */

function getWeatherDescription(code) {

    const weatherCodes = {

        0: "☀️ Clear Sky",

        1: "🌤️ Mainly Clear",

        2: "⛅ Partly Cloudy",

        3: "☁️ Overcast",

        45: "🌫️ Foggy",

        48: "🌫️ Rime Fog",

        51: "🌦️ Light Drizzle",

        53: "🌦️ Drizzle",

        55: "🌧️ Heavy Drizzle",

        61: "🌦️ Light Rain",

        63: "🌧️ Rain",

        65: "🌧️ Heavy Rain",

        71: "🌨️ Light Snow",

        73: "❄️ Snow",

        75: "❄️ Heavy Snow",

        80: "🌦️ Rain Showers",

        81: "🌧️ Rain Showers",

        82: "⛈️ Heavy Showers",

        95: "⛈️ Thunderstorm",

        96: "⛈️ Thunderstorm + Hail",

        99: "⛈️ Heavy Thunderstorm"

    };


    return (
        weatherCodes[code] ||
        "🌍 Current Weather"
    );

}


/* =========================================================
   WEATHER ERROR
   ========================================================= */

function showWeatherError(message) {

    const weatherCard =
        document.getElementById(
            "weatherData"
        );


    if (!weatherCard) {
        return;
    }


    weatherCard.innerHTML = `

        <div class="live-error">

            <span>
                ⚠️
            </span>

            <p>
                ${message}
            </p>

            <button
                onclick="loadWeatherFromPlanner()"
            >
                Try Again
            </button>

        </div>

    `;

}


/* =========================================================
   WEATHER FROM PLANNER
   ========================================================= */

function loadWeatherFromPlanner() {

    const city =
        planDestination
            ? planDestination.value
            : "";


    if (
        city &&
        destinationData[city]
    ) {

        loadWeather(city);

    }

}


/* =========================================================
   CURRENCY CONVERTER
   ========================================================= */

function convertCurrency() {

    const amountInput =
        document.getElementById(
            "currencyAmount"
        );

    const fromCurrency =
        document.getElementById(
            "fromCurrency"
        );

    const toCurrency =
        document.getElementById(
            "toCurrency"
        );

    const currencyResult =
        document.getElementById(
            "currencyResult"
        );


    if (
        !amountInput ||
        !fromCurrency ||
        !toCurrency ||
        !currencyResult
    ) {

        return;

    }


    const amount =
        Number(
            amountInput.value
        );


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        currencyResult.innerHTML =
            "Enter a valid amount.";

        return;

    }


    const fromRate =
        currencyRates[
            fromCurrency.value
        ];


    const toRate =
        currencyRates[
            toCurrency.value
        ];


    if (
        !fromRate ||
        !toRate
    ) {

        currencyResult.innerHTML =
            "Currency unavailable.";

        return;

    }


    const result =
        (amount / fromRate) *
        toRate;


    currencyResult.innerHTML = `

        <strong>
            ${result.toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 2
                }
            )}
            ${toCurrency.value}
        </strong>

        <span>
            ${amount} ${fromCurrency.value}
        </span>

    `;

}


/* =========================================================
   BUDGET PROFILE
   ========================================================= */

function getBudgetProfile(budget) {

    const profiles = {

        Budget: {
            accommodation: 30,
            food: 15,
            transport: 10,
            activities: 5
        },

        Standard: {
            accommodation: 60,
            food: 30,
            transport: 20,
            activities: 10
        },

        Luxury: {
            accommodation: 140,
            food: 60,
            transport: 35,
            activities: 15
        }

    };


    return (
        profiles[budget] ||
        profiles.Standard
    );

}


/* =========================================================
   ACTIVITIES
   ========================================================= */

function generateActivities(
    city,
    style
) {

    const activities = {

        Adventure: [
            `Explore ${city}'s outdoor attractions`,
            "Try a local adventure activity",
            "Take a scenic exploration tour",
            "Discover hidden travel spots"
        ],

        Relaxation: [
            "Enjoy a relaxing morning",
            "Visit a peaceful local attraction",
            "Enjoy a wellness experience",
            "Watch the sunset"
        ],

        Luxury: [
            "Enjoy a premium dining experience",
            "Visit an exclusive attraction",
            "Explore luxury shopping areas",
            "Enjoy an evening city experience"
        ],

        Family: [
            "Visit a family-friendly attraction",
            "Enjoy a local cultural experience",
            "Try family-friendly activities",
            "Explore a famous landmark"
        ],

        Solo: [
            "Explore the city independently",
            "Visit a local cultural attraction",
            "Try local cuisine",
            "Explore the city at your own pace"
        ],

        "Honeymoon": [
            "Enjoy a romantic city walk",
            "Have a special dinner",
            "Visit a scenic attraction",
            "Enjoy a private experience"
        ]

    };


    return (
        activities[style] ||
        activities.Adventure
    );

}


/* =========================================================
   VALIDATION
   ========================================================= */

function validatePlanner() {

    if (
        !planDestination ||
        !daysInput ||
        !budgetInput
    ) {

        return false;

    }


    const city =
        planDestination.value.trim();


    const days =
        Number(
            daysInput.value
        );


    const budget =
        budgetInput.value;


    if (!city) {

        alert(
            "Please select a destination."
        );

        planDestination.focus();

        return false;

    }


    if (
        !Number.isFinite(days) ||
        days < 1 ||
        days > 30
    ) {

        alert(
            "Trip duration must be between 1 and 30 days."
        );

        daysInput.focus();

        return false;

    }


    if (!budget) {

        alert(
            "Please select a budget."
        );

        budgetInput.focus();

        return false;

    }


    return true;

}


/* =========================================================
   GENERATE TRIP
   ========================================================= */

if (plannerForm) {

    plannerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!validatePlanner()) {
                return;
            }


            const city =
                planDestination.value.trim();


            const days =
                Number(
                    daysInput.value
                );


            const budget =
                budgetInput.value;


            const style =
                travelStyleInput
                    ? travelStyleInput.value
                    : "Adventure";


            const profile =
                getBudgetProfile(
                    budget
                );


            const accommodation =
                profile.accommodation *
                days;


            const food =
                profile.food *
                days;


            const transport =
                profile.transport *
                days;


            const activitiesCost =
                profile.activities *
                days;


            const totalBudget =
                accommodation +
                food +
                transport +
                activitiesCost;


            const dailyAverage =
                totalBudget /
                days;


            const activities =
                generateActivities(
                    city,
                    style
                );


            let itineraryHTML =
                "";


            for (
                let day = 1;
                day <= days;
                day++
            ) {

                const activity =
                    activities[
                        (day - 1) %
                        activities.length
                    ];


                itineraryHTML += `

                    <div class="itinerary-day">

                        <div class="day-number">
                            ${day}
                        </div>

                        <div class="day-content">

                            <h4>
                                Day ${day}
                            </h4>

                            <p>
                                ${activity}
                            </p>

                        </div>

                    </div>

                `;

            }


            const generatedTime =
                new Date().toLocaleString();


            plannerResult.innerHTML = `

                <div class="result-header">

                    <div>

                        <span class="result-label">
                            YOUR TRIP PLAN
                        </span>

                        <h3>
                            ${city}
                        </h3>

                        <p>
                            ${days} Days •
                            ${style} Travel •
                            ${budget} Budget
                        </p>

                    </div>

                    <div class="result-icon">
                        ✈️
                    </div>

                </div>


                <div class="budget-analytics">

                    <h3>
                        💰 Budget Analytics
                    </h3>


                    <div class="budget-row">

                        <span>
                            🏨 Accommodation
                        </span>

                        <strong>
                            $${accommodation}
                        </strong>

                    </div>


                    <div class="budget-row">

                        <span>
                            🍴 Food
                        </span>

                        <strong>
                            $${food}
                        </strong>

                    </div>


                    <div class="budget-row">

                        <span>
                            🚕 Transport
                        </span>

                        <strong>
                            $${transport}
                        </strong>

                    </div>


                    <div class="budget-row">

                        <span>
                            🎟️ Activities
                        </span>

                        <strong>
                            $${activitiesCost}
                        </strong>

                    </div>


                    <div class="budget-total">

                        <span>
                            Total Estimated Budget
                        </span>

                        <strong>
                            $${totalBudget}
                        </strong>

                    </div>


                    <div class="budget-average">

                        Average Per Day:

                        <strong>
                            $${dailyAverage.toFixed(2)}
                        </strong>

                    </div>

                </div>


                <div class="itinerary-section">

                    <h3>
                        🗓️ Your Itinerary
                    </h3>

                    ${itineraryHTML}

                </div>


                <div class="live-data-container">

                    <div class="live-data-header">

                        <div>

                            <span>
                                LIVE TRAVEL DATA
                            </span>

                            <h3>
                                ${city} Now
                            </h3>

                        </div>

                        <div class="live-indicator">
                            <span></span>
                            LIVE
                        </div>

                    </div>


                    <div
                        id="weatherData"
                        class="weather-data"
                    >

                        <div class="live-loading">

                            <div class="loading-spinner"></div>

                            <p>
                                Loading live weather...
                            </p>

                        </div>

                    </div>

                </div>


                <div class="trip-actions">

                    <button
                        type="button"
                        onclick="copyTripPlan()"
                    >
                        📋 Copy Plan
                    </button>

                    <button
                        type="button"
                        onclick="printTripPlan()"
                    >
                        🖨️ Print
                    </button>

                    <button
                        type="button"
                        onclick="resetPlanner()"
                    >
                        🔄 New Trip
                    </button>

                </div>


                <div class="generated-time">

                    Generated:
                    ${generatedTime}

                </div>

            `;


            plannerResult.classList.add(
                "result-visible"
            );


            loadWeather(city);


            plannerResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* =========================================================
   COPY
   ========================================================= */

function copyTripPlan() {

    if (!plannerResult) {
        return;
    }


    navigator.clipboard
        .writeText(
            plannerResult.innerText
        )
        .then(() => {

            alert(
                "Trip plan copied successfully!"
            );

        })
        .catch(() => {

            alert(
                "Unable to copy the trip plan."
            );

        });

}


/* =========================================================
   PRINT
   ========================================================= */

function printTripPlan() {

    if (!plannerResult) {
        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print your trip."
        );

        return;

    }


    printWindow.document.write(`

        <html>

        <head>

            <title>
                TravelSphere Trip Plan
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    line-height: 1.6;
                }

                h1,
                h2,
                h3,
                h4 {
                    color: #222;
                }

                .budget-row,
                .budget-total {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                }

                .itinerary-day {
                    display: flex;
                    gap: 15px;
                    margin: 15px 0;
                    padding: 15px;
                    border-bottom: 1px solid #ddd;
                }

                button {
                    display: none;
                }

            </style>

        </head>

        <body>

            <h1>
                TravelSphere
            </h1>

            ${plannerResult.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();


    setTimeout(() => {

        printWindow.print();

    }, 500);

}


/* =========================================================
   RESET
   ========================================================= */

function resetPlanner() {

    if (plannerForm) {
        plannerForm.reset();
    }


    if (plannerResult) {

        plannerResult.innerHTML = "";

        plannerResult.classList.remove(
            "result-visible"
        );

    }


    if (planner) {

        planner.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        resetPlanner
    );

}


/* =========================================================
   EXPLORE BUTTON
   ========================================================= */

if (exploreBtn) {

    exploreBtn.addEventListener(
        "click",
        () => {

            if (planner) {

                planner.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeTravelSphere() {

    initializeDestinationDetails();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTravelSphere
    );

} else {

    initializeTravelSphere();

}