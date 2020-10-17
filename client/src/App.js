import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import {
  Col,
  Container,
  Form,
  Button,
  Row
} from 'react-bootstrap';
import Toggle from 'react-toggle'

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
        <Row className="text-center">
          <Col><h1>Halloween</h1></Col>
        </Row>
        <Form>
          <Row form>
            <Col md="3">
              <Form.Group>
                <label>Enable Motion</label>
                <Toggle
                  defaultChecked={enableMotion}
                  onChange={toggleMotion}
                />
              </Form.Group>
            </Col>
            <Col md="3">
              <Form.Group>
                <label>Kid Mode</label>
                <Toggle
                  defaultChecked={enableMotion}
                  onChange={toggleMotion}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row form>
            <Col md="3" >
              <Form.Group>
                <Form.Label for="haunt-cooldown">Haunt Cooldown</Form.Label>
                <Form.Control type="text" id="haunt-cooldown" value={config.hauntCooldown} />
              </Form.Group>
            </Col>
            <Col md="3" >
              <Form.Group>
                <Form.Label for="roam-cooldown">Roam Cooldown</Form.Label>
                <Form.Control type="text" id="roam-cooldown" value={config.roamCooldown} />
              </Form.Group>
            </Col>
          </Row>
          <Row form>
            <Col md={6} >
              <Form.Group>
                <Form.Label for="motion">Motion:</Form.Label>
                <Form.Control type="text" id="motion" value={motion.toString()} />
              </Form.Group>
            </Col>
          </Row>
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
