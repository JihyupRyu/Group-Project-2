function refreshPage() {
    var page_y = document.getElementsByTagName("body")[0].scrollTop;
    window.location.href = window.location.href.split('?')[0] + '?page_y=' + page_y;
}
window.reload = function () {
    setTimeout(refreshPage, 35000);
    if (window.location.href.indexOf('page_y') != -1) {
        var match = window.location.href.split('?')[1].split("&")[0].split("=");
        document.getElementsByTagName("body")[0].scrollTop = match[1];
    }
}

const postTemplate = Handlebars.compile(
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
                    <a class="dropdown-item commentPutSubmit" href="#" data-user="{{this.user_id}}" data-put="{{id}}">Edit</a>
                    <a class="dropdown-item deleteSubmit" href="#" data-user="{{this.user_id}}" data-delete="{{id}}">Delete</a>
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
    let id = $(event.currentTarget).data('comment');

    console.log(id)

    axios.get(`/profile/comment/` + id)
        .then((res) => {
            console.log("axios then is working")

            console.log(res + 'hello')

            $('.commentWork-' + id).html(postTemplate({ post: res.data }));


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

                axios.put("/profile/" + "comment/" + id + "?data=" + comment_content + "&user=" + user_id)
                    .then(res => location.reload(true))

            });

            $(".deleteSubmit").click(function (event) {
                let user_id = $(event.currentTarget).data('user')
                let id = $(event.currentTarget).data('delete');
                console.log(user_id)
                console.log(id);
                console.log(typeof id);


                axios.delete("/profile/" + "comment/" + id + "?user=" + user_id)
                    .then(res => location.reload(true))

            })
        }).catch((err) => {
            console.log(err)
        });


})

$("#post").click(function (event) {
    event.preventDefault();
    let postContent = $(".textValue").val()
    console.log(postContent)


    axios.post("/profile" + '?data=' + postContent)
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


    let postId = $(event.currentTarget).data('commentpost')

    console.log(commentPostContent);
    console.log(postId)
    axios.post("/profile" + "/comment/" + postId + '?data=' + commentPostContent)
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
    let id = $(event.currentTarget).data('put');

    console.log(id);
    console.log(user_id)
    console.log(content);

    axios.put("/profile/" + id + "?data=" + content + "&userId=" + user_id)
        .then(res => location.reload(true))

});

$(".deleteSubmit").click(function (event) {
    let user_id = $(event.currentTarget).data('user')
    let id = $(event.currentTarget).data('delete');
    console.log(user_id)
    console.log(id);
    console.log(typeof id);


    axios.delete("/profile/" + id + "?userId=" + user_id)
        .then(res => location.reload(true))

})

$(() => {
    axios.get('/user')
        .then(function (response) {
            console.log(response);
            let user = response.data
            $('#userInfo').html(`<div class="d-flex align-items-center friend-state friends-box navbarUser">
        <div>
            <img class="rounded-circle friends-image" src="https:
        </div>
        <a href='/profile' class='fcLink'><div class="ml-2 h7">` +
                user +
                `</div></a>
    </div>`)



        })
        .catch(function (error) {
            console.log(error);
        });
})