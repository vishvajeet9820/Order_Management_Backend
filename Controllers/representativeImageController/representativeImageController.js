const service = require('../Services/representativeImageService/representativeImageService')


function productDetailsEntry(req , res) {
    const normal = req.body;
    const complex = req.file.path;
    service.productDetailsEntry(normal , complex)
    .then(result => {
        console.log(req.file);
        res.status(201);
        res.send(req.file);
    })
} 

module.exports = {productDetailsEntry};
