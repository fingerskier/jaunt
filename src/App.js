import Sprite from './lib/Sprite';

import './style/App.css'
import Sheet from './image/spritesheet.png'


export default function App() {
  return (
    <div className="App">
      <Sprite
        height={16}
        width={16}
        frames={[0, 1, 2, 3, 4]}
        spritesheet={Sheet}
        tickSpeed={1234}
      />
    </div>
  );
}