/*! jquery-serializeForm - v1.2.1 - 2013-11-06
 * http://danheberden.com/
 * Copyright (c) 2013 Dan Heberden
 * Licensed MIT
 **/
(function($) {
    $.fn.serializeForm = function() {

        // don't do anything if we didn't get any elements
        if (this.length < 1) {
            return false;
        }

        var data = {};
        var lookup = data; //current reference of data
        var selector = ':input[type!="checkbox"][type!="radio"], input:checked';
        var parse = function() {

            // Ignore disabled elements
            if (this.disabled) {
                return;
            }

            // data[a][b] becomes [ data, a, b ]
            var named = this.name.replace(/\[([^\]]+)?\]/g, ',$1').split(',');
            var cap = named.length - 1;
            var $el = $(this);

            // Ensure that only elements with valid `name` properties will be serialized
            if (named[0]) {
                for (var i = 0; i < cap; i++) {
                    // move down the tree - create objects or array if necessary
                    lookup = lookup[named[i]] = lookup[named[i]] ||
                        ((named[i + 1] === "" || named[i + 1] === '0') ? [] : {});
                }

                // at the end, push or assign the value
                if (lookup.length !== undefined) {
                    lookup.push($el.val());
                } else {
                    lookup[named[cap]] = $el.val();
                }

                // assign the reference back to root
                lookup = data;
            }
        };

        // first, check for elements passed into this function
        this.filter(selector).each(parse);

        // then parse possible child elements
        this.find(selector).each(parse);

        // return data
        return data;
    };
}(jQuery));


function populator(form, json, nodes) {
    $.each(json, function(key, value) {
        newNodes = nodes ? nodes.slice() : [];
        newNodes.push(key);

        //console.log(key, typeof(value))
        //console.log(parse_nodes(newNodes), value);
        if (typeof(value) === "object" && value !== null) {

            populator(form, value, newNodes);

        } else {

            if (parse_nodes(newNodes).indexOf("[]") > 0) {
                $('[name="' + parse_nodes(newNodes) + '"]', form).each(function() {
                    if ($(this).val() === value) {
                        $(this).prop("checked", "checked");
                    }
                })
            } else {
                $('[name="' + parse_nodes(newNodes) + '"]', form).val(value);
            }
        }
    });
}

function parse_nodes(nodes) {
    var output = "";
    $.each(nodes, function(i, node) {
        if (i == 0) {
            output += node;
        } else {
            if (!isNaN(node)) {
                node = "";
            }
            output += "[" + node + "]";
        }
    })
    return output;
}

$.fn.values = function(data, callback) {
    var form = this;
    if (typeof callback === "function") {
        setTimeout(function() {
            callback();
        }, 1000);
    }

    populator(form, data);

  
};