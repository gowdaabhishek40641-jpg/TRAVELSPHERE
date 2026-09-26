/* ==========================================
   TravelSphere JavaScript
   Commit 4
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
        .getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================
   Destination Selection
========================= */

function selectDestination(city) {

    alert(
        "You selected " +
        city +
        ". Let's plan your trip!"
    );


    document
        .getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });

}