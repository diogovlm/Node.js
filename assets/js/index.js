$('#add_user').submit(function (event) {
  alert('Data Inserted Successfully');
});

$('#update_user').submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  console.log(unindexed_array);
  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value'];
  });

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: 'PUT',
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert('Data Updated Successfully');
  });
});

if (window.location.pathname == '/') {
  $ondelete = $('.table tbody td a.delete');
  $ondelete.click(function () {
    var id = $(this).attr('data-id');
    console.log(id);
    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: 'DELETE',
    };

    if (confirm('Você realmente deseja deletar esse cadastro?')) {
      $.ajax(request).done(function (response) {
        alert('Data Deleted Successfully');
        location.reload();
      });
    }
  });
}
