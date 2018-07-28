$(document).ready(function(){
    var gender =0;
    var global_template_opacity = 0;
    const image_bacground_clear = 'images/shirt.png';
    const Backpack_area = 'images/Backpack.png';
    const image_bacground_clear_woman = 'images/woman.png';
    var image_bacground = 'images/shirt_area.png';
    var image_bacground_area = 'images/Backpack_area.png';
    var image_bacground_area_woman = 'images/shirt_area_woman.png';
    const template_bacground = 'images/template_shirt.png';
    const template_backpac = 'images/template_backpac.png';
    const template_backpac2 = 'images/template_backpac2.png';

    var _template;
    var canvas  = new fabric.Canvas('contstructorcanvas');
    if($("#mobile").length>0)
    {
        canvas.setHeight(300);
        canvas.setWidth(300);
    }
    else
    {
        canvas.setHeight(400);
        canvas.setWidth(400);
    }

    function GetParams( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
    var d = GetParams('type', document.location);
    if(d=='Backpack'){
        $(".gender-and-size-block").hide();
        if($("#mobile").length==0) {
            $(".canvas-container").css("margin-top", "100px");
        }
        //$("#template_canvas").css("background-image", "url(images/Backpack_update.png)").css("margin-top", "100px");
        AddBacgroundArea();
        if($("#mobile").length==-0) {
            $("#savePrize").html('Заказать рюкзак');
        }
    }else{
        AddBacground();
    }


    if ($('.block').length > 0) {
        var percent= 0;
        var template_opacity = 0.5;

        $('.percent').text("40%");
        $('.block').draggable({
            axis: 'x',
            containment: "parent",
            grid: [21.5, 0],
            drag: function (e, ui) {
                var pos = ui.position.left;
                $('.line-yellow').width(pos);
                template_opacity = ((pos/215)+0.1);
                if(template_opacity < 0.5){
                    template_opacity = 0.5
                }
                if(template_opacity > 0.9){
                    template_opacity = 0.9;
                }
                percent = Math.round(template_opacity*100);
                $('.percent').text( (percent-10)+"%");
                _template.set({
                    opacity: (1+0.1)-template_opacity,
                });
                canvas.renderAll();
            }
        });
    }

    var back_area;
    function AddBacgroundArea() {

        fabric.Image.fromURL(Backpack_area, function (objects, options) {
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

            fabric.Image.fromURL(template_backpac2, function (objects, options) {
                background = objects;
                if($("#mobile").length>0) {
                    background.set({
                        left: 66.55721393034806,
                        top: 177.4427860696518,
                        height: 90.27860696517416,
                        width: 157.95024875621914,
                        opacity: 0.4,
                        selectable: false
                    });
                }else {
                    background.set({
                        left: 88.55721393034806,
                        top: 235.4427860696518,
                        height: 125.27860696517416,
                        width: 209.95024875621914,
                        opacity: 0.4,
                        selectable: false
                    });
                }



                //
                //background.fill = new fabric.Pattern({
                //    source: objects
                //});


                canvas.add(background);
                canvas.renderAll();
                _template = background;
                AddRectBackPack();
                $("#template_mobile").change();
            });

        });
    }

    function AddBacground() {
        fabric.Image.fromURL(image_bacground_clear, function (objects, options) {
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
            AddTemplate();
        });

        return;
        fabric.Image.fromURL(image_bacground, function (objects, options) {
            background = objects;
            background.set({
                left: 105.97014925373131,
                top: 67.7570232668991,
                height : 259.6061608127029,
                width : 185.07462686567166,
                opacity: 1,
                selectable: false
            });
            canvas.add(background);
            canvas.renderAll();
            _template = background;
        });
    }

    function AddTemplateBackpack() {
        fabric.Image.fromURL(template_bacground, function (img) {
            img.left = 100;
            //img.right = 150;
            img.top = 236;
            img.height = 124;
            img.width = 200;
            img.selectable=false;
            canvas.add(img);
            //_template = img;
            img.globalCompositeOperation = 'source-atop';
            canvas.renderAll();
        });
    }

    function AddTemplate() {
        fabric.Image.fromURL(template_bacground, function (img) {
            img.left = 0;
            img.top = 0;
            img.height = canvas.height;
            img.width = canvas.width;
            img.selectable=false;
            canvas.centerObject(img);
            canvas.add(img);
            _template = img;
            img.globalCompositeOperation = 'source-atop';
            canvas.renderAll();
            AddRect();
            $("#template_mobile").change();
        });
    }

    /*
    left: 88.55721393034806,
        top: 211.4427860696518,
        height : 144.27860696517416,
        width : 209.95024875621914,*/

    var rect;
    function AddRect() {
        if($("#mobile").length>0) {/*Для мобильника другие координаты*/
            rect = new fabric.Rect({
                left: 105.97014925373131-(105.97014925373131/4),
                top: 67.7570232668991-(67.7570232668991/4),
                height : 259.6061608127029-(259.6061608127029/4),
                width : 185.07462686567166-(185.07462686567166/4),
                selectable:false,
                opacity: 0,
                //fill: 'rgba(255,0,0,0.5)',
            });
        }else {
            rect = new fabric.Rect({
                left: 105.97014925373131,
                top: 67.7570232668991,
                height : 259.6061608127029,
                width : 185.07462686567166,
                selectable:false,
                opacity: 0,
                //fill: 'rgba(255,0,0,0.5)',
            });
        }
        canvas.add(rect);
        CheckLostCanvas();
    }
    
    function CheckLostCanvas() {
        return;
        $.post("/LoadTempConstr", {_token: $("input[name='_token']").val() },
            function (data) {
                if(data.temp==null || data.temp.length==0) return;
                fabric.loadSVGFromString(data.temp, function(objects, options) {
                    //canvas.clear();
                    // Group elements to fabric.PathGroup (more than 1 elements) or
                    // to fabric.Path
                    //
                    //paths
                    //:
                    //Array[12]
                    //objects.paths

                    var t = objects.splice(3, objects.length);
                    var loadedObject = fabric.util.groupSVGElements(t, options);
                    for(var i=0;i<t.length;i++){
                        var width = t[i].width;
                        var height = t[i].height;
                        var _left = t[i].left;
                        var _top = t[i].top;
                        var link = $( t[i]._element).attr('src');
                        console.log(t[i]);
                        fabric.Image.fromURL(link, function(img) {
                            img.left = _left;
                            img.top = _top;
                            img.lockScaling = true;
                            img.height =  height;
                            img.width  = width;
                            img.setControlsVisibility({
                                mt: false, // middle top disable
                                mb: false, // midle bottom
                                ml: false, // middle left
                                mr: false, // I think you get it
                            });
                            canvas.centerObject(img);
                            canvas.add(img);
                            img.globalCompositeOperation = 'source-atop';
                            img.bringToFront();
                            c = null;
                            $('#_temp_canvas').remove();
                            canvas.renderAll();
                            img.setCoords();
                            img.setControlsVisibility({
                                mt: false, // middle top disable
                                mb: false, // midle bottom
                                ml: false, // middle left
                                mr: false, // I think you get it
                            });
                        });

                    }
                },function(img, object) {

                });
        });
    }
    
    function AddRectBackPack() {
        if($("#mobile").length>0) {/*Для мобильника другие координаты*/
            rect = new fabric.Rect({
                left: 88.55721393034806-(88.55721393034806/4),
                top: 235.4427860696518-(235.4427860696518/4),
                height : 125.27860696517416-(125.27860696517416/4),
                width : 209.95024875621914-(209.95024875621914/4),
                selectable:false,
                opacity: 0,
            });
        }else {
            rect = new fabric.Rect({
                left: 88.55721393034806,
                top: 235.4427860696518,
                height: 125.27860696517416,
                width: 209.95024875621914,
                selectable: false,
                opacity: 0,
            });
        }
        canvas.add(rect);
    }
    $("#change_personal_data").click(function () {
        var trsvg = canvas.toSVG();
        $.post("/SaveTempConstr", {_token: $("input[name='_token']").val(),temp: trsvg },
            function (data) {
        });
        return false;
    });

    $(".sticker-item").click(function () {
        ChGr();
        if( $(".no-balls").length>0) {
            $(".no-balls").hide();
        }
    });


    $("#template_mobile").change(function () {
        var val = $("#template_mobile").val();
        if(val <= 30 || val >= 90){
            val = 40;
        }
        _template.set({
            opacity: 1 - val /100 //(1+0.1)-template_opacity,
        });
        $(".percent").text(val+"%");
        canvas.renderAll();
    });



    function ChGr() {
        if(d=='Backpack'){
            $.post("/CheckOpenGroupStikersBackpack", {_token: $("input[name='_token']").val(),group: group },
                function (data) {
                    if($(".lock").length>0) {
                        if (data.state === 'true') {
                            //addImage(d);
                            $(".lock").hide();
                            $(".open-group-text").hide();
                            $("#btn_open_group").hide();
                        } else {
                            $(".lock").show();
                            $(".open-group-text").show();
                            $("#btn_open_group").show();
                        }
                    }
                });
        }else{
            $.post("/CheckOpenGroupStikers", {_token: $("input[name='_token']").val(),group: group },
                function (data) {
                    if($(".lock").length>0) {
                        if (data.state === 'true') {
                            //addImage(d);
                            $(".lock").hide();
                            $(".open-group-text").hide();
                            $("#btn_open_group").hide();
                        } else {
                            $(".lock").show();
                            $(".open-group-text").show();
                            $("#btn_open_group").show();
                        }
                    }
                });
        }
    }

    //man
    $(".man").click(function () {
        gender=0;
        canvas.remove(background);
        AddBacground();
    });

    $(".woman").click(function () {
        gender=1;
        canvas.remove(background);
        fabric.Image.fromURL(image_bacground_clear_woman, function (objects, options) {
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
            AddTemplate();
        });

    });

    function addImage(ele) {
        if($(ele).attr('id_stiker')==null)return;
        if($(ele).attr('group')=="1") {
            if( $(".group1").attr('isLock')=="true"){
                $('.backdrop-constructor').show();
                $("#firstgroup").show();
                return false;
            }
        }
        var bg = $(ele).css('background-image');
        bg = bg.replace('url(','').replace(')','').replace('"','').replace('"','');
        bg = bg.replace('imagecache/blur/stikers/','imagecache/big/stikers/');
        fabric.Image.fromURL(bg, function(img) {
            img.left = 50;
            img.top = 200;
            var maxWidth = 100; // Max width for the image
            var maxHeight = 100;// Max height for the image
            var ratio = 0;  // Used for aspect ratio
            var width = img.width;    // Current image width
            var height = img.height;  // Current image height
            if(width > maxWidth){
                ratio = maxWidth / width;
                img.width =  maxWidth;
                img.height =  height * ratio;
                height = height * ratio;
                width = width * ratio;
            }
            if(height > maxHeight){
                ratio = maxHeight / height;
                img.height =   maxHeight;
                img.width =  width * ratio;
                width = width * ratio;
                height = height * ratio;
            }
            img.lockScaling = true;
            img.lockUniScaling = true;
            img.setControlsVisibility({
                mt: false, // middle top disable
                mb: false, // midle bottom
                ml: false, // middle left
                mr: false, // I think you get it
            });

            img.set({
                transparentCorners: false
            });

            canvas.centerObject(img);
            canvas.add(img);
            if(d=='Backpack'){
                img.top= img.top+100;
            }
            img.globalCompositeOperation = 'source-atop';
            img.bringToFront();
            c = null;
            $('#_temp_canvas').remove();
            canvas.renderAll();
            img.setCoords();
            img.setControlsVisibility({
                mt: false, // middle top disable
                mb: false, // midle bottom
                ml: false, // middle left
                mr: false, // I think you get it
            });

            img.set({
                transparentCorners: false
            });

            if($("#stickerModal").length>0){
                $("#stickerModal").arcticmodal('close');
            }

        });
    }
    $(".item-img").click(function () {
        var t = this;
        if(d=='Backpack') {
            $.post("/CheckOpenGroupStikersBackpack", {_token: $("input[name='_token']").val(), group: $(this).attr('group')},
                function (data) {
                    if (data.state === 'true') {
                        addImage(t);
                    } else {
                        return false;
                    }
                });
        }else {
            $.post("/CheckOpenGroupStikers", {_token: $("input[name='_token']").val(), group: $(this).attr('group')},
                function (data) {
                    if (data.state === 'true') {
                        addImage(t);
                    } else {
                        return false;
                    }
                });
        }
        return false;
    });
    document.addEventListener("change_template_opacity", function(e) {
        _template.set({
            opacity: (1-e.detail.template_opacity)+0.1,
        });
        canvas.renderAll();
    });

    function onObjectSelected(e) {
        $(".btn-remove-sticker").show();
    }
    canvas.on('object:selected', onObjectSelected);

/*
    $("#radio_1").click(function () {
        if ($("#btn_select_prize").hasClass("disabled")) {
            $("#btn_select_prize").removeClass( "disabled" );
        }else{
            $("#btn_select_prize").addClass( "disabled" );
        }
    });
    */
    $("#radio_1").change(function () {
        if ($("#btn_select_prize").hasClass("disabled")) {
            $("#btn_select_prize").removeClass( "disabled" );
        }else{
            $("#btn_select_prize").addClass( "disabled" );
        }
    });

    $("#savePrize").click(function () {
        $('#selectPriseModal').arcticmodal({
            overlay: {
                css: {
                    backgroundColor: '#000000',
                    opacity: .9
                }
            }
        });
        $("#btn_select_prize").unbind('click');
        $("#btn_select_prize").click(function () {
            if ($("#btn_select_prize").hasClass("disabled")) {
                WarningModal('#selectPriseModal');
            }else{
                canvas.deactivateAll();
                var trsvg = canvas.toSVG();
                var trpng = canvas.toDataURL('png');
                var type ='shirt';

                if(d=='Backpack') {
                    type = 'Backpack';
                }
                $.post("/SaveCustumPrize", {
                    _token: $("input[name='_token']").val(),
                    svg: trsvg,
                    png: trpng,
                    type: type,
                    gender: gender,
                    size: $(".all-size-block").find(".active").attr("size"),
                    opacity : $('.percent').text().replace("%",""),
                },
                    function (data) {
                        if (data.state === 'true') {
                            window.location.href = "/mypage";
                            $("#errorballs").hide();
                        }else{
                            $("#selectPriseModal").arcticmodal('close');
                            $('#notBallsModal').arcticmodal({
                                overlay: {
                                    css: {
                                        backgroundColor: '#000000',
                                        opacity: .6
                                    }
                                }
                            });
                            return false;
                        }
                    });
                return false;
            }
        });

        /*
        $("#radio_1").click(function () {
            $("#btn_select_prize").removeClass( "disabled" );
        });


        */
    });
    $(".btn-remove-sticker").hide();
    $(".btn-remove-sticker").click(function () {
        var activeObject = canvas.getActiveObject();
        canvas.remove(activeObject);
        $(".btn-remove-sticker").hide();
    });
    $(".remove-sticker-item").click(function () {
        var activeObject = canvas.getActiveObject();
        canvas.remove(activeObject);
    });
    function MoveObjArea(e) {
        var obj = e.target;
    }

    $(".btn-order-item").click(function () {
        //console.log("test");

    });

    var canvasData = {};

    canvas.on("object:modified", function(e){
        canvasData = canvas.toJSON();
    });

    //canvas.on("object:scaling", function(e){
    //
    //    Onmoving(e);
    //
    //    var obj = e.target;
    //    var bounds = rect;
    //    var objw = parseInt(parseInt(obj.width) * obj.scaleX);
    //    var objh = parseInt(parseInt(obj.height) * obj.scaleY);
    //
    //    var scale = 0;
    //
    //    //left
    //    if(obj.left < bounds.left || (parseInt(obj.left) + objw) > (parseInt(bounds.left)+parseInt(bounds.width))){
    //        obj.setLeft(bounds.left);
    //        scale = bounds.width/obj.width;
    //        obj.setScaleX(scale);
    //        obj.setScaleY(scale);
    //    } else
    //    //top
    //    if(obj.top < bounds.top || (parseInt(obj.top) + objh) > (parseInt(bounds.top)+parseInt(bounds.height))){
    //        obj.setTop(bounds.top);
    //        scale = bounds.height/obj.height;
    //        obj.setScaleX(scale);
    //        obj.setScaleY(scale);
    //    }
    //});


    var maxScale = 0;
    canvas.on("object:scaling", function(e){
        var obj = e.target;
        var loadBack = false;
        obj.setCoords();

        var problem1 = false;
        var problem2 = false;

        // top-left  corner
        if(obj.getBoundingRect().top < rect.top || obj.getBoundingRect().left < rect.left){
            problem1 = true;
        }
        // bot-right corner
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > (rect.height+rect.top) || obj.getBoundingRect().left+obj.getBoundingRect().width  > (rect.width+rect.left)){
            problem2 = true;
        }
        //test
        if(problem1 || problem2){


            Onmoving(e);

            //var delimiter = obj.height / rect.width;
            //obj.height = rect.width;
            //obj.width = rect.width * delimiter;
            //console.log(obj.height, obj.width);

            var scale = obj.getScaleX()*0.9;

            obj.setScaleX(maxScale);
            obj.setScaleY(maxScale);

            //obj.height = parseInt(obj.height*0.99);
            //obj.width = parseInt(obj.width*0.99);
            console.log(obj.getScaleX(), obj.getScaleY());
            obj.setCoords();

        } else {
            maxScale = obj.getScaleX();
        }
        Onmoving(e);


        return;

        var obj = e.target;
        var bounds = rect;
        var objw = parseInt(parseInt(obj.width) * obj.scaleX);
        var objh = parseInt(parseInt(obj.height) * obj.scaleY);

        var scale = 0;

        //left
        if(obj.left < bounds.left || (parseInt(obj.left) + objw) > (parseInt(bounds.left)+parseInt(bounds.width))){
            obj.setLeft(bounds.left);
            scale = bounds.width/obj.width;
            obj.setScaleX(scale);
            obj.setScaleY(scale);
        } else
        //top
        if(obj.top < bounds.top || (parseInt(obj.top) + objh) > (parseInt(bounds.top)+parseInt(bounds.height))){
            obj.setTop(bounds.top);
            scale = bounds.height/obj.height;
            obj.setScaleX(scale);
            obj.setScaleY(scale);
        }


    });



    function onRotation(e){
        var obj = e.target;
        var loadBack = false;
        obj.setCoords();

        var problem1 = false;
        var problem2 = false;

        // top-left  corner
        if(obj.getBoundingRect().top < rect.top || obj.getBoundingRect().left < rect.left){
            problem1 = true;
        }
        // bot-right corner
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > (rect.height+rect.top) || obj.getBoundingRect().left+obj.getBoundingRect().width  > (rect.width+rect.left)){
            problem2 = true;
        }
        //test
        if(problem1 || problem2){


            Onmoving(e);

            //var delimiter = obj.height / rect.width;
            //obj.height = rect.width;
            //obj.width = rect.width * delimiter;
            //console.log(obj.height, obj.width);

            var scale = obj.getScaleX()*0.9;

            obj.setScaleX(scale);
            obj.setScaleY(scale);

            //obj.height = parseInt(obj.height*0.99);
            //obj.width = parseInt(obj.width*0.99);
            //console.log(obj.getScaleX(), obj.getScaleY());
            obj.setCoords();

        } else {
            //maxScale = obj.getScaleX();
        }
        //test
    }

    function Onmoving(e) {
        var obj = e.target;

        console.log(obj.left, obj.top);

        var loadBack = false;
        // if object is too big ignore
        if(obj.currentHeight > (rect.height+rect.top) || obj.currentWidth > (rect.width+rect.left)) {
            return;
        }
        obj.setCoords();

        var problem1 = false;
        var problem2 = false;

        // top-left  corner
        if(obj.getBoundingRect().top < rect.top || obj.getBoundingRect().left < rect.left){
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top+rect.top);
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left+rect.left);
        }
        // bot-right corner
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > (rect.height+rect.top) || obj.getBoundingRect().left+obj.getBoundingRect().width  > (rect.width+rect.left)){
            obj.top = Math.min(obj.top, (rect.height+rect.top)-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, (rect.width+rect.left)-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
        }
        obj.setCoords();
    }

    canvas.on('object:moving', function (e) {
        Onmoving(e);
    });


    canvas.on('object:rotating', function(e){
        //Onmoving(e);


        onRotation(e);

    });

    /*Добавление тектса*/
    var canvasText  = new fabric.Canvas('drawtext');
    if($("#mobile").length>0) {
        canvasText.setHeight(120);
        canvasText.setWidth(120);
    }
    else {
        canvasText.setHeight(240);
        canvasText.setWidth(240);
    }
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
        canvasText.deactivateAll();
        fabric.Image.fromURL(canvasText.toDataURL('png'), function(img) {
            img.left = 50;
            img.top = 50;
            if(d=='Backpack'){
                img.top= img.top+100;
            }
            img.height =200;
            img.width = 200;
            if($("#mobile").length>0) {
                img.height =100;
                img.width = 100;
                img.left = 100;
                img.top = 100;
            }
            img.lockScaling = true;
            img.globalCompositeOperation = 'source-atop';
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

    $("#open_new_group_sticker_1").click(function () {
        OpenGroup(1);
        $("#open_new_group_sticker_1").unbind();
        
    });
    $("#open_new_group_sticker_2").click(function () {
        OpenGroup(2);
        $("#open_new_group_sticker_2").unbind();
    });
    $("#open_new_group_sticker_3").click(function () {
        OpenGroup(3);
        $("#open_new_group_sticker_3").unbind();
    });

    var group =1;
    $(".fa-caret-right").click(function () {
        group++;
        ChGr();
    });
    $(".fa-caret-left").click(function () {
        group--;
        ChGr();
    });
    $("#btn_open_group").click(function () {
        OpenGroup(group);
        return false;
    });

    function OpenGroup(group) {
        if(d=='Backpack') {
            $.post("/OpenGroiupStikersBackpack", {_token: $("input[name='_token']").val(), group: group},
                function (data) {
                    if (data.state === 'true') {
                        $(".open-stickers-block").hide();
                        $(".backdrop-constructor").hide();
                        $("#manageraddtext").show();
                        $('#add_text').removeAttr('disabled');
                        $('[data-disabled="add_text"]').removeClass('disabled');
                        if($("#grp1").length>0)
                            $("#grp1").attr('isLock','false');
                        if(group==1) {
                            $("#point1").removeClass('disabled');
                            $("#point1").addClass('active');
                            ChGr();
                            return true;
                        }
                        if(group==2) {
                            $("#point1").removeClass('disabled');
                            $("#point2").removeClass('disabled');
                            ChGr();
                            return true;
                        }
                        if(group==3) {
                            $("#point1").removeClass('disabled');
                            $("#point2").removeClass('disabled');
                            $("#point3").removeClass('disabled');
                            ChGr();
                            return true;
                        }
                        ChGr();
                    }else{
                        if( $(".no-balls").length>0) {
                            $(".no-balls").show();
                        }
                    }
                });
        }else {
        $.post("/OpenGroiupStikers", {_token: $("input[name='_token']").val(), group: group},
            function (data) {
                if (data.state === 'true') {
                    if($("#grp1").length>0)
                        $("#grp1").attr('isLock','false');
                    $(".open-stickers-block").hide();
                    $(".backdrop-constructor").hide();
                    $("#manageraddtext").show();
                    $('#add_text').removeAttr('disabled');
                    $('[data-disabled="add_text"]').removeClass('disabled');
                    if(group==1) {
                        $(".group1").show();
                        $("#point1").removeClass('disabled');
                        $("#point1").addClass('active');
                        ChGr();
                        return true;
                    }
                    if(group==2) {
                        $(".group1").show();
                        $(".group2").hide();
                        $(".group3").hide();
                        $("#point1").removeClass('disabled');
                        $("#point2").removeClass('disabled');
                        ChGr();
                        return true;
                    }
                    if(group==3) {
                        $(".group1").show();
                        $(".group2").hide();
                        $(".group3").hide();
                        $("#point1").removeClass('disabled');
                        $("#point2").removeClass('disabled');
                        $("#point3").removeClass('disabled');
                        ChGr();
                        return true;
                    }
                    ChGr();
                }else{
                    if( $(".no-balls").length>0) {
                        $(".no-balls").show();
                    }
                }
            });
        }
    }

    $(".g1").click(function () {
        if(!$(this).hasClass('disabled')) {
            $(".group1").show();
            $(".group2").hide();
            $(".group3").hide();
        }
    });
    $(".g2").click(function () {
        if(!$(this).hasClass('disabled')) {
            $(".group1").hide();
            $(".group2").show();
            $(".group3").hide();
        }
    });
    $(".g3").click(function () {
        if(!$(this).hasClass('disabled')) {
            $(".group1").hide();
            $(".group2").hide();
            $(".group3").show();

        }
    });

    $.each( $(".item-img"), function( index, value ) {
        if($(value).attr('bg')!=null){
            $(value).css("background-image", "url("+$(value).attr('bg')+")");
        }
    });
    //$(".item-img").css("background-image", "url(images/Backpack_update.png)");
});



