const tournamentSelect =
document.getElementById("tournamentSelect");

const leaderboardTable =
document.getElementById("leaderboardTable");

const loadButton =
document.getElementById("loadLeaderboard");

const playerIdInput =
document.getElementById("playerIdInput");

const loadPlayerRankButton =
document.getElementById("loadPlayerRank");

const playerRankCard =
document.getElementById("playerRankCard");

// --------------------
// Load Tournaments
// --------------------

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

// --------------------
// Load Leaderboard
// --------------------

async function loadLeaderboard() {

    const tournamentId =
        tournamentSelect.value;

    if (!tournamentId) {

        alert("Please select a tournament.");

        return;

    }

    try {

        const response =
            await API.get(

                `/tournaments/${tournamentId}/leaderboard`

            );

        leaderboardTable.innerHTML = "";

        if (response.data.length === 0) {

            leaderboardTable.innerHTML =

            `<tr>

                <td colspan="4">

                    No scores available.

                </td>

            </tr>`;

            return;

        }

        response.data.forEach(player => {

            leaderboardTable.innerHTML += `

                <tr>

                    <td>${player.rank}</td>

                    <td>${player.name}</td>

                    <td>${player.country}</td>

                    <td>${player.score}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        alert(error.message);

    }

}

// --------------------
// Load Player Rank
// --------------------

async function loadPlayerRank() {

    const tournamentId = tournamentSelect.value;
    const playerId = playerIdInput.value;

    if (!tournamentId) {

        alert("Please select a tournament.");
        return;

    }

    if (!playerId) {

        alert("Please enter a player ID.");
        return;

    }

    try {

        const response = await API.get(
            `/tournaments/${tournamentId}/player/${playerId}`
        );

        const player = response.data;

        playerRankCard.innerHTML = `
            <div class="rank-badge">#${player.rank}</div>
            <h3>${player.name}</h3>
            <p><strong>Score:</strong> ${player.score}</p>
            <p><strong>Country:</strong> ${player.country}</p>
        `;

    }

    catch (error) {

        playerRankCard.innerHTML = `
            <div class="error-box">
                <h3>Unable to load rank</h3>
                <p>${error.message}</p>
            </div>
        `;

    }

}

loadButton.addEventListener(

    "click",

    loadLeaderboard

);

loadPlayerRankButton.addEventListener(

    "click",

    loadPlayerRank

);

loadTournaments();