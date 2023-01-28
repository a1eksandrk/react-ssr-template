import React from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from './App'

const app = <App />

const container = document.getElementById('root')
const root = hydrateRoot(container, app)
