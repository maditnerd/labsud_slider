// Définition des noms de jours et des couleurs associées
const days_name = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
];

const days_color = [
    "#3498db", // Bleu clair
    "#e74c3c", // Rouge corail
    "#2ecc71", // Vert émeraude
    "#f39c12", // Jaune orangé
    "#9b59b6", // Violet
    "#d35400"  // Vert turquoise
];

// Définition des noms de mois
const month_name = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
]

// Initialisation d'un tableau pour les événements de la semaine
const week_events = [];
for (let i = 0; i <= 6; i++) {
    week_events[i] = [];
}

week_range = null;

function create_calendar(offset){
    // Obtention de la plage de la semaine en cours
    console.log("OFFSET:" + offset);
    week_range = get_range_of_week(offset);
    if(offset == 0){
        text = "Cette semaine : ";
    } else {
        text = "La semaine prochaine : ";
    }
    document.getElementById("title").innerHTML = text + "Du " +
        week_range[0].getDate() + " " + month_name[week_range[0].getMonth()]
        + " au " +
        week_range[1].getDate() + " " + month_name[week_range[1].getMonth()];

    // Chargement des données depuis un fichier JSON
    fetch('calendar.json')
        .then(response => response.json())
        .then(data => {
            // Maintenant, 'data' contient le contenu du fichier JSON
            console.log(data);
            get_events_for_week(data); // Filtrer les événements pour la semaine en cours
            generate_calendar(); // Générer le calendrier
        })
        .catch(error => {
            console.error('Une erreur s\'est produite :', error);
        });
}


// Fonction pour formater l'heure des événements
function format_time(event) {
    // Créez des objets Date à partir des propriétés eventStart et eventEnd
    const event_start = new Date(event.eventStart);
    const event_end = new Date(event.eventEnd);

    // Obtenez le temps en millisecondes pour event_start et event_end
    const event_start_time = event_start.getTime();
    const event_end_time = event_end.getTime();

    // Formatez les temps en heures et minutes
    const formatted_start = new Date(event_start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const formatted_end = new Date(event_end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return formatted_start + " à " + formatted_end;
}

// Fonction pour obtenir la plage de la semaine en cours
function get_range_of_week(weekOffset = 0) {
const curr = new Date(); // Obtenir la date actuelle
curr.setHours(0, 0, 0, 0); // Réinitialiser l'heure
curr.setDate(curr.getDate() + (weekOffset * 7)); // Avancer de x semaines

const first = curr.getDate() - curr.getDay() + 1; // Premier jour de la semaine
const last = first + 6; // Dernier jour de la semaine

return [new Date(curr.setDate(first)), new Date(curr.setDate(last))];
}

// Fonction pour filtrer les événements pour la semaine en cours
function get_events_for_week(events) {
    events.forEach(function (element) {
        const eventStart = new Date(element.eventStart);

        if (eventStart >= week_range[0] && eventStart <= week_range[1]) {
            week_events[new Date(element.eventStart).getDay()].push(element);
        }
    });
}

// Fonction pour générer le calendrier
function generate_calendar() {
    const table = document.createElement("table");

    for (let day = 0; day < 6; day++) {
        console.log("Ajout de ligne");
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.width = "15%";
        cell.style = "color:" + days_color[day] + ";";
        cell.innerHTML = "<center>" + days_name[day] + "</center>";
        console.log(day + 1);

        for (let e = 0; e < week_events[day + 1].length; e++) {
            console.log("Ajout de cellule " + e);
            const cell = row.insertCell();
            cell.style = "font-size:30px;" + "color:" + days_color[day] + ";";
            cell.innerHTML = "<center>"
                + "<timer>" + format_time(week_events[day + 1][e]) + "</timer>"
                + "<br>"
                + week_events[day + 1][e].summary
                + "</center>";
        }
    }

    document.body.appendChild(table);
}

