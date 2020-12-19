(function() {
    let status = localStorage.getItem("login");
    if (status == null || status === undefined || status === "false") {
        location.assign("./index.html");
    }
})();
let dataLength = 0;
// fetching the data
$.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products', (data) => {
    dataLength = data.length;
    renderTableData(data)
});
// table data rendering
function renderTableData(data) {
    $('#count').text('Count: ' + dataLength++);
    data.map(function(currentValue) {
        let date = currentValue.expiryDate.replace('-', ' ');
        date = date.replace('-', ', ');
        $('tbody').append(`
        <tr class="table-row">
        <td class="secondary-text">${currentValue.id}</td>
        <td class="primary-text">${currentValue.medicineName}</td>
        <td class="secondary-text">${currentValue.medicineBrand}</td>
        <td class="primary-text">${date}</td>
        <td class="secondary-text">$${currentValue.unitPrice}</td>
        <td class="secondary-text">${currentValue.stock}</td>
        </tr>`)
    });
}
$('#filter-options').append(`
<p id="count" >Count: </p>
<label class="filter-checkbox">
    <input type="checkbox" name="product-expired" checked="">Expired
</label>
<label class="filter-checkbox">
        <input type="checkbox" name="product-low-stock" checked="">Low Stock
    </label>
    `);
$(document).ready(function() {
    //logout functionality
    $('#logout-btn').click(() => {
        localStorage.removeItem("login");
        location.assign("./index.html");
    });
    // expired checkbox handling
    $("input[name= product-expired]").change(() => {
        let date = new Date();
        date = Date.parse(date);
        if ($("input[name=product-expired]").prop('checked') === false) {
            $("tbody tr").filter(function(index) {
                if (Date.parse($('tbody tr td:nth-child(4)')[index].innerText) < date) {
                    $('tbody tr')[index].style.display = "none";
                }
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            });
        } else {
            $("tbody tr").filter(function() {
                $("tbody tr").show();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            })
        }
    });
    // low stock checkbox handling
    $("input[name= product-low-stock]").change(() => {
        if ($("input[name=product-low-stock]").prop('checked') === false) {
            $("tbody tr").filter(function(index) {
                if ($('tbody tr td:nth-child(6)')[index].innerText < 100) {
                    $('tbody tr')[index].style.display = "none";
                }
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            });
        } else {
            $("tbody tr").filter(function() {
                $("tbody tr").show();
                let numOfVisibleRows = $('tbody tr:visible').length;
                $('#count').text('Count: ' + numOfVisibleRows);
            })
        }
    });
})