$(document).ready(function() {
    function emailVerification() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let resFlag = false;
        $('#udrEmailId').on('keyup blur', function(param) {
            if (String($(this).val().trim()).toLowerCase() == "") {
                $(this).siblings('.udrTickIcon').hide();
                $(this).parents('.udrOtherDetails').find('.udrVeriFiedBtn').hide().siblings('.udrVerifyBtn').fadeIn();
            }
        });
        $('#udrEmailVeriBtn').on('click', function(param) {
            resFlag = re.test(String($('#udrEmailId').val().trim()).toLowerCase());
            let _this = $(this);
            if (resFlag) {
                $(this).hide();
                $('.udrEmailVeriLinkBox').slideDown('fast');
                setTimeout(() => {
                    $('.udrEmailVeriLinkBox').slideUp('fast');
                    if ($(window).outerWidth() < 768) {
                        _this.parents('.udrOtherDetails').find('.udrVerificCol-1').find('.udrTickIcon').fadeIn()
                    } else {
                        _this.siblings('button').fadeIn();
                    }
                }, 5000);

            }
        });
    }

    function mobileVerification() {
        let re = /^[6-9]\d{9}$/;
        let resFlag = false;
        $('#udrMobileNumber,.udrOtpInputBox').on('keypress', function(e) {
            //if the letter is not digit then don't type anything
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });
        $('#udrMobileNumber').on('keyup blur', function(param) {
            if (String($(this).val().trim()).toLowerCase() == "") {
                $(this).siblings('.udrTickIcon').hide();
                $(this).parents('.udrOtherDetails').find('.udrVeriFiedBtn').hide().siblings('.udrVerifyBtn').fadeIn();
                $('.udrOtpMechBox').hide('fast');
            }
        });

        $('#udrMobVeriId').on('click', function(param) {
            resFlag = re.test(String($('#udrMobileNumber').val().trim()).toLowerCase());
            if (resFlag) {
                $(this).hide();
                $('.udrOtpVerifBox').slideDown('fast');
                $('.udrVerfcnMsg').css('display', 'inline-block');
                setTimeout(function(param) {
                    $('.udrVerfcnMsg').hide('fast');
                    $('.udrOtpMechBox').css('display', 'grid');
                    $("#udrOtpNumber").focus();
                }, 2500);

            }
        });
        $(".udrOtpInputBox").val("");

        $('#udrOtpVBtn').click(function() {
            if ($(this).find('.loading').is(":visible")) {
                return false;
            }
            if (!$(this).hasClass('btnDisabled')) {
                var _this = $(this);
                $(this).children('.udrBtnVeriText').hide().next('.loading').css('display', 'table');
                setTimeout(function() {
                    _this.children('.udrBtnVeriText').show().next('.loading').hide();
                    $('.udrOtpMechBox').hide();
                    $('.udrVerfdMsg').css('display', 'inline-block');
                    $('.udrOtpInputBox').val('');
                    $(_this).addClass('btnDisabled');
                    setTimeout(function() {
                        $('.udrVerfdMsg,.udrOtpVerifBox').hide('fast');

                        if ($(window).outerWidth() < 768) {
                            $('#udrMobileNumber').next('.udrTickIcon').fadeIn()
                        } else {
                            $('#udrMobVeriId').next('.udrVeriFiedBtn').fadeIn('fast');
                        }
                    }, 2500);


                }, 2500);
            }
        });

        $('.udrOtpContainer').on("keyup", '.udrOtpInputBox', function(e) {
            var arrKeyList = [8, 9, 14, 15, 16];
            if (arrKeyList.indexOf(e.keyCode) == -1) $(this).next('.udrOtpInputBox').focus();
            var $nonempty = $('.udrOtpContainer> .udrOtpInputBox').filter(function() {
                return this.value != '';
            });
            if ($nonempty.length == 4) {
                $('#udrOtpVBtn').removeClass('btnDisabled');
            } else {
                $('#udrOtpVBtn').addClass('btnDisabled');
            }
        });
        $('.udrOtpContainer').on("keydown", '.udrOtpInputBox', function(e) {
            if (e.keyCode == 8 && $(this).val().length == 0) {
                $(this).prev('.udrOtpInputBox').focus().val('');
                return false;
            }
        });


    }

    function validateUserId() {
        $('#udrCheckAvbBtn').on('click', function() {
            let ipText = $('#udrLoginId').val().trim();
            if (ipText == "" && ipText != 'gaurav') {
                $('.udrErrorStateBox').fadeOut();
            } else if (ipText == "gaurav") {
                $(this).addClass('udrAvlChkBtn').text('Available');
            } else {
                $(this).hide();
                $('.udrErrorStateBox').fadeIn();
            }

            // USE THIS IF GIVEN USERNAME IS AVAILABLE
            // ADD THESE CLASSES TO MAKE BUTTON AS AVAILABLE
            //$(this).addClass('udrAvlChkBtn').text('Available');
        });

        $('.udrUserIdText').on('click', function(param) {
            $(this).parents('.udrErrorStateBox').hide();
            $(this).parents('.udrErrorStateBox').prev('.udrOtherDetails').find('#udrLoginId').val($(this).text().trim());
            $(this).parents('.udrErrorStateBox').prev('.udrOtherDetails').find('#udrCheckAvbBtn').hide();
            if ($(window).outerWidth() < 768) {
                $(this).parents('.udrErrorStateBox').prev('.udrOtherDetails').find('.udrVerificCol-1').find('.udrTickIcon').fadeIn();
            } else {
                $(this).parents('.udrErrorStateBox').prev('.udrOtherDetails').find('#udrCheckAvbBtn').hide().siblings('.udrVeriFiedBtn').slideDown()
            }

        });
        $('#udrLoginId').on('keyup blur', function(param) {
            if ($(this).val().trim() == "") {
                $(this).siblings('.udrTickIcon').hide();
                $(this).parents('.udrOtherDetails').find('#udrCheckAvbBtn').removeClass('udrAvlChkBtn').text('Check Availability').fadeIn().siblings('.udrVeriFiedBtn').hide();
                $(this).parents('.udrOtherDetails').next('.udrErrorStateBox').hide();
            }
        });

    }

    function scrollSetting() {
        $(window).on('resize', function(param) {
            if ($(window).outerWidth() > 1023) {
                $('.udrRegInnerWrapper').mCustomScrollbar({
                    theme: "minimal-dark",
                    autoDraggerLength: true
                });
            }
        });
        if ($(window).outerWidth() > 1023) {
            $('.udrRegInnerWrapper').mCustomScrollbar({
                theme: "minimal-dark",
                autoDraggerLength: true
            });
        }
    }
    scrollSetting();
    validateUserId();
    mobileVerification();
    emailVerification();


});