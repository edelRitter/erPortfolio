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
function yi(e, t) {
  const n = Object.create(null),
    i = e.split(',');
  for (let s = 0; s < i.length; s++) n[i[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const re = {},
  At = [],
  We = () => {},
  eo = () => !1,
  to = /^on[^a-z]/,
  Ln = (e) => to.test(e),
  xi = (e) => e.startsWith('onUpdate:'),
  he = Object.assign,
  Si = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  no = Object.prototype.hasOwnProperty,
  ee = (e, t) => no.call(e, t),
  U = Array.isArray,
  Lt = (e) => In(e) === '[object Map]',
  js = (e) => In(e) === '[object Set]',
  J = (e) => typeof e == 'function',
  me = (e) => typeof e == 'string',
  Ti = (e) => typeof e == 'symbol',
  oe = (e) => e !== null && typeof e == 'object',
  Hs = (e) => oe(e) && J(e.then) && J(e.catch),
  Gs = Object.prototype.toString,
  In = (e) => Gs.call(e),
  io = (e) => In(e).slice(8, -1),
  Ws = (e) => In(e) === '[object Object]',
  Ei = (e) =>
    me(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  gn = yi(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  kn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  so = /-(\w)/g,
  Je = kn((e) => e.replace(so, (t, n) => (n ? n.toUpperCase() : ''))),
  ro = /\B([A-Z])/g,
  Dt = kn((e) => e.replace(ro, '-$1').toLowerCase()),
  $n = kn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Wn = kn((e) => (e ? `on${$n(e)}` : '')),
  Jt = (e, t) => !Object.is(e, t),
  Vn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  yn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  oo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  lo = (e) => {
    const t = me(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let es;
const ri = () =>
  es ||
  (es =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {});
function $t(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n],
        s = me(i) ? uo(i) : $t(i);
      if (s) for (const r in s) t[r] = s[r];
    }
    return t;
  } else {
    if (me(e)) return e;
    if (oe(e)) return e;
  }
}
const ao = /;(?![^(]*\))/g,
  co = /:([^]+)/,
  fo = /\/\*[^]*?\*\//g;
function uo(e) {
  const t = {};
  return (
    e
      .replace(fo, '')
      .split(ao)
      .forEach((n) => {
        if (n) {
          const i = n.split(co);
          i.length > 1 && (t[i[0].trim()] = i[1].trim());
        }
      }),
    t
  );
}
function Oe(e) {
  let t = '';
  if (me(e)) t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const i = Oe(e[n]);
      i && (t += i + ' ');
    }
  else if (oe(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const po =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  ho = yi(po);
function Vs(e) {
  return !!e || e === '';
}
const et = (e) =>
    me(e)
      ? e
      : e == null
      ? ''
      : U(e) || (oe(e) && (e.toString === Gs || !J(e.toString)))
      ? JSON.stringify(e, qs, 2)
      : String(e),
  qs = (e, t) =>
    t && t.__v_isRef
      ? qs(e, t.value)
      : Lt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [i, s]) => ((n[`${i} =>`] = s), n),
            {}
          ),
        }
      : js(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : oe(t) && !U(t) && !Ws(t)
      ? String(t)
      : t;
let je;
class mo {
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
function go(e, t = je) {
  t && t.active && t.effects.push(e);
}
function vo() {
  return je;
}
const Ci = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Us = (e) => (e.w & mt) > 0,
  Ks = (e) => (e.n & mt) > 0,
  bo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= mt;
  },
  wo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let i = 0; i < t.length; i++) {
        const s = t[i];
        Us(s) && !Ks(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~mt),
          (s.n &= ~mt);
      }
      t.length = n;
    }
  },
  xn = new WeakMap();
let Vt = 0,
  mt = 1;
const oi = 30;
let He;
const Et = Symbol(''),
  li = Symbol('');
class Mi {
  constructor(t, n = null, i) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      go(this, i);
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
        (mt = 1 << ++Vt),
        Vt <= oi ? bo(this) : ts(this),
        this.fn()
      );
    } finally {
      Vt <= oi && wo(this),
        (mt = 1 << --Vt),
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
        (ts(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ts(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let pt = !0;
const Ys = [];
function Nt() {
  Ys.push(pt), (pt = !1);
}
function Rt() {
  const e = Ys.pop();
  pt = e === void 0 ? !0 : e;
}
function Pe(e, t, n) {
  if (pt && He) {
    let i = xn.get(e);
    i || xn.set(e, (i = new Map()));
    let s = i.get(n);
    s || i.set(n, (s = Ci())), Xs(s);
  }
}
function Xs(e, t) {
  let n = !1;
  Vt <= oi ? Ks(e) || ((e.n |= mt), (n = !Us(e))) : (n = !e.has(He)),
    n && (e.add(He), He.deps.push(e));
}
function nt(e, t, n, i, s, r) {
  const o = xn.get(e);
  if (!o) return;
  let a = [];
  if (t === 'clear') a = [...o.values()];
  else if (n === 'length' && U(e)) {
    const l = Number(i);
    o.forEach((c, d) => {
      (d === 'length' || d >= l) && a.push(c);
    });
  } else
    switch ((n !== void 0 && a.push(o.get(n)), t)) {
      case 'add':
        U(e)
          ? Ei(n) && a.push(o.get('length'))
          : (a.push(o.get(Et)), Lt(e) && a.push(o.get(li)));
        break;
      case 'delete':
        U(e) || (a.push(o.get(Et)), Lt(e) && a.push(o.get(li)));
        break;
      case 'set':
        Lt(e) && a.push(o.get(Et));
        break;
    }
  if (a.length === 1) a[0] && ai(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    ai(Ci(l));
  }
}
function ai(e, t) {
  const n = U(e) ? e : [...e];
  for (const i of n) i.computed && ns(i);
  for (const i of n) i.computed || ns(i);
}
function ns(e, t) {
  (e !== He || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function _o(e, t) {
  var n;
  return (n = xn.get(e)) == null ? void 0 : n.get(t);
}
const yo = yi('__proto__,__v_isRef,__isVue'),
  Js = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ti)
  ),
  xo = Oi(),
  So = Oi(!1, !0),
  To = Oi(!0),
  is = Eo();
function Eo() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const i = te(this);
        for (let r = 0, o = this.length; r < o; r++) Pe(i, 'get', r + '');
        const s = i[t](...n);
        return s === -1 || s === !1 ? i[t](...n.map(te)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        Nt();
        const i = te(this)[t].apply(this, n);
        return Rt(), i;
      };
    }),
    e
  );
}
function Co(e) {
  const t = te(this);
  return Pe(t, 'has', e), t.hasOwnProperty(e);
}
function Oi(e = !1, t = !1) {
  return function (i, s, r) {
    if (s === '__v_isReactive') return !e;
    if (s === '__v_isReadonly') return e;
    if (s === '__v_isShallow') return t;
    if (s === '__v_raw' && r === (e ? (t ? Ho : nr) : t ? tr : er).get(i))
      return i;
    const o = U(i);
    if (!e) {
      if (o && ee(is, s)) return Reflect.get(is, s, r);
      if (s === 'hasOwnProperty') return Co;
    }
    const a = Reflect.get(i, s, r);
    return (Ti(s) ? Js.has(s) : yo(s)) || (e || Pe(i, 'get', s), t)
      ? a
      : _e(a)
      ? o && Ei(s)
        ? a
        : a.value
      : oe(a)
      ? e
        ? ir(a)
        : Li(a)
      : a;
  };
}
const Mo = Zs(),
  Oo = Zs(!0);
function Zs(e = !1) {
  return function (n, i, s, r) {
    let o = n[i];
    if (zt(o) && _e(o) && !_e(s)) return !1;
    if (
      !e &&
      (!Sn(s) && !zt(s) && ((o = te(o)), (s = te(s))), !U(n) && _e(o) && !_e(s))
    )
      return (o.value = s), !0;
    const a = U(n) && Ei(i) ? Number(i) < n.length : ee(n, i),
      l = Reflect.set(n, i, s, r);
    return (
      n === te(r) && (a ? Jt(s, o) && nt(n, 'set', i, s) : nt(n, 'add', i, s)),
      l
    );
  };
}
function Po(e, t) {
  const n = ee(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && n && nt(e, 'delete', t, void 0), i;
}
function Ao(e, t) {
  const n = Reflect.has(e, t);
  return (!Ti(t) || !Js.has(t)) && Pe(e, 'has', t), n;
}
function Lo(e) {
  return Pe(e, 'iterate', U(e) ? 'length' : Et), Reflect.ownKeys(e);
}
const Qs = { get: xo, set: Mo, deleteProperty: Po, has: Ao, ownKeys: Lo },
  Io = {
    get: To,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ko = he({}, Qs, { get: So, set: Oo }),
  Pi = (e) => e,
  zn = (e) => Reflect.getPrototypeOf(e);
function an(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const s = te(e),
    r = te(t);
  n || (t !== r && Pe(s, 'get', t), Pe(s, 'get', r));
  const { has: o } = zn(s),
    a = i ? Pi : n ? ki : Zt;
  if (o.call(s, t)) return a(e.get(t));
  if (o.call(s, r)) return a(e.get(r));
  e !== s && e.get(t);
}
function cn(e, t = !1) {
  const n = this.__v_raw,
    i = te(n),
    s = te(e);
  return (
    t || (e !== s && Pe(i, 'has', e), Pe(i, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function dn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Pe(te(e), 'iterate', Et), Reflect.get(e, 'size', e)
  );
}
function ss(e) {
  e = te(e);
  const t = te(this);
  return zn(t).has.call(t, e) || (t.add(e), nt(t, 'add', e, e)), this;
}
function rs(e, t) {
  t = te(t);
  const n = te(this),
    { has: i, get: s } = zn(n);
  let r = i.call(n, e);
  r || ((e = te(e)), (r = i.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), r ? Jt(t, o) && nt(n, 'set', e, t) : nt(n, 'add', e, t), this
  );
}
function os(e) {
  const t = te(this),
    { has: n, get: i } = zn(t);
  let s = n.call(t, e);
  s || ((e = te(e)), (s = n.call(t, e))), i && i.call(t, e);
  const r = t.delete(e);
  return s && nt(t, 'delete', e, void 0), r;
}
function ls() {
  const e = te(this),
    t = e.size !== 0,
    n = e.clear();
  return t && nt(e, 'clear', void 0, void 0), n;
}
function fn(e, t) {
  return function (i, s) {
    const r = this,
      o = r.__v_raw,
      a = te(o),
      l = t ? Pi : e ? ki : Zt;
    return (
      !e && Pe(a, 'iterate', Et), o.forEach((c, d) => i.call(s, l(c), l(d), r))
    );
  };
}
function un(e, t, n) {
  return function (...i) {
    const s = this.__v_raw,
      r = te(s),
      o = Lt(r),
      a = e === 'entries' || (e === Symbol.iterator && o),
      l = e === 'keys' && o,
      c = s[e](...i),
      d = n ? Pi : t ? ki : Zt;
    return (
      !t && Pe(r, 'iterate', l ? li : Et),
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
function $o() {
  const e = {
      get(r) {
        return an(this, r);
      },
      get size() {
        return dn(this);
      },
      has: cn,
      add: ss,
      set: rs,
      delete: os,
      clear: ls,
      forEach: fn(!1, !1),
    },
    t = {
      get(r) {
        return an(this, r, !1, !0);
      },
      get size() {
        return dn(this);
      },
      has: cn,
      add: ss,
      set: rs,
      delete: os,
      clear: ls,
      forEach: fn(!1, !0),
    },
    n = {
      get(r) {
        return an(this, r, !0);
      },
      get size() {
        return dn(this, !0);
      },
      has(r) {
        return cn.call(this, r, !0);
      },
      add: ot('add'),
      set: ot('set'),
      delete: ot('delete'),
      clear: ot('clear'),
      forEach: fn(!0, !1),
    },
    i = {
      get(r) {
        return an(this, r, !0, !0);
      },
      get size() {
        return dn(this, !0);
      },
      has(r) {
        return cn.call(this, r, !0);
      },
      add: ot('add'),
      set: ot('set'),
      delete: ot('delete'),
      clear: ot('clear'),
      forEach: fn(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      (e[r] = un(r, !1, !1)),
        (n[r] = un(r, !0, !1)),
        (t[r] = un(r, !1, !0)),
        (i[r] = un(r, !0, !0));
    }),
    [e, n, t, i]
  );
}
const [zo, Bo, Do, No] = $o();
function Ai(e, t) {
  const n = t ? (e ? No : Do) : e ? Bo : zo;
  return (i, s, r) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
      ? e
      : s === '__v_raw'
      ? i
      : Reflect.get(ee(n, s) && s in i ? n : i, s, r);
}
const Ro = { get: Ai(!1, !1) },
  Fo = { get: Ai(!1, !0) },
  jo = { get: Ai(!0, !1) },
  er = new WeakMap(),
  tr = new WeakMap(),
  nr = new WeakMap(),
  Ho = new WeakMap();
function Go(e) {
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
function Wo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Go(io(e));
}
function Li(e) {
  return zt(e) ? e : Ii(e, !1, Qs, Ro, er);
}
function Vo(e) {
  return Ii(e, !1, ko, Fo, tr);
}
function ir(e) {
  return Ii(e, !0, Io, jo, nr);
}
function Ii(e, t, n, i, s) {
  if (!oe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = s.get(e);
  if (r) return r;
  const o = Wo(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? i : n);
  return s.set(e, a), a;
}
function It(e) {
  return zt(e) ? It(e.__v_raw) : !!(e && e.__v_isReactive);
}
function zt(e) {
  return !!(e && e.__v_isReadonly);
}
function Sn(e) {
  return !!(e && e.__v_isShallow);
}
function sr(e) {
  return It(e) || zt(e);
}
function te(e) {
  const t = e && e.__v_raw;
  return t ? te(t) : e;
}
function rr(e) {
  return yn(e, '__v_skip', !0), e;
}
const Zt = (e) => (oe(e) ? Li(e) : e),
  ki = (e) => (oe(e) ? ir(e) : e);
function or(e) {
  pt && He && ((e = te(e)), Xs(e.dep || (e.dep = Ci())));
}
function lr(e, t) {
  e = te(e);
  const n = e.dep;
  n && ai(n);
}
function _e(e) {
  return !!(e && e.__v_isRef === !0);
}
function pe(e) {
  return qo(e, !1);
}
function qo(e, t) {
  return _e(e) ? e : new Uo(e, t);
}
class Uo {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : te(t)),
      (this._value = n ? t : Zt(t));
  }
  get value() {
    return or(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Sn(t) || zt(t);
    (t = n ? t : te(t)),
      Jt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Zt(t)), lr(this));
  }
}
function ar(e) {
  return _e(e) ? e.value : e;
}
const Ko = {
  get: (e, t, n) => ar(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const s = e[t];
    return _e(s) && !_e(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, i);
  },
};
function cr(e) {
  return It(e) ? e : new Proxy(e, Ko);
}
function Yo(e) {
  const t = U(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Jo(e, n);
  return t;
}
class Xo {
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
    return _o(te(this._object), this._key);
  }
}
function Jo(e, t, n) {
  const i = e[t];
  return _e(i) ? i : new Xo(e, t, n);
}
class Zo {
  constructor(t, n, i, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Mi(t, () => {
        this._dirty || ((this._dirty = !0), lr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = i);
  }
  get value() {
    const t = te(this);
    return (
      or(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Qo(e, t, n = !1) {
  let i, s;
  const r = J(e);
  return (
    r ? ((i = e), (s = We)) : ((i = e.get), (s = e.set)),
    new Zo(i, s, r || !s, n)
  );
}
function ht(e, t, n, i) {
  let s;
  try {
    s = i ? e(...i) : e();
  } catch (r) {
    Bn(r, t, n);
  }
  return s;
}
function Re(e, t, n, i) {
  if (J(e)) {
    const r = ht(e, t, n, i);
    return (
      r &&
        Hs(r) &&
        r.catch((o) => {
          Bn(o, t, n);
        }),
      r
    );
  }
  const s = [];
  for (let r = 0; r < e.length; r++) s.push(Re(e[r], t, n, i));
  return s;
}
function Bn(e, t, n, i = !0) {
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
  el(e, n, s, i);
}
function el(e, t, n, i = !0) {
  console.error(e);
}
let Qt = !1,
  ci = !1;
const xe = [];
let Ke = 0;
const kt = [];
let Qe = null,
  yt = 0;
const dr = Promise.resolve();
let $i = null;
function zi(e) {
  const t = $i || dr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tl(e) {
  let t = Ke + 1,
    n = xe.length;
  for (; t < n; ) {
    const i = (t + n) >>> 1;
    en(xe[i]) < e ? (t = i + 1) : (n = i);
  }
  return t;
}
function Bi(e) {
  (!xe.length || !xe.includes(e, Qt && e.allowRecurse ? Ke + 1 : Ke)) &&
    (e.id == null ? xe.push(e) : xe.splice(tl(e.id), 0, e), fr());
}
function fr() {
  !Qt && !ci && ((ci = !0), ($i = dr.then(pr)));
}
function nl(e) {
  const t = xe.indexOf(e);
  t > Ke && xe.splice(t, 1);
}
function il(e) {
  U(e)
    ? kt.push(...e)
    : (!Qe || !Qe.includes(e, e.allowRecurse ? yt + 1 : yt)) && kt.push(e),
    fr();
}
function as(e, t = Qt ? Ke + 1 : 0) {
  for (; t < xe.length; t++) {
    const n = xe[t];
    n && n.pre && (xe.splice(t, 1), t--, n());
  }
}
function ur(e) {
  if (kt.length) {
    const t = [...new Set(kt)];
    if (((kt.length = 0), Qe)) {
      Qe.push(...t);
      return;
    }
    for (Qe = t, Qe.sort((n, i) => en(n) - en(i)), yt = 0; yt < Qe.length; yt++)
      Qe[yt]();
    (Qe = null), (yt = 0);
  }
}
const en = (e) => (e.id == null ? 1 / 0 : e.id),
  sl = (e, t) => {
    const n = en(e) - en(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function pr(e) {
  (ci = !1), (Qt = !0), xe.sort(sl);
  const t = We;
  try {
    for (Ke = 0; Ke < xe.length; Ke++) {
      const n = xe[Ke];
      n && n.active !== !1 && ht(n, null, 14);
    }
  } finally {
    (Ke = 0),
      (xe.length = 0),
      ur(),
      (Qt = !1),
      ($i = null),
      (xe.length || kt.length) && pr();
  }
}
function rl(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || re;
  let s = n;
  const r = t.startsWith('update:'),
    o = r && t.slice(7);
  if (o && o in i) {
    const d = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: f, trim: h } = i[d] || re;
    h && (s = n.map((p) => (me(p) ? p.trim() : p))), f && (s = n.map(oo));
  }
  let a,
    l = i[(a = Wn(t))] || i[(a = Wn(Je(t)))];
  !l && r && (l = i[(a = Wn(Dt(t)))]), l && Re(l, e, 6, s);
  const c = i[a + 'Once'];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Re(c, e, 6, s);
  }
}
function hr(e, t, n = !1) {
  const i = t.emitsCache,
    s = i.get(e);
  if (s !== void 0) return s;
  const r = e.emits;
  let o = {},
    a = !1;
  if (!J(e)) {
    const l = (c) => {
      const d = hr(c, t, !0);
      d && ((a = !0), he(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !r && !a
    ? (oe(e) && i.set(e, null), null)
    : (U(r) ? r.forEach((l) => (o[l] = null)) : he(o, r),
      oe(e) && i.set(e, o),
      o);
}
function Dn(e, t) {
  return !e || !Ln(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Dt(t)) || ee(e, t));
}
let ye = null,
  mr = null;
function Tn(e) {
  const t = ye;
  return (ye = e), (mr = (e && e.type.__scopeId) || null), t;
}
function dt(e, t = ye, n) {
  if (!t || e._n) return e;
  const i = (...s) => {
    i._d && ws(-1);
    const r = Tn(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Tn(r), i._d && ws(1);
    }
    return o;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function qn(e) {
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
    setupState: p,
    ctx: T,
    inheritAttrs: b,
  } = e;
  let C, M;
  const g = Tn(e);
  try {
    if (n.shapeFlag & 4) {
      const y = s || i;
      (C = Ue(d.call(y, y, f, r, p, h, T))), (M = l);
    } else {
      const y = t;
      (C = Ue(
        y.length > 1 ? y(r, { attrs: l, slots: a, emit: c }) : y(r, null)
      )),
        (M = t.props ? l : ol(l));
    }
  } catch (y) {
    (Xt.length = 0), Bn(y, e, 1), (C = ne(Xe));
  }
  let w = C;
  if (M && b !== !1) {
    const y = Object.keys(M),
      { shapeFlag: I } = w;
    y.length && I & 7 && (o && y.some(xi) && (M = ll(M, o)), (w = gt(w, M)));
  }
  return (
    n.dirs && ((w = gt(w)), (w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (w.transition = n.transition),
    (C = w),
    Tn(g),
    C
  );
}
const ol = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || Ln(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  ll = (e, t) => {
    const n = {};
    for (const i in e) (!xi(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
    return n;
  };
function al(e, t, n) {
  const { props: i, children: s, component: r } = e,
    { props: o, children: a, patchFlag: l } = t,
    c = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return i ? cs(i, o, c) : !!o;
    if (l & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const h = d[f];
        if (o[h] !== i[h] && !Dn(c, h)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : i === o
      ? !1
      : i
      ? o
        ? cs(i, o, c)
        : !0
      : !!o;
  return !1;
}
function cs(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (t[r] !== e[r] && !Dn(n, r)) return !0;
  }
  return !1;
}
function cl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const dl = (e) => e.__isSuspense;
function fl(e, t) {
  t && t.pendingBranch
    ? U(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : il(e);
}
const pn = {};
function Ut(e, t, n) {
  return gr(e, t, n);
}
function gr(
  e,
  t,
  { immediate: n, deep: i, flush: s, onTrack: r, onTrigger: o } = re
) {
  var a;
  const l = vo() === ((a = be) == null ? void 0 : a.scope) ? be : null;
  let c,
    d = !1,
    f = !1;
  if (
    (_e(e)
      ? ((c = () => e.value), (d = Sn(e)))
      : It(e)
      ? ((c = () => e), (i = !0))
      : U(e)
      ? ((f = !0),
        (d = e.some((y) => It(y) || Sn(y))),
        (c = () =>
          e.map((y) => {
            if (_e(y)) return y.value;
            if (It(y)) return Tt(y);
            if (J(y)) return ht(y, l, 2);
          })))
      : J(e)
      ? t
        ? (c = () => ht(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return h && h(), Re(e, l, 3, [p]);
          })
      : (c = We),
    t && i)
  ) {
    const y = c;
    c = () => Tt(y());
  }
  let h,
    p = (y) => {
      h = g.onStop = () => {
        ht(y, l, 4);
      };
    },
    T;
  if (sn)
    if (
      ((p = We),
      t ? n && Re(t, l, 3, [c(), f ? [] : void 0, p]) : c(),
      s === 'sync')
    ) {
      const y = oa();
      T = y.__watcherHandles || (y.__watcherHandles = []);
    } else return We;
  let b = f ? new Array(e.length).fill(pn) : pn;
  const C = () => {
    if (g.active)
      if (t) {
        const y = g.run();
        (i || d || (f ? y.some((I, F) => Jt(I, b[F])) : Jt(y, b))) &&
          (h && h(),
          Re(t, l, 3, [y, b === pn ? void 0 : f && b[0] === pn ? [] : b, p]),
          (b = y));
      } else g.run();
  };
  C.allowRecurse = !!t;
  let M;
  s === 'sync'
    ? (M = C)
    : s === 'post'
    ? (M = () => Me(C, l && l.suspense))
    : ((C.pre = !0), l && (C.id = l.uid), (M = () => Bi(C)));
  const g = new Mi(c, M);
  t
    ? n
      ? C()
      : (b = g.run())
    : s === 'post'
    ? Me(g.run.bind(g), l && l.suspense)
    : g.run();
  const w = () => {
    g.stop(), l && l.scope && Si(l.scope.effects, g);
  };
  return T && T.push(w), w;
}
function ul(e, t, n) {
  const i = this.proxy,
    s = me(e) ? (e.includes('.') ? vr(i, e) : () => i[e]) : e.bind(i, i);
  let r;
  J(t) ? (r = t) : ((r = t.handler), (n = t));
  const o = be;
  Bt(this);
  const a = gr(s, r.bind(i), n);
  return o ? Bt(o) : Ct(), a;
}
function vr(e, t) {
  const n = t.split('.');
  return () => {
    let i = e;
    for (let s = 0; s < n.length && i; s++) i = i[n[s]];
    return i;
  };
}
function Tt(e, t) {
  if (!oe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), _e(e))) Tt(e.value, t);
  else if (U(e)) for (let n = 0; n < e.length; n++) Tt(e[n], t);
  else if (js(e) || Lt(e))
    e.forEach((n) => {
      Tt(n, t);
    });
  else if (Ws(e)) for (const n in e) Tt(e[n], t);
  return e;
}
function Di(e, t) {
  const n = ye;
  if (n === null) return e;
  const i = Hn(n) || n.proxy,
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
    l && (Nt(), Re(l, n, 8, [e.el, a, e, t]), Rt());
  }
}
function pl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    on(() => {
      e.isMounted = !0;
    }),
    ln(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const De = [Function, Array],
  br = {
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
  hl = {
    name: 'BaseTransition',
    props: br,
    setup(e, { slots: t }) {
      const n = Zl(),
        i = pl();
      let s;
      return () => {
        const r = t.default && _r(t.default(), !0);
        if (!r || !r.length) return;
        let o = r[0];
        if (r.length > 1) {
          for (const b of r)
            if (b.type !== Xe) {
              o = b;
              break;
            }
        }
        const a = te(e),
          { mode: l } = a;
        if (i.isLeaving) return Un(o);
        const c = ds(o);
        if (!c) return Un(o);
        const d = di(c, a, i, n);
        fi(c, d);
        const f = n.subTree,
          h = f && ds(f);
        let p = !1;
        const { getTransitionKey: T } = c.type;
        if (T) {
          const b = T();
          s === void 0 ? (s = b) : b !== s && ((s = b), (p = !0));
        }
        if (h && h.type !== Xe && (!xt(c, h) || p)) {
          const b = di(h, a, i, n);
          if ((fi(h, b), l === 'out-in'))
            return (
              (i.isLeaving = !0),
              (b.afterLeave = () => {
                (i.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Un(o)
            );
          l === 'in-out' &&
            c.type !== Xe &&
            (b.delayLeave = (C, M, g) => {
              const w = wr(i, h);
              (w[String(h.key)] = h),
                (C._leaveCb = () => {
                  M(), (C._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = g);
            });
        }
        return o;
      };
    },
  },
  ml = hl;
function wr(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || ((i = Object.create(null)), n.set(t.type, i)), i;
}
function di(e, t, n, i) {
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
      onAfterLeave: p,
      onLeaveCancelled: T,
      onBeforeAppear: b,
      onAppear: C,
      onAfterAppear: M,
      onAppearCancelled: g,
    } = t,
    w = String(e.key),
    y = wr(n, e),
    I = (L, _) => {
      L && Re(L, i, 9, _);
    },
    F = (L, _) => {
      const $ = _[1];
      I(L, _),
        U(L) ? L.every((x) => x.length <= 1) && $() : L.length <= 1 && $();
    },
    j = {
      mode: r,
      persisted: o,
      beforeEnter(L) {
        let _ = a;
        if (!n.isMounted)
          if (s) _ = b || a;
          else return;
        L._leaveCb && L._leaveCb(!0);
        const $ = y[w];
        $ && xt(e, $) && $.el._leaveCb && $.el._leaveCb(), I(_, [L]);
      },
      enter(L) {
        let _ = l,
          $ = c,
          x = d;
        if (!n.isMounted)
          if (s) (_ = C || l), ($ = M || c), (x = g || d);
          else return;
        let m = !1;
        const E = (L._enterCb = (O) => {
          m ||
            ((m = !0),
            O ? I(x, [L]) : I($, [L]),
            j.delayedLeave && j.delayedLeave(),
            (L._enterCb = void 0));
        });
        _ ? F(_, [L, E]) : E();
      },
      leave(L, _) {
        const $ = String(e.key);
        if ((L._enterCb && L._enterCb(!0), n.isUnmounting)) return _();
        I(f, [L]);
        let x = !1;
        const m = (L._leaveCb = (E) => {
          x ||
            ((x = !0),
            _(),
            E ? I(T, [L]) : I(p, [L]),
            (L._leaveCb = void 0),
            y[$] === e && delete y[$]);
        });
        (y[$] = e), h ? F(h, [L, m]) : m();
      },
      clone(L) {
        return di(L, t, n, i);
      },
    };
  return j;
}
function Un(e) {
  if (Nn(e)) return (e = gt(e)), (e.children = null), e;
}
function ds(e) {
  return Nn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function fi(e, t) {
  e.shapeFlag & 6 && e.component
    ? fi(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function _r(e, t = !1, n) {
  let i = [],
    s = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === we
      ? (o.patchFlag & 128 && s++, (i = i.concat(_r(o.children, t, a))))
      : (t || o.type !== Xe) && i.push(a != null ? gt(o, { key: a }) : o);
  }
  if (s > 1) for (let r = 0; r < i.length; r++) i[r].patchFlag = -2;
  return i;
}
function gl(e, t) {
  return J(e) ? (() => he({ name: e.name }, t, { setup: e }))() : e;
}
const Kt = (e) => !!e.type.__asyncLoader,
  Nn = (e) => e.type.__isKeepAlive;
function vl(e, t) {
  yr(e, 'a', t);
}
function bl(e, t) {
  yr(e, 'da', t);
}
function yr(e, t, n = be) {
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
  if ((Rn(t, i, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      Nn(s.parent.vnode) && wl(i, t, n, s), (s = s.parent);
  }
}
function wl(e, t, n, i) {
  const s = Rn(t, e, i, !0);
  Sr(() => {
    Si(i[t], s);
  }, n);
}
function Rn(e, t, n = be, i = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          Nt(), Bt(n);
          const a = Re(t, n, e, o);
          return Ct(), Rt(), a;
        });
    return i ? s.unshift(r) : s.push(r), r;
  }
}
const it =
    (e) =>
    (t, n = be) =>
      (!sn || e === 'sp') && Rn(e, (...i) => t(...i), n),
  _l = it('bm'),
  on = it('m'),
  xr = it('bu'),
  Ni = it('u'),
  ln = it('bum'),
  Sr = it('um'),
  yl = it('sp'),
  xl = it('rtg'),
  Sl = it('rtc');
function Tl(e, t = be) {
  Rn('ec', e, t);
}
const Tr = 'components';
function tt(e, t) {
  return Cl(Tr, e, !0, t) || e;
}
const El = Symbol.for('v-ndc');
function Cl(e, t, n = !0, i = !1) {
  const s = ye || be;
  if (s) {
    const r = s.type;
    if (e === Tr) {
      const a = ia(r, !1);
      if (a && (a === t || a === Je(t) || a === $n(Je(t)))) return r;
    }
    const o = fs(s[e] || r[e], t) || fs(s.appContext[e], t);
    return !o && i ? r : o;
  }
}
function fs(e, t) {
  return e && (e[t] || e[Je(t)] || e[$n(Je(t))]);
}
function tn(e, t, n, i) {
  let s;
  const r = n && n[i];
  if (U(e) || me(e)) {
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
function Er(e, t, n = {}, i, s) {
  if (ye.isCE || (ye.parent && Kt(ye.parent) && ye.parent.isCE))
    return t !== 'default' && (n.name = t), ne('slot', n, i && i());
  let r = e[t];
  r && r._c && (r._d = !1), ce();
  const o = r && Cr(r(n)),
    a = Br(
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
function Cr(e) {
  return e.some((t) =>
    Mn(t) ? !(t.type === Xe || (t.type === we && !Cr(t.children))) : !0
  )
    ? e
    : null;
}
const ui = (e) => (e ? (Nr(e) ? Hn(e) || e.proxy : ui(e.parent)) : null),
  Yt = he(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ui(e.parent),
    $root: (e) => ui(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ri(e),
    $forceUpdate: (e) => e.f || (e.f = () => Bi(e.update)),
    $nextTick: (e) => e.n || (e.n = zi.bind(e.proxy)),
    $watch: (e) => ul.bind(e),
  }),
  Kn = (e, t) => e !== re && !e.__isScriptSetup && ee(e, t),
  Ml = {
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
        const p = o[t];
        if (p !== void 0)
          switch (p) {
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
          if (Kn(i, t)) return (o[t] = 1), i[t];
          if (s !== re && ee(s, t)) return (o[t] = 2), s[t];
          if ((c = e.propsOptions[0]) && ee(c, t)) return (o[t] = 3), r[t];
          if (n !== re && ee(n, t)) return (o[t] = 4), n[t];
          hi && (o[t] = 0);
        }
      }
      const d = Yt[t];
      let f, h;
      if (d) return t === '$attrs' && Pe(e, 'get', t), d(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== re && ee(n, t)) return (o[t] = 4), n[t];
      if (((h = l.config.globalProperties), ee(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: i, setupState: s, ctx: r } = e;
      return Kn(s, t)
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
        Kn(t, o) ||
        ((a = r[0]) && ee(a, o)) ||
        ee(i, o) ||
        ee(Yt, o) ||
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
function pi(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function Ol(e, t) {
  const n = pi(e);
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
let hi = !0;
function Pl(e) {
  const t = Ri(e),
    n = e.proxy,
    i = e.ctx;
  (hi = !1), t.beforeCreate && us(t.beforeCreate, e, 'bc');
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
    beforeUpdate: p,
    updated: T,
    activated: b,
    deactivated: C,
    beforeDestroy: M,
    beforeUnmount: g,
    destroyed: w,
    unmounted: y,
    render: I,
    renderTracked: F,
    renderTriggered: j,
    errorCaptured: L,
    serverPrefetch: _,
    expose: $,
    inheritAttrs: x,
    components: m,
    directives: E,
    filters: O,
  } = t;
  if ((c && Al(c, i, null), o))
    for (const Y in o) {
      const K = o[Y];
      J(K) && (i[Y] = K.bind(n));
    }
  if (s) {
    const Y = s.call(n, n);
    oe(Y) && (e.data = Li(Y));
  }
  if (((hi = !0), r))
    for (const Y in r) {
      const K = r[Y],
        Z = J(K) ? K.bind(n, n) : J(K.get) ? K.get.bind(n, n) : We,
        ke = !J(K) && J(K.set) ? K.set.bind(n) : We,
        Ee = Vi({ get: Z, set: ke });
      Object.defineProperty(i, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (ve) => (Ee.value = ve),
      });
    }
  if (a) for (const Y in a) Mr(a[Y], i, n, Y);
  if (l) {
    const Y = J(l) ? l.call(n) : l;
    Reflect.ownKeys(Y).forEach((K) => {
      Fi(K, Y[K]);
    });
  }
  d && us(d, e, 'c');
  function G(Y, K) {
    U(K) ? K.forEach((Z) => Y(Z.bind(n))) : K && Y(K.bind(n));
  }
  if (
    (G(_l, f),
    G(on, h),
    G(xr, p),
    G(Ni, T),
    G(vl, b),
    G(bl, C),
    G(Tl, L),
    G(Sl, F),
    G(xl, j),
    G(ln, g),
    G(Sr, y),
    G(yl, _),
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
  I && e.render === We && (e.render = I),
    x != null && (e.inheritAttrs = x),
    m && (e.components = m),
    E && (e.directives = E);
}
function Al(e, t, n = We) {
  U(e) && (e = mi(e));
  for (const i in e) {
    const s = e[i];
    let r;
    oe(s)
      ? 'default' in s
        ? (r = vn(s.from || i, s.default, !0))
        : (r = vn(s.from || i))
      : (r = vn(s)),
      _e(r)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: (o) => (r.value = o),
          })
        : (t[i] = r);
  }
}
function us(e, t, n) {
  Re(U(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Mr(e, t, n, i) {
  const s = i.includes('.') ? vr(n, i) : () => n[i];
  if (me(e)) {
    const r = t[e];
    J(r) && Ut(s, r);
  } else if (J(e)) Ut(s, e.bind(n));
  else if (oe(e))
    if (U(e)) e.forEach((r) => Mr(r, t, n, i));
    else {
      const r = J(e.handler) ? e.handler.bind(n) : t[e.handler];
      J(r) && Ut(s, r, e);
    }
}
function Ri(e) {
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
      : ((l = {}), s.length && s.forEach((c) => En(l, c, o, !0)), En(l, t, o)),
    oe(t) && r.set(t, l),
    l
  );
}
function En(e, t, n, i = !1) {
  const { mixins: s, extends: r } = t;
  r && En(e, r, n, !0), s && s.forEach((o) => En(e, o, n, !0));
  for (const o in t)
    if (!(i && o === 'expose')) {
      const a = Ll[o] || (n && n[o]);
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const Ll = {
  data: ps,
  props: hs,
  emits: hs,
  methods: qt,
  computed: qt,
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
  components: qt,
  directives: qt,
  watch: kl,
  provide: ps,
  inject: Il,
};
function ps(e, t) {
  return t
    ? e
      ? function () {
          return he(
            J(e) ? e.call(this, this) : e,
            J(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Il(e, t) {
  return qt(mi(e), mi(t));
}
function mi(e) {
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
function qt(e, t) {
  return e ? he(Object.create(null), e, t) : t;
}
function hs(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : he(Object.create(null), pi(e), pi(t ?? {}))
    : t;
}
function kl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = he(Object.create(null), e);
  for (const i in t) n[i] = Te(e[i], t[i]);
  return n;
}
function Or() {
  return {
    app: null,
    config: {
      isNativeTag: eo,
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
let $l = 0;
function zl(e, t) {
  return function (i, s = null) {
    J(i) || (i = he({}, i)), s != null && !oe(s) && (s = null);
    const r = Or(),
      o = new Set();
    let a = !1;
    const l = (r.app = {
      _uid: $l++,
      _component: i,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: la,
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
            Hn(h.component) || h.component.proxy
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
        Cn = l;
        try {
          return c();
        } finally {
          Cn = null;
        }
      },
    });
    return l;
  };
}
let Cn = null;
function Fi(e, t) {
  if (be) {
    let n = be.provides;
    const i = be.parent && be.parent.provides;
    i === n && (n = be.provides = Object.create(i)), (n[e] = t);
  }
}
function vn(e, t, n = !1) {
  const i = be || ye;
  if (i || Cn) {
    const s = i
      ? i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides
      : Cn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && J(t) ? t.call(i && i.proxy) : t;
  }
}
function Bl(e, t, n, i = !1) {
  const s = {},
    r = {};
  yn(r, jn, 1), (e.propsDefaults = Object.create(null)), Pr(e, t, s, r);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = i ? s : Vo(s)) : e.type.props ? (e.props = s) : (e.props = r),
    (e.attrs = r);
}
function Dl(e, t, n, i) {
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
        if (Dn(e.emitsOptions, h)) continue;
        const p = t[h];
        if (l)
          if (ee(r, h)) p !== r[h] && ((r[h] = p), (c = !0));
          else {
            const T = Je(h);
            s[T] = gi(l, a, T, p, e, !1);
          }
        else p !== r[h] && ((r[h] = p), (c = !0));
      }
    }
  } else {
    Pr(e, t, s, r) && (c = !0);
    let d;
    for (const f in a)
      (!t || (!ee(t, f) && ((d = Dt(f)) === f || !ee(t, d)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[d] !== void 0) &&
            (s[f] = gi(l, a, f, void 0, e, !0))
          : delete s[f]);
    if (r !== a)
      for (const f in r) (!t || !ee(t, f)) && (delete r[f], (c = !0));
  }
  c && nt(e, 'set', '$attrs');
}
function Pr(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1,
    a;
  if (t)
    for (let l in t) {
      if (gn(l)) continue;
      const c = t[l];
      let d;
      s && ee(s, (d = Je(l)))
        ? !r || !r.includes(d)
          ? (n[d] = c)
          : ((a || (a = {}))[d] = c)
        : Dn(e.emitsOptions, l) ||
          ((!(l in i) || c !== i[l]) && ((i[l] = c), (o = !0)));
    }
  if (r) {
    const l = te(n),
      c = a || re;
    for (let d = 0; d < r.length; d++) {
      const f = r[d];
      n[f] = gi(s, l, f, c[f], e, !ee(c, f));
    }
  }
  return o;
}
function gi(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
    const a = ee(o, 'default');
    if (a && i === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && J(l)) {
        const { propsDefaults: c } = s;
        n in c ? (i = c[n]) : (Bt(s), (i = c[n] = l.call(null, t)), Ct());
      } else i = l;
    }
    o[0] &&
      (r && !a ? (i = !1) : o[1] && (i === '' || i === Dt(n)) && (i = !0));
  }
  return i;
}
function Ar(e, t, n = !1) {
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
      const [h, p] = Ar(f, t, !0);
      he(o, h), p && a.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!r && !l) return oe(e) && i.set(e, At), At;
  if (U(r))
    for (let d = 0; d < r.length; d++) {
      const f = Je(r[d]);
      ms(f) && (o[f] = re);
    }
  else if (r)
    for (const d in r) {
      const f = Je(d);
      if (ms(f)) {
        const h = r[d],
          p = (o[f] = U(h) || J(h) ? { type: h } : he({}, h));
        if (p) {
          const T = bs(Boolean, p.type),
            b = bs(String, p.type);
          (p[0] = T > -1),
            (p[1] = b < 0 || T < b),
            (T > -1 || ee(p, 'default')) && a.push(f);
        }
      }
    }
  const c = [o, a];
  return oe(e) && i.set(e, c), c;
}
function ms(e) {
  return e[0] !== '$';
}
function gs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function vs(e, t) {
  return gs(e) === gs(t);
}
function bs(e, t) {
  return U(t) ? t.findIndex((n) => vs(n, e)) : J(t) && vs(t, e) ? 0 : -1;
}
const Lr = (e) => e[0] === '_' || e === '$stable',
  ji = (e) => (U(e) ? e.map(Ue) : [Ue(e)]),
  Nl = (e, t, n) => {
    if (t._n) return t;
    const i = dt((...s) => ji(t(...s)), n);
    return (i._c = !1), i;
  },
  Ir = (e, t, n) => {
    const i = e._ctx;
    for (const s in e) {
      if (Lr(s)) continue;
      const r = e[s];
      if (J(r)) t[s] = Nl(s, r, i);
      else if (r != null) {
        const o = ji(r);
        t[s] = () => o;
      }
    }
  },
  kr = (e, t) => {
    const n = ji(t);
    e.slots.default = () => n;
  },
  Rl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = te(t)), yn(t, '_', n)) : Ir(t, (e.slots = {}));
    } else (e.slots = {}), t && kr(e, t);
    yn(e.slots, jn, 1);
  },
  Fl = (e, t, n) => {
    const { vnode: i, slots: s } = e;
    let r = !0,
      o = re;
    if (i.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (r = !1)
          : (he(s, t), !n && a === 1 && delete s._)
        : ((r = !t.$stable), Ir(t, s)),
        (o = t);
    } else t && (kr(e, t), (o = { default: 1 }));
    if (r) for (const a in s) !Lr(a) && !(a in o) && delete s[a];
  };
function vi(e, t, n, i, s = !1) {
  if (U(e)) {
    e.forEach((h, p) => vi(h, t && (U(t) ? t[p] : t), n, i, s));
    return;
  }
  if (Kt(i) && !s) return;
  const r = i.shapeFlag & 4 ? Hn(i.component) || i.component.proxy : i.el,
    o = s ? null : r,
    { i: a, r: l } = e,
    c = t && t.r,
    d = a.refs === re ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (c != null &&
      c !== l &&
      (me(c)
        ? ((d[c] = null), ee(f, c) && (f[c] = null))
        : _e(c) && (c.value = null)),
    J(l))
  )
    ht(l, a, 12, [o, d]);
  else {
    const h = me(l),
      p = _e(l);
    if (h || p) {
      const T = () => {
        if (e.f) {
          const b = h ? (ee(f, l) ? f[l] : d[l]) : l.value;
          s
            ? U(b) && Si(b, r)
            : U(b)
            ? b.includes(r) || b.push(r)
            : h
            ? ((d[l] = [r]), ee(f, l) && (f[l] = d[l]))
            : ((l.value = [r]), e.k && (d[e.k] = l.value));
        } else
          h
            ? ((d[l] = o), ee(f, l) && (f[l] = o))
            : p && ((l.value = o), e.k && (d[e.k] = o));
      };
      o ? ((T.id = -1), Me(T, n)) : T();
    }
  }
}
const Me = fl;
function jl(e) {
  return Hl(e);
}
function Hl(e, t) {
  const n = ri();
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
      setScopeId: p = We,
      insertStaticContent: T,
    } = e,
    b = (
      u,
      v,
      S,
      P = null,
      A = null,
      z = null,
      H = !1,
      B = null,
      N = !!v.dynamicChildren
    ) => {
      if (u === v) return;
      u && !xt(u, v) && ((P = le(u)), ve(u, A, z, !0), (u = null)),
        v.patchFlag === -2 && ((N = !1), (v.dynamicChildren = null));
      const { type: k, ref: V, shapeFlag: W } = v;
      switch (k) {
        case Fn:
          C(u, v, S, P);
          break;
        case Xe:
          M(u, v, S, P);
          break;
        case bn:
          u == null && g(v, S, P, H);
          break;
        case we:
          m(u, v, S, P, A, z, H, B, N);
          break;
        default:
          W & 1
            ? I(u, v, S, P, A, z, H, B, N)
            : W & 6
            ? E(u, v, S, P, A, z, H, B, N)
            : (W & 64 || W & 128) && k.process(u, v, S, P, A, z, H, B, N, fe);
      }
      V != null && A && vi(V, u && u.ref, z, v || u, !v);
    },
    C = (u, v, S, P) => {
      if (u == null) i((v.el = a(v.children)), S, P);
      else {
        const A = (v.el = u.el);
        v.children !== u.children && c(A, v.children);
      }
    },
    M = (u, v, S, P) => {
      u == null ? i((v.el = l(v.children || '')), S, P) : (v.el = u.el);
    },
    g = (u, v, S, P) => {
      [u.el, u.anchor] = T(u.children, v, S, P, u.el, u.anchor);
    },
    w = ({ el: u, anchor: v }, S, P) => {
      let A;
      for (; u && u !== v; ) (A = h(u)), i(u, S, P), (u = A);
      i(v, S, P);
    },
    y = ({ el: u, anchor: v }) => {
      let S;
      for (; u && u !== v; ) (S = h(u)), s(u), (u = S);
      s(v);
    },
    I = (u, v, S, P, A, z, H, B, N) => {
      (H = H || v.type === 'svg'),
        u == null ? F(v, S, P, A, z, H, B, N) : _(u, v, A, z, H, B, N);
    },
    F = (u, v, S, P, A, z, H, B) => {
      let N, k;
      const { type: V, props: W, shapeFlag: q, transition: X, dirs: Q } = u;
      if (
        ((N = u.el = o(u.type, z, W && W.is, W)),
        q & 8
          ? d(N, u.children)
          : q & 16 &&
            L(u.children, N, null, P, A, z && V !== 'foreignObject', H, B),
        Q && vt(u, null, P, 'created'),
        j(N, u, u.scopeId, H, P),
        W)
      ) {
        for (const ie in W)
          ie !== 'value' &&
            !gn(ie) &&
            r(N, ie, null, W[ie], z, u.children, P, A, de);
        'value' in W && r(N, 'value', null, W.value),
          (k = W.onVnodeBeforeMount) && qe(k, P, u);
      }
      Q && vt(u, null, P, 'beforeMount');
      const se = (!A || (A && !A.pendingBranch)) && X && !X.persisted;
      se && X.beforeEnter(N),
        i(N, v, S),
        ((k = W && W.onVnodeMounted) || se || Q) &&
          Me(() => {
            k && qe(k, P, u), se && X.enter(N), Q && vt(u, null, P, 'mounted');
          }, A);
    },
    j = (u, v, S, P, A) => {
      if ((S && p(u, S), P)) for (let z = 0; z < P.length; z++) p(u, P[z]);
      if (A) {
        let z = A.subTree;
        if (v === z) {
          const H = A.vnode;
          j(u, H, H.scopeId, H.slotScopeIds, A.parent);
        }
      }
    },
    L = (u, v, S, P, A, z, H, B, N = 0) => {
      for (let k = N; k < u.length; k++) {
        const V = (u[k] = B ? ct(u[k]) : Ue(u[k]));
        b(null, V, v, S, P, A, z, H, B);
      }
    },
    _ = (u, v, S, P, A, z, H) => {
      const B = (v.el = u.el);
      let { patchFlag: N, dynamicChildren: k, dirs: V } = v;
      N |= u.patchFlag & 16;
      const W = u.props || re,
        q = v.props || re;
      let X;
      S && bt(S, !1),
        (X = q.onVnodeBeforeUpdate) && qe(X, S, v, u),
        V && vt(v, u, S, 'beforeUpdate'),
        S && bt(S, !0);
      const Q = A && v.type !== 'foreignObject';
      if (
        (k
          ? $(u.dynamicChildren, k, B, S, P, Q, z)
          : H || K(u, v, B, null, S, P, Q, z, !1),
        N > 0)
      ) {
        if (N & 16) x(B, v, W, q, S, P, A);
        else if (
          (N & 2 && W.class !== q.class && r(B, 'class', null, q.class, A),
          N & 4 && r(B, 'style', W.style, q.style, A),
          N & 8)
        ) {
          const se = v.dynamicProps;
          for (let ie = 0; ie < se.length; ie++) {
            const ue = se[ie],
              Fe = W[ue],
              Ot = q[ue];
            (Ot !== Fe || ue === 'value') &&
              r(B, ue, Fe, Ot, A, u.children, S, P, de);
          }
        }
        N & 1 && u.children !== v.children && d(B, v.children);
      } else !H && k == null && x(B, v, W, q, S, P, A);
      ((X = q.onVnodeUpdated) || V) &&
        Me(() => {
          X && qe(X, S, v, u), V && vt(v, u, S, 'updated');
        }, P);
    },
    $ = (u, v, S, P, A, z, H) => {
      for (let B = 0; B < v.length; B++) {
        const N = u[B],
          k = v[B],
          V =
            N.el && (N.type === we || !xt(N, k) || N.shapeFlag & 70)
              ? f(N.el)
              : S;
        b(N, k, V, null, P, A, z, H, !0);
      }
    },
    x = (u, v, S, P, A, z, H) => {
      if (S !== P) {
        if (S !== re)
          for (const B in S)
            !gn(B) && !(B in P) && r(u, B, S[B], null, H, v.children, A, z, de);
        for (const B in P) {
          if (gn(B)) continue;
          const N = P[B],
            k = S[B];
          N !== k && B !== 'value' && r(u, B, k, N, H, v.children, A, z, de);
        }
        'value' in P && r(u, 'value', S.value, P.value);
      }
    },
    m = (u, v, S, P, A, z, H, B, N) => {
      const k = (v.el = u ? u.el : a('')),
        V = (v.anchor = u ? u.anchor : a(''));
      let { patchFlag: W, dynamicChildren: q, slotScopeIds: X } = v;
      X && (B = B ? B.concat(X) : X),
        u == null
          ? (i(k, S, P), i(V, S, P), L(v.children, S, V, A, z, H, B, N))
          : W > 0 && W & 64 && q && u.dynamicChildren
          ? ($(u.dynamicChildren, q, S, A, z, H, B),
            (v.key != null || (A && v === A.subTree)) && $r(u, v, !0))
          : K(u, v, S, V, A, z, H, B, N);
    },
    E = (u, v, S, P, A, z, H, B, N) => {
      (v.slotScopeIds = B),
        u == null
          ? v.shapeFlag & 512
            ? A.ctx.activate(v, S, P, H, N)
            : O(v, S, P, A, z, H, N)
          : R(u, v, N);
    },
    O = (u, v, S, P, A, z, H) => {
      const B = (u.component = Jl(u, P, A));
      if ((Nn(u) && (B.ctx.renderer = fe), Ql(B), B.asyncDep)) {
        if ((A && A.registerDep(B, G), !u.el)) {
          const N = (B.subTree = ne(Xe));
          M(null, N, v, S);
        }
        return;
      }
      G(B, u, v, S, A, z, H);
    },
    R = (u, v, S) => {
      const P = (v.component = u.component);
      if (al(u, v, S))
        if (P.asyncDep && !P.asyncResolved) {
          Y(P, v, S);
          return;
        } else (P.next = v), nl(P.update), P.update();
      else (v.el = u.el), (P.vnode = v);
    },
    G = (u, v, S, P, A, z, H) => {
      const B = () => {
          if (u.isMounted) {
            let { next: V, bu: W, u: q, parent: X, vnode: Q } = u,
              se = V,
              ie;
            bt(u, !1),
              V ? ((V.el = Q.el), Y(u, V, H)) : (V = Q),
              W && Vn(W),
              (ie = V.props && V.props.onVnodeBeforeUpdate) && qe(ie, X, V, Q),
              bt(u, !0);
            const ue = qn(u),
              Fe = u.subTree;
            (u.subTree = ue),
              b(Fe, ue, f(Fe.el), le(Fe), u, A, z),
              (V.el = ue.el),
              se === null && cl(u, ue.el),
              q && Me(q, A),
              (ie = V.props && V.props.onVnodeUpdated) &&
                Me(() => qe(ie, X, V, Q), A);
          } else {
            let V;
            const { el: W, props: q } = v,
              { bm: X, m: Q, parent: se } = u,
              ie = Kt(v);
            if (
              (bt(u, !1),
              X && Vn(X),
              !ie && (V = q && q.onVnodeBeforeMount) && qe(V, se, v),
              bt(u, !0),
              W && Be)
            ) {
              const ue = () => {
                (u.subTree = qn(u)), Be(W, u.subTree, u, A, null);
              };
              ie
                ? v.type.__asyncLoader().then(() => !u.isUnmounted && ue())
                : ue();
            } else {
              const ue = (u.subTree = qn(u));
              b(null, ue, S, P, u, A, z), (v.el = ue.el);
            }
            if ((Q && Me(Q, A), !ie && (V = q && q.onVnodeMounted))) {
              const ue = v;
              Me(() => qe(V, se, ue), A);
            }
            (v.shapeFlag & 256 ||
              (se && Kt(se.vnode) && se.vnode.shapeFlag & 256)) &&
              u.a &&
              Me(u.a, A),
              (u.isMounted = !0),
              (v = S = P = null);
          }
        },
        N = (u.effect = new Mi(B, () => Bi(k), u.scope)),
        k = (u.update = () => N.run());
      (k.id = u.uid), bt(u, !0), k();
    },
    Y = (u, v, S) => {
      v.component = u;
      const P = u.vnode.props;
      (u.vnode = v),
        (u.next = null),
        Dl(u, v.props, P, S),
        Fl(u, v.children, S),
        Nt(),
        as(),
        Rt();
    },
    K = (u, v, S, P, A, z, H, B, N = !1) => {
      const k = u && u.children,
        V = u ? u.shapeFlag : 0,
        W = v.children,
        { patchFlag: q, shapeFlag: X } = v;
      if (q > 0) {
        if (q & 128) {
          ke(k, W, S, P, A, z, H, B, N);
          return;
        } else if (q & 256) {
          Z(k, W, S, P, A, z, H, B, N);
          return;
        }
      }
      X & 8
        ? (V & 16 && de(k, A, z), W !== k && d(S, W))
        : V & 16
        ? X & 16
          ? ke(k, W, S, P, A, z, H, B, N)
          : de(k, A, z, !0)
        : (V & 8 && d(S, ''), X & 16 && L(W, S, P, A, z, H, B, N));
    },
    Z = (u, v, S, P, A, z, H, B, N) => {
      (u = u || At), (v = v || At);
      const k = u.length,
        V = v.length,
        W = Math.min(k, V);
      let q;
      for (q = 0; q < W; q++) {
        const X = (v[q] = N ? ct(v[q]) : Ue(v[q]));
        b(u[q], X, S, null, A, z, H, B, N);
      }
      k > V ? de(u, A, z, !0, !1, W) : L(v, S, P, A, z, H, B, N, W);
    },
    ke = (u, v, S, P, A, z, H, B, N) => {
      let k = 0;
      const V = v.length;
      let W = u.length - 1,
        q = V - 1;
      for (; k <= W && k <= q; ) {
        const X = u[k],
          Q = (v[k] = N ? ct(v[k]) : Ue(v[k]));
        if (xt(X, Q)) b(X, Q, S, null, A, z, H, B, N);
        else break;
        k++;
      }
      for (; k <= W && k <= q; ) {
        const X = u[W],
          Q = (v[q] = N ? ct(v[q]) : Ue(v[q]));
        if (xt(X, Q)) b(X, Q, S, null, A, z, H, B, N);
        else break;
        W--, q--;
      }
      if (k > W) {
        if (k <= q) {
          const X = q + 1,
            Q = X < V ? v[X].el : P;
          for (; k <= q; )
            b(null, (v[k] = N ? ct(v[k]) : Ue(v[k])), S, Q, A, z, H, B, N), k++;
        }
      } else if (k > q) for (; k <= W; ) ve(u[k], A, z, !0), k++;
      else {
        const X = k,
          Q = k,
          se = new Map();
        for (k = Q; k <= q; k++) {
          const Le = (v[k] = N ? ct(v[k]) : Ue(v[k]));
          Le.key != null && se.set(Le.key, k);
        }
        let ie,
          ue = 0;
        const Fe = q - Q + 1;
        let Ot = !1,
          Ji = 0;
        const jt = new Array(Fe);
        for (k = 0; k < Fe; k++) jt[k] = 0;
        for (k = X; k <= W; k++) {
          const Le = u[k];
          if (ue >= Fe) {
            ve(Le, A, z, !0);
            continue;
          }
          let Ve;
          if (Le.key != null) Ve = se.get(Le.key);
          else
            for (ie = Q; ie <= q; ie++)
              if (jt[ie - Q] === 0 && xt(Le, v[ie])) {
                Ve = ie;
                break;
              }
          Ve === void 0
            ? ve(Le, A, z, !0)
            : ((jt[Ve - Q] = k + 1),
              Ve >= Ji ? (Ji = Ve) : (Ot = !0),
              b(Le, v[Ve], S, null, A, z, H, B, N),
              ue++);
        }
        const Zi = Ot ? Gl(jt) : At;
        for (ie = Zi.length - 1, k = Fe - 1; k >= 0; k--) {
          const Le = Q + k,
            Ve = v[Le],
            Qi = Le + 1 < V ? v[Le + 1].el : P;
          jt[k] === 0
            ? b(null, Ve, S, Qi, A, z, H, B, N)
            : Ot && (ie < 0 || k !== Zi[ie] ? Ee(Ve, S, Qi, 2) : ie--);
        }
      }
    },
    Ee = (u, v, S, P, A = null) => {
      const { el: z, type: H, transition: B, children: N, shapeFlag: k } = u;
      if (k & 6) {
        Ee(u.component.subTree, v, S, P);
        return;
      }
      if (k & 128) {
        u.suspense.move(v, S, P);
        return;
      }
      if (k & 64) {
        H.move(u, v, S, fe);
        return;
      }
      if (H === we) {
        i(z, v, S);
        for (let W = 0; W < N.length; W++) Ee(N[W], v, S, P);
        i(u.anchor, v, S);
        return;
      }
      if (H === bn) {
        w(u, v, S);
        return;
      }
      if (P !== 2 && k & 1 && B)
        if (P === 0) B.beforeEnter(z), i(z, v, S), Me(() => B.enter(z), A);
        else {
          const { leave: W, delayLeave: q, afterLeave: X } = B,
            Q = () => i(z, v, S),
            se = () => {
              W(z, () => {
                Q(), X && X();
              });
            };
          q ? q(z, Q, se) : se();
        }
      else i(z, v, S);
    },
    ve = (u, v, S, P = !1, A = !1) => {
      const {
        type: z,
        props: H,
        ref: B,
        children: N,
        dynamicChildren: k,
        shapeFlag: V,
        patchFlag: W,
        dirs: q,
      } = u;
      if ((B != null && vi(B, null, S, u, !0), V & 256)) {
        v.ctx.deactivate(u);
        return;
      }
      const X = V & 1 && q,
        Q = !Kt(u);
      let se;
      if ((Q && (se = H && H.onVnodeBeforeUnmount) && qe(se, v, u), V & 6))
        $e(u.component, S, P);
      else {
        if (V & 128) {
          u.suspense.unmount(S, P);
          return;
        }
        X && vt(u, null, v, 'beforeUnmount'),
          V & 64
            ? u.type.remove(u, v, S, A, fe, P)
            : k && (z !== we || (W > 0 && W & 64))
            ? de(k, v, S, !1, !0)
            : ((z === we && W & 384) || (!A && V & 16)) && de(N, v, S),
          P && Se(u);
      }
      ((Q && (se = H && H.onVnodeUnmounted)) || X) &&
        Me(() => {
          se && qe(se, v, u), X && vt(u, null, v, 'unmounted');
        }, S);
    },
    Se = (u) => {
      const { type: v, el: S, anchor: P, transition: A } = u;
      if (v === we) {
        Ce(S, P);
        return;
      }
      if (v === bn) {
        y(u);
        return;
      }
      const z = () => {
        s(S), A && !A.persisted && A.afterLeave && A.afterLeave();
      };
      if (u.shapeFlag & 1 && A && !A.persisted) {
        const { leave: H, delayLeave: B } = A,
          N = () => H(S, z);
        B ? B(u.el, z, N) : N();
      } else z();
    },
    Ce = (u, v) => {
      let S;
      for (; u !== v; ) (S = h(u)), s(u), (u = S);
      s(v);
    },
    $e = (u, v, S) => {
      const { bum: P, scope: A, update: z, subTree: H, um: B } = u;
      P && Vn(P),
        A.stop(),
        z && ((z.active = !1), ve(H, u, v, S)),
        B && Me(B, v),
        Me(() => {
          u.isUnmounted = !0;
        }, v),
        v &&
          v.pendingBranch &&
          !v.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === v.pendingId &&
          (v.deps--, v.deps === 0 && v.resolve());
    },
    de = (u, v, S, P = !1, A = !1, z = 0) => {
      for (let H = z; H < u.length; H++) ve(u[H], v, S, P, A);
    },
    le = (u) =>
      u.shapeFlag & 6
        ? le(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : h(u.anchor || u.el),
    ae = (u, v, S) => {
      u == null
        ? v._vnode && ve(v._vnode, null, null, !0)
        : b(v._vnode || null, u, v, null, null, null, S),
        as(),
        ur(),
        (v._vnode = u);
    },
    fe = {
      p: b,
      um: ve,
      m: Ee,
      r: Se,
      mt: O,
      mc: L,
      pc: K,
      pbc: $,
      n: le,
      o: e,
    };
  let ze, Be;
  return (
    t && ([ze, Be] = t(fe)), { render: ae, hydrate: ze, createApp: zl(ae, ze) }
  );
}
function bt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function $r(e, t, n = !1) {
  const i = e.children,
    s = t.children;
  if (U(i) && U(s))
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      let a = s[r];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[r] = ct(s[r])), (a.el = o.el)),
        n || $r(o, a)),
        a.type === Fn && (a.el = o.el);
    }
}
function Gl(e) {
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
const Wl = (e) => e.__isTeleport,
  we = Symbol.for('v-fgt'),
  Fn = Symbol.for('v-txt'),
  Xe = Symbol.for('v-cmt'),
  bn = Symbol.for('v-stc'),
  Xt = [];
let Ge = null;
function ce(e = !1) {
  Xt.push((Ge = e ? null : []));
}
function Vl() {
  Xt.pop(), (Ge = Xt[Xt.length - 1] || null);
}
let nn = 1;
function ws(e) {
  nn += e;
}
function zr(e) {
  return (
    (e.dynamicChildren = nn > 0 ? Ge || At : null),
    Vl(),
    nn > 0 && Ge && Ge.push(e),
    e
  );
}
function ge(e, t, n, i, s, r) {
  return zr(D(e, t, n, i, s, r, !0));
}
function Br(e, t, n, i, s) {
  return zr(ne(e, t, n, i, s, !0));
}
function Mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function xt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const jn = '__vInternal',
  Dr = ({ key: e }) => e ?? null,
  wn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? me(e) || _e(e) || J(e)
        ? { i: ye, r: e, k: t, f: !!n }
        : e
      : null
  );
function D(
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
    key: t && Dr(t),
    ref: t && wn(t),
    scopeId: mr,
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
    ctx: ye,
  };
  return (
    a
      ? (Gi(l, n), r & 128 && e.normalize(l))
      : n && (l.shapeFlag |= me(n) ? 8 : 16),
    nn > 0 &&
      !o &&
      Ge &&
      (l.patchFlag > 0 || r & 6) &&
      l.patchFlag !== 32 &&
      Ge.push(l),
    l
  );
}
const ne = ql;
function ql(e, t = null, n = null, i = 0, s = null, r = !1) {
  if (((!e || e === El) && (e = Xe), Mn(e))) {
    const a = gt(e, t, !0);
    return (
      n && Gi(a, n),
      nn > 0 &&
        !r &&
        Ge &&
        (a.shapeFlag & 6 ? (Ge[Ge.indexOf(e)] = a) : Ge.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((sa(e) && (e = e.__vccOpts), t)) {
    t = Ul(t);
    let { class: a, style: l } = t;
    a && !me(a) && (t.class = Oe(a)),
      oe(l) && (sr(l) && !U(l) && (l = he({}, l)), (t.style = $t(l)));
  }
  const o = me(e) ? 1 : dl(e) ? 128 : Wl(e) ? 64 : oe(e) ? 4 : J(e) ? 2 : 0;
  return D(e, t, n, i, s, o, r, !0);
}
function Ul(e) {
  return e ? (sr(e) || jn in e ? he({}, e) : e) : null;
}
function gt(e, t, n = !1) {
  const { props: i, ref: s, patchFlag: r, children: o } = e,
    a = t ? Kl(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Dr(a),
    ref:
      t && t.ref ? (n && s ? (U(s) ? s.concat(wn(t)) : [s, wn(t)]) : wn(t)) : s,
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
function Hi(e = ' ', t = 0) {
  return ne(Fn, null, e, t);
}
function Ft(e, t) {
  const n = ne(bn, null, e);
  return (n.staticCount = t), n;
}
function Ue(e) {
  return e == null || typeof e == 'boolean'
    ? ne(Xe)
    : U(e)
    ? ne(we, null, e.slice())
    : typeof e == 'object'
    ? ct(e)
    : ne(Fn, null, String(e));
}
function ct(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : gt(e);
}
function Gi(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (U(t)) n = 16;
  else if (typeof t == 'object')
    if (i & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Gi(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(jn in t)
        ? (t._ctx = ye)
        : s === 3 &&
          ye &&
          (ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    J(t)
      ? ((t = { default: t, _ctx: ye }), (n = 32))
      : ((t = String(t)), i & 64 ? ((n = 16), (t = [Hi(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Kl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const s in i)
      if (s === 'class')
        t.class !== i.class && (t.class = Oe([t.class, i.class]));
      else if (s === 'style') t.style = $t([t.style, i.style]);
      else if (Ln(s)) {
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
const Yl = Or();
let Xl = 0;
function Jl(e, t, n) {
  const i = e.type,
    s = (t ? t.appContext : e.appContext) || Yl,
    r = {
      uid: Xl++,
      vnode: e,
      type: i,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new mo(!0),
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
      propsOptions: Ar(i, s),
      emitsOptions: hr(i, s),
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
    (r.emit = rl.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let be = null;
const Zl = () => be || ye;
let Wi,
  Pt,
  _s = '__VUE_INSTANCE_SETTERS__';
(Pt = ri()[_s]) || (Pt = ri()[_s] = []),
  Pt.push((e) => (be = e)),
  (Wi = (e) => {
    Pt.length > 1 ? Pt.forEach((t) => t(e)) : Pt[0](e);
  });
const Bt = (e) => {
    Wi(e), e.scope.on();
  },
  Ct = () => {
    be && be.scope.off(), Wi(null);
  };
function Nr(e) {
  return e.vnode.shapeFlag & 4;
}
let sn = !1;
function Ql(e, t = !1) {
  sn = t;
  const { props: n, children: i } = e.vnode,
    s = Nr(e);
  Bl(e, n, s, t), Rl(e, i);
  const r = s ? ea(e, t) : void 0;
  return (sn = !1), r;
}
function ea(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = rr(new Proxy(e.ctx, Ml)));
  const { setup: i } = n;
  if (i) {
    const s = (e.setupContext = i.length > 1 ? na(e) : null);
    Bt(e), Nt();
    const r = ht(i, e, 0, [e.props, s]);
    if ((Rt(), Ct(), Hs(r))) {
      if ((r.then(Ct, Ct), t))
        return r
          .then((o) => {
            ys(e, o, t);
          })
          .catch((o) => {
            Bn(o, e, 0);
          });
      e.asyncDep = r;
    } else ys(e, r, t);
  } else Rr(e, t);
}
function ys(e, t, n) {
  J(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : oe(t) && (e.setupState = cr(t)),
    Rr(e, n);
}
let xs;
function Rr(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && xs && !i.render) {
      const s = i.template || Ri(e).template;
      if (s) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = i,
          c = he(he({ isCustomElement: r, delimiters: a }, o), l);
        i.render = xs(s, c);
      }
    }
    e.render = i.render || We;
  }
  Bt(e), Nt(), Pl(e), Rt(), Ct();
}
function ta(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Pe(e, 'get', '$attrs'), t[n];
      },
    }))
  );
}
function na(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return ta(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Hn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(cr(rr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Yt) return Yt[n](e);
        },
        has(t, n) {
          return n in t || n in Yt;
        },
      }))
    );
}
function ia(e, t = !0) {
  return J(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function sa(e) {
  return J(e) && '__vccOpts' in e;
}
const Vi = (e, t) => Qo(e, t, sn);
function Ne(e, t, n) {
  const i = arguments.length;
  return i === 2
    ? oe(t) && !U(t)
      ? Mn(t)
        ? ne(e, null, [t])
        : ne(e, t)
      : ne(e, null, t)
    : (i > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : i === 3 && Mn(n) && (n = [n]),
      ne(e, t, n));
}
const ra = Symbol.for('v-scx'),
  oa = () => vn(ra),
  la = '3.3.4',
  aa = 'http://www.w3.org/2000/svg',
  St = typeof document < 'u' ? document : null,
  Ss = St && St.createElement('template'),
  ca = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, i) => {
      const s = t
        ? St.createElementNS(aa, e)
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
        Ss.innerHTML = i ? `<svg>${e}</svg>` : e;
        const a = Ss.content;
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
  };
function da(e, t, n) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
function fa(e, t, n) {
  const i = e.style,
    s = me(n);
  if (n && !s) {
    if (t && !me(t)) for (const r in t) n[r] == null && bi(i, r, '');
    for (const r in n) bi(i, r, n[r]);
  } else {
    const r = i.display;
    s ? t !== n && (i.cssText = n) : t && e.removeAttribute('style'),
      '_vod' in e && (i.display = r);
  }
}
const Ts = /\s*!important$/;
function bi(e, t, n) {
  if (U(n)) n.forEach((i) => bi(e, t, i));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const i = ua(e, t);
    Ts.test(n)
      ? e.setProperty(Dt(i), n.replace(Ts, ''), 'important')
      : (e[i] = n);
  }
}
const Es = ['Webkit', 'Moz', 'ms'],
  Yn = {};
function ua(e, t) {
  const n = Yn[t];
  if (n) return n;
  let i = Je(t);
  if (i !== 'filter' && i in e) return (Yn[t] = i);
  i = $n(i);
  for (let s = 0; s < Es.length; s++) {
    const r = Es[s] + i;
    if (r in e) return (Yn[t] = r);
  }
  return t;
}
const Cs = 'http://www.w3.org/1999/xlink';
function pa(e, t, n, i, s) {
  if (i && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(Cs, t.slice(6, t.length))
      : e.setAttributeNS(Cs, t, n);
  else {
    const r = ho(t);
    n == null || (r && !Vs(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? '' : n);
  }
}
function ha(e, t, n, i, s, r, o) {
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
      ? (n = Vs(n))
      : n == null && c === 'string'
      ? ((n = ''), (l = !0))
      : c === 'number' && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function ma(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function ga(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
function va(e, t, n, i, s = null) {
  const r = e._vei || (e._vei = {}),
    o = r[t];
  if (i && o) o.value = i;
  else {
    const [a, l] = ba(t);
    if (i) {
      const c = (r[t] = ya(i, s));
      ma(e, a, c, l);
    } else o && (ga(e, a, o, l), (r[t] = void 0));
  }
}
const Ms = /(?:Once|Passive|Capture)$/;
function ba(e) {
  let t;
  if (Ms.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Ms)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Dt(e.slice(2)), t];
}
let Xn = 0;
const wa = Promise.resolve(),
  _a = () => Xn || (wa.then(() => (Xn = 0)), (Xn = Date.now()));
function ya(e, t) {
  const n = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= n.attached) return;
    Re(xa(i, n.value), t, 5, [i]);
  };
  return (n.value = e), (n.attached = _a()), n;
}
function xa(e, t) {
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
const Os = /^on[a-z]/,
  Sa = (e, t, n, i, s = !1, r, o, a, l) => {
    t === 'class'
      ? da(e, i, s)
      : t === 'style'
      ? fa(e, n, i)
      : Ln(t)
      ? xi(t) || va(e, t, n, i, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : Ta(e, t, i, s)
        )
      ? ha(e, t, i, r, o, a, l)
      : (t === 'true-value'
          ? (e._trueValue = i)
          : t === 'false-value' && (e._falseValue = i),
        pa(e, t, i, s));
  };
function Ta(e, t, n, i) {
  return i
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && Os.test(t) && J(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Os.test(t) && me(n))
    ? !1
    : t in e;
}
const lt = 'transition',
  Ht = 'animation',
  Gn = (e, { slots: t }) => Ne(ml, Ea(e), t);
Gn.displayName = 'Transition';
const Fr = {
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
Gn.props = he({}, br, Fr);
const wt = (e, t = []) => {
    U(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Ps = (e) => (e ? (U(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Ea(e) {
  const t = {};
  for (const m in e) m in Fr || (t[m] = e[m]);
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
      leaveToClass: p = `${n}-leave-to`,
    } = e,
    T = Ca(s),
    b = T && T[0],
    C = T && T[1],
    {
      onBeforeEnter: M,
      onEnter: g,
      onEnterCancelled: w,
      onLeave: y,
      onLeaveCancelled: I,
      onBeforeAppear: F = M,
      onAppear: j = g,
      onAppearCancelled: L = w,
    } = t,
    _ = (m, E, O) => {
      _t(m, E ? d : a), _t(m, E ? c : o), O && O();
    },
    $ = (m, E) => {
      (m._isLeaving = !1), _t(m, f), _t(m, p), _t(m, h), E && E();
    },
    x = (m) => (E, O) => {
      const R = m ? j : g,
        G = () => _(E, m, O);
      wt(R, [E, G]),
        As(() => {
          _t(E, m ? l : r), at(E, m ? d : a), Ps(R) || Ls(E, i, b, G);
        });
    };
  return he(t, {
    onBeforeEnter(m) {
      wt(M, [m]), at(m, r), at(m, o);
    },
    onBeforeAppear(m) {
      wt(F, [m]), at(m, l), at(m, c);
    },
    onEnter: x(!1),
    onAppear: x(!0),
    onLeave(m, E) {
      m._isLeaving = !0;
      const O = () => $(m, E);
      at(m, f),
        Pa(),
        at(m, h),
        As(() => {
          m._isLeaving && (_t(m, f), at(m, p), Ps(y) || Ls(m, i, C, O));
        }),
        wt(y, [m, O]);
    },
    onEnterCancelled(m) {
      _(m, !1), wt(w, [m]);
    },
    onAppearCancelled(m) {
      _(m, !0), wt(L, [m]);
    },
    onLeaveCancelled(m) {
      $(m), wt(I, [m]);
    },
  });
}
function Ca(e) {
  if (e == null) return null;
  if (oe(e)) return [Jn(e.enter), Jn(e.leave)];
  {
    const t = Jn(e);
    return [t, t];
  }
}
function Jn(e) {
  return lo(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function _t(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function As(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Ma = 0;
function Ls(e, t, n, i) {
  const s = (e._endId = ++Ma),
    r = () => {
      s === e._endId && i();
    };
  if (n) return setTimeout(r, n);
  const { type: o, timeout: a, propCount: l } = Oa(e, t);
  if (!o) return i();
  const c = o + 'end';
  let d = 0;
  const f = () => {
      e.removeEventListener(c, h), r();
    },
    h = (p) => {
      p.target === e && ++d >= l && f();
    };
  setTimeout(() => {
    d < l && f();
  }, a + 1),
    e.addEventListener(c, h);
}
function Oa(e, t) {
  const n = window.getComputedStyle(e),
    i = (T) => (n[T] || '').split(', '),
    s = i(`${lt}Delay`),
    r = i(`${lt}Duration`),
    o = Is(s, r),
    a = i(`${Ht}Delay`),
    l = i(`${Ht}Duration`),
    c = Is(a, l);
  let d = null,
    f = 0,
    h = 0;
  t === lt
    ? o > 0 && ((d = lt), (f = o), (h = r.length))
    : t === Ht
    ? c > 0 && ((d = Ht), (f = c), (h = l.length))
    : ((f = Math.max(o, c)),
      (d = f > 0 ? (o > c ? lt : Ht) : null),
      (h = d ? (d === lt ? r.length : l.length) : 0));
  const p =
    d === lt && /\b(transform|all)(,|$)/.test(i(`${lt}Property`).toString());
  return { type: d, timeout: f, propCount: h, hasTransform: p };
}
function Is(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, i) => ks(n) + ks(e[i])));
}
function ks(e) {
  return Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Pa() {
  return document.body.offsetHeight;
}
const qi = {
  beforeMount(e, { value: t }, { transition: n }) {
    (e._vod = e.style.display === 'none' ? '' : e.style.display),
      n && t ? n.beforeEnter(e) : Gt(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n &&
      (i
        ? t
          ? (i.beforeEnter(e), Gt(e, !0), i.enter(e))
          : i.leave(e, () => {
              Gt(e, !1);
            })
        : Gt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Gt(e, t);
  },
};
function Gt(e, t) {
  e.style.display = t ? e._vod : 'none';
}
const Aa = he({ patchProp: Sa }, ca);
let $s;
function La() {
  return $s || ($s = jl(Aa));
}
const Ia = (...e) => {
  const t = La().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (i) => {
      const s = ka(i);
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
function ka(e) {
  return me(e) ? document.querySelector(e) : e;
}
const $a = '/portfolio/img/icons/twitter_icon.svg',
  za = '/portfolio/img/icons/discord_icon.svg',
  Ba = '/portfolio/img/icons/pixiv_icon.svg',
  Da = '/portfolio/img/icons/github_icon.svg';
const st = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [i, s] of t) n[i] = s;
    return n;
  },
  Na = {
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
      return { classes: Vi(() => ({ [`${e.alignment || 'left'}`]: !0 })) };
    },
  },
  Ra = Ft(
    '<p class="m-0"><a href="https://twitter.com/edelRitter9" target="_blank"><img src="' +
      $a +
      '"></a></p><p class="m-0"><a href="https://discordapp.com/users/_edelritter" target="_blank"><img src="' +
      za +
      '"></a></p><p class="m-0"><a href="https://www.pixiv.net/users/33521928" target="_blank"><img src="' +
      Ba +
      '"></a></p><p class="m-0"><a href="https://github.com/edelRitter/" target="_blank"><img src="' +
      Da +
      '"></a></p>',
    4
  ),
  Fa = [Ra];
function ja(e, t, n, i, s, r) {
  return ce(), ge('div', { class: Oe(['ui-catalog__sns', i.classes]) }, Fa, 2);
}
const Ui = st(Na, [['render', ja]]);
const Ha = {
    name: 'Menu',
    components: { socialNetworking: Ui },
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
  Ga = { class: 'menu' },
  Wa = { class: 'menu__wrapper' },
  Va = { for: 'navigation', class: 'menu__button' },
  qa = D('span', { class: 'menu__button-hamburger' }, null, -1),
  Ua = D('h2', { class: 'menu__sidebar-title' }, 'edelRitter', -1),
  Ka = { class: 'menu__sidebar-list' },
  Ya = ['onClick'];
function Xa(e, t, n, i, s, r) {
  const o = tt('socialNetworking');
  return (
    ce(),
    ge('div', Ga, [
      D('div', Wa, [
        D('label', Va, [
          D(
            'button',
            {
              id: 'navigation',
              class: Oe(['menu__button-input', { 'is-active': e.isActive }]),
              onClick:
                t[0] || (t[0] = (...a) => r.toggleMenu && r.toggleMenu(...a)),
            },
            null,
            2
          ),
          qa,
        ]),
        D(
          'menu',
          { class: Oe(['menu__sidebar', { 'is-active': e.isActive }]) },
          [
            Ua,
            D('ul', Ka, [
              (ce(!0),
              ge(
                we,
                null,
                tn(
                  e.navLinks,
                  (a, l) => (
                    ce(),
                    ge(
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
                      Ya
                    )
                  )
                ),
                128
              )),
            ]),
            ne(o, { class: Oe(this.alignment) }, null, 8, ['class']),
          ],
          2
        ),
      ]),
      D(
        'div',
        { class: Oe(['menu__background', { 'is-active': e.isActive }]) },
        null,
        2
      ),
    ])
  );
}
const Ja = st(Ha, [['render', Xa]]),
  Za = '/portfolio/video/teamlab_video1.mp4';
const Qa = {
    name: 'Top',
    components: { socialNetworking: Ui },
    data() {
      return { alignment: 'ui-catalog__sns-right' };
    },
  },
  ec = { class: 'portfolio-top' },
  tc = { class: 'portfolio-top__hero m-0' },
  nc = { class: 'portfolio-top__wrapper' },
  ic = Ft(
    '<span class="portfolio-top__subtitle" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="300" data-aos-once="true" data-aos-easing="ease-out-cubic"> DESIGNER / </span><br><span class="portfolio-top__subtitle" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="600" data-aos-once="true" data-aos-easing="ease-out-cubic"> DEVELOPER / </span><br><span class="portfolio-top__subtitle" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="900" data-aos-once="true" data-aos-easing="ease-out-cubic"> ILLUSTRATOR / </span><p class="portfolio-top__text m-0">-</p><p class="portfolio-top__text m-0">porfolio website created by</p><p class="portfolio-top__text m-0">-</p><h1 class="portfolio-top__title">edelRitter</h1>',
    9
  ),
  sc = D(
    'video',
    {
      playsinline: '',
      autoplay: '',
      muted: '',
      loop: '',
      class: 'portfolio-top__video',
    },
    [D('source', { src: Za, type: 'video/mp4' })],
    -1
  );
function rc(e, t, n, i, s, r) {
  const o = tt('socialNetworking');
  return (
    ce(),
    ge('section', ec, [
      D('div', tc, [
        D('div', nc, [
          ic,
          ne(o, { class: Oe(this.alignment) }, null, 8, ['class']),
        ]),
      ]),
      sc,
    ])
  );
}
const oc = st(Qa, [['render', rc]]);
const lc = {
    name: 'Modal',
    props: { status: String },
    methods: {
      closeModal() {
        this.$emit('modalOff');
      },
    },
  },
  ac = { class: 'portfolio-modal' },
  cc = { class: 'portfolio-modal__content' },
  dc = { class: 'portfolio-modal__wrap' },
  fc = { class: 'portfolio-modal__opened' };
function uc(e, t, n, i, s, r) {
  return (
    ce(),
    ge('div', ac, [
      D('div', cc, [
        D('p', {
          class: 'portfolio-modal__close',
          onClick:
            t[0] || (t[0] = (...o) => r.closeModal && r.closeModal(...o)),
        }),
        D('div', dc, [
          Di(
            D(
              'div',
              fc,
              [Er(e.$slots, 'body', {}, () => [Hi(' Default body content ')])],
              512
            ),
            [[qi, n.status === 'confirmation']]
          ),
        ]),
      ]),
      D('div', {
        class: 'portfolio-modal__bg',
        onClick: t[1] || (t[1] = (...o) => r.closeModal && r.closeModal(...o)),
      }),
    ])
  );
}
const jr = st(lc, [['render', uc]]),
  pc = [
    {
      id: '1',
      image: './img/illustration/arknights_hibiscus.png',
      type: 'artwork',
      title: 'arknights / hibiscus',
    },
    {
      id: '2',
      image: './img/illustration/arknights_specter.png',
      type: 'artwork',
      title: 'arknights / specter',
    },
    {
      id: '3',
      image: './img/illustration/arknights_w.png',
      type: 'artwork',
      title: 'arknights / W',
    },
    {
      id: '4',
      image: './img/illustration/arknights_penance.png',
      type: 'artwork',
      title: 'arknights / penance',
    },
    {
      id: '5',
      image: './img/illustration/arknights_ajimu.png',
      type: 'artwork',
      title: 'arknights / angelina',
    },
  ],
  hc = '/portfolio/img/icons/arrow_icon.svg';
const mc = {
    name: 'Artwork',
    components: { Modal: jr },
    setup() {
      const e = pe(''),
        t = pe('');
      return { items: pc, modalStatus: e, modalImage: t };
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
  gc = { class: 'portfolio-artwork' },
  vc = Ft(
    '<div class="portfolio-artwork__scroll"><div class="portfolio-artwork__scroll-text"><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span></div><div class="portfolio-artwork__scroll-text"><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span><span>SHOWCASE </span></div></div><div class="portfolio-artwork__title"><div class="portfolio-artwork__title-border"><h2 class="portfolio-artwork__title-text"> showcase of all / <span class="portfolio-artwork__title-text-sub">WORKS</span></h2></div></div>',
    2
  ),
  bc = { class: 'row no-gutters' },
  wc = Ft(
    '<div class="col-12"><div class="portfolio-artwork__icon"><p class="portfolio-artwork__icon-text text-center m-0"> illustration / photography works </p><p class="portfolio-artwork__icon-img text-center m-0"><img src="' +
      hc +
      '"></p></div></div><div class="col-12 col-md-4"><div class="portfolio-artwork__description"><p class="portfolio-artwork__description-text m-0"> scroll down to see more / </p><p class="portfolio-artwork__description-text m-0">+</p><p class="portfolio-artwork__description-text m-0"> swipe left / right to see more photography </p></div></div>',
    2
  ),
  _c = { class: 'col-12 col-md-8' },
  yc = { class: 'portfolio-artwork__content' },
  xc = {
    'data-aos': 'fade-up',
    'data-aos-duration': '1200',
    'data-aos-delay': '400',
    'data-aos-easing': 'ease-out-cubic',
    class: 'portfolio-artwork__content-item flex items-center justify-center',
  },
  Sc = { class: 'portfolio-artwork__content-img' },
  Tc = ['data-artwork', 'src'],
  Ec = { class: 'portfolio-artwork__content-text' },
  Cc = { class: 'portfolio-artwork__content-type' },
  Mc = { class: 'portfolio-artwork__content-title' },
  Oc = { class: 'portfolio-modal__item' },
  Pc = { class: 'm-0' },
  Ac = ['src'];
function Lc(e, t, n, i, s, r) {
  const o = tt('masonry-wall'),
    a = tt('Modal');
  return (
    ce(),
    ge('section', gc, [
      vc,
      D('div', bc, [
        wc,
        D('div', _c, [
          D('div', yc, [
            ne(
              o,
              {
                items: i.items,
                'column-width': 400,
                'min-columns': 2,
                gap: 12,
              },
              {
                default: dt(({ item: l, index: c }) => [
                  D('div', xc, [
                    D('p', Sc, [
                      D(
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
                        Tc
                      ),
                    ]),
                    D('p', Ec, [
                      D('span', Cc, et(l.type), 1),
                      D('span', Mc, et(l.title), 1),
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
        Di(
          ne(
            Gn,
            { name: 'modal-fade', status: this.modalStatus },
            {
              default: dt(() => [
                ne(
                  a,
                  { onModalOff: r.closeModal },
                  {
                    body: dt(() => [
                      D('div', Oc, [
                        D('p', Pc, [
                          D(
                            'img',
                            {
                              src: i.modalImage,
                              class: 'portfolio-modal__item-images',
                            },
                            null,
                            8,
                            Ac
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
          [[qi, this.modalStatus !== '']]
        ),
      ]),
    ])
  );
}
const Ic = st(mc, [['render', Lc]]);
function zs(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'constructor' in e &&
    e.constructor === Object
  );
}
function Ki(e, t) {
  e === void 0 && (e = {}),
    t === void 0 && (t = {}),
    Object.keys(t).forEach((n) => {
      typeof e[n] > 'u'
        ? (e[n] = t[n])
        : zs(t[n]) &&
          zs(e[n]) &&
          Object.keys(t[n]).length > 0 &&
          Ki(e[n], t[n]);
    });
}
const Hr = {
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
  return Ki(e, Hr), e;
}
const kc = {
  document: Hr,
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
  return Ki(e, kc), e;
}
function $c(e) {
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
function On(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t);
}
function Pn() {
  return Date.now();
}
function zc(e) {
  const t = Ae();
  let n;
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  );
}
function Bc(e, t) {
  t === void 0 && (t = 'x');
  const n = Ae();
  let i, s, r;
  const o = zc(e);
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
function hn(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  );
}
function Dc(e) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function Ie() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ['__proto__', 'constructor', 'prototype'];
  for (let n = 1; n < arguments.length; n += 1) {
    const i = n < 0 || arguments.length <= n ? void 0 : arguments[n];
    if (i != null && !Dc(i)) {
      const s = Object.keys(Object(i)).filter((r) => t.indexOf(r) < 0);
      for (let r = 0, o = s.length; r < o; r += 1) {
        const a = s[r],
          l = Object.getOwnPropertyDescriptor(i, a);
        l !== void 0 &&
          l.enumerable &&
          (hn(e[a]) && hn(i[a])
            ? i[a].__swiper__
              ? (e[a] = i[a])
              : Ie(e[a], i[a])
            : !hn(e[a]) && hn(i[a])
            ? ((e[a] = {}), i[a].__swiper__ ? (e[a] = i[a]) : Ie(e[a], i[a]))
            : (e[a] = i[a]));
      }
    }
  }
  return e;
}
function mn(e, t, n) {
  e.style.setProperty(t, n);
}
function Gr(e) {
  let { swiper: t, targetPosition: n, side: i } = e;
  const s = Ae(),
    r = -t.translate;
  let o = null,
    a;
  const l = t.params.speed;
  (t.wrapperEl.style.scrollSnapType = 'none'),
    s.cancelAnimationFrame(t.cssModeFrameID);
  const c = n > r ? 'next' : 'prev',
    d = (h, p) => (c === 'next' && h >= p) || (c === 'prev' && h <= p),
    f = () => {
      (a = new Date().getTime()), o === null && (o = a);
      const h = Math.max(Math.min((a - o) / l, 1), 0),
        p = 0.5 - Math.cos(h * Math.PI) / 2;
      let T = r + p * (n - r);
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
function Yi(e, t) {
  t === void 0 && (t = []);
  const n = document.createElement(e);
  return n.classList.add(...(Array.isArray(t) ? t : [t])), n;
}
function Nc(e) {
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
function Rc(e, t) {
  const n = [];
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling;
    t ? i.matches(t) && n.push(i) : n.push(i), (e = i);
  }
  return n;
}
function Fc(e, t) {
  const n = [];
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling;
    t ? i.matches(t) && n.push(i) : n.push(i), (e = i);
  }
  return n;
}
function ft(e, t) {
  return Ae().getComputedStyle(e, null).getPropertyValue(t);
}
function An(e) {
  let t = e,
    n;
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (n += 1);
    return n;
  }
}
function Wr(e, t) {
  const n = [];
  let i = e.parentElement;
  for (; i; ) t ? i.matches(t) && n.push(i) : n.push(i), (i = i.parentElement);
  return n;
}
function wi(e, t, n) {
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
function Xi(e, t, n, i) {
  return (
    e.params.createElements &&
      Object.keys(i).forEach((s) => {
        if (!n[s] && n.auto === !0) {
          let r = Ye(e.el, `.${i[s]}`)[0];
          r || ((r = Yi('div', i[s])), (r.className = i[s]), e.el.append(r)),
            (n[s] = r),
            (t[s] = r);
        }
      }),
    n
  );
}
function jc(e) {
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
  const r = (b) => (Array.isArray(b) || (b = [b].filter((C) => !!C)), b);
  function o(b) {
    let C;
    return b &&
      typeof b == 'string' &&
      t.isElement &&
      ((C = t.el.querySelector(b)), C)
      ? C
      : (b &&
          (typeof b == 'string' && (C = [...document.querySelectorAll(b)]),
          t.params.uniqueNavElements &&
            typeof b == 'string' &&
            C.length > 1 &&
            t.el.querySelectorAll(b).length === 1 &&
            (C = t.el.querySelector(b))),
        b && !C ? b : C);
  }
  function a(b, C) {
    const M = t.params.navigation;
    (b = r(b)),
      b.forEach((g) => {
        g &&
          (g.classList[C ? 'add' : 'remove'](...M.disabledClass.split(' ')),
          g.tagName === 'BUTTON' && (g.disabled = C),
          t.params.watchOverflow &&
            t.enabled &&
            g.classList[t.isLocked ? 'add' : 'remove'](M.lockClass));
      });
  }
  function l() {
    const { nextEl: b, prevEl: C } = t.navigation;
    if (t.params.loop) {
      a(C, !1), a(b, !1);
      return;
    }
    a(C, t.isBeginning && !t.params.rewind), a(b, t.isEnd && !t.params.rewind);
  }
  function c(b) {
    b.preventDefault(),
      !(t.isBeginning && !t.params.loop && !t.params.rewind) &&
        (t.slidePrev(), s('navigationPrev'));
  }
  function d(b) {
    b.preventDefault(),
      !(t.isEnd && !t.params.loop && !t.params.rewind) &&
        (t.slideNext(), s('navigationNext'));
  }
  function f() {
    const b = t.params.navigation;
    if (
      ((t.params.navigation = Xi(
        t,
        t.originalParams.navigation,
        t.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }
      )),
      !(b.nextEl || b.prevEl))
    )
      return;
    let C = o(b.nextEl),
      M = o(b.prevEl);
    Object.assign(t.navigation, { nextEl: C, prevEl: M }),
      (C = r(C)),
      (M = r(M));
    const g = (w, y) => {
      w && w.addEventListener('click', y === 'next' ? d : c),
        !t.enabled && w && w.classList.add(...b.lockClass.split(' '));
    };
    C.forEach((w) => g(w, 'next')), M.forEach((w) => g(w, 'prev'));
  }
  function h() {
    let { nextEl: b, prevEl: C } = t.navigation;
    (b = r(b)), (C = r(C));
    const M = (g, w) => {
      g.removeEventListener('click', w === 'next' ? d : c),
        g.classList.remove(...t.params.navigation.disabledClass.split(' '));
    };
    b.forEach((g) => M(g, 'next')), C.forEach((g) => M(g, 'prev'));
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
      let { nextEl: b, prevEl: C } = t.navigation;
      (b = r(b)),
        (C = r(C)),
        [...b, ...C]
          .filter((M) => !!M)
          .forEach((M) =>
            M.classList[t.enabled ? 'remove' : 'add'](
              t.params.navigation.lockClass
            )
          );
    }),
    i('click', (b, C) => {
      let { nextEl: M, prevEl: g } = t.navigation;
      (M = r(M)), (g = r(g));
      const w = C.target;
      if (t.params.navigation.hideOnClick && !g.includes(w) && !M.includes(w)) {
        if (
          t.pagination &&
          t.params.pagination &&
          t.params.pagination.clickable &&
          (t.pagination.el === w || t.pagination.el.contains(w))
        )
          return;
        let y;
        M.length
          ? (y = M[0].classList.contains(t.params.navigation.hiddenClass))
          : g.length &&
            (y = g[0].classList.contains(t.params.navigation.hiddenClass)),
          s(y === !0 ? 'navigationShow' : 'navigationHide'),
          [...M, ...g]
            .filter((I) => !!I)
            .forEach((I) =>
              I.classList.toggle(t.params.navigation.hiddenClass)
            );
      }
    });
  const p = () => {
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
    enable: p,
    disable: T,
    update: l,
    init: f,
    destroy: h,
  });
}
function Wt(e) {
  return (
    e === void 0 && (e = ''),
    `.${e
      .trim()
      .replace(/([\.:!+\/])/g, '\\$1')
      .replace(/ /g, '.')}`
  );
}
function Hc(e) {
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
      formatFractionCurrent: (g) => g,
      formatFractionTotal: (g) => g,
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
  const l = (g) => (Array.isArray(g) || (g = [g].filter((w) => !!w)), g);
  function c() {
    return (
      !t.params.pagination.el ||
      !t.pagination.el ||
      (Array.isArray(t.pagination.el) && t.pagination.el.length === 0)
    );
  }
  function d(g, w) {
    const { bulletActiveClass: y } = t.params.pagination;
    g &&
      ((g = g[`${w === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      g &&
        (g.classList.add(`${y}-${w}`),
        (g = g[`${w === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        g && g.classList.add(`${y}-${w}-${w}`)));
  }
  function f(g) {
    const w = g.target.closest(Wt(t.params.pagination.bulletClass));
    if (!w) return;
    g.preventDefault();
    const y = An(w) * t.params.slidesPerGroup;
    if (t.params.loop) {
      if (t.realIndex === y) return;
      const I = t.getSlideIndexByData(y),
        F = t.getSlideIndexByData(t.realIndex);
      I > t.slides.length - t.loopedSlides &&
        t.loopFix({
          direction: I > F ? 'next' : 'prev',
          activeSlideIndex: I,
          slideTo: !1,
        }),
        t.slideToLoop(y);
    } else t.slideTo(y);
  }
  function h() {
    const g = t.rtl,
      w = t.params.pagination;
    if (c()) return;
    let y = t.pagination.el;
    y = l(y);
    let I, F;
    const j =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length,
      L = t.params.loop
        ? Math.ceil(j / t.params.slidesPerGroup)
        : t.snapGrid.length;
    if (
      (t.params.loop
        ? ((F = t.previousRealIndex || 0),
          (I =
            t.params.slidesPerGroup > 1
              ? Math.floor(t.realIndex / t.params.slidesPerGroup)
              : t.realIndex))
        : typeof t.snapIndex < 'u'
        ? ((I = t.snapIndex), (F = t.previousSnapIndex))
        : ((F = t.previousIndex || 0), (I = t.activeIndex || 0)),
      w.type === 'bullets' &&
        t.pagination.bullets &&
        t.pagination.bullets.length > 0)
    ) {
      const _ = t.pagination.bullets;
      let $, x, m;
      if (
        (w.dynamicBullets &&
          ((o = wi(_[0], t.isHorizontal() ? 'width' : 'height', !0)),
          y.forEach((E) => {
            E.style[t.isHorizontal() ? 'width' : 'height'] = `${
              o * (w.dynamicMainBullets + 4)
            }px`;
          }),
          w.dynamicMainBullets > 1 &&
            F !== void 0 &&
            ((a += I - (F || 0)),
            a > w.dynamicMainBullets - 1
              ? (a = w.dynamicMainBullets - 1)
              : a < 0 && (a = 0)),
          ($ = Math.max(I - a, 0)),
          (x = $ + (Math.min(_.length, w.dynamicMainBullets) - 1)),
          (m = (x + $) / 2)),
        _.forEach((E) => {
          const O = [
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              (R) => `${w.bulletActiveClass}${R}`
            ),
          ]
            .map((R) =>
              typeof R == 'string' && R.includes(' ') ? R.split(' ') : R
            )
            .flat();
          E.classList.remove(...O);
        }),
        y.length > 1)
      )
        _.forEach((E) => {
          const O = An(E);
          O === I
            ? E.classList.add(...w.bulletActiveClass.split(' '))
            : t.isElement && E.setAttribute('part', 'bullet'),
            w.dynamicBullets &&
              (O >= $ &&
                O <= x &&
                E.classList.add(...`${w.bulletActiveClass}-main`.split(' ')),
              O === $ && d(E, 'prev'),
              O === x && d(E, 'next'));
        });
      else {
        const E = _[I];
        if (
          (E && E.classList.add(...w.bulletActiveClass.split(' ')),
          t.isElement &&
            _.forEach((O, R) => {
              O.setAttribute('part', R === I ? 'bullet-active' : 'bullet');
            }),
          w.dynamicBullets)
        ) {
          const O = _[$],
            R = _[x];
          for (let G = $; G <= x; G += 1)
            _[G] &&
              _[G].classList.add(...`${w.bulletActiveClass}-main`.split(' '));
          d(O, 'prev'), d(R, 'next');
        }
      }
      if (w.dynamicBullets) {
        const E = Math.min(_.length, w.dynamicMainBullets + 4),
          O = (o * E - o) / 2 - m * o,
          R = g ? 'right' : 'left';
        _.forEach((G) => {
          G.style[t.isHorizontal() ? R : 'top'] = `${O}px`;
        });
      }
    }
    y.forEach((_, $) => {
      if (
        (w.type === 'fraction' &&
          (_.querySelectorAll(Wt(w.currentClass)).forEach((x) => {
            x.textContent = w.formatFractionCurrent(I + 1);
          }),
          _.querySelectorAll(Wt(w.totalClass)).forEach((x) => {
            x.textContent = w.formatFractionTotal(L);
          })),
        w.type === 'progressbar')
      ) {
        let x;
        w.progressbarOpposite
          ? (x = t.isHorizontal() ? 'vertical' : 'horizontal')
          : (x = t.isHorizontal() ? 'horizontal' : 'vertical');
        const m = (I + 1) / L;
        let E = 1,
          O = 1;
        x === 'horizontal' ? (E = m) : (O = m),
          _.querySelectorAll(Wt(w.progressbarFillClass)).forEach((R) => {
            (R.style.transform = `translate3d(0,0,0) scaleX(${E}) scaleY(${O})`),
              (R.style.transitionDuration = `${t.params.speed}ms`);
          });
      }
      w.type === 'custom' && w.renderCustom
        ? ((_.innerHTML = w.renderCustom(t, I + 1, L)),
          $ === 0 && s('paginationRender', _))
        : ($ === 0 && s('paginationRender', _), s('paginationUpdate', _)),
        t.params.watchOverflow &&
          t.enabled &&
          _.classList[t.isLocked ? 'add' : 'remove'](w.lockClass);
    });
  }
  function p() {
    const g = t.params.pagination;
    if (c()) return;
    const w =
      t.virtual && t.params.virtual.enabled
        ? t.virtual.slides.length
        : t.slides.length;
    let y = t.pagination.el;
    y = l(y);
    let I = '';
    if (g.type === 'bullets') {
      let F = t.params.loop
        ? Math.ceil(w / t.params.slidesPerGroup)
        : t.snapGrid.length;
      t.params.freeMode && t.params.freeMode.enabled && F > w && (F = w);
      for (let j = 0; j < F; j += 1)
        g.renderBullet
          ? (I += g.renderBullet.call(t, j, g.bulletClass))
          : (I += `<${g.bulletElement} ${
              t.isElement ? 'part="bullet"' : ''
            } class="${g.bulletClass}"></${g.bulletElement}>`);
    }
    g.type === 'fraction' &&
      (g.renderFraction
        ? (I = g.renderFraction.call(t, g.currentClass, g.totalClass))
        : (I = `<span class="${g.currentClass}"></span> / <span class="${g.totalClass}"></span>`)),
      g.type === 'progressbar' &&
        (g.renderProgressbar
          ? (I = g.renderProgressbar.call(t, g.progressbarFillClass))
          : (I = `<span class="${g.progressbarFillClass}"></span>`)),
      (t.pagination.bullets = []),
      y.forEach((F) => {
        g.type !== 'custom' && (F.innerHTML = I || ''),
          g.type === 'bullets' &&
            t.pagination.bullets.push(...F.querySelectorAll(Wt(g.bulletClass)));
      }),
      g.type !== 'custom' && s('paginationRender', y[0]);
  }
  function T() {
    t.params.pagination = Xi(
      t,
      t.originalParams.pagination,
      t.params.pagination,
      { el: 'swiper-pagination' }
    );
    const g = t.params.pagination;
    if (!g.el) return;
    let w;
    typeof g.el == 'string' && t.isElement && (w = t.el.querySelector(g.el)),
      !w &&
        typeof g.el == 'string' &&
        (w = [...document.querySelectorAll(g.el)]),
      w || (w = g.el),
      !(!w || w.length === 0) &&
        (t.params.uniqueNavElements &&
          typeof g.el == 'string' &&
          Array.isArray(w) &&
          w.length > 1 &&
          ((w = [...t.el.querySelectorAll(g.el)]),
          w.length > 1 &&
            (w = w.filter((y) => Wr(y, '.swiper')[0] === t.el)[0])),
        Array.isArray(w) && w.length === 1 && (w = w[0]),
        Object.assign(t.pagination, { el: w }),
        (w = l(w)),
        w.forEach((y) => {
          g.type === 'bullets' &&
            g.clickable &&
            y.classList.add(g.clickableClass),
            y.classList.add(g.modifierClass + g.type),
            y.classList.add(
              t.isHorizontal() ? g.horizontalClass : g.verticalClass
            ),
            g.type === 'bullets' &&
              g.dynamicBullets &&
              (y.classList.add(`${g.modifierClass}${g.type}-dynamic`),
              (a = 0),
              g.dynamicMainBullets < 1 && (g.dynamicMainBullets = 1)),
            g.type === 'progressbar' &&
              g.progressbarOpposite &&
              y.classList.add(g.progressbarOppositeClass),
            g.clickable && y.addEventListener('click', f),
            t.enabled || y.classList.add(g.lockClass);
        }));
  }
  function b() {
    const g = t.params.pagination;
    if (c()) return;
    let w = t.pagination.el;
    w &&
      ((w = l(w)),
      w.forEach((y) => {
        y.classList.remove(g.hiddenClass),
          y.classList.remove(g.modifierClass + g.type),
          y.classList.remove(
            t.isHorizontal() ? g.horizontalClass : g.verticalClass
          ),
          g.clickable && y.removeEventListener('click', f);
      })),
      t.pagination.bullets &&
        t.pagination.bullets.forEach((y) =>
          y.classList.remove(...g.bulletActiveClass.split(' '))
        );
  }
  i('changeDirection', () => {
    if (!t.pagination || !t.pagination.el) return;
    const g = t.params.pagination;
    let { el: w } = t.pagination;
    (w = l(w)),
      w.forEach((y) => {
        y.classList.remove(g.horizontalClass, g.verticalClass),
          y.classList.add(
            t.isHorizontal() ? g.horizontalClass : g.verticalClass
          );
      });
  }),
    i('init', () => {
      t.params.pagination.enabled === !1 ? M() : (T(), p(), h());
    }),
    i('activeIndexChange', () => {
      typeof t.snapIndex > 'u' && h();
    }),
    i('snapIndexChange', () => {
      h();
    }),
    i('snapGridLengthChange', () => {
      p(), h();
    }),
    i('destroy', () => {
      b();
    }),
    i('enable disable', () => {
      let { el: g } = t.pagination;
      g &&
        ((g = l(g)),
        g.forEach((w) =>
          w.classList[t.enabled ? 'remove' : 'add'](
            t.params.pagination.lockClass
          )
        ));
    }),
    i('lock unlock', () => {
      h();
    }),
    i('click', (g, w) => {
      const y = w.target,
        I = l(t.pagination.el);
      if (
        t.params.pagination.el &&
        t.params.pagination.hideOnClick &&
        I &&
        I.length > 0 &&
        !y.classList.contains(t.params.pagination.bulletClass)
      ) {
        if (
          t.navigation &&
          ((t.navigation.nextEl && y === t.navigation.nextEl) ||
            (t.navigation.prevEl && y === t.navigation.prevEl))
        )
          return;
        const F = I[0].classList.contains(t.params.pagination.hiddenClass);
        s(F === !0 ? 'paginationShow' : 'paginationHide'),
          I.forEach((j) => j.classList.toggle(t.params.pagination.hiddenClass));
      }
    });
  const C = () => {
      t.el.classList.remove(t.params.pagination.paginationDisabledClass);
      let { el: g } = t.pagination;
      g &&
        ((g = l(g)),
        g.forEach((w) =>
          w.classList.remove(t.params.pagination.paginationDisabledClass)
        )),
        T(),
        p(),
        h();
    },
    M = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: g } = t.pagination;
      g &&
        ((g = l(g)),
        g.forEach((w) =>
          w.classList.add(t.params.pagination.paginationDisabledClass)
        )),
        b();
    };
  Object.assign(t.pagination, {
    enable: C,
    disable: M,
    render: p,
    update: h,
    init: T,
    destroy: b,
  });
}
function Gc(e) {
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
  function p() {
    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
    const { scrollbar: m, rtlTranslate: E } = t,
      { dragEl: O, el: R } = m,
      G = t.params.scrollbar,
      Y = t.params.loop ? t.progressLoop : t.progress;
    let K = d,
      Z = (f - d) * Y;
    E
      ? ((Z = -Z), Z > 0 ? ((K = d - Z), (Z = 0)) : -Z + d > f && (K = f + Z))
      : Z < 0
      ? ((K = d + Z), (Z = 0))
      : Z + d > f && (K = f - Z),
      t.isHorizontal()
        ? ((O.style.transform = `translate3d(${Z}px, 0, 0)`),
          (O.style.width = `${K}px`))
        : ((O.style.transform = `translate3d(0px, ${Z}px, 0)`),
          (O.style.height = `${K}px`)),
      G.hide &&
        (clearTimeout(a),
        (R.style.opacity = 1),
        (a = setTimeout(() => {
          (R.style.opacity = 0), (R.style.transitionDuration = '400ms');
        }, 1e3)));
  }
  function T(m) {
    !t.params.scrollbar.el ||
      !t.scrollbar.el ||
      (t.scrollbar.dragEl.style.transitionDuration = `${m}ms`);
  }
  function b() {
    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
    const { scrollbar: m } = t,
      { dragEl: E, el: O } = m;
    (E.style.width = ''),
      (E.style.height = ''),
      (f = t.isHorizontal() ? O.offsetWidth : O.offsetHeight),
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
      h >= 1 ? (O.style.display = 'none') : (O.style.display = ''),
      t.params.scrollbar.hide && (O.style.opacity = 0),
      t.params.watchOverflow &&
        t.enabled &&
        m.el.classList[t.isLocked ? 'add' : 'remove'](
          t.params.scrollbar.lockClass
        );
  }
  function C(m) {
    return t.isHorizontal() ? m.clientX : m.clientY;
  }
  function M(m) {
    const { scrollbar: E, rtlTranslate: O } = t,
      { el: R } = E;
    let G;
    (G =
      (C(m) -
        Nc(R)[t.isHorizontal() ? 'left' : 'top'] -
        (c !== null ? c : d / 2)) /
      (f - d)),
      (G = Math.max(Math.min(G, 1), 0)),
      O && (G = 1 - G);
    const Y = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * G;
    t.updateProgress(Y),
      t.setTranslate(Y),
      t.updateActiveIndex(),
      t.updateSlidesClasses();
  }
  function g(m) {
    const E = t.params.scrollbar,
      { scrollbar: O, wrapperEl: R } = t,
      { el: G, dragEl: Y } = O;
    (o = !0),
      (c =
        m.target === Y
          ? C(m) -
            m.target.getBoundingClientRect()[t.isHorizontal() ? 'left' : 'top']
          : null),
      m.preventDefault(),
      m.stopPropagation(),
      (R.style.transitionDuration = '100ms'),
      (Y.style.transitionDuration = '100ms'),
      M(m),
      clearTimeout(l),
      (G.style.transitionDuration = '0ms'),
      E.hide && (G.style.opacity = 1),
      t.params.cssMode && (t.wrapperEl.style['scroll-snap-type'] = 'none'),
      s('scrollbarDragStart', m);
  }
  function w(m) {
    const { scrollbar: E, wrapperEl: O } = t,
      { el: R, dragEl: G } = E;
    o &&
      (m.preventDefault ? m.preventDefault() : (m.returnValue = !1),
      M(m),
      (O.style.transitionDuration = '0ms'),
      (R.style.transitionDuration = '0ms'),
      (G.style.transitionDuration = '0ms'),
      s('scrollbarDragMove', m));
  }
  function y(m) {
    const E = t.params.scrollbar,
      { scrollbar: O, wrapperEl: R } = t,
      { el: G } = O;
    o &&
      ((o = !1),
      t.params.cssMode &&
        ((t.wrapperEl.style['scroll-snap-type'] = ''),
        (R.style.transitionDuration = '')),
      E.hide &&
        (clearTimeout(l),
        (l = On(() => {
          (G.style.opacity = 0), (G.style.transitionDuration = '400ms');
        }, 1e3))),
      s('scrollbarDragEnd', m),
      E.snapOnRelease && t.slideToClosest());
  }
  function I(m) {
    const { scrollbar: E, params: O } = t,
      R = E.el;
    if (!R) return;
    const G = R,
      Y = O.passiveListeners ? { passive: !1, capture: !1 } : !1,
      K = O.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!G) return;
    const Z = m === 'on' ? 'addEventListener' : 'removeEventListener';
    G[Z]('pointerdown', g, Y),
      r[Z]('pointermove', w, Y),
      r[Z]('pointerup', y, K);
  }
  function F() {
    !t.params.scrollbar.el || !t.scrollbar.el || I('on');
  }
  function j() {
    !t.params.scrollbar.el || !t.scrollbar.el || I('off');
  }
  function L() {
    const { scrollbar: m, el: E } = t;
    t.params.scrollbar = Xi(t, t.originalParams.scrollbar, t.params.scrollbar, {
      el: 'swiper-scrollbar',
    });
    const O = t.params.scrollbar;
    if (!O.el) return;
    let R;
    typeof O.el == 'string' && t.isElement && (R = t.el.querySelector(O.el)),
      !R && typeof O.el == 'string'
        ? (R = r.querySelectorAll(O.el))
        : R || (R = O.el),
      t.params.uniqueNavElements &&
        typeof O.el == 'string' &&
        R.length > 1 &&
        E.querySelectorAll(O.el).length === 1 &&
        (R = E.querySelector(O.el)),
      R.length > 0 && (R = R[0]),
      R.classList.add(t.isHorizontal() ? O.horizontalClass : O.verticalClass);
    let G;
    R &&
      ((G = R.querySelector(`.${t.params.scrollbar.dragClass}`)),
      G || ((G = Yi('div', t.params.scrollbar.dragClass)), R.append(G))),
      Object.assign(m, { el: R, dragEl: G }),
      O.draggable && F(),
      R &&
        R.classList[t.enabled ? 'remove' : 'add'](t.params.scrollbar.lockClass);
  }
  function _() {
    const m = t.params.scrollbar,
      E = t.scrollbar.el;
    E &&
      E.classList.remove(
        t.isHorizontal() ? m.horizontalClass : m.verticalClass
      ),
      j();
  }
  i('init', () => {
    t.params.scrollbar.enabled === !1 ? x() : (L(), b(), p());
  }),
    i('update resize observerUpdate lock unlock', () => {
      b();
    }),
    i('setTranslate', () => {
      p();
    }),
    i('setTransition', (m, E) => {
      T(E);
    }),
    i('enable disable', () => {
      const { el: m } = t.scrollbar;
      m &&
        m.classList[t.enabled ? 'remove' : 'add'](t.params.scrollbar.lockClass);
    }),
    i('destroy', () => {
      _();
    });
  const $ = () => {
      t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass),
        t.scrollbar.el &&
          t.scrollbar.el.classList.remove(
            t.params.scrollbar.scrollbarDisabledClass
          ),
        L(),
        b(),
        p();
    },
    x = () => {
      t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass),
        t.scrollbar.el &&
          t.scrollbar.el.classList.add(
            t.params.scrollbar.scrollbarDisabledClass
          ),
        _();
    };
  Object.assign(t.scrollbar, {
    enable: $,
    disable: x,
    updateSize: b,
    setTranslate: p,
    init: L,
    destroy: _,
  });
}
let Zn;
function Wc() {
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
function Vr() {
  return Zn || (Zn = Wc()), Zn;
}
let Qn;
function Vc(e) {
  let { userAgent: t } = e === void 0 ? {} : e;
  const n = Vr(),
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
    p = s === 'Win32';
  let T = s === 'MacIntel';
  const b = [
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
      b.indexOf(`${a}x${l}`) >= 0 &&
      ((d = r.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, '13_0_0']),
      (T = !1)),
    c && !p && ((o.os = 'android'), (o.android = !0)),
    (d || h || f) && ((o.os = 'ios'), (o.ios = !0)),
    o
  );
}
function qc(e) {
  return e === void 0 && (e = {}), Qn || (Qn = Vc(e)), Qn;
}
let ei;
function Uc() {
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
function Kc() {
  return ei || (ei = Uc()), ei;
}
function Yc(e) {
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
            const { width: h, height: p } = t;
            let T = h,
              b = p;
            f.forEach((C) => {
              let { contentBoxSize: M, contentRect: g, target: w } = C;
              (w && w !== t.el) ||
                ((T = g ? g.width : (M[0] || M).inlineSize),
                (b = g ? g.height : (M[0] || M).blockSize));
            }),
              (T !== h || b !== p) && a();
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
function Xc(e) {
  let { swiper: t, extendParams: n, on: i, emit: s } = e;
  const r = [],
    o = Ae(),
    a = function (d, f) {
      f === void 0 && (f = {});
      const h = o.MutationObserver || o.WebkitMutationObserver,
        p = new h((T) => {
          if (t.__preventObserver__) return;
          if (T.length === 1) {
            s('observerUpdate', T[0]);
            return;
          }
          const b = function () {
            s('observerUpdate', T[0]);
          };
          o.requestAnimationFrame
            ? o.requestAnimationFrame(b)
            : o.setTimeout(b, 0);
        });
      p.observe(d, {
        attributes: typeof f.attributes > 'u' ? !0 : f.attributes,
        childList: typeof f.childList > 'u' ? !0 : f.childList,
        characterData: typeof f.characterData > 'u' ? !0 : f.characterData,
      }),
        r.push(p);
    },
    l = () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const d = Wr(t.el);
          for (let f = 0; f < d.length; f += 1) a(d[f]);
        }
        a(t.el, { childList: t.params.observeSlideChildren }),
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
var Jc = {
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
function Zc() {
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
        parseInt(ft(i, 'padding-left') || 0, 10) -
        parseInt(ft(i, 'padding-right') || 0, 10)),
      (n =
        n -
        parseInt(ft(i, 'padding-top') || 0, 10) -
        parseInt(ft(i, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, {
        width: t,
        height: n,
        size: e.isHorizontal() ? t : n,
      }));
}
function Qc() {
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
  function n(x, m) {
    return parseFloat(x.getPropertyValue(t(m)) || 0);
  }
  const i = e.params,
    { wrapperEl: s, slidesEl: r, size: o, rtlTranslate: a, wrongRTL: l } = e,
    c = e.virtual && i.virtual.enabled,
    d = c ? e.virtual.slides.length : e.slides.length,
    f = Ye(r, `.${e.params.slideClass}, swiper-slide`),
    h = c ? e.virtual.slides.length : f.length;
  let p = [];
  const T = [],
    b = [];
  let C = i.slidesOffsetBefore;
  typeof C == 'function' && (C = i.slidesOffsetBefore.call(e));
  let M = i.slidesOffsetAfter;
  typeof M == 'function' && (M = i.slidesOffsetAfter.call(e));
  const g = e.snapGrid.length,
    w = e.slidesGrid.length;
  let y = i.spaceBetween,
    I = -C,
    F = 0,
    j = 0;
  if (typeof o > 'u') return;
  typeof y == 'string' && y.indexOf('%') >= 0
    ? (y = (parseFloat(y.replace('%', '')) / 100) * o)
    : typeof y == 'string' && (y = parseFloat(y)),
    (e.virtualSize = -y),
    f.forEach((x) => {
      a ? (x.style.marginLeft = '') : (x.style.marginRight = ''),
        (x.style.marginBottom = ''),
        (x.style.marginTop = '');
    }),
    i.centeredSlides &&
      i.cssMode &&
      (mn(s, '--swiper-centered-offset-before', ''),
      mn(s, '--swiper-centered-offset-after', ''));
  const L = i.grid && i.grid.rows > 1 && e.grid;
  L && e.grid.initSlides(h);
  let _;
  const $ =
    i.slidesPerView === 'auto' &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (x) => typeof i.breakpoints[x].slidesPerView < 'u'
    ).length > 0;
  for (let x = 0; x < h; x += 1) {
    _ = 0;
    let m;
    if (
      (f[x] && (m = f[x]),
      L && e.grid.updateSlide(x, m, h, t),
      !(f[x] && ft(m, 'display') === 'none'))
    ) {
      if (i.slidesPerView === 'auto') {
        $ && (f[x].style[t('width')] = '');
        const E = getComputedStyle(m),
          O = m.style.transform,
          R = m.style.webkitTransform;
        if (
          (O && (m.style.transform = 'none'),
          R && (m.style.webkitTransform = 'none'),
          i.roundLengths)
        )
          _ = e.isHorizontal() ? wi(m, 'width', !0) : wi(m, 'height', !0);
        else {
          const G = n(E, 'width'),
            Y = n(E, 'padding-left'),
            K = n(E, 'padding-right'),
            Z = n(E, 'margin-left'),
            ke = n(E, 'margin-right'),
            Ee = E.getPropertyValue('box-sizing');
          if (Ee && Ee === 'border-box') _ = G + Z + ke;
          else {
            const { clientWidth: ve, offsetWidth: Se } = m;
            _ = G + Y + K + Z + ke + (Se - ve);
          }
        }
        O && (m.style.transform = O),
          R && (m.style.webkitTransform = R),
          i.roundLengths && (_ = Math.floor(_));
      } else
        (_ = (o - (i.slidesPerView - 1) * y) / i.slidesPerView),
          i.roundLengths && (_ = Math.floor(_)),
          f[x] && (f[x].style[t('width')] = `${_}px`);
      f[x] && (f[x].swiperSlideSize = _),
        b.push(_),
        i.centeredSlides
          ? ((I = I + _ / 2 + F / 2 + y),
            F === 0 && x !== 0 && (I = I - o / 2 - y),
            x === 0 && (I = I - o / 2 - y),
            Math.abs(I) < 1 / 1e3 && (I = 0),
            i.roundLengths && (I = Math.floor(I)),
            j % i.slidesPerGroup === 0 && p.push(I),
            T.push(I))
          : (i.roundLengths && (I = Math.floor(I)),
            (j - Math.min(e.params.slidesPerGroupSkip, j)) %
              e.params.slidesPerGroup ===
              0 && p.push(I),
            T.push(I),
            (I = I + _ + y)),
        (e.virtualSize += _ + y),
        (F = _),
        (j += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, o) + M),
    a &&
      l &&
      (i.effect === 'slide' || i.effect === 'coverflow') &&
      (s.style.width = `${e.virtualSize + y}px`),
    i.setWrapperSize && (s.style[t('width')] = `${e.virtualSize + y}px`),
    L && e.grid.updateWrapperSize(_, p, t),
    !i.centeredSlides)
  ) {
    const x = [];
    for (let m = 0; m < p.length; m += 1) {
      let E = p[m];
      i.roundLengths && (E = Math.floor(E)),
        p[m] <= e.virtualSize - o && x.push(E);
    }
    (p = x),
      Math.floor(e.virtualSize - o) - Math.floor(p[p.length - 1]) > 1 &&
        p.push(e.virtualSize - o);
  }
  if (c && i.loop) {
    const x = b[0] + y;
    if (i.slidesPerGroup > 1) {
      const m = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup
        ),
        E = x * i.slidesPerGroup;
      for (let O = 0; O < m; O += 1) p.push(p[p.length - 1] + E);
    }
    for (let m = 0; m < e.virtual.slidesBefore + e.virtual.slidesAfter; m += 1)
      i.slidesPerGroup === 1 && p.push(p[p.length - 1] + x),
        T.push(T[T.length - 1] + x),
        (e.virtualSize += x);
  }
  if ((p.length === 0 && (p = [0]), y !== 0)) {
    const x = e.isHorizontal() && a ? 'marginLeft' : t('marginRight');
    f.filter((m, E) =>
      !i.cssMode || i.loop ? !0 : E !== f.length - 1
    ).forEach((m) => {
      m.style[x] = `${y}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let x = 0;
    b.forEach((E) => {
      x += E + (y || 0);
    }),
      (x -= y);
    const m = x - o;
    p = p.map((E) => (E <= 0 ? -C : E > m ? m + M : E));
  }
  if (i.centerInsufficientSlides) {
    let x = 0;
    if (
      (b.forEach((m) => {
        x += m + (y || 0);
      }),
      (x -= y),
      x < o)
    ) {
      const m = (o - x) / 2;
      p.forEach((E, O) => {
        p[O] = E - m;
      }),
        T.forEach((E, O) => {
          T[O] = E + m;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: f,
      snapGrid: p,
      slidesGrid: T,
      slidesSizesGrid: b,
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    mn(s, '--swiper-centered-offset-before', `${-p[0]}px`),
      mn(
        s,
        '--swiper-centered-offset-after',
        `${e.size / 2 - b[b.length - 1] / 2}px`
      );
    const x = -e.snapGrid[0],
      m = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((E) => E + x)),
      (e.slidesGrid = e.slidesGrid.map((E) => E + m));
  }
  if (
    (h !== d && e.emit('slidesLengthChange'),
    p.length !== g &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit('snapGridLengthChange')),
    T.length !== w && e.emit('slidesGridLengthChange'),
    i.watchSlidesProgress && e.updateSlidesOffset(),
    !c && !i.cssMode && (i.effect === 'slide' || i.effect === 'fade'))
  ) {
    const x = `${i.containerModifierClass}backface-hidden`,
      m = e.el.classList.contains(x);
    h <= i.maxBackfaceHiddenSlides
      ? m || e.el.classList.add(x)
      : m && e.el.classList.remove(x);
  }
}
function ed(e) {
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
function td() {
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
function nd(e) {
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
      p = -(o - d),
      T = p + t.slidesSizesGrid[l];
    ((p >= 0 && p < t.size - 1) ||
      (T > 1 && T <= t.size) ||
      (p <= 0 && T >= t.size)) &&
      (t.visibleSlides.push(c),
      t.visibleSlidesIndexes.push(l),
      i[l].classList.add(n.slideVisibleClass)),
      (c.progress = s ? -f : f),
      (c.originalProgress = s ? -h : h);
  }
}
function id(e) {
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
      p = t.slidesGrid[f],
      T = t.slidesGrid[t.slidesGrid.length - 1],
      b = Math.abs(e);
    b >= h ? (a = (b - h) / T) : (a = (b + T - p) / T), a > 1 && (a -= 1);
  }
  Object.assign(t, { progress: s, progressLoop: a, isBeginning: r, isEnd: o }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    r && !l && t.emit('reachBeginning toEdge'),
    o && !c && t.emit('reachEnd toEdge'),
    ((l && !r) || (c && !o)) && t.emit('fromEdge'),
    t.emit('progress', s);
}
function sd() {
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
    let l = Fc(a, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !l && (l = t[0]), l && l.classList.add(n.slideNextClass);
    let c = Rc(a, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !c === 0 && (c = t[t.length - 1]),
      c && c.classList.add(n.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const _n = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const n = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      i = t.closest(n());
    if (i) {
      const s = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      s && s.remove();
    }
  },
  ti = (e, t) => {
    if (!e.slides[t]) return;
    const n = e.slides[t].querySelector('[loading="lazy"]');
    n && n.removeAttribute('loading');
  },
  _i = (e) => {
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
          a.includes(l.column) && ti(e, c);
        });
      return;
    }
    const r = s + i - 1;
    if (e.params.rewind || e.params.loop)
      for (let o = s - t; o <= r + t; o += 1) {
        const a = ((o % n) + n) % n;
        (a < s || a > r) && ti(e, a);
      }
    else
      for (let o = Math.max(s - t, 0); o <= Math.min(r + t, n - 1); o += 1)
        o !== s && (o > r || o < s) && ti(e, o);
  };
function rd(e) {
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
function od(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: i, params: s, activeIndex: r, realIndex: o, snapIndex: a } = t;
  let l = e,
    c;
  const d = (h) => {
    let p = h - t.virtual.slidesBefore;
    return (
      p < 0 && (p = t.virtual.slides.length + p),
      p >= t.virtual.slides.length && (p -= t.virtual.slides.length),
      p
    );
  };
  if ((typeof l > 'u' && (l = rd(t)), i.indexOf(n) >= 0)) c = i.indexOf(n);
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
    t.initialized && _i(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    o !== f && t.emit('realIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange');
}
function ld(e) {
  const t = this,
    n = t.params,
    i = e.closest(`.${n.slideClass}, swiper-slide`);
  let s = !1,
    r;
  if (i) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === i) {
        (s = !0), (r = o);
        break;
      }
  }
  if (i && s)
    (t.clickedSlide = i),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            i.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (t.clickedIndex = r);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  n.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var ad = {
  updateSize: Zc,
  updateSlides: Qc,
  updateAutoHeight: ed,
  updateSlidesOffset: td,
  updateSlidesProgress: nd,
  updateProgress: id,
  updateSlidesClasses: sd,
  updateActiveIndex: od,
  updateClickedSlide: ld,
};
function cd(e) {
  e === void 0 && (e = this.isHorizontal() ? 'x' : 'y');
  const t = this,
    { params: n, rtlTranslate: i, translate: s, wrapperEl: r } = t;
  if (n.virtualTranslate) return i ? -s : s;
  if (n.cssMode) return s;
  let o = Bc(r, e);
  return (o += t.cssOverflowAdjustment()), i && (o = -o), o || 0;
}
function dd(e, t) {
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
function fd() {
  return -this.snapGrid[0];
}
function ud() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function pd(e, t, n, i, s) {
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
          Gr({ swiper: r, targetPosition: -d, side: f ? 'left' : 'top' }), !0
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
var hd = {
  getTranslate: cd,
  setTranslate: dd,
  minTranslate: fd,
  maxTranslate: ud,
  translateTo: pd,
};
function md(e, t) {
  const n = this;
  n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`),
    n.emit('setTransition', e, t);
}
function qr(e) {
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
function gd(e, t) {
  e === void 0 && (e = !0);
  const n = this,
    { params: i } = n;
  i.cssMode ||
    (i.autoHeight && n.updateAutoHeight(),
    qr({ swiper: n, runCallbacks: e, direction: t, step: 'Start' }));
}
function vd(e, t) {
  e === void 0 && (e = !0);
  const n = this,
    { params: i } = n;
  (n.animating = !1),
    !i.cssMode &&
      (n.setTransition(0),
      qr({ swiper: n, runCallbacks: e, direction: t, step: 'End' }));
}
var bd = { setTransition: md, transitionStart: gd, transitionEnd: vd };
function wd(e, t, n, i, s) {
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
    wrapperEl: p,
    enabled: T,
  } = r;
  if ((r.animating && a.preventInteractionOnTransition) || (!T && !i && !s))
    return !1;
  const b = Math.min(r.params.slidesPerGroupSkip, o);
  let C = b + Math.floor((o - b) / r.params.slidesPerGroup);
  C >= l.length && (C = l.length - 1);
  const M = -l[C];
  if (a.normalizeSlideIndex)
    for (let w = 0; w < c.length; w += 1) {
      const y = -Math.floor(M * 100),
        I = Math.floor(c[w] * 100),
        F = Math.floor(c[w + 1] * 100);
      typeof c[w + 1] < 'u'
        ? y >= I && y < F - (F - I) / 2
          ? (o = w)
          : y >= I && y < F && (o = w + 1)
        : y >= I && (o = w);
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
  let g;
  if (
    (o > f ? (g = 'next') : o < f ? (g = 'prev') : (g = 'reset'),
    (h && -M === r.translate) || (!h && M === r.translate))
  )
    return (
      r.updateActiveIndex(o),
      a.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      a.effect !== 'slide' && r.setTranslate(M),
      g !== 'reset' && (r.transitionStart(n, g), r.transitionEnd(n, g)),
      !1
    );
  if (a.cssMode) {
    const w = r.isHorizontal(),
      y = h ? M : -M;
    if (t === 0) {
      const I = r.virtual && r.params.virtual.enabled;
      I &&
        ((r.wrapperEl.style.scrollSnapType = 'none'),
        (r._immediateVirtual = !0)),
        I && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              p[w ? 'scrollLeft' : 'scrollTop'] = y;
            }))
          : (p[w ? 'scrollLeft' : 'scrollTop'] = y),
        I &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ''), (r._immediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          Gr({ swiper: r, targetPosition: y, side: w ? 'left' : 'top' }), !0
        );
      p.scrollTo({ [w ? 'left' : 'top']: y, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    r.setTransition(t),
    r.setTranslate(M),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit('beforeTransitionStart', t, i),
    r.transitionStart(n, g),
    t === 0
      ? r.transitionEnd(n, g)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (y) {
            !r ||
              r.destroyed ||
              (y.target === this &&
                (r.wrapperEl.removeEventListener(
                  'transitionend',
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(n, g)));
          }),
        r.wrapperEl.addEventListener(
          'transitionend',
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function _d(e, t, n, i) {
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
    i.loopFix({ direction: 'next' }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, e, t, n)
    : i.slideTo(i.activeIndex + l, e, t, n);
}
function xd(e, t, n) {
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
  const p = h(f),
    T = r.map((M) => h(M));
  let b = r[T.indexOf(p) - 1];
  if (typeof b > 'u' && s.cssMode) {
    let M;
    r.forEach((g, w) => {
      p >= g && (M = w);
    }),
      typeof M < 'u' && (b = r[M > 0 ? M - 1 : M]);
  }
  let C = 0;
  if (
    (typeof b < 'u' &&
      ((C = o.indexOf(b)),
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
  }
  return i.slideTo(C, e, t, n);
}
function Sd(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const i = this;
  return i.slideTo(i.activeIndex, e, t, n);
}
function Td(e, t, n, i) {
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
function Ed() {
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
            On(() => {
              e.slideTo(s);
            }))
          : e.slideTo(s)
        : s > e.slides.length - i
        ? (e.loopFix(),
          (s = e.getSlideIndex(
            Ye(n, `${o}[data-swiper-slide-index="${r}"]`)[0]
          )),
          On(() => {
            e.slideTo(s);
          }))
        : e.slideTo(s);
  } else e.slideTo(s);
}
var Cd = {
  slideTo: wd,
  slideToLoop: _d,
  slideNext: yd,
  slidePrev: xd,
  slideReset: Sd,
  slideToClosest: Td,
  slideToClickedSlide: Ed,
};
function Md(e) {
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
function Od(e) {
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
    params: p,
  } = l;
  if (
    ((l.allowSlidePrev = !0),
    (l.allowSlideNext = !0),
    l.virtual && p.virtual.enabled)
  ) {
    n &&
      (!p.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : p.centeredSlides && l.snapIndex < p.slidesPerView
        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
        : l.snapIndex === l.snapGrid.length - 1 &&
          l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = d),
      (l.allowSlideNext = f),
      l.emit('loopFix');
    return;
  }
  const T =
    p.slidesPerView === 'auto'
      ? l.slidesPerViewDynamic()
      : Math.ceil(parseFloat(p.slidesPerView, 10));
  let b = p.loopedSlides || T;
  b % p.slidesPerGroup !== 0 &&
    (b += p.slidesPerGroup - (b % p.slidesPerGroup)),
    (l.loopedSlides = b);
  const C = [],
    M = [];
  let g = l.activeIndex;
  typeof r > 'u'
    ? (r = l.getSlideIndex(
        l.slides.filter((j) => j.classList.contains(p.slideActiveClass))[0]
      ))
    : (g = r);
  const w = i === 'next' || !i,
    y = i === 'prev' || !i;
  let I = 0,
    F = 0;
  if (r < b) {
    I = Math.max(b - r, p.slidesPerGroup);
    for (let j = 0; j < b - r; j += 1) {
      const L = j - Math.floor(j / c.length) * c.length;
      C.push(c.length - L - 1);
    }
  } else if (r > l.slides.length - b * 2) {
    F = Math.max(r - (l.slides.length - b * 2), p.slidesPerGroup);
    for (let j = 0; j < F; j += 1) {
      const L = j - Math.floor(j / c.length) * c.length;
      M.push(L);
    }
  }
  if (
    (y &&
      C.forEach((j) => {
        (l.slides[j].swiperLoopMoveDOM = !0),
          h.prepend(l.slides[j]),
          (l.slides[j].swiperLoopMoveDOM = !1);
      }),
    w &&
      M.forEach((j) => {
        (l.slides[j].swiperLoopMoveDOM = !0),
          h.append(l.slides[j]),
          (l.slides[j].swiperLoopMoveDOM = !1);
      }),
    l.recalcSlides(),
    p.slidesPerView === 'auto' && l.updateSlides(),
    p.watchSlidesProgress && l.updateSlidesOffset(),
    n)
  ) {
    if (C.length > 0 && y)
      if (typeof t > 'u') {
        const j = l.slidesGrid[g],
          _ = l.slidesGrid[g + I] - j;
        a
          ? l.setTranslate(l.translate - _)
          : (l.slideTo(g + I, 0, !1, !0),
            s && (l.touches[l.isHorizontal() ? 'startX' : 'startY'] += _));
      } else s && l.slideToLoop(t, 0, !1, !0);
    else if (M.length > 0 && w)
      if (typeof t > 'u') {
        const j = l.slidesGrid[g],
          _ = l.slidesGrid[g - F] - j;
        a
          ? l.setTranslate(l.translate - _)
          : (l.slideTo(g - F, 0, !1, !0),
            s && (l.touches[l.isHorizontal() ? 'startX' : 'startY'] += _));
      } else l.slideToLoop(t, 0, !1, !0);
  }
  if (
    ((l.allowSlidePrev = d),
    (l.allowSlideNext = f),
    l.controller && l.controller.control && !o)
  ) {
    const j = {
      slideRealIndex: t,
      slideTo: !1,
      direction: i,
      setTranslate: s,
      activeSlideIndex: r,
      byController: !0,
    };
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((L) => {
          !L.destroyed && L.params.loop && L.loopFix(j);
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix(j);
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
var Ad = { loopCreate: Md, loopFix: Od, loopDestroy: Pd };
function Ld(e) {
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
function Id() {
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
var kd = { setGrabCursor: Ld, unsetGrabCursor: Id };
function $d(e, t) {
  t === void 0 && (t = this);
  function n(i) {
    if (!i || i === rt() || i === Ae()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const s = i.closest(e);
    return !s && !i.getRootNode ? null : s || n(i.getRootNode().host);
  }
  return n(t);
}
function zd(e) {
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
    p = !!(l.target && l.target.shadowRoot);
  if (r.noSwiping && (p ? $d(h, c) : c.closest(h))) {
    t.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !c.closest(r.swipeHandler)) return;
  (o.currentX = l.pageX), (o.currentY = l.pageY);
  const T = o.currentX,
    b = o.currentY,
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
    (o.startY = b),
    (s.touchStartTime = Pn()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    r.threshold > 0 && (s.allowThresholdMove = !1);
  let g = !0;
  c.matches(s.focusableElements) &&
    ((g = !1), c.nodeName === 'SELECT' && (s.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(s.focusableElements) &&
      n.activeElement !== c &&
      n.activeElement.blur();
  const w = g && t.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || w) &&
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
function Bd(e) {
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
  const c = i.evCache.findIndex((F) => F.pointerId === l.pointerId);
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
        (i.touchStartTime = Pn()));
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
  const p = r.currentX - r.startX,
    T = r.currentY - r.startY;
  if (n.params.threshold && Math.sqrt(p ** 2 + T ** 2) < n.params.threshold)
    return;
  if (typeof i.isScrolling > 'u') {
    let F;
    (n.isHorizontal() && r.currentY === r.startY) ||
    (n.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : p * p + T * T >= 25 &&
        ((F = (Math.atan2(Math.abs(T), Math.abs(p)) * 180) / Math.PI),
        (i.isScrolling = n.isHorizontal()
          ? F > s.touchAngle
          : 90 - F > s.touchAngle));
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
  let b = n.isHorizontal() ? p : T,
    C = n.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  s.oneWayMovement &&
    ((b = Math.abs(b) * (o ? 1 : -1)), (C = Math.abs(C) * (o ? 1 : -1))),
    (r.diff = b),
    (b *= s.touchRatio),
    o && ((b = -b), (C = -C));
  const M = n.touchesDirection;
  (n.swipeDirection = b > 0 ? 'prev' : 'next'),
    (n.touchesDirection = C > 0 ? 'prev' : 'next');
  const g = n.params.loop && !s.cssMode;
  if (!i.isMoved) {
    if (
      (g && n.loopFix({ direction: n.swipeDirection }),
      (i.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const F = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
      });
      n.wrapperEl.dispatchEvent(F);
    }
    (i.allowMomentumBounce = !1),
      s.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit('sliderFirstMove', l);
  }
  let w;
  i.isMoved &&
    M !== n.touchesDirection &&
    g &&
    Math.abs(b) >= 1 &&
    (n.loopFix({ direction: n.swipeDirection, setTranslate: !0 }), (w = !0)),
    n.emit('sliderMove', l),
    (i.isMoved = !0),
    (i.currentTranslate = b + i.startTranslate);
  let y = !0,
    I = s.resistanceRatio;
  if (
    (s.touchReleaseOnEdges && (I = 0),
    b > 0
      ? (g &&
          !w &&
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
          ((y = !1),
          s.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + b) ** I)))
      : b < 0 &&
        (g &&
          !w &&
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
          ((y = !1),
          s.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - b) ** I))),
    y && (l.preventedByNestedSwiper = !0),
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
    if (Math.abs(b) > s.threshold || i.allowThresholdMove) {
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
function Dd(e) {
  const t = this,
    n = t.touchEventsData,
    i = n.evCache.findIndex((w) => w.pointerId === e.pointerId);
  if (
    (i >= 0 && n.evCache.splice(i, 1),
    ['pointercancel', 'pointerout', 'pointerleave'].includes(e.type) &&
      !(
        e.type === 'pointercancel' &&
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
  const d = Pn(),
    f = d - n.touchStartTime;
  if (t.allowClick) {
    const w = c.path || (c.composedPath && c.composedPath());
    t.updateClickedSlide((w && w[0]) || c.target),
      t.emit('tap click', c),
      f < 300 &&
        d - n.lastClickTime < 300 &&
        t.emit('doubleTap doubleClick', c);
  }
  if (
    ((n.lastClickTime = Pn()),
    On(() => {
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
  let p = 0,
    T = t.slidesSizesGrid[0];
  for (
    let w = 0;
    w < a.length;
    w += w < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
  ) {
    const y = w < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
    typeof a[w + y] < 'u'
      ? h >= a[w] && h < a[w + y] && ((p = w), (T = a[w + y] - a[w]))
      : h >= a[w] && ((p = w), (T = a[a.length - 1] - a[a.length - 2]));
  }
  let b = null,
    C = null;
  s.rewind &&
    (t.isBeginning
      ? (C =
          s.virtual && s.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (b = 0));
  const M = (h - a[p]) / T,
    g = p < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
  if (f > s.longSwipesMs) {
    if (!s.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === 'next' &&
      (M >= s.longSwipesRatio
        ? t.slideTo(s.rewind && t.isEnd ? b : p + g)
        : t.slideTo(p)),
      t.swipeDirection === 'prev' &&
        (M > 1 - s.longSwipesRatio
          ? t.slideTo(p + g)
          : C !== null && M < 0 && Math.abs(M) > s.longSwipesRatio
          ? t.slideTo(C)
          : t.slideTo(p));
  } else {
    if (!s.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl)
      ? c.target === t.navigation.nextEl
        ? t.slideTo(p + g)
        : t.slideTo(p)
      : (t.swipeDirection === 'next' && t.slideTo(b !== null ? b : p + g),
        t.swipeDirection === 'prev' && t.slideTo(C !== null ? C : p));
  }
}
function Bs() {
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
function Nd(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function Rd() {
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
function Fd(e) {
  const t = this;
  _n(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== 'auto' && !t.params.autoHeight)
    ) && t.update();
}
let Ds = !1;
function jd() {}
const Ur = (e, t) => {
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
    (i.preventClicks || i.preventClicksPropagation) &&
      s[l]('click', e.onClick, !0),
    i.cssMode && r[l]('scroll', e.onScroll),
    i.updateOnWindowResize
      ? e[c](
          o.ios || o.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          Bs,
          !0
        )
      : e[c]('observerUpdate', Bs, !0),
    s[l]('load', e.onLoad, { capture: !0 });
};
function Hd() {
  const e = this,
    t = rt(),
    { params: n } = e;
  (e.onTouchStart = zd.bind(e)),
    (e.onTouchMove = Bd.bind(e)),
    (e.onTouchEnd = Dd.bind(e)),
    n.cssMode && (e.onScroll = Rd.bind(e)),
    (e.onClick = Nd.bind(e)),
    (e.onLoad = Fd.bind(e)),
    Ds || (t.addEventListener('touchstart', jd), (Ds = !0)),
    Ur(e, 'on');
}
function Gd() {
  Ur(this, 'off');
}
var Wd = { attachEvents: Hd, detachEvents: Gd };
const Ns = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function Vd() {
  const e = this,
    { realIndex: t, initialized: n, params: i, el: s } = e,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
  if (!o || e.currentBreakpoint === o) return;
  const l = (o in r ? r[o] : void 0) || e.originalParams,
    c = Ns(e, i),
    d = Ns(e, l),
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
    ['navigation', 'pagination', 'scrollbar'].forEach((b) => {
      if (typeof l[b] > 'u') return;
      const C = i[b] && i[b].enabled,
        M = l[b] && l[b].enabled;
      C && !M && e[b].disable(), !C && M && e[b].enable();
    });
  const h = l.direction && l.direction !== i.direction,
    p = i.loop && (l.slidesPerView !== i.slidesPerView || h);
  h && n && e.changeDirection(), Ie(e.params, l);
  const T = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    f && !T ? e.disable() : !f && T && e.enable(),
    (e.currentBreakpoint = o),
    e.emit('_beforeBreakpoint', l),
    p && n && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit('breakpoint', l);
}
function qd(e, t, n) {
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
var Ud = { setBreakpoint: Vd, getBreakpoint: qd };
function Kd(e, t) {
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
function Yd() {
  const e = this,
    { classNames: t, params: n, rtl: i, el: s, device: r } = e,
    o = Kd(
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
function Xd() {
  const e = this,
    { el: t, classNames: n } = e;
  t.classList.remove(...n), e.emitContainerClasses();
}
var Jd = { addClasses: Yd, removeClasses: Xd };
function Zd() {
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
var Qd = { checkOverflow: Zd },
  Rs = {
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
function ef(e, t) {
  return function (i) {
    i === void 0 && (i = {});
    const s = Object.keys(i)[0],
      r = i[s];
    if (typeof r != 'object' || r === null) {
      Ie(t, i);
      return;
    }
    if (
      (['navigation', 'pagination', 'scrollbar'].indexOf(s) >= 0 &&
        e[s] === !0 &&
        (e[s] = { auto: !0 }),
      !(s in e && 'enabled' in r))
    ) {
      Ie(t, i);
      return;
    }
    e[s] === !0 && (e[s] = { enabled: !0 }),
      typeof e[s] == 'object' && !('enabled' in e[s]) && (e[s].enabled = !0),
      e[s] || (e[s] = { enabled: !1 }),
      Ie(t, i);
  };
}
const ni = {
    eventsEmitter: Jc,
    update: ad,
    translate: hd,
    transition: bd,
    slide: Cd,
    loop: Ad,
    grabCursor: kd,
    events: Wd,
    breakpoints: Ud,
    checkOverflow: Qd,
    classes: Jd,
  },
  ii = {};
let rn = class Ze {
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
      (a.support = Vr()),
      (a.device = qc({ userAgent: n.userAgent })),
      (a.browser = Kc()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      n.modules && Array.isArray(n.modules) && a.modules.push(...n.modules);
    const l = {};
    a.modules.forEach((d) => {
      d({
        params: n,
        swiper: a,
        extendParams: ef(n, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      });
    });
    const c = Ie({}, Rs, l);
    return (
      (a.params = Ie({}, c, ii, n)),
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
      r = An(s[0]);
    return An(t) - r;
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
    if (s.centeredSlides) {
      let f = r[c] ? r[c].swiperSlideSize : 0,
        h;
      for (let p = c + 1; p < r.length; p += 1)
        r[p] &&
          !h &&
          ((f += r[p].swiperSlideSize), (d += 1), f > l && (h = !0));
      for (let p = c - 1; p >= 0; p -= 1)
        r[p] &&
          !h &&
          ((f += r[p].swiperSlideSize), (d += 1), f > l && (h = !0));
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
        o.complete && _n(t, o);
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
    (i.swiper = n), i.parentNode && i.parentNode.host && (n.isElement = !0);
    const s = () =>
      `.${(n.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let o = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(s())
        : Ye(i, s())[0])();
    return (
      !o &&
        n.params.createElements &&
        ((o = Yi('div', n.params.wrapperClass)),
        i.append(o),
        Ye(i, `.${n.params.slideClass}`).forEach((a) => {
          o.append(a);
        })),
      Object.assign(n, {
        el: i,
        wrapperEl: o,
        slidesEl: n.isElement ? i.parentNode.host : o,
        hostEl: n.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === 'rtl' || ft(i, 'direction') === 'rtl',
        rtlTranslate:
          n.params.direction === 'horizontal' &&
          (i.dir.toLowerCase() === 'rtl' || ft(i, 'direction') === 'rtl'),
        wrongRTL: ft(o, 'display') === '-webkit-box',
      }),
      !0
    );
  }
  init(t) {
    const n = this;
    return (
      n.initialized ||
        n.mount(t) === !1 ||
        (n.emit('beforeInit'),
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
        n.attachEvents(),
        [...n.el.querySelectorAll('[loading="lazy"]')].forEach((s) => {
          s.complete
            ? _n(n, s)
            : s.addEventListener('load', (r) => {
                _n(n, r.target);
              });
        }),
        _i(n),
        (n.initialized = !0),
        _i(n),
        n.emit('init'),
        n.emit('afterInit')),
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
        t !== !1 && ((i.el.swiper = null), $c(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    Ie(ii, t);
  }
  static get extendedDefaults() {
    return ii;
  }
  static get defaults() {
    return Rs;
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
Object.keys(ni).forEach((e) => {
  Object.keys(ni[e]).forEach((t) => {
    rn.prototype[t] = ni[e][t];
  });
});
rn.use([Yc, Xc]);
const Kr = [
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
function Mt(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  );
}
function ut(e, t) {
  const n = ['__proto__', 'constructor', 'prototype'];
  Object.keys(t)
    .filter((i) => n.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > 'u'
        ? (e[i] = t[i])
        : Mt(t[i]) && Mt(e[i]) && Object.keys(t[i]).length > 0
        ? t[i].__swiper__
          ? (e[i] = t[i])
          : ut(e[i], t[i])
        : (e[i] = t[i]);
    });
}
function Yr(e) {
  return (
    e === void 0 && (e = {}),
    e.navigation &&
      typeof e.navigation.nextEl > 'u' &&
      typeof e.navigation.prevEl > 'u'
  );
}
function Xr(e) {
  return e === void 0 && (e = {}), e.pagination && typeof e.pagination.el > 'u';
}
function Jr(e) {
  return e === void 0 && (e = {}), e.scrollbar && typeof e.scrollbar.el > 'u';
}
function Zr(e) {
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
function tf(e) {
  return (
    e === void 0 && (e = ''),
    e
      ? e.includes('swiper-wrapper')
        ? e
        : `swiper-wrapper ${e}`
      : 'swiper-wrapper'
  );
}
function nf(e) {
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
      (_) => _ !== 'children' && _ !== 'direction' && _ !== 'wrapperClass'
    ),
    {
      params: d,
      pagination: f,
      navigation: h,
      scrollbar: p,
      virtual: T,
      thumbs: b,
    } = t;
  let C, M, g, w, y, I, F, j;
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
      (g = !0),
    s.includes('scrollbar') &&
      i.scrollbar &&
      (i.scrollbar.el || a) &&
      (d.scrollbar || d.scrollbar === !1) &&
      p &&
      !p.el &&
      (w = !0),
    s.includes('navigation') &&
      i.navigation &&
      (i.navigation.prevEl || o) &&
      (i.navigation.nextEl || r) &&
      (d.navigation || d.navigation === !1) &&
      h &&
      !h.prevEl &&
      !h.nextEl &&
      (y = !0);
  const L = (_) => {
    t[_] &&
      (t[_].destroy(),
      _ === 'navigation'
        ? (t.isElement && (t[_].prevEl.remove(), t[_].nextEl.remove()),
          (d[_].prevEl = void 0),
          (d[_].nextEl = void 0),
          (t[_].prevEl = void 0),
          (t[_].nextEl = void 0))
        : (t.isElement && t[_].el.remove(),
          (d[_].el = void 0),
          (t[_].el = void 0)));
  };
  s.includes('loop') &&
    t.isElement &&
    (d.loop && !i.loop ? (I = !0) : !d.loop && i.loop ? (F = !0) : (j = !0)),
    c.forEach((_) => {
      if (Mt(d[_]) && Mt(i[_]))
        ut(d[_], i[_]),
          (_ === 'navigation' || _ === 'pagination' || _ === 'scrollbar') &&
            'enabled' in i[_] &&
            !i[_].enabled &&
            L(_);
      else {
        const $ = i[_];
        ($ === !0 || $ === !1) &&
        (_ === 'navigation' || _ === 'pagination' || _ === 'scrollbar')
          ? $ === !1 && L(_)
          : (d[_] = i[_]);
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
    s.includes('children') && n && d.loop && (j = !0),
    C && b.init() && b.update(!0),
    M && (t.controller.control = d.controller.control),
    g &&
      (t.isElement &&
        (!l || typeof l == 'string') &&
        ((l = document.createElement('div')),
        l.classList.add('swiper-pagination'),
        t.el.appendChild(l)),
      l && (d.pagination.el = l),
      f.init(),
      f.render(),
      f.update()),
    w &&
      (t.isElement &&
        (!a || typeof a == 'string') &&
        ((a = document.createElement('div')),
        a.classList.add('swiper-scrollbar'),
        t.el.appendChild(a)),
      a && (d.scrollbar.el = a),
      p.init(),
      p.updateSize(),
      p.setTranslate()),
    y &&
      (t.isElement &&
        ((!r || typeof r == 'string') &&
          ((r = document.createElement('div')),
          r.classList.add('swiper-button-next'),
          (r.innerHTML = t.hostEl.nextButtonSvg),
          t.el.appendChild(r)),
        (!o || typeof o == 'string') &&
          ((o = document.createElement('div')),
          o.classList.add('swiper-button-prev'),
          (r.innerHTML = t.hostEl.prevButtonSvg),
          t.el.appendChild(o))),
      r && (d.navigation.nextEl = r),
      o && (d.navigation.prevEl = o),
      h.init(),
      h.update()),
    s.includes('allowSlideNext') && (t.allowSlideNext = i.allowSlideNext),
    s.includes('allowSlidePrev') && (t.allowSlidePrev = i.allowSlidePrev),
    s.includes('direction') && t.changeDirection(i.direction, !1),
    (I || j) && t.loopDestroy(),
    (F || j) && t.loopCreate(),
    t.update();
}
function Fs(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = !0);
  const n = { on: {} },
    i = {},
    s = {};
  ut(n, rn.defaults),
    ut(n, rn.extendedDefaults),
    (n._emitClasses = !0),
    (n.init = !1);
  const r = {},
    o = Kr.map((l) => l.replace(/_/, '')),
    a = Object.assign({}, e);
  return (
    Object.keys(a).forEach((l) => {
      typeof e[l] > 'u' ||
        (o.indexOf(l) >= 0
          ? Mt(e[l])
            ? ((n[l] = {}), (s[l] = {}), ut(n[l], e[l]), ut(s[l], e[l]))
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
function sf(e, t) {
  let {
    el: n,
    nextEl: i,
    prevEl: s,
    paginationEl: r,
    scrollbarEl: o,
    swiper: a,
  } = e;
  Yr(t) &&
    i &&
    s &&
    ((a.params.navigation.nextEl = i),
    (a.originalParams.navigation.nextEl = i),
    (a.params.navigation.prevEl = s),
    (a.originalParams.navigation.prevEl = s)),
    Xr(t) &&
      r &&
      ((a.params.pagination.el = r), (a.originalParams.pagination.el = r)),
    Jr(t) &&
      o &&
      ((a.params.scrollbar.el = o), (a.originalParams.scrollbar.el = o)),
    a.init(n);
}
function rf(e, t, n, i, s) {
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
    Kr.filter((l) => l[0] === '_')
      .map((l) => l.replace(/_/, ''))
      .forEach((l) => {
        if (l in e && l in t)
          if (Mt(e[l]) && Mt(t[l])) {
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
const of = (e) => {
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
function si(e, t, n) {
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
function lf(e, t, n) {
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
const af = {
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
        p = { value: [] },
        T = { value: [] },
        b = pe(null),
        C = pe(null),
        M = pe(null),
        g = pe(null),
        { params: w, passedParams: y } = Fs(e, !1);
      si(n, p, T), (h.value = y), (T.value = p.value);
      const I = () => {
        si(n, p, T), (l.value = !0);
      };
      (w.onAny = function (L) {
        for (
          var _ = arguments.length, $ = new Array(_ > 1 ? _ - 1 : 0), x = 1;
          x < _;
          x++
        )
          $[x - 1] = arguments[x];
        i(L, ...$);
      }),
        Object.assign(w.on, {
          _beforeBreakpoint: I,
          _containerClasses(L, _) {
            o.value = _;
          },
        });
      const F = { ...w };
      if (
        (delete F.wrapperClass,
        (f.value = new rn(F)),
        f.value.virtual && f.value.params.virtual.enabled)
      ) {
        f.value.virtual.slides = p.value;
        const L = {
          cache: !1,
          slides: p.value,
          renderExternal: (_) => {
            a.value = _;
          },
          renderExternalUpdate: !1,
        };
        ut(f.value.params.virtual, L), ut(f.value.originalParams.virtual, L);
      }
      Ni(() => {
        !c.value && f.value && (f.value.emitSlidesClasses(), (c.value = !0));
        const { passedParams: L } = Fs(e, !1),
          _ = rf(L, h.value, p.value, T.value, ($) => $.props && $.props.key);
        (h.value = L),
          (_.length || l.value) &&
            f.value &&
            !f.value.destroyed &&
            nf({
              swiper: f.value,
              slides: p.value,
              passedParams: L,
              changedParams: _,
              nextEl: b.value,
              prevEl: C.value,
              scrollbarEl: g.value,
              paginationEl: M.value,
            }),
          (l.value = !1);
      }),
        Fi('swiper', f),
        Ut(a, () => {
          zi(() => {
            of(f.value);
          });
        }),
        on(() => {
          d.value &&
            (sf(
              {
                el: d.value,
                nextEl: b.value,
                prevEl: C.value,
                paginationEl: M.value,
                scrollbarEl: g.value,
                swiper: f.value,
              },
              w
            ),
            i('swiper', f.value));
        }),
        ln(() => {
          f.value && !f.value.destroyed && f.value.destroy(!0, !1);
        });
      function j(L) {
        return w.virtual
          ? lf(f, L, a.value)
          : (L.forEach((_, $) => {
              _.props || (_.props = {}),
                (_.props.swiperRef = f),
                (_.props.swiperSlideIndex = $);
            }),
            L);
      }
      return () => {
        const { slides: L, slots: _ } = si(n, p, T);
        return Ne(s, { ref: d, class: Zr(o.value) }, [
          _['container-start'],
          Ne(r, { class: tf(w.wrapperClass) }, [
            _['wrapper-start'],
            j(L),
            _['wrapper-end'],
          ]),
          Yr(e) && [
            Ne('div', { ref: C, class: 'swiper-button-prev' }),
            Ne('div', { ref: b, class: 'swiper-button-next' }),
          ],
          Jr(e) && Ne('div', { ref: g, class: 'swiper-scrollbar' }),
          Xr(e) && Ne('div', { ref: M, class: 'swiper-pagination' }),
          _['container-end'],
        ]);
      };
    },
  },
  cf = {
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
      function l(f, h, p) {
        h === r.value && (o.value = p);
      }
      on(() => {
        !s || !s.value || (s.value.on('_slideClass', l), (i = !0));
      }),
        xr(() => {
          i || !s || !s.value || (s.value.on('_slideClass', l), (i = !0));
        }),
        Ni(() => {
          !r.value ||
            !s ||
            !s.value ||
            (typeof e.swiperSlideIndex < 'u' &&
              (r.value.swiperSlideIndex = e.swiperSlideIndex),
            s.value.destroyed &&
              o.value !== 'swiper-slide' &&
              (o.value = 'swiper-slide'));
        }),
        ln(() => {
          !s || !s.value || s.value.off('_slideClass', l);
        });
      const c = Vi(() => ({
        isActive: o.value.indexOf('swiper-slide-active') >= 0,
        isVisible: o.value.indexOf('swiper-slide-visible') >= 0,
        isPrev: o.value.indexOf('swiper-slide-prev') >= 0,
        isNext: o.value.indexOf('swiper-slide-next') >= 0,
      }));
      Fi('swiperSlide', c);
      const d = () => {
        a.value = !0;
      };
      return () =>
        Ne(
          e.tag,
          {
            class: Zr(`${o.value}`),
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
const df = [
  {
    id: '1',
    image: './img/photography/teamlab_1.png',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '2',
    image: './img/photography/teamlab_2.png',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '3',
    image: './img/photography/teamlab_3.png',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '4',
    image: './img/photography/teamlab_4.jpg',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '5',
    image: './img/photography/teamlab_5.jpg',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '6',
    image: './img/photography/teamlab_6.jpg',
    type: 'photo',
    title: 'teamlab / exhibit',
  },
  {
    id: '7',
    image: './img/photography/hokkaido_1.png',
    type: 'photo',
    title: 'hokkaido / personal',
  },
  {
    id: '8',
    image: './img/photography/hokkaido_2.png',
    type: 'photo',
    title: 'hokkaido / personal',
  },
];
const ff = {
    name: 'Photography',
    components: { Modal: jr, Swiper: af, SwiperSlide: cf },
    setup() {
      const e = pe(''),
        t = pe('');
      return {
        items: df,
        modalStatus: e,
        modalImage: t,
        onSwiper: (r) => {
          console.log(r);
        },
        onSlideChange: () => {
          console.log('slide change');
        },
        modules: [jc, Hc, Gc],
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
  uf = { class: 'portfolio-photography' },
  pf = {
    class: 'portfolio-photography__wrapper',
    'data-aos': 'fade-left',
    'data-aos-duration': '1200',
    'data-aos-offset': '200',
    'data-aos-delay': '400',
    'data-aos-easing': 'ease-out-cubic',
  },
  hf = { class: 'portfolio-photography__content m-0' },
  mf = ['data-photography'],
  gf = { class: 'portfolio-photography__content-text' },
  vf = { class: 'portfolio-photography__content-type' },
  bf = { class: 'portfolio-photography__content-title' },
  wf = D(
    'p',
    { class: 'portfolio-photography__notice m-0 d-block d-md-none' },
    ' swipe left / right to see more photography ',
    -1
  ),
  _f = { class: 'portfolio-modal__item' },
  yf = { class: 'm-0' },
  xf = ['src'];
function Sf(e, t, n, i, s, r) {
  const o = tt('swiper-slide'),
    a = tt('swiper'),
    l = tt('Modal');
  return (
    ce(),
    ge('section', uf, [
      D('div', pf, [
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
            default: dt(() => [
              (ce(!0),
              ge(
                we,
                null,
                tn(
                  i.items,
                  (c, d) => (
                    ce(),
                    Br(
                      o,
                      { key: d },
                      {
                        default: dt(() => [
                          D('p', hf, [
                            D(
                              'img',
                              {
                                class: 'portfolio-photography__content-img',
                                style: $t({
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
                              mf
                            ),
                          ]),
                          D('p', gf, [
                            D('span', vf, et(c.type), 1),
                            D('span', bf, et(c.title), 1),
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
        wf,
      ]),
      Di(
        ne(
          Gn,
          { name: 'modal-fade', status: this.modalStatus },
          {
            default: dt(() => [
              ne(
                l,
                { onModalOff: r.closeModal },
                {
                  body: dt(() => [
                    D('div', _f, [
                      D('p', yf, [
                        D(
                          'img',
                          {
                            src: i.modalImage,
                            class: 'portfolio-modal__item-images',
                          },
                          null,
                          8,
                          xf
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
        [[qi, this.modalStatus !== '']]
      ),
    ])
  );
}
const Tf = st(ff, [['render', Sf]]),
  Ef = [
    {
      id: '1',
      bg: 'dark',
      imageRough: 'https://placehold.jp/300x150.png',
      image: './img/illustration/arknights_ajimu.png',
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
const Cf = {
    name: 'showcaseItem',
    data() {
      return { myShowcase: Ef };
    },
  },
  Mf = { class: 'portfolio-showcase__item-border' },
  Of = { class: 'portfolio-showcase__item-img--rough' },
  Pf = ['src'],
  Af = { class: 'portfolio-showcase__item-img' },
  Lf = ['src'],
  If = { class: 'portfolio-showcase__item-title' },
  kf = { class: 'portfolio-showcase__item-text' };
function $f(e, t, n, i, s, r) {
  return (
    ce(!0),
    ge(
      we,
      null,
      tn(
        s.myShowcase,
        (o) => (
          ce(),
          ge('div', null, [
            D(
              'div',
              {
                class: Oe([
                  'portfolio-showcase__item',
                  { 'portfolio-showcase__bg-light': o.bg === 'light' },
                ]),
              },
              [
                D('div', Mf, et(o.id), 1),
                D('p', Of, [
                  D('img', { src: o.imageRough, class: 'w-100' }, null, 8, Pf),
                ]),
                D('p', Af, [
                  D('img', { src: o.image, class: 'w-100' }, null, 8, Lf),
                ]),
                D('p', If, et(o.title), 1),
                D('p', kf, et(o.description), 1),
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
const zf = st(Cf, [['render', $f]]),
  Bf = '/portfolio/img/icons/cursor_icon.svg';
const Df = {
    name: 'showcase',
    components: { showcaseItem: zf },
    data: () => ({ isActive: !1 }),
    methods: {
      toggleShowcase() {
        document.body.classList.toggle('is-fixed'),
          (this.isActive = !this.isActive);
      },
    },
  },
  Nf = { class: 'portfolio-showcase' },
  Rf = { class: 'portfolio-showcase__all' },
  Ff = D(
    'div',
    { class: 'portfolio-showcase__all-scroll' },
    [
      D('div', { class: 'portfolio-showcase__all-scroll-text' }, [
        D('span', null, 'EXPLORE '),
        D('span', null, 'EXPLORE '),
        D('span', null, 'EXPLORE '),
        D('span', null, 'EXPLORE '),
      ]),
      D('div', { class: 'portfolio-showcase__all-scroll-text' }, [
        D('span', null, 'EXPLORE '),
        D('span', null, 'EXPLORE '),
        D('span', null, 'EXPLORE '),
        D('span', null, 'EXPLORE '),
      ]),
    ],
    -1
  ),
  jf = { class: 'portfolio-showcase__all-wrap' },
  Hf = D(
    'p',
    { class: 'portfolio-showcase__all-text m-0' },
    ' in depth / SELECTED WORKS  ',
    -1
  ),
  Gf = D(
    'p',
    {
      class: 'portfolio-showcase__all-img mb-1',
      'data-aos': 'fade',
      'data-aos-duration': '600',
      'data-aos-delay': '200',
      'data-aos-easing': 'ease-out-cubic',
    },
    [D('img', { class: 'w-100', src: Bf })],
    -1
  ),
  Wf = [Hf, Gf],
  Vf = D(
    'div',
    { class: 'portfolio-showcase__splash-svg' },
    [
      D('svg', { width: '100%', height: '100%' }, [
        D('rect', { width: '100%', height: '100%' }),
      ]),
    ],
    -1
  ),
  qf = [Vf],
  Uf = D(
    'p',
    { class: 'portfolio-showcase__splash-contents-close-btn' },
    null,
    -1
  ),
  Kf = [Uf],
  Yf = { class: 'portfolio-showcase__splash-contents-list' };
function Xf(e, t, n, i, s, r) {
  const o = tt('showcaseItem');
  return (
    ce(),
    ge('section', Nf, [
      D('div', Rf, [
        Ff,
        D('div', jf, [
          D(
            'div',
            {
              class: 'portfolio-showcase__all-main',
              onClick:
                t[0] ||
                (t[0] = (...a) => r.toggleShowcase && r.toggleShowcase(...a)),
            },
            Wf
          ),
        ]),
      ]),
      D(
        'div',
        {
          class: Oe([
            'portfolio-showcase__splash',
            { 'is-active': e.isActive },
          ]),
        },
        qf,
        2
      ),
      D(
        'div',
        {
          class: Oe([
            'portfolio-showcase__splash-contents',
            { 'is-active': e.isActive },
          ]),
        },
        [
          D(
            'div',
            {
              class: Oe([
                'portfolio-showcase__splash-contents-close',
                { 'd-block': e.isActive },
              ]),
              onClick:
                t[1] ||
                (t[1] = (...a) => r.toggleShowcase && r.toggleShowcase(...a)),
            },
            Kf,
            2
          ),
          D('div', Yf, [ne(o)]),
        ],
        2
      ),
    ])
  );
}
const Jf = st(Df, [['render', Xf]]),
  Zf = '/portfolio/img/photography/stock_profile.jpg',
  Qf = '/portfolio/img/photography/stock_profile2.jpg',
  eu = '/portfolio/img/illustration/logo_edelRitter.png';
const tu = {
    name: 'About',
    components: { socialNetworking: Ui },
    data() {
      return { alignment: 'ui-catalog__sns-center' };
    },
  },
  nu = { class: 'portfolio-about' },
  iu = { class: 'row no-gutters' },
  su = Ft(
    '<div class="col-12"><p class="m-0"><img class="w-100" src="' +
      Zf +
      '"></p></div><div class="col-12 col-md-6"><div class="portfolio-about__title"><h2 class="portfolio-about__title-text"><p class="m-0" data-aos="fade-right" data-aos-duration="800" data-aos-offset="300" data-aos-delay="200" data-aos-once="true" data-aos-easing="ease-out-cubic"> CREATIVE / </p><p class="m-0" data-aos="fade-right" data-aos-duration="800" data-aos-offset="300" data-aos-delay="400" data-aos-once="true" data-aos-easing="ease-out-cubic"> MAKES / </p><p class="m-0" data-aos="fade-right" data-aos-duration="800" data-aos-offset="300" data-aos-delay="600" data-aos-once="true" data-aos-easing="ease-out-cubic"> WONDERS / </p></h2><p class="portfolio-about__title-desc" data-aos="fade-up" data-aos-duration="800" data-aos-delay="800" data-aos-once="true" data-aos-easing="ease-out-cubic"> Hello, this is a portfolio website of Yohei. I create websites from UI / pages / frameworks. I also draw illustrations and post them on social media. Avid lover of photography, film and music. </p></div></div>',
    2
  ),
  ru = { class: 'col-12 col-md-6' },
  ou = { class: 'portfolio-about__profile' },
  lu = Ft(
    '<div class="portfolio-about__profile-wrap"><p class="portfolio-about__profile-name m-0"> ABOUT ME / <span class="portfolio-about__profile-name-sub">edelRitter</span></p></div><div class="portfolio-about__profile-picture" data-aos="fade" data-aos-duration="800" data-aos-delay="800" data-aos-once="true" data-aos-easing="ease-out-cubic"><p class="portfolio-about__profile-picture-img m-0"><img src="' +
      Qf +
      '" class="w-100"></p><p class="portfolio-about__profile-picture-text"> Yohei I. /<br><span class="portfolio-about__profile-picture-text-japanese">I. / 庸平</span></p></div><p class="portfolio-about__profile-title m-0">EXPERTISE /</p><p class="portfolio-about__profile-list w-100 mb-4"> adobe photoshop, vue 3 / vite, javascript, jQuery, HTML/CSS, SASS, Webpack, GIT / Github, JEST (other testing frameworks), esLint </p><p class="portfolio-about__profile-title m-0">LIKES /</p><ul class="d-flex m-0 p-0"><li class="portfolio-about__profile-list"><strong>arknights :</strong> The music and characters are phenomenal. Developed by Hypergryph </li><li class="portfolio-about__profile-list"><b>music :</b> Eli Noir, M2U, hybrid, Siames, AJURIKA, Caravan Palace, nujabes, Masashi Hamauzu, Adam Gubman, Nomak, Starset, etc. </li></ul><ul class="d-flex m-0 p-0"><li class="portfolio-about__profile-list"><b>games :</b> Omori, Chrono Trigger, Saga Frontier 2, SF 3rd Strike, Cytus 2, Final Fantasy 6/7/9, Smash bros melee, Lord of Vermilion 2, etc. </li><li class="portfolio-about__profile-list"><b>film :</b> Blade Runner, Truman Show, Punch Drunk Love, The Grand Budapest Hotel, The Godfather 1/2, The Matrix, Dunkirk, Parasite, Lawrence of Arabia, Memento, Birdman, etc. </li></ul>',
    7
  ),
  au = {
    class: 'portfolio-about__profile-sns',
    'data-aos': 'fade-up',
    'data-aos-duration': '1000',
    'data-aos-offset': '80',
    'data-aos-delay': '400',
    'data-aos-easing': 'ease-out-cubic',
  },
  cu = D(
    'p',
    {
      class: 'portfolio-about__profile-logo',
      'data-aos': 'fade',
      'data-aos-duration': '1000',
      'data-aos-offset': '80',
      'data-aos-delay': '400',
      'data-aos-easing': 'ease-out-cubic',
    },
    [D('img', { class: 'portfolio-about__profile-logoimg', src: eu })],
    -1
  );
function du(e, t, n, i, s, r) {
  const o = tt('socialNetworking');
  return (
    ce(),
    ge('section', nu, [
      D('div', iu, [
        su,
        D('div', ru, [
          D('div', ou, [
            lu,
            D('div', au, [
              ne(o, { class: Oe(this.alignment) }, null, 8, ['class']),
            ]),
            cu,
          ]),
        ]),
      ]),
    ])
  );
}
const fu = st(tu, [['render', du]]);
const uu = {
  __name: 'App',
  setup(e) {
    return (t, n) => (
      ce(),
      ge('div', null, [
        ne(Ja),
        ne(oc, { id: 'portfolioTop' }),
        ne(Ic, { id: 'portfolioArtwork' }),
        ne(Tf, { id: 'portfolioPhotography' }),
        ne(Jf, { id: 'portfolioShowcase' }),
        ne(fu, { id: 'portfolioAbout' }),
      ])
    );
  },
};
var pu =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function hu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var Qr = { exports: {} };
(function (e, t) {
  (function (n, i) {
    e.exports = i();
  })(pu, function () {
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
        function r(O) {
          return O && O.__esModule ? O : { default: O };
        }
        var o =
            Object.assign ||
            function (O) {
              for (var R = 1; R < arguments.length; R++) {
                var G = arguments[R];
                for (var Y in G)
                  Object.prototype.hasOwnProperty.call(G, Y) && (O[Y] = G[Y]);
              }
              return O;
            },
          a = s(1),
          l = (r(a), s(6)),
          c = r(l),
          d = s(7),
          f = r(d),
          h = s(8),
          p = r(h),
          T = s(9),
          b = r(T),
          C = s(10),
          M = r(C),
          g = s(11),
          w = r(g),
          y = s(14),
          I = r(y),
          F = [],
          j = !1,
          L = {
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
          _ = function () {
            var O =
              arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
            if ((O && (j = !0), j))
              return (F = (0, w.default)(F, L)), (0, M.default)(F, L.once), F;
          },
          $ = function () {
            (F = (0, I.default)()), _();
          },
          x = function () {
            F.forEach(function (O, R) {
              O.node.removeAttribute('data-aos'),
                O.node.removeAttribute('data-aos-easing'),
                O.node.removeAttribute('data-aos-duration'),
                O.node.removeAttribute('data-aos-delay');
            });
          },
          m = function (O) {
            return (
              O === !0 ||
              (O === 'mobile' && b.default.mobile()) ||
              (O === 'phone' && b.default.phone()) ||
              (O === 'tablet' && b.default.tablet()) ||
              (typeof O == 'function' && O() === !0)
            );
          },
          E = function (O) {
            (L = o(L, O)), (F = (0, I.default)());
            var R = document.all && !window.atob;
            return m(L.disable) || R
              ? x()
              : (L.disableMutationObserver ||
                  p.default.isSupported() ||
                  (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                  (L.disableMutationObserver = !0)),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-easing', L.easing),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-duration', L.duration),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-delay', L.delay),
                L.startEvent === 'DOMContentLoaded' &&
                ['complete', 'interactive'].indexOf(document.readyState) > -1
                  ? _(!0)
                  : L.startEvent === 'load'
                  ? window.addEventListener(L.startEvent, function () {
                      _(!0);
                    })
                  : document.addEventListener(L.startEvent, function () {
                      _(!0);
                    }),
                window.addEventListener(
                  'resize',
                  (0, f.default)(_, L.debounceDelay, !0)
                ),
                window.addEventListener(
                  'orientationchange',
                  (0, f.default)(_, L.debounceDelay, !0)
                ),
                window.addEventListener(
                  'scroll',
                  (0, c.default)(function () {
                    (0, M.default)(F, L.once);
                  }, L.throttleDelay)
                ),
                L.disableMutationObserver || p.default.ready('[data-aos]', $),
                F);
          };
        n.exports = { init: E, refresh: _, refreshHard: $ };
      },
      function (n, i) {},
      ,
      ,
      ,
      ,
      function (n, i) {
        (function (s) {
          function r(m, E, O) {
            function R(S) {
              var P = Ce,
                A = $e;
              return (Ce = $e = void 0), (ze = S), (le = m.apply(A, P));
            }
            function G(S) {
              return (ze = S), (ae = setTimeout(Z, E)), Be ? R(S) : le;
            }
            function Y(S) {
              var P = S - fe,
                A = S - ze,
                z = E - P;
              return u ? $(z, de - A) : z;
            }
            function K(S) {
              var P = S - fe,
                A = S - ze;
              return fe === void 0 || P >= E || P < 0 || (u && A >= de);
            }
            function Z() {
              var S = x();
              return K(S) ? ke(S) : void (ae = setTimeout(Z, Y(S)));
            }
            function ke(S) {
              return (ae = void 0), v && Ce ? R(S) : ((Ce = $e = void 0), le);
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
                P = K(S);
              if (((Ce = arguments), ($e = this), (fe = S), P)) {
                if (ae === void 0) return G(fe);
                if (u) return (ae = setTimeout(Z, E)), R(fe);
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
              u = !1,
              v = !0;
            if (typeof m != 'function') throw new TypeError(h);
            return (
              (E = d(E) || 0),
              a(O) &&
                ((Be = !!O.leading),
                (u = 'maxWait' in O),
                (de = u ? _(d(O.maxWait) || 0, E) : de),
                (v = 'trailing' in O ? !!O.trailing : v)),
              (Se.cancel = Ee),
              (Se.flush = ve),
              Se
            );
          }
          function o(m, E, O) {
            var R = !0,
              G = !0;
            if (typeof m != 'function') throw new TypeError(h);
            return (
              a(O) &&
                ((R = 'leading' in O ? !!O.leading : R),
                (G = 'trailing' in O ? !!O.trailing : G)),
              r(m, E, { leading: R, maxWait: E, trailing: G })
            );
          }
          function a(m) {
            var E = typeof m > 'u' ? 'undefined' : f(m);
            return !!m && (E == 'object' || E == 'function');
          }
          function l(m) {
            return !!m && (typeof m > 'u' ? 'undefined' : f(m)) == 'object';
          }
          function c(m) {
            return (
              (typeof m > 'u' ? 'undefined' : f(m)) == 'symbol' ||
              (l(m) && L.call(m) == T)
            );
          }
          function d(m) {
            if (typeof m == 'number') return m;
            if (c(m)) return p;
            if (a(m)) {
              var E = typeof m.valueOf == 'function' ? m.valueOf() : m;
              m = a(E) ? E + '' : E;
            }
            if (typeof m != 'string') return m === 0 ? m : +m;
            m = m.replace(b, '');
            var O = M.test(m);
            return O || g.test(m)
              ? w(m.slice(2), O ? 2 : 8)
              : C.test(m)
              ? p
              : +m;
          }
          var f =
              typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
                ? function (m) {
                    return typeof m;
                  }
                : function (m) {
                    return m &&
                      typeof Symbol == 'function' &&
                      m.constructor === Symbol &&
                      m !== Symbol.prototype
                      ? 'symbol'
                      : typeof m;
                  },
            h = 'Expected a function',
            p = NaN,
            T = '[object Symbol]',
            b = /^\s+|\s+$/g,
            C = /^[-+]0x[0-9a-f]+$/i,
            M = /^0b[01]+$/i,
            g = /^0o[0-7]+$/i,
            w = parseInt,
            y =
              (typeof s > 'u' ? 'undefined' : f(s)) == 'object' &&
              s &&
              s.Object === Object &&
              s,
            I =
              (typeof self > 'u' ? 'undefined' : f(self)) == 'object' &&
              self &&
              self.Object === Object &&
              self,
            F = y || I || Function('return this')(),
            j = Object.prototype,
            L = j.toString,
            _ = Math.max,
            $ = Math.min,
            x = function () {
              return F.Date.now();
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
          function r(x, m, E) {
            function O(v) {
              var S = Se,
                P = Ce;
              return (Se = Ce = void 0), (fe = v), (de = x.apply(P, S));
            }
            function R(v) {
              return (fe = v), (le = setTimeout(K, m)), ze ? O(v) : de;
            }
            function G(v) {
              var S = v - ae,
                P = v - fe,
                A = m - S;
              return Be ? _(A, $e - P) : A;
            }
            function Y(v) {
              var S = v - ae,
                P = v - fe;
              return ae === void 0 || S >= m || S < 0 || (Be && P >= $e);
            }
            function K() {
              var v = $();
              return Y(v) ? Z(v) : void (le = setTimeout(K, G(v)));
            }
            function Z(v) {
              return (le = void 0), u && Se ? O(v) : ((Se = Ce = void 0), de);
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
                if (le === void 0) return R(ae);
                if (Be) return (le = setTimeout(K, m)), O(ae);
              }
              return le === void 0 && (le = setTimeout(K, m)), de;
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
              u = !0;
            if (typeof x != 'function') throw new TypeError(f);
            return (
              (m = c(m) || 0),
              o(E) &&
                ((ze = !!E.leading),
                (Be = 'maxWait' in E),
                ($e = Be ? L(c(E.maxWait) || 0, m) : $e),
                (u = 'trailing' in E ? !!E.trailing : u)),
              (ve.cancel = ke),
              (ve.flush = Ee),
              ve
            );
          }
          function o(x) {
            var m = typeof x > 'u' ? 'undefined' : d(x);
            return !!x && (m == 'object' || m == 'function');
          }
          function a(x) {
            return !!x && (typeof x > 'u' ? 'undefined' : d(x)) == 'object';
          }
          function l(x) {
            return (
              (typeof x > 'u' ? 'undefined' : d(x)) == 'symbol' ||
              (a(x) && j.call(x) == p)
            );
          }
          function c(x) {
            if (typeof x == 'number') return x;
            if (l(x)) return h;
            if (o(x)) {
              var m = typeof x.valueOf == 'function' ? x.valueOf() : x;
              x = o(m) ? m + '' : m;
            }
            if (typeof x != 'string') return x === 0 ? x : +x;
            x = x.replace(T, '');
            var E = C.test(x);
            return E || M.test(x)
              ? g(x.slice(2), E ? 2 : 8)
              : b.test(x)
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
            p = '[object Symbol]',
            T = /^\s+|\s+$/g,
            b = /^[-+]0x[0-9a-f]+$/i,
            C = /^0b[01]+$/i,
            M = /^0o[0-7]+$/i,
            g = parseInt,
            w =
              (typeof s > 'u' ? 'undefined' : d(s)) == 'object' &&
              s &&
              s.Object === Object &&
              s,
            y =
              (typeof self > 'u' ? 'undefined' : d(self)) == 'object' &&
              self &&
              self.Object === Object &&
              self,
            I = w || y || Function('return this')(),
            F = Object.prototype,
            j = F.toString,
            L = Math.max,
            _ = Math.min,
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
            p = r(),
            T = new p(l);
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
                p = Array.prototype.slice.call(f.removedNodes),
                T = h.concat(p);
              if (s(T)) return c();
            });
        }
        Object.defineProperty(i, '__esModule', { value: !0 });
        var c = function () {};
        i.default = { isSupported: o, ready: a };
      },
      function (n, i) {
        function s(h, p) {
          if (!(h instanceof p))
            throw new TypeError('Cannot call a class as a function');
        }
        function r() {
          return navigator.userAgent || navigator.vendor || window.opera || '';
        }
        Object.defineProperty(i, '__esModule', { value: !0 });
        var o = (function () {
            function h(p, T) {
              for (var b = 0; b < T.length; b++) {
                var C = T[b];
                (C.enumerable = C.enumerable || !1),
                  (C.configurable = !0),
                  'value' in C && (C.writable = !0),
                  Object.defineProperty(p, C.key, C);
              }
            }
            return function (p, T, b) {
              return T && h(p.prototype, T), b && h(p, b), p;
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
                    var p = r();
                    return !(!a.test(p) && !l.test(p.substr(0, 4)));
                  },
                },
                {
                  key: 'mobile',
                  value: function () {
                    var p = r();
                    return !(!c.test(p) && !d.test(p.substr(0, 4)));
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
              p = window.innerHeight,
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
                f += p / 2;
                break;
              case 'bottom-center':
                f += p / 2 + c.offsetHeight;
                break;
              case 'center-center':
                f += p / 2 + c.offsetHeight / 2;
                break;
              case 'top-top':
                f += p;
                break;
              case 'bottom-top':
                f += c.offsetHeight + p;
                break;
              case 'center-top':
                f += c.offsetHeight / 2 + p;
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
})(Qr);
var mu = Qr.exports;
const gu = hu(mu);
const vu = {
  columnWidth: 400,
  gap: 0,
  keyMapper: (e, t, n, i) => i,
  minColumns: 1,
  maxColumns: void 0,
  rtl: !1,
  scrollContainer: null,
  ssrColumns: 0,
};
function bu({
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
  vue: p,
  wall: T,
  watch: b,
}) {
  function C(_, $, x, m) {
    const E = M(x);
    return m + $ + E <= _ ? C(_, $, x + 1, m + $ + E) : x;
  }
  function M(_) {
    const $ = Array.isArray(t.value) ? t.value : [t.value];
    return $[_ % $.length];
  }
  function g() {
    const _ = C(T.value.getBoundingClientRect().width, i.value, 0, -i.value),
      $ = y(w(_));
    return $ > 0 ? $ : 1;
  }
  function w(_) {
    const $ = r == null ? void 0 : r.value;
    return $ && _ > $ ? $ : _;
  }
  function y(_) {
    const $ = o == null ? void 0 : o.value;
    return $ && _ < $ ? $ : _;
  }
  function I(_) {
    return Array.from({ length: _ }).map(() => []);
  }
  if (h.value > 0) {
    const _ = I(h.value);
    s.value.forEach(($, x) => _[x % h.value].push(x)), (e.value = _);
  }
  async function F(_) {
    if (_ >= s.value.length) return;
    await a();
    const $ = [...T.value.children];
    d.value && $.reverse();
    const x = $.reduce((m, E) =>
      E.getBoundingClientRect().height < m.getBoundingClientRect().height
        ? E
        : m
    );
    e.value[+x.dataset.index].push(_), await F(_ + 1);
  }
  async function j(_ = !1) {
    if (e.value.length === g() && !_) {
      n(p === 2 ? 'redraw-skip' : 'redrawSkip');
      return;
    }
    e.value = I(g());
    const $ = f == null ? void 0 : f.value,
      x = $ ? $.scrollTop : window.scrollY;
    await F(0),
      $ ? $.scrollBy({ top: x - $.scrollTop }) : window.scrollTo({ top: x }),
      n('redraw');
  }
  const L =
    typeof ResizeObserver > 'u' ? void 0 : new ResizeObserver(() => j());
  return (
    c(() => {
      j(), L == null || L.observe(T.value);
    }),
    l(() => (L == null ? void 0 : L.unobserve(T.value))),
    b([s, d], () => j(!0)),
    b([t, i, o, r], () => j()),
    { getColumnWidthTarget: M }
  );
}
const wu = ['data-index'],
  _u = gl({
    __name: 'masonry-wall',
    props: Ol(
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
      vu
    ),
    emits: ['redraw', 'redrawSkip'],
    setup(e, { emit: t }) {
      const n = e,
        i = pe([]),
        s = pe(),
        { getColumnWidthTarget: r } = bu({
          columns: i,
          emit: t,
          nextTick: zi,
          onBeforeUnmount: ln,
          onMounted: on,
          vue: 3,
          wall: s,
          watch: Ut,
          ...Yo(n),
        });
      return (o, a) => (
        ce(),
        ge(
          'div',
          {
            ref_key: 'wall',
            ref: s,
            class: 'masonry-wall',
            style: $t({ display: 'flex', gap: `${o.gap}px` }),
          },
          [
            (ce(!0),
            ge(
              we,
              null,
              tn(
                i.value,
                (l, c) => (
                  ce(),
                  ge(
                    'div',
                    {
                      key: c,
                      class: 'masonry-column',
                      'data-index': c,
                      style: $t({
                        display: 'flex',
                        'flex-basis': `${ar(r)(c)}px`,
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
                      ge(
                        we,
                        null,
                        tn(
                          l,
                          (d, f) => (
                            ce(),
                            ge(
                              'div',
                              {
                                key: o.keyMapper(o.items[d], c, f, d),
                                class: 'masonry-item',
                              },
                              [
                                Er(
                                  o.$slots,
                                  'default',
                                  {
                                    item: o.items[d],
                                    column: c,
                                    row: f,
                                    index: d,
                                  },
                                  () => [Hi(et(o.items[d]), 1)]
                                ),
                              ]
                            )
                          )
                        ),
                        128
                      )),
                    ],
                    12,
                    wu
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
    const e = _u;
    return (
      (e.install = (t) => {
        t.component('MasonryWall', e);
      }),
      e
    );
  })();
function xu(e, t, n) {
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
function Su() {
  new xu(document, 30, 16);
}
function Tu() {
  Su();
}
document.addEventListener('DOMContentLoaded', Tu);
Ia(uu).use(gu.init()).use(yu).mount('#app');
//# sourceMappingURL=index.js.map
