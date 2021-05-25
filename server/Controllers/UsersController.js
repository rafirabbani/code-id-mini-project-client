import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

const pathDir = path.join(__dirname, '../../uploads')

// Create New User
const createUser = async (req, res) => {
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
            res.Status(400)
            res.send(err)
        }
        const data = new req.context.models.Users(fields)
        if (Object.keys(files).length !== 0) {
            data.user_avatar = files.user_avatar.name
            data.user_avatar_path = files.user_avatar.path
        }
        try {
            const result = await req.context.models.Users.create(data.dataValues)
            //console.log(result)
            return res.send(result)
        }
        catch (err) {
            res.status(400)
            res.send(err.fields)
        }
    })
}

// Get All User
const getAllUsers = async (req, res) => {
    try {
        const result = await req.context.models.Users.findAll({
            order: [
                ['user_id', 'ASC']
            ]
        });
        return res.send(result)
    }
    catch (err) {
        return res.send(err)
    }
}

// Get Single User by id
const getOneUser = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: { user_id: req.params.id }
    })
    if (result) {
        return res.send(result)
    }
    else {
        res.status(404)
        res.send('User Not Found')
    }
}

// Update Single User by ID
const updateUser = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: {user_id: req.params.id}
    })
    if (result) {
        //console.log(result.dataValues)
        const dataField = {}
        const form = formidable({
            multiples: true,
            uploadDir: pathDir,
            keepExtensions: true
        });
        form 
            .on('fileBegin', (keyName, file) => {
                //console.log(file)
                if (file) {
                    const userName = result.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                    if (fs.existsSync(`${pathDir}/users/${userName}`)) {

                        fs.rm(`${pathDir}/users/${userName}`, {recursive: true}, (err) => {
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
                //console.log(file.path)
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
            })
            .on('end', () => {
                console.log('File Uploaded Successfully')
                //return res.send('hi')
            })
        form.parse(req, async(err, fields, files) => {
            if (err) {
                res.status(400)
                res.send(err)
            }
            const data = new req.context.models.Users(fields)
            data.user_id = req.params.id
            if (Object.keys(files).length !== 0) {
                data.user_avatar = files.user_avatar.name
                data.user_avatar_path = files.user_avatar.path
                //console.log(data)
            }
            else {
                //console.log(data.dataValues)
                if(data.dataValues.user_name) {
                    const userName = data.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
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
            }
            try {
                //console.log(data.dataValues)
                const update = await req.context.models.Users.update(data.dataValues, 
                    { returning: true, where: { user_id: req.params.id }});
                return res.send(update)
            }
            catch (err) {
                res.status(400)
                res.send(err.fields)
            }
        })
    }
    else {
        res.status(404)
        res.send('User not found')
    }
}


// Delete Single User by ID
const deleteUser = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: {user_id: req.params.id}
    })
    if (result) {
        const userName = result.dataValues.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
        let folder = pathDir + `/users/${userName}/`
        if (fs.existsSync(folder)) {
            fs.rm(folder, {recursive: true}, async (err) => {
                if (err) throw err
                    console.log('image deleted')
            })
        }
        try {
            const result = await req.context.models.Users.destroy({
                where: {user_id: req.params.id}
            })
            return res.send('deleted ' + result + ' row')
        }
        catch (err) {
            res.status(500)
            res.send(err)
        }
    }
    else {
        res.status(404)
        res.send('User Not Found')
    }    
}


export default {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}