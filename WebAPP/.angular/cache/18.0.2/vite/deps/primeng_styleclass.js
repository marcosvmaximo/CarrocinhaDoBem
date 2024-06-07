import {
  DomHandler
} from "./chunk-TKJMWDM5.js";
import {
  CommonModule
} from "./chunk-ZEIXLDWD.js";
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgModule,
  NgZone,
  Renderer2,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-KIKK4YUN.js";
import "./chunk-MOY5LPCH.js";
import "./chunk-MJQNUHK2.js";
import "./chunk-SAI3DHVA.js";
import "./chunk-J4B6MK7R.js";

// node_modules/primeng/fesm2022/primeng-styleclass.mjs
var StyleClass = class _StyleClass {
  el;
  renderer;
  zone;
  constructor(el, renderer, zone) {
    this.el = el;
    this.renderer = renderer;
    this.zone = zone;
  }
  /**
   * Selector to define the target element. Available selectors are '@next', '@prev', '@parent' and '@grandparent'.
   * @group Props
   */
  selector;
  /**
   * Style class to add when item begins to get displayed.
   * @group Props
   * @deprecated Use enterFromClass instead
   */
  set enterClass(value) {
    this._enterClass = value;
    console.warn("enterClass is deprecated, use enterFromClass instead");
  }
  get enterClass() {
    return this._enterClass;
  }
  /**
   * Style class to add when item begins to get displayed.
   * @group Props
   */
  enterFromClass;
  /**
   * Style class to add during enter animation.
   * @group Props
   */
  enterActiveClass;
  /**
   * Style class to add when item begins to get displayed.
   * @group Props
   */
  enterToClass;
  /**
   * Style class to add when item begins to get hidden.
   * @group Props
   * @deprecated Use leaveFromClass instead
   */
  set leaveClass(value) {
    this._leaveClass = value;
    console.warn("leaveClass is deprecated, use leaveFromClass instead");
  }
  get leaveClass() {
    return this._leaveClass;
  }
  /**
   * Style class to add when item begins to get hidden.
   * @group Props
   */
  leaveFromClass;
  /**
   * Style class to add during leave animation.
   * @group Props
   */
  leaveActiveClass;
  /**
   * Style class to add when leave animation is completed.
   * @group Props
   */
  leaveToClass;
  /**
   * Whether to trigger leave animation when outside of the element is clicked.
   * @group Props
   */
  hideOnOutsideClick;
  /**
   * Adds or removes a class when no enter-leave animation is required.
   * @group Props
   */
  toggleClass;
  /**
   * Whether to trigger leave animation when escape key pressed.
   * @group Props
   */
  hideOnEscape;
  eventListener;
  documentClickListener;
  documentKeydownListener;
  target;
  enterListener;
  leaveListener;
  animating;
  _enterClass;
  _leaveClass;
  clickListener() {
    this.target = this.resolveTarget();
    if (this.toggleClass) {
      this.toggle();
    } else {
      if (this.target.offsetParent === null)
        this.enter();
      else
        this.leave();
    }
  }
  toggle() {
    if (DomHandler.hasClass(this.target, this.toggleClass))
      DomHandler.removeClass(this.target, this.toggleClass);
    else
      DomHandler.addClass(this.target, this.toggleClass);
  }
  enter() {
    if (this.enterActiveClass) {
      if (!this.animating) {
        this.animating = true;
        if (this.enterActiveClass === "slidedown") {
          this.target.style.height = "0px";
          DomHandler.removeClass(this.target, "hidden");
          this.target.style.maxHeight = this.target.scrollHeight + "px";
          DomHandler.addClass(this.target, "hidden");
          this.target.style.height = "";
        }
        DomHandler.addClass(this.target, this.enterActiveClass);
        if (this.enterClass || this.enterFromClass) {
          DomHandler.removeClass(this.target, this.enterClass || this.enterFromClass);
        }
        this.enterListener = this.renderer.listen(this.target, "animationend", () => {
          DomHandler.removeClass(this.target, this.enterActiveClass);
          if (this.enterToClass) {
            DomHandler.addClass(this.target, this.enterToClass);
          }
          this.enterListener && this.enterListener();
          if (this.enterActiveClass === "slidedown") {
            this.target.style.maxHeight = "";
          }
          this.animating = false;
        });
      }
    } else {
      if (this.enterClass || this.enterFromClass) {
        DomHandler.removeClass(this.target, this.enterClass || this.enterFromClass);
      }
      if (this.enterToClass) {
        DomHandler.addClass(this.target, this.enterToClass);
      }
    }
    if (this.hideOnOutsideClick) {
      this.bindDocumentClickListener();
    }
    if (this.hideOnEscape) {
      this.bindDocumentKeydownListener();
    }
  }
  leave() {
    if (this.leaveActiveClass) {
      if (!this.animating) {
        this.animating = true;
        DomHandler.addClass(this.target, this.leaveActiveClass);
        if (this.leaveClass || this.leaveFromClass) {
          DomHandler.removeClass(this.target, this.leaveClass || this.leaveFromClass);
        }
        this.leaveListener = this.renderer.listen(this.target, "animationend", () => {
          DomHandler.removeClass(this.target, this.leaveActiveClass);
          if (this.leaveToClass) {
            DomHandler.addClass(this.target, this.leaveToClass);
          }
          this.leaveListener && this.leaveListener();
          this.animating = false;
        });
      }
    } else {
      if (this.leaveClass || this.leaveFromClass) {
        DomHandler.removeClass(this.target, this.leaveClass || this.leaveFromClass);
      }
      if (this.leaveToClass) {
        DomHandler.addClass(this.target, this.leaveToClass);
      }
    }
    if (this.hideOnOutsideClick) {
      this.unbindDocumentClickListener();
    }
    if (this.hideOnEscape) {
      this.unbindDocumentKeydownListener();
    }
  }
  resolveTarget() {
    if (this.target) {
      return this.target;
    }
    switch (this.selector) {
      case "@next":
        return this.el.nativeElement.nextElementSibling;
      case "@prev":
        return this.el.nativeElement.previousElementSibling;
      case "@parent":
        return this.el.nativeElement.parentElement;
      case "@grandparent":
        return this.el.nativeElement.parentElement.parentElement;
      default:
        return document.querySelector(this.selector);
    }
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(this.el.nativeElement.ownerDocument, "click", (event) => {
        if (!this.isVisible() || getComputedStyle(this.target).getPropertyValue("position") === "static")
          this.unbindDocumentClickListener();
        else if (this.isOutsideClick(event))
          this.leave();
      });
    }
  }
  bindDocumentKeydownListener() {
    if (!this.documentKeydownListener) {
      this.zone.runOutsideAngular(() => {
        this.documentKeydownListener = this.renderer.listen(this.el.nativeElement.ownerDocument, "keydown", (event) => {
          const {
            key,
            keyCode,
            which,
            type
          } = event;
          if (!this.isVisible() || getComputedStyle(this.target).getPropertyValue("position") === "static")
            this.unbindDocumentKeydownListener();
          if (this.isVisible() && key === "Escape" && keyCode === 27 && which === 27)
            this.leave();
        });
      });
    }
  }
  isVisible() {
    return this.target.offsetParent !== null;
  }
  isOutsideClick(event) {
    return !this.el.nativeElement.isSameNode(event.target) && !this.el.nativeElement.contains(event.target) && !this.target.contains(event.target);
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  unbindDocumentKeydownListener() {
    if (this.documentKeydownListener) {
      this.documentKeydownListener();
      this.documentKeydownListener = null;
    }
  }
  ngOnDestroy() {
    this.target = null;
    if (this.eventListener) {
      this.eventListener();
    }
    this.unbindDocumentClickListener();
    this.unbindDocumentKeydownListener();
  }
  static ɵfac = function StyleClass_Factory(t) {
    return new (t || _StyleClass)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _StyleClass,
    selectors: [["", "pStyleClass", ""]],
    hostAttrs: [1, "p-element"],
    hostBindings: function StyleClass_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function StyleClass_click_HostBindingHandler($event) {
          return ctx.clickListener($event);
        });
      }
    },
    inputs: {
      selector: [0, "pStyleClass", "selector"],
      enterClass: "enterClass",
      enterFromClass: "enterFromClass",
      enterActiveClass: "enterActiveClass",
      enterToClass: "enterToClass",
      leaveClass: "leaveClass",
      leaveFromClass: "leaveFromClass",
      leaveActiveClass: "leaveActiveClass",
      leaveToClass: "leaveToClass",
      hideOnOutsideClick: [2, "hideOnOutsideClick", "hideOnOutsideClick", booleanAttribute],
      toggleClass: "toggleClass",
      hideOnEscape: [2, "hideOnEscape", "hideOnEscape", booleanAttribute]
    },
    features: [ɵɵInputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleClass, [{
    type: Directive,
    args: [{
      selector: "[pStyleClass]",
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }], {
    selector: [{
      type: Input,
      args: ["pStyleClass"]
    }],
    enterClass: [{
      type: Input
    }],
    enterFromClass: [{
      type: Input
    }],
    enterActiveClass: [{
      type: Input
    }],
    enterToClass: [{
      type: Input
    }],
    leaveClass: [{
      type: Input
    }],
    leaveFromClass: [{
      type: Input
    }],
    leaveActiveClass: [{
      type: Input
    }],
    leaveToClass: [{
      type: Input
    }],
    hideOnOutsideClick: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    toggleClass: [{
      type: Input
    }],
    hideOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    clickListener: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var StyleClassModule = class _StyleClassModule {
  static ɵfac = function StyleClassModule_Factory(t) {
    return new (t || _StyleClassModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _StyleClassModule,
    declarations: [StyleClass],
    imports: [CommonModule],
    exports: [StyleClass]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleClassModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [StyleClass],
      declarations: [StyleClass]
    }]
  }], null, null);
})();
export {
  StyleClass,
  StyleClassModule
};
//# sourceMappingURL=primeng_styleclass.js.map
