async function CreateCharacter(event) {

    const character_name = $('input#charName')[0].value
    const character_race = $('input#charRace')[0].value
    const character_class = $('select#classList')[0].value
    const strength = $('input#charStrength')[0].value
    const dexterity = $('input#charDexterity')[0].value
    const constitution = $('input#charConstitution')[0].value
    const intelligence = $('input#charIntelligence')[0].value
    const wisdom = $('input#charWisdom')[0].value
    const charisma = $('input#charCharisma')[0].value
    const armor = $('input#charArmor')[0].value
    const speed = $('input#charSpeed')[0].value
    const items = $('textarea#charItems')[0].value
    const flaws = $('textarea#charFlaws')[0].value
    const traits = $('textarea#charTraits')[0].value
    const notes = $('textarea#charNotes')[0].value
    const campaign_id = $('select#campaignList')[0].value
    const user_id = $('#character-builder-id')[0].attributes[2].value

    await fetch(`api/characters`, {

        method: 'POST',
        body: JSON.stringify({
            character_name,
            character_race,
            character_class,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            armor,
            speed,
            items,
            flaws,
            traits,
            notes,
            campaign_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
};


$('.character-submit-button').click((e) => {
    e.preventDefault();
    
    CreateCharacter();
})
