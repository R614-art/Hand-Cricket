import './Move.css'
const Move = ({move=0,round}) => {
  return (
    <div className="image-container" key={round}>
        <img src={`/moves/0.png`} alt="Fist" className="fist" />
        <img src={move===null?"moves/0.png":`moves/${move}.png`} alt="Gesture" className="gesture" />
    </div>
  )
}

export default Move
