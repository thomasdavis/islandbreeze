
jQuery(document).ready(function() {

	jQuery('#earth_contact_form').submit(function() {
	
		// Disable the submit button
		jQuery('#earth_contact_form input[type=submit]')
			.attr('value', 'Sending message…')
			.attr('disabled', 'disabled');
	
		// AJAX POST request
		jQuery.post(
			jQuery(this).attr('action'),
			{
				name:jQuery('#name').val(),
				email:jQuery('#email').val(),
				message:jQuery('#message').val()
			},
			function(errors) {
				// No errors
				if (errors == null) {
					jQuery('#earth_contact_form')
						.hide()
						.html('<h3>Thank you</h3><p>Your message has been sent.</p>')
						.show();
				}
	
				// Errors
				else {
					// Re-enable the submit button
					jQuery('#earth_contact_form input[type=submit]')
						.removeAttr('disabled')
						.attr('value', 'Send your Question');
	
					// Technical server problem, the email could not be sent
					if (errors.server != null) {
						alert(errors.server);
						return false;
					}
	
					// Empty the errorbox and reset the error alerts
					jQuery('#earth_contact_form .status').html('<ul></ul>').show();
					jQuery('#earth_contact_form li').removeClass('alert');
	
					// Loop over the errors, mark the corresponding input fields,
					// and add the error messages to the errorbox.
					for (field in errors) {
						if (errors[field] != null) {
							jQuery('#' + field).parent('li').addClass('alert');
							jQuery('#earth_contact_form .status ul').append('<li>' + errors[field] + '</li>');
						}
					}
				}
			},
			'json'
		);
	
		// Prevent non-AJAX form submission
		return false;
	});

});
