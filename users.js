(function() {
    let status = localStorage.getItem("login");
    if (status == null || status === undefined || status === "false") {
        location.assign("./index.html");
    }
})();
//fetching the data
$.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users', data => {
    renderTableData(data)
});
// table data rendering
function renderTableData(data) {
    data.map(function(currentValue) {
        let date = currentValue.dob.replace('-', ' ');
        date = date.replace('-', ', ');
        $('tbody').append(`
        <tr class="table-row ">
        <td class="secondary-text">${currentValue.id}</td>
        <td class="primary-text">
            <img src="${currentValue.profilePic}" alt="Profile Pic">
        </td>
        <td class="secondary-text">${currentValue.fullName}</td>
        <td class="primary-text">${date}</td>
        <td class="secondary-text">${currentValue.gender}</td>
        <td class="secondary-text">${currentValue.currentCity}, ${currentValue.currentCountry}</td>
    </tr>
    `)
    });
}
$(document).ready(function() {
    //logout functionality
    $('#logout-btn').click(() => {
        localStorage.removeItem("login");
        location.assign("./index.html");
    });
    // search functionality
    $('#search-wrapper').submit((e) => {
        e.preventDefault();
        let value = $('#search-box').val().toLowerCase();
        if (value.length < 2) {
            alert('Please enter at least 2 characters');
        } else {
            // fetching the data realted to search
            $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=' + value, (data) => {
                // clearing the table
                $('tbody').empty();
                renderTableData(data);
            });
        }
    });
    $('#reset-btn').click(() => {
        // reseting the table
        $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users', data => {
            $('tbody').empty();
            renderTableData(data);
        });
    });
})