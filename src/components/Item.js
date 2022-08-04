import React, {useState, useRef} from "react"
import { useDispatch } from "react-redux";
import { deleteItem } from "../reducers"
import KandanModal from "./KandanModal";
import './Item.css'
function Item(props) {
    const {item, laneName, index}= props;
    let { kanbanBoard } = props;
    const [isModalOpen, setIsModalOpen]=useState(false);
   
    const {title,assignee, type}=item;
    const dispatch = useDispatch();

    const onDeleteItem=(index, lane)=> {
        kanbanBoard[laneName].items.splice(index,1);
        kanbanBoard= {...kanbanBoard }
          localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`)
        dispatch(deleteItem({lane, index}));
        localStorage.setItem("kanban", `${btoa(JSON.stringify(kanbanBoard))}`);
    }

    const titleClass = `${type.toLowerCase()}_item`
    const assigneeLetter = assignee[0].toUpperCase();
   return (
    <div 
    className={titleClass} 
 >
       <div className="title">
        {item.type} 
        <button className="deleteItemButton" onClick={()=>onDeleteItem(index, laneName)}>X</button>
       </div>
       <div className="discription">
        <div className="itemTitle">{title}</div>
        <div className="itemFooter">
    <div className="assignee">{assigneeLetter}</div>
        <div className="viewButton" onClick={(e)=>{e.preventDefault();setIsModalOpen(true)}}>View</div></div>
        </div>
        
  {isModalOpen && <KandanModal card={item} title={"view"} setIsModalOpen={setIsModalOpen}/>}
   </div>
   )
  }

  export default React.memo(Item)

