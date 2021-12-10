$('.filterBtnGroup button').on('click', function (filterContent) {
  $('.filterBtnGroup button').attr('disabled', false);
  $(this).attr('disabled', true);
  $('.all').hide();
  $('.' + $(this).attr('id')).fadeIn();
  filterContent.preventDefault();
});
if (document.getElementById('allB')) {
  document.getElementById('allB').click();
}
