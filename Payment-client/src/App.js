import React, { Component , div } from 'react'
import Axios from 'axios'
// import { Button } from 'react-bootstrap';
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
   // this.razorPayHandler = this.razorPayHandler(this);

  }

  async razorPayPaymentHandler() {
    const API_URL = ` https://payment-server-codefury.herokuapp.com/razorpay/`
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)
    
    const options = {
      key: '',
      name: "Akhil",
      description: "Pay me",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log(captured) ; 
         //Axios.post('' , (req,res) => {})
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
         if(captured){
             console.log('success')
         }
         
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  
  render() {
    const mystyle = {
      color: "white",
      //backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial" , 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     backgroundColor: "blue"
    };
    const pstyle = {
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     
    };
    const bstyle = {
      color: "white",
      //backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial" , 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "blue" , 
      margin: "auto"
    };
    const cstyle = {
    //   borderColor : "Black" , 
     backgroundColor: "Yellow",
      padding: "20px",
    // margin:"auto" ,
    //   fontFamily: "Arial" , 
    //   display: "flex",
     justifyContent: "center",
      textAlign: "center",
    //   // backgroundColor: "blue" , 
       margin: "auto"
    };
    return (
      
     <div>
        <div style = {cstyle}>
            
            <h2>Benefits of Paid Subscription</h2>
            
            <p>Unlimited access of video calling</p>
            
            <p>More than 5 can be added in a group</p>
            
            <p>Lifetime access to all services</p>
        </div>
        <card class = "container">
           <h1 style = {mystyle}>Payment Gateway</h1>
           <br/>
         
           <br/>
           <p  style = {pstyle}>You will be redirected to RazorPay</p>
        <button  style = {bstyle}
        onClick={this.razorPayPaymentHandler}
        >
          Pay Now
        </button>
    </card>
      </div> 
       //}
    )
  }
}

export default App
