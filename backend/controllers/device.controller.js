const dao = require("../db/dao.js");


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }
    // Create a Tutorial
    // const tutorial = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     published: req.body.published ? req.body.published : false
    // };
    // Save Tutorial in the database
    dao.add(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Device."
            });
        });
};
// Retrieve all Tutorials from the database.
exports.getAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    // Tutorial.findAll({ where: condition })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });

    dao.getAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving devices"
            });
        });


    // pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(200).json(results.rows)
    // })
};

//
// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
//     Tutorial.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };
// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
//     Tutorial.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Tutorial was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Tutorial with id=" + id
//             });
//         });
//
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body
//
//     pool.query(
//         'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//         [name, email, id],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`User modified with ID: ${id}`)
//         }
//     )
// };
// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     Tutorial.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Tutorial was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Tutorial with id=" + id
//             });
//         });
//
//     const id = parseInt(request.params.id)
//
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// };
// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     const id = req.params.id;
//     Tutorial.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Tutorial was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Tutorial with id=" + id
//             });
//         });
// };
// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     const id = req.params.id;
//     Tutorial.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Tutorial was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Tutorial with id=" + id
//             });
//         });
// };