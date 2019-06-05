let appendToList = function (value, taskId) {
    $('#containerTasks').append(
        $('<div/>').addClass('w3-panel w3-white w3-card w3-display-container task')
            .append(
                $('<span/>').addClass('w3-display-topright w3-padding w3-hover-red delTask').html('X')
            )
            .append(
                $('<p/>').addClass('w3-text-blue')
                    .html(
                        $('<b/>').html(value)
                    )
            )
            .attr('id', taskId)
            .hide()
            .fadeIn('300')
    );
};

let deleteFromlist = function (taskId) {
    let task = $('#containerTasks').find(`#${taskId}`);
    task.remove();
};
