const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));

app.post('/convert', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/", `${Date.now()}-${req.file.originalname}`);

    ffmpeg(tempPath)
        .output(targetPath)
        .audioChannels(2)
        .audioFrequency(44100)
        .audioBitrate(128)
        .on('end', () => {
            fs.unlinkSync(tempPath);
            res.sendFile(targetPath);
        })
        .run();
});

const PORT = process.env.PORT ||  3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
