/*! DataTables Bootstrap 3 integration
 * ÂŠ2011-2015 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 3. This requires Bootstrap 3 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function( factory ){
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( ['jquery', 'datatables.net'], function ( $ ) {
            return factory( $, window, document );
        } );
    }
    else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = function (root, $) {
            if ( ! root ) {
                root = window;
            }

            if ( ! $ || ! $.fn.dataTable ) {
                // Require DataTables, which attaches to jQuery, including
                // jQuery if needed and have a $ property so we can access the
                // jQuery object that is used
                $ = require('datatables.net')(root, $).$;
            }

            return factory( $, root, root.document );
        };
    }
    else {
        // Browser
        factory( jQuery, window, document );
    }
}(function( $, window, document, undefined ) {
    'use strict';
    var DataTable = $.fn.dataTable;


    /* Set the defaults for DataTables initialisation */
    $.extend( true, DataTable.defaults, {
        dom:
        "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        renderer: 'bootstrap',
        oLanguage:{//国际语言转化
            "oAria": {
                "sSortAscending": " - click/return to sort ascending",
                "sSortDescending": " - click/return to sort descending"
            },
            "sLengthMenu": "显示 _MENU_ 记录",
            "sZeroRecords": "对不起，查询不到任何相关数据",
            "sEmptyTable": "没有相关数据",
            "sLoadingRecords": "<img src='../../static/images/loadData.gif'/> 正在加载数据-请稍后......",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
            "sInfoEmpty": "当前显示0到0条，共0条记录",
            "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
            "sProcessing": "<img src='../../images/loadData.gif'/> 正在加载数据...",
            "sSearch": "模糊查询：",
            "sUrl": "",
            //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": " ",
                "sNext": " ",
                "sLast": " 尾页 "
            }
        }
    } );


    /* Default class modification */
    $.extend( DataTable.ext.classes, {
        sWrapper:      "dataTables_wrapper form-inline dt-bootstrap",
        sFilterInput:  "form-control input-sm",
        sLengthSelect: "form-control input-sm",
        sProcessing:   "dataTables_processing panel panel-default"
    } );


    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
        var api     = new DataTable.Api( settings );
        var classes = settings.oClasses;
        var lang    = settings.oLanguage.oPaginate;
        var aria = settings.oLanguage.oAria.paginate || {};
        var btnDisplay, btnClass, counter=0;

        var attach = function( container, buttons ) {
            var i, ien, node, button;
            var clickHandler = function ( e ) {
                e.preventDefault();
                if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
                    api.page( e.data.action ).draw( 'page' );
                }
            };
            if(pages != 0){
                if($(".totalPage")!=null)
                $(".totalPage").remove();
                var currentText = '<input type="text" value="'+(page+1)+'" id="currentText" class="currentText">';
                var redirect = '<input type="button" value="确定" id="redirect" class="redirect">';
                var html = '<div class="totalPage">共'+pages+'页，到第'+currentText+'页'+redirect+'</div>';
                $(html).appendTo( container );
            }
            for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
                button = buttons[i];

                if ( $.isArray( button ) ) {
                    attach( container, button );
                }
                else {
                    btnDisplay = '';
                    btnClass = '';

                    switch ( button ) {
                        case 'ellipsis':
                            btnDisplay = '&#x2026;';
                            btnClass = 'disabled';
                            break;

                        case 'first':
                            btnDisplay = lang.sFirst;
                            btnClass = button + (page > 0 ?
                                    '' : ' disabled');
                            break;

                        case 'previous':
                            btnDisplay = lang.sPrevious;
                            btnClass = button + (page > 0 ?
                                    '' : ' disabled');
                            break;

                        case 'next':
                            btnDisplay = lang.sNext;
                            btnClass = button + (page < pages-1 ?
                                    '' : ' disabled');
                            break;

                        case 'last':
                            btnDisplay = lang.sLast;
                            btnClass = button + (page < pages-1 ?
                                    '' : ' disabled');
                            break;

                        default:
                            btnDisplay = button + 1;
                            btnClass = page === button ?
                                'active' : '';
                            break;
                    }

                    if ( btnDisplay ) {
                        node = $('<li>', {
                            'class': classes.sPageButton+' '+btnClass,
                            'aria-controls': settings.sTableId,
                            'tabindex': settings.iTabIndex,
                            'id': idx === 0 && typeof button === 'string' ?
                                settings.sTableId +'_'+ button :
                                null
                        } )
                            .append( $('<a>', {
                                    'href': '#',
                                    'aria-controls': settings.sTableId,
                                    'aria-label': aria[ button ],
                                    'data-dt-idx': counter,
                                    'tabindex': settings.iTabIndex
                                } )
                                    .html( btnDisplay )
                            )
                            .appendTo( container );

                        settings.oApi._fnBindAction(
                            node, {action: button}, clickHandler
                        );

                        counter++;
                    }
                }
            }
        };

        // IE9 throws an 'unknown error' if document.activeElement is used
        // inside an iframe or frame.
        var activeEl;

        try {
            // Because this approach is destroying and recreating the paging
            // elements, focus is lost on the select button which is bad for
            // accessibility. So we want to restore focus once the draw has
            // completed
            activeEl = $(host).find(document.activeElement).data('dt-idx');
        }
        catch (e) {}

        attach(
            $(host).empty().html('<ul class="pagination"/>').children('ul'),
            buttons
        );

        if ( activeEl !== undefined ) {
            $(host).find( '[data-dt-idx='+activeEl+']' ).focus();
        }
    };


    return DataTable;
}));