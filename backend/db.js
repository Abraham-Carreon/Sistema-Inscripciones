const dbData = 
{
    host: process.env.host || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || '',
    database: process.env.name || 'inscripciones'
}

export default dbData