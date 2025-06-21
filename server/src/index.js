import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js';

const process_env = process.env.PORT || 8000 ;

dotenv.config({
    path : "./env"
});

connectDB().then(() => {
    app.listen(process_env, () => {   
        console.log(`Server is running on port ${process_env}`);
    }); 
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
} );

