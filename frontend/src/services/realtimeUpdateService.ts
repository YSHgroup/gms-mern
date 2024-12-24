import {io} from 'socket.io-client'

const socket = io(import.meta.env.VITE_BASE_URL)

export const updateRequestRealtime = () => {
  
  // client-side
  socket.on("connect", () => {
    console.log('Turn on the real-time update request feature. ', socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on('update_request', (response) =>{
    console.log('update_request: ', response)
  })

  socket.on('update_comment', (response) =>{
    console.log('update_comment: ', response)
  })
  
  socket.on("disconnect", () => {
    console.log('close the socket server. ', socket.id); // undefined
  });

    // socket.onopen = () => {
    //     console.log('Turn on the real-time update request feature.')
    // }
    // socket.onmessage = (response) => {
    //     console.log('on message: ', response)
    // }
    
    // socket.onclose = () => {
    //     console.log('close the socket server.')
    // }
}

export const closeSocketAPI = () => {
    socket.close()
}