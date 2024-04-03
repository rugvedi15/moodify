$(document).ready(function () {
    $("#send-btn").click(function () {
        sendMessage();
    });

    $("#user-input").keypress(function (e) {
        if (e.which === 13) { // Enter key pressed
            sendMessage();
        }
    });

    function sendMessage() {
        var userInput = $("#user-input").val();
        if (userInput.trim() !== "") {
            addUserMessage(userInput);
            getUserResponse(userInput);
            $("#user-input").val("");
        }
    }

    function addUserMessage(message) {
        $("#chat-box").append('<div class="user-message">' + message + '</div>');
        scrollToBottom();
    }

    function addBotMessage(message) {
        $("#chat-box").append('<div class="bot-message">' + message + '</div>');
        scrollToBottom();
    }

    function scrollToBottom() {
        var chatBox = document.getElementById("chat-box");
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getUserResponse(message) {
        $.ajax({
            type: "POST",
            url: "/chat",
            contentType: "application/json",
            data: JSON.stringify({ message: message }),
            success: function (response) {
                addBotMessage(response.message);
            },
            error: function () {
                addBotMessage("Sorry, an error occurred. Please try again later.");
            }
        });
    }
});
