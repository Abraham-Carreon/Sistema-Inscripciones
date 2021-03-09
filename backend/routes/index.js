import express from 'express'
import entrenadores from '../controllers/controllerEntrenadores.js'
import deportes from '../controllers/controllerDeportes.js'
import { GetDeportistasID, PutDeportistasID } from '../controllers/controllerDeportistas.js'
import Administradores from '../controllers/controllerAdministradores.js'
import 
{ 
    GetAllInscripciones,
    GetInscripcionID,
    GetInscripcionIDDeporte,
    PostInscripcion,
    DeleteInscripcion 
} from '../controllers/controllerInscripciones.js'  

export const router = express.Router()

// Obtiene los entrenadores
router.get('/api/entrenadores', entrenadores)

// Obtiene todods los deportes
router.get('/api/deportes', deportes)

// Obtiene a los deportistas por su id
router.get('/api/deportistas/:id', GetDeportistasID)
// Actualiza los datos del deportista por su id
router.put('/api/deportistas/:id', PutDeportistasID)

// Validacion de usuario de los administradores
router.post('/api/administradores/', Administradores)

// Inscripciones 
// Busca todas las inscripciones
router.get('/api/inscripciones/', GetAllInscripciones)

// Busca una inscripcion por la matricula
router.get('/api/inscripciones/:id', GetInscripcionID)

// Busca las inscripciones por el  id del deporte
router.get('/api/inscripciones/deporte/:id', GetInscripcionIDDeporte)

// Ingresa la inscripcion en la base de datos
router.post('/api/inscripcion/', PostInscripcion)

// Elimina la inscripcion en la base de datos por el id de la inscripcion 
router.delete('/api/inscripcion/:id', DeleteInscripcion)

export default router