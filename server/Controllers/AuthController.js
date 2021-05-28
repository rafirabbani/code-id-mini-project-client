import AuthHelper from '../Helper/AuthHelper'
import Config from '../../config/config'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const signIn = async (req, res) => {
    const { user_email, user_password } = req.body
    try {
        const result = await req.context.models.Users.findOne({
            where: { user_email: user_email }
        })
        if (result) {
            if (AuthHelper.authenticate(user_password, result.user_password, result.user_salt)){
                const token = jwt.sign({ _id: result.user_id }, Config.jwtSecret)
                res.cookie('token', token, {
                    expire: new Date() + 9999
                })
                return res.json({ token, users: {
                    user_id: result.user_id,
                    user_name: result.user_name,
                    user_email: result.user_email,
                    user_type: result.user_type
                }})
            }
            else {
                res.status(401)
                return res.send(`Email or Password Doesn't Match`)
            }
        }
        else {
            res.status(401)
            return res.send(`Email or Password Doesn't Match`)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500)
        return res.send('Something Happened')
    }
}

const signOut = (req, res) => {
    res.clearCookie('token' , {path: '/'})
    res.status('200')
    return res.send('Signed Out')
}

const requireSignIn = expressJwt({
    secret: Config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256']
})

export default {
    signIn,
    signOut,
    requireSignIn
}