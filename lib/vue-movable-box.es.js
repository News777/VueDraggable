import { computed as lt, ref as Z, defineComponent as re, reactive as Me, watch as it, onUnmounted as ze, openBlock as $, createElementBlock as U, unref as ft, normalizeStyle as pt, normalizeClass as te, Fragment as Tt, renderList as Ct, withDirectives as Ie, withModifiers as ee, vShow as De, renderSlot as Te } from "vue";
import Ce from "decimal.js";
function Se(t, i, a) {
  return { handleKeyDown: (s) => {
    const r = t();
    if (!r.enabled || r.disabled || !r.active) return;
    if (s.key === "Escape") {
      s.preventDefault(), a();
      return;
    }
    if (r.readOnly) return;
    const c = {
      ArrowUp: "top",
      ArrowDown: "bottom",
      ArrowLeft: "left",
      ArrowRight: "right"
    }[s.key];
    !c || !r.dragDirections.includes(c) || (s.preventDefault(), i(c, Number.isFinite(r.step) && r.step > 0 ? r.step : 1));
  } };
}
const ht = (t) => {
  if (typeof t == "string" && t.trim() === "") return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}, Re = (t) => {
  const i = ht(t.left), a = ht(t.top), n = ht(t.width), s = ht(t.height);
  return i === null || a === null || n === null || s === null || n < 0 || s < 0 ? null : { left: i, top: a, width: n, height: s };
};
function Ae(t, i) {
  const a = Number.isFinite(i) && i > 0 ? i : 20;
  return Math.round(t / a) * a;
}
const ne = (t, i, a) => i.distance > a ? t : !t || i.distance < t.distance ? i : t;
function Ee(t, i, a = 10, n = { horizontal: !0, vertical: !0 }) {
  const s = Math.max(0, Number.isFinite(a) ? a : 10), r = t.left + t.width, b = t.top + t.height, c = t.left + t.width / 2, y = t.top + t.height / 2;
  let o = null, h = null;
  for (const N of i) {
    const g = Re(N);
    if (!g) continue;
    const z = g.left + g.width, I = g.top + g.height, T = g.left + g.width / 2, C = g.top + g.height / 2, M = N.id, L = [
      {
        distance: Math.abs(t.left - g.left),
        value: g.left,
        guide: g.left,
        point: "left",
        targetId: M
      },
      {
        distance: Math.abs(r - z),
        value: z - t.width,
        guide: z,
        point: "right",
        targetId: M
      },
      {
        distance: Math.abs(t.left - z),
        value: z,
        guide: z,
        point: "left",
        targetId: M
      },
      {
        distance: Math.abs(r - g.left),
        value: g.left - t.width,
        guide: g.left,
        point: "right",
        targetId: M
      },
      {
        distance: Math.abs(c - T),
        value: T - t.width / 2,
        guide: T,
        point: "center-x",
        targetId: M
      }
    ], Q = [
      {
        distance: Math.abs(t.top - g.top),
        value: g.top,
        guide: g.top,
        point: "top",
        targetId: M
      },
      {
        distance: Math.abs(b - I),
        value: I - t.height,
        guide: I,
        point: "bottom",
        targetId: M
      },
      {
        distance: Math.abs(t.top - I),
        value: I,
        guide: I,
        point: "top",
        targetId: M
      },
      {
        distance: Math.abs(b - g.top),
        value: g.top - t.height,
        guide: g.top,
        point: "bottom",
        targetId: M
      },
      {
        distance: Math.abs(y - C),
        value: C - t.height / 2,
        guide: C,
        point: "center-y",
        targetId: M
      }
    ];
    if (n.horizontal)
      for (const F of L) o = ne(o, F, s);
    if (n.vertical)
      for (const F of Q) h = ne(h, F, s);
  }
  const E = [o == null ? void 0 : o.point, h == null ? void 0 : h.point].filter(
    (N) => !!N
  );
  return {
    left: (o == null ? void 0 : o.value) ?? t.left,
    top: (h == null ? void 0 : h.value) ?? t.top,
    snapped: E.length > 0,
    snapPoint: E[0],
    points: E,
    targetId: (o == null ? void 0 : o.targetId) ?? (h == null ? void 0 : h.targetId),
    targetIds: { horizontal: o == null ? void 0 : o.targetId, vertical: h == null ? void 0 : h.targetId },
    guides: {
      vertical: o ? [o.guide] : [],
      horizontal: h ? [h.guide] : []
    }
  };
}
function Ne(t) {
  const i = (s) => {
    const r = t();
    return r.snapToGrid ? Ae(s, r.gridSize) : s;
  }, a = (s, r) => ({
    left: i(s),
    top: i(r)
  }), n = lt(() => {
    const s = t();
    return s.snapToGrid ? {
      size: Number.isFinite(s.gridSize) && s.gridSize > 0 ? s.gridSize : 20,
      color: "rgba(64, 158, 255, 0.3)"
    } : null;
  });
  return { snapValue: i, snapPosition: a, gridInfo: n };
}
const St = () => ({ vertical: [], horizontal: [] });
function Be(t) {
  const i = Z(St()), a = Z(null);
  return { guides: i, lastSnapResult: a, resolveSnap: (b, c, y) => {
    const o = t(), h = o.enabled ? Ee(b, c, o.threshold, y) : {
      ...b,
      snapped: !1,
      points: [],
      targetIds: {},
      guides: St()
    };
    return i.value = h.guides, a.value = h.snapped ? h : null, h;
  }, clearGuides: () => {
    i.value = St(), a.value = null;
  }, setGuides: (b) => {
    i.value = b;
  } };
}
const gt = (t) => {
  if (typeof t == "string" && t.trim() === "") return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}, ce = (t) => {
  const i = gt(t.left), a = gt(t.top), n = gt(t.width), s = gt(t.height);
  return i === null || a === null || n === null || s === null || n < 0 || s < 0 ? null : { left: i, top: a, width: n, height: s };
}, ie = (t, i, a, n) => {
  const s = a - i;
  if (s === 0) return i < n ? t : null;
  const r = (n - i) / s;
  return s > 0 ? { ...t, exit: Math.min(t.exit, r) } : { ...t, entry: Math.max(t.entry, r) };
}, oe = (t, i, a, n) => {
  const s = a - i;
  if (s === 0) return i > n ? t : null;
  const r = (n - i) / s;
  return s > 0 ? { ...t, entry: Math.max(t.entry, r) } : { ...t, exit: Math.min(t.exit, r) };
}, ke = (t, i, a) => {
  let n = { entry: 0, exit: 1 };
  if (n = ie(n, t.left, i.left, a.left + a.width), !n || (n = oe(
    n,
    t.left + t.width,
    i.left + i.width,
    a.left
  ), !n) || (n = ie(n, t.top, i.top, a.top + a.height), !n) || (n = oe(
    n,
    t.top + t.height,
    i.top + i.height,
    a.top
  ), !n)) return null;
  const s = Math.max(0, n.entry), r = Math.min(1, n.exit);
  return s < r && r > 0 && s < 1 ? { entry: s, exit: r } : null;
};
function vt(t, i, a) {
  let n = null;
  for (const s of a) {
    const r = ce(s);
    if (!r) continue;
    const b = ke(t, i, r);
    b && (!n || b.entry < n.entry) && (n = b);
  }
  return n;
}
function Pe(t, i) {
  const a = Math.min(t.left + t.width, i.left + i.width) - Math.max(t.left, i.left), n = Math.min(t.top + t.height, i.top + i.height) - Math.max(t.top, i.top);
  if (a <= 0 || n <= 0) return { colliding: !1, overlapArea: 0 };
  const s = t.left + t.width / 2, r = t.top + t.height / 2, b = i.left + i.width / 2, c = i.top + i.height / 2, y = s - b, o = r - c;
  return {
    colliding: !0,
    direction: a <= n ? y > 0 ? "right" : "left" : o > 0 ? "bottom" : "top",
    overlap: Math.min(a, n),
    overlapArea: a * n
  };
}
function Rt(t, i, a) {
  const n = [];
  for (const s of i) {
    const r = ce(s);
    if (!r) continue;
    const b = Pe(t, r);
    b.colliding && n.push({ ...b, targetId: s.id });
  }
  return n;
}
function le(t) {
  let i = null;
  for (const a of t)
    (!i || (a.overlapArea ?? 0) > (i.overlapArea ?? 0)) && (i = a);
  return i;
}
const At = (t) => t.reduce((i, a) => i + (a.overlapArea ?? 0), 0), de = (t, i, a) => ({
  left: t.left + (i.left - t.left) * a,
  top: t.top + (i.top - t.top) * a,
  width: t.width + (i.width - t.width) * a,
  height: t.height + (i.height - t.height) * a
}), Le = (t, i) => t.left === i.left && t.top === i.top && t.width === i.width && t.height === i.height, Et = (t, i, a, n) => {
  if (!vt(t, i, a)) return i;
  let s = 0, r = 1, b = t;
  for (let c = 0; c < 24; c += 1) {
    const y = (s + r) / 2, o = n(de(t, i, y));
    vt(t, o, a) ? r = y : (b = o, s = y);
  }
  return b;
};
function Fe(t) {
  const i = Z([]), a = Z(!1), n = (c, y) => {
    const h = t().enabled ? Rt(c, y) : [];
    return i.value = h, a.value = h.length > 0, {
      results: h,
      dominant: le(h),
      totalOverlapArea: At(h)
    };
  }, s = (c) => (i.value = c, a.value = c.length > 0, {
    results: c,
    dominant: le(c),
    totalOverlapArea: At(c)
  });
  return { collisions: i, isColliding: a, evaluate: n, resolveCandidate: (c, y, o, h = (N) => N, E = "path") => {
    const N = t(), g = n(c, o);
    if (!N.enabled || N.allowOverlap)
      return { accepted: !0, rect: c, ...g };
    const z = Rt(y, o), I = At(z);
    if (I > 0)
      return {
        accepted: g.totalOverlapArea < I,
        rect: c,
        ...g
      };
    const T = vt(y, c, o);
    if (g.results.length === 0 && !T)
      return { accepted: !0, rect: c, ...g };
    let C = g;
    if (g.results.length === 0 && T) {
      const L = de(
        y,
        c,
        T.entry + (T.exit - T.entry) * 1e-3
      );
      C = s(Rt(L, o));
    }
    let M = null;
    if (E === "slide") {
      const L = Et(
        y,
        { ...y, left: c.left },
        o,
        h
      ), Q = Et(
        y,
        { ...y, top: c.top },
        o,
        h
      ), F = h({
        ...c,
        left: L.left,
        top: Q.top
      });
      vt(y, F, o) || (M = F);
    }
    return M ?? (M = Et(y, c, o, h)), {
      accepted: !Le(M, y),
      rect: M,
      ...C
    };
  }, clearCollisions: () => {
    i.value = [], a.value = !1;
  } };
}
const p = (t, i = 0) => {
  if (t == null || t === "")
    return i;
  const a = typeof t == "string" ? Number(t) : t;
  return Number.isFinite(a) ? a : i;
}, ot = (t, i, a) => Math.min(Math.max(t, i), a), Ge = 2, X = (t, i = 1) => {
  if (t == null || t === "")
    return i;
  const a = typeof t == "string" ? parseFloat(t) : t;
  return isNaN(a) ? i : a;
}, mt = (t, i = "px") => t == null || t === "" ? "0" : `${t}${i}`;
function q(t, i, a, n) {
  t && t.addEventListener(i, a, n);
}
function J(t, i, a, n) {
  t && t.removeEventListener(i, a, n);
}
const ae = (t, i = 1, a = Ge) => {
  const n = new Ce(t).toDecimalPlaces(a).toNumber();
  return X(n, i);
}, bt = (t) => {
  if (t === null || typeof t != "object")
    return t;
  if (t instanceof Date)
    return new Date(t.getTime());
  if (t instanceof Array)
    return t.map((i) => bt(i));
  if (t instanceof Object) {
    const i = {};
    for (const a in t)
      t.hasOwnProperty(a) && (i[a] = bt(t[a]));
    return i;
  }
  return t;
}, se = (t) => {
  if ("touches" in t && t.touches.length > 0)
    return {
      x: t.touches[0].clientX,
      y: t.touches[0].clientY
    };
  if ("changedTouches" in t && t.changedTouches.length > 0)
    return {
      x: t.changedTouches[0].clientX,
      y: t.changedTouches[0].clientY
    };
  const i = t;
  return {
    x: i.clientX,
    y: i.clientY
  };
}, He = ["onMousedown", "onTouchstart"], We = re({
  name: "VueMovableBox"
}), Oe = /* @__PURE__ */ re({
  ...We,
  props: {
    theme: { type: String, default: "#409EFD" },
    inActiveColor: { type: String, default: "#666666" },
    unitType: { type: String, default: "px" },
    scale: { type: [Number, String], default: 1 },
    isKeepDecimals: { type: Boolean, default: !1 },
    decimalPlaces: { type: Number, default: 2 },
    draggable: { type: Boolean, default: !0 },
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
  emits: ["update:modelValue", "drag", "drag-start", "drag-stop", "resize-start", "resize-stop", "resize", "move", "active", "inactive", "disabled", "dblclick", "out-of-bounds", "snap", "guides", "collision"],
  setup(t, { expose: i, emit: a }) {
    const n = t, s = a, r = (e) => bt(e), b = Z(), c = Z(r(n.modelValue)), y = r(n.modelValue), o = Me({
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
      eventElement: null
    });
    it(
      () => n.modelValue,
      (e) => {
        c.value = r(e);
      },
      { deep: !0 }
    ), it(
      () => n.active,
      (e) => {
        !e && (o.isDragging || o.isResizing) ? ct() : I(e);
      },
      { flush: "sync" }
    ), it(
      () => n.disabled,
      (e) => {
        s("disabled", e), e && ct();
      }
    ), it(
      () => n.initRect,
      (e) => {
        e && ct();
      }
    ), it(
      () => n.isKeepDecimals,
      (e, l) => {
        !e && l && z({
          ...c.value,
          left: Math.round(p(c.value.left)),
          top: Math.round(p(c.value.top)),
          width: Math.round(p(c.value.width)),
          height: Math.round(p(c.value.height))
        });
      }
    );
    const h = lt(() => n.resizable ?? n.resizeable ?? !0), E = lt(() => n.unitType === "%"), N = lt(() => ({
      borderColor: n.disabled ? n.inActiveColor : o.active ? n.theme : n.inActiveColor,
      left: mt(c.value.left, n.unitType),
      top: mt(c.value.top, n.unitType),
      width: mt(c.value.width, n.unitType),
      height: mt(c.value.height, n.unitType),
      zIndex: c.value.zIndex,
      cursor: n.disabled ? "not-allowed" : o.isDragging ? "move" : o.isResizing ? "nwse-resize" : "default",
      pointerEvents: n.disabled ? "none" : "auto",
      opacity: o.active ? 1 : 0.9,
      transform: "translateZ(0)",
      willChange: o.isDragging || o.isResizing ? "left, top, width, height" : "auto",
      transition: n.enableTransition && !o.isDragging && !o.isResizing ? "left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease" : "none"
    })), g = lt(() => ({
      borderColor: h.value ? n.theme : n.inActiveColor,
      scale: ae(1 / X(n.scale, 1), 1)
    })), z = (e) => {
      const l = r(e);
      return c.value = l, s("update:modelValue", r(l)), l;
    };
    function I(e) {
      o.active !== e && (o.active = e, s(e ? "active" : "inactive", r(c.value)), e || rt());
    }
    const T = () => {
      var l, d, f;
      let e = null;
      if (n.limitAreaClass)
        try {
          e = document.querySelector(n.limitAreaClass);
        } catch {
          e = null;
        }
      o.parentElement = e ?? ((l = b.value) == null ? void 0 : l.parentElement) ?? null, o.parentWidth = ((d = o.parentElement) == null ? void 0 : d.clientWidth) ?? 0, o.parentHeight = ((f = o.parentElement) == null ? void 0 : f.clientHeight) ?? 0;
    }, C = (e) => Math.max(0, Number(e) || 0), M = () => {
      const e = C(n.edgeDistance);
      return {
        top: e + C(n.boundsMargin.top),
        right: e + C(n.boundsMargin.right),
        bottom: e + C(n.boundsMargin.bottom),
        left: e + C(n.boundsMargin.left)
      };
    }, L = () => {
      const e = M(), l = E.value ? 100 : o.parentWidth, d = E.value ? 100 : o.parentHeight;
      return {
        minLeft: e.left,
        maxRight: Math.max(e.left, l - e.right),
        minTop: e.top,
        maxBottom: Math.max(e.top, d - e.bottom)
      };
    }, Q = (e) => {
      const l = L();
      return {
        minLeft: l.minLeft,
        maxLeft: Math.max(l.minLeft, l.maxRight - p(e.width)),
        minTop: l.minTop,
        maxTop: Math.max(l.minTop, l.maxBottom - p(e.height))
      };
    }, F = (e) => {
      if (!o.parentElement) return;
      const l = L(), d = p(e.left), f = p(e.top), v = d + p(e.width), u = f + p(e.height);
      d < l.minLeft && s("out-of-bounds", "left"), v > l.maxRight && s("out-of-bounds", "right"), f < l.minTop && s("out-of-bounds", "top"), u > l.maxBottom && s("out-of-bounds", "bottom");
    }, pe = (e) => {
      if (!n.limitAreaForParent || !o.parentElement) return e;
      const l = Q(e);
      return {
        ...e,
        left: ot(p(e.left), l.minLeft, l.maxLeft),
        top: ot(p(e.top), l.minTop, l.maxTop)
      };
    }, S = (e) => n.isKeepDecimals ? ae(e, 0, n.decimalPlaces) : Math.round(e), Nt = (e, l) => {
      const d = X(n.scale, 1), f = e / (d === 0 ? 1 : d);
      if (!E.value) return S(f);
      const v = l === "horizontal" ? o.parentWidth : o.parentHeight;
      return v > 0 ? S(f / v * 100) : 0;
    }, Bt = Ne(() => ({ snapToGrid: n.snapToGrid, gridSize: n.gridSize })), G = Be(() => ({ enabled: n.snapToElements, threshold: n.snapThreshold })), kt = Fe(() => ({
      enabled: n.collisionEnabled,
      allowOverlap: n.allowOverlap
    })), Pt = G.guides;
    let _ = "clear", j = "clear", tt = "clear";
    const at = /* @__PURE__ */ new Set(["left", "right", "center-x"]), st = /* @__PURE__ */ new Set(["top", "bottom", "center-y"]), yt = (e) => {
      const l = {
        horizontal: e.points.some((u) => at.has(u)) ? e.targetIds.horizontal : void 0,
        vertical: e.points.some((u) => st.has(u)) ? e.targetIds.vertical : void 0
      }, d = e.snapped ? {
        snapped: !0,
        point: e.snapPoint,
        points: e.points,
        targetId: e.targetId,
        targetIds: l
      } : { snapped: !1 }, f = JSON.stringify({
        payload: d,
        targetIds: l,
        left: e.points.some((u) => at.has(u)) ? e.left : void 0,
        top: e.points.some((u) => st.has(u)) ? e.top : void 0
      });
      f !== _ && ((e.snapped || _ !== "clear") && s("snap", d), _ = e.snapped ? f : "clear");
      const v = JSON.stringify({ guides: e.guides, targetIds: l });
      v !== j && ((e.snapped || j !== "clear") && s("guides", bt(e.guides)), j = e.snapped ? v : "clear");
    }, he = (e) => {
      const l = e.dominant, d = l ? {
        colliding: !0,
        direction: l.direction,
        targetId: l.targetId
      } : { colliding: !1 }, f = JSON.stringify(d);
      f !== tt && ((l || tt !== "clear") && s("collision", d), tt = l ? f : "clear");
    }, rt = () => {
      _ !== "clear" && s("snap", { snapped: !1 }), j !== "clear" && s("guides", { vertical: [], horizontal: [] }), tt !== "clear" && s("collision", { colliding: !1 }), _ = "clear", j = "clear", tt = "clear", G.clearGuides(), kt.clearCollisions();
    }, et = (e) => ({
      left: p(e.left),
      top: p(e.top),
      width: p(e.width),
      height: p(e.height)
    }), Lt = (e, l, d = "path") => {
      const f = kt.resolveCandidate(
        et(e),
        et(l),
        n.snapTargets,
        (v) => ({
          left: S(v.left),
          top: S(v.top),
          width: S(v.width),
          height: S(v.height)
        }),
        d
      );
      return he(f), f.accepted ? { ...e, ...f.rect } : null;
    }, Ft = (e, l, d, f, v) => {
      let u = r(e);
      f.horizontal && (u.left = Bt.snapValue(p(e.left))), f.vertical && (u.top = Bt.snapValue(p(e.top)));
      let m = {
        ...et(u),
        snapped: !1,
        points: [],
        targetIds: {},
        guides: { vertical: [], horizontal: [] }
      };
      if (d ? (m = G.resolveSnap(et(u), n.snapTargets, f), u = { ...u, left: m.left, top: m.top }) : G.clearGuides(), v) {
        const x = p(v.left), D = p(v.top);
        n.dragDirections.includes("left") || (u.left = Math.max(x, p(u.left))), n.dragDirections.includes("right") || (u.left = Math.min(x, p(u.left))), n.dragDirections.includes("top") || (u.top = Math.max(D, p(u.top))), n.dragDirections.includes("bottom") || (u.top = Math.min(D, p(u.top)));
      }
      F(u), u = pe(u);
      const R = Lt(u, l, "slide");
      if (!R)
        return yt({
          ...m,
          snapped: !1,
          points: [],
          guides: { vertical: [], horizontal: [] }
        }), G.clearGuides(), null;
      if (u = R, m.snapped) {
        const x = p(u.left) !== m.left, D = p(u.top) !== m.top, w = m.points.filter((k) => at.has(k) ? !x : st.has(k) ? !D : !1), A = w.some((k) => at.has(k)), W = w.some((k) => st.has(k));
        m = {
          ...m,
          left: p(u.left),
          top: p(u.top),
          snapped: w.length > 0,
          snapPoint: w[0],
          points: w,
          targetId: A ? m.targetIds.horizontal : W ? m.targetIds.vertical : void 0,
          targetIds: {
            horizontal: A ? m.targetIds.horizontal : void 0,
            vertical: W ? m.targetIds.vertical : void 0
          },
          guides: {
            vertical: A ? m.guides.vertical : [],
            horizontal: W ? m.guides.horizontal : []
          }
        }, m.snapped ? G.setGuides(m.guides) : G.clearGuides();
      }
      return yt(m), u;
    }, Gt = (e) => n.resizeDirections.includes(e), ge = (e, l, d, f) => {
      const v = p(e.left), u = p(e.top), m = p(e.width), R = p(e.height);
      let x = v, D = v + m, w = u, A = u + R;
      l.includes("l") && (x += d), l.includes("r") && (D += d), l.includes("t") && (w += f), l.includes("b") && (A += f);
      const W = (x + D) / 2, k = (w + A) / 2;
      let P = Math.max(0, D - x), O = Math.max(0, A - w);
      const Y = m > 0 && R > 0 ? m / R : 1, zt = (K) => {
        P = K, l.includes("l") ? x = D - P : l.includes("r") ? D = x + P : (x = W - P / 2, D = W + P / 2);
      }, It = (K) => {
        O = K, l.includes("t") ? w = A - O : l.includes("b") ? A = w + O : (w = k - O / 2, A = k + O / 2);
      };
      if (n.ratioLock) {
        const K = Math.abs(P - m), we = Math.abs(O - R) * Y;
        l === "tm" || l === "bm" || we > K ? zt(O * Y) : It(P / Y);
      }
      const V = L(), Jt = n.limitAreaForParent && !!o.parentElement, ye = Jt ? l.includes("l") ? Math.max(0, D - V.minLeft) : l.includes("r") ? Math.max(0, V.maxRight - x) : Math.max(
        0,
        2 * Math.min(W - V.minLeft, V.maxRight - W)
      ) : 1 / 0, xe = Jt ? l.includes("t") ? Math.max(0, A - V.minTop) : l.includes("b") ? Math.max(0, V.maxBottom - w) : Math.max(
        0,
        2 * Math.min(k - V.minTop, V.maxBottom - k)
      ) : 1 / 0, Zt = Math.max(0, X(n.minWidth, 0)), Qt = Math.max(0, X(n.minHeight, 0)), _t = X(n.maxWidth, 1 / 0), jt = X(n.maxHeight, 1 / 0);
      let nt = Math.min(_t > 0 ? _t : 1 / 0, ye), Dt = Math.min(jt > 0 ? jt : 1 / 0, xe);
      if (n.ratioLock) {
        nt = Math.min(nt, Dt * Y);
        const K = Math.max(Zt, Qt * Y);
        zt(ot(P, K, nt)), It(P / Y);
      } else
        zt(ot(P, Math.min(Zt, nt), nt)), It(ot(O, Math.min(Qt, Dt), Dt));
      return {
        ...e,
        left: S(x),
        top: S(w),
        width: S(D - x),
        height: S(A - w)
      };
    };
    let B = null, H = null;
    const Ht = (e) => {
      if (n.disabled || n.initRect || !o.isDragging && !o.isResizing) return;
      const l = se(e), d = Nt(l.x - o.initX, "horizontal"), f = Nt(l.y - o.initY, "vertical"), v = r(c.value);
      if (o.isDragging) {
        const u = o.beforeInteraction;
        let m = p(u.left) + d, R = p(u.top) + f;
        const x = {
          horizontal: d < 0 && n.dragDirections.includes("left") || d > 0 && n.dragDirections.includes("right"),
          vertical: f < 0 && n.dragDirections.includes("top") || f > 0 && n.dragDirections.includes("bottom")
        };
        x.horizontal || (m = p(u.left)), x.vertical || (R = p(u.top));
        const D = Ft(
          { ...u, left: S(m), top: S(R) },
          v,
          n.snapToElements,
          x,
          u
        );
        if (D) {
          const w = z(D);
          s("move", r(w)), s("drag", r(w));
        }
      }
      if (o.isResizing && o.handle) {
        yt({
          ...et(v),
          snapped: !1,
          points: [],
          targetIds: {},
          guides: { vertical: [], horizontal: [] }
        }), G.clearGuides();
        const u = ge(o.beforeInteraction, o.handle, d, f);
        F(u);
        const m = Lt(u, v);
        if (m) {
          const R = z(m);
          s("resize", r(R));
        }
      }
    }, Wt = (e) => {
      !o.active || n.disabled || n.initRect || (H = e, B === null && (B = requestAnimationFrame(() => {
        B = null;
        const l = H;
        H = null, l && Ht(l);
      })));
    }, Ot = (e) => Wt(e), Vt = (e) => {
      e.cancelable && e.preventDefault(), Wt(e);
    }, me = () => {
      const e = o.eventElement;
      if (!e) return;
      const l = { passive: !1 };
      q(e, "mousemove", Ot, l), q(e, "mouseup", dt, l), q(e, "touchmove", Vt, l), q(e, "touchend", ut, l), q(e, "touchcancel", ut, l), q(e, "mouseleave", dt, l);
    }, xt = () => {
      const e = o.eventElement;
      e && (J(e, "mousemove", Ot, !1), J(e, "mouseup", dt, !1), J(e, "touchmove", Vt, !1), J(e, "touchend", ut, !1), J(e, "touchcancel", ut, !1), J(e, "mouseleave", dt, !1), o.eventElement = null);
    };
    function ct() {
      B !== null && (cancelAnimationFrame(B), B = null), H = null, o.isDragging = !1, o.isResizing = !1, o.handle = null, xt(), rt(), n.active || I(!1);
    }
    function Kt() {
      ct(), I(!1);
    }
    const $t = (e, l) => {
      if (n.disabled || n.initRect || l && (!h.value || !Gt(l)) || !l && !n.draggable) return;
      T();
      const d = se(e);
      o.initX = d.x, o.initY = d.y, o.beforeInteraction = r(c.value), o.handle = l, o.isDragging = !l, o.isResizing = !!l, I(!0), o.isDragging && s("drag-start", e, r(o.beforeInteraction)), o.isResizing && s("resize-start", e, r(o.beforeInteraction)), o.eventElement = document.documentElement, me();
    }, Ut = (e, l) => $t(e, l), Xt = (e, l) => {
      e.cancelable && e.preventDefault(), $t(e, l);
    };
    function Yt(e) {
      B !== null && (cancelAnimationFrame(B), B = null), H && (Ht(H), H = null), o.isDragging && s("drag-stop", e, r(o.beforeInteraction), r(c.value)), o.isResizing && s("resize-stop", e, r(o.beforeInteraction), r(c.value)), o.isDragging = !1, o.isResizing = !1, o.handle = null, xt(), rt(), n.active || I(!1);
    }
    function dt(e) {
      Yt(e);
    }
    function ut(e) {
      Yt(e);
    }
    const qt = Se(
      () => ({
        enabled: n.keyboardEnabled,
        step: n.keyboardStep,
        disabled: n.disabled,
        readOnly: n.initRect,
        active: o.active,
        dragDirections: n.dragDirections
      }),
      (e, l) => {
        T();
        const d = r(c.value), f = r(d);
        e === "left" && (f.left = p(f.left) - l), e === "right" && (f.left = p(f.left) + l), e === "top" && (f.top = p(f.top) - l), e === "bottom" && (f.top = p(f.top) + l);
        const v = Ft(f, d, n.snapToElements, {
          horizontal: e === "left" || e === "right",
          vertical: e === "top" || e === "bottom"
        }, d);
        if (v) {
          const u = z(v);
          s("move", r(u));
        }
      },
      Kt
    ).handleKeyDown, wt = (e) => E.value ? e / 100 * o.parentWidth : e, Mt = (e) => E.value ? e / 100 * o.parentHeight : e, ve = (e) => ({
      left: `${wt(e) - wt(p(c.value.left))}px`,
      top: `${-Mt(p(c.value.top))}px`,
      height: `${o.parentHeight}px`,
      borderColor: n.theme
    }), be = (e) => ({
      top: `${Mt(e) - Mt(p(c.value.top))}px`,
      left: `${-wt(p(c.value.left))}px`,
      width: `${o.parentWidth}px`,
      borderColor: n.theme
    });
    return i({
      getConfig: () => r(c.value),
      setPosition: (e, l) => z({ ...c.value, left: e, top: l }),
      setSize: (e, l) => z({ ...c.value, width: e, height: l }),
      reset: () => z(r(y)),
      activate: () => I(!0),
      deactivate: Kt
    }), ze(() => {
      B !== null && cancelAnimationFrame(B), H = null, xt(), rt();
    }), (e, l) => ($(), U("div", {
      ref_key: "movableRef",
      ref: b,
      class: te(["auto-draggable", {
        "select-none": t.disabledUserSelect,
        "is-disabled": t.disabled,
        "is-active": o.active,
        "is-dragging": o.isDragging,
        "is-resizing": o.isResizing,
        "is-readonly": t.initRect
      }]),
      style: pt(N.value),
      tabindex: "0",
      onMousedown: l[0] || (l[0] = (d) => Ut(d, null)),
      onTouchstart: l[1] || (l[1] = (d) => Xt(d, null)),
      onDblclick: l[2] || (l[2] = (d) => s("dblclick", d)),
      onKeydown: l[3] || (l[3] = //@ts-ignore
      (...d) => ft(qt) && ft(qt)(...d))
    }, [
      ($(!0), U(Tt, null, Ct(ft(Pt).vertical, (d, f) => ($(), U("div", {
        key: `vertical-${f}`,
        class: "movable-box-guide movable-box-guide--vertical",
        style: pt(ve(d))
      }, null, 4))), 128)),
      ($(!0), U(Tt, null, Ct(ft(Pt).horizontal, (d, f) => ($(), U("div", {
        key: `horizontal-${f}`,
        class: "movable-box-guide movable-box-guide--horizontal",
        style: pt(be(d))
      }, null, 4))), 128)),
      ($(!0), U(Tt, null, Ct(t.handles, (d) => Ie(($(), U("div", {
        key: d,
        class: te(["handle", `handle-${d}`]),
        style: pt(g.value),
        onMousedown: ee((f) => Ut(f, d), ["stop", "prevent"]),
        onTouchstart: ee((f) => Xt(f, d), ["stop", "prevent"])
      }, null, 46, He)), [
        [De, o.active && h.value && !t.disabled && Gt(d)]
      ])), 128)),
      Te(e.$slots, "default", {}, void 0, !0)
    ], 38));
  }
}), Ve = (t, i) => {
  const a = t.__vccOpts || t;
  for (const [n, s] of i)
    a[n] = s;
  return a;
}, Ke = /* @__PURE__ */ Ve(Oe, [["__scopeId", "data-v-9236ca45"]]), ue = "VueMovableBox", fe = (t) => {
  t.component(ue, Ke);
}, qe = {
  name: ue,
  version: "1.1.7",
  install: fe
};
typeof window < "u" && window.Vue && window.Vue.use({ install: fe });
export {
  Ke as MovableBox,
  qe as default,
  ue as name
};
