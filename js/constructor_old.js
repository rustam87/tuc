$(document).ready(function(){

    $(".btn-remove-sticker").hide();
    $(".btn-remove-sticker").click(function () {
        var activeObject = canvas.getActiveObject();
        canvas.remove(activeObject);
        $(".btn-remove-sticker").hide();
    });

    var EditTextTextbox;
    var BacgroundText;
    const image_bacground = 'images/shirt.png';
    const image_bacground_block = 'images/delete/block.png';

    /*Добавление тектса*/
    var canvasText  = new fabric.Canvas('drawtext');
    canvasText.setHeight(240);
    canvasText.setWidth(240);
    function LoadBack(img) {
        if(img==null){
            img = 'images/stikers/1/15.png';
        }
        fabric.Image.fromURL(img, function (objects, options) {
            BacgroundText = objects;
            BacgroundText.set({
                left: 0,
                top: 0,
                opacity: 1,
                scaleY: canvasText.height / BacgroundText.width,
                scaleX: canvasText.width / BacgroundText.width,
                selectable: false
            });
            canvasText.add(BacgroundText);
            EditTextTextbox =
                new fabric.Textbox('I Love TUC!', {
                    width: 100,
                    height: 50,
                    fontFamily: 'Firenight-Regular',
                    top: 5,
                    left: 5,
                    fontSize: 18,
                    textAlign: 'left'
                });
            canvasText.centerObject(EditTextTextbox);
            canvasText.add(EditTextTextbox);
            canvasText.renderAll();
        });
    }

    LoadBack();

    $('#FontSizeText').on('change', function() {
        EditTextTextbox.fontSize = this.value;
        canvasText.renderAll();
    });
    $("#SelectedFont").on('change', function() {
        EditTextTextbox.fontFamily = EditTextTextbox.fontFamily == 'Firenight-Regular' ? 'Helvetica' : 'Firenight-Regular';
        canvasText.renderAll();
    });

    $("#btn_add_stickers_template").click(function () {
        //window.open(canvasText.toDataURL('png'));
        fabric.Image.fromURL(canvasText.toDataURL('png'), function(img) {
            img.left = 50;
            img.top = 50;
            img.height = 50;
            img.width = 50;
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
        });
        $('#addTextModal').arcticmodal('close');
        return false;
    });
    $('.stickers-template > div').click(function(){
        var classesName = $(this).attr('class');
        var className = classesName.split(' ')[0];
        $('.stickers-template > div').removeClass('active');
        $(this).addClass('active');
        canvasText.clear();
        if(className == 'sticker-template-1') {
            LoadBack();
        } else {
            LoadBack('images/stikers/1/16.png');
        }
    });


    var background;
    var canvas  = new fabric.Canvas('contstructorcanvas');
    canvas.setHeight(400);
    canvas.setWidth(400);


    $("#savePrize").click(function () {
        var trsvg = canvas.toSVG();
        $.post("/SaveCustumPrize", {_token: $("input[name='_token']").val(),svg: trsvg },
        function (data) {
            console.log(data);
        });
    });



    function onObjectSelected(e) {
        $(".btn-remove-sticker").show();
    }
    canvas.on('object:selected', onObjectSelected);

    document.addEventListener("change_template_opacity", function(e) {
        background.set({
            left: 0,
            top: 0,
            opacity: (1-e.detail.template_opacity)+0.1,
            scaleY: canvas.height / background.width,
            scaleX: canvas.width / background.width,
            selectable: false
        });
        canvas.renderAll();
    })

    function AddTemplate() {
        fabric.Image.fromURL(image_bacground, function (objects, options) {
            background = objects;
            background.set({
                left: 0,
                top: 0,
                opacity: 1,
                scaleY: canvas.height / background.width,
                scaleX: canvas.width / background.width,
                selectable: false
            });
            canvas.add(background);
            canvas.renderAll();
            //AddBlock();
        });
    }



    AddTemplate();
   // AddBlock();
    function AddBlock() {
        fabric.Image.fromURL(image_bacground_block, function(img) {
            img.left = 50;
            img.top = 50;
            img.height = 300;
            img.width = 200;
            img.selectable = false;
            img.globalCompositeOperation = 'source-over';
            block = img;
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
           // AddTemplate();
        });
    }


    $(".item-img").click(function () {
        var bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','').replace('"','').replace('"','');
        bg = bg.replace('imagecache/blur/stikers/','images/stikers/');
        if($(this).attr('id_stiker').length>0 && $(this).attr('id_stiker')>=15){
            var id_seleted_stiker = $(this).attr('id_stiker');
            $('#addTextModal').arcticmodal();
            if(id_seleted_stiker==15){
                $(".sticker-template-2").hide();
            }
            if(id_seleted_stiker==16){
                $(".sticker-template-1").hide();
            }
            return;
        }
        fabric.Image.fromURL(bg, function(img) {
            img.left = 50;
            img.top = 50;
            img.height = 50;
            img.width = 50;
            canvas.centerObject(img);
            canvas.add(img);
            img.globalCompositeOperation = 'source-atop';
            img.bringToFront();
            c = null;
            $('#_temp_canvas').remove();
            canvas.renderAll();
        });
        return false;
    });
});



