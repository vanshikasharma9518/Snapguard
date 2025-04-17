import React, { useState } from 'react'
import UploadModal from '../components/UploadModal'

const Home = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <button onClick={() => setShowModal(!showModal)}>
        Upload Media
      </button>
      {showModal && <UploadModal />}
    </div>
  )
}

export default Home