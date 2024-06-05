import {
  ExclamationTriangleIcon,
  InfoCircleIcon
} from "./chunk-YGLLAPXL.js";
import {
  CheckIcon
} from "./chunk-KIFSE2SV.js";
import {
  TimesCircleIcon
} from "./chunk-LZPXVJS2.js";
import "./chunk-6BAXN7LJ.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle
} from "./chunk-NIOFTOD7.js";
import "./chunk-LH5FHRHW.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation$1,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-AG4Y745J.js";
import "./chunk-KT3RQDJZ.js";
import "./chunk-LMFWYZLC.js";
import "./chunk-RVQ3RH6Y.js";

// node_modules/primeng/fesm2022/primeng-message.mjs
function UIMessage_CheckIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "CheckIcon", 4);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-inline-message-icon");
  }
}
function UIMessage_InfoCircleIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "InfoCircleIcon", 4);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-inline-message-icon");
  }
}
function UIMessage_TimesCircleIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "TimesCircleIcon", 4);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-inline-message-icon");
  }
}
function UIMessage_ExclamationTriangleIcon_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ExclamationTriangleIcon", 4);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-inline-message-icon");
  }
}
function UIMessage_div_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 6);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r0.text, ɵɵsanitizeHtml);
  }
}
function UIMessage_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, UIMessage_div_5_span_1_Template, 1, 1, "span", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.escape);
  }
}
function UIMessage_ng_template_6_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 8);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.text);
  }
}
function UIMessage_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, UIMessage_ng_template_6_span_0_Template, 2, 1, "span", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r0.escape);
  }
}
var UIMessage = class _UIMessage {
  /**
   * Severity level of the message.
   * @group Props
   */
  severity;
  /**
   * Text content.
   * @group Props
   */
  text;
  /**
   * Whether displaying messages would be escaped or not.
   * @group Props
   */
  escape = true;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  get icon() {
    if (this.severity) {
      return this.severity === "success" ? "success" : this.severity === "info" ? "info" : this.severity === "warning" ? "warn" : this.severity === "danger" ? "error" : "info";
    } else {
      return "info";
    }
  }
  get containerClass() {
    return {
      [`p-inline-message-${this.severity}`]: this.severity,
      "p-inline-message-icon-only": this.text == null
    };
  }
  static ɵfac = function UIMessage_Factory(t) {
    return new (t || _UIMessage)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _UIMessage,
    selectors: [["p-message"]],
    hostAttrs: [1, "p-element"],
    inputs: {
      severity: "severity",
      text: "text",
      escape: [2, "escape", "escape", booleanAttribute],
      style: "style",
      styleClass: "styleClass"
    },
    features: [ɵɵInputTransformsFeature],
    decls: 8,
    vars: 10,
    consts: [["escapeOut", ""], ["aria-live", "polite", 1, "p-inline-message", "p-component", "p-inline-message", 3, "ngStyle", "ngClass"], [3, "styleClass", 4, "ngIf"], [4, "ngIf", "ngIfElse"], [3, "styleClass"], ["class", "p-inline-message-text", 3, "innerHTML", 4, "ngIf"], [1, "p-inline-message-text", 3, "innerHTML"], ["class", "p-inline-message-text", 4, "ngIf"], [1, "p-inline-message-text"]],
    template: function UIMessage_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 1);
        ɵɵtemplate(1, UIMessage_CheckIcon_1_Template, 1, 1, "CheckIcon", 2)(2, UIMessage_InfoCircleIcon_2_Template, 1, 1, "InfoCircleIcon", 2)(3, UIMessage_TimesCircleIcon_3_Template, 1, 1, "TimesCircleIcon", 2)(4, UIMessage_ExclamationTriangleIcon_4_Template, 1, 1, "ExclamationTriangleIcon", 2)(5, UIMessage_div_5_Template, 2, 1, "div", 3)(6, UIMessage_ng_template_6_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        const escapeOut_r2 = ɵɵreference(7);
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngStyle", ctx.style)("ngClass", ctx.containerClass);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.icon === "success");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.icon === "info");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.icon === "error");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.icon === "warn");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.escape)("ngIfElse", escapeOut_r2);
      }
    },
    dependencies: () => [NgClass, NgIf, NgStyle, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon],
    styles: ["@layer primeng{.p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UIMessage, [{
    type: Component,
    args: [{
      selector: "p-message",
      template: `
        <div aria-live="polite" class="p-inline-message p-component p-inline-message" [ngStyle]="style" [class]="styleClass" [ngClass]="containerClass">
            <CheckIcon *ngIf="icon === 'success'" [styleClass]="'p-inline-message-icon'" />
            <InfoCircleIcon *ngIf="icon === 'info'" [styleClass]="'p-inline-message-icon'" />
            <TimesCircleIcon *ngIf="icon === 'error'" [styleClass]="'p-inline-message-icon'" />
            <ExclamationTriangleIcon *ngIf="icon === 'warn'" [styleClass]="'p-inline-message-icon'" />
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{ text }}</span>
            </ng-template>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "p-element"
      },
      styles: ["@layer primeng{.p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}}\n"]
    }]
  }], null, {
    severity: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    escape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var MessageModule = class _MessageModule {
  static ɵfac = function MessageModule_Factory(t) {
    return new (t || _MessageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MessageModule,
    declarations: [UIMessage],
    imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon],
    exports: [UIMessage]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon],
      exports: [UIMessage],
      declarations: [UIMessage]
    }]
  }], null, null);
})();
export {
  MessageModule,
  UIMessage
};
//# sourceMappingURL=primeng_message.js.map
