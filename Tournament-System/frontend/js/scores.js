const tournamentSelect =
document.getElementById("tournamentSelect");

const playerSelect =
document.getElementById("playerSelect");

const scoreForm =
document.getElementById("scoreForm");

const scoreStatus =
document.getElementById("scoreStatus");

// ----------------------------
// Load Tournaments
// ----------------------------

async function loadTournaments() {

    try {

        const response =
            await API.get("/tournaments");

        tournamentSelect.innerHTML =
            `<option value="">Select Tournament</option>`;

        response.data.forEach(tournament => {

            tournamentSelect.innerHTML += `

                <option value="${tournament.id}">

                    ${tournament.name}

                </option>

            `;

        });

    }

    catch (error) {

        alert(error.message);

    }

}

// ----------------------------
// Load Registered Players
// ----------------------------

async function loadRegisteredPlayers(tournamentId) {

    playerSelect.innerHTML =
        `<option value="">Loading...</option>`;

    try {

        const response =
            await API.get(

                `/tournaments/${tournamentId}/registrations`

            );

        playerSelect.innerHTML =
            `<option value="">Select Player</option>`;

        if (response.data.length === 0) {

            playerSelect.innerHTML =
                `<option value="">No Registered Players</option>`;

            return;

        }

        response.data.forEach(player => {

            playerSelect.innerHTML += `

                <option value="${player.player_id}">

                    ${player.name}

                </option>

            `;

        });

    }

    catch (error) {

        alert(error.message);

    }

}

// ----------------------------
// Tournament Changed
// ----------------------------

tournamentSelect.addEventListener(

    "change",

    function () {

        if (this.value) {

            loadRegisteredPlayers(this.value);

        }

        else {

            playerSelect.innerHTML =
                `<option value="">Select Player</option>`;

        }

    }

);

// ----------------------------
// Submit Score
// ----------------------------

scoreForm.addEventListener(

    "submit",

    async function (e) {

        e.preventDefault();

        const tournamentId =
            tournamentSelect.value;

        const playerId =
            playerSelect.value;

        const score =
            document.getElementById("score").value;

        try {

            const result =

                await API.post(

                    `/tournaments/${tournamentId}/score`,

                    {

                        playerId: Number(playerId),

                        score: Number(score)

                    }

                );

            scoreStatus.innerHTML = `

                <div class="success-box">

                    <h3>✔ Score Submitted</h3>

                    <p>${result.message}</p>

                </div>

            `;

            scoreForm.reset();

            playerSelect.innerHTML =
                `<option value="">Select Player</option>`;

        }

        catch (error) {

            scoreStatus.innerHTML = `

                <div class="error-box">

                    <h3>✖ Failed</h3>

                    <p>${error.message}</p>

                </div>

            `;

        }

    }

);

// ----------------------------
// Initial Load
// ----------------------------

loadTournaments();