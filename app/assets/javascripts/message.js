$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="message-info">
              <div class="message__info-talker">
                ${message.user_name}
              </div>
              <div class="message__info-data">
                ${message.created_at}
              </div>
            </div>
            <div class="message-text">
              <p class="message-info__text">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
        } else {
          var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="message-info">
              <div class="message__info-talker">
                ${message.user_name}
              </div>
              <div class="message__info-data">
                ${message.created_at}
                </div>
              </div>
            <div class="message-text">
              <p class="message-info__text">
                ${message.content}
              </p>
            </div>`
          return html;
        };
      }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
       $('form')[0].reset();
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
    return false;
  })
});
 var reloadMessages = function() {
   var last_message_id = $('.message:last').data("message-id");
   $.ajax({
     url: "api/messages",
     type: 'get',
     dataType: 'json',
     data: {id: last_message_id}
   })
   .done(function(message) {
    if (messages.length !== 0) {
     var insertHTML = '';
     $.each(messages, function(i, message) {
       insertHTML += buildHTML(message)
     });
     $('.message').append(insertHTML);
     $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    }
   })
   .fail(function(){
     alert('error');
   });
   $(function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
    });
 };