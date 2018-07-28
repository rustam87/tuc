fabric.Object.prototype.drawControls = function (ctx) {
    if (!this.hasControls) {
        return this;
    }

    var wh = this._calculateCurrentDimensions(),
        width = wh.x,
        height = wh.y,
        scaleOffset = this.cornerSize,
        left = -(width + scaleOffset) / 2,
        top = -(height + scaleOffset) / 2,
        methodName = this.transparentCorners ? 'strokeRect' : 'fillRect';

    ctx.save();

    ctx.lineWidth = 1;

    ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    ctx.strokeStyle = ctx.fillStyle = this.cornerColor;

    // top-left
    this._drawControl('tl', ctx, methodName,
        left,
        top);

    // top-right
    this._drawControl('tr', ctx, methodName,
        left + width,
        top);

    // bottom-left
    this._drawControl('bl', ctx, methodName,
        left,
        top + height);

    // bottom-right
    this._drawControl('br', ctx, methodName,
        left + width,
        top + height);

    if (!this.get('lockUniScaling')) {

        // middle-top
        this._drawControl('mt', ctx, methodName,
            left + width/2,
            top);

        // middle-bottom
        this._drawControl('mb', ctx, methodName,
            left + width/2,
            top + height);

        // middle-right
        this._drawControl('mr', ctx, methodName,
            left + width,
            top + height/2);

        // middle-left
        this._drawControl('ml', ctx, methodName,
            left,
            top + height/2);
    }

    // middle-top-rotate
    if (this.hasRotatingPoint) {
        /*
         We dont need old corner for rotate :)

         this._drawControl('mtr', ctx, methodName,
         left + width/2 - scaleOffsetX,
         this.flipY
         ? (top + height + (this.rotatingPointOffset / this.scaleY) - this.cornerSize/this.scaleX/2 + strokeWidth2 + paddingY)
         : (top - (this.rotatingPointOffset / this.scaleY) - this.cornerSize/this.scaleY/2 - strokeWidth2 - paddingY));

         Draw rotate custom icon
         */
        var rotate = new Image(), rotateLeft, rotateTop;
        rotate.src = '/images/rotation.jpg';

        //rotateLeft = left + width / 2 - scaleOffsetX;
        rotateLeft = left + width / 2;
        //rotateTop = this.flipY
        //    ? (top + height + (this.rotatingPointOffset / this.scaleY) - this.cornerSize / this.scaleX / 2 + strokeWidth2 + paddingY)
        //    : (top - (this.rotatingPointOffset / this.scaleY) - this.cornerSize / this.scaleY / 2 - strokeWidth2 - paddingY);

        rotateTop = top - this.rotatingPointOffset;

        //var size = this.cornerSize;
        var size = 16;

        ctx.drawImage(rotate, rotateLeft, rotateTop, size, size);


    }

    ctx.restore();

    return this;
};