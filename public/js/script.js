
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

campaignBtn.on("click", (event) => {
    const user_id = event.target.attributes[2].value;
    const campaign = event.target.id;
    characterInput.empty();


        $.get("/api/characters").then(function (character) {


            character.forEach((index) => {
                if (index.user_id == user_id && index.campaign_id == campaign) {

                    $(".character-input").append(`<h2>Name: ${index.character_name}</h3>
    <div class="charRaceClass">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>RACE</label>
            <h3 class="charInfo">${index.character_race}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>CLASS</label>
            <h3 class='charInfo'> ${index.character_class}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>STRENGTH</label>
            <h3 class="charInfo">${index.strength}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>DEXTERITY</label>
            <h3 class='charInfo'> ${index.dexterity}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>CONSTITUTION</label>
            <h3 class='charInfo'> ${index.constitution}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>INTELLIGENCE</label>
            <h3 class='charInfo'> ${index.intelligence}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>WISDOM</label>
            <h3 class='charInfo'> ${index.wisdom}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>CHARISMA</label>
            <h3 class='charInfo'> ${index.charisma}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        <div class="charInfoBlock">
            <label class='charInfoLabel'>ITEMS</label>
            <h3 class="charInfo">${index.items}</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>TRAITS</label>
            <h3 class="charInfo">${index.traits}$</h3>
        </div>
        <div class="charInfoBlock">
            <label class='charInfoLabel'>FLAWS</label>
            <h3 class='charInfo'> ${index.flaws}</h3>
        </div>
    </div>
    <div class="charInfoAttr">
        
        <div class="charInfoBlock">
            <label class='charInfoLabel'>NOTES</label>
            <h3 class='charInfo'> ${index.notes}</h3>
        </div>
    </div>`)

                }

            })
        })
})





