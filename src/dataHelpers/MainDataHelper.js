import { network } from "../App";

export const recentTransactions=[
  {
    id:1,
    amountSpent:"2800",
    name:"Meals Delight",
    category:"Resturant",
    time:new Date(),
    description:"none",
    fees:"3.45",
    sendId:"",
  },
  {
    id:2,
    amountSpent:"3100",
    name:"Heritage",
    category:"Resturant",
    time:new Date(),
    description:"none",
    fees:"3.45",
    sendId:"",
  },
  {
    id:3,
    amountSpent:"2800",
    name:"Meals Delight",
    category:"Resturant",
    time:new Date(),
    description:"none",
    fees:"3.45",
    sendId:"",
  },
  {
    id:4,
    amountSpent:"2800",
    name:"Heritage",
    category:"Resturant",
    time:new Date(),
    description:"none",
    fees:"3.45",
    sendId:"",
  },
  {
    id:5,
    amountSpent:"2800",
    name:"Heritage",
    category:"Resturant",
    time:new Date(),
    description:"none",
    fees:"3.45",
    sendId:"",
  },
  
]

export const Users=[
{
  firstName:"Bisola",
  LastName:"Adenuke",
  email:"dedzz3847@gmail.com",
  password:"Sean",
  isAdmin:true,
  moneyAvailable:12950
},
{
  firstName:"Sean",
  LastName:"Omoera",
  email:"seanomoera@gmail.com",
  password:"Sean",
  isAdmin:false,
  moneyAvailable:12950
},
]

export const NotificationsData=[
  {
    id:1,
    title:"Available today",
    time:"06:14 AM",
    text:"Catch Vista at Heritage Restaurant today from 4:30PM - 5:00PM"
  },
  {
    id:2,
    title:"Available today",
    time:"06:14 AM",
    text:"Catch Vista at Heritage Restaurant today from 4:30PM - 5:00PM"
  },
  {
    id:3,
    title:"Available today",
    time:"06:14 AM",
    text:"Catch Vista at Heritage Restaurant today from 4:30PM - 5:00PM"
  },
]

export const fetchUserData = async () => {
  try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`http://${network}:5000/user`, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });

      if (response.ok) {
          const userData = await response.json();;
          // Handle user data as needed
          return userData;
      } else {
          console.error('Failed to fetch user data:', response.statusText);
      }
  } catch (error) {
      console.error('Error fetching user data:', error.message);
  }
};
