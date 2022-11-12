import React from 'react';
import ReactDom from 'react-dom';
import './popup.css'

const test = <img src="icon.png" alt="" />

const root = document.createElement('div')
document.body.appendChild(root)

ReactDom.render(test, root)

