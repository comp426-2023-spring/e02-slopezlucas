function displayShots() {
    const rpsChecked = document.getElementById("rps").checked;
    const rpslsChecked = document.getElementById("rpsls").checked;
    if (!rpsChecked && !rpslsChecked) {
        document.getElementById("rps").click();
    }
    const shotOptions = document.getElementById("shot_options");
    const opponentChecked = document.getElementById("opponent").checked;
    shotOptions.className = opponentChecked ? "active" : "inactive";
}

function displayRPSLSOptions() {
    const rpsShotOptions = document.getElementsByName("rps_shot_option");
    rpsShotOptions.forEach(rpsShotOption => rpsShotOption.className = "active");

    const rpslsChecked = document.getElementById("rpsls").checked;
    const rpslsShotOptions = document.getElementsByName("rpsls_shot_option");
    rpslsShotOptions.forEach(rpslsShotOption => rpslsShotOption.className = rpslsChecked ? "active" : "inactive");
}

async function play() {
    const rpsChecked = document.getElementById("rps").checked;
    const rpslsChecked = document.getElementById("rpsls").checked;
    if (!rpsChecked && !rpslsChecked) {
        alert("Please select a game mode.");
        throw new RangeError(`Must select game mode before playing.`);
    }
    document.getElementById("game_options").className = "inactive";
    document.getElementById("shot_options").className = "inactive";
    document.getElementById("result").className = "active";
    document.getElementById("play").className = "inactive";

    const gameMode = rpsChecked ? "rps" : "rpsls";
    const opponentChecked = document.getElementById("opponent").checked;
    let shot = "";
    if (opponentChecked) {
        shot = document.querySelector('input[type="radio"][name*="shot_option"]:checked').value;
    }

    const apiUrl = `${document.baseURI}app/${gameMode}/play/${shot}`;
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result);
    const resultElement = document.getElementById("result");
    if (opponentChecked) {
        resultElement.innerHTML = `<p>You: ${capitalizeFirstLetter(result.player)}</p>
        <p>Your opponent: ${capitalizeFirstLetter(result.opponent)}</p>
        <p>Result: You ${result.result.toUpperCase()}</p>`;
    } else {
        resultElement.innerHTML = result.player.toUpperCase();
    }
}

function startOver() {
    document.getElementById("game_options").className = "active";
    document.getElementById("shot_options").className = "inactive";
    document.getElementById("result").className = "inactive";
    document.getElementById("play").className = "active";
    
    // Uncheck all buttons
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

/**
 * @param {*} string 
 * @returns string with first letter capitalized
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}