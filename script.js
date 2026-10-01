const exploreBtn =
    document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", function () {

        const destination =
            document.getElementById("destinationInput")
                .value.trim();

        if (!destination) {
            alert("Please enter a destination.");
            return;
        }

        document.getElementById("planDestination")
            .value = destination;

        document.getElementById("planner")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


/* =========================
   Destination Selection
========================= */

function selectDestination(city) {

    document.getElementById("planDestination")
        .value = city;

    document.getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   Validation
========================= */

function validatePlannerInput(
    destination,
    days,
    budget,
    travelStyle
) {

    if (!destination) {
        alert("Please enter a destination.");
        return false;
    }

    if (!days || days < 1 || days > 30) {
        alert(
            "Please enter a travel duration between 1 and 30 days."
        );
        return false;
    }

    if (!budget) {
        alert("Please select a travel budget.");
        return false;
    }

    if (!travelStyle) {
        alert("Please select a travel style.");
        return false;
    }

    return true;
}


/* =========================
   Planner Form
========================= */

const plannerForm =
    document.getElementById("plannerForm");

if (plannerForm) {

    plannerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const destination =
                document.getElementById("planDestination")
                    .value.trim();

            const days =
                Number(
                    document.getElementById("days").value
                );

            const budget =
                document.getElementById("budget").value;

            const travelStyle =
                document.getElementById("travelStyle").value;

            if (
                !validatePlannerInput(
                    destination,
                    days,
                    budget,
                    travelStyle
                )
            ) {
                return;
            }

            generateTrip(
                destination,
                days,
                budget,
                travelStyle
            );

        }
    );

}


/* =========================
   Budget Profile
========================= */

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

    return profiles[budget] ||
        profiles.Standard;
}


/* =========================
   Activity Generator
========================= */

function getActivities(style) {

    const activities = {

        Adventure: {

            morning:
                "Explore a famous local attraction",

            afternoon:
                "Try an exciting outdoor activity",

            evening:
                "Discover local food and nightlife"

        },

        Relaxation: {

            morning:
                "Enjoy a peaceful breakfast",

            afternoon:
                "Visit a relaxing scenic location",

            evening:
                "Enjoy a calm dinner and sunset"

        },

        Culture: {

            morning:
                "Visit a historical landmark",

            afternoon:
                "Explore a museum or cultural center",

            evening:
                "Experience local food and traditions"

        },

        Family: {

            morning:
                "Enjoy a family-friendly attraction",

            afternoon:
                "Visit a fun activity center",

            evening:
                "Enjoy a family dinner"

        }

    };

    return activities[style] ||
        activities.Culture;
}


/* =========================
   Generate Trip
========================= */

function generateTrip(
    destination,
    days,
    budget,
    travelStyle
) {

    const result =
        document.getElementById(
            "plannerResult"
        );

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

    const dailyBudget =
        totalBudget / days;

    const activities =
        getActivities(travelStyle);

    let itinerary = "";

    for (
        let day = 1;
        day <= days;
        day++
    ) {

        itinerary += `

            <div class="day-card">

                <h4>
                    Day ${day}
                </h4>

                <p>
                    🌅
                    <strong>Morning:</strong>
                    ${activities.morning}
                    in ${destination}.
                </p>

                <p>
                    ☀️
                    <strong>Afternoon:</strong>
                    ${activities.afternoon}.
                </p>

                <p>
                    🌙
                    <strong>Evening:</strong>
                    ${activities.evening}.
                </p>

                <div class="day-budget">

                    💰 Daily estimated cost:
                    $${dailyBudget.toFixed(0)}

                </div>

            </div>

        `;

    }


    result.innerHTML = `

        <div class="generated-result">

            <div class="result-icon">
                🗺️
            </div>

            <h3>
                ${destination} Itinerary
            </h3>

            <p>
                Your personalized
                ${travelStyle.toLowerCase()}
                travel plan is ready.
            </p>


            <div class="trip-summary">

                <div class="summary-box">

                    📍

                    <strong>
                        ${destination}
                    </strong>

                </div>


                <div class="summary-box">

                    📅

                    <strong>
                        ${days} Days
                    </strong>

                </div>


                <div class="summary-box">

                    💰

                    <strong>
                        ${budget}
                    </strong>

                </div>


                <div class="summary-box">

                    🎯

                    <strong>
                        ${travelStyle}
                    </strong>

                </div>

            </div>


            <div class="budget-analytics">

                <h4>
                    💰 Budget Analytics
                </h4>


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
                        🍽️ Food
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
                        Estimated Total
                    </span>

                    <strong>
                        $${totalBudget}
                    </strong>

                </div>

            </div>


            <div class="plan-highlight">

                💵

                Estimated daily average:

                <strong>
                    $${dailyBudget.toFixed(0)}
                </strong>

            </div>


            <div class="itinerary">

                ${itinerary}

            </div>

        </div>

    `;


    addGeneratedTime();

    addTripActions();


    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================
   Generated Time
========================= */

function addGeneratedTime() {

    const result =
        document.getElementById(
            "plannerResult"
        );

    const oldTime =
        result.querySelector(
            ".trip-generated-time"
        );

    if (oldTime) {
        oldTime.remove();
    }

    const timestamp =
        document.createElement("p");

    timestamp.className =
        "trip-generated-time";

    timestamp.textContent =
        `Generated on ${
            new Date().toLocaleString(
                "en-IN",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            )
        }`;

    result.appendChild(timestamp);

}


/* =========================
   Copy Plan
========================= */

function copyTripPlan() {

    const result =
        document.getElementById(
            "plannerResult"
        );

    const text =
        result.innerText.trim();

    if (!text) {

        alert(
            "Generate a trip plan first."
        );

        return;
    }

    navigator.clipboard
        .writeText(text)
        .then(function () {

            alert(
                "Trip plan copied successfully!"
            );

        })
        .catch(function () {

            alert(
                "Unable to copy the trip plan."
            );

        });

}


/* =========================
   Print Plan
========================= */

function printTripPlan() {

    const result =
        document.getElementById(
            "plannerResult"
        );

    if (!result.innerText.trim()) {

        alert(
            "Generate a trip plan first."
        );

        return;
    }

    const printWindow =
        window.open("", "_blank");

    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the trip plan."
        );

        return;
    }

    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                TravelSphere Trip Plan
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    color: #18202f;
                    line-height: 1.6;
                }

                h1 {
                    color: #087cff;
                }

                .budget-row,
                .budget-total {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                }

                .budget-total {
                    font-size: 18px;
                    font-weight: bold;
                }

                .day-card {
                    padding: 20px;
                    margin: 15px 0;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    page-break-inside: avoid;
                }

                #tripActions {
                    display: none;
                }

            </style>

        </head>

        <body>

            <h1>
                🌍 TravelSphere
            </h1>

            ${result.innerHTML}

        </body>

        </html>

    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(function () {

        printWindow.print();

    }, 500);

}


/* =========================
   Trip Actions
========================= */

function addTripActions() {

    const result =
        document.getElementById(
            "plannerResult"
        );

    const oldActions =
        document.getElementById(
            "tripActions"
        );

    if (oldActions) {
        oldActions.remove();
    }

    const actions =
        document.createElement(
            "div"
        );

    actions.id =
        "tripActions";

    actions.innerHTML = `

        <button
            type="button"
            class="trip-action-btn"
            onclick="copyTripPlan()">

            📋 Copy Plan

        </button>

        <button
            type="button"
            class="trip-action-btn"
            onclick="printTripPlan()">

            🖨️ Print Plan

        </button>

    `;

    result.appendChild(actions);

}


/* =========================
   Reset Planner
========================= */

const resetBtn =
    document.getElementById(
        "resetBtn"
    );

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "plannerForm"
                )
                .reset();

            document
                .getElementById(
                    "plannerResult"
                )
                .innerHTML = `

                    <div class="result-icon">
                        ✈️
                    </div>

                    <h3>
                        Your Trip Plan
                    </h3>

                    <p>
                        Fill in the planner to generate
                        your day-by-day itinerary.
                    </p>

                `;

        }
    );

}