import express from 'express'
import expressConfig from './config/expressConfig'
import mongooseConfig from './config/mongooseConfig'

const app = express()

expressConfig(app)
mongooseConfig(app)
