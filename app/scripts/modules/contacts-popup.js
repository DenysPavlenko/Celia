export default function () {
  // Popup
  var $contactsPopup = $('.contacts-popup');
  if (!$contactsPopup.length) { return }
  // Info
  var $contactsInfo = $('.contacts-info');
  var $contactsButton = $('.contacts__button');
  // Form
  var $contactsPopupClose = $('.contacts-popup__close');
  var $contactsForm = $('.contacts-popup__form');
  var $contactsFormInputs = $('.contacts-popup__input')

  // Show popup
  $contactsButton.on('click', showPopup);
  // Hide popup
  $contactsPopupClose.on('click', hidePopup);
  // Check form on submit
  $contactsForm.on('submit', function () {
    $contactsFormInputs.each(function () {
      var $this = $(this);
      // Validate inputs
      checkInput($this);
      // If input is not valid, then set
      // input listener on it
      if ($this.hasClass('input--is-invalid')) {
        $this.on('input', function () {
          checkInput($this);
        });
      }
    });
    if (!$contactsFormInputs.hasClass('input--is-invalid')) {
      hidePopup();
      setTimeout(function () {
        $contactsFormInputs.val('');
      }, 400);
    } else {
      return false;
    }
  });


  // Check input
  function checkInput(input) {
    var value = input.val();
    if (validateInput(input, value)) {
      input.removeClass('input--is-invalid');
    } else {
      input.addClass('input--is-invalid');
    }
  }
  // Input validator
  function validateInput(input, value) {
    var regx;
    // Regex for an email
    if (input.attr('type') === 'email') {
      regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    // Regex for a text
    if (input.attr('type') === 'text') {
      regx = /^.*[\d\w]+.*$/;
    }
    return regx.test(String(value).toLowerCase());
  }

  // Show popup function
  function showPopup() {
    $contactsPopup.addClass('contacts-popup--is-active');
    $contactsInfo.addClass('contacts-info--is-hidden');
  }
  // Hide popup function
  function hidePopup() {
    $contactsPopup.removeClass('contacts-popup--is-active');
    $contactsInfo.removeClass('contacts-info--is-hidden');
  }
}