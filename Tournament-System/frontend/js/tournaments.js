const tournamentForm =
document.getElementById("tournamentForm");

const tournamentTable =
document.getElementById("tournamentTable");

let editId = null;

async function loadTournaments() {

    try {

        const result =
        await API.get("/tournaments");

        tournamentTable.innerHTML = "";

        result.data.forEach(tournament => {

            tournamentTable.innerHTML += `

            <tr>

                <td>${tournament.id}</td>

                <td>${tournament.name}</td>

                <td>${tournament.max_players}</td>

                <td>

                    ${new Date(tournament.created_at).toLocaleDateString()}

                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editTournament(

                            ${tournament.id},

                            '${tournament.name}',

                            ${tournament.max_players}

                        )">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteTournament(${tournament.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        alert(error.message);

    }

}

tournamentForm.addEventListener(

    "submit",

    async function(e){

        e.preventDefault();

        const tournament={

            name:

            document.getElementById("name").value,

            maxPlayers:

            Number(

                document.getElementById("maxPlayers").value

            )

        };

        try{

            if(editId){

                await API.put(

                    `/tournaments/${editId}`,

                    tournament

                );

                editId=null;

            }

            else{

                await API.post(

                    "/tournaments",

                    tournament

                );

            }

            tournamentForm.reset();

            loadTournaments();

        }

        catch(error){

            alert(error.message);

        }

    }

);

function editTournament(

    id,

    name,

    maxPlayers

){

    editId=id;

    document.getElementById("name").value=name;

    document.getElementById("maxPlayers").value=maxPlayers;

}

async function deleteTournament(id){

    if(!confirm("Delete Tournament?")){

        return;

    }

    try{

        await API.delete(

            `/tournaments/${id}`

        );

        loadTournaments();

    }

    catch(error){

        alert(error.message);

    }

}

loadTournaments();