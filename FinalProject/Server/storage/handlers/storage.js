const strings = require('../../../pkg/strings');
const config = require('../../../pkg/config');

const upload = async (req, res) => {
        console.log(req.files);
    // let numOfFiles = Object.keys(req.files).length;
    
    // for (const property in req.files) {
        if(req.files.slika.size >= config.get("upload").sizeLimit){
            return res.status(413).send({success: false, message: 'Error 413! Payload too large!'});
        }
        if(!config.get("upload").imageTypes.includes(req.files.slika.mimetype) ){
            return res.status(415).send({success: false, message: 'Error 415! Unsupported Media Type!'});
        }

        let newName = strings.random(10) + "__" + req.files.slika.name;
        await req.files.slika.mv(`${__dirname}/../../../uploads/${newName}`);
        console.log(newName);
        // const info = `${__dirname}/../uploads/${newName}`;
        // const info = `http://localhost:1000${__dirname}/../uploads/${newName}`;
        const info = `http://localhost:10000/uploads/`+newName;
        // console.log(URL.createObjectURL(req.files.slika))
        // console.log(res); 
        res.status(201).send({ fileLocation: info});
    //   }
};

const download = async (req, res) => {
    let filePath = `${__dirname}/../../../uploads/${req.params.file}`;
    
    res.download(filePath, req.params.file.split('__')[1], Headers);
};

module.exports = {
    upload,
    download
};