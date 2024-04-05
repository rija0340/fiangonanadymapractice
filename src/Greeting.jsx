import { useReducer } from "react";
function Greeting(){

    function reducer(state,action){
        console.log(action);
        switch (action.type) {
            case "CHANGE_VALUE": {
                return {
                    ...state,selectValue : action.selectValue
                };
            }
            case "CHANGE_VALUE_INPUT": {
                return {
                    ...state,inputValue : action.inputValue
                };
            }
            case "ADD_TO_LIST": {
                return {
                    ...state,list: [...state.list, action.newEl]
                };
            }
            case "DELETE_FROM_LIST": {
                
                let copy = [...state.list];
                let filtered = copy.filter((item) => copy.indexOf(item)!==action.index);
                return { 

                    ...state,list: filtered
                };
            }
        }
        throw Error('Action inconnue : ' + action.type);
    }

    const[state,dispatch] = useReducer(reducer,{
        selectValue : 0,
        inputValue : "",
        list:["rija","rakoto","rabe"]
    });

    const handleChange = (e) =>{
        const selectValue = e.target.value;
        dispatch({
            type:'CHANGE_VALUE',
            selectValue
        })

    }
    const handleChangeInput = (e)=>{
        const inputValue = e.target.value;
        dispatch({
            type:'CHANGE_VALUE_INPUT',
            inputValue
        })

    }

    function handleSubmit(e){
    e.preventDefault();
    const data = new FormData(e.target);
    const newEl = data.get('test');
        dispatch({
            type:'ADD_TO_LIST',
            newEl
        })


    }

    function handleDelete(index){
        dispatch({
            type:'DELETE_FROM_LIST',
            index
        })
    }


    return(
        <>
        <div>SElect</div>
        <select  onChange={handleChange} className="form-control" name="test" id="test">
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
        <label htmlFor="">Entrez une phrase</label>
        <input type="text" className="form-control" onChange={handleChangeInput} />

        <p> valeur select </p>
        <h1>{state.selectValue}</h1>
        <p> valeur input </p>
        <h1>{state.inputValue}</h1>
        <div className="mt-5 p-2 border">
        <p>formulaire   </p>
        <form   action="" onSubmit={handleSubmit}>
            <input type="text" className="form-control" name="test"/>

            <button type="submit" className="btn btn-secondary mt-2">OK</button>

        </form>
        </div>
        <div className="card mt-2 p-3   ">
            <h5>liste produits</h5>
            {
                state.list.map((item,index) => <li key={index} >{item} <button onClick={()=>handleDelete(index)} >delete</button> </li>)
            }

        </div>
        </>
    );
}



export default Greeting;