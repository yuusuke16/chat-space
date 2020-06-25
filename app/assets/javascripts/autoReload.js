$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message-info">
          <div class="message-info-talker">
            ${message.user_name}
          </div>
          <div class="message-info-data">
            ${message.created_at}
          </div>
        </div>
        <div class="message-text">
          <p class="message-text-text">
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
          <div class="message-info-talker">
            ${message.user_name}
          </div>
          <div class="message-info-data">
            ${message.created_at}
            </div>
          </div>
        <div class="message-text">
          <p class="message-text-text">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.message:last').data("message-id") ||0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });

        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});