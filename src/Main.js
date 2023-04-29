import './Main.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Main = () =>{
const [category, setCategory] = useState([])
const [pics, setPics] = useState([]);
const [copydata, setCopydata] = useState([]);
const [catdata, setCatdata] = useState()

useEffect(()=>{
    axios.get('https://fakestoreapi.com/products/')
    .then((res)=>{
        setCopydata(res.data)
        setPics(res.data)}).catch((error) => console.log(error))
    axios.get('https://fakestoreapi.com/products/categories').then((res) =>
    setCategory(res.data)).catch((error) => console.log(error))
    console.log('useEffect ran')
},[])


const handleDelete =(id) =>{
setCopydata(copydata.filter((d,index) => index !== id))
}

const handleFilter =(data)=>{
    console.log(data)
setCopydata(pics.filter((d) =>d.category === data))
}


return(
        <div className='container'>
            <select value={catdata} defaultValue="None" onChange={(e) => setCatdata(e.target.value)}>
                <option>None</option>
            {
                category && category.map(d=>
                    <option >{d}</option>)
            }
            </select>
            <button onClick={()=>handleFilter(catdata)}>Filter</button>
            <button onClick={()=> {
                setCatdata('')
                setCopydata(pics)}}>X</button>
          <div className='is-flex is-flex-wrap-wrap is-flex-direction-row is-justify-content-space-between'>
            
            {copydata.map((d,index) =>
            <div key={d.id} className='my-5' style={{ height: '250px', width:'150px'}}>
             
             <img alt='product' style={{height:'190px', width:'140px'}} src={d.image}></img>
             <h4>{d.category}</h4>
             <button onClick={() =>handleDelete(index)} className='button is-danger'>X</button>
            </div>
            )}
          </div>
        </div>
    )
}

export default Main