import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'

function App() {
  const [output, setOutput] = useState('')
  const [config, setConfig] = useState()
  useEffect(() => {
    const socket = new io({ path: '/socket' })
    socket.on('test', (msg) => {
      console.log(msg)
    })
    socket.on('config', (msg) => {
      console.log(msg)
      setOutput(output + '--\n' + JSON.stringify(msg))
      setConfig(msg.config)
    })
    socket.on('message', (msg) => {
      console.log(msg)
      setOutput(output + '--\n' + msg)
    })

    return () => socket.disconnect()
  }, [])



  return (
    <pre>
      test
      {output}
    </pre>
  );
}

export default App;
