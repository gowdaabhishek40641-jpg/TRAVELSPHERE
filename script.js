/* ==========================================
   TravelSphere
   Commit 6
   Trip Itinerary Generator
   ========================================== */


/* =========================
   Explore Button
========================= */

const exploreBtn =
    document.getElementById(
        "exploreBtn"
    );


exploreBtn.addEventListener(
    "click",
    function () {

        const destination =
            document
                .getElementById(
                    "destinationInput"
                )
                .value
                .trim();


        if (!destination) {

            alert(
                "Please enter a destination."
            );

            return;
        }


        document
            .getElementById(
                "planDestination"
            )
            .value = destination;


        document
            .getElementById(
                "planner"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================
   Destination Selection
========================= */

function selectDestination(city) {

    document
        .getElementById(
            "planDestination"
        )
        .value = city;


    document
        .getElementById(
            "planner"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   Planner Form
========================= */

const plannerForm =
    document.getElementById(
        "plannerForm"
    );


plannerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const destination =
            document
                .getElementById(
                    "planDestination"
                )
                .value
                .trim();


        const days =
            Number(
                document
                    .getElementById(
                        "days"
                    )
                    .value
            );


        const budget =
            document
                .getElementById(
                    "budget"
                )
                .value;


        const travelStyle =
            document
                .getElementById(
                    "travelStyle"
                )
                .value;


        if (
            !destination ||
            !days ||
            !budget ||
            !travelStyle
        ) {

            alert(
                "Please complete all planner fields."
            );

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
        getActivities(
            travelStyle
        );


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


        <br>


        <div class="itinerary">

            ${itinerary}

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================
   Reset Planner
========================= */

const resetBtn =
    document.getElementById(
        "resetBtn"
    );


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