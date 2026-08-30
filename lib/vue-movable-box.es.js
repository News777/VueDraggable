import { computed as ot, ref as q, defineComponent as se, reactive as Ee, watch as nt, onUnmounted as Pe, openBlock as U, createElementBlock as X, unref as ut, normalizeStyle as ft, normalizeClass as ee, Fragment as Tt, renderList as Et, withDirectives as Be, withModifiers as Ne, vShow as He, renderSlot as Le } from "vue";
import Fe from "decimal.js";
const ke = {
  ArrowUp: "top",
  ArrowDown: "bottom",
  ArrowLeft: "left",
  ArrowRight: "right"
}, Ge = {
  tl: ["top", "bottom", "left", "right"],
  tm: ["top", "bottom"],
  tr: ["top", "bottom", "left", "right"],
  ml: ["left", "right"],
  mr: ["left", "right"],
  bl: ["top", "bottom", "left", "right"],
  bm: ["top", "bottom"],
  br: ["top", "bottom", "left", "right"]
}, Oe = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
function We(e, l) {
  return { handleKeyDown: (n) => {
    const a = e(), r = a.interacting;
    if (!r && (!a.enabled || a.disabled || !a.active)) return;
    if (n.key === "Escape") {
      n.preventDefault(), r ? l.cancel(n) : l.deactivate();
      return;
    }
    if (r || a.readOnly) return;
    const m = ke[n.key];
    if (!m) return;
    const u = Number.isFinite(a.step) && a.step > 0 ? a.step : 1;
    if (a.focusedHandle && a.resizeDirections.includes(a.focusedHandle)) {
      if (!Ge[a.focusedHandle].includes(m)) return;
      n.preventDefault(), l.resize(
        a.focusedHandle,
        n.shiftKey ? Oe[m] : m,
        u
      );
      return;
    }
    if (n.shiftKey) {
      const y = a.resizeDirections.includes("br") ? "br" : a.resizeDirections[0];
      if (!y) return;
      n.preventDefault(), l.resize(y, m, u);
      return;
    }
    a.dragDirections.includes(m) && (n.preventDefault(), l.move(m, u));
  } };
}
const pt = (e) => {
  if (typeof e == "string" && e.trim() === "") return null;
  const l = Number(e);
  return Number.isFinite(l) ? l : null;
}, Ke = (e) => {
  const l = pt(e.left), s = pt(e.top), n = pt(e.width), a = pt(e.height);
  return l === null || s === null || n === null || a === null || n < 0 || a < 0 ? null : { left: l, top: s, width: n, height: a };
};
function Ve(e, l) {
  const s = Number.isFinite(l) && l > 0 ? l : 20;
  return Math.round(e / s) * s;
}
const ne = (e, l, s) => l.distance > s ? e : !e || l.distance < e.distance ? l : e;
function $e(e, l, s = 10, n = { horizontal: !0, vertical: !0 }) {
  const a = Math.max(0, Number.isFinite(s) ? s : 10), r = e.left + e.width, m = e.top + e.height, u = e.left + e.width / 2, y = e.top + e.height / 2;
  let g = null, o = null;
  for (const D of l) {
    const b = Ke(D);
    if (!b) continue;
    const B = b.left + b.width, w = b.top + b.height, I = b.left + b.width / 2, N = b.top + b.height / 2, z = D.id, K = [
      {
        distance: Math.abs(e.left - b.left),
        value: b.left,
        guide: b.left,
        point: "left",
        targetId: z
      },
      {
        distance: Math.abs(r - B),
        value: B - e.width,
        guide: B,
        point: "right",
        targetId: z
      },
      {
        distance: Math.abs(e.left - B),
        value: B,
        guide: B,
        point: "left",
        targetId: z
      },
      {
        distance: Math.abs(r - b.left),
        value: b.left - e.width,
        guide: b.left,
        point: "right",
        targetId: z
      },
      {
        distance: Math.abs(u - I),
        value: I - e.width / 2,
        guide: I,
        point: "center-x",
        targetId: z
      }
    ], V = [
      {
        distance: Math.abs(e.top - b.top),
        value: b.top,
        guide: b.top,
        point: "top",
        targetId: z
      },
      {
        distance: Math.abs(m - w),
        value: w - e.height,
        guide: w,
        point: "bottom",
        targetId: z
      },
      {
        distance: Math.abs(e.top - w),
        value: w,
        guide: w,
        point: "top",
        targetId: z
      },
      {
        distance: Math.abs(m - b.top),
        value: b.top - e.height,
        guide: b.top,
        point: "bottom",
        targetId: z
      },
      {
        distance: Math.abs(y - N),
        value: N - e.height / 2,
        guide: N,
        point: "center-y",
        targetId: z
      }
    ];
    if (n.horizontal)
      for (const F of K) g = ne(g, F, a);
    if (n.vertical)
      for (const F of V) o = ne(o, F, a);
  }
  const P = [g == null ? void 0 : g.point, o == null ? void 0 : o.point].filter(
    (D) => !!D
  );
  return {
    left: (g == null ? void 0 : g.value) ?? e.left,
    top: (o == null ? void 0 : o.value) ?? e.top,
    snapped: P.length > 0,
    snapPoint: P[0],
    points: P,
    targetId: (g == null ? void 0 : g.targetId) ?? (o == null ? void 0 : o.targetId),
    targetIds: { horizontal: g == null ? void 0 : g.targetId, vertical: o == null ? void 0 : o.targetId },
    guides: {
      vertical: g ? [g.guide] : [],
      horizontal: o ? [o.guide] : []
    }
  };
}
function Ue(e) {
  const l = (a) => {
    const r = e();
    return r.snapToGrid ? Ve(a, r.gridSize) : a;
  }, s = (a, r) => ({
    left: l(a),
    top: l(r)
  }), n = ot(() => {
    const a = e();
    return a.snapToGrid ? {
      size: Number.isFinite(a.gridSize) && a.gridSize > 0 ? a.gridSize : 20,
      color: "rgba(64, 158, 255, 0.3)"
    } : null;
  });
  return { snapValue: l, snapPosition: s, gridInfo: n };
}
const Pt = () => ({ vertical: [], horizontal: [] });
function Xe(e) {
  const l = q(Pt()), s = q(null);
  return { guides: l, lastSnapResult: s, resolveSnap: (m, u, y) => {
    const g = e(), o = g.enabled ? $e(m, u, g.threshold, y) : {
      ...m,
      snapped: !1,
      points: [],
      targetIds: {},
      guides: Pt()
    };
    return l.value = o.guides, s.value = o.snapped ? o : null, o;
  }, clearGuides: () => {
    l.value = Pt(), s.value = null;
  }, setGuides: (m) => {
    l.value = m;
  } };
}
const ht = (e) => {
  if (typeof e == "string" && e.trim() === "") return null;
  const l = Number(e);
  return Number.isFinite(l) ? l : null;
}, re = (e) => {
  const l = ht(e.left), s = ht(e.top), n = ht(e.width), a = ht(e.height);
  return l === null || s === null || n === null || a === null || n < 0 || a < 0 ? null : { left: l, top: s, width: n, height: a };
}, ie = (e, l, s, n) => {
  const a = s - l;
  if (a === 0) return l < n ? e : null;
  const r = (n - l) / a;
  return a > 0 ? { ...e, exit: Math.min(e.exit, r) } : { ...e, entry: Math.max(e.entry, r) };
}, oe = (e, l, s, n) => {
  const a = s - l;
  if (a === 0) return l > n ? e : null;
  const r = (n - l) / a;
  return a > 0 ? { ...e, entry: Math.max(e.entry, r) } : { ...e, exit: Math.min(e.exit, r) };
}, Ye = (e, l, s) => {
  let n = { entry: 0, exit: 1 };
  if (n = ie(n, e.left, l.left, s.left + s.width), !n || (n = oe(
    n,
    e.left + e.width,
    l.left + l.width,
    s.left
  ), !n) || (n = ie(n, e.top, l.top, s.top + s.height), !n) || (n = oe(
    n,
    e.top + e.height,
    l.top + l.height,
    s.top
  ), !n)) return null;
  const a = Math.max(0, n.entry), r = Math.min(1, n.exit);
  return a < r && r > 0 && a < 1 ? { entry: a, exit: r } : null;
};
function bt(e, l, s) {
  let n = null;
  for (const a of s) {
    const r = re(a);
    if (!r) continue;
    const m = Ye(e, l, r);
    m && (!n || m.entry < n.entry) && (n = m);
  }
  return n;
}
function qe(e, l) {
  const s = Math.min(e.left + e.width, l.left + l.width) - Math.max(e.left, l.left), n = Math.min(e.top + e.height, l.top + l.height) - Math.max(e.top, l.top);
  if (s <= 0 || n <= 0) return { colliding: !1, overlapArea: 0 };
  const a = e.left + e.width / 2, r = e.top + e.height / 2, m = l.left + l.width / 2, u = l.top + l.height / 2, y = a - m, g = r - u;
  return {
    colliding: !0,
    direction: s <= n ? y > 0 ? "right" : "left" : g > 0 ? "bottom" : "top",
    overlap: Math.min(s, n),
    overlapArea: s * n
  };
}
function Bt(e, l, s) {
  const n = [];
  for (const a of l) {
    const r = re(a);
    if (!r) continue;
    const m = qe(e, r);
    m.colliding && n.push({ ...m, targetId: a.id });
  }
  return n;
}
function le(e) {
  let l = null;
  for (const s of e)
    (!l || (s.overlapArea ?? 0) > (l.overlapArea ?? 0)) && (l = s);
  return l;
}
const Nt = (e) => e.reduce((l, s) => l + (s.overlapArea ?? 0), 0), ce = (e, l, s) => ({
  left: e.left + (l.left - e.left) * s,
  top: e.top + (l.top - e.top) * s,
  width: e.width + (l.width - e.width) * s,
  height: e.height + (l.height - e.height) * s
}), Je = (e, l) => e.left === l.left && e.top === l.top && e.width === l.width && e.height === l.height, Ht = (e, l, s, n) => {
  if (!bt(e, l, s)) return l;
  let a = 0, r = 1, m = e;
  for (let u = 0; u < 24; u += 1) {
    const y = (a + r) / 2, g = n(ce(e, l, y));
    bt(e, g, s) ? r = y : (m = g, a = y);
  }
  return m;
};
function Ze(e) {
  const l = q([]), s = q(!1), n = (u, y) => {
    const o = e().enabled ? Bt(u, y) : [];
    return l.value = o, s.value = o.length > 0, {
      results: o,
      dominant: le(o),
      totalOverlapArea: Nt(o)
    };
  }, a = (u) => (l.value = u, s.value = u.length > 0, {
    results: u,
    dominant: le(u),
    totalOverlapArea: Nt(u)
  });
  return { collisions: l, isColliding: s, evaluate: n, resolveCandidate: (u, y, g, o = (D) => D, P = "path") => {
    const D = e(), b = n(u, g);
    if (!D.enabled || D.allowOverlap)
      return { accepted: !0, rect: u, ...b };
    const B = Bt(y, g), w = Nt(B);
    if (w > 0)
      return {
        accepted: b.totalOverlapArea < w,
        rect: u,
        ...b
      };
    const I = bt(y, u, g);
    if (b.results.length === 0 && !I)
      return { accepted: !0, rect: u, ...b };
    let N = b;
    if (b.results.length === 0 && I) {
      const K = ce(
        y,
        u,
        I.entry + (I.exit - I.entry) * 1e-3
      );
      N = a(Bt(K, g));
    }
    let z = null;
    if (P === "slide") {
      const K = Ht(
        y,
        { ...y, left: u.left },
        g,
        o
      ), V = Ht(
        y,
        { ...y, top: u.top },
        g,
        o
      ), F = o({
        ...u,
        left: K.left,
        top: V.top
      });
      bt(y, F, g) || (z = F);
    }
    return z ?? (z = Ht(y, u, g, o)), {
      accepted: !Je(z, y),
      rect: z,
      ...N
    };
  }, clearCollisions: () => {
    l.value = [], s.value = !1;
  } };
}
const f = (e, l = 0) => {
  if (e == null || e === "")
    return l;
  const s = typeof e == "string" ? Number(e) : e;
  return Number.isFinite(s) ? s : l;
}, it = (e, l, s) => Math.min(Math.max(e, l), s), Qe = 2, Y = (e, l = 1) => {
  if (e == null || e === "")
    return l;
  const s = typeof e == "string" ? parseFloat(e) : e;
  return isNaN(s) ? l : s;
}, gt = (e, l = "px") => e == null || e === "" ? "0" : `${e}${l}`;
function mt(e, l, s, n) {
  e && e.addEventListener(l, s, n);
}
function vt(e, l, s, n) {
  e && e.removeEventListener(l, s, n);
}
const ae = (e, l = 1, s = Qe) => {
  const n = new Fe(e).toDecimalPlaces(s).toNumber();
  return Y(n, l);
}, yt = (e) => {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof Array)
    return e.map((l) => yt(l));
  if (e instanceof Object) {
    const l = {};
    for (const s in e)
      e.hasOwnProperty(s) && (l[s] = yt(e[s]));
    return l;
  }
  return e;
}, _e = ["aria-orientation", "aria-label", "tabindex", "onPointerdown", "onFocus"], je = se({
  name: "VueMovableBox"
}), tn = /* @__PURE__ */ se({
  ...je,
  props: {
    theme: { type: String, default: "#409EFD" },
    inActiveColor: { type: String, default: "#666666" },
    unitType: { type: String, default: "px" },
    scale: { type: [Number, String], default: 1 },
    isKeepDecimals: { type: Boolean, default: !1 },
    decimalPlaces: { type: Number, default: 2 },
    draggable: { type: Boolean, default: !0 },
    dragHandle: String,
    dragCancel: String,
    canDrag: {
      type: Function,
      default: void 0
    },
    canResize: {
      type: Function,
      default: void 0
    },
    resizable: { type: Boolean, default: void 0 },
    resizeable: { type: Boolean, default: void 0 },
    limitAreaForParent: { type: Boolean, default: !0 },
    limitAreaClass: String,
    modelValue: {
      type: Object,
      default: () => ({ left: 0, top: 0, width: 200, height: 100, zIndex: 1 })
    },
    maxWidth: [Number, String],
    maxHeight: [Number, String],
    minWidth: { type: [Number, String], default: 0 },
    minHeight: { type: [Number, String], default: 0 },
    ratioLock: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabledUserSelect: { type: Boolean, default: !0 },
    handles: {
      type: Array,
      default: () => ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"]
    },
    disabled: { type: Boolean, default: !1 },
    initRect: { type: Boolean, default: !1 },
    edgeDistance: { type: Number, default: 0 },
    snapToGrid: { type: Boolean, default: !1 },
    gridSize: { type: Number, default: 20 },
    dragDirections: {
      type: Array,
      default: () => ["top", "bottom", "left", "right"]
    },
    resizeDirections: {
      type: Array,
      default: () => ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"]
    },
    enableTransition: { type: Boolean, default: !1 },
    keyboardEnabled: { type: Boolean, default: !1 },
    keyboardStep: { type: Number, default: 1 },
    boundsMargin: {
      type: Object,
      default: () => ({ top: 0, right: 0, bottom: 0, left: 0 })
    },
    snapToElements: { type: Boolean, default: !1 },
    snapThreshold: { type: Number, default: 10 },
    collisionEnabled: { type: Boolean, default: !1 },
    allowOverlap: { type: Boolean, default: !1 },
    snapTargets: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue", "drag", "drag-start", "drag-stop", "resize-start", "resize-stop", "drag-cancel", "resize-cancel", "resize", "move", "active", "inactive", "disabled", "dblclick", "out-of-bounds", "snap", "guides", "collision"],
  setup(e, { expose: l, emit: s }) {
    const n = e, a = s, r = (t) => yt(t), m = q(), u = q(r(n.modelValue)), y = r(n.modelValue), g = q(null), o = Ee({
      active: n.active,
      isDragging: !1,
      isResizing: !1,
      handle: null,
      initX: 0,
      initY: 0,
      beforeInteraction: r(n.modelValue),
      parentElement: null,
      parentWidth: 0,
      parentHeight: 0,
      eventElement: null,
      pointerId: null
    });
    nt(
      () => n.modelValue,
      (t) => {
        u.value = r(t);
      },
      { deep: !0 }
    ), nt(
      () => n.active,
      (t) => {
        !t && (o.isDragging || o.isResizing) ? ct() : I(t);
      },
      { flush: "sync" }
    ), nt(
      () => n.disabled,
      (t) => {
        a("disabled", t), t && ct();
      }
    ), nt(
      () => n.initRect,
      (t) => {
        t && ct();
      }
    ), nt(
      () => n.isKeepDecimals,
      (t, i) => {
        !t && i && w({
          ...u.value,
          left: Math.round(f(u.value.left)),
          top: Math.round(f(u.value.top)),
          width: Math.round(f(u.value.width)),
          height: Math.round(f(u.value.height))
        });
      }
    );
    const P = ot(() => n.resizable ?? n.resizeable ?? !0), D = ot(() => n.unitType === "%"), b = ot(() => ({
      "--movable-box-theme": n.theme,
      borderColor: n.disabled ? n.inActiveColor : o.active ? n.theme : n.inActiveColor,
      left: gt(u.value.left, n.unitType),
      top: gt(u.value.top, n.unitType),
      width: gt(u.value.width, n.unitType),
      height: gt(u.value.height, n.unitType),
      zIndex: u.value.zIndex,
      cursor: n.disabled ? "not-allowed" : o.isDragging ? "move" : o.isResizing ? "nwse-resize" : "default",
      pointerEvents: n.disabled ? "none" : "auto",
      opacity: o.active ? 1 : 0.9,
      transform: "translateZ(0)",
      willChange: o.isDragging || o.isResizing ? "left, top, width, height" : "auto",
      transition: n.enableTransition && !o.isDragging && !o.isResizing ? "left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease" : "none"
    })), B = ot(() => ({
      borderColor: P.value ? n.theme : n.inActiveColor,
      scale: ae(1 / Y(n.scale, 1), 1)
    })), w = (t) => {
      const i = r(t);
      return u.value = i, a("update:modelValue", r(i)), i;
    };
    function I(t) {
      o.active !== t && (o.active = t, a(t ? "active" : "inactive", r(u.value)), t || j());
    }
    const N = () => {
      var i, c, d;
      let t = null;
      if (n.limitAreaClass)
        try {
          t = document.querySelector(n.limitAreaClass);
        } catch {
          t = null;
        }
      o.parentElement = t ?? ((i = m.value) == null ? void 0 : i.parentElement) ?? null, o.parentWidth = ((c = o.parentElement) == null ? void 0 : c.clientWidth) ?? 0, o.parentHeight = ((d = o.parentElement) == null ? void 0 : d.clientHeight) ?? 0;
    }, z = (t) => Math.max(0, Number(t) || 0), K = () => {
      const t = z(n.edgeDistance);
      return {
        top: t + z(n.boundsMargin.top),
        right: t + z(n.boundsMargin.right),
        bottom: t + z(n.boundsMargin.bottom),
        left: t + z(n.boundsMargin.left)
      };
    }, V = () => {
      const t = K(), i = D.value ? 100 : o.parentWidth, c = D.value ? 100 : o.parentHeight;
      return {
        minLeft: t.left,
        maxRight: Math.max(t.left, i - t.right),
        minTop: t.top,
        maxBottom: Math.max(t.top, c - t.bottom)
      };
    }, F = (t) => {
      const i = V();
      return {
        minLeft: i.minLeft,
        maxLeft: Math.max(i.minLeft, i.maxRight - f(t.width)),
        minTop: i.minTop,
        maxTop: Math.max(i.minTop, i.maxBottom - f(t.height))
      };
    }, zt = (t) => {
      if (!o.parentElement) return;
      const i = V(), c = f(t.left), d = f(t.top), h = c + f(t.width), p = d + f(t.height);
      c < i.minLeft && a("out-of-bounds", "left"), h > i.maxRight && a("out-of-bounds", "right"), d < i.minTop && a("out-of-bounds", "top"), p > i.maxBottom && a("out-of-bounds", "bottom");
    }, fe = (t) => {
      if (!n.limitAreaForParent || !o.parentElement) return t;
      const i = F(t);
      return {
        ...t,
        left: it(f(t.left), i.minLeft, i.maxLeft),
        top: it(f(t.top), i.minTop, i.maxTop)
      };
    }, A = (t) => n.isKeepDecimals ? ae(t, 0, n.decimalPlaces) : Math.round(t), Lt = (t, i) => {
      const c = Y(n.scale, 1), d = t / (c === 0 ? 1 : c);
      if (!D.value) return A(d);
      const h = i === "horizontal" ? o.parentWidth : o.parentHeight;
      return h > 0 ? A(d / h * 100) : 0;
    }, Ft = Ue(() => ({ snapToGrid: n.snapToGrid, gridSize: n.gridSize })), k = Xe(() => ({ enabled: n.snapToElements, threshold: n.snapThreshold })), kt = Ze(() => ({
      enabled: n.collisionEnabled,
      allowOverlap: n.allowOverlap
    })), Gt = k.guides;
    let Z = "clear", Q = "clear", _ = "clear";
    const lt = /* @__PURE__ */ new Set(["left", "right", "center-x"]), at = /* @__PURE__ */ new Set(["top", "bottom", "center-y"]), wt = (t) => {
      const i = {
        horizontal: t.points.some((p) => lt.has(p)) ? t.targetIds.horizontal : void 0,
        vertical: t.points.some((p) => at.has(p)) ? t.targetIds.vertical : void 0
      }, c = t.snapped ? {
        snapped: !0,
        point: t.snapPoint,
        points: t.points,
        targetId: t.targetId,
        targetIds: i
      } : { snapped: !1 }, d = JSON.stringify({
        payload: c,
        targetIds: i,
        left: t.points.some((p) => lt.has(p)) ? t.left : void 0,
        top: t.points.some((p) => at.has(p)) ? t.top : void 0
      });
      d !== Z && ((t.snapped || Z !== "clear") && a("snap", c), Z = t.snapped ? d : "clear");
      const h = JSON.stringify({ guides: t.guides, targetIds: i });
      h !== Q && ((t.snapped || Q !== "clear") && a("guides", yt(t.guides)), Q = t.snapped ? h : "clear");
    }, pe = (t) => {
      const i = t.dominant, c = i ? {
        colliding: !0,
        direction: i.direction,
        targetId: i.targetId
      } : { colliding: !1 }, d = JSON.stringify(c);
      d !== _ && ((i || _ !== "clear") && a("collision", c), _ = i ? d : "clear");
    }, j = () => {
      Z !== "clear" && a("snap", { snapped: !1 }), Q !== "clear" && a("guides", { vertical: [], horizontal: [] }), _ !== "clear" && a("collision", { colliding: !1 }), Z = "clear", Q = "clear", _ = "clear", k.clearGuides(), kt.clearCollisions();
    }, tt = (t) => ({
      left: f(t.left),
      top: f(t.top),
      width: f(t.width),
      height: f(t.height)
    }), xt = (t, i, c = "path") => {
      const d = kt.resolveCandidate(
        tt(t),
        tt(i),
        n.snapTargets,
        (h) => ({
          left: A(h.left),
          top: A(h.top),
          width: A(h.width),
          height: A(h.height)
        }),
        c
      );
      return pe(d), d.accepted ? { ...t, ...d.rect } : null;
    }, Ot = (t, i, c, d, h) => {
      let p = r(t);
      d.horizontal && (p.left = Ft.snapValue(f(t.left))), d.vertical && (p.top = Ft.snapValue(f(t.top)));
      let v = {
        ...tt(p),
        snapped: !1,
        points: [],
        targetIds: {},
        guides: { vertical: [], horizontal: [] }
      };
      if (c ? (v = k.resolveSnap(tt(p), n.snapTargets, d), p = { ...p, left: v.left, top: v.top }) : k.clearGuides(), h) {
        const x = f(h.left), M = f(h.top);
        n.dragDirections.includes("left") || (p.left = Math.max(x, f(p.left))), n.dragDirections.includes("right") || (p.left = Math.min(x, f(p.left))), n.dragDirections.includes("top") || (p.top = Math.max(M, f(p.top))), n.dragDirections.includes("bottom") || (p.top = Math.min(M, f(p.top)));
      }
      zt(p), p = fe(p);
      const R = xt(p, i, "slide");
      if (!R)
        return wt({
          ...v,
          snapped: !1,
          points: [],
          guides: { vertical: [], horizontal: [] }
        }), k.clearGuides(), null;
      if (p = R, v.snapped) {
        const x = f(p.left) !== v.left, M = f(p.top) !== v.top, C = v.points.filter((E) => lt.has(E) ? !x : at.has(E) ? !M : !1), T = C.some((E) => lt.has(E)), G = C.some((E) => at.has(E));
        v = {
          ...v,
          left: f(p.left),
          top: f(p.top),
          snapped: C.length > 0,
          snapPoint: C[0],
          points: C,
          targetId: T ? v.targetIds.horizontal : G ? v.targetIds.vertical : void 0,
          targetIds: {
            horizontal: T ? v.targetIds.horizontal : void 0,
            vertical: G ? v.targetIds.vertical : void 0
          },
          guides: {
            vertical: T ? v.guides.vertical : [],
            horizontal: G ? v.guides.horizontal : []
          }
        }, v.snapped ? k.setGuides(v.guides) : k.clearGuides();
      }
      return wt(v), p;
    }, It = (t) => n.resizeDirections.includes(t), Wt = (t, i, c, d) => {
      const h = f(t.left), p = f(t.top), v = f(t.width), R = f(t.height);
      let x = h, M = h + v, C = p, T = p + R;
      i.includes("l") && (x += c), i.includes("r") && (M += c), i.includes("t") && (C += d), i.includes("b") && (T += d);
      const G = (x + M) / 2, E = (C + T) / 2;
      let H = Math.max(0, M - x), O = Math.max(0, T - C);
      const J = v > 0 && R > 0 ? v / R : 1, Ct = ($) => {
        H = $, i.includes("l") ? x = M - H : i.includes("r") ? M = x + H : (x = G - H / 2, M = G + H / 2);
      }, St = ($) => {
        O = $, i.includes("t") ? C = T - O : i.includes("b") ? T = C + O : (C = E - O / 2, T = E + O / 2);
      };
      if (n.ratioLock) {
        const $ = Math.abs(H - v), Te = Math.abs(O - R) * J;
        i === "tm" || i === "bm" || Te > $ ? Ct(O * J) : St(H / J);
      }
      const W = V(), Zt = n.limitAreaForParent && !!o.parentElement, Se = Zt ? i.includes("l") ? Math.max(0, M - W.minLeft) : i.includes("r") ? Math.max(0, W.maxRight - x) : Math.max(
        0,
        2 * Math.min(G - W.minLeft, W.maxRight - G)
      ) : 1 / 0, Ae = Zt ? i.includes("t") ? Math.max(0, T - W.minTop) : i.includes("b") ? Math.max(0, W.maxBottom - C) : Math.max(
        0,
        2 * Math.min(E - W.minTop, W.maxBottom - E)
      ) : 1 / 0, Qt = Math.max(0, Y(n.minWidth, 0)), _t = Math.max(0, Y(n.minHeight, 0)), jt = Y(n.maxWidth, 1 / 0), te = Y(n.maxHeight, 1 / 0);
      let et = Math.min(jt > 0 ? jt : 1 / 0, Se), At = Math.min(te > 0 ? te : 1 / 0, Ae);
      if (n.ratioLock) {
        et = Math.min(et, At * J);
        const $ = Math.max(Qt, _t * J);
        Ct(it(H, $, et)), St(H / J);
      } else
        Ct(it(H, Math.min(Qt, et), et)), St(it(O, Math.min(_t, At), At));
      return {
        ...t,
        left: A(x),
        top: A(C),
        width: A(M - x),
        height: A(T - C)
      };
    };
    let S = null, L = null;
    const Kt = (t) => {
      if (n.disabled || n.initRect || !o.isDragging && !o.isResizing) return;
      const i = Lt(t.clientX - o.initX, "horizontal"), c = Lt(t.clientY - o.initY, "vertical"), d = r(u.value);
      if (o.isDragging) {
        const h = o.beforeInteraction;
        let p = f(h.left) + i, v = f(h.top) + c;
        const R = {
          horizontal: i < 0 && n.dragDirections.includes("left") || i > 0 && n.dragDirections.includes("right"),
          vertical: c < 0 && n.dragDirections.includes("top") || c > 0 && n.dragDirections.includes("bottom")
        };
        R.horizontal || (p = f(h.left)), R.vertical || (v = f(h.top));
        const x = Ot(
          { ...h, left: A(p), top: A(v) },
          d,
          n.snapToElements,
          R,
          h
        );
        if (x) {
          const M = w(x);
          a("move", r(M)), a("drag", r(M));
        }
      }
      if (o.isResizing && o.handle) {
        wt({
          ...tt(d),
          snapped: !1,
          points: [],
          targetIds: {},
          guides: { vertical: [], horizontal: [] }
        }), k.clearGuides();
        const h = Wt(o.beforeInteraction, o.handle, i, c);
        zt(h);
        const p = xt(h, d);
        if (p) {
          const v = w(p);
          a("resize", r(v));
        }
      }
    }, he = (t) => {
      !o.active || n.disabled || n.initRect || (L = t, S === null && (S = requestAnimationFrame(() => {
        S = null;
        const i = L;
        L = null, i && Kt(i);
      })));
    }, Mt = (t) => o.pointerId === null || t.pointerId === o.pointerId, Vt = (t) => {
      Mt(t) && he(t);
    }, $t = (t) => {
      Mt(t) && ye(t);
    }, Ut = (t) => {
      Mt(t) && dt(t);
    }, Xt = (t) => {
      (o.isDragging || o.isResizing) && dt(t);
    }, ge = () => {
      const t = o.eventElement;
      if (!t) return;
      const i = { passive: !1 };
      mt(t, "pointermove", Vt, i), mt(t, "pointerup", $t, i), mt(t, "pointercancel", Ut, i);
      const c = m.value;
      c && mt(c, "lostpointercapture", Xt, i);
    }, st = () => {
      const t = o.eventElement;
      if (!t) return;
      vt(t, "pointermove", Vt, !1), vt(t, "pointerup", $t, !1), vt(t, "pointercancel", Ut, !1);
      const i = m.value;
      i && vt(i, "lostpointercapture", Xt, !1), o.eventElement = null;
    }, me = (t) => {
      const i = m.value;
      if (!(!i || o.pointerId === null))
        try {
          i.setPointerCapture(o.pointerId);
        } catch {
        }
    }, rt = () => {
      const t = m.value, i = o.pointerId;
      if (o.pointerId = null, !(!t || i === null))
        try {
          t.hasPointerCapture(i) && t.releasePointerCapture(i);
        } catch {
        }
    };
    function ct() {
      S !== null && (cancelAnimationFrame(S), S = null), L = null, o.isDragging = !1, o.isResizing = !1, o.handle = null, st(), rt(), j(), n.active || I(!1);
    }
    function dt(t = null) {
      const i = o.isDragging, c = o.isResizing;
      if (S !== null && (cancelAnimationFrame(S), S = null), L = null, o.isDragging = !1, o.isResizing = !1, o.handle = null, st(), rt(), i || c) {
        const d = r(o.beforeInteraction);
        w(d), a(i ? "drag-cancel" : "resize-cancel", t, d, r(d));
      }
      j(), n.active || I(!1);
    }
    function Yt() {
      ct(), I(!1);
    }
    const ve = (t, i) => {
      var d, h;
      if (n.disabled || n.initRect || i && (!P.value || !It(i)) || !i && !n.draggable) return;
      const c = r(u.value);
      if (i) {
        if (((d = n.canResize) == null ? void 0 : d.call(n, c, i)) === !1) return;
      } else if (((h = n.canDrag) == null ? void 0 : h.call(n, c)) === !1)
        return;
      N(), o.pointerId = typeof t.pointerId == "number" ? t.pointerId : null, o.initX = t.clientX, o.initY = t.clientY, o.beforeInteraction = r(u.value), o.handle = i, o.isDragging = !i, o.isResizing = !!i, I(!0), o.isDragging && a("drag-start", t, r(o.beforeInteraction)), o.isResizing && a("resize-start", t, r(o.beforeInteraction)), o.eventElement = document.documentElement, ge(), me();
    }, be = (t) => {
      if (!(t instanceof Element)) return !0;
      const i = m.value;
      if (!i) return !0;
      const c = (d) => {
        try {
          const h = t.closest(d);
          return h instanceof Element && i.contains(h) ? h : null;
        } catch {
          return null;
        }
      };
      return n.dragCancel && c(n.dragCancel) ? !1 : n.dragHandle ? !!c(n.dragHandle) : !0;
    }, qt = (t, i) => {
      !i && !be(t.target) || ve(t, i);
    };
    function ye(t) {
      S !== null && (cancelAnimationFrame(S), S = null), L && (Kt(L), L = null), o.isDragging && a("drag-stop", t, r(o.beforeInteraction), r(u.value)), o.isResizing && a("resize-stop", t, r(o.beforeInteraction), r(u.value)), o.isDragging = !1, o.isResizing = !1, o.handle = null, st(), rt(), j(), n.active || I(!1);
    }
    const ze = (t, i) => {
      N();
      const c = r(u.value), d = r(c);
      t === "left" && (d.left = f(d.left) - i), t === "right" && (d.left = f(d.left) + i), t === "top" && (d.top = f(d.top) - i), t === "bottom" && (d.top = f(d.top) + i);
      const h = Ot(d, c, n.snapToElements, {
        horizontal: t === "left" || t === "right",
        vertical: t === "top" || t === "bottom"
      }, c);
      if (h) {
        const p = w(h);
        a("move", r(p));
      }
    }, we = (t, i) => f(t.left) === f(i.left) && f(t.top) === f(i.top) && f(t.width) === f(i.width) && f(t.height) === f(i.height), xe = (t, i, c) => {
      if (n.disabled || n.initRect || !P.value || !It(t)) return;
      N();
      const d = r(u.value), h = i === "left" ? -c : i === "right" ? c : 0, p = i === "top" ? -c : i === "bottom" ? c : 0, v = Wt(d, t, h, p);
      zt(v);
      const R = xt(v, d);
      if (!R || we(R, d)) return;
      const x = w(R);
      a("resize", r(x));
    }, Ie = {
      tl: "top left",
      tm: "top middle",
      tr: "top right",
      ml: "middle left",
      mr: "middle right",
      bl: "bottom left",
      bm: "bottom middle",
      br: "bottom right"
    }, Me = (t) => `Resize ${Ie[t]}`, De = (t) => {
      if (t === "tm" || t === "bm") return "horizontal";
      if (t === "ml" || t === "mr") return "vertical";
    }, Jt = We(
      () => ({
        enabled: n.keyboardEnabled,
        step: n.keyboardStep,
        disabled: n.disabled,
        readOnly: n.initRect,
        active: o.active,
        dragDirections: n.dragDirections,
        resizeDirections: n.resizeDirections,
        focusedHandle: g.value,
        interacting: o.isDragging || o.isResizing
      }),
      {
        move: ze,
        resize: xe,
        deactivate: Yt,
        cancel: (t) => dt(t)
      }
    ).handleKeyDown, Dt = (t) => D.value ? t / 100 * o.parentWidth : t, Rt = (t) => D.value ? t / 100 * o.parentHeight : t, Re = (t) => ({
      left: `${Dt(t) - Dt(f(u.value.left))}px`,
      top: `${-Rt(f(u.value.top))}px`,
      height: `${o.parentHeight}px`,
      borderColor: n.theme
    }), Ce = (t) => ({
      top: `${Rt(t) - Rt(f(u.value.top))}px`,
      left: `${-Dt(f(u.value.left))}px`,
      width: `${o.parentWidth}px`,
      borderColor: n.theme
    });
    return l({
      getConfig: () => r(u.value),
      setPosition: (t, i) => w({ ...u.value, left: t, top: i }),
      setSize: (t, i) => w({ ...u.value, width: t, height: i }),
      reset: () => w(r(y)),
      activate: () => I(!0),
      deactivate: Yt,
      cancelInteraction: (t = null) => dt(t)
    }), Pe(() => {
      S !== null && cancelAnimationFrame(S), L = null, st(), rt(), j();
    }), (t, i) => (U(), X("div", {
      ref_key: "movableRef",
      ref: m,
      class: ee(["auto-draggable", {
        "select-none": e.disabledUserSelect,
        "is-disabled": e.disabled,
        "is-active": o.active,
        "is-dragging": o.isDragging,
        "is-resizing": o.isResizing,
        "is-readonly": e.initRect
      }]),
      style: ft(b.value),
      tabindex: "0",
      onPointerdown: i[1] || (i[1] = (c) => qt(c, null)),
      onDblclick: i[2] || (i[2] = (c) => a("dblclick", c)),
      onKeydown: i[3] || (i[3] = //@ts-ignore
      (...c) => ut(Jt) && ut(Jt)(...c))
    }, [
      (U(!0), X(Tt, null, Et(ut(Gt).vertical, (c, d) => (U(), X("div", {
        key: `vertical-${d}`,
        class: "movable-box-guide movable-box-guide--vertical",
        style: ft(Re(c))
      }, null, 4))), 128)),
      (U(!0), X(Tt, null, Et(ut(Gt).horizontal, (c, d) => (U(), X("div", {
        key: `horizontal-${d}`,
        class: "movable-box-guide movable-box-guide--horizontal",
        style: ft(Ce(c))
      }, null, 4))), 128)),
      (U(!0), X(Tt, null, Et(e.handles, (c) => Be((U(), X("div", {
        key: c,
        class: ee(["handle", `handle-${c}`]),
        style: ft(B.value),
        role: "separator",
        "aria-orientation": De(c),
        "aria-label": Me(c),
        tabindex: e.keyboardEnabled ? 0 : void 0,
        onPointerdown: Ne((d) => qt(d, c), ["stop", "prevent"]),
        onFocus: (d) => g.value = c,
        onBlur: i[0] || (i[0] = (d) => g.value = null)
      }, null, 46, _e)), [
        [He, o.active && P.value && !e.disabled && It(c)]
      ])), 128)),
      Le(t.$slots, "default", {}, void 0, !0)
    ], 38));
  }
}), en = (e, l) => {
  const s = e.__vccOpts || e;
  for (const [n, a] of l)
    s[n] = a;
  return s;
}, nn = /* @__PURE__ */ en(tn, [["__scopeId", "data-v-6e05bc41"]]), de = "VueMovableBox", ue = (e) => {
  e.component(de, nn);
}, sn = {
  name: de,
  version: "1.2.0",
  install: ue
};
typeof window < "u" && window.Vue && window.Vue.use({ install: ue });
export {
  nn as MovableBox,
  sn as default,
  de as name
};
