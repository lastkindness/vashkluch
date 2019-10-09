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

    $(window).on('resize', function () {

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

    function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item = form.find("[required]");
        var e = 0;
        var reg = undefined;
        var pass = form.find('.password').val();
        var pass_1 = form.find('.password_1').val();
        var email = false;
        var password = false;
        var password_1 = false;
        var pasword_new = false;
        var phone = false;
        var undef = false;
        var date = false;
        var arr = [];

        console.log("startValidate");


        function mark(object, expression, minSign, maxSign) {
            console.log(object, object.closest('.input-container'));
            if (expression) {
                object.closest('.input-container').addClass(error_class).removeClass(norma_class);
                if (email) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 31) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        } else {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не менее 6 символов');
                        }
                        else if  (object.val().length > 20) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не более 20 символов');
                        }
                        else {
                            object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_1) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не менее 6 символов');
                        }
                        else if  (object.val().length > 20) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не более 20 символов');
                        }
                        else {
                            object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (pasword_new) {
                    var remPopup = object.closest('.input-container').closest(".popup__remind");
                    if (remPopup.length) {
                        if (remPopup.find(".pasword-old").val()==remPopup.find(".pasword_new").val()&&remPopup.find(".pasword_new").val()!="") {
                            remPopup.find(".pasword_new").closest(".input-container").addClass(error_class).removeClass(norma_class);
                            remPopup.find(".pasword_new").siblings('.text-error').text('Старый и новый пароль совападают. Придумайте новый пароль!');
                        }
                    }
                }
                if (phone) {
                    if (object.val().length != 17) {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (date) {
                    if (object.val().length != 4) {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (undef) {
                    if (object.val().length > 0) {
                        if (object.val().length > minSign && object.val().length < maxSign) {
                            object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                        } else {
                            object.closest('.input-container').find('.text-error').text('Введите колличество символов (2-100)');
                        }
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                e++;
            }
            else {
                object.closest('.input-container').addClass(norma_class).removeClass(error_class);
                e = 0;
            }
            arr.push(expression);
        }

        form.find("[required]").each(function () {
            var minSign = $(this).attr("data-minsign");
            var maxSign = $(this).attr("data-maxsign");
            switch ($(this).attr("data-validate")) {
                case "text":
                    reg = new RegExp('^[/-?!()",.а-яА-ЯёЁa-zA-Z_0-9 ]{'+minSign+','+maxSign+'}$');
                    undef = true;
                    mark($(this), !reg.test($.trim($(this).val())), minSign, maxSign);
                    undef = false;
                    //mark($(this), $.trim($(this).val()).length === 0);
                    break;
                case "date":
                    reg = /^\d{2,10}[,.]?\d{2,10}[,.]?\d{2,10}$/;
                    undef = true;
                    mark($(this), !reg.test($.trim($(this).val())));
                    undef = false;
                    break;
                case "email":
                    reg = /^([A-Za-z0-9_\-\.]{1,10})+\@([A-Za-z0-9_\-\.]{1,10})+\.([A-Za-z]{2,10})$/;
                    email = true;
                    if($.trim($(this).val()).length>31) {
                        mark($(this), true);
                    } else {
                        mark($(this), !reg.test($.trim($(this).val())));
                    }
                    email = false;
                    break;
                case "phone":
                    phone = true;
                    reg = /[0-9-()+]{17}$/;
                    mark($(this), !reg.test($.trim($(this).val())));
                    phone = false;
                    break;
                case "pass":
                    password = true;
                    pasword_new = true;
                    reg = /^[a-zA-Z0-9_-]{6,20}$/;
                    mark($(this), !reg.test($.trim($(this).val())));
                    password = false;
                    break;
                case "select2":
                    if ($(this).val()!=null) {
                        mark($(this), false);
                        break;
                    } else {
                        mark($(this), true);
                        break;
                    };
                case "pass1":
                    password_1 = true;
                    reg = /^[a-zA-Z0-9_-]{6,20}$/;
                    mark($(this), (pass_1 !== pass||!reg.test($.trim($(this).val()))));
                    password_1 = false;
                    break;
                case "file":
                    if ($(this).closest(".row-file-input").hasClass("error")) {
                        break;
                    }
                default:
                    reg = new RegExp($(this).attr("data-validate"), "g");
                    mark($(this), !reg.test($.trim($(this).val())));
                    break;
            }
        });

        form.find('.js_valid_radio').each(function () {
            var inp = $(this).find('input.required');
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
                $(this).addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                $(this).addClass(norma_class).removeClass(error_class);
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

    $(document).on("change", '.js_validate *[required]', function () {
        $(this).each(function () {
            var valid = validate($(document).find($(this).parents(".js_validate")));
            if (valid == false) {
                console.log("valid not passed");
                return false;
            } else {
                console.log("valid passed1");
                return true;
            }
        });

    });


    $(document).on("click", '.js_validate .btn[type="submit"], .js_click_form', function () {
        var valid = validate($(document).find($(this).parents(".js_validate")));
        if (valid == false) {
            console.log("valid not passed");
            return false;
        } else {
            console.log("valid passed");
            return true;
        }
    });

    /* -------------------------------------------------------------------------
     end Validation
     * ------------------------------------------------------------------------- */

    console.log("endValidate");

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
                if ($('.header').hasClass("catalog")) {
                    $('.header').removeClass('catalog');
                    $('.header').removeClass('sub-catalog');
                    $('.header__menu-item-main').removeClass('active');
                }
            });
        }
    }
    /*burger end*/

    /*header__nav drop start*/
    $('.header__menu-list-sub').closest('.header__menu-item-sub').addClass('drop');

    if ($(window).width() <= 1030) {
        $('.header__nav-item-li.drop').on('click', function (e) {
            e.preventDefault();
            $('.header__nav-item-li.drop').not(this).removeClass('active');
            $(this).toggleClass('active');
        });
        $('.header__nav-item-li a').on('click', function (e) {
            location.href=$(this)[0].getAttribute('href');
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

        $(".product-item").on('mouseenter', function (e) {
            if($(window).outerWidth() - ($(this).offset().left + $(this).width()) >= 320) {
                $(this).removeClass("additional-left");
            } else {
                $(this).addClass("additional-left");
            }
            $(this).removeClass("additional");
        });
        $(".product-item").on('mouseleave', function (e) {
            if($(window).outerWidth() - ($(this).offset().left + $(this).width()) >= 320) {
                $(this).removeClass("additional-left");
            } else {
                $(this).addClass("additional-left");
            }
            $(this).addClass("additional");
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
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
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
                        breakpoint: 370,
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
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
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
                        breakpoint: 370,
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
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
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
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
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
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
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

    // $('.basket-item__remove[data-target="product-delete"]').on("click", function (e) {
    //     e.preventDefault();
    //     $('.popup-overlay').fadeIn(300);
    //     $('.popup[data-target="popup-product-delete"]').fadeIn(300);
    //     var thisProduct = $(this);
    //     // product-item__delete click
    //     $(".js__product-delete").on('click', function(event) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         //сompare-category remove basket-item
    //         if (thisProduct.closest(".compare-category__table").length) {
    //             var table = thisProduct.closest(".compare-category__table");
    //             var item = thisProduct.closest(".compare-category__item-card");
    //             var itemValue = $(".compare-category__table-value");
    //             for(var i = 0; i<itemValue.length; i++) {
    //                 $(itemValue[i]).find(".value").eq(item.index()-1).remove();
    //             }
    //             item.remove();
    //         }
    //         //сompare-category remove basket-item
    //         else {
    //             thisProduct.closest(".product-item").remove();
    //             if ($(".page__header-allert").length) {
    //                 $(".page__header-allert").addClass("active");
    //                 setTimeout(function () {
    //                     $(".page__header-allert").removeClass("active");
    //                 }, 5000);
    //             }
    //         }
    //         setTimeout(function () {
    //             $('.popup[data-target="popup-product-delete"]').fadeOut(300);
    //             if($('.popup[data-target="popup-cart-in"]').css('display') == 'none' && $('.popup-overlay').css('display') == 'block') {
    //                 $('.popup-overlay').fadeOut(300);
    //             }
    //         }, 100);
    //     });
    //     $(".js__product-delete-reset").on('click', function (event) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         setTimeout(function () {
    //             $('.popup[data-target="popup-product-delete"]').fadeOut(300);
    //             if($('.popup[data-target="popup-cart-in"]').css('display') == 'none' && $('.popup-overlay').css('display') == 'block') {
    //                 $('.popup-overlay').fadeOut(300);
    //             }
    //         }, 100);
    //         thisProduct = $(this);
    //     });
    //     // product-item__delete click
    // });

    // $(document).on("click", ".basket-item__remove", function(e) {
    //     e.stopPropagation();
    //     var thisProduct = $(this).closest(".basket-item__remove");
    //     console.log("click", $(this));
    //     if (thisProduct.closest(".compare-category__table").length) {
    //         var table = thisProduct.closest(".compare-category__table");
    //         var item = thisProduct.closest(".compare-category__item-card");
    //         var itemValue = $(".compare-category__table-value");
    //         for(var i = 0; i<itemValue.length; i++) {
    //             $(itemValue[i]).find(".value").eq(item.index()-1).remove();
    //         }
    //         item.remove();
    //     }
    //     //сompare-category remove basket-item
    //     else {
    //         thisProduct.closest(".product-item").remove();
    //         if ($(".page__header-allert").length) {
    //             $(".page__header-allert").addClass("active");
    //             setTimeout(function () {
    //                 $(".page__header-allert").removeClass("active");
    //             }, 5000);
    //         }
    //     }
    // });

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

    // elevateZoom start
    function elevateZoom () {
        if ($(window).width() > 1030) {
            $('.gallery-images .slick-active img').elevateZoom({
                zoomType: "window",
                scrollZoom: "true",
                cursor: "crosshair",
                zoomLevel: 0.5
            });
        }
    }

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
    }
    // elevateZoom end

    //card auto-fix-sidebar end

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