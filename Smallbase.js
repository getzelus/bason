import fs from 'fs'
import path from 'path'

export default class Smallbase{
    static PATH = './db/'

    static setPath(path){
        Smallbase.PATH = path
    }
    
    static getFile(col){
        return Smallbase.PATH + col + '.json'
    }

    static checkTypes(col, obj){
        if (typeof col !== 'string' || !col.trim()) throw new Error('Bad col parameter')
        if (typeof obj !== 'object' || obj === null) throw new Error('Bad obj paramater') 
    }

    static create(col, obj){
        Smallbase.checkTypes(col, obj)
        if (!fs.existsSync(Smallbase.PATH)) fs.mkdirSync(Smallbase.PATH)

        const now = Date.now()
        let item = {
            id: now + '-' + Math.floor(Math.random() * 100),
            timestamp: now,
            date: new Date(now).toLocaleString(),
            ...obj
        }

        let data
        if (fs.existsSync(Smallbase.getFile(col))){
            data = Smallbase.read(col)
            data.push(item)
        }else{
            data = [item]
        }
        Smallbase.write(col, data)
        return item
    }

    static fetch(col, offset = 0, limit = 1000) {
        let data = Smallbase.read(col)
        data = data.slice(offset, offset + limit)
        return data
    }

    static find(col, obj){
        Smallbase.checkTypes(col, obj)
        const data = Smallbase.read(col)
        const key = Object.keys(obj)[0]
        const item = data.find(e => e[key] == obj[key])
        return item
    }

    static findAll(col, obj) {
        Smallbase.checkTypes(col, obj)
        const data = Smallbase.read(col)
        const key = Object.keys(obj)[0]
        const items = data.filter(e => e[key] == obj[key])
        return items
    }

    static update(col, obj) {
        Smallbase.checkTypes(col, obj)
        let data = Smallbase.read(col)
        const key = Object.keys(obj)[0]
        let i = data.findIndex(e => e[key] == obj[key])
        if (i == -1) return 

        data[i] = {
            ...data[i],
            ...obj
        }
        Smallbase.write(col, data)
        return data[i]
    }

    static delete(col, obj){
        Smallbase.checkTypes(col, obj)
        let data = Smallbase.read(col)
        const key = Object.keys(obj)[0]
        let item = data.find(e => e[key] == obj[key])
        if (!item) return 

        data = data.filter(e => e[key] != obj[key])
        Smallbase.write(col, data)
        return item
    }

    static read(col){
        try {
            const data = fs.readFileSync(Smallbase.getFile(col), 'utf8')
            return JSON.parse(data)
        } catch (e) {
            throw new Error('Cant read base', e)
        }
    }

    static write(col, data){
        try {
            fs.writeFileSync(Smallbase.getFile(col), JSON.stringify(data, null, 2), 'utf8')
        } catch (e) {
            throw new Error('Cant write base', e)
        }
    }

    static erase(col){
        try{
            fs.readdirSync(Smallbase.PATH).forEach(file => {
                const filePath = path.join(Smallbase.PATH, file)
                if (col) {
                    if (file == col + '.json') fs.unlinkSync(filePath)
                } else {
                    fs.unlinkSync(filePath)
                }
            })
        }catch(e){
            throw new Error('Cant erase base', e)
        }
    }
}