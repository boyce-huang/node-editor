"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// declare class CanvaLayer {
//     ctx: CanvasRenderingContext2D;
//     element: HTMLCanvasElement;
//     constructor(
//         stage: CanvaStage, 
//         el : HTMLCanvasElement, 
//         layerName?: string
//     )
// }
// declare class CanvaShapeOptions {
// }
// declare class CanvaPosition {
//     constructor(
//         x: number, 
//         y: number
//     )
//     x: number ;
//     y: number ;
// }
// declare class CanvaShape{
//     uuid: string;
//     dragName: string;
//     draggAble: boolean;
//     hoverAble: boolean ;
//     isHovering: boolean ;
//     droppAble: boolean ;
//     isDragging: boolean;
//     dropNames: string[] ;
//     constructor(
//         stage: CanvaStage, 
//         options: CanvaShapeOptions
//     )
//     draggEnd(pos: CanvaPosition) :void
//     draggStart(pos: CanvaPosition):void
//     render(pos: CanvaPosition, e: MouseEvent) :void
//     isPointInPath(pos: CanvaPosition): boolean 
//     render(): void
// }
// class CanvaShapeGroupOptions extends AbstractCanvaShapeOptions {}
// class CanvaShapeGroup extends AbstractCanvaShape {
//   shapes: AbstractCanvaShape[] = [];
//   constructor(stage: CanvaStage, options: CanvaShapeGroupOptions) {
//     super(stage, options);
//     // setTimeout(() => {
//     //   this.moveShapes();
//     // }, 1000);
//   }
//   getPath(ctx: CanvasRenderingContext2D) {
//     // const ctx = this.stage.defaultLayer.ctx;
//     ctx.beginPath();
//     ctx.roundRect(0, 0, 160, 240, 8);
//     ctx.closePath();
//   }
//   getDragPath(ctx: CanvasRenderingContext2D): void {
//     ctx.beginPath();
//     ctx.roundRect(0, 0, 160, 30, 8);
//     ctx.closePath();    
//   }
//   addShape(shape: AbstractCanvaShape): AbstractCanvaShape {
//     this.shapes.push(shape);
//     shape.stage = this.stage;
//     return shape;
//   }
//   // moveShapes() {
//   //   const { x, y } = this.position;
//   //   this.shapes.forEach((shape) => {
//   //     shape.position.x = x + shape.position.x;
//   //     shape.position.y = y + shape.position.y;
//   //   });
//   //   this.stage.reflash();
//   // }
//   // getPath(ctx: CanvasRenderingContext2D) {
//   //   // const ctx = this.stage.defaultLayer.ctx;
//   //   ctx.beginPath();
//   //   ctx.roundRect(0, 0, 160, 240, 8);
//   //   ctx.closePath();
//   // }
//   draw(ctx: CanvasRenderingContext2D, pos?: CanvaPosition, e?: MouseEvent) {
//     // , isHover, isDraging, isDropping
//     ctx.fillStyle = this.isHovering || this.isDragging ? "#00ff00" : "#f1f1f1";
//     // if (ctx.isDragging) {
//     //   ctx.translate(this.position.x, this.position.y);
//     // }
//     ctx.fill();
//   }
// }
define("canva/CanvaPosition", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaPosition = void 0;
    class CanvaPosition {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    exports.CanvaPosition = CanvaPosition;
});
define("canva/CanvaShapeOptions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaShapeOptions = exports.AbstractCanvaShapeOptions = void 0;
    class AbstractCanvaShapeOptions {
        constructor() {
            this.hoverAble = false;
            this.draggAble = false;
            this.droppAble = false;
            this.dropNames = [];
            this.clickAble = false;
        }
    }
    exports.AbstractCanvaShapeOptions = AbstractCanvaShapeOptions;
    class CanvaShapeOptions extends AbstractCanvaShapeOptions {
    }
    exports.CanvaShapeOptions = CanvaShapeOptions;
});
define("canva/CanvaShape_Abstract", ["require", "exports"], function (require, exports) {
    "use strict";
    var _AbstractCanvaShape_instances, _AbstractCanvaShape_hovering, _AbstractCanvaShape_dragging, _AbstractCanvaShape_draggingX, _AbstractCanvaShape_draggingY, _AbstractCanvaShape_dropping, _AbstractCanvaShape_renderChildren, _AbstractCanvaShape_getParents, _AbstractCanvaShape_isPointInPath, _AbstractCanvaShape_eventListeners;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractCanvaShape = void 0;
    class AbstractCanvaShape {
        constructor(stage, options, uuid) {
            _AbstractCanvaShape_instances.add(this);
            _AbstractCanvaShape_hovering.set(this, false);
            _AbstractCanvaShape_dragging.set(this, false);
            _AbstractCanvaShape_draggingX.set(this, 0);
            _AbstractCanvaShape_draggingY.set(this, 0);
            _AbstractCanvaShape_dropping.set(this, false);
            _AbstractCanvaShape_eventListeners.set(this, {});
            this.stage = stage;
            this.options = options;
            this.uuid = uuid ?? stage.generateUUID();
            this.addEventListener("click", (e) => {
                // console.debug(AbstractCanvaShape.name, this.uuid, 'click');
            });
        }
        get hasChildren() {
            return this.children !== undefined && this.children.length > 0;
        }
        get isChild() {
            return this.parent !== undefined;
        }
        get position() {
            return this.options.position;
        }
        get hoverAble() {
            return this.options.hoverAble;
        }
        get draggAble() {
            return this.options.draggAble;
        }
        get dragName() {
            return this.options.dragName;
        }
        get draggingX() {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_draggingX, "f");
        }
        get draggingY() {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_draggingY, "f");
        }
        get droppAble() {
            return this.options.droppAble;
        }
        get dropNames() {
            return this.options.dropNames;
        }
        get clickAble() {
            return this.options.clickAble;
        }
        set position(value) {
            this.options.position = value;
        }
        get isHovering() {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_hovering, "f");
        }
        set isHovering(value) {
            __classPrivateFieldSet(this, _AbstractCanvaShape_hovering, value, "f");
        }
        get isDragging() {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_dragging, "f");
        }
        draggStart(pos) {
            __classPrivateFieldSet(this, _AbstractCanvaShape_dragging, true, "f");
            __classPrivateFieldSet(this, _AbstractCanvaShape_draggingX, pos.x, "f");
            __classPrivateFieldSet(this, _AbstractCanvaShape_draggingY, pos.y, "f");
            this.stage.setDraggingShape(this);
        }
        draggEnd(pos) {
            __classPrivateFieldSet(this, _AbstractCanvaShape_dragging, false, "f");
            this.position.x += (pos.x - __classPrivateFieldGet(this, _AbstractCanvaShape_draggingX, "f")) / this.stage.scale;
            this.position.y += (pos.y - __classPrivateFieldGet(this, _AbstractCanvaShape_draggingY, "f")) / this.stage.scale;
            __classPrivateFieldSet(this, _AbstractCanvaShape_draggingX, -1, "f");
            __classPrivateFieldSet(this, _AbstractCanvaShape_draggingY, -1, "f");
            this.stage.setDraggingShape(undefined);
        }
        get isDroping() {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_dropping, "f");
        }
        set isDropping(value) {
            __classPrivateFieldSet(this, _AbstractCanvaShape_dropping, value, "f");
        }
        addChild(shape) {
            if (this.children === undefined)
                this.children = [];
            this.children.push(shape);
            shape.parent = this;
            shape.stage = this.stage;
            return shape;
        }
        render(pos, e) {
            // console.debug(AbstractCanvaShape.name, this.render.name);
            const ctx = this.isDragging || (this.isChild && this.parent?.isDragging)
                ? this.stage.activeLayer.ctx
                : this.stage.defaultLayer.ctx;
            if (!this.isChild || true) {
                ctx.save();
            }
            try {
                const parents = __classPrivateFieldGet(this, _AbstractCanvaShape_instances, "m", _AbstractCanvaShape_getParents).call(this);
                parents.forEach((_parent) => {
                    ctx.translate(_parent.position.x, _parent.position.y);
                });
                ctx.translate(this.position.x, this.position.y);
                if (this.isDragging && pos) {
                    ctx.translate((pos.x - this.draggingX) / this.stage.scale, (pos.y - this.draggingY) / this.stage.scale);
                }
                this.getPath(ctx);
                this.draw(ctx, pos, e);
            }
            catch (error) {
                console.error(error);
            }
            if (!this.isChild || true) {
                ctx.restore();
            }
            if (this.hasChildren) {
                __classPrivateFieldGet(this, _AbstractCanvaShape_instances, "m", _AbstractCanvaShape_renderChildren).call(this, this.children, ctx, pos, e);
                // this.children!.forEach((child) => {
                //   try {
                //     child.render(pos, e);
                //   } catch (error) {
                //     console.error(error);
                //   }
                // });
            }
        }
        isPointInPath(pos) {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_instances, "m", _AbstractCanvaShape_isPointInPath).call(this, pos, this.getPath.bind(this));
            // const ctx = this.stage.defaultLayer.ctx;
            // ctx.save();
            // ctx.translate(this.position.x, this.position.y);
            // this.getPath(ctx);
            // const result = ctx.isPointInPath(pos.x, pos.y);
            // ctx.restore();
            // return result;
        }
        isPointInDragPath(pos) {
            return __classPrivateFieldGet(this, _AbstractCanvaShape_instances, "m", _AbstractCanvaShape_isPointInPath).call(this, pos, this.getDragPath.bind(this));
            // const ctx = this.stage.defaultLayer.ctx;
            // ctx.save();
            // ctx.translate(this.position.x, this.position.y);
            // this.getPath(ctx);
            // const result = ctx.isPointInPath(pos.x, pos.y);
            // ctx.restore();
            // return result;
        }
        getPath(ctx) {
            console.error("getPath not implemented");
        }
        getDragPath(ctx) {
            console.error("getDragPath not implemented");
            return this.getPath(ctx);
        }
        draw(ctx, pos, e) {
            console.error("draw not implemented");
        }
        hoverAbleShape() {
            console.error("hoverAbleShape not implemented");
        }
        draggAbleShape() {
            console.error("draggAbleShape not implemented");
        }
        getCenterPosition() {
            // console.error("getCenterPosition not implemented");
            return {
                x: this.position.x + (this.parent?.position.x || 0),
                y: this.position.y + (this.parent?.position.y || 0),
            };
        }
        addEventListener(type, listener) {
            if (!__classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type]) {
                __classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type] = [];
            }
            __classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type].push(listener);
        }
        removeEventListener(type, listener) {
            if (!__classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type])
                return;
            const index = __classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type].indexOf(listener);
            if (index === -1)
                return;
            __classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type].splice(index, 1);
        }
        dispatch(type, e) {
            // console.debug(AbstractCanvaShape.name, this.uuid, 'dispatch', type);
            if (!__classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type])
                return;
            __classPrivateFieldGet(this, _AbstractCanvaShape_eventListeners, "f")[type].forEach((listener) => {
                listener(e);
            });
        }
        destroy() {
            console.debug('Destroying resources in ' + AbstractCanvaShape.name, this.uuid);
        }
    }
    exports.AbstractCanvaShape = AbstractCanvaShape;
    _AbstractCanvaShape_hovering = new WeakMap(), _AbstractCanvaShape_dragging = new WeakMap(), _AbstractCanvaShape_draggingX = new WeakMap(), _AbstractCanvaShape_draggingY = new WeakMap(), _AbstractCanvaShape_dropping = new WeakMap(), _AbstractCanvaShape_eventListeners = new WeakMap(), _AbstractCanvaShape_instances = new WeakSet(), _AbstractCanvaShape_renderChildren = function _AbstractCanvaShape_renderChildren(children, ctx, pos, e) {
        if (!children || children.length === 0)
            return;
        children.forEach((child) => {
            try {
                // console.error('render child', child)
                child.render(pos, e);
            }
            catch (error) {
                console.error(error);
            }
            if (child.hasChildren && child.children && child.children.length > 0) {
                __classPrivateFieldGet(this, _AbstractCanvaShape_instances, "m", _AbstractCanvaShape_renderChildren).call(this, child.children, ctx, pos, e);
            }
        });
    }, _AbstractCanvaShape_getParents = function _AbstractCanvaShape_getParents() {
        const parents = [];
        if (!this.isChild || !this.parent)
            return parents;
        let parent = this.parent;
        while (parent) {
            parents.push(parent);
            parent = parent.parent;
        }
        return parents.reverse();
    }, _AbstractCanvaShape_isPointInPath = function _AbstractCanvaShape_isPointInPath(pos, getPathfunction) {
        const ctx = this.stage.defaultLayer.ctx;
        ctx.save();
        if (this.isChild) {
            const parents = __classPrivateFieldGet(this, _AbstractCanvaShape_instances, "m", _AbstractCanvaShape_getParents).call(this);
            parents.forEach((_parent) => {
                ctx.translate(_parent.position.x, _parent.position.y);
            });
            // ctx.translate(parent.position.x, parent.position.y);
        }
        ctx.translate(this.position.x, this.position.y);
        getPathfunction(ctx);
        const result = ctx.isPointInPath(pos.x, pos.y);
        ctx.restore();
        return result;
    };
});
define("canva/CanvaStage_Abstract", ["require", "exports"], function (require, exports) {
    "use strict";
    var _AbstractCanvaStage_canvaLinks, _AbstractCanvaStage_draggingLinkShape;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractCanvaStage = void 0;
    class AbstractCanvaStage {
        constructor() {
            /* link
             *******************************************/
            _AbstractCanvaStage_canvaLinks.set(this, []);
            _AbstractCanvaStage_draggingLinkShape.set(this, void 0);
        }
        /* Layer
         *****************************************************/
        initLayers() {
            console.error("initLayers not implemented");
        }
        cleanLayer(layer) {
            console.error("cleanLayer not implemented");
        }
        /* BG
         *****************************************************/
        renderBGGrid() {
            console.error("renderBGGrid not implemented");
        }
        zoomAble() {
            console.error("zoomAble not implemented");
        }
        draggAble() {
            console.error("draggAble not implemented");
        }
        /* Shape
         *****************************************************/
        // addShape<T extends AbstractCanvaShape>(options: ICanvaShapeOptions): T {
        //   console.error("addShape not implemented");
        //   return null as unknown as T;
        // }
        addShape(shape) {
            console.error("addNewShape not implemented");
            return null;
        }
        removeAllShapes() {
            console.error("removeAllShapes not implemented");
        }
        ;
        removeShape(uuid) {
            console.error("removeAllShapes not implemented");
        }
        ;
        renderShapes() {
            console.error("renderShapes not implemented");
        }
        hoverAbleShape() {
            console.error("hoverAbleShape not implemented");
        }
        draggAbleShape() {
            console.error("draggAbleShape not implemented");
        }
        setDraggingShape(shape) {
            // <CanvaShapeType extends AbstractCanvaShape<  OptionType extends AbstractCanvaShapeOptions>>
            console.error("setDraggingShape not implemented");
        }
        getAllShapes() {
            console.error("getAllShapes not implemented");
            return [];
        }
        clickAbleShape() {
            console.error("clickAbleShape not implemented");
        }
        get canvaLinks() {
            return __classPrivateFieldGet(this, _AbstractCanvaStage_canvaLinks, "f");
        }
        isLinking(to) {
            console.error("isLinking not implemented");
            return false;
        }
        canLink(from, to) {
            console.error("canLink not implemented");
            return false;
        }
        addLink(from, to) {
            console.error("addLink not implemented");
        }
        removeLink(from, to) {
            console.error("removeLink not implemented");
        }
        removeAllLinks() {
            console.error("removeAllLinks not implemented");
        }
        ;
        get draggingLinkShape() {
            return __classPrivateFieldGet(this, _AbstractCanvaStage_draggingLinkShape, "f");
        }
        set draggingLinkShape(shape) {
            __classPrivateFieldSet(this, _AbstractCanvaStage_draggingLinkShape, shape, "f");
        }
        addDraggingLink(shape, isEndLink) {
            console.error("addDraggingLink not implemented");
        }
        addBegingLink(shape) {
            console.error("addBegingLink not implemented");
        }
        addEndLink(shape) {
            console.error("addEndLink not implemented");
        }
        drawLink(posBegin, posEnd, ctx) {
            console.error("drawLink not implemented");
        }
        removeEndLink(shape) {
            console.error("removeEndLink not implemented");
            return;
        }
        renderLink(from, to) {
            console.error("renderLink not implemented");
        }
        renderLinks() {
            console.error("renderLinks not implemented");
        }
        // addLink(shapeBegin: AbstractCanvaShape, shapeEnd: AbstractCanvaShape) {}
        // removeLink(shape: AbstractCanvaShape) {}
        /* Utils
         *****************************************************/
        generateUUID() {
            console.error("setCursor not implemented");
            return null;
        }
        setCursor(cursor) {
            console.error("setCursor not implemented");
        }
        getCanvaPos(e) {
            console.error("setCursor not implemented");
            return null;
        }
        resetTransform() {
            console.error("resetTransform not implemented");
        }
        zoomAndTransform(scale, x, y) {
            console.error("zoomAndTransform not implemented");
        }
    }
    exports.AbstractCanvaStage = AbstractCanvaStage;
    _AbstractCanvaStage_canvaLinks = new WeakMap(), _AbstractCanvaStage_draggingLinkShape = new WeakMap();
});
define("canva/CanvaStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    var _CanvaStatus_instances, _CanvaStatus_init;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStatus = void 0;
    class CanvaStatus {
        constructor(stage) {
            _CanvaStatus_instances.add(this);
            this.stage = stage;
            this.element = stage.element;
            this.pagePos = document.getElementById("PagePos");
            this.layerPos = document.getElementById("LayerPos");
            this.clientPos = document.getElementById("ClientPos");
            this.movementPos = document.getElementById("MovementPos");
            this.offsetPos = document.getElementById("OffsetPos");
            this.screenPos = document.getElementById("ScreenPos");
            this.pos = document.getElementById("Pos");
            this.statusZoom = document.getElementById("StatusZoom");
            this.canvasPos = document.getElementById("CanvasPos");
            this.canvasTransformPos = document.getElementById("CanvasTransformPos");
            __classPrivateFieldGet(this, _CanvaStatus_instances, "m", _CanvaStatus_init).call(this);
        }
        show(e) {
            if (e) {
                if (this.pagePos)
                    this.pagePos.innerText = e.pageX + "," + e.pageY;
                if (this.layerPos)
                    this.layerPos.innerText = e.layerX + "," + e.layerY;
                if (this.clientPos)
                    this.clientPos.innerText = e.clientX + "," + e.clientY;
                if (this.movementPos)
                    this.movementPos.innerText = e.movementX + "," + e.movementY;
                if (this.offsetPos)
                    this.offsetPos.innerText = e.offsetX + "," + e.offsetY;
                if (this.screenPos)
                    this.screenPos.innerText = e.screenX + "," + e.screenY;
                if (this.pos)
                    this.pos.innerText = e.x + "," + e.y;
                const pos = this.stage.getCanvaPos(e);
                if (this.canvasPos)
                    this.canvasPos.innerText = pos.x + "," + pos.y;
            }
            if (this.statusZoom)
                this.statusZoom.innerText = `${Math.round(this.stage.scale * 100)}%`;
            if (this.canvasTransformPos)
                this.canvasTransformPos.innerText =
                    parseFloat("" + this.stage.transform.e).toFixed() +
                        "," +
                        parseFloat("" + this.stage.transform.f).toFixed();
        }
    }
    exports.CanvaStatus = CanvaStatus;
    _CanvaStatus_instances = new WeakSet(), _CanvaStatus_init = function _CanvaStatus_init() {
        let scheduledAnimationFrame = false;
        this.element.addEventListener("mousemove", (e) => {
            if (scheduledAnimationFrame) {
                return;
            }
            scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                scheduledAnimationFrame = false;
                this.show(e);
            });
        });
    };
});
define("canva/CanvaStage_Base", ["require", "exports", "canva/CanvaStage_Abstract", "canva/CanvaStatus"], function (require, exports, CanvaStage_Abstract_1, CanvaStatus_1) {
    "use strict";
    var _CanvaStage_transform;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStage = void 0;
    class CanvaStage extends CanvaStage_Abstract_1.AbstractCanvaStage {
        get transform() {
            return __classPrivateFieldGet(this, _CanvaStage_transform, "f");
        }
        constructor(documentId) {
            super();
            this.width = -1;
            this.height = -1;
            this.scale = 1;
            this.shapes = [];
            // groups: CanvaShapeGroup[] = [];
            this.layers = [];
            _CanvaStage_transform.set(this, { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
            this.element = document.getElementById(documentId);
            if (!this.element) {
                console.error(CanvaStage.name, "element not found", documentId);
                return;
            }
            this.width = this.element.clientWidth;
            this.height = this.element.clientHeight;
            this.canvaStatus = new CanvaStatus_1.CanvaStatus(this);
            this.initLayers();
            this.zoomAble();
            this.draggAble();
            this.hoverAbleShape();
            this.draggAbleShape();
            this.clickAbleShape();
        }
        render() {
            this.resetTransform();
            this.renderBGGrid();
            this.renderLinks();
            this.renderShapes();
        }
        reflash() {
            this.cleanLayer(this.activeLayer);
            this.cleanLayer(this.defaultLayer);
            this.renderLinks();
            this.renderShapes();
        }
        reset() {
            this.removeAllLinks();
            this.removeAllShapes();
            this.reflash();
        }
    }
    exports.CanvaStage = CanvaStage;
    _CanvaStage_transform = new WeakMap();
});
define("canva/CanvaLayer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaLayer = void 0;
    class CanvaLayer {
        constructor(stage, element, layerName) {
            this.stage = stage;
            this.element = element;
            this.name = layerName;
            this.ctx = element.getContext("2d");
        }
    }
    exports.CanvaLayer = CanvaLayer;
});
define("canva/CanvaSize", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaSize = void 0;
    class CanvaSize {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
    }
    exports.CanvaSize = CanvaSize;
});
define("canva/CanvaShape_Image", ["require", "exports", "canva/CanvaSize", "canva/CanvaShape_Abstract"], function (require, exports, CanvaSize_1, CanvaShape_Abstract_1) {
    "use strict";
    var _ImageShape_instances, _ImageShape_loadImage;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageShape = void 0;
    const imageCache = {};
    class ImageShape extends CanvaShape_Abstract_1.AbstractCanvaShape {
        constructor(imageUrl, stage, options, size) {
            super(stage, options);
            _ImageShape_instances.add(this);
            this.loaded = false;
            this.imageUrl = imageUrl;
            this.size = size;
            __classPrivateFieldGet(this, _ImageShape_instances, "m", _ImageShape_loadImage).call(this).then(() => {
                this.loaded = true;
                // super.render()
                stage.reflash();
            });
        }
        get imageName() {
            return this.imageUrl.replace(/[^0-9a-zA-Z]/g, '_').toUpperCase();
        }
        getPath(ctx) {
            ctx.beginPath();
            ctx.roundRect(0, 0, this.size?.width ?? 16, this.size?.height || 16, 8);
            ctx.closePath();
        }
        draw(ctx) {
            if (!this.loaded) {
                console.error('not loaded yet');
                return;
            }
            ctx.drawImage(this.img, super.position.x, super.position.y, this.size.width, this.size.height);
        }
    }
    exports.ImageShape = ImageShape;
    _ImageShape_instances = new WeakSet(), _ImageShape_loadImage = async function _ImageShape_loadImage() {
        if (this.img !== undefined) {
            return Promise.resolve(this.img);
        }
        if (imageCache[this.imageName] !== undefined) {
            // already loaded
            const img = imageCache[this.imageName];
            this.img = img;
            if (this.size === undefined)
                this.size = new CanvaSize_1.CanvaSize(img.width, img.height);
            return Promise.resolve(img);
        }
        const img = document.createElement("img");
        return new Promise((resolve, reject) => {
            // icon.onerror = (err) => {
            //   console.error("icon load error", iconName);
            //   if (iconName !== "bullet_delete") {
            //     NodeUIHelper.drawIcon(ctx, "bullet_delete", x, y);
            //     return;
            //   }
            // };
            img.src = this.imageUrl;
            img.onload = () => {
                // console.log('image loaded', this.imageUrl);
                imageCache[this.imageName] = img;
                this.img = img;
                if (this.size === undefined)
                    this.size = new CanvaSize_1.CanvaSize(img.width, img.height);
                resolve(img);
            };
            img.onerror = (err) => {
                console.error("image load error", this.imageUrl);
                reject(err);
            };
        });
    };
});
// import CanvaStage from "../canva/CanvaStage_";
// import { ICanvaShapeOptions } from "@/canva/CanvaShapeOptions";
// import { CanvaSize } from "@/canva/CanvaSize";
// import { NodeFlow } from "../node/NodeFlow";
// // import NodeShape from "../node/NodeShape_";
// // import { CanvaStage_BG } from "./canva/CanvaStage_BG";
// // import { CanvaStage_Layer } from "./canva/CanvaStage_Layer";
// // import { CanvaStage_Utils } from "./canva/CanvaStage_Utils";
// // import { CanvaStage_Shape } from "./canva/CanvaStage_Shape";
// // import { CanvaShapeA } from "./CanvaShapeA";
// import {
//   OnMessageNodeShape,
//   ConsoleMessageNodeShape,
//   MatchMessageNodeShape,
//   StartMessageNodeShape,
//   getStage,
//   addNodeShape,
// } from "@/nodes/MessageNode/index";
// // const stages: { [key: string]: CanvaStage } = {};
// // function getStage(id: string): CanvaStage {
// //   if (!stages[id]) {
// //     stages[id] = new CanvaStage(id);
// //   }
// //   return stages[id];
// // }
// // 类名到类的映射
// // const classMap: { [key: string]: any } = {
// //   'Circle': Circle,
// //   'Square': Square
// // };
// // 工厂函数，根据类名返回相应的类实例
// // function createNodeShape(className: string): NodeShape | null {
// //   const ShapeClass = classMap[className];
// //   if (ShapeClass) {
// //       return new ShapeClass(className);
// //   }
// //   return null;
// // }
// // function GetShape(
// //      stageId: string, 
// //           nodeShapeType: string,
// //             options: Partial<ICanvaShapeOptions>,
// //               data: Partial<NodeShapeData>,
// //                 size?: CanvaSize ) {
// // }
// var stage = getStage('nodeStage1'); //’） new CanvaStage("nodeStage1");
// const msgNode01 = stage.addShape(new StartMessageNodeShape(stage, {}, {}));
// const msgNode0 = stage.addShape(new OnMessageNodeShape(stage, {}, {}));
// const msgNode1 = stage.addShape(new ConsoleMessageNodeShape(stage, {}, {}));
// const msgNode11 = stage.addShape(new ConsoleMessageNodeShape(stage, { position: { x: 550, y: 300 },}, {}));
// const msgNode2 = stage.addShape(new MatchMessageNodeShape(stage, {}, {}));
// stage.render();
// // setInterval(() => {
// //   NodeFlow.execute(stage, msgNode0)
// // }, 5000);
// // let dragId = 0;
// // function addShape() {
// //   const x = Math.floor((Math.random() * stage.width) / stage.scale);
// //   const y = Math.floor((Math.random() * stage.height) / stage.scale);
// //   console.info("addShape", x, y);
// //   // stage.addShape(
// //   //   new CanvaShapeA(stage, {
// //   //     position: { x, y },
// //   //     hoverAble: true,
// //   //     draggAble: true,
// //   //     dragName: "shap" + dragId++,
// //   //     droppAble: true,
// //   //     dropNames: ["shap1", "shap2"],
// //   //   })
// //   // );
// //   // stage.reflash();
// // }
define("canva/CanvaStage_BG", ["require", "exports", "canva/CanvaStage_Base", "canva/CanvaPosition"], function (require, exports, CanvaStage_Base_1, CanvaPosition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStage_BG = void 0;
    CanvaStage_Base_1.CanvaStage.prototype.renderBGGrid = function () {
        // console.debug(CanvaStage.name, "renderBGGrid");
        const layer = this.bgLayer;
        const ctx = layer.ctx;
        // // 重置画布
        // ctx.reset();
        // ctx.setTransform(this.#transform);
        // 计算网格的范围
        const beginX = -1 * Math.floor(this.transform.e / this.transform.a);
        const beginY = -1 * Math.floor(this.transform.f / this.transform.d);
        const endX = Math.floor((this.width - this.transform.e) / this.transform.a);
        const endY = Math.floor((this.height - this.transform.f) / this.transform.d);
        // 绘制网格 
        ctx.save();
        ctx.translate(-0.5, -0.5);
        ctx.fillStyle = "#333333";
        // ctx.fillRect(0, 0, this.width, this.height);
        // ctx.fillRect(beginX, beginY, endX - beginX, endY - beginY);
        ctx.fillRect(beginX - 10, beginY - 10, endX - beginX + 20, endY - beginY + 20); // 放大10p， 解决边界问题
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#444444";
        for (let i = beginX - 1; i < endX; i += 1) {
            if (i % 10 != 0) {
                continue;
            }
            ctx.moveTo(i, beginY);
            ctx.lineTo(i, endY);
        }
        for (let i = beginY - 1; i < endY; i += 1) {
            if (i % 10 != 0) {
                continue;
            }
            ctx.moveTo(beginX, i);
            ctx.lineTo(endX, i);
        }
        ctx.stroke();
        // 绘制中心点
        ctx.setTransform(this.transform);
        ctx.translate(0, 0);
        ctx.beginPath();
        const r = 10;
        ctx.roundRect(this.width / 2 - r / 2, this.height / 2 - r / 2, r * 2, r * 2, r);
        ctx.closePath();
        ctx.lineWidth = r / 2;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        // ctx.font = "20px Arial";
        // ctx.fillText(`x:${this.width / 2 - r/2},y:${this.height / 2 - r/2}`, this.width / 2 - r/2, this.height / 2 - r/2);
        ctx.restore();
    };
    CanvaStage_Base_1.CanvaStage.prototype.draggAble = function () {
        // console.debug(CanvaStage.name, "draggAble");
        let dragging = false;
        let startX = 0;
        let startY = 0;
        this.element.addEventListener("mousedown", (e) => {
            // console.debug(CanvaStage.name, "mousedown");
            const pos = new CanvaPosition_1.CanvaPosition(e.layerX, e.layerY);
            for (let i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                if (shape.isPointInPath(pos)) {
                    return;
                }
            }
            startX = e.layerX;
            startY = e.layerY;
            // console.debug(CanvaStage.name, "addEventListener", "mousemove");
            this.element.addEventListener("mousemove", dragMove);
            this.element.addEventListener("mouseup", dragStop);
            this.element.addEventListener("mouseleave", dragStop);
            this.element.addEventListener("mouseout", dragStop);
        });
        const dragStop = (e) => {
            // console.debug(CanvaStage.name, dragStop.name, dragging);
            dragging = false;
            this.element.classList.remove("dragging");
            // console.debug(CanvaStage.name, "removeEventListener", "mousemove");
            this.element.removeEventListener("mousemove", dragMove);
            this.element.removeEventListener("mouseup", dragStop);
            this.element.removeEventListener("mouseleave", dragStop);
            this.element.removeEventListener("mouseout", dragStop);
        };
        const dragMe = (e) => {
            if (e.buttons === 0) {
                dragStop(e);
                return;
            }
            if (!dragging) {
                if (Math.abs(e.layerX - startX) + Math.abs(e.layerY - startY) < 5) {
                    return;
                }
                dragging = true;
                this.element.classList.add("dragging");
                // console.debug(CanvaStage.name, "dragBegin");
            }
            this.transform.e += e.layerX - startX;
            this.transform.f += e.layerY - startY;
            startX = e.layerX;
            startY = e.layerY;
            this.render();
        };
        let scheduledAnimationFrame = false;
        const dragMove = (e) => {
            if (scheduledAnimationFrame) {
                return;
            }
            scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                scheduledAnimationFrame = false;
                dragMe(e);
            });
        };
    };
    CanvaStage_Base_1.CanvaStage.prototype.zoomAndTransform = function (scale, x, y) {
        this.transform.e = x;
        this.transform.f = y;
        this.scale = scale;
        this.transform.a = scale;
        this.transform.d = scale;
        this.render();
        // console.debug(CanvaStage.name, "zoom", newScale);
        this.canvaStatus.show();
    };
    CanvaStage_Base_1.CanvaStage.prototype.zoomAble = function () {
        // console.debug(CanvaStage.name, "zoomAble");
        const zoomMe = (e) => {
            // 计算新的缩放比例
            let newScale = this.transform.a + e.deltaY * -0.001;
            newScale = Math.min(Math.max(0.1, newScale), 4);
            if (newScale > 0.95 && newScale < 1.05) {
                newScale = 1;
            }
            const px = (e.layerX - this.transform.e) / this.transform.a;
            const txNew = e.layerX - px * newScale;
            const py = (e.layerY - this.transform.f) / this.transform.d;
            const tyNew = e.layerY - py * newScale;
            this.zoomAndTransform(newScale, txNew, tyNew);
            // this.transform.e = txNew;
            // this.transform.f = tyNew;
            // this.scale = newScale;
            // this.transform.a = newScale;
            // this.transform.d = newScale;
            // this.render();
            // // console.debug(CanvaStage.name, "zoom", newScale);
            // this.canvaStatus.show();
            // this.#showMousePos();
        };
        let scheduledAnimationFrame = false;
        this.element.addEventListener("wheel", (e) => {
            if (scheduledAnimationFrame) {
                return;
            }
            scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                scheduledAnimationFrame = false;
                // console.debug(CanvaStage.name, "wheel");
                zoomMe(e);
            });
        }, { passive: true });
    };
    exports.CanvaStage_BG = 1;
});
define("canva/CanvaStage_Layer", ["require", "exports", "canva/CanvaStage_Base", "canva/CanvaLayer"], function (require, exports, CanvaStage_Base_2, CanvaLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStage_Layer = void 0;
    CanvaStage_Base_2.CanvaStage.prototype.initLayers = function () {
        // console.debug(CanvaStage.name, "initLayers");
        const layerNames = ["bgLayer", "defaultLayer", "animateLayer", "activeLayer"];
        for (let i = 0; i < layerNames.length; i++) {
            const layerName = layerNames[i];
            const el = document.createElement("canvas");
            el.width = this.width;
            el.height = this.height;
            el.dataset.layer_name = layerName;
            el.classList.add("nodeLayer");
            this.element.appendChild(el);
            const layer = new CanvaLayer_1.CanvaLayer(this, el, layerName);
            Object.assign(this, { [layerName]: layer });
            // this[layerName] = layer;
            this.layers.push(layer);
        }
    };
    CanvaStage_Base_2.CanvaStage.prototype.cleanLayer = function (layer) {
        const beginX = -1 * Math.floor(this.transform.e / this.transform.a);
        const beginY = -1 * Math.floor(this.transform.f / this.transform.d);
        const endX = Math.floor((this.width - this.transform.e) / this.transform.a);
        const endY = Math.floor((this.height - this.transform.f) / this.transform.d);
        layer.ctx.clearRect(beginX - 10, beginY - 10, endX - beginX + 20, endY - beginY + 20); // 放大10p， 解决边界问题
    };
    exports.CanvaStage_Layer = 1;
});
define("canva/CanvaStage_Utils", ["require", "exports", "canva/CanvaStage_Base", "canva/CanvaPosition"], function (require, exports, CanvaStage_Base_3, CanvaPosition_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStage_Utils = void 0;
    CanvaStage_Base_3.CanvaStage.prototype.setCursor = function (cursor) {
        this.activeLayer.element.style.cursor = cursor || "default";
    };
    CanvaStage_Base_3.CanvaStage.prototype.getCanvaPos = function (e) {
        return new CanvaPosition_2.CanvaPosition(parseInt("" + (e.layerX - this.transform.e) / this.scale), parseInt("" + (e.layerY - this.transform.f) / this.scale));
    };
    CanvaStage_Base_3.CanvaStage.prototype.resetTransform = function () {
        this.layers.forEach((layer) => {
            const ctx = layer.ctx;
            ctx.reset();
            ctx.setTransform(this.transform);
        });
    };
    CanvaStage_Base_3.CanvaStage.prototype.generateUUID = function () {
        var uuidValue = "", k, randomValue;
        for (k = 0; k < 32; k++) {
            randomValue = (Math.random() * 16) | 0;
            if (k == 8 || k == 12 || k == 16 || k == 20) {
                uuidValue += "-";
            }
            uuidValue += (k == 12 ? 4 : k == 16 ? (randomValue & 3) | 8 : randomValue).toString(16);
        }
        return uuidValue;
    };
    exports.CanvaStage_Utils = 1;
});
define("canva/CanvaStage_Shape", ["require", "exports", "canva/CanvaStage_Base", "canva/CanvaPosition"], function (require, exports, CanvaStage_Base_4, CanvaPosition_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStage_Shape = void 0;
    // CanvaStage.prototype.addShape = function (
    //   options: CanvaShapeOptions
    // ): AbstractCanvaShape {
    //   const shape = new CanvaShape(this, options);
    //   this.shapes.push(shape);
    //   return shape;
    // };
    CanvaStage_Base_4.CanvaStage.prototype.addShape = function (shape) {
        this.shapes.push(shape);
        return shape;
    };
    CanvaStage_Base_4.CanvaStage.prototype.removeAllShapes = function () {
        if (!this.shapes || this.shapes.length === 0)
            return;
        for (let i = 0; i < this.shapes.length; i++) {
            const shape = this.shapes[i];
            shape.destroy();
        }
        this.shapes.splice(0, this.shapes.length);
    };
    CanvaStage_Base_4.CanvaStage.prototype.removeShape = function (uuid) {
        if (!this.shapes || this.shapes.length === 0)
            return;
        const shape = this.shapes.find(t => t.uuid === uuid);
        if (!shape)
            return;
        const shapeIndex = this.shapes.indexOf(shape);
        if (shapeIndex === -1)
            return;
        if (this.canvaLinks && this.canvaLinks.length > 0) {
            const links = this.canvaLinks.filter(t => t.to.parent?.uuid === uuid || t.from.parent?.uuid === uuid);
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                this.removeLink(link.from, link.to);
            }
        }
        shape.destroy();
        this.shapes.splice(shapeIndex, 1);
    };
    CanvaStage_Base_4.CanvaStage.prototype.renderShapes = function () {
        // console.debug(CanvaStage.name, "renderShapes");
        for (let i = 0; i < this.shapes.length; i++) {
            const shape = this.shapes[i];
            shape.render();
        }
    };
    CanvaStage_Base_4.CanvaStage.prototype.hoverAbleShape = function () {
        const updateShapeHoverStatus = (shape, pos, e) => {
            if (!shape.hoverAble && !shape.draggAble && !shape.droppAble) {
                return;
            }
            // let needRender = false;
            if (this.draggingShapeId && this.draggingShapeName) {
                if (shape.uuid === this.draggingShapeId) {
                    return;
                }
                if (!shape.droppAble) {
                    return;
                }
                if (!shape.dropNames.includes(this.draggingShapeName)) {
                    return;
                }
            }
            const isPointInPath = shape.isPointInPath(pos);
            // if (isPointInPath) {
            //   // console.debug(
            //     CanvaShape.name,
            //     shape.uuid,
            //     "isPointInPath",
            //     isPointInPath
            //   );
            // }
            if (shape.hoverAble) {
                if (isPointInPath && !shape.isHovering) {
                    this.reflash();
                    shape.isHovering = true;
                    shape.dispatch("hover", { mouseEvent: e, pos });
                    this.setCursor("pointer");
                    // if (shape.isChild) {
                    //   shape.parent!.render(pos, e);
                    // } else {
                    //   shape.render(pos, e);
                    // }
                    shape.render(pos, e);
                }
                else if (!isPointInPath && shape.isHovering) {
                    this.reflash();
                    shape.isHovering = false;
                    shape.dispatch("blur", { mouseEvent: e, pos });
                    this.setCursor("default");
                    // if (shape.isChild) {
                    //   shape.parent!.render(pos, e);
                    // } else {
                    //   shape.render(pos, e);
                    // }
                    shape.render(pos, e);
                }
            }
        };
        const updateHoverStatus = (e) => {
            const pos = new CanvaPosition_3.CanvaPosition(e.layerX, e.layerY);
            const shapes = this.getAllShapes();
            for (let i = 0; i < shapes.length; i++) {
                const shape = shapes[i];
                updateShapeHoverStatus(shape, pos, e);
                // if (shape.hasChildren) {
                //   shape.children!.forEach((child: AbstractCanvaShape) => {
                //     updateShapeHoverStatus(child, pos, e);
                //   });
                // }
            }
        };
        let scheduledAnimationFrame = false;
        this.element.addEventListener("mousemove", (e) => {
            if (scheduledAnimationFrame) {
                return;
            }
            scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                scheduledAnimationFrame = false;
                updateHoverStatus(e);
            });
        });
    };
    const getAllShapes = function (shapes) {
        const res = [];
        // res.push(...shapes); // chilren插入结果数组
        for (const shape of shapes) {
            // 遍历子元素，若包含children则递归调用
            res.push(shape);
            if (shape.children === undefined ||
                shape.children === null ||
                shape.children.length <= 0)
                continue;
            res.push(...getAllShapes(shape.children));
        }
        return res;
    };
    CanvaStage_Base_4.CanvaStage.prototype.getAllShapes = function () {
        return getAllShapes(this.shapes);
    };
    CanvaStage_Base_4.CanvaStage.prototype.clickAbleShape = function () {
        const clickStage = (e) => {
            const pos = new CanvaPosition_3.CanvaPosition(e.layerX, e.layerY);
            const shapes = this.getAllShapes();
            for (let i = 0; i < shapes.length; i++) {
                const shape = shapes[i];
                if (!shape.isHovering)
                    continue;
                if (!shape.clickAble)
                    continue;
                shape.dispatch("click", { mouseEvent: e, pos });
            }
        };
        this.element.addEventListener("click", clickStage);
    };
    CanvaStage_Base_4.CanvaStage.prototype.draggAbleShape = function () {
        const dragStop = (e) => {
            const pos = new CanvaPosition_3.CanvaPosition(e.layerX, e.layerY);
            for (let i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                if (!shape.draggAble) {
                    continue;
                }
                if (!shape.isDragging) {
                    continue;
                }
                // shape.isDragging = false;
                shape.draggEnd(pos);
                // console.debug(CanvaStage.name, shape.uuid, "isDragging", shape.isDragging);
                // shape.render(pos, e);
            }
            this.element.removeEventListener("mousemove", dragMove);
            this.element.removeEventListener("mouseup", dragStop);
            this.element.removeEventListener("mouseleave", dragStop);
            this.element.removeEventListener("mouseout", dragStop);
            this.reflash();
        };
        this.element.addEventListener("mousedown", (e) => {
            // console.debug(CanvaStage.name, "mousedown");
            const pos = new CanvaPosition_3.CanvaPosition(e.layerX, e.layerY);
            let draggStart = false;
            // const shapes = this.getAllShapes().filter(t=> t.isHovering && t.isPointInDragPath(pos));
            for (let i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                if (!shape.isHovering) {
                    continue;
                }
                // if (!shape.draggAble) {
                //   continue;
                // }
                // if( shape.children && shape.children.length > 0) {
                //   let isPointInDragPath = false;
                //   for(let j = 0; j < shape.children.length; j++) {
                //     const child = shape.children[j];
                //     if(!child.isHovering) {
                //       continue;
                //     }
                //     if(!child.isPointInDragPath(pos)) {
                //       continue;
                //     }
                //     isPointInDragPath = true;
                //     break;
                //   }
                //   if(!isPointInDragPath){
                //     continue;
                //   }
                // } else {
                // }
                const isPointInDragPath = shape.isPointInDragPath(pos);
                if (!isPointInDragPath) {
                    continue;
                }
                // shape.isDragging = true;
                draggStart = true;
                shape.draggStart(pos);
                // console.debug(CanvaStage.name, shape.uuid, "isDragging", shape.isDragging);
                shape.render(pos, e);
                // break;
            }
            if (draggStart) {
                // this.#cleanLayer(this.defaultLayer);
                // this.#renderShapes();
                // console.debug(CanvaStage.name, "addEventListener", "mousemove");
                this.element.addEventListener("mousemove", dragMove);
                this.element.addEventListener("mouseup", dragStop);
                this.element.addEventListener("mouseleave", dragStop);
                this.element.addEventListener("mouseout", dragStop);
            }
        });
        /**
         * @param {MouseEvent} e
         */
        const dragMe = (e) => {
            if (e.buttons === 0) {
                dragStop(e);
                return;
            }
            this.cleanLayer(this.activeLayer);
            // this.#cleanActiveLayer();
            // const beginX = -1 * Math.floor(this.#transform.e / this.#transform.a);
            // const beginY = -1 * Math.floor(this.#transform.f / this.#transform.d);
            // const endX = Math.floor(
            //   (this.width - this.#transform.e) / this.#transform.a
            // );
            // const endY = Math.floor(
            //   (this.height - this.#transform.f) / this.#transform.d
            // );
            // this.activeLayer.ctx.clearRect(beginX - 10, beginY - 10, endX - beginX + 20, endY - beginY + 20); // 放大10p， 解决边界问题
            for (let i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                if (!shape.draggAble) {
                    continue;
                }
                if (!shape.isDragging) {
                    continue;
                }
                const pos = { x: e.layerX, y: e.layerY };
                shape.render(pos, e);
            }
        };
        let scheduledAnimationFrame = false;
        const dragMove = (e) => {
            if (scheduledAnimationFrame) {
                return;
            }
            scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                scheduledAnimationFrame = false;
                dragMe(e);
            });
        };
    };
    CanvaStage_Base_4.CanvaStage.prototype.setDraggingShape = function (shape) {
        // console.debug(CanvaStage.name, "setDraggingShape", shape);
        this.draggingShapeId = shape ? shape.uuid : undefined;
        this.draggingShapeName = shape ? shape.dragName : undefined;
        if (shape) {
        }
        else {
            // console.debug(CanvaStage.name, "setDragingShape", "undefined");
        }
    };
    exports.CanvaStage_Shape = 1;
});
define("node/NodeShapeConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeUIConfig = exports.NodeShapeUIConfig = void 0;
    exports.NodeShapeUIConfig = {
        borderRadius: [6, 6, 4, 4],
        fillStyle: "#dcdcdc",
        GradientStyle: [
            { offset: 0, color: "#e0e0e0" },
            { offset: 0.05, color: "#d8d8d8" },
            { offset: 1, color: "#dfdfdf" },
        ],
        shadow: {
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowBlur: 6,
            shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        header: {
            height: 30,
            // padding: 8,
            borderRadius: [4, 4, 0, 0],
            fillStyle: "#aeaeae",
            GradientStyle: [
                { offset: 0, color: "#cccccc" },
                { offset: 0.06, color: "#b0b0b0" },
                { offset: 1, color: "#acacac" },
            ],
            shadow: {
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                shadowBlur: 0,
                shadowColor: "#545454",
            },
            icon: {
                width: 16,
                height: 16,
                paddingLeft: 7,
                paddingTop: 7,
            },
            text: {
                paddingLeft: 30,
                paddingTop: 16,
                font: "14px Arial",
                fillStyle: "#111111",
                textBaseline: "middle",
            },
            textActive: {
                paddingLeft: 30,
                paddingTop: 16,
                font: "14px Arial",
                fillStyle: "#ffce40",
                textBaseline: "middle",
            },
        },
        body: {
            paddingLeft: 6,
            paddingTop: 34,
            // lineHeight: 20,
        },
        line: {
            height: 20,
            icon: {
                width: 16,
                height: 16,
                paddingLeft: -2,
                paddingTop: 2,
            },
            text: {
                paddingLeft: 14,
                paddingTop: 5,
                textStyle: {
                    font: "12px Arial",
                    fillStyle: "#111111",
                    textBaseline: "top",
                },
            },
        },
    };
    exports.NodeUIConfig = {
        icon: {
            path: '../icons/selected',
            width: 16,
            height: 16,
        },
        container: {
            width: 640,
            height: 480,
            fillStyle: "#5d5d5d",
        },
        node: exports.NodeShapeUIConfig,
    };
});
define("node/NodeUIHelper", ["require", "exports", "node/NodeShapeConfig"], function (require, exports, NodeShapeConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeUIHelper = void 0;
    const iconCache = {};
    const NodeUIHelper = class {
        static fillGradient(ctx, x0, y0, x1, y1, colorStops) {
            var gradient = ctx.createLinearGradient(x0, y0, x1, y1);
            for (let i = 0; i < colorStops.length; i++) {
                const colorStop = colorStops[i];
                gradient.addColorStop(colorStop.offset, colorStop.color);
            }
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        static setText(ctx, style) {
            if (!style)
                return;
            if (style.font)
                ctx.font = style.font;
            if (style.fillStyle)
                ctx.fillStyle = style.fillStyle;
            if (style.textBaseline)
                ctx.textBaseline = style.textBaseline;
            if (style.textAlign)
                ctx.textAlign = style.textAlign;
        }
        static setShadow(ctx, shadow) {
            if (!shadow)
                return;
            ctx.shadowOffsetX = shadow.shadowOffsetX;
            ctx.shadowOffsetY = shadow.shadowOffsetY;
            ctx.shadowBlur = shadow.shadowBlur;
            ctx.shadowColor = shadow.shadowColor;
        }
        static drawIcon(ctx, iconName, x, y) {
            // console.debug("drawIcon", iconName, x, y);
            if (iconCache[iconName]) {
                const width = NodeShapeConfig_1.NodeUIConfig.icon.width;
                const height = NodeShapeConfig_1.NodeUIConfig.icon.height;
                ctx.drawImage(iconCache[iconName], x, y, width, height);
                return;
            }
            // , width, height
            const iconPath = NodeShapeConfig_1.NodeUIConfig.icon.path + "/" + iconName + ".png";
            // console.error("iconPath", iconPath);
            const icon = document.createElement("img");
            const width = NodeShapeConfig_1.NodeUIConfig.icon.width;
            const height = NodeShapeConfig_1.NodeUIConfig.icon.height;
            const _drawIcon = (img) => {
                // console.debug("image loaded", iconName);
                iconCache[iconName] = icon;
                ctx.drawImage(icon, x, y, width, height);
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                ctx.rect(x, y, icon.width, icon.height);
                ctx.stroke();
                ctx.closePath();
                // this.node.stage.reflash();
            };
            _drawIcon(icon);
            // icon.onload
            icon.onerror = (err) => {
                console.error("icon load error", iconName);
                if (iconName !== "bullet_delete") {
                    exports.NodeUIHelper.drawIcon(ctx, "bullet_delete", x, y);
                    return;
                }
            };
            icon.src = iconPath;
        }
    };
    exports.NodeUIHelper = NodeUIHelper;
});
define("node/NodeShape_LineBase", ["require", "exports", "canva/CanvaShape_Abstract", "canva/CanvaPosition", "node/NodeShapeConfig", "node/NodeUIHelper"], function (require, exports, CanvaShape_Abstract_2, CanvaPosition_4, NodeShapeConfig_2, NodeUIHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeLineBase = void 0;
    class NodeShapeLineBase extends CanvaShape_Abstract_2.AbstractCanvaShape {
        constructor(stage, options, data) {
            super(stage, options, data.uuid);
            this.isInput = false;
            this.isOutput = false;
            this.isOptional = false;
            this.hasPrev = false;
            this.hasNext = false;
            this.data = data;
            Object.assign(this.data, { uuid: this.uuid });
            // const vc = NodeShapeUIConfig.line;
            // console.error('this.parent', this.parent)
            // this.width =
            //   (this.parent as any as NodeShape).size.width -
            //   2 * NodeShapeUIConfig.body.paddingLeft;
            // this.height = vc.height;
            this.paddingWidth = 80;
        }
        get width() {
            if (!this.parent)
                return 0;
            return (this.parent.size.width -
                2 * NodeShapeConfig_2.NodeShapeUIConfig.body.paddingLeft);
        }
        get height() {
            return NodeShapeConfig_2.NodeShapeUIConfig.line.height;
        }
        getStoperPosition() {
            const vc = NodeShapeConfig_2.NodeShapeUIConfig.line;
            const stoperX = this.hasPrev || this.isInput
                ? -1 * vc.icon.width - 1 * NodeShapeConfig_2.NodeShapeUIConfig.body.paddingLeft - 4
                : 1 * NodeShapeConfig_2.NodeShapeUIConfig.body.paddingLeft + 3;
            const stoperY = NodeShapeConfig_2.NodeShapeUIConfig.line.icon.paddingTop;
            return new CanvaPosition_4.CanvaPosition(stoperX, stoperY);
        }
        getStoperCenterPosition() {
            const pos = super.getCenterPosition();
            const stoperPosition = this.getStoperPosition();
            // const vc = NodeShapeUIConfig.line;
            // const stoperX = (this.hasPrev || this.isInput)
            //   ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 4
            //   : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
            return {
                x: pos.x + stoperPosition.x + NodeShapeConfig_2.NodeShapeUIConfig.line.icon.width / 2,
                y: pos.y + stoperPosition.y + NodeShapeConfig_2.NodeShapeUIConfig.line.icon.height / 2,
            };
        }
        getCenterPosition() {
            return this.getStoperCenterPosition();
        }
        getPath(ctx) {
            const stoperPosition = this.getStoperPosition();
            ctx.beginPath();
            // const vc = NodeShapeUIConfig.line;
            // const stoperX = (this.hasPrev || this.isInput)
            //   ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 4
            //   : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
            // const stoperY = NodeShapeUIConfig.line.icon.paddingTop;
            ctx.rect(stoperPosition.x, stoperPosition.y, NodeShapeConfig_2.NodeShapeUIConfig.line.icon.width, NodeShapeConfig_2.NodeShapeUIConfig.line.icon.height);
            // if (this.hasPrev || this.hasNext) {
            //   const vc = NodeShapeUIConfig.line;
            //   const stoperX = (this.hasPrev || this.isInput)
            //     ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 5
            //     : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
            //   ctx.rect(
            //     stoperX,
            //     NodeShapeUIConfig.line.icon.paddingTop,
            //     NodeShapeUIConfig.line.icon.width,
            //     NodeShapeUIConfig.line.icon.height
            //   );
            // } else {
            //   if (this.isInput) {
            //     ctx.rect(0, 0, this.width - this.paddingWidth, this.height);
            //   }
            //   if (this.isOutput) {
            //     ctx.rect(
            //       -1 * this.width + this.paddingWidth,
            //       0,
            //       this.width - this.paddingWidth,
            //       this.height
            //     );
            //   }
            // }
            ctx.closePath();
        }
        draw(ctx, pos, e) {
            // console.debug(NodeShapeLineBase.name, "draw");
            ctx.save();
            this.drawBG(ctx, pos, e);
            ctx.restore();
            ctx.save();
            this.drawLineStoper(ctx, pos, e);
            ctx.restore();
            ctx.save();
            this.drawLineIcon(ctx, pos, e);
            ctx.restore();
            ctx.save();
            this.drawLineText(ctx, pos, e);
            ctx.restore();
        }
        drawBG(ctx, pos, e) {
            // ctx.strokeStyle =
            //   this.isHovering || this.isDragging
            //     ? "rgba(255,255,0,0.5)"
            //     : "rgba(255,255,255,0.5)";
            // ctx.stroke();
        }
        _drawLineFlowStoper(ctx, stoperX, stoperY) {
            const vc = NodeShapeConfig_2.NodeShapeUIConfig.line;
            ctx.beginPath();
            ctx.moveTo(stoperX, stoperY + vc.height / 2 - (Math.tan(Math.PI / 6) * vc.icon.width) / 2);
            ctx.lineTo(stoperX + vc.icon.width / 2, stoperY + vc.height / 2);
            ctx.lineTo(stoperX, stoperY + vc.height / 2 + (Math.tan(Math.PI / 6) * vc.icon.width) / 2);
            ctx.lineTo(stoperX, stoperY + vc.height / 2 - (Math.tan(Math.PI / 6) * vc.icon.width) / 2);
            ctx.closePath();
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.stroke();
            if (this.isHovering || this.isDragging) {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillStyle = "red";
                ctx.fill();
            }
        }
        _drawArgStoper(ctx, stoperX, stoperY) {
            const vc = NodeShapeConfig_2.NodeShapeUIConfig.line;
            ctx.beginPath();
            ctx.arc(stoperX + vc.icon.width / 4, stoperY + vc.height / 2, // (Math.tan(Math.PI / 6) * (vc.icon.width / 4)),
            vc.icon.width / 4, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.stroke();
            if (this.isHovering || this.isDragging) {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillStyle = "red";
                ctx.fill();
            }
        }
        drawLineStoper(ctx, pos, e) {
            const vc = NodeShapeConfig_2.NodeShapeUIConfig.line;
            const stoperX = this.isInput || this.hasPrev
                ? -1 * vc.icon.width - 1 * NodeShapeConfig_2.NodeShapeUIConfig.body.paddingLeft
                : 1 * NodeShapeConfig_2.NodeShapeUIConfig.body.paddingLeft + 7;
            // this._drawLineFlowStoper( ctx, stoperX, 0 );
            // this._drawArgStoper( ctx, stoperX, 0 );
            // console.debug("--- line stoper");
            // const lineY = this.getLineY(lineIndex);
            // const stoperInputX = this.x - vc.icon.width / 2 - 5;
            // const stoperOutputX = this.x + this.width + 5;
            if (this.hasPrev) {
                this._drawLineFlowStoper(ctx, stoperX, 0);
            }
            if (this.hasNext) {
                this._drawLineFlowStoper(ctx, stoperX, 0);
            }
            if (this.isInput) {
                this._drawArgStoper(ctx, stoperX, 0);
            }
            if (this.isOutput) {
                this._drawArgStoper(ctx, stoperX, 0);
            }
            // if(line.prev || line.next || line.input || line.output) {
            // // 这里要检查鼠标是否在这个区域
            //   // console.debug("mousePos", mousePos.x, mousePos.y);
            // }
        }
        drawLineIcon(ctx, pos, e) {
            const vc = NodeShapeConfig_2.NodeShapeUIConfig.line;
            const icons = [
                {
                    type: "boolean",
                    icon: "bullet_yellow",
                },
                {
                    type: "number",
                    icon: "bullet_blue",
                },
                {
                    type: "string",
                    icon: "bullet_purple",
                },
                {
                    type: "array",
                    icon: "bullet_blue",
                },
                {
                    type: "flow",
                    icon: "bullet_go",
                },
            ];
            let inputType;
            if (this.hasPrev)
                inputType = "flow";
            else if (this.hasNext)
                inputType = "flow";
            else if (this.isInput)
                inputType = this.data.type;
            else if (this.isOutput)
                inputType = this.data.type;
            if (!inputType) {
                return;
            }
            // const inputType = this.isInput
            //   ? this.data.input?.type
            //   : this.data.output?.type;
            const icon = icons.find((icon) => icon.type === inputType);
            if (!icon) {
                console.error("icon not found", this.data.type);
                return;
            }
            const iconX = this.hasPrev || this.isInput
                ? vc.icon.paddingLeft
                : -1 * vc.icon.width + -1 * vc.icon.paddingLeft;
            NodeUIHelper_1.NodeUIHelper.drawIcon(ctx, icon.icon, iconX, vc.icon.paddingTop);
        }
        drawLineText(ctx, pos, e) {
            const vc = NodeShapeConfig_2.NodeShapeUIConfig.line;
            NodeUIHelper_1.NodeUIHelper.setText(ctx, vc.text.textStyle);
            if (this.isInput) {
                ctx.fillText(this.data.name || "", vc.text.paddingLeft, vc.text.paddingTop);
            }
            else if (this.isOutput) {
                ctx.textAlign = "right";
                ctx.fillText(this.data.name || "", -1 * vc.text.paddingLeft, vc.text.paddingTop);
            }
            else if (this.hasNext && this.data.hasOwnProperty("name")) {
                ctx.textAlign = "right";
                ctx.fillText(this.data.name || "", -1 * vc.text.paddingLeft, vc.text.paddingTop);
            }
        }
    }
    exports.NodeShapeLineBase = NodeShapeLineBase;
});
define("node/NodeShape_BG", ["require", "exports", "node/NodeShape_Abstract", "node/NodeShapeConfig", "node/NodeUIHelper"], function (require, exports, NodeShape_Abstract_1, NodeShapeConfig_3, NodeUIHelper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShape_BG = void 0;
    NodeShape_Abstract_1.AbstractNodeShape.prototype.getBGPath = function (ctx) {
        const vc = NodeShapeConfig_3.NodeShapeUIConfig;
        // ctx.beginPath();
        // ctx.roundRect(0, 0, this.size.width, vc.height, vc.borderRadius);
        // ctx.closePath();
        ctx.beginPath();
        ctx.roundRect(0, 0, this.size.width, this.size.height, vc.borderRadius);
        ctx.closePath();
    };
    NodeShape_Abstract_1.AbstractNodeShape.prototype.drawBG = function (ctx) {
        // console.debug(AbstractNodeShape.name, "drawHeader");
        const vc = NodeShapeConfig_3.NodeShapeUIConfig;
        ctx.save();
        NodeUIHelper_2.NodeUIHelper.setShadow(ctx, vc.shadow);
        this.getBGPath(ctx);
        if (vc.GradientStyle) {
            NodeUIHelper_2.NodeUIHelper.fillGradient(ctx, 0, vc.header.height, 0, this.size.height, vc.GradientStyle);
        }
        else if (vc.fillStyle) {
            ctx.fillStyle = vc.fillStyle;
            ctx.fill();
        }
        ctx.restore();
    };
    // NodeShape.prototype.drawShadow = function (ctx: CanvasRenderingContext2D) {
    //   // console.debug(NodeShape.name, "drawShadow");
    //   const vc = NodeShapeUIConfig;
    //   NodeUIHelper.setShadow(ctx, vc.shadow);
    // };
    exports.NodeShape_BG = 1;
});
define("node/NodeShape_Header", ["require", "exports", "node/NodeShape_Abstract", "node/NodeShapeConfig", "node/NodeUIHelper"], function (require, exports, NodeShape_Abstract_2, NodeShapeConfig_4, NodeUIHelper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShape_Header = void 0;
    // const drawHeaderBg(ctx: CanvasRenderingContext2D) {
    //   const vc = viewConfig.node.header;
    //   // console.debug("--- header bg");
    //   this.setShadow(vc.shadow);
    //   this.ctx.beginPath();
    //   this.ctx.roundRect(this.x, this.y, this.width, vc.height, vc.borderRadius);
    //   this.ctx.closePath();
    //   if (vc.GradientStyle) {
    //     this.fillGradient(
    //       this.x,
    //       this.y,
    //       this.x,
    //       this.y + vc.height,
    //       vc.GradientStyle
    //     );
    //   } else if (vc.fillStyle) {
    //     this.ctx.fillStyle = vc.fillStyle;
    //     this.ctx.fill();
    //   }
    //   this.clearShadow();
    // }
    NodeShape_Abstract_2.AbstractNodeShape.prototype.getHeaderPath = function (ctx) {
        const vc = NodeShapeConfig_4.NodeShapeUIConfig.header;
        ctx.beginPath();
        ctx.roundRect(0, 0, this.size.width, vc.height, vc.borderRadius);
        ctx.closePath();
    };
    NodeShape_Abstract_2.AbstractNodeShape.prototype.drawHeader = function (ctx) {
        // console.debug(AbstractNodeShape.name, "drawHeader");
        /* BG
         ************************************************/
        {
            const vc = NodeShapeConfig_4.NodeShapeUIConfig.header;
            ctx.save();
            NodeUIHelper_3.NodeUIHelper.setShadow(ctx, vc.shadow);
            this.getHeaderPath(ctx);
            if (vc.GradientStyle) {
                NodeUIHelper_3.NodeUIHelper.fillGradient(ctx, 0, 0, 0, vc.height, vc.GradientStyle);
            }
            else if (vc.fillStyle) {
                ctx.fillStyle = vc.fillStyle;
                ctx.fill();
            }
            ctx.restore();
        }
        /* Icon
         ************************************************/
        {
            const vc = NodeShapeConfig_4.NodeShapeUIConfig.header.icon;
            ctx.save();
            if (this.data.icon) {
                NodeUIHelper_3.NodeUIHelper.drawIcon(ctx, this.data.icon, vc.paddingLeft, vc.paddingTop);
            }
            else {
                ctx.beginPath();
                ctx.arc(vc.width / 2 + vc.paddingLeft, vc.height / 2 + vc.paddingTop, vc.width / 2, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = "#666666";
                ctx.fill();
            }
            ctx.restore();
        }
        /* Text
         ************************************************/
        {
            const vc = this.isActive ? NodeShapeConfig_4.NodeShapeUIConfig.header.textActive : NodeShapeConfig_4.NodeShapeUIConfig.header.text;
            ctx.save();
            ctx.font = vc.font;
            ctx.fillStyle = vc.fillStyle;
            ctx.textBaseline = vc.textBaseline; // = "middle" | "alphabetic" | "bottom" | "hanging" | "ideographic" | "top";
            ctx.fillText(this.data.title, vc.paddingLeft, vc.paddingTop);
            ctx.restore();
        }
    };
    exports.NodeShape_Header = 1;
});
define("node/NodeShape_", ["require", "exports", "node/NodeShape_Abstract", "node/NodeShape_BG", "node/NodeShape_Header"], function (require, exports, NodeShape_Abstract_3, NodeShape_BG_1, NodeShape_Header_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShape = void 0;
    const NodeShape_Modules = [NodeShape_BG_1.NodeShape_BG + NodeShape_Header_1.NodeShape_Header];
    // console.debug('NodeShape prototypes', NodeShape_BG, NodeShape_Header );
    class NodeShape extends NodeShape_Abstract_3.AbstractNodeShape {
        constructor(stage, options, data, size) {
            super(stage, options, data, size);
            this.nodeUIHelper = null;
            this.addEventListener("click", (e) => {
                if (e.mouseEvent?.ctrlKey) {
                    stage.removeShape(this.uuid);
                    stage.reflash();
                }
                // console.debug(AbstractCanvaShape.name, this.uuid, 'click');
            });
        }
    }
    exports.NodeShape = NodeShape;
});
define("node/NodeShape_FormBase", ["require", "exports", "canva/CanvaShape_Abstract", "node/NodeShapeConfig", "node/NodeUIHelper"], function (require, exports, CanvaShape_Abstract_3, NodeShapeConfig_5, NodeUIHelper_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeFormBase = void 0;
    class NodeShapeFormBase extends CanvaShape_Abstract_3.AbstractCanvaShape {
        // editValue?: {
        //   string?: string;
        //   number?: number;
        //   boolean?: boolean;
        // }
        constructor(stage, options, data) {
            super(stage, options);
            this.textWidth = 0;
            this.data = data;
            // this.input = this.parent as any as NodeShapeLineInput;
            // this.node = this.input.parent as any as NodeShape;
            // console.log("NodeShapeFormBase", "constructor", this.data);
            // if(this.data.edit?.default) {
            //   this.editValue =Object.assign({}, {[this.data.type!]: this.data.edit.default });
            //   // console.log("editValue", this.editValue);
            // }
            this.addEventListener("click", (e) => {
                // console.error('begin edit');
                // debugger;
                const defaultValue = this.getValue() ?? this.data.edit?.default ?? '';
                // console.error('defaultvalue', this.getValue(), this.data.input?.edit?.default ?? '')
                // TODO: 这里需要关注数据类型
                const p = prompt("请输入值", defaultValue.toString());
                // TODO: 这里需要关注数据类型
                this.setInputValue(p ?? '');
                // if (defaultValue.length >=1 ) {
                // }
            });
        }
        get input() {
            if (this.parent === undefined)
                return undefined;
            return this.parent;
        }
        get node() {
            if (this.input === undefined)
                return undefined;
            return this.input.parent;
        }
        // get width(): number {
        //   if (!this.parent) return 0;
        //   return (
        //     (this.parent as any as AbstractNodeShape).size.width -
        //     2 * NodeShapeUIConfig.body.paddingLeft
        //   );
        // }
        // get height(): number {
        //   return NodeShapeUIConfig.line.height;
        // }
        // getStoperPosition(): CanvaPosition {
        //   const vc = NodeShapeUIConfig.line;
        //   const stoperX =
        //     this.hasPrev || this.isInput
        //       ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 4
        //       : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
        //   const stoperY = NodeShapeUIConfig.line.icon.paddingTop;
        //   return new CanvaPosition(stoperX, stoperY);
        // }
        // getStoperCenterPosition(): CanvaPosition {
        //   const pos = super.getCenterPosition();
        //   const stoperPosition = this.getStoperPosition();
        //   // const vc = NodeShapeUIConfig.line;
        //   // const stoperX = (this.hasPrev || this.isInput)
        //   //   ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 4
        //   //   : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
        //   return {
        //     x: pos.x + stoperPosition.x + NodeShapeUIConfig.line.icon.width / 2,
        //     y: pos.y + stoperPosition.y + NodeShapeUIConfig.line.icon.height / 2,
        //   };
        // }
        // getCenterPosition(): CanvaPosition {
        //   return this.getStoperCenterPosition();
        // }
        getPath(ctx) {
            const stoperPosition = { x: 0, y: 0 }; // this.getStoperPosition();
            ctx.beginPath();
            // const vc = NodeShapeUIConfig.line;
            // const stoperX = (this.hasPrev || this.isInput)
            //   ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 4
            //   : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
            // const stoperY = NodeShapeUIConfig.line.icon.paddingTop;
            ctx.rect(stoperPosition.x, stoperPosition.y, this.parent.width, NodeShapeConfig_5.NodeShapeUIConfig.line.height);
            // this.textWidth > 0 ? this.textWidth : NodeShapeUIConfig.line.icon.width * 10,
            // NodeShapeUIConfig.line.height
            // if (this.hasPrev || this.hasNext) {
            //   const vc = NodeShapeUIConfig.line;
            //   const stoperX = (this.hasPrev || this.isInput)
            //     ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft - 5
            //     : 1 * NodeShapeUIConfig.body.paddingLeft + 3;
            //   ctx.rect(
            //     stoperX,
            //     NodeShapeUIConfig.line.icon.paddingTop,
            //     NodeShapeUIConfig.line.icon.width,
            //     NodeShapeUIConfig.line.icon.height
            //   );
            // } else {
            //   if (this.isInput) {
            //     ctx.rect(0, 0, this.width - this.paddingWidth, this.height);
            //   }
            //   if (this.isOutput) {
            //     ctx.rect(
            //       -1 * this.width + this.paddingWidth,
            //       0,
            //       this.width - this.paddingWidth,
            //       this.height
            //     );
            //   }
            // }
            ctx.closePath();
        }
        draw(ctx, pos, e) {
            // console.debug(NodeShapeLineBase.name, "draw");
            // ctx.save();
            // this.drawBG(ctx, pos, e);
            // ctx.restore();
            // ctx.save();
            // this.drawLineStoper(ctx, pos, e);
            // ctx.restore();
            // ctx.save();
            // this.drawLineIcon(ctx, pos, e);
            // ctx.restore();
            ctx.save();
            this.drawText(ctx, pos, e);
            ctx.restore();
        }
        drawBG(ctx, pos, e) {
            ctx.strokeStyle =
                this.isHovering || this.isDragging
                    ? "rgba(255,0,0,0.5)"
                    : "rgba(0,0,255,0.5)";
            ctx.stroke();
        }
        // _drawLineFlowStoper(
        //   ctx: CanvasRenderingContext2D,
        //   stoperX: number,
        //   stoperY: number
        // ) {
        //   const vc = NodeShapeUIConfig.line;
        //   ctx.beginPath();
        //   ctx.moveTo(
        //     stoperX,
        //     stoperY + vc.height / 2 - (Math.tan(Math.PI / 6) * vc.icon.width) / 2
        //   );
        //   ctx.lineTo(stoperX + vc.icon.width / 2, stoperY + vc.height / 2);
        //   ctx.lineTo(
        //     stoperX,
        //     stoperY + vc.height / 2 + (Math.tan(Math.PI / 6) * vc.icon.width) / 2
        //   );
        //   ctx.lineTo(
        //     stoperX,
        //     stoperY + vc.height / 2 - (Math.tan(Math.PI / 6) * vc.icon.width) / 2
        //   );
        //   ctx.closePath();
        //   ctx.strokeStyle = "rgba(255,255,255,0.5)";
        //   ctx.stroke();
        //   if (this.isHovering || this.isDragging) {
        //     ctx.fillStyle = "rgba(255,255,255,0.5)";
        //     ctx.fillStyle = "red";
        //     ctx.fill();
        //   }
        // }
        // _drawArgStoper(
        //   ctx: CanvasRenderingContext2D,
        //   stoperX: number,
        //   stoperY: number
        // ) {
        //   const vc = NodeShapeUIConfig.line;
        //   ctx.beginPath();
        //   ctx.arc(
        //     stoperX + vc.icon.width / 4,
        //     stoperY + vc.height / 2, // (Math.tan(Math.PI / 6) * (vc.icon.width / 4)),
        //     vc.icon.width / 4,
        //     0,
        //     2 * Math.PI
        //   );
        //   ctx.closePath();
        //   ctx.strokeStyle = "rgba(255,255,255,0.5)";
        //   ctx.stroke();
        //   if (this.isHovering || this.isDragging) {
        //     ctx.fillStyle = "rgba(255,255,255,0.5)";
        //     ctx.fillStyle = "red";
        //     ctx.fill();
        //   }
        // }
        // drawLineStoper(
        //   ctx: CanvasRenderingContext2D,
        //   pos?: CanvaPosition,
        //   e?: MouseEvent
        // ) {
        //   const vc = NodeShapeUIConfig.line;
        //   const stoperX =
        //     this.isInput || this.hasPrev
        //       ? -1 * vc.icon.width - 1 * NodeShapeUIConfig.body.paddingLeft
        //       : 1 * NodeShapeUIConfig.body.paddingLeft + 7;
        //   // this._drawLineFlowStoper( ctx, stoperX, 0 );
        //   // this._drawArgStoper( ctx, stoperX, 0 );
        //   // console.debug("--- line stoper");
        //   // const lineY = this.getLineY(lineIndex);
        //   // const stoperInputX = this.x - vc.icon.width / 2 - 5;
        //   // const stoperOutputX = this.x + this.width + 5;
        //   if (this.hasPrev) {
        //     this._drawLineFlowStoper(ctx, stoperX, 0);
        //   }
        //   if (this.hasNext) {
        //     this._drawLineFlowStoper(ctx, stoperX, 0);
        //   }
        //   if (this.isInput) {
        //     this._drawArgStoper(ctx, stoperX, 0);
        //   }
        //   if (this.isOutput) {
        //     this._drawArgStoper(ctx, stoperX, 0);
        //   }
        //   // if(line.prev || line.next || line.input || line.output) {
        //   // // 这里要检查鼠标是否在这个区域
        //   //   // console.debug("mousePos", mousePos.x, mousePos.y);
        //   // }
        // }
        // drawLineIcon(
        //   ctx: CanvasRenderingContext2D,
        //   pos?: CanvaPosition,
        //   e?: MouseEvent
        // ) {
        //   const vc = NodeShapeUIConfig.line;
        //   const icons = [
        //     {
        //       type: "boolean",
        //       icon: "bullet_yellow",
        //     },
        //     {
        //       type: "number",
        //       icon: "bullet_blue",
        //     },
        //     {
        //       type: "string",
        //       icon: "bullet_purple",
        //     },
        //     {
        //       type: "array",
        //       icon: "bullet_blue",
        //     },
        //     {
        //       type: "flow",
        //       icon: "bullet_go",
        //     },
        //   ];
        //   let inputType: string | undefined;
        //   if (this.hasPrev) inputType = "flow";
        //   else if (this.hasNext) inputType = "flow";
        //   else if (this.isInput) inputType = this.data.input?.type;
        //   else if (this.isOutput) inputType = this.data.output?.type;
        //   if (!inputType) {
        //     return;
        //   }
        //   // const inputType = this.isInput
        //   //   ? this.data.input?.type
        //   //   : this.data.output?.type;
        //   const icon = icons.find((icon) => icon.type === inputType);
        //   if (!icon) {
        //     console.error("icon not found", this.data.input?.type);
        //     return;
        //   }
        //   const iconX =
        //     this.hasPrev || this.isInput
        //       ? vc.icon.paddingLeft
        //       : -1 * vc.icon.width + -1 * vc.icon.paddingLeft;
        //   NodeUIHelper.drawIcon(ctx, icon.icon, iconX, vc.icon.paddingTop);
        // }
        getValue() {
            const inputValue = this.getInputValue();
            return inputValue && inputValue.toString().length >= 1 ? inputValue : this.data.edit?.default;
        }
        getInputValue() {
            return this.data.edit?.value;
            // if(this.editValue === undefined || this.editValue === null)
            //   return;
            // const valueType = this.data.type;
            // if(valueType === undefined || valueType === null)
            //   return;
            // return Object.getOwnPropertyDescriptor(this.editValue, valueType)?.value; // this.editValue[valueType!];
        }
        setInputValue(value) {
            Object.assign(this.data.edit, { 'value': value });
            // if(this.editValue === undefined || this.editValue === null)
            //   this.editValue = {};
            // const valueType = this.data.type;
            // if(valueType === undefined || valueType === null)
            //   return;
            // const property = Object.getOwnPropertyDescriptor(this.data.edit, valueType)
            // if(property === undefined)
            //   return;
            // Object.defineProperty(this.data.edit, valueType, {    value : value,    writable : true,    enumerable : true,    configurable : true});
            // // property!.set(value); // this.editValue.[valueType].value = value;
            // // console.error("setValue", value);
            // console.debug("setValue", value, this.editValue, (this.parent as NodeShapeLineInput));
            // (this.parent as NodeShapeLineInput).data.edit!.value = value;
        }
        drawText(ctx, pos, e) {
            const vc = NodeShapeConfig_5.NodeShapeUIConfig.line;
            NodeUIHelper_4.NodeUIHelper.setText(ctx, vc.text.textStyle);
            // if(this.editValue === undefined || this.editValue === null)
            //   return;
            // const valueType = this.data.input?.type;
            // if(valueType === undefined || valueType === null)
            //   return;
            // const value = Object.getOwnPropertyDescriptor(this.editValue, valueType)?.value; // this.editValue[valueType!];
            // console.log("value", value);
            // this.editValue?.[this.data.input?.type]
            const width = this.parent.width;
            // console.error('pos', this.position, width);
            // console.error('ctx', ctx, 'pos', pos, 'e', e, 'this.data', this.data, 'this.editValue', this.editValue, 'this.getValue()', this.getValue())
            const displayValue = (this.data.edit?.default ?? '') + ((this.getInputValue() && this.getInputValue().toString().length >= 1) ? ' => ' + this.getInputValue() : '');
            ctx.textAlign = "right";
            ctx.fillText(displayValue + '', width - vc.text.paddingLeft, vc.text.paddingTop);
            // get text metrics
            var metrics = ctx.measureText(displayValue + '');
            this.textWidth = metrics.width;
            // console.error(value + '', 'metrics', metrics);
            // var width = metrics.width;
            // if (this.isInput) {
            //   ctx.fillText(
            //     this.data.input?.name || "",
            //     vc.text.paddingLeft,
            //     vc.text.paddingTop
            //   );
            // }
            //  else if (this.isOutput) {
            //   ctx.textAlign = "right";
            //   ctx.fillText(
            //     this.data.output?.name || "",
            //     -1 * vc.text.paddingLeft,
            //     vc.text.paddingTop
            //   );
            // } else if (this.hasNext && this.data.next?.hasOwnProperty("name")) {
            //   ctx.textAlign = "right";
            //   ctx.fillText(
            //     (this.data.next as { name: string }).name || "",
            //     -1 * vc.text.paddingLeft,
            //     vc.text.paddingTop
            //   );
            // }
        }
    }
    exports.NodeShapeFormBase = NodeShapeFormBase;
});
define("node/NodeShape_LineInput", ["require", "exports", "canva/CanvaPosition", "node/NodeShape_LineBase", "node/NodeShape_FormBase"], function (require, exports, CanvaPosition_5, NodeShape_LineBase_1, NodeShape_FormBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeLineInput = void 0;
    class NodeShapeLineInput extends NodeShape_LineBase_1.NodeShapeLineBase {
        // data: NodeShapeLineData;
        // isLinking: boolean = false;
        constructor(stage, options, data) {
            super(stage, options, data);
            // this.data = data;
            this.isInput = true;
            if (this.data.edit) {
                const shape = new NodeShape_FormBase_1.NodeShapeFormBase(this.stage, {
                    position: new CanvaPosition_5.CanvaPosition(0, 0),
                    hoverAble: true,
                    draggAble: false,
                    // dragName: "type_output_" + line.output.type,
                    droppAble: false,
                    dropNames: [], // ["type_input_" + line.output.type],
                    clickAble: true,
                }, data);
                this.addChild(shape);
            }
            this.addEventListener("click", (e) => {
                // console.debug(NodeShapeLineBase.name, "end link");
                this.stage.addEndLink(this);
                // const isLinking = this.stage.isLinking(this);
                // // console.error('isLinking', isLinking)
                // // 原来没有被连的，并且有正在拖动的连接，则：新建连接
                // if(!isLinking && this.stage.draggingLinkShape) {        
                //   this.stage.addEndLink(this);
                //   return;
                // }
                // // 原来没有被连的，并且没有正在拖动的连接，则：
                // if(!isLinking && !this.stage.draggingLinkShape){
                //   this.stage.addEndLink(this);
                //   return;
                // }
                // // 已被连接， 并且没有正在拖动的连接， 则：取消连接， 变为拖动状态
                // if(!this.stage.draggingLinkShape) {
                //   // console.log('draggingLinkShape', this.stage.draggingLinkShape);
                //   var link = this.stage.removeEndLink(this);
                //   this.stage.draggingLinkShape = undefined;
                //   // console.log('link', link);
                //   if(link) {
                //     // console.log('draggingLinkShape addBegingLink', this.stage.draggingLinkShape);
                //     this.stage.addBegingLink(link.from)
                //   }
                //   return;
                // }
                // // 已被连接， 并且有正在拖动的连接， 则：取消原有连接以后新增连接
                // {
                //   const link = this.stage.canvaLinks?.find( t=> t.to === this )!;
                //   if(this.stage.draggingLinkShape === link.from) {
                //     return;
                //   }
                //   this.stage.removeLink(link.from, link.to);
                //   this.stage.addLink(this.stage.draggingLinkShape, this);
                //   this.stage.reflash();
                // }
            });
        }
        static getDefaultOptions(line, position) {
            return {
                position,
                hoverAble: true,
                draggAble: true,
                dragName: "type_input_" + line.input.type,
                droppAble: true,
                dropNames: ["type_output_" + line.input.type],
                clickAble: true,
            };
        }
    }
    exports.NodeShapeLineInput = NodeShapeLineInput;
});
define("node/NodeShape_LineOutput", ["require", "exports", "node/NodeShape_LineBase"], function (require, exports, NodeShape_LineBase_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeLineOutput = void 0;
    class NodeShapeLineOutput extends NodeShape_LineBase_2.NodeShapeLineBase {
        // data: NodeShapeLineData;
        constructor(stage, options, data) {
            super(stage, options, data);
            // this.data = data;
            this.isOutput = true;
            this.addEventListener("click", (e) => {
                // console.error(NodeShapeLineBase.name, "begin link");
                this.stage.addBegingLink(this);
                // this.stage.selectNode(this.data.node);
            });
        }
        static getDefaultOptions(line, position) {
            return {
                position,
                hoverAble: true,
                draggAble: true,
                dragName: "type_output_" + line.output.type,
                droppAble: true,
                dropNames: ["type_input_" + line.output.type],
                clickAble: true,
            };
        }
    }
    exports.NodeShapeLineOutput = NodeShapeLineOutput;
});
define("node/NodeShape_LinePrev", ["require", "exports", "node/NodeShape_LineBase"], function (require, exports, NodeShape_LineBase_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeLinePrev = void 0;
    class NodeShapeLinePrev extends NodeShape_LineBase_3.NodeShapeLineBase {
        constructor(stage, options, data) {
            super(stage, options, data);
            this.hasPrev = true;
            this.addEventListener("click", (e) => {
                this.stage.addEndLink(this);
            });
        }
        static getDefaultOptions(position) {
            return {
                position,
                hoverAble: true,
                draggAble: true,
                dragName: "type_flow_prev",
                droppAble: true,
                dropNames: ["type_flow_next"],
                clickAble: true,
            };
        }
    }
    exports.NodeShapeLinePrev = NodeShapeLinePrev;
});
define("node/NodeShape_LineNext", ["require", "exports", "node/NodeShape_LineBase"], function (require, exports, NodeShape_LineBase_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeLineNext = void 0;
    class NodeShapeLineNext extends NodeShape_LineBase_4.NodeShapeLineBase {
        constructor(stage, options, data) {
            super(stage, options, data);
            this.hasNext = true;
            this.addEventListener("click", (e) => {
                this.stage.addBegingLink(this);
            });
        }
        static getDefaultOptions(position) {
            return {
                position,
                hoverAble: true,
                draggAble: true,
                dragName: "type_flow_next",
                droppAble: true,
                dropNames: ["type_flow_prev"],
                clickAble: true,
            };
        }
    }
    exports.NodeShapeLineNext = NodeShapeLineNext;
});
define("node/NodeShape_Abstract", ["require", "exports", "canva/CanvaShape_Abstract", "canva/CanvaShape_Image", "canva/CanvaSize", "canva/CanvaPosition", "node/NodeShape_LineInput", "node/NodeShape_LineOutput", "node/NodeShapeConfig", "node/NodeShape_LinePrev", "node/NodeShape_LineNext", "node/NodeShapeConfig"], function (require, exports, CanvaShape_Abstract_4, CanvaShape_Image_1, CanvaSize_2, CanvaPosition_6, NodeShape_LineInput_1, NodeShape_LineOutput_1, NodeShapeConfig_6, NodeShape_LinePrev_1, NodeShape_LineNext_1, NodeShapeConfig_7) {
    "use strict";
    var _AbstractNodeShape_isActive;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractNodeShape = void 0;
    class AbstractNodeShape extends CanvaShape_Abstract_4.AbstractCanvaShape {
        constructor(stage, options, data, size) {
            super(stage, options, data.uuid);
            _AbstractNodeShape_isActive.set(this, false);
            this.data = data;
            Object.assign(this.data, { uuid: this.uuid });
            this.size = size;
            // console.error('viewConfig', viewConfig);
            // this.nodeUIHelper = new NodeUIHelper(this, this.stage.defaultLayer.ctx, 0, 0, 160, 180, viewConfig);
            // for (let i = 0; i < data.lines.length; i++) {
            //   const line = data.lines[i];
            //   this.addLine(line, i);
            //   // Object.assign(line, { uuid: lineBase?.uuid });
            // }
            for (let i = 0; i < data.portLines.length; i++) {
                const portLine = data.portLines[i];
                this.addPortLine(portLine, i);
            }
            if (this.data.icon) {
                const iconPath = NodeShapeConfig_7.NodeUIConfig.icon.path + "/" + this.data.icon + ".png";
                const icon = new CanvaShape_Image_1.ImageShape(iconPath, this.stage, this.options, new CanvaSize_2.CanvaSize(NodeShapeConfig_7.NodeUIConfig.icon.width, NodeShapeConfig_7.NodeUIConfig.icon.height));
            }
        }
        getDataToSave() {
            return {
                // uuid: this.uuid,
                name: this.constructor.name.substring(0, this.constructor.name.lastIndexOf("NodeShape")),
                options: this.options, // position: this.position ?? {},
                data: this.data,
                size: this.size ?? {},
                // lines: this.children?.filter(t => t.constructor.name.indexOf('NodeShapeLine') === 0).map(t => (t as NodeShapeLineBase).data),
            };
        }
        addPortLine(line, lineIndex) {
            const vc = NodeShapeConfig_6.NodeShapeUIConfig.line;
            const y = NodeShapeConfig_6.NodeShapeUIConfig.body.paddingTop + lineIndex * vc.height;
            let shape;
            if (line.prev) {
                shape = new NodeShape_LinePrev_1.NodeShapeLinePrev(this.stage, NodeShape_LinePrev_1.NodeShapeLinePrev.getDefaultOptions(new CanvaPosition_6.CanvaPosition(0 + NodeShapeConfig_6.NodeShapeUIConfig.body.paddingLeft, y)), line.prev);
                this.addChild(shape);
            }
            // console.log("line.next", line.next, line, this.constructor.name);
            if (line.next) {
                // console.error("line.next", line.next, line);
                shape = new NodeShape_LineNext_1.NodeShapeLineNext(this.stage, NodeShape_LineNext_1.NodeShapeLineNext.getDefaultOptions(new CanvaPosition_6.CanvaPosition(this.size.width - NodeShapeConfig_6.NodeShapeUIConfig.body.paddingLeft, y)), line.next);
                this.addChild(shape);
            }
            if (line.input !== undefined) {
                shape = new NodeShape_LineInput_1.NodeShapeLineInput(this.stage, NodeShape_LineInput_1.NodeShapeLineInput.getDefaultOptions(line, new CanvaPosition_6.CanvaPosition(0 + NodeShapeConfig_6.NodeShapeUIConfig.body.paddingLeft, y)), line.input);
                this.addChild(shape);
            }
            if (line.output !== undefined) {
                shape = new NodeShape_LineOutput_1.NodeShapeLineOutput(this.stage, NodeShape_LineOutput_1.NodeShapeLineOutput.getDefaultOptions(line, new CanvaPosition_6.CanvaPosition(this.size.width - NodeShapeConfig_6.NodeShapeUIConfig.body.paddingLeft, y)), line.output);
                this.addChild(shape);
            }
            return shape;
            // if(line.optional !== undefined) {
            //   const shape = new NodeShapeLineOutput(this.stage, {
            //     position: new CanvaPosition( 0, y),
            //     hoverAble: true,
            //     draggAble: false,
            //     // dragName: 'type_' + line.optional.type,
            //     droppAble: false,
            //     dropNames: [],
            //   }, line);
            //   this.addChild(shape);
            // }
        }
        // addLine(line: NodeShapeLineData, lineIndex: number) : NodeShapeLineBase | undefined {
        //   const vc = NodeShapeUIConfig.line;
        //   const y = NodeShapeUIConfig.body.paddingTop + lineIndex * vc.height;
        //   let shape: NodeShapeLineBase | undefined;
        //   if (line.prev) {
        //     shape = new NodeShapeLinePrev(
        //       this.stage,
        //       {
        //         position: new CanvaPosition(
        //           0 + NodeShapeUIConfig.body.paddingLeft,
        //           y
        //         ),
        //         hoverAble: true,
        //         draggAble: true,
        //         dragName: "type_flow_prev",
        //         droppAble: true,
        //         dropNames: ["type_flow_next"],
        //         clickAble: true,
        //       },
        //       line,
        //     );
        //     this.addChild(shape);
        //   }
        //   console.log("line.next", line.next, line, this.constructor.name);
        //   if (line.next) {
        //     console.error("line.next", line.next, line);
        //     shape = new NodeShapeLineNext(
        //       this.stage,
        //       {
        //         position: new CanvaPosition(
        //           this.size.width - NodeShapeUIConfig.body.paddingLeft,
        //           y
        //         ),
        //         hoverAble: true,
        //         draggAble: true,
        //         dragName: "type_flow_next",
        //         droppAble: true,
        //         dropNames: ["type_flow_prev"],
        //         clickAble: true,
        //       },
        //       line,
        //     );
        //     this.addChild(shape);
        //   }
        //   if (line.input !== undefined) {
        //     shape = new NodeShapeLineInput(
        //       this.stage,
        //       {
        //         position: new CanvaPosition(
        //           0 + NodeShapeUIConfig.body.paddingLeft,
        //           y
        //         ),
        //         hoverAble: true,
        //         draggAble: true,
        //         dragName: "type_input_" + line.input.type,
        //         droppAble: true,
        //         dropNames: ["type_output_" + line.input.type],
        //         clickAble: true,
        //       },
        //       line,
        //     );
        //     this.addChild(shape);
        //   }
        //   if (line.output !== undefined) {
        //     shape = new NodeShapeLineOutput(
        //       this.stage,
        //       {
        //         position: new CanvaPosition(
        //           this.size.width - NodeShapeUIConfig.body.paddingLeft,
        //           y
        //         ),
        //         hoverAble: true,
        //         draggAble: true,
        //         dragName: "type_output_" + line.output.type,
        //         droppAble: true,
        //         dropNames: ["type_input_" + line.output.type],
        //         clickAble: true,
        //       },
        //       line,
        //     );
        //     this.addChild(shape);
        //   }
        //   return shape;
        //   // if(line.optional !== undefined) {
        //   //   const shape = new NodeShapeLineOutput(this.stage, {
        //   //     position: new CanvaPosition( 0, y),
        //   //     hoverAble: true,
        //   //     draggAble: false,
        //   //     // dragName: 'type_' + line.optional.type,
        //   //     droppAble: false,
        //   //     dropNames: [],
        //   //   }, line);
        //   //   this.addChild(shape);
        //   // }
        // }
        getDragPath(ctx) {
            this.getHeaderPath(ctx);
        }
        getPath(ctx) {
            ctx.beginPath();
            ctx.roundRect(0, 0, this.size.width, this.size.height, 8);
            ctx.closePath();
        }
        draw(ctx, pos, e) {
            // this.drawShadow(ctx);
            this.drawBG(ctx);
            this.drawHeader(ctx);
            // this.drawLines(ctx);
        }
        // drawShadow(ctx: CanvasRenderingContext2D) {
        //   console.error("drawShadow not implemented");
        //   ctx.fillStyle =
        //     this.isHovering || this.isDragging
        //       ? this.hasChildren
        //         ? "blue"
        //         : "yellow"
        //       : "#111111";
        //   // if (ctx.isDragging) {
        //   //   ctx.translate(this.position.x, this.position.y);
        //   // }
        //   ctx.fill();
        // }
        getBGPath(ctx) {
            console.error("getBGPath not implemented");
        }
        drawBG(ctx) {
            console.error("drawNodeBg not implemented");
        }
        getHeaderPath(ctx) {
            console.error("getHeaderPath not implemented");
            // ctx.beginPath();
            // ctx.roundRect(0, 0, this.size.width, 20, 8);
            // ctx.closePath();
        }
        drawHeader(ctx) {
            console.error("drawHeader not implemented");
        }
        async execute(data) {
            console.error("execute not implemented");
            // this.next();
            return Promise.resolve(undefined);
        }
        // next(data?: {
        //   [index: string]: any;
        // }) {
        //   // console.error("execute not implemented", data);
        //   const links = this.stage.canvaLinks.filter(
        //     (t) =>
        //       t.from.parent === this &&
        //       t.to instanceof NodeShapeLineBase &&
        //       t.to.hasPrev
        //   );
        //   if (links.length <= 0) {
        //     // console.debug("no next node found");
        //     // this.isActive = false;
        //     return;
        //   } // throw new Error("no next node found");
        //   let fromShape: NodeShapeLineBase | undefined;
        //   if(links.length === 1) {
        //     fromShape = links[0].from as NodeShapeLineBase;
        //   }
        //   else {
        //     if (data !== undefined && data.hasOwnProperty("next")) {
        //       for (const link of links) {
        //         const next = (link.from as NodeShapeLineBase).data.next;
        //         if(!next) {
        //           continue;
        //         }
        //         if (typeof next === 'boolean' && typeof data.next === 'boolean') {
        //           if (next === data.next) {
        //             fromShape = link.from as NodeShapeLineBase;
        //             break;
        //           }
        //         }
        //         if(  next.hasOwnProperty('value')  && (next as {name: string, value: string | number | boolean}).value === data.next) {
        //           fromShape = link.from as NodeShapeLineBase;
        //           break;
        //         }
        //       }
        //       // if(!fromShape) {
        //       //   debugger;
        //       // }
        //       // fromShape = links.find(
        //       //   (link) => (link.from as NodeShapeLineBase).data.next?.value === data.next
        //       // )?.from as NodeShapeLineBase;
        //       // console.error("fromShape", fromShape);
        //     }
        //     if (!fromShape) {
        //       fromShape = links[0].from as NodeShapeLineBase;
        //     }
        //   }
        //   // const next = links[0].to as NodeShapeLineBase;
        //   NodeFlow.forward(this.stage, fromShape, data);
        // }
        async getData() {
            console.error("drawHeader not implemented");
            return Promise.resolve(undefined);
        }
        get isActive() {
            return __classPrivateFieldGet(this, _AbstractNodeShape_isActive, "f");
        }
        /**
         * 获取输入值， 如果有输入连线值，则返回输入连线值， 如果有输入框值，则返回输入框值， 如果输入框有默认值， 则返回输入框默认值， 否则返回 #defaultDelay
         * @param protValue 通过protValue获取输入值
         * @param name input port 对应的名称
         * @returns
         */
        getInputValue(protValue, name = 'default', defaultValue) {
            // port 有输入值时，返回输入值
            if (protValue !== undefined && protValue !== null && protValue.toString().length >= 1)
                return protValue;
            const inputer = this.children?.filter(c => c.constructor.name === "NodeShapeLineInput").find(c => {
                const child = c;
                return child.isInput && child.data.name === name && child.data.edit;
            });
            if (inputer) {
                // input 有值时，返回值
                if (inputer.data.edit?.value !== undefined && inputer.data.edit?.value !== null && inputer.data.edit?.value.toString().length >= 1)
                    return inputer.data.edit?.value;
                // input 有默认值时，返回默认值
                if (inputer.data.edit?.default !== undefined && inputer.data.edit?.default !== null && inputer.data.edit?.default.toString().length >= 1)
                    return inputer.data.edit?.default;
            }
            // 实在没有值时，返回 #defaultDelay
            return defaultValue;
        }
        set isActive(value) {
            __classPrivateFieldSet(this, _AbstractNodeShape_isActive, value, "f");
            this.stage.reflash();
        }
        destroy() {
            console.debug('Destroying resources in ' + AbstractNodeShape.name, this.uuid);
            super.destroy();
        }
    }
    exports.AbstractNodeShape = AbstractNodeShape;
    _AbstractNodeShape_isActive = new WeakMap();
});
define("node/NodeFlow", ["require", "exports", "node/NodeShape_Abstract", "node/NodeShape_LineBase"], function (require, exports, NodeShape_Abstract_4, NodeShape_LineBase_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeFlow = void 0;
    class NodeFlow {
        // stage: CanvaStage;
        // constructor(stage: CanvaStage) {
        //   this.stage = stage;
        // }
        static async execute(stage, nodeShape, isBeging = true) {
            // console.debug("NodeFlow execute");
            if (isBeging)
                console.group(`NodeFlow`);
            console.time("time " + nodeShape.uuid);
            nodeShape.isActive = true;
            const inputs = nodeShape.children?.filter((t) => t instanceof NodeShape_LineBase_5.NodeShapeLineBase && t.isInput);
            let datas = undefined;
            if (inputs && inputs.length > 0) {
                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i];
                    const toName = input.data.name || input.uuid;
                    // const input = inputs[0] as NodeShapeLineBase;
                    const link = stage.canvaLinks.find((link) => link.to === input);
                    if (!link) {
                        // throw new Error("NodeFlow execute error: no link found");
                        // check if input has default value, if yes, use it, if else continue;
                        // const defaultValue =
                        //   input.data.edit?.value ?? input.data.edit?.default;
                        // if (defaultValue !== undefined) {
                        //   if (datas === undefined) datas = {};
                        //   if (!!input.data.edit?.value) {
                        //     Object.assign( logData, {'editor-value': input.data.edit.value });
                        //     // console.log("value-set", toName, defaultValue);
                        //   } else {
                        //     Object.assign( logData, {'editor-default': input.data.edit?.default });
                        //     console.log("value-def", toName, defaultValue);
                        //   }
                        //   Object.assign(datas, { [toName]: defaultValue });
                        // }
                        // console.log("input", input, defaultValue);
                        continue;
                    }
                    const fromShape = link.from;
                    if (!fromShape ||
                        !(fromShape.parent instanceof NodeShape_Abstract_4.AbstractNodeShape) ||
                        !fromShape.isOutput) {
                        // throw new Error("NodeFlow execute error: fromShape is not output");
                        continue;
                    }
                    // const parent = fromShape.parent as AbstractNodeShape;
                    // parent.isActive = true;
                    const data = (await fromShape.parent.getData());
                    // parent.isActive = false;
                    if (data === undefined || data === null) {
                        // throw new Error("NodeFlow execute error: no data found");
                        continue;
                    }
                    const fromName = fromShape.data.name || fromShape.uuid;
                    if (datas === undefined)
                        datas = {};
                    // console.log("value-ipt", toName, data[fromName]);
                    Object.assign(datas, { [toName]: data[fromName] });
                }
            }
            // nodeShape.isActive = true;
            console.group(`${nodeShape.data.title} {${nodeShape.uuid}}`);
            console.log("input", datas);
            const result = await nodeShape.execute(datas);
            console.log('output', result);
            console.timeEnd("time " + nodeShape.uuid);
            console.groupEnd();
            // console.log('node execute', nodeShape.uuid, nodeShape.data.title, datas, " => ", result);
            nodeShape.isActive = false;
            // nodeShape.next(result);
            const fromShape = this.getFromShape(stage, nodeShape, result);
            if (fromShape) {
                NodeFlow.forward(nodeShape.stage, fromShape, result);
            }
            else {
                console.groupEnd();
            }
            // NodeFlow.forward(this.stage, fromShape, data);
        }
        static getFromShape(stage, nodeShape, data) {
            // console.error("execute not implemented", data);
            const links = stage.canvaLinks.filter((t) => t.from.parent === nodeShape &&
                t.to instanceof NodeShape_LineBase_5.NodeShapeLineBase &&
                t.to.hasPrev);
            if (links.length <= 0) {
                // console.warn("this is a flow, no link found");
                // console.debug("no next node found");
                // this.isActive = false;
                return;
            } // throw new Error("no next node found");
            else if (links.length === 1) {
                return links[0].from;
            }
            if (data === undefined || !data.hasOwnProperty("next")) {
                // console.debug("no next data found");
                // console.warn("this is a choice flow, no next data found");
                return;
            }
            let fromShape;
            for (const link of links) {
                const next = link.from.data;
                if (!next) {
                    continue;
                }
                if (typeof next === "boolean" && typeof data.next === "boolean") {
                    if (next === data.next) {
                        fromShape = link.from;
                        break;
                    }
                }
                if (next.hasOwnProperty("value") &&
                    next.value.toString() ===
                        data.next.toString()) {
                    fromShape = link.from;
                    break;
                }
            }
            if (!fromShape) {
                // fromShape = links[0].from as NodeShapeLineBase;
                // console.warn("this is a choice flow, next data not matched");
                return;
            }
            return fromShape;
            // const next = links[0].to as NodeShapeLineBase;
            // NodeFlow.forward(this.stage, fromShape, data);
        }
        static forward(stage, shape, data) {
            if (!shape.hasNext)
                throw new Error("NodeFlow forward error: shape has no next");
            const links = stage.canvaLinks.filter((link) => link.from === shape);
            if (links.length === 0)
                throw new Error("NodeFlow forward error: no link found");
            let toShape;
            if (links.length === 1) {
                const link = links[0];
                toShape = link.to;
            }
            else {
                console.error("links", links);
                // for (let i = 0; i < links.length; i++) {
                //   const link = links[i];
                //   const to = link.to as NodeShapeLineBase;
                //   if( to.data.next === true ) {
                //     if( !data || !data.hasOwnProperty('next') || data.next === true || data.next === 'true' || data.next === 1 ) {
                //       toShape = to;
                //       break;
                //     }
                //   }
                //   if (link..data.input?.name === shape.data.output?.name) {
                //     toShape = link.to as NodeShapeLineBase;
                //     break;
                //   }
                // if (toShape instanceof Boolean)
                // { name: string; value: boolean | number | string; }
            }
            if (!toShape ||
                !(toShape.parent instanceof NodeShape_Abstract_4.AbstractNodeShape) ||
                !toShape.hasPrev)
                throw new Error("NodeFlow forward error: toShape has no prev");
            // TODO: 更新nodeShape的状态：非活动状态
            // setTimeout(() => {
            //   // (shape.parent as AbstractNodeShape).isActive = false;
            // }, 300);
            NodeFlow.execute(stage, toShape.parent, false);
            // console.log("NodeFlow forward");
        }
    }
    exports.NodeFlow = NodeFlow;
});
define("canva/CanvaStage_Link", ["require", "exports", "canva/CanvaStage_Base", "node/NodeShape_LineBase"], function (require, exports, CanvaStage_Base_5, NodeShape_LineBase_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaStage_Link = void 0;
    // #draggingLinkShape?: AbstractCanvaShape;
    CanvaStage_Base_5.CanvaStage.prototype.isLinking = function (to) {
        return this.canvaLinks?.some((link) => link.to === to);
    };
    CanvaStage_Base_5.CanvaStage.prototype.canLink = function (from, to) {
        if (from === to)
            return false;
        if (from.parent === to.parent)
            return false;
        if (!from.dragName || from.dragName.length === 0)
            return false;
        if (!to.dropNames || to.dropNames.length === 0)
            return false;
        return to.dropNames.includes(from.dragName);
    };
    CanvaStage_Base_5.CanvaStage.prototype.addLink = function (from, to) {
        // if (!this.canvaLinks) this.canvaLinks.splice(0, this.canvaLinks.length);
        this.canvaLinks.push({ from, to });
    };
    CanvaStage_Base_5.CanvaStage.prototype.removeLink = function (from, to) {
        if (!this.canvaLinks || this.canvaLinks.length === 0)
            return;
        const index = this.canvaLinks.findIndex((link) => link.from === from && link.to === to);
        if (index === -1)
            return;
        this.canvaLinks.splice(index, 1);
    };
    CanvaStage_Base_5.CanvaStage.prototype.removeAllLinks = function () {
        if (!this.canvaLinks || this.canvaLinks.length === 0)
            return;
        this.canvaLinks.splice(0, this.canvaLinks.length);
    };
    CanvaStage_Base_5.CanvaStage.prototype.addDraggingLink = function (shape, isEndLink) {
        // console.log("addBegingLink", shape);
        const pos = shape.getCenterPosition();
        this.draggingLinkShape = shape;
        // linkStart = true;
        const linkStop = (e) => {
            this.element.removeEventListener("mousemove", linkMove);
            this.element.removeEventListener("mousedown", linkStop);
            setTimeout(() => {
                if (this.draggingLinkShape) {
                    this.draggingLinkShape = undefined;
                }
            }, 200);
            this.reflash();
        };
        const linkMe = (e) => {
            this.cleanLayer(this.activeLayer);
            const toPosition = this.getCanvaPos(e);
            this.drawLink(pos, toPosition, this.activeLayer.ctx);
        };
        let scheduledAnimationFrame = false;
        const linkMove = (e) => {
            if (scheduledAnimationFrame) {
                return;
            }
            scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                scheduledAnimationFrame = false;
                linkMe(e);
            });
        };
        this.element.addEventListener("mousemove", linkMove);
        this.element.addEventListener("mousedown", linkStop);
    };
    CanvaStage_Base_5.CanvaStage.prototype.addBegingLink = function (shape) {
        if (this.draggingLinkShape) {
            if (!this.canLink(shape, this.draggingLinkShape)) {
                this.draggingLinkShape = undefined;
                return;
            }
            this.addLink(shape, this.draggingLinkShape);
            this.draggingLinkShape = undefined;
            this.reflash();
            return;
        }
        this.addDraggingLink(shape, false);
    };
    CanvaStage_Base_5.CanvaStage.prototype.addEndLink = function (shape) {
        // console.log("addEndLink", shape);
        // 特殊：输出流只能有一个方向
        if (this.draggingLinkShape &&
            this.draggingLinkShape instanceof NodeShape_LineBase_6.NodeShapeLineBase &&
            this.draggingLinkShape.hasNext &&
            this.canvaLinks?.some((link) => link.from === this.draggingLinkShape)) {
            const oldLink = this.canvaLinks?.find((link) => link.from === this.draggingLinkShape);
            this.removeLink(oldLink.from, oldLink.to);
            this.addLink(this.draggingLinkShape, shape);
            return;
        }
        if (this.isLinking(shape)) {
            if (!this.draggingLinkShape) {
                const link = this.canvaLinks?.find((link) => link.to === shape);
                this.removeEndLink(shape);
                this.addBegingLink(link.from);
                return;
            }
            else {
                if (!this.canLink(this.draggingLinkShape, shape)) {
                    this.draggingLinkShape = undefined;
                    return;
                }
                const link = this.canvaLinks?.find((link) => link.to === shape);
                if (this.draggingLinkShape === link?.from) {
                    this.draggingLinkShape = undefined;
                    return;
                }
                this.removeLink(link.from, shape);
                this.addLink(this.draggingLinkShape, shape);
                this.reflash();
                return;
            }
        }
        if (this.draggingLinkShape) {
            if (!this.canLink(this.draggingLinkShape, shape)) {
                this.draggingLinkShape = undefined;
                return;
            }
            this.addLink(this.draggingLinkShape, shape);
            this.draggingLinkShape = undefined;
            this.reflash();
            return;
        }
        this.addDraggingLink(shape, true);
    };
    CanvaStage_Base_5.CanvaStage.prototype.renderLink = function (from, to) {
        const posBegin = from.getCenterPosition();
        const posEnd = to.getCenterPosition();
        // console.log("renderLink", posBegin, posEnd);
        this.drawLink(posBegin, posEnd);
    };
    CanvaStage_Base_5.CanvaStage.prototype.renderLinks = function () {
        if (!this.canvaLinks)
            return;
        for (const link of this.canvaLinks) {
            this.renderLink(link.from, link.to);
        }
    };
    CanvaStage_Base_5.CanvaStage.prototype.drawLink = function (pointBegin, pointEnd, ctx) {
        const pointControl1 = {
            x: pointBegin.x + (pointEnd.x - pointBegin.x) / 3,
            y: pointBegin.y,
        };
        const pointControl2 = {
            x: pointEnd.x - (pointEnd.x - pointBegin.x) / 3,
            y: pointEnd.y,
        };
        if (!ctx) {
            ctx = this.defaultLayer.ctx;
        }
        // const ctx = linkStart ? this.activeLayer.ctx : this.defaultLayer.ctx;
        ctx.beginPath();
        ctx.moveTo(pointBegin.x, pointBegin.y);
        ctx.bezierCurveTo(pointControl1.x, pointControl1.y, pointControl2.x, pointControl2.y, pointEnd.x, pointEnd.y);
        // ctx.closePath();
        ctx.strokeStyle = "#6fb7e7";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
    };
    CanvaStage_Base_5.CanvaStage.prototype.removeEndLink = function (to) {
        const link = this.canvaLinks?.find((link) => link.to === to);
        if (!link)
            return;
        this.removeLink(link.from, link.to);
        return link;
    };
    exports.CanvaStage_Link = 1;
});
define("canva/CanvaStage_", ["require", "exports", "canva/CanvaStage_Base", "canva/CanvaStage_BG", "canva/CanvaStage_Layer", "canva/CanvaStage_Utils", "canva/CanvaStage_Shape", "canva/CanvaStage_Link"], function (require, exports, CanvaStage_Base_6, CanvaStage_BG_1, CanvaStage_Layer_1, CanvaStage_Utils_1, CanvaStage_Shape_1, CanvaStage_Link_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CanvaStage_Modules = [CanvaStage_BG_1.CanvaStage_BG, CanvaStage_Layer_1.CanvaStage_Layer, CanvaStage_Utils_1.CanvaStage_Utils, CanvaStage_Shape_1.CanvaStage_Shape, CanvaStage_Link_1.CanvaStage_Link];
    // console.debug('CanvaStage prototypes', CanvaStage_BG, CanvaStage_Layer, CanvaStage_Utils, CanvaStage_Shape, CanvaStage_Link);
    exports.default = CanvaStage_Base_6.CanvaStage;
});
define("demo/CanvaShapeA", ["require", "exports", "canva/CanvaShape_Abstract"], function (require, exports, CanvaShape_Abstract_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanvaShapeA = void 0;
    class CanvaShapeA extends CanvaShape_Abstract_5.AbstractCanvaShape {
        constructor(stage, options) {
            super(stage, options);
        }
        // addChild(shape: AbstractCanvaShape): AbstractCanvaShape {
        //   if (this.children === undefined) this.children = [];
        //   this.children.push(shape);
        //   shape.parent = this;
        //   shape.stage = this.stage;
        //   return shape;
        // }
        // render(pos?: CanvaPosition, e?: MouseEvent) {
        //   // console.debug(CanvaShape.name, this.render.name);
        //   const ctx = this.isDragging
        //     ? this.stage.activeLayer.ctx
        //     : this.stage.defaultLayer.ctx;
        //   ctx.save();
        //   try {
        //     ctx.translate(this.position.x, this.position.y);
        //     if (this.isDragging && pos) {
        //       ctx.translate(
        //         (pos.x - this.draggingX) / this.stage.scale,
        //         (pos.y - this.draggingY) / this.stage.scale
        //       );
        //     }
        //     this.getPath(ctx);
        //     this.draw(ctx, pos, e);
        //   } catch (e) {
        //     console.error(e);
        //   }
        //   ctx.restore();
        // }
        // isPointInPath(pos: CanvaPosition) {
        //   const ctx = this.stage.defaultLayer.ctx;
        //   ctx.save();
        //   ctx.translate(this.position.x, this.position.y);
        //   this.getPath(ctx);
        //   const result = ctx.isPointInPath(pos.x, pos.y);
        //   ctx.restore();
        //   return result;
        // }
        getPath(ctx) {
            // const ctx = this.stage.defaultLayer.ctx;
            ctx.beginPath();
            ctx.roundRect(0, 0, this.hasChildren ? 60 : 30, this.hasChildren ? 60 : 30, 8);
            ctx.closePath();
        }
        getDragPath(ctx) {
            ctx.beginPath();
            ctx.roundRect(0, 0, 30, 15, 8);
            ctx.closePath();
        }
        draw(ctx, pos, e) {
            // , isHover, isDraging, isDropping
            ctx.fillStyle =
                this.isHovering || this.isDragging
                    ? this.hasChildren
                        ? "blue"
                        : "yellow"
                    : "#111111";
            // if (ctx.isDragging) {
            //   ctx.translate(this.position.x, this.position.y);
            // }
            ctx.fill();
        }
    }
    exports.CanvaShapeA = CanvaShapeA;
});
define("nodes/MessageNode/OnMessage", ["require", "exports", "node/NodeShape_", "canva/CanvaSize", "node/NodeFlow"], function (require, exports, NodeShape_1, CanvaSize_3, NodeFlow_1) {
    "use strict";
    var _OnMessageNodeShape_defaultDelay, _OnMessageNodeShape_interval, _OnMessageNodeShape_timer, _OnMessageNodeShape_data;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OnMessageNodeShape = void 0;
    const defaults = {
        nodeData: {
            title: "On Message",
            icon: "clock",
            // lines: [],
            portLines: [
                {
                    next: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                },
                {
                    output: {
                        name: "default",
                        type: "string",
                    },
                },
                {
                    input: {
                        name: "default",
                        type: "string",
                        edit: {
                            default: "1000",
                            placeHolder: "请输入间隔时间（毫秒）",
                            range: [0, 20],
                        },
                    },
                },
            ],
        },
        options: {
            position: { x: 50, y: 250 },
            hoverAble: true,
            draggAble: true,
            dragName: "node",
            droppAble: false,
            dropNames: [],
            clickAble: true,
        },
        size: new CanvaSize_3.CanvaSize(120, 110),
    };
    class OnMessageNodeShape extends NodeShape_1.NodeShape {
        constructor(stage, options, data, size) {
            // console.error('OnMessageNodeShape', options, data, size);
            const _options = Object.assign({}, defaults.options, options);
            const _data = Object.assign({}, defaults.nodeData, data);
            const _size = size ?? defaults.size;
            super(stage, _options, _data, _size);
            this.nodeUIHelper = null;
            _OnMessageNodeShape_defaultDelay.set(this, 3000);
            _OnMessageNodeShape_interval.set(this, void 0);
            _OnMessageNodeShape_timer.set(this, void 0);
            _OnMessageNodeShape_data.set(this, void 0);
            const input = this.data.portLines?.find((line) => line.input &&
                line.input.name &&
                line.input.name === "default" &&
                line.input.edit &&
                line.input.edit.default);
            // if (input) {
            //   this.#defaultDelay = parseInt(input.input!.edit!.default!.toString());
            // }
            this.beginTimer();
        }
        destroy() {
            if (__classPrivateFieldGet(this, _OnMessageNodeShape_interval, "f")) {
                clearInterval(__classPrivateFieldGet(this, _OnMessageNodeShape_interval, "f"));
            }
            if (__classPrivateFieldGet(this, _OnMessageNodeShape_timer, "f")) {
                clearInterval(__classPrivateFieldGet(this, _OnMessageNodeShape_timer, "f"));
            }
            super.destroy();
        }
        beginTimer() {
            // if (this.#timer) {
            //   clearInterval(this.#timer);
            // }
            // if (this.#interval) {
            //   clearInterval(this.#interval);
            // }
            const currInterval = this.getInputValue(undefined, "default", __classPrivateFieldGet(this, _OnMessageNodeShape_defaultDelay, "f"));
            __classPrivateFieldSet(this, _OnMessageNodeShape_interval, setInterval(() => {
                const newInterval = this.getInputValue(undefined, "default", __classPrivateFieldGet(this, _OnMessageNodeShape_defaultDelay, "f"));
                NodeFlow_1.NodeFlow.execute(this.stage, this);
                if (newInterval !== currInterval) {
                    clearInterval(__classPrivateFieldGet(this, _OnMessageNodeShape_interval, "f"));
                    this.beginTimer();
                }
            }, currInterval), "f");
            // setTimeout(() => {
            //   NodeFlow.execute(this.stage, this);
            // }, currInterval);
            // let currInterval = this.getInputValue() this.#totalInterval;
            // this.#interval = setInterval(() => {
            //   currInterval -= 1000;
            //   console.log('OnMessageNodeShape interval', currInterval);
            //   if (currInterval <= 0) {
            //     currInterval = this.#totalInterval;
            //     NodeFlow.execute(this.stage, this)
            //   }
            //   this.#defaultDelay
            // }, 1000);
            // setInterval(() => {
            //   NodeFlow.execute(stage, this)
            // }, 10000);
        }
        async execute(data) {
            // this.next();
            // const currInterval = this.getInputValue(data?.default, 'default', this.#defaultDelay);
            // this.#timer = setTimeout(() => {
            //   NodeFlow.execute(this.stage, this)
            // }, currInterval);
            // this.getInputValue() this.#totalInterval;
            // this.#interval = setInterval(() => {
            //   currInterval -= 1000;
            //   console.log('OnMessageNodeShape interval', currInterval);
            //   if (currInterval <= 0) {
            //     currInterval = this.#totalInterval;
            //     NodeFlow.execute(this.stage, this)
            //   }
            //   this.#defaultDelay
            // }, 1000);
            __classPrivateFieldSet(this, _OnMessageNodeShape_data, await this.getData(), "f");
            return new Promise((resolve) => {
                // console.debug(OnMessageNodeShape.name, 'execute ing');
                setTimeout(() => {
                    // console.debug(OnMessageNodeShape.name,'execute done');
                    resolve(__classPrivateFieldGet(this, _OnMessageNodeShape_data, "f"));
                }, 300);
            });
            // return Promise.resolve(this.#data);
        }
        async getData() {
            if (__classPrivateFieldGet(this, _OnMessageNodeShape_data, "f"))
                return Promise.resolve(__classPrivateFieldGet(this, _OnMessageNodeShape_data, "f"));
            const time = Intl.DateTimeFormat("zh-CN", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(new Date());
            return Promise.resolve({
                default: "时间： " + time,
            });
            // return Promise.resolve(undefined);
            // return Promise.resolve({
            //   "default": '时间： ' + time,
            // });
            // // return {
            // //   "default": '时间： ' + time,
            // // };
            // // return Promise.resolve({
            // //   "default": '时间： ' + time,
            // // });
            // return new Promise((resolve) => {
            //   console.info('getData ing');
            //   setTimeout(() => {
            //     console.info('getData done');
            //   }, 300 )
            // });
        }
    }
    exports.OnMessageNodeShape = OnMessageNodeShape;
    _OnMessageNodeShape_defaultDelay = new WeakMap(), _OnMessageNodeShape_interval = new WeakMap(), _OnMessageNodeShape_timer = new WeakMap(), _OnMessageNodeShape_data = new WeakMap();
});
define("nodes/MessageNode/DelayMessage", ["require", "exports", "node/NodeShape_", "canva/CanvaSize"], function (require, exports, NodeShape_2, CanvaSize_4) {
    "use strict";
    var _DelayMessageNodeShape_timer, _DelayMessageNodeShape_defaultDelay, _DelayMessageNodeShape_data;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DelayMessageNodeShape = void 0;
    const defaults = {
        nodeData: {
            title: "Delay Message",
            icon: "clock",
            // lines: [],
            portLines: [
                {
                    prev: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                    next: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                },
                {
                    input: {
                        name: "default",
                        type: "string",
                        edit: {
                            default: "6000",
                            placeHolder: "请输入间隔时间（秒）",
                            range: [0, 30000],
                        },
                    },
                },
            ],
        },
        options: {
            position: { x: 500, y: 200 },
            hoverAble: true,
            draggAble: true,
            dragName: "node",
            droppAble: false,
            dropNames: [],
            clickAble: true,
        },
        size: new CanvaSize_4.CanvaSize(150, 90),
    };
    class DelayMessageNodeShape extends NodeShape_2.NodeShape {
        constructor(stage, options, data, size) {
            // console.error('DelayMessageNodeShape', options, data, size);
            const _options = Object.assign({}, defaults.options, options);
            const _data = Object.assign({}, defaults.nodeData, data);
            const _size = size ?? defaults.size;
            super(stage, _options, _data, _size);
            this.nodeUIHelper = null;
            _DelayMessageNodeShape_timer.set(this, void 0);
            _DelayMessageNodeShape_defaultDelay.set(this, 1000);
            _DelayMessageNodeShape_data.set(this, void 0);
            const input = this.data.portLines?.find((line) => line.input &&
                line.input.name &&
                line.input.name === "default" &&
                line.input.edit &&
                line.input.edit.default);
            if (input) {
                __classPrivateFieldSet(this, _DelayMessageNodeShape_defaultDelay, parseInt(input.input.edit.default.toString()), "f");
            }
        }
        destroy() {
            if (__classPrivateFieldGet(this, _DelayMessageNodeShape_timer, "f")) {
                clearInterval(__classPrivateFieldGet(this, _DelayMessageNodeShape_timer, "f"));
            }
            super.destroy();
        }
        // getInputValue(protValue: any, name: string): any {
        //   // port 有输入值时，返回输入值
        //   if(protValue !== undefined && protValue !== null && protValue.toString().length >= 1)
        //     return protValue;
        //   const inputer = this.children?.filter(c => c.constructor.name === "NodeShapeLineInput").find(c => 
        //   {
        //     const child = c as NodeShapeLineInput;
        //     return child.isInput &&       child.data.name === name && child.data.edit;
        //   }) as NodeShapeLineInput;
        //   if(inputer ){
        //     // input 有值时，返回值
        //     if( inputer.data.edit?.value !== undefined && inputer.data.edit?.value!== null && inputer.data.edit?.value.toString().length >=1 )
        //       return inputer.data.edit?.value;  
        //     // input 有默认值时，返回默认值
        //     if( inputer.data.edit?.default !== undefined && inputer.data.edit?.default!== null && inputer.data.edit?.default.toString().length >=1 )
        //       return inputer.data.edit?.default;
        //   }
        //   // 实在没有值时，返回 #defaultDelay
        //   return this.#defaultDelay;
        // }
        async execute(data) {
            // this.next();
            // console.log("DelayMessageNodeShape execute", data, this, this.hasChildren, this.children)
            let delay = this.getInputValue(data?.default, "default", __classPrivateFieldGet(this, _DelayMessageNodeShape_defaultDelay, "f"));
            const logData = {
                portDefault: data?.default,
                delay,
            };
            console.debug('execute', logData);
            // let delay = this.#defaultDelay;
            // // const input = this.data.lines.find(
            // //   (line) =>
            // //     line.input &&
            // //     line.input.name &&
            // //     line.input.name === "default" &&
            // //     line.input.edit &&
            // //     line.input.edit.default
            // // );
            // // if (input) {
            // //   delay = parseInt(input.input!.edit!.default!.toString());
            // // }
            // console.error("DelayMessageNodeShape execute", data);
            // if(data) {
            //   delay = parseInt(data.default);
            // }
            return new Promise((resolve) => {
                __classPrivateFieldSet(this, _DelayMessageNodeShape_timer, setTimeout(() => {
                    return resolve(this.data);
                }, delay), "f");
            });
            // console.error("DelayMessageNodeShape execute", data);
        }
        async getData() {
            return;
        }
    }
    exports.DelayMessageNodeShape = DelayMessageNodeShape;
    _DelayMessageNodeShape_timer = new WeakMap(), _DelayMessageNodeShape_defaultDelay = new WeakMap(), _DelayMessageNodeShape_data = new WeakMap();
});
define("nodes/MessageNode/ConsoleMessage", ["require", "exports", "node/NodeShape_", "canva/CanvaSize"], function (require, exports, NodeShape_3, CanvaSize_5) {
    "use strict";
    var _ConsoleMessageNodeShape_data;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleMessageNodeShape = void 0;
    const defaults = {
        nodeData: {
            title: "Console Log",
            icon: "information",
            // lines: [],
            portLines: [
                {
                    prev: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                    next: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                },
                {
                    output: {
                        name: "default",
                        type: "string",
                    },
                },
                {
                    input: {
                        name: "default",
                        type: "string",
                    },
                },
                {
                    input: {
                        name: "boolean",
                        type: "boolean",
                    },
                },
                {
                    input: {
                        name: "number",
                        type: "number",
                    },
                },
            ],
        },
        options: {
            position: { x: 550, y: 100 },
            hoverAble: true,
            draggAble: true,
            dragName: "node",
            droppAble: false,
            dropNames: [],
            clickAble: true,
        },
        size: new CanvaSize_5.CanvaSize(120, 140),
    };
    class ConsoleMessageNodeShape extends NodeShape_3.NodeShape {
        constructor(stage, options, data, size) {
            // console.error("ConsoleMessageNodeShape", options, data, size);
            const _options = Object.assign({}, defaults.options, options);
            const _data = Object.assign({}, defaults.nodeData, data);
            const _size = size ?? defaults.size;
            super(stage, _options, _data, _size);
            this.nodeUIHelper = null;
            _ConsoleMessageNodeShape_data.set(this, void 0);
            // this.data = data;
            // console.error('viewConfig', viewConfig);
            // this.nodeUIHelper = new NodeUIHelper(this, this.stage.defaultLayer.ctx, 0, 0, 160, 180, viewConfig);
        }
        // async getData(): Promise<{ [index: string]: any } | undefined> {    
        //   return Promise.resolve(undefined);
        // }
        async execute(data) {
            const isUndefinedOrNull = typeof (data) === 'undefined' || data === null;
            __classPrivateFieldSet(this, _ConsoleMessageNodeShape_data, { ...data, success: !isUndefinedOrNull }, "f");
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (!isUndefinedOrNull) {
                        console.info('execute:', data);
                    }
                    resolve(__classPrivateFieldGet(this, _ConsoleMessageNodeShape_data, "f"));
                }, 100);
            });
            // return Promise.resolve(undefined);
        }
        async getData() {
            return Promise.resolve(__classPrivateFieldGet(this, _ConsoleMessageNodeShape_data, "f"));
        }
    }
    exports.ConsoleMessageNodeShape = ConsoleMessageNodeShape;
    _ConsoleMessageNodeShape_data = new WeakMap();
});
define("nodes/MessageNode/MatchMessage", ["require", "exports", "node/NodeShape_", "canva/CanvaSize"], function (require, exports, NodeShape_4, CanvaSize_6) {
    "use strict";
    var _MatchMessageNodeShape_data;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MatchMessageNodeShape = void 0;
    const defaults = {
        nodeData: {
            title: "Match Message",
            icon: "arrow_switch",
            // lines: [],
            portLines: [
                {
                    prev: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                    next: {
                        name: "True",
                        type: "boolean",
                        value: true,
                    },
                },
                {
                    next: {
                        name: "False",
                        type: "boolean",
                        value: false,
                    },
                },
                {
                    output: {
                        name: "default",
                        type: "string",
                    },
                },
                {
                    input: {
                        name: "regString",
                        type: "string",
                        edit: {
                            default: '\\d+',
                            placeHolder: '请输入正则表达式字符串'
                        }
                    },
                },
                {
                    input: {
                        name: "default",
                        type: "string",
                        edit: {
                            default: '2024/5/16 14:50',
                            placeHolder: '请输入消息内容',
                            range: [0, 20],
                        }
                    },
                },
            ],
        },
        options: {
            position: { x: 300, y: 100 },
            hoverAble: true,
            draggAble: true,
            dragName: 'node',
            droppAble: false,
            dropNames: [],
            clickAble: true,
        },
        size: new CanvaSize_6.CanvaSize(150, 150),
    };
    class MatchMessageNodeShape extends NodeShape_4.NodeShape {
        constructor(stage, options, data, size) {
            // console.error('MatchMessageNodeShape', options, data, size);
            const _options = Object.assign({}, defaults.options, options);
            const _data = Object.assign({}, defaults.nodeData, data);
            const _size = size ?? defaults.size;
            super(stage, _options, _data, _size);
            this.nodeUIHelper = null;
            _MatchMessageNodeShape_data.set(this, void 0);
            // this.addEventListener('click', (e: CanvaShapeEvent) => {
            //   console.error('OnMessageNodeShape click', e);
            //   // this.next();
            //   NodeFlow.execute(stage, this)
            // });
            // this.data = data;
            // console.error('viewConfig', viewConfig);
            // this.nodeUIHelper = new NodeUIHelper(this, this.stage.defaultLayer.ctx, 0, 0, 160, 180, viewConfig);
        }
        async execute(data) {
            // this.next();
            const regString = this.getInputValue(data?.regString, 'regString', '\\d+');
            let reg;
            try {
                reg = new RegExp(regString);
            }
            catch (error) {
                console.error('MatchMessageNodeShape execute error', error);
                return Promise.resolve(undefined);
            }
            const time = Intl.DateTimeFormat('zh-CN', {
                dateStyle: 'short',
                timeStyle: 'short',
            }).format(new Date());
            const msg = this.getInputValue(data?.default, 'default', time);
            if (msg === undefined || msg === null || msg.toString().length <= 0) {
                return Promise.resolve(undefined);
            }
            const isMatch = reg.test(msg);
            __classPrivateFieldSet(this, _MatchMessageNodeShape_data, {
                // _next: isMatch, // Math.round( Math.random() * 1  ) === 1,
                next: isMatch, // ? msg.match(reg)[0] : '',
                default: isMatch ? msg.match(reg)[0] : '',
            }, "f");
            const logData = {
                msg,
                regString,
                isMatch,
                matched: __classPrivateFieldGet(this, _MatchMessageNodeShape_data, "f").default,
            };
            console.debug('execute', logData);
            return new Promise((resolve) => {
                // console.debug(MatchMessageNodeShape.name, 'execute ing');
                setTimeout(() => {
                    // console.debug(MatchMessageNodeShape.name,'execute done');
                    resolve(__classPrivateFieldGet(this, _MatchMessageNodeShape_data, "f"));
                }, 400);
            });
            // return Promise.resolve(this.#data);
        }
        async getData() {
            return Promise.resolve(__classPrivateFieldGet(this, _MatchMessageNodeShape_data, "f"));
            // return new Promise((resolve) => {
            //   // console.info('Match Data ing');
            //   setTimeout(() => {
            //     // console.info('Match Data done');
            //     resolve(this.#data);
            //   }, 3000 )
            // });
        }
    }
    exports.MatchMessageNodeShape = MatchMessageNodeShape;
    _MatchMessageNodeShape_data = new WeakMap();
});
define("nodes/MessageNode/StartMessage", ["require", "exports", "node/NodeShape_", "canva/CanvaSize", "node/NodeFlow"], function (require, exports, NodeShape_5, CanvaSize_7, NodeFlow_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartMessageNodeShape = void 0;
    const defaults = {
        nodeData: {
            title: "Click To Start",
            icon: "flag_green",
            // lines: [],
            portLines: [
                {
                    next: {
                        name: "default",
                        type: "boolean",
                        value: true,
                    },
                },
            ],
        },
        options: {
            position: { x: 50, y: 50 },
            hoverAble: true,
            draggAble: true,
            dragName: 'node',
            droppAble: false,
            dropNames: [],
            clickAble: true,
        },
        size: new CanvaSize_7.CanvaSize(130, 70),
    };
    class StartMessageNodeShape extends NodeShape_5.NodeShape {
        constructor(stage, options, data, size) {
            // console.error('OnMessageNodeShape', options, data, size);
            const _options = Object.assign({}, defaults.options, options);
            const _data = Object.assign({}, defaults.nodeData, data);
            const _size = size ?? defaults.size;
            super(stage, _options, _data, _size);
            this.nodeUIHelper = null;
            this.addEventListener('click', (e) => {
                // console.error('OnMessageNodeShape click', e);
                // this.next();
                NodeFlow_2.NodeFlow.execute(stage, this);
            });
            // setInterval(() => {
            //   NodeFlow.execute(stage, this)
            // }, 10000);
            // this.data = data;
            // console.error('viewConfig', viewConfig);
            // this.nodeUIHelper = new NodeUIHelper(this, this.stage.defaultLayer.ctx, 0, 0, 160, 180, viewConfig);
        }
        // #data: { [index: string]: any } | undefined;
        async execute(data) {
            // this.next();
            // this.#data = await this.getData();
            return new Promise((resolve) => {
                // console.debug(OnMessageNodeShape.name, 'execute ing');
                setTimeout(() => {
                    // console.debug(OnMessageNodeShape.name,'execute done');
                    resolve(undefined);
                }, 400);
            });
            // return Promise.resolve(this.#data);
        }
    }
    exports.StartMessageNodeShape = StartMessageNodeShape;
});
define("nodes/MessageNode/ConstantMessage", ["require", "exports", "node/NodeShape_", "canva/CanvaSize"], function (require, exports, NodeShape_6, CanvaSize_8) {
    "use strict";
    var _ConstantMessageNodeShape_data;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConstantMessageNodeShape = void 0;
    const defaults = {
        nodeData: {
            title: "Constant Message",
            icon: "control_equalizer_blue",
            // lines: [],
            portLines: [
                // {
                //   prev: {
                //     name: "default",
                //     type: "boolean",
                //     value: true,
                //   },
                //   next: {
                //     name: "True",
                //     type: "boolean",
                //     value: true,
                //   },
                // },
                // {
                //   next: {
                //     name: "False",
                //     type: "boolean",
                //     value: false,
                //   },
                // },
                {
                    input: {
                        name: "boolean",
                        type: "boolean",
                        edit: {
                            default: 'true',
                            placeHolder: '请输入布尔值'
                        }
                    },
                    output: {
                        name: "boolean",
                        type: "boolean",
                    },
                },
                {
                    output: {
                        name: "booleanValue",
                        type: "string",
                    },
                },
                {
                    input: {
                        name: "number",
                        type: "number",
                        edit: {
                            default: '0',
                            placeHolder: '请输入字符串'
                        }
                    },
                    output: {
                        name: "number",
                        type: "number",
                    },
                },
                {
                    output: {
                        name: "numberValue",
                        type: "string",
                    },
                },
                {
                    input: {
                        name: "string",
                        type: "string",
                        edit: {
                            default: '',
                            placeHolder: '请输入字符串'
                        }
                    },
                    output: {
                        name: "string",
                        type: "string",
                    },
                },
            ],
        },
        options: {
            position: { x: 300, y: 100 },
            hoverAble: true,
            draggAble: true,
            dragName: 'node',
            droppAble: false,
            dropNames: [],
            clickAble: true,
        },
        size: new CanvaSize_8.CanvaSize(150, 150),
    };
    class ConstantMessageNodeShape extends NodeShape_6.NodeShape {
        constructor(stage, options, data, size) {
            // console.error('MatchMessageNodeShape', options, data, size);
            const _options = Object.assign({}, defaults.options, options);
            const _data = Object.assign({}, defaults.nodeData, data);
            const _size = size ?? defaults.size;
            super(stage, _options, _data, _size);
            this.nodeUIHelper = null;
            _ConstantMessageNodeShape_data.set(this, void 0);
            // this.addEventListener('click', (e: CanvaShapeEvent) => {
            //   console.error('OnMessageNodeShape click', e);
            //   // this.next();
            //   NodeFlow.execute(stage, this)
            // });
            // this.data = data;
            // console.error('viewConfig', viewConfig);
            // this.nodeUIHelper = new NodeUIHelper(this, this.stage.defaultLayer.ctx, 0, 0, 160, 180, viewConfig);
        }
        async execute(data) {
            return Promise.resolve(undefined);
            // const logData = {
            //   msg,
            //   regString,
            //   isMatch,
            //   matched: this.#data.default,
            // };
            // console.debug('execute', logData);
            // return new Promise((resolve) => {
            //   // console.debug(MatchMessageNodeShape.name, 'execute ing');
            //   setTimeout(() => {
            //     // console.debug(MatchMessageNodeShape.name,'execute done');
            //     resolve(this.#data);
            //   }, 400 )
            // });
            // return Promise.resolve(this.#data);
        }
        async getData() {
            const tempData = {
                'boolean': this.getInputValue(undefined, 'boolean', 'true'),
                'number': this.getInputValue(undefined, 'number', '0'),
                'string': this.getInputValue(undefined, 'string', '')
            };
            __classPrivateFieldSet(this, _ConstantMessageNodeShape_data, {
                'boolean': tempData.boolean.toString().toLowerCase() === 'true',
                'number': parseInt(tempData.number),
                'string': tempData.string,
                'booleanValue': '',
                'numberValue': '',
            }, "f");
            __classPrivateFieldGet(this, _ConstantMessageNodeShape_data, "f").booleanValue = __classPrivateFieldGet(this, _ConstantMessageNodeShape_data, "f").boolean.toString();
            __classPrivateFieldGet(this, _ConstantMessageNodeShape_data, "f").numberValue = __classPrivateFieldGet(this, _ConstantMessageNodeShape_data, "f").number.toString();
            return Promise.resolve(__classPrivateFieldGet(this, _ConstantMessageNodeShape_data, "f"));
            // return new Promise((resolve) => {
            //   // console.info('Match Data ing');
            //   setTimeout(() => {
            //     // console.info('Match Data done');
            //     resolve(this.#data);
            //   }, 3000 )
            // });
        }
    }
    exports.ConstantMessageNodeShape = ConstantMessageNodeShape;
    _ConstantMessageNodeShape_data = new WeakMap();
});
define("nodes/MessageNode/index", ["require", "exports", "nodes/MessageNode/OnMessage", "nodes/MessageNode/DelayMessage", "nodes/MessageNode/ConsoleMessage", "nodes/MessageNode/MatchMessage", "nodes/MessageNode/StartMessage", "nodes/MessageNode/ConstantMessage", "canva/CanvaStage_"], function (require, exports, OnMessage_1, DelayMessage_1, ConsoleMessage_1, MatchMessage_1, StartMessage_1, ConstantMessage_1, CanvaStage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shapeClassMap = exports.ConstantMessageNodeShape = exports.StartMessageNodeShape = exports.MatchMessageNodeShape = exports.ConsoleMessageNodeShape = exports.DelayMessageNodeShape = exports.OnMessageNodeShape = void 0;
    exports.addNodeShape = addNodeShape;
    exports.getStage = getStage;
    CanvaStage_1 = __importDefault(CanvaStage_1);
    Object.defineProperty(exports, "OnMessageNodeShape", { enumerable: true, get: function () { return OnMessage_1.OnMessageNodeShape; } });
    Object.defineProperty(exports, "DelayMessageNodeShape", { enumerable: true, get: function () { return DelayMessage_1.DelayMessageNodeShape; } });
    Object.defineProperty(exports, "ConsoleMessageNodeShape", { enumerable: true, get: function () { return ConsoleMessage_1.ConsoleMessageNodeShape; } });
    Object.defineProperty(exports, "MatchMessageNodeShape", { enumerable: true, get: function () { return MatchMessage_1.MatchMessageNodeShape; } });
    Object.defineProperty(exports, "StartMessageNodeShape", { enumerable: true, get: function () { return StartMessage_1.StartMessageNodeShape; } });
    Object.defineProperty(exports, "ConstantMessageNodeShape", { enumerable: true, get: function () { return ConstantMessage_1.ConstantMessageNodeShape; } });
    var stage = new CanvaStage_1.default("nodeStage1");
    function getStage(stageId) {
        return stage;
    }
    const shapeClassMap = {
        OnMessage: OnMessage_1.OnMessageNodeShape,
        DelayMessage: DelayMessage_1.DelayMessageNodeShape,
        ConsoleMessage: ConsoleMessage_1.ConsoleMessageNodeShape,
        MatchMessage: MatchMessage_1.MatchMessageNodeShape,
        StartMessage: StartMessage_1.StartMessageNodeShape,
        ConstantMessage: ConstantMessage_1.ConstantMessageNodeShape,
    };
    exports.shapeClassMap = shapeClassMap;
    // 工厂函数，根据类名返回相应的类实例
    function addNodeShape(stageId, nodeShapeClassName, options, data, size) {
        if (!nodeShapeClassName) {
            return;
        }
        const shapeClass = shapeClassMap[nodeShapeClassName];
        if (!shapeClass) {
            return;
        }
        const stage = getStage(stageId);
        const shape = new shapeClass(stage, options, data, size);
        stage.addShape(shape);
        return shape;
    }
});
define("demo/run", ["require", "exports", "nodes/MessageNode/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addNodeShape = exports.getStage = exports.shapeClassMap = exports.stage = void 0;
    Object.defineProperty(exports, "shapeClassMap", { enumerable: true, get: function () { return index_1.shapeClassMap; } });
    Object.defineProperty(exports, "getStage", { enumerable: true, get: function () { return index_1.getStage; } });
    Object.defineProperty(exports, "addNodeShape", { enumerable: true, get: function () { return index_1.addNodeShape; } });
    var stage = (0, index_1.getStage)("nodeStage1");
    exports.stage = stage;
    stage.render();
});
// setInterval(() => {
//   NodeFlow.execute(stage, msgNode0)
// }, 5000);
// let dragId = 0;
// function addShape() {
//   const x = Math.floor((Math.random() * stage.width) / stage.scale);
//   const y = Math.floor((Math.random() * stage.height) / stage.scale);
//   console.info("addShape", x, y);
//   // stage.addShape(
//   //   new CanvaShapeA(stage, {
//   //     position: { x, y },
//   //     hoverAble: true,
//   //     draggAble: true,
//   //     dragName: "shap" + dragId++,
//   //     droppAble: true,
//   //     dropNames: ["shap1", "shap2"],
//   //   })
//   // );
//   // stage.reflash();
// }
// import { AbstractNodeShape } from './NodeShape_Abstract'
// import { CanvaStage } from '../canva/CanvaStage_Base';
// import { ICanvaShapeOptions } from '../canva/CanvaShapeOptions';
// import { CanvaSize } from '../canva/CanvaSize';
// export class NodeShape extends AbstractNodeShape {
//   nodeUIHelper = null;
//   constructor(
//     stage: CanvaStage,
//     options: ICanvaShapeOptions,
//     data: NodeShapeData,
//   ) {
//     const size = new CanvaSize(180, 240);
//     super(stage, options, data, size);
//     // this.data = data;
//     // console.error('viewConfig', viewConfig);
//     // this.nodeUIHelper = new NodeUIHelper(this, this.stage.defaultLayer.ctx, 0, 0, 160, 180, viewConfig);
//   }
//   getData(): { [index: string]: any } {
//     return {
//       "output 1": 1001,
//       "output 2": 2002,
//       "output 3": 3003,
//       "output 4": 4004,
//     };
//   }
//   // getDragPath(ctx: CanvasRenderingContext2D): void {
//   //     if(!ctx) {
//   //       throw new Error("ctx is not defined");
//   //     }
//   //     // this.nodeUIHelper.ctx = ctx;
//   // }
//   // getPath(ctx: CanvasRenderingContext2D): void {
//   //   if(!ctx) {
//   //     throw new Error("ctx is not defined");
//   //   }
//   //   // this.nodeUIHelper.ctx = ctx;
//   //   // this.nodeUIHelper.getPath();
//   //   // ctx.beginPath();
//   //   // ctx.roundRect(0, 0, 30, 30, 8);
//   //   // ctx.closePath();
//   // }
//   // draw() {
//   //   // if(!this.nodeUIHelper.ctx) {
//   //   //   return;
//   //   // }
//   //   // this.nodeUIHelper.drawNodeBg();
//   //   // this.nodeUIHelper.drawHeader(this.data.title, this.data.icon);
//   //   // for (let i = 0; i < this.data.lines.length; i++) {
//   //   //   const line = this.data.lines[i];
//   //   //   this.nodeUIHelper.drawLine(line, i);
//   //   // }
//   // }
//   // getPath(ctx: CanvasRenderingContext2D) {
//   //   // const ctx = this.stage.defaultLayer.ctx;
//   //   ctx.beginPath();
//   //   ctx.roundRect(
//   //     0,
//   //     0,
//   //     this.hasChildren ? 60 : 30,
//   //     this.hasChildren ? 60 : 30,
//   //     8
//   //   );
//   //   ctx.closePath();
//   // }
//   // getDragPath(ctx: CanvasRenderingContext2D): void {
//   //   ctx.beginPath();
//   //   ctx.roundRect(0, 0, 30, 15, 8);
//   //   ctx.closePath();
//   // }
//   // draw(ctx: CanvasRenderingContext2D, pos?: CanvaPosition, e?: MouseEvent) {
//   //   // , isHover, isDraging, isDropping
//   //   ctx.fillStyle =
//   //     this.isHovering || this.isDragging
//   //       ? this.hasChildren
//   //         ? "blue"
//   //         : "yellow"
//   //       : "#111111";
//   //   // if (ctx.isDragging) {
//   //   //   ctx.translate(this.position.x, this.position.y);
//   //   // }
//   //   ctx.fill();
//   // }
// }
define("node/NodeShape_LineOptional", ["require", "exports", "canva/CanvaShape_Abstract"], function (require, exports, CanvaShape_Abstract_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeShapeLineOptional = void 0;
    class NodeShapeLineOptional extends CanvaShape_Abstract_6.AbstractCanvaShape {
        constructor(stage, options, data) {
            super(stage, options, data.uuid);
        }
        getPath(ctx) {
            // const ctx = this.stage.defaultLayer.ctx;
            ctx.beginPath();
            ctx.roundRect(0, 0, this.hasChildren ? 60 : 16, this.hasChildren ? 60 : 16, 8);
            ctx.closePath();
        }
        // getDragPath(ctx: CanvasRenderingContext2D): void {
        //   ctx.beginPath();
        //   ctx.roundRect(0, 0, 30, 15, 8);
        //   ctx.closePath();
        // }
        draw(ctx, pos, e) {
            // , isHover, isDraging, isDropping
            ctx.fillStyle =
                this.isHovering || this.isDragging
                    ? this.hasChildren
                        ? "blue"
                        : "yellow"
                    : "#111111";
            // if (ctx.isDragging) {
            //   ctx.translate(this.position.x, this.position.y);
            // }
            ctx.fill();
        }
    }
    exports.NodeShapeLineOptional = NodeShapeLineOptional;
});
// import { ICanvaShapeOptions } from "@/canva/CanvaShapeOptions";
// import { CanvaStage } from "@/canva/CanvaStage_Base";
// import { NodeShapeLineBase } from "../NodeShape_LineBase";
// import { NodeShapeLinePrev } from "../NodeShape_LinePrev";
// import { CanvaPosition } from "@/canva/CanvaPosition";
// class NodeShapePort_Factory {
//     static create(
//       line: NodeShapePortLineData,
//       stage: CanvaStage,
//       options: ICanvaShapeOptions,
//       data: Partial<NodeShapePortBaseData>): NodeShapeLineBase | undefined {
//         if(line.prev) {
//           return new NodeShapeLinePrev(
//             stage,
//             {
//               position: new CanvaPosition(
//                 0 + NodeShapeUIConfig.body.paddingLeft,
//                 y
//               ),
//               hoverAble: true,
//               draggAble: true,
//               dragName: "type_flow_prev",
//               droppAble: true,
//               dropNames: ["type_flow_next"],
//               clickAble: true,
//             },
//             line.prev,
//           );
//         }
//     }
// }
