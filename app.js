const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require ('./config/db.js');
const JWT = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes.js');
const cookieParser = require('cookie-parser');
const skillRoutes = require('./routes/skillRoutes.js');
const settingsRoutes = require('./routes/settingsRoutes.js');
const errorHandler = require("./middleware/errorHandler.js");
const app = express();
const {v2: cloudinary} = require('cloudinary');
const multer = require('multer');
const helmet = require('helmet');
const {title} = require('process');
const cors = require('cors');
const fs = require('fs');


// tarteaucitron.user.abtastyID = 'id';
// (tarteaucitron.job = tarteaucitron.job || []).push('abtasty');


app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));

app.use('api/users',userRoutes);
app.use('api/skills',skillRoutes);
app.use('api/settings',settingsRoutes);

app.use(cors());

app.set('view engine', 'ejs');
app.set('views','./views');

const DB_URI = process.env.DB_URI;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

cloudinary.config({ 
    cloud_name: 'duca2mjpm', 
    api_key: '632563349422154', 
    api_secret: 'lniPToKWEcETRbWK5zgl0Wi8C3A'
    });

    const upload = multer({ dest: 'uploads/' });

    mongoose.connect(`mongodb+srv://gerard:gerard@clustertoday.ax26b.mongodb.net/`)
    
    .then(() => {
        console.log(`Connecté à MongoDB`);
    })
    .catch((err) => {
        console.error('Error:' ,err);
    });

  
    app.post('/upload', upload.single('skillFile'), async (req, res) => {
        const {title, description} = req.body;
        try {
            if(!req.file){
                return res.status(400).json({error: `Aucune image chargée.`});
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'images',
            });
            fs.unlinkSync(req.file.path);
            const skill = new Skill({
                title,
                description,
                public_id: uploadResult.public_id,
                url: uploadResult.secure_url,
            });
            await skill.save();
            res.status(201).json({skill});
        } catch (error) {
            console.error(`Erreur sur le chargement de l'image.`,error);
            res.status(500).json({error: `Erreur lors du chargement.`});
        }
    })
    
      app.get('/skill', async (req, res) => {
        try {
            const skill = await Skill.find();
            res.json({skill})
        } catch (error) {
           console.error(`Erreur de chargement`, error);
           
            res.status(500).json({error: `Erreur lors du chargement.`});
        }
    });
    
    app.put('/skill/:id', async (req, res) => {   const {id} = req.params;
        const {title, description} = req.body;
        try {
            const skill = await Skill.findByIdAndUpdate(
                id,
                {title, description},
                {new: true}
            );
            if(!skill){
                return res.status(500).json(message, `Image non chargée.`);
            }
            res.json({skill});
        } catch (error) {
            console.error(`Erreur de chargement.`, error);
        }
    });
    
    app.delete('/skill/:id', async (req, res) => {
        const {id}= req.params;
        try {
            const skill = await Skill.finfByIdAndDelete(id);
            if(!skill){
                return res.status(404).json({error: 'Image not found'})
            }
            await cloudinary.uploader.destroy(skill.public_id);
            res.json({message: `Image supprimée.`});
        } catch (error) {
            console.error(`Erreur de suppression`, error);
            res.status(500).json({error: `La suppression s'est mal passée.`});
        }           
    });
    
    app.get('upload', (req, res) => {
        res.render('form');
    });
    
    app.use('/Uploads', express.static('Uploads'));

const PORT = process.env.PORT || 3007;


connectDB();

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port http://localhost:${PORT}`);	
    
});
