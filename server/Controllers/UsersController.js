import fs from 'fs'
import path from 'path'
import formidable from 'formidable'
import AuthHelper from '../Helper/AuthHelper'

const pathDir = path.join(process.cwd(), '/uploads')

// Create New User
const createUser = async (req, res) => {
    //console.log(pathDir)
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }
    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    })

    form 
        .on('fileBegin', (keyName, file) => {
            //console.log(file)
            const folder = `${pathDir}/users/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder)
            }
            file.path = path.join(folder, file.name)
        })
        .on('end', () => {
            console.log('File Uploaded')
        })
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400)
            return res.send(err)
        }
        const data = new req.context.models.Users(fields)
        const salt = AuthHelper.makeSalt()
        const hashPassword = AuthHelper.hashPassword(data.user_password, salt)
        data.user_salt = salt
        data.user_password = hashPassword
        //console.log(files.user_avatar)
        if (Object.keys(files).length !== 0) {
            data.user_avatar = files.user_avatar.name
            data.user_avatar_path = files.user_avatar.path
        }
        try {
            const result = await req.context.models.Users.create(data.dataValues)
            //return res.send(result)
            if (result.user_avatar) {
                const name = result.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                const folder = `${pathDir}/users/${result.user_id}_${name}/`
                const avatarPath = path.join(folder, result.user_avatar)
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder)
                    fs.renameSync(result.user_avatar_path, avatarPath)
                }
                else {
                    fs.renameSync(result.user_avatar_path, avatarPath)
                }
                try {
                    const update = await req.context.models.Users.update(
                        {
                            user_avatar_path: avatarPath
                        }, { attributes: { exclude: ['user_salt', 'user_password', 'user_type'] }, 
                        returning: true, where: { user_id: result.user_id }, 
                        
                    })
                    if (update) {
                        return res.send(update)
                    }
                    else {
                        res.status(500)
                        fs.renameSync(avatarPath, result.user_avatar_path)
                        fs.rmdirSync(folder)
                        return res.send(`Cannot Update File Path to ${avatarPath}`)
                    }  
                }
                catch (err) {
                    console.log(err)
                    return res.status(500).send(err)
                }
            }
            else {
                return res.send(result)
            }
        }
        catch (err) {
            //console.log(err)
            if (Object.keys(files).length !== 0) {
                fs.rmSync(files.user_avatar.path)
            }
            
            return res.status(400).send(err)
        }
    })
}

// Get All User
const getAllUsers = async (req, res) => {
    try {
        const result = await req.context.models.Users.findAll({
            order: [
                ['user_id', 'ASC']
            ],
            attributes: { exclude: ['user_salt', 'user_password'] },
            include: req.context.models.Carts
        })
        return res.send(result)
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }
}

// Get Single User by id
const getOneUser = async (req, res) => {
    try { 
        const result = await req.context.models.Users.findOne({
            where: { user_id: req.params.id }, 
            attributes: { exclude: ['user_salt', 'user_password'] },
            include: [req.context.models.Carts]

        })
        if (result) {
            return res.send(result)
        }
        else {
            console.log(result)
            res.status(404)
            return res.send('User Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

// Update Single User by ID
const updateUser = async (req, res) => {
    try {
        const result = await req.context.models.Users.findOne({
            where: { user_id: req.params.id }
        })
        if (result) {
            const dataField = {}
            const form = formidable({
                multiples: true,
                uploadDir: pathDir,
                keepExtensions: true
            })

            form
                .on('field', (keyName, value) => {
                    dataField[keyName] = value
                })
                .on('file', (keyName, file) => {
                    const oldName = result.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                    const oldFolder = `${pathDir}/users/${req.params.id}_${oldName}/`
                    if (dataField.user_name) {
                        const newName = dataField.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const newFolder = `${pathDir}/users/${req.params.id}_${newName}/`
                        const avatarPath = path.join(newFolder, file.name)
                        if (!fs.existsSync(newFolder)) {
                            fs.mkdirSync(newFolder)
                            fs.renameSync(file.path, avatarPath)
                            fs.rmSync(`${pathDir}/users/${req.params.id}_${oldName}`, { recursive: true })
                            file.path = avatarPath
                        }
                    }
                    else {
                        const avatarPath = path.join(oldFolder, file.name)
                        if (fs.existsSync(result.user_avatar_path)) {
                            fs.unlinkSync(result.user_avatar_path)
                        }
                        fs.renameSync(file.path, avatarPath)
                        file.path = avatarPath
                    }
                })
                .on('end', () => {
                    console.log('File Uploaded')
                })

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    res.status(400)
                    return res.send(err)
                }
                const data = new req.context.models.Users(fields)
                data.user_id = req.params.id
                if (data.user_password) {
                    const oldSalt = result.user_salt
                    if (AuthHelper.hashPassword(data.user_password, oldSalt) === result.user_password) {
                        res.status(400)
                        return res.send('Cannot Use Same Password as Before')
                    } else {
                        const salt = AuthHelper.makeSalt()
                        const hashPassword = AuthHelper.hashPassword(data.user_password, salt)
                        data.user_salt = salt
                        data.user_password = hashPassword
                    }
                }
                if (data.user_name === result.user_name) {
                    if (fs.existsSync(files.user_avatar.path)) {
                        fs.unlinkSync(files.user_avatar.path)
                    }
                    res.status(400)
                    return res.send(`Cannot Update With Existing Name`)
                }
                else if (Object.keys(files).length !== 0) {
                    data.user_avatar = files.user_avatar.name 
                    data.user_avatar_path = files.user_avatar.path
                }
                else if (data.user_name && Object.keys(files).length === 0) {
                    const name = data.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                    const folder = `${pathDir}/users/${req.params.id}_${name}/`
                    if (!fs.existsSync(folder)) {
                        const oldName = result.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const avatarPath = path.join(folder, result.user_avatar)
                        fs.mkdirSync(folder)
                        fs.renameSync(result.user_avatar_path, avatarPath)
                        fs.rmSync(`${pathDir}/users/${req.params.id}_${oldName}`, { recursive: true })
                        data.user_avatar_path = avatarPath
                    }
                }
                try {
                    const update = await req.context.models.Users.update(data.dataValues, {
                        /* returning: true, */ where: { user_id : req.params.id },
                        attributes: { exclude: ['user_salt', 'user_password'] }
                    })
                    return res.send('Data Updated')
                }
                catch (err) {
                    console.log(err)
                    res.status(400)
                    return res.send(err)
                }
            })
        }
        else {
            res.status(404)
            return res.send(`User Not Found`)
        }
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }
}


// Delete Single User by ID
const deleteUser = async (req, res) => {
    try {
        const result = await req.context.models.Users.findOne({
            where: { user_id : req.params.id }
        })
        if (result) {
            const oldName = result.user_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
            const folder = `${pathDir}/users/${req.params.id}_${oldName}`
            if (fs.existsSync(folder)) {
                fs.rmSync(folder, { recursive: true })
                console.log('File Deleted')
            }
            try {
                const destroy = await req.context.models.Users.destroy({
                    where: { user_id : req.params.id }
                })
                return res.send(`Deleted ${destroy} row`)
            }
            catch(err) {
                console.log(err)
                res.send(err)
            }
        }
        else {
            res.status(404)
            return res.send('User not found')
        }
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }  
}

const downloadUserAvatar = async (req, res) => {
    try {
        const result = await req.context.models.Users.findOne({
            where: { user_id: req.params.id }, 
            attributes: { exclude: ['user_salt', 'user_password'] }

        })
        if (result) {
            if (fs.existsSync(result.user_avatar_path)) {
                return res.download(result.user_avatar_path)
            }
            else {
                if (result.user_gender === 'Male') {
                    return res.download(path.join(process.cwd(),'/server/assets/images/default-male.png'))
                }
                else if (result.user_gender === 'Female') {
                    return res.download(path.join(process.cwd(),'/server/assets/images/default-female.png'))
                }
                else {
                    return res.download(path.join(process.cwd(),'/server/assets/images/popcorn-png-3.png'))
                }
            }
        }
        else {
            console.log(result)
            res.status(404)
            return res.send('User Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export default {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    downloadUserAvatar
}