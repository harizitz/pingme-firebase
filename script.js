var firebaseConfig = {
  apiKey: "AIzaSyAny6lFVtlRLYl7pKcu6wU-rWsTvufP_iA",
  authDomain: "pokeme-40f62.firebaseapp.com",
  databaseURL: "https://pokeme-40f62.firebaseio.com",
  projectId: "pokeme-40f62",
  storageBucket: "pokeme-40f62.appspot.com",
  messagingSenderId: "1044716900710",
  appId: "1:1044716900710:web:aac164a2d9a0ad66d8f8a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function googleSignin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      window.location.replace("Adddetails.html");
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      console.log(error.message);
    });
}
var database = firebase.database();
function addinfo() {
  var name = document.getElementById("name").value;
  name = name.toUpperCase();
  var e = document.getElementById("choice");
  var category = e.options[e.selectedIndex].value;
  var hobby = document.getElementById("hobby").value;
  var number = document.getElementById("number").value;
  var email = document.getElementById("email").value;
  
  var id = document.getElementById("uid").value;
  
  if (
    name != "" &&
    number != "" &&
    hobby != "" &&
    email != "" 
  ) {
    var ref = database.ref("Hobbies/" + category + "/" + id + "/").set({
      Name: name,
      Hobby: hobby,
      Email: email,
      Number: number,
     
    });
    alert("Thank you");
    window.location.replace("viewpage.html");
  }
}
function search() {
  alert("Are you sure ? ");
  var e = document.getElementById("choice");
  var cat = e.options[e.selectedIndex].value;
  database.ref("Hobbies/" + cat).on("value", printdata, errdata);
  function printdata(snapshort) {
    var listitems = snapshort.val();
    var keys = Object.keys(listitems);
    
    for (var i = 0; i < keys.length; i++) {
      var index = keys[i];
      var name = listitems[index].Name;
      var hobby = listitems[index].Hobby;
      var email = listitems[index].Email;
      var number = listitems[index].Number;
      let insert = document.getElementById("insert");
      if(i==0)
      {
      insert.innerHTML=" ";
      var int =document.getElementById("insert");
    int.innerHTML="<tr>            <th>Name</th> <th>Hobby</th>  <th>Number</th> <th>Email</th>    </tr>";
      }
      insert.innerHTML += ` 
                            <tr>
                              <td>${name}</td>
                              <td>${hobby}</td>
                              <td>${number}</td>
                              <td>${email}<td>
                          </tr>` ;

      
    }
  }
}
function errdata() {
  console.log("error");
}
function find() {
  window.location.replace("viewpage.html");
}
