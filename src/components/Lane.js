import React, { useState} from "react"
import Item from "./Item";
import { useDispatch } from 'react-redux'
import { deleteLane, addItem } from '../reducers'
import KandanModal from "./KandanModal";
import "./Lane.css"

function Lane(props){
   const {laneData, laneName}=props;
   let {kanbanBoard}= props;
   const [isModalOpen, setIsModalOpen]=useState(false);
   const dispatch= useDispatch();

   const ondeleteLane = (title) => {
    delete kanbanBoard[title]
     localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`)
     dispatch(deleteLane({key: title}));
   }

   const onAddItem = (item) => {
        const laneItems = kanbanBoard[laneName].items;
         const updated = laneItems.push(item);
        kanbanBoard= {...kanbanBoard,...updated }
          localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`)
     dispatch(addItem({lane: laneName, item}));
     setIsModalOpen(false)
   
   }

 const displayRemoveLane = (!laneData.items || laneData.items.length===0);
    return (
    <div className="lane">
      <div className="laneTitle">
        <div className="laneTitleBar">{laneData.laneTitle} {laneData.items.length>0 ? (`(${laneData.items.length})`) : " "}</div>
        <div>
        {displayRemoveLane && (
        <button className="deleteLaneButton" onClick={()=>ondeleteLane(laneName)}>X</button>)}
        <div style={{fontWeight: "400" ,paddingTop: displayRemoveLane?"30px": "0px"}}onClick={()=>setIsModalOpen(true)}>Add card</div>
        </div>
      </div>
      <div className="lanedata">
        {laneData.items.map((item, index)=>
          <div className="laneItem"><Item item={item} index={index} laneName={laneName} kanbanBoard={kanbanBoard}/></div>
        )}
      </div>
  {isModalOpen && <KandanModal onAddClicked={onAddItem} title={"card"} setIsModalOpen={setIsModalOpen}/>}
    </div>
    
      )
  }
  

  export default (Lane);