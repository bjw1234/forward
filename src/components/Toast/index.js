import React from 'react'
import ReactDom from 'react-dom'

import Toast from './Toast'

const toastRoot = document.createElement('div')
document.body.appendChild(toastRoot)

const getToastContainerRef = () => {
  return ReactDom.render(<Toast />, toastRoot)
}

const instance = getToastContainerRef();


export default {
  info: (text, duration) => (instance.show({ type: 'info', text, duration })),
};
