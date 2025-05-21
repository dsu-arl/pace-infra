function dockerPanic(event) {
    event.preventDefault();
    const panic_button = $(event.currentTarget);
    
    var result_notification = item.find('#result-notification');
    var result_message = item.find('#result-message');
    result_notification.removeClass('alert-danger');
    result_notification.addClass('alert alert-warning alert-dismissable text-center');
    result_message.html("Loading.");
    result_notification.slideDown();
    var dot_max = 5;
    var dot_counter = 0;
    setTimeout(function loadmsg() {
        if (result_message.html().startsWith("Loading")) {
            if (dot_counter < dot_max - 1){
                result_message.append(".");
                dot_counter++;
            }
            else {
                result_message.html("Loading.");
                dot_counter = 0;
            }
            setTimeout(loadmsg, 500);
        }
    }, 500);

    CTFd.fetch('/pwncollege_api/v1/docker', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        if (response.status === 403) {
            // User is not logged in or CTF is paused.
            window.location =
                CTFd.config.urlRoot +
                "/login?next=" +
                CTFd.config.urlRoot +
                window.location.pathname +
                window.location.hash;
        }
        return response.json();
    }).then(function (result) {
        var result_notification = item.find('#result-notification');
        var result_message = item.find('#result-message');

        result_notification.removeClass();

        if (result.success) {
            var message = `Challenge successfully started! You can interact with it through a <a href="/workspace/code" target="dojo_workspace">VSCode Workspace</a> or a <a href="/workspace/desktop" target="dojo_workspace">GUI Desktop Workspace</a>.`;
            result_message.html(message);
            result_notification.addClass('alert alert-info alert-dismissable text-center');

            $(".challenge-active").removeClass("challenge-active");
            item.find(".challenge-name").addClass("challenge-active");
            setTimeout(() => updateNavbarDropdown(), 1000);
        }
        else {
            var message = "";
            message += "Error:";
            message += "<br>";
            message += "<code>" + result.error + "</code>";
            message += "<br>";
            result_message.html(message);
            result_notification.addClass('alert alert-warning alert-dismissable text-center');
        }

        result_notification.slideDown();
        item.find("#challenge-start").removeClass("disabled-button");
        item.find("#challenge-start").prop("disabled", false);
        item.find("#challenge-practice").removeClass("disabled-button");
        item.find("#challenge-practice").prop("disabled", false);

        setTimeout(function() {
            item.find(".alert").slideUp();
            item.find("#challenge-submit").removeClass("disabled-button");
            item.find("#challenge-submit").prop("disabled", false);
        }, 60000);
    }).catch(function (error) {
        console.error(error);
        var result_message = item.find('#result-message');
        result_message.html("Submission request failed: " + ((error || {}).message || error));
        result_notification.addClass('alert alert-warning alert-dismissable text-center');
    })
}

