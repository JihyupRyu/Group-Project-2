// module.exports = function addUserToNavbar (user){
//     document.getElementById("userInfo").innerHTML = "{{user}}";
// }

// const axios = require('axios');

// use axios to grab the request username from database first,
$(()=>{
axios.get('/user')
  .then(function (response) {
    console.log(response.data);
    let user = response.data
    $('#userInfo').html(`<div class="d-flex align-items-center friend-state friends-box navbarUser">
    <div>
        <img class="rounded-circle friends-image" src="https://picsum.photos/80/80/?random?image=11" width="30" alt="">
    </div>
    <div class="ml-2 h7">` +
        user + 
    `</div>
</div>`)

// document.getElementById('userInfo').innerHTML(response.data, 'From Server')

  })
  .catch(function (error) {
    console.log(error);
  });
})


// $("#post").click(
//   axios.post("/profile")
//   .then((res)=>{
//     console.log("axios then is working")
//     // console.log(res.data, 'X')
//     console.log(res +'hello')
//     reloadNotes(res.data)
// }).catch((err)=>{
//     console.log(err)
// })

// )