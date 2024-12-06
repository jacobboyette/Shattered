
// Initialize variables
let inventory = [];
let readyToFight = false;

// DOM Elements
const storyText = document.getElementById('story-text');
const buttonSection = document.getElementById('button-section');
const crossroadsSection = document.getElementById('crossroads-section');
const inventoryDisplay = document.getElementById('inventory');
const buttonSectionDynamic = document.createElement('div');
buttonSectionDynamic.setAttribute('id', 'dynamic-buttons');
document.body.appendChild(buttonSectionDynamic);

// Data for locations, items, bosses, and requirements
const locations = {
    'apple-orchard': ['White Ash from a Burned Tree', 'Rosary', 'Really Big Stick'],
    'lake': ['Holy Water from a Shrine', 'Sacred Fire in an Oil Lamp', 'The Sword Excalibur'],
    'town': ['Spell Scroll', 'A Gallon of Salt', 'A Frying Pan'],
    'woods': ['An Axe', 'A Crucifix (gifted by a traveling priest)', 'A Maul']
};

const bosses = {
    'lake': 'Hydra',
    'apple-orchard': 'Wyrm',
    'town': 'Demon',
    'woods': 'Skinwalker Priest'
};

const bossRequirements = {
    'Hydra': ['Frying Pan', 'The Sword Excalibur', 'An Axe'],
    'Wyrm': ['Really Big Stick', 'A Gallon of Salt', 'An Axe'],
    'Demon': ['Holy Water from a Shrine', 'A Crucifix (gifted by a traveling priest)', 'Rosary'],
    'Skinwalker Priest': ['White Ash from a Burned Tree', 'Sacred Fire in an Oil Lamp', 'Spell Scroll']
};

// Event Listeners
document.getElementById('get-up-btn').addEventListener('click', () => {
    storyText.textContent = "You get out of bed, the wooden floor creaks beneath your feet. You head outside and find yourself at a crossroads.";
    buttonSection.style.display = 'none';
    crossroadsSection.style.display = 'block';
});

document.querySelectorAll('.location-btn').forEach(button => {
    button.addEventListener('click', () => {
        const location = button.getAttribute('data-location');
        showItemsAtLocation(location);
    });
});

// Functions
function showItemsAtLocation(location) {
    buttonSectionDynamic.innerHTML = ''; // Clear previous buttons
    const items = locations[location];
    storyText.textContent = `You arrive at the ${formatLocationName(location)}. Here are the items you find:`;

    // Display item buttons
    items.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.textContent = item;
        itemButton.className = 'item-btn';
        itemButton.addEventListener('click', () => addItemToInventory(item, location));
        buttonSectionDynamic.appendChild(itemButton);
    });

    // Add "Return to Crossroads" button with distinct styling
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Return to Crossroads';
    returnButton.className = 'return-btn'; // Add a distinct class for styling
    returnButton.addEventListener('click', returnToCrossroads);
    buttonSectionDynamic.appendChild(returnButton);

    crossroadsSection.style.display = 'none';
    buttonSectionDynamic.style.display = 'block';
}

function addItemToInventory(item, location) {
    if (inventory.length < 2) {
        inventory.push(item);
        updateInventoryDisplay();
        storyText.textContent = `You take the ${item} from the ${formatLocationName(location)}.`;
        buttonSectionDynamic.style.display = 'none';
        crossroadsSection.style.display = 'block';
    } else {
        alert("Your inventory is full! You can only carry two items at a time.");
    }

    if (inventory.length === 2 && !readyToFight) {
        addFightOption();
    }
}

function returnToCrossroads() {
    storyText.textContent = "You return to the crossroads, ready to explore another path.";
    buttonSectionDynamic.style.display = 'none';
    crossroadsSection.style.display = 'block';
}

function addFightOption() {
    readyToFight = true;

    // Create "Fight a Boss" button
    const fightButton = document.createElement('button');
    fightButton.textContent = 'Fight a Boss';
    fightButton.id = 'fight-boss-btn';
    fightButton.addEventListener('click', chooseBossArea);
    crossroadsSection.appendChild(fightButton);
}

function chooseBossArea() {
    crossroadsSection.style.display = 'none';
    buttonSectionDynamic.innerHTML = '';
    storyText.textContent = "Choose an area to face a challenge.";

    Object.keys(bosses).forEach(location => {
        const bossAreaButton = document.createElement('button');
        bossAreaButton.textContent = `Enter the ${formatLocationName(location)}`;
        bossAreaButton.className = 'boss-area-btn';
        bossAreaButton.addEventListener('click', () => revealBoss(location));
        buttonSectionDynamic.appendChild(bossAreaButton);
    });

    buttonSectionDynamic.style.display = 'block';
}

function revealBoss(location) {
    const boss = bosses[location];
    storyText.textContent = `As you enter the ${formatLocationName(location)}, you feel a sense of dread. Suddenly, the ${boss} emerges from the shadows. Prepare for battle!`;
    buttonSectionDynamic.style.display = 'none';

    // Start the fight
    startBossFight(boss);
}

function startBossFight(boss) {
    const requiredItems = bossRequirements[boss];
    storyText.textContent = `The ${boss} is ready to fight! Choose an item from your inventory to defeat it.`;

    // Display inventory items as buttons
    buttonSectionDynamic.innerHTML = '';
    inventory.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.textContent = item;
        itemButton.className = 'fight-item-btn';
        itemButton.addEventListener('click', () => attemptToDefeatBoss(boss, item, requiredItems));
        buttonSectionDynamic.appendChild(itemButton);
    });

    buttonSectionDynamic.style.display = 'block';
}

function attemptToDefeatBoss(boss, item, requiredItems) {
    if (requiredItems.includes(item)) {
        storyText.textContent = `You use the ${item} to fight the ${boss}. You succeed and defeat the ${boss}!`;
        buttonSectionDynamic.style.display = 'none';
        // Victory logic goes here
    } else {
        storyText.textContent = `The ${item} is ineffective against the ${boss}. You are defeated...`;
        buttonSectionDynamic.style.display = 'none';
        // Defeat logic goes here
    }
}

// DOM Element for Reset Button
const resetSection = document.getElementById('reset-section');
const resetButton = document.getElementById('reset-btn');

// Reset Button Event Listener
resetButton.addEventListener('click', resetGame);

function resetGame() {
    // Clear inventory and reset variables
    inventory = [];
    readyToFight = false;

    // Reset the game UI
    storyText.textContent = "You wake up in a bed that isn't yours in a farmhouse. The air smells of fresh hay and soil. What will you do?";
    buttonSection.style.display = 'block';
    crossroadsSection.style.display = 'none';
    buttonSectionDynamic.style.display = 'none';
    resetSection.style.display = 'none';
    updateInventoryDisplay();
}

// Modify defeat and victory logic to show the reset button
function attemptToDefeatBoss(boss, item, requiredItems) {
    if (requiredItems.includes(item)) {
        storyText.textContent = `You use the ${item} to fight the ${boss}. You succeed and defeat the ${boss}!`;
        buttonSectionDynamic.style.display = 'none';
        resetSection.style.display = 'block'; // Show the reset button
    } else {
        storyText.textContent = `The ${item} is ineffective against the ${boss}. You are defeated...`;
        buttonSectionDynamic.style.display = 'none';
        resetSection.style.display = 'block'; // Show the reset button
    }
}

function updateInventoryDisplay() {
    inventoryDisplay.textContent = inventory.join(', ') || 'None';
}

function formatLocationName(location) {
    return location.replace('-', ' ');
}
