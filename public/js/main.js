$(document).ready(function(){
    $(".close").click(function(){
        $("#myAlert").alert("close");
    });
});

$(function(){
    window.setInterval(function(){
        $('#my-alert').alert('close');
    },2000);
});