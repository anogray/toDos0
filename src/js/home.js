import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TodoHome extends React.Component {

    state = {
        arr: [],
        redoArr:[],
        changed : false,
    };


add = ()=>{
    console.log("adding btn fxn ")
    if(this.state.arr.length==0)
    this.setState({arr : [...this.state.arr,1]})
    else
    this.setState({arr : [...this.state.arr,this.state.arr[this.state.arr.length-1]+1]})
}

undo=()=>{
    console.log("undoing btn fxn ")
    const leftList = this.state.arr.length;

    if(this.state.changed===true){
        
    }

    else if(leftList>0)
    {
        this.setState(({redoArr:[...this.state.redoArr, this.state.arr[this.state.arr.length-1]]}))

        this.setState({arr:[...this.state.arr.filter(ar=>ar!=this.state.arr[this.state.arr.length-1])]})
 
        console.log("redoArr",this.state.redoArr)

       console.log("inside if undo")
    }
    
}

redo=()=>{
    if(this.state.redoArr.length<=0)
    return;

    this.setState({arr:[...this.state.arr,this.state.redoArr[this.state.redoArr.length-1]]})
    this.setState({redoArr:[...this.state.redoArr.filter(ar=>ar!=this.state.redoArr[this.state.redoArr.length-1])]})
}


remove=(val)=>{

    const index = this.state.arr.findIndex(ar => ar === val);
    
    if(index!=-1)
    {  console.log("inside remove fxn",val)
    const savedval = this.state.arr[index];
        this.setState({arr:[...this.state.arr.filter(ar=>ar!=val)]})
        this.setState({redoArr:[...this.state.redoArr,savedval]})
        this.setState({changed:true})

    }

}

    render() {
        let renderarr = this.state.arr;
        return (
           
            <div>
            <button onClick={this.add}>Add</button>
            <button onClick={this.undo}>Undo</button>
            <button onClick={this.redo}>Redo</button>
            
            <div className="list">
            {this.state.arr.map((ar) =>
                (
                    <li id={ar}>{ar}
                    <button onClick={()=>this.remove(ar)}>Remove</button>
                    </li>
                )
                )}
            </div>
               
            </div>
        );
    }
}

export default TodoHome;