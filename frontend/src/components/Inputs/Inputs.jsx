import React from 'react'
import './inputs.css'
import { useState } from 'react';

const Inputs = () => {
    const [search, setSearch] = useState();
  return (
    <div className='inputs'>
        <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  )
}

export default Inputs