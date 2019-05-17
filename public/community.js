
$("#communityPost").click(function (event) {
    event.preventDefault();
    let id = $(event.currentTarget).data('post')
    let postContent = $(".textValue").val()
    
    console.log(id)
    console.log(postContent)

    axios.post("/community/"+id + '?data=' + postContent)
        .then((res) => {

            location.reload(true)

        }).catch((err) => {
            console.log(err)
        })

})






let commentPostContent

$(".commentValue").mouseleave(function (event) {
    commentPostContent = $(event.currentTarget).val();
    console.log(commentPostContent);
})

$(".commentPost").click(function (event) {
    event.preventDefault();
    // let postContent = $(".commentValue").val()

    let postId = $(event.currentTarget).data('commentpost')

    let communityId = $(event.currentTarget).data('post')

    console.log(communityId)
    console.log(commentPostContent);
    console.log(postId)
    axios.post("/community" +"/comment/"+communityId+'?data=' + commentPostContent+'&id='+ postId)
        .then((res) => {


            location.reload(true)

        }).catch((err) => {
            console.log(err)
        })

})







let content

$(".textedValue").mouseleave(function (event) {
    content = $(event.currentTarget).text();
    console.log(content);
})

$(".putSubmit").click(function (event) {
    let user_id = $(event.currentTarget).data('user')
    let postid = $(event.currentTarget).data('put');
    let community_id = $(event.currentTarget).data('community');

    console.log(content)
    console.log(user_id)
    console.log(postid)
    console.log(community_id)

    axios.put("/community/" + community_id + "?data=" + content+"&userid="+ user_id + "&postid="+ postid)
        .then(res => location.reload(true))

});

$(".deleteSubmit").click(function (event) {
    let user_id = $(event.currentTarget).data('user')
    let postid = $(event.currentTarget).data('delete');
    let community_id = $(event.currentTarget).data('community');



    axios.delete("/community/" + community_id + "?userid="+ user_id + "&postid="+ postid)
        .then(res => location.reload(true))

})

const postTemplate = Handlebars.compile(  //broswer said it is undefined here//
    `
    {{#each post}} 
    <div class="card-header comment-box read-more-state">
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2">
                <img class="rounded-circle" width="35" src="{{{profilepic}}}">
            </div>
            <div class="ml-2">
                <a href="#" class="fcLink">
                    <div class="h7 m-0">{{username}}</div>
                </a>
            </div>
        </div>
        <div class="card-text commentValue" contentEditable="true" style="border: none" rows="4" cols="20" data-putText="{{this.id}}">
        {{comment_content}} 
        </div>
        <div>
            <div class="dropdown">
                <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                    <div class="h6 dropdown-header">Menu</div>
                    <a class="dropdown-item commentPutSubmit" href="#" data-user="{{this.user_id}}" data-put="{{id}}" data-community="{{this.category_id}}">Edit</a>
                    <a class="dropdown-item deleteSubmit" href="#" data-user="{{this.user_id}}" data-delete="{{id}}" data-community="{{this.category_id}}">Delete</a>
                </div>
            </div>
        </div>
    </div>
</div>
{{/each}}
  `
);

$(".comment").click(function (event) {
    console.log('butt')
    event.preventDefault();
    let postId = $(event.currentTarget).data('comment');


    axios.get(`/community/comment/`+postId)
        .then((res) => {
            console.log("axios then is working")
            // console.log(res.data, 'X')
            console.log(res + 'hello')
            
            $('.commentWork-'+postId).html(postTemplate({ post: res.data }));
            // reloadPost(res.data)

            let comment_content

            $(".commentValue").mouseleave(function (event) {
                comment_content = $(event.currentTarget).text();
                console.log(comment_content);
            })

                $(".commentPutSubmit").click(function (event) {
                    let user_id = $(event.currentTarget).data('user')
                    let id = $(event.currentTarget).data('put');

                    console.log(id);
                    console.log(comment_content);
                    console.log(user_id)

                    axios.put("/community/"+"comment/" + id + "?data=" + comment_content+ "&user="+ user_id)
                        .then(res => location.reload(true))

                });

                $(".deleteSubmit").click(function (event) {
                    let user_id = $(event.currentTarget).data('user')
                    let id = $(event.currentTarget).data('delete');
                    console.log(user_id)
                    console.log(id);
                    console.log(typeof id);
                
                
                    axios.delete("/community/"+"comment/"+id+"?user=" + user_id)
                        .then(res => location.reload(true))
                
                })

        }).catch((err) => {
            console.log(err)
        });
})