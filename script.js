async function register(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(!name || !email || !password){
    alert("Fill all fields");
    return;
  }

  try{
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful");
    window.location.href="login.html";
  }catch(error){
    alert(error.message);
  }
}

async function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try{
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
    window.location.href="index.html";
  }catch(error){
    alert(error.message);
  }
}

function logout(){
  signOut(auth).then(()=>{
    window.location.href="index.html";
  });
}

async function placeOrder(){

  const user = auth.currentUser;

  if(!user){
    alert("Please login first");
    window.location.href="login.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  let total = cart.reduce((sum,i)=>sum+i.price*i.qty,0);

  try{
    await addDoc(collection(db,"orders"),{
      userEmail: user.email,
      items: cart,
      total: total,
      date: new Date().toLocaleString()
    });

    localStorage.removeItem("cart");
    alert("Order placed successfully");
    window.location.href="success.html";

  }catch(error){
    alert(error.message);
  }
}

async function loadOrders(){

  const user = auth.currentUser;
  if(!user) return;

  const q = query(collection(db,"orders"), where("userEmail","==",user.email));
  const querySnapshot = await getDocs(q);

  const container = document.getElementById("ordersList");
  if(!container) return;

  container.innerHTML="";

  querySnapshot.forEach(doc=>{
    const data = doc.data();
    container.innerHTML += `
      <div style="background:#1a1a1a;padding:10px;margin-bottom:10px;border-radius:10px;">
        Date: ${data.date}<br>
        Total: ₹${data.total}
      </div>
    `;
  });
}

async function loadAdmin(){

  const container = document.getElementById("admin