const notesTemplate = Handlebars.compile(  //broswer said it is undefined here//
    `
    {{#each notes}}
    <div class="note">
        <span class="input">
        <textarea data-id="{{ id }}">
         {{ comment_content }}
         </textarea>
         </span>
        <button class="remove btn btn-xs" data-id="{{ id }}"><i class = "fa fa-trash" aria-hidden="true"></i></button>
        </div>
        {{/each}}
    `
);

const reloadNotes = (data) => {
    console.log('trying')
    $('#notes').html(notesTemplate({notes:data}));
    console.log('No?')
}


let content

$(".textValue").mouseleave(function (event) {
  content = $(event.currentTarget).val();
  console.log(content);

})

$(".putSubmit").click(function (event) {
  let id = $(event.currentTarget).data('id');
  console.log(id);
  console.log(content);


  axios.put("/profile/" + id + "?data=" + content)
    .then(res => console.log('value has been put'))

});

$(".deleteSubmit").click(function (event) {
  let id = $(event.currentTarget).data('delete');
  console.log(id);
  console.log(typeof id);


  axios.delete("/profile/" + id)
    .then(res => console.log('value has been deleted'))

})




$(".comment").click(function (event) {
  console.log('butt')
  event.preventDefault();
  let id = $(event.currentTarget).data('comment');

  console.log(id)

  axios.get(`/profile/comment/${id}`)
  .then((res)=>{
    console.log("axios then is working")
    // console.log(res.data, 'X')
    console.log(res +'hello')
    reloadNotes(res.data)
}).catch((err)=>{
    console.log(err)
});

//   $("a").attr("href", "/profile/comment/" + id);

})


//problem: 
// when I click the comment, I want the the ajax to get the route
// and place the data of handlebars compile