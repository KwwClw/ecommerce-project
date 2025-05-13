const prisma = require("../config/prisma")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required!"
            })
        } else if (!password) {
            return res.status(400).json({
                message: "Password is required!"
            })
        }

        // console.log(email, password)

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        // console.log(user)

        if (user) {
            return res.status(400).json({
                message: "Email already exits!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        // console.log(hashPassword)

        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        res.send("Register Success!")
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Server Error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required!"
            })
        } else if (!password) {
            return res.status(400).json({
                message: "Password is required!"
            })
        }

        // console.log(email, password)

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        // console.log(user)

        if (!user || !user.enabled) {
            return res.status(400).json({
                message: "user not found or not enabled"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Password Invalid!"
            })
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        // console.log(payload)

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({
                    message: "Server Error"
                })
            }
            res.json({ payload, token })
        })

        // res.send("Login Success!")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.currentUser = async (req, res) => {
    try {
        res.send("Hello from current user!")
    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}
