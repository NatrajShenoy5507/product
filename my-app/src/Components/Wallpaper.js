import '../styles/Wallpaper.css'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import homepageimg from '../Assets/homepageimg.png'

export default class Wallpaper extends Component {

    constructor(){
        super()
        console.log("Wallpaper Constructor getting called")
        this.state={
            locations:[],
            restaurants:[]
        }
    }

    // static getDerivedStateFromProps(props, state){
    //     console.log("Wallpaper getDerivedStateFromProps being called")
    //     return {
    //         s2: props.s2
    //     }
   // }
    componentDidMount(){
        console.log("Wallpaper CompoentDidMount getting called", this.state)
    //basically here we call our API
    fetch('http://localhost:5050/zomato/location',{method:'GET'})
    .then(response=>response.json())
    .then(data=> this.setState({locations:data.data}))
    }

    fetchRestaurants = (event)=>{
        fetch(`http://localhost:5050/zomato/restaurants/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=> {this.setState({restaurants:data.data})})

}
  render() {
      let locationOptions=this.state.locations.length && this.state.locations.map((item)=>[<option key={item.name} value={item.city_id}>{item.name}</option>])
  let restaurantsList= this.state.restaurants.length && <ul style={{ height:"130px", width:"65%", overflowY:"scroll"}}>{
                       this.state.restaurants.map((item) => 
                           <li key={item.name} ><Link to={`/restaurantDetails/${item.name}`}>{item.name}</Link></li>)
                            }</ul>
    return (
        <div>
        <div>
        <img alt='homepage' src={homepageimg} width='100%' height='450' />

        <div className="logo">
            <p>e!</p>
        </div>
        <div className="headings">
            Find the best restaurants, cafes, bars 
                </div>
        <div className="locationSelector">
            <select className="locationDropdown" onChange={this.fetchRestaurants}>
               <option value="0">Select</option>
               {locationOptions}
            </select>
            <div id="notebooks">
                <input className="restaurantsinput" type="text" placeholder="Search Restaurant" />
                {restaurantsList}
            </div>
           </div>
        </div>
    </div >
    )
  }

}
