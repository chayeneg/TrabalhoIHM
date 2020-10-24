
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    $('#cnpj').on("keyup", function (e) {
        $(this).val(
            $(this).val()
                .replace(/\D/g, '')
                .replace(/^(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5"));
    });

    $('#form-id').change(function () {
        if ($('#form1').prop('checked')) {
            $('#A').show();
            $('#B').hide();
        } else {
            $('#B').show();
            $('#A').hide();
        }
    });

    function fonte(e) {
        var elemento = $(".acessibilidade");
        var fonte = elemento.css('font-size');
        if (e == 'a') {
            elemento.css("fontSize", parseInt(fonte) + 1);
        } else if ('d') {
            elemento.css("fontSize", parseInt(fonte) - 1);
        }
    }

    var tr = $('table tr:not(:first-child)');
    tr.on('click', function () {
        tr.not(this).removeClass('colorir');
        $(this).toggleClass('colorir');
    });

    $(document).ready(function () {
		
        $.getJSON('estados_cidades.json', function (data) {

            var items = [];
            var options = '<option value="">Escolha um estado</option>';	

            $.each(data, function (key, val) {
                options += '<option value="' + val.nome + '">' + val.nome + '</option>';
            });					
            $("#estados").html(options);				
            
            $("#estados").change(function () {				
            
                var options_cidades = '';
                var str = "";					
                
                $("#estados option:selected").each(function () {
                    str += $(this).text();
                });
                
                $.each(data, function (key, val) {
                    if(val.nome == str) {							
                        $.each(val.cidades, function (key_city, val_city) {
                            options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                        });							
                    }
                });

                $("#cidades").html(options_cidades);
                
            }).change();		
        
        });
    
    });
})(jQuery);