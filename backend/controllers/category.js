const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        const { name } = req.body

        const category = await prisma.category.create({
            data: {
                name: name
            }
        })

        res.json({
            status: "success",
            message: "Category added successfully",
            data: category
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.list = async (req, res) => {
    try {
        const category = await prisma.category.findMany()

        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id, name } = req.params

        // console.log(id, name)

        const categoryCheck = await prisma.category.findFirst({
            where: {
                id: Number(id),
                name: name
            }
        })

        if (!categoryCheck) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        const category = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })

        res.json({
            status: "success",
            message: "Category deleted successfully",
            data: category
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}