import  Express  from 'express'
import con from '../E-commerce/connection/DBconnection.js'
import { bootstrap } from "./booststrap.js"
con
const app= Express()
bootstrap(app)