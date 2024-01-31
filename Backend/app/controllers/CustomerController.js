const Customer = require('../models/CustomerModel');

module.exports = {
    index: (req, res) => {
        Customer.find({})
            .then((customers) => {

                return res.json(customers)
            }).catch((err) => {
                res.send(err)
            })
    },

    create: (req, res) => {

        Customer.findOne({ name: req.body.name })
            .then((response) => {

                if (response) {
                    res.json({
                        error: true,
                        message: 'Customer already exists'
                    })
                    return

                } else {

                    const newCustomer = new Customer(req.body)
                    newCustomer.save({ new: true })
                        .then((response) => {
                            res.json(response)
                            res.status(200)
                            return
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                }
            })
    },

    delete: (req, res) => {
        const id = req.params.id
        Customer.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(204).json({
                    id: id,
                    deleted: true
                })
            })
            .catch(err => {
                return res.status(500).json({ error: err });
            })

    },
}