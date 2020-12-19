(function() {
    let status = localStorage.getItem("login");
    if (status == null || status === undefined || status === "false") {
        location.assign("./index.html");
    }
})();
var dataLength = 0;
// fetching the data
$.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders', function(data) {
    renderTableData(data)
});
// funtion for table data rendering
function renderTableData(data) {
    data.map(function(currentValue) {
        $('#count').text('Count: ' + ++dataLength);
        let date = currentValue.orderDate.replace('-', ' ');
        date = date.replace('-', ', ');
        $('tbody').append(`
        <tr class="table-row">
        <td class="secondary-text">${currentValue.id}</td>
        <td class="primary-text">${currentValue.customerName}</td>
        <td class="primary-text">${date}<br>
            <span class="secondary-text">${currentValue.orderTime}</span>
        </td>
        <td class="secondary-text">$${currentValue.amount}</td>
        <td class="primary-text">${currentValue.orderStatus}</td>
    </tr>`)
    });
}

$('#filter-options').append(`
<p id= "count">Count: 0</p>
<label class="filter-checkbox">
    <input type="checkbox" name="orders-new" checked="">
    New
</label>
<label class="filter-checkbox">
    <input type="checkbox" name="orders-packed" checked="">
    Packed
</label>
<label class="filter-checkbox">
    <input type="checkbox" name="orders-transit" checked="">
    InTransit
</label>
<label class="filter-checkbox">
    <input type="checkbox" name="orders-delivered" checked="">
    Delivered
</label>`);

$(document).ready(function() {
    //logout functionality
    $('#logout-btn').click(() => {
        localStorage.removeItem("login");
        location.assign("./index.html");
    });
    // handling of checkbox toggle
    // new checkbox
    $("input[name=orders-new]").change(() => {
        if ($("input[name=orders-new]").prop('checked') === false) {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('New'),tbody tr:contains('new')").hide();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            });
        } else {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('New'),tbody tr:contains('new')").show();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            })
        }
    });
    // packed checkbox
    $("input[name=orders-packed]").change(() => {
        if ($("input[name=orders-packed]").prop('checked') === false) {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('Packed'),tbody tr:contains('packed')").hide();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            });
        } else {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('Packed'),tbody tr:contains('packed')").show();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            })
        }
    });
    // transit checkbox
    $("input[name=orders-transit]").change(() => {
        if ($("input[name=orders-transit]").prop('checked') === false) {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('Transit'),tbody tr:contains('transit')").hide();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            });
        } else {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('Transit'),tbody tr:contains('transit')").show();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            })
        }
    });
    // delivered checkbox
    $("input[name=orders-delivered]").change(() => {
        if ($("input[name=orders-delivered]").prop('checked') === false) {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('Delivered'),tbody tr:contains('delivered')").hide();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            });
        } else {
            $("tbody tr").filter(function() {
                $("tbody tr:contains('Delivered'),tbody tr:contains('delivered')").show();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            })
        }
    });
});