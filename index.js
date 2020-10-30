import app from './app.js';


const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => console.log(`App running on port ${PORT}`));