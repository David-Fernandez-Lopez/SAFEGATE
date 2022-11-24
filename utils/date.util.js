
function my_birthDate(birthDate){
    return birthDate.toISOString().substring(0,10)
}

module.exports = my_birthDate