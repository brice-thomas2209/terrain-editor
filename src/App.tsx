import React, { useEffect } from 'react';
import './App.scss';
import { world, initWorld } from './classes/WorldInstance';
import { createClickListener } from './classes/ClickListener';
import { initGui } from './classes/DatGuiInstance';

function App() {
  useEffect(() => {
    if (!world) {
      const w = initWorld({ elementId: '#three' });
      if (w) {
        createClickListener(w.camera, w.scene);
        initGui(w);
      }
    }
  }, []);

  return (
    <div className="App">
      <main id="three" />
    </div>
  );
}

export default App;
