import React, { useState, useEffect } from 'react';
import './App.scss';
import io from 'socket.io-client'
import { 
  Input, 
  FormGroup, 
  Label, 
  Col, 
  Container, 
  Form, 
  Button, 
  Row } from 'reactstrap';

const socket = new io({ path: '/socket' })

function App() {
  const [output, setOutput] = useState('')
  const [config, setConfig] = useState({ hauntCooldown: 0, roamCooldown: 0 })
  const [motion, setMotion] = useState(false)
  const [enableMotion, setEnableMotion] = useState(false)

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
    socket.on('motion', (msg) => {
      setMotion(msg)
    })

    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    socket.emit('enableMotion', enableMotion)

  }, [enableMotion])

  const toggleMotion = () => {
    setEnableMotion(!enableMotion)
  }


  return (
    <div>
      <Container style={{ marginTop: "1em" }}>
        <Form>
          <Row>
            <Col>
            <Button color="danger" onClick={() => socket.emit('scare')}>Scare!</Button>
            <Button color="success" onClick={() => socket.emit('roam')}>Roam!</Button>
            <Button color={enableMotion ? "success" : "danger"} onClick={toggleMotion}>{ enableMotion ?  "Disable Motion" : "Enable Motion" }</Button>
            <Button color="primary" onClick={() => socket.emit('skull', 0)}>Skull 1</Button>
            </Col>
          </Row>
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
          <FormGroup row>
            <Label for="motion">Motion:</Label>
            <Col md="3" >
              <Input type="text" id="motion" value={motion.toString()} />
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
