import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Details.css'
import Modal from 'react-modal'



const modalStyle={
    overlay: {
        position: 'fixed',
        zIndex: 1020,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    content:{
      top:'30%',
      left:'50%',
      right:'auto',
      bottom:'10%',
      width:'600px',
      marginRight:'-50%',
      transform:'translate(-50%,-50%)'
  }
    }

Modal.setAppElement('#root')

export default function RestaurantDetails() {

    const{rName}=useParams()
    const[restaurant,setRestaurant]=useState({})
    const[menu,setMenu]=useState([])
    const [isMenuModalOpen,setIsMenuModalOpen]=useState(false)
    const[totalPrice,setTotoalPrice]=useState(0)
    const [isUserDModalOpen, setIsUserDModalOpen] = useState(false)
    const [user, setUser] = useState({name:'',email:'',contact:0})

    const addItem=(item)=>{
        let price=totalPrice+ item.itemPrice
        setTotoalPrice(price)
    }

    const openRazorPay=async ()=>{
        try{
            let data ;
           data = await fetch("http://localhost:5050/pay/razorpay", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({amount:totalPrice})
              }).then((t) => t.json());
            
              console.log(data);
        
        
        
          const options = {
            key: "rzp_test_nDEk0ga4PBhTWk",
            currency: data.currency,
            amount: data.amount,
            name: "Zomato-Food Delivery",
            description: "Wallet Transaction",
            order_id: data.id,
            handler: function (response) {
                var values ={
                    razorpay_signature : response.razorpay_signature,
                    razorpay_order_id : response.razorpay_order_id,
                    transactionid : response.razorpay_payment_id,
                    transactionamount : data.amount,
                  }
                
                  fetch("http://localhost:5050/pay/transaction", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(values)
                  }).then(resp=>{console.log(resp); })
                    .catch(e=>console.log("error occured during saving transaction",e))
               
            },
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.contact,
            },
          };
        
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }catch(e){
            console.log("error occured:",e)
        }
    
    }
    
    const handleUserchange=(e)=>{
        user[e.target.name]=e.target.value
        setUser({...user})
    }
    
    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };

    useEffect(() => {
        fetch(`http://localhost:5050/zomato/restaurantDetails/${rName}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>{setRestaurant(data.data);console.log(data.data)})
  
        
        fetch(`http://localhost:5050/zomato/menu/${rName}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>{setMenu(data.data);console.log(data.data)})
    }
  
    , [])
    
    
    const{name,thumb,cost,address,Cuisine}=restaurant
    const cuisineValues= !(Cuisine===undefined ) && Cuisine.length && Cuisine.map((item)=><div class="value">{item.name}</div>)
    return (
        <div>
        <div>
            {/* Showcasing the First Image and rest will be showed in the Carousal  */}
            <img src={thumb} width="100%" height="500px" />
            <button class="gallery-button">Click to see Image </button>
        </div>
        <button className="btn btn-danger" onClick={()=>setIsMenuModalOpen(true)} style={{ float: 'right', margin: '15px', backgroundColor: '#ce0505' }}>Place Online Order</button>
        {/* Showing 2 Tabs on screen as Overview and Contact with details in respective sections*/}
        <div class="heading">{name}</div>
        <div class="tabs">
            {/* Tab-1 */}
            <div class="tab">
                <input type="radio" id="tab-1" name="tab-group-1" checked />
                <label for="tab-1">Overview</label>

                <div class="content">
                    <div class="about">About the place</div>
                    <div class="head">Cuisine</div>
                    {cuisineValues}
                    <div class="head">Average Cost</div>
                    <div class="value">&#8377; {cost}</div>
                </div>
            </div>
            {/* Tab-2 */}
            <div class="tab">
                <input type="radio" id="tab-2" name="tab-group-1" />
                <label for="tab-2">Contact</label>
                <div class="content">
                    <div class="head">Phone Number</div>
                    <div class="value">+91-9876543217</div>
                    <div class="head">{name}</div>
                    <div class="value">{address}</div>
                </div>
            </div>
        </div>
        <Modal isOpen={isMenuModalOpen} style={modalStyle}>
            <h2>
                Menu
        <button onClick={()=>setIsMenuModalOpen(false)} className="btn btn-outline-danger float-end">X</button>
        </h2>
        <h3>
            { name }
        </h3>
        <ul>
            {
                menu.length && menu.map((item, index)=><li key={index}>
                    <div className='col-10'>
                        <div>
                            {

                            item.isVeg ?
                            <div>Veg</div>:
                            <div>Non-Veg</div>

                            }
                        </div>
                    <div className="cuisines">{item.itemName}</div>
                    <div className='cuisines'>&#8377;{item.itemPrice}</div>
                    <div className='cuisines'>{item.itemDescription}</div>
                    </div>
                    <div className='col-2'></div>
                            <button className='btn btn-secondary' onClick={()=>addItem(item)}>Add</button>
                     </li>
                     )
            }
        </ul>
        <hr/>
        <h3>Total Price:{totalPrice}</h3><button onClick={()=>{setIsMenuModalOpen(false); setIsUserDModalOpen(true)}}>Pay Now</button>
       
       
        </Modal>
        <Modal isOpen={isUserDModalOpen} style={modalStyle}>
            <form >
                <fieldset>
                    <legend>UserDetails</legend>
                    <input placeholder="name" name="name" onChange={(e)=>handleUserchange(e)}/><br/>
                    <input placeholder='email' name="email" onChange={(e)=>handleUserchange(e)}/><br/>
                    <input placeholder='contact no' name="contact" onChange={(e)=>handleUserchange(e)} />
                </fieldset>
            </form>

            <button onClick={()=>{loadScript("https://checkout.razorpay.com/v1/checkout.js");openRazorPay()}}>Proceed</button>           
        </Modal>
    </div>
    )
}