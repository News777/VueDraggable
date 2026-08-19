import { defineComponent as fe, reactive as ke, computed as E, ref as Te, watch as X, onUnmounted as ze, openBlock as Y, createElementBlock as j, normalizeStyle as le, normalizeClass as re, Fragment as Ae, renderList as Ie, withDirectives as He, withModifiers as se, vShow as Ee, renderSlot as Le } from "vue";
import ee from "decimal.js";
const he = 2, Be = 1, f = (n, h = 1) => {
  if (n == null || n === "")
    return h;
  const g = typeof n == "string" ? parseFloat(n) : n;
  return isNaN(g) ? h : g;
}, We = (n, h, g = !1, a = he) => {
  const v = f(h, Be), t = f(n);
  if (v === 0)
    return g ? new ee(t).toDecimalPlaces(a).toNumber() : Math.round(t);
  const o = t / v;
  return g ? new ee(o).toDecimalPlaces(a).toNumber() : Math.round(o);
}, q = (n, h = "px") => n == null || n === "" ? "0" : `${n}${h}`, V = (n, h, g, a = !0) => a ? Math.min(Math.max(n, h), g) : n;
function U(n, h, g, a) {
  n && n.addEventListener(h, g, a);
}
function A(n, h, g, a) {
  n && n.removeEventListener(h, g, a);
}
const w = (n, h = 1, g = he) => {
  const a = new ee(n).toDecimalPlaces(g).toNumber();
  return f(a, h);
}, L = (n) => {
  if (n === null || typeof n != "object")
    return n;
  if (n instanceof Date)
    return new Date(n.getTime());
  if (n instanceof Array)
    return n.map((h) => L(h));
  if (n instanceof Object) {
    const h = {};
    for (const g in n)
      n.hasOwnProperty(g) && (h[g] = L(n[g]));
    return h;
  }
  return n;
}, ue = (n) => {
  if ("touches" in n && n.touches.length > 0)
    return {
      x: n.touches[0].clientX,
      y: n.touches[0].clientY
    };
  if ("changedTouches" in n && n.changedTouches.length > 0)
    return {
      x: n.changedTouches[0].clientX,
      y: n.changedTouches[0].clientY
    };
  const h = n;
  return {
    x: h.clientX,
    y: h.clientY
  };
}, B = (n, h = 0) => {
  if (n == null || n === "")
    return h;
  const g = typeof n == "string" ? Number(n) : n;
  return Number.isFinite(g) ? g : h;
}, ce = (n, h, g) => Math.min(Math.max(n, h), g), de = () => ({
  left: 0,
  top: 0,
  width: 200,
  height: 100,
  zIndex: 1
}), Pe = (n) => ({
  left: B(n.left, 0),
  top: B(n.top, 0),
  width: B(n.width, 0),
  height: B(n.height, 0),
  zIndex: B(n.zIndex, 1)
}), Fe = ["onMousedown", "onTouchstart"], Re = fe({
  name: "VueMovableBox"
}), Ne = /* @__PURE__ */ fe({
  ...Re,
  props: {
    theme: { default: "#409EFD" },
    inActiveColor: { default: "#666666" },
    unitType: { default: "px" },
    scale: { default: 1 },
    isKeepDecimals: { type: Boolean, default: !1 },
    decimalPlaces: { default: 2 },
    draggable: { type: Boolean, default: !0 },
    resizable: { type: Boolean, default: !0 },
    resizeable: { type: Boolean, default: void 0 },
    limitAreaForParent: { type: Boolean, default: !0 },
    limitAreaClass: {},
    modelValue: { default: () => ({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      zIndex: 1
    }) },
    maxWidth: {},
    maxHeight: {},
    minWidth: { default: 0 },
    minHeight: { default: 0 },
    ratioLock: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabledUserSelect: { type: Boolean, default: !0 },
    handles: { default: () => ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"] },
    disabled: { type: Boolean, default: !1 },
    initRect: { type: Boolean, default: !1 },
    edgeDistance: { default: 0 },
    snapToGrid: { type: Boolean, default: !1 },
    gridSize: { default: 20 },
    dragDirections: { default: () => ["top", "bottom", "left", "right"] },
    resizeDirections: { default: () => ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"] },
    enableTransition: { type: Boolean, default: !1 },
    keyboardEnabled: { type: Boolean, default: !1 },
    keyboardStep: { default: 1 },
    boundsMargin: { default: () => ({ top: 0, right: 0, bottom: 0, left: 0 }) },
    snapToElements: { type: Boolean, default: !1 },
    snapThreshold: { default: 10 },
    collisionEnabled: { type: Boolean, default: !1 },
    allowOverlap: { type: Boolean, default: !1 },
    snapTargets: { default: () => [] }
  },
  emits: ["update:modelValue", "drag", "drag-start", "drag-stop", "resize-start", "resize-stop", "active", "inactive", "disabled", "dblclick", "out-of-bounds", "move", "resize", "snap", "guides", "collision"],
  setup(n, { expose: h, emit: g }) {
    const a = n, v = g, t = ke({
      beforeClickConfig: de(),
      initX: 0,
      initY: 0,
      parentElement: null,
      parentRectArea: null,
      ele: null,
      parentInfo: { width: 0, height: 0 },
      active: a.active,
      handle: null,
      rate: 1,
      isDragging: !1,
      isResizing: !1
    }), o = E({
      get() {
        return a.modelValue;
      },
      set(e) {
        v("update:modelValue", e);
      }
    }), O = Te(), ve = E(() => ({
      borderColor: a.disabled ? a.inActiveColor : t.active ? a.theme : a.inActiveColor,
      left: q(o.value.left, a.unitType),
      top: q(o.value.top, a.unitType),
      width: q(o.value.width, a.unitType),
      height: q(o.value.height, a.unitType),
      zIndex: o.value.zIndex,
      cursor: a.disabled ? "not-allowed" : t.isDragging ? "move" : t.isResizing ? "nwse-resize" : "default",
      pointerEvents: a.disabled ? "none" : "auto",
      opacity: t.active ? 1 : 0.9,
      // 硬件加速
      transform: "translateZ(0)",
      willChange: t.isDragging || t.isResizing ? "left, top, width, height" : "auto",
      // 过渡动画（仅在启用且非拖拽时）
      transition: a.enableTransition && !t.isDragging && !t.isResizing ? "left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease" : "none"
    })), pe = E(() => ({
      borderColor: W.value ? a.theme : a.inActiveColor,
      scale: w(1 / f(a.scale, 1), 1)
    })), y = E(() => a.unitType === "%"), W = E(() => a.resizable ?? a.resizeable ?? !0), k = E(() => {
      const e = f(a.maxWidth, 0), i = a.limitAreaForParent ? e > t.parentInfo.width || !e ? t.parentInfo.width : e : 1 / 0;
      return y.value && (e ? Math.min(100, e) : 100) || i;
    }), x = E(() => {
      const e = f(a.maxHeight, 0), i = a.limitAreaForParent ? e > t.parentInfo.height || !e ? t.parentInfo.height : e : 1 / 0;
      return y.value && (e ? Math.min(100, e) : 100) || i;
    }), G = E(() => a.limitAreaForParent ? 0 : -1 / 0), K = E(() => a.limitAreaForParent ? 0 : -1 / 0);
    X(
      () => a.active,
      (e, i) => {
        e !== i && (t.active = e, v(e ? "active" : "inactive", L(o.value)));
      }
    ), X(
      () => a.disabled,
      (e) => {
        v("disabled", e);
      }
    ), X(
      () => a.isKeepDecimals,
      (e, i) => {
        e !== i && i === !0 && e === !1 && (o.value.left = Math.round(o.value.left), o.value.top = Math.round(o.value.top), o.value.width = Math.round(o.value.width), o.value.height = Math.round(o.value.height), v("update:modelValue", L(o.value)));
      }
    );
    const be = () => {
      var e;
      t.ele = document.documentElement || ((e = O.value) == null ? void 0 : e.parentElement) || O.value;
    }, c = (e, i) => {
      const l = y.value ? i === "w" ? f(e, 0) / t.parentInfo.width * 100 : f(e, 0) / t.parentInfo.height * 100 : e;
      return We(l, a.scale, a.isKeepDecimals, a.decimalPlaces);
    }, we = (e) => a.resizeDirections.includes(e), _ = (e) => a.dragDirections.includes(e), P = (e) => {
      if (!a.snapToGrid) return e;
      const i = a.gridSize || 20;
      return Math.round(e / i) * i;
    }, Me = (e) => {
      if (!a.keyboardEnabled || a.disabled || !t.active) return;
      const i = a.keyboardStep || 1;
      let l = !1, r = B(o.value.left), s = B(o.value.top);
      switch (e.key) {
        case "ArrowUp":
          _("top") && (s = P(Number(s) - i), l = !0);
          break;
        case "ArrowDown":
          _("bottom") && (s = P(Number(s) + i), l = !0);
          break;
        case "ArrowLeft":
          _("left") && (r = P(Number(r) - i), l = !0);
          break;
        case "ArrowRight":
          _("right") && (r = P(Number(r) + i), l = !0);
          break;
        case "Escape":
          t.active = !1;
          break;
        default:
          return;
      }
      if (l) {
        e.preventDefault();
        const d = xe();
        r = Math.max(d.minLeft, Math.min(d.maxLeft, r)), s = Math.max(d.minTop, Math.min(d.maxTop, s)), o.value.left = w(r), o.value.top = w(s), v("update:modelValue", { ...o.value }), v("move", { ...o.value });
      }
    }, xe = () => {
      const e = a.boundsMargin || { top: 0, right: 0, bottom: 0, left: 0 }, i = a.edgeDistance || 0, l = e.top || 0, r = e.right || 0, s = e.bottom || 0, d = e.left || 0;
      let p = d || i, z = y.value ? 100 - r - i - Number(o.value.width) : t.parentInfo.width - r - i - Number(o.value.width), T = l || i, M = y.value ? 100 - s - i - Number(o.value.height) : t.parentInfo.height - s - i - Number(o.value.height);
      return a.limitAreaForParent && (y.value || (p = Math.max(0, d), T = Math.max(0, l))), { minLeft: p, maxLeft: Math.max(p, z), minTop: T, maxTop: Math.max(T, M) };
    }, te = (e, i = null) => {
      ie(e, i);
    }, ae = (e, i = null) => {
      e.cancelable && e.preventDefault(), ie(e, i);
    }, ie = (e, i) => {
      var d, p, z, T;
      if (a.disabled || a.initRect || !a.draggable && !W.value || !i && !a.draggable || i && !W.value) return;
      const { x: l, y: r } = ue(e);
      t.initX = l, t.initY = r, t.beforeClickConfig = L(o.value), t.active || (t.active = !0, v("active", L(o.value))), a.draggable && !i && (t.isDragging = !0, v("drag-start", e, t.beforeClickConfig)), W.value && i && (t.isResizing = !0, v("resize-start", e, t.beforeClickConfig)), a.limitAreaForParent && (t.parentElement = a.limitAreaClass ? document.querySelector(a.limitAreaClass) || ((d = O.value) == null ? void 0 : d.parentElement) || null : ((p = O.value) == null ? void 0 : p.parentElement) || null, t.parentElement && (t.parentRectArea = t.parentElement.getBoundingClientRect(), t.parentInfo.height = ((z = t.parentElement) == null ? void 0 : z.clientHeight) || 0, t.parentInfo.width = ((T = t.parentElement) == null ? void 0 : T.clientWidth) || 0)), t.active = !0, t.handle = i, a.ratioLock && (t.rate = w(
        f(t.beforeClickConfig.width, 1) / f(t.beforeClickConfig.height, 1),
        1
      ));
      const s = { passive: !1 };
      U(t.ele, "mousemove", Z, s), U(t.ele, "mouseup", N, s), U(t.ele, "touchmove", J, s), U(t.ele, "touchend", Q, s), U(t.ele, "mouseleave", N, s);
    }, Z = (e) => {
      ne(e);
    }, J = (e) => {
      e.cancelable && e.preventDefault(), ne(e);
    };
    let I = null, $ = !1;
    const ne = (e) => {
      t.active && ($ = !0, I === null && (I = requestAnimationFrame(() => {
        if (I = null, !$) return;
        const { x: i, y: l } = ue(e), r = f(t.beforeClickConfig.left, 0), s = f(t.beforeClickConfig.top, 0), d = f(t.beforeClickConfig.width, 0), p = f(t.beforeClickConfig.height, 0), z = i - t.initX, T = l - t.initY;
        if (t.isDragging) {
          const M = r + c(z, "w"), m = s + c(T, "h");
          De(M, m, d, p);
          let u = w(M), b = w(m);
          a.snapToGrid && (u = P(u), b = P(b)), o.value.left = V(
            u,
            G.value,
            y.value ? 100 : t.parentInfo.width - d,
            a.limitAreaForParent
          ), o.value.top = V(
            b,
            K.value,
            y.value ? 100 : t.parentInfo.height - p,
            a.limitAreaForParent
          );
          const H = Pe(o.value);
          v("move", H), v("drag", H);
        }
        t.isResizing && t.handle && (ye(r, s, d, p, z, T), v("resize", {
          left: o.value.left,
          top: o.value.top,
          width: o.value.width,
          height: o.value.height
        })), $ = !1;
      })));
    }, ye = (e, i, l, r, s, d) => {
      var T;
      const p = l / r || 1, z = {
        tl: () => {
          if (a.ratioLock) {
            const M = c(s, "w"), m = c(d, "h");
            let u = e + l - M, b = i + r - m, H = u - e, S = b - i;
            H / S > p ? H = S * p : S = H / p, H = Math.max(
              f(a.minWidth, 20),
              Math.min(H, k.value - e)
            ), S = Math.max(
              f(a.minHeight, 20),
              Math.min(S, x.value - i)
            ), D(w(H), k.value - e), C(w(S), x.value - i), F(e + l - o.value.width), R(i + r - o.value.height);
          } else
            D(l - c(s, "w"), e + l), C(r - c(d, "h"), i + r), F(e + c(s, "w")), R(i + c(d, "h"));
        },
        tm: () => {
          if (a.ratioLock) {
            const M = c(d, "h");
            let m = r - M;
            m = Math.max(
              f(a.minHeight, 20),
              Math.min(m, x.value - i)
            );
            const u = m * p;
            C(w(m), x.value - i), D(w(u), k.value - e), R(i + r - o.value.height);
          } else
            C(r - c(d, "h"), i + r), R(i + c(d, "h"));
        },
        tr: () => {
          if (a.ratioLock) {
            const M = c(s, "w"), m = c(d, "h");
            let u = l + M, b = r - m;
            u / b > p ? u = b * p : b = u / p, u = Math.max(
              f(a.minWidth, 20),
              Math.min(u, k.value - e)
            ), b = Math.max(
              f(a.minHeight, 20),
              Math.min(b, x.value - i)
            ), D(w(u), k.value - e), C(w(b), x.value - i), R(i + r - o.value.height);
          } else
            C(r - c(d, "h"), i + r), R(i + c(d, "h")), D(l + c(s, "w"), k.value - e);
        },
        mr: () => {
          if (a.ratioLock) {
            const M = c(s, "w");
            let m = l + M;
            m = Math.max(
              f(a.minWidth, 20),
              Math.min(m, k.value - e)
            );
            const u = m / p;
            D(w(m), k.value - e), C(w(u), x.value - i);
          } else
            D(l + c(s, "w"), k.value - e);
        },
        br: () => {
          if (a.ratioLock) {
            const M = c(s, "w"), m = c(d, "h");
            let u = l + M, b = r + m;
            u / b > p ? u = b * p : b = u / p, u = Math.max(
              f(a.minWidth, 20),
              Math.min(u, k.value - e)
            ), b = Math.max(
              f(a.minHeight, 20),
              Math.min(b, x.value - i)
            ), D(w(u), k.value - e), C(w(b), x.value - i);
          } else
            D(l + c(s, "w"), k.value - e), C(r + c(d, "h"), x.value - i);
        },
        bm: () => {
          if (a.ratioLock) {
            const M = c(d, "h");
            let m = r + M;
            m = Math.max(
              f(a.minHeight, 20),
              Math.min(m, x.value - i)
            );
            const u = m * p;
            C(w(m), x.value - i), D(w(u), k.value - e);
          } else
            C(r + c(d, "h"), x.value - i);
        },
        bl: () => {
          if (a.ratioLock) {
            const M = c(s, "w"), m = c(d, "h");
            let u = l - M, b = r + m;
            u / b > p ? u = b * p : b = u / p, u = Math.max(f(a.minWidth, 20), Math.min(u, l + e)), b = Math.max(
              f(a.minHeight, 20),
              Math.min(b, x.value - i)
            ), D(w(u), l + e), F(e + l - o.value.width), C(w(b), x.value - i);
          } else
            D(l - c(s, "w"), l + e), F(e + c(s, "w")), C(r + c(d, "h"), x.value - i);
        },
        ml: () => {
          if (a.ratioLock) {
            const M = c(s, "w");
            let m = l - M;
            m = Math.max(f(a.minWidth, 20), Math.min(m, l + e));
            const u = m / p;
            D(w(m), l + e), F(e + l - o.value.width), C(w(u), x.value - i);
          } else
            D(l - c(s, "w"), l + e), F(e + c(s, "w"));
        }
      };
      (T = z[t.handle]) == null || T.call(z), v("resize", L(o.value));
    }, D = (e, i) => {
      o.value.width = V(
        w(e),
        f(a.minWidth, G.value),
        i,
        a.limitAreaForParent
      );
    }, C = (e, i) => {
      o.value.height = V(
        w(e),
        f(a.minHeight, K.value),
        i,
        a.limitAreaForParent
      );
    }, F = (e) => {
      o.value.left = ce(
        V(
          w(e),
          G.value,
          y.value ? 100 : t.parentInfo.width - f(o.value.width, 0),
          a.limitAreaForParent
        ),
        G.value,
        y.value ? 100 : t.parentInfo.width - f(o.value.width, 0)
      );
    }, R = (e) => {
      o.value.top = ce(
        V(
          w(e),
          K.value,
          y.value ? 100 : t.parentInfo.height - f(o.value.height, 0),
          a.limitAreaForParent
        ),
        K.value,
        y.value ? 100 : t.parentInfo.height - f(o.value.height, 0)
      );
    }, De = (e, i, l, r) => {
      const s = y.value ? 100 : t.parentInfo.width - l, d = y.value ? 100 : t.parentInfo.height - r;
      e < 0 && v("out-of-bounds", "left"), i < 0 && v("out-of-bounds", "top"), e > s && v("out-of-bounds", "right"), i > d && v("out-of-bounds", "bottom");
    }, N = (e) => {
      oe(e);
    }, Q = (e) => {
      oe(e);
    }, oe = (e) => {
      I !== null && (cancelAnimationFrame(I), I = null), $ = !1, a.draggable && t.isDragging && v("drag-stop", e, t.beforeClickConfig, { ...o.value }), W.value && t.isResizing && v("resize-stop", e, t.beforeClickConfig, { ...o.value }), a.active || (t.active = !1, v("inactive", { ...o.value })), t.handle = null, t.isDragging = !1, t.isResizing = !1;
      const i = { passive: !1 };
      A(t.ele, "mousemove", Z, i), A(t.ele, "mouseup", N, i), A(t.ele, "touchmove", J, i), A(t.ele, "touchend", Q, i), A(t.ele, "mouseleave", N, i);
    }, Ce = (e) => {
      v("dblclick", e);
    };
    return h({
      getConfig: () => L(o.value),
      setPosition: (e, i) => {
        o.value.left = e, o.value.top = i;
      },
      setSize: (e, i) => {
        o.value.width = e, o.value.height = i;
      },
      reset: () => {
        o.value = de();
      },
      activate: () => {
        t.active = !0;
      },
      deactivate: () => {
        t.active = !1;
      }
    }), ze(() => {
      if (I !== null && (cancelAnimationFrame(I), I = null), t.ele) {
        const e = { passive: !1 };
        A(t.ele, "mousemove", Z, e), A(t.ele, "mouseup", N, e), A(t.ele, "touchmove", J, e), A(t.ele, "touchend", Q, e), A(t.ele, "mouseleave", N, e);
      }
    }), be(), (e, i) => (Y(), j("div", {
      ref_key: "autoDraggableRef",
      ref: O,
      class: re(["auto-draggable", {
        "select-none": n.disabledUserSelect,
        "is-disabled": n.disabled,
        "is-active": t.active,
        "is-dragging": t.isDragging,
        "is-resizing": t.isResizing,
        "is-readonly": n.initRect,
        "is-transition": n.enableTransition
      }]),
      style: le(ve.value),
      onMousedown: i[0] || (i[0] = (l) => te(l, null)),
      onTouchstartPassive: i[1] || (i[1] = (l) => ae(l, null)),
      onDblclick: Ce,
      onKeydown: Me,
      tabindex: "0"
    }, [
      (Y(!0), j(Ae, null, Ie(n.handles, (l) => He((Y(), j("div", {
        key: l,
        class: re(["handle", "handle-" + l]),
        style: le(pe.value),
        onMousedown: se((r) => te(r, l), ["stop", "prevent"]),
        onTouchstart: se((r) => ae(r, l), ["stop", "prevent"])
      }, null, 46, Fe)), [
        [Ee, t.active && W.value && !n.disabled && we(l)]
      ])), 128)),
      Le(e.$slots, "default", {}, void 0, !0)
    ], 38));
  }
}), Se = (n, h) => {
  const g = n.__vccOpts || n;
  for (const [a, v] of h)
    g[a] = v;
  return g;
}, Ve = /* @__PURE__ */ Se(Ne, [["__scopeId", "data-v-779363be"]]), me = "VueMovableBox", ge = (n) => {
  n.component(me, Ve);
}, Ge = {
  name: me,
  version: "1.1.6",
  install: ge
};
typeof window < "u" && window.Vue && window.Vue.use({ install: ge });
export {
  Ve as MovableBox,
  Ge as default,
  me as name
};
