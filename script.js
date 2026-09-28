/* ==========================================
   TravelSphere
   Commit 5
   Smart Travel Planner
   ========================================== */


/* =========================
   Explore Button
========================= */

const exploreBtn =
    document.getElementById("exploreBtn");


exploreBtn.addEventListener("click", () => {

    const destination =
        document
            .getElementById("destinationInput")
            .value
            .trim();


    if (!destination) {

        alert(
            "Please enter a destination."
        );

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
   Planner Form
========================= */

const plannerForm =
    document.getElementById("plannerForm");


plannerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const destination =
            document
                .getElementById("planDestination")
                .value
                .trim();


        const days =
            document
                .getElementById("days")
                .value;


        const budget =
            document
                .getElementById("budget")
                .value;


        const travelStyle =
            document
                .getElementById("travelStyle")
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


    result.innerHTML = `

        <div class="generated-result">

            <div class="result-icon">
                ✈️
            </div>

            <h3>
                Your Trip Plan
            </h3>

            <p>
                📍 Destination:
                <strong>
                    ${destination}
                </strong>
            </p>

            <p>
                📅 Duration:
                <strong>
                    ${days} days
                </strong>
            </p>

            <p>
                💰 Budget:
                <strong>
                    ${budget}
                </strong>
            </p>

            <p>
                🎯 Travel Style:
                <strong>
                    ${travelStyle}
                </strong>
            </p>


            <div class="plan-highlight">

                <strong>
                    🌎 TravelSphere Recommendation
                </strong>

                <p>
                    Enjoy a ${days}-day
                    ${travelStyle.toLowerCase()}
                    journey in ${destination}
                    with a ${budget.toLowerCase()}
                    budget.
                </p>

            </div>

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}