async function CreateCharacter(event) {

    const character_name = $('input#charName')[0].value
    const character_race = $('input#charRace')[0].value
    const character_class = $('select#classList')[0].value
    const strength = $('input#charStrength')[0].value
    const dexterity = $('input#charDexterity')[0].value
    const constitution = $('#constitution')[0].value
    const intelligence = $('#intelligence')[0].value
    const wisdom = $('#wisdom')[0].value
    const charisma = $('#charisma')[0].value
    const armor = $('#armor')[0].value
    const speed = $('#speed')[0].value
    const items = $('#items')[0].value
    const flaws = $('#flaws')[0].value
    const traits = $('#traits')[0].value
    const notes = $('#notes')[0].value

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


$('.character-submit-button').click((e) => {
    e.preventDefault();
    const character_name = $('select#classList')[0].value
    console.log(character_name)
})
