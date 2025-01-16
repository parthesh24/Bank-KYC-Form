const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/user');
const DocumentRoutes = require('./routes/document');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/document',DocumentRoutes);

sequelize.sync() //{alter:true}
    .then(()=> console.log('Database synced'))
    .catch(err=> console.log('Error: ',err));

app.listen(3001, () => console.log("listening on http://localhost:3001")
)