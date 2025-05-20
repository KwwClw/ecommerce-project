const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        const { brand, model, description, categoryId, variant, collaboration, colorway, gender, sizetype, sizes, releaseDate, includedAccessories, islimitedEdition, price, images } = req.body

        const formattedSizes = sizes.map((item) => ({
            size: `${sizetype} ${item.size}`,
            quantity: item.quantity
        }));

        // รวม quantity ทั้งหมด
        const totalQuantity = formattedSizes.reduce((sum, s) => sum + s.quantity, 0);

        console.log({ brand, model, description, categoryId, variant, collaboration, colorway, gender, sizetype, sizes, formattedSizes, releaseDate, includedAccessories, islimitedEdition, price, totalQuantity, images })

        // return res.status(200).json({ message: "debugger" });

        const product = await prisma.product.create({
            data: {
                brand: brand,
                model: model,
                description: description,
                categoryId: parseInt(categoryId),

                variants: {
                    create: [
                        {
                            variant: variant,
                            collaboration: collaboration,
                            colorway: colorway,
                            gender: gender,
                            sizes: {
                                createMany: {
                                    data: formattedSizes
                                }
                            },
                            releaseDate: new Date(releaseDate),
                            includedAccessories: includedAccessories,
                            islimitedEdition: islimitedEdition,
                            price: parseFloat(price),
                            quantity: parseInt(totalQuantity),

                            images: {
                                create: images.map((item, index) => ({
                                    asset_id: item.asset_id,
                                    public_id: item.public_id,
                                    url: item.url,
                                    secure_url: item.secure_url,
                                }))
                            }
                        }
                    ]
                }
            }
        })

        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.list = async (req, res) => {
    try {
        res.send("Hello from list product")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.update = async (req, res) => {
    try {
        res.send("Hello from update product")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.remove = async (req, res) => {
    try {
        res.send("Hello form remove product")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.listby = async (req, res) => {
    try {
        res.send("Hello from listby product")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.searchFilters = async (req, res) => {
    try {
        res.send("Hello from searchFilters")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}