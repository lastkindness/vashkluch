(function () {

    "use strict";

    var body = document.querySelector('body'),
        isMobile = false,
        scrollTopPosition,
        browserYou,
        _winWidth = $(window).outerWidth();

    var genFunc = {

        initialized: false,
        initialize: function () {

            if (this.initialized) return;

            this.initialized = true;

            this.build();
        },

        build: function () {
            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if (navigator.userAgent.indexOf("Edge") > -1) {
                document.documentElement.classList.add('edge');
            }
            if (navigator.userAgent.search(/Macintosh/) > -1) {
                document.documentElement.classList.add('macintosh');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Обновите браузер');
            }
            if (document.querySelector('.yearN') !== null) {
                this.copyright();
            }
        },
        copyright: function () {
            var yearBlock = document.querySelector('.yearN'),
                yearNow = new Date().getFullYear().toString();
            if (yearNow.length) {
                yearBlock.innerText = yearNow;
            }
        },
        getBrowser: function () {
            var ua = navigator.userAgent;
            var bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();

            var version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            var platform = 'desktop';
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            var browsrObj;
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
    };
    genFunc.initialize();


    // $(document).on("click", ".js_validate button[type=submit], .js_validate input[type=submit]", function () {
    //     var valid = validate($(this).parents(".js_validate"));
    //     if (valid == false) {
    //         return false;
    //     }
    // });

    $(document).ready(function(){
        setTimeout(function(){
            window.scrollTo(0, 0);
        }, 1);
    });
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top < 100) {
            $(".go-to-top").removeClass('act');
        } else {
            $(".go-to-top").addClass('act');
        }
    });
    /*Function for go to top*/
    $('.go-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*Function for go to top end*/

    /*Function for link scroll*/
    $(document).ready(function() {
        $("a.scrollto").click(function() {
            var elementClick = $(this).attr("href")
            var destination = $(elementClick).offset().top - ($(window).outerHeight()/2);
            jQuery("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination
            }, 800);
            return false;
        });
    });
    /*Function for link scroll*/

    function elevateZoom () {
        if ($(window).width() > 1030) {
            $($('.gallery-images .slick-active img')[0]).elevateZoom({
                zoomType: "window",
                scrollZoom: "true",
                cursor: "crosshair",
                zoomLevel: 0.5,
                zoomWindowHeight:650,
                zoomWindowWidth:650
            });
        }
    }

    /*Function for same height*/
    function heightBlock() {
        $('.js_height-block').each(function (i, e) {
                var elH = e.getElementsByClassName("height");
                var maxHeight = 0;
                for (var i = 0; i < elH.length; ++i) {
                    elH[i].style.height = "";
                    if (maxHeight < elH[i].clientHeight) {
                        maxHeight = elH[i].clientHeight;
                    }
                }
                for (var i = 0; i < elH.length; ++i) {
                    elH[i].style.height = maxHeight + "px";
                }
            }
        )};

    /*CustomInputNumber start*/
    if(jQuery('.input-number').length) {
        jQuery('.input-number').each(function() {
            var spinner = jQuery(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.input-number_arrow.next'),
                btnDown = spinner.find('.input-number_arrow.prev'),
                min = input.attr('min'),
                max = input.attr('max');
            spinner.click(function (e) {
               e.stopPropagation();
               e.preventDefault();
            });
            btnUp.click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                if(spinner.hasClass("disabled")) {
                } else {
                    var oldValue = parseFloat(input.val());
                    if (oldValue >= max) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue + 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                }
            });
            btnDown.click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
        });
    }
    /*CustomInputNumber end*/

    //tub_block click
    if ($(".tub_filter").length) {
        $(".tub_filter .tub_header li").on('click', function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".main_cont .tub_body").hide().eq($(this).index()).show();
        });
    }
    //tub_block click

    /* -------------------------------------------------------------------------
   begin Validation
   * ------------------------------------------------------------------------- */
    $(document).ready(function () {

        $(document).on("change", '.js_validate *[required]', function () {
            $(this).each(function () {
                var valid = validate($(document).find($(this)));
                if (valid == false) {
                    console.log("valid not passed");
                    return false;
                } else {
                    console.log("valid passed");
                }
            });

        });


        $('.js_validate .btn[type="submit"]').on("click", function () {
            var valid = validate($(document).find($(this).parents(".js_validate")));
            if (valid == false) {
                console.log("valid not passed");
                return false;
            } else {
                console.log("valid passed");
            }
        });


    });

    function formatValidate(inputFile) {
        function showMsg(massage) {
            $($($($(inputFile)[0]).siblings(".text-error"))[0]).text(massage);
            $(inputFile[0]).closest(".input-container__file").addClass("error");
            return false;
        }

        var format = [".pdf", ".txt", ".doc", ".docx", ".rtf", ".odt"];
        if ((inputFile)[0].files.length!=1) {
            showMsg($($(inputFile)[0]).attr("data-error-existence"));
            return false;
        } else {
            var file = (inputFile)[0].files;
            var fileName = file[0].name;
            if ((file[0].size/1024/1024) < 5) {
                for (var i = 0; i < format.length; i++) {
                    if (-1 !== fileName.indexOf(format[i])) {
                        $($(inputFile)[0]).closest(".input-container__file").removeClass("error");
                        $($(inputFile)[0]).closest(".input-container__file").addClass("pass");
                        $($(inputFile)[0]).siblings(".text-error").text("");
                        return true;
                    } else {
                        showMsg($($(inputFile)[0]).attr("data-error-type"));
                    }
                }
            }
            else {
                showMsg($($(inputFile)[0]).attr("data-error-size"));
            }
        }
    }


    function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item = form.find("[required]");
        var e = 0;
        var reg = undefined;
        var pass = $('.password').val();
        var pass1 = $('.password_1').val();
        var passold = $('.password_old').val();
        var email = false;
        var password = false;
        var password_1 = false;
        var password_old = false;
        var phone = false;
        var undef = false;
        var date = false;
        var number = false;
        var arr = [];

        function mark(object, expression, minSign, maxSign) {
            if (expression) {
                object.parent('div').addClass(error_class).removeClass(norma_class);
                if (email) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 37) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        } else {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_old) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==pass||object.val()==pass1) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==passold) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            } else if (object.val()!==pass1) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-new"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_1) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==passold) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            }  else if (object.val()!==pass) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-new"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (phone) {
                    if (object.val().length != 17) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (date) {
                    if (object.val().length != 4) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (number) {
                    if (object.val().length < 4 ||object.val().length > 100) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (undef) {
                    if (object.val().length > 0) {
                        if (object.val().length > minSign && object.val().length < maxSign) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        } else {
                            object.parent('div').find('.text-error').text('Введите колличество символов (2-100)');
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                e++;
            } else {
                if($(object[0]).hasClass("select")) {
                    if($(object[0]).prop("selectedIndex")!=0) {
                        object.parent('div').addClass(norma_class).removeClass(error_class);
                        e = 0;
                    } else {
                        object.parent('div').addClass(error_class).removeClass(norma_class);
                        e = 0;
                    }
                } else {
                    object.parent('div').addClass(norma_class).removeClass(error_class);
                    e = 0;
                }
            }
            arr.push(expression);
        }

        if(form.hasClass('js_validate')) {
            var field = form.find("[required]"),
                select = form.find('.js_valid_select'),
                radio = form.find('.js_valid_radio'),
                file = form.find('.input-container__file'),
                checkbox = form.find('.js_valid_checkbox');
            field.each(function () {
                var dataValidate = $(this).attr("data-validate");
                caseDataValidate(dataValidate, $(this));
            });
            select.each(function () {
                validSelect($(this).find('select option'));
            });
            radio.each(function () {
                validRadio($(this).find('input[type="radio"]'));
            });
            checkbox.each(function () {
                validCheckbox($(this).find('input[type="checkbox"]'));
            });
            file.each(function () {
                validFile($(this).find('input[type="file"]'));
            });
        } else {
            var dataValidate =  form.attr("data-validate"),
                inputContainer = form.closest('.input-container'),
                field = form,
                select = inputContainer.find('select option'),
                radio = inputContainer.find('input[type="radio"]'),
                file = inputContainer.find('input[type="file"]'),
                checkbox = inputContainer.find('input[type="checkbox"]');
            if(inputContainer.hasClass('js_valid_select')) {
                validSelect(select);
            }
            else if(inputContainer.hasClass('js_valid_radio')) {
                validRadio(radio);
            }
            else if(inputContainer.hasClass('js_valid_checkbox')) {
                validCheckbox(checkbox);
            }
            else if(inputContainer.hasClass('input-container__file')) {
                validFile(file);
            }
            else {
                caseDataValidate(dataValidate, field);
            }
        }

        function caseDataValidate(dataValidate, fieldIn) {
            var minSign = fieldIn.attr("data-minsign");
            var maxSign = fieldIn.attr("data-maxsign");
            switch (dataValidate) {
                case "text":
                    reg = new RegExp('^[\/\'"?!,.А-Яа-яёЁЇїІіЄєҐґa-zA-Z_0-9 -]{'+minSign+','+maxSign+'}$');
                    undef = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())), minSign, maxSign);
                    undef = false;
                    break;
                case "date":
                    reg = /^\d{2,10}[,.]?\d{2,10}[,.]?\d{2,10}$/;
                    date = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    date = false;
                    break;
                case "number":
                    reg = new RegExp('^[0-9]{'+minSign+','+maxSign+'}$');
                    number = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    number = false;
                    break;
                case "email":
                    reg = /^([A-Za-z0-9_\-\.]{1,15})+\@([A-Za-z0-9_\-\.]{1,10})+\.([A-Za-z]{2,10})$/;
                    email = true;
                    if($.trim(fieldIn.val()).length>37) {
                        mark(fieldIn, true);
                    } else {
                        mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    }
                    email = false;
                    break;
                case "phone":
                    phone = true;
                    reg = /[0-9-()+]{17}$/;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    phone = false;
                    break;
                case "passold":
                    password_old = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (passold==pass||!reg.test($.trim(fieldIn.val()))||passold==pass1));
                    password_old = false;
                    break;
                case "pass":
                    password = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (pass1 !== pass||!reg.test($.trim(fieldIn.val()))||passold==pass));
                    password = false;
                    break;
                case "pass1":
                    password_1 = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (pass1 !== pass||!reg.test($.trim(fieldIn.val()))||passold == pass1));
                    password_1 = false;
                    break;
                case "file":
                    formatValidate(fieldIn);
                case "select2":
                    if (fieldIn.val()!=null||fieldIn.val()!=undefined||fieldIn.val()!="0") {
                        mark(fieldIn, false);
                        break;
                    } else {
                        mark(fieldIn, true);
                        break;
                    };
                default:
                    reg = new RegExp(fieldIn.attr("data-validate"), "g");
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    break;
            }
        }

// js_valid_select
        function validSelect(inp) {
            var rezalt = 0;
            for (var i = 1; i < inp.length; i++) {
                if ($(inp[i]).is('selected') === true||$(inp[i]).prop('selected') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };

// js_valid_radio
        function validRadio(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };
// js_valid_checkbox
        function validCheckbox(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };

// js_valid_file
        function validFile(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if (formatValidate(inp) == true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };
// js_valid_rating
        form.find('.js-rating').each(function (indx, rating) {
            var i = 0;
            $(rating).find(".star").each(function (indx, star) {
                if($(star).hasClass("active")) {
                    i++;
                } else {
                }
            });
            if (i>0) {
                $(this).addClass(norma_class).removeClass(error_class);
            } else {
                $(rating).addClass(error_class).removeClass(norma_class);
                e = 1;
            }
        });


        if ($.inArray(true, arr) == -1 && e == 0) {
            return true;
        } else {
            form.find("." + error_class + " input:first").focus();
            return false;
        }
    }

    function validateReset() {
        var form = $('.popup-overlay').find("form");
        var error_class = "error";
        var norma_class = "pass";
        form.find("[required]").each(function (indx, element) {
            $(element).val("");
            $(element).parent('.input-container').removeClass(error_class);
            $(element).parent('.input-container').removeClass(norma_class);
        });
    }

    $('.popup-overlay').click(function() {
        validateReset();
    });

    $('.popup .close-btn').click(function() {
        validateReset();
    });

    $('.input-container .delete').click(function() {
        var error_class = "error";
        var inp = $(this).siblings('input');
        var label = $(this).siblings('label');
        inp.val('');
        inp.parent('.input-container').removeClass(error_class);
        inp.parent('.input-container').removeClass("filled");
        if(inp[0].hasAttribute("data-error-existence")) {
            label.text(inp.attr("data-error-existence"));
        } else {
        }
    });

    /* -------------------------------------------------------------------------
     end Validation
     * ------------------------------------------------------------------------- */

    //compare-category__reset
    if ($(".compare-category__table").length) {
        $(".compare-category__reset").on('click', function (e) {
            e.preventDefault();
            var table = $(this).closest(".compare-category__table");
            table.remove();
        });
    }
    //compare-category__reset

    //dropdown select start
    $('.js__dropdown').on('click', function (e) {
        $(this).toggleClass('active');
        $(this).find('.dropdown__dropdown').slideToggle();
        e.stopPropagation();
    });

    $('.js__dropdown a').on('click', function (e) {
        e.preventDefault();
    });
    //dropdown select end

    /*burger start*/
    if($('.header .burger').length) {
        if($(window).width() <= 1030) {
            $('.header .burger').click(function () {
                $('.header .burger').toggleClass('clicked');
                $('.header').toggleClass('active');
                $('html').toggleClass('mobile-menu');
                $(".header__menu-list-sub").removeClass('active');
                $(".header__menu-item-brands").removeClass('active');
            });
        }
    }
    /*burger end*/


    /*header__nav drop start*/
    if ($(window).width() <= 690) {
        $('.header__search-icon').on('click', function (e) {
            $('.header__search').toggleClass("active");
        });
    }
    $('.header__menu-list-sub').closest('.header__menu-item-sub').addClass('drop');
    $('.header__menu-list-sub').closest('.header__menu-item-main').addClass('drop-main');

    if ($(window).width() <= 1030) {
        $('.header').addClass('mobile');
        $('.header__menu-item-brands').on('click', function (e) {
            $(this).find(".brands").addClass("active");
        });
        $('.drop-main .header__menu-link').on('click', function (e) {
            e.preventDefault();
        });
        $('.header__menu-item-link').on('click', function (e) {
            e.preventDefault();
            $(".header__menu-list-sub").removeClass('active');
            $(this).find(">.header__menu-list-sub").addClass('active');
        });
        $('.header__menu-item').on('click', function (e) {
            e.stopPropagation();
            $(this).find(">.header__menu-list-sub").addClass('active');
        });
        $('.header__menu-list-sub .back').on('click', function (e) {
            e.stopPropagation();
            $(this).closest(".header__menu-list-sub").removeClass('active');
        });
        $('.header__menu-item-brands .back').on('click', function (e) {
            e.stopPropagation();
            $(this).closest(".header__menu-item-brands").removeClass('active');
        });
    }
    /*header__nav drop end*/

    /*catalog start*/
    $('.header__menu-list-main-header').click(function () {
        if($(window).width() <= 1030) {
            $('.header').toggleClass('catalog');
            $('.header').removeClass('sub-catalog');
            $('.header__menu-item-main').removeClass('active');
        }
    });

    $('.header__menu-item-main').click(function () {
        if($(window).width() <= 1030) {
            if($(this).hasClass("header__menu-item-main_new")||$(this).hasClass("header__menu-item-main_stock")) {
                window.open($(this).find(".header__menu-item-sub-link").attr("href"));
            } else {
                $('.header').toggleClass('sub-catalog');
                $(this).toggleClass('active');
            }
        }
    });

    $('.header__menu-item-sub-link, .header__menu-item-main_stock, .header__menu-item-main_new').click(function () {
        if($(window).width() <= 1030) {
            window.open($(this).attr("href"));
        }
    });
    /*catalog end*/

    // footer item start
    if($(window).width() <= 1030) {
        if($(".footer__content-item").length % 2 == 0) {
            $(".footer__content-item:nth-last-child(1)").addClass("last");
            $(".footer__content-item:nth-last-child(2)").addClass("last");
        } else {
            $(".footer__content-item:nth-last-child(1)").addClass("last");
        }
    }
    // footer item end

    /*tabs start*/
    if ($(".js-tabs").length) {
        $(".js-tabs__button").on('click', function (e) {
            var tabs = $(this).closest(".js-tabs");
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass("active")) {
                tabs.removeClass("active");
                $(this).removeClass("active").siblings().removeClass("active");
                tabs.find(".js-tabs__content-block").removeClass("active").eq($(this).index()).removeClass("active");
            }
            else {
                tabs.addClass("active");
                $(this).addClass("active").siblings().removeClass("active");
                tabs.find(".js-tabs__content-block").removeClass("active").eq($(this).index()).addClass("active");
            }
        });
    }
    /*tabs end*/

    /*product-item hover start*/
    if ($(".product-item").length && $(window).width() >= 1030) {
        $(".product-item").addClass("additional");

        // $(".product-item").on('mouseenter', function (e) {
        //     if($(window).outerWidth() - ($(this).offset().left + $(this).width()) >= 320) {
        //         $(this).removeClass("additional-left");
        //     } else {
        //         $(this).addClass("additional-left");
        //     }
        //     $(this).removeClass("additional");
        // });
        // $(".product-item").on('mouseleave', function (e) {
        //     if($(window).outerWidth() - ($(this).offset().left + $(this).width()) >= 320) {
        //         $(this).removeClass("additional-left");
        //     } else {
        //         $(this).addClass("additional-left");
        //     }
        //     $(this).addClass("additional");
        // });

        $(".product-item__wrapper,.product-item__additional").on('mouseenter', function (e) {
            var thisItem = $(this).closest(".product-item");
            setTimeout(function () {
                if($(window).outerWidth() - (thisItem.offset().left + thisItem.width()) >= 320) {
                    thisItem.removeClass("additional-left");
                } else {
                    thisItem.addClass("additional-left");
                }
                thisItem.removeClass("additional");
            }, 300);
        });
        $(".product-item__wrapper,.product-item__additional").on('mouseleave', function (e) {
            var thisItem = $(this).closest(".product-item");
            setTimeout(function () {
                if($(window).outerWidth() - (thisItem.offset().left + thisItem.width()) >= 320) {
                    thisItem.removeClass("additional-left");
                } else {
                    thisItem.addClass("additional-left");
                }
                thisItem.addClass("additional");
                return false;
            }, 300);
        });
    }

    /*product-item hover end*/

    // /*product-item hover start*/
    // if ($(".product-item").length && $(window).width() >= 1030) {
    //     $(".product-item__additional").slideUp(1);
    //     $(".product-item").on('mouseenter', function (e) {
    //         // $(".product-item__additional").stop(true).slideUp(300);
    //         $(this).find(".product-item__additional").slideDown(300);
    //     });
    //     $(".product-item").on('mouseleave', function (e) {
    //         $(".product-item__additional").stop(true).slideUp(300);
    //         $(this).find(".product-item__additional").slideUp(300);
    //         //setTimeout(e, 0);
    //     });
    // }
    // /*product-item hover end*/

    /*slick start*/
    if ($(".js-main-banner").length) {
        $(".js-main-banner").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            dots: true,
            focusOnSelect: false,
            arrows: false,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 690,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    }

    if ($(".service-one__slider .service-one__slider-item").length>4) {
        $(".service-one__slider-wrapper").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: false,
            centerPadding: '0',
            dots: false,
            focusOnSelect: false,
            arrows: true,
            adaptiveHeight: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    if ($(window).width() <= 993) {
        if ($(".small-products-item .product-item").length>3) {
            $(".small-products-item").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                autoplay: true,
                autoplaySpeed: 2000,
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else if ($(window).width() > 1030) {
        if ($(".small-products-item .product-item").length>5) {
            $(".small-products-item").slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                autoplay: true,
                autoplaySpeed: 2000,
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($(".small-products-item .product-item").length>4) {
            $(".small-products-item").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                autoplay: true,
                autoplaySpeed: 2000,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    if ($(window).width() <= 993) {
        if ($(".cart__slider-grid .product-item").length>4) {
            $(".cart__slider-grid").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else if ($(window).width() > 1030) {
        if ($(".cart__slider-grid .product-item").length>6) {
            $(".cart__slider-grid").slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($(".cart__slider-grid .product-item").length>5) {
            $(".cart__slider-grid").slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }
    /*card_missing buttons start*/
    if ($('.card_missing').length) {
        $('.card_missing .card-info .product-item__buttons-add button').addClass("disabled");
    }
    /*card_missing buttons end*/


    /*card__info-image start*/
    if ($('.card__image_slider-big').length) {
        $('.card__image_slider-big').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: false,
            fade: true,
            asNavFor: '.card__image_slider-small',
            swipe: false
        });
        $('.card__image_slider-small').slick({
            asNavFor: '.card__image_slider-big',
            dots: false,
            //swipe: true,
            centerMode: false,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            focusOnSelect: true,
            arrows: true,
            centerPadding: '0',
            adaptiveHeight: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-arr' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-arr' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        swipe: false,
                        infinite: true,
                        centerMode: false,
                        slidesToShow: 4,
                        autoSlidesToShow: true,
                        focusOnSelect: true,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 690,
                    settings: {
                        slidesToShow: 3,
                        autoSlidesToShow: true,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
    /*card__info-image end*/

    /*slick end*/

    if ($("#sort-city").length) {
        $("#sort-city").select2({
        });
    }
    if ($("#sort-np").length) {
        $("#sort-np").select2({
        });
    }
    if ($("#sort-city-courier").length) {
        $("#sort-city-courier").select2({
        });
    }
    if ($("#sort-value").length) {
        $("#sort-value").select2({
            minimumResultsForSearch: -1
        });
    }
    if ($("#sort-quantity").length) {
        $("#sort-quantity").select2({
            minimumResultsForSearch: -1
        });
    }
    if ($("#sort-town").length) {
        $("#sort-town").select2({
            minimumResultsForSearch: -1
        });
    }
    if ($("#sort-region").length) {
        $("#sort-region").select2({
        });
    }
    if ($("#sort-country").length) {
        $("#sort-country").select2({
        });
    }

    //select2 end

    //body onclick start
    $('body').on('click', function () {
        $('.dropdown__dropdown').slideUp();
        $('.header__phone-dropdown').slideUp();
        $('.js__dropdown').removeClass("active");
        $('.js__phone-dropdown').removeClass("active");
    });
    //body onclick end

    /*range start*/
    jQuery(".catalog__filter_item_range").slider({
        min: jQuery('[data-slider-min]').data('slider-min'),
        max: jQuery('[data-slider-max]').data('slider-max'),
        step: 0.1,
        values: [jQuery('.catalog__filter_item_range').data('from'),jQuery('.catalog__filter_item_range').data('to')],
        range: true,
        stop: function(event, ui) {
            jQuery("input.catalog__filter_item_range_from").val(jQuery(".catalog__filter_item_range").slider("values",0));
            jQuery("input.catalog__filter_item_range_to").val(jQuery(".catalog__filter_item_range").slider("values",1));
            generateFilterUrl('price=' + jQuery(".catalog__filter_item_range").slider("values",0) + '-' + jQuery(".catalog__filter_item_range").slider("values",1));
        },
        slide: function(event, ui){
            jQuery("input.catalog__filter_item_range_from").val(jQuery(".catalog__filter_item_range").slider("values",0));
            jQuery("input.catalog__filter_item_range_to").val(jQuery(".catalog__filter_item_range").slider("values",1));
        }

    });
    /*range end*/

    /*filter close-open start*/
    if ($(window).width() <= 1030) {
        $(".catalog__filter").removeClass("open");
        $(".catalog__filter > .catalog__filter_item").removeClass("open");
        $(".catalog__filter .catalog__filter_item > .catalog__filter_item_content").addClass("close");
    }
    if ($(".catalog__filter_item").length) {
        if ($(window).width() <= 1030) {
            $(".catalog__filter_item_title").on('click', function (e) {
                $(this).closest(".catalog__filter_item").toggleClass("open");
                $(this).siblings(".catalog__filter_item_content").toggleClass("close");
                e.stopPropagation();
            });
            $(".catalog__filter .main_title").on('click', function (e) {
                if ($(window).width() <= 1030) {
                    $(".catalog__filter").toggleClass("open");
                    e.stopPropagation();
                }
            });
        } else {
            $(".catalog__filter_item_title:not(.main_title)").on('click', function (e) {
                $(this).closest(".catalog__filter_item").toggleClass("open");
                $(this).siblings(".catalog__filter_item_content").toggleClass("close");
                e.stopPropagation();
            });
        }
    }
    if ($(".card__sidebar-item").length) {
        $(".card__sidebar-item_title").on('click', function () {
            $(this).closest(".card__sidebar-item").toggleClass("open");
            $(this).siblings(".card__sidebar-item_content").toggleClass("close");
        });
    }
    /*filter close-open end*/

    //checkbox checked
    if ($(".checkbox-wrapper").length) {
        $(".checkbox-wrapper input[type=checkbox]").on('click', function(){
            $(this).toggleClass("active");
        });
    }
    //checkbox checked

    // card__info range
    if ($(".catalog__filter_item_content").length) {
        var rangeFirst = $(".catalog__filter_item_range span:first-of-type").css("left");
        var rangeLast = $(".catalog__filter_item_range span:last-of-type").css("left");
    }
    // card__info range

    // card__info item :not(.color) checked
    if ($(".catalog__filter_item_content:not(.color) .catalog__filter_item_checkbox").length) {
        $(".catalog__filter_item_content:not(.color) .catalog__filter_item_checkbox input[type=checkbox]").on('click', function(){
            $(this).toggleClass("active");
        });
    }
    // card__info item :not(.color) checked

    // card__info-color checked
    if ($(".card__info-color .catalog__filter_item_checkbox").length) {
        $(".card__info-color .catalog__filter_item_checkbox input[type=checkbox]").on('click', function(){
            if($(this).is(":checked")) {
                $(".card__info-color .catalog__filter_item_checkbox input[type=checkbox]").prop('checked', false);
                $(".card__info-color .catalog__filter_item_input").removeClass("checked");
                $(this).prop('checked', true);
                $(this).closest(".catalog__filter_item_input").addClass("checked");
            }
        });
    }
    // card__info-color checked

    if ($("a.catalog__filter_item_checkbox").length) {
        $("a.catalog__filter_item_checkbox").on('click', function(){
            // location.href = $(this).attr("href");
            window.open($(this).attr("href"));
        });
    }

    // catalog__info-color checked
    if ($(".catalog__filter .catalog__filter_item_content.color .catalog__filter_item_input input").length) {
        $(".catalog__filter .catalog__filter_item_content.color .catalog__filter_item_input input[type=checkbox]").on('click', function(){
            if($(this).is(":checked")) {
                $(this).closest(".catalog__filter_item_input").addClass("checked");
            } else {
                $(this).closest(".catalog__filter_item_input").removeClass("checked");
            }
        });
    }
    // catalog__info-color checked

    // product-item__stock click
    if ($(".product-item__stock").length) {
        $(".product-item__stock").on('click', function(e){
            e.stopPropagation();
            e.preventDefault();
        });
    }
    // product-item__stock click

    // product-item__stock click
    if ($(".product-item__stock").length) {
        $(".product-item__stock").on('click', function(e){
            e.stopPropagation();
            e.preventDefault();
        });
    }
    // product-item__stock click

    // page__header-allert click
    if ($(".page__header-allert").length) {
        $(".page__header-allert .icon-close").on('click', function(e){
            $(this).closest(".page__header-allert").removeClass("active");
            e.stopPropagation();
            e.preventDefault();
        });
    }
    // page__header-allert click


    /*Popup start*/
    $('.btn[data-target="order"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-order"]').fadeIn(300);
    });
    $('.btn[data-target="cart"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-cart"]').fadeIn(300);
    });
    $('.btn[data-target="call"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-call"]').fadeIn(300);
    });
    $('.btn[data-target="mail"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-mail"]').fadeIn(300);
    });
    $('.btn[data-target="recall"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-recall"]').fadeIn(300);
    });
    $('.btn[data-target="cart-in"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('.popup[data-target="popup-cart-in"]').fadeIn(300);
    });
    $('.btn[data-target="missing"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-missing"]').fadeIn(300);
    });
    $('.icon[data-target="phone"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-phone"]').fadeIn(300);
    });
    $('.btn[data-target="recover"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-recover"]').fadeIn(300);
    });


    $(document).on("click", "html", function(e) {
        console.log(e.target);
    });

    $('.popup:not(.popup__cart-in)').click(function(e) {
        e.stopPropagation();
        //e.preventDefault();
    });
    function closePopup() {
        $('.popup-overlay').fadeOut(300);
        $('.popup').fadeOut(300);
        setTimeout(function () {
            $('.popup-overlay').fadeOut(500);
        }, 500);
    }
    $('.popup-overlay').click(function() {
        closePopup();
    });
    $('.popup-header__link a').click(function() {
        closePopup();
    });
    $('.popup .close-btn').click(function() {
        closePopup();
    });

    /*Popup end*/


    // input on focus start
    $(document).on("change", '.input-container input,.input-container textarea', function () {
        if ($(this).val()!="") {
            console.log($(document).find(this).val());
            $(document).find(this).closest(".input-container").addClass("filled");
            $(document).find('.input-container input,.input-container textarea').on("blur", function () {
                $(document).find(this).closest(".input-container").addClass("active");
            });
        } else {
            console.log($(document).find(this).val());
            $(document).find(this).closest(".input-container").removeClass("filled");
            $(document).find('.input-container input,.input-container textarea').on("blur", function () {
                $(document).find(this).closest(".input-container").removeClass("active");
            });
        }
    });

    $(document).on("keydown", '.input-container input,.input-container textarea', function () {
        $(document).find(this).closest(".input-container").addClass("active");
    });

    $(document).on("focus", '.input-container input,.input-container textarea', function () {
        console.log($(document).find(this).val());
        $(document).find(this).closest(".input-container").addClass("active");
    });

    $(document).on("blur", '.input-container input,.input-container textarea', function () {
        console.log($(document).find(this).val());
        $(document).find(this).closest(".input-container").removeClass("active");
        $(document).find(this).closest(".input-container").removeClass("filled");
    });

    // input on focus end

    //phone mask
    if ($('input[type="tel"]').length) {
        $.jMaskGlobals = {translation: {
                'n': {pattern: /\d/},
            }
        };
        $('input[type="tel"]').mask('+380(nn)-nnn-nnnn', {
            // placeholder: "+380(--)-------"
        });
    }
    //phone mask

    /* map start*/
    function myMap(mapItem) {
        var coords = mapItem.data('coords').split(/\s*,\s*/);
        var myLatlng = new google.maps.LatLng(coords[0], coords[1]);
        var myCenter = new google.maps.LatLng(coords[0], coords[1]);
        console.log(mapItem[0].id);
        if (mapItem.length > 0) {
            var mapOptions = {
                zoom: 17,
                center: myCenter,
                scrollwheel: false,
                disableDefaultUI: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(mapItem[0].id), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: 'images/marker.png'
            });
        }
    }

    if ($("#map").length) {
        myMap($("#map"));
    }
    if ($("#map-pickup").length) {
        myMap($("#map-pickup"));
    }
    /* map end*/

    // radiobuttons toogle order
    $(".order_content .delivery .order_content__delivery .radio-container input[type=radio]").on('click', function(e){
        e.stopPropagation();
        $(document).find($(".order_delivery .order_sidebar .btn_buy")).removeClass("disabled");
        $(".order_content .delivery .input-container").removeClass("js_valid_select");
        $(".order_content .delivery select").removeAttr("required");
        $(".order_content .delivery input").removeAttr("required");
        $(".order_content__delivery-item").slideUp();
        var thisRadio = $(this)[0].classList;
        for (var i=0; i<thisRadio.length; i++) {
            if (thisRadio[i]=="js__delivery-pickup") {
                $(".delivery-pickup").slideToggle();
            } else if(thisRadio[i]=="js__delivery-postoffice") {
                $(document).find($(".order_delivery .order_sidebar .btn_buy")).addClass("disabled");
                $(".delivery-postoffice").slideToggle();
                $(".order_content .delivery .delivery-postoffice select").prop("required", "required");
                $(".order_content .delivery .delivery-postoffice input").attr("required", "true");
                if($(".order_content .delivery .delivery-postoffice .input-container").has("select")) {
                    for(var i=0; i<$(".order_content .delivery .delivery-postoffice .input-container").has("select").length; i++) {
                        $($(".order_content .delivery .delivery-postoffice .input-container").has("select")[i]).addClass("js_valid_select");
                    }
                }
            } else if(thisRadio[i]=="js__delivery-courier") {
                $(document).find($(".order_delivery .order_sidebar .btn_buy")).addClass("disabled");
                $(".delivery-courier").slideToggle();
                $(".order_content .delivery .delivery-courier select").prop("required", "required");
                $(".order_content .delivery .delivery-courier input").attr("required", "true");
                if($(".order_content .delivery .delivery-counter .input-container").has("select")) {
                    for(var i=0; i<$(".order_content .delivery .delivery-counter .input-container").has("select").length; i++) {
                        $($(".order_content .delivery .delivery-counter .input-container").has("select")[i]).addClass("js_valid_select");
                    }
                }
            } else if(thisRadio[i]=="js__delivery-storage") {
                $(document).find($(".order_delivery .order_sidebar .btn_buy")).removeClass("disabled");
                $(".delivery-storage").slideToggle();
            }
        }
    });

    $(".js__map-toggle").on('click', function(e){
        e.stopPropagation();
        $(".delivery-map").slideToggle();
    });

    if($(".order_sidebar .btn_buy").length>0) {
        $(".order_sidebar .btn_buy").addClass("disabled");
    }

    // radiobuttons toogle order

    //about__gallery start
    if($(".about__gallery").length) {
        var full=false;

        $('.imgWrap').hover(function () {
            $(this).addClass('current');
            $(this).siblings().addClass('notCurrent');
        }, function () {
            $('.imgWrap').siblings().removeClass('notCurrent');
            $('.imgWrap').removeClass('current');
        });

        $('.imgWrap').click(function () {

            if(!full){
                full = true;
                $(this).addClass('current-full');
                $(this).siblings().addClass('notCurrent-full');
            }
        });

        $('.mfp-close').click(function () {
            full = false;
            $('.imgWrap').siblings().removeClass('notCurrent-full');
            $('.imgWrap').removeClass('current-full');

        });

        $('.gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            }
        });
    }
    //about__gallery end

    //FAQ close open
    $('.faq__content-li').click(function () {
        $(this).toggleClass("active");
        $(this).find(".faq__content-text").slideToggle();
    });
    //FAQ close open


    //card characteristic close open
    $('.card_characteristic tfoot').click(function () {
        $(this).toggleClass("active");
        for (var i = 0; i<$(this).closest("table").find("tbody tr").length; i++) {
            if($(this).closest("table").find("tbody tr")[i+6]!=undefined) {
                $($(this).closest("table").find("tbody tr")[i+6]).fadeToggle();
            }
        }
        if ($(this).hasClass("active")) {
            $(this).find("span").text($(this).find("span").attr('data-hidden'));
        } else {
            $(this).find("span").text($(this).find("span").attr('data-text'));
        }
    });
    //card characteristic close open

    //card description open
    $('.card_description__button').click(function () {
        $(this).closest(".card_description").toggleClass("active");
        if ($(this).closest(".card_description").hasClass("active")) {
            $(this).find("span").text($(this).find("span").attr('data-hidden'));
        } else {
            $(this).find("span").text($(this).find("span").attr('data-text'));
        }
    });
    //card description open

    //adaptive site toggle

    $('.footer__adaptive').click(function () {
        $(this).toggleClass("desktop");
        if ($(this).hasClass("desktop")) {
            $('.footer__adaptive span').text($('.footer__adaptive span').attr('data-hidden'));
            $('meta[name="viewport"]').prop('content', 'width=1250, user-scalable=1, initial-scale=1, maximum-scale=1, minimum-scale=1');
            $('body').css('overflow-x', 'auto');
        } else {
            $('.footer__adaptive span').text($('.footer__adaptive span').attr('data-text'));
            $('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            $('body').css('overflow-x', 'hidden');
        }
    });
    //adaptive site toggle

    /*Cut string start*/
    function cutString(string, quantity) {
        string.text(function(i, text) {
            if (text.length >= quantity) {
                text = text.substring(0, quantity);
                var lastIndex = text.lastIndexOf(" ");
                text = text.substring(0, lastIndex) + '...';
            }
            $(this).text(text);
        });
    }

    if ($(".catalog__grid .product-item__content span").length) {
        cutString($(".catalog__grid .product-item__content span"), 85);
    }

    if ($(".slick-list .product-item__content span").length) {
        cutString($(".slick-list .product-item__content span"), 85);
    }

    if ($(".catalog__grid .product-item__title").length) {
        cutString($(".catalog__grid .product-item__title"), 40);
    }

    if ($(".service-item__title").length) {
        cutString($(".service-item__title"), 40);
    }

    if ($(".slick-list .product-item__title").length) {
        cutString($(".slick-list .product-item__title"), 40);
    }
    if ($(".cart__slider-grid .product-item__title").length) {
        cutString($(".slick-list .product-item__title"), 35);
    }
    /*Cut string end*/


    // profile details start
    if($('.profile-page').length) {
        $('.main-table .details').on('click', function(event){
            $(this).closest('.main-table').find('.order-table').toggle();
            $(this).toggleClass("show");
            if ($(this).hasClass("show")) {
                $(this).text($(this).attr('data-hidden'));
                console.log($(this).attr('data-hidden'));
            } else {
                $(this).text($(this).attr('data-show'));
                console.log($(this).attr('data-show'));
            }
        });
    }

    var popupBtn = document.querySelector(".popup__call .btn");
    popupBtn.addEventListener('click', function(e) {
        console.log(e.target, this);
        e.stopPropagation();
        e.preventDefault();
        var valid = validate($(document).find($(this).parents(".js_validate")));
        if (valid == false) {
            console.log("valid not passed");
            return false;
        } else {
            console.log("valid passed");
            closePopup();
            validateReset();
            return true;
        }
    });

    $(window).load(function () {
        [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        });
    });

    /*---------------- Инициализация фильтра -----------------*/
    $(document).on("click", "[data-filter]", function () {
        generateFilterUrl($(this).attr("data-filter"), $(this).attr("type"));
        return false;
    });
    $(document).on("click", "[data-price]", function () {
        var priceMin = parseFloat($("[name*='min']").val());
        var priceMax = parseFloat($("[name*='max']").val());
        generateFilterUrl('price='+priceMin+'-'+priceMax);
        return false;
    });
    /*---------------- Инициализация фильтра -----------------*/

    /*---------------- Генератор URL фильтра -----------------*/
    function generateFilterUrl(filter, type) {
        if (type === undefined) {
            type = 'checkbox';
        }
        var newFilters = [];
        var searchFilter = true;
        // Текущий урл
        var _url   = window.location.pathname;
        var _get   = window.location.search;
        var regex  = /\/f\/(.*)/i;
        // Текущие фильтры
        _filterUrl = _url.match(regex);
        if (_filterUrl) {
            // Переданный фильтр
            var filter = filter.split("=");
            _filterArr = _filterUrl[0].split('/');
            // Список текущих фильтров
            _filters   = _filterArr[2].split(';');
            for (var i = 0; i < _filters.length; i++) {
                // Если текущий фильтр совпал с переданным, добавляем или заменяем значение
                var _filter = _filters[i].split("=");
                if (filter[0] == _filter[0]) {
                    searchFilter = false;
                    _values = _filter[1].split(',');
                    // Проверить существует ли значение в массиве
                    _index = _values.indexOf(filter[1]);
                    if (_index != -1) {
                        _values.splice(_index, 1);
                    } else {
                        _values.push(filter[1]);
                    }
                    // Если тип радио, всё равно удаляем значение
                    if (type == 'radio') {
                        _values = [];
                        _values.push(filter[1]);
                    }
                    // Если цена, всё равно удаляем значение
                    if (filter[0] == 'price') {
                        _values = [];
                        _values.push(filter[1]);
                    }
                    // Если в массиве что то осталось
                    if (_values.length > 0) {
                        _values.sort();
                        _filter[1]  = $.unique(_values).join(',');
                        _filters[i] = _filter.join('=');
                        newFilters.push(_filters[i]);
                    }
                } else {
                    newFilters.push(_filters[i]);
                }
            }
            // Если текущий фильтр не совпал ни с одним из существующих
            if (searchFilter) {
                newFilters.push(filter.join('='));
            }
            // Если есть хоть какие то фильтры
            if (newFilters.length > 0) {
                newFilters.sort();
                var _newUrl = _url.slice(0, -_filterUrl[0].length)+'/f/'+newFilters.join(';')+'/';
            } else {
                var _newUrl = _url.slice(0, -_filterUrl[0].length)+'/';
            }
        } else {
            var _newUrl = _url+'f/'+filter+'/';
        }
        if($(window).width() > 1030) {
            if (_get.length > 0) {
                window.location.href = _newUrl+_get;
            } else {
                window.location.href = _newUrl;
            }
        } else {
            if (_get.length > 0) {
                history.pushState(null, null, _newUrl+_get);
            } else {
                history.pushState(null, null, _newUrl);
            }
            return false;
        }

    }
    /*---------------- Генератор URL фильтра -----------------*/

    // elevateZoom start
    $(document).ready(function() {

    if($('.card__image_loupe').length) {
        elevateZoom ();
        $('.card__image_slider-small-slide').on('click', function(event){
            event.preventDefault();
            $('.gallery-images .slick-active img').removeData('elevateZoom');
            $('.zoomContainer').remove();
            elevateZoom ();
        });

        $('.card__image_loupe .slick-arrow').on('click', function(event){
            event.preventDefault();
            $('.gallery-images .slick-active img').removeData('elevateZoom');
            $('.zoomContainer').remove();
            elevateZoom ();
        });
    } });
    // elevateZoom end


    /*----------------- Форматирование цены ------------------*///
    function priceFormat(n) {

        /* Фикс округления в JS */
        n = n * 100;
        n = n.toFixed(2);
        n = Math.round(n);
        n = n / 100;
        /* Фикс округления в JS */
        console.log(n);
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? "&nbsp;" + c : c;
        });
    }
    /*----------------- Форматирование цены ------------------*///


    /*----------------- Поиск вывод результатов дропдаун ------------------*///
    $('input[name="q"]').on('propertychange input', function(e) {
        var valueChanged = false;

        if (e.type=='propertychange') {
            valueChanged = e.originalEvent.propertyName=='value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            /* Code goes here */
            var query = $(this).val();
            $.ajax({
                url: '/partial_search?q='+query,
                success: function(data){
                    if(data) {
                        $('.search__suggestions-container').addClass('search__suggestions-container-open');
                        $('.search__suggestions-container').html(data);
                    } else {
                        $('.search__suggestions-container').removeClass('search__suggestions-container-open');
                    }

                }
            })
        }
    });
    /*----------------- Поиск вывод результатов дропдаун ------------------*///

    $(document).ready(function() {
        if ($('.preloader').length) {
            setTimeout(function () {
                $('.wrapper').addClass("visible");
                $('.preloader').addClass("hide");
                setTimeout(function() {
                    $('.preloader').addClass("none");
                }, 1000);
            }, 1000);
        } else {
            setTimeout(function () {
                $('.wrapper').addClass("visible");
            }, 1000);
        }
    });

})();