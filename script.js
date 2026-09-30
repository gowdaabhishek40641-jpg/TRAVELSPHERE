/* ==========================================
   TravelSphere
   Commit 7
   Trip Actions + Smart Validation
   ========================================== */


/* =========================
   Explore Button
========================= */

const exploreBtn =
    document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", function () {

        const destination =
            document
                .getElementById("destinationInput")
                .value
                .trim();

        if (!destination) {

            alert("Please enter a destination.");

            return;
        }

        document
            .getElementById("planDestination")
            .value = destination;

        document
            .getElementById("planner")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


/* =========================
   Destination Selection
========================= */

function selectDestination(city) {

    document
        .getElementById("planDestination")
        .value = city;

    document
        .getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   Smart Validation
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
                document
                    .getElementById("planDestination")
                    .value
                    .trim();

            const days =
                Number(
                    document
                        .getElementById("days")
                        .value
                );

            const budget =
                document
                    .getElementById("budget")
                    .value;

            const travelStyle =
                document
                    .getElementById("travelStyle")
                    .value;

            const valid =
                validatePlannerInput(
                    destination,
                    days,
                    budget,
                    travelStyle
                );

            if (!valid) {
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
   Budget Calculator
========================= */

function getDailyBudget(budget) {

    if (budget === "Budget") {

        return 60;

    }

    if (budget === "Standard") {

        return 120;

    }

    return 250;

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

    return activities[style];

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

    const dailyBudget =
        getDailyBudget(budget);

    const totalBudget =
        dailyBudget * days;

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
                    <strong>
                        Morning:
                    </strong>

                    ${activities.morning}
                    in ${destination}.
                </p>

                <p>
                    ☀️
                    <strong>
                        Afternoon:
                    </strong>

                    ${activities.afternoon}.
                </p>

                <p>
                    🌙
                    <strong>
                        Evening:
                    </strong>

                    ${activities.evening}.
                </p>

                <div class="day-budget">

                    💰 Estimated daily budget:
                    $${dailyBudget}

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


            <div class="plan-highlight">

                <strong>
                    💵 Estimated Trip Budget:
                    $${totalBudget}
                </strong>

            </div>


            <div class="itinerary">

                ${itinerary}

            </div>

        </div>

    `;


    addTripActions();


    addGeneratedTime();


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

    const time =
        new Date().toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

    const timestamp =
        document.createElement("p");

    timestamp.className =
        "trip-generated-time";

    timestamp.textContent =
        `Generated on ${time}`;

    result.appendChild(timestamp);

}


/* =========================
   Copy Trip Plan
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
   Print Trip Plan
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
        window.open(
            "",
            "_blank"
        );

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

                    font-family:
                        Arial,
                        sans-serif;

                    padding: 40px;

                    color: #18202f;

                    line-height: 1.6;

                }

                h1 {

                    color: #087cff;

                    margin-bottom: 25px;

                }

                h3 {

                    margin-top: 25px;

                }

                .trip-summary {

                    display: grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap: 15px;

                    margin: 20px 0;

                }

                .summary-box {

                    padding: 15px;

                    border:
                        1px solid #ddd;

                    border-radius: 10px;

                }

                .day-card {

                    padding: 20px;

                    margin: 15px 0;

                    border:
                        1px solid #ddd;

                    border-radius: 12px;

                    page-break-inside:
                        avoid;

                }

                .day-budget {

                    font-weight: bold;

                    margin-top: 15px;

                }

                .plan-highlight {

                    padding: 15px;

                    background: #eef7ff;

                    border-radius: 10px;

                }

                .trip-generated-time {

                    color: #777;

                    font-size: 12px;

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
   Trip Action Buttons
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