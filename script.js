/* ==========================================
   TravelSphere JavaScript
   Commit 2
   ========================================== */


/* Explore Button */

const exploreBtn =
    document.getElementById("exploreBtn");


exploreBtn.addEventListener("click", () => {

    const destination =
        document.getElementById("destinationInput").value.trim();


    if (!destination) {

        alert("Please enter a destination.");

        return;
    }


    document
        .getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });
        /* ==========================================
   Destination Selection
   Commit 3
   ========================================== */

function selectDestination(city) {

    const planner =
        document.getElementById("planner");

    alert(
        "You selected " + city +
        ". Let's plan your trip!"
    );

    planner.scrollIntoView({
        behavior: "smooth"
    });

}

});