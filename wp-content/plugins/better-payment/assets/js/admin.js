/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin.js":
/*!*************************!*\
  !*** ./src/js/admin.js ***!
  \*************************/
/***/ (() => {

eval("(function ($) {\n  $(document).ready(function () {\n    \"use strict\";\n\n    //Settings Page Starts\n    $(\".bp-tabs .tab__link\").on(\"click\", function (e) {\n      e.preventDefault();\n      $(\".bp-tabs .tab__link\").removeClass(\"active\");\n      $(this).addClass(\"active\");\n      var dataId = $(this).data(\"id\");\n      $(\".bp-tabs .tab__content__item\").removeClass(\"show\").fadeOut();\n      $(\"#\" + dataId).addClass(\"show\").fadeIn();\n    });\n    $(document).on(\"click\", \".sidebar__menu a\", function (e) {\n      e.preventDefault();\n      let sidebar_link_class = \"sidebar__link\";\n      if ($(this).hasClass(\"sidebar__link_submenu\")) {\n        sidebar_link_class = \"sidebar__link_submenu\";\n      }\n      $(\".sidebar__menu .\" + sidebar_link_class).removeClass(\"active\");\n      $(this).addClass(\"active\");\n      var dataId = $(this).data(\"id\");\n      $(\".content__area__body .sidebar__tab__content\").removeClass(\"show\").fadeOut();\n      $(\"#\" + dataId).addClass(\"show\").fadeIn();\n\n      //Auto active first submenu item\n      if ($(this).hasClass(\"sidebar__link\") && (dataId === \"admin-email\" || dataId === \"paypal\")) {\n        $(this).siblings(\"ul\").find(\"li a\").removeClass(\"active\");\n        $(this).siblings(\"ul\").find(\"li:first-child a\").addClass(\"active\");\n      }\n    });\n    $(document).on(\"click\", \".sidebar__item .sidebar__link, .email-additional-headers\", function (e) {\n      e.preventDefault();\n      let $this = $(this);\n      let bpTargetSelector = $(this).hasClass(\"email-additional-headers\") ? \".email-additional-headers-content\" : \".sub__menu\";\n      if ($this.siblings(bpTargetSelector).hasClass(\"show\")) {\n        $this.siblings(bpTargetSelector).removeClass(\"show\").slideUp();\n      } else {\n        $(bpTargetSelector + \".show\").slideUp().removeClass(\"show\");\n        $this.siblings(bpTargetSelector).addClass(\"show\").slideDown();\n      }\n    });\n\n    //PayPal toggle button\n    $(document).on(\"change\", '.better-payment-settings-payment-paypal input[name=\"better_payment_settings_payment_paypal_live_mode\"]', function (e) {\n      e.preventDefault();\n      let bpAdminSettingsPaymentPayPal = $(this).attr(\"data-targettest\");\n      if ($(this).is(\":checked\")) {\n        bpAdminSettingsPaymentPayPal = $(this).attr(\"data-targetlive\");\n      }\n      $(\".bp-paypal-key\").removeClass(\"bp-d-block\").addClass(\"bp-d-none\");\n      $(`.${bpAdminSettingsPaymentPayPal}`).removeClass(\"bp-d-none\").addClass(\"bp-d-block\");\n    });\n\n    //Stripe toggle button\n    $(document).on(\"change\", '.better-payment-settings-payment-stripe input[name=\"better_payment_settings_payment_stripe_live_mode\"]', function (e) {\n      e.preventDefault();\n      let bpAdminSettingsPaymentStripe = $(this).attr(\"data-targettest\");\n      if ($(this).is(\":checked\")) {\n        bpAdminSettingsPaymentStripe = $(this).attr(\"data-targetlive\");\n      }\n      $(\".bp-stripe-key\").removeClass(\"bp-d-block\").addClass(\"bp-d-none\");\n      $(`.${bpAdminSettingsPaymentStripe}`).removeClass(\"bp-d-none\").addClass(\"bp-d-block\");\n    });\n\n    //Paystack toggle button\n    $(document).on(\"change\", '.better-payment-settings-payment-paystack input[name=\"better_payment_settings_payment_paystack_live_mode\"]', function (e) {\n      e.preventDefault();\n      let bpAdminSettingsPaymentPaystack = $(this).attr(\"data-targettest\");\n      if ($(this).is(\":checked\")) {\n        bpAdminSettingsPaymentPaystack = $(this).attr(\"data-targetlive\");\n      }\n      $(\".bp-paystack-key\").removeClass(\"bp-d-block\").addClass(\"bp-d-none\");\n      $(`.${bpAdminSettingsPaymentPaystack}`).removeClass(\"bp-d-none\").addClass(\"bp-d-block\");\n    });\n\n    //Settings Save\n    $(document).on(\"click\", \".better-payment-admin-settings-button\", function (e) {\n      e.preventDefault();\n      let bpAdminSettingsForm = $(\"#better-payment-admin-settings-form\");\n      bpAdminSettingsSave(this, bpAdminSettingsForm);\n    });\n    function bpAdminSettingsSave(button, form) {\n      let bpAdminSettingsSaveBtn = $(button),\n        nonce = betterPaymentObj.nonce,\n        formData = $(form).serializeArray();\n      let bpIsFormValidated = bpValidateFormFields(formData);\n\n      //Reset button\n      $(\".better-payment-settings-reset\").val(0);\n      if ($(button).hasClass(\"better-payment-reset-button\")) {\n        $(\".better-payment-settings-reset\").val(1);\n      }\n      if (!bpIsFormValidated) {\n        return false;\n      }\n      let bpIsResetButton = $(button).hasClass(\"better-payment-reset-button\");\n      $.ajax({\n        type: \"POST\",\n        url: ajaxurl,\n        data: {\n          action: \"better_payment_settings_action\",\n          nonce: nonce,\n          form_data: formData,\n          reset_button: bpIsResetButton\n        },\n        beforeSend: function () {\n          bpAdminSettingsSaveBtn.addClass(\"is-loading\");\n        },\n        success: function (res) {\n          bpAdminSettingsSaveBtn.removeClass(\"is-loading\");\n          if (res.data === \"success\") {\n            toastr.success(\"Changes saved successfully!\");\n          } else {\n            toastr.error(\"Opps! something went wrong!\");\n          }\n        }\n      });\n    }\n    function bpValidateFormFields(formFields, emailFields = []) {\n      $(`#better-payment-admin-settings-form input`).removeClass(\"is-danger\");\n      if (!emailFields.length) {\n        emailFields = [\"better_payment_settings_general_email_to\", \"better_payment_settings_general_email_from_email\", \"better_payment_settings_general_email_reply_to\", \"better_payment_settings_general_email_cc\", \"better_payment_settings_general_email_bcc\", \"better_payment_settings_general_email_to_customer\", \"better_payment_settings_general_email_from_email_customer\", \"better_payment_settings_general_email_reply_to_customer\", \"better_payment_settings_general_email_cc_customer\", \"better_payment_settings_general_email_bcc_customer\", \"better_payment_settings_payment_paypal_email\"];\n      }\n      let formFieldName = \"\",\n        formFieldValue = \"\",\n        formField = \"\",\n        isFormFieldValidated = false,\n        errorMessageStr = \"\";\n      for (const property in formFields) {\n        formField = formFields[property];\n        formFieldName = formField.name;\n        formFieldValue = formField.value;\n        if (emailFields.indexOf(formFieldName) >= 0 && formFieldValue != \"\") {\n          isFormFieldValidated = admin_better_email_validation(formFieldValue);\n          if (!isFormFieldValidated) {\n            if (formFieldName == \"better_payment_settings_general_email_to\") {\n              errorMessageStr = \"Admin Email: To Email\";\n            } else if (formFieldName == \"better_payment_settings_general_email_from_email\") {\n              errorMessageStr = \"Admin Email: From Email\";\n            } else if (formFieldName == \"better_payment_settings_general_email_reply_to\") {\n              errorMessageStr = \"Admin Email: Reply-To\";\n            } else if (formFieldName == \"better_payment_settings_general_email_cc\") {\n              errorMessageStr = \"Admin Email: Cc\";\n            } else if (formFieldName == \"better_payment_settings_general_email_bcc\") {\n              errorMessageStr = \"Admin Email: Bcc\";\n            }\n            if (formFieldName == \"better_payment_settings_general_email_to_customer\") {\n              errorMessageStr = \"Customer Email: To Email\";\n            } else if (formFieldName == \"better_payment_settings_general_email_from_email_customer\") {\n              errorMessageStr = \"Customer Email: From Email\";\n            } else if (formFieldName == \"better_payment_settings_general_email_reply_to_customer\") {\n              errorMessageStr = \"Customer Email: Reply-To\";\n            } else if (formFieldName == \"better_payment_settings_general_email_cc_customer\") {\n              errorMessageStr = \"Customer Email: Cc\";\n            } else if (formFieldName == \"better_payment_settings_general_email_bcc_customer\") {\n              errorMessageStr = \"Customer Email: Bcc\";\n            } else if (formFieldName == \"better_payment_settings_payment_paypal_email\") {\n              errorMessageStr = \"PayPal Business Email\";\n            }\n            toastr.error(`Invalid email address on ${errorMessageStr} field!`);\n            $(`#better-payment-admin-settings-form input[name=\"${formFieldName}\"]`).addClass(\"is-danger\");\n            return false;\n          }\n        }\n      }\n      return true;\n    }\n    function admin_better_email_validation(email) {\n      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n    }\n    //Settings Page Ends\n\n    //Transaction Page Starts\n    $(document).on(\"change\", \".better-payment .header__show_entries select, .better-payment .showing-entities-html select\", function (e) {\n      e.preventDefault();\n      let perPageVal = $(this).val();\n      location = location.origin + location.pathname + location.search + \"&paged=1&per_page=\" + perPageVal + location.hash;\n    });\n    $(document).on(\"click\", \".better-payment-transaction-edit, .better-payment-transaction-email-resend\", function (e) {\n      e.preventDefault();\n      toastr.warning(\"Coming REAL Soon!\");\n    });\n    $(document).on(\"click\", \".better-payment-transaction-reset\", function (e) {\n      e.preventDefault();\n      let main_page = window.location.href.split(\"?\")[0];\n      window.location = main_page + '?page=better-payment-transactions';\n    });\n\n    // Delete Transaction\n    $(document).on(\"click\", \".better-payment-admin-transactions-page .delete-button\", function (e) {\n      e.preventDefault();\n      let transactionId = $(this).attr(\"data-id\");\n      let parentTr = $(this).closest(\".table__row\");\n      let nonce = betterPaymentObj.nonce,\n        dTAlertConfirm = betterPaymentObj.alerts.confirm,\n        dTAlertConfirmDescription = betterPaymentObj.alerts.confirm_description,\n        dTAlertYes = betterPaymentObj.alerts.yes,\n        dTAlertNo = betterPaymentObj.alerts.no,\n        dTMessageNoAction = betterPaymentObj.messages.no_action_taken,\n        dTMessageError = betterPaymentObj.messages.error,\n        dTMessageSuccess = betterPaymentObj.messages.success;\n      let currentPage = $(\".better-payment .hidden-fields .paged\").val();\n      let perPage = $(\".better-payment .per-page\").val();\n      let totalEntryCount = $(\".better-payment .hidden-fields .total-entry\").val();\n      Swal.fire({\n        title: dTAlertConfirm,\n        text: dTAlertConfirmDescription,\n        icon: \"warning\",\n        showCancelButton: true,\n        confirmButtonColor: \"#3085d6\",\n        cancelButtonColor: \"#d33\",\n        confirmButtonText: `${dTAlertYes}`,\n        cancelButtonText: `${dTAlertNo}`,\n        focusCancel: 1\n      }).then(result => {\n        let isConfirmed = typeof result.value != \"undefined\" && result.value == true;\n        if (isConfirmed) {\n          $.ajax({\n            type: \"POST\",\n            url: ajaxurl,\n            data: {\n              action: \"better-payment-delete-transaction\",\n              nonce: nonce,\n              id: transactionId,\n              currentPage: currentPage,\n              perPage: perPage,\n              totalEntryCount: totalEntryCount\n            },\n            success: function (res) {\n              if (res.success) {\n                parentTr.fadeOut(\"slow\");\n                $(\".better-payment .showing-entities-html span\").html(res.data.pagination_showing_entities_html);\n                $(\".better-payment .hidden-fields .total-entry\").val(totalEntryCount - 1);\n                toastr.success(res.data.message);\n              } else {\n                toastr.error(res.data.message);\n              }\n            }\n          });\n        } else if (result.dismiss == \"cancel\") {} else if (result.dismiss == \"esc\") {}\n      });\n    });\n\n    //Pagination\n\n    //Filter transactions\n    $(document).on(\"click\", \".better-payment-transaction-filter\", function (e) {\n      e.preventDefault();\n      let paymentFromDate = $(\".better-payment input[name='payment_date_from']\").val();\n      let paymentToDate = $(\".better-payment input[name='payment_date_to']\").val();\n      if (paymentFromDate != \"\" && paymentToDate != \"\") {\n        if (paymentFromDate > paymentToDate) {\n          toastr.error(\"From Date must be smaller than To Date!\");\n          return false;\n        }\n      }\n      let tableSelector = $(\".better-payment-admin-transactions-page .transaction__table\");\n      let filterFormData = {};\n      filterFormData.search_text = $(\".better-payment .serch-text\").val();\n      filterFormData.payment_date_from = paymentFromDate;\n      filterFormData.payment_date_to = paymentToDate;\n      filterFormData.order_by = $(\".better-payment input[name='order_by[]']:checked\").val();\n      filterFormData.order = $(\".better-payment input[name='order[]']:checked\").val();\n      filterFormData.status = $(\".better-payment input[name='status[]']:checked\").val();\n      filterFormData.source = $(\".better-payment input[name='source[]']:checked\").val();\n      filterFormData.paged = $(\".better-payment .paged\").val();\n      filterFormData.per_page = $(\".better-payment .per-page\").val();\n      filterFormData.total_entry = $(\".better-payment .total-entry\").val();\n      bpTransactionFilter(tableSelector, filterFormData);\n    });\n    let elements = document.getElementsByClassName(\"bp-copy-clipboard\");\n    Array.from(elements).forEach(function (element) {\n      element.addEventListener(\"click\", bpTransactionIdCopy);\n    });\n    function bpTransactionIdCopy() {\n      let bpTxnCounter = $(this).attr(\"data-bp_txn_counter\");\n      let node = \"bp_copy_clipboard_input_\" + bpTxnCounter;\n      node = document.getElementById(node);\n      if (document.body.createTextRange) {\n        const range = document.body.createTextRange();\n        range.moveToElementText(node);\n        range.select();\n        document.execCommand(\"copy\");\n      } else if (window.getSelection) {\n        const selection = window.getSelection();\n        const range = document.createRange();\n        range.selectNodeContents(node);\n        selection.removeAllRanges();\n        selection.addRange(range);\n        document.execCommand(\"copy\");\n        selection.removeAllRanges();\n      } else {\n        console.warn(\"Could not select text in node: Unsupported browser.\");\n      }\n      $(\".bp-copy-clipboard\").attr(\"title\", \"Copy\").css(\"color\", \"#2a3256\");\n      $(this).attr(\"title\", \"Copied!\").css(\"color\", \"#6e58f7\");\n    }\n    function bpTransactionFilter(tableSelector, filterFormData) {\n      $.ajax({\n        type: \"POST\",\n        url: ajaxurl,\n        data: {\n          action: \"better-payment-filter-transaction\",\n          nonce: betterPaymentObj.nonce,\n          filterFormData: filterFormData\n        },\n        dataType: \"html\",\n        beforeSend: function () {\n          tableSelector.css(\"opacity\", \".5\");\n        },\n        success: function (resultHtml) {\n          $(\".better-payment .transaction-table-wrapper\").replaceWith(resultHtml);\n          tableSelector.css(\"opacity\", \"1\");\n        }\n      });\n    }\n\n    // Custom Dropdown Button\n    $(document).on(\"click\", \".better-payment .bp_time_period-custom-range\", function (e) {\n      $(\".better-payment .modal.bp-custom-time-period\").addClass(\"is-active\");\n    });\n    $(document).on(\"click\", \".bp-select-custom-button\", function (e) {\n      e.preventDefault();\n      let $this = $(this);\n      let dataTarget = $this.attr(\"data-target\");\n      $(dataTarget).toggleClass(\"is-hidden\");\n      let dropdownInputs = ['status', 'order_by', 'order', 'source'];\n      hideOtherDropdownsV2(dropdownInputs, dataTarget);\n    });\n    $(document).on(\"click\", \"body\", function (e) {\n      let dropdownInputs = ['status', 'order_by', 'order', 'source'];\n      hideOtherDropdowns(dropdownInputs, e);\n    });\n    $(\".bp-select-custom-button-dropdown input[type='checkbox']\").change(function () {\n      let inputName = $(this).attr(\"name\");\n      inputName = inputName.replace(\"[]\", \"\");\n      let inputValueDefault = $(this).closest('.bp-select-custom-button-dropdown').attr(\"data-defaultvalue\");\n      if (this.checked) {\n        //Uncheck other checkboxes but this one\n        $(`.${inputName}-dropdown input[name='${inputName}[]']`).not(this).prop(\"checked\", false);\n        updateDropdownText(this.value, inputName);\n      } else {\n        //If four checkboxes are unchecked then check Default checkbox\n        if (!$(`.${inputName}-dropdown input[name='${inputName}[]']:checked`).length) {\n          if (typeof inputValueDefault !== \"undefined\") {\n            $(`.${inputName}-dropdown .${inputName}-${inputValueDefault}`).prop(\"checked\", true);\n          }\n          updateDropdownText(capitalizeFirstLetter(inputName), inputName);\n        }\n      }\n    });\n    $('#better-payment-admin-settings-form .serch-text').keypress(function (e) {\n      if (e.which == 13) {\n        $('.better-payment-transaction-filter').trigger('click');\n        return false;\n      }\n    });\n    function hideOtherDropdowns(inputs = ['status', 'source'], e, containerClass = 'bp-select-custom-button-wrap') {\n      let filter_button_container = $(`.${containerClass}`);\n      if (!filter_button_container.is(e.target) && filter_button_container.has(e.target).length === 0) {\n        if (inputs.length > 0) {\n          inputs.forEach(function (input) {\n            if (!$(`.${input}-dropdown`).hasClass(\"is-hidden\")) {\n              $(`.${input}-dropdown`).addClass(\"is-hidden\");\n            }\n          });\n        }\n      }\n    }\n    function hideOtherDropdownsV2(inputs, dataTarget) {\n      let currentInputName = dataTarget.replace(\".\", \"\").replace(\"-dropdown\", \"\");\n      if (inputs.length > 0) {\n        inputs.forEach(function (inputName) {\n          if (inputName !== currentInputName) {\n            if (!$(`.${inputName}-dropdown`).hasClass(\"is-hidden\")) {\n              $(`.${inputName}-dropdown`).addClass(\"is-hidden\");\n            }\n          }\n        });\n      }\n    }\n    function capitalizeFirstLetter(string) {\n      let capitalized = string.charAt(0).toUpperCase() + string.slice(1);\n      return capitalized.replace('_', ' ');\n    }\n    function updateDropdownText(text, inputName = \"status\", buttonTextPrefix = \"\") {\n      $(`.${inputName}-button-text`).html(buttonTextPrefix + capitalizeFirstLetter(text));\n    }\n\n    //Transaction Export\n    $(document).on(\"click\", \".better-payment-transaction-export\", function (e) {\n      bpTransactionExport();\n    });\n    function bpTransactionExport() {\n      $(\".better-payment .better-payment-transaction-export\").text(\"Exporting...\");\n      $.ajax({\n        type: \"POST\",\n        url: ajaxurl,\n        data: {\n          action: \"better-payment-transactions-export\",\n          nonce: betterPaymentObj.nonce\n        },\n        success: function (res) {\n          /*\n          * Make CSV downloadable\n          */\n          var downloadLink = document.createElement(\"a\");\n          var fileData = ['\\ufeff' + res];\n          var blobObject = new Blob(fileData, {\n            type: \"text/csv;charset=utf-8;\"\n          });\n          var url = URL.createObjectURL(blobObject);\n          downloadLink.href = url;\n          downloadLink.download = \"better_payment_transactions.csv\";\n\n          /*\n          * Actually download CSV\n          */\n          document.body.appendChild(downloadLink);\n          downloadLink.click();\n          document.body.removeChild(downloadLink);\n          $(\".better-payment .better-payment-transaction-export\").text(\"Export All\");\n        }\n      });\n    }\n    //Transaction Page Ends\n\n    //Helper Functions Starts\n    function toasterOptions() {\n      toastr.options = {\n        timeOut: \"2000\",\n        toastClass: \"font-size-md\",\n        positionClass: \"toast-top-center\",\n        showMethod: \"slideDown\",\n        hideMethod: \"slideUp\"\n      };\n    }\n    toasterOptions();\n    $(\".bp-datepicker\").datepicker({\n      dateFormat: \"dd-mm-yy\"\n    });\n    //Helper Functions Ends\n  });\n})(jQuery);\n\n//# sourceURL=webpack://better-payment/./src/js/admin.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/admin.js"]();
/******/ 	
/******/ })()
;