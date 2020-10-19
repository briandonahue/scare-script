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
  const [verticalMode, setVerticalMode] = useState(false)
  const [kidMode, setKidMode] = useState(false)

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
  useEffect(() => {
    socket.emit('verticalMode', verticalMode)

  }, [verticalMode])

  useEffect(() => {
    socket.emit('kidMode', kidMode)
  }, [kidMode])

  const toggleMotion = () => {
    setEnableMotion(!enableMotion)
  }
  const toggleVertical = () => {
    setVerticalMode(!verticalMode)
  }
  const toggleKid = () => {
    setKidMode(!kidMode)
  }


  return (
    <div>
      <Container style={{ marginTop: "1em" }}>
        <Row className="text-center">
          <Col><h1>Halloween</h1></Col>
        </Row>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <label>Vertical Mode</label>
                <Toggle
                  defaultChecked={verticalMode}
                  onChange={toggleVertical}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <label>Motion Detection</label>
                <Toggle
                  defaultChecked={enableMotion}
                  onChange={toggleMotion}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <label>Kid Mode</label>
                <Toggle
                  defaultChecked={enableMotion}
                  onChange={toggleMotion}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label for="haunt-cooldown">Haunt Cooldown</Form.Label>
                <Form.Control type="text" id="haunt-cooldown" value={config.hauntCooldown} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label for="roam-cooldown">Roam Cooldown</Form.Label>
                <Form.Control type="text" id="roam-cooldown" value={config.roamCooldown} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label for="motion">Motion:</Form.Label>
                <Form.Control type="text" id="motion" value={motion.toString()} />
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={() => socket.emit('start-roam')}>Roam</Button>
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
