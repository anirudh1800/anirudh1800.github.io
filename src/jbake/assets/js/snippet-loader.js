// snippet-loader.js
var editBtn = null;
var diffBtn = null;

// edit data
var frmtBtn = null;
var clrBtn = null;
var cpyBtn = null;
var beautify_in_progress = false;
var editor = null;
var editArea = null;

// diff data
var diffEditor = null;
var mergeView = null;
var showDiffBtn = null;
var twoWayDiffBtn = null;
var threeWayDiffBtn = null;
var value = "";
var orig1 = "";
var orig2 = "";
var panes = 3;
var highlight = false;
var connect = null;
var collapse = false;

$(document).ready(function () {
    // Initialize UI
    initComponents();

    initEditUI();

    initDiffUI();

    initEvents();

    diffBtn.addEventListener("click", function () {
        $("#editDiv").hide();
        $("#diffDiv").show();
    });

    editBtn.addEventListener("click", function () {
        $("#diffDiv").hide();
        $("#editDiv").show();
    });

    $("#diffDiv").hide();

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    new Clipboard('#cpyBtn', {
            text: function(trigger) {
                console.log("text sent!");
                return editor.getValue();
            }
        }).on('success', function() {
            toastr.success("Saved in Clipboard!");
        });

});

function initComponents() {
    editBtn = document.getElementById('editBtn');
    diffBtn = document.getElementById('diffBtn');

    frmtBtn = document.getElementById('frmtBtn');
    clrBtn = document.getElementById('clrBtn');
    cpyBtn = document.getElementById('cpyBtn');
    beautify_in_progress = false;
    editArea = document.getElementById('editArea');

    mergeView = document.getElementById("mergeView");
    showDiffBtn = document.getElementById("showDiffBtn");
    twoWayDiffBtn = document.getElementById("twoWayDiffBtn");
    threeWayDiffBtn = document.getElementById("threeWayDiffBtn");
}

function initEditUI() {
    // Initialize data
    editor = CodeMirror.fromTextArea(editArea, {
        lineNumbers: true,
        viewportMargin: Infinity
    });

    editor.focus();
}

function initDiffUI() {
    mergeView.innerHTML = "";
    highlight = false;

    diffEditor = CodeMirror.MergeView(mergeView, {
        lineNumbers: true,
        viewportMargin: Infinity,
        value: "",
        origLeft: panes == 3
            ? orig1
            : null,
        orig: orig2,
        allowEditingOriginals: true,
        highlightDifferences: highlight,
        revertButtons: true,
        connect: connect,
        collapseIdentical: collapse
    });

    resize(diffEditor);
}

function initEvents() {
    //edit view events
    frmtBtn
        .addEventListener("click", function () {
            if(editor.getValue() == "")
                return; 
            beautify();
        });

    clrBtn.addEventListener("click", function () {
        if (!editor) 
            editor = CodeMirror.fromTextArea(editArea, {
                lineNumbers: true,
                viewportMargin: Infinity
            });
        
        editor.setValue("");
    });

    // diff view events
    showDiffBtn.addEventListener("click", function () {
        if(diffEditor.edit.getValue() == "")
            return; 

        if (highlight == true) 
            showDiffBtn.innerText = "Diff Below";
        else 
            showDiffBtn.innerText = "Show Diff";
        
        toggleDifferences()
    });

    twoWayDiffBtn.addEventListener("click", function () {
        if(panes == 2)
            return;

        panes = 2;
        initDiffUI()
    });

    threeWayDiffBtn.addEventListener("click", function () {
        if(panes == 3)
            return;

        panes = 3;
        initDiffUI()
    });

}

function beautify() {
    if (beautify_in_progress) 
        return;
    
    beautify_in_progress = true;

    var source = editor
            ? editor.getValue()
            : $('#editArea').val(),
        output,
        opts = {};

    opts.indent_size = 4;
    opts.indent_char = opts.indent_size == 1
        ? '\t'
        : ' ';

    /*
    opts.max_preserve_newlines = $('#max-preserve-newlines').val();
    opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
    opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
    opts.break_chained_methods = $('#break-chained-methods').prop('checked');
    opts.indent_scripts = $('#indent-scripts').val();
    opts.brace_style = $('#brace-style').val() + ($('#brace-preserve-inline').prop('checked')
        ? ",preserve-inline"
        : "");
    opts.space_before_conditional = $('#space-before-conditional').prop('checked');
    opts.unescape_strings = $('#unescape-strings').prop('checked');
    opts.jslint_happy = $('#jslint-happy').prop('checked');
    opts.end_with_newline = $('#end-with-newline').prop('checked');
    opts.wrap_line_length = $('#wrap-line-length').val();
    opts.indent_inner_html = $('#indent-inner-html').prop('checked');
    opts.comma_first = $('#comma-first').prop('checked');
    opts.e4x = $('#e4x').prop('checked');*/

    if (looks_like_html(source)) {
        output = html_beautify(source, opts);
    } else {
        /* if ($('#detect-packers').prop('checked')) {
            source = unpacker_filter(source);
        }*/
        output = js_beautify(source, opts);
    }
    if (editor) {
        editor.setValue(output);
    } else {
        $('#editArea').val(output);
    }

    beautify_in_progress = false;
}

function looks_like_html(source) {
    // <foo> - looks like html
    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    return trimmed && (trimmed.substring(0, 1) === '<');
}

function toggleDifferences() {
    resize(diffEditor);
    diffEditor.setShowDifferences(highlight = !highlight);
}

function mergeViewHeight(mergeView) {
    function editorHeight(editor) {
        if (!editor) 
            return 0;
        return editor
            .getScrollInfo()
            .height;
    }
    return Math.max(editorHeight(mergeView.leftOriginal()), editorHeight(mergeView.editor()), editorHeight(mergeView.rightOriginal()));
}

function resize(mergeView) {
    var height = mergeViewHeight(mergeView);
    for (;;) {
        if (mergeView.leftOriginal()) 
            mergeView.leftOriginal().setSize(null, height);
        mergeView
            .editor()
            .setSize(null, height);
        if (mergeView.rightOriginal()) 
            mergeView.rightOriginal().setSize(null, height);
        var newHeight = mergeViewHeight(mergeView);
        if (newHeight >= height) 
            break;
        else 
            height = newHeight;
        }
    mergeView.wrap.style.height = height + "px";
}

