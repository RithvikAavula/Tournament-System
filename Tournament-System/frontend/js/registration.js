const registrationForm =
document.getElementById("registrationForm");

const tournamentSelect =
document.getElementById("tournamentSelect");

const playerSelect =
document.getElementById("playerSelect");

const statusCard =
document.getElementById("statusCard");

async function loadTournaments(){

    const response =
    await API.get("/tournaments");

    tournamentSelect.innerHTML =
    `<option value="">Select Tournament</option>`;

    response.data.forEach(t=>{

        tournamentSelect.innerHTML +=`

        <option value="${t.id}">

            ${t.name}

        </option>

        `;

    });

}

async function loadAvailablePlayers(tournamentId){

    const response =

    await API.get(

        `/players/available/${tournamentId}`

    );

    playerSelect.innerHTML =

    `<option value="">Select Player</option>`;

    if(response.data.length===0){

        playerSelect.innerHTML=

        `<option>No Players Available</option>`;

        return;

    }

    response.data.forEach(player=>{

        playerSelect.innerHTML +=`

        <option value="${player.id}">

            ${player.name}

        </option>

        `;

    });

}

tournamentSelect.addEventListener(

"change",

function(){

    if(this.value){

        loadAvailablePlayers(

            this.value

        );

    }

}

);

registrationForm.addEventListener(

"submit",

async function(e){

    e.preventDefault();

    try{

        const result=

        await API.post(

            `/tournaments/${tournamentSelect.value}/register`,

            {

                playerId:Number(

                    playerSelect.value

                )

            }

        );

        statusCard.innerHTML=`

        <div class="success-box">

        ✔ ${result.message}

        </div>

        `;

        registrationForm.reset();

        playerSelect.innerHTML=

        `<option>Select Player</option>`;

    }

    catch(error){

        statusCard.innerHTML=`

        <div class="error-box">

        ${error.message}

        </div>

        `;

    }

}

);

loadTournaments();