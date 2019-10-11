import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { SnackbarProvider, useSnackbar } from 'notistack';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
  <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
    <App useSnackbar={useSnackbar} />
  </SnackbarProvider>,
  document.getElementById('root'))
