import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

const pathDir = path.join(process.cwd(), '/uploads')

// Create New Movie
const createMovie = async (req, res) => {
    const Movies = req.context.models.Movies
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
            const folder = `${pathDir}/movies/`
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
        const data = new Movies(fields)
        if (Object.keys(files).length !== 0) {
            data.movie_image = files.movie_image.name
            data.movie_image_path = files.movie_image.path
        }
        try {
            const result = await Movies.create(data.dataValues)
            if (result.movie_image) {
                const title = result.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                const folder = `${pathDir}/movies/${result.movie_id}_${title}/`
                const imagePath = path.join(folder, result.movie_image)
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder)
                    fs.renameSync(result.movie_image_path, imagePath)
                }
                else {
                    fs.renameSync(result.movie_image_path, imagePath)
                }
                try {
                    const update = await Movies.update({
                        movie_image_path: imagePath
                    },
                    { returning: true, where: { movie_id: result.movie_id } })
                    if (update) {
                        return res.send(update)
                    }
                    else {
                        res.status(500)
                        fs.renameSync(imagePath, result.movie_image_path)
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

//Get All Movies
const getAllMovies = async (req, res) => {
    const Movies = req.context.models.Movies
    try {
        const result = await Movies.findAll({
            order: [
                ['movie_id', 'ASC']
            ]
        })
        return res.send(result)
    }
    catch (err) {
        return res.send(err)
    }
}

// Get Single Movie by ID
const getOneMovie = async (req, res) => {
    const Movies = req.contex.models.Movies
    try {
        const result = await Movies.findOne({
            where: { movie_id : req.params.id }
        })
        if (result) {
            return res.send(result)
        }
        else {
            res.status(404)
            return res.send('Movie not found')
        }
    }
    catch (err) {
        console.log(err)
        res.status(500)
        return res.send(err)
    }
}

// Update Single Movie by ID
const updateMovie = async (req, res) => {
    const Movies = req.context.models.Movies
    try {
        const result = await Movies.findOne({
            where: { movie_id: req.params.id }
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
                    if (dataField.movie_title) {
                        const title = dataField.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const folder = `${pathDir}/movies/${req.params.id}_${title}/`
                        const oldTitle = result.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        if (!fs.existsSync(folder)) {
                            fs.mkdirSync(folder)
                            const imagePath = path.join(folder, file.name)
                            fs.renameSync(file.path, imagePath)
                            fs.rmSync(`${pathDir}/movies/${req.params.id}_${oldTitle}`, { recursive: true })
                            file.path = imagePath
                        }
                    }
                    else {
                        const title = result.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const folder = `${pathDir}/movies/${req.params.id}_${title}/`
                        const imagePath = path.join(folder, file.name)
                        if (fs.existsSync(result.movie_image_path)) {
                            fs.unlinkSync(result.movie_image_path)
                            
                        }
                        fs.renameSync(file.path, imagePath)
                        file.path = imagePath
                    }
                })
                .on('end', () => {
                    console.log('File Uploaded')
                })
            
            form.parse(req, async(err, fields, files) => {
                if (err) {
                    res.status(400)
                    return res.send(err)
                }
                const data = new Movies(fields)
                data.movie_id = req.params.id
                if (data.movie_title === result.movie_title) {
                    if (Object.keys(files).length !== 0) {
                        if (fs.existsSync(files.movie_image.path)) {
                            fs.unlinkSync(files.movie_image.path)
                        }
                    }
                    res.status(400)
                    return res.send(`Cannot Update With Existing Name`)
                }
                else if (Object.keys(files).length !== 0) {
                    data.movie_image = files.movie_image.name 
                    data.movie_image_path = files.movie_image.path
                }
                else if (data.movie_title && Object.keys(files).length === 0) {
                    const title = data.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                    const folder = `${pathDir}/movies/${req.params.id}_${title}/`
                    if (!fs.existsSync(folder)) {
                        const oldTitle = result.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                        const imagePath = path.join(folder, result.movie_image)
                        fs.mkdirSync(folder)
                        fs.renameSync(result.movie_image_path, imagePath)
                        fs.rmSync(`${pathDir}/movies/${req.params.id}_${oldTitle}`, { recursive: true })
                        data.movie_image_path = imagePath
                    }
                }
                try {
                    const update = await Movies.update(data.dataValues, {
                        returning: true, where: { movie_id : req.params.id }
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
            return res.send('Movie not found')
        }
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
}

// Delete Single Movie by ID
const deleteMovie = async (req, res) => {
    const Movies = req.context.models.Movies
    try {
        const result = await Movies.findOne({
            where: { movie_id : req.params.id }
        })
        if (result) {
            const oldTitle = result.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
            const folder = `${pathDir}/movies/${req.params.id}_${oldTitle}`
            if (fs.existsSync(folder)) {
                fs.rmSync(folder, { recursive: true })
                console.log('File Deleted')
            }
            try {
                const destroy = await Movies.destroy({
                    where: { movie_id : req.params.id }
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
            return res.send('Movie not found')
        }
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default {
    createMovie,
    getAllMovies,
    getOneMovie,
    updateMovie,
    deleteMovie
}