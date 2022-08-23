import { Button } from 'antd'
import React, { useState } from 'react';

const content = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
import ModalEPG from "../components/modal";

export default function Home() {
  const [visible, setVisible] = useState(false);


  function changeVisible(visible) {
    setVisible(visible)
  }
  return (
    <div style={content}>
      <Button type="primary" onClick={()=>{setVisible(true)}}>Mostrar EPG</Button>
      <ModalEPG visible={visible} update={changeVisible} />
    </div>
  )
}
