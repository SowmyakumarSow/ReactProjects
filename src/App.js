import React, {memo, useState} from 'react'
import Lane from "./components/Lane"
import { useSelector, useDispatch } from 'react-redux'
import {  addLane , setStore} from './reducers'
import KandanModal from "./components/KandanModal"
import "./index.css"

function App() {
  const [isModalOpen, setIsModalOpen]=useState(false)
  const dispatch = useDispatch();
  const storeData = useSelector(state => state.lane);
  const kanbanBoard = localStorage.kanban  ? JSON.parse(window.atob(localStorage.getItem("kanban"))) : storeData;
  const laneKeys = Object.keys(kanbanBoard)
  if(window.localStorage.kanban === undefined){
    localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`)
  }

  if(storeData==={})
   dispatch(setStore(JSON.parse(window.atob(localStorage.getItem("kanban")))))
  
  console.log(kanbanBoard)
  const onAddLaneClicked = (text) => {
    let obj={};
      obj[text] = {
        laneTitle : text,
        items : [
        ]
      }
     dispatch(addLane({
       ...obj
    }))
    setIsModalOpen(false);
    localStorage.setItem("kanban", `${btoa(JSON.stringify({...storeData, ...obj}))}`)
  }
return (
  <>
  <h1 className='kanbanBoard'>Kanban board</h1>
  {laneKeys.map((lane, key) => <Lane laneData={kanbanBoard[lane]} laneName={lane} kanbanBoard={kanbanBoard} /> )}
  <div className='addLane'><button className='addLaneButton' onClick={()=>setIsModalOpen(true)}>Add lane (+)</button></div>
  {isModalOpen && <KandanModal onAddClicked={onAddLaneClicked} title={"lane"} setIsModalOpen={setIsModalOpen}/>}
  </>
)
}

export default memo(App);

