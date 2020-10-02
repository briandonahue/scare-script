import React, { useState, useEffect } from 'react';
import './App.scss';
import io from 'socket.io-client'
import { Input, FormGroup, Label, Col, Container, Form } from 'reactstrap';

const socket = new io({ path: '/socket' })

function App() {
  const [output, setOutput] = useState('')
  const [config, setConfig] = useState({ hauntCooldown: 0, roamCooldown: 0 })
  console.log("WHAT IS HAPPENING")
  const handleConfigChange = (newConfig) => {
    console.log("CONFIG CHANGED", newConfig)
    setConfig(newConfig)
  }
  const appendLog = (newLog) => {
    console.log("LOG CHANGED", output, newLog)
    setOutput((output) => output + '\n' + newLog)
  }

  useEffect(() => {
    socket.on('test', (msg) => {
      console.log("TEST")
      console.log(msg)
    })
    socket.on('config', (msg) => {
      console.log("CONFIG")
      handleConfigChange(msg)
    })
    socket.on('message', (msg) => {
      console.log("MESSAGE")
      appendLog(msg)
    })

    return () => socket.disconnect()
  }, [])



  return (
    <div>
      <Container style={{ marginTop: "1em" }}>
        <Form>
          <FormGroup row>
            <Label for="haunt-cooldown">Haunt Cooldown</Label>
            <Col md="3" >
              <Input type="text" id="haunt-cooldown" value={config.hauntCooldown} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="roam-cooldown">Roam Cooldown</Label>
            <Col md="3" >
              <Input type="text" id="roam-cooldown" value={config.roamCooldown} />
            </Col>
          </FormGroup>
        </Form>
        <pre>
          test
      {output}
        </pre>
      </Container>
    </div>
  );
}

export default App;
