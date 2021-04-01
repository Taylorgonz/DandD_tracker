
classArray = [
    "Select a class",
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
]

const classList = () => {
    classArray.forEach(index => {
        const classSelection = $(`<option value="${index}">${index}</option>`)
        $("#classList").append(classSelection);
    })
}
classList();


const campaignBtn = $(".campaign-option-btn");
const characterInput = $('.character-input')
console.log(characterInput)

// displays character associated with campaign available
campaignBtn.on("click", (event) => {
    const user_id = event.target.attributes[2].value;
    const campaign = event.target.id;
    characterInput.empty();


    // api request to return available characters
    $.get("/api/characters").then(function (character) {


        character.forEach((index) => {
            if (index.user_id == user_id && index.campaign_id == campaign) {

                $(".character-input").append(`
                <div class='hitBlock'>
                <div class="hitPointBlock">
                <label class='charInfoLabel'>CURRENT HITPOINTS</label>
                <h3 class="charInfo hitPoints" id="hitpoints_current" >${index.hitpoints_current}</h3>
            </div>
            <div class="hitPointBlock">
                <label class='charInfoLabel'>TEMPORARY HITPOINTS</label>
                <h3 class='charInfo hitPoints' id="hitpoints_temp" > ${index.hitpoints_temp}</h3>
            </div>
            <div class="hitPointBlock">
                <label class='charInfoLabel'>HIT DICE</label>
                <h3 class='charInfo hitPoints' id="hit_dice" > ${index.hit_dice}</h3>
            </div>
                
                </div>
                <span id="character_name" value='${index.id}'>Name: <h2 class='profileHeader'> ${index.character_name}</h2></span>
    <div class="charRaceClass">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>RACE</label>
            <h3 class="charInfo" id="character_race" >${index.character_race}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>CLASS</label>
            <h3 class='charInfo' id="character_class" > ${index.character_class}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>STRENGTH</label>
            <h3 class="charInfo" id="strength" >${index.strength}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>DEXTERITY</label>
            <h3 class='charInfo' id="dexterity" > ${index.dexterity}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>CONSTITUTION</label>
            <h3 class='charInfo' id="constitution" > ${index.constitution}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>INTELLIGENCE</label>
            <h3 class='charInfo' id="intelligence" > ${index.intelligence}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>WISDOM</label>
            <h3 class='charInfo' id="wisdom" > ${index.wisdom}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>CHARISMA</label>
            <h3 class='charInfo' id="charisma" > ${index.charisma}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>ARMOR</label>
            <h3 class="charInfo" id="armor" >${index.armor}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>SPEED</label>
            <h3 class='charInfo' id="speed" > ${index.speed}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>ITEMS</label>
            <h3 class="charInfo" id="items" >${index.items}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>TRAITS</label>
            <h3 class="charInfo" id="traits" >${index.traits}$</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>FLAWS</label>
            <h3 class='charInfo' id="flaws" > ${index.flaws}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        
        <div class="charInfoBlock">
            <label class='charInfoLabel'>NOTES</label>
            <h3 class='charInfo' id="notes" > ${index.notes}</h3>
        </div>
    </div>
    
    <button id="edit">EDIT</button>`)

            }


        })
        const editBtn = $('button#edit')
        const saveBtn = $('button.saveBtn')


        editBtn.click((e) => {

            if (e.target.innerHTML == "EDIT") {
                e.target.innerHTML = "SAVE"
                $('.charInfo').attr('contenteditable', 'true')
            }
            else {
                editCharacterForm()
                e.target.innerHTML = "EDIT";
                $('.charInfo').removeAttr('contenteditable')
            }

        })

    })

})

// edit Character form function
async function editCharacterForm(event) {

    const id = $('#character_name')[0].attributes[1].value
    const character_race = $('#character_race')[0].innerHTML.trim()
    const character_class = $('#character_class')[0].innerHTML.trim()
    const strength = $('#strength')[0].innerHTML.trim()
    const dexterity = $('#dexterity')[0].innerHTML.trim()
    const constitution = $('#constitution')[0].innerHTML.trim()
    const intelligence = $('#intelligence')[0].innerHTML.trim()
    const wisdom = $('#wisdom')[0].innerHTML.trim()
    const charisma = $('#charisma')[0].innerHTML.trim()
    const armor = $('#armor')[0].innerHTML.trim()
    const speed = $('#speed')[0].innerHTML.trim()
    const items = $('#items')[0].innerHTML.trim()
    const flaws = $('#flaws')[0].innerHTML.trim()
    const traits = $('#traits')[0].innerHTML.trim()
    const notes = $('#notes')[0].innerHTML.trim()

    await fetch(`api/characters/${id}`, {

        method: 'PUT',
        body: JSON.stringify({
            character_race,
            character_class,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            items,
            flaws,
            traits,
            notes,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
};







