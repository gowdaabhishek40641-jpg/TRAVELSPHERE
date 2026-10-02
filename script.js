/* =========================================================
   TRAVELSPHERE — SMART TRAVEL PLANNER
   Commit 9 — Destination Details Experience
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
   DESTINATION DETAILS MODAL
   ========================================================= */

function showDestinationDetails(city) {

    const destination = destinationData[city];

    if (!destination) {
        console.warn("Destination not found:", city);
        return;
    }

    closeDestinationDetails();

    const modal = document.createElement("div");

    modal.className = "destination-modal-overlay";
    modal.id = "destinationDetailsModal";

    modal.innerHTML = `
        <div class="destination-modal-card">

            <button
                class="destination-modal-close"
                onclick="closeDestinationDetails()"
                aria-label="Close destination details"
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

                    <h2>${city}</h2>

                    <p>${destination.country}</p>
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

                <h3>📍 Top Attractions</h3>

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

                <h3>💡 Travel Tips</h3>

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

    document.body.classList.add("modal-open");

    requestAnimationFrame(() => {
        modal.classList.add("active");
    });


    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeDestinationDetails();
        }

    });


    document.addEventListener(
        "keydown",
        handleDestinationEscape
    );
}


/* =========================================================
   CLOSE DESTINATION MODAL
   ========================================================= */

function closeDestinationDetails() {

    const modal = document.getElementById(
        "destinationDetailsModal"
    );

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    setTimeout(() => {

        modal.remove();

        document.body.classList.remove("modal-open");

    }, 250);

    document.removeEventListener(
        "keydown",
        handleDestinationEscape
    );
}


/* =========================================================
   ESC KEY
   ========================================================= */

function handleDestinationEscape(event) {

    if (event.key === "Escape") {
        closeDestinationDetails();
    }
}


/* =========================================================
   PLAN FROM DESTINATION DETAILS
   ========================================================= */

function planDestinationFromDetails(city) {

    closeDestinationDetails();

    setTimeout(() => {

        selectDestination(city);

        if (planner) {
            planner.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }, 300);
}


/* =========================================================
   ADD DETAILS BUTTONS TO DESTINATION CARDS
   ========================================================= */

function initializeDestinationDetails() {

    const cards = document.querySelectorAll(
        ".destination-card"
    );

    cards.forEach(card => {

        const heading = card.querySelector("h3");

        if (!heading) {
            return;
        }

        const city = heading.textContent.trim();

        if (!destinationData[city]) {
            return;
        }

        if (
            card.querySelector(
                ".destination-details-btn"
            )
        ) {
            return;
        }

        const button = document.createElement("button");

        button.className =
            "destination-details-btn";

        button.type = "button";

        button.innerHTML =
            "Explore Details →";

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                showDestinationDetails(city);

            }
        );

        card.appendChild(button);

    });
}


/* =========================================================
   EXPLORE BUTTON
   ========================================================= */

if (exploreBtn) {

    exploreBtn.addEventListener(
        "click",
        function () {

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

    return profiles[budget] || profiles.Standard;
}


/* =========================================================
   ACTIVITY GENERATOR
   ========================================================= */

function generateActivities(city, style) {

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

    if (!planDestination || !daysInput || !budgetInput) {
        return false;
    }

    const city = planDestination.value.trim();

    const days = Number(daysInput.value);

    const budget = budgetInput.value;

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
                Number(daysInput.value);

            const budget =
                budgetInput.value;

            const style =
                travelStyleInput
                    ? travelStyleInput.value
                    : "Adventure";


            const profile =
                getBudgetProfile(budget);


            const accommodation =
                profile.accommodation * days;

            const food =
                profile.food * days;

            const transport =
                profile.transport * days;

            const activitiesCost =
                profile.activities * days;

            const totalBudget =
                accommodation +
                food +
                transport +
                activitiesCost;

            const dailyAverage =
                totalBudget / days;


            const activities =
                generateActivities(
                    city,
                    style
                );


            let itineraryHTML = "";


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


            plannerResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* =========================================================
   COPY TRIP PLAN
   ========================================================= */

function copyTripPlan() {

    if (!plannerResult) {
        return;
    }

    const text =
        plannerResult.innerText;

    navigator.clipboard
        .writeText(text)
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
   PRINT TRIP PLAN
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

                .day-number {
                    font-weight: bold;
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
   RESET PLANNER
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
   INITIALIZE
   ========================================================= */

function initializeTravelSphere() {

    initializeDestinationDetails();

}


/* =========================================================
   DOM READY
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTravelSphere
    );

} else {

    initializeTravelSphere();

}