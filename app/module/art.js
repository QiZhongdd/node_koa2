const { Movie, Music, Sentence } = require('./classic');
const { flatten } = require('lodash')
const { Op } = require('sequelize')
class Art {
    static async getFavorList(list) {
        const obj = {
            100: [],
            200: [],
            300: []
        }
        for (let k of list) {
            obj[k.type].push(k.art_id)
        }
        let result = []
        for (let k in obj) {
            if (obj[k].length) {
                result.push(await Art.getDataList(obj[k], parseInt(k)))
            }
        }
        return flatten(result)
    }
    static getDataList(ids, type) {
        let art = null;
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        };
        switch (type) {
            case 100:
                art = Movie.findAll(finder);
                break;
            case 200:
                art = Music.findAll(finder);
                break;
            case 300:
                art = Sentence.findAll(finder);
                break;
            case 400:
                break;
            default:
                break;
        }
        return art;
    }
    static async getData(artId, type, useScope = true) {
        let art = null;
        const finder = {
            where: {
                id: artId
            }
        };
        switch (type) {
            case 100:
                art = Movie.findOne(finder);
                break;
            case 200:
                art = Music.findOne(finder);
                break;
            case 300:
                art = Sentence.findOne(finder);
                break;
            case 400:
                break;
            default:
                break;

        }

        return art;
    }
}

module.exports = {
    Art
}