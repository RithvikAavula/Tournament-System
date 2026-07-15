const playerForm = document.getElementById("playerForm");

const playerTable = document.getElementById("playerTable");

let editId = null;

async function loadPlayers() {

    try {

        const result = await API.get("/players");

        playerTable.innerHTML = "";

        result.data.forEach(player => {

            playerTable.innerHTML += `

            <tr>

                <td>${player.id}</td>

                <td>${player.name}</td>

                <td>${player.email}</td>

                <td>${player.country}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editPlayer(${player.id},'${player.name}','${player.email}','${player.country}')">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deletePlayer(${player.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        alert(error.message);

    }

}

playerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const player = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        country: document.getElementById("country").value

    };

    try {

        if (editId) {

            await API.put(`/players/${editId}`, player);

            editId = null;

        }

        else {

            await API.post("/players", player);

        }

        playerForm.reset();

        loadPlayers();

    }

    catch (error) {

        alert(error.message);

    }

});

function editPlayer(id, name, email, country) {

    editId = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("country").value = country;

}

async function deletePlayer(id) {

    if (!confirm("Delete this player?")) {

        return;

    }

    try {

        await API.delete(`/players/${id}`);

        loadPlayers();

    }

    catch (error) {

        alert(error.message);

    }

}

loadPlayers();