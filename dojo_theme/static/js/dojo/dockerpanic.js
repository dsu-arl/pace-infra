function dockerPanic(event) {
    event.preventDefault();
    const panic_button = $(event.currentTarget);
    const panic_modal = $('#panicModal');
    var result_message = panic_modal.find('#panicResult')
    panic_button.prop("disabled", true)
    
    const panic_message = "Stopping all workspace containers.";
    result_message.html(panic_message);
    var dot_max = 5;
    var dot_counter = 0;
    const panic_interval_id = setInterval(function loadmsg() {
        if (dot_counter < dot_max - 1){
            result_message.append(".");
            dot_counter++;
        }
        else {
            result_message.html(panic_message);
            dot_counter = 0;
        }
    }, 500);

    CTFd.fetch('/pwncollege_api/v1/docker/panic', {
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
        var result_message = panic_modal.find('#panicResult');
        clearInterval(panic_interval_id);

        if (result.success) {
            var message = 'Panic Completed!'
            result_message.html(message);
        }
        else {
            var message = "";
            message += "Error:";
            message += "<code>" + result.error + "</code>";
            result_message.html(message);
        }

        panic_modal.find("#panicConfirm").prop("disabled", false);
    }).catch(function (error) {
        clearInterval(panic_interval_id);
        console.error(error);
        var result_message = panic_modal.find('#panicResult');
        result_message.html("Submission request failed: " + ((error || {}).message || error));
        panic_modal.find("#panicConfirm").prop("disabled", false);
    })
}

$(() => {
    $("#panicConfirm").click(dockerPanic);
    $("#panicModal").on('show.bs.modal', function (event) {
        var result_message = $(this).find('#panicResult');
        result_message.html('Ready to panic');
    });
});
