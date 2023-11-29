(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === 'childList')
        for (const o of r.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r);
  }
})();
function Ei(e, t) {
  const n = Object.create(null),
    i = e.split(',');
  for (let s = 0; s < i.length; s++) n[i[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const re = {},
  It = [],
  Ge = () => {},
  so = () => !1,
  ro = /^on[^a-z]/,
  kn = (e) => ro.test(e),
  Ci = (e) => e.startsWith('onUpdate:'),
  ge = Object.assign,
  Mi = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  oo = Object.prototype.hasOwnProperty,
  ee = (e, t) => oo.call(e, t),
  U = Array.isArray,
  kt = (e) => zn(e) === '[object Map]',
  Ws = (e) => zn(e) === '[object Set]',
  J = (e) => typeof e == 'function',
  he = (e) => typeof e == 'string',
  $n = (e) => typeof e == 'symbol',
  oe = (e) => e !== null && typeof e == 'object',
  qs = (e) => (oe(e) || J(e)) && J(e.then) && J(e.catch),
  Us = Object.prototype.toString,
  zn = (e) => Us.call(e),
  lo = (e) => zn(e).slice(8, -1),
  Ks = (e) => zn(e) === '[object Object]',
  Pi = (e) =>
    he(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  bn = Ei(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Bn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  ao = /-(\w)/g,
  Je = Bn((e) => e.replace(ao, (t, n) => (n ? n.toUpperCase() : ''))),
  co = /\B([A-Z])/g,
  Rt = Bn((e) => e.replace(co, '-$1').toLowerCase()),
  Dn = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Un = Bn((e) => (e ? `on${Dn(e)}` : '')),
  Pt = (e, t) => !Object.is(e, t),
  Kn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Sn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  fo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  uo = (e) => {
    const t = he(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let ss;
const ai = () =>
  ss ||
  (ss =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {});
function Bt(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n],
        s = he(i) ? go(i) : Bt(i);
      if (s) for (const r in s) t[r] = s[r];
    }
    return t;
  } else if (he(e) || oe(e)) return e;
}
const po = /;(?![^(]*\))/g,
  ho = /:([^]+)/,
  mo = /\/\*[^]*?\*\//g;
function go(e) {
  const t = {};
  return (
    e
      .replace(mo, '')
      .split(po)
      .forEach((n) => {
        if (n) {
          const i = n.split(ho);
          i.length > 1 && (t[i[0].trim()] = i[1].trim());
        }
      }),
    t
  );
}
function Pe(e) {
  let t = '';
  if (he(e)) t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const i = Pe(e[n]);
      i && (t += i + ' ');
    }
  else if (oe(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const vo =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  bo = Ei(vo);
function Ys(e) {
  return !!e || e === '';
}
const et = (e) =>
    he(e)
      ? e
      : e == null
      ? ''
      : U(e) || (oe(e) && (e.toString === Us || !J(e.toString)))
      ? JSON.stringify(e, Xs, 2)
      : String(e),
  Xs = (e, t) =>
    t && t.__v_isRef
      ? Xs(e, t.value)
      : kt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [i, s]) => ((n[`${i} =>`] = s), n),
            {}
          ),
        }
      : Ws(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : oe(t) && !U(t) && !Ks(t)
      ? String(t)
      : t;
let je;
class wo {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = je),
      !t && je && (this.index = (je.scopes || (je.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = je;
      try {
        return (je = this), t();
      } finally {
        je = n;
      }
    }
  }
  on() {
    je = this;
  }
  off() {
    je = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, i = this.scopes.length; n < i; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function yo(e, t = je) {
  t && t.active && t.effects.push(e);
}
function _o() {
  return je;
}
const Oi = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Js = (e) => (e.w & mt) > 0,
  Zs = (e) => (e.n & mt) > 0,
  xo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= mt;
  },
  So = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let i = 0; i < t.length; i++) {
        const s = t[i];
        Js(s) && !Zs(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~mt),
          (s.n &= ~mt);
      }
      t.length = n;
    }
  },
  Tn = new WeakMap();
let Ut = 0,
  mt = 1;
const ci = 30;
let He;
const Et = Symbol(''),
  di = Symbol('');
class Ai {
  constructor(t, n = null, i) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      yo(this, i);
  }
  run() {
    if (!this.active) return this.fn();
    let t = He,
      n = pt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = He),
        (He = this),
        (pt = !0),
        (mt = 1 << ++Ut),
        Ut <= ci ? xo(this) : rs(this),
        this.fn()
      );
    } finally {
      Ut <= ci && So(this),
        (mt = 1 << --Ut),
        (He = this.parent),
        (pt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    He === this
      ? (this.deferStop = !0)
      : this.active &&
        (rs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function rs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let pt = !0;
const Qs = [];
function Ft() {
  Qs.push(pt), (pt = !1);
}
function jt() {
  const e = Qs.pop();
  pt = e === void 0 ? !0 : e;
}
function Oe(e, t, n) {
  if (pt && He) {
    let i = Tn.get(e);
    i || Tn.set(e, (i = new Map()));
    let s = i.get(n);
    s || i.set(n, (s = Oi())), er(s);
  }
}
function er(e, t) {
  let n = !1;
  Ut <= ci ? Zs(e) || ((e.n |= mt), (n = !Js(e))) : (n = !e.has(He)),
    n && (e.add(He), He.deps.push(e));
}
function tt(e, t, n, i, s, r) {
  const o = Tn.get(e);
  if (!o) return;
  let a = [];
  if (t === 'clear') a = [...o.values()];
  else if (n === 'length' && U(e)) {
    const l = Number(i);
    o.forEach((c, d) => {
      (d === 'length' || (!$n(d) && d >= l)) && a.push(c);
    });
  } else
    switch ((n !== void 0 && a.push(o.get(n)), t)) {
      case 'add':
        U(e)
          ? Pi(n) && a.push(o.get('length'))
          : (a.push(o.get(Et)), kt(e) && a.push(o.get(di)));
        break;
      case 'delete':
        U(e) || (a.push(o.get(Et)), kt(e) && a.push(o.get(di)));
        break;
      case 'set':
        kt(e) && a.push(o.get(Et));
        break;
    }
  if (a.length === 1) a[0] && fi(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    fi(Oi(l));
  }
}
function fi(e, t) {
  const n = U(e) ? e : [...e];
  for (const i of n) i.computed && os(i);
  for (const i of n) i.computed || os(i);
}
function os(e, t) {
  (e !== He || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function To(e, t) {
  var n;
  return (n = Tn.get(e)) == null ? void 0 : n.get(t);
}
const Eo = Ei('__proto__,__v_isRef,__isVue'),
  tr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter($n)
  ),
  ls = Co();
function Co() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const i = te(this);
        for (let r = 0, o = this.length; r < o; r++) Oe(i, 'get', r + '');
        const s = i[t](...n);
        return s === -1 || s === !1 ? i[t](...n.map(te)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        Ft();
        const i = te(this)[t].apply(this, n);
        return jt(), i;
      };
    }),
    e
  );
}
function Mo(e) {
  const t = te(this);
  return Oe(t, 'has', e), t.hasOwnProperty(e);
}
class nr {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, i) {
    const s = this._isReadonly,
      r = this._shallow;
    if (n === '__v_isReactive') return !s;
    if (n === '__v_isReadonly') return s;
    if (n === '__v_isShallow') return r;
    if (n === '__v_raw' && i === (s ? (r ? Fo : or) : r ? rr : sr).get(t))
      return t;
    const o = U(t);
    if (!s) {
      if (o && ee(ls, n)) return Reflect.get(ls, n, i);
      if (n === 'hasOwnProperty') return Mo;
    }
    const a = Reflect.get(t, n, i);
    return ($n(n) ? tr.has(n) : Eo(n)) || (s || Oe(t, 'get', n), r)
      ? a
      : ye(a)
      ? o && Pi(n)
        ? a
        : a.value
      : oe(a)
      ? s
        ? lr(a)
        : ki(a)
      : a;
  }
}
class ir extends nr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, s) {
    let r = t[n];
    if (Dt(r) && ye(r) && !ye(i)) return !1;
    if (
      !this._shallow &&
      (!En(i) && !Dt(i) && ((r = te(r)), (i = te(i))), !U(t) && ye(r) && !ye(i))
    )
      return (r.value = i), !0;
    const o = U(t) && Pi(n) ? Number(n) < t.length : ee(t, n),
      a = Reflect.set(t, n, i, s);
    return (
      t === te(s) && (o ? Pt(i, r) && tt(t, 'set', n, i) : tt(t, 'add', n, i)),
      a
    );
  }
  deleteProperty(t, n) {
    const i = ee(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && i && tt(t, 'delete', n, void 0), s;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!$n(n) || !tr.has(n)) && Oe(t, 'has', n), i;
  }
  ownKeys(t) {
    return Oe(t, 'iterate', U(t) ? 'length' : Et), Reflect.ownKeys(t);
  }
}
class Po extends nr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Oo = new ir(),
  Ao = new Po(),
  Lo = new ir(!0),
  Li = (e) => e,
  Nn = (e) => Reflect.getPrototypeOf(e);
function cn(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const s = te(e),
    r = te(t);
  n || (Pt(t, r) && Oe(s, 'get', t), Oe(s, 'get', r));
  const { has: o } = Nn(s),
    a = i ? Li : n ? zi : Qt;
  if (o.call(s, t)) return a(e.get(t));
  if (o.call(s, r)) return a(e.get(r));
  e !== s && e.get(t);
}
function dn(e, t = !1) {
  const n = this.__v_raw,
    i = te(n),
    s = te(e);
  return (
    t || (Pt(e, s) && Oe(i, 'has', e), Oe(i, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function fn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Oe(te(e), 'iterate', Et), Reflect.get(e, 'size', e)
  );
}
function as(e) {
  e = te(e);
  const t = te(this);
  return Nn(t).has.call(t, e) || (t.add(e), tt(t, 'add', e, e)), this;
}
function cs(e, t) {
  t = te(t);
  const n = te(this),
    { has: i, get: s } = Nn(n);
  let r = i.call(n, e);
  r || ((e = te(e)), (r = i.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), r ? Pt(t, o) && tt(n, 'set', e, t) : tt(n, 'add', e, t), this
  );
}
function ds(e) {
  const t = te(this),
    { has: n, get: i } = Nn(t);
  let s = n.call(t, e);
  s || ((e = te(e)), (s = n.call(t, e))), i && i.call(t, e);
  const r = t.delete(e);
  return s && tt(t, 'delete', e, void 0), r;
}
function fs() {
  const e = te(this),
    t = e.size !== 0,
    n = e.clear();
  return t && tt(e, 'clear', void 0, void 0), n;
}
function un(e, t) {
  return function (i, s) {
    const r = this,
      o = r.__v_raw,
      a = te(o),
      l = t ? Li : e ? zi : Qt;
    return (
      !e && Oe(a, 'iterate', Et), o.forEach((c, d) => i.call(s, l(c), l(d), r))
    );
  };
}
function pn(e, t, n) {
  return function (...i) {
    const s = this.__v_raw,
      r = te(s),
      o = kt(r),
      a = e === 'entries' || (e === Symbol.iterator && o),
      l = e === 'keys' && o,
      c = s[e](...i),
      d = n ? Li : t ? zi : Qt;
    return (
      !t && Oe(r, 'iterate', l ? di : Et),
      {
        next() {
          const { value: f, done: h } = c.next();
          return h
            ? { value: f, done: h }
            : { value: a ? [d(f[0]), d(f[1])] : d(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ot(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function Io() {
  const e = {
      get(r) {
        return cn(this, r);
      },
      get size() {
        return fn(this);
      },
      has: dn,
      add: as,
      set: cs,
      delete: ds,
      clear: fs,
      forEach: un(!1, !1),
    },
    t = {
      get(r) {
        return cn(this, r, !1, !0);
      },
      get size() {
        return fn(this);
      },
      has: dn,
      add: as,
      set: cs,
      delete: ds,
      clear: fs,
      forEach: un(!1, !0),
    },
    n = {
      get(r) {
        return cn(this, r, !0);
      },
      get size() {
        return fn(this, !0);
      },
      has(r) {
        return dn.call(this, r, !0);
      },
      add: ot('add'),
      set: ot('set'),
      delete: ot('delete'),
      clear: ot('clear'),
      forEach: un(!0, !1),
    },
    i = {
      get(r) {
        return cn(this, r, !0, !0);
      },
      get size() {
        return fn(this, !0);
      },
      has(r) {
        return dn.call(this, r, !0);
      },
      add: ot('add'),
      set: ot('set'),
      delete: ot('delete'),
      clear: ot('clear'),
      forEach: un(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      (e[r] = pn(r, !1, !1)),
        (n[r] = pn(r, !0, !1)),
        (t[r] = pn(r, !1, !0)),
        (i[r] = pn(r, !0, !0));
    }),
    [e, n, t, i]
  );
}
const [ko, $o, zo, Bo] = Io();
function Ii(e, t) {
  const n = t ? (e ? Bo : zo) : e ? $o : ko;
  return (i, s, r) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
      ? e
      : s === '__v_raw'
      ? i
      : Reflect.get(ee(n, s) && s in i ? n : i, s, r);
}
const Do = { get: Ii(!1, !1) },
  No = { get: Ii(!1, !0) },
  Ro = { get: Ii(!0, !1) },
  sr = new WeakMap(),
  rr = new WeakMap(),
  or = new WeakMap(),
  Fo = new WeakMap();
function jo(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Ho(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : jo(lo(e));
}
function ki(e) {
  return Dt(e) ? e : $i(e, !1, Oo, Do, sr);
}
function Vo(e) {
  return $i(e, !1, Lo, No, rr);
}
function lr(e) {
  return $i(e, !0, Ao, Ro, or);
}
function $i(e, t, n, i, s) {
  if (!oe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = s.get(e);
  if (r) return r;
  const o = Ho(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? i : n);
  return s.set(e, a), a;
}
function $t(e) {
  return Dt(e) ? $t(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Dt(e) {
  return !!(e && e.__v_isReadonly);
}
function En(e) {
  return !!(e && e.__v_isShallow);
}
function ar(e) {
  return $t(e) || Dt(e);
}
function te(e) {
  const t = e && e.__v_raw;
  return t ? te(t) : e;
}
function cr(e) {
  return Sn(e, '__v_skip', !0), e;
}
const Qt = (e) => (oe(e) ? ki(e) : e),
  zi = (e) => (oe(e) ? lr(e) : e);
function dr(e) {
  pt && He && ((e = te(e)), er(e.dep || (e.dep = Oi())));
}
function fr(e, t) {
  e = te(e);
  const n = e.dep;
  n && fi(n);
}
function ye(e) {
  return !!(e && e.__v_isRef === !0);
}
function pe(e) {
  return Go(e, !1);
}
function Go(e, t) {
  return ye(e) ? e : new Wo(e, t);
}
class Wo {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : te(t)),
      (this._value = n ? t : Qt(t));
  }
  get value() {
    return dr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || En(t) || Dt(t);
    (t = n ? t : te(t)),
      Pt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Qt(t)), fr(this));
  }
}
function ur(e) {
  return ye(e) ? e.value : e;
}
const qo = {
  get: (e, t, n) => ur(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const s = e[t];
    return ye(s) && !ye(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, i);
  },
};
function pr(e) {
  return $t(e) ? e : new Proxy(e, qo);
}
function Uo(e) {
  const t = U(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Yo(e, n);
  return t;
}
class Ko {
  constructor(t, n, i) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = i),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return To(te(this._object), this._key);
  }
}
function Yo(e, t, n) {
  const i = e[t];
  return ye(i) ? i : new Ko(e, t, n);
}
class Xo {
  constructor(t, n, i, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Ai(t, () => {
        this._dirty || ((this._dirty = !0), fr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = i);
  }
  get value() {
    const t = te(this);
    return (
      dr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Jo(e, t, n = !1) {
  let i, s;
  const r = J(e);
  return (
    r ? ((i = e), (s = Ge)) : ((i = e.get), (s = e.set)),
    new Xo(i, s, r || !s, n)
  );
}
function ht(e, t, n, i) {
  let s;
  try {
    s = i ? e(...i) : e();
  } catch (r) {
    Rn(r, t, n);
  }
  return s;
}
function Re(e, t, n, i) {
  if (J(e)) {
    const r = ht(e, t, n, i);
    return (
      r &&
        qs(r) &&
        r.catch((o) => {
          Rn(o, t, n);
        }),
      r
    );
  }
  const s = [];
  for (let r = 0; r < e.length; r++) s.push(Re(e[r], t, n, i));
  return s;
}
function Rn(e, t, n, i = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy,
      a = n;
    for (; r; ) {
      const c = r.ec;
      if (c) {
        for (let d = 0; d < c.length; d++) if (c[d](e, o, a) === !1) return;
      }
      r = r.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      ht(l, null, 10, [e, o, a]);
      return;
    }
  }
  Zo(e, n, s, i);
}
function Zo(e, t, n, i = !0) {
  console.error(e);
}
let en = !1,
  ui = !1;
const xe = [];
let Ke = 0;
const zt = [];
let Qe = null,
  _t = 0;
const hr = Promise.resolve();
let Bi = null;
function Di(e) {
  const t = Bi || hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Qo(e) {
  let t = Ke + 1,
    n = xe.length;
  for (; t < n; ) {
    const i = (t + n) >>> 1,
      s = xe[i],
      r = tn(s);
    r < e || (r === e && s.pre) ? (t = i + 1) : (n = i);
  }
  return t;
}
function Ni(e) {
  (!xe.length || !xe.includes(e, en && e.allowRecurse ? Ke + 1 : Ke)) &&
    (e.id == null ? xe.push(e) : xe.splice(Qo(e.id), 0, e), mr());
}
function mr() {
  !en && !ui && ((ui = !0), (Bi = hr.then(vr)));
}
function el(e) {
  const t = xe.indexOf(e);
  t > Ke && xe.splice(t, 1);
}
function tl(e) {
  U(e)
    ? zt.push(...e)
    : (!Qe || !Qe.includes(e, e.allowRecurse ? _t + 1 : _t)) && zt.push(e),
    mr();
}
function us(e, t = en ? Ke + 1 : 0) {
  for (; t < xe.length; t++) {
    const n = xe[t];
    n && n.pre && (xe.splice(t, 1), t--, n());
  }
}
function gr(e) {
  if (zt.length) {
    const t = [...new Set(zt)];
    if (((zt.length = 0), Qe)) {
      Qe.push(...t);
      return;
    }
    for (Qe = t, Qe.sort((n, i) => tn(n) - tn(i)), _t = 0; _t < Qe.length; _t++)
      Qe[_t]();
    (Qe = null), (_t = 0);
  }
}
const tn = (e) => (e.id == null ? 1 / 0 : e.id),
  nl = (e, t) => {
    const n = tn(e) - tn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function vr(e) {
  (ui = !1), (en = !0), xe.sort(nl);
  const t = Ge;
  try {
    for (Ke = 0; Ke < xe.length; Ke++) {
      const n = xe[Ke];
      n && n.active !== !1 && ht(n, null, 14);
    }
  } finally {
    (Ke = 0),
      (xe.length = 0),
      gr(),
      (en = !1),
      (Bi = null),
      (xe.length || zt.length) && vr();
  }
}
function il(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || re;
  let s = n;
  const r = t.startsWith('update:'),
    o = r && t.slice(7);
  if (o && o in i) {
    const d = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: f, trim: h } = i[d] || re;
    h && (s = n.map((u) => (he(u) ? u.trim() : u))), f && (s = n.map(fo));
  }
  let a,
    l = i[(a = Un(t))] || i[(a = Un(Je(t)))];
  !l && r && (l = i[(a = Un(Rt(t)))]), l && Re(l, e, 6, s);
  const c = i[a + 'Once'];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Re(c, e, 6, s);
  }
}
function br(e, t, n = !1) {
  const i = t.emitsCache,
    s = i.get(e);
  if (s !== void 0) return s;
  const r = e.emits;
  let o = {},
    a = !1;
  if (!J(e)) {
    const l = (c) => {
      const d = br(c, t, !0);
      d && ((a = !0), ge(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !r && !a
    ? (oe(e) && i.set(e, null), null)
    : (U(r) ? r.forEach((l) => (o[l] = null)) : ge(o, r),
      oe(e) && i.set(e, o),
      o);
}
function Fn(e, t) {
  return !e || !kn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Rt(t)) || ee(e, t));
}
let _e = null,
  wr = null;
function Cn(e) {
  const t = _e;
  return (_e = e), (wr = (e && e.type.__scopeId) || null), t;
}
function ft(e, t = _e, n) {
  if (!t || e._n) return e;
  const i = (...s) => {
    i._d && Ss(-1);
    const r = Cn(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Cn(r), i._d && Ss(1);
    }
    return o;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function Yn(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: s,
    props: r,
    propsOptions: [o],
    slots: a,
    attrs: l,
    emit: c,
    render: d,
    renderCache: f,
    data: h,
    setupState: u,
    ctx: T,
    inheritAttrs: w,
  } = e;
  let C, M;
  const m = Cn(e);
  try {
    if (n.shapeFlag & 4) {
      const _ = s || i;
      (C = Ue(d.call(_, _, f, r, u, h, T))), (M = l);
    } else {
      const _ = t;
      (C = Ue(
        _.length > 1 ? _(r, { attrs: l, slots: a, emit: c }) : _(r, null)
      )),
        (M = t.props ? l : sl(l));
    }
  } catch (_) {
    (Zt.length = 0), Rn(_, e, 1), (C = ne(Xe));
  }
  let b = C;
  if (M && w !== !1) {
    const _ = Object.keys(M),
      { shapeFlag: I } = b;
    _.length && I & 7 && (o && _.some(Ci) && (M = rl(M, o)), (b = gt(b, M)));
  }
  return (
    n.dirs && ((b = gt(b)), (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (b.transition = n.transition),
    (C = b),
    Cn(m),
    C
  );
}
const sl = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || kn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  rl = (e, t) => {
    const n = {};
    for (const i in e) (!Ci(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
    return n;
  };
function ol(e, t, n) {
  const { props: i, children: s, component: r } = e,
    { props: o, children: a, patchFlag: l } = t,
    c = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return i ? ps(i, o, c) : !!o;
    if (l & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const h = d[f];
        if (o[h] !== i[h] && !Fn(c, h)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : i === o
      ? !1
      : i
      ? o
        ? ps(i, o, c)
        : !0
      : !!o;
  return !1;
}
function ps(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (t[r] !== e[r] && !Fn(n, r)) return !0;
  }
  return !1;
}
function ll({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const al = (e) => e.__isSuspense;
function cl(e, t) {
  t && t.pendingBranch
    ? U(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : tl(e);
}
const hn = {};
function Yt(e, t, n) {
  return yr(e, t, n);
}
function yr(
  e,
  t,
  { immediate: n, deep: i, flush: s, onTrack: r, onTrigger: o } = re
) {
  var a;
  const l = _o() === ((a = be) == null ? void 0 : a.scope) ? be : null;
  let c,
    d = !1,
    f = !1;
  if (
    (ye(e)
      ? ((c = () => e.value), (d = En(e)))
      : $t(e)
      ? ((c = () => e), (i = !0))
      : U(e)
      ? ((f = !0),
        (d = e.some((_) => $t(_) || En(_))),
        (c = () =>
          e.map((_) => {
            if (ye(_)) return _.value;
            if ($t(_)) return Tt(_);
            if (J(_)) return ht(_, l, 2);
          })))
      : J(e)
      ? t
        ? (c = () => ht(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return h && h(), Re(e, l, 3, [u]);
          })
      : (c = Ge),
    t && i)
  ) {
    const _ = c;
    c = () => Tt(_());
  }
  let h,
    u = (_) => {
      h = m.onStop = () => {
        ht(_, l, 4);
      };
    },
    T;
  if (rn)
    if (
      ((u = Ge),
      t ? n && Re(t, l, 3, [c(), f ? [] : void 0, u]) : c(),
      s === 'sync')
    ) {
      const _ = ra();
      T = _.__watcherHandles || (_.__watcherHandles = []);
    } else return Ge;
  let w = f ? new Array(e.length).fill(hn) : hn;
  const C = () => {
    if (m.active)
      if (t) {
        const _ = m.run();
        (i || d || (f ? _.some((I, j) => Pt(I, w[j])) : Pt(_, w))) &&
          (h && h(),
          Re(t, l, 3, [_, w === hn ? void 0 : f && w[0] === hn ? [] : w, u]),
          (w = _));
      } else m.run();
  };
  C.allowRecurse = !!t;
  let M;
  s === 'sync'
    ? (M = C)
    : s === 'post'
    ? (M = () => Me(C, l && l.suspense))
    : ((C.pre = !0), l && (C.id = l.uid), (M = () => Ni(C)));
  const m = new Ai(c, M);
  t
    ? n
      ? C()
      : (w = m.run())
    : s === 'post'
    ? Me(m.run.bind(m), l && l.suspense)
    : m.run();
  const b = () => {
    m.stop(), l && l.scope && Mi(l.scope.effects, m);
  };
  return T && T.push(b), b;
}
function dl(e, t, n) {
  const i = this.proxy,
    s = he(e) ? (e.includes('.') ? _r(i, e) : () => i[e]) : e.bind(i, i);
  let r;
  J(t) ? (r = t) : ((r = t.handler), (n = t));
  const o = be;
  Nt(this);
  const a = yr(s, r.bind(i), n);
  return o ? Nt(o) : Ct(), a;
}
function _r(e, t) {
  const n = t.split('.');
  return () => {
    let i = e;
    for (let s = 0; s < n.length && i; s++) i = i[n[s]];
    return i;
  };
}
function Tt(e, t) {
  if (!oe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ye(e))) Tt(e.value, t);
  else if (U(e)) for (let n = 0; n < e.length; n++) Tt(e[n], t);
  else if (Ws(e) || kt(e))
    e.forEach((n) => {
      Tt(n, t);
    });
  else if (Ks(e)) for (const n in e) Tt(e[n], t);
  return e;
}
function Ri(e, t) {
  const n = _e;
  if (n === null) return e;
  const i = Wn(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, a, l, c = re] = t[r];
    o &&
      (J(o) && (o = { mounted: o, updated: o }),
      o.deep && Tt(a),
      s.push({
        dir: o,
        instance: i,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function vt(e, t, n, i) {
  const s = e.dirs,
    r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    r && (a.oldValue = r[o].value);
    let l = a.dir[i];
    l && (Ft(), Re(l, n, 8, [e.el, a, e, t]), jt());
  }
}
const ct = Symbol('_leaveCb'),
  mn = Symbol('_enterCb');
function fl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    ln(() => {
      e.isMounted = !0;
    }),
    an(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const De = [Function, Array],
  xr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: De,
    onEnter: De,
    onAfterEnter: De,
    onEnterCancelled: De,
    onBeforeLeave: De,
    onLeave: De,
    onAfterLeave: De,
    onLeaveCancelled: De,
    onBeforeAppear: De,
    onAppear: De,
    onAfterAppear: De,
    onAppearCancelled: De,
  },
  ul = {
    name: 'BaseTransition',
    props: xr,
    setup(e, { slots: t }) {
      const n = Jl(),
        i = fl();
      let s;
      return () => {
        const r = t.default && Tr(t.default(), !0);
        if (!r || !r.length) return;
        let o = r[0];
        if (r.length > 1) {
          for (const w of r)
            if (w.type !== Xe) {
              o = w;
              break;
            }
        }
        const a = te(e),
          { mode: l } = a;
        if (i.isLeaving) return Xn(o);
        const c = hs(o);
        if (!c) return Xn(o);
        const d = pi(c, a, i, n);
        hi(c, d);
        const f = n.subTree,
          h = f && hs(f);
        let u = !1;
        const { getTransitionKey: T } = c.type;
        if (T) {
          const w = T();
          s === void 0 ? (s = w) : w !== s && ((s = w), (u = !0));
        }
        if (h && h.type !== Xe && (!xt(c, h) || u)) {
          const w = pi(h, a, i, n);
          if ((hi(h, w), l === 'out-in'))
            return (
              (i.isLeaving = !0),
              (w.afterLeave = () => {
                (i.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Xn(o)
            );
          l === 'in-out' &&
            c.type !== Xe &&
            (w.delayLeave = (C, M, m) => {
              const b = Sr(i, h);
              (b[String(h.key)] = h),
                (C[ct] = () => {
                  M(), (C[ct] = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = m);
            });
        }
        return o;
      };
    },
  },
  pl = ul;
function Sr(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || ((i = Object.create(null)), n.set(t.type, i)), i;
}
function pi(e, t, n, i) {
  const {
      appear: s,
      mode: r,
      persisted: o = !1,
      onBeforeEnter: a,
      onEnter: l,
      onAfterEnter: c,
      onEnterCancelled: d,
      onBeforeLeave: f,
      onLeave: h,
      onAfterLeave: u,
      onLeaveCancelled: T,
      onBeforeAppear: w,
      onAppear: C,
      onAfterAppear: M,
      onAppearCancelled: m,
    } = t,
    b = String(e.key),
    _ = Sr(n, e),
    I = (A, y) => {
      A && Re(A, i, 9, y);
    },
    j = (A, y) => {
      const $ = y[1];
      I(A, y),
        U(A) ? A.every((x) => x.length <= 1) && $() : A.length <= 1 && $();
    },
    D = {
      mode: r,
      persisted: o,
      beforeEnter(A) {
        let y = a;
        if (!n.isMounted)
          if (s) y = w || a;
          else return;
        A[ct] && A[ct](!0);
        const $ = _[b];
        $ && xt(e, $) && $.el[ct] && $.el[ct](), I(y, [A]);
      },
      enter(A) {
        let y = l,
          $ = c,
          x = d;
        if (!n.isMounted)
          if (s) (y = C || l), ($ = M || c), (x = m || d);
          else return;
        let g = !1;
        const E = (A[mn] = (P) => {
          g ||
            ((g = !0),
            P ? I(x, [A]) : I($, [A]),
            D.delayedLeave && D.delayedLeave(),
            (A[mn] = void 0));
        });
        y ? j(y, [A, E]) : E();
      },
      leave(A, y) {
        const $ = String(e.key);
        if ((A[mn] && A[mn](!0), n.isUnmounting)) return y();
        I(f, [A]);
        let x = !1;
        const g = (A[ct] = (E) => {
          x ||
            ((x = !0),
            y(),
            E ? I(T, [A]) : I(u, [A]),
            (A[ct] = void 0),
            _[$] === e && delete _[$]);
        });
        (_[$] = e), h ? j(h, [A, g]) : g();
      },
      clone(A) {
        return pi(A, t, n, i);
      },
    };
  return D;
}
function Xn(e) {
  if (jn(e)) return (e = gt(e)), (e.children = null), e;
}
function hs(e) {
  return jn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function hi(e, t) {
  e.shapeFlag & 6 && e.component
    ? hi(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Tr(e, t = !1, n) {
  let i = [],
    s = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === we
      ? (o.patchFlag & 128 && s++, (i = i.concat(Tr(o.children, t, a))))
      : (t || o.type !== Xe) && i.push(a != null ? gt(o, { key: a }) : o);
  }
  if (s > 1) for (let r = 0; r < i.length; r++) i[r].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */ function hl(e, t) {
  return J(e) ? (() => ge({ name: e.name }, t, { setup: e }))() : e;
}
const Xt = (e) => !!e.type.__asyncLoader,
  jn = (e) => e.type.__isKeepAlive;
function ml(e, t) {
  Er(e, 'a', t);
}
function gl(e, t) {
  Er(e, 'da', t);
}
function Er(e, t, n = be) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Hn(t, i, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      jn(s.parent.vnode) && vl(i, t, n, s), (s = s.parent);
  }
}
function vl(e, t, n, i) {
  const s = Hn(t, e, i, !0);
  Mr(() => {
    Mi(i[t], s);
  }, n);
}
function Hn(e, t, n = be, i = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          Ft(), Nt(n);
          const a = Re(t, n, e, o);
          return Ct(), jt(), a;
        });
    return i ? s.unshift(r) : s.push(r), r;
  }
}
const it =
    (e) =>
    (t, n = be) =>
      (!rn || e === 'sp') && Hn(e, (...i) => t(...i), n),
  bl = it('bm'),
  ln = it('m'),
  Cr = it('bu'),
  Fi = it('u'),
  an = it('bum'),
  Mr = it('um'),
  wl = it('sp'),
  yl = it('rtg'),
  _l = it('rtc');
function xl(e, t = be) {
  Hn('ec', e, t);
}
const Pr = 'components';
function nt(e, t) {
  return Tl(Pr, e, !0, t) || e;
}
const Sl = Symbol.for('v-ndc');
function Tl(e, t, n = !0, i = !1) {
  const s = _e || be;
  if (s) {
    const r = s.type;
    if (e === Pr) {
      const a = na(r, !1);
      if (a && (a === t || a === Je(t) || a === Dn(Je(t)))) return r;
    }
    const o = ms(s[e] || r[e], t) || ms(s.appContext[e], t);
    return !o && i ? r : o;
  }
}
function ms(e, t) {
  return e && (e[t] || e[Je(t)] || e[Dn(Je(t))]);
}
function nn(e, t, n, i) {
  let s;
  const r = n && n[i];
  if (U(e) || he(e)) {
    s = new Array(e.length);
    for (let o = 0, a = e.length; o < a; o++)
      s[o] = t(e[o], o, void 0, r && r[o]);
  } else if (typeof e == 'number') {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, r && r[o]);
  } else if (oe(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (o, a) => t(o, a, void 0, r && r[a]));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let a = 0, l = o.length; a < l; a++) {
        const c = o[a];
        s[a] = t(e[c], c, a, r && r[a]);
      }
    }
  else s = [];
  return n && (n[i] = s), s;
}
function Or(e, t, n = {}, i, s) {
  if (_e.isCE || (_e.parent && Xt(_e.parent) && _e.parent.isCE))
    return t !== 'default' && (n.name = t), ne('slot', n, i && i());
  let r = e[t];
  r && r._c && (r._d = !1), ce();
  const o = r && Ar(r(n)),
    a = Fr(
      we,
      { key: n.key || (o && o.key) || `_${t}` },
      o || (i ? i() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !s && a.scopeId && (a.slotScopeIds = [a.scopeId + '-s']),
    r && r._c && (r._d = !0),
    a
  );
}
function Ar(e) {
  return e.some((t) =>
    On(t) ? !(t.type === Xe || (t.type === we && !Ar(t.children))) : !0
  )
    ? e
    : null;
}
const mi = (e) => (e ? (Hr(e) ? Wn(e) || e.proxy : mi(e.parent)) : null),
  Jt = ge(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => mi(e.parent),
    $root: (e) => mi(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ji(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ni(e.update)),
    $nextTick: (e) => e.n || (e.n = Di.bind(e.proxy)),
    $watch: (e) => dl.bind(e),
  }),
  Jn = (e, t) => e !== re && !e.__isScriptSetup && ee(e, t),
  El = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: i,
        data: s,
        props: r,
        accessCache: o,
        type: a,
        appContext: l,
      } = e;
      let c;
      if (t[0] !== '$') {
        const u = o[t];
        if (u !== void 0)
          switch (u) {
            case 1:
              return i[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return r[t];
          }
        else {
          if (Jn(i, t)) return (o[t] = 1), i[t];
          if (s !== re && ee(s, t)) return (o[t] = 2), s[t];
          if ((c = e.propsOptions[0]) && ee(c, t)) return (o[t] = 3), r[t];
          if (n !== re && ee(n, t)) return (o[t] = 4), n[t];
          vi && (o[t] = 0);
        }
      }
      const d = Jt[t];
      let f, h;
      if (d) return t === '$attrs' && Oe(e, 'get', t), d(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== re && ee(n, t)) return (o[t] = 4), n[t];
      if (((h = l.config.globalProperties), ee(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: i, setupState: s, ctx: r } = e;
      return Jn(s, t)
        ? ((s[t] = n), !0)
        : i !== re && ee(i, t)
        ? ((i[t] = n), !0)
        : ee(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: i,
          appContext: s,
          propsOptions: r,
        },
      },
      o
    ) {
      let a;
      return (
        !!n[o] ||
        (e !== re && ee(e, o)) ||
        Jn(t, o) ||
        ((a = r[0]) && ee(a, o)) ||
        ee(i, o) ||
        ee(Jt, o) ||
        ee(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ee(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function gi(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function Cl(e, t) {
  const n = gi(e);
  for (const i in t) {
    if (i.startsWith('__skip')) continue;
    let s = n[i];
    s
      ? U(s) || J(s)
        ? (s = n[i] = { type: s, default: t[i] })
        : (s.default = t[i])
      : s === null && (s = n[i] = { default: t[i] }),
      s && t[`__skip_${i}`] && (s.skipFactory = !0);
  }
  return n;
}
let vi = !0;
function Ml(e) {
  const t = ji(e),
    n = e.proxy,
    i = e.ctx;
  (vi = !1), t.beforeCreate && gs(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: r,
    methods: o,
    watch: a,
    provide: l,
    inject: c,
    created: d,
    beforeMount: f,
    mounted: h,
    beforeUpdate: u,
    updated: T,
    activated: w,
    deactivated: C,
    beforeDestroy: M,
    beforeUnmount: m,
    destroyed: b,
    unmounted: _,
    render: I,
    renderTracked: j,
    renderTriggered: D,
    errorCaptured: A,
    serverPrefetch: y,
    expose: $,
    inheritAttrs: x,
    components: g,
    directives: E,
    filters: P,
  } = t;
  if ((c && Pl(c, i, null), o))
    for (const Y in o) {
      const K = o[Y];
      J(K) && (i[Y] = K.bind(n));
    }
  if (s) {
    const Y = s.call(n, n);
    oe(Y) && (e.data = ki(Y));
  }
  if (((vi = !0), r))
    for (const Y in r) {
      const K = r[Y],
        Z = J(K) ? K.bind(n, n) : J(K.get) ? K.get.bind(n, n) : Ge,
        ke = !J(K) && J(K.set) ? K.set.bind(n) : Ge,
        Ee = Ui({ get: Z, set: ke });
      Object.defineProperty(i, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (ve) => (Ee.value = ve),
      });
    }
  if (a) for (const Y in a) Lr(a[Y], i, n, Y);
  if (l) {
    const Y = J(l) ? l.call(n) : l;
    Reflect.ownKeys(Y).forEach((K) => {
      Hi(K, Y[K]);
    });
  }
  d && gs(d, e, 'c');
  function V(Y, K) {
    U(K) ? K.forEach((Z) => Y(Z.bind(n))) : K && Y(K.bind(n));
  }
  if (
    (V(bl, f),
    V(ln, h),
    V(Cr, u),
    V(Fi, T),
    V(ml, w),
    V(gl, C),
    V(xl, A),
    V(_l, j),
    V(yl, D),
    V(an, m),
    V(Mr, _),
    V(wl, y),
    U($))
  )
    if ($.length) {
      const Y = e.exposed || (e.exposed = {});
      $.forEach((K) => {
        Object.defineProperty(Y, K, {
          get: () => n[K],
          set: (Z) => (n[K] = Z),
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === Ge && (e.render = I),
    x != null && (e.inheritAttrs = x),
    g && (e.components = g),
    E && (e.directives = E);
}
function Pl(e, t, n = Ge) {
  U(e) && (e = bi(e));
  for (const i in e) {
    const s = e[i];
    let r;
    oe(s)
      ? 'default' in s
        ? (r = wn(s.from || i, s.default, !0))
        : (r = wn(s.from || i))
      : (r = wn(s)),
      ye(r)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: (o) => (r.value = o),
          })
        : (t[i] = r);
  }
}
function gs(e, t, n) {
  Re(U(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Lr(e, t, n, i) {
  const s = i.includes('.') ? _r(n, i) : () => n[i];
  if (he(e)) {
    const r = t[e];
    J(r) && Yt(s, r);
  } else if (J(e)) Yt(s, e.bind(n));
  else if (oe(e))
    if (U(e)) e.forEach((r) => Lr(r, t, n, i));
    else {
      const r = J(e.handler) ? e.handler.bind(n) : t[e.handler];
      J(r) && Yt(s, r, e);
    }
}
function ji(e) {
  const t = e.type,
    { mixins: n, extends: i } = t,
    {
      mixins: s,
      optionsCache: r,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    a = r.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !s.length && !n && !i
      ? (l = t)
      : ((l = {}), s.length && s.forEach((c) => Mn(l, c, o, !0)), Mn(l, t, o)),
    oe(t) && r.set(t, l),
    l
  );
}
function Mn(e, t, n, i = !1) {
  const { mixins: s, extends: r } = t;
  r && Mn(e, r, n, !0), s && s.forEach((o) => Mn(e, o, n, !0));
  for (const o in t)
    if (!(i && o === 'expose')) {
      const a = Ol[o] || (n && n[o]);
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const Ol = {
  data: vs,
  props: bs,
  emits: bs,
  methods: Kt,
  computed: Kt,
  beforeCreate: Te,
  created: Te,
  beforeMount: Te,
  mounted: Te,
  beforeUpdate: Te,
  updated: Te,
  beforeDestroy: Te,
  beforeUnmount: Te,
  destroyed: Te,
  unmounted: Te,
  activated: Te,
  deactivated: Te,
  errorCaptured: Te,
  serverPrefetch: Te,
  components: Kt,
  directives: Kt,
  watch: Ll,
  provide: vs,
  inject: Al,
};
function vs(e, t) {
  return t
    ? e
      ? function () {
          return ge(
            J(e) ? e.call(this, this) : e,
            J(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Al(e, t) {
  return Kt(bi(e), bi(t));
}
function bi(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Kt(e, t) {
  return e ? ge(Object.create(null), e, t) : t;
}
function bs(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : ge(Object.create(null), gi(e), gi(t ?? {}))
    : t;
}
function Ll(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(Object.create(null), e);
  for (const i in t) n[i] = Te(e[i], t[i]);
  return n;
}
function Ir() {
  return {
    app: null,
    config: {
      isNativeTag: so,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Il = 0;
function kl(e, t) {
  return function (i, s = null) {
    J(i) || (i = ge({}, i)), s != null && !oe(s) && (s = null);
    const r = Ir(),
      o = new WeakSet();
    let a = !1;
    const l = (r.app = {
      _uid: Il++,
      _component: i,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: oa,
      get config() {
        return r.config;
      },
      set config(c) {},
      use(c, ...d) {
        return (
          o.has(c) ||
            (c && J(c.install)
              ? (o.add(c), c.install(l, ...d))
              : J(c) && (o.add(c), c(l, ...d))),
          l
        );
      },
      mixin(c) {
        return r.mixins.includes(c) || r.mixins.push(c), l;
      },
      component(c, d) {
        return d ? ((r.components[c] = d), l) : r.components[c];
      },
      directive(c, d) {
        return d ? ((r.directives[c] = d), l) : r.directives[c];
      },
      mount(c, d, f) {
        if (!a) {
          const h = ne(i, s);
          return (
            (h.appContext = r),
            d && t ? t(h, c) : e(h, c, f),
            (a = !0),
            (l._container = c),
            (c.__vue_app__ = l),
            Wn(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(c, d) {
        return (r.provides[c] = d), l;
      },
      runWithContext(c) {
        Pn = l;
        try {
          return c();
        } finally {
          Pn = null;
        }
      },
    });
    return l;
  };
}
let Pn = null;
function Hi(e, t) {
  if (be) {
    let n = be.provides;
    const i = be.parent && be.parent.provides;
    i === n && (n = be.provides = Object.create(i)), (n[e] = t);
  }
}
function wn(e, t, n = !1) {
  const i = be || _e;
  if (i || Pn) {
    const s = i
      ? i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides
      : Pn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && J(t) ? t.call(i && i.proxy) : t;
  }
}
function $l(e, t, n, i = !1) {
  const s = {},
    r = {};
  Sn(r, Gn, 1), (e.propsDefaults = Object.create(null)), kr(e, t, s, r);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = i ? s : Vo(s)) : e.type.props ? (e.props = s) : (e.props = r),
    (e.attrs = r);
}
function zl(e, t, n, i) {
  const {
      props: s,
      attrs: r,
      vnode: { patchFlag: o },
    } = e,
    a = te(s),
    [l] = e.propsOptions;
  let c = !1;
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        let h = d[f];
        if (Fn(e.emitsOptions, h)) continue;
        const u = t[h];
        if (l)
          if (ee(r, h)) u !== r[h] && ((r[h] = u), (c = !0));
          else {
            const T = Je(h);
            s[T] = wi(l, a, T, u, e, !1);
          }
        else u !== r[h] && ((r[h] = u), (c = !0));
      }
    }
  } else {
    kr(e, t, s, r) && (c = !0);
    let d;
    for (const f in a)
      (!t || (!ee(t, f) && ((d = Rt(f)) === f || !ee(t, d)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[d] !== void 0) &&
            (s[f] = wi(l, a, f, void 0, e, !0))
          : delete s[f]);
    if (r !== a)
      for (const f in r) (!t || !ee(t, f)) && (delete r[f], (c = !0));
  }
  c && tt(e, 'set', '$attrs');
}
function kr(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1,
    a;
  if (t)
    for (let l in t) {
      if (bn(l)) continue;
      const c = t[l];
      let d;
      s && ee(s, (d = Je(l)))
        ? !r || !r.includes(d)
          ? (n[d] = c)
          : ((a || (a = {}))[d] = c)
        : Fn(e.emitsOptions, l) ||
          ((!(l in i) || c !== i[l]) && ((i[l] = c), (o = !0)));
    }
  if (r) {
    const l = te(n),
      c = a || re;
    for (let d = 0; d < r.length; d++) {
      const f = r[d];
      n[f] = wi(s, l, f, c[f], e, !ee(c, f));
    }
  }
  return o;
}
function wi(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
    const a = ee(o, 'default');
    if (a && i === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && J(l)) {
        const { propsDefaults: c } = s;
        n in c ? (i = c[n]) : (Nt(s), (i = c[n] = l.call(null, t)), Ct());
      } else i = l;
    }
    o[0] &&
      (r && !a ? (i = !1) : o[1] && (i === '' || i === Rt(n)) && (i = !0));
  }
  return i;
}
function $r(e, t, n = !1) {
  const i = t.propsCache,
    s = i.get(e);
  if (s) return s;
  const r = e.props,
    o = {},
    a = [];
  let l = !1;
  if (!J(e)) {
    const d = (f) => {
      l = !0;
      const [h, u] = $r(f, t, !0);
      ge(o, h), u && a.push(...u);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!r && !l) return oe(e) && i.set(e, It), It;
  if (U(r))
    for (let d = 0; d < r.length; d++) {
      const f = Je(r[d]);
      ws(f) && (o[f] = re);
    }
  else if (r)
    for (const d in r) {
      const f = Je(d);
      if (ws(f)) {
        const h = r[d],
          u = (o[f] = U(h) || J(h) ? { type: h } : ge({}, h));
        if (u) {
          const T = xs(Boolean, u.type),
            w = xs(String, u.type);
          (u[0] = T > -1),
            (u[1] = w < 0 || T < w),
            (T > -1 || ee(u, 'default')) && a.push(f);
        }
      }
    }
  const c = [o, a];
  return oe(e) && i.set(e, c), c;
}
function ws(e) {
  return e[0] !== '$';
}
function ys(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function _s(e, t) {
  return ys(e) === ys(t);
}
function xs(e, t) {
  return U(t) ? t.findIndex((n) => _s(n, e)) : J(t) && _s(t, e) ? 0 : -1;
}
const zr = (e) => e[0] === '_' || e === '$stable',
  Vi = (e) => (U(e) ? e.map(Ue) : [Ue(e)]),
  Bl = (e, t, n) => {
    if (t._n) return t;
    const i = ft((...s) => Vi(t(...s)), n);
    return (i._c = !1), i;
  },
  Br = (e, t, n) => {
    const i = e._ctx;
    for (const s in e) {
      if (zr(s)) continue;
      const r = e[s];
      if (J(r)) t[s] = Bl(s, r, i);
      else if (r != null) {
        const o = Vi(r);
        t[s] = () => o;
      }
    }
  },
  Dr = (e, t) => {
    const n = Vi(t);
    e.slots.default = () => n;
  },
  Dl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = te(t)), Sn(t, '_', n)) : Br(t, (e.slots = {}));
    } else (e.slots = {}), t && Dr(e, t);
    Sn(e.slots, Gn, 1);
  },
  Nl = (e, t, n) => {
    const { vnode: i, slots: s } = e;
    let r = !0,
      o = re;
    if (i.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (r = !1)
          : (ge(s, t), !n && a === 1 && delete s._)
        : ((r = !t.$stable), Br(t, s)),
        (o = t);
    } else t && (Dr(e, t), (o = { default: 1 }));
    if (r) for (const a in s) !zr(a) && o[a] == null && delete s[a];
  };
function yi(e, t, n, i, s = !1) {
  if (U(e)) {
    e.forEach((h, u) => yi(h, t && (U(t) ? t[u] : t), n, i, s));
    return;
  }
  if (Xt(i) && !s) return;
  const r = i.shapeFlag & 4 ? Wn(i.component) || i.component.proxy : i.el,
    o = s ? null : r,
    { i: a, r: l } = e,
    c = t && t.r,
    d = a.refs === re ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (c != null &&
      c !== l &&
      (he(c)
        ? ((d[c] = null), ee(f, c) && (f[c] = null))
        : ye(c) && (c.value = null)),
    J(l))
  )
    ht(l, a, 12, [o, d]);
  else {
    const h = he(l),
      u = ye(l);
    if (h || u) {
      const T = () => {
        if (e.f) {
          const w = h ? (ee(f, l) ? f[l] : d[l]) : l.value;
          s
            ? U(w) && Mi(w, r)
            : U(w)
            ? w.includes(r) || w.push(r)
            : h
            ? ((d[l] = [r]), ee(f, l) && (f[l] = d[l]))
            : ((l.value = [r]), e.k && (d[e.k] = l.value));
        } else
          h
            ? ((d[l] = o), ee(f, l) && (f[l] = o))
            : u && ((l.value = o), e.k && (d[e.k] = o));
      };
      o ? ((T.id = -1), Me(T, n)) : T();
    }
  }
}
const Me = cl;
function Rl(e) {
  return Fl(e);
}
function Fl(e, t) {
  const n = ai();
  n.__VUE__ = !0;
  const {
      insert: i,
      remove: s,
      patchProp: r,
      createElement: o,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: d,
      parentNode: f,
      nextSibling: h,
      setScopeId: u = Ge,
      insertStaticContent: T,
    } = e,
    w = (
      p,
      v,
      S,
      O = null,
      L = null,
      z = null,
      H = !1,
      B = null,
      R = !!v.dynamicChildren
    ) => {
      if (p === v) return;
      p && !xt(p, v) && ((O = le(p)), ve(p, L, z, !0), (p = null)),
        v.patchFlag === -2 && ((R = !1), (v.dynamicChildren = null));
      const { type: k, ref: W, shapeFlag: G } = v;
      switch (k) {
        case Vn:
          C(p, v, S, O);
          break;
        case Xe:
          M(p, v, S, O);
          break;
        case yn:
          p == null && m(v, S, O, H);
          break;
        case we:
          g(p, v, S, O, L, z, H, B, R);
          break;
        default:
          G & 1
            ? I(p, v, S, O, L, z, H, B, R)
            : G & 6
            ? E(p, v, S, O, L, z, H, B, R)
            : (G & 64 || G & 128) && k.process(p, v, S, O, L, z, H, B, R, fe);
      }
      W != null && L && yi(W, p && p.ref, z, v || p, !v);
    },
    C = (p, v, S, O) => {
      if (p == null) i((v.el = a(v.children)), S, O);
      else {
        const L = (v.el = p.el);
        v.children !== p.children && c(L, v.children);
      }
    },
    M = (p, v, S, O) => {
      p == null ? i((v.el = l(v.children || '')), S, O) : (v.el = p.el);
    },
    m = (p, v, S, O) => {
      [p.el, p.anchor] = T(p.children, v, S, O, p.el, p.anchor);
    },
    b = ({ el: p, anchor: v }, S, O) => {
      let L;
      for (; p && p !== v; ) (L = h(p)), i(p, S, O), (p = L);
      i(v, S, O);
    },
    _ = ({ el: p, anchor: v }) => {
      let S;
      for (; p && p !== v; ) (S = h(p)), s(p), (p = S);
      s(v);
    },
    I = (p, v, S, O, L, z, H, B, R) => {
      (H = H || v.type === 'svg'),
        p == null ? j(v, S, O, L, z, H, B, R) : y(p, v, L, z, H, B, R);
    },
    j = (p, v, S, O, L, z, H, B) => {
      let R, k;
      const { type: W, props: G, shapeFlag: q, transition: X, dirs: Q } = p;
      if (
        ((R = p.el = o(p.type, z, G && G.is, G)),
        q & 8
          ? d(R, p.children)
          : q & 16 &&
            A(p.children, R, null, O, L, z && W !== 'foreignObject', H, B),
        Q && vt(p, null, O, 'created'),
        D(R, p, p.scopeId, H, O),
        G)
      ) {
        for (const ie in G)
          ie !== 'value' &&
            !bn(ie) &&
            r(R, ie, null, G[ie], z, p.children, O, L, de);
        'value' in G && r(R, 'value', null, G.value),
          (k = G.onVnodeBeforeMount) && qe(k, O, p);
      }
      Q && vt(p, null, O, 'beforeMount');
      const se = jl(L, X);
      se && X.beforeEnter(R),
        i(R, v, S),
        ((k = G && G.onVnodeMounted) || se || Q) &&
          Me(() => {
            k && qe(k, O, p), se && X.enter(R), Q && vt(p, null, O, 'mounted');
          }, L);
    },
    D = (p, v, S, O, L) => {
      if ((S && u(p, S), O)) for (let z = 0; z < O.length; z++) u(p, O[z]);
      if (L) {
        let z = L.subTree;
        if (v === z) {
          const H = L.vnode;
          D(p, H, H.scopeId, H.slotScopeIds, L.parent);
        }
      }
    },
    A = (p, v, S, O, L, z, H, B, R = 0) => {
      for (let k = R; k < p.length; k++) {
        const W = (p[k] = B ? dt(p[k]) : Ue(p[k]));
        w(null, W, v, S, O, L, z, H, B);
      }
    },
    y = (p, v, S, O, L, z, H) => {
      const B = (v.el = p.el);
      let { patchFlag: R, dynamicChildren: k, dirs: W } = v;
      R |= p.patchFlag & 16;
      const G = p.props || re,
        q = v.props || re;
      let X;
      S && bt(S, !1),
        (X = q.onVnodeBeforeUpdate) && qe(X, S, v, p),
        W && vt(v, p, S, 'beforeUpdate'),
        S && bt(S, !0);
      const Q = L && v.type !== 'foreignObject';
      if (
        (k
          ? $(p.dynamicChildren, k, B, S, O, Q, z)
          : H || K(p, v, B, null, S, O, Q, z, !1),
        R > 0)
      ) {
        if (R & 16) x(B, v, G, q, S, O, L);
        else if (
          (R & 2 && G.class !== q.class && r(B, 'class', null, q.class, L),
          R & 4 && r(B, 'style', G.style, q.style, L),
          R & 8)
        ) {
          const se = v.dynamicProps;
          for (let ie = 0; ie < se.length; ie++) {
            const ue = se[ie],
              Fe = G[ue],
              At = q[ue];
            (At !== Fe || ue === 'value') &&
              r(B, ue, Fe, At, L, p.children, S, O, de);
          }
        }
        R & 1 && p.children !== v.children && d(B, v.children);
      } else !H && k == null && x(B, v, G, q, S, O, L);
      ((X = q.onVnodeUpdated) || W) &&
        Me(() => {
          X && qe(X, S, v, p), W && vt(v, p, S, 'updated');
        }, O);
    },
    $ = (p, v, S, O, L, z, H) => {
      for (let B = 0; B < v.length; B++) {
        const R = p[B],
          k = v[B],
          W =
            R.el && (R.type === we || !xt(R, k) || R.shapeFlag & 70)
              ? f(R.el)
              : S;
        w(R, k, W, null, O, L, z, H, !0);
      }
    },
    x = (p, v, S, O, L, z, H) => {
      if (S !== O) {
        if (S !== re)
          for (const B in S)
            !bn(B) && !(B in O) && r(p, B, S[B], null, H, v.children, L, z, de);
        for (const B in O) {
          if (bn(B)) continue;
          const R = O[B],
            k = S[B];
          R !== k && B !== 'value' && r(p, B, k, R, H, v.children, L, z, de);
        }
        'value' in O && r(p, 'value', S.value, O.value);
      }
    },
    g = (p, v, S, O, L, z, H, B, R) => {
      const k = (v.el = p ? p.el : a('')),
        W = (v.anchor = p ? p.anchor : a(''));
      let { patchFlag: G, dynamicChildren: q, slotScopeIds: X } = v;
      X && (B = B ? B.concat(X) : X),
        p == null
          ? (i(k, S, O), i(W, S, O), A(v.children, S, W, L, z, H, B, R))
          : G > 0 && G & 64 && q && p.dynamicChildren
          ? ($(p.dynamicChildren, q, S, L, z, H, B),
            (v.key != null || (L && v === L.subTree)) && Nr(p, v, !0))
          : K(p, v, S, W, L, z, H, B, R);
    },
    E = (p, v, S, O, L, z, H, B, R) => {
      (v.slotScopeIds = B),
        p == null
          ? v.shapeFlag & 512
            ? L.ctx.activate(v, S, O, H, R)
            : P(v, S, O, L, z, H, R)
          : F(p, v, R);
    },
    P = (p, v, S, O, L, z, H) => {
      const B = (p.component = Xl(p, O, L));
      if ((jn(p) && (B.ctx.renderer = fe), Zl(B), B.asyncDep)) {
        if ((L && L.registerDep(B, V), !p.el)) {
          const R = (B.subTree = ne(Xe));
          M(null, R, v, S);
        }
        return;
      }
      V(B, p, v, S, L, z, H);
    },
    F = (p, v, S) => {
      const O = (v.component = p.component);
      if (ol(p, v, S))
        if (O.asyncDep && !O.asyncResolved) {
          Y(O, v, S);
          return;
        } else (O.next = v), el(O.update), O.update();
      else (v.el = p.el), (O.vnode = v);
    },
    V = (p, v, S, O, L, z, H) => {
      const B = () => {
          if (p.isMounted) {
            let { next: W, bu: G, u: q, parent: X, vnode: Q } = p,
              se = W,
              ie;
            bt(p, !1),
              W ? ((W.el = Q.el), Y(p, W, H)) : (W = Q),
              G && Kn(G),
              (ie = W.props && W.props.onVnodeBeforeUpdate) && qe(ie, X, W, Q),
              bt(p, !0);
            const ue = Yn(p),
              Fe = p.subTree;
            (p.subTree = ue),
              w(Fe, ue, f(Fe.el), le(Fe), p, L, z),
              (W.el = ue.el),
              se === null && ll(p, ue.el),
              q && Me(q, L),
              (ie = W.props && W.props.onVnodeUpdated) &&
                Me(() => qe(ie, X, W, Q), L);
          } else {
            let W;
            const { el: G, props: q } = v,
              { bm: X, m: Q, parent: se } = p,
              ie = Xt(v);
            if (
              (bt(p, !1),
              X && Kn(X),
              !ie && (W = q && q.onVnodeBeforeMount) && qe(W, se, v),
              bt(p, !0),
              G && Be)
            ) {
              const ue = () => {
                (p.subTree = Yn(p)), Be(G, p.subTree, p, L, null);
              };
              ie
                ? v.type.__asyncLoader().then(() => !p.isUnmounted && ue())
                : ue();
            } else {
              const ue = (p.subTree = Yn(p));
              w(null, ue, S, O, p, L, z), (v.el = ue.el);
            }
            if ((Q && Me(Q, L), !ie && (W = q && q.onVnodeMounted))) {
              const ue = v;
              Me(() => qe(W, se, ue), L);
            }
            (v.shapeFlag & 256 ||
              (se && Xt(se.vnode) && se.vnode.shapeFlag & 256)) &&
              p.a &&
              Me(p.a, L),
              (p.isMounted = !0),
              (v = S = O = null);
          }
        },
        R = (p.effect = new Ai(B, () => Ni(k), p.scope)),
        k = (p.update = () => R.run());
      (k.id = p.uid), bt(p, !0), k();
    },
    Y = (p, v, S) => {
      v.component = p;
      const O = p.vnode.props;
      (p.vnode = v),
        (p.next = null),
        zl(p, v.props, O, S),
        Nl(p, v.children, S),
        Ft(),
        us(),
        jt();
    },
    K = (p, v, S, O, L, z, H, B, R = !1) => {
      const k = p && p.children,
        W = p ? p.shapeFlag : 0,
        G = v.children,
        { patchFlag: q, shapeFlag: X } = v;
      if (q > 0) {
        if (q & 128) {
          ke(k, G, S, O, L, z, H, B, R);
          return;
        } else if (q & 256) {
          Z(k, G, S, O, L, z, H, B, R);
          return;
        }
      }
      X & 8
        ? (W & 16 && de(k, L, z), G !== k && d(S, G))
        : W & 16
        ? X & 16
          ? ke(k, G, S, O, L, z, H, B, R)
          : de(k, L, z, !0)
        : (W & 8 && d(S, ''), X & 16 && A(G, S, O, L, z, H, B, R));
    },
    Z = (p, v, S, O, L, z, H, B, R) => {
      (p = p || It), (v = v || It);
      const k = p.length,
        W = v.length,
        G = Math.min(k, W);
      let q;
      for (q = 0; q < G; q++) {
        const X = (v[q] = R ? dt(v[q]) : Ue(v[q]));
        w(p[q], X, S, null, L, z, H, B, R);
      }
      k > W ? de(p, L, z, !0, !1, G) : A(v, S, O, L, z, H, B, R, G);
    },
    ke = (p, v, S, O, L, z, H, B, R) => {
      let k = 0;
      const W = v.length;
      let G = p.length - 1,
        q = W - 1;
      for (; k <= G && k <= q; ) {
        const X = p[k],
          Q = (v[k] = R ? dt(v[k]) : Ue(v[k]));
        if (xt(X, Q)) w(X, Q, S, null, L, z, H, B, R);
        else break;
        k++;
      }
      for (; k <= G && k <= q; ) {
        const X = p[G],
          Q = (v[q] = R ? dt(v[q]) : Ue(v[q]));
        if (xt(X, Q)) w(X, Q, S, null, L, z, H, B, R);
        else break;
        G--, q--;
      }
      if (k > G) {
        if (k <= q) {
          const X = q + 1,
            Q = X < W ? v[X].el : O;
          for (; k <= q; )
            w(null, (v[k] = R ? dt(v[k]) : Ue(v[k])), S, Q, L, z, H, B, R), k++;
        }
      } else if (k > q) for (; k <= G; ) ve(p[k], L, z, !0), k++;
      else {
        const X = k,
          Q = k,
          se = new Map();
        for (k = Q; k <= q; k++) {
          const Le = (v[k] = R ? dt(v[k]) : Ue(v[k]));
          Le.key != null && se.set(Le.key, k);
        }
        let ie,
          ue = 0;
        const Fe = q - Q + 1;
        let At = !1,
          ts = 0;
        const Vt = new Array(Fe);
        for (k = 0; k < Fe; k++) Vt[k] = 0;
        for (k = X; k <= G; k++) {
          const Le = p[k];
          if (ue >= Fe) {
            ve(Le, L, z, !0);
            continue;
          }
          let We;
          if (Le.key != null) We = se.get(Le.key);
          else
            for (ie = Q; ie <= q; ie++)
              if (Vt[ie - Q] === 0 && xt(Le, v[ie])) {
                We = ie;
                break;
              }
          We === void 0
            ? ve(Le, L, z, !0)
            : ((Vt[We - Q] = k + 1),
              We >= ts ? (ts = We) : (At = !0),
              w(Le, v[We], S, null, L, z, H, B, R),
              ue++);
        }
        const ns = At ? Hl(Vt) : It;
        for (ie = ns.length - 1, k = Fe - 1; k >= 0; k--) {
          const Le = Q + k,
            We = v[Le],
            is = Le + 1 < W ? v[Le + 1].el : O;
          Vt[k] === 0
            ? w(null, We, S, is, L, z, H, B, R)
            : At && (ie < 0 || k !== ns[ie] ? Ee(We, S, is, 2) : ie--);
        }
      }
    },
    Ee = (p, v, S, O, L = null) => {
      const { el: z, type: H, transition: B, children: R, shapeFlag: k } = p;
      if (k & 6) {
        Ee(p.component.subTree, v, S, O);
        return;
      }
      if (k & 128) {
        p.suspense.move(v, S, O);
        return;
      }
      if (k & 64) {
        H.move(p, v, S, fe);
        return;
      }
      if (H === we) {
        i(z, v, S);
        for (let G = 0; G < R.length; G++) Ee(R[G], v, S, O);
        i(p.anchor, v, S);
        return;
      }
      if (H === yn) {
        b(p, v, S);
        return;
      }
      if (O !== 2 && k & 1 && B)
        if (O === 0) B.beforeEnter(z), i(z, v, S), Me(() => B.enter(z), L);
        else {
          const { leave: G, delayLeave: q, afterLeave: X } = B,
            Q = () => i(z, v, S),
            se = () => {
              G(z, () => {
                Q(), X && X();
              });
            };
          q ? q(z, Q, se) : se();
        }
      else i(z, v, S);
    },
    ve = (p, v, S, O = !1, L = !1) => {
      const {
        type: z,
        props: H,
        ref: B,
        children: R,
        dynamicChildren: k,
        shapeFlag: W,
        patchFlag: G,
        dirs: q,
      } = p;
      if ((B != null && yi(B, null, S, p, !0), W & 256)) {
        v.ctx.deactivate(p);
        return;
      }
      const X = W & 1 && q,
        Q = !Xt(p);
      let se;
      if ((Q && (se = H && H.onVnodeBeforeUnmount) && qe(se, v, p), W & 6))
        $e(p.component, S, O);
      else {
        if (W & 128) {
          p.suspense.unmount(S, O);
          return;
        }
        X && vt(p, null, v, 'beforeUnmount'),
          W & 64
            ? p.type.remove(p, v, S, L, fe, O)
            : k && (z !== we || (G > 0 && G & 64))
            ? de(k, v, S, !1, !0)
            : ((z === we && G & 384) || (!L && W & 16)) && de(R, v, S),
          O && Se(p);
      }
      ((Q && (se = H && H.onVnodeUnmounted)) || X) &&
        Me(() => {
          se && qe(se, v, p), X && vt(p, null, v, 'unmounted');
        }, S);
    },
    Se = (p) => {
      const { type: v, el: S, anchor: O, transition: L } = p;
      if (v === we) {
        Ce(S, O);
        return;
      }
      if (v === yn) {
        _(p);
        return;
      }
      const z = () => {
        s(S), L && !L.persisted && L.afterLeave && L.afterLeave();
      };
      if (p.shapeFlag & 1 && L && !L.persisted) {
        const { leave: H, delayLeave: B } = L,
          R = () => H(S, z);
        B ? B(p.el, z, R) : R();
      } else z();
    },
    Ce = (p, v) => {
      let S;
      for (; p !== v; ) (S = h(p)), s(p), (p = S);
      s(v);
    },
    $e = (p, v, S) => {
      const { bum: O, scope: L, update: z, subTree: H, um: B } = p;
      O && Kn(O),
        L.stop(),
        z && ((z.active = !1), ve(H, p, v, S)),
        B && Me(B, v),
        Me(() => {
          p.isUnmounted = !0;
        }, v),
        v &&
          v.pendingBranch &&
          !v.isUnmounted &&
          p.asyncDep &&
          !p.asyncResolved &&
          p.suspenseId === v.pendingId &&
          (v.deps--, v.deps === 0 && v.resolve());
    },
    de = (p, v, S, O = !1, L = !1, z = 0) => {
      for (let H = z; H < p.length; H++) ve(p[H], v, S, O, L);
    },
    le = (p) =>
      p.shapeFlag & 6
        ? le(p.component.subTree)
        : p.shapeFlag & 128
        ? p.suspense.next()
        : h(p.anchor || p.el),
    ae = (p, v, S) => {
      p == null
        ? v._vnode && ve(v._vnode, null, null, !0)
        : w(v._vnode || null, p, v, null, null, null, S),
        us(),
        gr(),
        (v._vnode = p);
    },
    fe = {
      p: w,
      um: ve,
      m: Ee,
      r: Se,
      mt: P,
      mc: A,
      pc: K,
      pbc: $,
      n: le,
      o: e,
    };
  let ze, Be;
  return (
    t && ([ze, Be] = t(fe)), { render: ae, hydrate: ze, createApp: kl(ae, ze) }
  );
}
function bt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function jl(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Nr(e, t, n = !1) {
  const i = e.children,
    s = t.children;
  if (U(i) && U(s))
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      let a = s[r];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[r] = dt(s[r])), (a.el = o.el)),
        n || Nr(o, a)),
        a.type === Vn && (a.el = o.el);
    }
}
function Hl(e) {
  const t = e.slice(),
    n = [0];
  let i, s, r, o, a;
  const l = e.length;
  for (i = 0; i < l; i++) {
    const c = e[i];
    if (c !== 0) {
      if (((s = n[n.length - 1]), e[s] < c)) {
        (t[i] = s), n.push(i);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        (a = (r + o) >> 1), e[n[a]] < c ? (r = a + 1) : (o = a);
      c < e[n[r]] && (r > 0 && (t[i] = n[r - 1]), (n[r] = i));
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; ) (n[r] = o), (o = t[o]);
  return n;
}
const Vl = (e) => e.__isTeleport,
  we = Symbol.for('v-fgt'),
  Vn = Symbol.for('v-txt'),
  Xe = Symbol.for('v-cmt'),
  yn = Symbol.for('v-stc'),
  Zt = [];
let Ve = null;
function ce(e = !1) {
  Zt.push((Ve = e ? null : []));
}
function Gl() {
  Zt.pop(), (Ve = Zt[Zt.length - 1] || null);
}
let sn = 1;
function Ss(e) {
  sn += e;
}
function Rr(e) {
  return (
    (e.dynamicChildren = sn > 0 ? Ve || It : null),
    Gl(),
    sn > 0 && Ve && Ve.push(e),
    e
  );
}
function me(e, t, n, i, s, r) {
  return Rr(N(e, t, n, i, s, r, !0));
}
function Fr(e, t, n, i, s) {
  return Rr(ne(e, t, n, i, s, !0));
}
function On(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function xt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Gn = '__vInternal',
  jr = ({ key: e }) => e ?? null,
  _n = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? he(e) || ye(e) || J(e)
        ? { i: _e, r: e, k: t, f: !!n }
        : e
      : null
  );
function N(
  e,
  t = null,
  n = null,
  i = 0,
  s = null,
  r = e === we ? 0 : 1,
  o = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jr(t),
    ref: t && _n(t),
    scopeId: wr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: i,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: _e,
  };
  return (
    a
      ? (Wi(l, n), r & 128 && e.normalize(l))
      : n && (l.shapeFlag |= he(n) ? 8 : 16),
    sn > 0 &&
      !o &&
      Ve &&
      (l.patchFlag > 0 || r & 6) &&
      l.patchFlag !== 32 &&
      Ve.push(l),
    l
  );
}
const ne = Wl;
function Wl(e, t = null, n = null, i = 0, s = null, r = !1) {
  if (((!e || e === Sl) && (e = Xe), On(e))) {
    const a = gt(e, t, !0);
    return (
      n && Wi(a, n),
      sn > 0 &&
        !r &&
        Ve &&
        (a.shapeFlag & 6 ? (Ve[Ve.indexOf(e)] = a) : Ve.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((ia(e) && (e = e.__vccOpts), t)) {
    t = ql(t);
    let { class: a, style: l } = t;
    a && !he(a) && (t.class = Pe(a)),
      oe(l) && (ar(l) && !U(l) && (l = ge({}, l)), (t.style = Bt(l)));
  }
  const o = he(e) ? 1 : al(e) ? 128 : Vl(e) ? 64 : oe(e) ? 4 : J(e) ? 2 : 0;
  return N(e, t, n, i, s, o, r, !0);
}
function ql(e) {
  return e ? (ar(e) || Gn in e ? ge({}, e) : e) : null;
}
function gt(e, t, n = !1) {
  const { props: i, ref: s, patchFlag: r, children: o } = e,
    a = t ? Ul(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && jr(a),
    ref:
      t && t.ref ? (n && s ? (U(s) ? s.concat(_n(t)) : [s, _n(t)]) : _n(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== we ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && gt(e.ssContent),
    ssFallback: e.ssFallback && gt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Gi(e = ' ', t = 0) {
  return ne(Vn, null, e, t);
}
function Ht(e, t) {
  const n = ne(yn, null, e);
  return (n.staticCount = t), n;
}
function Ue(e) {
  return e == null || typeof e == 'boolean'
    ? ne(Xe)
    : U(e)
    ? ne(we, null, e.slice())
    : typeof e == 'object'
    ? dt(e)
    : ne(Vn, null, String(e));
}
function dt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : gt(e);
}
function Wi(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (U(t)) n = 16;
  else if (typeof t == 'object')
    if (i & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Wi(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Gn in t)
        ? (t._ctx = _e)
        : s === 3 &&
          _e &&
          (_e.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    J(t)
      ? ((t = { default: t, _ctx: _e }), (n = 32))
      : ((t = String(t)), i & 64 ? ((n = 16), (t = [Gi(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ul(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const s in i)
      if (s === 'class')
        t.class !== i.class && (t.class = Pe([t.class, i.class]));
      else if (s === 'style') t.style = Bt([t.style, i.style]);
      else if (kn(s)) {
        const r = t[s],
          o = i[s];
        o &&
          r !== o &&
          !(U(r) && r.includes(o)) &&
          (t[s] = r ? [].concat(r, o) : o);
      } else s !== '' && (t[s] = i[s]);
  }
  return t;
}
function qe(e, t, n, i = null) {
  Re(e, t, 7, [n, i]);
}
const Kl = Ir();
let Yl = 0;
function Xl(e, t, n) {
  const i = e.type,
    s = (t ? t.appContext : e.appContext) || Kl,
    r = {
      uid: Yl++,
      vnode: e,
      type: i,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new wo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: $r(i, s),
      emitsOptions: br(i, s),
      emit: null,
      emitted: null,
      propsDefaults: re,
      inheritAttrs: i.inheritAttrs,
      ctx: re,
      data: re,
      props: re,
      attrs: re,
      slots: re,
      refs: re,
      setupState: re,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = il.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let be = null;
const Jl = () => be || _e;
let qi,
  Lt,
  Ts = '__VUE_INSTANCE_SETTERS__';
(Lt = ai()[Ts]) || (Lt = ai()[Ts] = []),
  Lt.push((e) => (be = e)),
  (qi = (e) => {
    Lt.length > 1 ? Lt.forEach((t) => t(e)) : Lt[0](e);
  });
const Nt = (e) => {
    qi(e), e.scope.on();
  },
  Ct = () => {
    be && be.scope.off(), qi(null);
  };
function Hr(e) {
  return e.vnode.shapeFlag & 4;
}
let rn = !1;
function Zl(e, t = !1) {
  rn = t;
  const { props: n, children: i } = e.vnode,
    s = Hr(e);
  $l(e, n, s, t), Dl(e, i);
  const r = s ? Ql(e, t) : void 0;
  return (rn = !1), r;
}
function Ql(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = cr(new Proxy(e.ctx, El)));
  const { setup: i } = n;
  if (i) {
    const s = (e.setupContext = i.length > 1 ? ta(e) : null);
    Nt(e), Ft();
    const r = ht(i, e, 0, [e.props, s]);
    if ((jt(), Ct(), qs(r))) {
      if ((r.then(Ct, Ct), t))
        return r
          .then((o) => {
            Es(e, o, t);
          })
          .catch((o) => {
            Rn(o, e, 0);
          });
      e.asyncDep = r;
    } else Es(e, r, t);
  } else Vr(e, t);
}
function Es(e, t, n) {
  J(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : oe(t) && (e.setupState = pr(t)),
    Vr(e, n);
}
let Cs;
function Vr(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Cs && !i.render) {
      const s = i.template || ji(e).template;
      if (s) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = i,
          c = ge(ge({ isCustomElement: r, delimiters: a }, o), l);
        i.render = Cs(s, c);
      }
    }
    e.render = i.render || Ge;
  }
  {
    Nt(e), Ft();
    try {
      Ml(e);
    } finally {
      jt(), Ct();
    }
  }
}
function ea(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Oe(e, 'get', '$attrs'), t[n];
      },
    }))
  );
}
function ta(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return ea(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Wn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(pr(cr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Jt) return Jt[n](e);
        },
        has(t, n) {
          return n in t || n in Jt;
        },
      }))
    );
}
function na(e, t = !0) {
  return J(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function ia(e) {
  return J(e) && '__vccOpts' in e;
}
const Ui = (e, t) => Jo(e, t, rn);
function Ne(e, t, n) {
  const i = arguments.length;
  return i === 2
    ? oe(t) && !U(t)
      ? On(t)
        ? ne(e, null, [t])
        : ne(e, t)
      : ne(e, null, t)
    : (i > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : i === 3 && On(n) && (n = [n]),
      ne(e, t, n));
}
const sa = Symbol.for('v-scx'),
  ra = () => wn(sa),
  oa = '3.3.7',
  la = 'http://www.w3.org/2000/svg',
  St = typeof document < 'u' ? document : null,
  Ms = St && St.createElement('template'),
  aa = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, i) => {
      const s = t
        ? St.createElementNS(la, e)
        : St.createElement(e, n ? { is: n } : void 0);
      return (
        e === 'select' &&
          i &&
          i.multiple != null &&
          s.setAttribute('multiple', i.multiple),
        s
      );
    },
    createText: (e) => St.createTextNode(e),
    createComment: (e) => St.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => St.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, i, s, r) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === r || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === r || !(s = s.nextSibling));

        );
      else {
        Ms.innerHTML = i ? `<svg>${e}</svg>` : e;
        const a = Ms.content;
        if (i) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  lt = 'transition',
  Gt = 'animation',
  on = Symbol('_vtc'),
  qn = (e, { slots: t }) => Ne(pl, ca(e), t);
qn.displayName = 'Transition';
const Gr = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
qn.props = ge({}, xr, Gr);
const wt = (e, t = []) => {
    U(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Ps = (e) => (e ? (U(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ca(e) {
  const t = {};
  for (const g in e) g in Gr || (t[g] = e[g]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: i,
      duration: s,
      enterFromClass: r = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: l = r,
      appearActiveClass: c = o,
      appearToClass: d = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: u = `${n}-leave-to`,
    } = e,
    T = da(s),
    w = T && T[0],
    C = T && T[1],
    {
      onBeforeEnter: M,
      onEnter: m,
      onEnterCancelled: b,
      onLeave: _,
      onLeaveCancelled: I,
      onBeforeAppear: j = M,
      onAppear: D = m,
      onAppearCancelled: A = b,
    } = t,
    y = (g, E, P) => {
      yt(g, E ? d : a), yt(g, E ? c : o), P && P();
    },
    $ = (g, E) => {
      (g._isLeaving = !1), yt(g, f), yt(g, u), yt(g, h), E && E();
    },
    x = (g) => (E, P) => {
      const F = g ? D : m,
        V = () => y(E, g, P);
      wt(F, [E, V]),
        Os(() => {
          yt(E, g ? l : r), at(E, g ? d : a), Ps(F) || As(E, i, w, V);
        });
    };
  return ge(t, {
    onBeforeEnter(g) {
      wt(M, [g]), at(g, r), at(g, o);
    },
    onBeforeAppear(g) {
      wt(j, [g]), at(g, l), at(g, c);
    },
    onEnter: x(!1),
    onAppear: x(!0),
    onLeave(g, E) {
      g._isLeaving = !0;
      const P = () => $(g, E);
      at(g, f),
        pa(),
        at(g, h),
        Os(() => {
          g._isLeaving && (yt(g, f), at(g, u), Ps(_) || As(g, i, C, P));
        }),
        wt(_, [g, P]);
    },
    onEnterCancelled(g) {
      y(g, !1), wt(b, [g]);
    },
    onAppearCancelled(g) {
      y(g, !0), wt(A, [g]);
    },
    onLeaveCancelled(g) {
      $(g), wt(I, [g]);
    },
  });
}
function da(e) {
  if (e == null) return null;
  if (oe(e)) return [Zn(e.enter), Zn(e.leave)];
  {
    const t = Zn(e);
    return [t, t];
  }
}
function Zn(e) {
  return uo(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[on] || (e[on] = new Set())).add(t);
}
function yt(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[on];
  n && (n.delete(t), n.size || (e[on] = void 0));
}
function Os(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let fa = 0;
function As(e, t, n, i) {
  const s = (e._endId = ++fa),
    r = () => {
      s === e._endId && i();
    };
  if (n) return setTimeout(r, n);
  const { type: o, timeout: a, propCount: l } = ua(e, t);
  if (!o) return i();
  const c = o + 'end';
  let d = 0;
  const f = () => {
      e.removeEventListener(c, h), r();
    },
    h = (u) => {
      u.target === e && ++d >= l && f();
    };
  setTimeout(() => {
    d < l && f();
  }, a + 1),
    e.addEventListener(c, h);
}
function ua(e, t) {
  const n = window.getComputedStyle(e),
    i = (T) => (n[T] || '').split(', '),
    s = i(`${lt}Delay`),
    r = i(`${lt}Duration`),
    o = Ls(s, r),
    a = i(`${Gt}Delay`),
    l = i(`${Gt}Duration`),
    c = Ls(a, l);
  let d = null,
    f = 0,
    h = 0;
  t === lt
    ? o > 0 && ((d = lt), (f = o), (h = r.length))
    : t === Gt
    ? c > 0 && ((d = Gt), (f = c), (h = l.length))
    : ((f = Math.max(o, c)),
      (d = f > 0 ? (o > c ? lt : Gt) : null),
      (h = d ? (d === lt ? r.length : l.length) : 0));
  const u =
    d === lt && /\b(transform|all)(,|$)/.test(i(`${lt}Property`).toString());
  return { type: d, timeout: f, propCount: h, hasTransform: u };
}
function Ls(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, i) => Is(n) + Is(e[i])));
}
function Is(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function pa() {
  return document.body.offsetHeight;
}
function ha(e, t, n) {
  const i = e[on];
  i && (t = (t ? [t, ...i] : [...i]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
const Ki = Symbol('_vod'),
  Yi = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[Ki] = e.style.display === 'none' ? '' : e.style.display),
        n && t ? n.beforeEnter(e) : Wt(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: i }) {
      !t != !n &&
        (i
          ? t
            ? (i.beforeEnter(e), Wt(e, !0), i.enter(e))
            : i.leave(e, () => {
                Wt(e, !1);
              })
          : Wt(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Wt(e, t);
    },
  };
function Wt(e, t) {
  e.style.display = t ? e[Ki] : 'none';
}
function ma(e, t, n) {
  const i = e.style,
    s = he(n);
  if (n && !s) {
    if (t && !he(t)) for (const r in t) n[r] == null && _i(i, r, '');
    for (const r in n) _i(i, r, n[r]);
  } else {
    const r = i.display;
    s ? t !== n && (i.cssText = n) : t && e.removeAttribute('style'),
      Ki in e && (i.display = r);
  }
}
const ks = /\s*!important$/;
function _i(e, t, n) {
  if (U(n)) n.forEach((i) => _i(e, t, i));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const i = ga(e, t);
    ks.test(n)
      ? e.setProperty(Rt(i), n.replace(ks, ''), 'important')
      : (e[i] = n);
  }
}
const $s = ['Webkit', 'Moz', 'ms'],
  Qn = {};
function ga(e, t) {
  const n = Qn[t];
  if (n) return n;
  let i = Je(t);
  if (i !== 'filter' && i in e) return (Qn[t] = i);
  i = Dn(i);
  for (let s = 0; s < $s.length; s++) {
    const r = $s[s] + i;
    if (r in e) return (Qn[t] = r);
  }
  return t;
}
const zs = 'http://www.w3.org/1999/xlink';
function va(e, t, n, i, s) {
  if (i && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(zs, t.slice(6, t.length))
      : e.setAttributeNS(zs, t, n);
  else {
    const r = bo(t);
    n == null || (r && !Ys(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? '' : n);
  }
}
function ba(e, t, n, i, s, r, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    i && o(i, s, r), (e[t] = n ?? '');
    return;
  }
  const a = e.tagName;
  if (t === 'value' && a !== 'PROGRESS' && !a.includes('-')) {
    e._value = n;
    const c = a === 'OPTION' ? e.getAttribute('value') : e.value,
      d = n ?? '';
    c !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === '' || n == null) {
    const c = typeof e[t];
    c === 'boolean'
      ? (n = Ys(n))
      : n == null && c === 'string'
      ? ((n = ''), (l = !0))
      : c === 'number' && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function wa(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function ya(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Bs = Symbol('_vei');
function _a(e, t, n, i, s = null) {
  const r = e[Bs] || (e[Bs] = {}),
    o = r[t];
  if (i && o) o.value = i;
  else {
    const [a, l] = xa(t);
    if (i) {
      const c = (r[t] = Ea(i, s));
      wa(e, a, c, l);
    } else o && (ya(e, a, o, l), (r[t] = void 0));
  }
}
const Ds = /(?:Once|Passive|Capture)$/;
function xa(e) {
  let t;
  if (Ds.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Ds)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Rt(e.slice(2)), t];
}
let ei = 0;
const Sa = Promise.resolve(),
  Ta = () => ei || (Sa.then(() => (ei = 0)), (ei = Date.now()));
function Ea(e, t) {
  const n = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= n.attached) return;
    Re(Ca(i, n.value), t, 5, [i]);
  };
  return (n.value = e), (n.attached = Ta()), n;
}
function Ca(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((i) => (s) => !s._stopped && i && i(s))
    );
  } else return t;
}
const Ns = /^on[a-z]/,
  Ma = (e, t, n, i, s = !1, r, o, a, l) => {
    t === 'class'
      ? ha(e, i, s)
      : t === 'style'
      ? ma(e, n, i)
      : kn(t)
      ? Ci(t) || _a(e, t, n, i, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : Pa(e, t, i, s)
        )
      ? ba(e, t, i, r, o, a, l)
      : (t === 'true-value'
          ? (e._trueValue = i)
          : t === 'false-value' && (e._falseValue = i),
        va(e, t, i, s));
  };
function Pa(e, t, n, i) {
  return i
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && Ns.test(t) && J(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Ns.test(t) && he(n))
    ? !1
    : t in e;
}
const Oa = ge({ patchProp: Ma }, aa);
let Rs;
function Aa() {
  return Rs || (Rs = Rl(Oa));
}
const La = (...e) => {
  const t = Aa().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (i) => {
      const s = Ia(i);
      if (!s) return;
      const r = t._component;
      !J(r) && !r.render && !r.template && (r.template = s.innerHTML),
        (s.innerHTML = '');
      const o = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
        o
      );
    }),
    t
  );
};
function Ia(e) {
  return he(e) ? document.querySelector(e) : e;
}
const ka = '/portfolio/img/icons/twitter_icon.svg',
  $a = '/portfolio/img/icons/discord_icon.svg',
  za = '/portfolio/img/icons/pixiv_icon.svg',
  Ba = '/portfolio/img/icons/github_icon.svg';
const st = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [i, s] of t) n[i] = s;
    return n;
  },
  Da = {
    name: 'socialNetworking',
    props: {
      alignment: {
        type: String,
        validator: function (e) {
          return ['left', 'center', 'right'].indexOf(e) !== -1;
        },
      },
    },
    setup(e) {
      return { classes: Ui(() => ({ [`${e.alignment || 'left'}`]: !0 })) };
    },
  },
  Na = Ht(
    '<p class="m-0"><a href="https://twitter.com/edelRitter9" target="_blank"><img src="' +
      ka +
      '"></a></p><p class="m-0"><a href="https://discordapp.com/users/_edelritter" target="_blank"><img src="' +
      $a +
      '"></a></p><p class="m-0"><a href="https://www.pixiv.net/users/33521928" target="_blank"><img src="' +
      za +
      '"></a></p><p class="m-0"><a href="https://github.com/edelRitter/" target="_blank"><img src="' +
      Ba +
      '"></a></p>',
    4
  ),
  Ra = [Na];
function Fa(e, t, n, i, s, r) {
  return ce(), me('div', { class: Pe(['ui-catalog__sns', i.classes]) }, Ra, 2);
}
const Xi = st(Da, [['render', Fa]]);
const ja = {
    name: 'Menu',
    components: { socialNetworking: Xi },
    data: () => ({
      isActive: !1,
      dark: !1,
      scrollTop: 0,
      alignment: 'ui-catalog__sns-center',
      navLinks: [
        { text: 'TOP', id: 'portfolioTop' },
        { text: 'ARTWORK', id: 'portfolioArtwork' },
        { text: 'PHOTOGRAPHY', id: 'portfolioPhotography' },
        { text: 'ABOUT', id: 'portfolioAbout' },
      ],
    }),
    methods: {
      toggleMenu() {
        this.isActive = !this.isActive;
      },
      navScroll(e) {
        const t = document.getElementById(e.id).offsetTop;
        window.scrollTo({ top: t, behavior: 'smooth' });
      },
    },
  },
  Ha = { class: 'menu' },
  Va = { class: 'menu__wrapper' },
  Ga = { for: 'navigation', class: 'menu__button' },
  Wa = N('span', { class: 'menu__button-hamburger' }, null, -1),
  qa = N('h2', { class: 'menu__sidebar-title' }, 'edelRitter', -1),
  Ua = { class: 'menu__sidebar-list' },
  Ka = ['onClick'];
function Ya(e, t, n, i, s, r) {
  const o = nt('socialNetworking');
  return (
    ce(),
    me('div', Ha, [
      N('div', Va, [
        N('label', Ga, [
          N(
            'button',
            {
              id: 'navigation',
              class: Pe(['menu__button-input', { 'is-active': e.isActive }]),
              onClick:
                t[0] || (t[0] = (...a) => r.toggleMenu && r.toggleMenu(...a)),
            },
            null,
            2
          ),
          Wa,
        ]),
        N(
          'menu',
          { class: Pe(['menu__sidebar', { 'is-active': e.isActive }]) },
          [
            qa,
            N('ul', Ua, [
              (ce(!0),
              me(
                we,
                null,
                nn(
                  e.navLinks,
                  (a, l) => (
                    ce(),
                    me(
                      'li',
                      {
                        class: 'menu__sidebar-list-item',
                        key: l,
                        onClick: [
                          (c) => r.navScroll(a),
                          t[1] ||
                            (t[1] = (...c) =>
                              r.toggleMenu && r.toggleMenu(...c)),
                        ],
                      },
                      et(a.text),
                      9,
                      Ka
                    )
                  )
                ),
                128
              )),
            ]),
            ne(o, { class: Pe(this.alignment) }, null, 8, ['class']),
          ],
          2
        ),
      ]),
      N(
        'div',
        { class: Pe(['menu__background', { 'is-active': e.isActive }]) },
        null,
        2
      ),
    ])
  );
}
const Xa = st(ja, [['render', Ya]]),
  Ja = '/portfolio/video/teamlab_video1.mp4';
const Za = {
    name: 'Top',
    components: { socialNetworking: Xi },
    data() {
      return { alignment: 'ui-catalog__sns-right' };
    },
  },
  Qa = { class: 'portfolio-top' },
  ec = { class: 'portfolio-top__hero m-0' },
  tc = { class: 'portfolio-top__wrapper' },
  nc = Ht(
    '<span class="portfolio-top__subtitle" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="300" data-aos-once="true" data-aos-easing="ease-out-cubic"> DESIGNER / </span><br><span class="portfolio-top__subtitle" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="600" data-aos-once="true" data-aos-easing="ease-out-cubic"> DEVELOPER / </span><br><span class="portfolio-top__subtitle" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="900" data-aos-once="true" data-aos-easing="ease-out-cubic"> ILLUSTRATOR / </span><p class="portfolio-top__text m-0">-</p><p class="portfolio-top__text m-0">porfolio website created by</p><p class="portfolio-top__text m-0">-</p><h1 class="portfolio-top__title">edelRitter</h1>',
    9
  ),
  ic = N(
    'video',
    {
      playsinline: '',
      autoplay: '',
      muted: '',
      loop: '',
      class: 'portfolio-top__video',
    },
    [N('source', { src: Ja, type: 'video/mp4' })],
    -1
  );
function sc(e, t, n, i, s, r) {
  const o = nt('socialNetworking');
  return (
    ce(),
    me('section', Qa, [
      N('div', ec, [
        N('div', tc, [
          nc,
          ne(o, { class: Pe(this.alignment) }, null, 8, ['class']),
        ]),
      ]),
      ic,
    ])
  );
}
const rc = st(Za, [['render', sc]]);
const oc = {
    name: 'Modal',
    props: { status: String },
    methods: {
      closeModal() {
        this.$emit('modalOff');
      },
    },
  },
  lc = { class: 'portfolio-modal' },
  ac = { class: 'portfolio-modal__content' },
  cc = { class: 'portfolio-modal__wrap' },
  dc = { class: 'portfolio-modal__opened' };
function fc(e, t, n, i, s, r) {
  return (
    ce(),
    me('div', lc, [
      N('div', ac, [
        N('p', {
          class: 'portfolio-modal__close',
          onClick:
            t[0] || (t[0] = (...o) => r.closeModal && r.closeModal(...o)),
        }),
        N('div', cc, [
          Ri(
            N(
              'div',
              dc,
              [Or(e.$slots, 'body', {}, () => [Gi(' Default body content ')])],
              512
            ),
            [[Yi, n.status === 'confirmation']]
          ),
        ]),
      ]),
      N('div', {
        class: 'portfolio-modal__bg',
        onClick: t[1] || (t[1] = (...o) => r.closeModal && r.closeModal(...o)),
      }),
    ])
  );
}
const Wr = st(oc, [['render', fc]]),
  uc = [
    {
      id: '1',
      image: '/img/illustration/arknights_hibiscus.png',
      type: 'artwork',
      title: 'arknights / hibiscus',
    },
    {
      id: '2',
      image: '/img/illustration/arknights_specter.png',
      type: 'artwork',
      title: 'arknights / specter',
    },
    {
      id: '3',
      image: '/img/illustration/arknights_w.png',
      type: 'artwork',
      title: 'arknights / W',
    },
    {
      id: '4',
      image: '/img/illustration/arknights_penance.png',
      type: 'artwork',
      title: 'arknights / penance',
    },
    {
      id: '5',
      image: '/img/illustration/arknights_ajimu.png',
      type: 'artwork',
      title: 'arknights / angelina',
    },
  ],
  pc = '/portfolio/img/icons/arrow_icon.svg';
const hc = {
    name: 'Artwork',
    components: { Modal: Wr },
    setup() {
      const e = pe(''),
        t = pe('');
      return { items: uc, modalStatus: e, modalImage: t };
    },
    methods: {
      showModal(e) {
        this.modalStatus = 'confirmation';
        const t = e.target.dataset.artwork,
          i = this.items.filter((s) => s.id.indexOf(t) !== -1)[0].image;
        return console.log(i), (this.modalImage = i);
      },
      closeModal() {
        (this.modalStatus = ''), (this.modalImage = '');
      },
    },
  },
  mc = { class: 'portfolio-artwork' },
  gc = Ht(
    '<div class="portfolio-artwork__scroll"><div class="portfolio-artwork__scroll-text"><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span></div><div class="portfolio-artwork__scroll-text"><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span></div></div><div class="portfolio-artwork__title"><div class="portfolio-artwork__title-border"><h2 class="portfolio-artwork__title-text"> showcase of all / <span class="portfolio-artwork__title-text-sub">WORKS</span></h2></div></div>',
    2
  ),
  vc = { class: 'row no-gutters' },
  bc = Ht(
    '<div class="col-12"><div class="portfolio-artwork__icon"><p class="portfolio-artwork__icon-text text-center m-0"> illustration / photography works </p><p class="portfolio-artwork__icon-img text-center m-0"><img src="' +
      pc +
      '"></p></div></div><div class="col-12 col-md-4"><div class="portfolio-artwork__description"><p class="portfolio-artwork__description-text m-0"> scroll down to see more / </p><p class="portfolio-artwork__description-text m-0">+</p><p class="portfolio-artwork__description-text m-0"> swipe left / right to see more photography </p></div></div>',
    2
  ),
  wc = { class: 'col-12 col-md-8' },
  yc = { class: 'portfolio-artwork__content' },
  _c = {
    'data-aos': 'fade-up',
    'data-aos-duration': '1200',
    'data-aos-delay': '400',
    'data-aos-easing': 'ease-out-cubic',
    class: 'portfolio-artwork__content-item flex items-center justify-center',
  },
  xc = { class: 'portfolio-artwork__content-img' },
  Sc = ['data-artwork', 'src'],
  Tc = { class: 'portfolio-artwork__content-text' },
  Ec = { class: 'portfolio-artwork__content-type' },
  Cc = { class: 'portfolio-artwork__content-title' },
  Mc = { class: 'portfolio-modal__item' },
  Pc = { class: 'm-0' },
  Oc = ['src'];
function Ac(e, t, n, i, s, r) {
  const o = nt('masonry-wall'),
    a = nt('Modal');
  return (
    ce(),
    me('section', mc, [
      gc,
      N('div', vc, [
        bc,
        N('div', wc, [
          N('div', yc, [
            ne(
              o,
              {
                items: i.items,
                'column-width': 400,
                'min-columns': 2,
                gap: 12,
              },
              {
                default: ft(({ item: l, index: c }) => [
                  N('div', _c, [
                    N('p', xc, [
                      N(
                        'img',
                        {
                          class: 'w-100',
                          'data-artwork': l.id,
                          src: l.image,
                          onClick:
                            t[0] ||
                            (t[0] = (...d) => r.showModal && r.showModal(...d)),
                        },
                        null,
                        8,
                        Sc
                      ),
                    ]),
                    N('p', Tc, [
                      N('span', Ec, et(l.type), 1),
                      N('span', Cc, et(l.title), 1),
                    ]),
                  ]),
                ]),
                _: 1,
              },
              8,
              ['items']
            ),
          ]),
        ]),
        Ri(
          ne(
            qn,
            { name: 'modal-fade', status: this.modalStatus },
            {
              default: ft(() => [
                ne(
                  a,
                  { onModalOff: r.closeModal },
                  {
                    body: ft(() => [
                      N('div', Mc, [
                        N('p', Pc, [
                          N(
                            'img',
                            {
                              src: i.modalImage,
                              class: 'portfolio-modal__item-images',
                            },
                            null,
                            8,
                            Oc
                          ),
                        ]),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ['onModalOff']
                ),
              ]),
              _: 1,
            },
            8,
            ['status']
          ),
          [[Yi, this.modalStatus !== '']]
        ),
      ]),
    ])
  );
}
const Lc = st(hc, [['render', Ac]]);
function Fs(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'constructor' in e &&
    e.constructor === Object
  );
}
function Ji(e, t) {
  e === void 0 && (e = {}),
    t === void 0 && (t = {}),
    Object.keys(t).forEach((n) => {
      typeof e[n] > 'u'
        ? (e[n] = t[n])
        : Fs(t[n]) &&
          Fs(e[n]) &&
          Object.keys(t[n]).length > 0 &&
          Ji(e[n], t[n]);
    });
}
const qr = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: '' },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
};
function rt() {
  const e = typeof document < 'u' ? document : {};
  return Ji(e, qr), e;
}
const Ic = {
  document: qr,
  navigator: { userAgent: '' },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > 'u' ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > 'u' || clearTimeout(e);
  },
};
function Ae() {
  const e = typeof window < 'u' ? window : {};
  return Ji(e, Ic), e;
}
function kc(e) {
  const t = e;
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null;
    } catch {}
    try {
      delete t[n];
    } catch {}
  });
}
function An(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t);
}
function Ln() {
  return Date.now();
}
function $c(e) {
  const t = Ae();
  let n;
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  );
}
function zc(e, t) {
  t === void 0 && (t = 'x');
  const n = Ae();
  let i, s, r;
  const o = $c(e);
  return (
    n.WebKitCSSMatrix
      ? ((s = o.transform || o.webkitTransform),
        s.split(',').length > 6 &&
          (s = s
            .split(', ')
            .map((a) => a.replace(',', '.'))
            .join(', ')),
        (r = new n.WebKitCSSMatrix(s === 'none' ? '' : s)))
      : ((r =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (i = r.toString().split(','))),
    t === 'x' &&
      (n.WebKitCSSMatrix
        ? (s = r.m41)
        : i.length === 16
        ? (s = parseFloat(i[12]))
        : (s = parseFloat(i[4]))),
    t === 'y' &&
      (n.WebKitCSSMatrix
        ? (s = r.m42)
        : i.length === 16
        ? (s = parseFloat(i[13]))
        : (s = parseFloat(i[5]))),
    s || 0
  );
}
function gn(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  );
}
function Bc(e) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function Ie() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ['__proto__', 'constructor', 'prototype'];
  for (let n = 1; n < arguments.length; n += 1) {
    const i = n < 0 || arguments.length <= n ? void 0 : arguments[n];
    if (i != null && !Bc(i)) {
      const s = Object.keys(Object(i)).filter((r) => t.indexOf(r) < 0);
      for (let r = 0, o = s.length; r < o; r += 1) {
        const a = s[r],
          l = Object.getOwnPropertyDescriptor(i, a);
        l !== void 0 &&
          l.enumerable &&
          (gn(e[a]) && gn(i[a])
            ? i[a].__swiper__
              ? (e[a] = i[a])
              : Ie(e[a], i[a])
            : !gn(e[a]) && gn(i[a])
            ? ((e[a] = {}), i[a].__swiper__ ? (e[a] = i[a]) : Ie(e[a], i[a]))
            : (e[a] = i[a]));
      }
    }
  }
  return e;
}
function vn(e, t, n) {
  e.style.setProperty(t, n);
}
function Ur(e) {
  let { swiper: t, targetPosition: n, side: i } = e;
  const s = Ae(),
    r = -t.translate;
  let o = null,
    a;
  const l = t.params.speed;
  (t.wrapperEl.style.scrollSnapType = 'none'),
    s.cancelAnimationFrame(t.cssModeFrameID);
  const c = n > r ? 'next' : 'prev',
    d = (h, u) => (c === 'next' && h >= u) || (c === 'prev' && h <= u),
    f = () => {
      (a = new Date().getTime()), o === null && (o = a);
      const h = Math.max(Math.min((a - o) / l, 1), 0),
        u = 0.5 - Math.cos(h * Math.PI) / 2;
      let T = r + u * (n - r);
      if ((d(T, n) && (T = n), t.wrapperEl.scrollTo({ [i]: T }), d(T, n))) {
        (t.wrapperEl.style.overflow = 'hidden'),
          (t.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (t.wrapperEl.style.overflow = ''), t.wrapperEl.scrollTo({ [i]: T });
          }),
          s.cancelAnimationFrame(t.cssModeFrameID);
        return;
      }
      t.cssModeFrameID = s.requestAnimationFrame(f);
    };
  f();
}
function Ye(e, t) {
  return t === void 0 && (t = ''), [...e.children].filter((n) => n.matches(t));
}
function Zi(e, t) {
  t === void 0 && (t = []);
  const n = document.createElement(e);
  return n.classList.add(...(Array.isArray(t) ? t : [t])), n;
}
function Dc(e) {
  const t = Ae(),
    n = rt(),
    i = e.getBoundingClientRect(),
    s = n.body,
    r = e.clientTop || s.clientTop || 0,
    o = e.clientLeft || s.clientLeft || 0,
    a = e === t ? t.scrollY : e.scrollTop,
    l = e === t ? t.scrollX : e.scrollLeft;
  return { top: i.top + a - r, left: i.left + l - o };
}
function Nc(e, t) {
  const n = [];
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling;
    t ? i.matches(t) && n.push(i) : n.push(i), (e = i);
  }
  return n;
}
function Rc(e, t) {
  const n = [];
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling;
    t ? i.matches(t) && n.push(i) : n.push(i), (e = i);
  }
  return n;
}
function ut(e, t) {
  return Ae().getComputedStyle(e, null).getPropertyValue(t);
}
function In(e) {
  let t = e,
    n;
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (n += 1);
    return n;
  }
}
function Kr(e, t) {
  const n = [];
  let i = e.parentElement;
  for (; i; ) t ? i.matches(t) && n.push(i) : n.push(i), (i = i.parentElement);
  return n;
}
function xi(e, t, n) {
  const i = Ae();
  return n
    ? e[t === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-right' : 'margin-top')
        ) +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-left' : 'margin-bottom')
        )
    : e.offsetWidth;
}
function Qi(e, t, n, i) {
  return (
    e.params.createElements &&
      Object.keys(i).forEach((s) => {
        if (!n[s] && n.auto === !0) {
          let r = Ye(e.el, `.${i[s]}`)[0];
          r || ((r = Zi('div', i[s])), (r.className = i[s]), e.el.append(r)),
            (n[s] = r),
            (t[s] = r);
        }
      }),
    n
  );
}
function Fc(e) {
  let { swiper: t, extendParams: n, on: i, emit: s } = e;
  n({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled',
    },
  }),
    (t.navigation = { nextEl: null, prevEl: null });
  const r = (w) => (Array.isArray(w) ? w : [w]).filter((C) => !!C);
  function o(w) {
    let C;
    return w &&
      typeof w == 'string' &&
      t.isElement &&
      ((C = t.el.querySelector(w)), C)
      ? C
      : (w &&
          (typeof w == 'string' && (C = [...document.querySelectorAll(w)]),
          t.params.uniqueNavElements &&
            typeof w == 'string' &&
            C.length > 1 &&
            t.el.querySelectorAll(w).length === 1 &&
            (C = t.el.querySelector(w))),
        w && !C ? w : C);
  }
  function a(w, C) {
    const M = t.params.navigation;
    (w = r(w)),
      w.forEach((m) => {
        m &&
          (m.classList[C ? 'add' : 'remove'](...M.disabledClass.split(' ')),
          m.tagName === 'BUTTON' && (m.disabled = C),
          t.params.watchOverflow &&
            t.enabled &&
            m.classList[t.isLocked ? 'add' : 'remove'](M.lockClass));
      });
  }
  function l() {
    const { nextEl: w, prevEl: C } = t.navigation;
    if (t.params.loop) {
      a(C, !1), a(w, !1);
      return;
    }
    a(C, t.isBeginning && !t.params.rewind), a(w, t.isEnd && !t.params.rewind);
  }
  function c(w) {
    w.preventDefault(),
      !(t.isBeginning && !t.params.loop && !t.params.rewind) &&
        (t.slidePrev(), s('navigationPrev'));
  }
  function d(w) {
    w.preventDefault(),
      !(t.isEnd && !t.params.loop && !t.params.rewind) &&
        (t.slideNext(), s('navigationNext'));
  }
  function f() {
    const w = t.params.navigation;
    if (
      ((t.params.navigation = Qi(
        t,
        t.originalParams.navigation,
        t.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }
      )),
      !(w.nextEl || w.prevEl))
    )
      return;
    let C = o(w.nextEl),
      M = o(w.prevEl);
    Object.assign(t.navigation, { nextEl: C, prevEl: M }),
      (C = r(C)),
      (M = r(M));
    const m = (b, _) => {
      b && b.addEventListener('click', _ === 'next' ? d : c),
        !t.enabled && b && b.classList.add(...w.lockClass.split(' '));
    };
    C.forEach((b) => m(b, 'next')), M.forEach((b) => m(b, 'prev'));
  }
  function h() {
    let { nextEl: w, prevEl: C } = t.navigation;
    (w = r(w)), (C = r(C));
    const M = (m, b) => {
      m.removeEventListener('click', b === 'next' ? d : c),
        m.classList.remove(...t.params.navigation.disabledClass.split(' '));
    };
    w.forEach((m) => M(m, 'next')), C.forEach((m) => M(m, 'prev'));
  }
  i('init', () => {
    t.params.navigation.enabled === !1 ? T() : (f(), l());
  }),
    i('toEdge fromEdge lock unlock', () => {
      l();
    }),
    i('destroy', () => {
      h();
    }),
    i('enable disable', () => {
      let { nextEl: w, prevEl: C } = t.navigation;
      if (((w = r(w)), (C = r(C)), t.enabled)) {
        l();
        return;
      }
      [...w, ...C]
        .filter((M) => !!M)
        .forEach((M) => M.classList.add(t.params.navigation.lockClass));
    }),
    i('click', (w, C) => {
      let { nextEl: M, prevEl: m } = t.navigation;
      (M = r(M)), (m = r(m));
      const b = C.target;
      if (t.params.navigation.hideOnClick && !m.includes(b) && !M.includes(b)) {
        if (
          t.pagination &&
          t.params.pagination &&
          t.params.pagination.clickable &&
          (t.pagination.el === b || t.pagination.el.contains(b))
        )
          return;
        let _;
        M.length
          ? (_ = M[0].classList.contains(t.params.navigation.hiddenClass))
          : m.length &&
            (_ = m[0].classList.contains(t.params.navigation.hiddenClass)),
          s(_ === !0 ? 'navigationShow' : 'navigationHide'),
          [...M, ...m]
            .filter((I) => !!I)
            .forEach((I) =>
              I.classList.toggle(t.params.navigation.hiddenClass)
            );
      }
    });
  const u = () => {
      t.el.classList.remove(
        ...t.params.navigation.navigationDisabledClass.split(' ')
      ),
        f(),
        l();
    },
    T = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(' ')
      ),
        h();
    };
  Object.assign(t.navigation, {
    enable: u,
    disable: T,
    update: l,
    init: f,
    destroy: h,
  });
}
function qt(e) {
  return (
    e === void 0 && (e = ''),
    `.${e
      .trim()
      .replace(/([\.:!+\/])/g, '\\$1')
      .replace(/ /g, '.')}`
  );
}
function jc(e) {
  let { swiper: t, extendParams: n, on: i, emit: s } = e;
  const r = 'swiper-pagination';
  n({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: 'bullets',
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (m) => m,
      formatFractionTotal: (m) => m,
      bulletClass: `${r}-bullet`,
      bulletActiveClass: `${r}-bullet-active`,
      modifierClass: `${r}-`,
      currentClass: `${r}-current`,
      totalClass: `${r}-total`,
      hiddenClass: `${r}-hidden`,
      progressbarFillClass: `${r}-progressbar-fill`,
      progressbarOppositeClass: `${r}-progressbar-opposite`,
      clickableClass: `${r}-clickable`,
      lockClass: `${r}-lock`,
      horizontalClass: `${r}-horizontal`,
      verticalClass: `${r}-vertical`,
      paginationDisabledClass: `${r}-disabled`,
    },
  }),
    (t.pagination = { el: null, bullets: [] });
  let o,
    a = 0;
  const l = (m) => (Array.isArray(m) ? m : [m]).filter((b) => !!b);
  function c() {
    return (
      !t.params.pagination.el ||
      !t.pagination.el ||
      (Array.isArray(t.pagination.el) && t.pagination.el.length === 0)
    );
  }
  function d(m, b) {
    const { bulletActiveClass: _ } = t.params.pagination;
    m &&
      ((m = m[`${b === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      m &&
        (m.classList.add(`${_}-${b}`),
        (m = m[`${b === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        m && m.classList.add(`${_}-${b}-${b}`)));
  }
  function f(m) {
    const b = m.target.closest(qt(t.params.pagination.bulletClass));
    if (!b) return;
    m.preventDefault();
    const _ = In(b) * t.params.slidesPerGroup;
    if (t.params.loop) {
      if (t.realIndex === _) return;
      const I = t.realIndex,
        j = t.getSlideIndexByData(_),
        D = t.getSlideIndexByData(t.realIndex),
        A = (y) => {
          const $ = t.activeIndex;
          t.loopFix({ direction: y, activeSlideIndex: j, slideTo: !1 });
          const x = t.activeIndex;
          $ === x && t.slideToLoop(I, 0, !1, !0);
        };
      if (j > t.slides.length - t.loopedSlides) A(j > D ? 'next' : 'prev');
      else if (t.params.centeredSlides) {
        const y =
          t.params.slidesPerView === 'auto'
            ? t.slidesPerViewDynamic()
            : Math.ceil(parseFloat(t.params.slidesPerView, 10));
        j < Math.floor(y / 2) && A('prev');
      }
      t.slideToLoop(_);
    } else t.slideTo(_);
  }
  function h() {
    const m = t.rtl,
      b = t.params.pagination;
    if (c()) return;
    let _ = t.pagination.el;
    _ = l(_);
    let I, j;
    const D =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length,
      A = t.params.loop
        ? Math.ceil(D / t.params.slidesPerGroup)
        : t.snapGrid.length;
    if (
      (t.params.loop
        ? ((j = t.previousRealIndex || 0),
          (I =
            t.params.slidesPerGroup > 1
              ? Math.floor(t.realIndex / t.params.slidesPerGroup)
              : t.realIndex))
        : typeof t.snapIndex < 'u'
        ? ((I = t.snapIndex), (j = t.previousSnapIndex))
        : ((j = t.previousIndex || 0), (I = t.activeIndex || 0)),
      b.type === 'bullets' &&
        t.pagination.bullets &&
        t.pagination.bullets.length > 0)
    ) {
      const y = t.pagination.bullets;
      let $, x, g;
      if (
        (b.dynamicBullets &&
          ((o = xi(y[0], t.isHorizontal() ? 'width' : 'height', !0)),
          _.forEach((E) => {
            E.style[t.isHorizontal() ? 'width' : 'height'] = `${
              o * (b.dynamicMainBullets + 4)
            }px`;
          }),
          b.dynamicMainBullets > 1 &&
            j !== void 0 &&
            ((a += I - (j || 0)),
            a > b.dynamicMainBullets - 1
              ? (a = b.dynamicMainBullets - 1)
              : a < 0 && (a = 0)),
          ($ = Math.max(I - a, 0)),
          (x = $ + (Math.min(y.length, b.dynamicMainBullets) - 1)),
          (g = (x + $) / 2)),
        y.forEach((E) => {
          const P = [
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              (F) => `${b.bulletActiveClass}${F}`
            ),
          ]
            .map((F) =>
              typeof F == 'string' && F.includes(' ') ? F.split(' ') : F
            )
            .flat();
          E.classList.remove(...P);
        }),
        _.length > 1)
      )
        y.forEach((E) => {
          const P = In(E);
          P === I
            ? E.classList.add(...b.bulletActiveClass.split(' '))
            : t.isElement && E.setAttribute('part', 'bullet'),
            b.dynamicBullets &&
              (P >= $ &&
                P <= x &&
                E.classList.add(...`${b.bulletActiveClass}-main`.split(' ')),
              P === $ && d(E, 'prev'),
              P === x && d(E, 'next'));
        });
      else {
        const E = y[I];
        if (
          (E && E.classList.add(...b.bulletActiveClass.split(' ')),
          t.isElement &&
            y.forEach((P, F) => {
              P.setAttribute('part', F === I ? 'bullet-active' : 'bullet');
            }),
          b.dynamicBullets)
        ) {
          const P = y[$],
            F = y[x];
          for (let V = $; V <= x; V += 1)
            y[V] &&
              y[V].classList.add(...`${b.bulletActiveClass}-main`.split(' '));
          d(P, 'prev'), d(F, 'next');
        }
      }
      if (b.dynamicBullets) {
        const E = Math.min(y.length, b.dynamicMainBullets + 4),
          P = (o * E - o) / 2 - g * o,
          F = m ? 'right' : 'left';
        y.forEach((V) => {
          V.style[t.isHorizontal() ? F : 'top'] = `${P}px`;
        });
      }
    }
    _.forEach((y, $) => {
      if (
        (b.type === 'fraction' &&
          (y.querySelectorAll(qt(b.currentClass)).forEach((x) => {
            x.textContent = b.formatFractionCurrent(I + 1);
          }),
          y.querySelectorAll(qt(b.totalClass)).forEach((x) => {
            x.textContent = b.formatFractionTotal(A);
          })),
        b.type === 'progressbar')
      ) {
        let x;
        b.progressbarOpposite
          ? (x = t.isHorizontal() ? 'vertical' : 'horizontal')
          : (x = t.isHorizontal() ? 'horizontal' : 'vertical');
        const g = (I + 1) / A;
        let E = 1,
          P = 1;
        x === 'horizontal' ? (E = g) : (P = g),
          y.querySelectorAll(qt(b.progressbarFillClass)).forEach((F) => {
            (F.style.transform = `translate3d(0,0,0) scaleX(${E}) scaleY(${P})`),
              (F.style.transitionDuration = `${t.params.speed}ms`);
          });
      }
      b.type === 'custom' && b.renderCustom
        ? ((y.innerHTML = b.renderCustom(t, I + 1, A)),
          $ === 0 && s('paginationRender', y))
        : ($ === 0 && s('paginationRender', y), s('paginationUpdate', y)),
        t.params.watchOverflow &&
          t.enabled &&
          y.classList[t.isLocked ? 'add' : 'remove'](b.lockClass);
    });
  }
  function u() {
    const m = t.params.pagination;
    if (c()) return;
    const b =
      t.virtual && t.params.virtual.enabled
        ? t.virtual.slides.length
        : t.slides.length;
    let _ = t.pagination.el;
    _ = l(_);
    let I = '';
    if (m.type === 'bullets') {
      let j = t.params.loop
        ? Math.ceil(b / t.params.slidesPerGroup)
        : t.snapGrid.length;
      t.params.freeMode && t.params.freeMode.enabled && j > b && (j = b);
      for (let D = 0; D < j; D += 1)
        m.renderBullet
          ? (I += m.renderBullet.call(t, D, m.bulletClass))
          : (I += `<${m.bulletElement} ${
              t.isElement ? 'part="bullet"' : ''
            } class="${m.bulletClass}"></${m.bulletElement}>`);
    }
    m.type === 'fraction' &&
      (m.renderFraction
        ? (I = m.renderFraction.call(t, m.currentClass, m.totalClass))
        : (I = `<span class="${m.currentClass}"></span> / <span class="${m.totalClass}"></span>`)),
      m.type === 'progressbar' &&
        (m.renderProgressbar
          ? (I = m.renderProgressbar.call(t, m.progressbarFillClass))
          : (I = `<span class="${m.progressbarFillClass}"></span>`)),
      (t.pagination.bullets = []),
      _.forEach((j) => {
        m.type !== 'custom' && (j.innerHTML = I || ''),
          m.type === 'bullets' &&
            t.pagination.bullets.push(...j.querySelectorAll(qt(m.bulletClass)));
      }),
      m.type !== 'custom' && s('paginationRender', _[0]);
  }
  function T() {
    t.params.pagination = Qi(
      t,
      t.originalParams.pagination,
      t.params.pagination,
      { el: 'swiper-pagination' }
    );
    const m = t.params.pagination;
    if (!m.el) return;
    let b;
    typeof m.el == 'string' && t.isElement && (b = t.el.querySelector(m.el)),
      !b &&
        typeof m.el == 'string' &&
        (b = [...document.querySelectorAll(m.el)]),
      b || (b = m.el),
      !(!b || b.length === 0) &&
        (t.params.uniqueNavElements &&
          typeof m.el == 'string' &&
          Array.isArray(b) &&
          b.length > 1 &&
          ((b = [...t.el.querySelectorAll(m.el)]),
          b.length > 1 &&
            (b = b.filter((_) => Kr(_, '.swiper')[0] === t.el)[0])),
        Array.isArray(b) && b.length === 1 && (b = b[0]),
        Object.assign(t.pagination, { el: b }),
        (b = l(b)),
        b.forEach((_) => {
          m.type === 'bullets' &&
            m.clickable &&
            _.classList.add(...(m.clickableClass || '').split(' ')),
            _.classList.add(m.modifierClass + m.type),
            _.classList.add(
              t.isHorizontal() ? m.horizontalClass : m.verticalClass
            ),
            m.type === 'bullets' &&
              m.dynamicBullets &&
              (_.classList.add(`${m.modifierClass}${m.type}-dynamic`),
              (a = 0),
              m.dynamicMainBullets < 1 && (m.dynamicMainBullets = 1)),
            m.type === 'progressbar' &&
              m.progressbarOpposite &&
              _.classList.add(m.progressbarOppositeClass),
            m.clickable && _.addEventListener('click', f),
            t.enabled || _.classList.add(m.lockClass);
        }));
  }
  function w() {
    const m = t.params.pagination;
    if (c()) return;
    let b = t.pagination.el;
    b &&
      ((b = l(b)),
      b.forEach((_) => {
        _.classList.remove(m.hiddenClass),
          _.classList.remove(m.modifierClass + m.type),
          _.classList.remove(
            t.isHorizontal() ? m.horizontalClass : m.verticalClass
          ),
          m.clickable &&
            (_.classList.remove(...(m.clickableClass || '').split(' ')),
            _.removeEventListener('click', f));
      })),
      t.pagination.bullets &&
        t.pagination.bullets.forEach((_) =>
          _.classList.remove(...m.bulletActiveClass.split(' '))
        );
  }
  i('changeDirection', () => {
    if (!t.pagination || !t.pagination.el) return;
    const m = t.params.pagination;
    let { el: b } = t.pagination;
    (b = l(b)),
      b.forEach((_) => {
        _.classList.remove(m.horizontalClass, m.verticalClass),
          _.classList.add(
            t.isHorizontal() ? m.horizontalClass : m.verticalClass
          );
      });
  }),
    i('init', () => {
      t.params.pagination.enabled === !1 ? M() : (T(), u(), h());
    }),
    i('activeIndexChange', () => {
      typeof t.snapIndex > 'u' && h();
    }),
    i('snapIndexChange', () => {
      h();
    }),
    i('snapGridLengthChange', () => {
      u(), h();
    }),
    i('destroy', () => {
      w();
    }),
    i('enable disable', () => {
      let { el: m } = t.pagination;
      m &&
        ((m = l(m)),
        m.forEach((b) =>
          b.classList[t.enabled ? 'remove' : 'add'](
            t.params.pagination.lockClass
          )
        ));
    }),
    i('lock unlock', () => {
      h();
    }),
    i('click', (m, b) => {
      const _ = b.target,
        I = l(t.pagination.el);
      if (
        t.params.pagination.el &&
        t.params.pagination.hideOnClick &&
        I &&
        I.length > 0 &&
        !_.classList.contains(t.params.pagination.bulletClass)
      ) {
        if (
          t.navigation &&
          ((t.navigation.nextEl && _ === t.navigation.nextEl) ||
            (t.navigation.prevEl && _ === t.navigation.prevEl))
        )
          return;
        const j = I[0].classList.contains(t.params.pagination.hiddenClass);
        s(j === !0 ? 'paginationShow' : 'paginationHide'),
          I.forEach((D) => D.classList.toggle(t.params.pagination.hiddenClass));
      }
    });
  const C = () => {
      t.el.classList.remove(t.params.pagination.paginationDisabledClass);
      let { el: m } = t.pagination;
      m &&
        ((m = l(m)),
        m.forEach((b) =>
          b.classList.remove(t.params.pagination.paginationDisabledClass)
        )),
        T(),
        u(),
        h();
    },
    M = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: m } = t.pagination;
      m &&
        ((m = l(m)),
        m.forEach((b) =>
          b.classList.add(t.params.pagination.paginationDisabledClass)
        )),
        w();
    };
  Object.assign(t.pagination, {
    enable: C,
    disable: M,
    render: u,
    update: h,
    init: T,
    destroy: w,
  });
}
function Hc(e) {
  let { swiper: t, extendParams: n, on: i, emit: s } = e;
  const r = rt();
  let o = !1,
    a = null,
    l = null,
    c,
    d,
    f,
    h;
  n({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: 'swiper-scrollbar-horizontal',
      verticalClass: 'swiper-scrollbar-vertical',
    },
  }),
    (t.scrollbar = { el: null, dragEl: null });
  function u() {
    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
    const { scrollbar: g, rtlTranslate: E } = t,
      { dragEl: P, el: F } = g,
      V = t.params.scrollbar,
      Y = t.params.loop ? t.progressLoop : t.progress;
    let K = d,
      Z = (f - d) * Y;
    E
      ? ((Z = -Z), Z > 0 ? ((K = d - Z), (Z = 0)) : -Z + d > f && (K = f + Z))
      : Z < 0
      ? ((K = d + Z), (Z = 0))
      : Z + d > f && (K = f - Z),
      t.isHorizontal()
        ? ((P.style.transform = `translate3d(${Z}px, 0, 0)`),
          (P.style.width = `${K}px`))
        : ((P.style.transform = `translate3d(0px, ${Z}px, 0)`),
          (P.style.height = `${K}px`)),
      V.hide &&
        (clearTimeout(a),
        (F.style.opacity = 1),
        (a = setTimeout(() => {
          (F.style.opacity = 0), (F.style.transitionDuration = '400ms');
        }, 1e3)));
  }
  function T(g) {
    !t.params.scrollbar.el ||
      !t.scrollbar.el ||
      (t.scrollbar.dragEl.style.transitionDuration = `${g}ms`);
  }
  function w() {
    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
    const { scrollbar: g } = t,
      { dragEl: E, el: P } = g;
    (E.style.width = ''),
      (E.style.height = ''),
      (f = t.isHorizontal() ? P.offsetWidth : P.offsetHeight),
      (h =
        t.size /
        (t.virtualSize +
          t.params.slidesOffsetBefore -
          (t.params.centeredSlides ? t.snapGrid[0] : 0))),
      t.params.scrollbar.dragSize === 'auto'
        ? (d = f * h)
        : (d = parseInt(t.params.scrollbar.dragSize, 10)),
      t.isHorizontal()
        ? (E.style.width = `${d}px`)
        : (E.style.height = `${d}px`),
      h >= 1 ? (P.style.display = 'none') : (P.style.display = ''),
      t.params.scrollbar.hide && (P.style.opacity = 0),
      t.params.watchOverflow &&
        t.enabled &&
        g.el.classList[t.isLocked ? 'add' : 'remove'](
          t.params.scrollbar.lockClass
        );
  }
  function C(g) {
    return t.isHorizontal() ? g.clientX : g.clientY;
  }
  function M(g) {
    const { scrollbar: E, rtlTranslate: P } = t,
      { el: F } = E;
    let V;
    (V =
      (C(g) -
        Dc(F)[t.isHorizontal() ? 'left' : 'top'] -
        (c !== null ? c : d / 2)) /
      (f - d)),
      (V = Math.max(Math.min(V, 1), 0)),
      P && (V = 1 - V);
    const Y = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * V;
    t.updateProgress(Y),
      t.setTranslate(Y),
      t.updateActiveIndex(),
      t.updateSlidesClasses();
  }
  function m(g) {
    const E = t.params.scrollbar,
      { scrollbar: P, wrapperEl: F } = t,
      { el: V, dragEl: Y } = P;
    (o = !0),
      (c =
        g.target === Y
          ? C(g) -
            g.target.getBoundingClientRect()[t.isHorizontal() ? 'left' : 'top']
          : null),
      g.preventDefault(),
      g.stopPropagation(),
      (F.style.transitionDuration = '100ms'),
      (Y.style.transitionDuration = '100ms'),
      M(g),
      clearTimeout(l),
      (V.style.transitionDuration = '0ms'),
      E.hide && (V.style.opacity = 1),
      t.params.cssMode && (t.wrapperEl.style['scroll-snap-type'] = 'none'),
      s('scrollbarDragStart', g);
  }
  function b(g) {
    const { scrollbar: E, wrapperEl: P } = t,
      { el: F, dragEl: V } = E;
    o &&
      (g.preventDefault ? g.preventDefault() : (g.returnValue = !1),
      M(g),
      (P.style.transitionDuration = '0ms'),
      (F.style.transitionDuration = '0ms'),
      (V.style.transitionDuration = '0ms'),
      s('scrollbarDragMove', g));
  }
  function _(g) {
    const E = t.params.scrollbar,
      { scrollbar: P, wrapperEl: F } = t,
      { el: V } = P;
    o &&
      ((o = !1),
      t.params.cssMode &&
        ((t.wrapperEl.style['scroll-snap-type'] = ''),
        (F.style.transitionDuration = '')),
      E.hide &&
        (clearTimeout(l),
        (l = An(() => {
          (V.style.opacity = 0), (V.style.transitionDuration = '400ms');
        }, 1e3))),
      s('scrollbarDragEnd', g),
      E.snapOnRelease && t.slideToClosest());
  }
  function I(g) {
    const { scrollbar: E, params: P } = t,
      F = E.el;
    if (!F) return;
    const V = F,
      Y = P.passiveListeners ? { passive: !1, capture: !1 } : !1,
      K = P.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!V) return;
    const Z = g === 'on' ? 'addEventListener' : 'removeEventListener';
    V[Z]('pointerdown', m, Y),
      r[Z]('pointermove', b, Y),
      r[Z]('pointerup', _, K);
  }
  function j() {
    !t.params.scrollbar.el || !t.scrollbar.el || I('on');
  }
  function D() {
    !t.params.scrollbar.el || !t.scrollbar.el || I('off');
  }
  function A() {
    const { scrollbar: g, el: E } = t;
    t.params.scrollbar = Qi(t, t.originalParams.scrollbar, t.params.scrollbar, {
      el: 'swiper-scrollbar',
    });
    const P = t.params.scrollbar;
    if (!P.el) return;
    let F;
    typeof P.el == 'string' && t.isElement && (F = t.el.querySelector(P.el)),
      !F && typeof P.el == 'string'
        ? (F = r.querySelectorAll(P.el))
        : F || (F = P.el),
      t.params.uniqueNavElements &&
        typeof P.el == 'string' &&
        F.length > 1 &&
        E.querySelectorAll(P.el).length === 1 &&
        (F = E.querySelector(P.el)),
      F.length > 0 && (F = F[0]),
      F.classList.add(t.isHorizontal() ? P.horizontalClass : P.verticalClass);
    let V;
    F &&
      ((V = F.querySelector(`.${t.params.scrollbar.dragClass}`)),
      V || ((V = Zi('div', t.params.scrollbar.dragClass)), F.append(V))),
      Object.assign(g, { el: F, dragEl: V }),
      P.draggable && j(),
      F &&
        F.classList[t.enabled ? 'remove' : 'add'](t.params.scrollbar.lockClass);
  }
  function y() {
    const g = t.params.scrollbar,
      E = t.scrollbar.el;
    E &&
      E.classList.remove(
        t.isHorizontal() ? g.horizontalClass : g.verticalClass
      ),
      D();
  }
  i('init', () => {
    t.params.scrollbar.enabled === !1 ? x() : (A(), w(), u());
  }),
    i('update resize observerUpdate lock unlock', () => {
      w();
    }),
    i('setTranslate', () => {
      u();
    }),
    i('setTransition', (g, E) => {
      T(E);
    }),
    i('enable disable', () => {
      const { el: g } = t.scrollbar;
      g &&
        g.classList[t.enabled ? 'remove' : 'add'](t.params.scrollbar.lockClass);
    }),
    i('destroy', () => {
      y();
    });
  const $ = () => {
      t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass),
        t.scrollbar.el &&
          t.scrollbar.el.classList.remove(
            t.params.scrollbar.scrollbarDisabledClass
          ),
        A(),
        w(),
        u();
    },
    x = () => {
      t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass),
        t.scrollbar.el &&
          t.scrollbar.el.classList.add(
            t.params.scrollbar.scrollbarDisabledClass
          ),
        y();
    };
  Object.assign(t.scrollbar, {
    enable: $,
    disable: x,
    updateSize: w,
    setTranslate: u,
    init: A,
    destroy: y,
  });
}
let ti;
function Vc() {
  const e = Ae(),
    t = rt();
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      'scrollBehavior' in t.documentElement.style,
    touch: !!(
      'ontouchstart' in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  };
}
function Yr() {
  return ti || (ti = Vc()), ti;
}
let ni;
function Gc(e) {
  let { userAgent: t } = e === void 0 ? {} : e;
  const n = Yr(),
    i = Ae(),
    s = i.navigator.platform,
    r = t || i.navigator.userAgent,
    o = { ios: !1, android: !1 },
    a = i.screen.width,
    l = i.screen.height,
    c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = r.match(/(iPad).*OS\s([\d_]+)/);
  const f = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    h = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    u = s === 'Win32';
  let T = s === 'MacIntel';
  const w = [
    '1024x1366',
    '1366x1024',
    '834x1194',
    '1194x834',
    '834x1112',
    '1112x834',
    '768x1024',
    '1024x768',
    '820x1180',
    '1180x820',
    '810x1080',
    '1080x810',
  ];
  return (
    !d &&
      T &&
      n.touch &&
      w.indexOf(`${a}x${l}`) >= 0 &&
      ((d = r.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, '13_0_0']),
      (T = !1)),
    c && !u && ((o.os = 'android'), (o.android = !0)),
    (d || h || f) && ((o.os = 'ios'), (o.ios = !0)),
    o
  );
}
function Wc(e) {
  return e === void 0 && (e = {}), ni || (ni = Gc(e)), ni;
}
let ii;
function qc() {
  const e = Ae();
  let t = !1;
  function n() {
    const i = e.navigator.userAgent.toLowerCase();
    return (
      i.indexOf('safari') >= 0 &&
      i.indexOf('chrome') < 0 &&
      i.indexOf('android') < 0
    );
  }
  if (n()) {
    const i = String(e.navigator.userAgent);
    if (i.includes('Version/')) {
      const [s, r] = i
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((o) => Number(o));
      t = s < 16 || (s === 16 && r < 2);
    }
  }
  return {
    isSafari: t || n(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  };
}
function Uc() {
  return ii || (ii = qc()), ii;
}
function Kc(e) {
  let { swiper: t, on: n, emit: i } = e;
  const s = Ae();
  let r = null,
    o = null;
  const a = () => {
      !t || t.destroyed || !t.initialized || (i('beforeResize'), i('resize'));
    },
    l = () => {
      !t ||
        t.destroyed ||
        !t.initialized ||
        ((r = new ResizeObserver((f) => {
          o = s.requestAnimationFrame(() => {
            const { width: h, height: u } = t;
            let T = h,
              w = u;
            f.forEach((C) => {
              let { contentBoxSize: M, contentRect: m, target: b } = C;
              (b && b !== t.el) ||
                ((T = m ? m.width : (M[0] || M).inlineSize),
                (w = m ? m.height : (M[0] || M).blockSize));
            }),
              (T !== h || w !== u) && a();
          });
        })),
        r.observe(t.el));
    },
    c = () => {
      o && s.cancelAnimationFrame(o),
        r && r.unobserve && t.el && (r.unobserve(t.el), (r = null));
    },
    d = () => {
      !t || t.destroyed || !t.initialized || i('orientationchange');
    };
  n('init', () => {
    if (t.params.resizeObserver && typeof s.ResizeObserver < 'u') {
      l();
      return;
    }
    s.addEventListener('resize', a), s.addEventListener('orientationchange', d);
  }),
    n('destroy', () => {
      c(),
        s.removeEventListener('resize', a),
        s.removeEventListener('orientationchange', d);
    });
}
function Yc(e) {
  let { swiper: t, extendParams: n, on: i, emit: s } = e;
  const r = [],
    o = Ae(),
    a = function (d, f) {
      f === void 0 && (f = {});
      const h = o.MutationObserver || o.WebkitMutationObserver,
        u = new h((T) => {
          if (t.__preventObserver__) return;
          if (T.length === 1) {
            s('observerUpdate', T[0]);
            return;
          }
          const w = function () {
            s('observerUpdate', T[0]);
          };
          o.requestAnimationFrame
            ? o.requestAnimationFrame(w)
            : o.setTimeout(w, 0);
        });
      u.observe(d, {
        attributes: typeof f.attributes > 'u' ? !0 : f.attributes,
        childList: typeof f.childList > 'u' ? !0 : f.childList,
        characterData: typeof f.characterData > 'u' ? !0 : f.characterData,
      }),
        r.push(u);
    },
    l = () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const d = Kr(t.hostEl);
          for (let f = 0; f < d.length; f += 1) a(d[f]);
        }
        a(t.hostEl, { childList: t.params.observeSlideChildren }),
          a(t.wrapperEl, { attributes: !1 });
      }
    },
    c = () => {
      r.forEach((d) => {
        d.disconnect();
      }),
        r.splice(0, r.length);
    };
  n({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    i('init', l),
    i('destroy', c);
}
var Xc = {
  on(e, t, n) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i;
    const s = n ? 'unshift' : 'push';
    return (
      e.split(' ').forEach((r) => {
        i.eventsListeners[r] || (i.eventsListeners[r] = []),
          i.eventsListeners[r][s](t);
      }),
      i
    );
  },
  once(e, t, n) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i;
    function s() {
      i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
      for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
        o[a] = arguments[a];
      t.apply(i, o);
    }
    return (s.__emitterProxy = t), i.on(e, s, n);
  },
  onAny(e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != 'function') return n;
    const i = t ? 'unshift' : 'push';
    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e), n;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const n = t.eventsAnyListeners.indexOf(e);
    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
  },
  off(e, t) {
    const n = this;
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(' ').forEach((i) => {
          typeof t > 'u'
            ? (n.eventsListeners[i] = [])
            : n.eventsListeners[i] &&
              n.eventsListeners[i].forEach((s, r) => {
                (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                  n.eventsListeners[i].splice(r, 1);
              });
        }),
      n
    );
  },
  emit() {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e;
    let t, n, i;
    for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
      r[o] = arguments[o];
    return (
      typeof r[0] == 'string' || Array.isArray(r[0])
        ? ((t = r[0]), (n = r.slice(1, r.length)), (i = e))
        : ((t = r[0].events), (n = r[0].data), (i = r[0].context || e)),
      n.unshift(i),
      (Array.isArray(t) ? t : t.split(' ')).forEach((l) => {
        e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((c) => {
            c.apply(i, [l, ...n]);
          }),
          e.eventsListeners &&
            e.eventsListeners[l] &&
            e.eventsListeners[l].forEach((c) => {
              c.apply(i, n);
            });
      }),
      e
    );
  },
};
function Jc() {
  const e = this;
  let t, n;
  const i = e.el;
  typeof e.params.width < 'u' && e.params.width !== null
    ? (t = e.params.width)
    : (t = i.clientWidth),
    typeof e.params.height < 'u' && e.params.height !== null
      ? (n = e.params.height)
      : (n = i.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(ut(i, 'padding-left') || 0, 10) -
        parseInt(ut(i, 'padding-right') || 0, 10)),
      (n =
        n -
        parseInt(ut(i, 'padding-top') || 0, 10) -
        parseInt(ut(i, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, {
        width: t,
        height: n,
        size: e.isHorizontal() ? t : n,
      }));
}
function Zc() {
  const e = this;
  function t(x) {
    return e.isHorizontal()
      ? x
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom',
        }[x];
  }
  function n(x, g) {
    return parseFloat(x.getPropertyValue(t(g)) || 0);
  }
  const i = e.params,
    { wrapperEl: s, slidesEl: r, size: o, rtlTranslate: a, wrongRTL: l } = e,
    c = e.virtual && i.virtual.enabled,
    d = c ? e.virtual.slides.length : e.slides.length,
    f = Ye(r, `.${e.params.slideClass}, swiper-slide`),
    h = c ? e.virtual.slides.length : f.length;
  let u = [];
  const T = [],
    w = [];
  let C = i.slidesOffsetBefore;
  typeof C == 'function' && (C = i.slidesOffsetBefore.call(e));
  let M = i.slidesOffsetAfter;
  typeof M == 'function' && (M = i.slidesOffsetAfter.call(e));
  const m = e.snapGrid.length,
    b = e.slidesGrid.length;
  let _ = i.spaceBetween,
    I = -C,
    j = 0,
    D = 0;
  if (typeof o > 'u') return;
  typeof _ == 'string' && _.indexOf('%') >= 0
    ? (_ = (parseFloat(_.replace('%', '')) / 100) * o)
    : typeof _ == 'string' && (_ = parseFloat(_)),
    (e.virtualSize = -_),
    f.forEach((x) => {
      a ? (x.style.marginLeft = '') : (x.style.marginRight = ''),
        (x.style.marginBottom = ''),
        (x.style.marginTop = '');
    }),
    i.centeredSlides &&
      i.cssMode &&
      (vn(s, '--swiper-centered-offset-before', ''),
      vn(s, '--swiper-centered-offset-after', ''));
  const A = i.grid && i.grid.rows > 1 && e.grid;
  A && e.grid.initSlides(h);
  let y;
  const $ =
    i.slidesPerView === 'auto' &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (x) => typeof i.breakpoints[x].slidesPerView < 'u'
    ).length > 0;
  for (let x = 0; x < h; x += 1) {
    y = 0;
    let g;
    if (
      (f[x] && (g = f[x]),
      A && e.grid.updateSlide(x, g, h, t),
      !(f[x] && ut(g, 'display') === 'none'))
    ) {
      if (i.slidesPerView === 'auto') {
        $ && (f[x].style[t('width')] = '');
        const E = getComputedStyle(g),
          P = g.style.transform,
          F = g.style.webkitTransform;
        if (
          (P && (g.style.transform = 'none'),
          F && (g.style.webkitTransform = 'none'),
          i.roundLengths)
        )
          y = e.isHorizontal() ? xi(g, 'width', !0) : xi(g, 'height', !0);
        else {
          const V = n(E, 'width'),
            Y = n(E, 'padding-left'),
            K = n(E, 'padding-right'),
            Z = n(E, 'margin-left'),
            ke = n(E, 'margin-right'),
            Ee = E.getPropertyValue('box-sizing');
          if (Ee && Ee === 'border-box') y = V + Z + ke;
          else {
            const { clientWidth: ve, offsetWidth: Se } = g;
            y = V + Y + K + Z + ke + (Se - ve);
          }
        }
        P && (g.style.transform = P),
          F && (g.style.webkitTransform = F),
          i.roundLengths && (y = Math.floor(y));
      } else
        (y = (o - (i.slidesPerView - 1) * _) / i.slidesPerView),
          i.roundLengths && (y = Math.floor(y)),
          f[x] && (f[x].style[t('width')] = `${y}px`);
      f[x] && (f[x].swiperSlideSize = y),
        w.push(y),
        i.centeredSlides
          ? ((I = I + y / 2 + j / 2 + _),
            j === 0 && x !== 0 && (I = I - o / 2 - _),
            x === 0 && (I = I - o / 2 - _),
            Math.abs(I) < 1 / 1e3 && (I = 0),
            i.roundLengths && (I = Math.floor(I)),
            D % i.slidesPerGroup === 0 && u.push(I),
            T.push(I))
          : (i.roundLengths && (I = Math.floor(I)),
            (D - Math.min(e.params.slidesPerGroupSkip, D)) %
              e.params.slidesPerGroup ===
              0 && u.push(I),
            T.push(I),
            (I = I + y + _)),
        (e.virtualSize += y + _),
        (j = y),
        (D += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, o) + M),
    a &&
      l &&
      (i.effect === 'slide' || i.effect === 'coverflow') &&
      (s.style.width = `${e.virtualSize + _}px`),
    i.setWrapperSize && (s.style[t('width')] = `${e.virtualSize + _}px`),
    A && e.grid.updateWrapperSize(y, u, t),
    !i.centeredSlides)
  ) {
    const x = [];
    for (let g = 0; g < u.length; g += 1) {
      let E = u[g];
      i.roundLengths && (E = Math.floor(E)),
        u[g] <= e.virtualSize - o && x.push(E);
    }
    (u = x),
      Math.floor(e.virtualSize - o) - Math.floor(u[u.length - 1]) > 1 &&
        u.push(e.virtualSize - o);
  }
  if (c && i.loop) {
    const x = w[0] + _;
    if (i.slidesPerGroup > 1) {
      const g = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup
        ),
        E = x * i.slidesPerGroup;
      for (let P = 0; P < g; P += 1) u.push(u[u.length - 1] + E);
    }
    for (let g = 0; g < e.virtual.slidesBefore + e.virtual.slidesAfter; g += 1)
      i.slidesPerGroup === 1 && u.push(u[u.length - 1] + x),
        T.push(T[T.length - 1] + x),
        (e.virtualSize += x);
  }
  if ((u.length === 0 && (u = [0]), _ !== 0)) {
    const x = e.isHorizontal() && a ? 'marginLeft' : t('marginRight');
    f.filter((g, E) =>
      !i.cssMode || i.loop ? !0 : E !== f.length - 1
    ).forEach((g) => {
      g.style[x] = `${_}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let x = 0;
    w.forEach((E) => {
      x += E + (_ || 0);
    }),
      (x -= _);
    const g = x - o;
    u = u.map((E) => (E <= 0 ? -C : E > g ? g + M : E));
  }
  if (i.centerInsufficientSlides) {
    let x = 0;
    if (
      (w.forEach((g) => {
        x += g + (_ || 0);
      }),
      (x -= _),
      x < o)
    ) {
      const g = (o - x) / 2;
      u.forEach((E, P) => {
        u[P] = E - g;
      }),
        T.forEach((E, P) => {
          T[P] = E + g;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: f,
      snapGrid: u,
      slidesGrid: T,
      slidesSizesGrid: w,
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    vn(s, '--swiper-centered-offset-before', `${-u[0]}px`),
      vn(
        s,
        '--swiper-centered-offset-after',
        `${e.size / 2 - w[w.length - 1] / 2}px`
      );
    const x = -e.snapGrid[0],
      g = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((E) => E + x)),
      (e.slidesGrid = e.slidesGrid.map((E) => E + g));
  }
  if (
    (h !== d && e.emit('slidesLengthChange'),
    u.length !== m &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit('snapGridLengthChange')),
    T.length !== b && e.emit('slidesGridLengthChange'),
    i.watchSlidesProgress && e.updateSlidesOffset(),
    !c && !i.cssMode && (i.effect === 'slide' || i.effect === 'fade'))
  ) {
    const x = `${i.containerModifierClass}backface-hidden`,
      g = e.el.classList.contains(x);
    h <= i.maxBackfaceHiddenSlides
      ? g || e.el.classList.add(x)
      : g && e.el.classList.remove(x);
  }
}
function Qc(e) {
  const t = this,
    n = [],
    i = t.virtual && t.params.virtual.enabled;
  let s = 0,
    r;
  typeof e == 'number'
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const o = (a) => (i ? t.slides[t.getSlideIndexByData(a)] : t.slides[a]);
  if (t.params.slidesPerView !== 'auto' && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        n.push(a);
      });
    else
      for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
        const a = t.activeIndex + r;
        if (a > t.slides.length && !i) break;
        n.push(o(a));
      }
  else n.push(o(t.activeIndex));
  for (r = 0; r < n.length; r += 1)
    if (typeof n[r] < 'u') {
      const a = n[r].offsetHeight;
      s = a > s ? a : s;
    }
  (s || s === 0) && (t.wrapperEl.style.height = `${s}px`);
}
function ed() {
  const e = this,
    t = e.slides,
    n = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < t.length; i += 1)
    t[i].swiperSlideOffset =
      (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
      n -
      e.cssOverflowAdjustment();
}
function td(e) {
  e === void 0 && (e = (this && this.translate) || 0);
  const t = this,
    n = t.params,
    { slides: i, rtlTranslate: s, snapGrid: r } = t;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > 'u' && t.updateSlidesOffset();
  let o = -e;
  s && (o = e),
    i.forEach((l) => {
      l.classList.remove(n.slideVisibleClass);
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = []);
  let a = n.spaceBetween;
  typeof a == 'string' && a.indexOf('%') >= 0
    ? (a = (parseFloat(a.replace('%', '')) / 100) * t.size)
    : typeof a == 'string' && (a = parseFloat(a));
  for (let l = 0; l < i.length; l += 1) {
    const c = i[l];
    let d = c.swiperSlideOffset;
    n.cssMode && n.centeredSlides && (d -= i[0].swiperSlideOffset);
    const f =
        (o + (n.centeredSlides ? t.minTranslate() : 0) - d) /
        (c.swiperSlideSize + a),
      h =
        (o - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - d) /
        (c.swiperSlideSize + a),
      u = -(o - d),
      T = u + t.slidesSizesGrid[l];
    ((u >= 0 && u < t.size - 1) ||
      (T > 1 && T <= t.size) ||
      (u <= 0 && T >= t.size)) &&
      (t.visibleSlides.push(c),
      t.visibleSlidesIndexes.push(l),
      i[l].classList.add(n.slideVisibleClass)),
      (c.progress = s ? -f : f),
      (c.originalProgress = s ? -h : h);
  }
}
function nd(e) {
  const t = this;
  if (typeof e > 'u') {
    const d = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * d) || 0;
  }
  const n = t.params,
    i = t.maxTranslate() - t.minTranslate();
  let { progress: s, isBeginning: r, isEnd: o, progressLoop: a } = t;
  const l = r,
    c = o;
  if (i === 0) (s = 0), (r = !0), (o = !0);
  else {
    s = (e - t.minTranslate()) / i;
    const d = Math.abs(e - t.minTranslate()) < 1,
      f = Math.abs(e - t.maxTranslate()) < 1;
    (r = d || s <= 0), (o = f || s >= 1), d && (s = 0), f && (s = 1);
  }
  if (n.loop) {
    const d = t.getSlideIndexByData(0),
      f = t.getSlideIndexByData(t.slides.length - 1),
      h = t.slidesGrid[d],
      u = t.slidesGrid[f],
      T = t.slidesGrid[t.slidesGrid.length - 1],
      w = Math.abs(e);
    w >= h ? (a = (w - h) / T) : (a = (w + T - u) / T), a > 1 && (a -= 1);
  }
  Object.assign(t, { progress: s, progressLoop: a, isBeginning: r, isEnd: o }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    r && !l && t.emit('reachBeginning toEdge'),
    o && !c && t.emit('reachEnd toEdge'),
    ((l && !r) || (c && !o)) && t.emit('fromEdge'),
    t.emit('progress', s);
}
function id() {
  const e = this,
    { slides: t, params: n, slidesEl: i, activeIndex: s } = e,
    r = e.virtual && n.virtual.enabled,
    o = (l) => Ye(i, `.${n.slideClass}${l}, swiper-slide${l}`)[0];
  t.forEach((l) => {
    l.classList.remove(n.slideActiveClass, n.slideNextClass, n.slidePrevClass);
  });
  let a;
  if (r)
    if (n.loop) {
      let l = s - e.virtual.slidesBefore;
      l < 0 && (l = e.virtual.slides.length + l),
        l >= e.virtual.slides.length && (l -= e.virtual.slides.length),
        (a = o(`[data-swiper-slide-index="${l}"]`));
    } else a = o(`[data-swiper-slide-index="${s}"]`);
  else a = t[s];
  if (a) {
    a.classList.add(n.slideActiveClass);
    let l = Rc(a, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !l && (l = t[0]), l && l.classList.add(n.slideNextClass);
    let c = Nc(a, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !c === 0 && (c = t[t.length - 1]),
      c && c.classList.add(n.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const xn = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const n = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      i = t.closest(n());
    if (i) {
      let s = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      !s &&
        e.isElement &&
        (i.shadowRoot
          ? (s = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              i.shadowRoot &&
                ((s = i.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`
                )),
                s && s.remove());
            })),
        s && s.remove();
    }
  },
  si = (e, t) => {
    if (!e.slides[t]) return;
    const n = e.slides[t].querySelector('[loading="lazy"]');
    n && n.removeAttribute('loading');
  },
  Si = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const n = e.slides.length;
    if (!n || !t || t < 0) return;
    t = Math.min(t, n);
    const i =
        e.params.slidesPerView === 'auto'
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      s = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
      const o = s,
        a = [o - t];
      a.push(...Array.from({ length: t }).map((l, c) => o + i + c)),
        e.slides.forEach((l, c) => {
          a.includes(l.column) && si(e, c);
        });
      return;
    }
    const r = s + i - 1;
    if (e.params.rewind || e.params.loop)
      for (let o = s - t; o <= r + t; o += 1) {
        const a = ((o % n) + n) % n;
        (a < s || a > r) && si(e, a);
      }
    else
      for (let o = Math.max(s - t, 0); o <= Math.min(r + t, n - 1); o += 1)
        o !== s && (o > r || o < s) && si(e, o);
  };
function sd(e) {
  const { slidesGrid: t, params: n } = e,
    i = e.rtlTranslate ? e.translate : -e.translate;
  let s;
  for (let r = 0; r < t.length; r += 1)
    typeof t[r + 1] < 'u'
      ? i >= t[r] && i < t[r + 1] - (t[r + 1] - t[r]) / 2
        ? (s = r)
        : i >= t[r] && i < t[r + 1] && (s = r + 1)
      : i >= t[r] && (s = r);
  return n.normalizeSlideIndex && (s < 0 || typeof s > 'u') && (s = 0), s;
}
function rd(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: i, params: s, activeIndex: r, realIndex: o, snapIndex: a } = t;
  let l = e,
    c;
  const d = (h) => {
    let u = h - t.virtual.slidesBefore;
    return (
      u < 0 && (u = t.virtual.slides.length + u),
      u >= t.virtual.slides.length && (u -= t.virtual.slides.length),
      u
    );
  };
  if ((typeof l > 'u' && (l = sd(t)), i.indexOf(n) >= 0)) c = i.indexOf(n);
  else {
    const h = Math.min(s.slidesPerGroupSkip, l);
    c = h + Math.floor((l - h) / s.slidesPerGroup);
  }
  if ((c >= i.length && (c = i.length - 1), l === r)) {
    c !== a && ((t.snapIndex = c), t.emit('snapIndexChange')),
      t.params.loop &&
        t.virtual &&
        t.params.virtual.enabled &&
        (t.realIndex = d(l));
    return;
  }
  let f;
  t.virtual && s.virtual.enabled && s.loop
    ? (f = d(l))
    : t.slides[l]
    ? (f = parseInt(
        t.slides[l].getAttribute('data-swiper-slide-index') || l,
        10
      ))
    : (f = l),
    Object.assign(t, {
      previousSnapIndex: a,
      snapIndex: c,
      previousRealIndex: o,
      realIndex: f,
      previousIndex: r,
      activeIndex: l,
    }),
    t.initialized && Si(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) &&
      (o !== f && t.emit('realIndexChange'), t.emit('slideChange'));
}
function od(e, t) {
  const n = this,
    i = n.params;
  let s = e.closest(`.${i.slideClass}, swiper-slide`);
  !s &&
    n.isElement &&
    t &&
    t.length > 1 &&
    t.includes(e) &&
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((a) => {
      !s && a.matches && a.matches(`.${i.slideClass}, swiper-slide`) && (s = a);
    });
  let r = !1,
    o;
  if (s) {
    for (let a = 0; a < n.slides.length; a += 1)
      if (n.slides[a] === s) {
        (r = !0), (o = a);
        break;
      }
  }
  if (s && r)
    (n.clickedSlide = s),
      n.virtual && n.params.virtual.enabled
        ? (n.clickedIndex = parseInt(
            s.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (n.clickedIndex = o);
  else {
    (n.clickedSlide = void 0), (n.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    n.clickedIndex !== void 0 &&
    n.clickedIndex !== n.activeIndex &&
    n.slideToClickedSlide();
}
var ld = {
  updateSize: Jc,
  updateSlides: Zc,
  updateAutoHeight: Qc,
  updateSlidesOffset: ed,
  updateSlidesProgress: td,
  updateProgress: nd,
  updateSlidesClasses: id,
  updateActiveIndex: rd,
  updateClickedSlide: od,
};
function ad(e) {
  e === void 0 && (e = this.isHorizontal() ? 'x' : 'y');
  const t = this,
    { params: n, rtlTranslate: i, translate: s, wrapperEl: r } = t;
  if (n.virtualTranslate) return i ? -s : s;
  if (n.cssMode) return s;
  let o = zc(r, e);
  return (o += t.cssOverflowAdjustment()), i && (o = -o), o || 0;
}
function cd(e, t) {
  const n = this,
    { rtlTranslate: i, params: s, wrapperEl: r, progress: o } = n;
  let a = 0,
    l = 0;
  const c = 0;
  n.isHorizontal() ? (a = i ? -e : e) : (l = e),
    s.roundLengths && ((a = Math.floor(a)), (l = Math.floor(l))),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? a : l),
    s.cssMode
      ? (r[n.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = n.isHorizontal()
          ? -a
          : -l)
      : s.virtualTranslate ||
        (n.isHorizontal()
          ? (a -= n.cssOverflowAdjustment())
          : (l -= n.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${a}px, ${l}px, ${c}px)`));
  let d;
  const f = n.maxTranslate() - n.minTranslate();
  f === 0 ? (d = 0) : (d = (e - n.minTranslate()) / f),
    d !== o && n.updateProgress(e),
    n.emit('setTranslate', n.translate, t);
}
function dd() {
  return -this.snapGrid[0];
}
function fd() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function ud(e, t, n, i, s) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    i === void 0 && (i = !0);
  const r = this,
    { params: o, wrapperEl: a } = r;
  if (r.animating && o.preventInteractionOnTransition) return !1;
  const l = r.minTranslate(),
    c = r.maxTranslate();
  let d;
  if (
    (i && e > l ? (d = l) : i && e < c ? (d = c) : (d = e),
    r.updateProgress(d),
    o.cssMode)
  ) {
    const f = r.isHorizontal();
    if (t === 0) a[f ? 'scrollLeft' : 'scrollTop'] = -d;
    else {
      if (!r.support.smoothScroll)
        return (
          Ur({ swiper: r, targetPosition: -d, side: f ? 'left' : 'top' }), !0
        );
      a.scrollTo({ [f ? 'left' : 'top']: -d, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    t === 0
      ? (r.setTransition(0),
        r.setTranslate(d),
        n && (r.emit('beforeTransitionStart', t, s), r.emit('transitionEnd')))
      : (r.setTransition(t),
        r.setTranslate(d),
        n && (r.emit('beforeTransitionStart', t, s), r.emit('transitionStart')),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (h) {
              !r ||
                r.destroyed ||
                (h.target === this &&
                  (r.wrapperEl.removeEventListener(
                    'transitionend',
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  n && r.emit('transitionEnd')));
            }),
          r.wrapperEl.addEventListener(
            'transitionend',
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var pd = {
  getTranslate: ad,
  setTranslate: cd,
  minTranslate: dd,
  maxTranslate: fd,
  translateTo: ud,
};
function hd(e, t) {
  const n = this;
  n.params.cssMode ||
    ((n.wrapperEl.style.transitionDuration = `${e}ms`),
    (n.wrapperEl.style.transitionDelay = e === 0 ? '0ms' : '')),
    n.emit('setTransition', e, t);
}
function Xr(e) {
  let { swiper: t, runCallbacks: n, direction: i, step: s } = e;
  const { activeIndex: r, previousIndex: o } = t;
  let a = i;
  if (
    (a || (r > o ? (a = 'next') : r < o ? (a = 'prev') : (a = 'reset')),
    t.emit(`transition${s}`),
    n && r !== o)
  ) {
    if (a === 'reset') {
      t.emit(`slideResetTransition${s}`);
      return;
    }
    t.emit(`slideChangeTransition${s}`),
      a === 'next'
        ? t.emit(`slideNextTransition${s}`)
        : t.emit(`slidePrevTransition${s}`);
  }
}
function md(e, t) {
  e === void 0 && (e = !0);
  const n = this,
    { params: i } = n;
  i.cssMode ||
    (i.autoHeight && n.updateAutoHeight(),
    Xr({ swiper: n, runCallbacks: e, direction: t, step: 'Start' }));
}
function gd(e, t) {
  e === void 0 && (e = !0);
  const n = this,
    { params: i } = n;
  (n.animating = !1),
    !i.cssMode &&
      (n.setTransition(0),
      Xr({ swiper: n, runCallbacks: e, direction: t, step: 'End' }));
}
var vd = { setTransition: hd, transitionStart: md, transitionEnd: gd };
function bd(e, t, n, i, s) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    typeof e == 'string' && (e = parseInt(e, 10));
  const r = this;
  let o = e;
  o < 0 && (o = 0);
  const {
    params: a,
    snapGrid: l,
    slidesGrid: c,
    previousIndex: d,
    activeIndex: f,
    rtlTranslate: h,
    wrapperEl: u,
    enabled: T,
  } = r;
  if ((r.animating && a.preventInteractionOnTransition) || (!T && !i && !s))
    return !1;
  const w = Math.min(r.params.slidesPerGroupSkip, o);
  let C = w + Math.floor((o - w) / r.params.slidesPerGroup);
  C >= l.length && (C = l.length - 1);
  const M = -l[C];
  if (a.normalizeSlideIndex)
    for (let b = 0; b < c.length; b += 1) {
      const _ = -Math.floor(M * 100),
        I = Math.floor(c[b] * 100),
        j = Math.floor(c[b + 1] * 100);
      typeof c[b + 1] < 'u'
        ? _ >= I && _ < j - (j - I) / 2
          ? (o = b)
          : _ >= I && _ < j && (o = b + 1)
        : _ >= I && (o = b);
    }
  if (
    r.initialized &&
    o !== f &&
    ((!r.allowSlideNext &&
      (h
        ? M > r.translate && M > r.minTranslate()
        : M < r.translate && M < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        M > r.translate &&
        M > r.maxTranslate() &&
        (f || 0) !== o))
  )
    return !1;
  o !== (d || 0) && n && r.emit('beforeSlideChangeStart'), r.updateProgress(M);
  let m;
  if (
    (o > f ? (m = 'next') : o < f ? (m = 'prev') : (m = 'reset'),
    (h && -M === r.translate) || (!h && M === r.translate))
  )
    return (
      r.updateActiveIndex(o),
      a.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      a.effect !== 'slide' && r.setTranslate(M),
      m !== 'reset' && (r.transitionStart(n, m), r.transitionEnd(n, m)),
      !1
    );
  if (a.cssMode) {
    const b = r.isHorizontal(),
      _ = h ? M : -M;
    if (t === 0) {
      const I = r.virtual && r.params.virtual.enabled;
      I &&
        ((r.wrapperEl.style.scrollSnapType = 'none'),
        (r._immediateVirtual = !0)),
        I && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              u[b ? 'scrollLeft' : 'scrollTop'] = _;
            }))
          : (u[b ? 'scrollLeft' : 'scrollTop'] = _),
        I &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ''), (r._immediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          Ur({ swiper: r, targetPosition: _, side: b ? 'left' : 'top' }), !0
        );
      u.scrollTo({ [b ? 'left' : 'top']: _, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    r.setTransition(t),
    r.setTranslate(M),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit('beforeTransitionStart', t, i),
    r.transitionStart(n, m),
    t === 0
      ? r.transitionEnd(n, m)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (_) {
            !r ||
              r.destroyed ||
              (_.target === this &&
                (r.wrapperEl.removeEventListener(
                  'transitionend',
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(n, m)));
          }),
        r.wrapperEl.addEventListener(
          'transitionend',
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function wd(e, t, n, i) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    typeof e == 'string' && (e = parseInt(e, 10));
  const s = this;
  let r = e;
  return (
    s.params.loop &&
      (s.virtual && s.params.virtual.enabled
        ? (r = r + s.virtual.slidesBefore)
        : (r = s.getSlideIndexByData(r))),
    s.slideTo(r, t, n, i)
  );
}
function yd(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const i = this,
    { enabled: s, params: r, animating: o } = i;
  if (!s) return i;
  let a = r.slidesPerGroup;
  r.slidesPerView === 'auto' &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (a = Math.max(i.slidesPerViewDynamic('current', !0), 1));
  const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : a,
    c = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (o && !c && r.loopPreventsSliding) return !1;
    if (
      (i.loopFix({ direction: 'next' }),
      (i._clientLeft = i.wrapperEl.clientLeft),
      i.activeIndex === i.slides.length - 1 && r.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + l, e, t, n);
        }),
        !0
      );
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, e, t, n)
    : i.slideTo(i.activeIndex + l, e, t, n);
}
function _d(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const i = this,
    {
      params: s,
      snapGrid: r,
      slidesGrid: o,
      rtlTranslate: a,
      enabled: l,
      animating: c,
    } = i;
  if (!l) return i;
  const d = i.virtual && s.virtual.enabled;
  if (s.loop) {
    if (c && !d && s.loopPreventsSliding) return !1;
    i.loopFix({ direction: 'prev' }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const f = a ? i.translate : -i.translate;
  function h(M) {
    return M < 0 ? -Math.floor(Math.abs(M)) : Math.floor(M);
  }
  const u = h(f),
    T = r.map((M) => h(M));
  let w = r[T.indexOf(u) - 1];
  if (typeof w > 'u' && s.cssMode) {
    let M;
    r.forEach((m, b) => {
      u >= m && (M = b);
    }),
      typeof M < 'u' && (w = r[M > 0 ? M - 1 : M]);
  }
  let C = 0;
  if (
    (typeof w < 'u' &&
      ((C = o.indexOf(w)),
      C < 0 && (C = i.activeIndex - 1),
      s.slidesPerView === 'auto' &&
        s.slidesPerGroup === 1 &&
        s.slidesPerGroupAuto &&
        ((C = C - i.slidesPerViewDynamic('previous', !0) + 1),
        (C = Math.max(C, 0)))),
    s.rewind && i.isBeginning)
  ) {
    const M =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(M, e, t, n);
  } else if (s.loop && i.activeIndex === 0 && s.cssMode)
    return (
      requestAnimationFrame(() => {
        i.slideTo(C, e, t, n);
      }),
      !0
    );
  return i.slideTo(C, e, t, n);
}
function xd(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const i = this;
  return i.slideTo(i.activeIndex, e, t, n);
}
function Sd(e, t, n, i) {
  e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    i === void 0 && (i = 0.5);
  const s = this;
  let r = s.activeIndex;
  const o = Math.min(s.params.slidesPerGroupSkip, r),
    a = o + Math.floor((r - o) / s.params.slidesPerGroup),
    l = s.rtlTranslate ? s.translate : -s.translate;
  if (l >= s.snapGrid[a]) {
    const c = s.snapGrid[a],
      d = s.snapGrid[a + 1];
    l - c > (d - c) * i && (r += s.params.slidesPerGroup);
  } else {
    const c = s.snapGrid[a - 1],
      d = s.snapGrid[a];
    l - c <= (d - c) * i && (r -= s.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, s.slidesGrid.length - 1)),
    s.slideTo(r, e, t, n)
  );
}
function Td() {
  const e = this,
    { params: t, slidesEl: n } = e,
    i = t.slidesPerView === 'auto' ? e.slidesPerViewDynamic() : t.slidesPerView;
  let s = e.clickedIndex,
    r;
  const o = e.isElement ? 'swiper-slide' : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating) return;
    (r = parseInt(e.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      t.centeredSlides
        ? s < e.loopedSlides - i / 2 ||
          s > e.slides.length - e.loopedSlides + i / 2
          ? (e.loopFix(),
            (s = e.getSlideIndex(
              Ye(n, `${o}[data-swiper-slide-index="${r}"]`)[0]
            )),
            An(() => {
              e.slideTo(s);
            }))
          : e.slideTo(s)
        : s > e.slides.length - i
        ? (e.loopFix(),
          (s = e.getSlideIndex(
            Ye(n, `${o}[data-swiper-slide-index="${r}"]`)[0]
          )),
          An(() => {
            e.slideTo(s);
          }))
        : e.slideTo(s);
  } else e.slideTo(s);
}
var Ed = {
  slideTo: bd,
  slideToLoop: wd,
  slideNext: yd,
  slidePrev: _d,
  slideReset: xd,
  slideToClosest: Sd,
  slideToClickedSlide: Td,
};
function Cd(e) {
  const t = this,
    { params: n, slidesEl: i } = t;
  if (!n.loop || (t.virtual && t.params.virtual.enabled)) return;
  Ye(i, `.${n.slideClass}, swiper-slide`).forEach((r, o) => {
    r.setAttribute('data-swiper-slide-index', o);
  }),
    t.loopFix({
      slideRealIndex: e,
      direction: n.centeredSlides ? void 0 : 'next',
    });
}
function Md(e) {
  let {
    slideRealIndex: t,
    slideTo: n = !0,
    direction: i,
    setTranslate: s,
    activeSlideIndex: r,
    byController: o,
    byMousewheel: a,
  } = e === void 0 ? {} : e;
  const l = this;
  if (!l.params.loop) return;
  l.emit('beforeLoopFix');
  const {
    slides: c,
    allowSlidePrev: d,
    allowSlideNext: f,
    slidesEl: h,
    params: u,
  } = l;
  if (
    ((l.allowSlidePrev = !0),
    (l.allowSlideNext = !0),
    l.virtual && u.virtual.enabled)
  ) {
    n &&
      (!u.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : u.centeredSlides && l.snapIndex < u.slidesPerView
        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
        : l.snapIndex === l.snapGrid.length - 1 &&
          l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = d),
      (l.allowSlideNext = f),
      l.emit('loopFix');
    return;
  }
  const T =
    u.slidesPerView === 'auto'
      ? l.slidesPerViewDynamic()
      : Math.ceil(parseFloat(u.slidesPerView, 10));
  let w = u.loopedSlides || T;
  w % u.slidesPerGroup !== 0 &&
    (w += u.slidesPerGroup - (w % u.slidesPerGroup)),
    (l.loopedSlides = w);
  const C = [],
    M = [];
  let m = l.activeIndex;
  typeof r > 'u'
    ? (r = l.getSlideIndex(
        l.slides.filter((D) => D.classList.contains(u.slideActiveClass))[0]
      ))
    : (m = r);
  const b = i === 'next' || !i,
    _ = i === 'prev' || !i;
  let I = 0,
    j = 0;
  if (r < w) {
    I = Math.max(w - r, u.slidesPerGroup);
    for (let D = 0; D < w - r; D += 1) {
      const A = D - Math.floor(D / c.length) * c.length;
      C.push(c.length - A - 1);
    }
  } else if (r > l.slides.length - w * 2) {
    j = Math.max(r - (l.slides.length - w * 2), u.slidesPerGroup);
    for (let D = 0; D < j; D += 1) {
      const A = D - Math.floor(D / c.length) * c.length;
      M.push(A);
    }
  }
  if (
    (_ &&
      C.forEach((D) => {
        (l.slides[D].swiperLoopMoveDOM = !0),
          h.prepend(l.slides[D]),
          (l.slides[D].swiperLoopMoveDOM = !1);
      }),
    b &&
      M.forEach((D) => {
        (l.slides[D].swiperLoopMoveDOM = !0),
          h.append(l.slides[D]),
          (l.slides[D].swiperLoopMoveDOM = !1);
      }),
    l.recalcSlides(),
    u.slidesPerView === 'auto' && l.updateSlides(),
    u.watchSlidesProgress && l.updateSlidesOffset(),
    n)
  ) {
    if (C.length > 0 && _)
      if (typeof t > 'u') {
        const D = l.slidesGrid[m],
          y = l.slidesGrid[m + I] - D;
        a
          ? l.setTranslate(l.translate - y)
          : (l.slideTo(m + I, 0, !1, !0),
            s &&
              ((l.touches[l.isHorizontal() ? 'startX' : 'startY'] += y),
              (l.touchEventsData.currentTranslate = l.translate)));
      } else
        s &&
          (l.slideToLoop(t, 0, !1, !0),
          (l.touchEventsData.currentTranslate = l.translate));
    else if (M.length > 0 && b)
      if (typeof t > 'u') {
        const D = l.slidesGrid[m],
          y = l.slidesGrid[m - j] - D;
        a
          ? l.setTranslate(l.translate - y)
          : (l.slideTo(m - j, 0, !1, !0),
            s &&
              ((l.touches[l.isHorizontal() ? 'startX' : 'startY'] += y),
              (l.touchEventsData.currentTranslate = l.translate)));
      } else l.slideToLoop(t, 0, !1, !0);
  }
  if (
    ((l.allowSlidePrev = d),
    (l.allowSlideNext = f),
    l.controller && l.controller.control && !o)
  ) {
    const D = {
      slideRealIndex: t,
      direction: i,
      setTranslate: s,
      activeSlideIndex: r,
      byController: !0,
    };
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((A) => {
          !A.destroyed &&
            A.params.loop &&
            A.loopFix({
              ...D,
              slideTo: A.params.slidesPerView === u.slidesPerView ? n : !1,
            });
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix({
          ...D,
          slideTo:
            l.controller.control.params.slidesPerView === u.slidesPerView
              ? n
              : !1,
        });
  }
  l.emit('loopFix');
}
function Pd() {
  const e = this,
    { params: t, slidesEl: n } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const i = [];
  e.slides.forEach((s) => {
    const r =
      typeof s.swiperSlideIndex > 'u'
        ? s.getAttribute('data-swiper-slide-index') * 1
        : s.swiperSlideIndex;
    i[r] = s;
  }),
    e.slides.forEach((s) => {
      s.removeAttribute('data-swiper-slide-index');
    }),
    i.forEach((s) => {
      n.append(s);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0);
}
var Od = { loopCreate: Cd, loopFix: Md, loopDestroy: Pd };
function Ad(e) {
  const t = this;
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const n = t.params.touchEventsTarget === 'container' ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0),
    (n.style.cursor = 'move'),
    (n.style.cursor = e ? 'grabbing' : 'grab'),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      });
}
function Ld() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
var Id = { setGrabCursor: Ad, unsetGrabCursor: Ld };
function kd(e, t) {
  t === void 0 && (t = this);
  function n(i) {
    if (!i || i === rt() || i === Ae()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const s = i.closest(e);
    return !s && !i.getRootNode ? null : s || n(i.getRootNode().host);
  }
  return n(t);
}
function $d(e) {
  const t = this,
    n = rt(),
    i = Ae(),
    s = t.touchEventsData;
  s.evCache.push(e);
  const { params: r, touches: o, enabled: a } = t;
  if (
    !a ||
    (!r.simulateTouch && e.pointerType === 'mouse') ||
    (t.animating && r.preventInteractionOnTransition)
  )
    return;
  !t.animating && r.cssMode && r.loop && t.loopFix();
  let l = e;
  l.originalEvent && (l = l.originalEvent);
  let c = l.target;
  if (
    (r.touchEventsTarget === 'wrapper' && !t.wrapperEl.contains(c)) ||
    ('which' in l && l.which === 3) ||
    ('button' in l && l.button > 0) ||
    (s.isTouched && s.isMoved)
  )
    return;
  const d = !!r.noSwipingClass && r.noSwipingClass !== '',
    f = e.composedPath ? e.composedPath() : e.path;
  d && l.target && l.target.shadowRoot && f && (c = f[0]);
  const h = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    u = !!(l.target && l.target.shadowRoot);
  if (r.noSwiping && (u ? kd(h, c) : c.closest(h))) {
    t.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !c.closest(r.swipeHandler)) return;
  (o.currentX = l.pageX), (o.currentY = l.pageY);
  const T = o.currentX,
    w = o.currentY,
    C = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    M = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (C && (T <= M || T >= i.innerWidth - M))
    if (C === 'prevent') e.preventDefault();
    else return;
  Object.assign(s, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (o.startX = T),
    (o.startY = w),
    (s.touchStartTime = Ln()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    r.threshold > 0 && (s.allowThresholdMove = !1);
  let m = !0;
  c.matches(s.focusableElements) &&
    ((m = !1), c.nodeName === 'SELECT' && (s.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(s.focusableElements) &&
      n.activeElement !== c &&
      n.activeElement.blur();
  const b = m && t.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || b) &&
    !c.isContentEditable &&
    l.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !r.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit('touchStart', l);
}
function zd(e) {
  const t = rt(),
    n = this,
    i = n.touchEventsData,
    { params: s, touches: r, rtlTranslate: o, enabled: a } = n;
  if (!a || (!s.simulateTouch && e.pointerType === 'mouse')) return;
  let l = e;
  if ((l.originalEvent && (l = l.originalEvent), !i.isTouched)) {
    i.startMoving && i.isScrolling && n.emit('touchMoveOpposite', l);
    return;
  }
  const c = i.evCache.findIndex((D) => D.pointerId === l.pointerId);
  c >= 0 && (i.evCache[c] = l);
  const d = i.evCache.length > 1 ? i.evCache[0] : l,
    f = d.pageX,
    h = d.pageY;
  if (l.preventedByNestedSwiper) {
    (r.startX = f), (r.startY = h);
    return;
  }
  if (!n.allowTouchMove) {
    l.target.matches(i.focusableElements) || (n.allowClick = !1),
      i.isTouched &&
        (Object.assign(r, {
          startX: f,
          startY: h,
          prevX: n.touches.currentX,
          prevY: n.touches.currentY,
          currentX: f,
          currentY: h,
        }),
        (i.touchStartTime = Ln()));
    return;
  }
  if (s.touchReleaseOnEdges && !s.loop) {
    if (n.isVertical()) {
      if (
        (h < r.startY && n.translate <= n.maxTranslate()) ||
        (h > r.startY && n.translate >= n.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (f < r.startX && n.translate <= n.maxTranslate()) ||
      (f > r.startX && n.translate >= n.minTranslate())
    )
      return;
  }
  if (
    t.activeElement &&
    l.target === t.activeElement &&
    l.target.matches(i.focusableElements)
  ) {
    (i.isMoved = !0), (n.allowClick = !1);
    return;
  }
  if (
    (i.allowTouchCallbacks && n.emit('touchMove', l),
    l.targetTouches && l.targetTouches.length > 1)
  )
    return;
  (r.currentX = f), (r.currentY = h);
  const u = r.currentX - r.startX,
    T = r.currentY - r.startY;
  if (n.params.threshold && Math.sqrt(u ** 2 + T ** 2) < n.params.threshold)
    return;
  if (typeof i.isScrolling > 'u') {
    let D;
    (n.isHorizontal() && r.currentY === r.startY) ||
    (n.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : u * u + T * T >= 25 &&
        ((D = (Math.atan2(Math.abs(T), Math.abs(u)) * 180) / Math.PI),
        (i.isScrolling = n.isHorizontal()
          ? D > s.touchAngle
          : 90 - D > s.touchAngle));
  }
  if (
    (i.isScrolling && n.emit('touchMoveOpposite', l),
    typeof i.startMoving > 'u' &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (n.zoom &&
        n.params.zoom &&
        n.params.zoom.enabled &&
        i.evCache.length > 1))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (n.allowClick = !1),
    !s.cssMode && l.cancelable && l.preventDefault(),
    s.touchMoveStopPropagation && !s.nested && l.stopPropagation();
  let w = n.isHorizontal() ? u : T,
    C = n.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  s.oneWayMovement &&
    ((w = Math.abs(w) * (o ? 1 : -1)), (C = Math.abs(C) * (o ? 1 : -1))),
    (r.diff = w),
    (w *= s.touchRatio),
    o && ((w = -w), (C = -C));
  const M = n.touchesDirection;
  (n.swipeDirection = w > 0 ? 'prev' : 'next'),
    (n.touchesDirection = C > 0 ? 'prev' : 'next');
  const m = n.params.loop && !s.cssMode,
    b =
      (n.swipeDirection === 'next' && n.allowSlideNext) ||
      (n.swipeDirection === 'prev' && n.allowSlidePrev);
  if (!i.isMoved) {
    if (
      (m && b && n.loopFix({ direction: n.swipeDirection }),
      (i.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const D = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
      });
      n.wrapperEl.dispatchEvent(D);
    }
    (i.allowMomentumBounce = !1),
      s.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit('sliderFirstMove', l);
  }
  let _;
  i.isMoved &&
    M !== n.touchesDirection &&
    m &&
    b &&
    Math.abs(w) >= 1 &&
    (n.loopFix({ direction: n.swipeDirection, setTranslate: !0 }), (_ = !0)),
    n.emit('sliderMove', l),
    (i.isMoved = !0),
    (i.currentTranslate = w + i.startTranslate);
  let I = !0,
    j = s.resistanceRatio;
  if (
    (s.touchReleaseOnEdges && (j = 0),
    w > 0
      ? (m &&
          b &&
          !_ &&
          i.currentTranslate >
            (s.centeredSlides
              ? n.minTranslate() - n.size / 2
              : n.minTranslate()) &&
          n.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > n.minTranslate() &&
          ((I = !1),
          s.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + w) ** j)))
      : w < 0 &&
        (m &&
          b &&
          !_ &&
          i.currentTranslate <
            (s.centeredSlides
              ? n.maxTranslate() + n.size / 2
              : n.maxTranslate()) &&
          n.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (s.slidesPerView === 'auto'
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(s.slidesPerView, 10))),
          }),
        i.currentTranslate < n.maxTranslate() &&
          ((I = !1),
          s.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - w) ** j))),
    I && (l.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === 'next' &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === 'prev' &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !n.allowSlidePrev &&
      !n.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    s.threshold > 0)
  )
    if (Math.abs(w) > s.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          (r.diff = n.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !s.followFinger ||
    s.cssMode ||
    (((s.freeMode && s.freeMode.enabled && n.freeMode) ||
      s.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    s.freeMode && s.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
    n.updateProgress(i.currentTranslate),
    n.setTranslate(i.currentTranslate));
}
function Bd(e) {
  const t = this,
    n = t.touchEventsData,
    i = n.evCache.findIndex((b) => b.pointerId === e.pointerId);
  if (
    (i >= 0 && n.evCache.splice(i, 1),
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      e.type
    ) &&
      !(
        ['pointercancel', 'contextmenu'].includes(e.type) &&
        (t.browser.isSafari || t.browser.isWebView)
      ))
  )
    return;
  const {
    params: s,
    touches: r,
    rtlTranslate: o,
    slidesGrid: a,
    enabled: l,
  } = t;
  if (!l || (!s.simulateTouch && e.pointerType === 'mouse')) return;
  let c = e;
  if (
    (c.originalEvent && (c = c.originalEvent),
    n.allowTouchCallbacks && t.emit('touchEnd', c),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    n.isMoved && s.grabCursor && t.setGrabCursor(!1),
      (n.isMoved = !1),
      (n.startMoving = !1);
    return;
  }
  s.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const d = Ln(),
    f = d - n.touchStartTime;
  if (t.allowClick) {
    const b = c.path || (c.composedPath && c.composedPath());
    t.updateClickedSlide((b && b[0]) || c.target, b),
      t.emit('tap click', c),
      f < 300 &&
        d - n.lastClickTime < 300 &&
        t.emit('doubleTap doubleClick', c);
  }
  if (
    ((n.lastClickTime = Ln()),
    An(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      r.diff === 0 ||
      n.currentTranslate === n.startTranslate)
  ) {
    (n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
    return;
  }
  (n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
  let h;
  if (
    (s.followFinger
      ? (h = o ? t.translate : -t.translate)
      : (h = -n.currentTranslate),
    s.cssMode)
  )
    return;
  if (s.freeMode && s.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: h });
    return;
  }
  let u = 0,
    T = t.slidesSizesGrid[0];
  for (
    let b = 0;
    b < a.length;
    b += b < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
  ) {
    const _ = b < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
    typeof a[b + _] < 'u'
      ? h >= a[b] && h < a[b + _] && ((u = b), (T = a[b + _] - a[b]))
      : h >= a[b] && ((u = b), (T = a[a.length - 1] - a[a.length - 2]));
  }
  let w = null,
    C = null;
  s.rewind &&
    (t.isBeginning
      ? (C =
          s.virtual && s.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (w = 0));
  const M = (h - a[u]) / T,
    m = u < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
  if (f > s.longSwipesMs) {
    if (!s.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === 'next' &&
      (M >= s.longSwipesRatio
        ? t.slideTo(s.rewind && t.isEnd ? w : u + m)
        : t.slideTo(u)),
      t.swipeDirection === 'prev' &&
        (M > 1 - s.longSwipesRatio
          ? t.slideTo(u + m)
          : C !== null && M < 0 && Math.abs(M) > s.longSwipesRatio
          ? t.slideTo(C)
          : t.slideTo(u));
  } else {
    if (!s.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl)
      ? c.target === t.navigation.nextEl
        ? t.slideTo(u + m)
        : t.slideTo(u)
      : (t.swipeDirection === 'next' && t.slideTo(w !== null ? w : u + m),
        t.swipeDirection === 'prev' && t.slideTo(C !== null ? C : u));
  }
}
function js() {
  const e = this,
    { params: t, el: n } = e;
  if (n && n.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: s, snapGrid: r } = e,
    o = e.virtual && e.params.virtual.enabled;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
  const a = o && t.loop;
  (t.slidesPerView === 'auto' || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !a
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !o
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = s),
    (e.allowSlideNext = i),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function Dd(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function Nd() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
  if (!i) return;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  let s;
  const r = e.maxTranslate() - e.minTranslate();
  r === 0 ? (s = 0) : (s = (e.translate - e.minTranslate()) / r),
    s !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit('setTranslate', e.translate, !1);
}
function Rd(e) {
  const t = this;
  xn(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== 'auto' && !t.params.autoHeight)
    ) && t.update();
}
let Hs = !1;
function Fd() {}
const Jr = (e, t) => {
  const n = rt(),
    { params: i, el: s, wrapperEl: r, device: o } = e,
    a = !!i.nested,
    l = t === 'on' ? 'addEventListener' : 'removeEventListener',
    c = t;
  s[l]('pointerdown', e.onTouchStart, { passive: !1 }),
    n[l]('pointermove', e.onTouchMove, { passive: !1, capture: a }),
    n[l]('pointerup', e.onTouchEnd, { passive: !0 }),
    n[l]('pointercancel', e.onTouchEnd, { passive: !0 }),
    n[l]('pointerout', e.onTouchEnd, { passive: !0 }),
    n[l]('pointerleave', e.onTouchEnd, { passive: !0 }),
    n[l]('contextmenu', e.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      s[l]('click', e.onClick, !0),
    i.cssMode && r[l]('scroll', e.onScroll),
    i.updateOnWindowResize
      ? e[c](
          o.ios || o.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          js,
          !0
        )
      : e[c]('observerUpdate', js, !0),
    s[l]('load', e.onLoad, { capture: !0 });
};
function jd() {
  const e = this,
    t = rt(),
    { params: n } = e;
  (e.onTouchStart = $d.bind(e)),
    (e.onTouchMove = zd.bind(e)),
    (e.onTouchEnd = Bd.bind(e)),
    n.cssMode && (e.onScroll = Nd.bind(e)),
    (e.onClick = Dd.bind(e)),
    (e.onLoad = Rd.bind(e)),
    Hs || (t.addEventListener('touchstart', Fd), (Hs = !0)),
    Jr(e, 'on');
}
function Hd() {
  Jr(this, 'off');
}
var Vd = { attachEvents: jd, detachEvents: Hd };
const Vs = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function Gd() {
  const e = this,
    { realIndex: t, initialized: n, params: i, el: s } = e,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
  if (!o || e.currentBreakpoint === o) return;
  const l = (o in r ? r[o] : void 0) || e.originalParams,
    c = Vs(e, i),
    d = Vs(e, l),
    f = i.enabled;
  c && !d
    ? (s.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !c &&
      d &&
      (s.classList.add(`${i.containerModifierClass}grid`),
      ((l.grid.fill && l.grid.fill === 'column') ||
        (!l.grid.fill && i.grid.fill === 'column')) &&
        s.classList.add(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((M) => {
      if (typeof l[M] > 'u') return;
      const m = i[M] && i[M].enabled,
        b = l[M] && l[M].enabled;
      m && !b && e[M].disable(), !m && b && e[M].enable();
    });
  const h = l.direction && l.direction !== i.direction,
    u = i.loop && (l.slidesPerView !== i.slidesPerView || h),
    T = i.loop;
  h && n && e.changeDirection(), Ie(e.params, l);
  const w = e.params.enabled,
    C = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    f && !w ? e.disable() : !f && w && e.enable(),
    (e.currentBreakpoint = o),
    e.emit('_beforeBreakpoint', l),
    n &&
      (u
        ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
        : !T && C
        ? (e.loopCreate(t), e.updateSlides())
        : T && !C && e.loopDestroy()),
    e.emit('breakpoint', l);
}
function Wd(e, t, n) {
  if ((t === void 0 && (t = 'window'), !e || (t === 'container' && !n))) return;
  let i = !1;
  const s = Ae(),
    r = t === 'window' ? s.innerHeight : n.clientHeight,
    o = Object.keys(e).map((a) => {
      if (typeof a == 'string' && a.indexOf('@') === 0) {
        const l = parseFloat(a.substr(1));
        return { value: r * l, point: a };
      }
      return { value: a, point: a };
    });
  o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
  for (let a = 0; a < o.length; a += 1) {
    const { point: l, value: c } = o[a];
    t === 'window'
      ? s.matchMedia(`(min-width: ${c}px)`).matches && (i = l)
      : c <= n.clientWidth && (i = l);
  }
  return i || 'max';
}
var qd = { setBreakpoint: Gd, getBreakpoint: Wd };
function Ud(e, t) {
  const n = [];
  return (
    e.forEach((i) => {
      typeof i == 'object'
        ? Object.keys(i).forEach((s) => {
            i[s] && n.push(t + s);
          })
        : typeof i == 'string' && n.push(t + i);
    }),
    n
  );
}
function Kd() {
  const e = this,
    { classNames: t, params: n, rtl: i, el: s, device: r } = e,
    o = Ud(
      [
        'initialized',
        n.direction,
        { 'free-mode': e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: i },
        { grid: n.grid && n.grid.rows > 1 },
        {
          'grid-column': n.grid && n.grid.rows > 1 && n.grid.fill === 'column',
        },
        { android: r.android },
        { ios: r.ios },
        { 'css-mode': n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { 'watch-progress': n.watchSlidesProgress },
      ],
      n.containerModifierClass
    );
  t.push(...o), s.classList.add(...t), e.emitContainerClasses();
}
function Yd() {
  const e = this,
    { el: t, classNames: n } = e;
  t.classList.remove(...n), e.emitContainerClasses();
}
var Xd = { addClasses: Kd, removeClasses: Yd };
function Jd() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: i } = n;
  if (i) {
    const s = e.slides.length - 1,
      r = e.slidesGrid[s] + e.slidesSizesGrid[s] + i * 2;
    e.isLocked = e.size > r;
  } else e.isLocked = e.snapGrid.length === 1;
  n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock');
}
var Zd = { checkOverflow: Jd },
  Ti = {
    init: !0,
    direction: 'horizontal',
    oneWayMovement: !1,
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function Qd(e, t) {
  return function (i) {
    i === void 0 && (i = {});
    const s = Object.keys(i)[0],
      r = i[s];
    if (typeof r != 'object' || r === null) {
      Ie(t, i);
      return;
    }
    if (
      (e[s] === !0 && (e[s] = { enabled: !0 }),
      s === 'navigation' &&
        e[s] &&
        e[s].enabled &&
        !e[s].prevEl &&
        !e[s].nextEl &&
        (e[s].auto = !0),
      ['pagination', 'scrollbar'].indexOf(s) >= 0 &&
        e[s] &&
        e[s].enabled &&
        !e[s].el &&
        (e[s].auto = !0),
      !(s in e && 'enabled' in r))
    ) {
      Ie(t, i);
      return;
    }
    typeof e[s] == 'object' && !('enabled' in e[s]) && (e[s].enabled = !0),
      e[s] || (e[s] = { enabled: !1 }),
      Ie(t, i);
  };
}
const ri = {
    eventsEmitter: Xc,
    update: ld,
    translate: pd,
    transition: vd,
    slide: Ed,
    loop: Od,
    grabCursor: Id,
    events: Vd,
    breakpoints: qd,
    checkOverflow: Zd,
    classes: Xd,
  },
  oi = {};
let es = class Ze {
  constructor() {
    let t, n;
    for (var i = arguments.length, s = new Array(i), r = 0; r < i; r++)
      s[r] = arguments[r];
    s.length === 1 &&
    s[0].constructor &&
    Object.prototype.toString.call(s[0]).slice(8, -1) === 'Object'
      ? (n = s[0])
      : ([t, n] = s),
      n || (n = {}),
      (n = Ie({}, n)),
      t && !n.el && (n.el = t);
    const o = rt();
    if (
      n.el &&
      typeof n.el == 'string' &&
      o.querySelectorAll(n.el).length > 1
    ) {
      const d = [];
      return (
        o.querySelectorAll(n.el).forEach((f) => {
          const h = Ie({}, n, { el: f });
          d.push(new Ze(h));
        }),
        d
      );
    }
    const a = this;
    (a.__swiper__ = !0),
      (a.support = Yr()),
      (a.device = Wc({ userAgent: n.userAgent })),
      (a.browser = Uc()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      n.modules && Array.isArray(n.modules) && a.modules.push(...n.modules);
    const l = {};
    a.modules.forEach((d) => {
      d({
        params: n,
        swiper: a,
        extendParams: Qd(n, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      });
    });
    const c = Ie({}, Ti, l);
    return (
      (a.params = Ie({}, c, oi, n)),
      (a.originalParams = Ie({}, a.params)),
      (a.passedParams = Ie({}, n)),
      a.params &&
        a.params.on &&
        Object.keys(a.params.on).forEach((d) => {
          a.on(d, a.params.on[d]);
        }),
      a.params && a.params.onAny && a.onAny(a.params.onAny),
      Object.assign(a, {
        enabled: a.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return a.params.direction === 'horizontal';
        },
        isVertical() {
          return a.params.direction === 'vertical';
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      a.emit('_swiper'),
      a.params.init && a.init(),
      a
    );
  }
  getSlideIndex(t) {
    const { slidesEl: n, params: i } = this,
      s = Ye(n, `.${i.slideClass}, swiper-slide`),
      r = In(s[0]);
    return In(t) - r;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (n) => n.getAttribute('data-swiper-slide-index') * 1 === t
      )[0]
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: i } = t;
    t.slides = Ye(n, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit('enable'));
  }
  disable() {
    const t = this;
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit('disable'));
  }
  setProgress(t, n) {
    const i = this;
    t = Math.min(Math.max(t, 0), 1);
    const s = i.minTranslate(),
      o = (i.maxTranslate() - s) * t + s;
    i.translateTo(o, typeof n > 'u' ? 0 : n),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = t.el.className
      .split(' ')
      .filter(
        (i) =>
          i.indexOf('swiper') === 0 ||
          i.indexOf(t.params.containerModifierClass) === 0
      );
    t.emit('_containerClasses', n.join(' '));
  }
  getSlideClasses(t) {
    const n = this;
    return n.destroyed
      ? ''
      : t.className
          .split(' ')
          .filter(
            (i) =>
              i.indexOf('swiper-slide') === 0 ||
              i.indexOf(n.params.slideClass) === 0
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = [];
    t.slides.forEach((i) => {
      const s = t.getSlideClasses(i);
      n.push({ slideEl: i, classNames: s }), t.emit('_slideClass', i, s);
    }),
      t.emit('_slideClasses', n);
  }
  slidesPerViewDynamic(t, n) {
    t === void 0 && (t = 'current'), n === void 0 && (n = !1);
    const i = this,
      {
        params: s,
        slides: r,
        slidesGrid: o,
        slidesSizesGrid: a,
        size: l,
        activeIndex: c,
      } = i;
    let d = 1;
    if (typeof s.slidesPerView == 'number') return s.slidesPerView;
    if (s.centeredSlides) {
      let f = r[c] ? r[c].swiperSlideSize : 0,
        h;
      for (let u = c + 1; u < r.length; u += 1)
        r[u] &&
          !h &&
          ((f += r[u].swiperSlideSize), (d += 1), f > l && (h = !0));
      for (let u = c - 1; u >= 0; u -= 1)
        r[u] &&
          !h &&
          ((f += r[u].swiperSlideSize), (d += 1), f > l && (h = !0));
    } else if (t === 'current')
      for (let f = c + 1; f < r.length; f += 1)
        (n ? o[f] + a[f] - o[c] < l : o[f] - o[c] < l) && (d += 1);
    else for (let f = c - 1; f >= 0; f -= 1) o[c] - o[f] < l && (d += 1);
    return d;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: n, params: i } = t;
    i.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && xn(t, o);
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses();
    function s() {
      const o = t.rtlTranslate ? t.translate * -1 : t.translate,
        a = Math.min(Math.max(o, t.maxTranslate()), t.minTranslate());
      t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let r;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      s(), i.autoHeight && t.updateAutoHeight();
    else {
      if (
        (i.slidesPerView === 'auto' || i.slidesPerView > 1) &&
        t.isEnd &&
        !i.centeredSlides
      ) {
        const o = t.virtual && i.virtual.enabled ? t.virtual.slides : t.slides;
        r = t.slideTo(o.length - 1, 0, !1, !0);
      } else r = t.slideTo(t.activeIndex, 0, !1, !0);
      r || s();
    }
    i.watchOverflow && n !== t.snapGrid && t.checkOverflow(), t.emit('update');
  }
  changeDirection(t, n) {
    n === void 0 && (n = !0);
    const i = this,
      s = i.params.direction;
    return (
      t || (t = s === 'horizontal' ? 'vertical' : 'horizontal'),
      t === s ||
        (t !== 'horizontal' && t !== 'vertical') ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
        i.el.classList.add(`${i.params.containerModifierClass}${t}`),
        i.emitContainerClasses(),
        (i.params.direction = t),
        i.slides.forEach((r) => {
          t === 'vertical' ? (r.style.width = '') : (r.style.height = '');
        }),
        i.emit('changeDirection'),
        n && i.update()),
      i
    );
  }
  changeLanguageDirection(t) {
    const n = this;
    (n.rtl && t === 'rtl') ||
      (!n.rtl && t === 'ltr') ||
      ((n.rtl = t === 'rtl'),
      (n.rtlTranslate = n.params.direction === 'horizontal' && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = 'rtl'))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = 'ltr')),
      n.update());
  }
  mount(t) {
    const n = this;
    if (n.mounted) return !0;
    let i = t || n.params.el;
    if ((typeof i == 'string' && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = n),
      i.parentNode &&
        i.parentNode.host &&
        i.parentNode.host.nodeName === 'SWIPER-CONTAINER' &&
        (n.isElement = !0);
    const s = () =>
      `.${(n.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let o = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(s())
        : Ye(i, s())[0])();
    return (
      !o &&
        n.params.createElements &&
        ((o = Zi('div', n.params.wrapperClass)),
        i.append(o),
        Ye(i, `.${n.params.slideClass}`).forEach((a) => {
          o.append(a);
        })),
      Object.assign(n, {
        el: i,
        wrapperEl: o,
        slidesEl:
          n.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : o,
        hostEl: n.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === 'rtl' || ut(i, 'direction') === 'rtl',
        rtlTranslate:
          n.params.direction === 'horizontal' &&
          (i.dir.toLowerCase() === 'rtl' || ut(i, 'direction') === 'rtl'),
        wrongRTL: ut(o, 'display') === '-webkit-box',
      }),
      !0
    );
  }
  init(t) {
    const n = this;
    if (n.initialized || n.mount(t) === !1) return n;
    n.emit('beforeInit'),
      n.params.breakpoints && n.setBreakpoint(),
      n.addClasses(),
      n.updateSize(),
      n.updateSlides(),
      n.params.watchOverflow && n.checkOverflow(),
      n.params.grabCursor && n.enabled && n.setGrabCursor(),
      n.params.loop && n.virtual && n.params.virtual.enabled
        ? n.slideTo(
            n.params.initialSlide + n.virtual.slidesBefore,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0
          )
        : n.slideTo(
            n.params.initialSlide,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0
          ),
      n.params.loop && n.loopCreate(),
      n.attachEvents();
    const s = [...n.el.querySelectorAll('[loading="lazy"]')];
    return (
      n.isElement && s.push(...n.hostEl.querySelectorAll('[loading="lazy"]')),
      s.forEach((r) => {
        r.complete
          ? xn(n, r)
          : r.addEventListener('load', (o) => {
              xn(n, o.target);
            });
      }),
      Si(n),
      (n.initialized = !0),
      Si(n),
      n.emit('init'),
      n.emit('afterInit'),
      n
    );
  }
  destroy(t, n) {
    t === void 0 && (t = !0), n === void 0 && (n = !0);
    const i = this,
      { params: s, el: r, wrapperEl: o, slides: a } = i;
    return (
      typeof i.params > 'u' ||
        i.destroyed ||
        (i.emit('beforeDestroy'),
        (i.initialized = !1),
        i.detachEvents(),
        s.loop && i.loopDestroy(),
        n &&
          (i.removeClasses(),
          r.removeAttribute('style'),
          o.removeAttribute('style'),
          a &&
            a.length &&
            a.forEach((l) => {
              l.classList.remove(
                s.slideVisibleClass,
                s.slideActiveClass,
                s.slideNextClass,
                s.slidePrevClass
              ),
                l.removeAttribute('style'),
                l.removeAttribute('data-swiper-slide-index');
            })),
        i.emit('destroy'),
        Object.keys(i.eventsListeners).forEach((l) => {
          i.off(l);
        }),
        t !== !1 && ((i.el.swiper = null), kc(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    Ie(oi, t);
  }
  static get extendedDefaults() {
    return oi;
  }
  static get defaults() {
    return Ti;
  }
  static installModule(t) {
    Ze.prototype.__modules__ || (Ze.prototype.__modules__ = []);
    const n = Ze.prototype.__modules__;
    typeof t == 'function' && n.indexOf(t) < 0 && n.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => Ze.installModule(n)), Ze)
      : (Ze.installModule(t), Ze);
  }
};
Object.keys(ri).forEach((e) => {
  Object.keys(ri[e]).forEach((t) => {
    es.prototype[t] = ri[e][t];
  });
});
es.use([Kc, Yc]);
const Zr = [
  'eventsPrefix',
  'injectStyles',
  'injectStylesUrls',
  'modules',
  'init',
  '_direction',
  'oneWayMovement',
  'touchEventsTarget',
  'initialSlide',
  '_speed',
  'cssMode',
  'updateOnWindowResize',
  'resizeObserver',
  'nested',
  'focusableElements',
  '_enabled',
  '_width',
  '_height',
  'preventInteractionOnTransition',
  'userAgent',
  'url',
  '_edgeSwipeDetection',
  '_edgeSwipeThreshold',
  '_freeMode',
  '_autoHeight',
  'setWrapperSize',
  'virtualTranslate',
  '_effect',
  'breakpoints',
  'breakpointsBase',
  '_spaceBetween',
  '_slidesPerView',
  'maxBackfaceHiddenSlides',
  '_grid',
  '_slidesPerGroup',
  '_slidesPerGroupSkip',
  '_slidesPerGroupAuto',
  '_centeredSlides',
  '_centeredSlidesBounds',
  '_slidesOffsetBefore',
  '_slidesOffsetAfter',
  'normalizeSlideIndex',
  '_centerInsufficientSlides',
  '_watchOverflow',
  'roundLengths',
  'touchRatio',
  'touchAngle',
  'simulateTouch',
  '_shortSwipes',
  '_longSwipes',
  'longSwipesRatio',
  'longSwipesMs',
  '_followFinger',
  'allowTouchMove',
  '_threshold',
  'touchMoveStopPropagation',
  'touchStartPreventDefault',
  'touchStartForcePreventDefault',
  'touchReleaseOnEdges',
  'uniqueNavElements',
  '_resistance',
  '_resistanceRatio',
  '_watchSlidesProgress',
  '_grabCursor',
  'preventClicks',
  'preventClicksPropagation',
  '_slideToClickedSlide',
  '_loop',
  'loopedSlides',
  'loopPreventsSliding',
  '_rewind',
  '_allowSlidePrev',
  '_allowSlideNext',
  '_swipeHandler',
  '_noSwiping',
  'noSwipingClass',
  'noSwipingSelector',
  'passiveListeners',
  'containerModifierClass',
  'slideClass',
  'slideActiveClass',
  'slideVisibleClass',
  'slideNextClass',
  'slidePrevClass',
  'wrapperClass',
  'lazyPreloaderClass',
  'lazyPreloadPrevNext',
  'runCallbacksOnInit',
  'observer',
  'observeParents',
  'observeSlideChildren',
  'a11y',
  '_autoplay',
  '_controller',
  'coverflowEffect',
  'cubeEffect',
  'fadeEffect',
  'flipEffect',
  'creativeEffect',
  'cardsEffect',
  'hashNavigation',
  'history',
  'keyboard',
  'mousewheel',
  '_navigation',
  '_pagination',
  'parallax',
  '_scrollbar',
  '_thumbs',
  'virtual',
  'zoom',
  'control',
];
function Ot(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object' &&
    !e.__swiper__
  );
}
function Mt(e, t) {
  const n = ['__proto__', 'constructor', 'prototype'];
  Object.keys(t)
    .filter((i) => n.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > 'u'
        ? (e[i] = t[i])
        : Ot(t[i]) && Ot(e[i]) && Object.keys(t[i]).length > 0
        ? t[i].__swiper__
          ? (e[i] = t[i])
          : Mt(e[i], t[i])
        : (e[i] = t[i]);
    });
}
function Qr(e) {
  return (
    e === void 0 && (e = {}),
    e.navigation &&
      typeof e.navigation.nextEl > 'u' &&
      typeof e.navigation.prevEl > 'u'
  );
}
function eo(e) {
  return e === void 0 && (e = {}), e.pagination && typeof e.pagination.el > 'u';
}
function to(e) {
  return e === void 0 && (e = {}), e.scrollbar && typeof e.scrollbar.el > 'u';
}
function no(e) {
  e === void 0 && (e = '');
  const t = e
      .split(' ')
      .map((i) => i.trim())
      .filter((i) => !!i),
    n = [];
  return (
    t.forEach((i) => {
      n.indexOf(i) < 0 && n.push(i);
    }),
    n.join(' ')
  );
}
function ef(e) {
  return (
    e === void 0 && (e = ''),
    e
      ? e.includes('swiper-wrapper')
        ? e
        : `swiper-wrapper ${e}`
      : 'swiper-wrapper'
  );
}
function tf(e) {
  let {
    swiper: t,
    slides: n,
    passedParams: i,
    changedParams: s,
    nextEl: r,
    prevEl: o,
    scrollbarEl: a,
    paginationEl: l,
  } = e;
  const c = s.filter(
      (y) => y !== 'children' && y !== 'direction' && y !== 'wrapperClass'
    ),
    {
      params: d,
      pagination: f,
      navigation: h,
      scrollbar: u,
      virtual: T,
      thumbs: w,
    } = t;
  let C, M, m, b, _, I, j, D;
  s.includes('thumbs') &&
    i.thumbs &&
    i.thumbs.swiper &&
    d.thumbs &&
    !d.thumbs.swiper &&
    (C = !0),
    s.includes('controller') &&
      i.controller &&
      i.controller.control &&
      d.controller &&
      !d.controller.control &&
      (M = !0),
    s.includes('pagination') &&
      i.pagination &&
      (i.pagination.el || l) &&
      (d.pagination || d.pagination === !1) &&
      f &&
      !f.el &&
      (m = !0),
    s.includes('scrollbar') &&
      i.scrollbar &&
      (i.scrollbar.el || a) &&
      (d.scrollbar || d.scrollbar === !1) &&
      u &&
      !u.el &&
      (b = !0),
    s.includes('navigation') &&
      i.navigation &&
      (i.navigation.prevEl || o) &&
      (i.navigation.nextEl || r) &&
      (d.navigation || d.navigation === !1) &&
      h &&
      !h.prevEl &&
      !h.nextEl &&
      (_ = !0);
  const A = (y) => {
    t[y] &&
      (t[y].destroy(),
      y === 'navigation'
        ? (t.isElement && (t[y].prevEl.remove(), t[y].nextEl.remove()),
          (d[y].prevEl = void 0),
          (d[y].nextEl = void 0),
          (t[y].prevEl = void 0),
          (t[y].nextEl = void 0))
        : (t.isElement && t[y].el.remove(),
          (d[y].el = void 0),
          (t[y].el = void 0)));
  };
  s.includes('loop') &&
    t.isElement &&
    (d.loop && !i.loop ? (I = !0) : !d.loop && i.loop ? (j = !0) : (D = !0)),
    c.forEach((y) => {
      if (Ot(d[y]) && Ot(i[y]))
        Mt(d[y], i[y]),
          (y === 'navigation' || y === 'pagination' || y === 'scrollbar') &&
            'enabled' in i[y] &&
            !i[y].enabled &&
            A(y);
      else {
        const $ = i[y];
        ($ === !0 || $ === !1) &&
        (y === 'navigation' || y === 'pagination' || y === 'scrollbar')
          ? $ === !1 && A(y)
          : (d[y] = i[y]);
      }
    }),
    c.includes('controller') &&
      !M &&
      t.controller &&
      t.controller.control &&
      d.controller &&
      d.controller.control &&
      (t.controller.control = d.controller.control),
    s.includes('children') &&
      n &&
      T &&
      d.virtual.enabled &&
      ((T.slides = n), T.update(!0)),
    s.includes('children') && n && d.loop && (D = !0),
    C && w.init() && w.update(!0),
    M && (t.controller.control = d.controller.control),
    m &&
      (t.isElement &&
        (!l || typeof l == 'string') &&
        ((l = document.createElement('div')),
        l.classList.add('swiper-pagination'),
        l.part.add('pagination'),
        t.el.appendChild(l)),
      l && (d.pagination.el = l),
      f.init(),
      f.render(),
      f.update()),
    b &&
      (t.isElement &&
        (!a || typeof a == 'string') &&
        ((a = document.createElement('div')),
        a.classList.add('swiper-scrollbar'),
        a.part.add('scrollbar'),
        t.el.appendChild(a)),
      a && (d.scrollbar.el = a),
      u.init(),
      u.updateSize(),
      u.setTranslate()),
    _ &&
      (t.isElement &&
        ((!r || typeof r == 'string') &&
          ((r = document.createElement('div')),
          r.classList.add('swiper-button-next'),
          (r.innerHTML = t.hostEl.constructor.nextButtonSvg),
          r.part.add('button-next'),
          t.el.appendChild(r)),
        (!o || typeof o == 'string') &&
          ((o = document.createElement('div')),
          o.classList.add('swiper-button-prev'),
          (o.innerHTML = t.hostEl.constructor.prevButtonSvg),
          o.part.add('button-prev'),
          t.el.appendChild(o))),
      r && (d.navigation.nextEl = r),
      o && (d.navigation.prevEl = o),
      h.init(),
      h.update()),
    s.includes('allowSlideNext') && (t.allowSlideNext = i.allowSlideNext),
    s.includes('allowSlidePrev') && (t.allowSlidePrev = i.allowSlidePrev),
    s.includes('direction') && t.changeDirection(i.direction, !1),
    (I || D) && t.loopDestroy(),
    (j || D) && t.loopCreate(),
    t.update();
}
function Gs(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = !0);
  const n = { on: {} },
    i = {},
    s = {};
  Mt(n, Ti), (n._emitClasses = !0), (n.init = !1);
  const r = {},
    o = Zr.map((l) => l.replace(/_/, '')),
    a = Object.assign({}, e);
  return (
    Object.keys(a).forEach((l) => {
      typeof e[l] > 'u' ||
        (o.indexOf(l) >= 0
          ? Ot(e[l])
            ? ((n[l] = {}), (s[l] = {}), Mt(n[l], e[l]), Mt(s[l], e[l]))
            : ((n[l] = e[l]), (s[l] = e[l]))
          : l.search(/on[A-Z]/) === 0 && typeof e[l] == 'function'
          ? t
            ? (i[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
            : (n.on[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
          : (r[l] = e[l]));
    }),
    ['navigation', 'pagination', 'scrollbar'].forEach((l) => {
      n[l] === !0 && (n[l] = {}), n[l] === !1 && delete n[l];
    }),
    { params: n, passedParams: s, rest: r, events: i }
  );
}
function nf(e, t) {
  let {
    el: n,
    nextEl: i,
    prevEl: s,
    paginationEl: r,
    scrollbarEl: o,
    swiper: a,
  } = e;
  Qr(t) &&
    i &&
    s &&
    ((a.params.navigation.nextEl = i),
    (a.originalParams.navigation.nextEl = i),
    (a.params.navigation.prevEl = s),
    (a.originalParams.navigation.prevEl = s)),
    eo(t) &&
      r &&
      ((a.params.pagination.el = r), (a.originalParams.pagination.el = r)),
    to(t) &&
      o &&
      ((a.params.scrollbar.el = o), (a.originalParams.scrollbar.el = o)),
    a.init(n);
}
function sf(e, t, n, i, s) {
  const r = [];
  if (!t) return r;
  const o = (l) => {
    r.indexOf(l) < 0 && r.push(l);
  };
  if (n && i) {
    const l = i.map(s),
      c = n.map(s);
    l.join('') !== c.join('') && o('children'),
      i.length !== n.length && o('children');
  }
  return (
    Zr.filter((l) => l[0] === '_')
      .map((l) => l.replace(/_/, ''))
      .forEach((l) => {
        if (l in e && l in t)
          if (Ot(e[l]) && Ot(t[l])) {
            const c = Object.keys(e[l]),
              d = Object.keys(t[l]);
            c.length !== d.length
              ? o(l)
              : (c.forEach((f) => {
                  e[l][f] !== t[l][f] && o(l);
                }),
                d.forEach((f) => {
                  e[l][f] !== t[l][f] && o(l);
                }));
          } else e[l] !== t[l] && o(l);
      }),
    r
  );
}
const rf = (e) => {
  !e ||
    e.destroyed ||
    !e.params.virtual ||
    (e.params.virtual && !e.params.virtual.enabled) ||
    (e.updateSlides(),
    e.updateProgress(),
    e.updateSlidesClasses(),
    e.parallax &&
      e.params.parallax &&
      e.params.parallax.enabled &&
      e.parallax.setTranslate());
};
function li(e, t, n) {
  e === void 0 && (e = {});
  const i = [],
    s = {
      'container-start': [],
      'container-end': [],
      'wrapper-start': [],
      'wrapper-end': [],
    },
    r = (o, a) => {
      Array.isArray(o) &&
        o.forEach((l) => {
          const c = typeof l.type == 'symbol';
          a === 'default' && (a = 'container-end'),
            c && l.children
              ? r(l.children, a)
              : l.type &&
                (l.type.name === 'SwiperSlide' ||
                  l.type.name === 'AsyncComponentWrapper')
              ? i.push(l)
              : s[a] && s[a].push(l);
        });
    };
  return (
    Object.keys(e).forEach((o) => {
      if (typeof e[o] != 'function') return;
      const a = e[o]();
      r(a, o);
    }),
    (n.value = t.value),
    (t.value = i),
    { slides: i, slots: s }
  );
}
function of(e, t, n) {
  if (!n) return null;
  const i = (d) => {
      let f = d;
      return (
        d < 0 ? (f = t.length + d) : f >= t.length && (f = f - t.length), f
      );
    },
    s = e.value.isHorizontal()
      ? { [e.value.rtlTranslate ? 'right' : 'left']: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: r, to: o } = n,
    a = e.value.params.loop ? -t.length : 0,
    l = e.value.params.loop ? t.length * 2 : t.length,
    c = [];
  for (let d = a; d < l; d += 1) d >= r && d <= o && c.push(t[i(d)]);
  return c.map(
    (d) => (
      d.props || (d.props = {}),
      d.props.style || (d.props.style = {}),
      (d.props.swiperRef = e),
      (d.props.style = s),
      Ne(d.type, { ...d.props }, d.children)
    )
  );
}
const lf = {
    name: 'Swiper',
    props: {
      tag: { type: String, default: 'div' },
      wrapperTag: { type: String, default: 'div' },
      modules: { type: Array, default: void 0 },
      init: { type: Boolean, default: void 0 },
      direction: { type: String, default: void 0 },
      oneWayMovement: { type: Boolean, default: void 0 },
      touchEventsTarget: { type: String, default: void 0 },
      initialSlide: { type: Number, default: void 0 },
      speed: { type: Number, default: void 0 },
      cssMode: { type: Boolean, default: void 0 },
      updateOnWindowResize: { type: Boolean, default: void 0 },
      resizeObserver: { type: Boolean, default: void 0 },
      nested: { type: Boolean, default: void 0 },
      focusableElements: { type: String, default: void 0 },
      width: { type: Number, default: void 0 },
      height: { type: Number, default: void 0 },
      preventInteractionOnTransition: { type: Boolean, default: void 0 },
      userAgent: { type: String, default: void 0 },
      url: { type: String, default: void 0 },
      edgeSwipeDetection: { type: [Boolean, String], default: void 0 },
      edgeSwipeThreshold: { type: Number, default: void 0 },
      autoHeight: { type: Boolean, default: void 0 },
      setWrapperSize: { type: Boolean, default: void 0 },
      virtualTranslate: { type: Boolean, default: void 0 },
      effect: { type: String, default: void 0 },
      breakpoints: { type: Object, default: void 0 },
      spaceBetween: { type: [Number, String], default: void 0 },
      slidesPerView: { type: [Number, String], default: void 0 },
      maxBackfaceHiddenSlides: { type: Number, default: void 0 },
      slidesPerGroup: { type: Number, default: void 0 },
      slidesPerGroupSkip: { type: Number, default: void 0 },
      slidesPerGroupAuto: { type: Boolean, default: void 0 },
      centeredSlides: { type: Boolean, default: void 0 },
      centeredSlidesBounds: { type: Boolean, default: void 0 },
      slidesOffsetBefore: { type: Number, default: void 0 },
      slidesOffsetAfter: { type: Number, default: void 0 },
      normalizeSlideIndex: { type: Boolean, default: void 0 },
      centerInsufficientSlides: { type: Boolean, default: void 0 },
      watchOverflow: { type: Boolean, default: void 0 },
      roundLengths: { type: Boolean, default: void 0 },
      touchRatio: { type: Number, default: void 0 },
      touchAngle: { type: Number, default: void 0 },
      simulateTouch: { type: Boolean, default: void 0 },
      shortSwipes: { type: Boolean, default: void 0 },
      longSwipes: { type: Boolean, default: void 0 },
      longSwipesRatio: { type: Number, default: void 0 },
      longSwipesMs: { type: Number, default: void 0 },
      followFinger: { type: Boolean, default: void 0 },
      allowTouchMove: { type: Boolean, default: void 0 },
      threshold: { type: Number, default: void 0 },
      touchMoveStopPropagation: { type: Boolean, default: void 0 },
      touchStartPreventDefault: { type: Boolean, default: void 0 },
      touchStartForcePreventDefault: { type: Boolean, default: void 0 },
      touchReleaseOnEdges: { type: Boolean, default: void 0 },
      uniqueNavElements: { type: Boolean, default: void 0 },
      resistance: { type: Boolean, default: void 0 },
      resistanceRatio: { type: Number, default: void 0 },
      watchSlidesProgress: { type: Boolean, default: void 0 },
      grabCursor: { type: Boolean, default: void 0 },
      preventClicks: { type: Boolean, default: void 0 },
      preventClicksPropagation: { type: Boolean, default: void 0 },
      slideToClickedSlide: { type: Boolean, default: void 0 },
      loop: { type: Boolean, default: void 0 },
      loopedSlides: { type: Number, default: void 0 },
      loopPreventsSliding: { type: Boolean, default: void 0 },
      rewind: { type: Boolean, default: void 0 },
      allowSlidePrev: { type: Boolean, default: void 0 },
      allowSlideNext: { type: Boolean, default: void 0 },
      swipeHandler: { type: Boolean, default: void 0 },
      noSwiping: { type: Boolean, default: void 0 },
      noSwipingClass: { type: String, default: void 0 },
      noSwipingSelector: { type: String, default: void 0 },
      passiveListeners: { type: Boolean, default: void 0 },
      containerModifierClass: { type: String, default: void 0 },
      slideClass: { type: String, default: void 0 },
      slideActiveClass: { type: String, default: void 0 },
      slideVisibleClass: { type: String, default: void 0 },
      slideNextClass: { type: String, default: void 0 },
      slidePrevClass: { type: String, default: void 0 },
      wrapperClass: { type: String, default: void 0 },
      lazyPreloaderClass: { type: String, default: void 0 },
      lazyPreloadPrevNext: { type: Number, default: void 0 },
      runCallbacksOnInit: { type: Boolean, default: void 0 },
      observer: { type: Boolean, default: void 0 },
      observeParents: { type: Boolean, default: void 0 },
      observeSlideChildren: { type: Boolean, default: void 0 },
      a11y: { type: [Boolean, Object], default: void 0 },
      autoplay: { type: [Boolean, Object], default: void 0 },
      controller: { type: Object, default: void 0 },
      coverflowEffect: { type: Object, default: void 0 },
      cubeEffect: { type: Object, default: void 0 },
      fadeEffect: { type: Object, default: void 0 },
      flipEffect: { type: Object, default: void 0 },
      creativeEffect: { type: Object, default: void 0 },
      cardsEffect: { type: Object, default: void 0 },
      hashNavigation: { type: [Boolean, Object], default: void 0 },
      history: { type: [Boolean, Object], default: void 0 },
      keyboard: { type: [Boolean, Object], default: void 0 },
      mousewheel: { type: [Boolean, Object], default: void 0 },
      navigation: { type: [Boolean, Object], default: void 0 },
      pagination: { type: [Boolean, Object], default: void 0 },
      parallax: { type: [Boolean, Object], default: void 0 },
      scrollbar: { type: [Boolean, Object], default: void 0 },
      thumbs: { type: Object, default: void 0 },
      virtual: { type: [Boolean, Object], default: void 0 },
      zoom: { type: [Boolean, Object], default: void 0 },
      grid: { type: [Object], default: void 0 },
      freeMode: { type: [Boolean, Object], default: void 0 },
      enabled: { type: Boolean, default: void 0 },
    },
    emits: [
      '_beforeBreakpoint',
      '_containerClasses',
      '_slideClass',
      '_slideClasses',
      '_swiper',
      '_freeModeNoMomentumRelease',
      'activeIndexChange',
      'afterInit',
      'autoplay',
      'autoplayStart',
      'autoplayStop',
      'autoplayPause',
      'autoplayResume',
      'autoplayTimeLeft',
      'beforeDestroy',
      'beforeInit',
      'beforeLoopFix',
      'beforeResize',
      'beforeSlideChangeStart',
      'beforeTransitionStart',
      'breakpoint',
      'breakpointsBase',
      'changeDirection',
      'click',
      'disable',
      'doubleTap',
      'doubleClick',
      'destroy',
      'enable',
      'fromEdge',
      'hashChange',
      'hashSet',
      'init',
      'keyPress',
      'lock',
      'loopFix',
      'momentumBounce',
      'navigationHide',
      'navigationShow',
      'navigationPrev',
      'navigationNext',
      'observerUpdate',
      'orientationchange',
      'paginationHide',
      'paginationRender',
      'paginationShow',
      'paginationUpdate',
      'progress',
      'reachBeginning',
      'reachEnd',
      'realIndexChange',
      'resize',
      'scroll',
      'scrollbarDragEnd',
      'scrollbarDragMove',
      'scrollbarDragStart',
      'setTransition',
      'setTranslate',
      'slideChange',
      'slideChangeTransitionEnd',
      'slideChangeTransitionStart',
      'slideNextTransitionEnd',
      'slideNextTransitionStart',
      'slidePrevTransitionEnd',
      'slidePrevTransitionStart',
      'slideResetTransitionStart',
      'slideResetTransitionEnd',
      'sliderMove',
      'sliderFirstMove',
      'slidesLengthChange',
      'slidesGridLengthChange',
      'snapGridLengthChange',
      'snapIndexChange',
      'swiper',
      'tap',
      'toEdge',
      'touchEnd',
      'touchMove',
      'touchMoveOpposite',
      'touchStart',
      'transitionEnd',
      'transitionStart',
      'unlock',
      'update',
      'virtualUpdate',
      'zoomChange',
    ],
    setup(e, t) {
      let { slots: n, emit: i } = t;
      const { tag: s, wrapperTag: r } = e,
        o = pe('swiper'),
        a = pe(null),
        l = pe(!1),
        c = pe(!1),
        d = pe(null),
        f = pe(null),
        h = pe(null),
        u = { value: [] },
        T = { value: [] },
        w = pe(null),
        C = pe(null),
        M = pe(null),
        m = pe(null),
        { params: b, passedParams: _ } = Gs(e, !1);
      li(n, u, T), (h.value = _), (T.value = u.value);
      const I = () => {
        li(n, u, T), (l.value = !0);
      };
      (b.onAny = function (A) {
        for (
          var y = arguments.length, $ = new Array(y > 1 ? y - 1 : 0), x = 1;
          x < y;
          x++
        )
          $[x - 1] = arguments[x];
        i(A, ...$);
      }),
        Object.assign(b.on, {
          _beforeBreakpoint: I,
          _containerClasses(A, y) {
            o.value = y;
          },
        });
      const j = { ...b };
      if (
        (delete j.wrapperClass,
        (f.value = new es(j)),
        f.value.virtual && f.value.params.virtual.enabled)
      ) {
        f.value.virtual.slides = u.value;
        const A = {
          cache: !1,
          slides: u.value,
          renderExternal: (y) => {
            a.value = y;
          },
          renderExternalUpdate: !1,
        };
        Mt(f.value.params.virtual, A), Mt(f.value.originalParams.virtual, A);
      }
      Fi(() => {
        !c.value && f.value && (f.value.emitSlidesClasses(), (c.value = !0));
        const { passedParams: A } = Gs(e, !1),
          y = sf(A, h.value, u.value, T.value, ($) => $.props && $.props.key);
        (h.value = A),
          (y.length || l.value) &&
            f.value &&
            !f.value.destroyed &&
            tf({
              swiper: f.value,
              slides: u.value,
              passedParams: A,
              changedParams: y,
              nextEl: w.value,
              prevEl: C.value,
              scrollbarEl: m.value,
              paginationEl: M.value,
            }),
          (l.value = !1);
      }),
        Hi('swiper', f),
        Yt(a, () => {
          Di(() => {
            rf(f.value);
          });
        }),
        ln(() => {
          d.value &&
            (nf(
              {
                el: d.value,
                nextEl: w.value,
                prevEl: C.value,
                paginationEl: M.value,
                scrollbarEl: m.value,
                swiper: f.value,
              },
              b
            ),
            i('swiper', f.value));
        }),
        an(() => {
          f.value && !f.value.destroyed && f.value.destroy(!0, !1);
        });
      function D(A) {
        return b.virtual
          ? of(f, A, a.value)
          : (A.forEach((y, $) => {
              y.props || (y.props = {}),
                (y.props.swiperRef = f),
                (y.props.swiperSlideIndex = $);
            }),
            A);
      }
      return () => {
        const { slides: A, slots: y } = li(n, u, T);
        return Ne(s, { ref: d, class: no(o.value) }, [
          y['container-start'],
          Ne(r, { class: ef(b.wrapperClass) }, [
            y['wrapper-start'],
            D(A),
            y['wrapper-end'],
          ]),
          Qr(e) && [
            Ne('div', { ref: C, class: 'swiper-button-prev' }),
            Ne('div', { ref: w, class: 'swiper-button-next' }),
          ],
          to(e) && Ne('div', { ref: m, class: 'swiper-scrollbar' }),
          eo(e) && Ne('div', { ref: M, class: 'swiper-pagination' }),
          y['container-end'],
        ]);
      };
    },
  },
  af = {
    name: 'SwiperSlide',
    props: {
      tag: { type: String, default: 'div' },
      swiperRef: { type: Object, required: !1 },
      swiperSlideIndex: { type: Number, default: void 0, required: !1 },
      zoom: { type: Boolean, default: void 0, required: !1 },
      lazy: { type: Boolean, default: !1, required: !1 },
      virtualIndex: { type: [String, Number], default: void 0 },
    },
    setup(e, t) {
      let { slots: n } = t,
        i = !1;
      const { swiperRef: s } = e,
        r = pe(null),
        o = pe('swiper-slide'),
        a = pe(!1);
      function l(f, h, u) {
        h === r.value && (o.value = u);
      }
      ln(() => {
        !s || !s.value || (s.value.on('_slideClass', l), (i = !0));
      }),
        Cr(() => {
          i || !s || !s.value || (s.value.on('_slideClass', l), (i = !0));
        }),
        Fi(() => {
          !r.value ||
            !s ||
            !s.value ||
            (typeof e.swiperSlideIndex < 'u' &&
              (r.value.swiperSlideIndex = e.swiperSlideIndex),
            s.value.destroyed &&
              o.value !== 'swiper-slide' &&
              (o.value = 'swiper-slide'));
        }),
        an(() => {
          !s || !s.value || s.value.off('_slideClass', l);
        });
      const c = Ui(() => ({
        isActive: o.value.indexOf('swiper-slide-active') >= 0,
        isVisible: o.value.indexOf('swiper-slide-visible') >= 0,
        isPrev: o.value.indexOf('swiper-slide-prev') >= 0,
        isNext: o.value.indexOf('swiper-slide-next') >= 0,
      }));
      Hi('swiperSlide', c);
      const d = () => {
        a.value = !0;
      };
      return () =>
        Ne(
          e.tag,
          {
            class: no(`${o.value}`),
            ref: r,
            'data-swiper-slide-index':
              typeof e.virtualIndex > 'u' && s && s.value && s.value.params.loop
                ? e.swiperSlideIndex
                : e.virtualIndex,
            onLoadCapture: d,
          },
          e.zoom
            ? Ne(
                'div',
                {
                  class: 'swiper-zoom-container',
                  'data-swiper-zoom':
                    typeof e.zoom == 'number' ? e.zoom : void 0,
                },
                [
                  n.default && n.default(c.value),
                  e.lazy &&
                    !a.value &&
                    Ne('div', { class: 'swiper-lazy-preloader' }),
                ]
              )
            : [
                n.default && n.default(c.value),
                e.lazy &&
                  !a.value &&
                  Ne('div', { class: 'swiper-lazy-preloader' }),
              ]
        );
    },
  };
const cf = [
  {
    id: '1',
    image: '/img/photography/teamlab_1.png',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '2',
    image: '/img/photography/teamlab_2.png',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '3',
    image: '/img/photography/teamlab_3.png',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '4',
    image: '/img/photography/teamlab_4.jpg',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '5',
    image: '/img/photography/teamlab_5.jpg',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '6',
    image: '/img/photography/teamlab_6.jpg',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '7',
    image: '/img/photography/hokkaido_1.png',
    type: 'photo',
    title: 'hokkaido / personal',
  },
  {
    id: '8',
    image: '/img/photography/hokkaido_2.png',
    type: 'photo',
    title: 'hokkaido / personal',
  },
];
const df = {
    name: 'Photography',
    components: { Modal: Wr, Swiper: lf, SwiperSlide: af },
    setup() {
      const e = pe(''),
        t = pe('');
      return {
        items: cf,
        modalStatus: e,
        modalImage: t,
        onSwiper: (r) => {
          console.log(r);
        },
        onSlideChange: () => {
          console.log('slide change');
        },
        modules: [Fc, jc, Hc],
      };
    },
    methods: {
      showModal(e) {
        this.modalStatus = 'confirmation';
        const t = e.target.dataset.photography,
          i = this.items.filter((s) => s.id.indexOf(t) !== -1)[0].image;
        return (this.modalImage = i);
      },
      closeModal() {
        (this.modalStatus = ''), (this.modalImage = '');
      },
    },
  },
  ff = { class: 'portfolio-photography' },
  uf = {
    class: 'portfolio-photography__wrapper',
    'data-aos': 'fade-left',
    'data-aos-duration': '1200',
    'data-aos-offset': '200',
    'data-aos-delay': '400',
    'data-aos-easing': 'ease-out-cubic',
  },
  pf = { class: 'portfolio-photography__content m-0' },
  hf = ['data-photography'],
  mf = { class: 'portfolio-photography__content-text' },
  gf = { class: 'portfolio-photography__content-type' },
  vf = { class: 'portfolio-photography__content-title' },
  bf = N(
    'p',
    { class: 'portfolio-photography__notice m-0 d-block d-md-none' },
    ' swipe left / right to see more photography ',
    -1
  ),
  wf = { class: 'portfolio-modal__item' },
  yf = { class: 'm-0' },
  _f = ['src'];
function xf(e, t, n, i, s, r) {
  const o = nt('swiper-slide'),
    a = nt('swiper'),
    l = nt('Modal');
  return (
    ce(),
    me('section', ff, [
      N('div', uf, [
        ne(
          a,
          {
            class: 'portfolio-photography__list',
            'slides-per-view': 2,
            'space-between': 12,
            onSwiper: i.onSwiper,
            onSlideChange: i.onSlideChange,
          },
          {
            default: ft(() => [
              (ce(!0),
              me(
                we,
                null,
                nn(
                  i.items,
                  (c, d) => (
                    ce(),
                    Fr(
                      o,
                      { key: d },
                      {
                        default: ft(() => [
                          N('p', pf, [
                            N(
                              'img',
                              {
                                class: 'portfolio-photography__content-img',
                                style: Bt({
                                  background: 'url(' + c.image + ')',
                                  backgroundSize: 'cover',
                                }),
                                'data-photography': c.id,
                                onClick:
                                  t[0] ||
                                  (t[0] = (...f) =>
                                    r.showModal && r.showModal(...f)),
                              },
                              null,
                              12,
                              hf
                            ),
                          ]),
                          N('p', mf, [
                            N('span', gf, et(c.type), 1),
                            N('span', vf, et(c.title), 1),
                          ]),
                        ]),
                        _: 2,
                      },
                      1024
                    )
                  )
                ),
                128
              )),
            ]),
            _: 1,
          },
          8,
          ['onSwiper', 'onSlideChange']
        ),
        bf,
      ]),
      Ri(
        ne(
          qn,
          { name: 'modal-fade', status: this.modalStatus },
          {
            default: ft(() => [
              ne(
                l,
                { onModalOff: r.closeModal },
                {
                  body: ft(() => [
                    N('div', wf, [
                      N('p', yf, [
                        N(
                          'img',
                          {
                            src: i.modalImage,
                            class: 'portfolio-modal__item-images',
                          },
                          null,
                          8,
                          _f
                        ),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ['onModalOff']
              ),
            ]),
            _: 1,
          },
          8,
          ['status']
        ),
        [[Yi, this.modalStatus !== '']]
      ),
    ])
  );
}
const Sf = st(df, [['render', xf]]),
  Tf = [
    {
      id: '1',
      bg: 'dark',
      imageRough: 'https://placehold.jp/300x150.png',
      image: '/img/illustration/arknights_ajimu.png',
      type: 'artwork',
      title: 'arknights / angelina',
      description: `Cover for artbook of arknights fan event in Japan xxxx. Created the illustration and design in 2023 via photoshop. Used wacom tablet intuos for roughs, sketch, coloring.
Angelina is a supporter operator working under Rhodes Island of the game Arknights.`,
    },
    {
      id: '2',
      bg: 'light',
      image: 'https://placehold.jp/700x600.png',
      type: 'artwork',
      title: 'arknights / angelina',
      description: 'test.',
    },
  ];
const Ef = {
    name: 'showcaseItem',
    data() {
      return { myShowcase: Tf };
    },
  },
  Cf = { class: 'portfolio-showcase__item-border' },
  Mf = { class: 'portfolio-showcase__item-img--rough' },
  Pf = ['src'],
  Of = { class: 'portfolio-showcase__item-img' },
  Af = ['src'],
  Lf = { class: 'portfolio-showcase__item-title' },
  If = { class: 'portfolio-showcase__item-text' };
function kf(e, t, n, i, s, r) {
  return (
    ce(!0),
    me(
      we,
      null,
      nn(
        s.myShowcase,
        (o) => (
          ce(),
          me('div', null, [
            N(
              'div',
              {
                class: Pe([
                  'portfolio-showcase__item',
                  { 'portfolio-showcase__bg-light': o.bg === 'light' },
                ]),
              },
              [
                N('div', Cf, et(o.id), 1),
                N('p', Mf, [
                  N('img', { src: o.imageRough, class: 'w-100' }, null, 8, Pf),
                ]),
                N('p', Of, [
                  N('img', { src: o.image, class: 'w-100' }, null, 8, Af),
                ]),
                N('p', Lf, et(o.title), 1),
                N('p', If, et(o.description), 1),
              ],
              2
            ),
          ])
        )
      ),
      256
    )
  );
}
const $f = st(Ef, [['render', kf]]),
  zf = '/portfolio/img/icons/cursor_icon.svg';
const Bf = {
    name: 'showcase',
    components: { showcaseItem: $f },
    data: () => ({ isActive: !1 }),
    methods: {
      toggleShowcase() {
        document.body.classList.toggle('is-fixed'),
          (this.isActive = !this.isActive);
      },
    },
  },
  Df = { class: 'portfolio-showcase' },
  Nf = { class: 'portfolio-showcase__all' },
  Rf = N(
    'div',
    { class: 'portfolio-showcase__all-scroll' },
    [
      N('div', { class: 'portfolio-showcase__all-scroll-text' }, [
        N('span', null, 'EXPLORE '),
        N('span', null, 'EXPLORE '),
        N('span', null, 'EXPLORE '),
        N('span', null, 'EXPLORE '),
      ]),
      N('div', { class: 'portfolio-showcase__all-scroll-text' }, [
        N('span', null, 'EXPLORE '),
        N('span', null, 'EXPLORE '),
        N('span', null, 'EXPLORE '),
        N('span', null, 'EXPLORE '),
      ]),
    ],
    -1
  ),
  Ff = { class: 'portfolio-showcase__all-wrap' },
  jf = N(
    'p',
    { class: 'portfolio-showcase__all-text m-0' },
    ' in depth / SELECTED WORKS  ',
    -1
  ),
  Hf = N(
    'p',
    {
      class: 'portfolio-showcase__all-img mb-1',
      'data-aos': 'fade',
      'data-aos-duration': '600',
      'data-aos-delay': '200',
      'data-aos-easing': 'ease-out-cubic',
    },
    [N('img', { class: 'w-100', src: zf })],
    -1
  ),
  Vf = [jf, Hf],
  Gf = N(
    'div',
    { class: 'portfolio-showcase__splash-svg' },
    [
      N('svg', { width: '100%', height: '100%' }, [
        N('rect', { width: '100%', height: '100%' }),
      ]),
    ],
    -1
  ),
  Wf = [Gf],
  qf = N(
    'p',
    { class: 'portfolio-showcase__splash-contents-close-btn' },
    null,
    -1
  ),
  Uf = [qf],
  Kf = { class: 'portfolio-showcase__splash-contents-list' };
function Yf(e, t, n, i, s, r) {
  const o = nt('showcaseItem');
  return (
    ce(),
    me('section', Df, [
      N('div', Nf, [
        Rf,
        N('div', Ff, [
          N(
            'div',
            {
              class: 'portfolio-showcase__all-main',
              onClick:
                t[0] ||
                (t[0] = (...a) => r.toggleShowcase && r.toggleShowcase(...a)),
            },
            Vf
          ),
        ]),
      ]),
      N(
        'div',
        {
          class: Pe([
            'portfolio-showcase__splash',
            { 'is-active': e.isActive },
          ]),
        },
        Wf,
        2
      ),
      N(
        'div',
        {
          class: Pe([
            'portfolio-showcase__splash-contents',
            { 'is-active': e.isActive },
          ]),
        },
        [
          N(
            'div',
            {
              class: Pe([
                'portfolio-showcase__splash-contents-close',
                { 'd-block': e.isActive },
              ]),
              onClick:
                t[1] ||
                (t[1] = (...a) => r.toggleShowcase && r.toggleShowcase(...a)),
            },
            Uf,
            2
          ),
          N('div', Kf, [ne(o)]),
        ],
        2
      ),
    ])
  );
}
const Xf = st(Bf, [['render', Yf]]),
  Jf = '/portfolio/img/photography/stock_profile.jpg',
  Zf = '/portfolio/img/photography/stock_profile2.jpg',
  Qf = '/portfolio/img/illustration/logo_edelRitter.png';
const eu = {
    name: 'About',
    components: { socialNetworking: Xi },
    data() {
      return { alignment: 'ui-catalog__sns-center' };
    },
  },
  tu = { class: 'portfolio-about' },
  nu = { class: 'row no-gutters' },
  iu = Ht(
    '<div class="col-12"><p class="m-0"><img class="w-100" src="' +
      Jf +
      '"></p></div><div class="col-12 col-md-6"><div class="portfolio-about__title"><h2 class="portfolio-about__title-text"><p class="m-0" data-aos="fade-right" data-aos-duration="800" data-aos-offset="300" data-aos-delay="200" data-aos-once="true" data-aos-easing="ease-out-cubic"> CREATIVE / </p><p class="m-0" data-aos="fade-right" data-aos-duration="800" data-aos-offset="300" data-aos-delay="400" data-aos-once="true" data-aos-easing="ease-out-cubic"> MAKES / </p><p class="m-0" data-aos="fade-right" data-aos-duration="800" data-aos-offset="300" data-aos-delay="600" data-aos-once="true" data-aos-easing="ease-out-cubic"> WONDERS / </p></h2><p class="portfolio-about__title-desc" data-aos="fade-up" data-aos-duration="800" data-aos-delay="800" data-aos-once="true" data-aos-easing="ease-out-cubic"> Hello, this is a portfolio website of Yohei. I create websites from UI / pages / frameworks. I also draw illustrations and post them on social media. Avid lover of photography, film and music. </p></div></div>',
    2
  ),
  su = { class: 'col-12 col-md-6' },
  ru = { class: 'portfolio-about__profile' },
  ou = Ht(
    '<div class="portfolio-about__profile-wrap"><p class="portfolio-about__profile-name m-0"> ABOUT ME / <span class="portfolio-about__profile-name-sub">edelRitter</span></p></div><div class="portfolio-about__profile-picture" data-aos="fade" data-aos-duration="800" data-aos-delay="800" data-aos-once="true" data-aos-easing="ease-out-cubic"><p class="portfolio-about__profile-picture-img m-0"><img src="' +
      Zf +
      '" class="w-100"></p><p class="portfolio-about__profile-picture-text"> Yohei I. /<br><span class="portfolio-about__profile-picture-text-japanese">I. / 庸平</span></p></div><p class="portfolio-about__profile-title m-0">EXPERTISE /</p><p class="portfolio-about__profile-list w-100 mb-4"> adobe photoshop, vue 3 / vite, javascript, jQuery, HTML/CSS, SASS, Webpack, GIT / Github, JEST (other testing frameworks), esLint </p><p class="portfolio-about__profile-title m-0">LIKES /</p><ul class="d-flex m-0 p-0"><li class="portfolio-about__profile-list"><strong>arknights :</strong> The music and characters are phenomenal. Developed by Hypergryph </li><li class="portfolio-about__profile-list"><b>music :</b> Eli Noir, M2U, hybrid, Siames, AJURIKA, Caravan Palace, nujabes, Masashi Hamauzu, Adam Gubman, Nomak, Starset, etc. </li></ul><ul class="d-flex m-0 p-0"><li class="portfolio-about__profile-list"><b>games :</b> Omori, Chrono Trigger, Saga Frontier 2, SF 3rd Strike, Cytus 2, Final Fantasy 6/7/9, Smash bros melee, Lord of Vermilion 2, etc. </li><li class="portfolio-about__profile-list"><b>film :</b> Blade Runner, Truman Show, Punch Drunk Love, The Grand Budapest Hotel, The Godfather 1/2, The Matrix, Dunkirk, Parasite, Lawrence of Arabia, Memento, Birdman, etc. </li></ul>',
    7
  ),
  lu = {
    class: 'portfolio-about__profile-sns',
    'data-aos': 'fade-up',
    'data-aos-duration': '1000',
    'data-aos-offset': '80',
    'data-aos-delay': '400',
    'data-aos-easing': 'ease-out-cubic',
  },
  au = N(
    'p',
    {
      class: 'portfolio-about__profile-logo',
      'data-aos': 'fade',
      'data-aos-duration': '1000',
      'data-aos-offset': '80',
      'data-aos-delay': '400',
      'data-aos-easing': 'ease-out-cubic',
    },
    [N('img', { class: 'portfolio-about__profile-logoimg', src: Qf })],
    -1
  );
function cu(e, t, n, i, s, r) {
  const o = nt('socialNetworking');
  return (
    ce(),
    me('section', tu, [
      N('div', nu, [
        iu,
        N('div', su, [
          N('div', ru, [
            ou,
            N('div', lu, [
              ne(o, { class: Pe(this.alignment) }, null, 8, ['class']),
            ]),
            au,
          ]),
        ]),
      ]),
    ])
  );
}
const du = st(eu, [['render', cu]]);
const fu = {
  __name: 'App',
  setup(e) {
    return (t, n) => (
      ce(),
      me('div', null, [
        ne(Xa),
        ne(rc, { id: 'portfolioTop' }),
        ne(Lc, { id: 'portfolioArtwork' }),
        ne(Sf, { id: 'portfolioPhotography' }),
        ne(Xf, { id: 'portfolioShowcase' }),
        ne(du, { id: 'portfolioAbout' }),
      ])
    );
  },
};
var uu =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function pu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var io = { exports: {} };
(function (e, t) {
  (function (n, i) {
    e.exports = i();
  })(uu, function () {
    return (function (n) {
      function i(r) {
        if (s[r]) return s[r].exports;
        var o = (s[r] = { exports: {}, id: r, loaded: !1 });
        return (
          n[r].call(o.exports, o, o.exports, i), (o.loaded = !0), o.exports
        );
      }
      var s = {};
      return (i.m = n), (i.c = s), (i.p = 'dist/'), i(0);
    })([
      function (n, i, s) {
        function r(P) {
          return P && P.__esModule ? P : { default: P };
        }
        var o =
            Object.assign ||
            function (P) {
              for (var F = 1; F < arguments.length; F++) {
                var V = arguments[F];
                for (var Y in V)
                  Object.prototype.hasOwnProperty.call(V, Y) && (P[Y] = V[Y]);
              }
              return P;
            },
          a = s(1),
          l = (r(a), s(6)),
          c = r(l),
          d = s(7),
          f = r(d),
          h = s(8),
          u = r(h),
          T = s(9),
          w = r(T),
          C = s(10),
          M = r(C),
          m = s(11),
          b = r(m),
          _ = s(14),
          I = r(_),
          j = [],
          D = !1,
          A = {
            offset: 120,
            delay: 0,
            easing: 'ease',
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: 'DOMContentLoaded',
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: !1,
          },
          y = function () {
            var P =
              arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
            if ((P && (D = !0), D))
              return (j = (0, b.default)(j, A)), (0, M.default)(j, A.once), j;
          },
          $ = function () {
            (j = (0, I.default)()), y();
          },
          x = function () {
            j.forEach(function (P, F) {
              P.node.removeAttribute('data-aos'),
                P.node.removeAttribute('data-aos-easing'),
                P.node.removeAttribute('data-aos-duration'),
                P.node.removeAttribute('data-aos-delay');
            });
          },
          g = function (P) {
            return (
              P === !0 ||
              (P === 'mobile' && w.default.mobile()) ||
              (P === 'phone' && w.default.phone()) ||
              (P === 'tablet' && w.default.tablet()) ||
              (typeof P == 'function' && P() === !0)
            );
          },
          E = function (P) {
            (A = o(A, P)), (j = (0, I.default)());
            var F = document.all && !window.atob;
            return g(A.disable) || F
              ? x()
              : (A.disableMutationObserver ||
                  u.default.isSupported() ||
                  (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                  (A.disableMutationObserver = !0)),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-easing', A.easing),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-duration', A.duration),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-delay', A.delay),
                A.startEvent === 'DOMContentLoaded' &&
                ['complete', 'interactive'].indexOf(document.readyState) > -1
                  ? y(!0)
                  : A.startEvent === 'load'
                  ? window.addEventListener(A.startEvent, function () {
                      y(!0);
                    })
                  : document.addEventListener(A.startEvent, function () {
                      y(!0);
                    }),
                window.addEventListener(
                  'resize',
                  (0, f.default)(y, A.debounceDelay, !0)
                ),
                window.addEventListener(
                  'orientationchange',
                  (0, f.default)(y, A.debounceDelay, !0)
                ),
                window.addEventListener(
                  'scroll',
                  (0, c.default)(function () {
                    (0, M.default)(j, A.once);
                  }, A.throttleDelay)
                ),
                A.disableMutationObserver || u.default.ready('[data-aos]', $),
                j);
          };
        n.exports = { init: E, refresh: y, refreshHard: $ };
      },
      function (n, i) {},
      ,
      ,
      ,
      ,
      function (n, i) {
        (function (s) {
          function r(g, E, P) {
            function F(S) {
              var O = Ce,
                L = $e;
              return (Ce = $e = void 0), (ze = S), (le = g.apply(L, O));
            }
            function V(S) {
              return (ze = S), (ae = setTimeout(Z, E)), Be ? F(S) : le;
            }
            function Y(S) {
              var O = S - fe,
                L = S - ze,
                z = E - O;
              return p ? $(z, de - L) : z;
            }
            function K(S) {
              var O = S - fe,
                L = S - ze;
              return fe === void 0 || O >= E || O < 0 || (p && L >= de);
            }
            function Z() {
              var S = x();
              return K(S) ? ke(S) : void (ae = setTimeout(Z, Y(S)));
            }
            function ke(S) {
              return (ae = void 0), v && Ce ? F(S) : ((Ce = $e = void 0), le);
            }
            function Ee() {
              ae !== void 0 && clearTimeout(ae),
                (ze = 0),
                (Ce = fe = $e = ae = void 0);
            }
            function ve() {
              return ae === void 0 ? le : ke(x());
            }
            function Se() {
              var S = x(),
                O = K(S);
              if (((Ce = arguments), ($e = this), (fe = S), O)) {
                if (ae === void 0) return V(fe);
                if (p) return (ae = setTimeout(Z, E)), F(fe);
              }
              return ae === void 0 && (ae = setTimeout(Z, E)), le;
            }
            var Ce,
              $e,
              de,
              le,
              ae,
              fe,
              ze = 0,
              Be = !1,
              p = !1,
              v = !0;
            if (typeof g != 'function') throw new TypeError(h);
            return (
              (E = d(E) || 0),
              a(P) &&
                ((Be = !!P.leading),
                (p = 'maxWait' in P),
                (de = p ? y(d(P.maxWait) || 0, E) : de),
                (v = 'trailing' in P ? !!P.trailing : v)),
              (Se.cancel = Ee),
              (Se.flush = ve),
              Se
            );
          }
          function o(g, E, P) {
            var F = !0,
              V = !0;
            if (typeof g != 'function') throw new TypeError(h);
            return (
              a(P) &&
                ((F = 'leading' in P ? !!P.leading : F),
                (V = 'trailing' in P ? !!P.trailing : V)),
              r(g, E, { leading: F, maxWait: E, trailing: V })
            );
          }
          function a(g) {
            var E = typeof g > 'u' ? 'undefined' : f(g);
            return !!g && (E == 'object' || E == 'function');
          }
          function l(g) {
            return !!g && (typeof g > 'u' ? 'undefined' : f(g)) == 'object';
          }
          function c(g) {
            return (
              (typeof g > 'u' ? 'undefined' : f(g)) == 'symbol' ||
              (l(g) && A.call(g) == T)
            );
          }
          function d(g) {
            if (typeof g == 'number') return g;
            if (c(g)) return u;
            if (a(g)) {
              var E = typeof g.valueOf == 'function' ? g.valueOf() : g;
              g = a(E) ? E + '' : E;
            }
            if (typeof g != 'string') return g === 0 ? g : +g;
            g = g.replace(w, '');
            var P = M.test(g);
            return P || m.test(g)
              ? b(g.slice(2), P ? 2 : 8)
              : C.test(g)
              ? u
              : +g;
          }
          var f =
              typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
                ? function (g) {
                    return typeof g;
                  }
                : function (g) {
                    return g &&
                      typeof Symbol == 'function' &&
                      g.constructor === Symbol &&
                      g !== Symbol.prototype
                      ? 'symbol'
                      : typeof g;
                  },
            h = 'Expected a function',
            u = NaN,
            T = '[object Symbol]',
            w = /^\s+|\s+$/g,
            C = /^[-+]0x[0-9a-f]+$/i,
            M = /^0b[01]+$/i,
            m = /^0o[0-7]+$/i,
            b = parseInt,
            _ =
              (typeof s > 'u' ? 'undefined' : f(s)) == 'object' &&
              s &&
              s.Object === Object &&
              s,
            I =
              (typeof self > 'u' ? 'undefined' : f(self)) == 'object' &&
              self &&
              self.Object === Object &&
              self,
            j = _ || I || Function('return this')(),
            D = Object.prototype,
            A = D.toString,
            y = Math.max,
            $ = Math.min,
            x = function () {
              return j.Date.now();
            };
          n.exports = o;
        }).call(
          i,
          (function () {
            return this;
          })()
        );
      },
      function (n, i) {
        (function (s) {
          function r(x, g, E) {
            function P(v) {
              var S = Se,
                O = Ce;
              return (Se = Ce = void 0), (fe = v), (de = x.apply(O, S));
            }
            function F(v) {
              return (fe = v), (le = setTimeout(K, g)), ze ? P(v) : de;
            }
            function V(v) {
              var S = v - ae,
                O = v - fe,
                L = g - S;
              return Be ? y(L, $e - O) : L;
            }
            function Y(v) {
              var S = v - ae,
                O = v - fe;
              return ae === void 0 || S >= g || S < 0 || (Be && O >= $e);
            }
            function K() {
              var v = $();
              return Y(v) ? Z(v) : void (le = setTimeout(K, V(v)));
            }
            function Z(v) {
              return (le = void 0), p && Se ? P(v) : ((Se = Ce = void 0), de);
            }
            function ke() {
              le !== void 0 && clearTimeout(le),
                (fe = 0),
                (Se = ae = Ce = le = void 0);
            }
            function Ee() {
              return le === void 0 ? de : Z($());
            }
            function ve() {
              var v = $(),
                S = Y(v);
              if (((Se = arguments), (Ce = this), (ae = v), S)) {
                if (le === void 0) return F(ae);
                if (Be) return (le = setTimeout(K, g)), P(ae);
              }
              return le === void 0 && (le = setTimeout(K, g)), de;
            }
            var Se,
              Ce,
              $e,
              de,
              le,
              ae,
              fe = 0,
              ze = !1,
              Be = !1,
              p = !0;
            if (typeof x != 'function') throw new TypeError(f);
            return (
              (g = c(g) || 0),
              o(E) &&
                ((ze = !!E.leading),
                (Be = 'maxWait' in E),
                ($e = Be ? A(c(E.maxWait) || 0, g) : $e),
                (p = 'trailing' in E ? !!E.trailing : p)),
              (ve.cancel = ke),
              (ve.flush = Ee),
              ve
            );
          }
          function o(x) {
            var g = typeof x > 'u' ? 'undefined' : d(x);
            return !!x && (g == 'object' || g == 'function');
          }
          function a(x) {
            return !!x && (typeof x > 'u' ? 'undefined' : d(x)) == 'object';
          }
          function l(x) {
            return (
              (typeof x > 'u' ? 'undefined' : d(x)) == 'symbol' ||
              (a(x) && D.call(x) == u)
            );
          }
          function c(x) {
            if (typeof x == 'number') return x;
            if (l(x)) return h;
            if (o(x)) {
              var g = typeof x.valueOf == 'function' ? x.valueOf() : x;
              x = o(g) ? g + '' : g;
            }
            if (typeof x != 'string') return x === 0 ? x : +x;
            x = x.replace(T, '');
            var E = C.test(x);
            return E || M.test(x)
              ? m(x.slice(2), E ? 2 : 8)
              : w.test(x)
              ? h
              : +x;
          }
          var d =
              typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
                ? function (x) {
                    return typeof x;
                  }
                : function (x) {
                    return x &&
                      typeof Symbol == 'function' &&
                      x.constructor === Symbol &&
                      x !== Symbol.prototype
                      ? 'symbol'
                      : typeof x;
                  },
            f = 'Expected a function',
            h = NaN,
            u = '[object Symbol]',
            T = /^\s+|\s+$/g,
            w = /^[-+]0x[0-9a-f]+$/i,
            C = /^0b[01]+$/i,
            M = /^0o[0-7]+$/i,
            m = parseInt,
            b =
              (typeof s > 'u' ? 'undefined' : d(s)) == 'object' &&
              s &&
              s.Object === Object &&
              s,
            _ =
              (typeof self > 'u' ? 'undefined' : d(self)) == 'object' &&
              self &&
              self.Object === Object &&
              self,
            I = b || _ || Function('return this')(),
            j = Object.prototype,
            D = j.toString,
            A = Math.max,
            y = Math.min,
            $ = function () {
              return I.Date.now();
            };
          n.exports = r;
        }).call(
          i,
          (function () {
            return this;
          })()
        );
      },
      function (n, i) {
        function s(d) {
          var f = void 0,
            h = void 0;
          for (f = 0; f < d.length; f += 1)
            if (
              ((h = d[f]),
              (h.dataset && h.dataset.aos) || (h.children && s(h.children)))
            )
              return !0;
          return !1;
        }
        function r() {
          return (
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver
          );
        }
        function o() {
          return !!r();
        }
        function a(d, f) {
          var h = window.document,
            u = r(),
            T = new u(l);
          (c = f),
            T.observe(h.documentElement, {
              childList: !0,
              subtree: !0,
              removedNodes: !0,
            });
        }
        function l(d) {
          d &&
            d.forEach(function (f) {
              var h = Array.prototype.slice.call(f.addedNodes),
                u = Array.prototype.slice.call(f.removedNodes),
                T = h.concat(u);
              if (s(T)) return c();
            });
        }
        Object.defineProperty(i, '__esModule', { value: !0 });
        var c = function () {};
        i.default = { isSupported: o, ready: a };
      },
      function (n, i) {
        function s(h, u) {
          if (!(h instanceof u))
            throw new TypeError('Cannot call a class as a function');
        }
        function r() {
          return navigator.userAgent || navigator.vendor || window.opera || '';
        }
        Object.defineProperty(i, '__esModule', { value: !0 });
        var o = (function () {
            function h(u, T) {
              for (var w = 0; w < T.length; w++) {
                var C = T[w];
                (C.enumerable = C.enumerable || !1),
                  (C.configurable = !0),
                  'value' in C && (C.writable = !0),
                  Object.defineProperty(u, C.key, C);
              }
            }
            return function (u, T, w) {
              return T && h(u.prototype, T), w && h(u, w), u;
            };
          })(),
          a =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          l =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          c =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
          d =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          f = (function () {
            function h() {
              s(this, h);
            }
            return (
              o(h, [
                {
                  key: 'phone',
                  value: function () {
                    var u = r();
                    return !(!a.test(u) && !l.test(u.substr(0, 4)));
                  },
                },
                {
                  key: 'mobile',
                  value: function () {
                    var u = r();
                    return !(!c.test(u) && !d.test(u.substr(0, 4)));
                  },
                },
                {
                  key: 'tablet',
                  value: function () {
                    return this.mobile() && !this.phone();
                  },
                },
              ]),
              h
            );
          })();
        i.default = new f();
      },
      function (n, i) {
        Object.defineProperty(i, '__esModule', { value: !0 });
        var s = function (o, a, l) {
            var c = o.node.getAttribute('data-aos-once');
            a > o.position
              ? o.node.classList.add('aos-animate')
              : typeof c < 'u' &&
                (c === 'false' || (!l && c !== 'true')) &&
                o.node.classList.remove('aos-animate');
          },
          r = function (o, a) {
            var l = window.pageYOffset,
              c = window.innerHeight;
            o.forEach(function (d, f) {
              s(d, c + l, a);
            });
          };
        i.default = r;
      },
      function (n, i, s) {
        function r(c) {
          return c && c.__esModule ? c : { default: c };
        }
        Object.defineProperty(i, '__esModule', { value: !0 });
        var o = s(12),
          a = r(o),
          l = function (c, d) {
            return (
              c.forEach(function (f, h) {
                f.node.classList.add('aos-init'),
                  (f.position = (0, a.default)(f.node, d.offset));
              }),
              c
            );
          };
        i.default = l;
      },
      function (n, i, s) {
        function r(c) {
          return c && c.__esModule ? c : { default: c };
        }
        Object.defineProperty(i, '__esModule', { value: !0 });
        var o = s(13),
          a = r(o),
          l = function (c, d) {
            var f = 0,
              h = 0,
              u = window.innerHeight,
              T = {
                offset: c.getAttribute('data-aos-offset'),
                anchor: c.getAttribute('data-aos-anchor'),
                anchorPlacement: c.getAttribute('data-aos-anchor-placement'),
              };
            switch (
              (T.offset && !isNaN(T.offset) && (h = parseInt(T.offset)),
              T.anchor &&
                document.querySelectorAll(T.anchor) &&
                (c = document.querySelectorAll(T.anchor)[0]),
              (f = (0, a.default)(c).top),
              T.anchorPlacement)
            ) {
              case 'top-bottom':
                break;
              case 'center-bottom':
                f += c.offsetHeight / 2;
                break;
              case 'bottom-bottom':
                f += c.offsetHeight;
                break;
              case 'top-center':
                f += u / 2;
                break;
              case 'bottom-center':
                f += u / 2 + c.offsetHeight;
                break;
              case 'center-center':
                f += u / 2 + c.offsetHeight / 2;
                break;
              case 'top-top':
                f += u;
                break;
              case 'bottom-top':
                f += c.offsetHeight + u;
                break;
              case 'center-top':
                f += c.offsetHeight / 2 + u;
            }
            return T.anchorPlacement || T.offset || isNaN(d) || (h = d), f + h;
          };
        i.default = l;
      },
      function (n, i) {
        Object.defineProperty(i, '__esModule', { value: !0 });
        var s = function (r) {
          for (
            var o = 0, a = 0;
            r && !isNaN(r.offsetLeft) && !isNaN(r.offsetTop);

          )
            (o += r.offsetLeft - (r.tagName != 'BODY' ? r.scrollLeft : 0)),
              (a += r.offsetTop - (r.tagName != 'BODY' ? r.scrollTop : 0)),
              (r = r.offsetParent);
          return { top: a, left: o };
        };
        i.default = s;
      },
      function (n, i) {
        Object.defineProperty(i, '__esModule', { value: !0 });
        var s = function (r) {
          return (
            (r = r || document.querySelectorAll('[data-aos]')),
            Array.prototype.map.call(r, function (o) {
              return { node: o };
            })
          );
        };
        i.default = s;
      },
    ]);
  });
})(io);
var hu = io.exports;
const mu = pu(hu);
const gu = {
  columnWidth: 400,
  gap: 0,
  keyMapper: (e, t, n, i) => i,
  minColumns: 1,
  maxColumns: void 0,
  rtl: !1,
  scrollContainer: null,
  ssrColumns: 0,
};
function vu({
  columns: e,
  columnWidth: t,
  emit: n,
  gap: i,
  items: s,
  maxColumns: r,
  minColumns: o,
  nextTick: a,
  onBeforeUnmount: l,
  onMounted: c,
  rtl: d,
  scrollContainer: f,
  ssrColumns: h,
  vue: u,
  wall: T,
  watch: w,
}) {
  function C(y, $, x, g) {
    const E = M(x);
    return g + $ + E <= y ? C(y, $, x + 1, g + $ + E) : x;
  }
  function M(y) {
    const $ = Array.isArray(t.value) ? t.value : [t.value];
    return $[y % $.length];
  }
  function m() {
    const y = C(T.value.getBoundingClientRect().width, i.value, 0, -i.value),
      $ = _(b(y));
    return $ > 0 ? $ : 1;
  }
  function b(y) {
    const $ = r == null ? void 0 : r.value;
    return $ && y > $ ? $ : y;
  }
  function _(y) {
    const $ = o == null ? void 0 : o.value;
    return $ && y < $ ? $ : y;
  }
  function I(y) {
    return Array.from({ length: y }).map(() => []);
  }
  if (h.value > 0) {
    const y = I(h.value);
    s.value.forEach(($, x) => y[x % h.value].push(x)), (e.value = y);
  }
  async function j(y) {
    if (y >= s.value.length) return;
    await a();
    const $ = [...T.value.children];
    d.value && $.reverse();
    const x = $.reduce((g, E) =>
      E.getBoundingClientRect().height < g.getBoundingClientRect().height
        ? E
        : g
    );
    e.value[+x.dataset.index].push(y), await j(y + 1);
  }
  async function D(y = !1) {
    if (e.value.length === m() && !y) {
      n(u === 2 ? 'redraw-skip' : 'redrawSkip');
      return;
    }
    e.value = I(m());
    const $ = f == null ? void 0 : f.value,
      x = $ ? $.scrollTop : window.scrollY;
    await j(0),
      $ ? $.scrollBy({ top: x - $.scrollTop }) : window.scrollTo({ top: x }),
      n('redraw');
  }
  const A =
    typeof ResizeObserver > 'u' ? void 0 : new ResizeObserver(() => D());
  return (
    c(() => {
      D(), A == null || A.observe(T.value);
    }),
    l(() => (A == null ? void 0 : A.unobserve(T.value))),
    w([s, d], () => D(!0)),
    w([t, i, o, r], () => D()),
    { getColumnWidthTarget: M }
  );
}
const bu = ['data-index'],
  wu = hl({
    __name: 'masonry-wall',
    props: Cl(
      {
        columnWidth: {},
        items: {},
        gap: {},
        rtl: { type: Boolean },
        ssrColumns: {},
        scrollContainer: {},
        minColumns: {},
        maxColumns: {},
        keyMapper: { type: Function },
      },
      gu
    ),
    emits: ['redraw', 'redrawSkip'],
    setup(e, { emit: t }) {
      const n = e,
        i = pe([]),
        s = pe(),
        { getColumnWidthTarget: r } = vu({
          columns: i,
          emit: t,
          nextTick: Di,
          onBeforeUnmount: an,
          onMounted: ln,
          vue: 3,
          wall: s,
          watch: Yt,
          ...Uo(n),
        });
      return (o, a) => (
        ce(),
        me(
          'div',
          {
            ref_key: 'wall',
            ref: s,
            class: 'masonry-wall',
            style: Bt({ display: 'flex', gap: `${o.gap}px` }),
          },
          [
            (ce(!0),
            me(
              we,
              null,
              nn(
                i.value,
                (l, c) => (
                  ce(),
                  me(
                    'div',
                    {
                      key: c,
                      class: 'masonry-column',
                      'data-index': c,
                      style: Bt({
                        display: 'flex',
                        'flex-basis': `${ur(r)(c)}px`,
                        'flex-direction': 'column',
                        'flex-grow': 1,
                        gap: `${o.gap}px`,
                        height: [
                          '-webkit-max-content',
                          '-moz-max-content',
                          'max-content',
                        ],
                        'min-width': 0,
                      }),
                    },
                    [
                      (ce(!0),
                      me(
                        we,
                        null,
                        nn(
                          l,
                          (d, f) => (
                            ce(),
                            me(
                              'div',
                              {
                                key: o.keyMapper(o.items[d], c, f, d),
                                class: 'masonry-item',
                              },
                              [
                                Or(
                                  o.$slots,
                                  'default',
                                  {
                                    item: o.items[d],
                                    column: c,
                                    row: f,
                                    index: d,
                                  },
                                  () => [Gi(et(o.items[d]), 1)]
                                ),
                              ]
                            )
                          )
                        ),
                        128
                      )),
                    ],
                    12,
                    bu
                  )
                )
              ),
              128
            )),
          ],
          4
        )
      );
    },
  }),
  yu = (() => {
    const e = wu;
    return (
      (e.install = (t) => {
        t.component('MasonryWall', e);
      }),
      e
    );
  })();
function _u(e, t, n) {
  e === document &&
    (e =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body);
  let i = !1,
    s = e.scrollTop;
  const r =
    e === document.body && document.documentElement
      ? document.documentElement
      : e;
  e.addEventListener('mousewheel', o, { passive: !1 }),
    e.addEventListener('DOMMouseScroll', o, { passive: !1 });
  function o(d) {
    d.preventDefault();
    const f = a(d);
    (s += -f * t),
      (s = Math.max(0, Math.min(s, e.scrollHeight - r.clientHeight))),
      i || l();
  }
  function a(d) {
    return d.detail
      ? d.wheelDelta
        ? (d.wheelDelta / d.detail / 40) * (d.detail > 0 ? 1 : -1)
        : -d.detail / 3
      : d.wheelDelta / 120;
  }
  function l() {
    i = !0;
    const d = (s - e.scrollTop) / n;
    (e.scrollTop += d), Math.abs(d) > 0.5 ? c(l) : (i = !1);
  }
  const c = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (d) {
        window.setTimeout(d, 1e3 / 50);
      }
    );
  })();
}
function xu() {
  new _u(document, 30, 16);
}
function Su() {
  xu();
}
document.addEventListener('DOMContentLoaded', Su);
La(fu).use(mu.init()).use(yu).mount('#app');
//# sourceMappingURL=index.js.map
