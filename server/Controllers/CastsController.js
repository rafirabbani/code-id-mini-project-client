import fs, { mkdirSync } from 'fs'
import path from 'path'
import formidable from 'formidable'

const pathDir = path.join(process.cwd(), '/uploads')

//Create New Cast
const createCast = async (req, res) => {
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
            const folder = `${pathDir}/casts/`
            if (!fs.existsSync(folder)) {
                mkdirSync(folder)
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
        const data = new req.context.models.Casts(fields)
        //console.log(files.cast_image)
        if (Object.keys(files).length !== 0) {
            data.cast_image = files.cast_image.name
            data.cast_image_path = files.cast_image.path
            data.cast_image_size = files.cast_image.size
            data.cast_image_type = files.cast_image.type
        }
        try {
            //console.log(data.cast_name)
            const result = await req.context.models.Casts.create(data.dataValues)
            if (result.cast_image) {
                const name = result.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                const folder = `${pathDir}/casts/${result.cast_id}_${name}/`
                const imagePath = path.join(folder, result.cast_image)
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder)
                    fs.renameSync(result.cast_image_path, imagePath)
                }
                else {
                    fs.renameSync(result.cast_image_path, imagePath)
                }
                try {
                    const update = await req.context.models.Casts.update(
                        {
                            cast_image_path: imagePath
                        }, { returning: true, where: { cast_id: result.cast_id }
                    })
                    if (update) {
                        return res.send(update)
                    }
                    else {
                        res.status(500)
                        fs.renameSync(imagePath, result.cast_image_path)
                        fs.rmdirSync(folder)
                        return res.send(`Cannot Update File Path to ${imagePath}`)
                    }  
                }
                catch (err) {
                    console.log(err)
                    res.status(500)
                    return res.send(err)
                }
            }
            else {
                return res.send(result)
            }
        }
        catch (err) {
            console.log(err)
            return res.send(err)
        }
    })
}

//Get All Casts
const getAllCast = async (req, res) => {
    try {
        const result = await req.context.models.Casts.findAll()
        return res.send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500)
        return res.send(err)
    }
}

//Get Single Cast by ID
const getOneCast = async (req, res) => {
    try {
        const result = await req.context.models.Casts.findOne({
            where: { cast_id : req.params.id }
        })
        if (result) {
            //console.log(result.cast_name)
            return res.send(result)
        }
        else {
            res.status(404)
            return res.send('Cast not found')
        }
    }
    catch (err) {
        console.log(err)
        res.status(500)
        return res.send(err)
    }
}

//Update Single Cast by ID
const updateCast = async (req, res) => {
    try {
        const result = await req.context.models.Casts.findOne({
            where: { cast_id : req.params.id }
        })
        if (result) {
            const dataField = {}
            const form = formidable({
                multiples: true,
                uploadDir: pathDir,
                keepExtensions: true
            });
            form
                .on('field', (keyName, value) => {
                    dataField[keyName] = value
                })
                .on('file', (keyName, file) => {
                    if (dataField.cast_name) {
                        const name = dataField.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const folder = `${pathDir}/casts/${req.params.id}_${name}/`
                        const oldName = result.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        if (!fs.existsSync(folder)) {
                            fs.mkdirSync(folder)
                            const imagePath = path.join(folder, file.name)
                            fs.renameSync(file.path, imagePath)
                            fs.rmSync(`${pathDir}/casts/${req.params.id}_${oldName}`, { recursive: true })
                            file.path = imagePath
                        }
                    }
                    else {
                        const name = result.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const folder = `${pathDir}/casts/${req.params.id}_${name}/`
                        const imagePath = path.join(folder, file.name)
                        if (fs.existsSync(result.cast_image_path)) {
                            fs.unlinkSync(result.cast_image_path)
                            
                        }
                        fs.renameSync(file.path, imagePath)
                        file.path = imagePath
                    }
                })
                .on('end', () => {
                    console.log('File Uploaded')
                })

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.log(err)
                    res.status(400)
                    res.send(err)
                }
                const data = new req.context.models.Casts(fields)
                data.cast_id = req.params.id
                if (data.cast_name === result.cast_name) {
                    if (fs.existsSync(files.cast_image.path)) {
                        fs.unlinkSync(files.cast_image.path)
                    }
                    res.status(400)
                    return res.send(`Cannot Update With Existing Name`)
                }
                else if (Object.keys(files).length !== 0) {
                    data.cast_image = files.cast_image.name 
                    data.cast_image_path = files.cast_image.path
                    data.cast_image_size = files.cast_image.size
                    data.cast_image_type = files.cast_image.type
                }
                else if (data.cast_name && Object.keys(files).length === 0) {
                    const name = data.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                    const folder = `${pathDir}/casts/${req.params.id}_${name}/`
                    if (!fs.existsSync(folder)) {
                        const oldName = result.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const imagePath = path.join(folder, result.cast_image)
                        fs.mkdirSync(folder)
                        fs.renameSync(result.cast_image_path, imagePath)
                        fs.rmSync(`${pathDir}/casts/${req.params.id}_${oldName}`, { recursive: true })
                        data.cast_image_path = imagePath
                    }
                }
                try {
                    const update = await req.context.models.Casts.update(data.dataValues, {
                        returning: true, where: { cast_id : req.params.id }
                    })
                    return res.send(update)
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
            return res.send('Cast Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }    
}

//Delete Single Cast by ID 
const deleteCast = async (req, res) => {
    try {
        const result = await req.context.models.Casts.findOne({
            where: { cast_id : req.params.id }
        })
        if (result) {
            const oldName = result.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
            const folder = `${pathDir}/casts/${req.params.id}_${oldName}`
            if (fs.existsSync(folder)) {
                fs.rmSync(folder, { recursive: true })
                console.log('File Deleted')
            }
            try {
                const destroy = await req.context.models.aasts.destroy({
                    where: {cast_id : req.params.id }
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
            return res.send('Cast not found')
        }
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }
}

const downloadCastImage = async (req, res) => {
    try {
        const result = await req.context.models.Casts.findOne({
            where: { cast_id : req.params.id }
        })
        if (result) {
            //console.log(result.cast_name) 
            if (fs.existsSync(result.cast_image_path)) {
                return res.download(result.cast_image_path)
            }
            else {
                if (result.cast_gender == 'Male') {
                    return res.download(path.join(process.cwd(), '/server/assets/images/default-cast-male.jpg'))
                }
                else if (result.cast_gender == 'Female') {
                    return res.download(path.join(process.cwd(), '/server/assets/images/default-cast-female.jpg'))
                }
                else {
                    return res.download(path.join(process.cwd(), '/server/assets/images/popcorn-png-3.png'))
                }
            }
        }
        else {
            res.status(404)
            return res.send('Cast not found')
        }
    }
    catch (err) {
        console.log(err)
        res.status(500)
        return res.send(err)
    }
}

export default {
    createCast,
    getAllCast,
    getOneCast,
    updateCast,
    deleteCast,
    downloadCastImage
}