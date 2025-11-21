// Alert de envio de formulário da Jobsletter
document.getElementById('form-jobsletter').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Inscrição realizada com sucesso! Em breve você receberá as vagas no seu WhatsApp.');
  this.reset();
});