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
    $('#form_cadastro')[0].reset();
    $('#modal_cadastro').modal('hide');

});
