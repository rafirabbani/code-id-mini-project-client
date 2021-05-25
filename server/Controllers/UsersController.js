import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

const pathDir = path.join(__dirname, '../../uploads')

// Create New User
const createUser = async (req, res) => {
    //console.log(pathDir)
    const dataField = {}
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }
    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });
    form 
        .on('fileBegin', (keyName, file) => {
            let folder = pathDir + `/users/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            file.path = path.join(folder + file.name)
        })
        .on('field', (keyName, value) => {
            dataField[keyName] = value
        })
        .on('file', (keyName, file) => {
            //console.log(dataField)
            const userName = dataField.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim();
            let folder = pathDir + `/users/${userName}`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true});
            }
            fs.rename(file.path, path.join(folder, file.name), (err) => {
                if (err) throw err
                console.log(`file moved to ${folder}`)
            })
            file.path = path.join(folder + file.name)
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
        })
    form.parse(req, async(err,fields,files) => {
        if (err) {
            res.send(err.response);
        }
        const data = new req.context.models.Users(fields)
        if (Object.keys(files).length !== 0) {
            data.user_avatar = files.user_avatar.name
            data.user_avatar_path = files.user_avatar.path
        }
        try {
            const result = await req.context.models.Users.create(data.dataValues)
            return res.send(result)
        }
        catch (err) {
            return res.send(err.response)
        }
    })
}

// Get All User
const getAllUser = async (req, res) => {
    try {
        const result = await req.context.models.Users.findAll();
        return res.send(result)
    }
    catch (err) {
        return res.send(err.response)
    }
}

// Get One User by id
const getOneUser = async (req, res) => {
    try {
        const result = await req.context.models.Users.findOne({
            where: { user_id: req.params.id }
        })
        return res.send(result)
    }
    catch (err) {
        return res.send(err.response)
    }
}

// Update Single User by ID
const updateUser = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: {user_id: req.params.id}
    })
    const dataField = {}
    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });
    form 
        .on('fileBegin', (keyName, file) => {
            if (file) {
                //const path = result.dataValues.user_avatar_path
                const userName = result.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                if (path) {
                    //fs.unlinkSync(path)
                    fs.rmdir(`${pathDir}/users/${userName}`, { recursive: true }, (err) => {
                        if (err) throw err
                        console.log('File Deleted')
                    })
                }
                let folder = pathDir + `/users/`
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, {recursive: true})
                    }
                file.path = path.join(folder + file.name)
            }
        })
        .on('field', (keyName, value) => {
            dataField[keyName] = value
        })
        .on('file', (keyName, file) => {
            //console.log(dataField)
            if (dataField.user_name === undefined) {
                const userName = result.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/users/${userName}/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                    }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log('file moved')
                })
                file.path = path.join(folder + file.name)
            }
            else {
                const userName = dataField.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/movies/${userName}/`
                if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, {recursive: true})
                    }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log('file moved')
                })
                file.path = path.join(folder + file.name)
            }
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
            //return res.send('hi')
        })
    form.parse(req, async(err, fields, files) => {
        if (err) {
            res.sendStatus(400).json({
                message: err.message
            });
        }
        const data = new req.context.models.Users(fields)
        data.user_id = req.params.id
        if (Object.keys(files).length !== 0) {
            data.user_avatar = files.user_avatar.name
            data.user_avatar_path = files.user_avatar.path
            //console.log(data)
        }
        else {
            const userName = fields.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
            let folder = pathDir + `/users/${userName}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            fs.rename(result.dataValues.user_avatar_path, path.join(folder + result.dataValues.user_avatar), (err) => {
                if (err) throw err
                console.log('file moved')
                const oldName = result.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                fs.rmdirSync(`${pathDir}/users/${oldName}`);
            });
            let newUserPath = path.join(folder + result.dataValues.user_avatar)
            data.user_avatar_path = newUserPath
        }
        try {
            //console.log(data.dataValues)
            const update = await req.context.models.Users.update(data.dataValues, 
                { returning: true, where: { user_id: req.params.id }});
            return res.send(update)
        }
        catch (err) {
            res.send(err.response)
        }
    })
}

// Delete User by ID
const deleteUser = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: {user_id: req.params.id}
    })
    const userName = result.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
    let folder = pathDir + `/users/${userName}/`
    fs.rmdir(folder, {recursive: true}, async (err) => {
        if (err) throw err
        console.log('image deleted')
        try {
            const result = await req.context.models.Movies.destroy({
                where: {movie_id: req.params.id}
            })
            return res.send('deleted ' + result + ' row')
        }
        catch (err) {
            res.send(err.response)
        }
    })
}


export default {
    createUser,
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser
}