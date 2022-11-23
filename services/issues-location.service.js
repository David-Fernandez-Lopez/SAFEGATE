const  axios = require("axios")


class issuesService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://maps.googleapis.com/maps/api/geocode`
        })
    }

    getlocation = (location) => {
        return this.axiosApp.get(`/json?address=${location}&key=AIzaSyBhuy5LprPAS4itHCRngqR1JYhI5NV019g`)
    }
    

    // getCharacterById = (character_id) => {
    //     return this.axiosApp.get(`/characters/${character_id}`)
    // }

    // createNewCharacter = (characterInfo) => {
    //     return this.axiosApp.post(`/characters`, characterInfo)
    // }

    // updateCharacter = (character_id, characterInfo) => {
    //     return this.axiosApp.put(`/characters/${character_id}`, characterInfo)
    // }

    // deleteCharacterById = (character_id) => {
    //     return this.axiosApp.delete(`/characters/${character_id}`)
    // }
}

module.exports = issuesService