// Load environment variables from a .env file (if you're using dotenv)
require('dotenv').config();

module.exports = {
    db: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/greencommit'
    },
    session: {
        secret: process.env.SESSION_SECRET || 'yoursecretkey'
    },
    port: process.env.PORT || 3000
};
