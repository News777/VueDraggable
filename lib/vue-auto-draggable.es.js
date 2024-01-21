import { defineComponent as ss, reactive as lp, computed as qt, ref as ap, watch as cp, onMounted as hp, openBlock as pu, createElementBlock as du, normalizeClass as es, normalizeStyle as gp, withModifiers as ts, Fragment as pp, renderList as dp, withDirectives as vp, vShow as _p, renderSlot as wp } from "vue";
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var vt = 9e15, Ge = 1e9, vu = "0123456789abcdef", Hr = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", qr = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", _u = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -vt,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: vt,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, ls, Ne, K = !0, $r = "[DecimalError] ", qe = $r + "Invalid argument: ", as = $r + "Precision limit exceeded", cs = $r + "crypto unavailable", hs = "[object Decimal]", Dn = Math.floor, Rn = Math.pow, mp = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Ap = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Ep = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, gs = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, he = 1e7, H = 7, xp = 9007199254740991, Cp = Hr.length - 1, wu = qr.length - 1, N = { toStringTag: hs };
N.absoluteValue = N.abs = function() {
  var i = new this.constructor(this);
  return i.s < 0 && (i.s = 1), B(i);
};
N.ceil = function() {
  return B(new this.constructor(this), this.e + 1, 2);
};
N.clampedTo = N.clamp = function(i, f) {
  var r, s = this, o = s.constructor;
  if (i = new o(i), f = new o(f), !i.s || !f.s)
    return new o(NaN);
  if (i.gt(f))
    throw Error(qe + f);
  return r = s.cmp(i), r < 0 ? i : s.cmp(f) > 0 ? f : new o(s);
};
N.comparedTo = N.cmp = function(i) {
  var f, r, s, o, a = this, g = a.d, v = (i = new a.constructor(i)).d, w = a.s, d = i.s;
  if (!g || !v)
    return !w || !d ? NaN : w !== d ? w : g === v ? 0 : !g ^ w < 0 ? 1 : -1;
  if (!g[0] || !v[0])
    return g[0] ? w : v[0] ? -d : 0;
  if (w !== d)
    return w;
  if (a.e !== i.e)
    return a.e > i.e ^ w < 0 ? 1 : -1;
  for (s = g.length, o = v.length, f = 0, r = s < o ? s : o; f < r; ++f)
    if (g[f] !== v[f])
      return g[f] > v[f] ^ w < 0 ? 1 : -1;
  return s === o ? 0 : s > o ^ w < 0 ? 1 : -1;
};
N.cosine = N.cos = function() {
  var i, f, r = this, s = r.constructor;
  return r.d ? r.d[0] ? (i = s.precision, f = s.rounding, s.precision = i + Math.max(r.e, r.sd()) + H, s.rounding = 1, r = Ip(s, ws(s, r)), s.precision = i, s.rounding = f, B(Ne == 2 || Ne == 3 ? r.neg() : r, i, f, !0)) : new s(1) : new s(NaN);
};
N.cubeRoot = N.cbrt = function() {
  var i, f, r, s, o, a, g, v, w, d, E = this, C = E.constructor;
  if (!E.isFinite() || E.isZero())
    return new C(E);
  for (K = !1, a = E.s * Rn(E.s * E, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (r = On(E.d), i = E.e, (a = (i - r.length + 1) % 3) && (r += a == 1 || a == -2 ? "0" : "00"), a = Rn(r, 1 / 3), i = Dn((i + 1) / 3) - (i % 3 == (i < 0 ? -1 : 2)), a == 1 / 0 ? r = "5e" + i : (r = a.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + i), s = new C(r), s.s = E.s) : s = new C(a.toString()), g = (i = C.precision) + 3; ; )
    if (v = s, w = v.times(v).times(v), d = w.plus(E), s = cn(d.plus(E).times(v), d.plus(w), g + 2, 1), On(v.d).slice(0, g) === (r = On(s.d)).slice(0, g))
      if (r = r.slice(g - 3, g + 1), r == "9999" || !o && r == "4999") {
        if (!o && (B(v, i + 1, 0), v.times(v).times(v).eq(E))) {
          s = v;
          break;
        }
        g += 4, o = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (B(s, i + 1, 1), f = !s.times(s).times(s).eq(E));
        break;
      }
  return K = !0, B(s, i, C.rounding, f);
};
N.decimalPlaces = N.dp = function() {
  var i, f = this.d, r = NaN;
  if (f) {
    if (i = f.length - 1, r = (i - Dn(this.e / H)) * H, i = f[i], i)
      for (; i % 10 == 0; i /= 10)
        r--;
    r < 0 && (r = 0);
  }
  return r;
};
N.dividedBy = N.div = function(i) {
  return cn(this, new this.constructor(i));
};
N.dividedToIntegerBy = N.divToInt = function(i) {
  var f = this, r = f.constructor;
  return B(cn(f, new r(i), 0, 1, 1), r.precision, r.rounding);
};
N.equals = N.eq = function(i) {
  return this.cmp(i) === 0;
};
N.floor = function() {
  return B(new this.constructor(this), this.e + 1, 3);
};
N.greaterThan = N.gt = function(i) {
  return this.cmp(i) > 0;
};
N.greaterThanOrEqualTo = N.gte = function(i) {
  var f = this.cmp(i);
  return f == 1 || f === 0;
};
N.hyperbolicCosine = N.cosh = function() {
  var i, f, r, s, o, a = this, g = a.constructor, v = new g(1);
  if (!a.isFinite())
    return new g(a.s ? 1 / 0 : NaN);
  if (a.isZero())
    return v;
  r = g.precision, s = g.rounding, g.precision = r + Math.max(a.e, a.sd()) + 4, g.rounding = 1, o = a.d.length, o < 32 ? (i = Math.ceil(o / 3), f = (1 / Kr(4, i)).toString()) : (i = 16, f = "2.3283064365386962890625e-10"), a = _t(g, 1, a.times(f), new g(1), !0);
  for (var w, d = i, E = new g(8); d--; )
    w = a.times(a), a = v.minus(w.times(E.minus(w.times(E))));
  return B(a, g.precision = r, g.rounding = s, !0);
};
N.hyperbolicSine = N.sinh = function() {
  var i, f, r, s, o = this, a = o.constructor;
  if (!o.isFinite() || o.isZero())
    return new a(o);
  if (f = a.precision, r = a.rounding, a.precision = f + Math.max(o.e, o.sd()) + 4, a.rounding = 1, s = o.d.length, s < 3)
    o = _t(a, 2, o, o, !0);
  else {
    i = 1.4 * Math.sqrt(s), i = i > 16 ? 16 : i | 0, o = o.times(1 / Kr(5, i)), o = _t(a, 2, o, o, !0);
    for (var g, v = new a(5), w = new a(16), d = new a(20); i--; )
      g = o.times(o), o = o.times(v.plus(g.times(w.times(g).plus(d))));
  }
  return a.precision = f, a.rounding = r, B(o, f, r, !0);
};
N.hyperbolicTangent = N.tanh = function() {
  var i, f, r = this, s = r.constructor;
  return r.isFinite() ? r.isZero() ? new s(r) : (i = s.precision, f = s.rounding, s.precision = i + 7, s.rounding = 1, cn(r.sinh(), r.cosh(), s.precision = i, s.rounding = f)) : new s(r.s);
};
N.inverseCosine = N.acos = function() {
  var i, f = this, r = f.constructor, s = f.abs().cmp(1), o = r.precision, a = r.rounding;
  return s !== -1 ? s === 0 ? f.isNeg() ? ce(r, o, a) : new r(0) : new r(NaN) : f.isZero() ? ce(r, o + 4, a).times(0.5) : (r.precision = o + 6, r.rounding = 1, f = f.asin(), i = ce(r, o + 4, a).times(0.5), r.precision = o, r.rounding = a, i.minus(f));
};
N.inverseHyperbolicCosine = N.acosh = function() {
  var i, f, r = this, s = r.constructor;
  return r.lte(1) ? new s(r.eq(1) ? 0 : NaN) : r.isFinite() ? (i = s.precision, f = s.rounding, s.precision = i + Math.max(Math.abs(r.e), r.sd()) + 4, s.rounding = 1, K = !1, r = r.times(r).minus(1).sqrt().plus(r), K = !0, s.precision = i, s.rounding = f, r.ln()) : new s(r);
};
N.inverseHyperbolicSine = N.asinh = function() {
  var i, f, r = this, s = r.constructor;
  return !r.isFinite() || r.isZero() ? new s(r) : (i = s.precision, f = s.rounding, s.precision = i + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, s.rounding = 1, K = !1, r = r.times(r).plus(1).sqrt().plus(r), K = !0, s.precision = i, s.rounding = f, r.ln());
};
N.inverseHyperbolicTangent = N.atanh = function() {
  var i, f, r, s, o = this, a = o.constructor;
  return o.isFinite() ? o.e >= 0 ? new a(o.abs().eq(1) ? o.s / 0 : o.isZero() ? o : NaN) : (i = a.precision, f = a.rounding, s = o.sd(), Math.max(s, i) < 2 * -o.e - 1 ? B(new a(o), i, f, !0) : (a.precision = r = s - o.e, o = cn(o.plus(1), new a(1).minus(o), r + i, 1), a.precision = i + 4, a.rounding = 1, o = o.ln(), a.precision = i, a.rounding = f, o.times(0.5))) : new a(NaN);
};
N.inverseSine = N.asin = function() {
  var i, f, r, s, o = this, a = o.constructor;
  return o.isZero() ? new a(o) : (f = o.abs().cmp(1), r = a.precision, s = a.rounding, f !== -1 ? f === 0 ? (i = ce(a, r + 4, s).times(0.5), i.s = o.s, i) : new a(NaN) : (a.precision = r + 6, a.rounding = 1, o = o.div(new a(1).minus(o.times(o)).sqrt().plus(1)).atan(), a.precision = r, a.rounding = s, o.times(2)));
};
N.inverseTangent = N.atan = function() {
  var i, f, r, s, o, a, g, v, w, d = this, E = d.constructor, C = E.precision, S = E.rounding;
  if (d.isFinite()) {
    if (d.isZero())
      return new E(d);
    if (d.abs().eq(1) && C + 4 <= wu)
      return g = ce(E, C + 4, S).times(0.25), g.s = d.s, g;
  } else {
    if (!d.s)
      return new E(NaN);
    if (C + 4 <= wu)
      return g = ce(E, C + 4, S).times(0.5), g.s = d.s, g;
  }
  for (E.precision = v = C + 10, E.rounding = 1, r = Math.min(28, v / H + 2 | 0), i = r; i; --i)
    d = d.div(d.times(d).plus(1).sqrt().plus(1));
  for (K = !1, f = Math.ceil(v / H), s = 1, w = d.times(d), g = new E(d), o = d; i !== -1; )
    if (o = o.times(w), a = g.minus(o.div(s += 2)), o = o.times(w), g = a.plus(o.div(s += 2)), g.d[f] !== void 0)
      for (i = f; g.d[i] === a.d[i] && i--; )
        ;
  return r && (g = g.times(2 << r - 1)), K = !0, B(g, E.precision = C, E.rounding = S, !0);
};
N.isFinite = function() {
  return !!this.d;
};
N.isInteger = N.isInt = function() {
  return !!this.d && Dn(this.e / H) > this.d.length - 2;
};
N.isNaN = function() {
  return !this.s;
};
N.isNegative = N.isNeg = function() {
  return this.s < 0;
};
N.isPositive = N.isPos = function() {
  return this.s > 0;
};
N.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
N.lessThan = N.lt = function(i) {
  return this.cmp(i) < 0;
};
N.lessThanOrEqualTo = N.lte = function(i) {
  return this.cmp(i) < 1;
};
N.logarithm = N.log = function(i) {
  var f, r, s, o, a, g, v, w, d = this, E = d.constructor, C = E.precision, S = E.rounding, b = 5;
  if (i == null)
    i = new E(10), f = !0;
  else {
    if (i = new E(i), r = i.d, i.s < 0 || !r || !r[0] || i.eq(1))
      return new E(NaN);
    f = i.eq(10);
  }
  if (r = d.d, d.s < 0 || !r || !r[0] || d.eq(1))
    return new E(r && !r[0] ? -1 / 0 : d.s != 1 ? NaN : r ? 0 : 1 / 0);
  if (f)
    if (r.length > 1)
      a = !0;
    else {
      for (o = r[0]; o % 10 === 0; )
        o /= 10;
      a = o !== 1;
    }
  if (K = !1, v = C + b, g = He(d, v), s = f ? Gr(E, v + 10) : He(i, v), w = cn(g, s, v, 1), $t(w.d, o = C, S))
    do
      if (v += 10, g = He(d, v), s = f ? Gr(E, v + 10) : He(i, v), w = cn(g, s, v, 1), !a) {
        +On(w.d).slice(o + 1, o + 15) + 1 == 1e14 && (w = B(w, C + 1, 0));
        break;
      }
    while ($t(w.d, o += 10, S));
  return K = !0, B(w, C, S);
};
N.minus = N.sub = function(i) {
  var f, r, s, o, a, g, v, w, d, E, C, S, b = this, Z = b.constructor;
  if (i = new Z(i), !b.d || !i.d)
    return !b.s || !i.s ? i = new Z(NaN) : b.d ? i.s = -i.s : i = new Z(i.d || b.s !== i.s ? b : NaN), i;
  if (b.s != i.s)
    return i.s = -i.s, b.plus(i);
  if (d = b.d, S = i.d, v = Z.precision, w = Z.rounding, !d[0] || !S[0]) {
    if (S[0])
      i.s = -i.s;
    else if (d[0])
      i = new Z(b);
    else
      return new Z(w === 3 ? -0 : 0);
    return K ? B(i, v, w) : i;
  }
  if (r = Dn(i.e / H), E = Dn(b.e / H), d = d.slice(), a = E - r, a) {
    for (C = a < 0, C ? (f = d, a = -a, g = S.length) : (f = S, r = E, g = d.length), s = Math.max(Math.ceil(v / H), g) + 2, a > s && (a = s, f.length = 1), f.reverse(), s = a; s--; )
      f.push(0);
    f.reverse();
  } else {
    for (s = d.length, g = S.length, C = s < g, C && (g = s), s = 0; s < g; s++)
      if (d[s] != S[s]) {
        C = d[s] < S[s];
        break;
      }
    a = 0;
  }
  for (C && (f = d, d = S, S = f, i.s = -i.s), g = d.length, s = S.length - g; s > 0; --s)
    d[g++] = 0;
  for (s = S.length; s > a; ) {
    if (d[--s] < S[s]) {
      for (o = s; o && d[--o] === 0; )
        d[o] = he - 1;
      --d[o], d[s] += he;
    }
    d[s] -= S[s];
  }
  for (; d[--g] === 0; )
    d.pop();
  for (; d[0] === 0; d.shift())
    --r;
  return d[0] ? (i.d = d, i.e = zr(d, r), K ? B(i, v, w) : i) : new Z(w === 3 ? -0 : 0);
};
N.modulo = N.mod = function(i) {
  var f, r = this, s = r.constructor;
  return i = new s(i), !r.d || !i.s || i.d && !i.d[0] ? new s(NaN) : !i.d || r.d && !r.d[0] ? B(new s(r), s.precision, s.rounding) : (K = !1, s.modulo == 9 ? (f = cn(r, i.abs(), 0, 3, 1), f.s *= i.s) : f = cn(r, i, 0, s.modulo, 1), f = f.times(i), K = !0, r.minus(f));
};
N.naturalExponential = N.exp = function() {
  return mu(this);
};
N.naturalLogarithm = N.ln = function() {
  return He(this);
};
N.negated = N.neg = function() {
  var i = new this.constructor(this);
  return i.s = -i.s, B(i);
};
N.plus = N.add = function(i) {
  var f, r, s, o, a, g, v, w, d, E, C = this, S = C.constructor;
  if (i = new S(i), !C.d || !i.d)
    return !C.s || !i.s ? i = new S(NaN) : C.d || (i = new S(i.d || C.s === i.s ? C : NaN)), i;
  if (C.s != i.s)
    return i.s = -i.s, C.minus(i);
  if (d = C.d, E = i.d, v = S.precision, w = S.rounding, !d[0] || !E[0])
    return E[0] || (i = new S(C)), K ? B(i, v, w) : i;
  if (a = Dn(C.e / H), s = Dn(i.e / H), d = d.slice(), o = a - s, o) {
    for (o < 0 ? (r = d, o = -o, g = E.length) : (r = E, s = a, g = d.length), a = Math.ceil(v / H), g = a > g ? a + 1 : g + 1, o > g && (o = g, r.length = 1), r.reverse(); o--; )
      r.push(0);
    r.reverse();
  }
  for (g = d.length, o = E.length, g - o < 0 && (o = g, r = E, E = d, d = r), f = 0; o; )
    f = (d[--o] = d[o] + E[o] + f) / he | 0, d[o] %= he;
  for (f && (d.unshift(f), ++s), g = d.length; d[--g] == 0; )
    d.pop();
  return i.d = d, i.e = zr(d, s), K ? B(i, v, w) : i;
};
N.precision = N.sd = function(i) {
  var f, r = this;
  if (i !== void 0 && i !== !!i && i !== 1 && i !== 0)
    throw Error(qe + i);
  return r.d ? (f = ps(r.d), i && r.e + 1 > f && (f = r.e + 1)) : f = NaN, f;
};
N.round = function() {
  var i = this, f = i.constructor;
  return B(new f(i), i.e + 1, f.rounding);
};
N.sine = N.sin = function() {
  var i, f, r = this, s = r.constructor;
  return r.isFinite() ? r.isZero() ? new s(r) : (i = s.precision, f = s.rounding, s.precision = i + Math.max(r.e, r.sd()) + H, s.rounding = 1, r = Rp(s, ws(s, r)), s.precision = i, s.rounding = f, B(Ne > 2 ? r.neg() : r, i, f, !0)) : new s(NaN);
};
N.squareRoot = N.sqrt = function() {
  var i, f, r, s, o, a, g = this, v = g.d, w = g.e, d = g.s, E = g.constructor;
  if (d !== 1 || !v || !v[0])
    return new E(!d || d < 0 && (!v || v[0]) ? NaN : v ? g : 1 / 0);
  for (K = !1, d = Math.sqrt(+g), d == 0 || d == 1 / 0 ? (f = On(v), (f.length + w) % 2 == 0 && (f += "0"), d = Math.sqrt(f), w = Dn((w + 1) / 2) - (w < 0 || w % 2), d == 1 / 0 ? f = "5e" + w : (f = d.toExponential(), f = f.slice(0, f.indexOf("e") + 1) + w), s = new E(f)) : s = new E(d.toString()), r = (w = E.precision) + 3; ; )
    if (a = s, s = a.plus(cn(g, a, r + 2, 1)).times(0.5), On(a.d).slice(0, r) === (f = On(s.d)).slice(0, r))
      if (f = f.slice(r - 3, r + 1), f == "9999" || !o && f == "4999") {
        if (!o && (B(a, w + 1, 0), a.times(a).eq(g))) {
          s = a;
          break;
        }
        r += 4, o = 1;
      } else {
        (!+f || !+f.slice(1) && f.charAt(0) == "5") && (B(s, w + 1, 1), i = !s.times(s).eq(g));
        break;
      }
  return K = !0, B(s, w, E.rounding, i);
};
N.tangent = N.tan = function() {
  var i, f, r = this, s = r.constructor;
  return r.isFinite() ? r.isZero() ? new s(r) : (i = s.precision, f = s.rounding, s.precision = i + 10, s.rounding = 1, r = r.sin(), r.s = 1, r = cn(r, new s(1).minus(r.times(r)).sqrt(), i + 10, 0), s.precision = i, s.rounding = f, B(Ne == 2 || Ne == 4 ? r.neg() : r, i, f, !0)) : new s(NaN);
};
N.times = N.mul = function(i) {
  var f, r, s, o, a, g, v, w, d, E = this, C = E.constructor, S = E.d, b = (i = new C(i)).d;
  if (i.s *= E.s, !S || !S[0] || !b || !b[0])
    return new C(!i.s || S && !S[0] && !b || b && !b[0] && !S ? NaN : !S || !b ? i.s / 0 : i.s * 0);
  for (r = Dn(E.e / H) + Dn(i.e / H), w = S.length, d = b.length, w < d && (a = S, S = b, b = a, g = w, w = d, d = g), a = [], g = w + d, s = g; s--; )
    a.push(0);
  for (s = d; --s >= 0; ) {
    for (f = 0, o = w + s; o > s; )
      v = a[o] + b[s] * S[o - s - 1] + f, a[o--] = v % he | 0, f = v / he | 0;
    a[o] = (a[o] + f) % he | 0;
  }
  for (; !a[--g]; )
    a.pop();
  return f ? ++r : a.shift(), i.d = a, i.e = zr(a, r), K ? B(i, C.precision, C.rounding) : i;
};
N.toBinary = function(i, f) {
  return Eu(this, 2, i, f);
};
N.toDecimalPlaces = N.toDP = function(i, f) {
  var r = this, s = r.constructor;
  return r = new s(r), i === void 0 ? r : ($n(i, 0, Ge), f === void 0 ? f = s.rounding : $n(f, 0, 8), B(r, i + r.e + 1, f));
};
N.toExponential = function(i, f) {
  var r, s = this, o = s.constructor;
  return i === void 0 ? r = _e(s, !0) : ($n(i, 0, Ge), f === void 0 ? f = o.rounding : $n(f, 0, 8), s = B(new o(s), i + 1, f), r = _e(s, !0, i + 1)), s.isNeg() && !s.isZero() ? "-" + r : r;
};
N.toFixed = function(i, f) {
  var r, s, o = this, a = o.constructor;
  return i === void 0 ? r = _e(o) : ($n(i, 0, Ge), f === void 0 ? f = a.rounding : $n(f, 0, 8), s = B(new a(o), i + o.e + 1, f), r = _e(s, !1, i + s.e + 1)), o.isNeg() && !o.isZero() ? "-" + r : r;
};
N.toFraction = function(i) {
  var f, r, s, o, a, g, v, w, d, E, C, S, b = this, Z = b.d, W = b.constructor;
  if (!Z)
    return new W(b);
  if (d = r = new W(1), s = w = new W(0), f = new W(s), a = f.e = ps(Z) - b.e - 1, g = a % H, f.d[0] = Rn(10, g < 0 ? H + g : g), i == null)
    i = a > 0 ? f : d;
  else {
    if (v = new W(i), !v.isInt() || v.lt(d))
      throw Error(qe + v);
    i = v.gt(f) ? a > 0 ? f : d : v;
  }
  for (K = !1, v = new W(On(Z)), E = W.precision, W.precision = a = Z.length * H * 2; C = cn(v, f, 0, 1, 1), o = r.plus(C.times(s)), o.cmp(i) != 1; )
    r = s, s = o, o = d, d = w.plus(C.times(o)), w = o, o = f, f = v.minus(C.times(o)), v = o;
  return o = cn(i.minus(r), s, 0, 1, 1), w = w.plus(o.times(d)), r = r.plus(o.times(s)), w.s = d.s = b.s, S = cn(d, s, a, 1).minus(b).abs().cmp(cn(w, r, a, 1).minus(b).abs()) < 1 ? [d, s] : [w, r], W.precision = E, K = !0, S;
};
N.toHexadecimal = N.toHex = function(i, f) {
  return Eu(this, 16, i, f);
};
N.toNearest = function(i, f) {
  var r = this, s = r.constructor;
  if (r = new s(r), i == null) {
    if (!r.d)
      return r;
    i = new s(1), f = s.rounding;
  } else {
    if (i = new s(i), f === void 0 ? f = s.rounding : $n(f, 0, 8), !r.d)
      return i.s ? r : i;
    if (!i.d)
      return i.s && (i.s = r.s), i;
  }
  return i.d[0] ? (K = !1, r = cn(r, i, 0, f, 1).times(i), K = !0, B(r)) : (i.s = r.s, r = i), r;
};
N.toNumber = function() {
  return +this;
};
N.toOctal = function(i, f) {
  return Eu(this, 8, i, f);
};
N.toPower = N.pow = function(i) {
  var f, r, s, o, a, g, v = this, w = v.constructor, d = +(i = new w(i));
  if (!v.d || !i.d || !v.d[0] || !i.d[0])
    return new w(Rn(+v, d));
  if (v = new w(v), v.eq(1))
    return v;
  if (s = w.precision, a = w.rounding, i.eq(1))
    return B(v, s, a);
  if (f = Dn(i.e / H), f >= i.d.length - 1 && (r = d < 0 ? -d : d) <= xp)
    return o = ds(w, v, r, s), i.s < 0 ? new w(1).div(o) : B(o, s, a);
  if (g = v.s, g < 0) {
    if (f < i.d.length - 1)
      return new w(NaN);
    if (i.d[f] & 1 || (g = 1), v.e == 0 && v.d[0] == 1 && v.d.length == 1)
      return v.s = g, v;
  }
  return r = Rn(+v, d), f = r == 0 || !isFinite(r) ? Dn(d * (Math.log("0." + On(v.d)) / Math.LN10 + v.e + 1)) : new w(r + "").e, f > w.maxE + 1 || f < w.minE - 1 ? new w(f > 0 ? g / 0 : 0) : (K = !1, w.rounding = v.s = 1, r = Math.min(12, (f + "").length), o = mu(i.times(He(v, s + r)), s), o.d && (o = B(o, s + 5, 1), $t(o.d, s, a) && (f = s + 10, o = B(mu(i.times(He(v, f + r)), f), f + 5, 1), +On(o.d).slice(s + 1, s + 15) + 1 == 1e14 && (o = B(o, s + 1, 0)))), o.s = g, K = !0, w.rounding = a, B(o, s, a));
};
N.toPrecision = function(i, f) {
  var r, s = this, o = s.constructor;
  return i === void 0 ? r = _e(s, s.e <= o.toExpNeg || s.e >= o.toExpPos) : ($n(i, 1, Ge), f === void 0 ? f = o.rounding : $n(f, 0, 8), s = B(new o(s), i, f), r = _e(s, i <= s.e || s.e <= o.toExpNeg, i)), s.isNeg() && !s.isZero() ? "-" + r : r;
};
N.toSignificantDigits = N.toSD = function(i, f) {
  var r = this, s = r.constructor;
  return i === void 0 ? (i = s.precision, f = s.rounding) : ($n(i, 1, Ge), f === void 0 ? f = s.rounding : $n(f, 0, 8)), B(new s(r), i, f);
};
N.toString = function() {
  var i = this, f = i.constructor, r = _e(i, i.e <= f.toExpNeg || i.e >= f.toExpPos);
  return i.isNeg() && !i.isZero() ? "-" + r : r;
};
N.truncated = N.trunc = function() {
  return B(new this.constructor(this), this.e + 1, 1);
};
N.valueOf = N.toJSON = function() {
  var i = this, f = i.constructor, r = _e(i, i.e <= f.toExpNeg || i.e >= f.toExpPos);
  return i.isNeg() ? "-" + r : r;
};
function On(i) {
  var f, r, s, o = i.length - 1, a = "", g = i[0];
  if (o > 0) {
    for (a += g, f = 1; f < o; f++)
      s = i[f] + "", r = H - s.length, r && (a += Ue(r)), a += s;
    g = i[f], s = g + "", r = H - s.length, r && (a += Ue(r));
  } else if (g === 0)
    return "0";
  for (; g % 10 === 0; )
    g /= 10;
  return a + g;
}
function $n(i, f, r) {
  if (i !== ~~i || i < f || i > r)
    throw Error(qe + i);
}
function $t(i, f, r, s) {
  var o, a, g, v;
  for (a = i[0]; a >= 10; a /= 10)
    --f;
  return --f < 0 ? (f += H, o = 0) : (o = Math.ceil((f + 1) / H), f %= H), a = Rn(10, H - f), v = i[o] % a | 0, s == null ? f < 3 ? (f == 0 ? v = v / 100 | 0 : f == 1 && (v = v / 10 | 0), g = r < 4 && v == 99999 || r > 3 && v == 49999 || v == 5e4 || v == 0) : g = (r < 4 && v + 1 == a || r > 3 && v + 1 == a / 2) && (i[o + 1] / a / 100 | 0) == Rn(10, f - 2) - 1 || (v == a / 2 || v == 0) && (i[o + 1] / a / 100 | 0) == 0 : f < 4 ? (f == 0 ? v = v / 1e3 | 0 : f == 1 ? v = v / 100 | 0 : f == 2 && (v = v / 10 | 0), g = (s || r < 4) && v == 9999 || !s && r > 3 && v == 4999) : g = ((s || r < 4) && v + 1 == a || !s && r > 3 && v + 1 == a / 2) && (i[o + 1] / a / 1e3 | 0) == Rn(10, f - 3) - 1, g;
}
function Ur(i, f, r) {
  for (var s, o = [0], a, g = 0, v = i.length; g < v; ) {
    for (a = o.length; a--; )
      o[a] *= f;
    for (o[0] += vu.indexOf(i.charAt(g++)), s = 0; s < o.length; s++)
      o[s] > r - 1 && (o[s + 1] === void 0 && (o[s + 1] = 0), o[s + 1] += o[s] / r | 0, o[s] %= r);
  }
  return o.reverse();
}
function Ip(i, f) {
  var r, s, o;
  if (f.isZero())
    return f;
  s = f.d.length, s < 32 ? (r = Math.ceil(s / 3), o = (1 / Kr(4, r)).toString()) : (r = 16, o = "2.3283064365386962890625e-10"), i.precision += r, f = _t(i, 1, f.times(o), new i(1));
  for (var a = r; a--; ) {
    var g = f.times(f);
    f = g.times(g).minus(g).times(8).plus(1);
  }
  return i.precision -= r, f;
}
var cn = /* @__PURE__ */ function() {
  function i(s, o, a) {
    var g, v = 0, w = s.length;
    for (s = s.slice(); w--; )
      g = s[w] * o + v, s[w] = g % a | 0, v = g / a | 0;
    return v && s.unshift(v), s;
  }
  function f(s, o, a, g) {
    var v, w;
    if (a != g)
      w = a > g ? 1 : -1;
    else
      for (v = w = 0; v < a; v++)
        if (s[v] != o[v]) {
          w = s[v] > o[v] ? 1 : -1;
          break;
        }
    return w;
  }
  function r(s, o, a, g) {
    for (var v = 0; a--; )
      s[a] -= v, v = s[a] < o[a] ? 1 : 0, s[a] = v * g + s[a] - o[a];
    for (; !s[0] && s.length > 1; )
      s.shift();
  }
  return function(s, o, a, g, v, w) {
    var d, E, C, S, b, Z, W, un, tn, F, O, D, z, $, ln, Cn, pn, Un, dn, J, Pn = s.constructor, Ln = s.s == o.s ? 1 : -1, vn = s.d, rn = o.d;
    if (!vn || !vn[0] || !rn || !rn[0])
      return new Pn(
        // Return NaN if either NaN, or both Infinity or 0.
        !s.s || !o.s || (vn ? rn && vn[0] == rn[0] : !rn) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          vn && vn[0] == 0 || !rn ? Ln * 0 : Ln / 0
        )
      );
    for (w ? (b = 1, E = s.e - o.e) : (w = he, b = H, E = Dn(s.e / b) - Dn(o.e / b)), dn = rn.length, pn = vn.length, tn = new Pn(Ln), F = tn.d = [], C = 0; rn[C] == (vn[C] || 0); C++)
      ;
    if (rn[C] > (vn[C] || 0) && E--, a == null ? ($ = a = Pn.precision, g = Pn.rounding) : v ? $ = a + (s.e - o.e) + 1 : $ = a, $ < 0)
      F.push(1), Z = !0;
    else {
      if ($ = $ / b + 2 | 0, C = 0, dn == 1) {
        for (S = 0, rn = rn[0], $++; (C < pn || S) && $--; C++)
          ln = S * w + (vn[C] || 0), F[C] = ln / rn | 0, S = ln % rn | 0;
        Z = S || C < pn;
      } else {
        for (S = w / (rn[0] + 1) | 0, S > 1 && (rn = i(rn, S, w), vn = i(vn, S, w), dn = rn.length, pn = vn.length), Cn = dn, O = vn.slice(0, dn), D = O.length; D < dn; )
          O[D++] = 0;
        J = rn.slice(), J.unshift(0), Un = rn[0], rn[1] >= w / 2 && ++Un;
        do
          S = 0, d = f(rn, O, dn, D), d < 0 ? (z = O[0], dn != D && (z = z * w + (O[1] || 0)), S = z / Un | 0, S > 1 ? (S >= w && (S = w - 1), W = i(rn, S, w), un = W.length, D = O.length, d = f(W, O, un, D), d == 1 && (S--, r(W, dn < un ? J : rn, un, w))) : (S == 0 && (d = S = 1), W = rn.slice()), un = W.length, un < D && W.unshift(0), r(O, W, D, w), d == -1 && (D = O.length, d = f(rn, O, dn, D), d < 1 && (S++, r(O, dn < D ? J : rn, D, w))), D = O.length) : d === 0 && (S++, O = [0]), F[C++] = S, d && O[0] ? O[D++] = vn[Cn] || 0 : (O = [vn[Cn]], D = 1);
        while ((Cn++ < pn || O[0] !== void 0) && $--);
        Z = O[0] !== void 0;
      }
      F[0] || F.shift();
    }
    if (b == 1)
      tn.e = E, ls = Z;
    else {
      for (C = 1, S = F[0]; S >= 10; S /= 10)
        C++;
      tn.e = C + E * b - 1, B(tn, v ? a + tn.e + 1 : a, g, Z);
    }
    return tn;
  };
}();
function B(i, f, r, s) {
  var o, a, g, v, w, d, E, C, S, b = i.constructor;
  n:
    if (f != null) {
      if (C = i.d, !C)
        return i;
      for (o = 1, v = C[0]; v >= 10; v /= 10)
        o++;
      if (a = f - o, a < 0)
        a += H, g = f, E = C[S = 0], w = E / Rn(10, o - g - 1) % 10 | 0;
      else if (S = Math.ceil((a + 1) / H), v = C.length, S >= v)
        if (s) {
          for (; v++ <= S; )
            C.push(0);
          E = w = 0, o = 1, a %= H, g = a - H + 1;
        } else
          break n;
      else {
        for (E = v = C[S], o = 1; v >= 10; v /= 10)
          o++;
        a %= H, g = a - H + o, w = g < 0 ? 0 : E / Rn(10, o - g - 1) % 10 | 0;
      }
      if (s = s || f < 0 || C[S + 1] !== void 0 || (g < 0 ? E : E % Rn(10, o - g - 1)), d = r < 4 ? (w || s) && (r == 0 || r == (i.s < 0 ? 3 : 2)) : w > 5 || w == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (a > 0 ? g > 0 ? E / Rn(10, o - g) : 0 : C[S - 1]) % 10 & 1 || r == (i.s < 0 ? 8 : 7)), f < 1 || !C[0])
        return C.length = 0, d ? (f -= i.e + 1, C[0] = Rn(10, (H - f % H) % H), i.e = -f || 0) : C[0] = i.e = 0, i;
      if (a == 0 ? (C.length = S, v = 1, S--) : (C.length = S + 1, v = Rn(10, H - a), C[S] = g > 0 ? (E / Rn(10, o - g) % Rn(10, g) | 0) * v : 0), d)
        for (; ; )
          if (S == 0) {
            for (a = 1, g = C[0]; g >= 10; g /= 10)
              a++;
            for (g = C[0] += v, v = 1; g >= 10; g /= 10)
              v++;
            a != v && (i.e++, C[0] == he && (C[0] = 1));
            break;
          } else {
            if (C[S] += v, C[S] != he)
              break;
            C[S--] = 0, v = 1;
          }
      for (a = C.length; C[--a] === 0; )
        C.pop();
    }
  return K && (i.e > b.maxE ? (i.d = null, i.e = NaN) : i.e < b.minE && (i.e = 0, i.d = [0])), i;
}
function _e(i, f, r) {
  if (!i.isFinite())
    return _s(i);
  var s, o = i.e, a = On(i.d), g = a.length;
  return f ? (r && (s = r - g) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Ue(s) : g > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i.e < 0 ? "e" : "e+") + i.e) : o < 0 ? (a = "0." + Ue(-o - 1) + a, r && (s = r - g) > 0 && (a += Ue(s))) : o >= g ? (a += Ue(o + 1 - g), r && (s = r - o - 1) > 0 && (a = a + "." + Ue(s))) : ((s = o + 1) < g && (a = a.slice(0, s) + "." + a.slice(s)), r && (s = r - g) > 0 && (o + 1 === g && (a += "."), a += Ue(s))), a;
}
function zr(i, f) {
  var r = i[0];
  for (f *= H; r >= 10; r /= 10)
    f++;
  return f;
}
function Gr(i, f, r) {
  if (f > Cp)
    throw K = !0, r && (i.precision = r), Error(as);
  return B(new i(Hr), f, 1, !0);
}
function ce(i, f, r) {
  if (f > wu)
    throw Error(as);
  return B(new i(qr), f, r, !0);
}
function ps(i) {
  var f = i.length - 1, r = f * H + 1;
  if (f = i[f], f) {
    for (; f % 10 == 0; f /= 10)
      r--;
    for (f = i[0]; f >= 10; f /= 10)
      r++;
  }
  return r;
}
function Ue(i) {
  for (var f = ""; i--; )
    f += "0";
  return f;
}
function ds(i, f, r, s) {
  var o, a = new i(1), g = Math.ceil(s / H + 4);
  for (K = !1; ; ) {
    if (r % 2 && (a = a.times(f), is(a.d, g) && (o = !0)), r = Dn(r / 2), r === 0) {
      r = a.d.length - 1, o && a.d[r] === 0 && ++a.d[r];
      break;
    }
    f = f.times(f), is(f.d, g);
  }
  return K = !0, a;
}
function rs(i) {
  return i.d[i.d.length - 1] & 1;
}
function vs(i, f, r) {
  for (var s, o = new i(f[0]), a = 0; ++a < f.length; )
    if (s = new i(f[a]), s.s)
      o[r](s) && (o = s);
    else {
      o = s;
      break;
    }
  return o;
}
function mu(i, f) {
  var r, s, o, a, g, v, w, d = 0, E = 0, C = 0, S = i.constructor, b = S.rounding, Z = S.precision;
  if (!i.d || !i.d[0] || i.e > 17)
    return new S(i.d ? i.d[0] ? i.s < 0 ? 0 : 1 / 0 : 1 : i.s ? i.s < 0 ? 0 : i : NaN);
  for (f == null ? (K = !1, w = Z) : w = f, v = new S(0.03125); i.e > -2; )
    i = i.times(v), C += 5;
  for (s = Math.log(Rn(2, C)) / Math.LN10 * 2 + 5 | 0, w += s, r = a = g = new S(1), S.precision = w; ; ) {
    if (a = B(a.times(i), w, 1), r = r.times(++E), v = g.plus(cn(a, r, w, 1)), On(v.d).slice(0, w) === On(g.d).slice(0, w)) {
      for (o = C; o--; )
        g = B(g.times(g), w, 1);
      if (f == null)
        if (d < 3 && $t(g.d, w - s, b, d))
          S.precision = w += 10, r = a = v = new S(1), E = 0, d++;
        else
          return B(g, S.precision = Z, b, K = !0);
      else
        return S.precision = Z, g;
    }
    g = v;
  }
}
function He(i, f) {
  var r, s, o, a, g, v, w, d, E, C, S, b = 1, Z = 10, W = i, un = W.d, tn = W.constructor, F = tn.rounding, O = tn.precision;
  if (W.s < 0 || !un || !un[0] || !W.e && un[0] == 1 && un.length == 1)
    return new tn(un && !un[0] ? -1 / 0 : W.s != 1 ? NaN : un ? 0 : W);
  if (f == null ? (K = !1, E = O) : E = f, tn.precision = E += Z, r = On(un), s = r.charAt(0), Math.abs(a = W.e) < 15e14) {
    for (; s < 7 && s != 1 || s == 1 && r.charAt(1) > 3; )
      W = W.times(i), r = On(W.d), s = r.charAt(0), b++;
    a = W.e, s > 1 ? (W = new tn("0." + r), a++) : W = new tn(s + "." + r.slice(1));
  } else
    return d = Gr(tn, E + 2, O).times(a + ""), W = He(new tn(s + "." + r.slice(1)), E - Z).plus(d), tn.precision = O, f == null ? B(W, O, F, K = !0) : W;
  for (C = W, w = g = W = cn(W.minus(1), W.plus(1), E, 1), S = B(W.times(W), E, 1), o = 3; ; ) {
    if (g = B(g.times(S), E, 1), d = w.plus(cn(g, new tn(o), E, 1)), On(d.d).slice(0, E) === On(w.d).slice(0, E))
      if (w = w.times(2), a !== 0 && (w = w.plus(Gr(tn, E + 2, O).times(a + ""))), w = cn(w, new tn(b), E, 1), f == null)
        if ($t(w.d, E - Z, F, v))
          tn.precision = E += Z, d = g = W = cn(C.minus(1), C.plus(1), E, 1), S = B(W.times(W), E, 1), o = v = 1;
        else
          return B(w, tn.precision = O, F, K = !0);
      else
        return tn.precision = O, w;
    w = d, o += 2;
  }
}
function _s(i) {
  return String(i.s * i.s / 0);
}
function Au(i, f) {
  var r, s, o;
  for ((r = f.indexOf(".")) > -1 && (f = f.replace(".", "")), (s = f.search(/e/i)) > 0 ? (r < 0 && (r = s), r += +f.slice(s + 1), f = f.substring(0, s)) : r < 0 && (r = f.length), s = 0; f.charCodeAt(s) === 48; s++)
    ;
  for (o = f.length; f.charCodeAt(o - 1) === 48; --o)
    ;
  if (f = f.slice(s, o), f) {
    if (o -= s, i.e = r = r - s - 1, i.d = [], s = (r + 1) % H, r < 0 && (s += H), s < o) {
      for (s && i.d.push(+f.slice(0, s)), o -= H; s < o; )
        i.d.push(+f.slice(s, s += H));
      f = f.slice(s), s = H - f.length;
    } else
      s -= o;
    for (; s--; )
      f += "0";
    i.d.push(+f), K && (i.e > i.constructor.maxE ? (i.d = null, i.e = NaN) : i.e < i.constructor.minE && (i.e = 0, i.d = [0]));
  } else
    i.e = 0, i.d = [0];
  return i;
}
function Sp(i, f) {
  var r, s, o, a, g, v, w, d, E;
  if (f.indexOf("_") > -1) {
    if (f = f.replace(/(\d)_(?=\d)/g, "$1"), gs.test(f))
      return Au(i, f);
  } else if (f === "Infinity" || f === "NaN")
    return +f || (i.s = NaN), i.e = NaN, i.d = null, i;
  if (Ap.test(f))
    r = 16, f = f.toLowerCase();
  else if (mp.test(f))
    r = 2;
  else if (Ep.test(f))
    r = 8;
  else
    throw Error(qe + f);
  for (a = f.search(/p/i), a > 0 ? (w = +f.slice(a + 1), f = f.substring(2, a)) : f = f.slice(2), a = f.indexOf("."), g = a >= 0, s = i.constructor, g && (f = f.replace(".", ""), v = f.length, a = v - a, o = ds(s, new s(r), a, a * 2)), d = Ur(f, r, he), E = d.length - 1, a = E; d[a] === 0; --a)
    d.pop();
  return a < 0 ? new s(i.s * 0) : (i.e = zr(d, E), i.d = d, K = !1, g && (i = cn(i, o, v * 4)), w && (i = i.times(Math.abs(w) < 54 ? Rn(2, w) : wt.pow(2, w))), K = !0, i);
}
function Rp(i, f) {
  var r, s = f.d.length;
  if (s < 3)
    return f.isZero() ? f : _t(i, 2, f, f);
  r = 1.4 * Math.sqrt(s), r = r > 16 ? 16 : r | 0, f = f.times(1 / Kr(5, r)), f = _t(i, 2, f, f);
  for (var o, a = new i(5), g = new i(16), v = new i(20); r--; )
    o = f.times(f), f = f.times(a.plus(o.times(g.times(o).minus(v))));
  return f;
}
function _t(i, f, r, s, o) {
  var a, g, v, w, d = i.precision, E = Math.ceil(d / H);
  for (K = !1, w = r.times(r), v = new i(s); ; ) {
    if (g = cn(v.times(w), new i(f++ * f++), d, 1), v = o ? s.plus(g) : s.minus(g), s = cn(g.times(w), new i(f++ * f++), d, 1), g = v.plus(s), g.d[E] !== void 0) {
      for (a = E; g.d[a] === v.d[a] && a--; )
        ;
      if (a == -1)
        break;
    }
    a = v, v = s, s = g, g = a;
  }
  return K = !0, g.d.length = E + 1, g;
}
function Kr(i, f) {
  for (var r = i; --f; )
    r *= i;
  return r;
}
function ws(i, f) {
  var r, s = f.s < 0, o = ce(i, i.precision, 1), a = o.times(0.5);
  if (f = f.abs(), f.lte(a))
    return Ne = s ? 4 : 1, f;
  if (r = f.divToInt(o), r.isZero())
    Ne = s ? 3 : 2;
  else {
    if (f = f.minus(r.times(o)), f.lte(a))
      return Ne = rs(r) ? s ? 2 : 3 : s ? 4 : 1, f;
    Ne = rs(r) ? s ? 1 : 4 : s ? 3 : 2;
  }
  return f.minus(o).abs();
}
function Eu(i, f, r, s) {
  var o, a, g, v, w, d, E, C, S, b = i.constructor, Z = r !== void 0;
  if (Z ? ($n(r, 1, Ge), s === void 0 ? s = b.rounding : $n(s, 0, 8)) : (r = b.precision, s = b.rounding), !i.isFinite())
    E = _s(i);
  else {
    for (E = _e(i), g = E.indexOf("."), Z ? (o = 2, f == 16 ? r = r * 4 - 3 : f == 8 && (r = r * 3 - 2)) : o = f, g >= 0 && (E = E.replace(".", ""), S = new b(1), S.e = E.length - g, S.d = Ur(_e(S), 10, o), S.e = S.d.length), C = Ur(E, 10, o), a = w = C.length; C[--w] == 0; )
      C.pop();
    if (!C[0])
      E = Z ? "0p+0" : "0";
    else {
      if (g < 0 ? a-- : (i = new b(i), i.d = C, i.e = a, i = cn(i, S, r, s, 0, o), C = i.d, a = i.e, d = ls), g = C[r], v = o / 2, d = d || C[r + 1] !== void 0, d = s < 4 ? (g !== void 0 || d) && (s === 0 || s === (i.s < 0 ? 3 : 2)) : g > v || g === v && (s === 4 || d || s === 6 && C[r - 1] & 1 || s === (i.s < 0 ? 8 : 7)), C.length = r, d)
        for (; ++C[--r] > o - 1; )
          C[r] = 0, r || (++a, C.unshift(1));
      for (w = C.length; !C[w - 1]; --w)
        ;
      for (g = 0, E = ""; g < w; g++)
        E += vu.charAt(C[g]);
      if (Z) {
        if (w > 1)
          if (f == 16 || f == 8) {
            for (g = f == 16 ? 4 : 3, --w; w % g; w++)
              E += "0";
            for (C = Ur(E, o, f), w = C.length; !C[w - 1]; --w)
              ;
            for (g = 1, E = "1."; g < w; g++)
              E += vu.charAt(C[g]);
          } else
            E = E.charAt(0) + "." + E.slice(1);
        E = E + (a < 0 ? "p" : "p+") + a;
      } else if (a < 0) {
        for (; ++a; )
          E = "0" + E;
        E = "0." + E;
      } else if (++a > w)
        for (a -= w; a--; )
          E += "0";
      else
        a < w && (E = E.slice(0, a) + "." + E.slice(a));
    }
    E = (f == 16 ? "0x" : f == 2 ? "0b" : f == 8 ? "0o" : "") + E;
  }
  return i.s < 0 ? "-" + E : E;
}
function is(i, f) {
  if (i.length > f)
    return i.length = f, !0;
}
function Lp(i) {
  return new this(i).abs();
}
function Np(i) {
  return new this(i).acos();
}
function Tp(i) {
  return new this(i).acosh();
}
function bp(i, f) {
  return new this(i).plus(f);
}
function Op(i) {
  return new this(i).asin();
}
function Pp(i) {
  return new this(i).asinh();
}
function Mp(i) {
  return new this(i).atan();
}
function Fp(i) {
  return new this(i).atanh();
}
function Dp(i, f) {
  i = new this(i), f = new this(f);
  var r, s = this.precision, o = this.rounding, a = s + 4;
  return !i.s || !f.s ? r = new this(NaN) : !i.d && !f.d ? (r = ce(this, a, 1).times(f.s > 0 ? 0.25 : 0.75), r.s = i.s) : !f.d || i.isZero() ? (r = f.s < 0 ? ce(this, s, o) : new this(0), r.s = i.s) : !i.d || f.isZero() ? (r = ce(this, a, 1).times(0.5), r.s = i.s) : f.s < 0 ? (this.precision = a, this.rounding = 1, r = this.atan(cn(i, f, a, 1)), f = ce(this, a, 1), this.precision = s, this.rounding = o, r = i.s < 0 ? r.minus(f) : r.plus(f)) : r = this.atan(cn(i, f, a, 1)), r;
}
function yp(i) {
  return new this(i).cbrt();
}
function Bp(i) {
  return B(i = new this(i), i.e + 1, 2);
}
function Wp(i, f, r) {
  return new this(i).clamp(f, r);
}
function Up(i) {
  if (!i || typeof i != "object")
    throw Error($r + "Object expected");
  var f, r, s, o = i.defaults === !0, a = [
    "precision",
    1,
    Ge,
    "rounding",
    0,
    8,
    "toExpNeg",
    -vt,
    0,
    "toExpPos",
    0,
    vt,
    "maxE",
    0,
    vt,
    "minE",
    -vt,
    0,
    "modulo",
    0,
    9
  ];
  for (f = 0; f < a.length; f += 3)
    if (r = a[f], o && (this[r] = _u[r]), (s = i[r]) !== void 0)
      if (Dn(s) === s && s >= a[f + 1] && s <= a[f + 2])
        this[r] = s;
      else
        throw Error(qe + r + ": " + s);
  if (r = "crypto", o && (this[r] = _u[r]), (s = i[r]) !== void 0)
    if (s === !0 || s === !1 || s === 0 || s === 1)
      if (s)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[r] = !0;
        else
          throw Error(cs);
      else
        this[r] = !1;
    else
      throw Error(qe + r + ": " + s);
  return this;
}
function Hp(i) {
  return new this(i).cos();
}
function qp(i) {
  return new this(i).cosh();
}
function ms(i) {
  var f, r, s;
  function o(a) {
    var g, v, w, d = this;
    if (!(d instanceof o))
      return new o(a);
    if (d.constructor = o, us(a)) {
      d.s = a.s, K ? !a.d || a.e > o.maxE ? (d.e = NaN, d.d = null) : a.e < o.minE ? (d.e = 0, d.d = [0]) : (d.e = a.e, d.d = a.d.slice()) : (d.e = a.e, d.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (w = typeof a, w === "number") {
      if (a === 0) {
        d.s = 1 / a < 0 ? -1 : 1, d.e = 0, d.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, d.s = -1) : d.s = 1, a === ~~a && a < 1e7) {
        for (g = 0, v = a; v >= 10; v /= 10)
          g++;
        K ? g > o.maxE ? (d.e = NaN, d.d = null) : g < o.minE ? (d.e = 0, d.d = [0]) : (d.e = g, d.d = [a]) : (d.e = g, d.d = [a]);
        return;
      } else if (a * 0 !== 0) {
        a || (d.s = NaN), d.e = NaN, d.d = null;
        return;
      }
      return Au(d, a.toString());
    } else if (w !== "string")
      throw Error(qe + a);
    return (v = a.charCodeAt(0)) === 45 ? (a = a.slice(1), d.s = -1) : (v === 43 && (a = a.slice(1)), d.s = 1), gs.test(a) ? Au(d, a) : Sp(d, a);
  }
  if (o.prototype = N, o.ROUND_UP = 0, o.ROUND_DOWN = 1, o.ROUND_CEIL = 2, o.ROUND_FLOOR = 3, o.ROUND_HALF_UP = 4, o.ROUND_HALF_DOWN = 5, o.ROUND_HALF_EVEN = 6, o.ROUND_HALF_CEIL = 7, o.ROUND_HALF_FLOOR = 8, o.EUCLID = 9, o.config = o.set = Up, o.clone = ms, o.isDecimal = us, o.abs = Lp, o.acos = Np, o.acosh = Tp, o.add = bp, o.asin = Op, o.asinh = Pp, o.atan = Mp, o.atanh = Fp, o.atan2 = Dp, o.cbrt = yp, o.ceil = Bp, o.clamp = Wp, o.cos = Hp, o.cosh = qp, o.div = Gp, o.exp = Zp, o.floor = $p, o.hypot = zp, o.ln = Kp, o.log = Yp, o.log10 = kp, o.log2 = Xp, o.max = Jp, o.min = Qp, o.mod = Vp, o.mul = jp, o.pow = nd, o.random = ed, o.round = td, o.sign = rd, o.sin = id, o.sinh = ud, o.sqrt = fd, o.sub = od, o.sum = sd, o.tan = ld, o.tanh = ad, o.trunc = cd, i === void 0 && (i = {}), i && i.defaults !== !0)
    for (s = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], f = 0; f < s.length; )
      i.hasOwnProperty(r = s[f++]) || (i[r] = this[r]);
  return o.config(i), o;
}
function Gp(i, f) {
  return new this(i).div(f);
}
function Zp(i) {
  return new this(i).exp();
}
function $p(i) {
  return B(i = new this(i), i.e + 1, 3);
}
function zp() {
  var i, f, r = new this(0);
  for (K = !1, i = 0; i < arguments.length; )
    if (f = new this(arguments[i++]), f.d)
      r.d && (r = r.plus(f.times(f)));
    else {
      if (f.s)
        return K = !0, new this(1 / 0);
      r = f;
    }
  return K = !0, r.sqrt();
}
function us(i) {
  return i instanceof wt || i && i.toStringTag === hs || !1;
}
function Kp(i) {
  return new this(i).ln();
}
function Yp(i, f) {
  return new this(i).log(f);
}
function Xp(i) {
  return new this(i).log(2);
}
function kp(i) {
  return new this(i).log(10);
}
function Jp() {
  return vs(this, arguments, "lt");
}
function Qp() {
  return vs(this, arguments, "gt");
}
function Vp(i, f) {
  return new this(i).mod(f);
}
function jp(i, f) {
  return new this(i).mul(f);
}
function nd(i, f) {
  return new this(i).pow(f);
}
function ed(i) {
  var f, r, s, o, a = 0, g = new this(1), v = [];
  if (i === void 0 ? i = this.precision : $n(i, 1, Ge), s = Math.ceil(i / H), this.crypto)
    if (crypto.getRandomValues)
      for (f = crypto.getRandomValues(new Uint32Array(s)); a < s; )
        o = f[a], o >= 429e7 ? f[a] = crypto.getRandomValues(new Uint32Array(1))[0] : v[a++] = o % 1e7;
    else if (crypto.randomBytes) {
      for (f = crypto.randomBytes(s *= 4); a < s; )
        o = f[a] + (f[a + 1] << 8) + (f[a + 2] << 16) + ((f[a + 3] & 127) << 24), o >= 214e7 ? crypto.randomBytes(4).copy(f, a) : (v.push(o % 1e7), a += 4);
      a = s / 4;
    } else
      throw Error(cs);
  else
    for (; a < s; )
      v[a++] = Math.random() * 1e7 | 0;
  for (s = v[--a], i %= H, s && i && (o = Rn(10, H - i), v[a] = (s / o | 0) * o); v[a] === 0; a--)
    v.pop();
  if (a < 0)
    r = 0, v = [0];
  else {
    for (r = -1; v[0] === 0; r -= H)
      v.shift();
    for (s = 1, o = v[0]; o >= 10; o /= 10)
      s++;
    s < H && (r -= H - s);
  }
  return g.e = r, g.d = v, g;
}
function td(i) {
  return B(i = new this(i), i.e + 1, this.rounding);
}
function rd(i) {
  return i = new this(i), i.d ? i.d[0] ? i.s : 0 * i.s : i.s || NaN;
}
function id(i) {
  return new this(i).sin();
}
function ud(i) {
  return new this(i).sinh();
}
function fd(i) {
  return new this(i).sqrt();
}
function od(i, f) {
  return new this(i).sub(f);
}
function sd() {
  var i = 0, f = arguments, r = new this(f[i]);
  for (K = !1; r.s && ++i < f.length; )
    r = r.plus(f[i]);
  return K = !0, B(r, this.precision, this.rounding);
}
function ld(i) {
  return new this(i).tan();
}
function ad(i) {
  return new this(i).tanh();
}
function cd(i) {
  return B(i = new this(i), i.e + 1, 1);
}
N[Symbol.for("nodejs.util.inspect.custom")] = N.toString;
N[Symbol.toStringTag] = "Decimal";
var wt = N.constructor = ms(_u);
Hr = new wt(Hr);
qr = new wt(qr);
const mn = (i, f = 1) => isNaN(Number(i)) ? f : Number(i), hd = (i, f, r = !1, s = 2) => {
  const o = mn(f), a = mn(i);
  return r ? Number(
    new wt(a / o).toDecimalPlaces(s).toNumber()
  ) : Math.round(a / o);
}, Wr = (i, f = "px") => i ? i + f : "0", je = (i, f, r, s = !0) => i < f && s ? f : i > r && s ? r : i;
function fs(i, f, r) {
  i && i.addEventListener(f, r, !1);
}
function os(i, f, r) {
  i && i.removeEventListener(f, r, !1);
}
var Gt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gd(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Zr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Zr.exports;
(function(i, f) {
  (function() {
    var r, s = "4.17.21", o = 200, a = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", g = "Expected a function", v = "Invalid `variable` option passed into `_.template`", w = "__lodash_hash_undefined__", d = 500, E = "__lodash_placeholder__", C = 1, S = 2, b = 4, Z = 1, W = 2, un = 1, tn = 2, F = 4, O = 8, D = 16, z = 32, $ = 64, ln = 128, Cn = 256, pn = 512, Un = 30, dn = "...", J = 800, Pn = 16, Ln = 1, vn = 2, rn = 3, Ze = 1 / 0, Te = 9007199254740991, As = 17976931348623157e292, zt = NaN, ge = 4294967295, Es = ge - 1, xs = ge >>> 1, Cs = [
      ["ary", ln],
      ["bind", un],
      ["bindKey", tn],
      ["curry", O],
      ["curryRight", D],
      ["flip", pn],
      ["partial", z],
      ["partialRight", $],
      ["rearg", Cn]
    ], nt = "[object Arguments]", Kt = "[object Array]", Is = "[object AsyncFunction]", mt = "[object Boolean]", At = "[object Date]", Ss = "[object DOMException]", Yt = "[object Error]", Xt = "[object Function]", xu = "[object GeneratorFunction]", ue = "[object Map]", Et = "[object Number]", Rs = "[object Null]", we = "[object Object]", Cu = "[object Promise]", Ls = "[object Proxy]", xt = "[object RegExp]", fe = "[object Set]", Ct = "[object String]", kt = "[object Symbol]", Ns = "[object Undefined]", It = "[object WeakMap]", Ts = "[object WeakSet]", St = "[object ArrayBuffer]", et = "[object DataView]", Yr = "[object Float32Array]", Xr = "[object Float64Array]", kr = "[object Int8Array]", Jr = "[object Int16Array]", Qr = "[object Int32Array]", Vr = "[object Uint8Array]", jr = "[object Uint8ClampedArray]", ni = "[object Uint16Array]", ei = "[object Uint32Array]", bs = /\b__p \+= '';/g, Os = /\b(__p \+=) '' \+/g, Ps = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Iu = /&(?:amp|lt|gt|quot|#39);/g, Su = /[&<>"']/g, Ms = RegExp(Iu.source), Fs = RegExp(Su.source), Ds = /<%-([\s\S]+?)%>/g, ys = /<%([\s\S]+?)%>/g, Ru = /<%=([\s\S]+?)%>/g, Bs = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ws = /^\w*$/, Us = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ti = /[\\^$.*+?()[\]{}|]/g, Hs = RegExp(ti.source), ri = /^\s+/, qs = /\s/, Gs = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Zs = /\{\n\/\* \[wrapped with (.+)\] \*/, $s = /,? & /, zs = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ks = /[()=,{}\[\]\/\s]/, Ys = /\\(\\)?/g, Xs = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Lu = /\w*$/, ks = /^[-+]0x[0-9a-f]+$/i, Js = /^0b[01]+$/i, Qs = /^\[object .+?Constructor\]$/, Vs = /^0o[0-7]+$/i, js = /^(?:0|[1-9]\d*)$/, nl = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Jt = /($^)/, el = /['\n\r\u2028\u2029\\]/g, Qt = "\\ud800-\\udfff", tl = "\\u0300-\\u036f", rl = "\\ufe20-\\ufe2f", il = "\\u20d0-\\u20ff", Nu = tl + rl + il, Tu = "\\u2700-\\u27bf", bu = "a-z\\xdf-\\xf6\\xf8-\\xff", ul = "\\xac\\xb1\\xd7\\xf7", fl = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ol = "\\u2000-\\u206f", sl = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ou = "A-Z\\xc0-\\xd6\\xd8-\\xde", Pu = "\\ufe0e\\ufe0f", Mu = ul + fl + ol + sl, ii = "['’]", ll = "[" + Qt + "]", Fu = "[" + Mu + "]", Vt = "[" + Nu + "]", Du = "\\d+", al = "[" + Tu + "]", yu = "[" + bu + "]", Bu = "[^" + Qt + Mu + Du + Tu + bu + Ou + "]", ui = "\\ud83c[\\udffb-\\udfff]", cl = "(?:" + Vt + "|" + ui + ")", Wu = "[^" + Qt + "]", fi = "(?:\\ud83c[\\udde6-\\uddff]){2}", oi = "[\\ud800-\\udbff][\\udc00-\\udfff]", tt = "[" + Ou + "]", Uu = "\\u200d", Hu = "(?:" + yu + "|" + Bu + ")", hl = "(?:" + tt + "|" + Bu + ")", qu = "(?:" + ii + "(?:d|ll|m|re|s|t|ve))?", Gu = "(?:" + ii + "(?:D|LL|M|RE|S|T|VE))?", Zu = cl + "?", $u = "[" + Pu + "]?", gl = "(?:" + Uu + "(?:" + [Wu, fi, oi].join("|") + ")" + $u + Zu + ")*", pl = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", dl = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", zu = $u + Zu + gl, vl = "(?:" + [al, fi, oi].join("|") + ")" + zu, _l = "(?:" + [Wu + Vt + "?", Vt, fi, oi, ll].join("|") + ")", wl = RegExp(ii, "g"), ml = RegExp(Vt, "g"), si = RegExp(ui + "(?=" + ui + ")|" + _l + zu, "g"), Al = RegExp([
      tt + "?" + yu + "+" + qu + "(?=" + [Fu, tt, "$"].join("|") + ")",
      hl + "+" + Gu + "(?=" + [Fu, tt + Hu, "$"].join("|") + ")",
      tt + "?" + Hu + "+" + qu,
      tt + "+" + Gu,
      dl,
      pl,
      Du,
      vl
    ].join("|"), "g"), El = RegExp("[" + Uu + Qt + Nu + Pu + "]"), xl = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Cl = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], Il = -1, gn = {};
    gn[Yr] = gn[Xr] = gn[kr] = gn[Jr] = gn[Qr] = gn[Vr] = gn[jr] = gn[ni] = gn[ei] = !0, gn[nt] = gn[Kt] = gn[St] = gn[mt] = gn[et] = gn[At] = gn[Yt] = gn[Xt] = gn[ue] = gn[Et] = gn[we] = gn[xt] = gn[fe] = gn[Ct] = gn[It] = !1;
    var hn = {};
    hn[nt] = hn[Kt] = hn[St] = hn[et] = hn[mt] = hn[At] = hn[Yr] = hn[Xr] = hn[kr] = hn[Jr] = hn[Qr] = hn[ue] = hn[Et] = hn[we] = hn[xt] = hn[fe] = hn[Ct] = hn[kt] = hn[Vr] = hn[jr] = hn[ni] = hn[ei] = !0, hn[Yt] = hn[Xt] = hn[It] = !1;
    var Sl = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Rl = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, Ll = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Nl = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Tl = parseFloat, bl = parseInt, Ku = typeof Gt == "object" && Gt && Gt.Object === Object && Gt, Ol = typeof self == "object" && self && self.Object === Object && self, Tn = Ku || Ol || Function("return this")(), li = f && !f.nodeType && f, $e = li && !0 && i && !i.nodeType && i, Yu = $e && $e.exports === li, ai = Yu && Ku.process, Qn = function() {
      try {
        var m = $e && $e.require && $e.require("util").types;
        return m || ai && ai.binding && ai.binding("util");
      } catch {
      }
    }(), Xu = Qn && Qn.isArrayBuffer, ku = Qn && Qn.isDate, Ju = Qn && Qn.isMap, Qu = Qn && Qn.isRegExp, Vu = Qn && Qn.isSet, ju = Qn && Qn.isTypedArray;
    function zn(m, I, x) {
      switch (x.length) {
        case 0:
          return m.call(I);
        case 1:
          return m.call(I, x[0]);
        case 2:
          return m.call(I, x[0], x[1]);
        case 3:
          return m.call(I, x[0], x[1], x[2]);
      }
      return m.apply(I, x);
    }
    function Pl(m, I, x, M) {
      for (var Y = -1, fn = m == null ? 0 : m.length; ++Y < fn; ) {
        var In = m[Y];
        I(M, In, x(In), m);
      }
      return M;
    }
    function Vn(m, I) {
      for (var x = -1, M = m == null ? 0 : m.length; ++x < M && I(m[x], x, m) !== !1; )
        ;
      return m;
    }
    function Ml(m, I) {
      for (var x = m == null ? 0 : m.length; x-- && I(m[x], x, m) !== !1; )
        ;
      return m;
    }
    function nf(m, I) {
      for (var x = -1, M = m == null ? 0 : m.length; ++x < M; )
        if (!I(m[x], x, m))
          return !1;
      return !0;
    }
    function be(m, I) {
      for (var x = -1, M = m == null ? 0 : m.length, Y = 0, fn = []; ++x < M; ) {
        var In = m[x];
        I(In, x, m) && (fn[Y++] = In);
      }
      return fn;
    }
    function jt(m, I) {
      var x = m == null ? 0 : m.length;
      return !!x && rt(m, I, 0) > -1;
    }
    function ci(m, I, x) {
      for (var M = -1, Y = m == null ? 0 : m.length; ++M < Y; )
        if (x(I, m[M]))
          return !0;
      return !1;
    }
    function _n(m, I) {
      for (var x = -1, M = m == null ? 0 : m.length, Y = Array(M); ++x < M; )
        Y[x] = I(m[x], x, m);
      return Y;
    }
    function Oe(m, I) {
      for (var x = -1, M = I.length, Y = m.length; ++x < M; )
        m[Y + x] = I[x];
      return m;
    }
    function hi(m, I, x, M) {
      var Y = -1, fn = m == null ? 0 : m.length;
      for (M && fn && (x = m[++Y]); ++Y < fn; )
        x = I(x, m[Y], Y, m);
      return x;
    }
    function Fl(m, I, x, M) {
      var Y = m == null ? 0 : m.length;
      for (M && Y && (x = m[--Y]); Y--; )
        x = I(x, m[Y], Y, m);
      return x;
    }
    function gi(m, I) {
      for (var x = -1, M = m == null ? 0 : m.length; ++x < M; )
        if (I(m[x], x, m))
          return !0;
      return !1;
    }
    var Dl = pi("length");
    function yl(m) {
      return m.split("");
    }
    function Bl(m) {
      return m.match(zs) || [];
    }
    function ef(m, I, x) {
      var M;
      return x(m, function(Y, fn, In) {
        if (I(Y, fn, In))
          return M = fn, !1;
      }), M;
    }
    function nr(m, I, x, M) {
      for (var Y = m.length, fn = x + (M ? 1 : -1); M ? fn-- : ++fn < Y; )
        if (I(m[fn], fn, m))
          return fn;
      return -1;
    }
    function rt(m, I, x) {
      return I === I ? kl(m, I, x) : nr(m, tf, x);
    }
    function Wl(m, I, x, M) {
      for (var Y = x - 1, fn = m.length; ++Y < fn; )
        if (M(m[Y], I))
          return Y;
      return -1;
    }
    function tf(m) {
      return m !== m;
    }
    function rf(m, I) {
      var x = m == null ? 0 : m.length;
      return x ? vi(m, I) / x : zt;
    }
    function pi(m) {
      return function(I) {
        return I == null ? r : I[m];
      };
    }
    function di(m) {
      return function(I) {
        return m == null ? r : m[I];
      };
    }
    function uf(m, I, x, M, Y) {
      return Y(m, function(fn, In, an) {
        x = M ? (M = !1, fn) : I(x, fn, In, an);
      }), x;
    }
    function Ul(m, I) {
      var x = m.length;
      for (m.sort(I); x--; )
        m[x] = m[x].value;
      return m;
    }
    function vi(m, I) {
      for (var x, M = -1, Y = m.length; ++M < Y; ) {
        var fn = I(m[M]);
        fn !== r && (x = x === r ? fn : x + fn);
      }
      return x;
    }
    function _i(m, I) {
      for (var x = -1, M = Array(m); ++x < m; )
        M[x] = I(x);
      return M;
    }
    function Hl(m, I) {
      return _n(I, function(x) {
        return [x, m[x]];
      });
    }
    function ff(m) {
      return m && m.slice(0, af(m) + 1).replace(ri, "");
    }
    function Kn(m) {
      return function(I) {
        return m(I);
      };
    }
    function wi(m, I) {
      return _n(I, function(x) {
        return m[x];
      });
    }
    function Rt(m, I) {
      return m.has(I);
    }
    function of(m, I) {
      for (var x = -1, M = m.length; ++x < M && rt(I, m[x], 0) > -1; )
        ;
      return x;
    }
    function sf(m, I) {
      for (var x = m.length; x-- && rt(I, m[x], 0) > -1; )
        ;
      return x;
    }
    function ql(m, I) {
      for (var x = m.length, M = 0; x--; )
        m[x] === I && ++M;
      return M;
    }
    var Gl = di(Sl), Zl = di(Rl);
    function $l(m) {
      return "\\" + Nl[m];
    }
    function zl(m, I) {
      return m == null ? r : m[I];
    }
    function it(m) {
      return El.test(m);
    }
    function Kl(m) {
      return xl.test(m);
    }
    function Yl(m) {
      for (var I, x = []; !(I = m.next()).done; )
        x.push(I.value);
      return x;
    }
    function mi(m) {
      var I = -1, x = Array(m.size);
      return m.forEach(function(M, Y) {
        x[++I] = [Y, M];
      }), x;
    }
    function lf(m, I) {
      return function(x) {
        return m(I(x));
      };
    }
    function Pe(m, I) {
      for (var x = -1, M = m.length, Y = 0, fn = []; ++x < M; ) {
        var In = m[x];
        (In === I || In === E) && (m[x] = E, fn[Y++] = x);
      }
      return fn;
    }
    function er(m) {
      var I = -1, x = Array(m.size);
      return m.forEach(function(M) {
        x[++I] = M;
      }), x;
    }
    function Xl(m) {
      var I = -1, x = Array(m.size);
      return m.forEach(function(M) {
        x[++I] = [M, M];
      }), x;
    }
    function kl(m, I, x) {
      for (var M = x - 1, Y = m.length; ++M < Y; )
        if (m[M] === I)
          return M;
      return -1;
    }
    function Jl(m, I, x) {
      for (var M = x + 1; M--; )
        if (m[M] === I)
          return M;
      return M;
    }
    function ut(m) {
      return it(m) ? Vl(m) : Dl(m);
    }
    function oe(m) {
      return it(m) ? jl(m) : yl(m);
    }
    function af(m) {
      for (var I = m.length; I-- && qs.test(m.charAt(I)); )
        ;
      return I;
    }
    var Ql = di(Ll);
    function Vl(m) {
      for (var I = si.lastIndex = 0; si.test(m); )
        ++I;
      return I;
    }
    function jl(m) {
      return m.match(si) || [];
    }
    function na(m) {
      return m.match(Al) || [];
    }
    var ea = function m(I) {
      I = I == null ? Tn : ft.defaults(Tn.Object(), I, ft.pick(Tn, Cl));
      var x = I.Array, M = I.Date, Y = I.Error, fn = I.Function, In = I.Math, an = I.Object, Ai = I.RegExp, ta = I.String, jn = I.TypeError, tr = x.prototype, ra = fn.prototype, ot = an.prototype, rr = I["__core-js_shared__"], ir = ra.toString, sn = ot.hasOwnProperty, ia = 0, cf = function() {
        var n = /[^.]+$/.exec(rr && rr.keys && rr.keys.IE_PROTO || "");
        return n ? "Symbol(src)_1." + n : "";
      }(), ur = ot.toString, ua = ir.call(an), fa = Tn._, oa = Ai(
        "^" + ir.call(sn).replace(ti, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), fr = Yu ? I.Buffer : r, Me = I.Symbol, or = I.Uint8Array, hf = fr ? fr.allocUnsafe : r, sr = lf(an.getPrototypeOf, an), gf = an.create, pf = ot.propertyIsEnumerable, lr = tr.splice, df = Me ? Me.isConcatSpreadable : r, Lt = Me ? Me.iterator : r, ze = Me ? Me.toStringTag : r, ar = function() {
        try {
          var n = Je(an, "defineProperty");
          return n({}, "", {}), n;
        } catch {
        }
      }(), sa = I.clearTimeout !== Tn.clearTimeout && I.clearTimeout, la = M && M.now !== Tn.Date.now && M.now, aa = I.setTimeout !== Tn.setTimeout && I.setTimeout, cr = In.ceil, hr = In.floor, Ei = an.getOwnPropertySymbols, ca = fr ? fr.isBuffer : r, vf = I.isFinite, ha = tr.join, ga = lf(an.keys, an), Sn = In.max, Mn = In.min, pa = M.now, da = I.parseInt, _f = In.random, va = tr.reverse, xi = Je(I, "DataView"), Nt = Je(I, "Map"), Ci = Je(I, "Promise"), st = Je(I, "Set"), Tt = Je(I, "WeakMap"), bt = Je(an, "create"), gr = Tt && new Tt(), lt = {}, _a = Qe(xi), wa = Qe(Nt), ma = Qe(Ci), Aa = Qe(st), Ea = Qe(Tt), pr = Me ? Me.prototype : r, Ot = pr ? pr.valueOf : r, wf = pr ? pr.toString : r;
      function c(n) {
        if (An(n) && !X(n) && !(n instanceof nn)) {
          if (n instanceof ne)
            return n;
          if (sn.call(n, "__wrapped__"))
            return Ao(n);
        }
        return new ne(n);
      }
      var at = /* @__PURE__ */ function() {
        function n() {
        }
        return function(e) {
          if (!wn(e))
            return {};
          if (gf)
            return gf(e);
          n.prototype = e;
          var t = new n();
          return n.prototype = r, t;
        };
      }();
      function dr() {
      }
      function ne(n, e) {
        this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = r;
      }
      c.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: Ds,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: ys,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Ru,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: c
        }
      }, c.prototype = dr.prototype, c.prototype.constructor = c, ne.prototype = at(dr.prototype), ne.prototype.constructor = ne;
      function nn(n) {
        this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = ge, this.__views__ = [];
      }
      function xa() {
        var n = new nn(this.__wrapped__);
        return n.__actions__ = Hn(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = Hn(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = Hn(this.__views__), n;
      }
      function Ca() {
        if (this.__filtered__) {
          var n = new nn(this);
          n.__dir__ = -1, n.__filtered__ = !0;
        } else
          n = this.clone(), n.__dir__ *= -1;
        return n;
      }
      function Ia() {
        var n = this.__wrapped__.value(), e = this.__dir__, t = X(n), u = e < 0, l = t ? n.length : 0, h = yc(0, l, this.__views__), p = h.start, _ = h.end, A = _ - p, R = u ? _ : p - 1, L = this.__iteratees__, T = L.length, P = 0, y = Mn(A, this.__takeCount__);
        if (!t || !u && l == A && y == A)
          return Gf(n, this.__actions__);
        var q = [];
        n:
          for (; A-- && P < y; ) {
            R += e;
            for (var Q = -1, G = n[R]; ++Q < T; ) {
              var j = L[Q], en = j.iteratee, kn = j.type, Wn = en(G);
              if (kn == vn)
                G = Wn;
              else if (!Wn) {
                if (kn == Ln)
                  continue n;
                break n;
              }
            }
            q[P++] = G;
          }
        return q;
      }
      nn.prototype = at(dr.prototype), nn.prototype.constructor = nn;
      function Ke(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.clear(); ++e < t; ) {
          var u = n[e];
          this.set(u[0], u[1]);
        }
      }
      function Sa() {
        this.__data__ = bt ? bt(null) : {}, this.size = 0;
      }
      function Ra(n) {
        var e = this.has(n) && delete this.__data__[n];
        return this.size -= e ? 1 : 0, e;
      }
      function La(n) {
        var e = this.__data__;
        if (bt) {
          var t = e[n];
          return t === w ? r : t;
        }
        return sn.call(e, n) ? e[n] : r;
      }
      function Na(n) {
        var e = this.__data__;
        return bt ? e[n] !== r : sn.call(e, n);
      }
      function Ta(n, e) {
        var t = this.__data__;
        return this.size += this.has(n) ? 0 : 1, t[n] = bt && e === r ? w : e, this;
      }
      Ke.prototype.clear = Sa, Ke.prototype.delete = Ra, Ke.prototype.get = La, Ke.prototype.has = Na, Ke.prototype.set = Ta;
      function me(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.clear(); ++e < t; ) {
          var u = n[e];
          this.set(u[0], u[1]);
        }
      }
      function ba() {
        this.__data__ = [], this.size = 0;
      }
      function Oa(n) {
        var e = this.__data__, t = vr(e, n);
        if (t < 0)
          return !1;
        var u = e.length - 1;
        return t == u ? e.pop() : lr.call(e, t, 1), --this.size, !0;
      }
      function Pa(n) {
        var e = this.__data__, t = vr(e, n);
        return t < 0 ? r : e[t][1];
      }
      function Ma(n) {
        return vr(this.__data__, n) > -1;
      }
      function Fa(n, e) {
        var t = this.__data__, u = vr(t, n);
        return u < 0 ? (++this.size, t.push([n, e])) : t[u][1] = e, this;
      }
      me.prototype.clear = ba, me.prototype.delete = Oa, me.prototype.get = Pa, me.prototype.has = Ma, me.prototype.set = Fa;
      function Ae(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.clear(); ++e < t; ) {
          var u = n[e];
          this.set(u[0], u[1]);
        }
      }
      function Da() {
        this.size = 0, this.__data__ = {
          hash: new Ke(),
          map: new (Nt || me)(),
          string: new Ke()
        };
      }
      function ya(n) {
        var e = Nr(this, n).delete(n);
        return this.size -= e ? 1 : 0, e;
      }
      function Ba(n) {
        return Nr(this, n).get(n);
      }
      function Wa(n) {
        return Nr(this, n).has(n);
      }
      function Ua(n, e) {
        var t = Nr(this, n), u = t.size;
        return t.set(n, e), this.size += t.size == u ? 0 : 1, this;
      }
      Ae.prototype.clear = Da, Ae.prototype.delete = ya, Ae.prototype.get = Ba, Ae.prototype.has = Wa, Ae.prototype.set = Ua;
      function Ye(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.__data__ = new Ae(); ++e < t; )
          this.add(n[e]);
      }
      function Ha(n) {
        return this.__data__.set(n, w), this;
      }
      function qa(n) {
        return this.__data__.has(n);
      }
      Ye.prototype.add = Ye.prototype.push = Ha, Ye.prototype.has = qa;
      function se(n) {
        var e = this.__data__ = new me(n);
        this.size = e.size;
      }
      function Ga() {
        this.__data__ = new me(), this.size = 0;
      }
      function Za(n) {
        var e = this.__data__, t = e.delete(n);
        return this.size = e.size, t;
      }
      function $a(n) {
        return this.__data__.get(n);
      }
      function za(n) {
        return this.__data__.has(n);
      }
      function Ka(n, e) {
        var t = this.__data__;
        if (t instanceof me) {
          var u = t.__data__;
          if (!Nt || u.length < o - 1)
            return u.push([n, e]), this.size = ++t.size, this;
          t = this.__data__ = new Ae(u);
        }
        return t.set(n, e), this.size = t.size, this;
      }
      se.prototype.clear = Ga, se.prototype.delete = Za, se.prototype.get = $a, se.prototype.has = za, se.prototype.set = Ka;
      function mf(n, e) {
        var t = X(n), u = !t && Ve(n), l = !t && !u && We(n), h = !t && !u && !l && pt(n), p = t || u || l || h, _ = p ? _i(n.length, ta) : [], A = _.length;
        for (var R in n)
          (e || sn.call(n, R)) && !(p && // Safari 9 has enumerable `arguments.length` in strict mode.
          (R == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          l && (R == "offset" || R == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          h && (R == "buffer" || R == "byteLength" || R == "byteOffset") || // Skip index properties.
          Ie(R, A))) && _.push(R);
        return _;
      }
      function Af(n) {
        var e = n.length;
        return e ? n[Fi(0, e - 1)] : r;
      }
      function Ya(n, e) {
        return Tr(Hn(n), Xe(e, 0, n.length));
      }
      function Xa(n) {
        return Tr(Hn(n));
      }
      function Ii(n, e, t) {
        (t !== r && !le(n[e], t) || t === r && !(e in n)) && Ee(n, e, t);
      }
      function Pt(n, e, t) {
        var u = n[e];
        (!(sn.call(n, e) && le(u, t)) || t === r && !(e in n)) && Ee(n, e, t);
      }
      function vr(n, e) {
        for (var t = n.length; t--; )
          if (le(n[t][0], e))
            return t;
        return -1;
      }
      function ka(n, e, t, u) {
        return Fe(n, function(l, h, p) {
          e(u, l, t(l), p);
        }), u;
      }
      function Ef(n, e) {
        return n && de(e, Nn(e), n);
      }
      function Ja(n, e) {
        return n && de(e, Gn(e), n);
      }
      function Ee(n, e, t) {
        e == "__proto__" && ar ? ar(n, e, {
          configurable: !0,
          enumerable: !0,
          value: t,
          writable: !0
        }) : n[e] = t;
      }
      function Si(n, e) {
        for (var t = -1, u = e.length, l = x(u), h = n == null; ++t < u; )
          l[t] = h ? r : uu(n, e[t]);
        return l;
      }
      function Xe(n, e, t) {
        return n === n && (t !== r && (n = n <= t ? n : t), e !== r && (n = n >= e ? n : e)), n;
      }
      function ee(n, e, t, u, l, h) {
        var p, _ = e & C, A = e & S, R = e & b;
        if (t && (p = l ? t(n, u, l, h) : t(n)), p !== r)
          return p;
        if (!wn(n))
          return n;
        var L = X(n);
        if (L) {
          if (p = Wc(n), !_)
            return Hn(n, p);
        } else {
          var T = Fn(n), P = T == Xt || T == xu;
          if (We(n))
            return zf(n, _);
          if (T == we || T == nt || P && !l) {
            if (p = A || P ? {} : ao(n), !_)
              return A ? Lc(n, Ja(p, n)) : Rc(n, Ef(p, n));
          } else {
            if (!hn[T])
              return l ? n : {};
            p = Uc(n, T, _);
          }
        }
        h || (h = new se());
        var y = h.get(n);
        if (y)
          return y;
        h.set(n, p), Ho(n) ? n.forEach(function(G) {
          p.add(ee(G, e, t, G, n, h));
        }) : Wo(n) && n.forEach(function(G, j) {
          p.set(j, ee(G, e, t, j, n, h));
        });
        var q = R ? A ? zi : $i : A ? Gn : Nn, Q = L ? r : q(n);
        return Vn(Q || n, function(G, j) {
          Q && (j = G, G = n[j]), Pt(p, j, ee(G, e, t, j, n, h));
        }), p;
      }
      function Qa(n) {
        var e = Nn(n);
        return function(t) {
          return xf(t, n, e);
        };
      }
      function xf(n, e, t) {
        var u = t.length;
        if (n == null)
          return !u;
        for (n = an(n); u--; ) {
          var l = t[u], h = e[l], p = n[l];
          if (p === r && !(l in n) || !h(p))
            return !1;
        }
        return !0;
      }
      function Cf(n, e, t) {
        if (typeof n != "function")
          throw new jn(g);
        return Ut(function() {
          n.apply(r, t);
        }, e);
      }
      function Mt(n, e, t, u) {
        var l = -1, h = jt, p = !0, _ = n.length, A = [], R = e.length;
        if (!_)
          return A;
        t && (e = _n(e, Kn(t))), u ? (h = ci, p = !1) : e.length >= o && (h = Rt, p = !1, e = new Ye(e));
        n:
          for (; ++l < _; ) {
            var L = n[l], T = t == null ? L : t(L);
            if (L = u || L !== 0 ? L : 0, p && T === T) {
              for (var P = R; P--; )
                if (e[P] === T)
                  continue n;
              A.push(L);
            } else
              h(e, T, u) || A.push(L);
          }
        return A;
      }
      var Fe = Jf(pe), If = Jf(Li, !0);
      function Va(n, e) {
        var t = !0;
        return Fe(n, function(u, l, h) {
          return t = !!e(u, l, h), t;
        }), t;
      }
      function _r(n, e, t) {
        for (var u = -1, l = n.length; ++u < l; ) {
          var h = n[u], p = e(h);
          if (p != null && (_ === r ? p === p && !Xn(p) : t(p, _)))
            var _ = p, A = h;
        }
        return A;
      }
      function ja(n, e, t, u) {
        var l = n.length;
        for (t = k(t), t < 0 && (t = -t > l ? 0 : l + t), u = u === r || u > l ? l : k(u), u < 0 && (u += l), u = t > u ? 0 : Go(u); t < u; )
          n[t++] = e;
        return n;
      }
      function Sf(n, e) {
        var t = [];
        return Fe(n, function(u, l, h) {
          e(u, l, h) && t.push(u);
        }), t;
      }
      function bn(n, e, t, u, l) {
        var h = -1, p = n.length;
        for (t || (t = qc), l || (l = []); ++h < p; ) {
          var _ = n[h];
          e > 0 && t(_) ? e > 1 ? bn(_, e - 1, t, u, l) : Oe(l, _) : u || (l[l.length] = _);
        }
        return l;
      }
      var Ri = Qf(), Rf = Qf(!0);
      function pe(n, e) {
        return n && Ri(n, e, Nn);
      }
      function Li(n, e) {
        return n && Rf(n, e, Nn);
      }
      function wr(n, e) {
        return be(e, function(t) {
          return Se(n[t]);
        });
      }
      function ke(n, e) {
        e = ye(e, n);
        for (var t = 0, u = e.length; n != null && t < u; )
          n = n[ve(e[t++])];
        return t && t == u ? n : r;
      }
      function Lf(n, e, t) {
        var u = e(n);
        return X(n) ? u : Oe(u, t(n));
      }
      function yn(n) {
        return n == null ? n === r ? Ns : Rs : ze && ze in an(n) ? Dc(n) : Xc(n);
      }
      function Ni(n, e) {
        return n > e;
      }
      function nc(n, e) {
        return n != null && sn.call(n, e);
      }
      function ec(n, e) {
        return n != null && e in an(n);
      }
      function tc(n, e, t) {
        return n >= Mn(e, t) && n < Sn(e, t);
      }
      function Ti(n, e, t) {
        for (var u = t ? ci : jt, l = n[0].length, h = n.length, p = h, _ = x(h), A = 1 / 0, R = []; p--; ) {
          var L = n[p];
          p && e && (L = _n(L, Kn(e))), A = Mn(L.length, A), _[p] = !t && (e || l >= 120 && L.length >= 120) ? new Ye(p && L) : r;
        }
        L = n[0];
        var T = -1, P = _[0];
        n:
          for (; ++T < l && R.length < A; ) {
            var y = L[T], q = e ? e(y) : y;
            if (y = t || y !== 0 ? y : 0, !(P ? Rt(P, q) : u(R, q, t))) {
              for (p = h; --p; ) {
                var Q = _[p];
                if (!(Q ? Rt(Q, q) : u(n[p], q, t)))
                  continue n;
              }
              P && P.push(q), R.push(y);
            }
          }
        return R;
      }
      function rc(n, e, t, u) {
        return pe(n, function(l, h, p) {
          e(u, t(l), h, p);
        }), u;
      }
      function Ft(n, e, t) {
        e = ye(e, n), n = po(n, e);
        var u = n == null ? n : n[ve(re(e))];
        return u == null ? r : zn(u, n, t);
      }
      function Nf(n) {
        return An(n) && yn(n) == nt;
      }
      function ic(n) {
        return An(n) && yn(n) == St;
      }
      function uc(n) {
        return An(n) && yn(n) == At;
      }
      function Dt(n, e, t, u, l) {
        return n === e ? !0 : n == null || e == null || !An(n) && !An(e) ? n !== n && e !== e : fc(n, e, t, u, Dt, l);
      }
      function fc(n, e, t, u, l, h) {
        var p = X(n), _ = X(e), A = p ? Kt : Fn(n), R = _ ? Kt : Fn(e);
        A = A == nt ? we : A, R = R == nt ? we : R;
        var L = A == we, T = R == we, P = A == R;
        if (P && We(n)) {
          if (!We(e))
            return !1;
          p = !0, L = !1;
        }
        if (P && !L)
          return h || (h = new se()), p || pt(n) ? oo(n, e, t, u, l, h) : Mc(n, e, A, t, u, l, h);
        if (!(t & Z)) {
          var y = L && sn.call(n, "__wrapped__"), q = T && sn.call(e, "__wrapped__");
          if (y || q) {
            var Q = y ? n.value() : n, G = q ? e.value() : e;
            return h || (h = new se()), l(Q, G, t, u, h);
          }
        }
        return P ? (h || (h = new se()), Fc(n, e, t, u, l, h)) : !1;
      }
      function oc(n) {
        return An(n) && Fn(n) == ue;
      }
      function bi(n, e, t, u) {
        var l = t.length, h = l, p = !u;
        if (n == null)
          return !h;
        for (n = an(n); l--; ) {
          var _ = t[l];
          if (p && _[2] ? _[1] !== n[_[0]] : !(_[0] in n))
            return !1;
        }
        for (; ++l < h; ) {
          _ = t[l];
          var A = _[0], R = n[A], L = _[1];
          if (p && _[2]) {
            if (R === r && !(A in n))
              return !1;
          } else {
            var T = new se();
            if (u)
              var P = u(R, L, A, n, e, T);
            if (!(P === r ? Dt(L, R, Z | W, u, T) : P))
              return !1;
          }
        }
        return !0;
      }
      function Tf(n) {
        if (!wn(n) || Zc(n))
          return !1;
        var e = Se(n) ? oa : Qs;
        return e.test(Qe(n));
      }
      function sc(n) {
        return An(n) && yn(n) == xt;
      }
      function lc(n) {
        return An(n) && Fn(n) == fe;
      }
      function ac(n) {
        return An(n) && Dr(n.length) && !!gn[yn(n)];
      }
      function bf(n) {
        return typeof n == "function" ? n : n == null ? Zn : typeof n == "object" ? X(n) ? Mf(n[0], n[1]) : Pf(n) : jo(n);
      }
      function Oi(n) {
        if (!Wt(n))
          return ga(n);
        var e = [];
        for (var t in an(n))
          sn.call(n, t) && t != "constructor" && e.push(t);
        return e;
      }
      function cc(n) {
        if (!wn(n))
          return Yc(n);
        var e = Wt(n), t = [];
        for (var u in n)
          u == "constructor" && (e || !sn.call(n, u)) || t.push(u);
        return t;
      }
      function Pi(n, e) {
        return n < e;
      }
      function Of(n, e) {
        var t = -1, u = qn(n) ? x(n.length) : [];
        return Fe(n, function(l, h, p) {
          u[++t] = e(l, h, p);
        }), u;
      }
      function Pf(n) {
        var e = Yi(n);
        return e.length == 1 && e[0][2] ? ho(e[0][0], e[0][1]) : function(t) {
          return t === n || bi(t, n, e);
        };
      }
      function Mf(n, e) {
        return ki(n) && co(e) ? ho(ve(n), e) : function(t) {
          var u = uu(t, n);
          return u === r && u === e ? fu(t, n) : Dt(e, u, Z | W);
        };
      }
      function mr(n, e, t, u, l) {
        n !== e && Ri(e, function(h, p) {
          if (l || (l = new se()), wn(h))
            hc(n, e, p, t, mr, u, l);
          else {
            var _ = u ? u(Qi(n, p), h, p + "", n, e, l) : r;
            _ === r && (_ = h), Ii(n, p, _);
          }
        }, Gn);
      }
      function hc(n, e, t, u, l, h, p) {
        var _ = Qi(n, t), A = Qi(e, t), R = p.get(A);
        if (R) {
          Ii(n, t, R);
          return;
        }
        var L = h ? h(_, A, t + "", n, e, p) : r, T = L === r;
        if (T) {
          var P = X(A), y = !P && We(A), q = !P && !y && pt(A);
          L = A, P || y || q ? X(_) ? L = _ : En(_) ? L = Hn(_) : y ? (T = !1, L = zf(A, !0)) : q ? (T = !1, L = Kf(A, !0)) : L = [] : Ht(A) || Ve(A) ? (L = _, Ve(_) ? L = Zo(_) : (!wn(_) || Se(_)) && (L = ao(A))) : T = !1;
        }
        T && (p.set(A, L), l(L, A, u, h, p), p.delete(A)), Ii(n, t, L);
      }
      function Ff(n, e) {
        var t = n.length;
        if (t)
          return e += e < 0 ? t : 0, Ie(e, t) ? n[e] : r;
      }
      function Df(n, e, t) {
        e.length ? e = _n(e, function(h) {
          return X(h) ? function(p) {
            return ke(p, h.length === 1 ? h[0] : h);
          } : h;
        }) : e = [Zn];
        var u = -1;
        e = _n(e, Kn(U()));
        var l = Of(n, function(h, p, _) {
          var A = _n(e, function(R) {
            return R(h);
          });
          return { criteria: A, index: ++u, value: h };
        });
        return Ul(l, function(h, p) {
          return Sc(h, p, t);
        });
      }
      function gc(n, e) {
        return yf(n, e, function(t, u) {
          return fu(n, u);
        });
      }
      function yf(n, e, t) {
        for (var u = -1, l = e.length, h = {}; ++u < l; ) {
          var p = e[u], _ = ke(n, p);
          t(_, p) && yt(h, ye(p, n), _);
        }
        return h;
      }
      function pc(n) {
        return function(e) {
          return ke(e, n);
        };
      }
      function Mi(n, e, t, u) {
        var l = u ? Wl : rt, h = -1, p = e.length, _ = n;
        for (n === e && (e = Hn(e)), t && (_ = _n(n, Kn(t))); ++h < p; )
          for (var A = 0, R = e[h], L = t ? t(R) : R; (A = l(_, L, A, u)) > -1; )
            _ !== n && lr.call(_, A, 1), lr.call(n, A, 1);
        return n;
      }
      function Bf(n, e) {
        for (var t = n ? e.length : 0, u = t - 1; t--; ) {
          var l = e[t];
          if (t == u || l !== h) {
            var h = l;
            Ie(l) ? lr.call(n, l, 1) : Bi(n, l);
          }
        }
        return n;
      }
      function Fi(n, e) {
        return n + hr(_f() * (e - n + 1));
      }
      function dc(n, e, t, u) {
        for (var l = -1, h = Sn(cr((e - n) / (t || 1)), 0), p = x(h); h--; )
          p[u ? h : ++l] = n, n += t;
        return p;
      }
      function Di(n, e) {
        var t = "";
        if (!n || e < 1 || e > Te)
          return t;
        do
          e % 2 && (t += n), e = hr(e / 2), e && (n += n);
        while (e);
        return t;
      }
      function V(n, e) {
        return Vi(go(n, e, Zn), n + "");
      }
      function vc(n) {
        return Af(dt(n));
      }
      function _c(n, e) {
        var t = dt(n);
        return Tr(t, Xe(e, 0, t.length));
      }
      function yt(n, e, t, u) {
        if (!wn(n))
          return n;
        e = ye(e, n);
        for (var l = -1, h = e.length, p = h - 1, _ = n; _ != null && ++l < h; ) {
          var A = ve(e[l]), R = t;
          if (A === "__proto__" || A === "constructor" || A === "prototype")
            return n;
          if (l != p) {
            var L = _[A];
            R = u ? u(L, A, _) : r, R === r && (R = wn(L) ? L : Ie(e[l + 1]) ? [] : {});
          }
          Pt(_, A, R), _ = _[A];
        }
        return n;
      }
      var Wf = gr ? function(n, e) {
        return gr.set(n, e), n;
      } : Zn, wc = ar ? function(n, e) {
        return ar(n, "toString", {
          configurable: !0,
          enumerable: !1,
          value: su(e),
          writable: !0
        });
      } : Zn;
      function mc(n) {
        return Tr(dt(n));
      }
      function te(n, e, t) {
        var u = -1, l = n.length;
        e < 0 && (e = -e > l ? 0 : l + e), t = t > l ? l : t, t < 0 && (t += l), l = e > t ? 0 : t - e >>> 0, e >>>= 0;
        for (var h = x(l); ++u < l; )
          h[u] = n[u + e];
        return h;
      }
      function Ac(n, e) {
        var t;
        return Fe(n, function(u, l, h) {
          return t = e(u, l, h), !t;
        }), !!t;
      }
      function Ar(n, e, t) {
        var u = 0, l = n == null ? u : n.length;
        if (typeof e == "number" && e === e && l <= xs) {
          for (; u < l; ) {
            var h = u + l >>> 1, p = n[h];
            p !== null && !Xn(p) && (t ? p <= e : p < e) ? u = h + 1 : l = h;
          }
          return l;
        }
        return yi(n, e, Zn, t);
      }
      function yi(n, e, t, u) {
        var l = 0, h = n == null ? 0 : n.length;
        if (h === 0)
          return 0;
        e = t(e);
        for (var p = e !== e, _ = e === null, A = Xn(e), R = e === r; l < h; ) {
          var L = hr((l + h) / 2), T = t(n[L]), P = T !== r, y = T === null, q = T === T, Q = Xn(T);
          if (p)
            var G = u || q;
          else
            R ? G = q && (u || P) : _ ? G = q && P && (u || !y) : A ? G = q && P && !y && (u || !Q) : y || Q ? G = !1 : G = u ? T <= e : T < e;
          G ? l = L + 1 : h = L;
        }
        return Mn(h, Es);
      }
      function Uf(n, e) {
        for (var t = -1, u = n.length, l = 0, h = []; ++t < u; ) {
          var p = n[t], _ = e ? e(p) : p;
          if (!t || !le(_, A)) {
            var A = _;
            h[l++] = p === 0 ? 0 : p;
          }
        }
        return h;
      }
      function Hf(n) {
        return typeof n == "number" ? n : Xn(n) ? zt : +n;
      }
      function Yn(n) {
        if (typeof n == "string")
          return n;
        if (X(n))
          return _n(n, Yn) + "";
        if (Xn(n))
          return wf ? wf.call(n) : "";
        var e = n + "";
        return e == "0" && 1 / n == -Ze ? "-0" : e;
      }
      function De(n, e, t) {
        var u = -1, l = jt, h = n.length, p = !0, _ = [], A = _;
        if (t)
          p = !1, l = ci;
        else if (h >= o) {
          var R = e ? null : Oc(n);
          if (R)
            return er(R);
          p = !1, l = Rt, A = new Ye();
        } else
          A = e ? [] : _;
        n:
          for (; ++u < h; ) {
            var L = n[u], T = e ? e(L) : L;
            if (L = t || L !== 0 ? L : 0, p && T === T) {
              for (var P = A.length; P--; )
                if (A[P] === T)
                  continue n;
              e && A.push(T), _.push(L);
            } else
              l(A, T, t) || (A !== _ && A.push(T), _.push(L));
          }
        return _;
      }
      function Bi(n, e) {
        return e = ye(e, n), n = po(n, e), n == null || delete n[ve(re(e))];
      }
      function qf(n, e, t, u) {
        return yt(n, e, t(ke(n, e)), u);
      }
      function Er(n, e, t, u) {
        for (var l = n.length, h = u ? l : -1; (u ? h-- : ++h < l) && e(n[h], h, n); )
          ;
        return t ? te(n, u ? 0 : h, u ? h + 1 : l) : te(n, u ? h + 1 : 0, u ? l : h);
      }
      function Gf(n, e) {
        var t = n;
        return t instanceof nn && (t = t.value()), hi(e, function(u, l) {
          return l.func.apply(l.thisArg, Oe([u], l.args));
        }, t);
      }
      function Wi(n, e, t) {
        var u = n.length;
        if (u < 2)
          return u ? De(n[0]) : [];
        for (var l = -1, h = x(u); ++l < u; )
          for (var p = n[l], _ = -1; ++_ < u; )
            _ != l && (h[l] = Mt(h[l] || p, n[_], e, t));
        return De(bn(h, 1), e, t);
      }
      function Zf(n, e, t) {
        for (var u = -1, l = n.length, h = e.length, p = {}; ++u < l; ) {
          var _ = u < h ? e[u] : r;
          t(p, n[u], _);
        }
        return p;
      }
      function Ui(n) {
        return En(n) ? n : [];
      }
      function Hi(n) {
        return typeof n == "function" ? n : Zn;
      }
      function ye(n, e) {
        return X(n) ? n : ki(n, e) ? [n] : mo(on(n));
      }
      var Ec = V;
      function Be(n, e, t) {
        var u = n.length;
        return t = t === r ? u : t, !e && t >= u ? n : te(n, e, t);
      }
      var $f = sa || function(n) {
        return Tn.clearTimeout(n);
      };
      function zf(n, e) {
        if (e)
          return n.slice();
        var t = n.length, u = hf ? hf(t) : new n.constructor(t);
        return n.copy(u), u;
      }
      function qi(n) {
        var e = new n.constructor(n.byteLength);
        return new or(e).set(new or(n)), e;
      }
      function xc(n, e) {
        var t = e ? qi(n.buffer) : n.buffer;
        return new n.constructor(t, n.byteOffset, n.byteLength);
      }
      function Cc(n) {
        var e = new n.constructor(n.source, Lu.exec(n));
        return e.lastIndex = n.lastIndex, e;
      }
      function Ic(n) {
        return Ot ? an(Ot.call(n)) : {};
      }
      function Kf(n, e) {
        var t = e ? qi(n.buffer) : n.buffer;
        return new n.constructor(t, n.byteOffset, n.length);
      }
      function Yf(n, e) {
        if (n !== e) {
          var t = n !== r, u = n === null, l = n === n, h = Xn(n), p = e !== r, _ = e === null, A = e === e, R = Xn(e);
          if (!_ && !R && !h && n > e || h && p && A && !_ && !R || u && p && A || !t && A || !l)
            return 1;
          if (!u && !h && !R && n < e || R && t && l && !u && !h || _ && t && l || !p && l || !A)
            return -1;
        }
        return 0;
      }
      function Sc(n, e, t) {
        for (var u = -1, l = n.criteria, h = e.criteria, p = l.length, _ = t.length; ++u < p; ) {
          var A = Yf(l[u], h[u]);
          if (A) {
            if (u >= _)
              return A;
            var R = t[u];
            return A * (R == "desc" ? -1 : 1);
          }
        }
        return n.index - e.index;
      }
      function Xf(n, e, t, u) {
        for (var l = -1, h = n.length, p = t.length, _ = -1, A = e.length, R = Sn(h - p, 0), L = x(A + R), T = !u; ++_ < A; )
          L[_] = e[_];
        for (; ++l < p; )
          (T || l < h) && (L[t[l]] = n[l]);
        for (; R--; )
          L[_++] = n[l++];
        return L;
      }
      function kf(n, e, t, u) {
        for (var l = -1, h = n.length, p = -1, _ = t.length, A = -1, R = e.length, L = Sn(h - _, 0), T = x(L + R), P = !u; ++l < L; )
          T[l] = n[l];
        for (var y = l; ++A < R; )
          T[y + A] = e[A];
        for (; ++p < _; )
          (P || l < h) && (T[y + t[p]] = n[l++]);
        return T;
      }
      function Hn(n, e) {
        var t = -1, u = n.length;
        for (e || (e = x(u)); ++t < u; )
          e[t] = n[t];
        return e;
      }
      function de(n, e, t, u) {
        var l = !t;
        t || (t = {});
        for (var h = -1, p = e.length; ++h < p; ) {
          var _ = e[h], A = u ? u(t[_], n[_], _, t, n) : r;
          A === r && (A = n[_]), l ? Ee(t, _, A) : Pt(t, _, A);
        }
        return t;
      }
      function Rc(n, e) {
        return de(n, Xi(n), e);
      }
      function Lc(n, e) {
        return de(n, so(n), e);
      }
      function xr(n, e) {
        return function(t, u) {
          var l = X(t) ? Pl : ka, h = e ? e() : {};
          return l(t, n, U(u, 2), h);
        };
      }
      function ct(n) {
        return V(function(e, t) {
          var u = -1, l = t.length, h = l > 1 ? t[l - 1] : r, p = l > 2 ? t[2] : r;
          for (h = n.length > 3 && typeof h == "function" ? (l--, h) : r, p && Bn(t[0], t[1], p) && (h = l < 3 ? r : h, l = 1), e = an(e); ++u < l; ) {
            var _ = t[u];
            _ && n(e, _, u, h);
          }
          return e;
        });
      }
      function Jf(n, e) {
        return function(t, u) {
          if (t == null)
            return t;
          if (!qn(t))
            return n(t, u);
          for (var l = t.length, h = e ? l : -1, p = an(t); (e ? h-- : ++h < l) && u(p[h], h, p) !== !1; )
            ;
          return t;
        };
      }
      function Qf(n) {
        return function(e, t, u) {
          for (var l = -1, h = an(e), p = u(e), _ = p.length; _--; ) {
            var A = p[n ? _ : ++l];
            if (t(h[A], A, h) === !1)
              break;
          }
          return e;
        };
      }
      function Nc(n, e, t) {
        var u = e & un, l = Bt(n);
        function h() {
          var p = this && this !== Tn && this instanceof h ? l : n;
          return p.apply(u ? t : this, arguments);
        }
        return h;
      }
      function Vf(n) {
        return function(e) {
          e = on(e);
          var t = it(e) ? oe(e) : r, u = t ? t[0] : e.charAt(0), l = t ? Be(t, 1).join("") : e.slice(1);
          return u[n]() + l;
        };
      }
      function ht(n) {
        return function(e) {
          return hi(Qo(Jo(e).replace(wl, "")), n, "");
        };
      }
      function Bt(n) {
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return new n();
            case 1:
              return new n(e[0]);
            case 2:
              return new n(e[0], e[1]);
            case 3:
              return new n(e[0], e[1], e[2]);
            case 4:
              return new n(e[0], e[1], e[2], e[3]);
            case 5:
              return new n(e[0], e[1], e[2], e[3], e[4]);
            case 6:
              return new n(e[0], e[1], e[2], e[3], e[4], e[5]);
            case 7:
              return new n(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
          }
          var t = at(n.prototype), u = n.apply(t, e);
          return wn(u) ? u : t;
        };
      }
      function Tc(n, e, t) {
        var u = Bt(n);
        function l() {
          for (var h = arguments.length, p = x(h), _ = h, A = gt(l); _--; )
            p[_] = arguments[_];
          var R = h < 3 && p[0] !== A && p[h - 1] !== A ? [] : Pe(p, A);
          if (h -= R.length, h < t)
            return ro(
              n,
              e,
              Cr,
              l.placeholder,
              r,
              p,
              R,
              r,
              r,
              t - h
            );
          var L = this && this !== Tn && this instanceof l ? u : n;
          return zn(L, this, p);
        }
        return l;
      }
      function jf(n) {
        return function(e, t, u) {
          var l = an(e);
          if (!qn(e)) {
            var h = U(t, 3);
            e = Nn(e), t = function(_) {
              return h(l[_], _, l);
            };
          }
          var p = n(e, t, u);
          return p > -1 ? l[h ? e[p] : p] : r;
        };
      }
      function no(n) {
        return Ce(function(e) {
          var t = e.length, u = t, l = ne.prototype.thru;
          for (n && e.reverse(); u--; ) {
            var h = e[u];
            if (typeof h != "function")
              throw new jn(g);
            if (l && !p && Lr(h) == "wrapper")
              var p = new ne([], !0);
          }
          for (u = p ? u : t; ++u < t; ) {
            h = e[u];
            var _ = Lr(h), A = _ == "wrapper" ? Ki(h) : r;
            A && Ji(A[0]) && A[1] == (ln | O | z | Cn) && !A[4].length && A[9] == 1 ? p = p[Lr(A[0])].apply(p, A[3]) : p = h.length == 1 && Ji(h) ? p[_]() : p.thru(h);
          }
          return function() {
            var R = arguments, L = R[0];
            if (p && R.length == 1 && X(L))
              return p.plant(L).value();
            for (var T = 0, P = t ? e[T].apply(this, R) : L; ++T < t; )
              P = e[T].call(this, P);
            return P;
          };
        });
      }
      function Cr(n, e, t, u, l, h, p, _, A, R) {
        var L = e & ln, T = e & un, P = e & tn, y = e & (O | D), q = e & pn, Q = P ? r : Bt(n);
        function G() {
          for (var j = arguments.length, en = x(j), kn = j; kn--; )
            en[kn] = arguments[kn];
          if (y)
            var Wn = gt(G), Jn = ql(en, Wn);
          if (u && (en = Xf(en, u, l, y)), h && (en = kf(en, h, p, y)), j -= Jn, y && j < R) {
            var xn = Pe(en, Wn);
            return ro(
              n,
              e,
              Cr,
              G.placeholder,
              t,
              en,
              xn,
              _,
              A,
              R - j
            );
          }
          var ae = T ? t : this, Le = P ? ae[n] : n;
          return j = en.length, _ ? en = kc(en, _) : q && j > 1 && en.reverse(), L && A < j && (en.length = A), this && this !== Tn && this instanceof G && (Le = Q || Bt(Le)), Le.apply(ae, en);
        }
        return G;
      }
      function eo(n, e) {
        return function(t, u) {
          return rc(t, n, e(u), {});
        };
      }
      function Ir(n, e) {
        return function(t, u) {
          var l;
          if (t === r && u === r)
            return e;
          if (t !== r && (l = t), u !== r) {
            if (l === r)
              return u;
            typeof t == "string" || typeof u == "string" ? (t = Yn(t), u = Yn(u)) : (t = Hf(t), u = Hf(u)), l = n(t, u);
          }
          return l;
        };
      }
      function Gi(n) {
        return Ce(function(e) {
          return e = _n(e, Kn(U())), V(function(t) {
            var u = this;
            return n(e, function(l) {
              return zn(l, u, t);
            });
          });
        });
      }
      function Sr(n, e) {
        e = e === r ? " " : Yn(e);
        var t = e.length;
        if (t < 2)
          return t ? Di(e, n) : e;
        var u = Di(e, cr(n / ut(e)));
        return it(e) ? Be(oe(u), 0, n).join("") : u.slice(0, n);
      }
      function bc(n, e, t, u) {
        var l = e & un, h = Bt(n);
        function p() {
          for (var _ = -1, A = arguments.length, R = -1, L = u.length, T = x(L + A), P = this && this !== Tn && this instanceof p ? h : n; ++R < L; )
            T[R] = u[R];
          for (; A--; )
            T[R++] = arguments[++_];
          return zn(P, l ? t : this, T);
        }
        return p;
      }
      function to(n) {
        return function(e, t, u) {
          return u && typeof u != "number" && Bn(e, t, u) && (t = u = r), e = Re(e), t === r ? (t = e, e = 0) : t = Re(t), u = u === r ? e < t ? 1 : -1 : Re(u), dc(e, t, u, n);
        };
      }
      function Rr(n) {
        return function(e, t) {
          return typeof e == "string" && typeof t == "string" || (e = ie(e), t = ie(t)), n(e, t);
        };
      }
      function ro(n, e, t, u, l, h, p, _, A, R) {
        var L = e & O, T = L ? p : r, P = L ? r : p, y = L ? h : r, q = L ? r : h;
        e |= L ? z : $, e &= ~(L ? $ : z), e & F || (e &= ~(un | tn));
        var Q = [
          n,
          e,
          l,
          y,
          T,
          q,
          P,
          _,
          A,
          R
        ], G = t.apply(r, Q);
        return Ji(n) && vo(G, Q), G.placeholder = u, _o(G, n, e);
      }
      function Zi(n) {
        var e = In[n];
        return function(t, u) {
          if (t = ie(t), u = u == null ? 0 : Mn(k(u), 292), u && vf(t)) {
            var l = (on(t) + "e").split("e"), h = e(l[0] + "e" + (+l[1] + u));
            return l = (on(h) + "e").split("e"), +(l[0] + "e" + (+l[1] - u));
          }
          return e(t);
        };
      }
      var Oc = st && 1 / er(new st([, -0]))[1] == Ze ? function(n) {
        return new st(n);
      } : cu;
      function io(n) {
        return function(e) {
          var t = Fn(e);
          return t == ue ? mi(e) : t == fe ? Xl(e) : Hl(e, n(e));
        };
      }
      function xe(n, e, t, u, l, h, p, _) {
        var A = e & tn;
        if (!A && typeof n != "function")
          throw new jn(g);
        var R = u ? u.length : 0;
        if (R || (e &= ~(z | $), u = l = r), p = p === r ? p : Sn(k(p), 0), _ = _ === r ? _ : k(_), R -= l ? l.length : 0, e & $) {
          var L = u, T = l;
          u = l = r;
        }
        var P = A ? r : Ki(n), y = [
          n,
          e,
          t,
          u,
          l,
          L,
          T,
          h,
          p,
          _
        ];
        if (P && Kc(y, P), n = y[0], e = y[1], t = y[2], u = y[3], l = y[4], _ = y[9] = y[9] === r ? A ? 0 : n.length : Sn(y[9] - R, 0), !_ && e & (O | D) && (e &= ~(O | D)), !e || e == un)
          var q = Nc(n, e, t);
        else
          e == O || e == D ? q = Tc(n, e, _) : (e == z || e == (un | z)) && !l.length ? q = bc(n, e, t, u) : q = Cr.apply(r, y);
        var Q = P ? Wf : vo;
        return _o(Q(q, y), n, e);
      }
      function uo(n, e, t, u) {
        return n === r || le(n, ot[t]) && !sn.call(u, t) ? e : n;
      }
      function fo(n, e, t, u, l, h) {
        return wn(n) && wn(e) && (h.set(e, n), mr(n, e, r, fo, h), h.delete(e)), n;
      }
      function Pc(n) {
        return Ht(n) ? r : n;
      }
      function oo(n, e, t, u, l, h) {
        var p = t & Z, _ = n.length, A = e.length;
        if (_ != A && !(p && A > _))
          return !1;
        var R = h.get(n), L = h.get(e);
        if (R && L)
          return R == e && L == n;
        var T = -1, P = !0, y = t & W ? new Ye() : r;
        for (h.set(n, e), h.set(e, n); ++T < _; ) {
          var q = n[T], Q = e[T];
          if (u)
            var G = p ? u(Q, q, T, e, n, h) : u(q, Q, T, n, e, h);
          if (G !== r) {
            if (G)
              continue;
            P = !1;
            break;
          }
          if (y) {
            if (!gi(e, function(j, en) {
              if (!Rt(y, en) && (q === j || l(q, j, t, u, h)))
                return y.push(en);
            })) {
              P = !1;
              break;
            }
          } else if (!(q === Q || l(q, Q, t, u, h))) {
            P = !1;
            break;
          }
        }
        return h.delete(n), h.delete(e), P;
      }
      function Mc(n, e, t, u, l, h, p) {
        switch (t) {
          case et:
            if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
              return !1;
            n = n.buffer, e = e.buffer;
          case St:
            return !(n.byteLength != e.byteLength || !h(new or(n), new or(e)));
          case mt:
          case At:
          case Et:
            return le(+n, +e);
          case Yt:
            return n.name == e.name && n.message == e.message;
          case xt:
          case Ct:
            return n == e + "";
          case ue:
            var _ = mi;
          case fe:
            var A = u & Z;
            if (_ || (_ = er), n.size != e.size && !A)
              return !1;
            var R = p.get(n);
            if (R)
              return R == e;
            u |= W, p.set(n, e);
            var L = oo(_(n), _(e), u, l, h, p);
            return p.delete(n), L;
          case kt:
            if (Ot)
              return Ot.call(n) == Ot.call(e);
        }
        return !1;
      }
      function Fc(n, e, t, u, l, h) {
        var p = t & Z, _ = $i(n), A = _.length, R = $i(e), L = R.length;
        if (A != L && !p)
          return !1;
        for (var T = A; T--; ) {
          var P = _[T];
          if (!(p ? P in e : sn.call(e, P)))
            return !1;
        }
        var y = h.get(n), q = h.get(e);
        if (y && q)
          return y == e && q == n;
        var Q = !0;
        h.set(n, e), h.set(e, n);
        for (var G = p; ++T < A; ) {
          P = _[T];
          var j = n[P], en = e[P];
          if (u)
            var kn = p ? u(en, j, P, e, n, h) : u(j, en, P, n, e, h);
          if (!(kn === r ? j === en || l(j, en, t, u, h) : kn)) {
            Q = !1;
            break;
          }
          G || (G = P == "constructor");
        }
        if (Q && !G) {
          var Wn = n.constructor, Jn = e.constructor;
          Wn != Jn && "constructor" in n && "constructor" in e && !(typeof Wn == "function" && Wn instanceof Wn && typeof Jn == "function" && Jn instanceof Jn) && (Q = !1);
        }
        return h.delete(n), h.delete(e), Q;
      }
      function Ce(n) {
        return Vi(go(n, r, Co), n + "");
      }
      function $i(n) {
        return Lf(n, Nn, Xi);
      }
      function zi(n) {
        return Lf(n, Gn, so);
      }
      var Ki = gr ? function(n) {
        return gr.get(n);
      } : cu;
      function Lr(n) {
        for (var e = n.name + "", t = lt[e], u = sn.call(lt, e) ? t.length : 0; u--; ) {
          var l = t[u], h = l.func;
          if (h == null || h == n)
            return l.name;
        }
        return e;
      }
      function gt(n) {
        var e = sn.call(c, "placeholder") ? c : n;
        return e.placeholder;
      }
      function U() {
        var n = c.iteratee || lu;
        return n = n === lu ? bf : n, arguments.length ? n(arguments[0], arguments[1]) : n;
      }
      function Nr(n, e) {
        var t = n.__data__;
        return Gc(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
      }
      function Yi(n) {
        for (var e = Nn(n), t = e.length; t--; ) {
          var u = e[t], l = n[u];
          e[t] = [u, l, co(l)];
        }
        return e;
      }
      function Je(n, e) {
        var t = zl(n, e);
        return Tf(t) ? t : r;
      }
      function Dc(n) {
        var e = sn.call(n, ze), t = n[ze];
        try {
          n[ze] = r;
          var u = !0;
        } catch {
        }
        var l = ur.call(n);
        return u && (e ? n[ze] = t : delete n[ze]), l;
      }
      var Xi = Ei ? function(n) {
        return n == null ? [] : (n = an(n), be(Ei(n), function(e) {
          return pf.call(n, e);
        }));
      } : hu, so = Ei ? function(n) {
        for (var e = []; n; )
          Oe(e, Xi(n)), n = sr(n);
        return e;
      } : hu, Fn = yn;
      (xi && Fn(new xi(new ArrayBuffer(1))) != et || Nt && Fn(new Nt()) != ue || Ci && Fn(Ci.resolve()) != Cu || st && Fn(new st()) != fe || Tt && Fn(new Tt()) != It) && (Fn = function(n) {
        var e = yn(n), t = e == we ? n.constructor : r, u = t ? Qe(t) : "";
        if (u)
          switch (u) {
            case _a:
              return et;
            case wa:
              return ue;
            case ma:
              return Cu;
            case Aa:
              return fe;
            case Ea:
              return It;
          }
        return e;
      });
      function yc(n, e, t) {
        for (var u = -1, l = t.length; ++u < l; ) {
          var h = t[u], p = h.size;
          switch (h.type) {
            case "drop":
              n += p;
              break;
            case "dropRight":
              e -= p;
              break;
            case "take":
              e = Mn(e, n + p);
              break;
            case "takeRight":
              n = Sn(n, e - p);
              break;
          }
        }
        return { start: n, end: e };
      }
      function Bc(n) {
        var e = n.match(Zs);
        return e ? e[1].split($s) : [];
      }
      function lo(n, e, t) {
        e = ye(e, n);
        for (var u = -1, l = e.length, h = !1; ++u < l; ) {
          var p = ve(e[u]);
          if (!(h = n != null && t(n, p)))
            break;
          n = n[p];
        }
        return h || ++u != l ? h : (l = n == null ? 0 : n.length, !!l && Dr(l) && Ie(p, l) && (X(n) || Ve(n)));
      }
      function Wc(n) {
        var e = n.length, t = new n.constructor(e);
        return e && typeof n[0] == "string" && sn.call(n, "index") && (t.index = n.index, t.input = n.input), t;
      }
      function ao(n) {
        return typeof n.constructor == "function" && !Wt(n) ? at(sr(n)) : {};
      }
      function Uc(n, e, t) {
        var u = n.constructor;
        switch (e) {
          case St:
            return qi(n);
          case mt:
          case At:
            return new u(+n);
          case et:
            return xc(n, t);
          case Yr:
          case Xr:
          case kr:
          case Jr:
          case Qr:
          case Vr:
          case jr:
          case ni:
          case ei:
            return Kf(n, t);
          case ue:
            return new u();
          case Et:
          case Ct:
            return new u(n);
          case xt:
            return Cc(n);
          case fe:
            return new u();
          case kt:
            return Ic(n);
        }
      }
      function Hc(n, e) {
        var t = e.length;
        if (!t)
          return n;
        var u = t - 1;
        return e[u] = (t > 1 ? "& " : "") + e[u], e = e.join(t > 2 ? ", " : " "), n.replace(Gs, `{
/* [wrapped with ` + e + `] */
`);
      }
      function qc(n) {
        return X(n) || Ve(n) || !!(df && n && n[df]);
      }
      function Ie(n, e) {
        var t = typeof n;
        return e = e ?? Te, !!e && (t == "number" || t != "symbol" && js.test(n)) && n > -1 && n % 1 == 0 && n < e;
      }
      function Bn(n, e, t) {
        if (!wn(t))
          return !1;
        var u = typeof e;
        return (u == "number" ? qn(t) && Ie(e, t.length) : u == "string" && e in t) ? le(t[e], n) : !1;
      }
      function ki(n, e) {
        if (X(n))
          return !1;
        var t = typeof n;
        return t == "number" || t == "symbol" || t == "boolean" || n == null || Xn(n) ? !0 : Ws.test(n) || !Bs.test(n) || e != null && n in an(e);
      }
      function Gc(n) {
        var e = typeof n;
        return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
      }
      function Ji(n) {
        var e = Lr(n), t = c[e];
        if (typeof t != "function" || !(e in nn.prototype))
          return !1;
        if (n === t)
          return !0;
        var u = Ki(t);
        return !!u && n === u[0];
      }
      function Zc(n) {
        return !!cf && cf in n;
      }
      var $c = rr ? Se : gu;
      function Wt(n) {
        var e = n && n.constructor, t = typeof e == "function" && e.prototype || ot;
        return n === t;
      }
      function co(n) {
        return n === n && !wn(n);
      }
      function ho(n, e) {
        return function(t) {
          return t == null ? !1 : t[n] === e && (e !== r || n in an(t));
        };
      }
      function zc(n) {
        var e = Mr(n, function(u) {
          return t.size === d && t.clear(), u;
        }), t = e.cache;
        return e;
      }
      function Kc(n, e) {
        var t = n[1], u = e[1], l = t | u, h = l < (un | tn | ln), p = u == ln && t == O || u == ln && t == Cn && n[7].length <= e[8] || u == (ln | Cn) && e[7].length <= e[8] && t == O;
        if (!(h || p))
          return n;
        u & un && (n[2] = e[2], l |= t & un ? 0 : F);
        var _ = e[3];
        if (_) {
          var A = n[3];
          n[3] = A ? Xf(A, _, e[4]) : _, n[4] = A ? Pe(n[3], E) : e[4];
        }
        return _ = e[5], _ && (A = n[5], n[5] = A ? kf(A, _, e[6]) : _, n[6] = A ? Pe(n[5], E) : e[6]), _ = e[7], _ && (n[7] = _), u & ln && (n[8] = n[8] == null ? e[8] : Mn(n[8], e[8])), n[9] == null && (n[9] = e[9]), n[0] = e[0], n[1] = l, n;
      }
      function Yc(n) {
        var e = [];
        if (n != null)
          for (var t in an(n))
            e.push(t);
        return e;
      }
      function Xc(n) {
        return ur.call(n);
      }
      function go(n, e, t) {
        return e = Sn(e === r ? n.length - 1 : e, 0), function() {
          for (var u = arguments, l = -1, h = Sn(u.length - e, 0), p = x(h); ++l < h; )
            p[l] = u[e + l];
          l = -1;
          for (var _ = x(e + 1); ++l < e; )
            _[l] = u[l];
          return _[e] = t(p), zn(n, this, _);
        };
      }
      function po(n, e) {
        return e.length < 2 ? n : ke(n, te(e, 0, -1));
      }
      function kc(n, e) {
        for (var t = n.length, u = Mn(e.length, t), l = Hn(n); u--; ) {
          var h = e[u];
          n[u] = Ie(h, t) ? l[h] : r;
        }
        return n;
      }
      function Qi(n, e) {
        if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
          return n[e];
      }
      var vo = wo(Wf), Ut = aa || function(n, e) {
        return Tn.setTimeout(n, e);
      }, Vi = wo(wc);
      function _o(n, e, t) {
        var u = e + "";
        return Vi(n, Hc(u, Jc(Bc(u), t)));
      }
      function wo(n) {
        var e = 0, t = 0;
        return function() {
          var u = pa(), l = Pn - (u - t);
          if (t = u, l > 0) {
            if (++e >= J)
              return arguments[0];
          } else
            e = 0;
          return n.apply(r, arguments);
        };
      }
      function Tr(n, e) {
        var t = -1, u = n.length, l = u - 1;
        for (e = e === r ? u : e; ++t < e; ) {
          var h = Fi(t, l), p = n[h];
          n[h] = n[t], n[t] = p;
        }
        return n.length = e, n;
      }
      var mo = zc(function(n) {
        var e = [];
        return n.charCodeAt(0) === 46 && e.push(""), n.replace(Us, function(t, u, l, h) {
          e.push(l ? h.replace(Ys, "$1") : u || t);
        }), e;
      });
      function ve(n) {
        if (typeof n == "string" || Xn(n))
          return n;
        var e = n + "";
        return e == "0" && 1 / n == -Ze ? "-0" : e;
      }
      function Qe(n) {
        if (n != null) {
          try {
            return ir.call(n);
          } catch {
          }
          try {
            return n + "";
          } catch {
          }
        }
        return "";
      }
      function Jc(n, e) {
        return Vn(Cs, function(t) {
          var u = "_." + t[0];
          e & t[1] && !jt(n, u) && n.push(u);
        }), n.sort();
      }
      function Ao(n) {
        if (n instanceof nn)
          return n.clone();
        var e = new ne(n.__wrapped__, n.__chain__);
        return e.__actions__ = Hn(n.__actions__), e.__index__ = n.__index__, e.__values__ = n.__values__, e;
      }
      function Qc(n, e, t) {
        (t ? Bn(n, e, t) : e === r) ? e = 1 : e = Sn(k(e), 0);
        var u = n == null ? 0 : n.length;
        if (!u || e < 1)
          return [];
        for (var l = 0, h = 0, p = x(cr(u / e)); l < u; )
          p[h++] = te(n, l, l += e);
        return p;
      }
      function Vc(n) {
        for (var e = -1, t = n == null ? 0 : n.length, u = 0, l = []; ++e < t; ) {
          var h = n[e];
          h && (l[u++] = h);
        }
        return l;
      }
      function jc() {
        var n = arguments.length;
        if (!n)
          return [];
        for (var e = x(n - 1), t = arguments[0], u = n; u--; )
          e[u - 1] = arguments[u];
        return Oe(X(t) ? Hn(t) : [t], bn(e, 1));
      }
      var n0 = V(function(n, e) {
        return En(n) ? Mt(n, bn(e, 1, En, !0)) : [];
      }), e0 = V(function(n, e) {
        var t = re(e);
        return En(t) && (t = r), En(n) ? Mt(n, bn(e, 1, En, !0), U(t, 2)) : [];
      }), t0 = V(function(n, e) {
        var t = re(e);
        return En(t) && (t = r), En(n) ? Mt(n, bn(e, 1, En, !0), r, t) : [];
      });
      function r0(n, e, t) {
        var u = n == null ? 0 : n.length;
        return u ? (e = t || e === r ? 1 : k(e), te(n, e < 0 ? 0 : e, u)) : [];
      }
      function i0(n, e, t) {
        var u = n == null ? 0 : n.length;
        return u ? (e = t || e === r ? 1 : k(e), e = u - e, te(n, 0, e < 0 ? 0 : e)) : [];
      }
      function u0(n, e) {
        return n && n.length ? Er(n, U(e, 3), !0, !0) : [];
      }
      function f0(n, e) {
        return n && n.length ? Er(n, U(e, 3), !0) : [];
      }
      function o0(n, e, t, u) {
        var l = n == null ? 0 : n.length;
        return l ? (t && typeof t != "number" && Bn(n, e, t) && (t = 0, u = l), ja(n, e, t, u)) : [];
      }
      function Eo(n, e, t) {
        var u = n == null ? 0 : n.length;
        if (!u)
          return -1;
        var l = t == null ? 0 : k(t);
        return l < 0 && (l = Sn(u + l, 0)), nr(n, U(e, 3), l);
      }
      function xo(n, e, t) {
        var u = n == null ? 0 : n.length;
        if (!u)
          return -1;
        var l = u - 1;
        return t !== r && (l = k(t), l = t < 0 ? Sn(u + l, 0) : Mn(l, u - 1)), nr(n, U(e, 3), l, !0);
      }
      function Co(n) {
        var e = n == null ? 0 : n.length;
        return e ? bn(n, 1) : [];
      }
      function s0(n) {
        var e = n == null ? 0 : n.length;
        return e ? bn(n, Ze) : [];
      }
      function l0(n, e) {
        var t = n == null ? 0 : n.length;
        return t ? (e = e === r ? 1 : k(e), bn(n, e)) : [];
      }
      function a0(n) {
        for (var e = -1, t = n == null ? 0 : n.length, u = {}; ++e < t; ) {
          var l = n[e];
          u[l[0]] = l[1];
        }
        return u;
      }
      function Io(n) {
        return n && n.length ? n[0] : r;
      }
      function c0(n, e, t) {
        var u = n == null ? 0 : n.length;
        if (!u)
          return -1;
        var l = t == null ? 0 : k(t);
        return l < 0 && (l = Sn(u + l, 0)), rt(n, e, l);
      }
      function h0(n) {
        var e = n == null ? 0 : n.length;
        return e ? te(n, 0, -1) : [];
      }
      var g0 = V(function(n) {
        var e = _n(n, Ui);
        return e.length && e[0] === n[0] ? Ti(e) : [];
      }), p0 = V(function(n) {
        var e = re(n), t = _n(n, Ui);
        return e === re(t) ? e = r : t.pop(), t.length && t[0] === n[0] ? Ti(t, U(e, 2)) : [];
      }), d0 = V(function(n) {
        var e = re(n), t = _n(n, Ui);
        return e = typeof e == "function" ? e : r, e && t.pop(), t.length && t[0] === n[0] ? Ti(t, r, e) : [];
      });
      function v0(n, e) {
        return n == null ? "" : ha.call(n, e);
      }
      function re(n) {
        var e = n == null ? 0 : n.length;
        return e ? n[e - 1] : r;
      }
      function _0(n, e, t) {
        var u = n == null ? 0 : n.length;
        if (!u)
          return -1;
        var l = u;
        return t !== r && (l = k(t), l = l < 0 ? Sn(u + l, 0) : Mn(l, u - 1)), e === e ? Jl(n, e, l) : nr(n, tf, l, !0);
      }
      function w0(n, e) {
        return n && n.length ? Ff(n, k(e)) : r;
      }
      var m0 = V(So);
      function So(n, e) {
        return n && n.length && e && e.length ? Mi(n, e) : n;
      }
      function A0(n, e, t) {
        return n && n.length && e && e.length ? Mi(n, e, U(t, 2)) : n;
      }
      function E0(n, e, t) {
        return n && n.length && e && e.length ? Mi(n, e, r, t) : n;
      }
      var x0 = Ce(function(n, e) {
        var t = n == null ? 0 : n.length, u = Si(n, e);
        return Bf(n, _n(e, function(l) {
          return Ie(l, t) ? +l : l;
        }).sort(Yf)), u;
      });
      function C0(n, e) {
        var t = [];
        if (!(n && n.length))
          return t;
        var u = -1, l = [], h = n.length;
        for (e = U(e, 3); ++u < h; ) {
          var p = n[u];
          e(p, u, n) && (t.push(p), l.push(u));
        }
        return Bf(n, l), t;
      }
      function ji(n) {
        return n == null ? n : va.call(n);
      }
      function I0(n, e, t) {
        var u = n == null ? 0 : n.length;
        return u ? (t && typeof t != "number" && Bn(n, e, t) ? (e = 0, t = u) : (e = e == null ? 0 : k(e), t = t === r ? u : k(t)), te(n, e, t)) : [];
      }
      function S0(n, e) {
        return Ar(n, e);
      }
      function R0(n, e, t) {
        return yi(n, e, U(t, 2));
      }
      function L0(n, e) {
        var t = n == null ? 0 : n.length;
        if (t) {
          var u = Ar(n, e);
          if (u < t && le(n[u], e))
            return u;
        }
        return -1;
      }
      function N0(n, e) {
        return Ar(n, e, !0);
      }
      function T0(n, e, t) {
        return yi(n, e, U(t, 2), !0);
      }
      function b0(n, e) {
        var t = n == null ? 0 : n.length;
        if (t) {
          var u = Ar(n, e, !0) - 1;
          if (le(n[u], e))
            return u;
        }
        return -1;
      }
      function O0(n) {
        return n && n.length ? Uf(n) : [];
      }
      function P0(n, e) {
        return n && n.length ? Uf(n, U(e, 2)) : [];
      }
      function M0(n) {
        var e = n == null ? 0 : n.length;
        return e ? te(n, 1, e) : [];
      }
      function F0(n, e, t) {
        return n && n.length ? (e = t || e === r ? 1 : k(e), te(n, 0, e < 0 ? 0 : e)) : [];
      }
      function D0(n, e, t) {
        var u = n == null ? 0 : n.length;
        return u ? (e = t || e === r ? 1 : k(e), e = u - e, te(n, e < 0 ? 0 : e, u)) : [];
      }
      function y0(n, e) {
        return n && n.length ? Er(n, U(e, 3), !1, !0) : [];
      }
      function B0(n, e) {
        return n && n.length ? Er(n, U(e, 3)) : [];
      }
      var W0 = V(function(n) {
        return De(bn(n, 1, En, !0));
      }), U0 = V(function(n) {
        var e = re(n);
        return En(e) && (e = r), De(bn(n, 1, En, !0), U(e, 2));
      }), H0 = V(function(n) {
        var e = re(n);
        return e = typeof e == "function" ? e : r, De(bn(n, 1, En, !0), r, e);
      });
      function q0(n) {
        return n && n.length ? De(n) : [];
      }
      function G0(n, e) {
        return n && n.length ? De(n, U(e, 2)) : [];
      }
      function Z0(n, e) {
        return e = typeof e == "function" ? e : r, n && n.length ? De(n, r, e) : [];
      }
      function nu(n) {
        if (!(n && n.length))
          return [];
        var e = 0;
        return n = be(n, function(t) {
          if (En(t))
            return e = Sn(t.length, e), !0;
        }), _i(e, function(t) {
          return _n(n, pi(t));
        });
      }
      function Ro(n, e) {
        if (!(n && n.length))
          return [];
        var t = nu(n);
        return e == null ? t : _n(t, function(u) {
          return zn(e, r, u);
        });
      }
      var $0 = V(function(n, e) {
        return En(n) ? Mt(n, e) : [];
      }), z0 = V(function(n) {
        return Wi(be(n, En));
      }), K0 = V(function(n) {
        var e = re(n);
        return En(e) && (e = r), Wi(be(n, En), U(e, 2));
      }), Y0 = V(function(n) {
        var e = re(n);
        return e = typeof e == "function" ? e : r, Wi(be(n, En), r, e);
      }), X0 = V(nu);
      function k0(n, e) {
        return Zf(n || [], e || [], Pt);
      }
      function J0(n, e) {
        return Zf(n || [], e || [], yt);
      }
      var Q0 = V(function(n) {
        var e = n.length, t = e > 1 ? n[e - 1] : r;
        return t = typeof t == "function" ? (n.pop(), t) : r, Ro(n, t);
      });
      function Lo(n) {
        var e = c(n);
        return e.__chain__ = !0, e;
      }
      function V0(n, e) {
        return e(n), n;
      }
      function br(n, e) {
        return e(n);
      }
      var j0 = Ce(function(n) {
        var e = n.length, t = e ? n[0] : 0, u = this.__wrapped__, l = function(h) {
          return Si(h, n);
        };
        return e > 1 || this.__actions__.length || !(u instanceof nn) || !Ie(t) ? this.thru(l) : (u = u.slice(t, +t + (e ? 1 : 0)), u.__actions__.push({
          func: br,
          args: [l],
          thisArg: r
        }), new ne(u, this.__chain__).thru(function(h) {
          return e && !h.length && h.push(r), h;
        }));
      });
      function nh() {
        return Lo(this);
      }
      function eh() {
        return new ne(this.value(), this.__chain__);
      }
      function th() {
        this.__values__ === r && (this.__values__ = qo(this.value()));
        var n = this.__index__ >= this.__values__.length, e = n ? r : this.__values__[this.__index__++];
        return { done: n, value: e };
      }
      function rh() {
        return this;
      }
      function ih(n) {
        for (var e, t = this; t instanceof dr; ) {
          var u = Ao(t);
          u.__index__ = 0, u.__values__ = r, e ? l.__wrapped__ = u : e = u;
          var l = u;
          t = t.__wrapped__;
        }
        return l.__wrapped__ = n, e;
      }
      function uh() {
        var n = this.__wrapped__;
        if (n instanceof nn) {
          var e = n;
          return this.__actions__.length && (e = new nn(this)), e = e.reverse(), e.__actions__.push({
            func: br,
            args: [ji],
            thisArg: r
          }), new ne(e, this.__chain__);
        }
        return this.thru(ji);
      }
      function fh() {
        return Gf(this.__wrapped__, this.__actions__);
      }
      var oh = xr(function(n, e, t) {
        sn.call(n, t) ? ++n[t] : Ee(n, t, 1);
      });
      function sh(n, e, t) {
        var u = X(n) ? nf : Va;
        return t && Bn(n, e, t) && (e = r), u(n, U(e, 3));
      }
      function lh(n, e) {
        var t = X(n) ? be : Sf;
        return t(n, U(e, 3));
      }
      var ah = jf(Eo), ch = jf(xo);
      function hh(n, e) {
        return bn(Or(n, e), 1);
      }
      function gh(n, e) {
        return bn(Or(n, e), Ze);
      }
      function ph(n, e, t) {
        return t = t === r ? 1 : k(t), bn(Or(n, e), t);
      }
      function No(n, e) {
        var t = X(n) ? Vn : Fe;
        return t(n, U(e, 3));
      }
      function To(n, e) {
        var t = X(n) ? Ml : If;
        return t(n, U(e, 3));
      }
      var dh = xr(function(n, e, t) {
        sn.call(n, t) ? n[t].push(e) : Ee(n, t, [e]);
      });
      function vh(n, e, t, u) {
        n = qn(n) ? n : dt(n), t = t && !u ? k(t) : 0;
        var l = n.length;
        return t < 0 && (t = Sn(l + t, 0)), yr(n) ? t <= l && n.indexOf(e, t) > -1 : !!l && rt(n, e, t) > -1;
      }
      var _h = V(function(n, e, t) {
        var u = -1, l = typeof e == "function", h = qn(n) ? x(n.length) : [];
        return Fe(n, function(p) {
          h[++u] = l ? zn(e, p, t) : Ft(p, e, t);
        }), h;
      }), wh = xr(function(n, e, t) {
        Ee(n, t, e);
      });
      function Or(n, e) {
        var t = X(n) ? _n : Of;
        return t(n, U(e, 3));
      }
      function mh(n, e, t, u) {
        return n == null ? [] : (X(e) || (e = e == null ? [] : [e]), t = u ? r : t, X(t) || (t = t == null ? [] : [t]), Df(n, e, t));
      }
      var Ah = xr(function(n, e, t) {
        n[t ? 0 : 1].push(e);
      }, function() {
        return [[], []];
      });
      function Eh(n, e, t) {
        var u = X(n) ? hi : uf, l = arguments.length < 3;
        return u(n, U(e, 4), t, l, Fe);
      }
      function xh(n, e, t) {
        var u = X(n) ? Fl : uf, l = arguments.length < 3;
        return u(n, U(e, 4), t, l, If);
      }
      function Ch(n, e) {
        var t = X(n) ? be : Sf;
        return t(n, Fr(U(e, 3)));
      }
      function Ih(n) {
        var e = X(n) ? Af : vc;
        return e(n);
      }
      function Sh(n, e, t) {
        (t ? Bn(n, e, t) : e === r) ? e = 1 : e = k(e);
        var u = X(n) ? Ya : _c;
        return u(n, e);
      }
      function Rh(n) {
        var e = X(n) ? Xa : mc;
        return e(n);
      }
      function Lh(n) {
        if (n == null)
          return 0;
        if (qn(n))
          return yr(n) ? ut(n) : n.length;
        var e = Fn(n);
        return e == ue || e == fe ? n.size : Oi(n).length;
      }
      function Nh(n, e, t) {
        var u = X(n) ? gi : Ac;
        return t && Bn(n, e, t) && (e = r), u(n, U(e, 3));
      }
      var Th = V(function(n, e) {
        if (n == null)
          return [];
        var t = e.length;
        return t > 1 && Bn(n, e[0], e[1]) ? e = [] : t > 2 && Bn(e[0], e[1], e[2]) && (e = [e[0]]), Df(n, bn(e, 1), []);
      }), Pr = la || function() {
        return Tn.Date.now();
      };
      function bh(n, e) {
        if (typeof e != "function")
          throw new jn(g);
        return n = k(n), function() {
          if (--n < 1)
            return e.apply(this, arguments);
        };
      }
      function bo(n, e, t) {
        return e = t ? r : e, e = n && e == null ? n.length : e, xe(n, ln, r, r, r, r, e);
      }
      function Oo(n, e) {
        var t;
        if (typeof e != "function")
          throw new jn(g);
        return n = k(n), function() {
          return --n > 0 && (t = e.apply(this, arguments)), n <= 1 && (e = r), t;
        };
      }
      var eu = V(function(n, e, t) {
        var u = un;
        if (t.length) {
          var l = Pe(t, gt(eu));
          u |= z;
        }
        return xe(n, u, e, t, l);
      }), Po = V(function(n, e, t) {
        var u = un | tn;
        if (t.length) {
          var l = Pe(t, gt(Po));
          u |= z;
        }
        return xe(e, u, n, t, l);
      });
      function Mo(n, e, t) {
        e = t ? r : e;
        var u = xe(n, O, r, r, r, r, r, e);
        return u.placeholder = Mo.placeholder, u;
      }
      function Fo(n, e, t) {
        e = t ? r : e;
        var u = xe(n, D, r, r, r, r, r, e);
        return u.placeholder = Fo.placeholder, u;
      }
      function Do(n, e, t) {
        var u, l, h, p, _, A, R = 0, L = !1, T = !1, P = !0;
        if (typeof n != "function")
          throw new jn(g);
        e = ie(e) || 0, wn(t) && (L = !!t.leading, T = "maxWait" in t, h = T ? Sn(ie(t.maxWait) || 0, e) : h, P = "trailing" in t ? !!t.trailing : P);
        function y(xn) {
          var ae = u, Le = l;
          return u = l = r, R = xn, p = n.apply(Le, ae), p;
        }
        function q(xn) {
          return R = xn, _ = Ut(j, e), L ? y(xn) : p;
        }
        function Q(xn) {
          var ae = xn - A, Le = xn - R, ns = e - ae;
          return T ? Mn(ns, h - Le) : ns;
        }
        function G(xn) {
          var ae = xn - A, Le = xn - R;
          return A === r || ae >= e || ae < 0 || T && Le >= h;
        }
        function j() {
          var xn = Pr();
          if (G(xn))
            return en(xn);
          _ = Ut(j, Q(xn));
        }
        function en(xn) {
          return _ = r, P && u ? y(xn) : (u = l = r, p);
        }
        function kn() {
          _ !== r && $f(_), R = 0, u = A = l = _ = r;
        }
        function Wn() {
          return _ === r ? p : en(Pr());
        }
        function Jn() {
          var xn = Pr(), ae = G(xn);
          if (u = arguments, l = this, A = xn, ae) {
            if (_ === r)
              return q(A);
            if (T)
              return $f(_), _ = Ut(j, e), y(A);
          }
          return _ === r && (_ = Ut(j, e)), p;
        }
        return Jn.cancel = kn, Jn.flush = Wn, Jn;
      }
      var Oh = V(function(n, e) {
        return Cf(n, 1, e);
      }), Ph = V(function(n, e, t) {
        return Cf(n, ie(e) || 0, t);
      });
      function Mh(n) {
        return xe(n, pn);
      }
      function Mr(n, e) {
        if (typeof n != "function" || e != null && typeof e != "function")
          throw new jn(g);
        var t = function() {
          var u = arguments, l = e ? e.apply(this, u) : u[0], h = t.cache;
          if (h.has(l))
            return h.get(l);
          var p = n.apply(this, u);
          return t.cache = h.set(l, p) || h, p;
        };
        return t.cache = new (Mr.Cache || Ae)(), t;
      }
      Mr.Cache = Ae;
      function Fr(n) {
        if (typeof n != "function")
          throw new jn(g);
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return !n.call(this);
            case 1:
              return !n.call(this, e[0]);
            case 2:
              return !n.call(this, e[0], e[1]);
            case 3:
              return !n.call(this, e[0], e[1], e[2]);
          }
          return !n.apply(this, e);
        };
      }
      function Fh(n) {
        return Oo(2, n);
      }
      var Dh = Ec(function(n, e) {
        e = e.length == 1 && X(e[0]) ? _n(e[0], Kn(U())) : _n(bn(e, 1), Kn(U()));
        var t = e.length;
        return V(function(u) {
          for (var l = -1, h = Mn(u.length, t); ++l < h; )
            u[l] = e[l].call(this, u[l]);
          return zn(n, this, u);
        });
      }), tu = V(function(n, e) {
        var t = Pe(e, gt(tu));
        return xe(n, z, r, e, t);
      }), yo = V(function(n, e) {
        var t = Pe(e, gt(yo));
        return xe(n, $, r, e, t);
      }), yh = Ce(function(n, e) {
        return xe(n, Cn, r, r, r, e);
      });
      function Bh(n, e) {
        if (typeof n != "function")
          throw new jn(g);
        return e = e === r ? e : k(e), V(n, e);
      }
      function Wh(n, e) {
        if (typeof n != "function")
          throw new jn(g);
        return e = e == null ? 0 : Sn(k(e), 0), V(function(t) {
          var u = t[e], l = Be(t, 0, e);
          return u && Oe(l, u), zn(n, this, l);
        });
      }
      function Uh(n, e, t) {
        var u = !0, l = !0;
        if (typeof n != "function")
          throw new jn(g);
        return wn(t) && (u = "leading" in t ? !!t.leading : u, l = "trailing" in t ? !!t.trailing : l), Do(n, e, {
          leading: u,
          maxWait: e,
          trailing: l
        });
      }
      function Hh(n) {
        return bo(n, 1);
      }
      function qh(n, e) {
        return tu(Hi(e), n);
      }
      function Gh() {
        if (!arguments.length)
          return [];
        var n = arguments[0];
        return X(n) ? n : [n];
      }
      function Zh(n) {
        return ee(n, b);
      }
      function $h(n, e) {
        return e = typeof e == "function" ? e : r, ee(n, b, e);
      }
      function zh(n) {
        return ee(n, C | b);
      }
      function Kh(n, e) {
        return e = typeof e == "function" ? e : r, ee(n, C | b, e);
      }
      function Yh(n, e) {
        return e == null || xf(n, e, Nn(e));
      }
      function le(n, e) {
        return n === e || n !== n && e !== e;
      }
      var Xh = Rr(Ni), kh = Rr(function(n, e) {
        return n >= e;
      }), Ve = Nf(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Nf : function(n) {
        return An(n) && sn.call(n, "callee") && !pf.call(n, "callee");
      }, X = x.isArray, Jh = Xu ? Kn(Xu) : ic;
      function qn(n) {
        return n != null && Dr(n.length) && !Se(n);
      }
      function En(n) {
        return An(n) && qn(n);
      }
      function Qh(n) {
        return n === !0 || n === !1 || An(n) && yn(n) == mt;
      }
      var We = ca || gu, Vh = ku ? Kn(ku) : uc;
      function jh(n) {
        return An(n) && n.nodeType === 1 && !Ht(n);
      }
      function n1(n) {
        if (n == null)
          return !0;
        if (qn(n) && (X(n) || typeof n == "string" || typeof n.splice == "function" || We(n) || pt(n) || Ve(n)))
          return !n.length;
        var e = Fn(n);
        if (e == ue || e == fe)
          return !n.size;
        if (Wt(n))
          return !Oi(n).length;
        for (var t in n)
          if (sn.call(n, t))
            return !1;
        return !0;
      }
      function e1(n, e) {
        return Dt(n, e);
      }
      function t1(n, e, t) {
        t = typeof t == "function" ? t : r;
        var u = t ? t(n, e) : r;
        return u === r ? Dt(n, e, r, t) : !!u;
      }
      function ru(n) {
        if (!An(n))
          return !1;
        var e = yn(n);
        return e == Yt || e == Ss || typeof n.message == "string" && typeof n.name == "string" && !Ht(n);
      }
      function r1(n) {
        return typeof n == "number" && vf(n);
      }
      function Se(n) {
        if (!wn(n))
          return !1;
        var e = yn(n);
        return e == Xt || e == xu || e == Is || e == Ls;
      }
      function Bo(n) {
        return typeof n == "number" && n == k(n);
      }
      function Dr(n) {
        return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Te;
      }
      function wn(n) {
        var e = typeof n;
        return n != null && (e == "object" || e == "function");
      }
      function An(n) {
        return n != null && typeof n == "object";
      }
      var Wo = Ju ? Kn(Ju) : oc;
      function i1(n, e) {
        return n === e || bi(n, e, Yi(e));
      }
      function u1(n, e, t) {
        return t = typeof t == "function" ? t : r, bi(n, e, Yi(e), t);
      }
      function f1(n) {
        return Uo(n) && n != +n;
      }
      function o1(n) {
        if ($c(n))
          throw new Y(a);
        return Tf(n);
      }
      function s1(n) {
        return n === null;
      }
      function l1(n) {
        return n == null;
      }
      function Uo(n) {
        return typeof n == "number" || An(n) && yn(n) == Et;
      }
      function Ht(n) {
        if (!An(n) || yn(n) != we)
          return !1;
        var e = sr(n);
        if (e === null)
          return !0;
        var t = sn.call(e, "constructor") && e.constructor;
        return typeof t == "function" && t instanceof t && ir.call(t) == ua;
      }
      var iu = Qu ? Kn(Qu) : sc;
      function a1(n) {
        return Bo(n) && n >= -Te && n <= Te;
      }
      var Ho = Vu ? Kn(Vu) : lc;
      function yr(n) {
        return typeof n == "string" || !X(n) && An(n) && yn(n) == Ct;
      }
      function Xn(n) {
        return typeof n == "symbol" || An(n) && yn(n) == kt;
      }
      var pt = ju ? Kn(ju) : ac;
      function c1(n) {
        return n === r;
      }
      function h1(n) {
        return An(n) && Fn(n) == It;
      }
      function g1(n) {
        return An(n) && yn(n) == Ts;
      }
      var p1 = Rr(Pi), d1 = Rr(function(n, e) {
        return n <= e;
      });
      function qo(n) {
        if (!n)
          return [];
        if (qn(n))
          return yr(n) ? oe(n) : Hn(n);
        if (Lt && n[Lt])
          return Yl(n[Lt]());
        var e = Fn(n), t = e == ue ? mi : e == fe ? er : dt;
        return t(n);
      }
      function Re(n) {
        if (!n)
          return n === 0 ? n : 0;
        if (n = ie(n), n === Ze || n === -Ze) {
          var e = n < 0 ? -1 : 1;
          return e * As;
        }
        return n === n ? n : 0;
      }
      function k(n) {
        var e = Re(n), t = e % 1;
        return e === e ? t ? e - t : e : 0;
      }
      function Go(n) {
        return n ? Xe(k(n), 0, ge) : 0;
      }
      function ie(n) {
        if (typeof n == "number")
          return n;
        if (Xn(n))
          return zt;
        if (wn(n)) {
          var e = typeof n.valueOf == "function" ? n.valueOf() : n;
          n = wn(e) ? e + "" : e;
        }
        if (typeof n != "string")
          return n === 0 ? n : +n;
        n = ff(n);
        var t = Js.test(n);
        return t || Vs.test(n) ? bl(n.slice(2), t ? 2 : 8) : ks.test(n) ? zt : +n;
      }
      function Zo(n) {
        return de(n, Gn(n));
      }
      function v1(n) {
        return n ? Xe(k(n), -Te, Te) : n === 0 ? n : 0;
      }
      function on(n) {
        return n == null ? "" : Yn(n);
      }
      var _1 = ct(function(n, e) {
        if (Wt(e) || qn(e)) {
          de(e, Nn(e), n);
          return;
        }
        for (var t in e)
          sn.call(e, t) && Pt(n, t, e[t]);
      }), $o = ct(function(n, e) {
        de(e, Gn(e), n);
      }), Br = ct(function(n, e, t, u) {
        de(e, Gn(e), n, u);
      }), w1 = ct(function(n, e, t, u) {
        de(e, Nn(e), n, u);
      }), m1 = Ce(Si);
      function A1(n, e) {
        var t = at(n);
        return e == null ? t : Ef(t, e);
      }
      var E1 = V(function(n, e) {
        n = an(n);
        var t = -1, u = e.length, l = u > 2 ? e[2] : r;
        for (l && Bn(e[0], e[1], l) && (u = 1); ++t < u; )
          for (var h = e[t], p = Gn(h), _ = -1, A = p.length; ++_ < A; ) {
            var R = p[_], L = n[R];
            (L === r || le(L, ot[R]) && !sn.call(n, R)) && (n[R] = h[R]);
          }
        return n;
      }), x1 = V(function(n) {
        return n.push(r, fo), zn(zo, r, n);
      });
      function C1(n, e) {
        return ef(n, U(e, 3), pe);
      }
      function I1(n, e) {
        return ef(n, U(e, 3), Li);
      }
      function S1(n, e) {
        return n == null ? n : Ri(n, U(e, 3), Gn);
      }
      function R1(n, e) {
        return n == null ? n : Rf(n, U(e, 3), Gn);
      }
      function L1(n, e) {
        return n && pe(n, U(e, 3));
      }
      function N1(n, e) {
        return n && Li(n, U(e, 3));
      }
      function T1(n) {
        return n == null ? [] : wr(n, Nn(n));
      }
      function b1(n) {
        return n == null ? [] : wr(n, Gn(n));
      }
      function uu(n, e, t) {
        var u = n == null ? r : ke(n, e);
        return u === r ? t : u;
      }
      function O1(n, e) {
        return n != null && lo(n, e, nc);
      }
      function fu(n, e) {
        return n != null && lo(n, e, ec);
      }
      var P1 = eo(function(n, e, t) {
        e != null && typeof e.toString != "function" && (e = ur.call(e)), n[e] = t;
      }, su(Zn)), M1 = eo(function(n, e, t) {
        e != null && typeof e.toString != "function" && (e = ur.call(e)), sn.call(n, e) ? n[e].push(t) : n[e] = [t];
      }, U), F1 = V(Ft);
      function Nn(n) {
        return qn(n) ? mf(n) : Oi(n);
      }
      function Gn(n) {
        return qn(n) ? mf(n, !0) : cc(n);
      }
      function D1(n, e) {
        var t = {};
        return e = U(e, 3), pe(n, function(u, l, h) {
          Ee(t, e(u, l, h), u);
        }), t;
      }
      function y1(n, e) {
        var t = {};
        return e = U(e, 3), pe(n, function(u, l, h) {
          Ee(t, l, e(u, l, h));
        }), t;
      }
      var B1 = ct(function(n, e, t) {
        mr(n, e, t);
      }), zo = ct(function(n, e, t, u) {
        mr(n, e, t, u);
      }), W1 = Ce(function(n, e) {
        var t = {};
        if (n == null)
          return t;
        var u = !1;
        e = _n(e, function(h) {
          return h = ye(h, n), u || (u = h.length > 1), h;
        }), de(n, zi(n), t), u && (t = ee(t, C | S | b, Pc));
        for (var l = e.length; l--; )
          Bi(t, e[l]);
        return t;
      });
      function U1(n, e) {
        return Ko(n, Fr(U(e)));
      }
      var H1 = Ce(function(n, e) {
        return n == null ? {} : gc(n, e);
      });
      function Ko(n, e) {
        if (n == null)
          return {};
        var t = _n(zi(n), function(u) {
          return [u];
        });
        return e = U(e), yf(n, t, function(u, l) {
          return e(u, l[0]);
        });
      }
      function q1(n, e, t) {
        e = ye(e, n);
        var u = -1, l = e.length;
        for (l || (l = 1, n = r); ++u < l; ) {
          var h = n == null ? r : n[ve(e[u])];
          h === r && (u = l, h = t), n = Se(h) ? h.call(n) : h;
        }
        return n;
      }
      function G1(n, e, t) {
        return n == null ? n : yt(n, e, t);
      }
      function Z1(n, e, t, u) {
        return u = typeof u == "function" ? u : r, n == null ? n : yt(n, e, t, u);
      }
      var Yo = io(Nn), Xo = io(Gn);
      function $1(n, e, t) {
        var u = X(n), l = u || We(n) || pt(n);
        if (e = U(e, 4), t == null) {
          var h = n && n.constructor;
          l ? t = u ? new h() : [] : wn(n) ? t = Se(h) ? at(sr(n)) : {} : t = {};
        }
        return (l ? Vn : pe)(n, function(p, _, A) {
          return e(t, p, _, A);
        }), t;
      }
      function z1(n, e) {
        return n == null ? !0 : Bi(n, e);
      }
      function K1(n, e, t) {
        return n == null ? n : qf(n, e, Hi(t));
      }
      function Y1(n, e, t, u) {
        return u = typeof u == "function" ? u : r, n == null ? n : qf(n, e, Hi(t), u);
      }
      function dt(n) {
        return n == null ? [] : wi(n, Nn(n));
      }
      function X1(n) {
        return n == null ? [] : wi(n, Gn(n));
      }
      function k1(n, e, t) {
        return t === r && (t = e, e = r), t !== r && (t = ie(t), t = t === t ? t : 0), e !== r && (e = ie(e), e = e === e ? e : 0), Xe(ie(n), e, t);
      }
      function J1(n, e, t) {
        return e = Re(e), t === r ? (t = e, e = 0) : t = Re(t), n = ie(n), tc(n, e, t);
      }
      function Q1(n, e, t) {
        if (t && typeof t != "boolean" && Bn(n, e, t) && (e = t = r), t === r && (typeof e == "boolean" ? (t = e, e = r) : typeof n == "boolean" && (t = n, n = r)), n === r && e === r ? (n = 0, e = 1) : (n = Re(n), e === r ? (e = n, n = 0) : e = Re(e)), n > e) {
          var u = n;
          n = e, e = u;
        }
        if (t || n % 1 || e % 1) {
          var l = _f();
          return Mn(n + l * (e - n + Tl("1e-" + ((l + "").length - 1))), e);
        }
        return Fi(n, e);
      }
      var V1 = ht(function(n, e, t) {
        return e = e.toLowerCase(), n + (t ? ko(e) : e);
      });
      function ko(n) {
        return ou(on(n).toLowerCase());
      }
      function Jo(n) {
        return n = on(n), n && n.replace(nl, Gl).replace(ml, "");
      }
      function j1(n, e, t) {
        n = on(n), e = Yn(e);
        var u = n.length;
        t = t === r ? u : Xe(k(t), 0, u);
        var l = t;
        return t -= e.length, t >= 0 && n.slice(t, l) == e;
      }
      function ng(n) {
        return n = on(n), n && Fs.test(n) ? n.replace(Su, Zl) : n;
      }
      function eg(n) {
        return n = on(n), n && Hs.test(n) ? n.replace(ti, "\\$&") : n;
      }
      var tg = ht(function(n, e, t) {
        return n + (t ? "-" : "") + e.toLowerCase();
      }), rg = ht(function(n, e, t) {
        return n + (t ? " " : "") + e.toLowerCase();
      }), ig = Vf("toLowerCase");
      function ug(n, e, t) {
        n = on(n), e = k(e);
        var u = e ? ut(n) : 0;
        if (!e || u >= e)
          return n;
        var l = (e - u) / 2;
        return Sr(hr(l), t) + n + Sr(cr(l), t);
      }
      function fg(n, e, t) {
        n = on(n), e = k(e);
        var u = e ? ut(n) : 0;
        return e && u < e ? n + Sr(e - u, t) : n;
      }
      function og(n, e, t) {
        n = on(n), e = k(e);
        var u = e ? ut(n) : 0;
        return e && u < e ? Sr(e - u, t) + n : n;
      }
      function sg(n, e, t) {
        return t || e == null ? e = 0 : e && (e = +e), da(on(n).replace(ri, ""), e || 0);
      }
      function lg(n, e, t) {
        return (t ? Bn(n, e, t) : e === r) ? e = 1 : e = k(e), Di(on(n), e);
      }
      function ag() {
        var n = arguments, e = on(n[0]);
        return n.length < 3 ? e : e.replace(n[1], n[2]);
      }
      var cg = ht(function(n, e, t) {
        return n + (t ? "_" : "") + e.toLowerCase();
      });
      function hg(n, e, t) {
        return t && typeof t != "number" && Bn(n, e, t) && (e = t = r), t = t === r ? ge : t >>> 0, t ? (n = on(n), n && (typeof e == "string" || e != null && !iu(e)) && (e = Yn(e), !e && it(n)) ? Be(oe(n), 0, t) : n.split(e, t)) : [];
      }
      var gg = ht(function(n, e, t) {
        return n + (t ? " " : "") + ou(e);
      });
      function pg(n, e, t) {
        return n = on(n), t = t == null ? 0 : Xe(k(t), 0, n.length), e = Yn(e), n.slice(t, t + e.length) == e;
      }
      function dg(n, e, t) {
        var u = c.templateSettings;
        t && Bn(n, e, t) && (e = r), n = on(n), e = Br({}, e, u, uo);
        var l = Br({}, e.imports, u.imports, uo), h = Nn(l), p = wi(l, h), _, A, R = 0, L = e.interpolate || Jt, T = "__p += '", P = Ai(
          (e.escape || Jt).source + "|" + L.source + "|" + (L === Ru ? Xs : Jt).source + "|" + (e.evaluate || Jt).source + "|$",
          "g"
        ), y = "//# sourceURL=" + (sn.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Il + "]") + `
`;
        n.replace(P, function(G, j, en, kn, Wn, Jn) {
          return en || (en = kn), T += n.slice(R, Jn).replace(el, $l), j && (_ = !0, T += `' +
__e(` + j + `) +
'`), Wn && (A = !0, T += `';
` + Wn + `;
__p += '`), en && (T += `' +
((__t = (` + en + `)) == null ? '' : __t) +
'`), R = Jn + G.length, G;
        }), T += `';
`;
        var q = sn.call(e, "variable") && e.variable;
        if (!q)
          T = `with (obj) {
` + T + `
}
`;
        else if (Ks.test(q))
          throw new Y(v);
        T = (A ? T.replace(bs, "") : T).replace(Os, "$1").replace(Ps, "$1;"), T = "function(" + (q || "obj") + `) {
` + (q ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (_ ? ", __e = _.escape" : "") + (A ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + T + `return __p
}`;
        var Q = Vo(function() {
          return fn(h, y + "return " + T).apply(r, p);
        });
        if (Q.source = T, ru(Q))
          throw Q;
        return Q;
      }
      function vg(n) {
        return on(n).toLowerCase();
      }
      function _g(n) {
        return on(n).toUpperCase();
      }
      function wg(n, e, t) {
        if (n = on(n), n && (t || e === r))
          return ff(n);
        if (!n || !(e = Yn(e)))
          return n;
        var u = oe(n), l = oe(e), h = of(u, l), p = sf(u, l) + 1;
        return Be(u, h, p).join("");
      }
      function mg(n, e, t) {
        if (n = on(n), n && (t || e === r))
          return n.slice(0, af(n) + 1);
        if (!n || !(e = Yn(e)))
          return n;
        var u = oe(n), l = sf(u, oe(e)) + 1;
        return Be(u, 0, l).join("");
      }
      function Ag(n, e, t) {
        if (n = on(n), n && (t || e === r))
          return n.replace(ri, "");
        if (!n || !(e = Yn(e)))
          return n;
        var u = oe(n), l = of(u, oe(e));
        return Be(u, l).join("");
      }
      function Eg(n, e) {
        var t = Un, u = dn;
        if (wn(e)) {
          var l = "separator" in e ? e.separator : l;
          t = "length" in e ? k(e.length) : t, u = "omission" in e ? Yn(e.omission) : u;
        }
        n = on(n);
        var h = n.length;
        if (it(n)) {
          var p = oe(n);
          h = p.length;
        }
        if (t >= h)
          return n;
        var _ = t - ut(u);
        if (_ < 1)
          return u;
        var A = p ? Be(p, 0, _).join("") : n.slice(0, _);
        if (l === r)
          return A + u;
        if (p && (_ += A.length - _), iu(l)) {
          if (n.slice(_).search(l)) {
            var R, L = A;
            for (l.global || (l = Ai(l.source, on(Lu.exec(l)) + "g")), l.lastIndex = 0; R = l.exec(L); )
              var T = R.index;
            A = A.slice(0, T === r ? _ : T);
          }
        } else if (n.indexOf(Yn(l), _) != _) {
          var P = A.lastIndexOf(l);
          P > -1 && (A = A.slice(0, P));
        }
        return A + u;
      }
      function xg(n) {
        return n = on(n), n && Ms.test(n) ? n.replace(Iu, Ql) : n;
      }
      var Cg = ht(function(n, e, t) {
        return n + (t ? " " : "") + e.toUpperCase();
      }), ou = Vf("toUpperCase");
      function Qo(n, e, t) {
        return n = on(n), e = t ? r : e, e === r ? Kl(n) ? na(n) : Bl(n) : n.match(e) || [];
      }
      var Vo = V(function(n, e) {
        try {
          return zn(n, r, e);
        } catch (t) {
          return ru(t) ? t : new Y(t);
        }
      }), Ig = Ce(function(n, e) {
        return Vn(e, function(t) {
          t = ve(t), Ee(n, t, eu(n[t], n));
        }), n;
      });
      function Sg(n) {
        var e = n == null ? 0 : n.length, t = U();
        return n = e ? _n(n, function(u) {
          if (typeof u[1] != "function")
            throw new jn(g);
          return [t(u[0]), u[1]];
        }) : [], V(function(u) {
          for (var l = -1; ++l < e; ) {
            var h = n[l];
            if (zn(h[0], this, u))
              return zn(h[1], this, u);
          }
        });
      }
      function Rg(n) {
        return Qa(ee(n, C));
      }
      function su(n) {
        return function() {
          return n;
        };
      }
      function Lg(n, e) {
        return n == null || n !== n ? e : n;
      }
      var Ng = no(), Tg = no(!0);
      function Zn(n) {
        return n;
      }
      function lu(n) {
        return bf(typeof n == "function" ? n : ee(n, C));
      }
      function bg(n) {
        return Pf(ee(n, C));
      }
      function Og(n, e) {
        return Mf(n, ee(e, C));
      }
      var Pg = V(function(n, e) {
        return function(t) {
          return Ft(t, n, e);
        };
      }), Mg = V(function(n, e) {
        return function(t) {
          return Ft(n, t, e);
        };
      });
      function au(n, e, t) {
        var u = Nn(e), l = wr(e, u);
        t == null && !(wn(e) && (l.length || !u.length)) && (t = e, e = n, n = this, l = wr(e, Nn(e)));
        var h = !(wn(t) && "chain" in t) || !!t.chain, p = Se(n);
        return Vn(l, function(_) {
          var A = e[_];
          n[_] = A, p && (n.prototype[_] = function() {
            var R = this.__chain__;
            if (h || R) {
              var L = n(this.__wrapped__), T = L.__actions__ = Hn(this.__actions__);
              return T.push({ func: A, args: arguments, thisArg: n }), L.__chain__ = R, L;
            }
            return A.apply(n, Oe([this.value()], arguments));
          });
        }), n;
      }
      function Fg() {
        return Tn._ === this && (Tn._ = fa), this;
      }
      function cu() {
      }
      function Dg(n) {
        return n = k(n), V(function(e) {
          return Ff(e, n);
        });
      }
      var yg = Gi(_n), Bg = Gi(nf), Wg = Gi(gi);
      function jo(n) {
        return ki(n) ? pi(ve(n)) : pc(n);
      }
      function Ug(n) {
        return function(e) {
          return n == null ? r : ke(n, e);
        };
      }
      var Hg = to(), qg = to(!0);
      function hu() {
        return [];
      }
      function gu() {
        return !1;
      }
      function Gg() {
        return {};
      }
      function Zg() {
        return "";
      }
      function $g() {
        return !0;
      }
      function zg(n, e) {
        if (n = k(n), n < 1 || n > Te)
          return [];
        var t = ge, u = Mn(n, ge);
        e = U(e), n -= ge;
        for (var l = _i(u, e); ++t < n; )
          e(t);
        return l;
      }
      function Kg(n) {
        return X(n) ? _n(n, ve) : Xn(n) ? [n] : Hn(mo(on(n)));
      }
      function Yg(n) {
        var e = ++ia;
        return on(n) + e;
      }
      var Xg = Ir(function(n, e) {
        return n + e;
      }, 0), kg = Zi("ceil"), Jg = Ir(function(n, e) {
        return n / e;
      }, 1), Qg = Zi("floor");
      function Vg(n) {
        return n && n.length ? _r(n, Zn, Ni) : r;
      }
      function jg(n, e) {
        return n && n.length ? _r(n, U(e, 2), Ni) : r;
      }
      function np(n) {
        return rf(n, Zn);
      }
      function ep(n, e) {
        return rf(n, U(e, 2));
      }
      function tp(n) {
        return n && n.length ? _r(n, Zn, Pi) : r;
      }
      function rp(n, e) {
        return n && n.length ? _r(n, U(e, 2), Pi) : r;
      }
      var ip = Ir(function(n, e) {
        return n * e;
      }, 1), up = Zi("round"), fp = Ir(function(n, e) {
        return n - e;
      }, 0);
      function op(n) {
        return n && n.length ? vi(n, Zn) : 0;
      }
      function sp(n, e) {
        return n && n.length ? vi(n, U(e, 2)) : 0;
      }
      return c.after = bh, c.ary = bo, c.assign = _1, c.assignIn = $o, c.assignInWith = Br, c.assignWith = w1, c.at = m1, c.before = Oo, c.bind = eu, c.bindAll = Ig, c.bindKey = Po, c.castArray = Gh, c.chain = Lo, c.chunk = Qc, c.compact = Vc, c.concat = jc, c.cond = Sg, c.conforms = Rg, c.constant = su, c.countBy = oh, c.create = A1, c.curry = Mo, c.curryRight = Fo, c.debounce = Do, c.defaults = E1, c.defaultsDeep = x1, c.defer = Oh, c.delay = Ph, c.difference = n0, c.differenceBy = e0, c.differenceWith = t0, c.drop = r0, c.dropRight = i0, c.dropRightWhile = u0, c.dropWhile = f0, c.fill = o0, c.filter = lh, c.flatMap = hh, c.flatMapDeep = gh, c.flatMapDepth = ph, c.flatten = Co, c.flattenDeep = s0, c.flattenDepth = l0, c.flip = Mh, c.flow = Ng, c.flowRight = Tg, c.fromPairs = a0, c.functions = T1, c.functionsIn = b1, c.groupBy = dh, c.initial = h0, c.intersection = g0, c.intersectionBy = p0, c.intersectionWith = d0, c.invert = P1, c.invertBy = M1, c.invokeMap = _h, c.iteratee = lu, c.keyBy = wh, c.keys = Nn, c.keysIn = Gn, c.map = Or, c.mapKeys = D1, c.mapValues = y1, c.matches = bg, c.matchesProperty = Og, c.memoize = Mr, c.merge = B1, c.mergeWith = zo, c.method = Pg, c.methodOf = Mg, c.mixin = au, c.negate = Fr, c.nthArg = Dg, c.omit = W1, c.omitBy = U1, c.once = Fh, c.orderBy = mh, c.over = yg, c.overArgs = Dh, c.overEvery = Bg, c.overSome = Wg, c.partial = tu, c.partialRight = yo, c.partition = Ah, c.pick = H1, c.pickBy = Ko, c.property = jo, c.propertyOf = Ug, c.pull = m0, c.pullAll = So, c.pullAllBy = A0, c.pullAllWith = E0, c.pullAt = x0, c.range = Hg, c.rangeRight = qg, c.rearg = yh, c.reject = Ch, c.remove = C0, c.rest = Bh, c.reverse = ji, c.sampleSize = Sh, c.set = G1, c.setWith = Z1, c.shuffle = Rh, c.slice = I0, c.sortBy = Th, c.sortedUniq = O0, c.sortedUniqBy = P0, c.split = hg, c.spread = Wh, c.tail = M0, c.take = F0, c.takeRight = D0, c.takeRightWhile = y0, c.takeWhile = B0, c.tap = V0, c.throttle = Uh, c.thru = br, c.toArray = qo, c.toPairs = Yo, c.toPairsIn = Xo, c.toPath = Kg, c.toPlainObject = Zo, c.transform = $1, c.unary = Hh, c.union = W0, c.unionBy = U0, c.unionWith = H0, c.uniq = q0, c.uniqBy = G0, c.uniqWith = Z0, c.unset = z1, c.unzip = nu, c.unzipWith = Ro, c.update = K1, c.updateWith = Y1, c.values = dt, c.valuesIn = X1, c.without = $0, c.words = Qo, c.wrap = qh, c.xor = z0, c.xorBy = K0, c.xorWith = Y0, c.zip = X0, c.zipObject = k0, c.zipObjectDeep = J0, c.zipWith = Q0, c.entries = Yo, c.entriesIn = Xo, c.extend = $o, c.extendWith = Br, au(c, c), c.add = Xg, c.attempt = Vo, c.camelCase = V1, c.capitalize = ko, c.ceil = kg, c.clamp = k1, c.clone = Zh, c.cloneDeep = zh, c.cloneDeepWith = Kh, c.cloneWith = $h, c.conformsTo = Yh, c.deburr = Jo, c.defaultTo = Lg, c.divide = Jg, c.endsWith = j1, c.eq = le, c.escape = ng, c.escapeRegExp = eg, c.every = sh, c.find = ah, c.findIndex = Eo, c.findKey = C1, c.findLast = ch, c.findLastIndex = xo, c.findLastKey = I1, c.floor = Qg, c.forEach = No, c.forEachRight = To, c.forIn = S1, c.forInRight = R1, c.forOwn = L1, c.forOwnRight = N1, c.get = uu, c.gt = Xh, c.gte = kh, c.has = O1, c.hasIn = fu, c.head = Io, c.identity = Zn, c.includes = vh, c.indexOf = c0, c.inRange = J1, c.invoke = F1, c.isArguments = Ve, c.isArray = X, c.isArrayBuffer = Jh, c.isArrayLike = qn, c.isArrayLikeObject = En, c.isBoolean = Qh, c.isBuffer = We, c.isDate = Vh, c.isElement = jh, c.isEmpty = n1, c.isEqual = e1, c.isEqualWith = t1, c.isError = ru, c.isFinite = r1, c.isFunction = Se, c.isInteger = Bo, c.isLength = Dr, c.isMap = Wo, c.isMatch = i1, c.isMatchWith = u1, c.isNaN = f1, c.isNative = o1, c.isNil = l1, c.isNull = s1, c.isNumber = Uo, c.isObject = wn, c.isObjectLike = An, c.isPlainObject = Ht, c.isRegExp = iu, c.isSafeInteger = a1, c.isSet = Ho, c.isString = yr, c.isSymbol = Xn, c.isTypedArray = pt, c.isUndefined = c1, c.isWeakMap = h1, c.isWeakSet = g1, c.join = v0, c.kebabCase = tg, c.last = re, c.lastIndexOf = _0, c.lowerCase = rg, c.lowerFirst = ig, c.lt = p1, c.lte = d1, c.max = Vg, c.maxBy = jg, c.mean = np, c.meanBy = ep, c.min = tp, c.minBy = rp, c.stubArray = hu, c.stubFalse = gu, c.stubObject = Gg, c.stubString = Zg, c.stubTrue = $g, c.multiply = ip, c.nth = w0, c.noConflict = Fg, c.noop = cu, c.now = Pr, c.pad = ug, c.padEnd = fg, c.padStart = og, c.parseInt = sg, c.random = Q1, c.reduce = Eh, c.reduceRight = xh, c.repeat = lg, c.replace = ag, c.result = q1, c.round = up, c.runInContext = m, c.sample = Ih, c.size = Lh, c.snakeCase = cg, c.some = Nh, c.sortedIndex = S0, c.sortedIndexBy = R0, c.sortedIndexOf = L0, c.sortedLastIndex = N0, c.sortedLastIndexBy = T0, c.sortedLastIndexOf = b0, c.startCase = gg, c.startsWith = pg, c.subtract = fp, c.sum = op, c.sumBy = sp, c.template = dg, c.times = zg, c.toFinite = Re, c.toInteger = k, c.toLength = Go, c.toLower = vg, c.toNumber = ie, c.toSafeInteger = v1, c.toString = on, c.toUpper = _g, c.trim = wg, c.trimEnd = mg, c.trimStart = Ag, c.truncate = Eg, c.unescape = xg, c.uniqueId = Yg, c.upperCase = Cg, c.upperFirst = ou, c.each = No, c.eachRight = To, c.first = Io, au(c, function() {
        var n = {};
        return pe(c, function(e, t) {
          sn.call(c.prototype, t) || (n[t] = e);
        }), n;
      }(), { chain: !1 }), c.VERSION = s, Vn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
        c[n].placeholder = c;
      }), Vn(["drop", "take"], function(n, e) {
        nn.prototype[n] = function(t) {
          t = t === r ? 1 : Sn(k(t), 0);
          var u = this.__filtered__ && !e ? new nn(this) : this.clone();
          return u.__filtered__ ? u.__takeCount__ = Mn(t, u.__takeCount__) : u.__views__.push({
            size: Mn(t, ge),
            type: n + (u.__dir__ < 0 ? "Right" : "")
          }), u;
        }, nn.prototype[n + "Right"] = function(t) {
          return this.reverse()[n](t).reverse();
        };
      }), Vn(["filter", "map", "takeWhile"], function(n, e) {
        var t = e + 1, u = t == Ln || t == rn;
        nn.prototype[n] = function(l) {
          var h = this.clone();
          return h.__iteratees__.push({
            iteratee: U(l, 3),
            type: t
          }), h.__filtered__ = h.__filtered__ || u, h;
        };
      }), Vn(["head", "last"], function(n, e) {
        var t = "take" + (e ? "Right" : "");
        nn.prototype[n] = function() {
          return this[t](1).value()[0];
        };
      }), Vn(["initial", "tail"], function(n, e) {
        var t = "drop" + (e ? "" : "Right");
        nn.prototype[n] = function() {
          return this.__filtered__ ? new nn(this) : this[t](1);
        };
      }), nn.prototype.compact = function() {
        return this.filter(Zn);
      }, nn.prototype.find = function(n) {
        return this.filter(n).head();
      }, nn.prototype.findLast = function(n) {
        return this.reverse().find(n);
      }, nn.prototype.invokeMap = V(function(n, e) {
        return typeof n == "function" ? new nn(this) : this.map(function(t) {
          return Ft(t, n, e);
        });
      }), nn.prototype.reject = function(n) {
        return this.filter(Fr(U(n)));
      }, nn.prototype.slice = function(n, e) {
        n = k(n);
        var t = this;
        return t.__filtered__ && (n > 0 || e < 0) ? new nn(t) : (n < 0 ? t = t.takeRight(-n) : n && (t = t.drop(n)), e !== r && (e = k(e), t = e < 0 ? t.dropRight(-e) : t.take(e - n)), t);
      }, nn.prototype.takeRightWhile = function(n) {
        return this.reverse().takeWhile(n).reverse();
      }, nn.prototype.toArray = function() {
        return this.take(ge);
      }, pe(nn.prototype, function(n, e) {
        var t = /^(?:filter|find|map|reject)|While$/.test(e), u = /^(?:head|last)$/.test(e), l = c[u ? "take" + (e == "last" ? "Right" : "") : e], h = u || /^find/.test(e);
        l && (c.prototype[e] = function() {
          var p = this.__wrapped__, _ = u ? [1] : arguments, A = p instanceof nn, R = _[0], L = A || X(p), T = function(j) {
            var en = l.apply(c, Oe([j], _));
            return u && P ? en[0] : en;
          };
          L && t && typeof R == "function" && R.length != 1 && (A = L = !1);
          var P = this.__chain__, y = !!this.__actions__.length, q = h && !P, Q = A && !y;
          if (!h && L) {
            p = Q ? p : new nn(this);
            var G = n.apply(p, _);
            return G.__actions__.push({ func: br, args: [T], thisArg: r }), new ne(G, P);
          }
          return q && Q ? n.apply(this, _) : (G = this.thru(T), q ? u ? G.value()[0] : G.value() : G);
        });
      }), Vn(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
        var e = tr[n], t = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", u = /^(?:pop|shift)$/.test(n);
        c.prototype[n] = function() {
          var l = arguments;
          if (u && !this.__chain__) {
            var h = this.value();
            return e.apply(X(h) ? h : [], l);
          }
          return this[t](function(p) {
            return e.apply(X(p) ? p : [], l);
          });
        };
      }), pe(nn.prototype, function(n, e) {
        var t = c[e];
        if (t) {
          var u = t.name + "";
          sn.call(lt, u) || (lt[u] = []), lt[u].push({ name: e, func: t });
        }
      }), lt[Cr(r, tn).name] = [{
        name: "wrapper",
        func: r
      }], nn.prototype.clone = xa, nn.prototype.reverse = Ca, nn.prototype.value = Ia, c.prototype.at = j0, c.prototype.chain = nh, c.prototype.commit = eh, c.prototype.next = th, c.prototype.plant = ih, c.prototype.reverse = uh, c.prototype.toJSON = c.prototype.valueOf = c.prototype.value = fh, c.prototype.first = c.prototype.head, Lt && (c.prototype[Lt] = rh), c;
    }, ft = ea();
    $e ? (($e.exports = ft)._ = ft, li._ = ft) : Tn._ = ft;
  }).call(Gt);
})(Zr, Zr.exports);
var pd = Zr.exports;
const Zt = /* @__PURE__ */ gd(pd), dd = ["onMousedown"], vd = /* @__PURE__ */ ss({
  name: "VueAutoDraggable"
}), _d = /* @__PURE__ */ ss({
  ...vd,
  props: {
    theme: {
      default: "#409EFD"
    },
    unitType: {
      default: "px"
    },
    scale: {
      default: 1
    },
    isKeepDecimals: {
      type: Boolean,
      default: !1
    },
    decimalPlaces: {
      default: 2
    },
    draggable: {
      type: Boolean,
      default: !0
    },
    resizeable: {
      type: Boolean,
      default: !0
    },
    limitAreaForParent: {
      type: Boolean,
      default: !0
    },
    limitAreaClass: {},
    modelValue: {
      default: () => ({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        zIndex: 1
      })
    },
    maxWidth: {},
    maxHeight: {},
    minWidth: {
      default: 0
    },
    minHeight: {
      default: 0
    },
    ratioLock: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean
    },
    disabledUserSelect: {
      type: Boolean,
      default: !0
    },
    handles: {
      default: () => ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"]
    }
  },
  emits: ["update:modelValue", "drag-start", "drag-stop", "resize-start", "resize-stop", "active", "inactive"],
  setup(i, {
    emit: f
  }) {
    const r = i, s = f, o = lp({
      // 记录点击前当前元素信息
      beforeClickConfig: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      initX: 0,
      // 记录鼠标第一次点击元素位置，下同
      initY: 0,
      parentElement: null,
      // 父元素
      parentRectArea: null,
      // 父元素rect
      ele: null,
      // 主元素监听
      // 父元素宽高
      parentInfo: {
        width: 0,
        height: 0
      },
      active: r.active,
      // 是否开启移动
      handle: null,
      // 触点位置
      rate: 1
      // 宽高比，宽高比将会保留小数，故采用props默认的小数位进行保存
    }), a = qt({
      get() {
        return r.modelValue;
      },
      set(F) {
        s("update:modelValue", F);
      }
    }), g = ap(), v = qt(() => ({
      borderColor: r.draggable ? r.theme : "#666666",
      left: Wr(a.value.left, r.unitType),
      top: Wr(a.value.top, r.unitType),
      width: Wr(a.value.width, r.unitType),
      height: Wr(a.value.height, r.unitType),
      zIndex: a.value.zIndex
    })), w = qt(() => r.unitType === "%"), d = qt(() => {
      const F = mn(r.maxWidth, 0), O = r.limitAreaForParent ? F > o.parentInfo.width || !F ? o.parentInfo.width : F : 1 / 0;
      return w.value && (F ? Math.min(100, F) : 100) || O;
    }), E = qt(() => {
      const F = mn(r.maxHeight, 0), O = r.limitAreaForParent ? F > o.parentInfo.height || !F ? o.parentInfo.height : F : 1 / 0;
      return w.value && (F ? Math.min(100, F) : 100) || O;
    });
    cp(() => r.active, (F) => {
      o.active = F, F || s("inactive", Zt.cloneDeep(a.value));
    }), hp(() => {
      C();
    });
    const C = () => {
      var F;
      o.ele = document.documentElement || ((F = g.value) == null ? void 0 : F.parentElement) || g.value;
    }, S = (F, O) => {
      const D = w.value ? O === "w" ? mn(F, 0) / o.parentInfo.width * 100 : mn(F, 0) / o.parentInfo.height * 100 : F;
      return hd(D, r.scale, r.isKeepDecimals, r.decimalPlaces);
    }, b = (F, O = 1) => {
      const D = new wt(F).toDecimalPlaces(r.decimalPlaces).toNumber();
      return mn(D, O);
    }, Z = (F, O, D, z) => {
      const $ = F / D, ln = O / z;
      return $ > ln ? [b(D * ln), b(O)] : [b(F), b(z * $)];
    }, W = (F, O = null) => {
      var $, ln, Cn, pn;
      if (!(r.draggable || r.resizeable))
        return;
      const {
        clientX: D,
        clientY: z
      } = F;
      o.initX = D, o.initY = z, o.beforeClickConfig = Zt.cloneDeep(a.value), s("active", Zt.cloneDeep(a.value)), r.draggable && !O && s("drag-start", F, o.beforeClickConfig), r.resizeable && O && s("resize-start", F, o.beforeClickConfig), r.limitAreaForParent && (o.parentElement = r.limitAreaClass && document.querySelector(r.limitAreaClass) || g.value.parentElement, o.parentRectArea = o.parentElement.getBoundingClientRect(), o.parentInfo.height !== (($ = o.parentElement) == null ? void 0 : $.clientHeight) && (o.parentInfo.height = ((ln = o.parentElement) == null ? void 0 : ln.clientHeight) || 0), o.parentInfo.width !== ((Cn = o.parentElement) == null ? void 0 : Cn.clientWidth) && (o.parentInfo.width = ((pn = o.parentElement) == null ? void 0 : pn.clientWidth) || 0)), !o.active && (o.active = !0), o.handle = O, r.ratioLock && (o.rate = b(mn(o.beforeClickConfig.width, 1) / mn(o.beforeClickConfig.height, 1), 1)), fs(o.ele, "mousemove", un), fs(o.ele, "mouseup", tn);
    }, un = (F) => {
      const O = mn(o.beforeClickConfig.left, 0), D = mn(o.beforeClickConfig.top, 0), z = mn(o.beforeClickConfig.width, 0), $ = mn(o.beforeClickConfig.height, 0), ln = (dn, J, Pn, Ln, vn) => {
        const rn = O + S(F.clientX - o.initX, "w");
        mn(a.value.width, 0) > 0 && (!o.handle || mn(a.value.width, 0) < d.value) && (a.value.left = je(b(rn), dn || 0, J || (w.value ? 100 : o.parentInfo.width) - mn(a.value.width, 0), r.limitAreaForParent)), Pn && (a.value.top = je(b(D + S(F.clientX - o.initX, "w") / o.rate), Ln, vn, r.limitAreaForParent));
      }, Cn = (dn, J) => {
        const Pn = D + S(F.clientY - o.initY, "h");
        mn(a.value.height, 0) > 0 && (!o.handle || mn(a.value.height, 0) < E.value) && (a.value.top = je(b(Pn), dn || 0, J || (w.value ? 100 : o.parentInfo.height) - mn(a.value.height, 0), r.limitAreaForParent));
      }, pn = (dn = "add", J = d.value, Pn) => {
        const Ln = S(F.clientX - o.initX, "w"), vn = dn === "add" ? z + Ln : z - Ln;
        if (a.value.width = je(b(vn), mn(r.minWidth, 0), J, r.limitAreaForParent), r.ratioLock && Pn) {
          const rn = dn === "add" ? $ + Ln / o.rate : $ - Ln / o.rate;
          a.value.height = je(b(rn), mn(r.minHeight, 0), Pn, r.limitAreaForParent);
        }
      }, Un = (dn = "add", J = E.value, Pn) => {
        const Ln = S(F.clientY - o.initY, "h"), vn = dn === "add" ? $ + Ln : $ - Ln;
        if (a.value.height = je(b(vn), mn(r.minHeight, 0), J, r.limitAreaForParent), r.ratioLock && Pn) {
          const rn = dn === "add" ? z + b(Ln * o.rate) : z - b(Ln * o.rate);
          a.value.width = je(b(rn), mn(r.minWidth, 0), Pn, r.limitAreaForParent);
        }
      };
      o.active && (r.draggable && !o.handle && (Cn(), ln()), r.resizeable && o.handle && {
        tl: () => {
          if (r.ratioLock) {
            const J = Z(O + z, D + $, z, $);
            pn("sub", J[0], J[1]), console.log(J), console.log(D - (J[1] - $)), ln(Math.max(0, O - (J[1] - $) * o.rate), O + z, !0, D - (J[1] - $), D + $);
          } else
            pn("sub", O + z), Un("sub", D + $), Cn(), ln();
        },
        tm: () => {
          if (r.ratioLock) {
            const J = Z(d.value - O, D + $, z, $);
            Un("sub", J[1], J[0]), Cn(D - (J[0] - z) / o.rate, D + $);
          } else
            Un("sub", D + $), Cn();
        },
        tr: () => {
          if (r.ratioLock) {
            const J = Z(d.value - O, D + $, z, $);
            Un("sub", J[1], J[0]), Cn(D - (J[0] - z) / o.rate, D + $);
          } else
            Un("sub", D + $), pn("add", d.value - O), Cn();
        },
        // done
        br: () => {
          r.ratioLock ? pn("add", ...Z(d.value - O, E.value - D, z, $)) : (pn("add", d.value - O), Un("add", E.value - D));
        },
        // done
        bm: () => {
          const J = Z(d.value - O, E.value - D, z, $);
          Un("add", J[1], J[0]);
        },
        // done
        bl: () => {
          if (r.ratioLock) {
            const J = Z(z + O, E.value - D, z, $);
            pn("sub", ...J), ln(O + z - J[0]);
          } else
            pn("sub", z + O), Un("add", E.value - D), ln();
        },
        // done
        mr: () => {
          if (r.ratioLock) {
            const J = Z(d.value - O, E.value - D, z, $);
            pn("add", ...J);
          } else
            pn("add", d.value - O);
        },
        // done
        ml: () => {
          if (r.ratioLock) {
            const J = Z(z + O, E.value - D, z, $);
            pn("sub", ...J), ln(O + z - J[0]);
          } else
            pn("sub", z + O), ln();
        }
      }[o.handle]());
    }, tn = (F) => {
      r.draggable && !o.handle && s("drag-stop", F, o.beforeClickConfig, Zt.cloneDeep(a.value)), r.resizeable && o.handle && s("resize-stop", F, o.beforeClickConfig, Zt.cloneDeep(a.value)), !r.active && (o.active = !1), o.handle = null, os(o.ele, "mousemove", un), os(o.ele, "mouseup", tn);
    };
    return (F, O) => (pu(), du("div", {
      ref_key: "autoDraggableRef",
      ref: g,
      class: es(["auto-draggable", {
        "select-none": F.disabledUserSelect
      }]),
      style: gp(v.value),
      onMousedown: O[0] || (O[0] = ts((D) => W(D, null), ["prevent", "self"]))
    }, [(pu(!0), du(pp, null, dp(F.handles, (D) => vp((pu(), du("div", {
      key: D,
      class: es(["handle", "handle-" + D]),
      onMousedown: ts((z) => W(z, D), ["stop", "self"])
    }, null, 42, dd)), [[_p, o.active && F.resizeable]])), 128)), wp(F.$slots, "default", {}, void 0, !0)], 38));
  }
}), wd = (i, f) => {
  const r = i.__vccOpts || i;
  for (const [s, o] of f)
    r[s] = o;
  return r;
}, md = /* @__PURE__ */ wd(_d, [["__scopeId", "data-v-0a84b873"]]), Ed = {
  install(i) {
    i.component("VueAutoDraggable", md);
  }
};
export {
  md as VueAutoDraggable,
  Ed as default
};
