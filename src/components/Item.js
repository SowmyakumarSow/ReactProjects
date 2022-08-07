import React, {useState, useRef} from "react"
import { useDispatch } from "react-redux";
import { deleteItem } from "../reducers"
import { get } from "lodash"
import KandanModal from "./KandanModal";
import './Item.css'
function Item(props) {
    const {item, laneName, index}= props;
    let { kanbanBoard } = props;
    const [isModalOpen, setIsModalOpen]=useState(false);
    const dispatch = useDispatch();

    const onDeleteItem=(index, lane)=> {
        kanbanBoard[laneName].items.splice(index,1);
        kanbanBoard= {...kanbanBoard }
          localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`)
        dispatch(deleteItem({lane, index}));
        localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`);
    }

    const titleClass = `${get(item,"type","").toLowerCase()}_item`
    const assigneeLetter = get(item,"assignee[0]","").toUpperCase();
   return (
    <div 
    className={titleClass} 
 >
       <div className="title">
        {get(item,"type")} 
        <button data-testId="deleteItemButton" className="deleteItemButton" onClick={()=>onDeleteItem(index, laneName)}>X</button>
       </div>
       <div data-testId="discription" className="discription">
        <div data-testId="itemTitle"  className="itemTitle">{get(item,"title")}</div>
        <div data-testId="itemFooter" className="itemFooter">
    <div data-testId="assignee" className="assignee">{assigneeLetter}</div>
        <div data-testId="viewButton" className="viewButton" onClick={(e)=>{e.preventDefault();setIsModalOpen(true)}}>View</div></div>
        </div>
        
  {isModalOpen && <KandanModal card={item} title={"view"} setIsModalOpen={setIsModalOpen}/>}
   </div>
   )
  }

  export default React.memo(Item)

