/*!
  Forms Populator jQuery plugin.
  https://github.com/joeycaughey/jquery.forms.populator
  version 0.0.1 (Feb, 2017)

  Multidimentional JSON to form populator.


  Copyright (c) 2017 Joey Caughey (joey.caughey@gmail.com)
  http://www.joeycaughey.com

  Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
  and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/

function populator(form, json, nodes) {
    $.each(json, function(key, value) {
        newNodes = nodes ? nodes.slice() : [];
        newNodes.push(key);

        //console.log(key, typeof(value))
        //console.log(parse_nodes(newNodes), value);
        value = (value === "NULL") ? "" : value;
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
            /*
            if (!isNaN(parseInt(node))) {
                node = node;
            }
            */
            output += "[" + node + "]";
        }
    })
    return output;
}

$.fn.values = function(data, callback) {
    var form = this;
    if (typeof callback === "function") {
        callback();
    }
    populator(form, data);
};
