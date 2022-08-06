import React , {useState} from "react";
import ReactDOM from "react-dom";
import { get } from "lodash"
import "../index.css"


const modalRoot = document.getElementById("root");

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="overlay">{props.children}</div>,
    modalRoot
  );
};

export default function KandanModal(props) {
    const { title , onAddClicked , setIsModalOpen, card} = props;
    const formTitle= `Enter ${title} title `;
    const [value, setValue]=useState("");
    const [cardType, setCardType] = useState("");
    const [cardAssignee, setCardAssignee] = useState("");
    const [cardhrs, setCardhrs] = useState("");
    const [cardPriority, setCardPriority] = useState("");

    const handleChange = (event) => setCardType(get(event,"target.value"))

    const handleAddButtonClick = (value) => {
        if (cardType){
            onAddClicked({
                type: cardType,
                title: value,
                priority: cardPriority,
                loggedHrs: cardhrs,
                assignee: cardAssignee
              })
        } else onAddClicked(value)

    }

    const ViewModal = () =>(
<>
        <div><b>View details</b></div>
            <table className="viewTableStyle">
         <tbody> 
        <tr className="modalRowData">
            <td>Type</td>
            <td>{card.type}</td>
        </tr>
        <tr className="modalRowData">
          <td>{"discription"}</td>
          <td>{card.title}</td>
        </tr>
        
        <tr className="modalRowData">
        <td>{"Priority"}</td>
          <td>{card.priority}</td>
        </tr>
        
        <tr className="modalRowData">
        <td>{"Estimated Time"}</td>
          <td>{card.loggedHrs}</td>
        </tr>
        
        <tr className="modalRowData">
          <td>{"Assingee"}</td>
          <td>{card.assignee}</td>
        </tr>
       </tbody>
        </table>
        <button className="closeButton" onClick={()=>setIsModalOpen(false)}>Close</button>  
</>);
    
  return (
    <Modal>
      <div className="App">
          {title === "card" && (

<div>
<div className="cardTable">Adding {title}</div>
<table className="cardTableStyle">
  <tbody>
<tr style={{display:"flex"}}>
<td>Select the type of card</td>
<td style={{paddingLeft:"125px"}}><select onChange={handleChange}>    
<option value=""></option>  
<option value="Bug">Bug</option>
<option value="Feature">Feature</option>
<option value="Request">Request</option>
</select></td>
</tr>

<tr className="modalRowData">
<td>{formTitle}</td>
<td><input type="text" onChange={(e)=>setValue(get(e,"target.value"))}/></td>
</tr>

<tr className="modalRowData">
<td>{"Priority"}</td>
<td><input type="text" onChange={(e)=>setCardPriority(get(e,"target.value"))}/></td>
</tr>

<tr className="modalRowData">
<td>{"Estimated Time"}</td>
<td><input type="text" onChange={(e)=>setCardhrs(get(e,"target.value"))}/></td>
</tr>

<tr className="modalRowData">
<td>{"Assignee"}</td>
<td><input type="text" onChange={(e)=>setCardAssignee(get(e,"target.value"))}/></td>
</tr>
</tbody>
</table>
<div className="cardModalFooter">
<button disabled={!value} onClick={()=>handleAddButtonClick(value)} style={{marginRight: "10px",width:"100px", backgroundColor:"darkgoldenrod"}}>Add</button>
<button style ={{width:"100px"}}onClick={()=>setIsModalOpen(false)}>Close</button>  
</div>
</div>
          )}
          {title ==="lane" && (
            <div>
            <div className="cardTable">Adding {title}</div>
            <table className="laneTableStyle"><tbody>
          <tr className="laneTAbleData">
             <td>{formTitle}</td>
             <td><input type="text" onChange={(e)=>setValue(get(e,"target.value"))}/></td>
          </tr>
          </tbody>
         </table>
         <div className="cardModalFooter">
            <button className="addButton" disabled={!value} onClick={()=>handleAddButtonClick(value)}>Add</button>
            <button className="closeButton" onClick={()=>setIsModalOpen(false)}>Close</button>  
          </div>
       </div>
          )}
          {title==="view" && <ViewModal />}
      </div>
    

     
    </Modal>
  );
}
