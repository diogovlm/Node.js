$('#add_user').submit(function (event) {
  alert('Data Inserted Successfully');
});

$('#update_user').submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};
  //This 2 variables will get the full Specialities data instead of only the last one
  var checkboxes = document.getElementsByName("Especialidades");
  var updateEspecialidades = [];
  for (var i = 0; i<checkboxes.length;i++){
    if (checkboxes[i].checked){
      updateEspecialidades.push(checkboxes[i].value);
    }
  }
  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value'];
    data.Especialidades = updateEspecialidades;
  });

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: 'PUT',
    data: data
  };

  $.ajax(request).done(function (response) {
    alert('Cadastro atualizado com sucesso');
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
        alert('Cadastro deletado com sucesso');
        location.reload();
      });
    }
  });
}

