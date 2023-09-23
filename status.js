function generate_panel(day, hour) {
    console.log("D:" + day + "H:" + hour)
    if (day !=0 && day !=6) {
        if (hour >= 0 && hour < 9) {
            console.log("Fermé matin/soir");
            state = 0;
        } else {
            if (hour >= 9 && hour < 14) {
                console.log("Matin");
                state = 2;
            } else {
                if (day == 2 || day == 5) {
                    if (hour >= 14) {
                        console.log("Ouvert Après Midi et Nocturne");
                        state = 1;
                    }
                } else {
                    if (hour >= 14 && hour < 19) {
                        console.log("Ouvert Après Midi")
                        state = 1;
                    } else {
                        state = 0;
                    }
                }
            }
        }
    } else {
        console.log("Fermé Week-end");
        state = 0;
    }

    console.log(state);
    switch(state){
        case 0:
            document.getElementById("panel").src = "closed_sign.svg";
        break;
        case 1:
        document.getElementById("panel").src = "open_sign.svg";
        break;
        case 2:
        document.getElementById("panel").src = "open_pro_sign.svg";
        break;
    }
}