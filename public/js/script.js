
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