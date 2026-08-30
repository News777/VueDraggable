import { computed as it, ref as q, defineComponent as ce, reactive as Pe, watch as et, onUnmounted as Be, openBlock as U, createElementBlock as X, unref as ct, normalizeStyle as dt, normalizeClass as ie, Fragment as Et, renderList as Pt, withDirectives as Ne, withModifiers as He, vShow as Le, renderSlot as Fe } from "vue";
import ke from "decimal.js";
const Ge = {
  ArrowUp: "top",
  ArrowDown: "bottom",
  ArrowLeft: "left",
  ArrowRight: "right"
}, Oe = {
  tl: ["top", "bottom", "left", "right"],
  tm: ["top", "bottom"],
  tr: ["top", "bottom", "left", "right"],
  ml: ["left", "right"],
  mr: ["left", "right"],
  bl: ["top", "bottom", "left", "right"],
  bm: ["top", "bottom"],
  br: ["top", "bottom", "left", "right"]
}, We = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
function Ke(e, i) {
  return { handleKeyDown: (n) => {
    const a = e(), r = a.interacting;
    if (!r && (!a.enabled || a.disabled || !a.active)) return;
    if (n.key === "Escape") {
      n.preventDefault(), r ? i.cancel(n) : i.deactivate();
      return;
    }
    if (r || a.readOnly) return;
    const m = Ge[n.key];
    if (!m) return;
    const u = Number.isFinite(a.step) && a.step > 0 ? a.step : 1;
    if (a.focusedHandle && a.resizeDirections.includes(a.focusedHandle)) {
      if (!Oe[a.focusedHandle].includes(m)) return;
      n.preventDefault(), i.resize(
        a.focusedHandle,
        n.shiftKey ? We[m] : m,
        u
      );
      return;
    }
    if (n.shiftKey) {
      const y = a.resizeDirections.includes("br") ? "br" : a.resizeDirections[0];
      if (!y) return;
      n.preventDefault(), i.resize(y, m, u);
      return;
    }
    a.dragDirections.includes(m) && (n.preventDefault(), i.move(m, u));
  } };
}
const ut = (e) => {
  if (typeof e == "string" && e.trim() === "") return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}, Ve = (e) => {
  const i = ut(e.left), s = ut(e.top), n = ut(e.width), a = ut(e.height);
  return i === null || s === null || n === null || a === null || n < 0 || a < 0 ? null : { left: i, top: s, width: n, height: a };
};
function $e(e, i) {
  const s = Number.isFinite(i) && i > 0 ? i : 20;
  return Math.round(e / s) * s;
}
const oe = (e, i, s) => i.distance > s ? e : !e || i.distance < e.distance ? i : e;
function Ue(e, i, s = 10, n = { horizontal: !0, vertical: !0 }) {
  const a = Math.max(0, Number.isFinite(s) ? s : 10), r = e.left + e.width, m = e.top + e.height, u = e.left + e.width / 2, y = e.top + e.height / 2;
  let g = null, l = null;
  for (const D of i) {
    const b = Ve(D);
    if (!b) continue;
    const P = b.left + b.width, w = b.top + b.height, I = b.left + b.width / 2, B = b.top + b.height / 2, z = D.id, W = [
      {
        distance: Math.abs(e.left - b.left),
        value: b.left,
        guide: b.left,
        point: "left",
        targetId: z
      },
      {
        distance: Math.abs(r - P),
        value: P - e.width,
        guide: P,
        point: "right",
        targetId: z
      },
      {
        distance: Math.abs(e.left - P),
        value: P,
        guide: P,
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
    ], K = [
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
        distance: Math.abs(y - B),
        value: B - e.height / 2,
        guide: B,
        point: "center-y",
        targetId: z
      }
    ];
    if (n.horizontal)
      for (const L of W) g = oe(g, L, a);
    if (n.vertical)
      for (const L of K) l = oe(l, L, a);
  }
  const E = [g == null ? void 0 : g.point, l == null ? void 0 : l.point].filter(
    (D) => !!D
  );
  return {
    left: (g == null ? void 0 : g.value) ?? e.left,
    top: (l == null ? void 0 : l.value) ?? e.top,
    snapped: E.length > 0,
    snapPoint: E[0],
    points: E,
    targetId: (g == null ? void 0 : g.targetId) ?? (l == null ? void 0 : l.targetId),
    targetIds: { horizontal: g == null ? void 0 : g.targetId, vertical: l == null ? void 0 : l.targetId },
    guides: {
      vertical: g ? [g.guide] : [],
      horizontal: l ? [l.guide] : []
    }
  };
}
function Xe(e) {
  const i = (a) => {
    const r = e();
    return r.snapToGrid ? $e(a, r.gridSize) : a;
  }, s = (a, r) => ({
    left: i(a),
    top: i(r)
  }), n = it(() => {
    const a = e();
    return a.snapToGrid ? {
      size: Number.isFinite(a.gridSize) && a.gridSize > 0 ? a.gridSize : 20,
      color: "rgba(64, 158, 255, 0.3)"
    } : null;
  });
  return { snapValue: i, snapPosition: s, gridInfo: n };
}
const Bt = () => ({ vertical: [], horizontal: [] });
function Ye(e) {
  const i = q(Bt()), s = q(null);
  return { guides: i, lastSnapResult: s, resolveSnap: (m, u, y) => {
    const g = e(), l = g.enabled ? Ue(m, u, g.threshold, y) : {
      ...m,
      snapped: !1,
      points: [],
      targetIds: {},
      guides: Bt()
    };
    return i.value = l.guides, s.value = l.snapped ? l : null, l;
  }, clearGuides: () => {
    i.value = Bt(), s.value = null;
  }, setGuides: (m) => {
    i.value = m;
  } };
}
const ft = (e) => {
  if (typeof e == "string" && e.trim() === "") return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}, de = (e) => {
  const i = ft(e.left), s = ft(e.top), n = ft(e.width), a = ft(e.height);
  return i === null || s === null || n === null || a === null || n < 0 || a < 0 ? null : { left: i, top: s, width: n, height: a };
}, le = (e, i, s, n) => {
  const a = s - i;
  if (a === 0) return i < n ? e : null;
  const r = (n - i) / a;
  return a > 0 ? { ...e, exit: Math.min(e.exit, r) } : { ...e, entry: Math.max(e.entry, r) };
}, ae = (e, i, s, n) => {
  const a = s - i;
  if (a === 0) return i > n ? e : null;
  const r = (n - i) / a;
  return a > 0 ? { ...e, entry: Math.max(e.entry, r) } : { ...e, exit: Math.min(e.exit, r) };
}, qe = (e, i, s) => {
  let n = { entry: 0, exit: 1 };
  if (n = le(n, e.left, i.left, s.left + s.width), !n || (n = ae(
    n,
    e.left + e.width,
    i.left + i.width,
    s.left
  ), !n) || (n = le(n, e.top, i.top, s.top + s.height), !n) || (n = ae(
    n,
    e.top + e.height,
    i.top + i.height,
    s.top
  ), !n)) return null;
  const a = Math.max(0, n.entry), r = Math.min(1, n.exit);
  return a < r && r > 0 && a < 1 ? { entry: a, exit: r } : null;
};
function mt(e, i, s) {
  let n = null;
  for (const a of s) {
    const r = de(a);
    if (!r) continue;
    const m = qe(e, i, r);
    m && (!n || m.entry < n.entry) && (n = m);
  }
  return n;
}
function Je(e, i) {
  const s = Math.min(e.left + e.width, i.left + i.width) - Math.max(e.left, i.left), n = Math.min(e.top + e.height, i.top + i.height) - Math.max(e.top, i.top);
  if (s <= 0 || n <= 0) return { colliding: !1, overlapArea: 0 };
  const a = e.left + e.width / 2, r = e.top + e.height / 2, m = i.left + i.width / 2, u = i.top + i.height / 2, y = a - m, g = r - u;
  return {
    colliding: !0,
    direction: s <= n ? y > 0 ? "right" : "left" : g > 0 ? "bottom" : "top",
    overlap: Math.min(s, n),
    overlapArea: s * n
  };
}
function Nt(e, i, s) {
  const n = [];
  for (const a of i) {
    const r = de(a);
    if (!r) continue;
    const m = Je(e, r);
    m.colliding && n.push({ ...m, targetId: a.id });
  }
  return n;
}
function se(e) {
  let i = null;
  for (const s of e)
    (!i || (s.overlapArea ?? 0) > (i.overlapArea ?? 0)) && (i = s);
  return i;
}
const Ht = (e) => e.reduce((i, s) => i + (s.overlapArea ?? 0), 0), ue = (e, i, s) => ({
  left: e.left + (i.left - e.left) * s,
  top: e.top + (i.top - e.top) * s,
  width: e.width + (i.width - e.width) * s,
  height: e.height + (i.height - e.height) * s
}), Ze = (e, i) => e.left === i.left && e.top === i.top && e.width === i.width && e.height === i.height, Lt = (e, i, s, n) => {
  if (!mt(e, i, s)) return i;
  let a = 0, r = 1, m = e;
  for (let u = 0; u < 24; u += 1) {
    const y = (a + r) / 2, g = n(ue(e, i, y));
    mt(e, g, s) ? r = y : (m = g, a = y);
  }
  return m;
};
function Qe(e) {
  const i = q([]), s = q(!1), n = (u, y) => {
    const l = e().enabled ? Nt(u, y) : [];
    return i.value = l, s.value = l.length > 0, {
      results: l,
      dominant: se(l),
      totalOverlapArea: Ht(l)
    };
  }, a = (u) => (i.value = u, s.value = u.length > 0, {
    results: u,
    dominant: se(u),
    totalOverlapArea: Ht(u)
  });
  return { collisions: i, isColliding: s, evaluate: n, resolveCandidate: (u, y, g, l = (D) => D, E = "path") => {
    const D = e(), b = n(u, g);
    if (!D.enabled || D.allowOverlap)
      return { accepted: !0, rect: u, ...b };
    const P = Nt(y, g), w = Ht(P);
    if (w > 0)
      return {
        accepted: b.totalOverlapArea < w,
        rect: u,
        ...b
      };
    const I = mt(y, u, g);
    if (b.results.length === 0 && !I)
      return { accepted: !0, rect: u, ...b };
    let B = b;
    if (b.results.length === 0 && I) {
      const W = ue(
        y,
        u,
        I.entry + (I.exit - I.entry) * 1e-3
      );
      B = a(Nt(W, g));
    }
    let z = null;
    if (E === "slide") {
      const W = Lt(
        y,
        { ...y, left: u.left },
        g,
        l
      ), K = Lt(
        y,
        { ...y, top: u.top },
        g,
        l
      ), L = l({
        ...u,
        left: W.left,
        top: K.top
      });
      mt(y, L, g) || (z = L);
    }
    return z ?? (z = Lt(y, u, g, l)), {
      accepted: !Ze(z, y),
      rect: z,
      ...B
    };
  }, clearCollisions: () => {
    i.value = [], s.value = !1;
  } };
}
const f = (e, i = 0) => {
  if (e == null || e === "")
    return i;
  const s = typeof e == "string" ? Number(e) : e;
  return Number.isFinite(s) ? s : i;
}, nt = (e, i, s) => Math.min(Math.max(e, i), s), _e = (e, i) => f(e.left) === f(i.left) && f(e.top) === f(i.top) && f(e.width) === f(i.width) && f(e.height) === f(i.height), je = 2, Y = (e, i = 1) => {
  if (e == null || e === "")
    return i;
  const s = typeof e == "string" ? parseFloat(e) : e;
  return isNaN(s) ? i : s;
}, pt = (e, i = "px") => e == null || e === "" ? "0" : `${e}${i}`;
function ht(e, i, s, n) {
  e && e.addEventListener(i, s, n);
}
function gt(e, i, s, n) {
  e && e.removeEventListener(i, s, n);
}
const re = (e, i = 1, s = je) => {
  const n = new ke(e).toDecimalPlaces(s).toNumber();
  return Y(n, i);
}, vt = (e) => {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof Array)
    return e.map((i) => vt(i));
  if (e instanceof Object) {
    const i = {};
    for (const s in e)
      e.hasOwnProperty(s) && (i[s] = vt(e[s]));
    return i;
  }
  return e;
}, tn = ["aria-orientation", "aria-label", "tabindex", "onPointerdown", "onFocus"], en = ce({
  name: "VueMovableBox"
}), nn = /* @__PURE__ */ ce({
  ...en,
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
  setup(e, { expose: i, emit: s }) {
    const n = e, a = s, r = (t) => vt(t), m = q(), u = q(r(n.modelValue)), y = r(n.modelValue), g = q(null), l = Pe({
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
    et(
      () => n.modelValue,
      (t) => {
        u.value = r(t);
      },
      { deep: !0 }
    ), et(
      () => n.active,
      (t) => {
        !t && (l.isDragging || l.isResizing) ? st() : I(t);
      },
      { flush: "sync" }
    ), et(
      () => n.disabled,
      (t) => {
        a("disabled", t), t && st();
      }
    ), et(
      () => n.initRect,
      (t) => {
        t && st();
      }
    ), et(
      () => n.isKeepDecimals,
      (t, o) => {
        !t && o && w({
          ...u.value,
          left: Math.round(f(u.value.left)),
          top: Math.round(f(u.value.top)),
          width: Math.round(f(u.value.width)),
          height: Math.round(f(u.value.height))
        });
      }
    );
    const E = it(() => n.resizable ?? n.resizeable ?? !0), D = it(() => n.unitType === "%"), b = it(() => ({
      "--movable-box-theme": n.theme,
      borderColor: n.disabled ? n.inActiveColor : l.active ? n.theme : n.inActiveColor,
      left: pt(u.value.left, n.unitType),
      top: pt(u.value.top, n.unitType),
      width: pt(u.value.width, n.unitType),
      height: pt(u.value.height, n.unitType),
      zIndex: u.value.zIndex,
      cursor: n.disabled ? "not-allowed" : l.isDragging ? "move" : l.isResizing ? "nwse-resize" : "default",
      pointerEvents: n.disabled ? "none" : "auto",
      opacity: l.active ? 1 : 0.9,
      transform: "translateZ(0)",
      willChange: l.isDragging || l.isResizing ? "left, top, width, height" : "auto",
      transition: n.enableTransition && !l.isDragging && !l.isResizing ? "left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease" : "none"
    })), P = it(() => ({
      borderColor: E.value ? n.theme : n.inActiveColor,
      scale: re(1 / Y(n.scale, 1), 1)
    })), w = (t) => {
      const o = r(t);
      return u.value = o, a("update:modelValue", r(o)), o;
    };
    function I(t) {
      l.active !== t && (l.active = t, a(t ? "active" : "inactive", r(u.value)), t || at());
    }
    const B = () => {
      var o, c, d;
      let t = null;
      if (n.limitAreaClass)
        try {
          t = document.querySelector(n.limitAreaClass);
        } catch {
          t = null;
        }
      l.parentElement = t ?? ((o = m.value) == null ? void 0 : o.parentElement) ?? null, l.parentWidth = ((c = l.parentElement) == null ? void 0 : c.clientWidth) ?? 0, l.parentHeight = ((d = l.parentElement) == null ? void 0 : d.clientHeight) ?? 0;
    }, z = (t) => Math.max(0, Number(t) || 0), W = () => {
      const t = z(n.edgeDistance);
      return {
        top: t + z(n.boundsMargin.top),
        right: t + z(n.boundsMargin.right),
        bottom: t + z(n.boundsMargin.bottom),
        left: t + z(n.boundsMargin.left)
      };
    }, K = () => {
      const t = W(), o = D.value ? 100 : l.parentWidth, c = D.value ? 100 : l.parentHeight;
      return {
        minLeft: t.left,
        maxRight: Math.max(t.left, o - t.right),
        minTop: t.top,
        maxBottom: Math.max(t.top, c - t.bottom)
      };
    }, L = (t) => {
      const o = K();
      return {
        minLeft: o.minLeft,
        maxLeft: Math.max(o.minLeft, o.maxRight - f(t.width)),
        minTop: o.minTop,
        maxTop: Math.max(o.minTop, o.maxBottom - f(t.height))
      };
    }, bt = (t) => {
      if (!l.parentElement) return;
      const o = K(), c = f(t.left), d = f(t.top), h = c + f(t.width), p = d + f(t.height);
      c < o.minLeft && a("out-of-bounds", "left"), h > o.maxRight && a("out-of-bounds", "right"), d < o.minTop && a("out-of-bounds", "top"), p > o.maxBottom && a("out-of-bounds", "bottom");
    }, he = (t) => {
      if (!n.limitAreaForParent || !l.parentElement) return t;
      const o = L(t);
      return {
        ...t,
        left: nt(f(t.left), o.minLeft, o.maxLeft),
        top: nt(f(t.top), o.minTop, o.maxTop)
      };
    }, S = (t) => n.isKeepDecimals ? re(t, 0, n.decimalPlaces) : Math.round(t), Ft = (t, o) => {
      const c = Y(n.scale, 1), d = t / (c === 0 ? 1 : c);
      if (!D.value) return S(d);
      const h = o === "horizontal" ? l.parentWidth : l.parentHeight;
      return h > 0 ? S(d / h * 100) : 0;
    }, kt = Xe(() => ({ snapToGrid: n.snapToGrid, gridSize: n.gridSize })), F = Ye(() => ({ enabled: n.snapToElements, threshold: n.snapThreshold })), Gt = Qe(() => ({
      enabled: n.collisionEnabled,
      allowOverlap: n.allowOverlap
    })), Ot = F.guides;
    let Z = "clear", Q = "clear", _ = "clear";
    const ot = /* @__PURE__ */ new Set(["left", "right", "center-x"]), lt = /* @__PURE__ */ new Set(["top", "bottom", "center-y"]), yt = (t) => {
      const o = {
        horizontal: t.points.some((p) => ot.has(p)) ? t.targetIds.horizontal : void 0,
        vertical: t.points.some((p) => lt.has(p)) ? t.targetIds.vertical : void 0
      }, c = t.snapped ? {
        snapped: !0,
        point: t.snapPoint,
        points: t.points,
        targetId: t.targetId,
        targetIds: o
      } : { snapped: !1 }, d = JSON.stringify({
        payload: c,
        targetIds: o,
        left: t.points.some((p) => ot.has(p)) ? t.left : void 0,
        top: t.points.some((p) => lt.has(p)) ? t.top : void 0
      });
      d !== Z && ((t.snapped || Z !== "clear") && a("snap", c), Z = t.snapped ? d : "clear");
      const h = JSON.stringify({ guides: t.guides, targetIds: o });
      h !== Q && ((t.snapped || Q !== "clear") && a("guides", vt(t.guides)), Q = t.snapped ? h : "clear");
    }, ge = (t) => {
      const o = t.dominant, c = o ? {
        colliding: !0,
        direction: o.direction,
        targetId: o.targetId
      } : { colliding: !1 }, d = JSON.stringify(c);
      d !== _ && ((o || _ !== "clear") && a("collision", c), _ = o ? d : "clear");
    }, at = () => {
      Z !== "clear" && a("snap", { snapped: !1 }), Q !== "clear" && a("guides", { vertical: [], horizontal: [] }), _ !== "clear" && a("collision", { colliding: !1 }), Z = "clear", Q = "clear", _ = "clear", F.clearGuides(), Gt.clearCollisions();
    }, j = (t) => ({
      left: f(t.left),
      top: f(t.top),
      width: f(t.width),
      height: f(t.height)
    }), zt = (t, o, c = "path") => {
      const d = Gt.resolveCandidate(
        j(t),
        j(o),
        n.snapTargets,
        (h) => ({
          left: S(h.left),
          top: S(h.top),
          width: S(h.width),
          height: S(h.height)
        }),
        c
      );
      return ge(d), d.accepted ? { ...t, ...d.rect } : null;
    }, Wt = (t, o, c, d, h) => {
      let p = r(t);
      d.horizontal && (p.left = kt.snapValue(f(t.left))), d.vertical && (p.top = kt.snapValue(f(t.top)));
      let v = {
        ...j(p),
        snapped: !1,
        points: [],
        targetIds: {},
        guides: { vertical: [], horizontal: [] }
      };
      if (c ? (v = F.resolveSnap(j(p), n.snapTargets, d), p = { ...p, left: v.left, top: v.top }) : F.clearGuides(), h) {
        const x = f(h.left), M = f(h.top);
        n.dragDirections.includes("left") || (p.left = Math.max(x, f(p.left))), n.dragDirections.includes("right") || (p.left = Math.min(x, f(p.left))), n.dragDirections.includes("top") || (p.top = Math.max(M, f(p.top))), n.dragDirections.includes("bottom") || (p.top = Math.min(M, f(p.top)));
      }
      bt(p), p = he(p);
      const R = zt(p, o, "slide");
      if (!R)
        return yt({
          ...v,
          snapped: !1,
          points: [],
          guides: { vertical: [], horizontal: [] }
        }), F.clearGuides(), null;
      if (p = R, v.snapped) {
        const x = f(p.left) !== v.left, M = f(p.top) !== v.top, C = v.points.filter((T) => ot.has(T) ? !x : lt.has(T) ? !M : !1), A = C.some((T) => ot.has(T)), k = C.some((T) => lt.has(T));
        v = {
          ...v,
          left: f(p.left),
          top: f(p.top),
          snapped: C.length > 0,
          snapPoint: C[0],
          points: C,
          targetId: A ? v.targetIds.horizontal : k ? v.targetIds.vertical : void 0,
          targetIds: {
            horizontal: A ? v.targetIds.horizontal : void 0,
            vertical: k ? v.targetIds.vertical : void 0
          },
          guides: {
            vertical: A ? v.guides.vertical : [],
            horizontal: k ? v.guides.horizontal : []
          }
        }, v.snapped ? F.setGuides(v.guides) : F.clearGuides();
      }
      return yt(v), p;
    }, wt = (t) => n.resizeDirections.includes(t), Kt = (t, o, c, d) => {
      const h = f(t.left), p = f(t.top), v = f(t.width), R = f(t.height);
      let x = h, M = h + v, C = p, A = p + R;
      o.includes("l") && (x += c), o.includes("r") && (M += c), o.includes("t") && (C += d), o.includes("b") && (A += d);
      const k = (x + M) / 2, T = (C + A) / 2;
      let N = Math.max(0, M - x), G = Math.max(0, A - C);
      const J = v > 0 && R > 0 ? v / R : 1, St = ($) => {
        N = $, o.includes("l") ? x = M - N : o.includes("r") ? M = x + N : (x = k - N / 2, M = k + N / 2);
      }, At = ($) => {
        G = $, o.includes("t") ? C = A - G : o.includes("b") ? A = C + G : (C = T - G / 2, A = T + G / 2);
      };
      if (n.ratioLock) {
        const $ = Math.abs(N - v), Ee = Math.abs(G - R) * J;
        o === "tm" || o === "bm" || Ee > $ ? St(G * J) : At(N / J);
      }
      const O = K(), _t = n.limitAreaForParent && !!l.parentElement, Ae = _t ? o.includes("l") ? Math.max(0, M - O.minLeft) : o.includes("r") ? Math.max(0, O.maxRight - x) : Math.max(
        0,
        2 * Math.min(k - O.minLeft, O.maxRight - k)
      ) : 1 / 0, Te = _t ? o.includes("t") ? Math.max(0, A - O.minTop) : o.includes("b") ? Math.max(0, O.maxBottom - C) : Math.max(
        0,
        2 * Math.min(T - O.minTop, O.maxBottom - T)
      ) : 1 / 0, jt = Math.max(0, Y(n.minWidth, 0)), te = Math.max(0, Y(n.minHeight, 0)), ee = Y(n.maxWidth, 1 / 0), ne = Y(n.maxHeight, 1 / 0);
      let tt = Math.min(ee > 0 ? ee : 1 / 0, Ae), Tt = Math.min(ne > 0 ? ne : 1 / 0, Te);
      if (n.ratioLock) {
        tt = Math.min(tt, Tt * J);
        const $ = Math.max(jt, te * J);
        St(nt(N, $, tt)), At(N / J);
      } else
        St(nt(N, Math.min(jt, tt), tt)), At(nt(G, Math.min(te, Tt), Tt));
      return {
        ...t,
        left: S(x),
        top: S(C),
        width: S(M - x),
        height: S(A - C)
      };
    };
    let H = null, V = null;
    const Vt = (t) => {
      if (n.disabled || n.initRect || !l.isDragging && !l.isResizing) return;
      const o = Ft(t.clientX - l.initX, "horizontal"), c = Ft(t.clientY - l.initY, "vertical"), d = r(u.value);
      if (l.isDragging) {
        const h = l.beforeInteraction;
        let p = f(h.left) + o, v = f(h.top) + c;
        const R = {
          horizontal: o < 0 && n.dragDirections.includes("left") || o > 0 && n.dragDirections.includes("right"),
          vertical: c < 0 && n.dragDirections.includes("top") || c > 0 && n.dragDirections.includes("bottom")
        };
        R.horizontal || (p = f(h.left)), R.vertical || (v = f(h.top));
        const x = Wt(
          { ...h, left: S(p), top: S(v) },
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
      if (l.isResizing && l.handle) {
        yt({
          ...j(d),
          snapped: !1,
          points: [],
          targetIds: {},
          guides: { vertical: [], horizontal: [] }
        }), F.clearGuides();
        const h = Kt(l.beforeInteraction, l.handle, o, c);
        bt(h);
        const p = zt(h, d);
        if (p) {
          const v = w(p);
          a("resize", r(v));
        }
      }
    }, me = (t) => {
      !l.active || n.disabled || n.initRect || (V = t, H === null && (H = requestAnimationFrame(() => {
        H = null;
        const o = V;
        V = null, o && Vt(o);
      })));
    }, xt = (t) => l.pointerId === null || t.pointerId === l.pointerId, $t = (t) => {
      xt(t) && me(t);
    }, Ut = (t) => {
      xt(t) && we(t);
    }, Xt = (t) => {
      xt(t) && rt(t);
    }, Yt = (t) => {
      (l.isDragging || l.isResizing) && rt(t);
    }, ve = () => {
      const t = l.eventElement;
      if (!t) return;
      const o = { passive: !1 };
      ht(t, "pointermove", $t, o), ht(t, "pointerup", Ut, o), ht(t, "pointercancel", Xt, o);
      const c = m.value;
      c && ht(c, "lostpointercapture", Yt, o);
    }, It = () => {
      const t = l.eventElement;
      if (!t) return;
      gt(t, "pointermove", $t, !1), gt(t, "pointerup", Ut, !1), gt(t, "pointercancel", Xt, !1);
      const o = m.value;
      o && gt(o, "lostpointercapture", Yt, !1), l.eventElement = null;
    }, be = () => {
      const t = m.value;
      if (!(!t || l.pointerId === null))
        try {
          t.setPointerCapture(l.pointerId);
        } catch {
        }
    }, Mt = () => {
      const t = m.value, o = l.pointerId;
      if (l.pointerId = null, !(!t || o === null))
        try {
          t.hasPointerCapture(o) && t.releasePointerCapture(o);
        } catch {
        }
    };
    function Dt() {
      H !== null && (cancelAnimationFrame(H), H = null), V = null;
    }
    function qt() {
      l.isDragging = !1, l.isResizing = !1, l.handle = null, It(), Mt(), at(), n.active || I(!1);
    }
    function st() {
      Dt(), qt();
    }
    function rt(t = null) {
      const o = l.isDragging, c = l.isResizing;
      if (Dt(), l.isDragging = !1, l.isResizing = !1, l.handle = null, It(), Mt(), o || c) {
        const d = r(l.beforeInteraction);
        w(d), a(o ? "drag-cancel" : "resize-cancel", t, d, r(d));
      }
      at(), n.active || I(!1);
    }
    function Jt() {
      st(), I(!1);
    }
    const ye = (t, o) => {
      var d, h;
      if (n.disabled || n.initRect || l.isDragging || l.isResizing || o && (!E.value || !wt(o)) || !o && !n.draggable) return;
      const c = r(u.value);
      if (o) {
        if (((d = n.canResize) == null ? void 0 : d.call(n, c, o)) === !1) return;
      } else if (((h = n.canDrag) == null ? void 0 : h.call(n, c)) === !1)
        return;
      B(), l.pointerId = typeof t.pointerId == "number" ? t.pointerId : null, l.initX = t.clientX, l.initY = t.clientY, l.beforeInteraction = r(u.value), l.handle = o, l.isDragging = !o, l.isResizing = !!o, I(!0), l.isDragging && a("drag-start", t, r(l.beforeInteraction)), l.isResizing && a("resize-start", t, r(l.beforeInteraction)), l.eventElement = document.documentElement, ve(), be();
    }, ze = (t) => {
      if (!(t instanceof Element)) return !0;
      const o = m.value;
      if (!o) return !0;
      const c = (d) => {
        try {
          const h = t.closest(d);
          return h instanceof Element && o.contains(h) ? h : null;
        } catch {
          return null;
        }
      };
      return n.dragCancel && c(n.dragCancel) ? !1 : n.dragHandle ? !!c(n.dragHandle) : !0;
    }, Zt = (t, o) => {
      !o && !ze(t.target) || ye(t, o);
    };
    function we(t) {
      H !== null && (cancelAnimationFrame(H), H = null), V && (Vt(V), V = null), l.isDragging && a("drag-stop", t, r(l.beforeInteraction), r(u.value)), l.isResizing && a("resize-stop", t, r(l.beforeInteraction), r(u.value)), qt();
    }
    const xe = (t, o) => {
      B();
      const c = r(u.value), d = r(c);
      t === "left" && (d.left = f(d.left) - o), t === "right" && (d.left = f(d.left) + o), t === "top" && (d.top = f(d.top) - o), t === "bottom" && (d.top = f(d.top) + o);
      const h = Wt(d, c, n.snapToElements, {
        horizontal: t === "left" || t === "right",
        vertical: t === "top" || t === "bottom"
      }, c);
      if (h) {
        const p = w(h);
        a("move", r(p));
      }
    }, Ie = (t, o, c) => {
      if (!E.value || !wt(t)) return;
      B();
      const d = r(u.value), h = o === "left" ? -c : o === "right" ? c : 0, p = o === "top" ? -c : o === "bottom" ? c : 0, v = Kt(d, t, h, p);
      bt(v);
      const R = zt(v, d);
      if (!R || _e(R, d)) return;
      const x = w(R);
      a("resize", r(x));
    }, Me = {
      tl: "top left",
      tm: "top middle",
      tr: "top right",
      ml: "middle left",
      mr: "middle right",
      bl: "bottom left",
      bm: "bottom middle",
      br: "bottom right"
    }, De = (t) => `Resize ${Me[t]}`, Re = (t) => {
      if (t === "tm" || t === "bm") return "horizontal";
      if (t === "ml" || t === "mr") return "vertical";
    }, Qt = Ke(
      () => ({
        enabled: n.keyboardEnabled,
        step: n.keyboardStep,
        disabled: n.disabled,
        readOnly: n.initRect,
        active: l.active,
        dragDirections: n.dragDirections,
        resizeDirections: n.resizeDirections,
        focusedHandle: g.value,
        interacting: l.isDragging || l.isResizing
      }),
      {
        move: xe,
        resize: Ie,
        deactivate: Jt,
        cancel: (t) => rt(t)
      }
    ).handleKeyDown, Rt = (t) => D.value ? t / 100 * l.parentWidth : t, Ct = (t) => D.value ? t / 100 * l.parentHeight : t, Ce = (t) => ({
      left: `${Rt(t) - Rt(f(u.value.left))}px`,
      top: `${-Ct(f(u.value.top))}px`,
      height: `${l.parentHeight}px`,
      borderColor: n.theme
    }), Se = (t) => ({
      top: `${Ct(t) - Ct(f(u.value.top))}px`,
      left: `${-Rt(f(u.value.left))}px`,
      width: `${l.parentWidth}px`,
      borderColor: n.theme
    });
    return i({
      getConfig: () => r(u.value),
      setPosition: (t, o) => w({ ...u.value, left: t, top: o }),
      setSize: (t, o) => w({ ...u.value, width: t, height: o }),
      reset: () => w(r(y)),
      activate: () => I(!0),
      deactivate: Jt,
      cancelInteraction: (t = null) => rt(t)
    }), Be(() => {
      Dt(), It(), Mt(), at();
    }), (t, o) => (U(), X("div", {
      ref_key: "movableRef",
      ref: m,
      class: ie(["auto-draggable", {
        "select-none": e.disabledUserSelect,
        "is-disabled": e.disabled,
        "is-active": l.active,
        "is-dragging": l.isDragging,
        "is-resizing": l.isResizing,
        "is-readonly": e.initRect
      }]),
      style: dt(b.value),
      tabindex: "0",
      onPointerdown: o[1] || (o[1] = (c) => Zt(c, null)),
      onDblclick: o[2] || (o[2] = (c) => a("dblclick", c)),
      onKeydown: o[3] || (o[3] = //@ts-ignore
      (...c) => ct(Qt) && ct(Qt)(...c))
    }, [
      (U(!0), X(Et, null, Pt(ct(Ot).vertical, (c, d) => (U(), X("div", {
        key: `vertical-${d}`,
        class: "movable-box-guide movable-box-guide--vertical",
        style: dt(Ce(c))
      }, null, 4))), 128)),
      (U(!0), X(Et, null, Pt(ct(Ot).horizontal, (c, d) => (U(), X("div", {
        key: `horizontal-${d}`,
        class: "movable-box-guide movable-box-guide--horizontal",
        style: dt(Se(c))
      }, null, 4))), 128)),
      (U(!0), X(Et, null, Pt(e.handles, (c) => Ne((U(), X("div", {
        key: c,
        class: ie(["handle", `handle-${c}`]),
        style: dt(P.value),
        role: "separator",
        "aria-orientation": Re(c),
        "aria-label": De(c),
        tabindex: e.keyboardEnabled ? 0 : void 0,
        onPointerdown: He((d) => Zt(d, c), ["stop", "prevent"]),
        onFocus: (d) => g.value = c,
        onBlur: o[0] || (o[0] = (d) => g.value = null)
      }, null, 46, tn)), [
        [Le, l.active && E.value && !e.disabled && wt(c)]
      ])), 128)),
      Fe(t.$slots, "default", {}, void 0, !0)
    ], 38));
  }
}), on = (e, i) => {
  const s = e.__vccOpts || e;
  for (const [n, a] of i)
    s[n] = a;
  return s;
}, ln = /* @__PURE__ */ on(nn, [["__scopeId", "data-v-397c3828"]]), fe = "VueMovableBox", pe = (e) => {
  e.component(fe, ln);
}, cn = {
  name: fe,
  version: "1.2.0",
  install: pe
};
typeof window < "u" && window.Vue && window.Vue.use({ install: pe });
export {
  ln as MovableBox,
  cn as default,
  fe as name
};
