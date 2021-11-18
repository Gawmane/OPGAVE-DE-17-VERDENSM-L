//Impoter fetch fra helpers fill
import { myfetch } from './helper.js'


//List funktion
const getGoalList = async() => {
    //Kalder data
    const data = await myfetch('https://api.mediehuset.net/sdg/goals');


    //laver map
    data.items.map((item) => {

            //Variabel til vores html div
            const listwrapper = document.querySelector('.listwrapper');

            //Laver div elemt til at wrappe vores data
            const divWrapper = document.createElement('div');
            //Her henter vi farve fra vores data (item color)
            divWrapper.style.backgroundColor = `#${item.color}`;

            //Opretter en h2 - innertext skriver det data der hentes fra "item titel"
            const h2 = document.createElement('h2');
            h2.innerText = item.title;
            divWrapper.append(h2);

            //Laver en ny div hvor vi indsætter vores icon fra vores data (icon)
            const icon = document.createElement('div');
            icon.innerHTML = item.icon;
            divWrapper.append(icon);

            //Vælger svg iden i "icon" for at kunne ændre bla. farve
            const svg = icon.querySelector('svg');
            svg.style.fill = '#fff';
            divWrapper.append(icon);

            //Laver a tag som skal bruges til link til ny side
            const anchor = document.createElement('a');
            anchor.innerText = 'læs mere'
            divWrapper.append(anchor);

            divWrapper.addEventListener('click', () => {
                GoalDetails(item.id)
            })

            //Sætter vores divWrapper i vores main fra HTML
            document.querySelector('main').append(divWrapper);
            listwrapper.append(divWrapper);
        })
        // GoalDetails();
}



// Liste funktion med details til modal
const GoalDetails = async(goal_id) => {
    //Kalder data fra details
    const data = await myfetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);

    //const for vores div fra html - goalmoadal
    const modal = document.querySelector('.goalmodal');


    //Gør vores div blank så den refecher når vi lukker
    modal.innerHTML = '';

    //Opretter en h1 der skriver den titel fra vores data api
    const h1 = document.createElement('h1');
    h1.innerText = data.item.title;

    //Opretter et h3 tag der skriver byline fra vores data api
    const byline = document.createElement('h3');
    byline.innerText = data.item.byline;


    //Opretter et p tag der skriver beskrivelsen fra vores data api
    const description = document.createElement('p');
    description.innerText = data.item.description;

    //Opretter et p tag der skriver vores delmål fra vores data api
    const num_targets = document.createElement('p');
    //Tilføjer selvvalg tekst (delmål:) og får herefter js til at skrive automatisk hvilket nummer det er.
    num_targets.innerText = `Delmål: ${data.item.num_targets}`;

    //Laver en ny div hvor vi indsætter vores icon fra vores data (icon)
    const icon = document.createElement('div');
    icon.innerHTML = data.item.icon;
    description.append(icon);

    //Vælger svg iden i "icon" for at kunne ændre bla. farve
    const svg = icon.querySelector('svg');
    svg.style.fill = `#${data.item.color}`;
    description.append(icon);

    //Laver en button 
    const button = document.createElement('button');
    button.innerText = 'Close';

    //Vi gør det muligt at åbne og lukke ved click på vores knap
    button.addEventListener('click', () => {
        modal.classList.toggle('active');
    })

    //Føjer h1 og button ind i vores modal div så det kun kommer frem når den er synlig
    modal.append(h1, byline, description, num_targets, button);
    modal.classList.toggle('active');

}

//funtion kald
getGoalList();