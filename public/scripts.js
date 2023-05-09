function displayShots() {
    let rps_checked = document.getElementById("rps").checked;
    let rpsls_checked = document.getElementById("rpsls").checked;

    if (rps_checked == false && rpsls_checked == false) {
        document.getElementById("rps").click();
    }

    let shot_options = document.getElementById("shot_options");
    let opponent_checked = document.getElementById("opponent").checked;

    if (opponent_checked) {
        shot_options.className = "active";
    } else {
        shot_options.className = "inactive";
    }
}

function displayRPSLSOptions() {
    let rps_shot_options = document.getElementsByName("rps_shot_option");

    for (let i = 0; i < rps_shot_options.length; i++) {
        let rps_shot_option = rps_shot_options[i];
        rps_shot_option.className = "active";
    }

    let rpsls_checked = document.getElementById("rpsls").checked;
    let rpsls_shot_options = document.getElementsByName("rpsls_shot_option");

    for (let i = 0; i < rpsls_shot_options.length; i++) {
        let rpsls_shot_option = rpsls_shot_options[i];

        if (rpsls_checked) {
            rpsls_shot_option.className = "active";
        } else {
            rpsls_shot_option.className = "inactive";
        }
    }
}

async function play() {
    let rps_checked = document.getElementById("rps").checked;
    let rpsls_checked = document.getElementById("rpsls").checked;

    if (rps_checked == false && rpsls_checked == false) {
        alert("Please select a game mode.");
        throw new RangeError(`Must select game mode before playing.`);
    }

    let game_options = document.getElementById("game_options");
    game_options.className = "inactive";

    let shot_options = document.getElementById("shot_options");
    shot_options.className = "inactive";

    let result = document.getElementById("result");
    result.className = "active";

    let play_button = document.getElementById("play");
    play_button.className = "inactive";

    let game_mode = rps_checked ? "rps" : "rpsls";
    let opponent_checked = document.getElementById("opponent").checked;
    let shot = "";

    if (opponent_checked) {
        let shot_option_elements = document.querySelectorAll('input[type="radio"][name*="shot_option"]');
        for (let i = 0; i < shot_option_elements.length; i++) {
            let shot_option_element = shot_option_elements[i];

            if (shot_option_element.checked) {
                shot = shot_option_element.value;
                break;
            }
        }
    }

    let api_url = `${document.baseURI}app/${game_mode}/play/${shot}`;
    let response = await fetch(api_url);
    let json = await response.json();

    console.log(json);

    if (opponent_checked) {
        let player_element = document.createElement("p");
        player_element.innerHTML = `You: ${capitalizeFirstLetter(json.player)}`;
        result.appendChild(player_element);

        let opponent_element = document.createElement("p");
        opponent_element.innerHTML = `Your opponent: ${capitalizeFirstLetter(json.opponent)}`;
        result.appendChild(opponent_element);

        let result_element = document.createElement("p");
        result_element.innerHTML = `Result: You ${json.result.toUpperCase()}`;
        result.appendChild(result_element);
    } else {
        result.innerHTML = capitalizeFirstLetter(json.player);
    }
}

function startOver() {
    let game_options = document.getElementById("game_options");
    game_options.className = "active";
    let shot_options = document.getElementById("shot_options");
    shot_options.className = "inactive";
    
    let result = document.getElementById("result");
    result.className = "inactive";
    result.innerHTML = "";
    
    let play_button = document.getElementById("play");
    play_button.className = "active";
    
    let opponent = document.getElementById("opponent");
    opponent.checked = false;
    
    let rpsls_shot_options = document.getElementsByName("rpsls_shot_option");
    
    for (let i = 0; i < rpsls_shot_options.length; i++) {
        let rpsls_shot_option = rpsls_shot_options[i];
        rpsls_shot_option.className = "inactive";
        rpsls_shot_option.checked = false;
    }
    
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    displayShots();
    document.getElementById("rps").addEventListener("click", displayShots);
    document.getElementById("rpsls").addEventListener("click", displayShots);
    document.getElementById("opponent").addEventListener("click", displayShots);
    document.getElementById("opponent").addEventListener("click", displayRPSLSOptions);
    document.getElementById("play").addEventListener("click", play);
    document.getElementById("start_over").addEventListener("click", startOver);