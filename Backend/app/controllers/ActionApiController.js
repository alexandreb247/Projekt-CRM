const ActionModel = require('../models/ActionModel');

module.exports = {

    list: (req, res) => {
        ActionModel.find({})
            .then((actionsRes) => {

                return res.json(actionsRes)
            }).catch((err) => {
                res.send(err)
            })
    },

    getActions: (req, res) => {
        ActionModel.find({ clientId: req.params.id })
            .then((actionsRes) => {
                
                return res.json(actionsRes)
            }) 
    },

    addAction: (req, res) => {
        let newAction = new ActionModel({
            description: req.body.description,
            date: req.body.date,
            type: req.body.type,
            clientId: req.body.customerId,
        })

        newAction.save()
        .then((addActionRes)=>{
            return res.json(newAction)
        })
    },

    updateActionByID: (req, res) => {
        const id = req.params.id;
        ActionModel.findByIdAndUpdate(id, req.body, { new: true })
            .then(updatedAction => {
                if (!updatedAction) {
                    return res.status(404).json({ message: 'Action not found' });
                }
                res.json(updatedAction);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err.message });
            });
    },

    delete: (req, res) => {
        const id = req.params.id;
        ActionModel.findByIdAndDelete(id)
            .then(response => {
                return res.status(204).json({
                    id: id,
                    deleted: true
                })
            })
            .catch(err => {
                return res.status(500).json({ error: err });
            })
    }
}