import Welcome from './Welcome/Welcome'
import Items from './Items/Items'
import World from './Scene/World'

function Home() {

  return (
    <>
      < Welcome id="welcome-sec"/>
      < Items items='TOPS' id='first-items' modelId={1}/>
      < World />
      {/* < Items items='Trousers' id='second-items'/> */}
     
    </>
  )
}

export default Home
