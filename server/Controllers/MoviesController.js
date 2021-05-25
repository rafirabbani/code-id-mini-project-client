import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

const pathDir = path.join(__dirname, '../../uploads')

// Create New Movie
const createMovie = async (req, res) => {
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
            let folder = pathDir + `/movies/`
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
            const movieTitle = dataField.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim();
            let folder = pathDir + `/movies/${movieTitle}`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true});
            }
            fs.rename(file.path, path.join(folder, file.name), (err) => {
                if (err) {
                    res.send(err.response)
                }
                console.log(`File moved to ${folder}`)
            })
            file.path = path.join(folder + file.name)
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
        })
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.send(err.response)
        }
        const data = new req.context.models.Movies(fields)
        if (Object.keys(files).length !== 0) {
            data.movie_image = files.movie_image.name
            data.movie_image_path = files.movie_image.path
        }
        try {
            const result = await req.context.models.Movies.create(data.dataValues)
            return res.send(result)
        }
        catch (err) {
            return res.send(err.response)
        }
    })
}

//Get All Movies
const getAllMovies = async (req, res) => {
    try {
        const result = await req.context.models.Movies.findAll({
            order: [
                ['movie_id', 'ASC']
            ]
        })
        return res.send(result)
    }
    catch (err) {
        return res.send(err.response)
    }
}

// Get Single Movie by ID
const getOneMovie = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: { movie_id: req.params.id }
    })
    if (result) {
        res.send(result)
    }
    else {
        res.status(404)
        res.send('Movie Not Found')
    }
}

// Update Single Movie by id
const updateMovie = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: {movie_id: req.params.id}
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
                const movieTitle = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                if (fs.existsSync(`${pathDir}/movies/${movieTitle}`)) {
                    fs.rmdirSync(`${pathDir}/movies/${movieTitle}`, {recursive: true})
                    console.log('File Deleted')
                }
                let folder = pathDir + `/movies/`
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
            if (dataField.movie_title === undefined) {
                const movieTitle = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/movies/${movieTitle}/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log(`File Moved to ${folder}`)
                })
                file.path = path.join(folder + file.name)
            }
            else {
                const movieTitle = dataField.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/movies/${movieTitle}/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log(`File Moved to ${folder}`)
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
        const data = new req.context.models.Movies(fields)
        data.movie_id = req.params.id
        if (Object.keys(files).length !== 0) {
            data.movie_image = files.movie_image.name
            data.movie_image_path = files.movie_image.path
            //console.log(data)
        }
        else {
            //console.log(data.dataValues)
            if(data.dataValues.movie_title) {
                const movieTitle = data.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/movies/${movieTitle}/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
                fs.rename(result.dataValues.movie_image_path, path.join(folder + result.dataValues.movie_image), (err) => {
                    if (err) throw err
                    console.log(`File Moved to ${folder}`)
                    const oldTitle = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                    fs.rmdirSync(`${pathDir}/movies/${oldTitle}`);
                });
                let newImagePath = path.join(folder + result.dataValues.movie_image)
                data.movie_image_path = newImagePath
            }
        }
        try {
            //console.log(data.dataValues)
            const update = await req.context.models.Movies.update(data.dataValues, 
                { returning: true, where: { movie_id: req.params.id }});
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
    res.send('Movie not found')
}
}

const deleteMovie = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: { movie_id: req.params.id }
    })
    if (result) {
        const movieTitle = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
        const folder = `${pathDir}/movies/${movieTitle}`
        if (fs.existsSync(folder)) {
            fs.rmdirSync(folder, { recursive: true })
            console.log('File Deleted')
        }
        try {
            const destroy = await req.context.models.Movies.destroy({
                where: { movie_id: req.params.id }
            })
            return res.send(`Deleted ${destroy} row`)
        }
        catch (err) {
            res.status(500)
            res.send(err)
        }
    }
    else {
        res.status(404)
        res.send('Movie Not Found')
    }
}

export default {
    createMovie,
    getAllMovies,
    getOneMovie,
    updateMovie,
    deleteMovie
}