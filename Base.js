import fs from 'fs'
import path from 'path'

export default class Base{
    static PATH = './db/'

    static setPath(path){
        Base.PATH = path
    }
    
    static getFile(col){
        return Base.PATH + col + '.json'
    }

    static checkTypes(col, obj){
        if (typeof col !== 'string' || !col.trim()) throw new Error('Bad col parameter')
        if (typeof obj !== 'object' || obj === null) throw new Error('Bad obj paramater') 
    }

    static create(col, obj){
        Base.checkTypes(col, obj)
        if (!fs.existsSync(Base.PATH)) fs.mkdirSync(Base.PATH)

        const now = Date.now()
        let item = {
            id: now + '-' + Math.floor(Math.random() * 100),
            timestamp: now,
            date: new Date(now).toLocaleString(),
            ...obj
        }

        let data
        if (fs.existsSync(Base.getFile(col))){
            data = Base.read(col)
            data.push(item)
        }else{
            data = [item]
        }
        Base.write(col, data)
        return item
    }

    static fetch(col, offset = 0, limit = 1000) {
        let data = Base.read(col)
        data = data.slice(offset, offset + limit)
        return data
    }

    static find(col, obj){
        Base.checkTypes(col, obj)
        const data = Base.read(col)
        const key = Object.keys(obj)[0]
        const item = data.find(e => e[key] == obj[key])
        return item
    }

    static findAll(col, obj) {
        Base.checkTypes(col, obj)
        const data = Base.read(col)
        const key = Object.keys(obj)[0]
        const items = data.filter(e => e[key] == obj[key])
        return items
    }

    static update(col, obj) {
        Base.checkTypes(col, obj)
        let data = Base.read(col)
        const key = Object.keys(obj)[0]
        let i = data.findIndex(e => e[key] == obj[key])
        if (i == -1) return 

        data[i] = {
            ...data[i],
            ...obj
        }
        Base.write(col, data)
        return data[i]
    }

    static delete(col, obj){
        Base.checkTypes(col, obj)
        let data = Base.read(col)
        const key = Object.keys(obj)[0]
        let item = data.find(e => e[key] == obj[key])
        if (!item) return 

        data = data.filter(e => e[key] != obj[key])
        Base.write(col, data)
        return item
    }

    static read(col){
        try {
            const data = fs.readFileSync(Base.getFile(col), 'utf8')
            return JSON.parse(data)
        } catch (e) {
            throw new Error('Cant read base', e)
        }
    }

    static write(col, data){
        try {
            fs.writeFileSync(Base.getFile(col), JSON.stringify(data, null, 2), 'utf8')
            console.log('Fichier écrit avec succès')
        } catch (e) {
            throw new Error('Cant write base', e)
        }
    }

    static erase(col){
        try{
            fs.readdirSync(Base.PATH).forEach(file => {
                const filePath = path.join(Base.PATH, file)
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