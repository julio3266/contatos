atualizarTabela();
function atualizarTabela() {
    let contatinhos = localStorage.getItem('contatinhos') || '[]';
    contatinhos = JSON.parse(contatinhos);
    $('#tabela-contatos').html('');
    contatinhos.map((cadaContato, indice) => {
        $('#tabela-contatos').append(`
        <tr>
            <td>${cadaContato.nome}</td>
            <td>${cadaContato.email}</td>
            <td>${cadaContato.telefone}</td>
        <td>
            <button data-action="confirmar-excluir" data-id="${indice}" class="d-none btn btn-outline-danger">
                confirmar
            </button>
            <button data-id="${indice}" data-action="excluir" class="btn btn-danger btn-sm">
                <i class="material-icons">clear</i>
            </button>
            <button class="btn btn-warning btn-sm">
                <i class="material-icons">edit</i>
            </button>
        </td>
        </tr>
        
        `);
    });
}
$('#form_cadastro').submit( (evento) => {
    evento.preventDefault();

    let contato = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        telefone: $('#telefone').val()
    };
    let contatinhos = localStorage.getItem('contatinhos') || '[]';
    contatinhos = JSON.parse(contatinhos);
    contatinhos.push(contato);
    localStorage.setItem('contatinhos', JSON.stringify(contatinhos));
    atualizarTabela();
    $('#form_cadastro')[0].reset();
    $('#modal_cadastro').modal('hide');
});
$('#buscar').keyup(function(){
    let valor = $(this).val();
    $('#tabela-contatos > tr').filter(function(){
        $(this).toggle(
            $(this).text().indexOf(valor) > -1
        );
    });
});

$(document).on('click', '[data-action="excluir"]', function() {
    let indice = $(this).attr('data-id');

    $(`button[data-id="${indice}"][data-action$="confirmar-excluir"]`).removeClass('d-none');
    $(this).addClass('d-none')
});
$(document).on('click', '[data-action="confirmar-excluir"]', function(){
    let indice = $(this).attr('data-id');

    let contatinhos = JSON.parse(
        localStorage.getItem('contatinhos')
    );
    contatinhos.splice(indice, 1);
    localStorage.setItem('contatinhos', JSON.stringify(contatinhos));
    atualizarTabela();
});