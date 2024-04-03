const Customer = require('../models/CustomerModel');

module.exports = {
    list: (req, res) => {
        Customer.find({})
            .then((customers) => {

                return res.json(customers)
            }).catch((err) => {
                res.send(err)
            })
    },


    getByID: (req, res) => {
        const id = req.params.id;
        Customer.findById(id)
            .then(customer => {
                if (!customer) {
                    return res.status(404).json({ message: 'Customer not found' });
                }
                res.json(customer);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err.message });
            });
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

    updateByID: (req, res) => {
        const id = req.params.id;
        Customer.findByIdAndUpdate(id, req.body, { new: true })
            .then(updatedCustomer => {
                if (!updatedCustomer) {
                    return res.status(404).json({ message: 'Customer not found' });
                }
                res.json(updatedCustomer);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err.message });
            });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Customer.findByIdAndDelete(id)
            .then(response => {
                if (!response) {
                    return res.status(404).json({ message: 'Customer not found' });
                }

                return res.status(200).json({ 
                    message: 'Customer deleted',
                    id: id,
                    deleted: true
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: err.message });
            });
    },
}