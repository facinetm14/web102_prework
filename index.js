/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
const games = [...GAMES_JSON];

function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach((el) => {
        const content =`
        <img src="${el.img}" alt="${el.name} widht="300" height="150"/>
        <h3>${el.name}</h3>
        <div>
            <p>${el.description}</p>
            <p>backers: ${el.backers}</p>
        </div>
        `;  

        const div = document.createElement('div');
        div.classList.add('game-card');
        div.innerHTML = content;
        gamesContainer.appendChild(div);
    });

    // create a new div element, which will become the game card


    // add the class game-card to the list


    // set the inner HTML using a template literal to display some info 
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")


    // append the game to the games-container

}

addGamesToPage(games);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const constributions = games.reduce((acc, el) => acc + parseInt(el.backers), 0);
contributionsCard.innerHTML = constributions.toLocaleString();
// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const amountRaised = games.reduce((acc, el) => acc + parseInt(el.pledged), 0);
raisedCard.innerHTML = `$${amountRaised.toLocaleString() }`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = games.length


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedOnlyGames = games.filter((el) => parseInt(el.pledged) < parseInt(el.goal));
    addGamesToPage(unfundedOnlyGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedOnlyGames = games.filter((el) => parseInt(el.pledged) >= parseInt(el.goal));
    addGamesToPage(fundedOnlyGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(games);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener('click', filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener('click', filterFundedOnly);
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener('click', showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedTotal = games.reduce((acc, el) => (parseInt(el.pledged) < parseInt(el.goal)) ? acc + 1 : acc, 0);
const totalAmountRaised = games.reduce((acc, el) => acc + parseInt(el.pledged), 0);

const funded = games.length - unfundedTotal;

// create a string that explains the number of unfunded games using the ternary operator
const unfundeDesc = `A total of $${totalAmountRaised.toLocaleString()} has been raised for ${funded} games. 
Currently, ${unfundedTotal} ${(unfundedTotal > 1) ? 'games remain' : 'game remains'} unfunded. 
We need your help to fund theses amazing games!`;

const p = document.createElement('p');
p.innerHTML = unfundeDesc;
descriptionContainer.appendChild(p);


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
const [first, second] = [...sortedGames.slice(0, 2).map((el) => el.name)];

// use destructuring and the spread operator to grab the first and second games
const topFunded = document.createElement('p');
topFunded.innerHTML = first;
firstGameContainer.appendChild(topFunded);

const secondTopFunded = document.createElement('p');
secondTopFunded.innerHTML = second;
secondGameContainer.appendChild(secondTopFunded);
// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

const searchBtn = document.getElementById("search-btn");
const inputSearch = document.getElementById("input-search");

const findTheGame = () => {
    const gameName = inputSearch.value;
    if (gameName) {
        const currentGames = games.filter(el => el.name.toLowerCase() == gameName.toLowerCase());
        if (!currentGames.length) {
            alert("OUPS! No game found with this name");
            return;
        }
        deleteChildElements(gamesContainer);
        addGamesToPage(currentGames);
    }
}
searchBtn.addEventListener('click', findTheGame);