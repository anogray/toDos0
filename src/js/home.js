import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TodoHome extends React.Component {

    state = {
        arr: [],
        redoArr:[],
        globalidx:0,
        changed : 0,
        savedval:{idx:0,val:0}
    };
// 1 2 3 4 5 6 - 3 4 
// [{val:val, id:idx4},{val:val, id:id3}]
add = ()=>{
    console.log("adding btn fxn ")
    this.setState({globalidx:this.state.globalidx+1})
    if(this.state.globalidx===0)
    this.setState({arr : [...this.state.arr,{idx:0,val:1}]})
    else
    {
        let obj = {idx:this.state.globalidx, val:this.state.globalidx+1};
        this.setState({arr : [...this.state.arr,obj]});
    }
}

undo=async()=>{
    console.log("undoing btn fxn ")
    const leftList = this.state.arr.length;

    // if(this.state.changed===true){
        
    // }

    // else 

    if(this.state.redoArr.length>0 && this.state.changed>0 )
    { 
        
        this.setState({changed: this.state.changed-1});
        // let updatearr = {...this.state.arr, ...this.state.redoArr[this.state.redoArr.length-1]}
        // this.setState({updatearr})

          await this.setState({arr:[...this.state.arr,this.state.redoArr[this.state.redoArr.length-1]]})
        
      

       //this.state.arr.splice(this.state.savedval.idx,0,this.state.savedval)
         this.setState({arr : [...this.state.arr]},()=>{
            this.state.arr.sort((a,b)=>{
                return a.idx-b.idx;
            })
        })
        this.setState({redoArr:[...this.state.redoArr.filter(ar=>ar.idx!=this.state.redoArr[this.state.redoArr.length-1].idx)]})


    }
    else if(leftList>0)
    {
        this.setState(({redoArr:[...this.state.redoArr, this.state.arr[this.state.arr.length-1]]}))

        this.setState({arr:this.state.arr.filter(ar=>ar.idx!=this.state.arr[this.state.arr.length-1].idx)})
 
        console.log("redoArr",this.state.redoArr)

       console.log("inside if undo")
    }
    
}

redo=async()=>{
    if(this.state.redoArr.length<=0)
    return;

    await this.setState({arr:[...this.state.arr,this.state.redoArr[this.state.redoArr.length-1]]})
    this.setState({arr : [...this.state.arr]},()=>{
            this.state.arr.sort((a,b)=>{
                return a.idx-b.idx;
            })
        })
    this.setState({redoArr:[...this.state.redoArr.filter(ar=>ar.idx!=this.state.redoArr[this.state.redoArr.length-1].idx)]})
}


remove=async (arhandle)=>{

    const index = this.state.arr.findIndex(ar => ar.val === arhandle.val);
    
    if(index!=-1)
    {  console.log("inside remove fxn",arhandle)
    let savedobj = this.state.arr[index]
    //the saveobj has structure of {idx:1 , val:1}
    //-------------------------Option 1------------------------------
    // this.state.savedval.idx=savedobj.idx;
    // this.state.savedval.val=savedobj.val;
    //--------------------------Option 2---------------------
   await this.setState({savedval : {...this.state.savedval,...this.state.arr[index]}},
    ()=>console.log("here callback ",this.state.savedval)
    ) 

        this.setState({arr:this.state.arr.filter(ar=>ar.val!=arhandle.val)})
        this.setState({redoArr:[...this.state.redoArr,this.state.savedval]})
        this.setState({changed: this.state.changed+1});
        console.log(this.state.savedval)
        
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
                    <li id={ar.idx}>{ar.val}
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